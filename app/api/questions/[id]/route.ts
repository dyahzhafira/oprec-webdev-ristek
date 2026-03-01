import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; 
    const question = await db.question.findUnique({ 
      where: { id } 
    });

    if (!question) {
      return NextResponse.json({ error: "Pertanyaan gak ketemu" }, { status: 404 });
    }
    const hasResponse = await db.response.findFirst({
      where: { 
        formId: question.formId 
      }
    });

    if (hasResponse) {
      return NextResponse.json(
        { error: "GAK BISA HAPUS! Form ini sudah ada pengisinya." }, 
        { status: 400 }
      );
    }
    await db.question.delete({ 
      where: { id } 
    });
    return NextResponse.json({ message: "Berhasil dihapus" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json({ error: "Gagal hapus" }, { status: 500 });
  }
}