'use server';
import { NextResponse } from 'next/server';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';
import { PrismaClient } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const skip = parseInt(searchParams.get('skip') || '0');
    const take = parseInt(searchParams.get('take') || '5'); // Fetch 5 by default

    const neon = new Pool({
      connectionString: process.env.POSTGRES_PRISMA_URL,
    });
    const adapter = new PrismaNeon(neon);
    const prisma = new PrismaClient({ adapter });

    const userId = '1'; // Assuming userId is static for now
    if (!userId) {
      return NextResponse.json({ error: 'User not found' });
    }

    const streaks = await prisma.streaks.findMany({
      where: { userId: userId },
      orderBy: { created: 'desc' },
      skip,
      take,
    });

    return NextResponse.json(streaks, { status: 200 });
  } catch (error) {
    console.error('Error getting streaks:', error);
    return NextResponse.json({ error: 'Error getting streaks' });
  }
}
