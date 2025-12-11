import { Link } from "react-scroll";

function HeaderLink({ variant = "primary" }: { variant?: string }) {
  const navLinks = [
    {
      link: "Home",
      path: "hero",
    },
    {
      link: "About",
      path: "about",
    },
    {
      link: "Contact",
      path: "contact",
    },
  ];

  const variants: Record<string, string> = {
    primary:
      "text-black uppercase font-bold cursor-pointer px-10 py-3 rounded-full hover:text-white hover:bg-violet-500/10 text-[15px] hover:bg-violet-600 italic",
    secondary:
      "text-black uppercase font-semibold cursor-pointer p-2 rounded-lg hover:text-violet-500 hover:bg-violet-500/10 w-full text-center",
  };

  return (
    <ul
      className={
        variant === "primary"
          ? "lg:flex hidden items-center gap-6 justify-center ml-16"
          : "flex flex-col justify-center items-center gap-2 w-full"
      }
    >
      {navLinks.map(({ link, path }) => (
        <Link
          key={path}
          className={variants[variant]}
          to={path}
          spy={true}
          smooth={true}
          offset={-100}
        >
          {link}
        </Link>
      ))}
    </ul>
  );
}

export default HeaderLink;
