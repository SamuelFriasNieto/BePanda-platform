import {login} from '../../model/modelUser.js'

 
 export async function loginUser (req, res)  {
    // Lógica de autenticación aquí
      const user = login(req.body.email, req.body.password);
    // Si la autenticación es correcta
    req.session.user =  user ; // Guarda la información que necesites
    res.send({ message: 'Login successful' });
  };