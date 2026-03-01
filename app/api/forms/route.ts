import { db } from "@/lib/prisma";
import { getUserIdFromToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) { 
  const userId = await getUserIdFromToken();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "desc";

  const forms = await db.form.findMany({
    where: { 
      userId,
      title: { contains: search},
    },
    orderBy: { createdAt: sort as "asc" | "desc" }
  });

  return NextResponse.json(forms || []);
}

export async function POST(req: Request) {
  const userId = await getUserIdFromToken();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title } = await req.json();
  const newForm = await db.form.create({
    data: {
      title,
      userId,
      status: "Draft",
    },
  });

  return NextResponse.json(newForm);
}