#!/usr/bin/env python3
"""
Script to update existing native status badges text from emoji to proper text
"""

import re
from pathlib import Path

def update_badge_text_in_file(file_path):
    """Update badge text in a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Replace emoji badges with text badges
        replacements = [
            # Native badge
            (r'🌿 Nativa', 'Especie nativa'),
            # Introduced badge
            (r'🌍 Introducida', 'Especie introducida'),
        ]

        changes_made = False
        for old_text, new_text in replacements:
            if old_text in content:
                content = content.replace(old_text, new_text)
                changes_made = True

        if changes_made:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Updated badge text in {file_path}")
            return True
        else:
            print(f"⚠️  No badge changes needed in {file_path}")
            return False

    except Exception as e:
        print(f"❌ Error updating {file_path}: {e}")
        return False

def main():
    """Main function to update all ficha técnicas"""
    print("📝 Updating native status badge text...")
    print("🔄 Changing from emoji badges to text badges")
    print("=" * 50)

    base_dir = Path("/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD")
    fichas_dir = base_dir / 'fichas-tecnicas'

    success_count = 0
    total_count = 0

    if fichas_dir.exists():
        plant_files = list(fichas_dir.glob("plant-*.html"))
        total_count = len(plant_files)

        for file_path in sorted(plant_files):
            if update_badge_text_in_file(file_path):
                success_count += 1

    print(f"\n✅ Results:")
    print(f"   📄 Files updated: {success_count}/{total_count}")

    if success_count > 0:
        print(f"\n🎉 ¡Badge text updated!")
        print(f"   📝 Now shows 'Especie nativa' instead of '🌿 Nativa'")
        print(f"   📝 Now shows 'Especie introducida' instead of '🌍 Introducida'")
    else:
        print(f"\n⚠️  No files were updated")

if __name__ == "__main__":
    main()