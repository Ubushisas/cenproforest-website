#!/usr/bin/env python3
"""
Script to fix duplicate mobile menu items caused by previous script
"""

import os
import re
from pathlib import Path

def fix_mobile_menu_duplicates(file_path):
    """Remove duplicate mobile menu items"""

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Find and fix mobile menu duplicates by replacing entire mobile menu content
        mobile_pattern = r'<div class="mobile-menu-content">.*?(?=<a.*?class="mobile-cta-button")'

        # Standard mobile menu for main pages
        standard_mobile = '''      <div class="mobile-menu-content">
        <a href="nosotros.html" class="mobile-nav-link">Nosotros</a>
        <a href="ayuda.html" class="mobile-nav-link">Ayuda</a>
        <a href="catalogo.html" class="mobile-nav-link">Catálogo</a>
        <a href="contacto.html" class="mobile-nav-link">Contacto</a>
        '''

        # Check if this is a ficha técnica (different path structure)
        if '../' in content and 'fichas-tecnicas' in str(file_path):
            standard_mobile = '''    <div class="mobile-menu-content">
     <a class="mobile-nav-link" href="../nosotros.html">
      Nosotros
     </a>
     <a class="mobile-nav-link" href="../ayuda.html">
      Ayuda
     </a>
     <a class="mobile-nav-link" href="../catalogo.html">
      Catálogo
     </a>
     <a class="mobile-nav-link" href="../contacto.html">
      Contacto
     </a>
     '''

        content = re.sub(mobile_pattern, standard_mobile, content, flags=re.DOTALL)

        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Fixed mobile menu duplicates in {file_path}")
            return True
        else:
            print(f"⚠️  No duplicates found in {file_path}")
            return False

    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")
        return False

def main():
    """Fix mobile menu duplicates in all files"""

    base_dir = Path("/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD")

    print("🔧 Arreglando elementos duplicados en menú móvil...")
    print("=" * 50)

    # Main pages
    main_pages = [
        'index.html',
        'catalogo.html',
        'ayuda.html',
        'contacto.html',
        'nosotros.html',
        'vivero.html'
    ]

    print("\n📄 Arreglando páginas principales...")
    main_success = 0
    for page in main_pages:
        file_path = base_dir / page
        if file_path.exists():
            if fix_mobile_menu_duplicates(file_path):
                main_success += 1

    # Ficha técnicas
    print(f"\n🌱 Arreglando fichas técnicas...")
    fichas_dir = base_dir / 'fichas-tecnicas'
    ficha_success = 0

    if fichas_dir.exists():
        plant_files = list(fichas_dir.glob("plant-*.html"))
        for file_path in sorted(plant_files):
            if fix_mobile_menu_duplicates(file_path):
                ficha_success += 1

    print(f"\n✅ Resultados:")
    print(f"   📄 Páginas principales: {main_success}/{len(main_pages)}")
    print(f"   🌱 Fichas técnicas: {ficha_success}")

    if main_success > 0 or ficha_success > 0:
        print(f"\n🎉 ¡Duplicados eliminados!")
    else:
        print(f"\n⚠️  No se encontraron duplicados")

if __name__ == "__main__":
    main()