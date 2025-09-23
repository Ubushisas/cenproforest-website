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

// Function to get image path for plant with normalized names (UPDATED)
function getPlantImage(plantName, scientificName = '') {
    // Mapping from plant names to their normalized image filenames
    const imageNameMappings = {
        'Abarco': 'abarco_1',
        'Acacia Amarilla': 'acacia_amarilla',
        'Acacia Japonesa': 'acacia_japonesa',
        'Acacia Mangium': 'acacia_mangium',
        'Acacia Negra': 'acacia_negra',
        'Acacia Roja': 'acacia_roja',
        'Achiote, Onoto': 'achiote_onoto',
        'Aliso': 'aliso_1',
        'Almendro': 'almendro_1_2',
        'Arrayán Común': 'arrayan_comun',
        'Balso': 'balso_1',
        'Búcaro': 'bucaro',
        'Cajeto': 'cajeto_caragay',
        'Caoba': 'caoba_1',
        'Caracolí': 'caracoli',
        'Casco De Vaca': 'casco_de_vaca',
        'Cayeno': 'cayeno_1',
        'Cedro Rosado': 'cedro_rosado',
        'Cedro de Altura': 'cedro_de_altura',
        'Ceiba': 'ceiba_1',
        'Cerezo': 'cerezo_1_2',
        'Chicalá': 'chicala',
        'Ciprés': 'cipres',
        'Ciro': 'ciro_1',
        'Clavellino': 'clavellino_1',
        'Coral, Coralitos': 'coral_coralitos',
        'Corono': 'corono_1',
        'Crotón Ornamental': 'croton_ornamental',
        'Cucharo': 'cucharo_1',
        'Cámbulo': 'cambulo',
        'Dinde Mora': 'dinde_mora',
        'Duraznillo': 'duraznillo_1',
        'Eucalyptus Globulus': 'eucalyptus_globulus',
        'Eucalyptus Grandis': 'eucalyptus_grandis',
        'Eucalyptus Pellita': 'eucalyptus_pellita',
        'Eugenia-Arrayán extranjero': 'eugenia-arrayan_extranjero',
        'Falso Pimiento': 'falso_pimiento',
        'Garrocho-Chuque': 'garrocho-chuque_1',
        'Gualanday': 'gualanday_1',
        'Guayacán Amarillo': 'guayacan_amarillo',
        'Guayacán de Manizales': 'guayacan_de_manizales',
        'Guácimo': 'guacimo',
        'Hayuelo': 'hayuelo_1',
        'Holly Espinoso': 'holly_espinoso',
        'Holly Liso': 'holly_liso',
        'Iguá, Nauno': 'igua_nauno',
        'Jazmín del cabo, Laurel Huesito': 'jazmin_del_cabo_laurel_huesito',
        'Laurel del Cera': 'laurel_del_cera',
        'Leucaena': 'leucaena_1',
        'Limón Ornamental': 'limon_ornamental',
        'Lluvia de Oro': 'lluvia_de_oro',
        'Mano de Oso, Pata de Gallina': 'mano_de_oso_pata_de_gallina',
        'Matarratón': 'matarraton',
        'Melina': 'melina_1',
        'Mortiño': 'mortino',
        'Nacedero': 'nacedero_1_2',
        'Nogal Cafetero, Canalete, Pardillo': 'nogal_cafetero_canalete_pardillo',
        'Ocobo': 'ocobo_1_2',
        'Oití': 'oiti',
        'Orejero': 'orejero_1_2',
        'Palma Abanico': 'palma_abanico',
        'Palma Areca': 'palma_areca',
        'Palma Botella, Palma Real': 'palma_botella_palma_real',
        'Palma Mariposa': 'palma_mariposa',
        'Payandé': 'payande',
        'Pino Pátula': 'pino_patula',
        'Pomarroso Brasilero': 'pomarroso_brasilero',
        'Roble': 'roble_1_2',
        'Samán': 'saman',
        'Sauce llorón': 'sauce_lloron',
        'Sauco': 'sauco_1_2',
        'Suribio': 'suribio_1',
        'Teca': 'teca_1_2',
        'Tulipán Africano': 'tulipan_africano',
        'Urapán': 'urapan',
        'Vainillo, Mucátano, Velero': 'vainillo_mucatano_velero',
        'Yopo Café': 'yopo_cafe',
        'Yopo Negro': 'yopo_negro'
    };

    // Handle special case for Búcaro folder name (has trailing space)
    if (plantName === 'Búcaro') {
        return `assets/Catalogo/Búcaro /bucaro.jpg`;
    }

    // Handle special cases for Eucalyptus species
    if (plantName === 'Eucalipto Blanco' || (plantName === 'Eucalipto' && scientificName === 'Eucalyptus globulus')) {
        return `assets/Catalogo/Eucalyptus Globulus/eucalyptus_globulus.jpg`;
    }
    if (plantName === 'Eucalipto Rojo' || (plantName === 'Eucalipto' && scientificName === 'Eucalyptus grandis')) {
        return `assets/Catalogo/Eucalyptus Grandis/eucalyptus_grandis.jpg`;
    }
    if (plantName === 'Eucalipto Pellita' || (plantName === 'Eucalipto' && scientificName === 'Eucalyptus pellita')) {
        return `assets/Catalogo/Eucalyptus Pellita/eucalyptus_pellita.jpg`;
    }

    // Get the normalized image name
    const imageName = imageNameMappings[plantName];
    if (imageName) {
        return `assets/Catalogo/${plantName}/${imageName}.jpg`;
    }

    // Fallback to original logic for any unmapped plants
    return `assets/Catalogo/${plantName}/${plantName}.jpg`;
}

