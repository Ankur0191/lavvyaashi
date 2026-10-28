export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAF7F1] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <span className="font-serif text-3xl font-bold tracking-widest text-[var(--text)]">LAVVYAASHI</span>
        <p className="mt-2 text-sm text-[var(--text-muted)] tracking-wider uppercase">Admin Portal</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[var(--bg-card)] py-8 px-4 shadow-xl shadow-black/5 sm:rounded-xl sm:px-10 border border-[var(--border)]">
          {children}
        </div>
      </div>
    </div>
  );
}
