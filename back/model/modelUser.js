import prismadb from '../libs/prismadb.js'
import passwordGenerator from 'password-generator'

export async function createUser(email, name) {
  try {
    const pass = passwordGenerator(12, false);
    const user = await prismadb.user.create({
      
      data: {
        email: email,
        name: name,
        password: pass,
        cursosId: ["12345"] // Asegúrate de que este campo existe y está bien definido en el esquema.
      }
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Lanza el error para que puedas manejarlo en otro lugar.
  }
}

