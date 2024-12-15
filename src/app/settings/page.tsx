'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getUser, updateUser, updateUserPassword } from '@/actions/users';
import { Users } from '@prisma/client';

export default function Settings() {
  const userId = useSession().data?.user?.id;
  const [user, setUser] = useState<Users | null>(null);
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    async function fetchUser() {
      const userData = await getUser(userId || '');
      if (userData) {
        setUser(userData);
      }
      setName(userData?.name || '');
      setEmail(userData?.email || '');
    }
    fetchUser();
  }, [userId]);

  async function handleChangePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (user?.id) {
      updateUserPassword(user.id, newPassword);
    }
    setEditMode(false);
  }

  if (!user) return null;
  return (
    <>
      <div
        className={`flex justify-between rounded-b-xl border-b-4 border-b-purple-950 bg-purple-900 py-10 text-center font-title text-white`}
      >
        <div className='flex flex-1 justify-center text-2xl'>
          <button className='text-white' onClick={() => router.back()}>
            Back
          </button>
        </div>
        <div className='flex grow justify-center text-4xl'>Settings</div>
        <div className='flex-1'></div>
      </div>
      <div className='flex justify-end p-4'>
        <button
          onClick={() => {
            if (editMode) {
              if (user?.id) {
                updateUser(user.id, email, name);
              }
              setEditMode(false);
            } else {
              setEditMode(true);
            }
          }}
          className='rounded bg-purple-900 p-2 text-white'
        >
          {editMode ? 'Save' : 'Edit'}
        </button>
      </div>
      <div className='flex flex-1 flex-col items-center justify-center p-4'>
        <form className='space-y-4'>
          {editMode ? (
            <>
              <div>
                <label className='block text-center text-black'>
                  Full Name
                </label>
                <input
                  className='w-full rounded border px-3 py-2 text-black'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className='block text-center text-black'>Email</label>
                <input
                  className='w-full rounded border px-3 py-2 text-black'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className='block text-center text-black'>
                  Full Name
                </label>
                <input
                  className='w-full rounded border px-3 py-2 text-black'
                  disabled
                  value={name}
                />
              </div>
              <div>
                <label className='block text-center text-black'>Email</label>
                <input
                  className='w-full rounded border px-3 py-2 text-black'
                  disabled
                  value={email}
                />
              </div>
            </>
          )}
        </form>
        {editMode && (
          <form className='mt-5 space-y-4' onSubmit={handleChangePassword}>
            <h3 className='text-center text-2xl'>Change Password</h3>
            <div>
              <label
                className='block text-center text-black'
                htmlFor='newPassword'
              >
                New Password
              </label>
              <input
                id='newPassword'
                className='w-full rounded border px-3 py-2 text-black'
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                className='block text-center text-black'
                htmlFor='confirmPassword'
              >
                Confirm New Password
              </label>
              <input
                id='confirmPassword'
                className='w-full rounded border px-3 py-2 text-black'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className='flex justify-center'>
              <button className='rounded bg-purple-900 p-2 text-white'>
                Save Password
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
