'use client';
export default function Error() {
  return (
    <div className='h-screen'>
      <div className='relative mx-auto grid size-full grid-rows-10 px-4 sm:w-full sm:px-4 md:w-3/4 md:px-6 lg:w-1/2 lg:px-8'>
        {/* Banner */}

        {/* Content */}
        <div className='row-span-9 mx-auto my-5 size-full rounded-lg bg-white p-5 shadow-lg'>
          <div className='flex h-full flex-col items-center justify-center text-lg'>
            <h1 className='mb-2 text-center text-3xl font-bold text-black'>
              OH NO!
            </h1>

            <div className='relative mx-auto mb-6 flex size-40 items-center justify-center rounded-full bg-gradient-to-br from-purple-300 to-purple-400'>
              <div className='absolute size-0 translate-y-[-10px] border-x-[20px] border-b-[35px] border-x-transparent border-b-purple-800'></div>
              <span className='absolute bottom-3 text-xl font-bold text-white'>
                404
              </span>
            </div>

            <p className='mb-2 text-center text-black'>
              Streak Not Found on this route or it was recently deleted!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
