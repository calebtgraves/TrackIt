'use client';
import { useEffect, useState } from 'react';

export default function Banner() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/users');
        const data = await response.json();
        console.log(data);
        setName(data[0].name);
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='mb-10 mt-5 flex w-full items-center justify-center px-[5%]'>
      {isLoading ? (
        <div className='my-auto flex h-40 w-full flex-col items-center justify-center rounded-3xl bg-white shadow-lg'>
          <h1 className='text-center text-5xl font-bold text-purple-900 sm:text-3xl md:text-4xl'>
            {' '}
            Loading...
          </h1>
        </div>
      ) : (
        <div className='my-auto flex h-40 w-full flex-col items-center justify-center rounded-3xl bg-white shadow-lg'>
          <h1 className='text-center text-5xl font-bold text-purple-900 sm:text-3xl md:text-4xl'>
            Welcome Back,
          </h1>
          <h1 className='text-center text-3xl font-bold text-purple-900'>
            {name}
          </h1>
        </div>
      )}
    </div>
  );
}
