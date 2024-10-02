import { useEffect, useState, useRef } from "react";
import Nav from "../components/Nav";
import { useAuth } from "../utils/authProvider";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Plyr from "plyr";
import Loader from "../components/Loader";

const AdminVideo = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const idVideo = queryParams.get('idVideo')
    const [modulo, setModulo] = useState(null)
    const videoRef = useRef(null);
    const videoURL = `http://localhost:3001/getVideo?idVideo=${idVideo}`;
    const [loading,setLoading] = useState(true)
    console.log(modulo)





    useEffect(() => {
        const player = new Plyr(videoRef.current, {
            captions: { active: true },
        });
        window.player = player;

        return () => {
            player.destroy();
        };
    }, []);

    useEffect(() => {
        const fetchModulo = async () => {
            const modulo = await axios.get(`http://localhost:3001/getVideo?idVideo=${idVideo}&module=true`);
            setModulo(modulo.data.message[0]);
        }


        fetchModulo()

    }, [])

    const handleWaiting = (e) => {
        setLoading(false)
        console.log(e)
    }
    const handleCanPlay = () => {setLoading(true)}



    useEffect(() => {
  const videoElement = videoRef.current;

  // Verificamos si el elemento de video existe antes de agregar los event listeners
  if (videoElement) {
    const handleLoadedData = () => {
      setLoading(false);
    };

    const handleWaiting = () => {
      setLoading(true);
    };

    // Agregamos los event listeners al elemento de video
    videoElement.addEventListener("loadeddata", handleLoadedData);
    videoElement.addEventListener("waiting", handleWaiting);

    // Limpiamos los event listeners cuando el componente se desmonta
    return () => {
      videoElement.removeEventListener("loadeddata", handleLoadedData);
      videoElement.removeEventListener("waiting", handleWaiting);
    };
  }
}, []);




    // useEffect(() => {
    //     const fetchVideo = async () => {
    //         const video = await axios.get(`http://localhost:3001/getVideo?idVideo=${idVideo}`)
    //         console.log(video)
    //         setVideo(video.data.video);
    //     }
    //     fetchVideo()
    // }, [])
    // const videoURL = `data:video/mp4;base64,${video}`;

    const user = useAuth()


    return (
        <div>
            <Nav user={user} />
            <div className="bg-panda-green h-[58rem] relative">
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
                {loading ? <div>
                    <div>
                        <h1 className="drop-shadow-md text-4xl mt-[5rem] text-center text-white font-semibold pb-10">{modulo && modulo.nombre}</h1>
                    </div>

                    <div className="w-full h-full flex justify-center items-center">
                        <video ref={videoRef} className="w-[50%] rounded-md drop-shadow-md" src={videoURL} ></video>
                    </div>
                </div> :
                    <Loader/>
                }
                

            </div>

        </div>
    )
}

export default AdminVideo;