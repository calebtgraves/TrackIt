'use client';
import { getStreak } from '@/actions/getStreak';
import { useParams, useRouter } from 'next/navigation';
import { Streak } from '@/lib/types';
import React, { useEffect, useState } from 'react';
import { getColorByType } from '@/app/components/main';
import { updateStreak } from '@/actions/updateStreak';
import { deleteStreak } from '@/actions/deleteStreak';

export default function EditStreak() {
  const [streak, setStreak] = useState<Streak | null>(null);
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');

  useEffect(() => {
    getStreak(id).then((data) => {
      const streakData = data as Streak;
      setStreak(streakData);
      setName(streakData.name);
      setGoal(streakData.goal);
    });
  }, [id]);

  if (!streak) return null;
  return (
    <>
      <div
        className={`rounded-b-xl border-b-4 ${getColorByType(streak.type)} flex justify-between py-10 text-center font-title text-white`}
      >
        <div className='flex flex-1 justify-center text-2xl'>
          <button className='text-white' onClick={() => router.back()}>
            Back
          </button>
        </div>
        <div className='flex grow justify-center text-4xl'>
          Edit {streak.name}
        </div>
        <div className='flex-1'></div>
      </div>
      <div className='flex flex-1 items-center justify-center p-4'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = {
              name,
              goal,
            };
            updateStreak(id, data).then(() => {
              router.push('/');
            });
          }}
          className='flex w-full max-w-sm flex-col items-center justify-center rounded bg-white p-8 shadow-md'
        >
          <div className='mb-4 w-full'>
            <label htmlFor='name' className='mb-2 block text-center text-black'>
              Name
            </label>
            <input
              onChange={(e) => setName((e.target as HTMLInputElement).value)}
              type='text'
              id='name'
              value={name}
              required
              className='w-full rounded border border-gray-500 px-3 py-2 text-black focus:border-purple-500 focus:outline-none focus:ring'
            />
          </div>
          <div className='mb-6 w-full'>
            <label htmlFor='goal' className='mb-2 block text-center text-black'>
              Goal
            </label>
            <input
              onChange={(e) => setGoal((e.target as HTMLInputElement).value)}
              type='text'
              id='goal'
              value={goal}
              required
              className='w-full rounded border border-gray-500 px-3 py-2 text-black focus:border-purple-500 focus:outline-none focus:ring'
            />
          </div>
          <button
            type='submit'
            className='w-full rounded bg-green-600 py-2 font-title text-white transition duration-200'
          >
            Save it
          </button>
          <button
            onClick={() => {
              deleteStreak(id).then(() => {
                router.push('/');
              });
            }}
            className='mt-2 w-full rounded bg-red-600 py-2 font-title text-white transition duration-200'
          >
            Delete it
          </button>
        </form>
      </div>
    </>
  );
}
