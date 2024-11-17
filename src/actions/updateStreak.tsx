'use server';
import prisma from '@/lib/db';

interface updateStreakFormData {
  name: string;
  goal: string;
}

export async function updateStreak(id: string, data: updateStreakFormData) {
  try {
    if (!id) {
      throw new Error('id is required');
    }
    const name = data.name;
    const goal = data.goal;
    await prisma.streaks.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        goal: goal,
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
}
