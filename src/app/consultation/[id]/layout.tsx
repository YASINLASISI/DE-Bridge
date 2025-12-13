'use client';

import Logo from '@/components/logo';

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {children}
    </div>
  );
}
