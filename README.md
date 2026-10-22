# Luma Fios Especiais — Site completo (versão 3)

Site multi-página, feito em HTML, CSS e JavaScript puro, sem precisar de WordPress ou dependências de servidor para navegar, consultar fios e usar ferramentas.

## Prévia imediata

Abra **`index.html`** no navegador (ou execute `python -m http.server 8000` dentro desta pasta e abra http://localhost:8000).

A estrutura usa caminhos relativos e funciona em raiz do domínio ou subpasta (`/lumafios/`).

## Personalizar os canais oficiais

Abra `assets/config.js` e cadastre WhatsApp (`5519...`), e-mail, telefone, horário, cidade e endereço (se quiser torná-lo público). Nenhum contato fictício foi colocado.

O formulário **não transmite dados** em hospedagem estática comum. Quando preenchido, cria uma mensagem copiável e, se configurados, abre WhatsApp ou e-mail para envio pelo próprio visitante. O visitante recebe aviso explícito de que o texto apenas foi preparado.

## Para receber formulários de verdade (Netlify)

1. Coloque os arquivos no Netlify pelo painel de Deploy (pasta deste projeto, não apenas o `index.html`).
2. Ative **Forms** no seu site Netlify; a configuração de formulários pode variar conforme o plano.
3. Altere `hosting: "static"` para `hosting: "netlify"` em `assets/config.js`.
4. Faça novo deploy. Teste enviando uma mensagem real no endereço HTTPS publicado e confira se ela aparece no painel de Forms e se as notificações estão configuradas.
5. O site já tem formulário HTML Netlify reconhecível: `name="contato-luma"`, `data-netlify="true"`, campo `form-name` e honeypot. Quando implantado no Netlify, o envio é feito por HTTP para o caminho da página.
6. Revise a política de privacidade e a retenção de dados, configure notificações e proteção de spam.

**GitHub Pages:** não suporta recebimento de formulário no servidor. Neste caso os modos de WhatsApp, mailto e cópia funcionam, mas será necessário conectar outro provedor para submissões automáticas.

## Fotografias e identidade visual

As áreas visuais são marcações deliberadas para fotos reais, e o cone da home é uma **ilustração CSS**, não foto da fábrica. Troque os blocos `.photo-slot` por imagens reais próprias com descrição `alt`, `loading="lazy"`, dimensões e formatos leves (WebP/AVIF). Troque símbolo `L` pelo logo aprovado se aplicável.

## SEO

O site tem títulos, meta descriptions, tags para compartilhamento e dados estruturados em conteúdos selecionados. Links usam URLs locais relativas; quando souber o domínio execute:

`python scripts/gerar_sitemap.py https://www.seudominio.com.br/`

Esse comando gera `sitemap.xml` e `robots.txt` com a URL absoluta correta. Depois publique e envie o sitemap ao Search Console.

Páginas de produtos com informações incompletas podem estar marcadas `noindex`, para impedir divulgação prematura de fichas incompletas. Revise antes da indexação.

## Estrutura

- `index.html`: página inicial.
- `empresa/`: apresentação institucional.
- `fios/`: catálogo e fichas individuais.
- `servicos/`: retorção e tingimento.
- `desenvolvimento-de-fios/`: briefing e etapas.
- `biblioteca/`: índice e seis artigos técnicos.
- `ferramentas/`: conversor e gerador de briefing.
- `perguntas-frequentes/`, `contato/`, `privacidade/`, `termos/`.
- `assets/`: CSS, JavaScript, identidade visual e contatos.
- `docs/`: checklist e dados a validar.

## Ressalvas

Informações de produtos derivam do material anterior e de dados de trabalho, sem consulta a fichas oficiais assinadas. Não foram inventados certificados, resultados medidos, equipamentos, depoimentos ou contatos. Serviços a terceiros devem ser confirmados. Antes da publicação, revise as alegações e imagens com a equipe.

