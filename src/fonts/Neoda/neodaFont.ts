import localFont from 'next/font/local';

export const neodaFont = localFont({
  src: [
    {
      path: './neoda.ttf',
      weight: '400',
    },
    {
      path: './neoda.otf',
      weight: '400',
    },
  ],
  variable: '--font-neoda',
});
