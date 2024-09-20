import jwt from 'jsonwebtoken';
import { checkmail } from '../model/modelUser.js'; // Function to check if email exists
import { sendMailPassResetLink } from '../libs/sendMail.js'; // Email function for sending the verification link

const JWT_SECRET = 'your_jwt_secret'; // Store this in environment variables

export async function passreset(req, res) {
  try {
    const { email } = req.body;

    // Check if the email exists
    const user = await checkmail(email);
    if (!user) {
      throw new Error('El email no existe.');
    }

    // Generate JWT token with email and expiration
    const resetToken = jwt.sign(
      { email },
      JWT_SECRET,
      { expiresIn: '1h' } // Token valid for 1 hour
    );

    // Generate the verification URL
    const verificationUrl = `http://localhost:3001/verify-reset?token=${resetToken}`;

    // Send verification email
    sendMailPassResetLink(email, verificationUrl);

    res.send({ success: true, message: 'Se ha enviado un correo para verificar el restablecimiento de contraseña.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
