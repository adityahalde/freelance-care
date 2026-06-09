import { NextResponse } from "next/server";
import { z } from "zod";
import { consumePasswordResetToken } from "@/lib/password_reset";

const resetPasswordSchema = z.object({
  token: z.string().trim().min(1),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  const parsed = resetPasswordSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please provide a valid reset token and a password with at least 8 characters." }, { status: 400 });
  }

  try {
    await consumePasswordResetToken(parsed.data.token, parsed.data.password);
    return NextResponse.json({ message: "Password updated successfully. You can sign in with your new password." });
  } catch {
    return NextResponse.json({ error: "This reset link is invalid or has expired." }, { status: 400 });
  }
}
