require('dotenv').config();
const express = require('express');
const config = require('./config/config');
const whatsappRoutes = require('./routes/whatsapp');

const app = express();

app.use(express.json());
app.use('/api/whatsapp', whatsappRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'WhatsApp API Server' });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});