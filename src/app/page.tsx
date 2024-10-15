'use server';

import Main from './components/main';
import Nav from './components/nav';

export default async function Home() {
  return (
    <div>
      {/* Navbar/header */}
      <Nav />
      {/* page Content */}
      <Main />
    </div>
  );
}
