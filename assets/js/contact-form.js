(()=>{
 'use strict';
 const form=document.getElementById('inquiry-form');if(!form)return;
 const status=document.getElementById('inquiry-status'),button=form.querySelector('button[type=submit]');
 const program=(new URLSearchParams(location.search).get('program')||'').trim().slice(0,300);
 const target=form.elements.program;
 if(program){
   target.value=program;target.defaultValue=program;target.closest('label').hidden=false;
   const lead=document.querySelector('.page-head .lead');if(lead)lead.textContent=program+'에 대해 문의합니다. 아래 양식을 작성해주세요.';
 }
 form.onsubmit=async e=>{
   e.preventDefault();if(form.elements.website.value)return;
   button.disabled=true;status.textContent='문의 접수 중…';
   try{
     const f=new FormData(form),text=String(f.get('message')).trim();
     const message=(program?'[프로그램 문의] '+program+'\n\n':'')+text;
     if(message.length>5000)throw Error('프로그램명을 포함한 문의 내용은 5,000자 이내로 입력해주세요.');
     await SiteAPI.inquiry({name:String(f.get('name')).trim(),organization:String(f.get('organization')).trim(),email:String(f.get('email')).trim(),message,consent:f.has('consent')});
     form.reset();status.textContent='문의가 접수됐습니다. 남겨주신 이메일로 답변드리겠습니다.';
   }catch(err){status.textContent='접수하지 못했습니다. '+err.message+' 이메일 문의도 이용할 수 있습니다.';}
   finally{button.disabled=false;}
 };
})();
