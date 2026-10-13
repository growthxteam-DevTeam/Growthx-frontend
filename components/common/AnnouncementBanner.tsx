"use client";

import { CheckCircle2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";

interface AnnouncementBannerProps {
  message: string;
}

const STORAGE_KEY = "announcement-dismissed";
const DISMISS_EVENT = "announcement-dismissed";

// Dismissal lasts for the browser session, so the banner is back on the next visit.
const subscribe = (onChange: () => void) => {
  window.addEventListener(DISMISS_EVENT, onChange);
  return () => window.removeEventListener(DISMISS_EVENT, onChange);
};
const getSnapshot = () => sessionStorage.getItem(STORAGE_KEY) === "true";
const getServerSnapshot = () => false;

const AnnouncementBanner = ({ message }: AnnouncementBannerProps) => {
  const t = useTranslations("Announcement");
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (dismissed) return null;

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    window.dispatchEvent(new Event(DISMISS_EVENT));
  };

  return (
    <div className="relative flex items-center justify-center gap-2 bg-emerald-50 py-3 pl-4 pr-12 text-center">
      <CheckCircle2 className="size-5 shrink-0 fill-emerald-500 text-emerald-50" />
      <p className="text-sm font-medium text-emerald-800">{message}</p>
      <button
        type="button"
        onClick={dismiss}
        aria-label={t("dismiss")}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded p-1 text-emerald-800 hover:bg-emerald-100"
      >
        <X className="size-4" />
      </button>
    </div>
  );
};

export default AnnouncementBanner;
