const express = require('express'); // Importar express
const router = express.Router(); // Crear un router
const { login } = require('../controllers/authController'); // Importar login
const { validateLogin } = require('../middleware/validation'); // Importar validateLogin

// Ruta para el login
router.post('/login', validateLogin, login);

module.exports = router; 