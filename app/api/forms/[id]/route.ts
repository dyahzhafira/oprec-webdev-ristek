import { db } from "@/lib/prisma";
import { getUserIdFromToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const userId = await getUserIdFromToken();

    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const form = await db.form.findUnique({
      where: { id },
    });

    if (!form)
      return NextResponse.json({ error: "Form not found" }, { status: 404 });

    if (form.userId !== userId)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    return NextResponse.json(form);

  } catch (error: any) {
    console.error("GET FORM ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = await getUserIdFromToken();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {

    const form = await db.form.findUnique({ where: { id: params.id }, include:{questions: true}, });
    
    if (!form) return NextResponse.json({ error: "Form not found" }, { status: 404 });
    if (form.userId !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await db.form.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Form deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete form" }, { status: 500 });
  }
}