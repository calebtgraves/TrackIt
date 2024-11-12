'use client';

import { useEffect, useState, useRef } from 'react';
import Banner from './banner';
import { Streak } from '@/lib/types';
import Image from 'next/image';
import UpdateTime from './main/updateTimeForm';
import Link from 'next/link';

export default function Main() {
  const [page, setPage] = useState<boolean>(true);
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [expandedStreakId, setExpandedStreakId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<string[]>([]);

  const filteredStreaks = streaks.filter(
    (streak) =>
      streak.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.length === 0 || filters.includes(streak.type)),
  );

  const handleFormSubmit = () => {
    if (formRef.current) {
      formRef.current.submit(); // Programmatically submit the form
    }
  };

  const toggleExpand = (streakId: string) => {
    if (expandedStreakId === streakId) {
      setExpandedStreakId(null); // Collapse if already expanded
    } else {
      setExpandedStreakId(streakId); // Expand if not expanded
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/streaks`);
        const data = await response.json();
        console.log(data);
        setStreaks(data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, [page]);

  const handler = () => {
    setPage(!page);
  };

  function getColorByType(type: string) {
    switch (type) {
      case 'count':
        return 'bg-[#3B82F6]';
      case 'time':
        return 'bg-[#C084FC]';
      case 'quantity':
        return 'bg-[#EF4444]';
      default:
        return 'bg-[#22C55E]';
    }
  }

  function toggleFilter(filter: string) {
    if (filters.includes(filter)) {
      setFilters((prev) => prev.filter((f) => f !== filter));
    } else {
      setFilters((prev) => [...prev, filter]);
    }
  }

  return page ? (
    <div className='mx-auto min-h-full w-full md:w-3/4 lg:w-1/2'>
      {/* Banner */}
      <Banner />
      <div className='mx-auto w-11/12'>
        <input
          type='text'
          placeholder='Search for a streak'
          className='w-full rounded-lg border border-gray-300 p-2 text-black'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div
          id='filters'
          className='mb-10 mt-5 flex flex-row items-center justify-around gap-4'
        >
          <button
            className={`rounded-lg p-2 ${filters.includes('check') ? 'bg-[#22C55E]' : 'bg-gray-300'}`}
            onClick={() => {
              toggleFilter('check');
            }}
          >
            <Image
              src={'/check.svg'}
              alt={'check'}
              width={25}
              height={25}
              className='mx-auto'
            />
          </button>
          <button
            className={`rounded-lg p-2 ${filters.includes('count') ? 'bg-[#3B82F6]' : 'bg-gray-300'}`}
            onClick={() => {
              toggleFilter('count');
            }}
          >
            <Image
              src={'/count.svg'}
              alt={'count'}
              width={25}
              height={25}
              className='mx-auto'
            />
          </button>
          <button
            className={`rounded-lg p-2 ${filters.includes('time') ? 'bg-[#C084FC]' : 'bg-gray-300'}`}
            onClick={() => {
              toggleFilter('time');
            }}
          >
            <Image
              src={'/time.svg'}
              alt={'time'}
              width={25}
              height={25}
              className='mx-auto'
            />
          </button>
          <button
            className={`rounded-lg p-2 ${filters.includes('quantity') ? 'bg-[#EF4444]' : 'bg-gray-300'}`}
            onClick={() => {
              toggleFilter('quantity');
            }}
          >
            <Image
              src={'/quantity.svg'}
              alt={'quantity'}
              width={25}
              height={25}
              className='mx-auto'
            />
          </button>
          <button
            className={`rounded-lg p-2 ${filters.length > 0 || searchTerm.length > 0 ? 'bg-[#FBBF24]' : 'bg-gray-300'}`}
            onClick={() => {
              setFilters([]);
              setSearchTerm('');
            }}
          >
            <Image
              src={'/x.svg'}
              alt={'clear filters'}
              width={25}
              height={25}
              className='mx-auto'
            />
          </button>
        </div>
      </div>
      {filteredStreaks.map((streak: Streak) => (
        <div
          key={streak.id}
          className='mb-5 flex w-full flex-col items-center justify-center px-[5%]'
        >
          <div className='mx-auto w-11/12 flex-col items-center justify-center rounded-xl bg-white'>
            {/*This is the image that shows the streak type*/}
            <div
              className={`mx-auto flex items-center justify-center ${expandedStreakId === streak.id ? `rounded-t-lg ${getColorByType(streak.type)}` : ''} `}
              onClick={() => toggleExpand(streak.id)}
            >
              <div
                className={`lg:[10em] h-full w-[5em] rounded-l-lg md:w-[8em] ${getColorByType(streak.type)}`}
              >
                <div className='my-auto flex size-full min-h-[5em] items-center justify-center'>
                  <Image
                    src={`/${streak.type}.svg`}
                    alt={streak.type}
                    width={50}
                    height={50}
                    className='mx-auto'
                  />
                </div>
              </div>
              {/*This is the streak name*/}
              <div className='mx-auto'>
                <h2 className='text-center text-black'>{streak.name}</h2>
              </div>

              {/*This is the streak count within the fire image*/}
              <div className='lg:[10em] w-[5em] md:w-[8em]'>
                <div className='relative size-[50px]'>
                  <Image
                    src={`/streakFire.svg`}
                    alt={'streak fire'}
                    width={50}
                    height={50}
                    className='relative'
                  />
                  <p className='absolute inset-1 flex items-center justify-center text-black'>
                    {streak.streakCount}
                  </p>
                </div>
              </div>
            </div>
            {expandedStreakId === streak.id && (
              <div className='mt-2 rounded-lg p-4 text-black shadow'>
                <div className='flex flex-col items-center justify-center'>
                  <h2 className='text-center text-2xl font-semibold'>Goal:</h2>
                  <p className='my-4'>{streak.goal}</p>
                  {/*This is the streak type and the form to update it*/}
                  {streak.type === 'time' && (
                    <UpdateTime
                      streakId={streak.id}
                      totalTime={streak.totalTime}
                      reportType={streak.reportType}
                      totalInputs={streak.totalInputs}
                      lastChecked={streak.lastChecked}
                      formRef={formRef} // Pass the form ref down to UpdateTime
                    />
                  )}
                  {streak.type === 'count' && <h4>Total</h4>}
                  {streak.type === 'quantity' && <h4>Total</h4>}
                  {streak.type === 'check' && <h4>checkbox</h4>}
                  <div className='mt-2 flex flex-row items-center justify-center gap-4'>
                    <button onClick={handleFormSubmit}>
                      <Image
                        src={'/trackit.svg'}
                        alt={'trackit'}
                        width={165}
                        height={165}
                        className='mx-auto'
                      />
                    </button>
                    <button>
                      <Image
                        src={'/edit.svg'}
                        alt={'edit'}
                        width={50}
                        height={50}
                        className='mx-auto'
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <button
        className='absolute bottom-4 right-4 rounded-full bg-green-500'
        onClick={handler}
      >
        <Image
          src={'/plus.svg'}
          alt={'plus'}
          width={50}
          height={50}
          className='mx-auto'
        />
      </button>
    </div>
  ) : (
    <div className='mx-auto mt-5 size-full w-11/12 max-w-screen-md flex-col items-center justify-center rounded bg-white px-2 py-8 shadow-md'>
      <h1 className='text-center font-title text-4xl text-black'>Select One</h1>
      <div className='mx-auto my-5 grid min-h-full w-11/12 grid-rows-4 gap-5'>
        <div className='mx-auto w-11/12 cursor-pointer rounded-xl bg-[#22C55E]'>
          <Link href={'/create/check'} className='w-full'>
            <div className='mx-auto flex w-11/12 flex-row items-center justify-between rounded-xl py-4'>
              <div className='w-1/6'>
                <Image
                  src={'/check.svg'}
                  alt={'check'}
                  width={50}
                  height={50}
                />
              </div>
              <div className='w-5/6'>
                <h1 className='text-center font-title text-4xl text-black'>
                  Check It
                </h1>
              </div>
            </div>
          </Link>
        </div>
        <div className='mx-auto flex w-11/12 cursor-pointer flex-row items-center justify-between rounded-xl bg-[#3B82F6]'>
          <Link href={'/create/count'} className='w-full'>
            <div className='mx-auto flex w-11/12 flex-row items-center justify-between rounded-xl py-4'>
              <div className='w-1/6'>
                <Image
                  src={'/count.svg'}
                  alt={'check'}
                  width={50}
                  height={50}
                />
              </div>
              <div className='w-5/6'>
                <h1 className='text-center font-title text-4xl text-black'>
                  Count It
                </h1>
              </div>
            </div>
          </Link>
        </div>
        <div className='mx-auto flex w-11/12 cursor-pointer flex-row items-center justify-between rounded-xl bg-[#C084FC]'>
          <Link href={'/create/time'} className='w-full'>
            <div className='mx-auto flex w-11/12 flex-row items-center justify-between rounded-xl py-4'>
              <div className='w-1/6'>
                <Image src={'/time.svg'} alt={'time'} width={50} height={50} />
              </div>
              <div className='w-5/6'>
                <h1 className='text-center font-title text-4xl text-black'>
                  Time It
                </h1>
              </div>
            </div>
          </Link>
        </div>
        <div className='mx-auto flex w-11/12 cursor-pointer flex-row items-center justify-between rounded-xl bg-[#EF4444]'>
          <Link href={'/create/quantity'} className='w-full'>
            <div className='mx-auto flex w-11/12 flex-row items-center justify-between rounded-xl py-4'>
              <div className='w-1/6'>
                <Image
                  src={'/quantity.svg'}
                  alt={'check'}
                  width={50}
                  height={50}
                />
              </div>
              <div className='w-5/6'>
                <h1 className='text-center font-title text-4xl text-black'>
                  Weigh It
                </h1>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <button
        className='absolute bottom-4 right-4 rounded-full bg-red-500'
        onClick={handler}
      >
        <Image
          src={'/x.svg'}
          alt={'plus'}
          width={50}
          height={50}
          className='mx-auto'
        />
      </button>
    </div>
  );
}
