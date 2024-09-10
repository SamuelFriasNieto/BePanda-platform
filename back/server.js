import express from 'express';


// api/index.js
const app = express();
const serverless = require('serverless-http');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express on Vercel!');
});

// Puedes agregar más rutas aquí

module.exports.handler = serverless(app);
