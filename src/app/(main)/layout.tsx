import Image from 'next/image';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
    </>
  );
}
