import type { Metadata } from 'next';
import './globals.css';
import { Gasoek_One, Poltawski_Nowy } from 'next/font/google';

const title = Gasoek_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--title-font',
});
const text = Poltawski_Nowy({
  subsets: ['latin'],
  weight: '400',
  variable: '--text-font',
});

const background = 'bg-gradient-to-bl from-purple-600 to-purple-800 ';

export const metadata: Metadata = {
  title: 'TrackIt',
  description: 'A streak tracking app for extraordinary people.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={` ${title.variable} ${text.variable} ${background} min-h-screen text-white`}
      >
        {children}
      </body>
    </html>
  );
}
