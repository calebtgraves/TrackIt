'use client';
import createCheck from '@/actions/check';
import CreateBanner from '@/app/components/dashboard/CreateBanner';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
export default function CreateCheckPage() {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    router.push('/login');
  }
  const userId = session?.user?.id;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createCheck(formData);
    router.push('/create/planned');
  };
  return (
    <div className='flex h-full flex-col'>
      <CreateBanner
        src={'/check.svg'}
        color={'bg-green-500'}
        backgroundColor={'border-b-green-900 border-b-4'}
        text={'New Check It Streak'}
      />
      <form onSubmit={handleSubmit} className='mx-auto size-full text-black'>
        <div className='grid h-full grid-cols-2 grid-rows-4 gap-10 py-5'>
          {/* Holds the userId for the streak to record it*/}
          <input type='hidden' name='userId' value={userId} />
          <input type='hidden' name='type' value={'check'} />
          {/* Holds the name of the streak */}
          <div className='col-span-2 row-span-1 m-auto flex h-full w-11/12 flex-col'>
            <label htmlFor='name' className='text-3xl text-white'>
              Name your Streak
            </label>
            <input
              type='text'
              name='name'
              className='rounded-md py-5 text-3xl shadow-lg'
            />
          </div>

          <div className='col-span-2 row-span-2 m-auto flex h-full w-11/12 flex-col'>
            <label htmlFor='goal' className='text-3xl text-white'>
              Record your goal
            </label>
            <textarea
              name='goal'
              rows={10}
              cols={50}
              defaultValue={''}
              className='rounded-md text-3xl shadow-lg'
              style={{ resize: 'none' }}
            />
          </div>

          <div className='col-span-1 my-auto'>
            <button
              type='submit'
              className='ml-[5%] w-11/12 rounded-md border-b-[5px] border-r-4 border-b-[#95AFBA] border-r-[#95AFBA] bg-green-500 p-2 py-8 text-2xl'
            >
              Start Streak
            </button>
          </div>
          <div className='col-span-1 my-auto'>
            <button
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}
              className='mr-[5%] w-11/12 rounded-md border-b-[5px] border-r-4 border-b-[#95AFBA] border-r-[#95AFBA] bg-[#EF4444] p-2 py-8 text-2xl'
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
