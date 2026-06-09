import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

const createSchema = z.object({
  freelancerId: z.string(),
  eventType: z.string().min(1),
  eventDate: z.string().min(1),
  message: z.string().optional(),
});

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const asClient = await prisma.booking.findMany({
      where: { clientId: user.id },
      include: {
        freelancer: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    
    const asFreelancer = await prisma.booking.findMany({
      where: { freelancerId: user.id },
      include: {
        client: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      asClient,
      asFreelancer,
    });
  } catch (e) {
    console.error("Bookings GET error:", e);
    return NextResponse.json({ error: "Failed to fetch bookings", details: String(e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const { freelancerId, eventType, eventDate, message } = parsed.data;
    const date = new Date(eventDate);

    const freelancer = await prisma.user.findFirst({
      where: { id: freelancerId, role: "freelancer" },
      include: { freelancerProfile: true },
    });
    if (!freelancer?.freelancerProfile) {
      return NextResponse.json({ error: "Freelancer not found" }, { status: 404 });
    }

    const booking = await prisma.booking.create({
      data: {
        clientId: user.id,
        freelancerId,
        eventType,
        eventDate: date,
        message: message || null,
      },
      include: {
        freelancer: { select: { name: true } },
      },
    });
    return NextResponse.json({ booking });
  } catch (e) {
    console.error("Bookings POST error:", e);
    return NextResponse.json({ error: "Failed to create booking", details: String(e) }, { status: 500 });
  }
}
