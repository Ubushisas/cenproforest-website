#!/usr/bin/env python3
"""
Script to remove .html extensions from JavaScript files
"""

import re
from pathlib import Path

def fix_js_html_extensions(file_path):
    """Remove .html extensions from JavaScript files"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Fix the plant technical sheet mapping
        content = re.sub(r"'plant-(\d+)\.html'", r"'plant-\1'", content)

        # Fix ficha-tecnicas links
        content = re.sub(r'fichas-tecnicas/plant-(\d+)\.html', r'fichas-tecnicas/plant-\1', content)

        # Fix general .html extensions in hrefs and window.location
        content = re.sub(r'(\./?)([a-zA-Z-]+)\.html', r'\1\2', content)

        # Fix specific catalog.html references
        content = content.replace('./catalogo.html', './catalogo')

        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Fixed JavaScript HTML extensions in {file_path}")
            return True
        else:
            print(f"⚠️  No JavaScript HTML extensions found in {file_path}")
            return False

    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")
        return False

def main():
    """Fix JavaScript HTML extensions in all JS files"""

    base_dir = Path("/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD")

    print("🔧 Fixing HTML extensions in JavaScript files...")
    print("=" * 50)

    js_files = []
    js_files.extend(list(base_dir.glob("js/**/*.js")))

    success_count = 0

    for file_path in sorted(js_files):
        if fix_js_html_extensions(file_path):
            success_count += 1

    print(f"\n✅ Results:")
    print(f"   📄 Files updated: {success_count}/{len(js_files)}")

    if success_count > 0:
        print(f"\n🎉 ¡JavaScript HTML extensions removed!")
    else:
        print(f"\n⚠️  No files were updated")

if __name__ == "__main__":
    main()