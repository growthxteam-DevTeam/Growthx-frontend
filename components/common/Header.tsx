import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import Container from "@/components/common/Container";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import ThemeToggle from "@/components/common/ThemeToggle";
import { NAV_LINKS } from "@/constants";

const Header = async () => {
  const t = await getTranslations("Header");

  return (
    <header className="bg-sidebar">
      <Container className="flex items-center justify-between pb-6 pt-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/img/logo-icon.png" alt="" width={192} height={192} loading="eager" className="size-10" />
          <span className="text-lg font-bold text-primary">Growth Space</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.key} href={link.href} className="text-base font-semibold text-primary hover:opacity-80">
              {t(`nav.${link.key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
};

export default Header;
