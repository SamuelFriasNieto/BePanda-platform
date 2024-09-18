import Nav from "../components/Nav";
import { useAuth } from "../utils/authProvider";

const Home = () => {
  const user = useAuth();
  console.log(user);

return(
  <div>
    <Nav/>
  </div>
)}

export default Home;