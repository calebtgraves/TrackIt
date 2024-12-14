'use client';
import Share from '@/app/components/share';
import { useRouter } from 'next/navigation';
export default function StreakPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  if (!params.id) return router.push('/');
  return (
    <div className='h-screen'>
      <div className='relative mx-auto grid size-full w-full grid-rows-10 px-4 sm:w-full sm:px-4 md:w-3/4 md:px-6 lg:w-1/2 lg:px-8'>
        <button
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className='absolute left-5 top-5 rounded-lg bg-white px-2 text-3xl font-bold text-black'
          onClick={() => router.back()}
        >
          {'<'}
        </button>
        {/* Banner */}
        <Share streakId={params.id} />
      </div>
    </div>
  );
}
