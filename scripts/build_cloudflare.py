"""Cloudflare Pages: python scripts/build_cloudflare.py; output dist. SITE_URL optional."""
from pathlib import Path
import os,re,shutil
root=Path(__file__).resolve().parents[1]
out=root/'dist'
out.mkdir(exist_ok=True)
base=os.environ.get('SITE_URL') or ('https://'+os.environ['CF_PAGES_URL'].split('://')[-1]+'/' if os.environ.get('CF_PAGES_URL') else 'https://glarmelina-wq.github.io/lumafios/')
base=base.rstrip('/')+'/'
old='https://glarmelina-wq.github.io/lumafios/'
for p in root.rglob('*'):
 rel=p.relative_to(root)
 if any(x in ('.git','dist','node_modules','work','outputs','docs','scripts') for x in rel.parts) or not p.is_file():continue
 if p.suffix not in ('.html','.css','.js','.svg','.xml','.txt','.webp','.png','.jpg','.jpeg','.ico'):continue
 dest=out/rel;dest.parent.mkdir(parents=True,exist_ok=True)
 if p.suffix in ('.html','.xml','.txt'):dest.write_text(p.read_text(encoding='utf-8').replace(old,base),encoding='utf-8')
 else:shutil.copyfile(p,dest)
(out/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: '+base+'sitemap.xml\n',encoding='utf-8')
print('Static site ready in dist; canonical base:',base)
