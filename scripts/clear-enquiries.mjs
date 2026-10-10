import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
try {
  const before = await Promise.all([
    prisma.contactMessage.count(),
    prisma.moUApplication.count(),
    prisma.consultationRequest.count(),
  ]);
  const [general, college, corporate] = await prisma.$transaction([
    prisma.contactMessage.deleteMany(),
    prisma.moUApplication.deleteMany(),
    prisma.consultationRequest.deleteMany(),
  ]);
  console.log(JSON.stringify({
    before: { general: before[0], college: before[1], corporate: before[2] },
    deleted: { general: general.count, college: college.count, corporate: corporate.count },
  }));
} finally {
  await prisma.$disconnect();
}
