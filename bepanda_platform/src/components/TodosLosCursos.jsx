import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const TodosLosCursos = () => {
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(`/modulos?cursoId=${id}`)
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getCursos');
        const cursos = response.data.response;

        // Agregar directamente la URL de datos a cada curso
        const cursosConImagenes = cursos.map((curso) => {
          const imageUrl = `data:image/jpeg;base64,${curso.image}`;
          return {
            ...curso,
            imageUrl,
          };
        });

        setImageUrl(cursosConImagenes);
      } catch (error) {
        console.error('Error fetching the images:', error);
      }
    };


    fetchImages();
  }, []);
  return (
    <div className="w-full px-32">
      <div className="flex gap-10 flex-wrap">
        {imageUrl ? imageUrl.map((url) => {
          return (
            
            <div key={url.idCurso} onClick={()=> {handleClick(url.idCurso)}} className="w-[23rem] relative overflow-hidden group cursos  shadow-xl rounded-md hover:scale-105 transition-all cursor-pointer">
              <img className=" h-full" src={url.imageUrl} alt="Fetched from server" />
              <div className="absolute bottom-0 left-[-18.8rem]  rounded-md text-white p-5 w-[80%] bg-black bg-opacity-80 group-hover:left-0 transition-all">
                <p>{url.nombre}</p>
              </div>
            </div>
            
            )
        })
          : <Loader/>}
      </div>
      

    </div>
  )
}

export default TodosLosCursos;