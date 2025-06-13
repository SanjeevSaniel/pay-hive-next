import type { Metadata } from 'next';
import { Comfortaa } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';
import '@mantine/core/styles.css';

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from '@mantine/core';

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
    <html
      lang='en'
      {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${comfortaa.className} antialiased min-h-screen`}>
        <MantineProvider>
          <Providers>{children}</Providers>
          <Toaster />
        </MantineProvider>
      </body>
    </html>
  );
}
