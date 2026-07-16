import { create } from "zustand";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface AuthState {
  user: User | null;
  profile: any | null; // Detailed profile from DB
  isLoading: boolean;
  initialized: boolean;
  
  initialize: () => Promise<void>;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  isLoading: true,
  initialized: false,

  initialize: async () => {
    const supabase = createClient();
    
    // Get initial session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      // Fetch profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();
        
      set({ user: session.user, profile, isLoading: false, initialized: true });
    } else {
      set({ user: null, profile: null, isLoading: false, initialized: true });
    }

    // Listen for auth changes
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        set({ user: session.user, profile });
      } else {
        set({ user: null, profile: null });
      }
    });
  },

  setUser: (user) => set({ user }),
  
  signOut: async () => {
    set({ isLoading: true });
    const supabase = createClient();
    await supabase.auth.signOut();
    set({ user: null, profile: null, isLoading: false });
  },
}));
