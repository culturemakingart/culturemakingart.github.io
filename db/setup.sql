begin;
create schema if not exists private;
create table private.site_admin_emails(email text primary key);
alter table private.site_admin_emails enable row level security;
insert into private.site_admin_emails values ('culturemakingart@gmail.com');
revoke all on private.site_admin_emails from public, anon, authenticated;
create function private.is_site_admin() returns boolean language sql stable security definer set search_path = '' as $$
 select auth.uid() is not null and exists (
 select 1 from auth.users u join private.site_admin_emails a on lower(u.email)=a.email
 where u.id=auth.uid() and u.email_confirmed_at is not null and not coalesce(u.is_anonymous,false));
$$;
revoke all on function private.is_site_admin() from public;
grant usage on schema private to anon, authenticated;
grant execute on function private.is_site_admin() to anon, authenticated;
create table public.site_content (
 id text primary key check (id ~ '^[a-z0-9][a-z0-9_-]{0,99}$'),
 kind text not null check(kind in ('home','about','program','project')),
 data jsonb not null check(jsonb_typeof(data)='object'),
 published boolean not null default false,
 updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
grant select on public.site_content to anon, authenticated;
grant insert, update on public.site_content to authenticated;
create policy content_read on public.site_content for select to anon, authenticated using(published or (select private.is_site_admin()));
create policy content_insert on public.site_content for insert to authenticated with check((select private.is_site_admin()));
create policy content_update on public.site_content for update to authenticated using((select private.is_site_admin())) with check((select private.is_site_admin()));
create table public.site_inquiries (
 id uuid primary key default gen_random_uuid(),
 created_at timestamptz not null default now(),
 name text not null check(length(trim(name)) between 1 and 100),
 organization text not null default '' check(length(organization)<=200),
 email text not null check(length(email) between 3 and 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'),
 message text not null check(length(trim(message)) between 10 and 5000),
 consent boolean not null check(consent=true),
 status text not null default 'new' check(status in ('new','read','replied')),
 note text not null default '' check(length(note)<=5000)
);
alter table public.site_inquiries enable row level security;
grant insert(name,organization,email,message,consent) on public.site_inquiries to anon, authenticated;
grant select, update(status,note) on public.site_inquiries to authenticated;
create policy inquiries_submit on public.site_inquiries for insert to anon, authenticated with check(status='new' and note='' and consent=true);
create policy inquiries_read on public.site_inquiries for select to authenticated using((select private.is_site_admin()));
create policy inquiries_update on public.site_inquiries for update to authenticated using((select private.is_site_admin())) with check((select private.is_site_admin()));
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values ('site-media','site-media',true,10485760,ARRAY['image/jpeg','image/png','image/webp']);
create policy media_admin_insert on storage.objects for insert to authenticated with check(bucket_id='site-media' and (select private.is_site_admin()));
create policy media_admin_select on storage.objects for select to authenticated using(bucket_id='site-media' and (select private.is_site_admin()));
create policy media_admin_update on storage.objects for update to authenticated using(bucket_id='site-media' and (select private.is_site_admin())) with check(bucket_id='site-media' and (select private.is_site_admin()));
commit;
