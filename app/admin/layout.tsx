import type { Metadata } from "next";
import type { ReactNode } from "react";

// Staff area: keep it out of search results. Real access control is the admin JWT on the backend.
export const metadata: Metadata = {
  title: "Growth X Admin",
  robots: { index: false, follow: false },
};

const AdminLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen flex-col bg-page">{children}</div>
);

export default AdminLayout;
