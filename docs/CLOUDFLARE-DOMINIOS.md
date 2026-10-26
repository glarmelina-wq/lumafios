# Hospedagem e domínios
Cloudflare não está acessível pelas ferramentas desta conversa; não houve implantação na conta.

## Pages com GitHub
Workers & Pages > criar aplicativo > Pages > importar Git existente. Selecione glarmelina-wq/lumafios, branch main, sem framework. Build: python scripts/build_cloudflare.py. Saída: dist. A primeira publicação recebe um endereço pages.dev. O script usa CF_PAGES_URL para atualizar canonical, schema, sitemap e llms no build, preservando o GitHub Pages no código. Ao configurar o domínio oficial, defina SITE_URL com sua URL HTTPS completa e publique novamente.

## lumafios.com e lumafios.com.br
1. Confirme quem é o registrador e quem mantém o DNS atual de cada domínio. Pagar pelo Workspace não identifica sozinho o registrador.
2. Antes de trocar nameservers, exporte todos os registros DNS atuais, incluindo MX, SPF, DKIM, DMARC e verificações. Copie-os e confira na Cloudflare; não confie só na importação automática. Coordene DNSSEC/DS com o registrador para evitar falha na mudança.
3. No Pages, associe o domínio em Custom domains. Para a raiz do domínio, adicione a zona à Cloudflare e configure os nameservers atribuídos no registrador. Para um subdomínio, siga a configuração CNAME solicitada pelo Pages. Só acrescente DNS depois de associar o hostname ao projeto.
4. Não altere os MX do .com que já recebe e-mail. Registros de correio permanecem DNS-only onde aplicável. Não ative Email Routing para substituir o Workspace.
5. Se quiser os mesmos usuários e caixas nos dois domínios, no Admin Console do Workspace > Conta > Domínios > Gerenciar domínios, adicione .com.br como domínio de alias de usuário, verifique propriedade e configure os MX fornecidos pelo assistente. Para contas independentes, escolha domínio secundário. Não é preciso trocar o domínio principal.
6. Configure SPF (sem criar dois registros SPF no mesmo nome), DKIM e DMARC do .com.br com os dados do Workspace; não invente os seletores ou chaves. Teste envio e recebimento externos nos dois domínios.
7. Escolha um único endereço oficial do site; associe www e o outro domínio e configure redirecionamento. Defina SITE_URL, revise canonical/sitemap e envie o sitemap ao Search Console/Bing.

Fontes: https://developers.cloudflare.com/pages/configuration/custom-domains/ ; https://developers.cloudflare.com/pages/framework-guides/deploy-anything/ ; https://knowledge.workspace.google.com/admin/domains/add-a-user-alias-domain-or-secondary-domain?hl=pt-br
