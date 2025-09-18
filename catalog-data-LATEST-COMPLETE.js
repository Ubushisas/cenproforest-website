// Use codes mapping
const useCodes = {
    'A': 'Aglomerado',
    'AL': 'Alimento',
    'AV': 'Abono verde',
    'CA': 'Carbón',
    'CAR': 'Carpintería',
    'CH': 'Chapas',
    'CV': 'Cercas vivas',
    'CO': 'Colorantes',
    'EA': 'Elementos Aislantes',
    'EE': 'Embalajes Especiales',
    'F': 'Forraje',
    'I': 'Industrial',
    'L': 'Leña',
    'M': 'Maderable',
    'ME': 'Melífera',
    'MU': 'Muebles',
    'O': 'Ornamental',
    'PI': 'Pilotes',
    'PF': 'Producción de Fibra',
    'PO': 'Postes',
    'PU': 'Pulpa',
    'RA': 'Reforestación Ambiental',
    'S': 'Sombrío',
    'SA': 'Sistemas Agroforestales',
    'SE': 'Setos',
    'T': 'Taninos',
    'TA': 'Tableros'
};

// Function to parse uses from codes
function parseUses(useString) {
    return useString.split('-').map(code => useCodes[code] || code);
}

// Function to get image path for plant
function getPlantImage(plantName, scientificName = '') {
    // Handle special case for Búcaro folder name (has trailing space)
    if (plantName === 'Búcaro') {
        return `assets/Catalogo/Búcaro /${plantName}.jpg`;
    }
    // Handle special case for Cajeto (folder is named "Cajeto, Caragay")
    if (plantName === 'Cajeto') {
        return `assets/Catalogo/Cajeto, Caragay/Cajeto, Caragay.jpg`;
    }
    // Handle special case for Urapan (image name is "Urapán.jpg")
    if (plantName === 'Urapan') {
        return `assets/Catalogo/Urapán/Urapán.jpg`;
    }
    // Handle special case for Vainillo (image name is "Vainillo, Mucátano, Velero.jpg")
    if (plantName === 'Vainillo') {
        return `assets/Catalogo/Vainillo, Mucátano, Velero/Vainillo, Mucátano, Velero.jpg`;
    }
    // All other plants have images in their dedicated folders in assets/Catalogo/
    return `assets/Catalogo/${plantName}/${plantName}.jpg`;
}

