#!/usr/bin/env python3
"""
Comprehensive script to fix ALL paths in pretty URLs structure
"""

import os
import re
from pathlib import Path

def fix_comprehensive_paths():
    """Fix all CSS, JS, and asset paths comprehensively"""

    base_dir = Path("/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD")

    # Fix main pages (one level deep)
    main_pages = ['catalogo', 'ayuda', 'contacto', 'nosotros', 'vivero']

    for page in main_pages:
        file_path = base_dir / page / 'index.html'
        if file_path.exists():
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Fix all JS paths
            content = re.sub(r'src="js/', r'src="../js/', content)
            content = re.sub(r'src="\.\./\.\./js/', r'src="../js/', content)  # Fix double fix

            # Fix background images in style attributes
            content = re.sub(r"url\('assets/", r"url('../assets/", content)
            content = re.sub(r'url\("assets/', r'url("../assets/', content)

            # Fix any remaining asset links
            content = re.sub(r'href="assets/', r'href="../assets/', content)
            content = re.sub(r'src="assets/', r'src="../assets/', content)

            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)

            print(f"✅ Fixed comprehensive paths in {file_path}")

    # Fix plant pages (two levels deep)
    plantas_dir = base_dir / 'plantas'
    if plantas_dir.exists():
        for plant_dir in plantas_dir.iterdir():
            if plant_dir.is_dir():
                file_path = plant_dir / 'index.html'
                if file_path.exists():
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()

                    # Fix all JS paths
                    content = re.sub(r'src="\.\./js/', r'src="../../js/', content)
                    content = re.sub(r'src="\.\./\.\./\.\./js/', r'src="../../js/', content)  # Fix triple fix

                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)

                    print(f"✅ Fixed comprehensive paths in {file_path}")

if __name__ == "__main__":
    fix_comprehensive_paths()
    print("\n🎉 ¡Todos los paths arreglados comprehensivamente!")