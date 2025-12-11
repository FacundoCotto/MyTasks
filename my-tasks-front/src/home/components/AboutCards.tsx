import { motion } from "framer-motion";
import { zoomInVariants } from "../../ui/components/animation";
import { FaTasks } from "react-icons/fa";

function AboutCards({
  item = {
    index: 0,
    icon: <FaTasks />,
    title: "Task Management",
    description: "Create, organize, and manage your tasks effortlessly.",
  },
}: {
  item: {
    index: number;
    icon: React.ReactElement;
    title: string;
    description: string;
  };
}) {
  return (
    <motion.div
      variants={zoomInVariants}
      className="flex flex-col md:flex-row 
        items-center md:items-start     
        justify-center md:justify-start 
        gap-5 p-6 md:p-8
        text-center md:text-left "
      key={item.index}
    >
      <div
        className="w-[100px] border-2 border-violet-500 hover:border-violet-700 rounded-lg p-2 flex flex-col gap-2 md:gap-3 items-center justify-center shrink-0 h-[80px] md:w-[100px] md:h-[100px] text-3xl md:text-4xl text-violet-500 "
      >
        {item.icon}
      </div>
      <div className="flex flex-col justify-center items-start gap-2 md:gap-3 min-w-0 w-full">
        <h1 className="text-violet-500 text-lg md:text-xl font-bold">
          {item.title}
        </h1>
        <p className="text-gray-500 text-[18px] text-base md:text-[18px]">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default AboutCards;
