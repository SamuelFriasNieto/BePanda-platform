// api/server.js
import session from 'express-session';
import express from 'express';
import cors from 'cors'; 
import { insertUser } from './controllers/users/createUser.js';
import { loginUser } from './controllers/users/loginUser.js';
import { passreset } from './controllers/passreset.js';
import { verifyResetLink } from './controllers/verifyResetLink.js';
import { resetPassword } from './controllers/resetPassword.js';
import { verifyToken } from './controllers/verifyToken.js';


const app = express();
app.use(cors({
  credentials:true,
  origin:'http://localhost:3000'
}));
app.use(express.json());
app.use(session({
    secret: 'holaquetal',
    resave:false,
    saveUninitialized:false,
    cookie: {secure: false}
}))




app.post('/login', loginUser);

app.get('/check-session', (req, res) => {
  console.log('esto es check-session', req.session)
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });

    } else {
      res.send({ loggedIn: false });
    }
  });


  app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
     
      if (err) {
        return res.status(500).send({ error: "No se pudo cerrar la sesión correctamente." });
      }
      res.clearCookie('connect.sid', { path: '/', httpOnly: true, secure: false }); // Match the cookie name and path 
      console.log(req.session, 'logout')
      return res.send({ success: true, message: "Sesión cerrada correctamente." });
    });
    
  });


  app.post('/check-mail', passreset)

  app.get('/verify-reset', verifyResetLink); 

  app.post('/reset-password', resetPassword);

  app.post('/verify-token', verifyToken); 

app.post('/createUser', insertUser);

app.listen(3001, () => {
    console.log('hola')
})




export default app;