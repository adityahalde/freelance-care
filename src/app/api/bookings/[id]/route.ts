import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

const schema = z.object({
  status: z.enum(["accepted", "rejected", "completed"]),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  const isFreelancer = booking.freelancerId === user.id;
  const isClient = booking.clientId === user.id;
  if (!isFreelancer && !isClient) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (parsed.data.status === "completed" && !isFreelancer) {
    return NextResponse.json({ error: "Only freelancer can mark as completed" }, { status: 403 });
  }
  if (["accepted", "rejected"].includes(parsed.data.status) && !isFreelancer) {
    return NextResponse.json({ error: "Only freelancer can accept/reject" }, { status: 403 });
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: { status: parsed.data.status },
    include: {
      client: { select: { name: true, email: true } },
      freelancer: { select: { name: true } },
    },
  });
  return NextResponse.json({ booking: updated });
}
