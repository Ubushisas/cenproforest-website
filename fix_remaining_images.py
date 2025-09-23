#!/usr/bin/env python3
import re
import os
from pathlib import Path

def fix_remaining_image_issues():
    """Fix remaining image issues in plants 65, 66, 69, 76"""

    fichas_dir = Path("/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD/fichas-tecnicas")
    catalogo_dir = Path("/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD/assets/Catalogo")

    # Plant corrections based on analysis
    corrections = {
        65: {  # Payandé-Chiminango
            "folder": "Payandé",
            "corrections": [
                ("Payandé 1.jpg", "payande_1.jpg"),
                ("Payandé 2.jpg", "payande_2.jpg"),
                ("Payandé 3.jpg", "payande_3.jpg"),
                ("Payandé.jpg", "payande.jpg")
            ]
        },
        66: {  # Will check and fix
            "folder": "",
            "corrections": []
        },
        69: {  # Will check and fix
            "folder": "",
            "corrections": []
        },
        76: {  # Vainillo - special case with complex folder name
            "folder": "Vainillo, Mucátano, Velero",
            "corrections": []
        }
    }

    for plant_num in [65, 66, 69, 76]:
        plant_file = fichas_dir / f"plant-{plant_num}.html"

        if not plant_file.exists():
            print(f"File not found: {plant_file}")
            continue

        try:
            with open(plant_file, 'r', encoding='utf-8') as f:
                content = f.read()

            print(f"\n=== Processing Plant {plant_num} ===")

            # Find plant title
            title_match = re.search(r'<title>([^<]+)</title>', content)
            if title_match:
                print(f"Title: {title_match.group(1)}")

            # Extract image array or image references
            image_array_match = re.search(r"window\.plantImages\['([^']+)'\] = \[(.*?)\];", content)

            if image_array_match:
                plant_id = image_array_match.group(1)
                images_str = image_array_match.group(2)
                current_paths = re.findall(r"'([^']+)'", images_str)

                print(f"Plant ID: {plant_id}")
                print(f"Current paths: {current_paths}")

                # Try to find the actual folder
                if current_paths:
                    folder_match = re.search(r'\.\.\/assets\/Catalogo\/([^\/]+)\/', current_paths[0])
                    if folder_match:
                        folder_name = folder_match.group(1)
                        folder_path = catalogo_dir / folder_name

                        print(f"Looking for folder: {folder_name}")

                        if folder_path.exists():
                            # List actual images
                            actual_images = list(folder_path.glob("*.jpg")) + list(folder_path.glob("*.jpeg")) + list(folder_path.glob("*.png"))
                            print(f"Available images: {[img.name for img in actual_images]}")

                            # Create corrections automatically
                            corrected_paths = []
                            content_updated = content

                            for path in current_paths:
                                filename = Path(path).name

                                # Find best match in actual files
                                best_match = None
                                for img in actual_images:
                                    # Try exact match first
                                    if img.name == filename:
                                        best_match = img.name
                                        break
                                    # Try lowercase match
                                    elif img.name.lower() == filename.lower():
                                        best_match = img.name
                                        break
                                    # Try normalized match (remove spaces, accents)
                                    elif normalize_name(img.name) == normalize_name(filename):
                                        best_match = img.name
                                        break

                                if best_match:
                                    new_path = f"../assets/Catalogo/{folder_name}/{best_match}"
                                    corrected_paths.append(new_path)

                                    # Replace all occurrences of the old path in content
                                    content_updated = content_updated.replace(path, new_path)

                                    if path != new_path:
                                        print(f"  Fixed: {filename} → {best_match}")
                                else:
                                    print(f"  No match found for: {filename}")
                                    corrected_paths.append(path)

                            # Write the updated content
                            if content_updated != content:
                                with open(plant_file, 'w', encoding='utf-8') as f:
                                    f.write(content_updated)
                                print(f"✓ Updated {plant_file.name}")
                            else:
                                print(f"No changes needed for {plant_file.name}")
                        else:
                            print(f"✗ Folder not found: {folder_name}")
            else:
                # Handle plants without JavaScript arrays (like plant-23 was)
                print("No JavaScript image array found - checking for hardcoded images")

                # Look for img tags with broken paths
                img_tags = re.findall(r'<img[^>]+src="([^"]+)"[^>]*>', content)
                if img_tags:
                    print(f"Found image references: {img_tags[:3]}...")  # Show first 3

                    # Try to identify the folder from the first image
                    for img_path in img_tags:
                        if "../assets/Catalogo/" in img_path:
                            folder_match = re.search(r'\.\.\/assets\/Catalogo\/([^\/]+)\/', img_path)
                            if folder_match:
                                folder_name = folder_match.group(1)
                                folder_path = catalogo_dir / folder_name

                                if folder_path.exists():
                                    actual_images = list(folder_path.glob("*.jpg")) + list(folder_path.glob("*.jpeg"))
                                    print(f"Folder '{folder_name}' exists with images: {[img.name for img in actual_images]}")
                                break

        except Exception as e:
            print(f"Error processing {plant_file}: {e}")

def normalize_name(name):
    """Normalize filename for comparison"""
    import unicodedata
    # Remove extension for comparison
    name = Path(name).stem
    # Normalize unicode and remove accents
    name = unicodedata.normalize('NFD', name)
    name = ''.join(c for c in name if unicodedata.category(c) != 'Mn')
    # Convert to lowercase and replace spaces/special chars with underscores
    name = re.sub(r'[^\w]', '_', name.lower())
    # Remove multiple underscores
    name = re.sub(r'_+', '_', name).strip('_')
    return name

if __name__ == "__main__":
    fix_remaining_image_issues()