import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RedireccionPass = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Start the 5-second timer immediately
    const timer = setTimeout(() => {
      navigate('/login'); // Redirect to login after 5 seconds
    }, 5000);

    // Get the token from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // Make a request to the backend to verify the token and reset the password
    const verifyToken = async () => {
      try {
        await axios.get(`http://localhost:3001/verify-reset?token=${token}`);
        console.log('Password reset successfully');
        // Optionally handle success case here
      } catch (error) {
        console.error('Error verifying token or resetting password:', error);
        // Optionally handle error case here
      }
    };

    verifyToken();

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden"></span>
        </div>
        <h2 className="mt-4 text-lg font-semibold">Restableciendo tu contraseña...</h2>
        <p>Por favor, revisa tu correo para ver tu nueva contraseña.</p>
        <p>Serás redirigido a la página de inicio de sesión en breve.</p>
      </div>
    </div>
  );
};

export default RedireccionPass;
