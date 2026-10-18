"use client";

import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAppDispatch } from "@/redux/app/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { cn } from "@/lib/utils";

import { SIDEBAR_LINKS } from "../_constants";

const Sidebar = () => {
  const t = useTranslations("Sidebar");
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const navLinks = SIDEBAR_LINKS.map(({ labelKey, href, icon: Icon, alsoActiveOn = [] }) => {
    const isActive = pathname === href || alsoActiveOn.some((path) => pathname.startsWith(path));
    return { labelKey, href, Icon, isActive };
  });

  return (
    <>
      {/* ── Desktop: left sidebar ── */}
      <aside className="hidden lg:flex h-full w-28 shrink-0 flex-col items-center gap-2 bg-[#f0dfae] px-2 py-6">
        <Link href="/dashboard" className="mb-3 flex flex-col items-center gap-1">
          <Image
            src="/img/logo-icon.png"
            alt="Growth Space"
            width={100}
            height={50}
            loading="eager"
            className="h-auto w-12"
          />
          <span className="text-[11px] font-semibold text-primary">Growth Space</span>
        </Link>

        <nav className="mt-6 flex w-full flex-col gap-3">
          {navLinks.map(({ labelKey, href, Icon, isActive }) => (
            <Link
              key={labelKey}
              href={href}
              className={cn(
                "flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-lg px-1 py-4 text-center text-xs font-semibold leading-tight transition-colors",
                isActive ? "bg-primary text-white" : "text-primary hover:bg-white/40",
              )}
            >
              <Icon className="size-7" strokeWidth={1.5} />
              {t(labelKey)}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => dispatch(logout())}
            className="flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-lg px-1 py-4 text-center text-xs font-semibold leading-tight transition-colors text-primary hover:bg-white/40"
          >
            <LogOut className="size-7" strokeWidth={1.5} />
            {t("logout")}
          </button>
        </nav>
      </aside>

      {/* ── Mobile: fixed bottom nav bar ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-[#f0dfae] px-2 py-2">
        {navLinks.map(({ labelKey, href, Icon, isActive }) => (
          <Link
            key={labelKey}
            href={href}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-[10px] font-semibold transition-colors",
              isActive ? "bg-primary text-white" : "text-primary",
            )}
          >
            <Icon className="size-6" strokeWidth={1.5} />
            {t(labelKey)}
          </Link>
        ))}
        <button
          type="button"
          onClick={() => dispatch(logout())}
          className="flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-[10px] font-semibold text-primary transition-colors"
        >
          <LogOut className="size-6" strokeWidth={1.5} />
          {t("logout")}
        </button>
      </nav>
    </>
  );
};

export default Sidebar;
