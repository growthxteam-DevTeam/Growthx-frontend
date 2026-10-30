import { useTranslations } from "next-intl";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { ActionCardConfig } from "../_types";

const buttonClassName = "mt-5 h-10 w-full border-primary text-sm font-medium text-primary hover:bg-transparent";

const badgeClassNames = {
  warning: "bg-orange-50 text-orange-500",
  success: "bg-emerald-50 text-emerald-600",
};

const ActionCard = ({ id, icon: Icon, href, badgeTone }: ActionCardConfig) => {
  const t = useTranslations(`Dashboard.home.cards.${id}`);
  const buttonLabel = t("button");

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm ">
      <div className="relative flex h-32 items-center justify-center bg-tint">
        {badgeTone && (
          <span
            className={cn("absolute right-4 top-4 rounded px-2 py-0.5 text-xs font-medium", badgeClassNames[badgeTone])}
          >
            {t("badge")}
          </span>
        )}
        <Icon className="size-12 text-primary" strokeWidth={1.5} />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <h3 className="text-lg font-semibold text-primary">{t("title")}</h3>
        <p className="flex-1 text-sm text-foreground">{t("description")}</p>
        {href ? (
          <Link href={href} className={cn(buttonVariants({ variant: "outline" }), buttonClassName)}>
            {buttonLabel}
          </Link>
        ) : (
          <Button type="button" variant="outline" className={`${buttonClassName} cursor-pointer`}>
            {buttonLabel}
          </Button>
        )}
      </div>
    </article>
  );
};

export default ActionCard;
