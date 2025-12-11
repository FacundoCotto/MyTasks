import { env } from "../env/env";
import type { Contact } from "../../home/types/contact.types";

export const contactEmail = async (data: Contact) => {
  const formData = new FormData();
  formData.append("access_key", env.ACCESS_KEY);
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("message", data.message);

  const response = await fetch(env.EMAIL_CONTACT_URL, {
    method: "POST",
    body: formData,
  });

  const responseData = await response.json();

  return responseData;
};
