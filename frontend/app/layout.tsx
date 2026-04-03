import localFont from 'next/font/local';
import './globals.css';

const jakartaSans = localFont({
  src: [
    {
      path: '../public/fonts/PlusJakartaSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/PlusJakartaSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-jakarta',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${jakartaSans.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}