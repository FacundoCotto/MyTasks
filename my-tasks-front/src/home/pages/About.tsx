import { motion } from "framer-motion";
import { slideUpVariants } from "../../ui/components/animation";
import AboutInfo from "../components/AboutInfo";

export default function About() {
  return (
    <section
      id="about"
      className="w-full h-screen md:h-[95vh] lg:h-[95vh] xl:h-[80vh] overflow-hidden bg-blue-50 m-auto px-6 md:px-12 lg:px-24 py-16 md:py-20  flex flex-col justify-between items-center gap-10 "
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={slideUpVariants}
        className="lg:w-[80%] w-[90%] m-auto flex flex-col  items-center justify-center text-center gap-5"
      >
        <motion.h1 variants={slideUpVariants} className="text-center mt-6 block text-[40px] bg-linear-to-r from-violet-500 via-violet-600 to-violet-700 bg-clip-text drop-shadow-2xl italic uppercase text-4xl md:text-5xl font-bold text-violet-500">
          About Us
        </motion.h1>
        <motion.div variants={slideUpVariants} className="w-[120px] h-[6px] bg-violet-500 text-lg md:text-xl text-gray-500 max-w-[800px]"></motion.div>
        
        <AboutInfo />

      </motion.div>
    </section>
  );
}
