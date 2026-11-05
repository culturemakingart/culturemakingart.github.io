/* 공개 화면과 관리 화면에서 같은 정렬 규칙을 사용합니다. */
window.SiteOrder=(()=>{
  const collator=new Intl.Collator('ko-KR',{numeric:true,sensitivity:'base'});
  const clean=value=>String(value||'').normalize('NFKC').trim();
  const compare=(a,b)=>collator.compare(clean(a),clean(b));
  const year=value=>Math.max(0,...(clean(value).match(/\b[12]\d{3}\b/g)||[]).map(Number));
  const records=(a,b)=>a.kind==='project'&&b.kind==='project'?(year(b.data.year)-year(a.data.year)||compare(a.data.title,b.data.title)):compare(a.data.title,b.data.title);
  const people=(a,b)=>compare(a.name,b.name);
  return {compare,records,people,year};
})();
