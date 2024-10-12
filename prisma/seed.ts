import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.users.upsert({
    where: { email: '1@1.com' },
    update: {},
    create: {
      name: 'test',
      email: 'test@test.com',
      password: 'password1',
      streaks: {
        create: [],
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
