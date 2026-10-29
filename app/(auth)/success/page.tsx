import { Check } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { buttonVariants } from "@/components/ui/button";

// Bachs redirects here after checkout. The redirect alone proves nothing: the GS code is emailed
// only once the backend has confirmed the payment with Bachs, so this page just tells them to wait.
const PaymentSuccessPage = async () => {
  const t = await getTranslations("PaymentSuccess");

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-8 sm:px-6 sm:py-16">
      <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-5 text-center sm:p-8">
        <div className="flex size-24 items-center justify-center rounded-full bg-emerald-50">
          <Check className="size-10 text-emerald-600" strokeWidth={3} />
        </div>

        <h1 className="mt-6 font-serif text-2xl font-bold text-primary sm:text-3xl">{t("title")}</h1>
        <p className="mt-3 max-w-md text-muted-foreground">{t("description")}</p>
        <p className="mt-3 text-sm text-muted-foreground">{t("hint")}</p>

        <Link href="/login" className={buttonVariants({ size: "lg", className: "mt-6" })}>
          {t("login")}
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
