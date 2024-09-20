import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { updateUserPassword } from '../model/modelUser.js'; // Function to update user password
import { sendMailPass } from '../libs/sendMail.js'; // Function to send new password email

const JWT_SECRET = 'your_jwt_secret';

export async function verifyResetLink(req, res) {
  try {
    // Extract the token from the URL query
    const { token } = req.query;

    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    const email = decoded.email;

    // Generate a new random password
    const newPassword = crypto.randomBytes(8).toString('hex');

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await updateUserPassword(email, hashedPassword);

    // Send the new password to the user via email
    sendMailPass(email, newPassword);

    return res.redirect(`http://localhost:3000/verify-reset?token=${token}`);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: 'Invalid or expired token.' });
  }
}
