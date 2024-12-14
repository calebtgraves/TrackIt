'use server';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const streaks = await prisma.streaks.findUnique({
      where: { id: params.id },
    });

    return NextResponse.json(streaks, { status: 200 });
  } catch (error) {
    console.error('Error getting streaks:', error);
    return NextResponse.json({ error: 'Error getting streaks' });
  }
}
