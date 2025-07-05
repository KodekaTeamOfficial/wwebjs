const { Client, LocalAuth } = require('whatsapp-web.js');
const config = require('../config/config');
const qrcode = require('qrcode');

class WhatsAppService {
  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth({ dataPath: config.whatsapp.sessionPath }),
      puppeteer: config.whatsapp.puppeteer
    });
    
    this.isReady = false;
    this.qrCode = null;
    this.qrCodeTimeout = null;
    
    this.initialize();
  }

  initialize() {
    this.client.on('qr', (qr) => {
      console.log('QR Code received');
      this.qrCode = qr;
      if (this.qrCodeTimeout) clearTimeout(this.qrCodeTimeout);
      this.qrCodeTimeout = setTimeout(() => {
        this.qrCode = null;
        console.log('QR code expired');
      }, 60000);
    });

    this.client.on('ready', () => {
      console.log('WhatsApp Client is ready!');
      this.isReady = true;
      this.qrCode = null;
    });

    this.client.on('authenticated', () => {
      console.log('Authenticated');
    });

    this.client.on('auth_failure', (msg) => {
      console.error('Authentication failure:', msg);
      this.isReady = false;
      this.qrCode = null;
    });

    this.client.initialize();
  }

  async getQRCodeImage() {
    if (this.isReady) {
      return { status: 'error', message: 'Client already authenticated' };
    }
    if (!this.qrCode) {
      return { status: 'error', message: 'QR code not available. Please wait for QR code generation.' };
    }
    try {
      const qrBuffer = await qrcode.toBuffer(this.qrCode, { type: 'png' });
      return { status: 'success', qrBuffer };
    } catch (err) {
      console.error('Error generating QR code:', err);
      throw new Error('Failed to generate QR code');
    }
  }

  async getQRCodeDataUrl() {
    if (this.isReady) {
      return { status: 'error', message: 'Client already authenticated' };
    }
    if (!this.qrCode) {
      return { status: 'error', message: 'QR code not available. Please wait for QR code generation.' };
    }
    try {
      const qrDataUrl = await qrcode.toDataURL(this.qrCode);
      return { status: 'success', qrCode: qrDataUrl };
    } catch (err) {
      console.error('Error generating QR code:', err);
      throw new Error('Failed to generate QR code');
    }
  }

  async sendMessage(to, message) {
    if (!this.isReady) {
      throw new Error('WhatsApp client not ready');
    }

    try {
      const formattedNumber = to.replace(/\D/g, '') + '@c.us';
      await this.client.sendMessage(formattedNumber, message);
      return { status: 'success', message: 'Message sent' };
    } catch (error) {
      throw new Error(`Failed to send message: ${error.message}`);
    }
  }

  async getClientStatus() {
    return {
      isReady: this.isReady,
      status: this.isReady ? 'Connected' : 'Disconnected'
    };
  }

  async disconnect() {
    try {
      if (!this.isReady) {
        return { status: 'error', message: 'Client is not connected' };
      }
      await this.client.logout();
      this.isReady = false;
      this.qrCode = null;
      if (this.qrCodeTimeout) clearTimeout(this.qrCodeTimeout);
      
      // Optionally delete session file to force new QR code on next connection
      try {
        await fs.unlink(config.whatsapp.sessionPath);
        console.log('Session file deleted');
      } catch (err) {
        if (err.code !== 'ENOENT') {
          console.error('Error deleting session file:', err);
        }
      }
      
      return { status: 'success', message: 'Client disconnected successfully' };
    } catch (error) {
      console.error('Error during disconnect:', error);
      throw new Error('Failed to disconnect client');
    }
  }
}

module.exports = new WhatsAppService();