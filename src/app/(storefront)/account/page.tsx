import { createClient } from "@/lib/supabase/server";

export default async function AccountProfilePage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  return (
    <div className="bg-bg-primary border border-border p-8 rounded-lg shadow-sm">
      <h2 className="text-xl font-serif text-text mb-6">Profile Details</h2>
      
      <div className="space-y-6 max-w-md">
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
            Full Name
          </label>
          <div className="text-sm text-text bg-bg-secondary px-3 py-2 rounded-md">
            {profile?.name || "Not provided"}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
            Email Address
          </label>
          <div className="text-sm text-text bg-bg-secondary px-3 py-2 rounded-md">
            {profile?.email || session.user.email}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
            Phone Number
          </label>
          <div className="text-sm text-text bg-bg-secondary px-3 py-2 rounded-md">
            {profile?.phone || "Not provided"}
          </div>
        </div>

        <button className="text-xs font-medium uppercase tracking-widest bg-gradient-gold text-white shadow-gold hover:shadow-lg px-4 py-2 rounded-md transition-all">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
