// Configuración del servidor
const config = {
    port: process.env.PORT || 3000,
    // Coordenadas iniciales del mapa (Bogotá, Colombia)
    defaultMapCoordinates: {
        lat: 4.664685054155181,
        lng: -74.05427247562909
    },
    // Usuario de prueba
    testUser: {
        email: 'usuario@ejemplo.com',
        password: '123456'
    }
};

module.exports = config; 