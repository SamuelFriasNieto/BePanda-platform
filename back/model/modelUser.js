import prismadb from '../libs/prismadb.js'
import passwordGenerator from 'password-generator'
import bcrypt from 'bcrypt';

export async function createUser(email, name) {
  try {
    
    const pass = passwordGenerator(12, false);
    const hash = await bcrypt.hash(pass, 12);
    const user = await prismadb.user.create({
      
      data: {
        email: email,
        name: name,
        password: hash,
        cursosId: ["12345"] 
      }
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; 
  }
}

export async function login(email, password) {
   const user = await prismadb.user.findUnique({
    where: {
      email: email
    }
   })

   if(!user) {
    throw new Error('Email does not exist')
   }

   const isCorrectPassword = await bcrypt.compare(password, user.password);

   if(!isCorrectPassword) {
    
   }

   return user;
}

