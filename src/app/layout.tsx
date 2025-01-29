import type { Metadata } from 'next';
import { Comfortaa } from 'next/font/google';
import './globals.css';

const comfortaa = Comfortaa({
  weight: ['400', '700'], // specify the weights you need
  subsets: ['latin'], // specify the subsets you need
  display: 'swap',
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
    <html lang='en'>
      <body className={`${comfortaa.className} antialiased min-h-screen`}>
        <div>{children}</div>
      </body>
    </html>
  );
}
