// Importar las dependencias.
const express = require('express'); // Importar express

const bodyParser = require('body-parser'); // Importar body-parser

const config = require('./src/config/config'); // Importar config
const authRoutes = require('./src/routes/authRoutes'); // Importar authRoutes

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

// Middleware para logging
app.use((req, res, next) => {
    const start = Date.now();
    
    // Log de la petición entrante
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('Body:', req.body);
    }

    // Capturar la respuesta
    const originalSend = res.send;
    res.send = function (body) {
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] Response Status: ${res.statusCode}`);
        console.log(`Response Time: ${duration}ms`);
        if (body) {
            console.log('Response Body:', body);
        }
        return originalSend.call(this, body);
    };

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
