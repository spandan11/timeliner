import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { db } from "@/prisma";
import env from "@/configs/env";

interface sendMailProps {
  email: string;
  emailType: "VERIFY" | "FORGET";
  userId: string;
}

export const sendMail = async ({ email, emailType, userId }: sendMailProps) => {
  try {
    console.log("type: " + emailType);
    const hashedToken = await bcrypt.hash(userId, 10);

    if (emailType === "VERIFY") {
      console.log("email: " + email);
      console.log("id: " + userId);
      const userverify = await db.user.update({
        where: {
          id: userId,
        },
        data: {
          verifyToken: hashedToken,
          verifyTokenExpiry: `${Date.now() + 3600000}`,
        },
      });
      console.log("verifying part");
      if (userverify) {
        console.log("VERIFIED");
      }
    }
    if (emailType === "FORGET") {
      console.log("email: " + email);
      console.log("id: " + userId);
      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: `${Date.now() + 3600000}`,
        },
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "03a33f5dbf2f78",
        pass: "174eb373bd831e",
      },
    });

    const mailOptions = {
      from: "spandan@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        env.DOMAIN
      }/verify-email?token=${hashedToken}"> here </a> to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password"
      }</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse.messageId;
  } catch (error: any) {
    console.log("Failed to send mail", error);
    throw new Error(error);
  }
};
