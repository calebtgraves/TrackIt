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
    where: { id: '1' }, // Unique 'where' clause for streak 1
    update: {},
    create: {
      id: '1',
      name: 'Check',
      goal: 'Daily Plow the field for 25 minutes',
      type: 'check',
      userId: '1',
      totalCount: null,
      unit: null,
      totalQuantity: null,
      totalTime: null,
      reportType: null,
      lastChecked: new Date(),
      totalInputs: 0,
    },
  });

  await prisma.streaks.upsert({
    where: { id: '2' }, // Unique 'where' clause for streak 2
    update: {},
    create: {
      id: '2',
      name: 'Time',
      goal: 'Plow the field in under 25 minutes each day',
      type: 'time',
      userId: '1',
      totalCount: null,
      unit: null,
      totalQuantity: null,
      totalTime: 1407,
      reportType: 'HH:MM:SS',
      totalInputs: 1,
    },
  });

  await prisma.streaks.upsert({
    where: { id: '3' }, // Unique 'where' clause for streak 3
    update: {},
    create: {
      id: '3',
      name: 'Count',
      goal: 'Track how many calves are born each day',
      type: 'count',
      userId: '1',
      totalCount: 13,
      unit: 'calves',
      totalQuantity: null,
      totalTime: null,
      reportType: null,
      totalInputs: 1,
    },
  });

  await prisma.streaks.upsert({
    where: { id: '4' }, // Unique 'where' clause for streak 4
    update: {},
    create: {
      id: '4',
      name: 'Quantity',
      goal: 'Drink 72 oz of water a day',
      type: 'quantity',
      userId: '1',
      totalCount: null,
      unit: 'oz',
      totalQuantity: 1220202,
      totalTime: null,
      reportType: null,
      totalInputs: 5,
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
