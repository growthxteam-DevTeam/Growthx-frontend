import type { ReactNode } from "react";

import AnnouncementBanner from "@/components/common/AnnouncementBanner";
import Header from "@/components/common/Header";
import { ANNOUNCEMENT_MESSAGE } from "@/constants";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBanner message={ANNOUNCEMENT_MESSAGE} />
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AuthLayout;
