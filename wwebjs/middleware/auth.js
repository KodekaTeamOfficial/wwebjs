const config = require('../config/config');

const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.body.apiKey || req.query.apiKey;
  
  if (!apiKey || apiKey !== config.apiKey) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid or missing API key'
    });
  }
  
  next();
};

module.exports = { validateApiKey };