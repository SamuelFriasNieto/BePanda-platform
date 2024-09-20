import {createUser} from '../../model/modelUser.js'
import { sendMail } from '../../libs/sendMail.js';
import passwordGenerator from 'password-generator'
import bcrypt from 'bcrypt';

export async function insertUser(req, res) {
    try {
      // Llama a createUser y maneja la respuesta

      const { nombre, email } = req.body;
      const pass = passwordGenerator(12, false);
      const hash = await bcrypt.hash(pass, 12);
  
      // Verifica que se reciban ambos parámetros
      if (!nombre || !email) {
        return res.status(400).json({ error: 'Nombre y correo son requeridos.' });
      }
  
      // Llama a la función que crea el usuario
      const newUser = await createUser(email, nombre,hash);

      sendMail(pass,email);
  
      // Devuelve la respuesta en formato JSON
      return res.status(200).json({ message: 'Usuario creado con éxito', user: newUser });
    } catch (error) {
      // Maneja errores y responde con un mensaje adecuado
      console.error('Error al crear el usuario:', error);
      return res.status(500).json({ error: 'Hubo un error al crear el usuario.' });
    }
  }




