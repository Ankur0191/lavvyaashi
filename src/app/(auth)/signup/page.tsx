"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const [isLoading, setIsLoading] = useState(false);
  const { initialize } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    const supabase = createClient();
    
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
        }
      }
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    await initialize(); // Refresh auth store
    toast.success("Account created successfully!");
    router.push(redirectUrl);
    router.refresh();
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-serif text-text">Create Account</h2>
        <p className="text-sm text-text-muted mt-1">Join Lavvyaashi for a luxury experience.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
            Full Name
          </label>
          <input
            {...register("name")}
            type="text"
            className="w-full bg-bg-primary border border-border rounded-md px-3 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors"
            placeholder="Jane Doe"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full bg-bg-primary border border-border rounded-md px-3 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="w-full bg-bg-primary border border-border rounded-md px-3 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-text text-bg-primary rounded-md py-2.5 text-sm font-medium hover:bg-text-muted transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed mt-6"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Account"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-text-muted">
        Already have an account?{" "}
        <Link href={`/login?redirect=${encodeURIComponent(redirectUrl)}`} className="text-gold hover:underline font-medium">
          Sign In
        </Link>
      </div>
    </div>
  );
}
