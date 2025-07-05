const express = require('express');
const router = express.Router();
const WhatsAppController = require('../controllers/WhatsAppController');
const { validateApiKey } = require('../middleware/auth');

router.use(validateApiKey);

router.get('/qr', WhatsAppController.getQRCodeImage); // Returns QR code as image
router.get('/qr-data', WhatsAppController.getQRCodeData); // Returns QR code as base64
router.get('/qr-display', WhatsAppController.getQRCodeDisplay); // Displays QR code in HTML
router.post('/send', WhatsAppController.sendMessage);
router.get('/status', WhatsAppController.getStatus);
router.post('/disconnect', WhatsAppController.disconnect);

module.exports = router;