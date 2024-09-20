import NavItem from "./NavItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authProvider";

const ProfileDropdown = ({visible}) => {
    const {setUser} = useAuth();
    
    if (!visible) {
        return null;
    }


    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:3001/logout', {}, { withCredentials: true })
            console.log(response)
            if(response.data.success){
                setUser(null);

            }
        }catch(err){
            console.error('Error al cerrar sesión:', err);
        }
    }
    return (
        <div className="absolute">
            <div className="relative inline-block text-left">
                <div className="absolute top-[1.3rem]  z-10 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div className="shadow-md flex flex-col gap-1 py-2 px-2" role="none">
                        <NavItem label="Perfil " size="md"/>
                        <div className="h-[1px] w-30  bg-black opacity-30"></div>
                        <NavItem label="Cerrar sesión" size="md" onClick={handleLogout}/>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default ProfileDropdown;