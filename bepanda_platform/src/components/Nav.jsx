import NavItem from "./NavItem";
import ProfileItem from "./ProfileItem";

const Nav = (user) => {

    return (
        <div className="h-[4rem]" >
            <div className=" w-[70%] h-full m-auto flex my-2">
                <div className=" h-full flex w-[50%] items-center gap-6 ">
                    <img className=" h-14 mr-12" src="https://bepandalife.com/wp-content/uploads/2021/04/cropped-IMAGOTIPO-BE-PANDA_COLOR-TRANPARENCIA_WEB.png" alt="Logo" />
                    <NavItem label="Inicio" size="lg"/>
                    <NavItem label="Cursos" size="lg"/>
                </div>
                <div className="flex items-center justify-end w-[50%]">
                    <ProfileItem />
                </div>
            </div>
        </div>

        
    )
}

export default Nav;