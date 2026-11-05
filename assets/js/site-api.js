/* 공개 키만 사용. 권한은 서버의 RLS에서 검증합니다. */
window.SiteAPI = (() => {
  const base='https://jbxpbvkldgncrdlzqiol.supabase.co';
  const key='sb_publishable_FjdoZsQiqTLugIjHq-kMMg_JGpAAvdP';
  const sessionKey='culturemakingart.admin.session';
  let session; try { session=JSON.parse(sessionStorage.getItem(sessionKey)||'null'); } catch { session=null; }
  function remember(s){session=s; if(s)sessionStorage.setItem(sessionKey,JSON.stringify(s));else sessionStorage.removeItem(sessionKey);}
  async function token(){
    if(!session)return null;
    if(session.expires_at*1000<Date.now()+60000){
      const r=await fetch(base+'/auth/v1/token?grant_type=refresh_token',{method:'POST',headers:{apikey:key,'Content-Type':'application/json'},body:JSON.stringify({refresh_token:session.refresh_token})});
      if(!r.ok){remember(null);throw Error('로그인이 만료됐습니다. 다시 로그인해주세요.');}
      const s=await r.json();s.expires_at=Math.floor(Date.now()/1000)+s.expires_in;remember(s);
    }
    return session.access_token;
  }
  async function request(route,{method='GET',body,headers={}}={}){
    const authToken=await token();
    const r=await fetch(base+route,{method,headers:{apikey:key,...(authToken?{Authorization:'Bearer '+authToken}:{}),...(body instanceof Blob?{}:{'Content-Type':'application/json'}),...headers},body:body===undefined?undefined:body instanceof Blob?body:JSON.stringify(body)});
    if(!r.ok){let e;try{e=await r.json();}catch{} throw Error(e?.message||e?.msg||'요청에 실패했습니다. 잠시 후 다시 시도해주세요.');}
    return r.status===204||r.headers.get('content-length')==='0'?null: r.text().then(t=>t?JSON.parse(t):null);
  }
  return {
    request,base,
    loggedIn:()=>!!session,
    async consumeLink(){
      const h=new URLSearchParams(location.hash.slice(1));
      if(h.has('error_description')){history.replaceState(null,'',location.pathname);throw Error('로그인 링크가 만료되었거나 이미 사용됐습니다. 아래에서 새 로그인 링크를 받은 뒤 가장 최근 메일의 링크를 한 번만 열어주세요.');}
      if(h.has('access_token')){remember({access_token:h.get('access_token'),refresh_token:h.get('refresh_token'),expires_at:Math.floor(Date.now()/1000)+Number(h.get('expires_in')||3600)});history.replaceState(null,'',location.pathname);}
    },
    async login(email){return request('/auth/v1/otp?redirect_to='+encodeURIComponent(location.origin+'/admin/'),{method:'POST',body:{email,create_user:true}});},
    async logout(){try{await request('/auth/v1/logout',{method:'POST'});}finally{remember(null);}},
    content:()=>request('/rest/v1/site_content?select=*&order=id'),
    async save(row){return request('/rest/v1/site_content?on_conflict=id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:row});},
    async upload(file){
      if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>10485760)throw Error('JPG, PNG, WebP 이미지 10MB 이하만 올릴 수 있습니다.');
      const ext={'image/jpeg':'jpg','image/png':'png','image/webp':'webp'}[file.type];
      const name=crypto.randomUUID()+'.'+ext;
      await request('/storage/v1/object/site-media/'+name,{method:'POST',body:file,headers:{'Content-Type':file.type}});
      return base+'/storage/v1/object/public/site-media/'+name;
    },
    inquiry:data=>request('/rest/v1/site_inquiries',{method:'POST',headers:{Prefer:'return=minimal'},body:data}),
    inbox:()=>request('/rest/v1/site_inquiries?select=*&order=created_at.desc&limit=200'),
    updateInquiry:(id,status,note)=>request('/rest/v1/site_inquiries?id=eq.'+encodeURIComponent(id),{method:'PATCH',body:{status,note},headers:{Prefer:'return=minimal'}})
  };
})();
