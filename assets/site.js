(() => {
'use strict';
const cfg=window.LUMA_CONFIG||{};
const $=(sel)=>document.querySelector(sel), $$=(sel)=>Array.from(document.querySelectorAll(sel));
const toggle=$('#menuToggle'), links=$('#navlinks');
if(toggle&&links){toggle.addEventListener('click',()=>{let state=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(state));toggle.textContent=state?'Fechar':'Menu';});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='Menu';}));}
$$('[data-year]').forEach(e=>e.textContent=String(new Date().getFullYear()));
function waUrl(text){const digits=String(cfg.whatsapp||'').replace(/\D/g,'');return digits.length>=12?'https://wa.me/'+digits+'?text='+encodeURIComponent(text):null;}
function emailUrl(subject,body){return cfg.email&&/^\S+@\S+\.\S+$/.test(cfg.email)?'mailto:'+cfg.email+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body):null;}
function fillChannels(){
 $$('[data-channel="whatsapp"]').forEach(a=>{const u=waUrl('Olá! Gostaria de informações sobre fios para malharia retilínea.'); if(u){a.href=u;a.hidden=false;}else a.hidden=true;});
 $$('[data-channel="email"]').forEach(a=>{if(emailUrl('Contato pelo site da Luma','Olá!')){a.href='mailto:'+cfg.email;a.textContent=cfg.email;a.hidden=false}else a.hidden=true;});
 $$('[data-channel="phone"]').forEach(a=>{if(cfg.phone){a.href='tel:'+cfg.phone.replace(/[^+\d]/g,'');a.textContent=cfg.phone;a.hidden=false}else a.hidden=true;});
 $$('[data-city]').forEach(e=>e.textContent=cfg.city||'Localização a confirmar');
 $$('[data-address]').forEach(e=>{if(cfg.address){e.textContent=cfg.address;e.hidden=false}else e.hidden=true;});
 $$('[data-hours]').forEach(e=>{if(cfg.hours){e.textContent=cfg.hours;e.hidden=false}else e.hidden=true;});
 $$('[data-channel-empty]').forEach(e=>e.hidden=!!(cfg.whatsapp||cfg.email||cfg.phone));
}
fillChannels();
// Filter products with diacritic-insensitive search.
const q=$('#productSearch'), list=$('#productGrid');
if(q&&list){let active='todos';const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();const apply=()=>{let total=0;$$('[data-product]').forEach(card=>{const okCat=active==='todos'||card.dataset.cat===active;const okText=norm(card.textContent).includes(norm(q.value));card.hidden=!(okCat&&okText);if(!card.hidden)total++});const no=$('#noProducts');if(no)no.style.display=total?'none':'block';};q.addEventListener('input',apply);$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{active=b.dataset.filter;$$('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));apply()}));apply();}
const fmt=(x)=>Number.isFinite(x)&&x>0?x.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2}):'—';
function calc(){const v=Number($('#titleValue')?.value);const unit=$('#titleUnit')?.value;let nm=NaN;const ply=Number($('#plyCount')?.value);const mode=$('#titleMode')?.value;
 if(v>0&&Number.isFinite(ply)&&ply>=1&&Number.isInteger(ply)){nm=unit==='Nm'?v:unit==='Tex'?1000/v:unit==='dtex'?10000/v:unit==='Den'?9000/v:unit==='Ne'?1.6934*v:NaN;if(mode==='cabo')nm/=ply;}
 const values={Nm:nm,Tex:1000/nm,dtex:10000/nm,Den:9000/nm,Ne:nm/1.6934};for(let k of Object.keys(values)){let e=$('[data-result="'+k+'"]');if(e)e.textContent=fmt(values[k]);}
 const error=$('#calcError');if(error)error.hidden=Number.isFinite(nm)&&nm>0;
}
if($('#titleValue')){$$('#titleValue,#titleUnit,#plyCount,#titleMode').forEach(x=>x.addEventListener('input',calc));calc();}
let brief='';
function briefContent(){const val=id=>$(id)?.value?.trim()||'Não informado';return ['BRIEFING — LUMA FIOS ESPECIAIS','Máquina: '+val('#briefMachine'),'Galga: '+val('#briefGauge'),'Estrutura de malha: '+val('#briefStructure'),'Processo: '+val('#briefProcess'),'Aplicação: '+val('#briefApplication'),'Fio/composição atual: '+val('#briefYarn'),'Quantidade/cor: '+val('#briefQty'),'Objetivo: '+val('#briefGoal'),'Detalhes: '+val('#briefDetails')].join('\n');}
const briefB=$('#briefMake');if(briefB)briefB.addEventListener('click',()=>{brief=briefContent();const out=$('#briefOutput');out.textContent=brief;out.hidden=false;const copy=$('#briefCopy');copy.hidden=false;const wa=$('#briefWA');if(wa){let w=waUrl(brief);wa.hidden=!w;if(w)wa.href=w;}const email=$('#briefEmail');if(email){let u=emailUrl('Briefing técnico – Luma Fios',brief);email.hidden=!u;if(u)email.href=u;}});
async function copy(text){try{await navigator.clipboard.writeText(text);return true}catch(err){return false}}
const bc=$('#briefCopy');if(bc)bc.addEventListener('click',async()=>{let ok=await copy(brief);bc.textContent=ok?'Copiado!':'Selecione o texto abaixo para copiar';if(!ok){let r=document.createRange();r.selectNodeContents($('#briefOutput'));window.getSelection().removeAllRanges();window.getSelection().addRange(r);}});
$$('[data-product-quote]').forEach(el=>el.addEventListener('click',()=>{try{sessionStorage.setItem('luma-product',el.dataset.productQuote||'')}catch(e){}}));
const contact=$('#contactForm');
if(contact){const topic=$('#contactTopic'), product=$('#contactMessage');let selected=new URLSearchParams(location.search).get('produto');try{selected=selected||sessionStorage.getItem('luma-product');sessionStorage.removeItem('luma-product')}catch(e){}if(selected){topic.value='Cotação de fio';product.value='Gostaria de informações e cotação sobre '+selected+'.\n';}
 const status=$('#contactStatus'), prepare=$('#contactSubmit');const netlify=cfg.hosting==='netlify'&&location.protocol==='https:';
 function textOf(data){return ['SOLICITAÇÃO — LUMA FIOS ESPECIAIS','Nome: '+(data.get('nome')||''),'Empresa: '+(data.get('empresa')||''),'E-mail: '+(data.get('email')||''),'Telefone: '+(data.get('telefone')||''),'Assunto: '+(data.get('assunto')||''),'Mensagem: '+(data.get('mensagem')||'')].join('\n');}
 prepare.textContent=netlify?'Enviar solicitação':'Preparar solicitação';
 contact.addEventListener('submit',async ev=>{ev.preventDefault();if(!contact.reportValidity())return;const data=new FormData(contact);if(data.get('bot-field'))return;let body=textOf(data);status.classList.add('show');status.textContent='';
 if(netlify){prepare.disabled=true;prepare.textContent='Enviando…';try{const resp=await fetch(location.pathname,{method:'POST',body:new URLSearchParams(data),headers:{'Content-Type':'application/x-www-form-urlencoded'}});if(!resp.ok)throw Error('Falha do servidor: '+resp.status);status.textContent='Solicitação enviada ao serviço de formulários do site. Nossa equipe poderá responder pelo contato informado.';contact.reset();}catch(err){status.textContent='Não foi possível confirmar o envio. Copie a solicitação abaixo e envie por um canal oficial.\n\n'+body;$('#contactCopy').hidden=false;$('#contactCopy').dataset.copy=body;}finally{prepare.disabled=false;prepare.textContent='Enviar solicitação';}return;}
 let u=waUrl(body),e=emailUrl('Solicitação pelo site – '+String(data.get('assunto')||'Contato'),body);
 status.textContent='Sua mensagem foi preparada, mas AINDA NÃO FOI ENVIADA. Use um dos canais abaixo ou copie o texto:\n\n'+body;
 const wa=$('#contactWA'),email=$('#contactEmailLink');if(wa){wa.hidden=!u;if(u)wa.href=u;}if(email){email.hidden=!e;if(e)email.href=e;}
 const cp=$('#contactCopy');cp.hidden=false;cp.dataset.copy=body;
 });
 const cp=$('#contactCopy');cp.addEventListener('click',async()=>{if(await copy(cp.dataset.copy||'')){cp.textContent='Mensagem copiada!';}else{cp.textContent='Selecione e copie a mensagem mostrada acima';}});
}
})();

