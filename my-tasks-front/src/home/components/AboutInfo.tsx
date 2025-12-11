import { motion } from "framer-motion";
import { FaStar, FaTasks, FaUser } from "react-icons/fa";
import { BiCalendar } from "react-icons/bi";
import AboutCards from "./AboutCards";

function AboutInfo() {
  const Info = [
    {
      index: 0,
      icon: <FaTasks />,
      title: "Task Management",
      description: "Create, organize, and manage your tasks effortlessly.",
    },
    {
      index: 1,
      icon: <BiCalendar />,
      title: "Calendar Integration",
      description:
        "View your tasks in a calendar view for better organization.",
    },
    {
      index: 2,
      icon: <FaStar />,
      title: "Quality Rating",
      description: "Rate the quality of your tasks to prioritize your work.",
    },
    {
      index: 3,
      icon: <FaUser />,
      title: "Fast Register",
      description:
        "Register in seconds with your email and password. No need to wait for approval.",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: { scale: 0.5, opacity: 0 },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            staggerChildren: 2,
            duration: 1.2,
            ease: "easeOut",
          },
        },
      }}
      className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-[20px] md:gap-[30px] items-start mt-[30px]"
    >
      {Info.map((item) => (
        <AboutCards key={item.title} item={item} />
      ))}
    </motion.div>
  );
}

export default AboutInfo;
