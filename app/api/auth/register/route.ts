import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { db } from "@/prisma";
import { RegisterFormSchema } from "@/schemas";
// import { sendMail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  const body: unknown = await request.json();
  try {
    const validatedFields = await RegisterFormSchema.safeParseAsync(body);
    if (validatedFields.success) {
      const { name, email, password } = validatedFields.data;
      const userExist = await db.user.findUnique({
        where: {
          email,
        },
      });
      if (userExist) {
        return NextResponse.json({
          error: "User already exist",
          status: 400,
        });
      }
      const hashedPassword = await bcrypt.hash(
        password,
        await bcrypt.genSalt(10)
      );
      await db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      return NextResponse.json({
        success: "Please verify your email !",
        status: 200,
      });
      // ? For Sending email for verification
      // if (createdUser) {
      //   await sendMail({
      //     email: createdUser.email,
      //     emailType: "VERIFY",
      //     userId: createdUser.id,
      //   });
      // return NextResponse.json({
      //   success: "Please verify your email !",
      //   status: 200,
      // });
      // }
      // return NextResponse.json({
      //   error: "Something went wrong! please try again after sometime",
      //   status: 400,
      // });
    }
    return NextResponse.json({
      error: "Invalid fields try submitting again",
      status: 400,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", status: 500 });
  }
}
