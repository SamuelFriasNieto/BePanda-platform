import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import { useAuth } from "../utils/authProvider";

const Auth = () => {
    const [loading, setLoading] = useState(true); // Nuevo estado para controlar el cargando
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    // Verifica si el usuario está logueado
    useEffect(() => {
        if (user) {
            navigate('/home');
        } else {
            setLoading(false); // Una vez comprobado, desactiva el estado de carga
        }
    }, [user, navigate]);

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevState => ({
          ...prevState,
          [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/login", inputs, { withCredentials: true })
            .then(res => {
                if (!res.data.success) {
                    setError(res.data.message);
                } else {
                    setUser(res.data.user);
                    navigate('/home');
                }
            })
            .catch(err => console.log(err));
    };

    // Muestra un estado de carga mientras se verifica el usuario
    if (loading) {
        return <div></div>;  // O puedes usar un spinner de carga
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-montserrat">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-14 w-auto" src="https://bepandalife.com/wp-content/uploads/2021/04/cropped-IMAGOTIPO-BE-PANDA_COLOR-TRANPARENCIA_WEB.png" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-text-color">
                    Inicia sesión con tu cuenta
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {error && <div className="text-center"><Error errorMessage={error} /></div>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-text-color">
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
                                className="block w-full rounded-md border-0 py-1.5 text-text-color shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Contraseña
                            </label>
                            <div className="text-sm">
                            <Link to='/verify-mail' className="font-semibold text-text-color-hover hover:text-opacity-85">
   ¿Olvidaste tu contraseña?
</Link>

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
                            className="flex w-full justify-center rounded-md bg-text-color-hover px-3 py-1.5 text-sm font-semibold leading-6 text-text-color shadow-sm hover:bg-opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Auth;
