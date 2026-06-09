import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await prisma.user.findFirst({
      where: { id, role: "freelancer" },
      select: {
        id: true,
        name: true,
        avatar: true,
        freelancerProfile: true,
      },
    });
    if (!user?.freelancerProfile) {
      return NextResponse.json({ error: "Freelancer not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch freelancer" }, { status: 500 });
  }
}
