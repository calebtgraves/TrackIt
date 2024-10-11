'use server';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
// we might not need this endpoint.
// this endpoint is used to get all the user information by id.
export async function GET() {
  const userId = '1';
  const streaks = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  return NextResponse.json(streaks);
}
//------------------------------------------------
//------------------------------------------------
//How to use this endpoint

// useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('/api/getData');
//       const data = await response.json();
//       console.log(data);
//     };

//     fetchData();
//   }, []);
