#!/usr/bin/env python3
"""
Script to remove .html extensions from internal links for clean URLs
"""

import re
import os
from pathlib import Path

def update_links_in_file(file_path):
    """Update all internal .html links in a file to remove the extension"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Pattern to match internal links with .html extension
        # This will match: href="page.html" or href="folder/page.html"
        # But NOT external links like http://example.com/page.html
        patterns = [
            # Regular href links
            (r'href="([^"]*?)\.html"', r'href="\1"'),
            # Links in JavaScript redirects
            (r"window\.location\.href\s*=\s*['\"]([^'\"]*?)\.html['\"]", r"window.location.href = '\1'"),
            # Links in JavaScript
            (r"['\"]([^'\"]*?)\.html['\"]", lambda m: f"'{m.group(1)}'" if not m.group(1).startswith('http') and '/' in m.group(1) else m.group(0))
        ]

        changes_made = False
        for pattern, replacement in patterns:
            if callable(replacement):
                def replace_func(match):
                    # Only replace if it's an internal link (contains no http and has path structure)
                    link = match.group(1)
                    if not link.startswith('http') and ('/' in link or link in ['index', 'catalogo', 'ayuda', 'contacto', 'nosotros', 'vivero']):
                        changes_made = True
                        return f"'{link}'"
                    return match.group(0)
                content = re.sub(pattern, replace_func, content)
            else:
                new_content = re.sub(pattern, replacement, content)
                if new_content != content:
                    changes_made = True
                    content = new_content

        # Special handling for common internal links that should not have .html
        internal_pages = ['index', 'catalogo', 'ayuda', 'contacto', 'nosotros', 'vivero']
        for page in internal_pages:
            # Direct href links
            old_pattern = f'href="{page}.html"'
            new_pattern = f'href="{page}"' if page != 'index' else 'href="/"'
            if old_pattern in content:
                content = content.replace(old_pattern, new_pattern)
                changes_made = True

        # Fix relative links in fichas-tecnicas (they need ../ prefix)
        if 'fichas-tecnicas' in str(file_path):
            relative_fixes = [
                ('href="nosotros"', 'href="../nosotros"'),
                ('href="ayuda"', 'href="../ayuda"'),
                ('href="catalogo"', 'href="../catalogo"'),
                ('href="contacto"', 'href="../contacto"'),
                ('href="index"', 'href="../"'),
            ]
            for old, new in relative_fixes:
                if old in content:
                    content = content.replace(old, new)
                    changes_made = True

        if changes_made:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Updated links in {file_path}")
            return True
        else:
            print(f"⚠️  No link changes needed in {file_path}")
            return False

    except Exception as e:
        print(f"❌ Error updating {file_path}: {e}")
        return False

def main():
    """Main function to update all HTML files"""
    print("🔗 Removing .html extensions from internal links...")
    print("=" * 60)

    base_dir = Path("/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD")

    # Get all HTML files
    html_files = []

    # Main directory HTML files
    html_files.extend(base_dir.glob("*.html"))

    # Fichas técnicas
    fichas_dir = base_dir / 'fichas-tecnicas'
    if fichas_dir.exists():
        html_files.extend(fichas_dir.glob("*.html"))

    print(f"📄 Found {len(html_files)} HTML files to update")

    success_count = 0
    for html_file in html_files:
        if update_links_in_file(html_file):
            success_count += 1

    print(f"\n✅ Results:")
    print(f"   📄 Files updated: {success_count}/{len(html_files)}")

    if success_count > 0:
        print(f"\n🎉 ¡Links updated for clean URLs!")
        print(f"   🔗 Internal links now work without .html extensions")
        print(f"   📋 Compatible with GitHub Pages clean URLs")
    else:
        print(f"\n⚠️  No files needed updating")

if __name__ == "__main__":
    main()