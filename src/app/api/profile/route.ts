import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

const schema = z.object({
  bio: z.string().min(10),
  services: z.enum(["cameraman", "video_editor", "both"]),
  experience: z.string().min(1),
  city: z.string().min(1),
  hourlyRate: z.number().min(0).optional().nullable(),
  portfolioUrl: z.union([z.string().url(), z.literal(""), z.null()]).optional(),
  sampleWorkUrl: z.union([z.string().url(), z.literal(""), z.null()]).optional(),
  skills: z.string().optional().nullable(),
  equipment: z.string().optional().nullable(),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "freelancer") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  return NextResponse.json({ profile: user.freelancerProfile ?? null });
}

export async function PUT(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "freelancer") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const data = {
      ...parsed.data,
      portfolioUrl: parsed.data.portfolioUrl || null,
      sampleWorkUrl: parsed.data.sampleWorkUrl || null,
      skills: parsed.data.skills || null,
      equipment: parsed.data.equipment || null,
    };

    const profile = await prisma.freelancerProfile.upsert({
      where: { userId: user.id },
      create: { userId: user.id, ...data },
      update: data,
    });
    return NextResponse.json({ profile });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
  }
}
