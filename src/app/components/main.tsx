'use client';

import { useEffect, useState } from 'react';
import Banner from './banner';
import { Streak } from '@/lib/types';

export default function Main() {
  const [page, setPage] = useState<boolean>(true);
  const [streaks, setStreaks] = useState<Streak[]>([]);

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

  return page ? (
    <div className='w-full'>
      {/* Banner */}
      <Banner />
      <h1 className='text-center'>Streak</h1>
      {streaks.map((streak) => (
        <div key={streak.id} className='flex justify-center'>
          <p className='text-center'>{streak.streak}</p>
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
