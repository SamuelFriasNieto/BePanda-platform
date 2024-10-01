import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom"
import { useAuth } from "../utils/authProvider";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";


const Modulos = () => {


    const location = useLocation();
    const navigate = useNavigate();
    const user = useAuth();
    const modal = useRef(null);
    const [mostrarLoader, setMostrarLoader] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [selectedPDF, setSelectedPDF] = useState(null);
    const [formText, setFormText] = useState(null)
    const [modulos, setModulos] = useState(null)
    const queryParams = new URLSearchParams(location.search)

    const idCurso = queryParams.get('cursoId')

    const handleVideo = (e) => {
        navigate(`/adminVideo?idVideo=${e}`)
    }



    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    const handleAudioChange = (e) => {
        setSelectedAudio(e.target.files[0]);
    };
    const handlePDFChange = (e) => {
        setSelectedPDF(e.target.files[0]);
    };
    const handleTextChange = (e) => {
        setFormText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert('Please select a file')
            return;
        }




        const formData = new FormData()
        formData.append('video', selectedFile); // Append the file to FormData
        formData.append('nombre', formText)
        formData.append('cursoId', idCurso)
        formData.append('audio', selectedAudio)
        formData.append('PDF', selectedPDF)




        try {
            setMostrarLoader(true);
            // Send a POST request to the backend
            const response = await axios.post('http://localhost:3001/crearVideo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set content type as multipart/form-data
                },
            })

            setMostrarLoader(false)
            window.location.reload()
        } catch (error) {
            console.error('Error uploading the file:', error);
        }


    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Función para abrir el modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Si el dropdown está abierto y el clic ocurre fuera de él, cerrarlo
            if (isModalOpen && modal.current && !modal.current.contains(event.target)) {
                setIsModalOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isModalOpen]);








    useEffect(() => {
        const handleCurso = async () => {
            const modulos = await axios.get(`http://localhost:3001/getModulos?idCurso=${idCurso}`)
            console.log(modulos, 'hola')
            setModulos(modulos.data.message)
        }
        handleCurso()


    }, [])


    return (
        <div>
            <Nav user={user} />

            <div className="bg-panda-green h-[48rem] relative font-montserrat">
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
                <div className="w-full flex justify-end  py-14 px-32 curso">
                    <button onClick={openModal} className="bg-white py-3 px-6 font-semibold  transition-all hover:text-white hover:bg-panda-green-darker cursos-boton rounded-md shadow-md ">Crear Módulo</button>
                </div>
                {isModalOpen && (
                    <>
                        {/* Fondo oscuro detrás del modal */}
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            {/* Contenido del modal */}
                            <div ref={modal} className="bg-white p-8 rounded-lg w-[400px]">
                                <button
                                    onClick={closeModal}
                                    className=" float-right font-semibold"
                                >
                                    x
                                </button>
                                <h2 className="text-2xl font-semibold mb-4">Crear Módulo</h2>


                                {/* Formulario dentro del modal */}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm">Nombre:</label>
                                        <input onChange={handleTextChange}
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded"
                                            placeholder="Escribe tu nombre"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm">Video:</label>
                                        <input onChange={handleFileChange}
                                            type="file"
                                            className="w-full rounded"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm">Audio:</label>
                                        <input onChange={handleAudioChange}
                                            type="file"
                                            className="w-full rounded"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm">Lectura:</label>
                                        <input onChange={handlePDFChange}
                                            type="file"
                                            className="w-full rounded"
                                        />
                                    </div>
                                    {mostrarLoader && <div>
                                        <p className="text-yellow-600 pb-4">Creando Curso ...</p>
                                    </div>}

                                    <button
                                        type="submit"
                                        className="bg-panda-green hover:opacity-80 transition text-white px-4 py-2 rounded-lg"
                                    >
                                        Enviar
                                    </button>
                                </form>

                                {/* Botón para cerrar el modal */}

                            </div>
                        </div>
                    </>
                )}
                <div>
                    {/*<video src={videoURL} controls></video> */}
                    <div className="px-32 flex flex-col gap-6 font-bold text-white">
                        {modulos && modulos.map((modulo) => {
                            return (
                                <div className="flex gap-40 border- drop-shadow-md border-2  p-3 rounded-md">
                                    <div className="flex w-[50%] justify-between">
                                        <p className="cursor-pointer" onClick={()=>{handleVideo(modulo.idVideo)}}>{modulo.nombre}</p>
                                        <div className="flex gap-40">
                                            <p>Audio</p>
                                            <p>PDF</p>
                                        </div>

                                    </div>

                                </div>
                            )
                        })}
                    </div>




                </div>
            </div>
        </div>
    )
}

export default Modulos;