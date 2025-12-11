import { Btn } from "../../ui/components/Btn";
import { FaXmark, FaBars } from "react-icons/fa6";
import HeaderLink from "../components/HeaderLink";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    const handleAuth = () => {
        navigate(`/auth`);
    }

  return (
    <nav
      className="w-full flex bg-white justify-between items-center gap-1 lg:px-16 px-6
    py-4 sticky top-0 z-50 "
    >
      <h1 className="text-violet-500 md:text-4xl text-3xl font-bold font-rubik italic">
        My Tasks
      </h1>
      
      <HeaderLink variant="primary" />

      <div className="flex items-center gap-2">
        <Btn variant="primary" {...{ onClick: handleAuth }}>Authentication</Btn>
      </div>

      <div className="flex justify-between items-center lg:hidden mt-3" onClick={toggleMenu}>
        <div>
            {isMenuOpen ? <FaXmark className="text-3xl text-violet-500 cursor-pointer" onClick={closeMenu}/> : <FaBars className="text-3xl text-violet-500 cursor-pointer" onClick={toggleMenu}/>}
        </div>
      </div>
      <div className={`${isMenuOpen ? "block" : "hidden"} w-full h-fit bg-violet-500/10 absolute top-[72px] left-0 `} onClick={closeMenu}>
        <HeaderLink variant="secondary" />
      </div>
    </nav>
  );
}

export default Header;
