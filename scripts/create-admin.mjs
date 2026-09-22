// Creates (or updates the password for) an admin login.
// Usage:
//   node scripts/create-admin.mjs --email you@accent.com --password "Str0ngPass!" --name "Your Name"
// or set ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME env vars and run with no args.
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/admin/password.mjs";

function readArgs() {
  const out = {};
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      out[arg.slice(2)] = argv[i + 1];
      i += 1;
    }
  }
  return out;
}

async function main() {
  const args = readArgs();
  const email = (args.email || process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const password = args.password || process.env.ADMIN_PASSWORD || "";
  const name = args.name || process.env.ADMIN_NAME || "Admin";

  if (!email || !password) {
    console.error("Missing email or password. Pass --email/--password or set ADMIN_EMAIL/ADMIN_PASSWORD.");
    process.exit(1);
  }
  if (password.length < 10) {
    console.error("Password must be at least 10 characters.");
    process.exit(1);
  }

  const prisma = new PrismaClient();
  try {
    const passwordHash = await hashPassword(password);
    const admin = await prisma.adminUser.upsert({
      where: { email },
      create: { email, name, passwordHash },
      update: { name, passwordHash, isActive: true },
    });
    console.log(`Admin ready: ${admin.email} (${admin.name}). You can now sign in at /admin/login.`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Failed to create admin:", error);
  process.exit(1);
});