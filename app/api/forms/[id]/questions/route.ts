import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { label, type, required, options } = body; 
    const newQuestion = await db.question.create({
      data: {
        label,
        type,
        required: required || false,
        options: options || "", 
        form: {
          connect: { id: id }
        }
      },
    });

    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    console.error("DEBUG ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}