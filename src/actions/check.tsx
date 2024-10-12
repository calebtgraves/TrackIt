'use server';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export default async function create(formData: FormData) {
  const userId = '1';
  if (!userId) {
    throw new Error('userId is required');
  }
  const type = 'check';
  const name = formData.get('name') as string;
  const goal = formData.get('goal') as string;

  await prisma.streaks.create({
    data: {
      name: name,
      goal: goal,
      type: type,
      userId: userId,
      totalCount: null,
      unit: null,
      totalQuantity: null,
      totalTime: null,
      reportType: null,
      totalInputs: 0, //total number of inputs
    },
  });
  revalidatePath('/');
}

// only update the goal and name
export async function updateInfo(id: string, formData: FormData) {
  try {
    if (!id) {
      throw new Error('id is required');
    }
    const name = formData.get('name') as string;
    const goal = formData.get('goal') as string;
    await prisma.streaks.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        goal: goal,
      },
    });
    revalidatePath('/');
  } catch (error) {
    console.log(error);
    return error;
  }
}

//  update the streak
export async function update(id: string, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const goal = formData.get('goal') as string;
    const streak = Number(formData.get('streak'));

    const verify = await prisma.streaks.findUnique({
      where: { id },
      select: {
        streak: true,
        lastChecked: true,
        totalInputs: true,
      },
    });

    if (!verify) {
      throw new Error('Streak not found');
    }
    const totalInputs = Number(verify?.totalInputs) + 1;

    // Get the current date and the date from lastChecked (if it exists)
    const currentDate = new Date();
    const lastCheckedDate = verify.lastChecked
      ? new Date(verify.lastChecked)
      : null;

    // Check if the lastChecked date is different from the current date
    const isNewDay = lastCheckedDate
      ? currentDate.toDateString() !== lastCheckedDate.toDateString()
      : true;

    // Allow increment if it's a new day or if the streak is being maintained
    if (!isNewDay && streak < verify.streak) {
      throw new Error('Streak cannot be decreased');
    }

    // Update the streak and the lastChecked date
    const updatedStreak = isNewDay ? streak + 1 : streak;

    await prisma.streaks.update({
      where: { id },
      data: {
        name,
        goal,
        streak: updatedStreak,
        lastChecked: currentDate,
        totalInputs: totalInputs, //increment total number of inputs for each update
      },
    });

    revalidatePath('/'); // Adjust the path if necessary
  } catch (error) {
    console.error(error);
    return error;
  }
}

// eliminate a streak requires user and id
export async function deleteStreak(userId: string, formData: FormData) {
  try {
    if (!userId) {
      throw new Error('userId is required');
    }
    const id = formData.get('id') as string;
    if (!id) {
      throw new Error('id is required');
    }
    await prisma.streaks.delete({
      where: {
        id: id,
        userId: userId,
      },
    });
    revalidatePath('/');
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}
