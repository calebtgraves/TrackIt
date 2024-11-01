'use client';
import CreateBanner from '@/app/components/dashboard/CreateBanner';
import createTime from '@/actions/time';
import { useRouter } from 'next/navigation';

export default function CreateTimePage() {
  const userId = '1';
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createTime(formData);
    router.push('/create/planned');
  };
  return (
    <div className='flex h-full flex-col'>
      <CreateBanner
        src={'/time.svg'}
        color={'bg-[#C084FC]'}
        backgroundColor={'border-b-purple-900 border-b-4'}
        text={'New Time It Streak'}
      />
      <form onSubmit={handleSubmit} className='mx-auto size-full'>
        <div className='grid h-full grid-cols-2 grid-rows-5 gap-10 py-5'>
          {/* Holds the userId for the streak to record it*/}
          <input type='hidden' name='userId' value={userId} />
          <input type='hidden' name='type' value={'time'} />
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
              className='my-auto rounded-md text-3xl text-black shadow-lg'
              style={{ resize: 'none' }}
            />
          </div>

          <div className='col-span-2 row-span-1 m-auto flex w-11/12 flex-col'>
            <label htmlFor='reportType' className='text-3xl'>
              Report Time In
            </label>
            <select
              name='reportType'
              defaultValue={'default'}
              className='my-auto rounded-md p-5 text-3xl text-black shadow-lg'
            >
              <option value='default'>Select Unit</option>
              <option value='seconds'>Seconds - S</option>
              <option value='minutes'>Minutes - M:S </option>
              <option value='hours'>Hours - H:M:S </option>
              <option value='StartEndTime'>Range - H:M:S / H:M:S </option>
            </select>
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
