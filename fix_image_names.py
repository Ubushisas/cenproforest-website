#!/usr/bin/env python3
import os
import re
import json
import unicodedata

def normalize_filename(filename):
    """Convert filename to web-safe format without accents, spaces, or special chars"""
    # Remove accents and normalize unicode
    filename = unicodedata.normalize('NFD', filename)
    filename = ''.join(char for char in filename if unicodedata.category(char) != 'Mn')

    # Replace spaces, commas, and other problematic chars with underscores
    filename = re.sub(r'[^\w\-_.]', '_', filename)

    # Remove multiple underscores
    filename = re.sub(r'_+', '_', filename)

    # Remove leading/trailing underscores
    filename = filename.strip('_')

    # Convert to lowercase for consistency
    filename = filename.lower()

    return filename

def rename_images_in_directory(directory):
    """Rename all image files in a directory and return mapping"""
    mapping = {}

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
                old_path = os.path.join(root, file)

                # Get file extension
                name, ext = os.path.splitext(file)
                new_name = normalize_filename(name) + ext.lower()
                new_path = os.path.join(root, new_name)

                # Only rename if different
                if old_path != new_path:
                    # Handle duplicate names by adding number
                    counter = 1
                    while os.path.exists(new_path):
                        name_part, ext_part = os.path.splitext(new_name)
                        new_name = f"{name_part}_{counter}{ext_part}"
                        new_path = os.path.join(root, new_name)
                        counter += 1

                    print(f"Renaming: {file} -> {new_name}")
                    os.rename(old_path, new_path)

                    # Store mapping for updating references
                    relative_old = os.path.relpath(old_path, directory)
                    relative_new = os.path.relpath(new_path, directory)
                    mapping[relative_old] = relative_new
                    mapping[file] = new_name  # Also map just filename

    return mapping

def update_html_files(directory, mapping):
    """Update all HTML files to use new image names"""
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)

                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                original_content = content

                # Update image references
                for old_name, new_name in mapping.items():
                    # Try various reference patterns
                    patterns = [
                        old_name,
                        old_name.replace('\\', '/'),
                        os.path.basename(old_name),
                    ]

                    for pattern in patterns:
                        if pattern in content:
                            content = content.replace(pattern, new_name)

                # Write back if changed
                if content != original_content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Updated HTML: {file}")

def update_js_files(directory, mapping):
    """Update JavaScript files with new image paths"""
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.js'):
                file_path = os.path.join(root, file)

                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                original_content = content

                # Update image references in JS
                for old_name, new_name in mapping.items():
                    patterns = [
                        old_name,
                        old_name.replace('\\', '/'),
                        os.path.basename(old_name),
                    ]

                    for pattern in patterns:
                        if pattern in content:
                            content = content.replace(pattern, new_name)

                if content != original_content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Updated JS: {file}")

if __name__ == "__main__":
    project_dir = "/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD"

    print("Starting image file normalization...")

    # Rename all image files
    mapping = rename_images_in_directory(project_dir)

    print(f"\nRenamed {len(mapping)} files")

    # Update HTML files
    print("\nUpdating HTML files...")
    update_html_files(project_dir, mapping)

    # Update JS files
    print("\nUpdating JavaScript files...")
    update_js_files(project_dir, mapping)

    # Save mapping for reference
    with open(os.path.join(project_dir, 'image_rename_mapping.json'), 'w') as f:
        json.dump(mapping, f, indent=2, ensure_ascii=False)

    print("\nImage normalization complete!")
    print("Check image_rename_mapping.json for full list of changes")