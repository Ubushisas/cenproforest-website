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

def normalize_plant_name(name):
    """Normalize plant name for directory lookup"""
    return normalize_filename(name.replace('.jpg', '').replace('.jpeg', '').replace('.png', ''))

# Create the new getPlantImage function
def create_new_get_plant_image_function():
    return '''// Function to get image path for plant
function getPlantImage(plantName, scientificName = '') {
    // Normalize the plant name to match our new directory structure
    const normalizedName = plantName.toLowerCase()
        .normalize('NFD')
        .replace(/[\\u0300-\\u036f]/g, '') // Remove accents
        .replace(/[^\\w\\s-]/g, '_') // Replace special chars with underscore
        .replace(/\\s+/g, '_') // Replace spaces with underscore
        .replace(/_+/g, '_') // Replace multiple underscores with single
        .replace(/^_|_$/g, ''); // Remove leading/trailing underscores

    // Special mappings for cases where folder names differ from normalized names
    const specialMappings = {
        'bucaro': 'bucaro_cachimbo',
        'cajeto': 'cajeto_caragay',
        'eucalipto': 'eucalyptus_globulus',
        'eucalipto_blanco': 'eucalyptus_globulus',
        'eucalipto_rojo': 'eucalyptus_grandis',
        'eucalipto_pellita': 'eucalyptus_pellita',
        'matarratón': 'matarraton',
        'matarrraton': 'matarraton',
        'vainillo': 'vainillo_mucatano_velero',
        'achiote_onoto': 'achiote_onoto',
        'arrayan_común_o_castilla': 'arrayan_comun_o_castilla',
        'arrayan_comun_o_castilla': 'arrayan_comun_o_castilla',
        'coral_coralitos': 'coral_coralitos',
        'mano_de_oso_pata_de_gallina': 'mano_de_oso_pata_de_gallina',
        'nogal_cafetero_canalete_pardillo': 'nogal_cafetero_canalete_pardillo',
        'jazmin_del_cabo_laurel_huesito': 'jazmin_del_cabo_laurel_huesito',
        'ocobo_flor_morado_roble': 'ocobo_flor_morado_roble',
        'cerezo_capuli': 'cerezo_capuli',
        'chicala_fresno': 'chicala_fresno',
        'croton_ornamental': 'croton_ornamental',
        'hayuelo_chanamo': 'hayuelo_chanamo',
        'holly_liso_holly_rojo': 'holly_liso_holly_rojo',
        'igua_nauno': 'igua_nauno',
        'leucaena_acacia_forrajera': 'leucaena_acacia_forrajera',
        'nacedero_madre_de_agua': 'nacedero_madre_de_agua',
        'payande_chiminango': 'payande_chiminango'
    };

    // Use special mapping if available, otherwise use normalized name
    const imageName = specialMappings[normalizedName] || normalizedName;

    // For certain species, we need to check the scientific name
    if (plantName === 'Eucalipto' && scientificName) {
        if (scientificName.includes('globulus')) {
            return `assets/Catalogo/Eucalyptus Globulus/eucalyptus_globulus.jpg`;
        } else if (scientificName.includes('grandis')) {
            return `assets/Catalogo/Eucalyptus Grandis/eucalyptus_grandis.jpg`;
        } else if (scientificName.includes('pellita')) {
            return `assets/Catalogo/Eucalyptus Pellita/eucalyptus_pellita.jpg`;
        }
    }

    // Handle special cases for Búcaro (folder has trailing space in original)
    if (normalizedName === 'bucaro') {
        return `assets/Catalogo/Búcaro /bucaro.jpg`;
    }

    // All other plants - try to find the correct folder name
    // First, let's handle the original folder names that still have special characters
    const folderNameMappings = {
        'abarco': 'Abarco',
        'acacia_amarilla': 'Acacia Amarilla',
        'acacia_japonesa': 'Acacia Japonesa',
        'acacia_mangium': 'Acacia Mangium',
        'acacia_negra': 'Acacia Negra',
        'acacia_roja': 'Acacia Roja',
        'achiote_onoto': 'Achiote, Onoto',
        'aliso': 'Aliso',
        'almendro': 'Almendro',
        'arrayan_comun': 'Arrayán Común',
        'balso': 'Balso',
        'bucaro': 'Búcaro ',
        'cajeto_caragay': 'Cajeto, Caragay',
        'caoba': 'Caoba',
        'caracoli': 'Caracolí',
        'casco_de_vaca': 'Casco De Vaca',
        'cayeno': 'Cayeno',
        'cedro_rosado': 'Cedro Rosado',
        'cedro_de_altura': 'Cedro de Altura',
        'ceiba': 'Ceiba',
        'cerezo': 'Cerezo',
        'chicala': 'Chicalá',
        'cipres': 'Ciprés',
        'ciro': 'Ciro',
        'clavellino': 'Clavellino',
        'coral_coralitos': 'Coral, Coralitos',
        'corono': 'Corono',
        'croton_ornamental': 'Crotón Ornamental',
        'cucharo': 'Cucharo',
        'cambulo': 'Cámbulo',
        'dinde_mora': 'Dinde Mora',
        'duraznillo': 'Duraznillo',
        'eucalyptus_globulus': 'Eucalyptus Globulus',
        'eucalyptus_grandis': 'Eucalyptus Grandis',
        'eucalyptus_pellita': 'Eucalyptus Pellita',
        'eugenia_arrayan_extranjero': 'Eugenia-Arrayán extranjero',
        'falso_pimiento': 'Falso Pimiento',
        'garrocho_chuque': 'Garrocho-Chuque',
        'gualanday': 'Gualanday',
        'guayacan_amarillo': 'Guayacán Amarillo',
        'guayacan_de_manizales': 'Guayacán de Manizales',
        'guacimo': 'Guácimo',
        'hayuelo': 'Hayuelo',
        'holly_espinoso': 'Holly Espinoso',
        'holly_liso': 'Holly Liso',
        'igua_nauno': 'Iguá, Nauno',
        'jazmin_del_cabo_laurel_huesito': 'Jazmín del cabo, Laurel Huesito',
        'laurel_del_cera': 'Laurel del Cera',
        'leucaena': 'Leucaena',
        'limon_ornamental': 'Limón Ornamental',
        'lluvia_de_oro': 'Lluvia de Oro',
        'mano_de_oso_pata_de_gallina': 'Mano de Oso, Pata de Gallina',
        'matarraton': 'Matarratón',
        'melina': 'Melina',
        'mortino': 'Mortiño',
        'nacedero': 'Nacedero',
        'nogal_cafetero_canalete_pardillo': 'Nogal Cafetero, Canalete, Pardillo',
        'ocobo': 'Ocobo',
        'oiti': 'Oití',
        'orejero': 'Orejero',
        'palma_abanico': 'Palma Abanico',
        'palma_areca': 'Palma Areca',
        'palma_botella_palma_real': 'Palma Botella, Palma Real',
        'palma_mariposa': 'Palma Mariposa',
        'payande': 'Payandé',
        'pino_patula': 'Pino Pátula',
        'pomarroso_brasilero': 'Pomarroso Brasilero',
        'roble': 'Roble',
        'saman': 'Samán',
        'sauce_lloron': 'Sauce llorón',
        'sauco': 'Sauco',
        'suribio': 'Suribio',
        'teca': 'Teca',
        'tulipan_africano': 'Tulipán Africano',
        'urapan': 'Urapán',
        'vainillo_mucatano_velero': 'Vainillo, Mucátano, Velero',
        'yopo_cafe': 'Yopo Café',
        'yopo_negro': 'Yopo Negro'
    };

    const folderName = folderNameMappings[imageName] || plantName;

    // Return the path with normalized image name
    return `assets/Catalogo/${folderName}/${imageName}.jpg`;
}'''

