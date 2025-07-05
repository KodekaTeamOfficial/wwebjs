const WhatsAppService = require('../services/WhatsAppService');

class WhatsAppController {
  async getQRCodeImage(req, res) {
    try {
      const result = await WhatsAppService.getQRCodeImage();
      if (result.status === 'error') {
        return res.status(400).json(result);
      }
      res.set('Content-Type', 'image/png');
      res.send(result.qrBuffer);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async getQRCodeData(req, res) {
    try {
      const result = await WhatsAppService.getQRCodeDataUrl();
      res.json(result);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async getQRCodeDisplay(req, res) {
    try {
      const result = await WhatsAppService.getQRCodeDataUrl();
      if (result.status === 'error') {
        return res.status(400).json(result);
      }
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>WhatsApp QR Code</title>
          <style>
            body { display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f0f0f0; }
            img { max-width: 300px; }
            p { text-align: center; font-family: Arial, sans-serif; }
          </style>
        </head>
        <body>
          <div>
            <p>Scan this QR code with WhatsApp to authenticate</p>
            <img src="${result.qrCode}" alt="WhatsApp QR Code">
          </div>
        </body>
        </html>
      `);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async sendMessage(req, res) {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields: to, message'
      });
    }

    try {
      const result = await WhatsAppService.sendMessage(to, message);
      res.json(result);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  async getStatus(req, res) {
    try {
      const status = await WhatsAppService.getClientStatus();
      res.json({
        status: 'success',
        data: status
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }


  async disconnect(req, res) {
    try {
      const result = await WhatsAppService.disconnect();
      res.json(result);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

}

module.exports = new WhatsAppController();