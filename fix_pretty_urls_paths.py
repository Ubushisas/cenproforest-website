#!/usr/bin/env python3
"""
Script to fix all internal paths in the pretty URLs structure
to make them work properly from their new locations.
"""

import os
import re
from pathlib import Path

def fix_main_page_paths(file_path, page_type="main"):
    """Fix paths in main pages (moved one level deeper)"""

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Fix asset paths (need ../ prefix)
        content = re.sub(r'src="assets/', r'src="../assets/', content)
        content = re.sub(r'href="assets/', r'href="../assets/', content)
        content = re.sub(r'url\(assets/', r'url(../assets/', content)

        # Fix navigation links to other pages
        content = re.sub(r'href="([^"]*\.html)"', lambda m: f'href="../{m.group(1).replace(".html", "")}/"', content)
        content = re.sub(r'href="index\.html"', r'href="../"', content)

        # Fix special case for catalog link (points to itself)
        if 'catalogo' in str(file_path):
            content = re.sub(r'href="\.\./catalogo/"', r'href="./"', content)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f"✅ Fixed paths in {file_path}")
        return True

    except Exception as e:
        print(f"❌ Error fixing {file_path}: {e}")
        return False

def fix_plant_page_paths(file_path):
    """Fix paths in plant pages (moved two levels deeper)"""

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Fix asset paths (need ../../ prefix)
        content = re.sub(r'src="\.\./assets/', r'src="../../assets/', content)
        content = re.sub(r'href="\.\./assets/', r'href="../../assets/', content)
        content = re.sub(r'url\(\.\./assets/', r'url(../../assets/', content)

        # Fix navigation links
        content = re.sub(r'href="\.\./([^"]*\.html)"', lambda m: f'href="../../{m.group(1).replace(".html", "")}/"', content)
        content = re.sub(r'href="\.\./index\.html"', r'href="../../"', content)

        # Fix back to catalog links
        content = re.sub(r'href="\.\./catalogo\.html"', r'href="../../catalogo/"', content)

        # Fix JavaScript and CSS paths
        content = re.sub(r'src="\.\./js/', r'src="../../js/', content)
        content = re.sub(r'href="\.\./styles\.css"', r'href="../../styles.css"', content)
        content = re.sub(r'href="\.\./css/', r'href="../../css/', content)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f"✅ Fixed paths in {file_path}")
        return True

    except Exception as e:
        print(f"❌ Error fixing {file_path}: {e}")
        return False

def main():
    """Fix all paths in the pretty URLs structure"""

    base_dir = Path("/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD")

    print("🔧 Arreglando paths para URLs bonitas...")
    print("=" * 50)

    # Fix main pages
    main_pages = ['catalogo', 'ayuda', 'contacto', 'nosotros', 'vivero']

    print("\n📄 Arreglando páginas principales...")
    main_success = 0
    for page in main_pages:
        page_file = base_dir / page / 'index.html'
        if page_file.exists():
            if fix_main_page_paths(page_file):
                main_success += 1
        else:
            print(f"⚠️  No encontrado: {page_file}")

    # Fix plant pages
    print(f"\n🌱 Arreglando páginas de plantas...")
    plantas_dir = base_dir / 'plantas'
    plant_success = 0

    if plantas_dir.exists():
        for plant_dir in plantas_dir.iterdir():
            if plant_dir.is_dir():
                index_file = plant_dir / 'index.html'
                if index_file.exists():
                    if fix_plant_page_paths(index_file):
                        plant_success += 1

    print(f"\n✅ Resultados:")
    print(f"   📄 Páginas principales: {main_success}/{len(main_pages)}")
    print(f"   🌱 Páginas de plantas: {plant_success}")

    if main_success == len(main_pages) and plant_success > 0:
        print(f"\n🎉 ¡URLs bonitas listas!")
        print(f"   Ahora puedes probar:")
        print(f"   🏠 http://localhost:8082/")
        print(f"   📊 http://localhost:8082/catalogo/")
        print(f"   🌱 http://localhost:8082/plantas/abarco/")
        print(f"   ❓ http://localhost:8082/ayuda/")
    else:
        print(f"\n⚠️  Algunos archivos pueden necesitar revisión manual")

if __name__ == "__main__":
    main()