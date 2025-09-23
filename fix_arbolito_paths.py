#!/usr/bin/env python3
import re
import os
from pathlib import Path

def fix_arbolito_paths():
    """Fix remaining Arbolito folder path issues in ficha técnicas"""

    fichas_dir = Path("/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD/fichas-tecnicas")
    pattern = r'(\.\.\/assets\/Catalogo\/[^\/]+)\/Arbolito\/([^\/]+\.jpg)'

    fixed_files = []
    total_fixes = 0

    for html_file in fichas_dir.glob("plant-*.html"):
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()

            original_content = content

            # Fix the Arbolito paths
            def replacement(match):
                folder_path = match.group(1)  # ../assets/Catalogo/Plant Name
                image_name = match.group(2)   # image.jpg
                return f"{folder_path}/{image_name}"

            content = re.sub(pattern, replacement, content)

            # Count fixes in this file
            fixes_in_file = len(re.findall(pattern, original_content))

            if content != original_content:
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                fixed_files.append((html_file.name, fixes_in_file))
                total_fixes += fixes_in_file

        except Exception as e:
            print(f"Error processing {html_file}: {e}")

    print(f"Fixed {total_fixes} Arbolito path issues in {len(fixed_files)} files:")
    for filename, count in fixed_files:
        print(f"  - {filename}: {count} fixes")

if __name__ == "__main__":
    fix_arbolito_paths()