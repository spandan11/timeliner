import { NextRequest, NextResponse } from "next/server";
import { db } from "@/prisma";
import { TimelineFormSchema } from "@/schemas";
import { getServerAuthSession } from "@/lib/getServerAuthSession";

export async function PUT(
  request: NextRequest,
  { params }: { params: { timelineId: string } }
) {
  const body: unknown = await request.json();
  const { timelineId } = params;
  try {
    const validatedFields = await TimelineFormSchema.safeParseAsync(body);
    if (validatedFields.success) {
      const session = await getServerAuthSession();
      const { title, date, description } = validatedFields.data;
      await db.timeline.update({
        where: {
          id: timelineId,
          userId: session?.user.id,
        },
        data: {
          title,
          date,
          description,
        },
      });
      return NextResponse.json({
        success: "Timeline updated",
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
