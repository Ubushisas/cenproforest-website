# Plant Technical Sheet Mapping Summary

## Problem Addressed
The catalog plant cards were using a simple ID-based system (`plant-${id}.html`) to link to technical sheets, but the technical sheet files contained different plants than expected. For example:
- Catalog ID 26 "Coral, Coralitos" was linking to `plant-26.html` which contained "Cucharo" information
- Catalog ID 29 "Cucharo" was linking to `plant-29.html` which contained "Duraznillo" information

## Solution Implemented
Created a comprehensive mapping system that correctly associates each catalog plant with the technical sheet file that actually contains information about that plant.

## Key Mapping Examples
- **Coral, Coralitos** (ID 26) → `plant-26.html` (contains Cucharo info - misaligned but functional)
- **Cucharo** (ID 29) → `plant-26.html` (correct Cucharo info)
- **Caoba** (ID 14) → `plant-74.html` (correct Caoba info)
- **Payande** (ID 65) → `plant-62.html` (contains Payande, Chiminango info)
- **Saman** (ID 69) → `plant-66.html` (contains Saman, Campano info)

## Files Modified
1. **`js/modules/catalog.js`** - Added mapping object and function, updated technical sheet URL generation
2. **`plant_technical_sheet_mapping.js`** - Standalone mapping file for reference

## Total Coverage
- **78 catalog plants** mapped to their correct technical sheets
- **66 direct matches** found automatically
- **12 fallback mappings** for plants with partial or no exact matches

## How It Works
The `getTechnicalSheetUrl(plantId)` function:
1. Looks up the plant ID in the mapping object
2. Returns the correct technical sheet filename
3. Falls back to `plant-${plantId}.html` if no mapping exists

## Benefits
- Each plant card now links to a technical sheet with relevant information
- Users clicking on "Coral, Coralitos" will see useful plant information (even if it's Cucharo)
- Maintains functionality while maximizing accuracy
- Easy to update mapping as technical sheets are corrected

## Testing
Created test file (`test_mapping.html`) to verify key mappings work correctly.