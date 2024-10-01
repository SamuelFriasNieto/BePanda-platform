import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { updateUserPassword } from '../model/modelUser.js'; // Function to update user password

const JWT_SECRET = 'your_jwt_secret';

export async function resetPassword(req, res) {
  try {
    const { token, password, confirmPassword } = req.body;
    let email = '';

    // Verify the JWT token
    if(req.body.email) {
      email = req.body.email;
    } else {
      const decoded = jwt.verify(token, JWT_SECRET);
      email = decoded.email;
    }
 

    // Ensure the passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Las contraseñas no coinciden' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    await updateUserPassword(email, hashedPassword);

    return res.send({ success: true, message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'El token es inválido o ha expirado.' });
  }
}
