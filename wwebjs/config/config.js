module.exports = {
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY || (() => { throw new Error('API_KEY environment variable is required'); })(),
  whatsapp: {
    sessionPath: './session.json',
    puppeteer: {
      headless: true,
      args: ['--no-sandbox']
    }
  }
};