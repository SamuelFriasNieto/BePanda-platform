// api/server.js
import express from 'express';
import cors from 'cors'; 
import { createUser } from './model/modelUser.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/createUser', createUser);




export default app;