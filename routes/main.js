const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

// Rutas
router.get('/', mainController.index);
router.get('/register', mainController.register,);
router.post('/saveUser', mainController.saveUser);
//router.post('/login', mainController.login);

module.exports = router;