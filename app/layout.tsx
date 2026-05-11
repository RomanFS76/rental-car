import { Manrope } from 'next/font/google';
import 'modern-normalize/modern-normalize.css';
import './globals.css';
import Header from '../components/Header/Header';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
