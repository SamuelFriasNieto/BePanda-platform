import { useCallback, useState, useEffect, useRef } from "react";
import ProfileDropdown from "./ProfileDropdown";

const ProfileItem = ({user}) => {
    const [profileDropdown, setProfileDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleClick = useCallback(() => {
        setProfileDropdown((current) => !current);
    }, []);

    // Detecta clics fuera del dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Si el dropdown está abierto y el clic ocurre fuera de él, cerrarlo
            if (profileDropdown && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProfileDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileDropdown]);

    return (
        <div ref={dropdownRef} className="flex items-center">
            <p className="text-text-color mr-5 mt-1 cursor-pointer" onClick={handleClick}>{user.user.name}</p>
            <img
                onClick={handleClick}
                className="h-14 cursor-pointer"
                src="https://proseawards.com/wp-content/uploads/2015/08/no-profile-pic.png"
                alt="Profile Icon"
            />
            {profileDropdown && <ProfileDropdown visible={profileDropdown} />}
        </div>
    );
};

export default ProfileItem;
