export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full items-stretch justify-center bg-background p-4 md:p-8">
      {children}
    </div>
  );
}
