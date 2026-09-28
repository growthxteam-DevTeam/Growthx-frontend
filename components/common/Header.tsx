import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Globe } from "lucide-react";

import Container from "@/components/common/Container";
import { NAV_LINKS } from "@/constants";

const Header = () => {
  return (
    <header className="bg-[#f0dfae]">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center flex-col">
          <Image src="/img/logo.svg" alt="Growth-X" width={166} height={43} className="h-9 w-auto" />

          <span className="text-xs font-medium text-primary">Growth space</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-base font-semibold text-primary hover:opacity-80"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex cursor-pointer items-center gap-1.5 text-base font-semibold text-primary"
        >
          <Globe className="size-5" />
          English
          <ChevronDown className="size-4" />
        </button>
      </Container>
    </header>
  );
};

export default Header;
