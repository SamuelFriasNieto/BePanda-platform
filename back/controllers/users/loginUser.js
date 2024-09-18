import {login} from '../../model/modelUser.js'
import bcrypt from 'bcrypt';


 
 export async function loginUser (req, res)  {
  try {
    const user = await login(req.body.email);
    if(!user) {
      throw new Error('El email no existe')
     }
  
     const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);
  
     if(!isCorrectPassword) {
      throw new Error('Contraseña incorrecta')
     }
    // Si la autenticación es correcta
    req.session.user =  user ; // Guarda la información que necesites
    res.send({success:true, message: 'Login successful',user:user });
  } catch (error) {
    console.log(error)
    res.status(200).json({success:false, message:error.message})
  }
    // Lógica de autenticación aquí

  };