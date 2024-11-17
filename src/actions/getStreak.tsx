'use server';

import prisma from '@/lib/db';

export async function getStreak(id: string) {
  try {
    if (!id) {
      throw new Error('id is required');
    }
    const streak = await prisma.streaks.findUnique({
      where: {
        id: id,
      },
    });
    return streak;
  } catch (error) {
    console.log(error);
    return error;
  }
}
