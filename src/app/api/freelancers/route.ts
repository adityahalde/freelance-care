import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const service = searchParams.get("service"); // cameraman | video_editor | both
    const city = searchParams.get("city");

    const freelancers = await prisma.user.findMany({
      where: {
        role: "freelancer",
        freelancerProfile: { isNot: null },
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        freelancerProfile: true,
      },
    });

    let result = freelancers;

    if (service) {
      result = result.filter(
        (u) => u.freelancerProfile?.services === service
      );
    }
    if (city) {
      const lower = city.toLowerCase();
      result = result.filter(
        (u) => u.freelancerProfile?.city?.toLowerCase().includes(lower)
      );
    }

    return NextResponse.json(result);
  } catch (e) {
    console.error("Freelancers API error:", e);
    return NextResponse.json({ error: "Failed to fetch freelancers", details: String(e) }, { status: 500 });
  }
}
