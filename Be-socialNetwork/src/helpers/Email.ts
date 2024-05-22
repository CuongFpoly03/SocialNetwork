import nodemailer from "nodemailer";
import Locals from "../providers/Local";

class SendNewPasswordEmail {
  public static async sendNewPasswordEmails (email: any, newPassword:any) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: Locals.config().emailUser,
          pass: Locals.config().emailPass,
        },
      });

      const mailOptions = {
        from: Locals.config().emailUser,
        to: email,
        subject: "Your New Password",
        text: `Your new password is: ${newPassword}`,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error(`Error sending email: ${(error as Error).message}`);
    }
  };
}
export default SendNewPasswordEmail;
