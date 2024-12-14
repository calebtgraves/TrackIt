'use server';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const users = await prisma.users.findUnique({
      where: { id: params.id },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error getting streaks:', error);
    return NextResponse.json({ error: 'Error getting streaks' });
  }
}
