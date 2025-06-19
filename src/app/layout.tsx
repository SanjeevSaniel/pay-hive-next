import type { Metadata } from 'next';
import { ABeeZee } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';
import '@mantine/core/styles.css';

const aBeeZee = ABeeZee({
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Splitly',
  description: 'Splitly',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning={true}>
      <body className={`${aBeeZee.className}`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
