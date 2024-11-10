'use server';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export default async function createCheck(formData: FormData) {
  console.log(formData);
  const userId = formData.get('userId') as string;
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
export async function UpdateNewCheck(formData: FormData) {
  try {
    console.log('Form submitted', formData);
    const currentTime = new Date();

    // Fetch the current streak details
    const streak = await prisma.streaks.findUnique({
      where: { id: formData.get('id') as string },
      select: {
        lastChecked: true,
        streakCount: true,
      },
    });
    if (!streak) {
      throw new Error('Streak not found');
    }

    const lastCheckedTime = streak.lastChecked
      ? new Date(streak.lastChecked)
      : null;
    const timeDiffHours = lastCheckedTime
      ? (currentTime.getTime() - lastCheckedTime.getTime()) / (1000 * 60 * 60)
      : 0;

    let updatedStreakCount = streak.streakCount;

    if (timeDiffHours >= 24) {
      updatedStreakCount = streak.streakCount + 1;

      const result = await prisma.streaks.update({
        where: { id: formData.get('id') as string },
        data: {
          streakCount: updatedStreakCount,
          lastChecked: currentTime,
        },
      });
      console.log('Streak updated successfully:', result);
      revalidatePath('/');

      return { streakCount: updatedStreakCount };
    } else {
      console.log("It's too early to update this streak.");
      return null;
    }
  } catch (error) {
    console.error('Error updating streak:', error);
    throw error;
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
