'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  return (
    <div className='flex min-h-screen flex-col'>
      <div className='rounded-b-xl border-b-4 border-b-purple-950 bg-purple-900 py-10 text-center font-title text-5xl text-white'>
        TrackIt
      </div>
      <div className='flex flex-1 items-center justify-center'>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (password !== confirmPassword) {
              alert('Passwords do not match');
              return;
            }
            // await signUp({ firstName, lastName, email, password });
            router.push('/');
          }}
          className='m-5 w-full max-w-sm rounded bg-white p-8 shadow-md'
        >
          <div className='mb-4'>
            <label htmlFor='firstName' className='mb-2 block text-purple-700'>
              First Name:
            </label>
            <input
              type='text'
              id='firstName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className='w-full rounded border border-purple-300 px-3 py-2 text-black focus:border-purple-500 focus:outline-none focus:ring'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='lastName' className='mb-2 block text-purple-700'>
              Last Name:
            </label>
            <input
              type='text'
              id='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className='w-full rounded border border-purple-300 px-3 py-2 text-black focus:border-purple-500 focus:outline-none focus:ring'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='mb-2 block text-purple-700'>
              Email:
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full rounded border border-purple-300 px-3 py-2 text-black focus:border-purple-500 focus:outline-none focus:ring'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='mb-2 block text-purple-700'>
              Password:
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full rounded border border-purple-300 px-3 py-2 text-black focus:border-purple-500 focus:outline-none focus:ring'
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='confirmPassword'
              className='mb-2 block text-purple-700'
            >
              Confirm Password:
            </label>
            <input
              type='password'
              id='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className='w-full rounded border border-purple-300 px-3 py-2 text-black focus:border-purple-500 focus:outline-none focus:ring'
            />
          </div>
          <button
            type='submit'
            className='w-full rounded bg-purple-500 py-2 text-white transition duration-200 hover:bg-purple-600'
          >
            Sign Up
          </button>
          <button
            onClick={() => router.push('/login')}
            type='button'
            className='mt-2 w-full rounded bg-purple-200 py-2 text-purple-700 transition duration-200 hover:bg-purple-300'
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
