// api/server.js
import express from 'express';
import cors from 'cors'; 
import { insertUser } from './controllers/users/createUser.js';

const app = express();

app.use(cors());
app.use(express.json());
app.post('/createUser', insertUser);

app.listen(3001, () => {
    console.log('hola')
})




export default app;