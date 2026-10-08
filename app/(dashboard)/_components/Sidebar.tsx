"use client";

import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAppDispatch } from "@/redux/app/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { cn } from "@/lib/utils";

import { SIDEBAR_LINKS } from "../_constants";

const itemClassName =
  "flex w-full cursor-pointer flex-col items-center gap-1 rounded-lg px-1 py-3 text-center text-[10px] font-medium leading-tight transition-colors";

const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  return (
    <aside className="flex w-24 shrink-0 flex-col items-center gap-2 bg-[#f0dfae] px-2 py-6">
      <Link href="/dashboard" className="mb-6">
        <Image src="/img/logo.svg" alt="Growth Space" width={166} height={43} loading="eager" className="h-auto w-16" />
      </Link>

      <nav className="flex w-full flex-col gap-2">
        {SIDEBAR_LINKS.map(({ label, href, icon: Icon, alsoActiveOn = [] }) => {
          const isActive = pathname === href || alsoActiveOn.includes(pathname);
          return (
            <Link
              key={label}
              href={href}
              className={cn(itemClassName, isActive ? "bg-primary text-white" : "text-primary hover:bg-white/40")}
            >
              <Icon className="size-5" />
              {label}
            </Link>
          );
        })}

        <button
          type="button"
          onClick={() => dispatch(logout())}
          className={cn(itemClassName, "text-primary hover:bg-white/40")}
        >
          <LogOut className="size-5" />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
