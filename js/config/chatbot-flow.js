// Chatbot Flow Configuration
const CHATBOT_FLOW = {
  "greeting": {
    "message": "🌳 Bienvenido a Cenproforest. Cuéntame qué necesitas hoy:",
    "options": [
      "🌱 Selección de plantas",
      "💰 Cotización / precios",
      "📋 Asesoría técnica"
    ]
  },
  "flows": {
    "🌱 Selección de plantas": {
      "sequence": [
        {
          "question": "Perfecto 😊 Para orientarte mejor, ¿qué tipo de proyecto tienes?",
          "options": [
            "🌳 Reforestación / conservación",
            "🌹 Jardinería / ornamental",
            "🌾 Agroforestal / café-cacao",
            "🪵 Maderable / comercial",
            "🐄 Forraje / ganadería",
            "❓ No estoy seguro"
          ]
        },
        {
          "question": "¿Qué área vas a plantar?",
          "options": [
            "Menos de 1 hectárea",
            "1 - 5 hectáreas",
            "5 - 20 hectáreas",
            "Más de 20 hectáreas"
          ]
        },
        {
          "question": "¿Cuántos árboles necesitas aproximadamente?",
          "options": [
            "Menos de 500",
            "500 - 1.000",
            "1.000 - 5.000",
            "Más de 5.000",
            "No estoy seguro"
          ]
        },
        {
          "question": "¿En qué ciudad está tu proyecto?",
          "input": "text"
        },
        {
          "question": "¿Eres persona natural o empresa?",
          "options": [
            "👤 Persona natural",
            "🏢 Empresa"
          ]
        },
        {
          "question": "Por último, ¿nos compartes tu nombre?",
          "input": "text"
        }
      ],
      "summary": true
    },
    "💰 Cotización / precios": {
      "sequence": [
        {
          "question": "Perfecto 😊 Para prepararte una cotización, ¿qué tipo de proyecto tienes?",
          "options": [
            "🌳 Reforestación / conservación",
            "🌹 Jardinería / ornamental",
            "🌾 Agroforestal / café-cacao",
            "🪵 Maderable / comercial",
            "❓ No estoy seguro"
          ]
        },
        {
          "question": "¿Qué área vas a plantar?",
          "options": [
            "Menos de 1 hectárea",
            "1 - 5 hectáreas",
            "5 - 20 hectáreas",
            "Más de 20 hectáreas"
          ]
        },
        {
          "question": "¿Cuántos árboles necesitas aproximadamente?",
          "options": [
            "Menos de 500",
            "500 - 1.000",
            "1.000 - 5.000",
            "Más de 5.000",
            "No estoy seguro"
          ]
        },
        {
          "question": "¿En qué ciudad está tu proyecto?",
          "input": "text"
        },
        {
          "question": "¿Eres persona natural o empresa?",
          "options": [
            "👤 Persona natural",
            "🏢 Empresa"
          ]
        },
        {
          "question": "Por último, ¿nos compartes tu nombre?",
          "input": "text"
        }
      ],
      "summary": true
    },
    "📋 Asesoría técnica": {
      "sequence": [
        {
          "question": "Perfecto 📋 Para asignarte el asesor adecuado, ¿en qué tema necesitas apoyo?",
          "options": [
            "🌱 Selección de especies",
            "📐 Diseño del proyecto",
            "🌾 Manejo del terreno"
          ]
        },
        {
          "question": "¿Qué área vas a plantar?",
          "options": [
            "Menos de 1 hectárea",
            "1 - 5 hectáreas",
            "5 - 20 hectáreas",
            "Más de 20 hectáreas"
          ]
        },
        {
          "question": "¿Cuántos árboles necesitas aproximadamente?",
          "options": [
            "Menos de 500",
            "500 - 1.000",
            "1.000 - 5.000",
            "Más de 5.000",
            "No estoy seguro"
          ]
        },
        {
          "question": "¿En qué ciudad está tu proyecto?",
          "input": "text"
        },
        {
          "question": "¿Eres persona natural o empresa?",
          "options": [
            "👤 Persona natural",
            "🏢 Empresa"
          ]
        },
        {
          "question": "Por último, ¿nos compartes tu nombre?",
          "input": "text"
        }
      ],
      "summary": true
    }
  },
  "final_summary": {
    "message": "¡Perfecto! Ya tengo la información ✅\n\n• Proyecto: [PROYECTO]\n• Área: [ÁREA]\n• Cantidad: [CANTIDAD]\n• Ciudad: [CIUDAD]\n• Tipo: [TIPO]\n• Nombre: [NOMBRE]\n\nUn asesor se pondrá en contacto contigo enseguida.",
    "whatsapp_button": "💬 Contactar por WhatsApp",
    "whatsapp_message": "Hola! Vengo del sitio web de CENPROFOREST.\n\n• Proyecto: [PROYECTO]\n• Área: [ÁREA]\n• Cantidad: [CANTIDAD]\n• Ciudad: [CIUDAD]\n• Tipo: [TIPO]\n• Nombre: [NOMBRE]\n\nSolicito asesoría/cotización"
  }
};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CHATBOT_FLOW;
} else {
  window.CHATBOT_FLOW = CHATBOT_FLOW;
}