if __name__ == "__main__":
    project_dir = "/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD"

    # Read the current catalog-data.js file
    catalog_file = os.path.join(project_dir, 'js/config/catalog-data.js')

    with open(catalog_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the getPlantImage function and replace it
    # Look for the function definition and its closing brace
    pattern = r'function getPlantImage\([^{]*\{[^}]*(?:\{[^}]*\}[^}]*)*\}'

    new_function = create_new_get_plant_image_function()

    # Replace the function
    new_content = re.sub(pattern, new_function, content, flags=re.DOTALL)

    # If the pattern didn't match, try a different approach
    if new_content == content:
        # Look for the function start and find its end more carefully
        start_pattern = r'// Function to get image path for plant\s*function getPlantImage\('
        start_match = re.search(start_pattern, content)

        if start_match:
            start_pos = start_match.start()

            # Find the end of the function by counting braces
            brace_count = 0
            pos = start_pos
            found_first_brace = False

            while pos < len(content):
                if content[pos] == '{':
                    brace_count += 1
                    found_first_brace = True
                elif content[pos] == '}':
                    brace_count -= 1
                    if found_first_brace and brace_count == 0:
                        end_pos = pos + 1
                        break
                pos += 1

            if found_first_brace and brace_count == 0:
                # Replace the function
                new_content = content[:start_pos] + new_function + content[end_pos:]

    # Write the updated content back
    with open(catalog_file, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print("Updated catalog-data.js with new image paths!")