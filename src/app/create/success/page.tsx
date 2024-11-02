'use client';
import Image from 'next/image';
import { useEffect } from 'react';
//we need this for the component to get streak data then a redirect
// type Props = {
//   count: number;
// };

export default function SuccessPage() {
  const count = 0;
  // redirect to dashboard after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/';
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className='grid h-full min-h-screen grid-rows-4'>
      <div className='row-span-1 flex h-full flex-col items-center justify-center rounded-b-xl border-b-4 border-b-green-900 bg-green-500'>
        <h1 className='pb-4 text-6xl'>Congratulations,</h1>
        <h2 className='text-3xl'> You Tracked It! </h2>
      </div>

      <div className='row-span-3 my-auto flex h-full flex-col items-center bg-white pt-10'>
        <h1 className='w-1/3 text-center text-5xl text-black'>
          Your New Streak Is
        </h1>
        <div className='relative my-5 flex flex-row items-center justify-center rounded-xl border-4 border-black p-2'>
          <Image
            src={'/streakFire.svg'}
            width={100}
            height={100}
            alt='logo'
            className='m-auto'
          />
          <h2 className='absolute pt-5 text-center text-4xl text-black'>
            {count}
          </h2>
        </div>
        <h4 className='w-11/12 text-center text-3xl text-black'>
          Check In Tomorrow To Keep Your Streak Alive!
        </h4>
      </div>
    </div>
  );
}
