const express = require('express');
const router = express.Router();

const mainController = require('../controllers/welcomeController');

// Rutas
//router.get('/', mainController.index);
router.get('/', mainController.sendToChatGPT);
router.post('/sendToChatGPT', mainController.sendToChatGPT);
router.post('/generateImg', mainController.generateImg);

module.exports = router;