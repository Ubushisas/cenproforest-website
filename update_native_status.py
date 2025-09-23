#!/usr/bin/env python3
"""
Script to add native/introduced status to ficha técnicas and update catalog data
"""

import pandas as pd
import re
import json
from pathlib import Path

def load_native_data():
    """Load and process native/introduced data from Excel"""
    excel_path = "/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD/assets/Catalogo_Revision_Plantas_Nativas ACTUALIZACION.xlsx"

    try:
        df = pd.read_excel(excel_path)

        # Create mapping from common name to native status
        native_mapping = {}

        for _, row in df.iterrows():
            common_name = str(row['Nombre común']).strip()
            scientific_name = str(row['Nombre científico']).strip()
            native_status = str(row['Unnamed: 8']).strip()  # Last column contains NATIVO/INTRODUCIDA

            # Store by common name (primary lookup)
            native_mapping[common_name] = {
                'status': native_status,
                'scientific_name': scientific_name
            }

            # Also store by scientific name for fallback
            if scientific_name != 'nan':
                native_mapping[scientific_name] = {
                    'status': native_status,
                    'scientific_name': scientific_name
                }

        print(f"✅ Loaded {len(df)} plants from Excel")
        print(f"📊 Status distribution:")
        print(f"   🌿 NATIVO: {df['Unnamed: 8'].value_counts().get('NATIVO', 0)}")
        print(f"   🌍 INTRODUCIDA: {df['Unnamed: 8'].value_counts().get('INTRODUCIDA', 0)}")

        return native_mapping

    except Exception as e:
        print(f"❌ Error loading Excel data: {e}")
        return {}

def get_native_status_badge(status):
    """Get HTML badge for native status"""
    if status == 'NATIVO':
        return '''<span style="display: inline-block; background: #2d5016; color: white; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.85rem; font-weight: 600; margin-left: 0.5rem;">Especie nativa</span>'''
    elif status == 'INTRODUCIDA':
        return '''<span style="display: inline-block; background: #b8860b; color: white; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.85rem; font-weight: 600; margin-left: 0.5rem;">Especie introducida</span>'''
    else:
        return '''<span style="display: inline-block; background: #666; color: white; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.85rem; font-weight: 600; margin-left: 0.5rem;">No definida</span>'''

def extract_plant_info_from_ficha(file_path):
    """Extract plant common name and scientific name from ficha técnica"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Extract title (common name)
        title_match = re.search(r'<title>([^-]+)', content)
        common_name = title_match.group(1).strip() if title_match else None

        # Extract scientific name from the italic text under title
        scientific_match = re.search(r'<em>\s*([^<]+)\s*</em>', content)
        scientific_name = scientific_match.group(1).strip() if scientific_match else None

        return common_name, scientific_name

    except Exception as e:
        print(f"❌ Error extracting info from {file_path}: {e}")
        return None, None

def update_ficha_with_native_status(file_path, native_mapping):
    """Update a single ficha técnica with native status"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Extract plant info
        common_name, scientific_name = extract_plant_info_from_ficha(file_path)

        if not common_name or not scientific_name:
            print(f"⚠️  Could not extract plant info from {file_path}")
            return False

        # Find native status
        native_status = None
        if common_name in native_mapping:
            native_status = native_mapping[common_name]['status']
        elif scientific_name in native_mapping:
            native_status = native_mapping[scientific_name]['status']

        if not native_status:
            print(f"⚠️  No native status found for {common_name} ({scientific_name})")
            return False

        # Pattern to find scientific name in header area
        header_scientific_pattern = r'(<p style="color: white; font-size: 1\.2rem; font-style: italic[^>]*>)\s*(<em>\s*' + re.escape(scientific_name) + r'\s*</em>)\s*(</p>)'

        # Add native status badge after scientific name in header
        def replace_header_scientific(match):
            return match.group(1) + match.group(2) + get_native_status_badge(native_status) + match.group(3)

        content = re.sub(header_scientific_pattern, replace_header_scientific, content, flags=re.IGNORECASE)

        # Pattern to find scientific name in image caption area
        caption_pattern = r'(<p[^>]*>)\s*([^(]*\(\s*<em>\s*' + re.escape(scientific_name) + r'\s*</em>\s*\))\s*(</p>)'

        # Add native status badge after scientific name in caption
        def replace_caption_scientific(match):
            return match.group(1) + match.group(2) + get_native_status_badge(native_status) + match.group(3)

        content = re.sub(caption_pattern, replace_caption_scientific, content, flags=re.IGNORECASE)

        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Updated {file_path} - {common_name}: {native_status}")
            return True
        else:
            print(f"⚠️  No changes made to {file_path}")
            return False

    except Exception as e:
        print(f"❌ Error updating {file_path}: {e}")
        return False

def main():
    """Main function to update all ficha técnicas with native status"""

    print("🌿 Adding native/introduced status to ficha técnicas...")
    print("=" * 60)

    # Load native data from Excel
    native_mapping = load_native_data()
    if not native_mapping:
        print("❌ Failed to load native data")
        return

    print(f"\n📄 Updating ficha técnicas...")

    base_dir = Path("/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD")
    fichas_dir = base_dir / 'fichas-tecnicas'

    success_count = 0
    total_count = 0

    if fichas_dir.exists():
        plant_files = list(fichas_dir.glob("plant-*.html"))
        total_count = len(plant_files)

        for file_path in sorted(plant_files):
            if update_ficha_with_native_status(file_path, native_mapping):
                success_count += 1

    print(f"\n✅ Results:")
    print(f"   📄 Files updated: {success_count}/{total_count}")

    if success_count > 0:
        print(f"\n🎉 ¡Native/introduced status added!")
        print(f"   🌿 Plants now show if they're native or introduced")
        print(f"   📱 Badges appear under scientific names")
    else:
        print(f"\n⚠️  No files were updated")

if __name__ == "__main__":
    main()