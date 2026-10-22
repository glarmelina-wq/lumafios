
        function converterTitulo() {
            const sistema = document.getElementById('sistemaOrigem').value;
            const cabos = Number(document.getElementById('numCabos').value);
            const valor = Number(document.getElementById('valorTitulo').value);
            const resDiv = document.getElementById('resultadoTitulo');

            if (!Number.isFinite(valor) || valor <= 0 || !Number.isInteger(cabos) || cabos < 1 || cabos > 10) {
                resDiv.style.display = 'block';
                resDiv.innerHTML = '<strong>Atenção:</strong> Digite um título maior que zero e uma quantidade inteira de cabos entre 1 e 10.';
                return;
            }

            let dtexResultante = 0;
            let nmResultante = 0;

            // Cálculo para chegar ao dtex resultante (considerando o número de cabos)
            // Obs: Em sistemas indiretos (Nm, Ne), mais cabos = fio mais grosso (divide o título pelos cabos).
            // Em sistemas diretos (dtex, Tex, Denier), mais cabos = fio mais grosso (multiplica o título pelos cabos).
            if (sistema === 'nm') {
                nmResultante = valor / cabos;
                dtexResultante = 10000 / nmResultante;
            } else if (sistema === 'ne') {
                const nmBase = valor * 1.693;
                nmResultante = nmBase / cabos;
                dtexResultante = 10000 / nmResultante;
            } else if (sistema === 'dtex') {
                dtexResultante = valor * cabos;
                nmResultante = 10000 / dtexResultante;
            } else if (sistema === 'tex') {
                dtexResultante = (valor * 10) * cabos;
                nmResultante = 10000 / dtexResultante;
            } else if (sistema === 'den') {
                dtexResultante = (valor * (10 / 9)) * cabos;
                nmResultante = 10000 / dtexResultante;
            }

            const texResultante = dtexResultante / 10;
            const denResultante = dtexResultante * 0.9;
            const neResultante = nmResultante / 1.693;

            // Lógica de Sugestão de Galga (incluindo exemplos múltiplos de cabos como 500 dtex -> GG 12 1 cabo, GG 10 2 cabos, GG 7 3 cabos)
            let sugestaoGalga = '';
            if (dtexResultante <= 280) {
                sugestaoGalga = '<strong>Galga 16 ou Galga 18</strong> (1 cabo) | <strong>Galga 14</strong> (com 2 cabos) | <strong>Galga 12</strong> (com 3 cabos).';
            } else if (dtexResultante <= 420) {
                sugestaoGalga = '<strong>Galga 14</strong> (1 cabo) | <strong>Galga 12</strong> (com 1 a 2 cabos) | <strong>Galga 10</strong> (com 2 cabos) | <strong>Galga 7</strong> (com 3 a 4 cabos).';
            } else if (dtexResultante <= 600) {
                sugestaoGalga = '<strong>Galga 12</strong> (1 cabo) | <strong>Galga 10</strong> (com 2 cabos) | <strong>Galga 7</strong> (com 3 cabos) | <strong>Galga 5</strong> (com 5 a 6 cabos).';
            } else if (dtexResultante <= 850) {
                sugestaoGalga = '<strong>Galga 10</strong> (1 cabo) | <strong>Galga 7</strong> (com 2 cabos) | <strong>Galga 5</strong> (com 3 a 4 cabos).';
            } else if (dtexResultante <= 1400) {
                sugestaoGalga = '<strong>Galga 7</strong> (1 cabo) | <strong>Galga 5</strong> (com 2 a 3 cabos).';
            } else {
                sugestaoGalga = '<strong>Galga 5 ou Galga 3</strong> (Tricô pesado / 1 ou mais cabos conforme estrutura).';
            }

            resDiv.style.display = 'block';
            resDiv.innerHTML = `
                <div style="margin-bottom: 0.75rem; font-size: 1.05rem;"><strong>Resultado Final do Fio (${cabos} cabo/s):</strong></div>
                <ul style="list-style: none; margin-bottom: 1rem; line-height: 1.8;">
                    <li>• <strong>dtex Resultante:</strong> ${dtexResultante.toFixed(0)} dtex</li>
                    <li>• <strong>Nm Resultante:</strong> ${nmResultante.toFixed(2)} Nm <em>(Equivalente a ${cabos}/${(nmResultante * cabos).toFixed(0)} Nm)</em></li>
                    <li>• <strong>Tex Resultante:</strong> ${texResultante.toFixed(1)} Tex</li>
                    <li>• <strong>Denier Resultante:</strong> ${denResultante.toFixed(0)} Den</li>
                    <li>• <strong>Ne (Algodão) Resultante:</strong> ${neResultante.toFixed(2)} Ne</li>
                </ul>
                <div style="background: #ffffff; padding: 0.85rem; border-radius: 6px; border: 1px solid #f59e0b;">
                    <strong>⚙️ Referência de Galga Shima Seiki (baseado em ${dtexResultante.toFixed(0)} dtex):</strong><br>
                    Referências para ensaio de tecimento: ${sugestaoGalga}
                </div>
            `;
        }

        function recomendarPorGalga() {
            const galga = document.getElementById('galgaShima').value;
            const estrutura = document.getElementById('estruturaPonto').value;
            const resDiv = document.getElementById('resultadoGalga');

            const dadosGalga = {
                '5': {
                    faixaNm: 'Nm 3.5 a Nm 6.0 resultante',
                    faixaDtex: '1.650 dtex a 2.850 dtex total na agulha',
                    fiosLuma: 'Utilizar <strong>3 a 4 cabos</strong> do <em>Minas Lã Stretch (2/29 Nm)</em> ou <strong>3 cabos</strong> do <em>Nevada (18 Nm)</em>. Consulte a equipe sobre a viabilidade da aplicação.'
                },
                '7': {
                    faixaNm: 'Nm 6.0 a Nm 10.0 resultante',
                    faixaDtex: '1.000 dtex a 1.650 dtex total na agulha',
                    fiosLuma: 'Utilizar <strong>2 a 3 cabos</strong> do <em>Minas Lã Stretch (2/29 Nm)</em>, <strong>2 cabos</strong> do <em>Nevada (18 Nm)</em> ou <strong>3 cabos</strong> do <em>Dicotone (2/34 Nm)</em>.'
                },
                '10': {
                    faixaNm: 'Nm 10.0 a Nm 13.5 resultante',
                    faixaDtex: '740 dtex a 1.000 dtex total na agulha',
                    fiosLuma: 'Excelente com <strong>1 a 2 cabos</strong> do <em>Minas Lã Stretch (2/29 Nm)</em>, <strong>2 cabos</strong> do <em>Catavento (2/34 Nm)</em> ou <strong>1 cabo</strong> do <em>Nevada (18 Nm)</em> em ponto estruturado.'
                },
                '12': {
                    faixaNm: 'Nm 14.0 a Nm 19.0 resultante',
                    faixaDtex: '520 dtex a 710 dtex total na agulha',
                    fiosLuma: 'Nossa especialidade com <strong>1 cabo</strong> direto: <em>Minas Lã Stretch (2/29 Nm = 690 dtex)</em>, <em>Stretch Light (2/29 Nm)</em>, <em>Catavento (2/34 Nm = 588 dtex)</em>, <em>Dicotone (2/34 Nm)</em> ou <em>Vem Verão (2/38 Nm = 526 dtex)</em>.'
                },
                '14': {
                    faixaNm: 'Nm 18.0 a Nm 24.0 resultante',
                    faixaDtex: '415 dtex a 550 dtex total na agulha',
                    fiosLuma: 'Ideal com <strong>1 cabo</strong> do <em>Vem Verão (2/38 Nm)</em>, <strong>1 cabo</strong> do <em>Rayonflex (2/40 Nm = 500 dtex)</em> ou <strong>1 cabo</strong> do <em>Fashion Raion (2/50 Nm = 400 dtex)</em>.'
                },
                '16': {
                    faixaNm: 'Nm 24.0 a Nm 34.0 resultante',
                    faixaDtex: '290 dtex a 415 dtex total na agulha',
                    fiosLuma: 'Recomendado <strong>1 cabo</strong> do <em>Fashion Raion (2/50 Nm = 400 dtex)</em> ou <strong>1 cabo</strong> do <em>Tocapele (1/34 Nm = 294 dtex)</em> para malhas finíssimas de alta costura.'
                },
                '18': {
                    faixaNm: 'Nm 32.0 a Nm 45.0 resultante',
                    faixaDtex: '220 dtex a 310 dtex total na agulha',
                    fiosLuma: 'Recomendado <strong>1 cabo</strong> do <em>Tocapele (1/34 Nm = 294 dtex)</em> ou desenvolvimento sob medida em nosso laboratório (P&D) com Micro Modal e Poliamida 6.6 ultrafina.'
                }
            };

            const definicao = (window.LUMA_ESTRUTURAS || {})[estrutura];
            const info = dadosGalga[galga];
            resDiv.style.display = 'block';
            if (!info || !definicao) {
                resDiv.innerHTML = '<strong>Atenção:</strong> Selecione uma galga e uma estrutura válidas.';
                return;
            }
            const processo = document.getElementById('processoMalha')?.value || 'paineis';
            const aplicacao = document.getElementById('aplicacaoMalha')?.value || 'moda';
            const especial = aplicacao !== 'moda';
            const notaProcesso = processo === 'peca-pronta'
                ? 'Peça Pronta (WHOLEGARMENT): confirme modelo, configuração das fronturas, programação e fio nas regiões de união e transferência. O processo pode combinar diferentes estruturas; não determina sozinho o título.'
                : 'Painéis para montagem: avalie bordas, medidas relaxadas e compatibilidade entre as partes antes da montagem.';
            const notaAplicacao = aplicacao === 'cabedal'
                ? 'Cabedais: validar abrasão, flexão, fixação ao solado, ajuste e eventuais fios de fusão. A tabela de moda não qualifica um fio para calçados.'
                : aplicacao === 'tecnica'
                ? 'Malhas técnicas: partir dos requisitos do uso, dos materiais, dos ensaios e das normas aplicáveis. Fio de moda não é automaticamente adequado a EPI, proteção térmica ou reforço estrutural.'
                : 'Vestuário: avaliar toque, cobertura, gramatura, medidas após acabamento e recuperação na estrutura escolhida.';
            const notaEstrutura = definicao.nota;
            resDiv.innerHTML = `
                <div style="margin-bottom: 0.6rem; font-size: 1.05rem;"><strong>Orientação inicial para Shima Seiki Galga ${galga}:</strong></div>
                ${especial ? '<p><strong>Avaliação específica necessária:</strong> não há faixa automática de título ou fio de moda aprovado para esta aplicação.</p>' : `<p>• <strong>Faixa indicativa para ensaio em vestuário:</strong> ${info.faixaNm}</p>`}
                <p style="margin-bottom: 0.8rem;">• <strong>Densidade Linear Equivalente:</strong> ${especial ? "Não definida automaticamente para esta aplicação" : info.faixaDtex}</p>
                <div style="background: #ffffff; padding: 0.85rem; border-radius: 6px; border: 1px solid #f59e0b; margin-bottom: 0.6rem;">
                    <strong>🧶 Fios de linha para avaliação inicial:</strong><br>${especial ? "Solicite avaliação do projeto e da matéria-prima; nenhum item de linha está qualificado automaticamente para esta aplicação." : info.fiosLuma}
                </div>
                <p style="font-size: 0.88rem; color: #475569;"><strong>${definicao.nome} — ${definicao.tipo}:</strong> ${notaEstrutura}</p><p>${notaProcesso}</p><p>${notaAplicacao}</p><p><strong>Validação:</strong> as faixas por galga não mudam por um multiplicador automático de estrutura. Confirme a amostra no tear e após acabamento. <a href="../biblioteca/pontos-e-estruturas-de-malharia-retilinea/">Ler guia de estruturas ↗</a></p>
            `;
        }
    