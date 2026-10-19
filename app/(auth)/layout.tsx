import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import AnnouncementBanner from "@/components/common/AnnouncementBanner";
import Header from "@/components/common/Header";
import { SHOW_ANNOUNCEMENT_BANNER } from "@/constants";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const t = await getTranslations("Announcement");

  return (
    <div className="flex min-h-screen flex-col bg-page">
      {SHOW_ANNOUNCEMENT_BANNER && <AnnouncementBanner message={t("message")} />}
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AuthLayout;
