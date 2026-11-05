/* 디자인과 분리된 콘텐츠 표시. 저장된 텍스트는 HTML로 실행하지 않습니다. */
(async()=>{
'use strict';const api=window.SiteAPI,$=s=>document.querySelector(s);const root=location.origin;
const node=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;};
const image=(url,alt)=>{if(!url)return null;let u;try{u=new URL(url,location.origin);}catch{return null;}if(u.protocol!=='https:'&&u.origin!==location.origin)return null;const img=node('img');img.src=u.href;img.alt=alt||'';img.loading='lazy';return img;};
function statusLine(container,caption,year){if(!container)return;let bar=container.querySelector('.window__status');if(!bar){bar=node('div',undefined,'window__status');container.append(bar);}bar.replaceChildren(node('span',caption||''),node('span',year||''));bar.hidden=!caption&&!year;}
function decoratePhotos(){
 for(const [i,media]of [...document.querySelectorAll('.p-card__img')].entries()){if(!['bg-sky','bg-pollen','bg-blush','bg-leaf'].some(c=>media.classList.contains(c)))media.classList.add(['bg-sky','bg-pollen','bg-blush','bg-leaf'][i%4]);}
 for(const img of document.querySelectorAll('.gallery img')){if(img.parentElement.classList.contains('mat'))continue;let figure=img.closest('figure');if(!figure){figure=node('figure');img.replaceWith(figure);figure.append(img);}const mat=node('div',undefined,'mat');img.replaceWith(mat);mat.append(img);}
}
function prose(container,text){if(!container)return;container.replaceChildren();for(const p of String(text||'').split(/\n\s*\n/)){const e=node('p',p);e.style.whiteSpace='pre-wrap';container.append(e);}}
function programDetails(d){
 const anchor=$('#h-about-class')?.closest('section');if(!anchor)return;
 const holder=node('div');holder.dataset.programDetails='';
 function section(title){const s=node('section',undefined,'section container');s.append(node('h2',title,'title-section'));holder.append(s);return s;}
 function textSection(title,text){if(!text)return;prose(section(title).appendChild(node('div',undefined,'prose')),text);}
 const facts=$('.detail-head .facts');facts.replaceChildren();
 const count=[d.minPeople?'최소 '+d.minPeople+'명':'',d.maxPeople?'최대 '+d.maxPeople+'명':'',d.people].filter(Boolean).join(' · ');
 for(const[label,value]of [['대상',d.target],['참여 유형',d.audienceType],['인원',count],['1회 소요 시간',d.time],['진행 회차',[d.sessionType,d.rounds].filter(Boolean).join(' · ')],['출장',d.offsite],['진행 공간',d.venue],['연계 교과·과정',d.link]])if(value){const row=node('div');row.append(node('dt',label),node('dd',value));facts.append(row);}
 if(d.body)textSection('프로그램 소개',d.body);
 if(d.activitySteps?.length||d.output){const s=section('참여자가 하는 것과 결과물'),ol=node('ol');for(const step of d.activitySteps||[]){const li=node('li');if(step.title)li.append(node('h3',step.title,'title-sub'));if(step.description)prose(li.appendChild(node('div',undefined,'prose')),step.description);ol.append(li);}s.append(ol);if(d.output){s.append(node('h3','결과물','title-sub'));prose(s.appendChild(node('div',undefined,'prose')),d.output);}}
 if(d.trackRecord?.length){const s=section('운영 실적');for(const r of d.trackRecord){const a=node('article');if(r.institution)a.append(node('h3',r.institution,'title-sub'));a.append(node('p',[r.period,r.sessions].filter(Boolean).join(' · ')));if(r.description)prose(a.appendChild(node('div',undefined,'prose')),r.description);s.append(a);}}
 function photos(title,items){if(!items.some(p=>p?.image))return;const s=section(title),g=node('div',undefined,'gallery');for(const p of items){const im=image(p?.image,p?.alt);if(!im)continue;const f=node('figure');im.style.cssText='width:100%;height:auto;object-fit:contain';f.append(im);if(p.caption)f.append(node('figcaption',p.caption));g.append(f);}s.append(g);}
 photos('현장 사진',d.activityPhotos||[]);photos('결과물 사진',[d.resultPhoto]);textSection('맞춤 조정 가능 범위',d.customization);
 if(d.hostPreparation||d.providerPreparation){const s=section('준비 사항');for(const[t,v]of [['협업처가 준비할 것',d.hostPreparation],['문화제작예술소가 준비할 것',d.providerPreparation]])if(v){s.append(node('h3',t,'title-sub'));prose(s.appendChild(node('div',undefined,'prose')),v);}}
 const cost=section('비용 안내'),band=node('div',undefined,'band'),copy=node('p',d.fee||'비용은 문의해주세요.');copy.style.whiteSpace='pre-wrap';const link=node('a','이 프로그램 문의하기 →','btn btn--primary');link.href='/contact/?program='+encodeURIComponent(d.title||'');band.append(copy,link);cost.append(band);
 anchor.hidden=true;const photoSection=$('#h-photos')?.closest('section');if(photoSection)photoSection.hidden=true;const oldBand=document.querySelector('main .band');if(oldBand)oldBand.closest('section').hidden=true;anchor.after(holder);
}
try{
 const [rows,local]=await Promise.all([api.request('/rest/v1/site_content?select=*&published=eq.true&order=id'),fetch('/assets/data/programs.json').then(r=>r.json())]);
 const defaults=new Map(local.programs.map(p=>[p.slug,p]));
 const programs=rows.filter(r=>r.kind==='program').map(r=>({...r,data:{...defaults.get(r.id),...r.data}})).sort(SiteOrder.records);
 const projects=rows.filter(r=>r.kind==='project').sort(SiteOrder.records);
 const home=rows.find(r=>r.kind==='home');
 if(home&&$('.hero')){const d=home.data,source=d.imageMode==='reference'?rows.find(r=>r.id===d.imageSource?.id&&r.kind===d.imageSource?.kind):null;statusLine($('.hero__visual .window'),d.imageCaption||source?.data.title,d.imageYear||source?.data.year);}
 if(home&&$('.hero')){const d=home.data;if(d.title&&d.title!=='예술로\n일상을\n만나다'){$('.hero__title').textContent=d.title;$('.hero__title').style.whiteSpace='pre-line';}if(d.summary)$('.hero__lead').textContent=d.summary;const source=d.imageMode==='reference'?rows.find(r=>r.id===d.imageSource?.id&&r.kind===d.imageSource?.kind):null;const img=image(source?.data.image||d.image,source?.data.alt||d.alt);if(img){img.className='hero__photo';img.loading='eager';$('.hero__visual .window').querySelector('img,.ph')?.replaceWith(img);}}
 const about=rows.find(r=>r.kind==='about');
 if(about&&location.pathname==='/about/'&&window.renderPartnerArtists)window.renderPartnerArtists(about.data);
 if(about&&about.data.editorVersion===2&&location.pathname==='/about/'&&window.renderStructuredAbout)window.renderStructuredAbout(about.data);
 if(about&&about.data.editorVersion!==2&&location.pathname==='/about/'){const d=about.data;if(d.title)$('.title-page').textContent=d.title;if(d.summary)$('.page-head .lead').textContent=d.summary;for(const [key,id]of [['aim','h-aim'],['method','h-how'],['members','h-members']]){if(d[key]){const sec=$('#'+id)?.closest('section');if(sec){const box=node('div',undefined,'container');box.append(node('h2',$('#'+id).textContent,'title-section'));prose(box.appendChild(node('div',undefined,'prose')),d[key]);sec.replaceChildren(box);}}}if(d.history){const box=node('section',undefined,'section container');box.append(node('h2','활동 연혁','title-section'));prose(box.appendChild(node('div',undefined,'prose')),d.history);const old=document.querySelector('.history')?.closest('section');if(old)old.replaceWith(box);else $('main').append(box);}}
 function card(r){const d=r.data,a=node('a',undefined,'p-card');a.href=r.kind==='program'?'/collaboration/programs/detail/?id='+encodeURIComponent(r.id):'/projects/detail/?id='+encodeURIComponent(r.id);a.dataset.group=d.group||'협의·개발 중';a.dataset.search=(d.title||'')+' '+(d.sub||'');const media=node('div',undefined,'p-card__img'),img=image(d.image,d.alt);media.append(img||node('div','사진 준비 중','ph bg-sky'));const body=node('div',undefined,'p-card__body');if(r.kind==='program'){const tags=node('div',undefined,'p-card__tags');tags.append(node('span',d.note||d.group||'교육 프로그램','tag'));body.append(tags);}if(d.year)body.append(node('span',d.year,'p-card__year'));body.append(node('h2',d.title||r.id,'p-card__title'),node('p',d.sub||d.summary||'','p-card__sub'));if(r.kind==='program'){const dl=node('dl',undefined,'p-card__meta');for(const[k,l]of [['time','시간'],['rounds','회차'],['people','인원']]){const div=node('div');div.append(node('dt',l),node('dd',d[k]||'협의'));dl.append(div);}body.append(dl);}a.append(media,body);return a;}
 const list=$('#program-list');if(list){list.replaceChildren(...programs.map(card));document.dispatchEvent(new Event('site:content'));}
 // 기존 추천 카드도 저장한 제목·사진과 공개 상태를 따릅니다.
 for(const a of document.querySelectorAll('a.p-card')){if(list?.contains(a))continue;const id=new URL(a.href).pathname.split('/').filter(Boolean).pop();if(defaults.has(id)){const p=programs.find(p=>p.id===id);if(p)a.replaceWith(card(p));else a.remove();}}
 if(location.pathname==='/projects/'){const grid=$('.card-grid')||$('.grid-3');if(grid){grid.replaceChildren(...projects.map(card));if(!projects.length)grid.append(node('p','활동 기록을 준비하고 있습니다. 협업 문의는 CONTACT에서 보내주세요.'));}}
 let record;
 const path=location.pathname.split('/').filter(Boolean);
 if(path[0]==='projects'&&path.length>1)record=projects.find(r=>r.id===(path[1]==='detail'?new URLSearchParams(location.search).get('id'):path[1]));
 if(path[0]==='collaboration'&&path[1]==='programs'&&path.length>2)record=programs.find(r=>r.id===(path[2]==='detail'?new URLSearchParams(location.search).get('id'):path[2]));
 const isDetail=(path[0]==='projects'&&path.length>1)||(path[0]==='collaboration'&&path[1]==='programs'&&path.length>2);
 if(isDetail){
   if(!record){$('main').replaceChildren(node('div','현재 공개된 내용이 없습니다.','container page-head'));return;}
   const d=record.data;document.title=(d.title||'상세')+' | 문화제작예술소';
   if(record.kind==='program'&&$('.detail-head')){
     $('.detail-head .title-page').textContent=d.title||record.id;
     const lead=$('.detail-head .lead');if(lead){lead.textContent=d.summary||d.sub||'프로그램의 세부 내용은 문의해주세요.';lead.classList.remove('placeholder-text');}
     const facts=$('.detail-head .facts');facts.replaceChildren();for(const[k,l]of [['time','수업 시간'],['rounds','회차'],['people','인원'],['target','대상'],['link','연계 교과·과정']]){const div=node('div');div.append(node('dt',l),node('dd',d[k]||'협의'));facts.append(div);}
     const bar=document.querySelector('main .window__name');if(bar)bar.textContent=record.id+'.jpg';const tag=document.querySelector('.detail-head .tag--fill');if(tag)tag.textContent=d.note||d.group||'교육 프로그램';const photo=image(d.image,d.alt);if(photo){photo.style.cssText='display:block;aspect-ratio:4/5;object-fit:cover';document.querySelector('main .window .ph,main .window img')?.replaceWith(photo);}
     prose($('#h-about-class')?.closest('section')?.querySelector('.prose'),d.body||'자세한 수업 내용과 진행 방식은 협의할 수 있습니다.');
     const gallery=$('.gallery');gallery?.replaceChildren();for(const url of String(d.gallery||'').split('\n').filter(Boolean)){const im=image(url,d.title+' 수업 사진');if(im)gallery?.append(im);}if(gallery&&!gallery.children.length)gallery.closest('section').hidden=true;
     const contact=$('.detail-head .btn--primary');contact.href='/contact/?program='+encodeURIComponent(d.title||record.id);const note=$('.detail-head .cta-note');if(note)note.textContent='문의 페이지에서 프로그램 이름과 함께 제안할 수 있습니다.';
     const crumb=$('.crumbs [aria-current]');if(crumb)crumb.textContent=d.title;statusLine(document.querySelector('main .window'),d.title,d.year);if(d.programVersion===2)programDetails(d);return;
   }
   const main=$('main'),section=node('section',undefined,'container section');const back=node('a','← 활동 목록','text-link');back.href='/projects/';section.append(back,node('h1',d.title||record.id,'title-page'));if(d.summary)section.append(node('p',d.summary,'lead'));const img=image(d.image,d.alt);if(img){img.style.cssText='width:100%;max-height:600px;object-fit:contain;margin:30px 0';section.append(img);}const dl=node('dl',undefined,'facts');for(const[k,l]of [['year','연도'],['place','장소'],['partners','협력 기관'],['role','담당 역할']])if(d[k]){const div=node('div');div.append(node('dt',l),node('dd',d[k]));dl.append(div);}section.append(dl);prose(section.appendChild(node('div',undefined,'prose')),d.body||'자세한 내용은 문의해주세요.');const gallery=node('div',undefined,'gallery');for(const url of String(d.gallery||'').split('\n').filter(Boolean)){const im=image(url,d.title+' 활동 사진');if(im)gallery.append(im);}section.append(gallery);const contact=node('a','이 활동으로 협업 문의하기 →','btn btn--primary');contact.href='/contact/?program='+encodeURIComponent(d.title||record.id);section.append(contact);main.replaceChildren(section);
 }
}catch(e){if(document.querySelector('main[data-dynamic-detail]'))$('main').replaceChildren(node('p','내용을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.','container page-head'));console.warn('콘텐츠를 불러오지 못했습니다.');}finally{decoratePhotos();const detail=document.querySelector('main[data-dynamic-detail]');if(detail)detail.hidden=false;}
})();
