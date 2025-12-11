import { motion } from "framer-motion";
import { slideUpVariants } from "../../ui/components/animation"
import ContactForm from "../components/ContactForm";
;
function Contact() {
  return (
    <div
      id="contact"
      className="w-full lg:h-[70vh] h-screen sm:h-screen overflow-hidden bg-linear-to-tl from-white via-white/80 to-blue-200"
    >
      <div className="lg:w-[80%] w-[90%] m-auto py-[60px] flex lg:flex-row flex-col justify-between items-center gap-[50px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="lg:w-[60%] w-full flex flex-col justify-center items-start gap-6"
        >
          <motion.h1
            variants={slideUpVariants}
            className="text-center mt-6 block text-[40px] md:text-4xl font-bold  text-[#7c3aed] bg-linear-to-r 
            from-violet-500 via-violet-600 to-violet-700 bg-clip-text drop-shadow-2xl italic uppercase"
          >
            Contact Us
          </motion.h1>
          <motion.h1
            variants={slideUpVariants}
            className="text-black uppercase text-[40px] font-bold"
          >
            Reach out to us for any questions or feedback.
          </motion.h1>
          <motion.div
            variants={slideUpVariants}
            className="w-[120px] h-[6px] bg-violet-500"
          />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" variants={slideUpVariants} className="lg:w-[40%] w-full flex flex-col justify-center items-start gap-6">
          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;
