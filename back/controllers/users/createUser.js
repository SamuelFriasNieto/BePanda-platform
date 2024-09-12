import {createUser} from '../../model/modelUser.js'

export async function insertUser(req, res) {
    try {
      // Llama a createUser y maneja la respuesta
      console.log("hooo")
      const { nombre, email } = req.body;
      console.log(req.body.nombre, req.body.email)
  
      // Verifica que se reciban ambos parámetros
      if (!nombre || !email) {
        return res.status(400).json({ error: 'Nombre y correo son requeridos.' });
      }
  
      // Llama a la función que crea el usuario
      const newUser = await createUser(email, nombre);
  
      // Devuelve la respuesta en formato JSON
      return res.status(200).json({ message: 'Usuario creado con éxito', user: newUser });
    } catch (error) {
      // Maneja errores y responde con un mensaje adecuado
      console.error('Error al crear el usuario:', error);
      return res.status(500).json({ error: 'Hubo un error al crear el usuario.' });
    }
  }