// Complete catalog data - All 78 plants in correct alphabetical order from CSV
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
        "category": "forrajeras",
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
        "altitude": "0-2000",
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
        "altitude": "0-2000",
        "uses": parseUses("O-RA"),
        "category": "ornamentales",
        "description": "El Búcaro (Erythrina fusca) es una especie ornamental ideal para Ornamental y Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 13,
        "name": "Cajeto",
        "scientific_name": "Cytheraxylum subflavescens",
        "altitude": "0-2000",
        "uses": parseUses("O-RA"),
        "category": "ornamentales",
        "description": "Cajeto (<i>Cytheraxylum subflavescens</i>) - Especie forestale ideal para Ornamental, Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 14,
        "name": "Cámbulo",
        "scientific_name": "Erythrina poeppigiana",
        "altitude": "400-1.700",
        "uses": parseUses("O-CV-M-CAR-S-F-RA"),
        "category": "forrajeras",
        "description": "Cámbulo (<i>Erythrina poeppigiana</i>) - Especie forrajera ideal para Ornamental, Cercas vivas, Maderable...",
        "price": "Consultar"
    },
    {
        "id": 15,
        "name": "Caoba",
        "scientific_name": "Swietenia macrophylla",
        "altitude": "0-1.400",
        "uses": parseUses("M-O-SA-ME-PU-PO-L"),
        "category": "forestales",
        "description": "Caoba (<i>Swietenia macrophylla</i>) - Especie forestale ideal para Maderable, Ornamental, Sistemas Agroforestales...",
        "price": "Consultar"
    },
    {
        "id": 16,
        "name": "Caracolí",
        "scientific_name": "Anacardium excelsum",
        "altitude": "0-2000",
        "uses": parseUses("O-RA"),
        "category": "forestales",
        "description": "Caracolí (<i>Anacardium excelsum</i>) - Especie forestale ideal para Ornamental, Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 17,
        "name": "Casco De Vaca",
        "scientific_name": "Bauhinia purpurea",
        "altitude": "0-1.600",
        "uses": parseUses("O-CV"),
        "category": "forrajeras",
        "description": "Casco De Vaca (<i>Bauhinia purpurea</i>) - Especie forrajera ideal para Ornamental, Cercas vivas",
        "price": "Consultar"
    },
    {
        "id": 18,
        "name": "Cayeno",
        "scientific_name": "Hibiscus rosasiensis",
        "altitude": "0-2.600",
        "uses": parseUses("O"),
        "category": "ornamentales",
        "description": "Cayeno (<i>Hibiscus rosasiensis</i>) - Especie ornamentale ideal para Ornamental",
        "price": "Consultar"
    },
    {
        "id": 19,
        "name": "Cedro de Altura",
        "scientific_name": "Cedrela montana",
        "altitude": "1.600-3.000",
        "uses": parseUses("M-O-L-CV-CH-RA"),
        "category": "forestales",
        "description": "Cedro de Altura (<i>Cedrela montana</i>) - Especie forrajera ideal para Maderable, Ornamental, Leña...",
        "price": "Consultar"
    },
    {
        "id": 20,
        "name": "Cedro Rosado",
        "scientific_name": "Cedrela odorata",
        "altitude": "0-2.000",
        "uses": parseUses("M-A-CH-RA-O-ME"),
        "category": "forestales",
        "description": "Cedro Rosado (<i>Cedrela odorata</i>) - Especie forestale ideal para Maderable, Aglomerado, Chapas...",
        "price": "Consultar"
    },
    {
        "id": 21,
        "name": "Ceiba",
        "scientific_name": "Pachira quinata",
        "altitude": "0-900",
        "uses": parseUses("A-M"),
        "category": "forestales",
        "description": "Ceiba (<i>Pachira quinata</i>) - Especie forestale ideal para Aglomerado, Maderable",
        "price": "Consultar"
    },
    {
        "id": 22,
        "name": "Cerezo",
        "scientific_name": "Prunus serotina",
        "altitude": "0-2000",
        "uses": parseUses("O-RA"),
        "category": "ornamentales",
        "description": "Cerezo (<i>Prunus serotina</i>) - Especie forestale ideal para Ornamental, Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 23,
        "name": "Chicalá",
        "scientific_name": "Tecoma stans",
        "altitude": "0-2000",
        "uses": parseUses("O-RA"),
        "category": "ornamentales",
        "description": "Chicalá (<i>Tecoma stans</i>) - Especie forestale ideal para Ornamental, Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 24,
        "name": "Ciprés",
        "scientific_name": "Cupressus lusitanica",
        "altitude": "0-2000",
        "uses": parseUses("O-RA"),
        "category": "forestales",
        "description": "Ciprés (<i>Cupressus lusitanica</i>) - Especie forestale ideal para Ornamental, Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 25,
        "name": "Ciro",
        "scientific_name": "Baccharis macrantha",
        "altitude": "1.800-3.200",
        "uses": parseUses("L-CA-CV-ME-RA"),
        "category": "forrajeras",
        "description": "Ciro (<i>Baccharis macrantha</i>) - Especie forrajera ideal para Leña, Carbón, Cercas vivas...",
        "price": "Consultar"
    },
    {
        "id": 26,
        "name": "Clavellino",
        "scientific_name": "Caesalpinia pulcherrima",
        "altitude": "0-1.600",
        "uses": parseUses("O"),
        "category": "ornamentales",
        "description": "Clavellino (<i>Caesalpinia pulcherrima</i>) - Especie ornamentale ideal para Ornamental",
        "price": "Consultar"
    },
    {
        "id": 27,
        "name": "Coral, Coralitos",
        "scientific_name": "Adenanthera pavonica",
        "altitude": "0-1.500",
        "uses": parseUses("O-CV"),
        "category": "ornamentales",
        "description": "Coral, Coralitos (<i>Adenanthera pavonica</i>) - Especie forrajera ideal para Ornamental, Cercas vivas",
        "price": "Consultar"
    },
    {
        "id": 28,
        "name": "Corono",
        "scientific_name": "Xylosma spiculifera",
        "altitude": "2.000-3.200",
        "uses": parseUses("CV-O"),
        "category": "ornamentales",
        "description": "Corono (<i>Xylosma spiculifera</i>) - Especie forrajera ideal para Cercas vivas, Ornamental",
        "price": "Consultar"
    },
    {
        "id": 29,
        "name": "Crotón Ornamental",
        "scientific_name": "Codiaeum variegatum",
        "altitude": "0-1.500",
        "uses": parseUses("O"),
        "category": "ornamentales",
        "description": "Croton Ornamental (<i>Codiaeum variegatum</i>) - Especie ornamentale ideal para Ornamental",
        "price": "Consultar"
    },
    {
        "id": 30,
        "name": "Cucharo",
        "scientific_name": "Myrsine quinanensis",
        "altitude": "2.000-2.800",
        "uses": parseUses("RA-O"),
        "category": "ornamentales",
        "description": "Cucharo (<i>Myrsine quinanensis</i>) - Especie ornamentale ideal para Reforestación Ambiental, Ornamental",
        "price": "Consultar"
    },
    {
        "id": 31,
        "name": "Dinde Mora",
        "scientific_name": "Chiorophora tinctoria",
        "altitude": "0-1.200",
        "uses": parseUses("M-I-RA-L-S"),
        "category": "forrajeras",
        "description": "Dinde Mora (<i>Chiorophora tinctoria</i>) - Especie forestale ideal para Maderable, Industrial, Reforestación Ambiental...",
        "price": "Consultar"
    },
    {
        "id": 32,
        "name": "Duraznillo",
        "scientific_name": "Abatia parviflora",
        "altitude": "2.000-2.900",
        "uses": parseUses("M-RA-M-CV"),
        "category": "ornamentales",
        "description": "Duraznillo (<i>Abatia parviflora</i>) - Especie forrajera ideal para Maderable, Reforestación Ambiental, Maderable...",
        "price": "Consultar"
    },
    {
        "id": 33,
        "name": "Eucalipto Blanco",
        "scientific_name": "Eucalyptus globulus",
        "altitude": "1.600-2.900",
        "uses": parseUses("M-CH-A-PU-PO-L-CA-CV"),
        "category": "forestales",
        "description": "Eucalyptus Globulus (<i>Eucalyptus globulus</i>) - Especie forrajera ideal para Maderable, Chapas, Aglomerado...",
        "price": "Consultar"
    },
    {
        "id": 34,
        "name": "Eucalipto Rojo",
        "scientific_name": "Eucalyptus grandis",
        "altitude": "100-2.100",
        "uses": parseUses("M-CH-A-PU-PO-L-CA-CV"),
        "category": "forestales",
        "description": "Eucalyptus Grandis (<i>Eucalyptus grandis</i>) - Especie forrajera ideal para Maderable, Chapas, Aglomerado...",
        "price": "Consultar"
    },
    {
        "id": 35,
        "name": "Eucalipto Pellita",
        "scientific_name": "Eucalyptus pellita",
        "altitude": "0-600",
        "uses": parseUses("M-I-SA-PO-L-CV"),
        "category": "forestales",
        "description": "Eucalyptus Pellita (<i>Eucalyptus pellita</i>) - Especie forrajera ideal para Maderable, Industrial, Sistemas Agroforestales...",
        "price": "Consultar"
    },
    {
        "id": 36,
        "name": "Eugenia-Arrayán extranjero",
        "scientific_name": "Eugenia myrtifolia Sims",
        "altitude": "1.000-2.900",
        "uses": parseUses("CV-SE-O"),
        "category": "ornamentales",
        "description": "Eugenia-Arrayán extranjero (<i>Eugenia myrtifolia Sims</i>) - Especie forrajera ideal para Cercas vivas, Setos, Ornamental",
        "price": "Consultar"
    },
    {
        "id": 37,
        "name": "Falso Pimiento",
        "scientific_name": "Shinus molle",
        "altitude": "1.800-2.800",
        "uses": parseUses("O-CAR-L-CA-PO-CV-RA-ME"),
        "category": "ornamentales",
        "description": "Falso Pimiento (<i>Shinus molle</i>) - Especie forrajera ideal para Ornamental, Carpintería, Leña...",
        "price": "Consultar"
    },
    {
        "id": 38,
        "name": "Garrocho-Chuque",
        "scientific_name": "Viburnum triphyllum Bentham",
        "altitude": "1.700-3.600",
        "uses": parseUses("CAR-O-CV"),
        "category": "forrajeras",
        "description": "Garrocho-Chuque (<i>Viburnum triphyllum Bentham</i>) - Especie forrajera ideal para Carpintería, Ornamental, Cercas vivas",
        "price": "Consultar"
    },
    {
        "id": 39,
        "name": "Guácimo",
        "scientific_name": "Guazuma ulmifolia",
        "altitude": "0-2000",
        "uses": parseUses("O-RA"),
        "category": "forrajeras",
        "description": "Guácimo (<i>Guazuma ulmifolia</i>) - Especie forestale ideal para Ornamental, Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 40,
        "name": "Gualanday",
        "scientific_name": "Jacaranda caucana",
        "altitude": "0-1.500",
        "uses": parseUses("O-L-M-RA-CAR-CV"),
        "category": "ornamentales",
        "description": "Gualanday (<i>Jacaranda caucana</i>) - Especie forrajera ideal para Ornamental, Leña, Maderable...",
        "price": "Consultar"
    },
    {
        "id": 41,
        "name": "Guayacán Amarillo",
        "scientific_name": "Tabebuia chrysantha",
        "altitude": "0-1.800",
        "uses": parseUses("M-L-O-CAR-RA-CV"),
        "category": "forestales",
        "description": "Guayacán Amarillo (<i>Tabebuia chrysantha</i>) - Especie forrajera ideal para Maderable, Leña, Ornamental...",
        "price": "Consultar"
    },
    {
        "id": 42,
        "name": "Guayacán de Manizales",
        "scientific_name": "Lafonesia speciosa",
        "altitude": "1.400-2.800",
        "uses": parseUses("L-O-SE-CV-RA"),
        "category": "forestales",
        "description": "Guayacán de Manizales (<i>Lafonesia speciosa</i>) - Especie forrajera ideal para Leña, Ornamental, Setos...",
        "price": "Consultar"
    },
    {
        "id": 43,
        "name": "Hayuelo",
        "scientific_name": "Dodonea viscosa",
        "altitude": "0-2000",
        "uses": parseUses("O-RA"),
        "category": "ornamentales",
        "description": "Hayuelo (<i>Dodonea viscosa</i>) - Especie forestale ideal para Ornamental, Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 44,
        "name": "Holly Espinoso",
        "scientific_name": "Pyracantha coccinea",
        "altitude": "1.800-3.000",
        "uses": parseUses("O-CV"),
        "category": "ornamentales",
        "description": "Holly Espinoso (<i>Pyracantha coccinea</i>) - Especie forrajera ideal para Ornamental, Cercas vivas",
        "price": "Consultar"
    },
    {
        "id": 45,
        "name": "Holly Liso",
        "scientific_name": "Cotoneaster pannosa",
        "altitude": "0-2000",
        "uses": parseUses("O-RA"),
        "category": "ornamentales",
        "description": "Holly Liso (<i>Cotoneaster pannosa</i>) - Especie forestale ideal para Ornamental, Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 46,
        "name": "Iguá, Nauno",
        "scientific_name": "Pseudosamanea guachapele",
        "altitude": "0-1.500",
        "uses": parseUses("M-S-L-I-CV-F"),
        "category": "forestales",
        "description": "Iguá, Nauno (<i>Pseudosamanea guachapele</i>) - Especie forrajera ideal para Maderable, Sombrío, Leña...",
        "price": "Consultar"
    },
    {
        "id": 47,
        "name": "Jazmín del cabo, Laurel Huesito",
        "scientific_name": "Pittosporum undulatum",
        "altitude": "1.700-2.800",
        "uses": parseUses("O-I-RA-ME"),
        "category": "ornamentales",
        "description": "Jazmín del cabo, Laurel Huesito (<i>Pittosporum undulatum</i>) - Especie forestale ideal para Ornamental, Industrial, Reforestación Ambiental...",
        "price": "Consultar"
    },
    {
        "id": 48,
        "name": "Laurel del Cera",
        "scientific_name": "Morella pubescens",
        "altitude": "1.700-3.900",
        "uses": parseUses("O-I-RA"),
        "category": "forestales",
        "description": "Laurel del Cera (<i>Morella pubescens</i>) - Especie forestale ideal para Ornamental, Industrial, Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 49,
        "name": "Leucaena",
        "scientific_name": "Leucaena leucocephala",
        "altitude": "0-2000",
        "uses": parseUses("O-RA"),
        "category": "forrajeras",
        "description": "Leucaena (<i>Leucaena leucocephala</i>) - Especie forestale ideal para Ornamental, Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 50,
        "name": "Limón Ornamental",
        "scientific_name": "Swinglea glutinosa",
        "altitude": "0-1.700",
        "uses": parseUses("O-CV-SE"),
        "category": "ornamentales",
        "description": "Limón Ornamental (<i>Swinglea glutinosa</i>) - Especie forrajera ideal para Ornamental, Cercas vivas, Setos",
        "price": "Consultar"
    },
    {
        "id": 51,
        "name": "Lluvia de Oro",
        "scientific_name": "Cassia fistula",
        "altitude": "0-1.500",
        "uses": parseUses("O"),
        "category": "ornamentales",
        "description": "Lluvia de Oro (<i>Cassia fistula</i>) - Especie ornamentale ideal para Ornamental",
        "price": "Consultar"
    },
    {
        "id": 52,
        "name": "Mano de Oso, Pata de Gallina",
        "scientific_name": "Oreopanax floribundum",
        "altitude": "2.000-2.900",
        "uses": parseUses("O-RA-CV-S-I"),
        "category": "forrajeras",
        "description": "Mano de Oso, Pata de Gallina (<i>Oreopanax floribundum</i>) - Especie forrajera ideal para Ornamental, Reforestación Ambiental, Cercas vivas...",
        "price": "Consultar"
    },
    {
        "id": 53,
        "name": "Matarratón",
        "scientific_name": "Gliricidia sepium",
        "altitude": "0-1.500",
        "uses": parseUses("F-CV-S-AV-I-PO-RA-O"),
        "category": "forrajeras",
        "description": "Mataratón (<i>Gliricidia sepium</i>) - Especie forrajera ideal para Forraje, Cercas vivas, Sombrío...",
        "price": "Consultar"
    },
    {
        "id": 54,
        "name": "Melina",
        "scientific_name": "Gmelina arborea",
        "altitude": "0-1.000",
        "uses": parseUses("M-CV-CH-A-PU-PO-L-CA-F"),
        "category": "forestales",
        "description": "Melina (<i>Gmelina arborea</i>) - Especie forrajera ideal para Maderable, Cercas vivas, Chapas...",
        "price": "Consultar"
    },
    {
        "id": 55,
        "name": "Mortiño",
        "scientific_name": "Hesperomeles goudotiana",
        "altitude": "0-2000",
        "uses": parseUses("O-RA"),
        "category": "forrajeras",
        "description": "Mortiño (<i>Hesperomeles goudotiana</i>) - Especie forestale ideal para Ornamental, Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 56,
        "name": "Nacedero",
        "scientific_name": "Trichanthera gigantea",
        "altitude": "0-2000",
        "uses": parseUses("O-RA"),
        "category": "forrajeras",
        "description": "Nacedero (<i>Trichanthera gigantea</i>) - Especie forestale ideal para Ornamental, Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 57,
        "name": "Nogal Cafetero, Canalete, Pardillo",
        "scientific_name": "Cordia alliadora",
        "altitude": "0-1.900",
        "uses": parseUses("M-L-S-I-O-RA-CH-SA-ME"),
        "category": "forestales",
        "description": "Nogal Cafetero, Canalete, Pardillo (<i>Cordia alliadora</i>) - Especie forestale ideal para Maderable, Leña, Sombrío...",
        "price": "Consultar"
    },
    {
        "id": 58,
        "name": "Ocobo",
        "scientific_name": "Tabebuia rosea",
        "altitude": "0-2000",
        "uses": parseUses("O-RA"),
        "category": "forestales",
        "description": "Ocobo (<i>Tabebuia rosea</i>) - Especie forestale ideal para Ornamental, Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 59,
        "name": "Oití",
        "scientific_name": "Licania tomentosa",
        "altitude": "0-1.000",
        "uses": parseUses("O-S"),
        "category": "ornamentales",
        "description": "Oiti (<i>Licania tomentosa</i>) - Especie ornamentale ideal para Ornamental, Sombrío",
        "price": "Consultar"
    },
    {
        "id": 60,
        "name": "Orejero",
        "scientific_name": "Enterolobium cyclocarpum",
        "altitude": "0-1.200",
        "uses": parseUses("M-S-L-RA-CAR-I-CH-A"),
        "category": "forrajeras",
        "description": "Orejero (<i>Enterolobium cyclocarpum</i>) - Especie forestale ideal para Maderable, Sombrío, Leña...",
        "price": "Consultar"
    },
    {
        "id": 61,
        "name": "Palma Abanico",
        "scientific_name": "Pritchardia pacifica",
        "altitude": "0-1.500",
        "uses": parseUses("O"),
        "category": "ornamentales",
        "description": "Palma Abanico (<i>Pritchardia pacifica</i>) - Especie ornamentale ideal para Ornamental",
        "price": "Consultar"
    },
    {
        "id": 62,
        "name": "Palma Areca",
        "scientific_name": "Chrysalidocarpus lutescens",
        "altitude": "0-1.500",
        "uses": parseUses("O"),
        "category": "ornamentales",
        "description": "Palma Areca (<i>Chrysalidocarpus lutescens</i>) - Especie ornamentale ideal para Ornamental",
        "price": "Consultar"
    },
    {
        "id": 63,
        "name": "Palma Botella, Palma Real",
        "scientific_name": "Roystonea regia",
        "altitude": "0-1.500",
        "uses": parseUses("O-S"),
        "category": "ornamentales",
        "description": "Palma Botella, Palma Real (<i>Roystonea regia</i>) - Especie ornamentale ideal para Ornamental, Sombrío",
        "price": "Consultar"
    },
    {
        "id": 64,
        "name": "Palma Mariposa",
        "scientific_name": "Caryota mitis",
        "altitude": "0-1.200",
        "uses": parseUses("O"),
        "category": "ornamentales",
        "description": "Palma Mariposa (<i>Caryota mitis</i>) - Especie ornamentale ideal para Ornamental",
        "price": "Consultar"
    },
    {
        "id": 65,
        "name": "Payandé",
        "scientific_name": "Pithecellobium dulce",
        "altitude": "0-2000",
        "uses": parseUses("O-RA"),
        "category": "forrajeras",
        "description": "Payande (<i>Pithecellobium dulce</i>) - Especie forestale ideal para Ornamental, Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 66,
        "name": "Pino Pátula",
        "scientific_name": "Pinus patula",
        "altitude": "1.400-3.000",
        "uses": parseUses("M-I-CH-CV-A-PU-PO-L-CA"),
        "category": "forestales",
        "description": "Pino Pátula (<i>Pinus patula</i>) - Especie forrajera ideal para Maderable, Industrial, Chapas...",
        "price": "Consultar"
    },
    {
        "id": 67,
        "name": "Pomarroso Brasilero",
        "scientific_name": "Eugenia malaccensis",
        "altitude": "0-1.500",
        "uses": parseUses("O-AL-S"),
        "category": "ornamentales",
        "description": "Pomarroso Brasilero (<i>Eugenia malaccensis</i>) - Especie ornamentale ideal para Ornamental, Alimento, Sombrío",
        "price": "Consultar"
    },
    {
        "id": 68,
        "name": "Roble",
        "scientific_name": "Quercus humboldtii",
        "altitude": "1.800-3.500",
        "uses": parseUses("A-M-L-CAR-PO-RA"),
        "category": "forestales",
        "description": "Roble (<i>Quercus humboldtii</i>) - Especie forestale ideal para Aglomerado, Maderable, Leña...",
        "price": "Consultar"
    },
    {
        "id": 69,
        "name": "Samán",
        "scientific_name": "Samanea saman",
        "altitude": "0-2000",
        "uses": parseUses("O-RA"),
        "category": "forestales",
        "description": "Saman (<i>Samanea saman</i>) - Especie forestale ideal para Ornamental, Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 70,
        "name": "Sauce llorón",
        "scientific_name": "Salix humboldtii",
        "altitude": "0-2.800",
        "uses": parseUses("CAR-RA-O"),
        "category": "ornamentales",
        "description": "Sauce llorón (<i>Salix humboldtii</i>) - Especie ornamentale ideal para Carpintería, Reforestación Ambiental, Ornamental",
        "price": "Consultar"
    },
    {
        "id": 71,
        "name": "Sauco",
        "scientific_name": "Sambucus nigra",
        "altitude": "1.800-3.200",
        "uses": parseUses("O-CV"),
        "category": "forrajeras",
        "description": "Sauco (<i>Sambucus nigra</i>) - Especie forrajera ideal para Ornamental, Cercas vivas",
        "price": "Consultar"
    },
    {
        "id": 72,
        "name": "Suribio",
        "scientific_name": "Zygia longifolium",
        "altitude": "0-1.600",
        "uses": parseUses("M-S-RA"),
        "category": "forrajeras",
        "description": "Suribio (<i>Zygia longifolium</i>) - Especie forestale ideal para Maderable, Sombrío, Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 73,
        "name": "Teca",
        "scientific_name": "Tectona grandis",
        "altitude": "0-1.000",
        "uses": parseUses("M-MU-CH-CV-L"),
        "category": "forestales",
        "description": "Teca (<i>Tectona grandis</i>) - Especie forrajera ideal para Maderable, Muebles, Chapas...",
        "price": "Consultar"
    },
    {
        "id": 74,
        "name": "Tulipán Africano",
        "scientific_name": "Spathodea campanulata",
        "altitude": "0-1.800",
        "uses": parseUses("O-RA-AV-F-L-M-MU-PO-CV"),
        "category": "ornamentales",
        "description": "Tulipán Africano (<i>Spathodea campanulata</i>) - Especie forrajera ideal para Ornamental, Reforestación Ambiental, Abono verde...",
        "price": "Consultar"
    },
    {
        "id": 75,
        "name": "Urapán",
        "scientific_name": "Fraxinus chinensis",
        "altitude": "1.000-3.000",
        "uses": parseUses("M-O-CH-PU-S"),
        "category": "forestales",
        "description": "Urapan (<i>Fraxinus chinensis</i>) - Especie forestale ideal para Maderable, Ornamental, Chapas...",
        "price": "Consultar"
    },
    {
        "id": 76,
        "name": "Vainillo",
        "scientific_name": "Senna spectabilis",
        "altitude": "0-2000",
        "uses": parseUses("O-RA"),
        "category": "forestales",
        "description": "Vainillo (<i>Senna spectabilis</i>) - Especie forestale ideal para Ornamental, Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 77,
        "name": "Yopo Café",
        "scientific_name": "Piptadenia opacifolia",
        "altitude": "0-1.000",
        "uses": parseUses("M-O-L-PO-CV-RA-S"),
        "category": "forrajeras",
        "description": "Yopo Café (<i>Piptadenia opacifolia</i>) - Especie forrajera ideal para Maderable, Ornamental, Leña...",
        "price": "Consultar"
    },
    {
        "id": 78,
        "name": "Yopo Negro",
        "scientific_name": "Anadenanthera peregrina",
        "altitude": "0-1.000",
        "uses": parseUses("M-O-L-CV-RA-S"),
        "category": "forrajeras",
        "description": "Yopo Negro (<i>Anadenanthera peregrina</i>) - Especie forrajera ideal para Maderable, Ornamental, Leña...",
        "price": "Consultar"
    }
];

// Export the catalogData
if (typeof module !== 'undefined' && module.exports) {
    module.exports = catalogData;
}