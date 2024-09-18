import { useState } from "react";
import axios from 'axios'
import {useNavigate}  from "react-router-dom";
import Error from "../components/Error";
import { useAuth } from "../utils/authProvider";


const Auth = () => {
    const {setUser} = useAuth();
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
      });
      const [error, setError] = useState(false)

      const navigate = useNavigate();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevState => ({
          ...prevState,
          [name]: value
        }));
      };


    const handleSubmit = (e) => {
        e.preventDefault();
        const user = axios.post("http://localhost:3001/login", inputs, {withCredentials:true})
            .then(res => {
                console.log(res)
                if(!res.data.success) {
                    setError(res.data.message)
                    console.log(res.data.message)
                } else {
                    setUser(res.data.user);
                    navigate('/home');
                }
            })

        
    }




    

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Inicia sesión con tu cuenta
                </h2>
            </div>

            

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {error && <div className="text-center "><Error errorMessage={error}  /></div>}
                <form onSubmit={handleSubmit} action="#" method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                            onChange={handleChange}
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Contraseña
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Olvidaste la contraseña?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                            onChange={handleChange}
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Auth;


