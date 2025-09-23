#!/usr/bin/env python3
"""
Script to add missing "Ayuda" navigation option to all ficha técnicas.
The main site has "Ayuda" but it's missing from all ficha técnicas.
"""

import os
import re
from pathlib import Path

def add_ayuda_to_ficha_tecnica(file_path):
    """Add Ayuda link to ficha técnica navbar after Nosotros"""

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Pattern to find the Nosotros link and add Ayuda after it
        # Looking for: <a class="nav-link" href="../nosotros.html">Nosotros</a>
        # And we want to add Ayuda after it, before Catálogo

        pattern = r'(<a class="nav-link" href="\.\./nosotros\.html">\s*Nosotros\s*</a>)'

        replacement = r'\1\n     <a class="nav-link" href="../ayuda.html">\n      Ayuda\n     </a>'

        updated_content = re.sub(pattern, replacement, content, flags=re.IGNORECASE | re.MULTILINE)

        # Check if replacement was made
        if updated_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            print(f"✅ Added Ayuda link to {file_path}")
            return True
        else:
            print(f"⚠️  No Nosotros link found in {file_path}")
            return False

    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")
        return False

def main():
    """Add Ayuda navigation option to all ficha técnicas"""

    fichas_dir = Path("/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD/fichas-tecnicas")

    if not fichas_dir.exists():
        print(f"❌ Directory {fichas_dir} not found!")
        return

    # Find all plant-*.html files
    plant_files = list(fichas_dir.glob("plant-*.html"))

    if not plant_files:
        print("❌ No plant-*.html files found!")
        return

    print(f"📁 Found {len(plant_files)} ficha técnica files")
    print("🔧 Adding Ayuda navigation option...")

    success_count = 0

    for file_path in sorted(plant_files):
        if add_ayuda_to_ficha_tecnica(file_path):
            success_count += 1

    print(f"\n✅ Successfully updated {success_count}/{len(plant_files)} files")

    if success_count == len(plant_files):
        print("🎉 All ficha técnicas now have the Ayuda navigation option!")
    else:
        failed_count = len(plant_files) - success_count
        print(f"⚠️  {failed_count} files may need manual review")

if __name__ == "__main__":
    main()