import { render } from "mustache";
import { readFileSync } from "fs";
import { IReceipient } from "@/interfaces/receipient";

export const mailOptions = (
  receipient: string,
  subject: string,
  data: IReceipient,
  htmlPath: string
) => {
  return {
    from: `${process.env.SMTP_NAME} <${process.env.EMAIL}>`,
    to: receipient,
    subject: subject,
    html: render(readFileSync(process.cwd() + htmlPath, "utf8"), {
      firstName: data.firstName,
    }),
  };
};
