// api/server.js
import session from 'express-session';
import express from 'express';
import cors from 'cors'; 
import { insertUser } from './controllers/users/createUser.js';
import { loginUser } from './controllers/users/loginUser.js';

const app = express();
app.use(cors({
  credentials:true,
  origin:'http://localhost:3000'
}));
app.use(express.json());
app.use(session({
    secret: 'holaquetal',
    resave:false,
    saveUninitialized:true,
    cookie: {secure: false}
}))




app.post('/login', loginUser);

app.get('/check-session', (req, res) => {
  console.log(req.session)
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });

    } else {
      res.send({ loggedIn: false });
    }
  });

app.post('/createUser', insertUser);

app.listen(3001, () => {
    console.log('hola')
})




export default app;