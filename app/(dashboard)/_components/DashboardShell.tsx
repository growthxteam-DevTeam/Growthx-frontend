"use client";

import { useEffect, type ReactNode } from "react";

import { useRouter } from "next/navigation";

import { useAppSelector } from "@/redux/app/hooks";

import Sidebar from "./Sidebar";

const DashboardShell = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.token);

  // Also covers logout: clearing the token sends the user back to the login page.
  useEffect(() => {
    if (!token) router.replace("/login");
  }, [token, router]);

  if (!token) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar handles both desktop (left column) and mobile (fixed bottom nav) layouts */}
      <Sidebar />
      <main className="min-w-0 flex-1 overflow-y-auto px-4 py-4 pb-24 mt-0 lg:px-8 lg:py-6 lg:mt-6 lg:pb-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardShell;
