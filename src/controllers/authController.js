const config = require('../config/config'); // Importar config

// Controlador para el login
const login = (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar credenciales (usando el usuario de prueba)
        if (email === config.testUser.email && password === config.testUser.password) {
            return res.json({
                success: true,
                message: 'Login successful',
                coordinates: config.defaultMapCoordinates
            });
        }

        // Si las credenciales son incorrectas
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = {
    login
}; 