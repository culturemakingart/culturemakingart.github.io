window.ProgramTechniques=(()=>{
 const options=['목공','도자','판화','드로잉','사진','기타'];
 function get(d={}){
   if(Array.isArray(d.techniques)){const selected=options.filter(t=>d.techniques.includes(t));return selected.length?selected:['기타'];}
   const text=[d.title,d.sub,d.summary,d.body,d.output,...(d.activitySteps||[]).map(s=>(s.title||'')+' '+(s.description||''))].filter(Boolean).join(' '),found=new Set();
   for(const [name,pattern]of [['목공',/목공|목재|나무/],['도자',/도자|도예|점토|흙으로|흙을/],['판화',/판화|리노컷|실크스크린/],['드로잉',/드로잉|자화상/],['사진',/사진|카메라|시아노타입|청사진/]])if(pattern.test(text))found.add(name);
   if(d.slug==='apple-face-mood-lamp'){found.add('목공');found.add('드로잉');}
   return found.size?options.filter(t=>found.has(t)):['기타'];
 }
 function renameTitle(title){return {'사과같은 내 얼굴 무드등':'블라인드 컨투어드로잉 무드등','콜라판화로 드러나는 인권':'콜라판화'}[title]||title;}
 return {options,get,renameTitle};
})();
