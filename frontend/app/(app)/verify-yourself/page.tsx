"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [redirectUrl, setRedirectUrl] = useState<string>("");

  useEffect(() => {
    // 👀 listen for auth state change

    setRedirectUrl(`${window.location.origin}/verify-yourself/complete-profile`);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        // ✅ redirect user after sign in
        const userId = session.user.id;

        const { data: user, error } = await supabase
        .from("users")
        .select("full_name")
        .eq("user_supabase_uid", userId)
        .maybeSingle();

        if (error) console.log("Error fetching user:", error);
        console.log("Fetched user:", user?.full_name);

        // router.replace("/verify-yourself/complete-profile");

        if (!user?.full_name) {
          router.replace("/verify-yourself/complete-profile");
        } else {
          router.replace("/store"); 
        }
      }
    });

    

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue your verification</p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#6366f1",
                  brandAccent: "#4f46e5",
                },
              },
            },
          }}
          providers={[]} // email/password only
          redirectTo={redirectUrl}
        />
      </div>
    </div>
  );
};

export default Page;
