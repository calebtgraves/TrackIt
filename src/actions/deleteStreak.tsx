'use server';
import prisma from '@/lib/db';

export async function deleteStreak(id: string) {
  try {
    if (!id) {
      throw new Error('id is required');
    }
    await prisma.streaks.delete({
      where: {
        id: id,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}
