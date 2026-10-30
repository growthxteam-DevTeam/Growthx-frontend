import { Lock, LockOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { ALUMNI_NETWORK } from "../_constants";

const buttonClass = "mt-4 block w-full rounded-lg py-2.5 text-center text-sm font-semibold";

const AlumniNetworkCard = () => {
  const t = useTranslations("Dashboard.community.alumni");
  const { unlocked } = ALUMNI_NETWORK;
  const Icon = unlocked ? LockOpen : Lock;

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
        <Icon className="size-4" />
        {t("title")}
      </h2>

      <p
        className={cn(
          "mt-3 text-sm",
          unlocked ? "text-muted-foreground" : "text-muted-foreground/60 blur-[1.5px] select-none",
        )}
      >
        {t("teaser")}
      </p>

      {unlocked ? (
        <Link
          href={ALUMNI_NETWORK.href}
          className={cn(buttonClass, "bg-primary text-primary-foreground hover:bg-primary/80")}
        >
          {t("open")}
        </Link>
      ) : (
        <button type="button" disabled className={cn(buttonClass, "bg-tint text-primary disabled:cursor-not-allowed")}>
          {t("unlock")}
        </button>
      )}
    </section>
  );
};

export default AlumniNetworkCard;
