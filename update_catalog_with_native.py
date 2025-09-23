#!/usr/bin/env python3
"""
Script to update catalog-data.js with native/introduced status for each plant
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
        return native_mapping

    except Exception as e:
        print(f"❌ Error loading Excel data: {e}")
        return {}

def update_catalog_data():
    """Update catalog-data.js with native/introduced information"""

    catalog_file = "/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD/js/config/catalog-data.js"

    try:
        # Load native data
        native_mapping = load_native_data()
        if not native_mapping:
            print("❌ Failed to load native data")
            return False

        # Read the catalog file
        with open(catalog_file, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Find each plant entry and add native status
        def add_native_status(match):
            plant_data = match.group(0)

            # Extract plant name
            name_match = re.search(r'"name":\s*"([^"]+)"', plant_data)
            if not name_match:
                return plant_data

            plant_name = name_match.group(1)

            # Find native status
            native_status = None
            if plant_name in native_mapping:
                native_status = native_mapping[plant_name]['status']

            if not native_status:
                # Try some common name variations
                variations = [
                    plant_name.replace(', ', ' '),
                    plant_name.replace(' ', ', '),
                    plant_name.split(',')[0].strip(),
                    plant_name.split(' ')[0].strip()
                ]

                for variation in variations:
                    if variation in native_mapping:
                        native_status = native_mapping[variation]['status']
                        break

            if native_status:
                # Check if native_status already exists
                if '"native_status"' not in plant_data:
                    # Add native_status field before the price field
                    plant_data = re.sub(
                        r'("description":\s*"[^"]*"),',
                        r'\1,\n        "native_status": "' + native_status + '",',
                        plant_data
                    )
                    print(f"✅ Added native status for {plant_name}: {native_status}")
                else:
                    print(f"⚠️  Native status already exists for {plant_name}")
            else:
                print(f"❌ No native status found for {plant_name}")

            return plant_data

        # Pattern to match each plant object in the catalog
        plant_pattern = r'\{\s*"id":\s*\d+,.*?"price":\s*"[^"]*"\s*\}'

        # Apply the transformation
        content = re.sub(plant_pattern, add_native_status, content, flags=re.DOTALL)

        # Write back to file if changed
        if content != original_content:
            with open(catalog_file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"\n✅ Updated catalog-data.js with native/introduced information")
            return True
        else:
            print(f"\n⚠️  No changes made to catalog-data.js")
            return False

    except Exception as e:
        print(f"❌ Error updating catalog data: {e}")
        return False

def main():
    """Main function"""
    print("🌿 Updating catalog data with native/introduced status...")
    print("=" * 60)

    if update_catalog_data():
        print(f"\n🎉 ¡Catalog data updated successfully!")
        print(f"   📊 Native/introduced status added to plant data")
        print(f"   🔍 This will help with filtering and plant finder")
    else:
        print(f"\n⚠️  Catalog data update failed or no changes needed")

if __name__ == "__main__":
    main()