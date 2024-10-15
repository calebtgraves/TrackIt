'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <div className='relative flex w-full flex-row border-b-4 border-purple-900 bg-purple-500 p-4'>
        <div className='flex w-full flex-row items-center justify-center'>
          <h1 className='text-4xl tracking-wide text-white md:text-5xl lg:text-6xl'>
            Track It
          </h1>
        </div>
        <div className='absolute right-[2%] top-[5%] rounded-full border-4 border-purple-900 bg-violet-800 p-2 lg:top-[10%]'>
          <ul>
            <li>
              <Link href={'/settings'}>
                <Image
                  src={'/settings.svg'}
                  width={40}
                  height={40}
                  alt='logo'
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
