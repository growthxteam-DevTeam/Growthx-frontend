import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-white px-6 text-center">
      <h1 className="text-6xl font-bold text-[#00425f]">404</h1>
      <p className="text-lg font-semibold text-gray-900">{t("title")}</p>
      <p className="max-w-sm text-sm text-gray-500">{t("description")}</p>

      <Link href="/">
        <Button className="mt-4 cursor-pointer bg-primary text-white hover:bg-blue-700">{t("back")}</Button>
      </Link>
    </div>
  );
}
