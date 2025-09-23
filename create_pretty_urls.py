#!/usr/bin/env python3
"""
Script to create pretty URLs structure without breaking existing functionality.
This will create a parallel structure with beautiful URLs while keeping the original intact.
"""

import os
import re
import shutil
from pathlib import Path
import unicodedata

def slugify(text):
    """Convert text to URL-friendly slug"""
    # Remove accents and special characters
    text = unicodedata.normalize('NFD', text)
    text = ''.join(char for char in text if unicodedata.category(char) != 'Mn')

    # Convert to lowercase and replace spaces/special chars with hyphens
    text = re.sub(r'[^\w\s-]', '', text.lower())
    text = re.sub(r'[\s_-]+', '-', text)
    return text.strip('-')

def extract_plant_name_from_file(file_path):
    """Extract plant name from HTML file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Look for the plant name in the breadcrumb span
        match = re.search(r'<span style="color: white;">([^<]+)</span>', content)
        if match:
            return match.group(1).strip()

        # Fallback: look for h1 title
        match = re.search(r'<h1[^>]*>([^<]+)</h1>', content, re.IGNORECASE)
        if match:
            return match.group(1).strip()

        return None

    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return None

def create_plant_mapping():
    """Create mapping of plant files to their names and slugs"""
    fichas_dir = Path("/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD/fichas-tecnicas")
    mapping = {}

    plant_files = sorted(fichas_dir.glob("plant-*.html"))

    for file_path in plant_files:
        plant_name = extract_plant_name_from_file(file_path)
        if plant_name:
            slug = slugify(plant_name)
            mapping[file_path.name] = {
                'name': plant_name,
                'slug': slug,
                'original_file': str(file_path)
            }
            print(f"✅ {file_path.name} → {plant_name} → {slug}")
        else:
            print(f"⚠️  Could not extract name from {file_path.name}")

    return mapping

def create_pretty_structure(mapping, dry_run=True):
    """Create the pretty URL structure"""
    base_dir = Path("/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD")

    # Main pages mapping
    main_pages = {
        'index.html': '',  # Root
        'catalogo.html': 'catalogo',
        'ayuda.html': 'ayuda',
        'contacto.html': 'contacto',
        'nosotros.html': 'nosotros',
        'vivero.html': 'vivero'
    }

    print(f"\n{'🔍 DRY RUN MODE' if dry_run else '🚀 CREATING STRUCTURE'}")
    print("=" * 50)

    # Create main page directories
    for html_file, dir_name in main_pages.items():
        if dir_name:  # Skip index.html (stays at root)
            new_dir = base_dir / dir_name
            if dry_run:
                print(f"📁 Would create: {new_dir}/")
                print(f"📄 Would copy: {html_file} → {new_dir}/index.html")
            else:
                new_dir.mkdir(exist_ok=True)
                shutil.copy2(base_dir / html_file, new_dir / 'index.html')
                print(f"✅ Created: {new_dir}/index.html")

    # Create plant directories
    plantas_dir = base_dir / 'plantas'
    if dry_run:
        print(f"\n📁 Would create main directory: {plantas_dir}/")
    else:
        plantas_dir.mkdir(exist_ok=True)
        print(f"\n✅ Created main directory: {plantas_dir}/")

    for original_file, info in mapping.items():
        slug = info['slug']
        plant_dir = plantas_dir / slug

        if dry_run:
            print(f"📁 Would create: {plant_dir}/")
            print(f"📄 Would copy: fichas-tecnicas/{original_file} → {plant_dir}/index.html")
        else:
            plant_dir.mkdir(exist_ok=True)
            shutil.copy2(info['original_file'], plant_dir / 'index.html')
            print(f"✅ Created: {plant_dir}/index.html")

    return True

def create_redirect_index():
    """Create an index.html that shows the URL mapping"""
    base_dir = Path("/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD")

    # This would be a helpful reference page
    redirect_content = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>URLs Bonitas - CENPROFOREST</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .url-mapping { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .old-url { color: #666; text-decoration: line-through; }
        .new-url { color: #2d5016; font-weight: bold; }
    </style>
</head>
<body>
    <h1>🌟 URLs Bonitas Creadas</h1>
    <p>Se ha creado una estructura paralela con URLs más bonitas:</p>

    <h2>Páginas Principales:</h2>
    <div class="url-mapping">
        <div class="old-url">catalogo.html</div>
        <div class="new-url">→ /catalogo/</div>
    </div>
    <div class="url-mapping">
        <div class="old-url">ayuda.html</div>
        <div class="new-url">→ /ayuda/</div>
    </div>

    <h2>Fichas Técnicas:</h2>
    <p>Todas las plantas ahora tienen URLs descriptivas en /plantas/nombre-de-planta/</p>

    <p><strong>Nota:</strong> Los archivos originales siguen funcionando perfectamente.</p>
</body>
</html>"""

    return redirect_content

def main():
    """Main function to create pretty URLs"""
    print("🌿 CENPROFOREST - Creador de URLs Bonitas")
    print("=" * 50)

    # Step 1: Extract plant names and create mapping
    print("\n📋 Paso 1: Extrayendo nombres de plantas...")
    mapping = create_plant_mapping()

    if not mapping:
        print("❌ No se pudieron extraer nombres de plantas")
        return

    print(f"\n✅ Se encontraron {len(mapping)} plantas")

    # Step 2: Show what would be created (dry run)
    print("\n📋 Paso 2: Previsualización de estructura...")
    create_pretty_structure(mapping, dry_run=True)

    # Step 3: Proceed automatically
    print(f"\n🚀 Procediendo a crear la estructura de URLs bonitas...")
    print("   ⚠️  Esto NO afectará los archivos originales")
    print("   ✅ Se creará una estructura paralela")

    if True:  # Proceed automatically
        print("\n🚀 Creando estructura de URLs bonitas...")
        create_pretty_structure(mapping, dry_run=False)

        # Create reference file
        redirect_content = create_redirect_index()
        with open("/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD/urls-bonitas.html", 'w', encoding='utf-8') as f:
            f.write(redirect_content)

        print("\n🎉 ¡Estructura creada exitosamente!")
        print("📄 Archivo de referencia: urls-bonitas.html")
        print("\n✨ URLs bonitas disponibles:")
        print("   🏠 Sitio principal: /")
        print("   📊 Catálogo: /catalogo/")
        print("   ❓ Ayuda: /ayuda/")
        print("   🌱 Plantas: /plantas/nombre-planta/")

    else:
        print("\n❌ Operación cancelada")

if __name__ == "__main__":
    main()