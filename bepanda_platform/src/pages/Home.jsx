import Nav from "../components/Nav";
import { useAuth } from "../utils/authProvider";
import TusCursos from "../components/TusCursos";

const Home = () => {
  const user = useAuth();
  console.log(user);

  return (
    <div> 
      <Nav user={user} />
      <div className="bg-panda-green h-[45rem] relative">
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
        <TusCursos/>
      </div>
      
    </div>
  );
};

export default Home;
