import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const response = await db.response.create({
      data: {
        formId: params.id,
        answers: JSON.stringify(body.answers), 
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}