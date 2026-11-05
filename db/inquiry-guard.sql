-- 자동 삭제 없음. 아래 함수는 문의 과다 접수만 제한합니다.
create index inquiries_email_created_idx on public.site_inquiries (lower(email),created_at);
create function private.guard_inquiry() returns trigger language plpgsql security definer set search_path='' as $$
begin
  perform pg_catalog.pg_advisory_xact_lock(914230);
  if (select count(*) from public.site_inquiries where created_at>now()-interval '1 day')>=300 then
    raise exception '오늘 접수량이 많습니다. 이메일로 문의해주세요.';
  end if;
  if (select count(*) from public.site_inquiries where lower(email)=lower(new.email) and created_at>now()-interval '1 hour')>=3 then
    raise exception '같은 이메일로는 1시간에 3건까지 문의할 수 있습니다.';
  end if;
  new.created_at=now();
  return new;
end; $$;
revoke all on function private.guard_inquiry() from public,anon,authenticated;
create trigger inquiry_rate_limit before insert on public.site_inquiries for each row execute function private.guard_inquiry();
