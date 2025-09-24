#!/usr/bin/env python3

import os
import re
from pathlib import Path

def clean_mobile_menu_duplicates():
    """Clean mobile menu duplicates more aggressively"""

    base_dir = Path(__file__).parent

    # Define the correct mobile menu content
    correct_mobile_menu = '''<div class="mobile-menu-content">
      <a href="../index/" class="mobile-nav-link">Inicio</a>
      <a href="../nosotros/" class="mobile-nav-link">Nosotros</a>
      <a href="../ayuda/" class="mobile-nav-link">Ayuda</a>
      <a href="../contacto/" class="mobile-nav-link">Contacto</a>
      <a href="../catalogo/" class="mobile-cta-button">
        <span>Consultar catálogo completo</span>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14m-7-7 7 7-7 7" stroke="currentColor" stroke-width="2"/>
        </svg>
      </a>
    </div>'''

    # Process main HTML files
    main_files = ['ayuda.html', 'catalogo.html', 'contacto.html', 'index.html', 'nosotros.html']

    for file_name in main_files:
        file_path = base_dir / file_name
        if file_path.exists():
            print(f"Processing main file: {file_name}")
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Remove mobile menu overlay completely and add the correct one
            # Find the mobile menu overlay section
            pattern = r'<div class="mobile-menu-overlay"[^>]*>.*?</div>\s*</div>'

            replacement = '''<div class="mobile-menu-overlay" id="nav-menu">
    ''' + correct_mobile_menu + '''
  </div>'''

            content = re.sub(pattern, replacement, content, flags=re.DOTALL)

            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)

            print(f"✅ Fixed main file: {file_name}")

    # Process ficha técnicas with different paths
    fichas_dir = base_dir / 'fichas-tecnicas'
    if fichas_dir.exists():
        correct_fichas_menu = '''<div class="mobile-menu-content">
      <a href="../index/" class="mobile-nav-link">Inicio</a>
      <a href="../nosotros/" class="mobile-nav-link">Nosotros</a>
      <a href="../ayuda/" class="mobile-nav-link">Ayuda</a>
      <a href="../contacto/" class="mobile-nav-link">Contacto</a>
      <a href="../catalogo/" class="mobile-cta-button">
        <span>Consultar catálogo completo</span>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14m-7-7 7 7-7 7" stroke="currentColor" stroke-width="2"/>
        </svg>
      </a>
    </div>'''

        for file_path in fichas_dir.glob('plant-*.html'):
            print(f"Processing ficha: {file_path.name}")
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Clean up mobile menu content completely
            pattern = r'<div class="mobile-menu-overlay"[^>]*>.*?</div>\s*</div>'

            replacement = '''<div class="mobile-menu-overlay" id="nav-menu">
    ''' + correct_fichas_menu + '''
  </div>'''

            content = re.sub(pattern, replacement, content, flags=re.DOTALL)

            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)

            print(f"✅ Fixed ficha: {file_path.name}")

    # Process directory-based pages
    dirs_to_process = ['ayuda', 'catalogo', 'contacto', 'nosotros', 'index']

    for dir_name in dirs_to_process:
        dir_path = base_dir / dir_name
        index_file = dir_path / 'index.html'

        if index_file.exists():
            print(f"Processing directory page: {dir_name}/index.html")
            with open(index_file, 'r', encoding='utf-8') as f:
                content = f.read()

            # For directory-based pages, use different relative paths
            if dir_name == 'index':
                # For index, all paths are relative to parent
                dir_correct_menu = '''<div class="mobile-menu-content">
      <a href="../index/" class="mobile-nav-link">Inicio</a>
      <a href="../nosotros/" class="mobile-nav-link">Nosotros</a>
      <a href="../ayuda/" class="mobile-nav-link">Ayuda</a>
      <a href="../contacto/" class="mobile-nav-link">Contacto</a>
      <a href="../catalogo/" class="mobile-cta-button">
        <span>Consultar catálogo completo</span>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14m-7-7 7 7-7 7" stroke="currentColor" stroke-width="2"/>
        </svg>
      </a>
    </div>'''
            else:
                # For other directories, paths are relative to parent
                dir_correct_menu = '''<div class="mobile-menu-content">
      <a href="../index/" class="mobile-nav-link">Inicio</a>
      <a href="../nosotros/" class="mobile-nav-link">Nosotros</a>
      <a href="../ayuda/" class="mobile-nav-link">Ayuda</a>
      <a href="../contacto/" class="mobile-nav-link">Contacto</a>
      <a href="../catalogo/" class="mobile-cta-button">
        <span>Consultar catálogo completo</span>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14m-7-7 7 7-7 7" stroke="currentColor" stroke-width="2"/>
        </svg>
      </a>
    </div>'''

            pattern = r'<div class="mobile-menu-overlay"[^>]*>.*?</div>\s*</div>'

            replacement = '''<div class="mobile-menu-overlay" id="nav-menu">
    ''' + dir_correct_menu + '''
  </div>'''

            content = re.sub(pattern, replacement, content, flags=re.DOTALL)

            with open(index_file, 'w', encoding='utf-8') as f:
                f.write(content)

            print(f"✅ Fixed directory page: {dir_name}/index.html")

if __name__ == '__main__':
    clean_mobile_menu_duplicates()
    print("🎉 Mobile menu duplicates cleaned successfully!")