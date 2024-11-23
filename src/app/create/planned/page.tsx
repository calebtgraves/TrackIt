'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
//we need this for the component to get streak data then a redirect
// type Props = {
//   count: number;
// };

export default function SuccessPage() {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    router.push('/login');
  }

  const count = 0;
  //   redirect to dashboard after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/';
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className='grid h-full min-h-screen grid-rows-4'>
      <div className='row-span-1 flex h-full flex-col items-center justify-center rounded-b-xl border-b-4 border-b-purple-900 bg-purple-700'>
        <h1 className='pb-4 text-6xl'>Congratulations,</h1>
        <h2 className='text-3xl'> You Planned a Streak! </h2>
      </div>

      <div className='row-span-3 my-auto flex h-full flex-col items-center bg-white pt-10'>
        <h1 className='w-2/3 text-center text-5xl text-black'>
          In order to make your fire grow...
        </h1>
        <div className='relative mb-2 mt-10 flex flex-row items-center justify-center rounded-xl border-4 border-black p-2'>
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
        <h4 className='w-11/12 text-center font-title text-5xl text-black'>
          Track It
        </h4>
      </div>
    </div>
  );
}
