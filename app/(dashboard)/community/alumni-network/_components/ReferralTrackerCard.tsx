"use client";

import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { ALUMNI_REFERRALS } from "../_constants";

const ReferralTrackerCard = () => {
  const t = useTranslations("Dashboard.alumniNetwork");

  return (
    <section className="rounded-lg border border-border bg-card p-[15px]">
      <h2 className="text-base font-semibold text-foreground">{t("referrals.title")}</h2>

      <dl className="mt-3 flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">{t("referrals.made")}</dt>
          <dd className="text-primary">{ALUMNI_REFERRALS.made}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">{t("referrals.received")}</dt>
          <dd className="text-primary">{ALUMNI_REFERRALS.received}</dd>
        </div>
      </dl>

      {/* TODO: referrals have no backend yet, so the button only acknowledges the click. */}
      <Button
        type="button"
        onClick={() => toast.info(t("comingSoon"))}
        className="mt-3 h-[38px] w-full rounded-md text-base font-semibold"
      >
        {t("referrals.cta")}
      </Button>
    </section>
  );
};

export default ReferralTrackerCard;
