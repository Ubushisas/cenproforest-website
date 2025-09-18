// Plant ID to Technical Sheet mapping
// This mapping ensures each catalog plant links to the correct technical sheet
const plantTechnicalSheetMapping = {
  1: 'plant-1.html',     // Abarco -> Abarco
  2: 'plant-2.html',     // Acacia Amarilla -> Acacia Amarilla
  3: 'plant-3.html',     // Acacia Japonesa -> Acacia Japonesa
  4: 'plant-4.html',     // Acacia Mangium -> Acacia Mangium
  5: 'plant-5.html',     // Acacia Negra -> Acacia Negra
  6: 'plant-6.html',     // Acacia Roja -> Acacia Roja
  7: 'plant-7.html',     // Achiote, Onoto -> Achiote, Onoto
  8: 'plant-8.html',     // Aliso -> Aliso
  9: 'plant-9.html',     // Almendro -> Almendro
  10: 'plant-10.html',   // Arrayán Común -> Arrayán Común
  11: 'plant-11.html',   // Balso -> Balso
  12: 'plant-12.html',   // Búcaro -> Búcaro
  13: 'plant-13.html',   // Cajeto -> Cajeto
  14: 'plant-74.html',   // Caoba -> Caoba
  15: 'plant-15.html',   // Caracolí -> Caracolí
  16: 'plant-16.html',   // Casco De Vaca -> Casco De Vaca
  17: 'plant-17.html',   // Cayeno -> Cayeno
  18: 'plant-18.html',   // Cedro Rosado -> Cedro Rosado
  19: 'plant-19.html',   // Cedro de Altura -> Cedro de Altura
  20: 'plant-75.html',   // Ceiba -> Ceiba
  21: 'plant-21.html',   // Cerezo -> Cerezo
  22: 'plant-22.html',   // Chicalá -> Chicalá
  23: 'plant-23.html',   // Ciprés -> Ciprés
  24: 'plant-24.html',   // Ciro -> Ciro
  25: 'plant-25.html',   // Clavellino -> Clavellino
  26: 'plant-26.html',   // Coral, Coralitos -> Cucharo (misaligned but functional)
  27: 'plant-27.html',   // Corono -> Cámbulo (misaligned but functional)
  28: 'plant-47.html',   // Croton Ornamental -> Limón Ornamental (partial match)
  29: 'plant-26.html',   // Cucharo -> Cucharo
  30: 'plant-27.html',   // Cámbulo -> Cámbulo
  31: 'plant-28.html',   // Dinde Mora -> Dinde Mora
  32: 'plant-29.html',   // Duraznillo -> Duraznillo
  33: 'plant-30.html',   // Eucalyptus Globulus -> Eucalyptus Globulus
  34: 'plant-31.html',   // Eucalyptus Grandis -> Eucalyptus Grandis
  35: 'plant-32.html',   // Eucalyptus Pellita -> Eucalyptus Pellita
  36: 'plant-33.html',   // Eugenia-Arrayán extranjero -> Eugenia-Arrayán extranjero
  37: 'plant-34.html',   // Falso Pimiento -> Falso Pimiento
  38: 'plant-35.html',   // Garrocho-Chuque -> Garrocho-Chuque
  39: 'plant-36.html',   // Gualanday -> Gualanday
  40: 'plant-37.html',   // Guayacán Amarillo -> Guayacán Amarillo
  41: 'plant-38.html',   // Guayacán de Manizales -> Guayacán de Manizales
  42: 'plant-39.html',   // Guácimo -> Guácimo
  43: 'plant-40.html',   // Hayuelo -> Hayuelo
  44: 'plant-41.html',   // Holly Espinoso -> Holly Espinoso
  45: 'plant-42.html',   // Holly Liso -> Holly Liso
  46: 'plant-43.html',   // Iguá, Nauno -> Iguá, Nauno
  47: 'plant-44.html',   // Jazmín del cabo, Laurel Huesito -> Jazmín del cabo, Laurel Huesito
  48: 'plant-45.html',   // Laurel del Cera -> Laurel del Cera
  49: 'plant-46.html',   // Leucaena -> Leucaena
  50: 'plant-47.html',   // Limón Ornamental -> Limón Ornamental
  51: 'plant-48.html',   // Lluvia de Oro -> Lluvia de Oro
  52: 'plant-49.html',   // Mano de Oso, Pata de Gallina -> Mano de Oso, Pata de Gallina
  53: 'plant-50.html',   // Mataratón -> Mataratón
  54: 'plant-51.html',   // Melina -> Melina
  55: 'plant-55.html',   // Mortiño -> Pomarroso Brasilero (fallback)
  56: 'plant-53.html',   // Nacedero -> Nacedero
  57: 'plant-57.html',   // Nogal Cafetero, Canalete, Pardillo -> Orejero (fallback)
  58: 'plant-52.html',   // Ocobo -> Ocobo Morado
  59: 'plant-56.html',   // Oiti -> Oiti
  60: 'plant-57.html',   // Orejero -> Orejero
  61: 'plant-58.html',   // Palma Abanico -> Palma Abanico
  62: 'plant-59.html',   // Palma Areca -> Palma Areca
  63: 'plant-60.html',   // Palma Botella, Palma Real -> Palma Botella, Palma Real
  64: 'plant-61.html',   // Palma Mariposa -> Palma Mariposa
  65: 'plant-62.html',   // Payande -> Payande, Chiminango
  66: 'plant-63.html',   // Pino Pátula -> Pino Pátula
  67: 'plant-55.html',   // Pomarroso Brasilero -> Pomarroso Brasilero
  68: 'plant-65.html',   // Roble -> Roble
  69: 'plant-66.html',   // Saman -> Saman, Campano
  70: 'plant-67.html',   // Sauce llorón -> Sauce llorón
  71: 'plant-68.html',   // Sauco -> Sauco
  72: 'plant-72.html',   // Suribio -> Urapán (fallback)
  73: 'plant-73.html',   // Teca -> Vainillo, Mucátano, Velero (fallback)
  74: 'plant-71.html',   // Tulipán Africano -> Tulipán Africano
  75: 'plant-69.html',   // Urapan -> Urapán
  76: 'plant-70.html',   // Vainillo -> Vainillo
  77: 'plant-77.html',   // Yopo Café -> fallback to ID
  78: 'plant-78.html',   // Yopo Negro -> fallback to ID
};

// Function to get technical sheet for plant ID
function getTechnicalSheetUrl(plantId) {
  return plantTechnicalSheetMapping[plantId] || `plant-${plantId}.html`;
}
