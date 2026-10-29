import { X } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { buttonVariants } from "@/components/ui/button";

// Bachs redirects here when the payer backs out of checkout. Nothing was charged and the application
// is saved, so point them back at the payment link in their email.
const PaymentCancelledPage = async () => {
  const t = await getTranslations("PaymentCancelled");

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-8 sm:px-6 sm:py-16">
      <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-5 text-center sm:p-8">
        <div className="flex size-24 items-center justify-center rounded-full bg-muted">
          <X className="size-10 text-muted-foreground" strokeWidth={3} />
        </div>

        <h1 className="mt-6 font-serif text-2xl font-bold text-primary sm:text-3xl">{t("title")}</h1>
        <p className="mt-3 max-w-md text-muted-foreground">{t("description")}</p>

        <Link href="/" className={buttonVariants({ size: "lg", className: "mt-6" })}>
          {t("home")}
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancelledPage;
