#!/usr/bin/env python3
"""
Script to update plant finder with native/introduced preference
"""

import re
from pathlib import Path

def update_plant_finder_html():
    """Update HTML files to add native/introduced question"""

    files_to_update = [
        "/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD/ayuda.html"
    ]

    success_count = 0

    for file_path in files_to_update:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            original_content = content

            # Add the new question 5 after question 4
            new_question = '''          <div class="question" id="question-5">
            <h3>¿Qué tipo de especies prefieres?</h3>
            <div class="question-options">
              <button class="option-btn" data-value="nativas">🌿 Solo especies nativas</button>
              <button class="option-btn" data-value="introducidas">🌍 Solo especies introducidas</button>
              <button class="option-btn" data-value="cualquiera">🌱 Cualquier tipo</button>
            </div>
          </div>'''

            # Pattern to find the end of question-4 and insert after it
            pattern = r'(</div>\s*</div>\s*</div>\s*<div class="finder-results")'
            replacement = f'{new_question}\n        \\1'

            content = re.sub(pattern, replacement, content, flags=re.DOTALL)

            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"✅ Updated {file_path} with native/introduced question")
                success_count += 1
            else:
                print(f"⚠️  No changes made to {file_path}")

        except Exception as e:
            print(f"❌ Error updating {file_path}: {e}")

    return success_count

def update_plant_finder_js():
    """Update JavaScript to handle 5 questions and native filtering"""

    js_file = "/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD/js/modules/plant-finder.js"

    try:
        with open(js_file, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Update total questions from 4 to 5
        content = re.sub(r'const totalQuestions = 4;', 'const totalQuestions = 5;', content)

        # Find the findMatchingPlants function and update it
        find_matching_pattern = r'function findMatchingPlants\(answers\)\s*\{[^}]*\}'

        new_find_matching = '''function findMatchingPlants(answers) {
    console.log('Finding matching plants with answers:', answers);

    if (!window.catalogData || !Array.isArray(window.catalogData)) {
        console.error('Catalog data not available');
        return [];
    }

    let matches = window.catalogData.filter(plant => {
        // Check purpose/category match
        let purposeMatch = true;
        if (answers.purpose) {
            if (answers.purpose === 'comercial') {
                purposeMatch = plant.category === 'forestales';
            } else if (answers.purpose === 'ornamental') {
                purposeMatch = plant.category === 'ornamentales';
            } else if (answers.purpose === 'frutal') {
                purposeMatch = plant.category === 'forrajeras' || plant.uses.some(use =>
                    use.toLowerCase().includes('alimento') || use.toLowerCase().includes('frutal'));
            }
        }

        // Check altitude match
        let altitudeMatch = true;
        if (answers.altitude && plant.altitude) {
            const plantAltitude = plant.altitude.toLowerCase();
            if (answers.altitude === '0-800') {
                altitudeMatch = plantAltitude.includes('0-') || plantAltitude.includes('170-') ||
                              parseInt(plantAltitude.split('-')[1]) <= 800;
            } else if (answers.altitude === '800-1800') {
                altitudeMatch = plantAltitude.includes('800-') || plantAltitude.includes('1.000-') ||
                              plantAltitude.includes('1.600-') || plantAltitude.includes('1.400-');
            } else if (answers.altitude === '1800-3000') {
                altitudeMatch = plantAltitude.includes('1.800-') || plantAltitude.includes('2.000-') ||
                              parseInt(plantAltitude.split('-')[0].replace('.', '')) >= 1800;
            }
        }

        // Check native status match
        let nativeMatch = true;
        if (answers.native_preference && plant.native_status) {
            if (answers.native_preference === 'nativas') {
                nativeMatch = plant.native_status === 'NATIVO';
            } else if (answers.native_preference === 'introducidas') {
                nativeMatch = plant.native_status === 'INTRODUCIDA';
            }
            // 'cualquiera' matches all
        }

        return purposeMatch && altitudeMatch && nativeMatch;
    });

    console.log('Found matches:', matches.length);
    return matches.slice(0, 6); // Limit to 6 results
}'''

        content = re.sub(find_matching_pattern, new_find_matching, content, flags=re.DOTALL)

        # Update the question mapping to include question 5
        question_map_pattern = r'(userAnswers\.timing = value;[\s\S]*?break;[\s\S]*?})'
        question_map_replacement = '''userAnswers.timing = value;
            break;
        case 5:
            userAnswers.native_preference = value;
            break;
    }'''

        content = re.sub(question_map_pattern, question_map_replacement, content)

        if content != original_content:
            with open(js_file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Updated {js_file} with native/introduced filtering logic")
            return True
        else:
            print(f"⚠️  No changes made to {js_file}")
            return False

    except Exception as e:
        print(f"❌ Error updating {js_file}: {e}")
        return False

def update_catalog_filters():
    """Update catalog.html to include native/introduced filter"""

    catalog_file = "/Users/pedro/Downloads/CENPROFOREST_READY_TO_UPLOAD/catalogo.html"

    try:
        with open(catalog_file, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Add native filter section after altitude filters
        native_filter_section = '''
        <div class="filter-section">
          <h4>Por Origen</h4>
          <div class="filter-row">
            <button class="filter-btn" data-filter="native" data-value="nativas">🌿 Solo Nativas</button>
            <button class="filter-btn" data-filter="native" data-value="introducidas">🌍 Solo Introducidas</button>
            <button class="filter-btn" data-filter="native" data-value="todas">🌱 Todas las especies</button>
          </div>
        </div>'''

        # Insert after the altitude filter section
        pattern = r'(</div>\s*</div>\s*<div class="active-filters")'
        replacement = f'{native_filter_section}\n        \\1'

        content = re.sub(pattern, replacement, content)

        if content != original_content:
            with open(catalog_file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Updated {catalog_file} with native/introduced filters")
            return True
        else:
            print(f"⚠️  No changes made to {catalog_file}")
            return False

    except Exception as e:
        print(f"❌ Error updating {catalog_file}: {e}")
        return False

def main():
    """Main function"""
    print("🌿 Updating plant finder and catalog with native/introduced preferences...")
    print("=" * 70)

    print("📝 Updating HTML files...")
    html_success = update_plant_finder_html()

    print("🔧 Updating JavaScript logic...")
    js_success = update_plant_finder_js()

    print("🎯 Updating catalog filters...")
    filter_success = update_catalog_filters()

    print(f"\n✅ Results:")
    print(f"   📄 HTML files: {html_success}/1")
    print(f"   🔧 JavaScript: {'✅' if js_success else '❌'}")
    print(f"   🎯 Catalog filters: {'✅' if filter_success else '❌'}")

    if html_success > 0 and js_success and filter_success:
        print(f"\n🎉 ¡Plant finder updated successfully!")
        print(f"   🌿 Added native/introduced preference question")
        print(f"   🔍 Updated filtering logic to respect native status")
        print(f"   📊 Added catalog filters for native species")
    else:
        print(f"\n⚠️  Some updates may have failed")

if __name__ == "__main__":
    main()