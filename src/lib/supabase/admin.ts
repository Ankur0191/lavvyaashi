import { createClient } from "@supabase/supabase-js";

// Note: This client uses the service role key and should ONLY be used in server environments.
// It bypasses RLS policies. Do not use in client components or expose to the client.

export const createAdminClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
};
