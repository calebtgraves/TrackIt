'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });

    if (result?.error) {
      setError(result.error);
      setTimeout(() => setError(null), 3000);
    } else {
      router.push('/');
    }
  };

  return (
    <>
      {error && <div className='mb-4 text-red-500'>{error}</div>}
      <div className='flex min-h-screen flex-col'>
        <div className='rounded-b-xl border-b-4 border-b-purple-950 bg-purple-900 py-10 text-center font-title text-5xl text-white'>
          TrackIt
        </div>
        <div className='flex flex-1 items-center justify-center bg-gradient-to-bl from-purple-600 to-purple-800'>
          <form
            onSubmit={handleSubmit}
            className='w-full max-w-sm rounded bg-white p-8 shadow-md'
          >
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
            <div className='mb-6'>
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
            <button
              type='submit'
              className='w-full rounded bg-purple-500 py-2 text-white transition duration-200 hover:bg-purple-600'
            >
              Login
            </button>
            <button
              type='button'
              className='mt-2 w-full rounded bg-purple-200 py-2 text-purple-700 transition duration-200 hover:bg-purple-300'
            >
              Create an Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
