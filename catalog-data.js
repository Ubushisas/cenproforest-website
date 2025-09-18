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

// Function to get image path for plant - Direct mapping to Arbolito folder
function getPlantImage(plantName, scientificName = '') {
    // Direct mapping to Arbolito folder images (all 50 plants)
    const directImageMapping = {
        'Acacia Amarilla': 'Arbolito/Acacia Amarilla.jpg',
        'Acacia Japonesa': 'Arbolito/Acacia Japonesa.jpg',
        'Acacia Mangium': 'Arbolito/Acacia mangium.jpg',
        'Acacia Roja': 'Arbolito/Acacia Roja.jpg',
        'Achiote, Onoto': 'Arbolito/Achiote Onoto.jpg',
        'Arrayan Común o Castilla': 'Arbolito/Arrayan Común o Castilla.jpg',
        'Búcaro, Cachimbo': 'Arbolito/Búcaro, Cachimbo.jpg',
        'Cajeto, Garagay': 'Arbolito/Cajeto, Garagay.jpg',
        'Cayeno': 'Arbolito/Cayeno.jpg',
        'Cedro de Altura': 'Arbolito/Cedro de Altura.jpeg',
        'Cerezo, Capulí': 'Arbolito/Cerezo, Capulí.jpg',
        'Chicalá, Fresno': 'Arbolito/Chicalá, Fresno.jpeg',
        'Ciprés': 'Arbolito/Ciprés.jpg',
        'Ciro': 'Arbolito/Ciro.jpeg',
        'Clavellino': 'Arbolito/Clavellino.jpeg',
        'Coral, Coralitos': 'Arbolito/Coral, Coralitos.jpg',
        'Corono': 'Arbolito/Corono.jpg',
        'Croton Ornamental': 'Arbolito/Croton Ornamental.jpg',
        'Cámbulo': 'Arbolito/Cámbulo.jpg',
        'Duraznillo': 'Arbolito/Duraznillo.jpg',
        'Eucalyptus Globulus': 'Arbolito/Eucalyptus Globulus.jpg',
        'Eugenia-Arrayán extranjero': 'Arbolito/Eugenia Arrayán extranjero.jpg',
        'Falso Pimiento': 'Arbolito/Falso Pimiento.jpg',
        'Garrocho-Chuque': 'Arbolito/Garrocho-Chuque.jpg',
        'Guayacán Amarillo': 'Arbolito/Guayacan Amarillo.jpg',
        'Guayacán de Manizales': 'Arbolito/Guayacán de Manizales.jpeg',
        'Guácimo': 'Arbolito/Guácimo.jpg',
        'Hayuelo, Chanamo': 'Arbolito/Hayuelo, Chanamo.jpeg',
        'Holly Liso, Holly Rojo': 'Arbolito/Holly Liso, Holly Rojo.jpg',
        'Iguá, Nauno': 'Arbolito/Iguá, Nauno.jpg',
        'Jazmín del cabo, Laurel Huesito': 'Arbolito/Jazmín del cabo, Laurel Huesito.jpg',
        'Laurel del Cera': 'Arbolito/Lauren de cera.jpeg',
        'Leucaena, Acacia Forrajera': 'Arbolito/Leucaena, Acacia Forrajera.jpg',
        'Lluvia de Oro': 'Arbolito/Lluvia de Oro.jpg',
        'Mango': 'Arbolito/Mango.jpg',
        'Mano de Oso, Pata de Gallina': 'Arbolito/Mano de oso.jpg',
        'Matarratón': 'Arbolito/Mataratón.jpg',
        'Melina': 'Arbolito/Melina.jpg',
        'Mortiño': 'Arbolito/Mortiño.JPG',
        'Nacedero, Madre de Agua': 'Arbolito/Nacedero, Madre de Agua.jpg',
        'Nogal Cafetero, Canalete, Pardillo': 'Arbolito/Nogal Cafetero, Canalete, Pardillo.jpg',
        'Ocobo Rosa': 'Arbolito/Ocobo Rosa.jpg',
        'Ocobo, Flor Morado, Roble': 'Arbolito/Ocobo, Flor Morado, Roble.jpg',
        'Palma Mariposa': 'Arbolito/Palma Mariposa.jpg',
        'Payandé, Chiminango': 'Arbolito/Payandé, Chiminango.jpg',
        'Pomarroso Brasilero': 'Arbolito/Pomarroso Brasilero.jpg',
        'Tamarindo': 'Arbolito/Tamarindo.jpeg',
        'Teca': 'Arbolito/Teca.jpg',
        'Urapán': 'Arbolito/Urapán.jpg',
        'Yopo Café': 'Arbolito/Yopo Café.jpg'
    };
    
    // Direct mapping - much simpler and more reliable than fuzzy matching
    return directImageMapping[plantName] || null;
}

