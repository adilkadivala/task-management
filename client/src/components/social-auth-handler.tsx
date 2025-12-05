"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

export function SocialAuthHandler() {
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    console.log("OAuth token from URL:", token);

    if (token) {
      setAuth(token);
      window.history.replaceState({}, "", "/dashboard");
    }
  }, []);

  return null;
}
