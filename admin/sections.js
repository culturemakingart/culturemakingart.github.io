/* 홈과 단체 소개를 항목별 폼으로 편집합니다. 기존 문자열 데이터도 보존합니다. */
window.AdminSections=(()=>{
  const make=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;};
  let state,root,notify,busy,api;
  const clean=s=>String(s||'').trim();
  async function defaults(){
    const [home,about]=await Promise.all(['../index.html','../about/index.html'].map(url=>fetch(url).then(r=>r.text()).then(s=>new DOMParser().parseFromString(s,'text/html'))));
    const text=(doc,sel)=>doc.querySelector(sel)?.textContent.trim()||'';
    const real=s=>s.startsWith('[')&&s.endsWith(']')?'':s;
    const method=[...about.querySelectorAll('[aria-labelledby="h-how"] .prose p')].map(p=>real(p.textContent.trim())).filter(Boolean).join('\n\n');
    return {home:{title:'예술로\n일상을\n만나다',summary:text(home,'.hero__lead'),image:location.origin+'/assets/img/home-artwork.jpg',alt:'야외 광장에 놓인 이동식 설치 작품',imageMode:'upload'},about:{title:'문화제작예술소는\n이런 곳이에요',summary:text(about,'.page-head .lead'),aimTitle:text(about,'#h-aim'),aimIntro:text(about,'[aria-labelledby="h-aim"] .section__head > p'),aimsList:[...about.querySelectorAll('[aria-labelledby="h-aim"] .block-card')].map(e=>({title:e.querySelector('h3')?.textContent||'',body:e.querySelector('p')?.textContent||''})),methodTitle:text(about,'#h-how'),method,membersTitle:text(about,'#h-members'),membersList:[...about.querySelectorAll('.member')].map(e=>({name:e.querySelector('strong')?.textContent||'',role:e.querySelector('.role')?.textContent||'',bio:real(e.querySelector('p')?.textContent.trim()||''),image:'',alt:''})),historyTitle:text(about,'#h-history'),historyIntro:text(about,'[aria-labelledby="h-history"] .section__head > p'),historyList:[],ctaTitle:text(about,'.band strong'),ctaBody:text(about,'.band p'),projectButton:text(about,'.band a:first-child'),collaborationButton:text(about,'.band a:last-child')}};
  }
  function field(parent,label,obj,key,{area=false,required=false}={}){const l=make('label',label);const input=make(area?'textarea':'input');input.name=key;input.value=obj[key]||'';input.required=required;input.maxLength=area?20000:500;input.oninput=()=>{obj[key]=input.value;notify();};l.append(input);parent.append(l);return input;}
  function section(title,help){const box=make('section',undefined,'edit-section');box.append(make('h3',title));if(help)box.append(make('p',help,'edit-help'));root.append(box);return box;}
  function button(text,action,cls='btn'){const b=make('button',text,cls);b.type='button';b.onclick=action;return b;}
  function safeURL(url){if(!url)return '';try{const u=new URL(url,location.origin);return u.protocol==='https:'||u.origin===location.origin?u.href:'';}catch{return '';}}
  function photo(parent,obj,{label='사진',imageKey='image',altKey='alt'}={}){
    const wrap=make('div',undefined,'photo-editor'),preview=make('img',undefined,'image-preview');
    const empty=make('p','아직 선택한 사진이 없습니다.','edit-help');
    function refresh(){const src=safeURL(obj[imageKey]);preview.hidden=!src;empty.hidden=!!src;if(src)preview.src=src;else preview.removeAttribute('src');preview.alt=obj[altKey]||label;}
    const l=make('label',label+' 파일 선택'),input=make('input');input.type='file';input.accept='image/jpeg,image/png,image/webp';l.append(input);
    input.onchange=async()=>{if(!input.files[0])return;busy(1);notify('사진 업로드 중…');try{obj[imageKey]=await api.upload(input.files[0]);refresh();notify('사진을 올렸습니다. 아래 저장 버튼을 눌러 반영해주세요.');}catch(e){notify(e.message);}finally{busy(-1);input.value='';}};
    wrap.append(preview,empty,l,make('p','JPG·PNG·WebP 파일 / 10MB 이하','edit-help'),button('선택한 사진 없애기',()=>{obj[imageKey]='';refresh();notify();},'text-button'));
    field(wrap,'사진 설명',obj,altKey);parent.append(wrap);refresh();return refresh;
  }
  function repeater(parent,key,{title,empty,fields,photos=false,kindSelect=false}){
    const list=make('div');parent.append(list);
    function render(){list.replaceChildren();const entries=state[key];if(!entries.length)list.append(make('p',empty,'edit-help'));
      entries.forEach((obj,index)=>{const card=make('fieldset',undefined,'repeat-card');card.append(make('legend',title+' '+(index+1)));const tools=make('div',undefined,'row-actions');
        const up=button('위로',()=>{[entries[index-1],entries[index]]=[entries[index],entries[index-1]];render();notify();});up.disabled=index===0;
        const down=button('아래로',()=>{[entries[index],entries[index+1]]=[entries[index+1],entries[index]];render();notify();});down.disabled=index===entries.length-1;
        tools.append(up,down,button(title+' 빼기',()=>{entries.splice(index,1);render();notify('목록에서 뺐습니다. 저장 전에는 변경 취소로 되돌릴 수 있습니다.');},'btn remove-item'));card.append(tools);
        for(const [key,label,area]of fields)field(card,label,obj,key,{area:!!area});
        if(kindSelect){const l=make('label','활동 구분'),select=make('select');for(const name of ['단체 활동','구성원 이전 활동']){const op=make('option',name);op.value=name;select.append(op);}select.value=obj.type||'단체 활동';select.onchange=()=>{obj.type=select.value;notify();};l.append(select);card.append(l);}
        if(photos)photo(card,obj,{label:'구성원 사진'});list.append(card);
      });
    }
    parent.append(button('+ '+title+' 추가',()=>{state[key].push({});render();notify();}));render();
  }
  function mount(kind,data,rows,parent,callbacks){state=structuredClone(data);root=parent;notify=callbacks.changed;busy=callbacks.busy;api=callbacks.api;root.replaceChildren();
    if(kind==='home'){
      const copy=section('첫 화면 문구','홈에 표시할 제목과 소개를 수정합니다.');field(copy,'메인 제목',state,'title',{area:true,required:true});field(copy,'소개 문구',state,'summary',{area:true});
      const media=section('메인 이미지','직접 파일을 올리거나, 공개된 프로그램·프로젝트의 대표 사진을 선택하세요.');
      const tabs=make('div',undefined,'image-modes'),direct=make('div'),linked=make('div');
      state.imageMode=state.imageMode||'upload';
      const modes=[['upload','이미지 파일 올리기'],['reference','프로그램·프로젝트에서 선택']];
      for(const[value,label]of modes){const l=make('label'),r=make('input');r.type='radio';r.name='home-image-mode';r.value=value;r.checked=state.imageMode===value;r.onchange=()=>{state.imageMode=value;show();notify();};l.append(r,document.createTextNode(label));tabs.append(l);}media.append(tabs,direct,linked);
      const refreshDirect=photo(direct,state,{label:'메인 이미지'});
      const selectedPreview=make('img',undefined,'image-preview');linked.append(selectedPreview);const label=make('label','연동할 프로그램·프로젝트'),select=make('select');select.append(make('option','선택해주세요'));select.firstChild.value='';
      const candidates=rows.filter(r=>['program','project'].includes(r.kind)&&r.published&&r.data.image);
      for(const r of candidates){const o=make('option',(r.kind==='program'?'프로그램 · ':'프로젝트 · ')+(r.data.title||r.id));o.value=r.id;select.append(o);}if(state.imageSource?.id&&!candidates.some(r=>r.id===state.imageSource.id)){const old=make('option','기존 선택 · 현재 비공개 (마지막 사진 유지)');old.value=state.imageSource.id;select.append(old);}select.value=state.imageSource?.id||'';label.append(select);linked.append(label);
      if(!candidates.length)linked.append(make('p','선택할 사진이 없습니다. 프로그램 또는 프로젝트에 대표 사진을 올리고 공개한 뒤 돌아오세요.','edit-help'));
      linked.append(make('p','연동한 항목의 대표 사진을 바꾸면 홈 사진도 함께 바뀝니다. 항목이 비공개되면 마지막으로 선택한 사진을 유지합니다.','edit-help'));
      function updatePreview(){const r=candidates.find(r=>r.id===select.value);const src=safeURL(r?.data.image||state.image);selectedPreview.hidden=!src;if(src)selectedPreview.src=src;selectedPreview.alt=state.alt||'선택한 대표 사진';}
      select.onchange=()=>{const r=candidates.find(r=>r.id===select.value);state.imageSource=r?{id:r.id,kind:r.kind}:null;if(r){state.image=r.data.image;state.alt=r.data.alt||r.data.title||'';}updatePreview();notify();};
      function show(){refreshDirect();direct.hidden=state.imageMode!=='upload';linked.hidden=state.imageMode!=='reference';updatePreview();}show();
      return;
    }
    const intro=section('단체 소개 본문','현재 사이트의 내용을 불러왔습니다. 각 칸을 수정하면 해당 영역에 반영됩니다.');field(intro,'페이지 제목',state,'title',{area:true,required:true});field(intro,'단체 소개 글',state,'summary',{area:true});
    const aim=section('우리가 지향하는 것');field(aim,'영역 제목',state,'aimTitle');field(aim,'설명 글',state,'aimIntro',{area:true});repeater(aim,'aimsList',{title:'지향점',empty:'지향점을 추가해주세요.',fields:[['title','소제목'],['body','설명',true]]});
    const method=section('활동을 만드는 방식');field(method,'영역 제목',state,'methodTitle');field(method,'본문 글',state,'method',{area:true});
    const members=section('함께하는 사람들','사람별로 이름·역할·소개·사진을 편집합니다. 빼기와 순서 변경은 저장할 때 반영됩니다.');field(members,'영역 제목',state,'membersTitle');repeater(members,'membersList',{title:'사람',empty:'등록된 사람이 없습니다. 아래에서 추가하세요.',fields:[['name','이름'],['role','역할·직책'],['bio','소개·이력',true]],photos:true});
    const history=section('연혁','연도와 활동을 한 줄씩 추가합니다. 최신 항목을 위로 옮길 수 있습니다.');field(history,'영역 제목',state,'historyTitle');field(history,'연혁 안내 글',state,'historyIntro',{area:true});repeater(history,'historyList',{title:'연혁',empty:'등록된 연혁이 없습니다. 아래에서 첫 항목을 추가하세요.',fields:[['year','연도·기간'],['title','활동명'],['organization','주최·협력 기관'],['description','활동 설명 (선택)',true]],kindSelect:true});
    const cta=section('페이지 아래 안내 문구');field(cta,'안내 제목',state,'ctaTitle');field(cta,'안내 글',state,'ctaBody',{area:true});field(cta,'활동 기록 버튼 문구',state,'projectButton');field(cta,'협업 안내 버튼 문구',state,'collaborationButton');
  }
  function prepare(kind,data,base){const d={...structuredClone(base[kind]),...structuredClone(data)};
    if(kind==='about'){
      if(!Object.hasOwn(data,'aimsList')&&Object.hasOwn(data,'aim')){d.aimIntro=data.aim;d.aimsList=[];}
      if(!Object.hasOwn(data,'membersList')&&Object.hasOwn(data,'members'))d.membersList=clean(data.members)?[{name:'',bio:data.members}]:[];
      if(!Object.hasOwn(data,'historyList')&&Object.hasOwn(data,'history'))d.historyList=clean(data.history)?[{title:data.history}]:[];
      for(const k of ['aimsList','membersList','historyList'])if(!Array.isArray(d[k]))d[k]=[];
    }return d;
  }
  function read(){const d=structuredClone(state);d.editorVersion=2;if(d.imageMode!=='reference')d.imageSource=null;
    if(d.imageMode==='reference'&&!d.imageSource?.id)throw Error('홈에 연결할 프로그램 또는 프로젝트를 선택해주세요.');
    for(const key of ['aimsList','membersList','historyList'])if(d[key])d[key]=d[key].filter(o=>Object.values(o).some(v=>typeof v==='string'&&v.trim()));
    return d;
  }
  return {defaults,prepare,mount,read};
})();
