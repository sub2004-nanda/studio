
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Inter, Poppins } from 'next/font/google';
import { FirebaseProvider } from '@/firebase/provider';
import FirebaseErrorListener from '@/components/FirebaseErrorListener';
import { MotionProvider } from '@/components/layout/motion-provider';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Saksham',
  description: 'Empower Your Organization with Smart Productivity Tracking',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`!scroll-smooth ${inter.variable} ${poppins.variable}`}>
      <body className="font-body antialiased">
        <MotionProvider>
          <FirebaseProvider>
            {children}
            <Toaster />
            <FirebaseErrorListener />
          </FirebaseProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
