'use server';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export default async function createQuantity(formData: FormData) {
  const userId = formData.get('userId') as string;
  if (!userId) {
    throw new Error('userId is required');
  }
  const type = 'quantity';
  const name = formData.get('name') as string;
  const goal = formData.get('goal') as string;
  const unit = formData.get('unit') as string;

  await prisma.streaks.create({
    data: {
      name: name,
      goal: goal,
      type: type,
      userId: userId,
      totalCount: null,
      unit: unit, // unit of quanity
      totalQuantity: 0, // totalquantity
      totalTime: null,
      reportType: null,
      totalInputs: 0, //total number of inputs
    },
  });
  revalidatePath('/');
}

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
export async function UpdateNewQuantity(formData: FormData) {
  try {
    console.log(
      '--------------------------------------------------------------------',
    );
    console.log(
      '--------------------------------------------------------------------',
    );
    console.log('Form submitted', formData);
    const currentTime = new Date();
    let updatedStreakCount = 0;

    // Fetch the current streak details
    const streak = await prisma.streaks.findUnique({
      where: { id: formData.get('id') as string },
      select: {
        lastChecked: true,
        streakCount: true,
        totalInputs: true,
      },
    });
    console.log('streak details', streak);
    if (!streak) {
      throw new Error('Streak not found');
    }

    // Set lastChecked to current time if it's null
    const lastCheckedTime = streak.lastChecked
      ? new Date(streak.lastChecked)
      : currentTime;

    if (!streak.lastChecked) {
      await prisma.streaks.update({
        where: { id: formData.get('id') as string },
        data: { lastChecked: currentTime },
      });
      console.log('Initial lastChecked date set to current date.');
    }

    // Calculate the time difference in hours
    const timeDiffHours =
      (currentTime.getTime() - lastCheckedTime.getTime()) / (1000 * 60 * 60);

    // Update streak count based on time difference
    if (timeDiffHours < 24) {
      updatedStreakCount = streak.streakCount;
      console.log("Update ignored: It's too early to update this streak.");
    } else if (timeDiffHours >= 24 && timeDiffHours <= 48) {
      updatedStreakCount = streak.streakCount + 1;
    } else if (timeDiffHours > 48) {
      updatedStreakCount = 0;
      console.log(
        'Streak reset to 0 as it exceeded the 48-hour update window.',
      );
    }

    const totalCount = Number(formData.get('totalCount'));

    // Update the total count and streak count in the database
    const result = await prisma.streaks.update({
      where: { id: formData.get('id') as string },
      data: {
        totalCount: totalCount,
        streakCount: updatedStreakCount,
        lastChecked: currentTime,
      },
    });
    console.log('Streak updated successfully:', result);
    revalidatePath('/');

    // Return updated values for use in the component
    return { totalCount: totalCount, streakCount: updatedStreakCount };
  } catch (error) {
    console.error('Error updating streak:', error);
    throw error;
  }
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
