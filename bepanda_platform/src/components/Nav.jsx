import NavItem from "./NavItem";
import ProfileItem from "./ProfileItem";
import { useNavigate } from "react-router-dom";

const Nav = ({ user }) => {
    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/home')
    }
    const handleAdmin = () => {
        navigate('/admin')
    }

    return (
        <div className="h-[4rem] font-montserrat" >
            <div className=" w-[70%] h-full m-auto flex my-2">
                <div className=" h-full flex w-[50%] items-center gap-6 ">
                    <img className=" h-14 mr-12" src="https://bepandalife.com/wp-content/uploads/2021/04/cropped-IMAGOTIPO-BE-PANDA_COLOR-TRANPARENCIA_WEB.png" alt="Logo" />
                    <NavItem onClick={handleHome} label="Inicio" size="lg" />
                    <NavItem label="Cursos" size="lg" />
                    {user.user.admin && <div className="flex gap-6"><NavItem label="Admin" onClick={handleAdmin} size="lg" /><NavItem label="Alumnos" size="lg" /></div>}
                </div>
                <div className="flex items-center justify-end w-[50%]">

                    <ProfileItem user={user} />
                </div>
            </div>
        </div>


    )
}

export default Nav;