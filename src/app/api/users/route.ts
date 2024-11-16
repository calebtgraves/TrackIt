'use server';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@/auth';
// we might not need this endpoint.
// this endpoint is used to get all the user information by id.
export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;
  // dont include the password in the response
  const users = await prisma.users.findMany({
    where: {
      id: userId,
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
