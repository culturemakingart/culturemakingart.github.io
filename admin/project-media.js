window.ProjectMedia={mount(parent,data,{api,changed,busy}){
  const make=(tag,text)=>{const n=document.createElement(tag);if(text)n.textContent=text;return n;};
  let pending=0;
  for(const [key,title,multiple]of [['image','대표 사진',false],['gallery','추가 사진',true]]){
    let urls=multiple?String(data[key]||'').split('\n').filter(Boolean):data[key]?[data[key]]:[];
    const section=make('section');section.className='edit-section';section.append(make('h3',title));
    const value=make('input');value.type='hidden';value.name=key;
    const list=make('div');list.className='toolbar';
    function draw(){value.value=urls.join('\n');list.replaceChildren();for(const [i,url]of urls.entries()){
      const card=make('div'),img=make('img');img.className='image-preview';img.alt=title;try{const u=new URL(url,location.origin);if(u.protocol==='https:'||u.origin===location.origin)img.src=u.href;}catch{}
      const remove=make('button','사진 빼기');remove.className='btn';remove.type='button';remove.onclick=()=>{if(pending)return;urls.splice(i,1);draw();changed();};card.append(img,remove);list.append(card);
    }}
    const label=make('label',title+' 파일 첨부 (JPG·PNG·WebP / 파일당 10MB 이하)'),input=make('input');input.type='file';input.accept='image/jpeg,image/png,image/webp';input.multiple=multiple;label.append(input);
    input.onchange=async()=>{const files=[...input.files];if(!files.length)return;pending++;busy(1);input.disabled=true;try{for(const file of files){const url=await api.upload(file);if(multiple)urls.push(url);else urls=[url];draw();changed('사진을 올렸습니다. 변경 내용 저장을 눌러주세요.');}}catch(e){changed(e.message);}finally{pending--;busy(-1);input.disabled=false;input.value='';}};
    section.append(value,list,label);parent.append(section);draw();
  }
}};
