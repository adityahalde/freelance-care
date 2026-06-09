import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "./db";

const RESET_TOKEN_TTL_MS = 1000 * 60 * 60;
const RESET_TOKEN_BYTES = 24;

export function generate_reset_token(): string {
  return crypto.randomBytes(RESET_TOKEN_BYTES).toString("hex");
}

export function hash_token(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function is_reset_token_expired(expiresInMs: number): boolean {
  return expiresInMs <= 0;
}

export async function createPasswordResetToken(userId: string) {
  const token = generate_reset_token();
  const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS);

  await prisma.passwordResetToken.create({
    data: {
      userId,
      tokenHash: hash_token(token),
      expiresAt,
    },
  });

  return { token, expiresAt };
}

export async function consumePasswordResetToken(token: string, newPassword: string) {
  const hashedToken = hash_token(token);
  const resetToken = await prisma.passwordResetToken.findFirst({
    where: {
      tokenHash: hashedToken,
      usedAt: null,
      expiresAt: { gt: new Date() },
    },
    include: { user: true },
  });

  if (!resetToken) {
    throw new Error("Invalid or expired reset token");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    }),
    prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { usedAt: new Date() },
    }),
  ]);

  return resetToken.user.email;
}
