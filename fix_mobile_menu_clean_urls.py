#!/usr/bin/env python3
"""
Script to update mobile menu links to clean URLs after fixing duplicates
"""

import re
from pathlib import Path

def fix_mobile_menu_urls(file_path):
    """Fix mobile menu URLs to use clean URLs"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Check if this is a ficha técnica (different path structure)
        if '../' in content and 'fichas-tecnicas' in str(file_path):
            # For ficha técnicas, remove .html from mobile menu links
            replacements = [
                (r'href="../nosotros\.html"', 'href="../nosotros"'),
                (r'href="../ayuda\.html"', 'href="../ayuda"'),
                (r'href="../catalogo\.html"', 'href="../catalogo"'),
                (r'href="../contacto\.html"', 'href="../contacto"'),
            ]
        else:
            # For main pages, remove .html from mobile menu links
            replacements = [
                (r'href="nosotros\.html"', 'href="nosotros"'),
                (r'href="ayuda\.html"', 'href="ayuda"'),
                (r'href="catalogo\.html"', 'href="catalogo"'),
                (r'href="contacto\.html"', 'href="contacto"'),
                (r'href="index\.html"', 'href="index"'),
            ]

        changes_made = False
        for old_pattern, new_pattern in replacements:
            if re.search(old_pattern, content):
                content = re.sub(old_pattern, new_pattern, content)
                changes_made = True

        if changes_made:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Fixed mobile menu URLs in {file_path}")
            return True
        else:
            print(f"⚠️  No mobile menu URLs to fix in {file_path}")
            return False

    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")
        return False

def main():
    """Fix mobile menu URLs in all files"""

    base_dir = Path("/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD")

    print("🔧 Fixing mobile menu URLs to clean URLs...")
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

    print("\n📄 Fixing main pages...")
    main_success = 0
    for page in main_pages:
        file_path = base_dir / page
        if file_path.exists():
            if fix_mobile_menu_urls(file_path):
                main_success += 1

    # Ficha técnicas
    print(f"\n🌱 Fixing fichas técnicas...")
    fichas_dir = base_dir / 'fichas-tecnicas'
    ficha_success = 0

    if fichas_dir.exists():
        plant_files = list(fichas_dir.glob("plant-*.html"))
        for file_path in sorted(plant_files):
            if fix_mobile_menu_urls(file_path):
                ficha_success += 1

    print(f"\n✅ Results:")
    print(f"   📄 Main pages: {main_success}/{len(main_pages)}")
    print(f"   🌱 Ficha técnicas: {ficha_success}")

    if main_success > 0 or ficha_success > 0:
        print(f"\n🎉 ¡Mobile menu URLs updated to clean URLs!")
    else:
        print(f"\n⚠️  No URLs were updated")

if __name__ == "__main__":
    main()