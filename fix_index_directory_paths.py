#!/usr/bin/env python3

import re
from pathlib import Path

def fix_index_directory_paths():
    """Fix all asset paths in index/index.html to work from subdirectory"""

    base_dir = Path(__file__).parent
    index_file = base_dir / 'index' / 'index.html'

    if not index_file.exists():
        print("❌ index/index.html not found")
        return

    print(f"Processing {index_file}")

    with open(index_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix asset paths: add ../ prefix to relative paths
    # Fix CSS and JS includes
    content = re.sub(r'href="((?!http|#|\.\./)[^"]*\.css[^"]*)"', r'href="../\1"', content)
    content = re.sub(r'src="((?!http|#|\.\./)[^"]*\.js[^"]*)"', r'src="../\1"', content)

    # Fix image sources
    content = re.sub(r'src="((?!http|#|\.\./)[^"]*\.(jpg|jpeg|png|gif|svg|mp4)[^"]*)"', r'src="../\1"', content)

    # Fix navigation links to other pages
    content = re.sub(r'href="((?!http|#|\.\./)[^"]*)"(?![^<]*</a>)', r'href="../\1"', content)

    # Fix specific navigation links that should stay relative
    # Fix links to other sections (nosotros, ayuda, etc.)
    content = re.sub(r'href="\.\./nosotros"', r'href="../nosotros/"', content)
    content = re.sub(r'href="\.\./ayuda"', r'href="../ayuda/"', content)
    content = re.sub(r'href="\.\./contacto"', r'href="../contacto/"', content)
    content = re.sub(r'href="\.\./catalogo"', r'href="../catalogo/"', content)

    # Fix self-reference (logo and index links should point to index/)
    content = re.sub(r'href="\.\./index"', r'href="../index/"', content)

    # Fix anchor links to stay on same page
    content = re.sub(r'href="\.\.\/#([^"]*)"', r'href="#\1"', content)

    with open(index_file, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"✅ Fixed paths in {index_file}")

if __name__ == '__main__':
    fix_index_directory_paths()
    print("🎉 Index directory paths fixed!")