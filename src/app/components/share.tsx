'use client';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
} from 'react-share';

import { Users } from '@/lib/types';
import { useEffect, useState } from 'react';

export function getColorByType(type: string) {
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

export default function Share({ streakId }: { streakId: string }) {
  const shareUrl = window.location.href;
  const title = 'TrackIt: A Streak Tracking App for Extraordinary People';
  const [streakData, setStreakData] = useState({
    userId: '',
    name: '',
    goal: '',
    type: '',
    streakCount: 0,
    totalCount: 0,
    unit: '',
    totalQuantity: 0,
    totalTime: 0,
    reportType: '',
    totalInputs: 0,
    streak: 0,
  });
  const [users, setUsers] = useState<Users[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);

  // Fetch streak data
  useEffect(() => {
    const fetchStreakData = async () => {
      try {
        const response = await fetch(`/api/streaks/${streakId}`);
        if (!response.ok) {
          throw new Error(`Error fetching streak: ${response.statusText}`);
        }
        const data = await response.json();
        setStreakData(data);
      } catch (error) {
        setError('Error fetching streak data.');
        console.error(error);
      }
    };

    if (streakId) {
      fetchStreakData();
    }
  }, [streakId]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/users`);
        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.statusText}`);
        }
        const data = await response.json();
        setUsers(data);
        setFullName(data[0].name);
      } catch (error) {
        setError('Error fetching user data.');
        console.error(error);
      }
    };

    fetchUsers();
  }, [streakData.userId, users]);

  // Conditional rendering for error or loading state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className='relative row-start-3 row-end-4 w-full'>
        {/* Header */}
        <div className='relative flex w-full items-center justify-center rounded-xl border-b-4 border-green-900 bg-green-500 py-5'>
          <h1 className='text-center text-4xl font-bold text-white'>
            {`${fullName} Shared a Streak`}
          </h1>
        </div>

        {/* Content */}
        <div className='row-start-4 row-end-7 mx-auto mb-10 mt-5 w-full rounded-lg bg-white p-5 shadow-lg'>
          <div className='text-lg'>
            <p className='mb-2 text-black'>
              <span className='font-semibold text-gray-700'>
                My Streak Name is
              </span>
              {` "${streakData.name}"`}
            </p>
            <p className='mb-2 text-black'>
              <span className='font-semibold text-gray-700'>
                My current Goal is to do the following
              </span>{' '}
              {` "${streakData.goal}"`}
            </p>
            <p className='mb-2 text-black'>
              <span className='font-semibold text-gray-700'>
                My streak is a
              </span>{' '}
              {streakData.type === 'count'
                ? 'Count Streak'
                : streakData.type === 'quantity'
                  ? 'Quantity Streak'
                  : streakData.type === 'time'
                    ? 'Time Streak'
                    : streakData.type === 'check'
                      ? 'Check It Streak'
                      : 'unknown'}
            </p>
            <p className='mb-2 text-black'>
              <span className='font-semibold text-gray-700'>
                My streak current count is
              </span>{' '}
              {streakData.streakCount}
              <span className='font-semibold text-gray-700'>
                {streakData.totalCount === 1 ? ' time!' : ' times!'}
              </span>
            </p>

            {streakData.type === 'count' && (
              <>
                <p className='mb-2 text-black'>
                  <span className='font-semibold text-gray-700'>
                    Total Count:
                  </span>{' '}
                  {streakData.totalCount}
                </p>
              </>
            )}
            {streakData.type === 'quantity' && (
              <>
                <p className='mb-2 text-black'>
                  <span className='font-semibold text-gray-700'>
                    Total Quantity:
                  </span>{' '}
                  {streakData.totalQuantity}
                </p>
              </>
            )}

            {streakData.type === 'time' && (
              <>
                <p className='mb-2 text-black'>
                  <span className='font-semibold text-gray-700'>
                    Total Time:
                  </span>{' '}
                  {streakData.totalTime}
                </p>
                <p className='mb-2 text-black'>
                  <span className='font-semibold text-gray-700'>
                    Report Type:
                  </span>{' '}
                  {streakData.reportType}
                </p>
              </>
            )}

            {streakData.type === 'check' && (
              <p>No additional data available.</p>
            )}
          </div>
        </div>
        <div className='flex flex-row gap-5'>
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <FacebookMessengerShareButton url={shareUrl} appId='521270401588372'>
            <FacebookMessengerIcon size={32} round />
          </FacebookMessengerShareButton>
          <EmailShareButton url={shareUrl} subject={title} body='body'>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      </div>
    </>
  );
}
