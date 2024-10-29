'use client';
import CreateBanner from '@/app/components/dashboard/CreateBanner';

export default function CreateQuantityPage() {
  const userId = '1';
  return (
    <div className='flex h-full flex-col'>
      <CreateBanner
        src={'/quantity.svg'}
        color={'bg-[#EF4444]'}
        backgroundColor={'border-b-red-900 border-b-4'}
        text={'New Weigh It Streak'}
      />
      <form className='mx-auto size-full'>
        <div className='grid h-full grid-cols-2 grid-rows-5 gap-10 py-5'>
          {/* Holds the userId for the streak to record it*/}
          <input type='hidden' name='userId' value={userId} />
          <input type='hidden' name='type' value={'quantity'} />
          {/* Holds the name of the streak */}
          <div className='col-span-2 row-span-1 m-auto flex w-11/12 flex-col'>
            <label htmlFor='name' className='text-3xl'>
              Name your Streak
            </label>
            <input
              type='text'
              name='name'
              className='rounded-md p-5 text-3xl text-black shadow-lg'
            />
          </div>

          <div className='col-span-2 row-span-1 m-auto flex w-11/12 flex-col'>
            <label htmlFor='unit' className='text-3xl'>
              Unit of Measurement
            </label>
            <input
              type='text'
              name='unit'
              className='rounded-md p-5 text-3xl text-black shadow-lg'
            />
          </div>

          <div className='col-span-2 row-span-2 m-auto flex w-11/12 flex-col'>
            <label htmlFor='goal' className='text-3xl'>
              Record your Goal
            </label>
            <textarea
              name='goal'
              rows={5}
              minLength={1}
              maxLength={64}
              defaultValue={''}
              className='my-auto rounded-md text-5xl text-black shadow-lg'
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
