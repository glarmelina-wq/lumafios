
function tituloTex(value,unit='Nm'){
 const s=String(value).trim().replace(',','.');
 const parts=s.split('/').map(Number);let n=parts.length===2?parts[1]/parts[0]:Number(s);
 if(!Number.isFinite(n)||n<=0||parts.some(x=>!Number.isFinite(x)||x<=0)||parts.length>2||(unit!=='Nm'&&parts.length>1))throw Error('Título inválido. Use 2/29 em Nm ou um valor positivo em Tex.');
 if(!['Nm','Tex'].includes(unit))throw Error('Unidade inválida');
 return unit==='Nm'?1000/n:n;
}
function combinar(linhas){let tex=0;for(const l of linhas){if(!Number.isInteger(l.q)||l.q<1)throw Error('Quantidade inteira positiva necessária');tex+=l.q*tituloTex(l.t,l.u);}if(!tex)throw Error('Informe pelo menos uma linha');return {tex,nm:1000/tex,dtex:tex*10};}
function consumo(t,u,g,n,p,c){const tex=tituloTex(t,u);if(!Number.isFinite(g)||g<=0||!Number.isInteger(n)||n<1||!Number.isFinite(p)||p<0||p>=100||!Number.isFinite(c)||c<=0)throw Error('Confira peso, quantidade, perdas (0 a menos de 100%) e peso líquido do cone');const net=g*n/1000,kg=net/(1-p/100);return {mkg:1e6/tex,kg,cones:Math.ceil(kg/c),metrosCone:c*1e6/tex};}
if(typeof document!=='undefined'){
 const fmt=n=>n.toLocaleString('pt-BR',{maximumFractionDigits:2});
 document.getElementById('mixCalc')?.addEventListener('submit',e=>{e.preventDefault();const out=document.getElementById('mixResult');try{const lines=document.getElementById('mixLines').value.trim().split(/\n+/).map(l=>{const [q,t,u]=l.split(';').map(x=>x.trim());return {q:Number(q),t,u};});const r=combinar(lines);out.textContent=fmt(r.tex)+' Tex | '+fmt(r.dtex)+' dtex | '+fmt(r.nm)+' Nm resultante. Resultado teórico, sem encurtamento de retorção. Não define galga ideal: consulte o tear e teste a estrutura.';}catch(err){out.textContent=err.message;}});
 document.getElementById('lotCalc')?.addEventListener('submit',e=>{e.preventDefault();const v=id=>document.getElementById(id).value,out=document.getElementById('lotResult');try{const r=consumo(v('lotTitle'),v('lotUnit'),Number(v('lotWeight')),Number(v('lotCount')),Number(v('lotLoss')),Number(v('coneWeight')));out.textContent=fmt(r.mkg)+' m/kg | '+fmt(r.metrosCone)+' m/cone | '+fmt(r.kg)+' kg para programar | '+r.cones+' cones inteiros. Perdas como fração do insumo: kg líquidos ÷ (1 − perda/100). Peso da peça deve corresponder ao fio calculado; exclua aviamentos e outros fios.';}catch(err){out.textContent=err.message;}});
}
if(typeof module!=='undefined')module.exports={tituloTex,combinar,consumo};
