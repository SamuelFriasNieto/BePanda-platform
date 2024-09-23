const NavItem = ({ label, size, onClick }) => {


  return (
    <div onClick={onClick} className="cursor-pointer">
      <p className={`text-${size} text-text-color font-montserrat hover:text-text-color-hover transition`}>
        {label }
      </p>
    </div>
  );
};

export default NavItem;