'use client';

import { Logo } from '@/components/logo';

export default function DashboardLoading() {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="animate-pop-in">
        <Logo className="h-16 w-auto" />
      </div>
    </div>
  );
}
