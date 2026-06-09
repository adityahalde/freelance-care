import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { createPasswordResetToken } from "@/lib/password_reset";

const forgotPasswordSchema = z.object({
  email: z.string().trim().email(),
});

export async function POST(request: Request) {
  const parsed = forgotPasswordSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const { email } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    const { token } = await createPasswordResetToken(user.id);
    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
    const resetUrl = `${origin}/reset-password?token=${token}`;

    return NextResponse.json({
      message: "If an account exists, we created a reset link for it.",
      resetUrl: process.env.NODE_ENV === "production" ? undefined : resetUrl,
    });
  }

  return NextResponse.json({
    message: "If an account exists, we created a reset link for it.",
  });
}
