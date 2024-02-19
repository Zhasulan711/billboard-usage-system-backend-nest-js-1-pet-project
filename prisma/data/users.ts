import { PrismaClient, User } from "@prisma/client";

const users: Omit<User, "id">[] = [
  {
    username: "alice",
    email: "alice@gmail.com",
    password: "123",
    roleId: 1,
  },
  {
    username: "bob",
    email: "bob@gmail.com",
    password: "qwe",
    roleId: 2,
  },
];

const addUsers = async (prisma: PrismaClient) => {
  await Promise.allSettled(
    users.map(async ({ email, password, username, roleId }) => {
      try {
        await prisma.user.create({
          data: {
            email,
            password,
            username,
            roleId,
          },
        });
      } catch (e) {
        console.log(e);
      }
    })
  );
};

export default addUsers;
