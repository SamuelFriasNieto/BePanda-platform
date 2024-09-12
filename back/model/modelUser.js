import prismadb from '../libs/prismadb.js'

export async function createUser(email, name) {
  try {
    const user = await prismadb.user.create({
      data: {
        email: email,
        name: name,
        cursosId: ["12345"] // Asegúrate de que este campo existe y está bien definido en el esquema.
      }
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Lanza el error para que puedas manejarlo en otro lugar.
  }
}

