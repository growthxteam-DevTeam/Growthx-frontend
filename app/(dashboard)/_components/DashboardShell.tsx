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
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="min-w-0 flex-1 px-8 py-6">{children}</main>
    </div>
  );
};

export default DashboardShell;
