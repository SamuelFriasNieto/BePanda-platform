import express from 'express';


// api/index.js
const app = express();
import serverless from 'serverless-http'

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express on Vercel!');
});

// Puedes agregar más rutas aquí

module.exports.handler = serverless(app);
