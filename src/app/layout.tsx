import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'DE-Bridge: Diaspora Expertise Network',
  description: 'Connect with Nigerian Experts Abroad for virtual consultations and mentorship.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased')} suppressHydrationWarning>
        <FirebaseClientProvider>
          <div className="fixed inset-0 -z-10">
            <Image
              src="https://images.unsplash.com/photo-1521747116042-5a810fda9664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxnb3VnZSUyMGR1JTIwdmVyZG9uJTIwcm9hZHxlbnwwfHx8fDE3MjE0MDQ3OTB8MA&ixlib=rb-4.0.3&q=80&w=1920"
              alt="A winding road through a lush green mountain valley"
              fill
              className="object-cover"
              data-ai-hint="mountain road landscape"
            />
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm"></div>
          </div>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
