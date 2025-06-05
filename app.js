// Importar las dependencias.
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./src/config/config');
const authRoutes = require('./src/routes/authRoutes');

// Crear una instancia de Express
const app = express();

// Configurar middleware para parsear JSON
app.use(bodyParser.json());

// Configurar CORS para permitir peticiones desde cualquier origen
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Rutas
app.use('/api', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'API is running' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
