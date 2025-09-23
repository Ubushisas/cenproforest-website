#!/usr/bin/env python3
import re
import os
from pathlib import Path

def fix_all_missing_images():
    """Comprehensive script to fix missing images based on user's reported list"""

    # Problem plants from user report:
    # plant-2 (fixed), plant-3 (fixed), plant-6 (fixed), plant-10 (fixed), plant-12 (fixed)
    # plant-14 (already fixed by arbolito script), plant-16, plant-17, plant-18 (already fixed by arbolito script),
    # plant-23, plant-24 (already fixed by arbolito script), plant-27 (already fixed by arbolito script),
    # plant-28 (already fixed by arbolito script), plant-29, plant-32 (already fixed by arbolito script),
    # plant-33 (already fixed by arbolito script), plant-37 (already fixed by arbolito script)

    # Let's check the remaining ones: plant-16, plant-17, plant-23, plant-29

    fichas_dir = Path("/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD/fichas-tecnicas")
    catalogo_dir = Path("/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD/assets/Catalogo")

    remaining_plants = [16, 17, 23, 29]

    for plant_num in remaining_plants:
        plant_file = fichas_dir / f"plant-{plant_num}.html"

        if not plant_file.exists():
            print(f"File not found: {plant_file}")
            continue

        try:
            with open(plant_file, 'r', encoding='utf-8') as f:
                content = f.read()

            # Extract plant images array
            match = re.search(r"window\.plantImages\['([^']+)'\] = \[(.*?)\];", content)
            if not match:
                print(f"No plant images found in {plant_file.name}")
                continue

            plant_id = match.group(1)
            images_str = match.group(2)

            # Parse current image paths
            current_paths = re.findall(r"'([^']+)'", images_str)

            print(f"\nAnalyzing {plant_file.name} ({plant_id}):")
            print(f"Current image paths: {len(current_paths)} images")

            # Extract folder name from first path
            if current_paths:
                folder_match = re.search(r'\.\.\/assets\/Catalogo\/([^\/]+)\/', current_paths[0])
                if folder_match:
                    folder_name = folder_match.group(1)
                    folder_path = catalogo_dir / folder_name

                    print(f"Expected folder: {folder_name}")

                    # Check if folder exists (try different variations)
                    variations = [folder_name, folder_name.strip()]

                    actual_folder = None
                    for var in variations:
                        test_path = catalogo_dir / var
                        if test_path.exists():
                            actual_folder = test_path
                            break

                    if not actual_folder:
                        # Try finding similar folders
                        for item in catalogo_dir.iterdir():
                            if item.is_dir() and folder_name.lower().replace(' ', '') in item.name.lower().replace(' ', ''):
                                actual_folder = item
                                break

                    if actual_folder:
                        print(f"Found folder: {actual_folder.name}")

                        # List actual images in folder
                        actual_images = list(actual_folder.glob("*.jpg")) + list(actual_folder.glob("*.jpeg")) + list(actual_folder.glob("*.png"))
                        print(f"Available images: {[img.name for img in actual_images]}")

                        # Try to match current paths to actual files
                        corrected_paths = []
                        for path in current_paths:
                            filename = Path(path).name
                            print(f"Looking for: {filename}")

                            # Try exact match first
                            exact_match = actual_folder / filename
                            if exact_match.exists():
                                corrected_paths.append(f"../assets/Catalogo/{actual_folder.name}/{filename}")
                                print(f"  ✓ Found exact match: {filename}")
                            else:
                                # Try case-insensitive match
                                found = False
                                for img in actual_images:
                                    if img.name.lower() == filename.lower():
                                        corrected_paths.append(f"../assets/Catalogo/{actual_folder.name}/{img.name}")
                                        print(f"  ✓ Found case-insensitive match: {img.name}")
                                        found = True
                                        break

                                if not found:
                                    # Try partial match
                                    base_name = filename.split('.')[0].lower()
                                    for img in actual_images:
                                        if base_name in img.name.lower() or img.name.lower().startswith(base_name[:5]):
                                            corrected_paths.append(f"../assets/Catalogo/{actual_folder.name}/{img.name}")
                                            print(f"  ✓ Found partial match: {img.name}")
                                            found = True
                                            break

                                    if not found:
                                        print(f"  ✗ No match found for: {filename}")
                                        corrected_paths.append(path)  # Keep original

                        if corrected_paths != current_paths:
                            print(f"Updating paths in {plant_file.name}")
                            new_images_str = "'" + "','".join(corrected_paths) + "'"
                            old_line = f"window.plantImages['{plant_id}'] = [{images_str}];"
                            new_line = f"window.plantImages['{plant_id}'] = [{new_images_str}];"

                            content = content.replace(old_line, new_line)

                            # Also fix thumbnails and main image
                            for i, (old_path, new_path) in enumerate(zip(current_paths, corrected_paths)):
                                if old_path != new_path:
                                    content = content.replace(old_path, new_path)

                            with open(plant_file, 'w', encoding='utf-8') as f:
                                f.write(content)

                            print(f"✓ Fixed {plant_file.name}")
                        else:
                            print(f"No changes needed for {plant_file.name}")
                    else:
                        print(f"✗ Folder not found: {folder_name}")

        except Exception as e:
            print(f"Error processing {plant_file}: {e}")

if __name__ == "__main__":
    fix_all_missing_images()