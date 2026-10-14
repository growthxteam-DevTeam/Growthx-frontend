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

const itemClassName =
  "flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-lg px-1 py-4 text-center text-xs font-semibold leading-tight transition-colors";

const Sidebar = () => {
  const t = useTranslations("Sidebar");
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  return (
    <aside className="flex w-28 shrink-0 flex-col items-center gap-2 bg-[#f0dfae] px-2 py-6">
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
        {SIDEBAR_LINKS.map(({ labelKey, href, icon: Icon, alsoActiveOn = [] }) => {
          const isActive = pathname === href || alsoActiveOn.some((path) => pathname.startsWith(path));
          return (
            <Link
              key={labelKey}
              href={href}
              className={cn(itemClassName, isActive ? "bg-primary text-white" : "text-primary hover:bg-white/40")}
            >
              <Icon className="size-7" strokeWidth={1.5} />
              {t(labelKey)}
            </Link>
          );
        })}

        <button
          type="button"
          onClick={() => dispatch(logout())}
          className={cn(itemClassName, "text-primary hover:bg-white/40")}
        >
          <LogOut className="size-7" strokeWidth={1.5} />
          {t("logout")}
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
