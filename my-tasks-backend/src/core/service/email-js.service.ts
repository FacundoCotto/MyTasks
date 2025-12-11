import axios from "axios";
import { env } from "../../config/env";
import { AppError } from "../utils/AppError";

export const sendByEmailJs = async (
  email: string,
  options: Record<string, any>,
  templateId: string
) => {
  const dataToSend = {
    service_id: env.EMAIL_JS_SERVICE_ID,
    template_id: templateId,
    user_id: env.EMAIL_JS_PUBLIC_KEY,
    accessToken: env.EMAIL_JS_PRIVATE_KEY,
    template_params: {
      email,
      ...options,
    },
  };

  try {
    const response = await axios.post(env.EMAIL_JS_URL, dataToSend);
    return response.data;
  } catch (error) {
    throw new AppError("Failed to send email", 500);
  }
};
