import { PrismaClient, ROLES } from "@prisma/client";
const addRoles = async (prisma: PrismaClient) => {
  const roles: ROLES[] = ["user", "admin"];

  await Promise.allSettled(
    roles.map(async (role) => {
      try {
        await prisma.role.create({
          data: {
            name: role,
          },
        });
      } catch (e) {
        console.log(e);
      }
    })
  );
};

export default addRoles;
