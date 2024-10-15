import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.users.upsert({
    where: { email: '1@1.com' },
    update: {},
    create: {
      id: '1',
      name: 'Alice Active',
      email: 'test@test.com',
      password: 'password1',
      streaks: {
        create: [],
      },
    },
  });
  await prisma.streaks.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      name: 'Streak 1',
      goal: 'Goal 1',
      type: 'check',
      userId: '1',
      totalCount: null,
      unit: null,
      totalQuantity: null,
      totalTime: null,
      reportType: null,
      totalInputs: 0,
    },
  });
  await prisma.streaks.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '2',
      name: 'Streak 2',
      goal: 'Goal 2',
      type: 'check',
      userId: '2',
      totalCount: null,
      unit: null,
      totalQuantity: null,
      totalTime: null,
      reportType: null,
      totalInputs: 0,
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
