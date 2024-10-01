import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useAuth } from "../utils/authProvider";
import axios from "axios";
import { useLocation } from "react-router-dom";
const AdminVideo = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const idVideo = queryParams.get('idVideo')
    const [video, setVideo] = useState(null)

    useEffect(() => {
        const fetchVideo = async () => {
            const video = await axios.get(`http://localhost:3001/getVideo?idVideo=${idVideo}`)
            console.log(video)
            setVideo(video.data.video);
        }


        fetchVideo()
    }, [])
    const videoURL = `data:video/mp4;base64,${video}`;
    const user = useAuth()
    return (
        <div>
            <Nav user={user} />
            <div className="bg-panda-green h-[48rem] relative">
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
                <div className="w-full h-full flex justify-center items-center">
                    <video className="w-[50%] rounded-md drop-shadow-md" src={videoURL} controls></video>
                </div>
            </div>

        </div>
    )
}

export default AdminVideo;