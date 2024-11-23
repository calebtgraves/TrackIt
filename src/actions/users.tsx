'use server';
import prisma from '@/lib/db';

export async function createUser(
  email: string,
  firstName: string,
  lastName: string,
  password: string,
) {
  console.log(email, firstName, lastName, password);
  try {
    await prisma.users.create({
      data: {
        name: firstName + ' ' + lastName,
        email: email,
        password: password,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
