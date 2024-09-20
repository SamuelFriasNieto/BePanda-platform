import prismadb from '../libs/prismadb.js'
import bcrypt from 'bcrypt';

export async function createUser(email, name, pass) {
  try {
    

    const user = await prismadb.user.create({
      
      data: {
        email: email,
        name: name,
        password: pass,
        cursosId: ["12345"],
        admin:false 
      }
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; 
  }
}

export async function login(email) {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        email: email
      }
     })
  
     if(!user) {
      return false;
     }
  
     return user;
  } catch (error) {
    return Error(error)
    
  }
}


export async function checkmail(email) {
  try {
    
    const user = await prismadb.user.findUnique({
      where: {
        email: email
      }
    });

    if (!user) {
      return false;
    }

    return true;
  } catch (error) {
    throw new Error(error); 
  }
}


    export async function updateUserPassword(email, hashedPassword) {
      try {
        const updatedUser = await prismadb.user.update({
          where: { email },
          data: { password: hashedPassword }
        });
    
        return updatedUser;
      } catch (error) {
        console.error("Error updating password:", error);
        throw error;
      }
    }



