export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full items-center justify-start bg-background p-4 md:p-16">
      {children}
    </div>
  );
}
