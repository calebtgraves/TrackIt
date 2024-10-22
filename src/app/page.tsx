'use server';

import Main from './components/main';
import Nav from './components/nav';

export default async function Home() {
  return (
    <div className='flex h-full flex-col'>
      {/* Navbar/header */}
      <Nav />
      {/* page Content */}
      <Main />
    </div>
  );
}
