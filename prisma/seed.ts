/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      id: "1",
      name: "admin",
      email: "admin@admin.com",
      password: "admin", 
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