'use server';

import { redirect } from 'next/navigation';
import Main from './components/main';
import Nav from './components/nav';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  if (!session) {
    return redirect('/login');
  }
  return (
    <div className='flex h-full flex-col'>
      {/* Navbar/header */}
      <Nav />
      {/* page Content */}
      <Main />
    </div>
  );
}
