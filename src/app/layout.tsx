import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { Providers } from './providers';
import NavBar from '../components/NavBar';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata = { title: 'Heist', description: 'Smart-home control systems' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="is">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <NavBar />
          <main className="pt-16 min-h-screen bg-gray-50 text-gray-900">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}