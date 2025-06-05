// Importar las dependencias.
const express = require('express');
const bodyParser = require('body-parser');

// Crear una instancia de Express
const app = express();

// Configurar middleware para parsear JSON
app.use(bodyParser.json());

// Configurar CORS para permitir peticiones desde el frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Función para validar formato de email
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Función para sanitizar input
const sanitizeInput = (input) => {
    // Eliminar caracteres especiales y espacios en blanco
    return input.replace(/[<>'"]/g, '').trim();
};

// Datos de ejemplo para simular una base de datos de usuarios
const users = [
    {
        email: 'usuario@ejemplo.com',
        password: '123456'
    }
];

// Coordenadas de ejemplo para el mapa (Bogotá, Colombia)
const mapCoordinates = {
    lat: 4.60971,
    lng: -74.08175
};

// Ruta para manejar el inicio de sesión
app.post('/login', (req, res) => {
    try {
        // Obtener y sanitizar los datos del cuerpo de la petición
        const email = sanitizeInput(req.body.email);
        const password = sanitizeInput(req.body.password);

        // Verificar si se proporcionaron los datos necesarios
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Validar formato de email
        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Buscar el usuario en nuestra "base de datos"
        const foundUser = users.find(u => 
            u.email === email && u.password === password
        );

        // Si el usuario existe, devolver éxito y las coordenadas
        if (foundUser) {
            return res.json({
                success: true,
                message: 'Login successful',
                coordinates: mapCoordinates
            });
        }

        // Si el usuario no existe, devolver error
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    } catch (error) {
        // Manejo de errores
        console.error('Login process error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
