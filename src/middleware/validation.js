// Función para validar formato de email
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Función para sanitizar input
const sanitizeInput = (input) => {
    return input.replace(/[<>'"]/g, '').trim();
};

// Middleware para validar datos de login
const validateLogin = (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Sanitizar inputs
        const sanitizedEmail = sanitizeInput(email);
        const sanitizedPassword = sanitizeInput(password);

        // Verificar si se proporcionaron los datos necesarios
        if (!sanitizedEmail || !sanitizedPassword) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Validar formato de email
        if (!validateEmail(sanitizedEmail)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Agregar datos sanitizados al request
        req.body.email = sanitizedEmail;
        req.body.password = sanitizedPassword;
        
        next();
    } catch (error) {
        console.error('Validation error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = {
    validateLogin
}; 