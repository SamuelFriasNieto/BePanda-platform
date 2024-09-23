import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../utils/authProvider";
import Nav from "../components/Nav";

const ResetPasswordForm = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [changePassword, setChangePassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const user = useAuth();
    const email = user.user.email;
    console.log(user)

    const handlePass = () => {
        setChangePassword((current) => !current)
    }



    const handleSubmit = async (e) => {
        e.preventDefault();



        try {
            const response = await axios.post("http://localhost:3001/reset-password", {
                email,
                password,
                confirmPassword,
            });

            if (response.data.success) {
                setError(null);
                navigate("/login");
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError("Ocurrió un error al restablecer la contraseña.");
        }
    };



    return (
        <div className="font-montserrat">
            <Nav user={user} />
            <div className="bg-panda-green h-[30rem] relative">
                <div className="h-[1rem] w-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-6" // Tailwind classes for responsive width and height
                        viewBox="0 0 1000 100"
                        preserveAspectRatio="none"
                    >
                        <path
                            className="elementor-shape-fill"
                            d="M0,0c0,0,0,6,0,6.7c0,18,240.2,93.6,615.2,92.6C989.8,98.5,1000,25,1000,6.7c0-0.7,0-6.7,0-6.7H0z"
                            fill="white"
                        ></path>
                    </svg>

                </div>
                <div className="h-[1rem] absolute bottom-0 w-full rotate-180">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-6"
                        viewBox="0 0 1000 100"
                        preserveAspectRatio="none"
                    >
                        <path
                            className="elementor-shape-fill"
                            d="M0,0c0,0,0,6,0,6.7c0,18,240.2,93.6,615.2,92.6C989.8,98.5,1000,25,1000,6.7c0-0.7,0-6.7,0-6.7H0z"
                            fill="white"
                        ></path>
                    </svg>

                </div>
                <div className="w-full h-full flex items-center justify-center">
                    <div>
                        <div className="text-white drop-shadow-md flex flex-col gap-3">
                        <p>Nombre: {user.user.name}</p>
                        <p>Correo: {user.user.email}</p>
                        <p className=" text-yellow-400 hover:cursor-pointer" onClick={handlePass}>Cambiar contraseña</p>
                        </div>
                        
                        {changePassword && <div className="absolute bottom-[8rem] right-[18rem] w-[15rem] flex flex-1 flex-col justify-center  font-montserrat">

                        {error && <div className="text-red-600 drop-shadow-md ">{error}</div>}

                        <form onSubmit={handleSubmit} className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm  text-white">
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
                                <label htmlFor="confirmPassword" className="block text-sm  text-white">
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

                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-text-color-hover px-3 py-1.5 text-sm font-semibold leading-6 text-text-color shadow-sm hover:bg-opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Restablecer contraseña
                            </button>
                        </form>
                    </div>}
                    </div>
                    
                </div>



            </div>


        </div>

    );
};

export default ResetPasswordForm;
