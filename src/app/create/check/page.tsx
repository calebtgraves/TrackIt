'use client';
import CreateBanner from '@/app/components/dashboard/CreateBanner';

export default function CreateCheckPage() {
  const userId = '1';
  return (
    <div className='flex h-full flex-col'>
      <CreateBanner
        src={'/check.svg'}
        color={'bg-green-500'}
        backgroundColor={'border-b-green-900 border-b-4'}
        text={'New Check It Streak'}
      />
      <form className='mx-auto size-full'>
        <div className='grid h-full grid-cols-2 grid-rows-4 gap-10 py-5'>
          {/* Holds the userId for the streak to record it*/}
          <input type='hidden' name='userId' value={userId} />
          <input type='hidden' name='type' value={'check'} />
          {/* Holds the name of the streak */}
          <div className='col-span-2 row-span-1 m-auto flex h-full w-11/12 flex-col'>
            <label htmlFor='name' className='text-3xl'>
              Name your Streak
            </label>
            <input
              type='text'
              name='check'
              className='rounded-md py-10 shadow-lg'
            />
          </div>

          <div className='col-span-2 row-span-2 m-auto flex h-full w-11/12 flex-col'>
            <label htmlFor='goal' className='text-3xl'>
              Record your goal
            </label>
            <textarea
              name='goal'
              rows={10}
              cols={50}
              defaultValue={''}
              className='rounded-md shadow-lg'
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
