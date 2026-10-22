#!/usr/bin/env python3
"""Uso: python scripts/gerar_sitemap.py https://www.exemplo.com.br/"""
import sys,html
from pathlib import Path
from urllib.parse import urlsplit
if len(sys.argv)!=2:raise SystemExit('Uso: python scripts/gerar_sitemap.py https://seu-dominio.com/')
base=sys.argv[1].rstrip('/')+'/'
parts=urlsplit(base)
if parts.scheme!='https' or not parts.netloc:raise SystemExit('Use uma URL HTTPS completa.')
root=Path(__file__).resolve().parents[1]
urls=[]
for p in sorted(root.rglob('index.html')):
 rel=p.parent.relative_to(root)
 # Honor noindex in generated sitemap
 content=p.read_text(encoding='utf-8')
 if 'name="robots" content="noindex' in content:continue
 url=base+(rel.as_posix().strip('/')+'/' if str(rel)!='.' else '')
 urls.append('  <url><loc>'+html.escape(url)+'</loc></url>')
(root/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+'\n'.join(urls)+'\n</urlset>\n',encoding='utf-8')
(root/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: '+base+'sitemap.xml\n',encoding='utf-8')
print('Geradas URLs para',len(urls),'páginas em',base)

