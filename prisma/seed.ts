import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash("password123", 10);

  const client = await prisma.user.upsert({
    where: { email: "client@example.com" },
    update: {},
    create: {
      email: "client@example.com",
      password: hashed,
      name: "Demo Client",
      role: "client",
    },
  });

  const cameraman = await prisma.user.upsert({
    where: { email: "cameraman@example.com" },
    update: {},
    create: {
      email: "cameraman@example.com",
      password: hashed,
      name: "Rahul Singh",
      role: "freelancer",
    },
  });

  const editor = await prisma.user.upsert({
    where: { email: "editor@example.com" },
    update: {},
    create: {
      email: "editor@example.com",
      password: hashed,
      name: "Priya Nair",
      role: "freelancer",
    },
  });

  await prisma.freelancerProfile.upsert({
    where: { userId: cameraman.id },
    update: {},
    create: {
      userId: cameraman.id,
      bio: "Professional wedding and event cinematographer with 8+ years of experience. I specialize in candid moments and cinematic storytelling. Available across Mumbai and Pune.",
      services: "cameraman",
      experience: "8 years",
      city: "Mumbai",
      hourlyRate: 2500,
      portfolioUrl: "https://vimeo.com/example",
      sampleWorkUrl: "https://youtube.com/example",
      skills: "4K, Drone, Gimbal, Multi-cam",
      equipment: "Sony A7 III, DJI Ronin, Drone",
    },
  });

  await prisma.freelancerProfile.upsert({
    where: { userId: editor.id },
    update: {},
    create: {
      userId: editor.id,
      bio: "Video editor for ads, music videos, and corporate content. Fast turnaround and creative cuts. Let's make your footage shine.",
      services: "video_editor",
      experience: "5 years",
      city: "Bangalore",
      hourlyRate: 1800,
      portfolioUrl: "https://behance.net/example",
      skills: "Premiere Pro, DaVinci Resolve, After Effects",
      equipment: "Full editing suite, color grading",
    },
  });

  await prisma.booking.create({
    data: {
      clientId: client.id,
      freelancerId: cameraman.id,
      eventType: "Wedding",
      eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      message: "Outdoor wedding at Grand Hyatt. Need 2 cameras.",
      status: "pending",
    },
  });

  console.log("Seed done. Demo accounts (password: password123):");
  console.log("  client@example.com (client)");
  console.log("  cameraman@example.com (freelancer)");
  console.log("  editor@example.com (freelancer)");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
