import { FaArrowCircleUp, FaCopyright } from "react-icons/fa";
import { Link } from "react-scroll";

function Footer() {
  return (
    <>
      <div className="bg-white text-black flex justify-center items-center gap-2 p-5">
        <FaCopyright className="fill-amber-400 lg:size-5 size-8"/>
        <p>Copyright 2025 My Tasks. All rights reserved.</p>
      </div>

      <div id="icon-box" className="bg-violet-500 text-white p-3 rounded-full hover:bg-black hover:text-violet-500 cursor-pointer fixed lg:bottom-6 right-6 bottom-6">
        <Link to="hero" spy={true} smooth={true} offset={-100}>
          <FaArrowCircleUp className="size-6"/>
        </Link>
      </div>
    </>
  )
}

export default Footer