/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin", 10);

  await prisma.user.create({
    data: {
      id: "1",
      name: "admin",
      email: "admin@admin.com",
      password: hashedPassword, 
      role: "admin",
      contentPreferences: null,
    },
  });

  console.log("Admin user created with ID 1");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });