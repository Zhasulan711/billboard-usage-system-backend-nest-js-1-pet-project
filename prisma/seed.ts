import { PrismaClient } from "@prisma/client";
import addRoles from "./data/roles";
import addUsers from "./data/users";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding... 🌱");
  try {
    await addRoles(prisma);
    console.log("Roles seeding finished.");
    await addUsers(prisma);
    console.log("Users seeding finished.");
  } catch (e) {
    throw new Error(`Error while seeding data: ${e}`);
  }
  console.log("Seeding finished ✅");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