// Complete catalog data - All 78 plants with LATEST updated names and descriptions
const catalogData = [
    {
        "id": 1,
        "name": "Abarco",
        "scientific_name": "Cariniana pyriformis",
        "altitude": "0-1.000",
        "uses": parseUses("PO-M-SA"),
        "category": "forestales",
        "description": "El Abarco (Cariniana pyriformis) es una especie forestal ideal para Postes, Maderable, Sistemas Agroforestales",
        "price": "Consultar"
    },
    {
        "id": 2,
        "name": "Acacia Amarilla",
        "scientific_name": "Cassia siamea",
        "altitude": "0-1.600",
        "uses": parseUses("O-I-L-F-RA"),
        "category": "forrajeras",
        "description": "La Acacia Amarilla (Cassia siamea) es una especie forrajera ideal para Ornamental, Industrial, Leña, Forraje y Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 3,
        "name": "Acacia Japonesa",
        "scientific_name": "Acacia melanoxylon",
        "altitude": "1.800-2.800",
        "uses": parseUses("I-PO-TA-L-PU-F-O"),
        "category": "forestales",
        "description": "La Acacia Japonesa (Acacia melanoxylon) es una especie forestal ideal para Industrial, Postes, Tableros, Leña, Pulpa, Forraje y Ornamental",
        "price": "Consultar"
    },
    {
        "id": 4,
        "name": "Acacia Mangium",
        "scientific_name": "Acacia mangium",
        "altitude": "0-1.000",
        "uses": parseUses("M-I-PU-CV-L-ME-A-F"),
        "category": "forestales",
        "description": "La Acacia Mangium (Acacia mangium) es una especie forestal ideal para Maderable, Industrial, Pulpa, Cercas vivas, Leña, Melífera, Aglomerado y Forraje",
        "price": "Consultar"
    },
    {
        "id": 5,
        "name": "Acacia Negra",
        "scientific_name": "Acacia mearnsii",
        "altitude": "1.800-3.000",
        "uses": parseUses("RA-F-T-L-PO-PU-CA"),
        "category": "forestales",
        "description": "La Acacia Negra (Acacia mearnsii) es una especie forestal ideal para Reforestación Ambiental, Forraje, Taninos, Leña, Postes, Pulpa y Carbón",
        "price": "Consultar"
    },
    {
        "id": 6,
        "name": "Acacia Roja",
        "scientific_name": "Delonix regia",
        "altitude": "170-1.200",
        "uses": parseUses("O-L-SA-S-RA-CV"),
        "category": "ornamentales",
        "description": "La Acacia Roja (Delonix regia) es una especie ornamental ideal para Ornamental, Leña, Sistemas Agroforestales, Sombrío, Reforestación Ambiental y Cercas vivas",
        "price": "Consultar"
    },
    {
        "id": 7,
        "name": "Achiote, Onoto",
        "scientific_name": "Bixa orellana",
        "altitude": "0-1.400",
        "uses": parseUses("CO-O-F-I"),
        "category": "forrajeras",
        "description": "El Achiote, Onoto (Bixa orellana) es una especie forrajera ideal para Colorantes, Ornamental, Forraje e Industrial",
        "price": "Consultar"
    },
    {
        "id": 8,
        "name": "Aliso",
        "scientific_name": "Alnus acuminata",
        "altitude": "1.700-3.500",
        "uses": parseUses("M-RA-TA-CH-PU-CV"),
        "category": "forestales",
        "description": "El Aliso (Alnus acuminata) es una especie forestal ideal para Maderable, Reforestación Ambiental, Tableros, Chapas, Pulpa y Cercas vivas",
        "price": "Consultar"
    },
    {
        "id": 9,
        "name": "Almendro",
        "scientific_name": "Terminalia catappa",
        "altitude": "0-1.500",
        "uses": parseUses("I-O-L-S-PI-RA"),
        "category": "ornamentales",
        "description": "El Almendro (Terminalia catappa) es una especie ornamental ideal para Industrial, Ornamental, Leña, Sombrío, Pilotes y Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 10,
        "name": "Arrayán Común",
        "scientific_name": "Myrcianthes leucoxyla",
        "altitude": "0-2000 m.s.n.m",
        "uses": parseUses("O-RA"),
        "category": "ornamentales",
        "description": "El Arrayán Común (Myrcianthes leucoxyla) es una especie ornamental ideal para Ornamental y Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 11,
        "name": "Balso",
        "scientific_name": "Ochroma pyramidale",
        "altitude": "0-1.800",
        "uses": parseUses("M-PU-EA-EE-CAR-CV"),
        "category": "forestales",
        "description": "El Balso (Ochroma pyramidale) es una especie forestal ideal para Maderable, Pulpa, Elementos Aislantes, Embalajes Especiales, Carpintería y Cercas vivas",
        "price": "Consultar"
    },
    {
        "id": 12,
        "name": "Búcaro",
        "scientific_name": "Erythrina fusca",
        "altitude": "0-2000 m.s.n.m",
        "uses": parseUses("O-RA"),
        "category": "ornamentales",
        "description": "El Búcaro (Erythrina fusca) es una especie ornamental ideal para Ornamental y Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 13,
        "name": "Cajeto",
        "scientific_name": "Cytharexylum subflavescens",
        "altitude": "0-1.800",
        "uses": parseUses("M-O-CV-RA"),
        "category": "forestales",
        "description": "El Cajeto (Cytharexylum subflavescens) es una especie forestal ideal para Maderable, Ornamental, Cercas vivas y Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 14,
        "name": "Cámbulo",
        "scientific_name": "Erythrina poeppigiana",
        "altitude": "1.200-2.000",
        "uses": parseUses("S-F-CV-RA"),
        "category": "forrajeras",
        "description": "El Cámbulo (Erythrina poeppigiana) es una especie forrajera ideal para Sombrío, Forraje, Cercas vivas y Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 15,
        "name": "Caoba",
        "scientific_name": "Swietenia macrophylla",
        "altitude": "0-1.500",
        "uses": parseUses("M-MU-CAR-O"),
        "category": "forestales",
        "description": "El Caoba (Swietenia macrophylla) es una especie forestal ideal para Maderable, Muebles, Carpintería y Ornamental",
        "price": "Consultar"
    },
    {
        "id": 16,
        "name": "Caracolí",
        "scientific_name": "Anacardium excelsum",
        "altitude": "0-1.000",
        "uses": parseUses("M-S-O-F-AL"),
        "category": "forestales",
        "description": "El Caracolí (Anacardium excelsum) es una especie forestal ideal para Maderable, Sombrío, Ornamental, Forraje y Alimento",
        "price": "Consultar"
    },
    {
        "id": 17,
        "name": "Casco De Vaca",
        "scientific_name": "Bauhinia purpurea",
        "altitude": "0-1.500",
        "uses": parseUses("O-F-ME"),
        "category": "ornamentales",
        "description": "El Casco De Vaca (Bauhinia purpurea) es una especie ornamental ideal para Ornamental, Forraje y Melífera",
        "price": "Consultar"
    },
    {
        "id": 18,
        "name": "Cayeno",
        "scientific_name": "Hibiscus rosa-sinensis",
        "altitude": "0-1.800",
        "uses": parseUses("O-ME"),
        "category": "ornamentales",
        "description": "El Cayeno (Hibiscus rosa-sinensis) es una especie ornamental ideal para Ornamental y Melífera",
        "price": "Consultar"
    },
    {
        "id": 19,
        "name": "Cedro de Altura",
        "scientific_name": "Cedrela montana",
        "altitude": "1.500-3.000",
        "uses": parseUses("M-MU-CAR-O"),
        "category": "forestales",
        "description": "El Cedro de Altura (Cedrela montana) es una especie forestal ideal para Maderable, Muebles, Carpintería y Ornamental",
        "price": "Consultar"
    },
    {
        "id": 20,
        "name": "Cedro Rosado",
        "scientific_name": "Cedrela odorata",
        "altitude": "0-1.800",
        "uses": parseUses("M-MU-CAR-O"),
        "category": "forestales",
        "description": "El Cedro Rosado (Cedrela odorata) es una especie forestal ideal para Maderable, Muebles, Carpintería y Ornamental",
        "price": "Consultar"
    },
    {
        "id": 21,
        "name": "Ceiba",
        "scientific_name": "Ceiba pentandra",
        "altitude": "0-1.500",
        "uses": parseUses("M-PF-O-PU"),
        "category": "forestales",
        "description": "La Ceiba (Ceiba pentandra) es una especie forestal ideal para Maderable, Producción de Fibra, Ornamental y Pulpa",
        "price": "Consultar"
    },
    {
        "id": 22,
        "name": "Cerezo",
        "scientific_name": "Prunus serotina",
        "altitude": "1.800-3.200",
        "uses": parseUses("M-MU-CAR-O-AL"),
        "category": "forestales",
        "description": "El Cerezo (Prunus serotina) es una especie forestal ideal para Maderable, Muebles, Carpintería, Ornamental y Alimento",
        "price": "Consultar"
    },
    {
        "id": 23,
        "name": "Chicalá",
        "scientific_name": "Tecoma stans",
        "altitude": "0-2.500",
        "uses": parseUses("O-ME-L"),
        "category": "ornamentales",
        "description": "El Chicalá (Tecoma stans) es una especie ornamental ideal para Ornamental, Melífera y Leña",
        "price": "Consultar"
    },
    {
        "id": 24,
        "name": "Ciprés",
        "scientific_name": "Cupressus lusitanica",
        "altitude": "1.500-3.000",
        "uses": parseUses("M-O-CV-PO"),
        "category": "forestales",
        "description": "El Ciprés (Cupressus lusitanica) es una especie forestal ideal para Maderable, Ornamental, Cercas vivas y Postes",
        "price": "Consultar"
    },
    {
        "id": 25,
        "name": "Ciro",
        "scientific_name": "Baccharis latifolia",
        "altitude": "2.000-3.500",
        "uses": parseUses("RA-L-CV"),
        "category": "forestales",
        "description": "El Ciro (Baccharis latifolia) es una especie forestal ideal para Reforestación Ambiental, Leña y Cercas vivas",
        "price": "Consultar"
    },
    {
        "id": 26,
        "name": "Clavellino",
        "scientific_name": "Caesalpinia pulcherrima",
        "altitude": "0-1.500",
        "uses": parseUses("O-ME"),
        "category": "ornamentales",
        "description": "El Clavellino (Caesalpinia pulcherrima) es una especie ornamental ideal para Ornamental y Melífera",
        "price": "Consultar"
    },
    {
        "id": 27,
        "name": "Coral, Coralitos",
        "scientific_name": "Adenanthera pavonica",
        "altitude": "0-1.200",
        "uses": parseUses("O-S-ME"),
        "category": "ornamentales",
        "description": "El Coral, Coralitos (Adenanthera pavonica) es una especie ornamental ideal para Ornamental, Sombrío y Melífera",
        "price": "Consultar"
    },
    {
        "id": 28,
        "name": "Corono",
        "scientific_name": "Xylosma spiculifera",
        "altitude": "1.500-3.000",
        "uses": parseUses("M-L-CV-RA"),
        "category": "forestales",
        "description": "El Corono (Xylosma spiculifera) es una especie forestal ideal para Maderable, Leña, Cercas vivas y Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 29,
        "name": "Croton Ornamental",
        "scientific_name": "Codiaeum variegatum",
        "altitude": "0-1.500",
        "uses": parseUses("O"),
        "category": "ornamentales",
        "description": "El Croton Ornamental (Codiaeum variegatum) es una especie ornamental ideal para Ornamental",
        "price": "Consultar"
    },
    {
        "id": 30,
        "name": "Cucharo",
        "scientific_name": "Myrsine quinanensis",
        "altitude": "1.800-3.200",
        "uses": parseUses("M-L-RA-CV"),
        "category": "forestales",
        "description": "El Cucharo (Myrsine quinanensis) es una especie forestal ideal para Maderable, Leña, Reforestación Ambiental y Cercas vivas",
        "price": "Consultar"
    },
    {
        "id": 31,
        "name": "Dinde Mora",
        "scientific_name": "Maclura tinctoria",
        "altitude": "0-1.500",
        "uses": parseUses("M-CO-L"),
        "category": "forestales",
        "description": "El Dinde Mora (Maclura tinctoria) es una especie forestal ideal para Maderable, Colorantes y Leña",
        "price": "Consultar"
    },
    {
        "id": 32,
        "name": "Duraznillo",
        "scientific_name": "Abatia parviflora",
        "altitude": "2.000-3.500",
        "uses": parseUses("M-L-RA"),
        "category": "forestales",
        "description": "El Duraznillo (Abatia parviflora) es una especie forestal ideal para Maderable, Leña y Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 33,
        "name": "Eucalyptus Globulus",
        "scientific_name": "Eucalyptus globulus",
        "altitude": "1.800-3.000",
        "uses": parseUses("M-PU-L-I-ME"),
        "category": "forestales",
        "description": "El Eucalyptus Globulus (Eucalyptus globulus) es una especie forestal ideal para Maderable, Pulpa, Leña, Industrial y Melífera",
        "price": "Consultar"
    },
    {
        "id": 34,
        "name": "Eucalyptus Grandis",
        "scientific_name": "Eucalyptus grandis",
        "altitude": "0-2.000",
        "uses": parseUses("M-PU-L-I"),
        "category": "forestales",
        "description": "El Eucalyptus Grandis (Eucalyptus grandis) es una especie forestal ideal para Maderable, Pulpa, Leña e Industrial",
        "price": "Consultar"
    },
    {
        "id": 35,
        "name": "Eucalyptus Pellita",
        "scientific_name": "Eucalyptus pellita",
        "altitude": "0-1.500",
        "uses": parseUses("M-PU-L-I"),
        "category": "forestales",
        "description": "El Eucalyptus Pellita (Eucalyptus pellita) es una especie forestal ideal para Maderable, Pulpa, Leña e Industrial",
        "price": "Consultar"
    },
    {
        "id": 36,
        "name": "Eugenia-Arrayán extranjero",
        "scientific_name": "Eugenia myrtifolia Sims",
        "altitude": "0-2.500",
        "uses": parseUses("O-SE"),
        "category": "ornamentales",
        "description": "El Eugenia-Arrayán extranjero (Eugenia myrtifolia Sims) es una especie ornamental ideal para Ornamental y Setos",
        "price": "Consultar"
    },
    {
        "id": 37,
        "name": "Falso Pimiento",
        "scientific_name": "Shinus molle",
        "altitude": "1.500-3.000",
        "uses": parseUses("O-L-RA"),
        "category": "ornamentales",
        "description": "El Falso Pimiento (Shinus molle) es una especie ornamental ideal para Ornamental, Leña y Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 38,
        "name": "Garrocho-Chuque",
        "scientific_name": "Viburnum triphyllum Bentham",
        "altitude": "2.500-3.500",
        "uses": parseUses("RA-L-CV"),
        "category": "forestales",
        "description": "El Garrocho-Chuque (Viburnum triphyllum Bentham) es una especie forestal ideal para Reforestación Ambiental, Leña y Cercas vivas",
        "price": "Consultar"
    },
    {
        "id": 39,
        "name": "Guácimo",
        "scientific_name": "Guazuma ulmifolia",
        "altitude": "0-1.500",
        "uses": parseUses("S-F-M-L"),
        "category": "forrajeras",
        "description": "El Guácimo (Guazuma ulmifolia) es una especie forrajera ideal para Sombrío, Forraje, Maderable y Leña",
        "price": "Consultar"
    },
    {
        "id": 40,
        "name": "Gualanday",
        "scientific_name": "Jacaranda caucana",
        "altitude": "800-2.000",
        "uses": parseUses("O-M-S"),
        "category": "ornamentales",
        "description": "El Gualanday (Jacaranda caucana) es una especie ornamental ideal para Ornamental, Maderable y Sombrío",
        "price": "Consultar"
    },
    {
        "id": 41,
        "name": "Guayacán Amarillo",
        "scientific_name": "Tabebuia chrysantha",
        "altitude": "0-1.500",
        "uses": parseUses("O-M-S"),
        "category": "ornamentales",
        "description": "El Guayacán Amarillo (Tabebuia chrysantha) es una especie ornamental ideal para Ornamental, Maderable y Sombrío",
        "price": "Consultar"
    },
    {
        "id": 42,
        "name": "Guayacán de Manizales",
        "scientific_name": "Lafoensia acuminata",
        "altitude": "1.000-2.500",
        "uses": parseUses("M-O-S"),
        "category": "forestales",
        "description": "El Guayacán de Manizales (Lafoensia acuminata) es una especie forestal ideal para Maderable, Ornamental y Sombrío",
        "price": "Consultar"
    },
    {
        "id": 43,
        "name": "Hayuelo",
        "scientific_name": "Dodonea viscosa",
        "altitude": "1.500-3.500",
        "uses": parseUses("L-CV-RA"),
        "category": "forestales",
        "description": "El Hayuelo (Dodonea viscosa) es una especie forestal ideal para Leña, Cercas vivas y Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 44,
        "name": "Holly Espinoso",
        "scientific_name": "Pyracantha coccinea",
        "altitude": "1.500-3.000",
        "uses": parseUses("O-SE-CV"),
        "category": "ornamentales",
        "description": "El Holly Espinoso (Pyracantha coccinea) es una especie ornamental ideal para Ornamental, Setos y Cercas vivas",
        "price": "Consultar"
    },
    {
        "id": 45,
        "name": "Holly Liso",
        "scientific_name": "Cotoneaster pannosa",
        "altitude": "1.500-3.000",
        "uses": parseUses("O-SE-CV"),
        "category": "ornamentales",
        "description": "El Holly Liso (Cotoneaster pannosa) es una especie ornamental ideal para Ornamental, Setos y Cercas vivas",
        "price": "Consultar"
    },
    {
        "id": 46,
        "name": "Iguá, Nauno",
        "scientific_name": "Pseudosamanea guachapele",
        "altitude": "0-1.200",
        "uses": parseUses("M-S-F-O"),
        "category": "forestales",
        "description": "El Iguá, Nauno (Pseudosamanea guachapele) es una especie forestal ideal para Maderable, Sombrío, Forraje y Ornamental",
        "price": "Consultar"
    },
    {
        "id": 47,
        "name": "Jazmín del cabo, Laurel Huesito",
        "scientific_name": "Pittosporum undulatum",
        "altitude": "1.500-2.800",
        "uses": parseUses("O-SE"),
        "category": "ornamentales",
        "description": "El Jazmín del cabo, Laurel Huesito (Pittosporum undulatum) es una especie ornamental ideal para Ornamental y Setos",
        "price": "Consultar"
    },
    {
        "id": 48,
        "name": "Laurel del Cera",
        "scientific_name": "Morella pubescens",
        "altitude": "1.500-3.500",
        "uses": parseUses("M-L-CV-RA"),
        "category": "forestales",
        "description": "El Laurel del Cera (Morella pubescens) es una especie forestal ideal para Maderable, Leña, Cercas vivas y Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 49,
        "name": "Leucaena",
        "scientific_name": "Leucaena leucocephala",
        "altitude": "0-1.500",
        "uses": parseUses("F-S-CV-L"),
        "category": "forrajeras",
        "description": "La Leucaena (Leucaena leucocephala) es una especie forrajera ideal para Forraje, Sombrío, Cercas vivas y Leña",
        "price": "Consultar"
    },
    {
        "id": 50,
        "name": "Limón Ornamental",
        "scientific_name": "Swinglea glutinosa",
        "altitude": "0-1.800",
        "uses": parseUses("O-CV-SE"),
        "category": "ornamentales",
        "description": "El Limón Ornamental (Swinglea glutinosa) es una especie ornamental ideal para Ornamental, Cercas vivas y Setos",
        "price": "Consultar"
    },
    {
        "id": 51,
        "name": "Lluvia de Oro",
        "scientific_name": "Cassia fistula",
        "altitude": "0-1.500",
        "uses": parseUses("O-S-ME"),
        "category": "ornamentales",
        "description": "La Lluvia de Oro (Cassia fistula) es una especie ornamental ideal para Ornamental, Sombrío y Melífera",
        "price": "Consultar"
    },
    {
        "id": 52,
        "name": "Mano de Oso, Pata de Gallina",
        "scientific_name": "Oreopanax floribundum",
        "altitude": "1.800-3.500",
        "uses": parseUses("M-L-RA"),
        "category": "forestales",
        "description": "El Mano de Oso, Pata de Gallina (Oreopanax floribundum) es una especie forestal ideal para Maderable, Leña y Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 53,
        "name": "Mataratón",
        "scientific_name": "Gliricidia sepium",
        "altitude": "0-1.500",
        "uses": parseUses("F-S-CV-L-PO"),
        "category": "forrajeras",
        "description": "El Mataratón (Gliricidia sepium) es una especie forrajera ideal para Forraje, Sombrío, Cercas vivas, Leña y Postes",
        "price": "Consultar"
    },
    {
        "id": 54,
        "name": "Melina",
        "scientific_name": "Gmelina arborea",
        "altitude": "0-1.200",
        "uses": parseUses("M-PU-L-O"),
        "category": "forestales",
        "description": "La Melina (Gmelina arborea) es una especie forestal ideal para Maderable, Pulpa, Leña y Ornamental",
        "price": "Consultar"
    },
    {
        "id": 55,
        "name": "Mortiño",
        "scientific_name": "Hesperomeles goudotiana",
        "altitude": "2.500-3.500",
        "uses": parseUses("RA-L-AL"),
        "category": "forestales",
        "description": "El Mortiño (Hesperomeles goudotiana) es una especie forestal ideal para Reforestación Ambiental, Leña y Alimento",
        "price": "Consultar"
    },
    {
        "id": 56,
        "name": "Nacedero",
        "scientific_name": "Trichanthera gigantea",
        "altitude": "0-2.500",
        "uses": parseUses("F-CV-RA"),
        "category": "forrajeras",
        "description": "El Nacedero (Trichanthera gigantea) es una especie forrajera ideal para Forraje, Cercas vivas y Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 57,
        "name": "Nogal Cafetero, Canalete, Pardillo",
        "scientific_name": "Cordia alliodora",
        "altitude": "0-1.800",
        "uses": parseUses("M-MU-CAR-S"),
        "category": "forestales",
        "description": "El Nogal Cafetero, Canalete, Pardillo (Cordia alliodora) es una especie forestal ideal para Maderable, Muebles, Carpintería y Sombrío",
        "price": "Consultar"
    },
    {
        "id": 58,
        "name": "Ocobo",
        "scientific_name": "Tabebuia rosea",
        "altitude": "0-1.200",
        "uses": parseUses("M-O-S"),
        "category": "ornamentales",
        "description": "El Ocobo (Tabebuia rosea) es una especie ornamental ideal para Maderable, Ornamental y Sombrío",
        "price": "Consultar"
    },
    {
        "id": 59,
        "name": "Oiti",
        "scientific_name": "Licania tomentosa",
        "altitude": "0-800",
        "uses": parseUses("O-S"),
        "category": "ornamentales",
        "description": "El Oiti (Licania tomentosa) es una especie ornamental ideal para Ornamental y Sombrío",
        "price": "Consultar"
    },
    {
        "id": 60,
        "name": "Orejero",
        "scientific_name": "Enterolobium cyclocarpum",
        "altitude": "0-1.200",
        "uses": parseUses("M-S-F-O"),
        "category": "forestales",
        "description": "El Orejero (Enterolobium cyclocarpum) es una especie forestal ideal para Maderable, Sombrío, Forraje y Ornamental",
        "price": "Consultar"
    },
    {
        "id": 61,
        "name": "Palma Abanico",
        "scientific_name": "Livistona chinensis",
        "altitude": "0-1.500",
        "uses": parseUses("O"),
        "category": "ornamentales",
        "description": "La Palma Abanico (Livistona chinensis) es una especie ornamental ideal para Ornamental",
        "price": "Consultar"
    },
    {
        "id": 62,
        "name": "Palma Areca",
        "scientific_name": "Chrysalidocarpus lutescens",
        "altitude": "0-1.500",
        "uses": parseUses("O"),
        "category": "ornamentales",
        "description": "La Palma Areca (Chrysalidocarpus lutescens) es una especie ornamental ideal para Ornamental",
        "price": "Consultar"
    },
    {
        "id": 63,
        "name": "Palma Botella, Palma Real",
        "scientific_name": "Roystonea regia",
        "altitude": "0-1.000",
        "uses": parseUses("O"),
        "category": "ornamentales",
        "description": "La Palma Botella, Palma Real (Roystonea regia) es una especie ornamental ideal para Ornamental",
        "price": "Consultar"
    },
    {
        "id": 64,
        "name": "Palma Mariposa",
        "scientific_name": "Caryota mitis",
        "altitude": "0-1.500",
        "uses": parseUses("O"),
        "category": "ornamentales",
        "description": "La Palma Mariposa (Caryota mitis) es una especie ornamental ideal para Ornamental",
        "price": "Consultar"
    },
    {
        "id": 65,
        "name": "Payande",
        "scientific_name": "Pithecellobium dulce",
        "altitude": "0-1.500",
        "uses": parseUses("S-F-L-AL"),
        "category": "forrajeras",
        "description": "El Payande (Pithecellobium dulce) es una especie forrajera ideal para Sombrío, Forraje, Leña y Alimento",
        "price": "Consultar"
    },
    {
        "id": 66,
        "name": "Pino Pátula",
        "scientific_name": "Pinus patula",
        "altitude": "1.800-3.000",
        "uses": parseUses("M-PU-O-PO"),
        "category": "forestales",
        "description": "El Pino Pátula (Pinus patula) es una especie forestal ideal para Maderable, Pulpa, Ornamental y Postes",
        "price": "Consultar"
    },
    {
        "id": 67,
        "name": "Pomarroso Brasilero",
        "scientific_name": "Eugenia malaccensis",
        "altitude": "0-1.800",
        "uses": parseUses("O-AL-S"),
        "category": "ornamentales",
        "description": "El Pomarroso Brasilero (Eugenia malaccensis) es una especie ornamental ideal para Ornamental, Alimento y Sombrío",
        "price": "Consultar"
    },
    {
        "id": 68,
        "name": "Roble",
        "scientific_name": "Quercus humboldtii",
        "altitude": "1.200-3.200",
        "uses": parseUses("M-MU-CAR-O"),
        "category": "forestales",
        "description": "El Roble (Quercus humboldtii) es una especie forestal ideal para Maderable, Muebles, Carpintería y Ornamental",
        "price": "Consultar"
    },
    {
        "id": 69,
        "name": "Saman",
        "scientific_name": "Samanea saman",
        "altitude": "0-1.000",
        "uses": parseUses("S-F-O-M"),
        "category": "forrajeras",
        "description": "El Saman (Samanea saman) es una especie forrajera ideal para Sombrío, Forraje, Ornamental y Maderable",
        "price": "Consultar"
    },
    {
        "id": 70,
        "name": "Sauce llorón",
        "scientific_name": "Salix humboldtii",
        "altitude": "1.500-3.500",
        "uses": parseUses("O-RA-CV"),
        "category": "ornamentales",
        "description": "El Sauce llorón (Salix humboldtii) es una especie ornamental ideal para Ornamental, Reforestación Ambiental y Cercas vivas",
        "price": "Consultar"
    },
    {
        "id": 71,
        "name": "Sauco",
        "scientific_name": "Sambucus nigra",
        "altitude": "1.800-3.500",
        "uses": parseUses("O-AL-ME"),
        "category": "ornamentales",
        "description": "El Sauco (Sambucus nigra) es una especie ornamental ideal para Ornamental, Alimento y Melífera",
        "price": "Consultar"
    },
    {
        "id": 72,
        "name": "Suribio",
        "scientific_name": "Zygia longifolium",
        "altitude": "0-1.500",
        "uses": parseUses("S-F-RA"),
        "category": "forrajeras",
        "description": "El Suribio (Zygia longifolium) es una especie forrajera ideal para Sombrío, Forraje y Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 73,
        "name": "Teca",
        "scientific_name": "Tectona grandis",
        "altitude": "0-1.500",
        "uses": parseUses("M-MU-O"),
        "category": "forestales",
        "description": "La Teca (Tectona grandis) es una especie forestal ideal para Maderable, Muebles y Ornamental",
        "price": "Consultar"
    },
    {
        "id": 74,
        "name": "Tulipán Africano",
        "scientific_name": "Spathodea campanulata",
        "altitude": "0-1.800",
        "uses": parseUses("O-S-ME"),
        "category": "ornamentales",
        "description": "El Tulipán Africano (Spathodea campanulata) es una especie ornamental ideal para Ornamental, Sombrío y Melífera",
        "price": "Consultar"
    },
    {
        "id": 75,
        "name": "Urapan",
        "scientific_name": "Fraxinus chinensis",
        "altitude": "1.200-2.800",
        "uses": parseUses("M-O-S"),
        "category": "ornamentales",
        "description": "El Urapan (Fraxinus chinensis) es una especie ornamental ideal para Maderable, Ornamental y Sombrío",
        "price": "Consultar"
    },
    {
        "id": 76,
        "name": "Vainillo",
        "scientific_name": "Senna spectabilis",
        "altitude": "0-1.500",
        "uses": parseUses("O-S-ME"),
        "category": "ornamentales",
        "description": "El Vainillo (Senna spectabilis) es una especie ornamental ideal para Ornamental, Sombrío y Melífera",
        "price": "Consultar"
    },
    {
        "id": 77,
        "name": "Yopo Café",
        "scientific_name": "Piptadenia opacifolia",
        "altitude": "0-1.000",
        "uses": parseUses("L-PO-F"),
        "category": "forrajeras",
        "description": "El Yopo Café (Piptadenia opacifolia) es una especie forrajera ideal para Leña, Postes y Forraje",
        "price": "Consultar"
    },
    {
        "id": 78,
        "name": "Yopo Negro",
        "scientific_name": "Anadenanthera peregrina",
        "altitude": "0-1.200",
        "uses": parseUses("M-L-PO"),
        "category": "forestales",
        "description": "El Yopo Negro (Anadenanthera peregrina) es una especie forestal ideal para Maderable, Leña y Postes",
        "price": "Consultar"
    }
];