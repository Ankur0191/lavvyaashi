import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center text-text-muted hover:text-text transition-colors text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Store
      </Link>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block">
          <span className="font-serif text-3xl font-bold tracking-widest text-text">LAVVYAASHI</span>
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-bg-card py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 border border-border">
          {children}
        </div>
      </div>
    </div>
  );
}
