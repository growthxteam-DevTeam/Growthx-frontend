"use client";

import Image from "next/image";

export default function ScreenLoader() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white/40 backdrop-blur-[3px]">
      <div className="flex flex-col items-center gap-3 bg-white/80 px-10 py-6 backdrop-blur-sm">
        <div className="animate-pulse">
          <Image src="/img/logo.svg" alt="Growth-X" width={166} height={43} loading="eager" className="h-9 w-auto" />
        </div>

        <div className="w-40 h-0.75 bg-gray-200 rounded-full overflow-hidden mt-1">
          <div className="h-full w-1/3 bg-primary rounded-full animate-[progress_1.4s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
