'use client';

import { useEffect, useState, useRef } from 'react';
import Banner from './banner';
import { Streak } from '@/lib/types';
import Image from 'next/image';
import UpdateTime from './main/updateTimeForm';

export default function Main() {
  const [page, setPage] = useState<boolean>(true);
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [expandedStreakId, setExpandedStreakId] = useState<string | null>(null);

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
        const response = await fetch('/api/streaks');
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

  return page ? (
    <div className='mx-auto w-full md:w-3/4 lg:w-1/2'>
      {/* Banner */}
      <Banner />
      <h1 className='mb-3 text-center'>Streak section</h1>
      {streaks.map((streak: Streak) => (
        <div
          key={streak.id}
          className='mb-5 flex w-full flex-col items-center justify-center px-[5%]'
        >
          <div className='mx-auto w-11/12 flex-col items-center justify-center rounded-xl bg-white shadow-lg'>
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
      <button onClick={handler}>+</button>
    </div>
  ) : (
    <div className='w-full'>
      <h1 className='text-center'>The unmapped app appears here</h1>
      <button onClick={handler}>Unmap</button>
    </div>
  );
}
