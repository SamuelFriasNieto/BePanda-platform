import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SuccessMessage from "./SuccessMessage";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [tokenValid, setTokenValid] = useState(false);
  const [succesMessage, setSuccessMessage] = useState(false)

  useEffect(() => {
    // Check if the token exists in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      setError("El enlace de restablecimiento no es válido o ha expirado.");
      return navigate("/login");
    }

    // Verify the token with the backend
    const verifyToken = async () => {
      try {
        const response = await axios.post("http://localhost:3001/verify-token", { token });
        if (response.data.success) {
          setTokenValid(true);
        } else {
          navigate("/login");
        }
      } catch (err) {
        setError("Ocurrió un error al verificar el enlace.");
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    try {
      const response = await axios.post("http://localhost:3001/reset-password", {
        token,
        password,
        confirmPassword,
      });

      if (response.data.success) {
        setSuccessMessage('Has cambiado la contraseña correctamente');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Ocurrió un error al restablecer la contraseña.");
    }
  };

  // Only render the form if the token is valid
  if (!tokenValid) {
    return <div>Cargando...</div>; // Optionally show a loading state
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-montserrat">
      <img className="mx-auto h-14 w-auto" src="https://bepandalife.com/wp-content/uploads/2021/04/cropped-IMAGOTIPO-BE-PANDA_COLOR-TRANPARENCIA_WEB.png" alt="Your Company" />

      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-text-color">Restablecer contraseña</h1>



      <form onSubmit={handleSubmit} className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error ? <div className="text-red-500 mb-4">{error}</div > : <SuccessMessage message={succesMessage} />}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Nueva contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-full rounded-md border-0 py-1.5 text-text-color shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirmar nueva contraseña
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="block w-full rounded-md border-0 py-1.5 text-text-color shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <a href="/login"><p className="w-32 font-semibold text-text-color-hover hover:text-opacity-85 mb-3 drop-shadow-md cursor-pointer">Iniciar sesión</p></a>
        </div>


        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-text-color-hover px-3 py-1.5 text-sm font-semibold leading-6 text-text-color shadow-sm hover:bg-opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Restablecer contraseña
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
