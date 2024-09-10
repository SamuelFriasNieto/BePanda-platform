// api/server.js
import express from 'express';
import serverless from 'serverless-http';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express on Vercel!');
});

// Exporta el manejador como `handler`
export const handler = serverless(app);
