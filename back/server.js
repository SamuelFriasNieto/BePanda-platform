// api/server.js
import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express on Vercel!');
});



export default app;