// Real catalog data - 50 Arbolito Plants (Alphabetically Sorted)
const catalogData = [
    {
        "id": 1,
        "name": "Acacia Amarilla",
        "scientific_name": "Cassia siamea",
        "altitude": "0-1.600 m.s.n.m",
        "uses": parseUses("O-I-RA--L-F"),
        "category": "forrajeras",
        "description": "Acacia ornamental, ideal para Ornamental, Industrial, Leña",
        "price": "Consultar"
    },
    {
        "id": 2,
        "name": "Acacia Japonesa",
        "scientific_name": "Acacia melanoxylon",
        "altitude": "1.800-2.800 m.s.n.m",
        "uses": parseUses("O-I---L-F-PO--PU---TA"),
        "category": "forrajeras",
        "description": "Acacia ornamental, ideal para Industrial, Postes, Tableros",
        "price": "Consultar"
    },
    {
        "id": 3,
        "name": "Acacia Mangium",
        "scientific_name": "Acacia mangium",
        "altitude": "0-1.000 m.s.n.m",
        "uses": parseUses("I--CV-M-L-F--PU-A--ME"),
        "category": "forrajeras",
        "description": "Acacia forestal, ideal para Maderable, Industrial, Pulpa",
        "price": "Consultar"
    },
    {
        "id": 4,
        "name": "Acacia Roja",
        "scientific_name": "Delonix regia",
        "altitude": "170-1.200 m.s.n.m",
        "uses": parseUses("O--RA-S-CV-L------SA"),
        "category": "forrajeras",
        "description": "Acacia ornamental, ideal para Ornamental, Leña, Sistemas Agroforestales",
        "price": "Consultar"
    },
    {
        "id": 5,
        "name": "Achiote, Onoto",
        "scientific_name": "Bixa orellana",
        "altitude": "0-1.400 m.s.n.m",
        "uses": parseUses("O-I---F----CO"),
        "category": "forrajeras",
        "description": "Leguminosa forrajera para Colorantes, Ornamental, Forraje",
        "price": "Consultar"
    },
    {
        "id": 6,
        "name": "Arrayan Común o Castilla",
        "scientific_name": "Myrcianthes leucoxyla",
        "altitude": "2.000-3.300 m.s.n.m",
        "uses": parseUses("O-I-RA--L-PO"),
        "category": "forestales",
        "description": "Especie ornamental ideal para Industrial, Ornamental, Postes",
        "price": "Consultar"
    },
    {
        "id": 7,
        "name": "Búcaro, Cachimbo",
        "scientific_name": "Erythrina fusca",
        "altitude": "0-1.600 m.s.n.m",
        "uses": parseUses("RA-S-CV-L-F---A"),
        "category": "forrajeras",
        "description": "Leguminosa forrajera para Reforestación Ambiental, Cercas vivas, Sombrío",
        "price": "Consultar"
    },
    {
        "id": 8,
        "name": "Cajeto, Garagay",
        "scientific_name": "Cytheraxylum subflavescens",
        "altitude": "1.600-3.000 m.s.n.m",
        "uses": parseUses("RA--L-PO-CAR---ME"),
        "category": "forestales",
        "description": "Especie útil para Reforestación Ambiental, Melífera, Leña",
        "price": "Consultar"
    },
    {
        "id": 9,
        "name": "Cayeno",
        "scientific_name": "Hibiscus rosasiensis",
        "altitude": "0-2.600 m.s.n.m",
        "uses": parseUses("O"),
        "category": "ornamentales",
        "description": "Especie ornamental ideal para Ornamental",
        "price": "Consultar"
    },
    {
        "id": 10,
        "name": "Cedro de Altura",
        "scientific_name": "Cedrela montana",
        "altitude": "1.600-3.000 m.s.n.m",
        "uses": parseUses("O--RA-CV-M-L--CH"),
        "category": "forestales",
        "description": "Especie ornamental ideal para Maderable, Ornamental, Leña",
        "price": "Consultar"
    },
    {
        "id": 11,
        "name": "Cerezo, Capulí",
        "scientific_name": "Prunus serotina",
        "altitude": "2.000-2.900 m.s.n.m",
        "uses": parseUses("O-AL-I-RA-S-CV"),
        "category": "forestales",
        "description": "Especie ornamental ideal para Ornamental, Alimento, Industrial",
        "price": "Consultar"
    },
    {
        "id": 12,
        "name": "Chicalá, Fresno",
        "scientific_name": "Tecoma stans",
        "altitude": "1.600-2.800 m.s.n.m",
        "uses": parseUses("O-I--CV"),
        "category": "ornamentales",
        "description": "Especie ornamental ideal para Ornamental, Industrial, Cercas vivas",
        "price": "Consultar"
    },
    {
        "id": 13,
        "name": "Ciprés",
        "scientific_name": "Cupressus lusitanica",
        "altitude": "1.400-3.300 m.s.n.m",
        "uses": parseUses("O---M-L-PO-CH-PU-A"),
        "category": "forestales",
        "description": "Especie ornamental ideal para Maderable, Postes, Pulpa",
        "price": "Consultar"
    },
    {
        "id": 14,
        "name": "Ciro",
        "scientific_name": "Baccharis macrantha",
        "altitude": "1.800-3.200 m.s.n.m",
        "uses": parseUses("RA-CV-L----CA-ME"),
        "category": "forestales",
        "description": "Especie útil para Leña, Carbón, Cercas vivas",
        "price": "Consultar"
    },
    {
        "id": 15,
        "name": "Clavellino",
        "scientific_name": "Caesalpinia pulcherrima",
        "altitude": "0-1.600 m.s.n.m",
        "uses": parseUses("O"),
        "category": "ornamentales",
        "description": "Especie ornamental ideal para Ornamental",
        "price": "Consultar"
    },
    {
        "id": 16,
        "name": "Coral, Coralitos",
        "scientific_name": "Adenanthera pavonica",
        "altitude": "0-1.500 m.s.n.m",
        "uses": parseUses("O---CV"),
        "category": "ornamentales",
        "description": "Especie ornamental ideal para Ornamental, Cercas vivas",
        "price": "Consultar"
    },
    {
        "id": 17,
        "name": "Corono",
        "scientific_name": "Xylosma spiculifera",
        "altitude": "2.000-3.200 m.s.n.m",
        "uses": parseUses("O---CV"),
        "category": "ornamentales",
        "description": "Especie ornamental ideal para Cercas vivas, Ornamental",
        "price": "Consultar"
    },
    {
        "id": 18,
        "name": "Croton Ornamental",
        "scientific_name": "Codiaeum variegatum",
        "altitude": "0-1.500 m.s.n.m",
        "uses": parseUses("O"),
        "category": "ornamentales",
        "description": "Especie ornamental ideal para Ornamental",
        "price": "Consultar"
    },
    {
        "id": 19,
        "name": "Cámbulo",
        "scientific_name": "Erythrina poeppigiana",
        "altitude": "400-1.700 m.s.n.m",
        "uses": parseUses("O--RA-S-CV-M-F-CAR"),
        "category": "forrajeras",
        "description": "Leguminosa forrajera para Ornamental, Cercas vivas, Maderable",
        "price": "Consultar"
    },
    {
        "id": 20,
        "name": "Duraznillo",
        "scientific_name": "Abatia parviflora",
        "altitude": "2.000-2.900 m.s.n.m",
        "uses": parseUses("RA-CV-M"),
        "category": "forestales",
        "description": "Árbol maderable de calidad para Maderable, Reforestación Ambiental, Maderable",
        "price": "Consultar"
    },
    {
        "id": 21,
        "name": "Eucalyptus Globulus",
        "scientific_name": "Eucalyptus globulus",
        "altitude": "1.600-2.900 m.s.n.m",
        "uses": parseUses("CV-M-L-PO-CH-PU-A-CA"),
        "category": "forestales",
        "description": "Eucalipto de rápido crecimiento, ideal para Maderable, Chapas, Aglomerado",
        "price": "Consultar"
    },
    {
        "id": 22,
        "name": "Eugenia-Arrayán extranjero",
        "scientific_name": "Eugenia myrtifolia Sims",
        "altitude": "1.000-2.900 m.s.n.m",
        "uses": parseUses("O---CV--------SE"),
        "category": "ornamentales",
        "description": "Especie ornamental ideal para Cercas vivas, Setos, Ornamental",
        "price": "Consultar"
    },
    {
        "id": 23,
        "name": "Falso Pimiento",
        "scientific_name": "Shinus molle",
        "altitude": "1.800-2.800 m.s.n.m",
        "uses": parseUses("O--RA-CV-L-PO-CAR--CA-ME"),
        "category": "forestales",
        "description": "Especie ornamental ideal para Ornamental, Carpintería, Leña",
        "price": "Consultar"
    },
    {
        "id": 24,
        "name": "Garrocho-Chuque",
        "scientific_name": "Viburnum triphyllum Bentham",
        "altitude": "1.700-3.600 m.s.n.m",
        "uses": parseUses("O---CV---CAR"),
        "category": "ornamentales",
        "description": "Especie ornamental ideal para Carpintería, Ornamental, Cercas vivas",
        "price": "Consultar"
    },
    {
        "id": 25,
        "name": "Guayacán Amarillo",
        "scientific_name": "Tabebuia chrysantha",
        "altitude": "0-1.800 m.s.n.m",
        "uses": parseUses("O--RA-CV-M-L--CAR"),
        "category": "forestales",
        "description": "Especie ornamental ideal para Maderable, Leña, Ornamental",
        "price": "Consultar"
    },
    {
        "id": 26,
        "name": "Guayacán de Manizales",
        "scientific_name": "Lafonesia speciosa",
        "altitude": "1.400-2.800 m.s.n.m",
        "uses": parseUses("O--RA-CV-L-------SE"),
        "category": "forestales",
        "description": "Especie ornamental ideal para Leña, Ornamental, Setos",
        "price": "Consultar"
    },
    {
        "id": 27,
        "name": "Guácimo",
        "scientific_name": "Guazuma ulmifolia",
        "altitude": "0-1.500 m.s.n.m",
        "uses": parseUses("RA-S-CV-L-F-PO-CAR"),
        "category": "forrajeras",
        "description": "Leguminosa forrajera para Postes, Cercas vivas, Leña",
        "price": "Consultar"
    },
    {
        "id": 28,
        "name": "Hayuelo, Chanamo",
        "scientific_name": "Dodonea viscosa",
        "altitude": "2.200-2.900 m.s.n.m",
        "uses": parseUses("O--RA"),
        "category": "forestales",
        "description": "Especie ornamental ideal para Reforestación Ambiental, Ornamental",
        "price": "Consultar"
    },
    {
        "id": 29,
        "name": "Holly Liso, Holly Rojo",
        "scientific_name": "Cotoneaster pannosa",
        "altitude": "2.000-3.000 m.s.n.m",
        "uses": parseUses("O"),
        "category": "ornamentales",
        "description": "Especie ornamental ideal para Ornamental",
        "price": "Consultar"
    },
    {
        "id": 30,
        "name": "Iguá, Nauno",
        "scientific_name": "Pseudosamanea guachapele",
        "altitude": "0-1.500 m.s.n.m",
        "uses": parseUses("I-S-CV-M-L-F"),
        "category": "forrajeras",
        "description": "Leguminosa forrajera para Maderable, Sombrío, Leña",
        "price": "Consultar"
    },
    {
        "id": 31,
        "name": "Jazmín del cabo, Laurel Huesito",
        "scientific_name": "Pittosporum undulatum",
        "altitude": "1.700-2.800 m.s.n.m",
        "uses": parseUses("O-I-RA-------ME"),
        "category": "forestales",
        "description": "Especie ornamental ideal para Ornamental, Industrial, Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 32,
        "name": "Laurel del Cera",
        "scientific_name": "Morella pubescens",
        "altitude": "1.700-3.900 m.s.n.m",
        "uses": parseUses("O-I-RA"),
        "category": "forestales",
        "description": "Especie ornamental ideal para Ornamental, Industrial, Reforestación Ambiental",
        "price": "Consultar"
    },
    {
        "id": 33,
        "name": "Leucaena, Acacia Forrajera",
        "scientific_name": "Leucaena leucocephala",
        "altitude": "0-1.800 m.s.n.m",
        "uses": parseUses("O-I-RA-CV-L-F--PU--ME---AV"),
        "category": "forrajeras",
        "description": "Acacia ornamental, ideal para Forraje, Cercas vivas, Leña",
        "price": "Consultar"
    },
    {
        "id": 34,
        "name": "Lluvia de Oro",
        "scientific_name": "Cassia fistula",
        "altitude": "0-1.500 m.s.n.m",
        "uses": parseUses("O"),
        "category": "ornamentales",
        "description": "Especie ornamental ideal para Ornamental",
        "price": "Consultar"
    },
    {
        "id": 35,
        "name": "Mango",
        "scientific_name": "Mangifera indica",
        "altitude": "0-1.200 m.s.n.m",
        "uses": parseUses("O-AL--S-CV"),
        "category": "forestales",
        "description": "Árbol frutal ornamental ideal para Alimento, Ornamental, Sombrío",
        "price": "Consultar"
    },
    {
        "id": 36,
        "name": "Mano de Oso, Pata de Gallina",
        "scientific_name": "Oreopanax floribundum",
        "altitude": "2.000-2.900 m.s.n.m",
        "uses": parseUses("O-I-RA-S-CV"),
        "category": "forrajeras",
        "description": "Especie ornamental ideal para Ornamental, Reforestación Ambiental, Cercas vivas",
        "price": "Consultar"
    },
    {
        "id": 37,
        "name": "Matarratón",
        "scientific_name": "Gliricidia sepium",
        "altitude": "0-1.500 m.s.n.m",
        "uses": parseUses("O-I-RA-S-CV--F-PO------AV"),
        "category": "forrajeras",
        "description": "Leguminosa forrajera para Forraje, Cercas vivas, Sombrío",
        "price": "Consultar"
    },
    {
        "id": 38,
        "name": "Melina",
        "scientific_name": "Gmelina arborea",
        "altitude": "0-1.000 m.s.n.m",
        "uses": parseUses("CV-M-L-F-PO-CH-PU-A-CA"),
        "category": "forrajeras",
        "description": "Leguminosa forrajera para Maderable, Cercas vivas, Chapas",
        "price": "Consultar"
    },
    {
        "id": 39,
        "name": "Mortiño",
        "scientific_name": "Hesperomeles goudotiana",
        "altitude": "2.600-3.200 m.s.n.m",
        "uses": parseUses("O-AL-RA-CV-M-L"),
        "category": "forestales",
        "description": "Especie ornamental ideal para Ornamental, Reforestación Ambiental, Leña",
        "price": "Consultar"
    },
    {
        "id": 40,
        "name": "Nacedero, Madre de Agua",
        "scientific_name": "Trichanthera gigantea",
        "altitude": "0-2.000 m.s.n.m",
        "uses": parseUses("RA-S-CV--F"),
        "category": "forrajeras",
        "description": "Leguminosa forrajera para Reforestación Ambiental, Sombrío, Cercas vivas",
        "price": "Consultar"
    },
    {
        "id": 41,
        "name": "Nogal Cafetero, Canalete, Pardillo",
        "scientific_name": "Cordia alliadora",
        "altitude": "0-1.900 m.s.n.m",
        "uses": parseUses("O-I-RA-S-M-L--CH---ME--SA"),
        "category": "forrajeras",
        "description": "Especie ornamental ideal para Maderable, Leña, Sombrío",
        "price": "Consultar"
    },
    {
        "id": 42,
        "name": "Ocobo Rosa",
        "scientific_name": "Tabebuia rosea",
        "altitude": "0-2.000 m.s.n.m",
        "uses": parseUses("O-I-RA-S-M-L--CH-A"),
        "category": "forrajeras",
        "description": "Especie ornamental ideal para Maderable, Ornamental, Leña",
        "price": "Consultar"
    },
    {
        "id": 43,
        "name": "Ocobo, Flor Morado, Roble",
        "scientific_name": "Tabebuia rosea",
        "altitude": "0-2.000 m.s.n.m",
        "uses": parseUses("O-I-RA-S-M-L--CH-A"),
        "category": "forrajeras",
        "description": "Especie ornamental ideal para Maderable, Ornamental, Leña",
        "price": "Consultar"
    },
    {
        "id": 44,
        "name": "Palma Mariposa",
        "scientific_name": "Caryota mitis",
        "altitude": "0-1.200 m.s.n.m",
        "uses": parseUses("O"),
        "category": "ornamentales",
        "description": "Especie ornamental ideal para Ornamental",
        "price": "Consultar"
    },
    {
        "id": 45,
        "name": "Payandé, Chiminango",
        "scientific_name": "Pithecellobium dulce",
        "altitude": "0-1.500 m.s.n.m",
        "uses": parseUses("O--RA-CV--F"),
        "category": "forrajeras",
        "description": "Leguminosa forrajera para Ornamental, Reforestación Ambiental, Cercas vivas",
        "price": "Consultar"
    },
    {
        "id": 46,
        "name": "Pomarroso Brasilero",
        "scientific_name": "Eugenia malaccensis",
        "altitude": "0-1.500 m.s.n.m",
        "uses": parseUses("O-AL--S"),
        "category": "forestales",
        "description": "Especie ornamental ideal para Ornamental, Alimento, Sombrío",
        "price": "Consultar"
    },
    {
        "id": 47,
        "name": "Tamarindo",
        "scientific_name": "Tamarindus indica",
        "altitude": "0-1.400 m.s.n.m",
        "uses": parseUses("O-AL--S-CV-M"),
        "category": "forestales",
        "description": "Árbol frutal ornamental ideal para Alimento, Ornamental, Sombrío",
        "price": "Consultar"
    },
    {
        "id": 48,
        "name": "Teca",
        "scientific_name": "Tectona grandis",
        "altitude": "0-1.000 m.s.n.m",
        "uses": parseUses("CV-M-L--CH---MU"),
        "category": "forestales",
        "description": "Árbol maderable de calidad para Maderable, Muebles, Chapas",
        "price": "Consultar"
    },
    {
        "id": 49,
        "name": "Urapán",
        "scientific_name": "Fraxinus chinensis",
        "altitude": "1.000-3.000 m.s.n.m",
        "uses": parseUses("O--S-M---CH-PU-CA"),
        "category": "forrajeras",
        "description": "Especie ornamental ideal para Maderable, Ornamental, Chapas",
        "price": "Consultar"
    },
    {
        "id": 50,
        "name": "Yopo Café",
        "scientific_name": "Piptadenia opacifolia",
        "altitude": "0-1.000 m.s.n.m",
        "uses": parseUses("O--RA-S-CV-M-L-PO"),
        "category": "forrajeras",
        "description": "Especie ornamental ideal para Maderable, Ornamental, Leña",
        "price": "Consultar"
    }
];

// Export the catalogData
if (typeof module !== 'undefined' && module.exports) {
    module.exports = catalogData;
}