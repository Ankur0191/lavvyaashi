import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { User, Package, LifeBuoy } from "lucide-react";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login?redirect=/account");
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
      <h1 className="text-3xl font-serif text-text mb-8">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Navigation */}
        <nav className="w-full md:w-64 shrink-0">
          <ul className="space-y-2">
            <li>
              <Link 
                href="/account" 
                className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-bg-secondary transition-colors text-text"
              >
                <User className="w-5 h-5 text-gold" />
                <span className="font-medium text-sm tracking-wide uppercase">Profile</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/account/orders" 
                className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-bg-secondary transition-colors text-text"
              >
                <Package className="w-5 h-5 text-gold" />
                <span className="font-medium text-sm tracking-wide uppercase">Orders</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/account/support" 
                className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-bg-secondary transition-colors text-text"
              >
                <LifeBuoy className="w-5 h-5 text-gold" />
                <span className="font-medium text-sm tracking-wide uppercase">Support</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
