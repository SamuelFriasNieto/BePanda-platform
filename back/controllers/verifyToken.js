import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret'; // Store this in your environment variables

export async function verifyToken(req, res) {
  try {
    const { token } = req.body;

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // If token is valid, return success
    return res.send({ success: true });
  } catch (error) {
    // If token is invalid or expired, return failure
    return res.status(400).send({ success: false, message: 'Token inválido o expirado.' });
  }
}
