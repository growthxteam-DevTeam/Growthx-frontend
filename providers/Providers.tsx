import React from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/redux/ReduxProvider";
// import { RefetchProvider } from "@/context/RefetchContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
    <ReduxProvider>
      {/* <RefetchProvider> */}
       {children}
       <Toaster position="top-right" richColors />
      {/* </RefetchProvider> */}
    </ReduxProvider>
    </ThemeProvider>
  );
};

export default Providers;
