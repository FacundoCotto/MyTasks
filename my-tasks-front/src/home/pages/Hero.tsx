import { Btn } from "../../ui/components/Btn";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { slideUpVariants, zoomInVariants } from "../../ui/components/animation";

function Hero() {
  const navigate = useNavigate();

  
  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <div
      id="hero"
      className="w-full h-screen overflow-hidden px-6 lg:px-24
      bg-linear-to-br from-white via-white/80 to-blue-200"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={slideUpVariants}
        className=" text-center relative z-10 h-full flex mt-32 justify-center"
      >
        <div className="mb-8">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            variants={slideUpVariants}
            className="mb-4"
          >
            <span
              className=" mt-16 mb-8 block text-6xl md:text-8xl font-black  text-[#7c3aed] bg-linear-to-r 
            from-violet-500 via-violet-600 to-violet-700 bg-clip-text drop-shadow-2xl"
            >
              My Tasks
            </span>
            <span className="animate-pulse block text-xl text-violet-500 font-light tracking-wider font-sans">
              Your all-in-one productivity hub!
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={slideUpVariants}
            className="mb-8 animate-pulse text-lg md:text-xl text-violet-500 font-light max-w-2xl"
          >
            Create, organize, and manage your tasks effortlessly. Features
            include quick task creation, calendar integration, and a quality
            rating system to prioritize your work. Get started now and take
            control of your to-do list!
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={zoomInVariants}
            className="flex items-center justify-center"
          >
            <Btn variant="motion" {...{ onClick: handleGetStarted }}>
              Get Started
            </Btn>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Hero;
