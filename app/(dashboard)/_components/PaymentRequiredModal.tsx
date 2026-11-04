"use client";

import { CreditCard } from "lucide-react";
import { useTranslations } from "next-intl";

import SubmitButton from "@/components/shared/SubmitButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAppDispatch } from "@/redux/app/hooks";
import { logout } from "@/redux/features/auth/authSlice";

import { usePaymentGate } from "../_hooks/usePaymentGate";

// Blocks the whole dashboard until the program fee is paid. It can't be dismissed (no close button,
// Escape and outside clicks are ignored); it goes away on its own once the backend reports the
// payment. Logging out is the only other way out.
const PaymentRequiredModal = () => {
  const t = useTranslations("Dashboard.paymentModal");
  const dispatch = useAppDispatch();
  const { isPaymentRequired, startPayment, isStartingPayment } = usePaymentGate();

  return (
    <Dialog open={isPaymentRequired} onOpenChange={() => {}} disablePointerDismissal>
      <DialogContent showCloseButton={false} className="items-center gap-5 p-6 text-center sm:max-w-md">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-tint text-primary">
          <CreditCard className="size-6" />
        </div>

        <DialogHeader className="items-center gap-2">
          <DialogTitle className="text-lg leading-snug font-semibold">{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <SubmitButton
            type="button"
            className="mt-0 w-full"
            isLoading={isStartingPayment}
            loadingText={t("redirecting")}
            clickFn={startPayment}
          >
            {t("pay")}
          </SubmitButton>
          <Button type="button" variant="ghost" onClick={() => dispatch(logout())}>
            {t("logout")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentRequiredModal;
