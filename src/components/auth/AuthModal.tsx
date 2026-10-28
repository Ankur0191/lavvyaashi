"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";
import { APP_NAME } from "@/constants";
import * as fpixel from "@/lib/fpixel";

// SCHEMAS
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  defaultTab?: "login" | "signup";
}

export function AuthModal({ isOpen, onClose, onSuccess, defaultTab = "login" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);
  const [isLoading, setIsLoading] = useState(false);
  const { initialize } = useAuthStore();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    const supabase = createClient();
    
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    await initialize();
    toast.success("Welcome back to Lavvyaashi");
    setIsLoading(false);
    if (onSuccess) onSuccess();
    else onClose();
  };

  const onSignupSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    const supabase = createClient();
    
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          phone: data.phone,
        }
      }
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    await initialize();
    fpixel.event("CompleteRegistration");
    toast.success("Account created successfully!");
    setIsLoading(false);
    if (onSuccess) onSuccess();
    else onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-[90%] max-w-md max-h-[90vh] overflow-y-auto scrollbar-thin bg-bg-primary rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <span className="font-serif text-xl tracking-widest uppercase">{APP_NAME}</span>
              <button onClick={onClose} className="p-2 -mr-2 text-text-muted hover:text-text rounded-full hover:bg-bg-secondary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border/50">
              <button
                className={`flex-1 py-4 text-sm font-medium uppercase tracking-widest transition-colors ${activeTab === 'login' ? 'text-gold border-b-2 border-gold bg-gold/5' : 'text-text-muted hover:text-text hover:bg-bg-secondary'}`}
                onClick={() => setActiveTab('login')}
              >
                Sign In
              </button>
              <button
                className={`flex-1 py-4 text-sm font-medium uppercase tracking-widest transition-colors ${activeTab === 'signup' ? 'text-gold border-b-2 border-gold bg-gold/5' : 'text-text-muted hover:text-text hover:bg-bg-secondary'}`}
                onClick={() => setActiveTab('signup')}
              >
                Sign Up
              </button>
            </div>

            {/* Forms */}
            <div className="p-6">
              {activeTab === 'login' ? (
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">Email Address</label>
                    <input
                      {...loginForm.register("email")}
                      type="email"
                      className="w-full bg-bg-secondary/50 border border-border rounded-md px-3 py-2.5 text-sm text-text focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors"
                      placeholder="you@example.com"
                    />
                    {loginForm.formState.errors.email && <p className="mt-1 text-xs text-red-500">{loginForm.formState.errors.email.message}</p>}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-medium text-text-muted uppercase tracking-wider">Password</label>
                    </div>
                    <input
                      {...loginForm.register("password")}
                      type="password"
                      className="w-full bg-bg-secondary/50 border border-border rounded-md px-3 py-2.5 text-sm text-text focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors"
                    />
                    {loginForm.formState.errors.password && <p className="mt-1 text-xs text-red-500">{loginForm.formState.errors.password.message}</p>}
                  </div>

                  <button type="submit" disabled={isLoading} className="w-full bg-gradient-gold text-white shadow-gold hover:shadow-lg rounded-md py-3 text-sm font-medium uppercase tracking-widest transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed mt-6">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In & Continue"}
                  </button>
                </form>
              ) : (
                <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">Full Name</label>
                    <input
                      {...signupForm.register("name")}
                      type="text"
                      className="w-full bg-bg-secondary/50 border border-border rounded-md px-3 py-2.5 text-sm text-text focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors"
                      placeholder="Jane Doe"
                    />
                    {signupForm.formState.errors.name && <p className="mt-1 text-xs text-red-500">{signupForm.formState.errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">Email Address</label>
                    <input
                      {...signupForm.register("email")}
                      type="email"
                      className="w-full bg-bg-secondary/50 border border-border rounded-md px-3 py-2.5 text-sm text-text focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors"
                      placeholder="you@example.com"
                    />
                    {signupForm.formState.errors.email && <p className="mt-1 text-xs text-red-500">{signupForm.formState.errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">Phone Number</label>
                    <input
                      {...signupForm.register("phone")}
                      type="tel"
                      className="w-full bg-bg-secondary/50 border border-border rounded-md px-3 py-2.5 text-sm text-text focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors"
                      placeholder="+91 9876543210"
                    />
                    {signupForm.formState.errors.phone && <p className="mt-1 text-xs text-red-500">{signupForm.formState.errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">Password</label>
                    <input
                      {...signupForm.register("password")}
                      type="password"
                      className="w-full bg-bg-secondary/50 border border-border rounded-md px-3 py-2.5 text-sm text-text focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors"
                    />
                    {signupForm.formState.errors.password && <p className="mt-1 text-xs text-red-500">{signupForm.formState.errors.password.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">Confirm Password</label>
                    <input
                      {...signupForm.register("confirmPassword")}
                      type="password"
                      className="w-full bg-bg-secondary/50 border border-border rounded-md px-3 py-2.5 text-sm text-text focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors"
                    />
                    {signupForm.formState.errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{signupForm.formState.errors.confirmPassword.message}</p>}
                  </div>

                  <button type="submit" disabled={isLoading} className="w-full bg-gradient-gold text-white shadow-gold hover:shadow-lg rounded-md py-3 text-sm font-medium uppercase tracking-widest transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed mt-6">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign Up & Continue"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
