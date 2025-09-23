#!/usr/bin/env python3
"""
Script to standardize navbar across all pages:
- Remove "Inicio" from all navbars
- Standardize order: Nosotros | Ayuda | Catálogo | Contacto
- Apply to both desktop and mobile menus
"""

import os
import re
from pathlib import Path

def standardize_navbar_in_file(file_path):
    """Standardize navbar in a single file"""

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Desktop menu - standard navigation pattern
        standard_desktop_nav = '''      <div class="nav-menu desktop-menu">
        <a href="nosotros.html" class="nav-link">Nosotros</a>
        <a href="ayuda.html" class="nav-link">Ayuda</a>
        <a href="catalogo.html" class="nav-link">Catálogo</a>
        <a href="contacto.html" class="nav-link">Contacto</a>
      </div>'''

        # Mobile menu - standard navigation pattern
        standard_mobile_nav = '''      <div class="mobile-menu-content">
        <a href="nosotros.html" class="mobile-nav-link">Nosotros</a>
        <a href="ayuda.html" class="mobile-nav-link">Ayuda</a>
        <a href="catalogo.html" class="mobile-nav-link">Catálogo</a>
        <a href="contacto.html" class="mobile-nav-link">Contacto</a>'''

        # Replace desktop menu
        desktop_pattern = r'<div class="nav-menu desktop-menu">.*?</div>'
        content = re.sub(desktop_pattern, standard_desktop_nav, content, flags=re.DOTALL)

        # Replace mobile menu content (up to the CTA button)
        mobile_pattern = r'<div class="mobile-menu-content">.*?(?=<a.*?class="mobile-cta-button")'
        content = re.sub(mobile_pattern, standard_mobile_nav + '\n        ', content, flags=re.DOTALL)

        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Standardized navbar in {file_path}")
            return True
        else:
            print(f"⚠️  No changes needed in {file_path}")
            return False

    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")
        return False

def standardize_ficha_navbar(file_path):
    """Standardize navbar in ficha técnicas (different path structure)"""

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Desktop menu for fichas (with ../ paths)
        ficha_desktop_nav = '''    <div class="nav-menu desktop-menu">
     <a class="nav-link" href="../nosotros.html">
      Nosotros
     </a>
     <a class="nav-link" href="../ayuda.html">
      Ayuda
     </a>
     <a class="nav-link" href="../catalogo.html">
      Catálogo
     </a>
     <a class="nav-link" href="../contacto.html">
      Contacto
     </a>
    </div>'''

        # Mobile menu for fichas
        ficha_mobile_nav = '''    <div class="mobile-menu-content">
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
     </a>'''

        # Replace desktop menu
        desktop_pattern = r'<div class="nav-menu desktop-menu">.*?</div>'
        content = re.sub(desktop_pattern, ficha_desktop_nav, content, flags=re.DOTALL)

        # Replace mobile menu content
        mobile_pattern = r'<div class="mobile-menu-content">.*?(?=<a.*?class="mobile-cta-button")'
        content = re.sub(mobile_pattern, ficha_mobile_nav + '\n     ', content, flags=re.DOTALL)

        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Standardized ficha navbar in {file_path}")
            return True
        else:
            print(f"⚠️  No changes needed in {file_path}")
            return False

    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")
        return False

def main():
    """Standardize navbar across all pages"""

    base_dir = Path("/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD")

    print("🔧 Estandarizando navegación en todas las páginas...")
    print("📋 Orden estándar: Nosotros | Ayuda | Catálogo | Contacto")
    print("❌ Removiendo: Inicio")
    print("=" * 60)

    # Main pages to update
    main_pages = [
        'index.html',
        'catalogo.html',
        'ayuda.html',
        'contacto.html',
        'nosotros.html',
        'vivero.html'
    ]

    print("\n📄 Actualizando páginas principales...")
    main_success = 0
    for page in main_pages:
        file_path = base_dir / page
        if file_path.exists():
            if standardize_navbar_in_file(file_path):
                main_success += 1
        else:
            print(f"⚠️  No encontrado: {page}")

    # Ficha técnicas
    print(f"\n🌱 Actualizando fichas técnicas...")
    fichas_dir = base_dir / 'fichas-tecnicas'
    ficha_success = 0

    if fichas_dir.exists():
        plant_files = list(fichas_dir.glob("plant-*.html"))
        for file_path in sorted(plant_files):
            if standardize_ficha_navbar(file_path):
                ficha_success += 1

    print(f"\n✅ Resultados:")
    print(f"   📄 Páginas principales: {main_success}/{len(main_pages)}")
    print(f"   🌱 Fichas técnicas: {ficha_success}")

    if main_success > 0 or ficha_success > 0:
        print(f"\n🎉 ¡Navegación estandarizada!")
        print(f"   📋 Orden consistente: Nosotros | Ayuda | Catálogo | Contacto")
        print(f"   ❌ 'Inicio' removido de todos los navbars")
        print(f"   📱 Desktop y móvil actualizados")
    else:
        print(f"\n⚠️  No se realizaron cambios")

if __name__ == "__main__":
    main()