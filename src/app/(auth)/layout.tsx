export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <main className="w-full flex-1 flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
