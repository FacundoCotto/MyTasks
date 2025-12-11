import { motion } from "framer-motion";
import { zoomInVariants } from "../../ui/components/animation";
import { Input } from "../../ui/components/Input";
import { TextArea } from "../../ui/components/TextArea";
import { useState } from "react";
import { validateSchema } from "../../utils/validateSchema";
import { contactSchema } from "../../home/schema/contact.schema";
import type { Contact } from "../types/contact.types";
import { contactEmail } from "../../ui/services/contactEmail";

function ContactForm() {
  const [contactData, setContactData] = useState<Contact>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);

    const validationErrors = validateSchema(contactData, contactSchema);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await contactEmail(contactData);

      if (response.success) {
        setStatusMessage("Email sent successfully");
        setContactData({ name: "", email: "", message: "" });
      } else {
        setStatusMessage("Error sending email");
      }
    } catch (error) {
      setStatusMessage("Error sending email");
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  return (
    <motion.form
      initial="view"
      whileInView="visible"
      variants={zoomInVariants}
      className="flex flex-col justify-center items-start gap-4 w-full "
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <Input
          name="name"
          id="name"
          type="text"
          value={contactData.name}
          onChange={handleChange}
          placeholder="Name"
          autoComplete="name"
          variant="primary"
          required={false}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1 pl-2">{errors.name}</p>
        )}
      </div>

      <div className="w-full">
        <Input
          name="email"
          id="email"
          type="email"
          value={contactData.email}
          onChange={handleChange}
          placeholder="Email"
          autoComplete="email"
          variant="primary"
          required={false}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1 pl-2">{errors.email}</p>
        )}
      </div>

      <div className="w-full">
        <TextArea
          name="message"
          id="message"
          value={contactData.message}
          rows={4}
          onChange={handleChangeTextArea}
          placeholder="Message"
          autoComplete="message"
          variant="primary"
          required={false}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1 pl-2">{errors.message}</p>
        )}
      </div>

      <motion.button
        variants={zoomInVariants}
        type="submit"
        className="bg-violet-500 hover:bg-violet-600 text-white px-10 py-4 font-bold rounded-lg w-full cursor-pointer"
      >
        Send Message
      </motion.button>
      {statusMessage && (
        <p
          className={`${
            statusMessage.includes("successfully")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {statusMessage}
        </p>
      )}
    </motion.form>
  );
}

export default ContactForm;
