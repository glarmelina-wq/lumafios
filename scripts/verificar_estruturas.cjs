const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'ferramentas/index.html'), 'utf8');
const fields = {};
for (const id of ['galgaShima','estruturaPonto','processoMalha','aplicacaoMalha','resultadoGalga','sistemaOrigem','numCabos','valorTitulo','resultadoTitulo']) fields[id] = { value: '', style: {}, innerHTML: '' };
const ctx = vm.createContext({ window: {}, document: {getElementById: id => fields[id]} });
for (const f of fs.readdirSync(path.join(root,'assets')).filter(f => f.endsWith('.js'))) new vm.Script(fs.readFileSync(path.join(root,'assets',f),'utf8'), {filename:f});
vm.runInContext(fs.readFileSync(path.join(root,'assets/estruturas.js'),'utf8'),ctx);
vm.runInContext(fs.readFileSync(path.join(root,'assets/calculadoras.js'),'utf8'),ctx);
const keys = Object.keys(ctx.window.LUMA_ESTRUTURAS);
assert.equal(keys.length,8);
for(const id of ['estruturaPonto','briefStructure']){
  const block=html.match(new RegExp('<select id="'+id+'">([\\s\\S]*?)</select>'))[1];
  for(const item of Object.values(ctx.window.LUMA_ESTRUTURAS)) assert(block.includes(item.nome), id+': '+item.nome);
}
let count=0;
for(const galga of ['5','7','10','12','14','16','18']) for(const key of keys) for(const processo of ['paineis','peca-pronta']) for(const aplicacao of ['moda','cabedal','tecnica']){
  fields.galgaShima.value=galga;fields.estruturaPonto.value=key;fields.processoMalha.value=processo;fields.aplicacaoMalha.value=aplicacao;
  ctx.recomendarPorGalga();const out=fields.resultadoGalga.innerHTML;
  assert(out.includes(ctx.window.LUMA_ESTRUTURAS[key].nota));
  assert(out.includes('Galga '+galga));assert(!out.includes('undefined'));
  if(processo==='peca-pronta')assert(out.includes('Peça Pronta (WHOLEGARMENT)'));
  if(aplicacao!=='moda'){assert(out.includes('nenhum item de linha está qualificado automaticamente'));assert(!out.includes('faixa indicativa para ensaio em vestuário:'));}
  count++;
}
fields.galgaShima.value='999';ctx.recomendarPorGalga();assert(fields.resultadoGalga.innerHTML.includes('Selecione uma galga'));
fields.galgaShima.value='12';fields.estruturaPonto.value='inválida';ctx.recomendarPorGalga();assert(fields.resultadoGalga.innerHTML.includes('Selecione uma galga'));
for(const [unit,value,plies,result] of [['nm',29,2,'690 dtex'],['nm',34,1,'294 dtex'],['tex',50,1,'500 dtex'],['dtex',500,2,'1000 dtex'],['den',450,1,'500 dtex'],['ne',30,2,'394 dtex']]){
 fields.sistemaOrigem.value=unit;fields.valorTitulo.value=value;fields.numCabos.value=plies;ctx.converterTitulo();assert(fields.resultadoTitulo.innerHTML.includes(result));
}
const site=fs.readFileSync(path.join(root,'assets/site.js'),'utf8');
assert(site.includes("'Processo: '+val('#briefProcess')"));assert(site.includes("'Aplicação: '+val('#briefApplication')"));
console.log(`${count} combinações de galga/estrutura/processo/aplicação, 2 seleções inválidas e 6 conversões verificadas. JavaScript válido.`);
