'use server';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export default async function createTime(formData: FormData) {
  console.log(formData);
  const userId = formData.get('userId') as string;
  if (!userId) {
    throw new Error('userId is required');
  }
  const type = 'time';
  const name = formData.get('name') as string;
  const goal = formData.get('goal') as string;
  const reportType = formData.get('reportType') as string;

  await prisma.streaks.create({
    data: {
      name: name,
      goal: goal,
      type: type,
      userId: userId,
      totalCount: null,
      unit: null, // this is a string input
      totalQuantity: null,
      totalTime: 0, // In seconds
      reportType: reportType, // option for user imputation eventually enum
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
export async function UpdateNewTime(formData: FormData) {
  try {
    const streakId = formData.get('streakId') as string;
    const newEntryInSeconds = Number(formData.get('newEntryInSeconds'));

    const streak = await prisma.streaks.findUnique({
      where: { id: streakId },
      select: {
        lastChecked: true,
        streakCount: true,
        totalInputs: true,
        totalTime: true,
      },
    });

    if (!streak) {
      throw new Error('Streak not found');
    }

    const currentTime = new Date();
    const lastCheckedTime = streak.lastChecked
      ? new Date(streak.lastChecked)
      : null;
    let updatedStreakCount = streak.streakCount;

    if (lastCheckedTime) {
      const timeDiffHours =
        (currentTime.getTime() - lastCheckedTime.getTime()) / (1000 * 60 * 60);
      if (timeDiffHours >= 24 && timeDiffHours <= 48) {
        updatedStreakCount += 1;
      } else if (timeDiffHours > 48) {
        updatedStreakCount = 0;
      }
    }

    const updatedTotalInputs = streak.totalInputs ? streak.totalInputs + 1 : 1;
    const updatedTotalTime = streak.totalTime
      ? streak.totalTime + newEntryInSeconds
      : newEntryInSeconds;

    const result = await prisma.streaks.update({
      where: { id: streakId },
      data: {
        totalTime: updatedTotalTime,
        totalInputs: updatedTotalInputs,
        streakCount: updatedStreakCount,
        lastChecked: currentTime,
      },
    });

    revalidatePath('/');
    return {
      averageTime: updatedTotalTime / updatedTotalInputs,
      streakCount: result.streakCount,
      totalInputs: updatedTotalInputs,
      totalTime: updatedTotalTime,
    };
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
