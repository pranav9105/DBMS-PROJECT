import { Logo } from "@/components/logo";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute left-4 top-4 md:left-8 md:top-8">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <main className="w-full flex-1 flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
