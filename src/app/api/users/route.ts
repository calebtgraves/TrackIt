'use server';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';
// we might not need this endpoint.
// this endpoint is used to get all the user information by id.
export async function GET() {
  const neon = new Pool({
    connectionString: process.env.POSTGRES_PRISMA_URL,
  });
  const adapter = new PrismaNeon(neon);
  const prisma = new PrismaClient({ adapter });
  const id = '1';
  // dont include the password in the response
  const users = await prisma.users.findMany({
    where: {
      id: id,
    },
    select: {
      name: true,
      email: true,
      streaks: true,
    },
  });
  return NextResponse.json(users, { status: 200 });
}
//------------------------------------------------
