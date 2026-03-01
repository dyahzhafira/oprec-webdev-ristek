import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
const hasSubmissions = await db.response.findFirst({
  where: { formId: params.formId }
});

if (hasSubmissions) {
  return NextResponse.json(
    { error: "Cannot modify questions because this form already has submissions" },
    { status: 400 }
  );
}
}