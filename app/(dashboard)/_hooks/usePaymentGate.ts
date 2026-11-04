"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/api-error";
import {
  useCreatePaymentCheckoutMutation,
  useGetPaymentStatusQuery,
} from "@/redux/features/applications/applicationsApi";

// How often to re-ask the backend while the modal is up, so it clears itself shortly after Bachs
// confirms the payment (the backend re-checks the checkout with Bachs on every call).
const POLL_INTERVAL_MS = 10_000;

export const usePaymentGate = () => {
  const t = useTranslations("Dashboard.paymentModal");
  const [createCheckout, { isLoading: isCreatingCheckout }] = useCreatePaymentCheckoutMutation();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Always ask the server on mount: a cached "unpaid" from before the payment must not bring the modal back.
  const { data } = useGetPaymentStatusQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: POLL_INTERVAL_MS,
    skipPollingIfUnfocused: true,
  });

  // Only an explicit "not paid" blocks the dashboard — while loading, or if the status can't be
  // fetched, the page stays usable rather than locking everyone out.
  const isPaymentRequired = data?.data.hasPaid === false;

  const startPayment = async () => {
    try {
      const { paymentUrl } = await createCheckout().unwrap();
      // Stay in the loading state until the browser has actually left for Bachs.
      setIsRedirecting(true);
      window.location.assign(paymentUrl);
    } catch (error) {
      toast.error(getApiErrorMessage(error, t("error")));
    }
  };

  return {
    isPaymentRequired,
    startPayment,
    isStartingPayment: isCreatingCheckout || isRedirecting,
  };
};
