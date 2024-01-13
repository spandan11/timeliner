import { NextRequest, NextResponse } from "next/server";

import { db } from "@/prisma";
import { TimelineFormSchema } from "@/schemas";
import { getServerAuthSession } from "@/lib/getServerAuthSession";

export async function GET() {
  try {
    const session = await getServerAuthSession();
    const timelines = await db.timeline.findMany({
      where: {
        userId: session?.user.id,
      },
      select: {
        id: true,
        title: true,
        date: true,
        description: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(timelines);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const body: unknown = await request.json();
  try {
    const validatedFields = await TimelineFormSchema.safeParseAsync(body);
    if (validatedFields.success) {
      const { title, date, description } = validatedFields.data;
      const session = await getServerAuthSession();
      await db.timeline.create({
        data: {
          title,
          date,
          description,
          userId: session?.user.id,
        },
      });
      return NextResponse.json({
        success: "Timeline Added!",
        status: 200,
      });
    }
    return NextResponse.json({
      error: "Invalid fields try submitting again",
      status: 400,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", status: 500 });
  }
}
