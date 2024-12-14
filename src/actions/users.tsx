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

export async function updateUser(id: string, email: string, name: string) {
  try {
    await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserPassword(id: string, password: string) {
  try {
    await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        password: password,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(id: string) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
}
