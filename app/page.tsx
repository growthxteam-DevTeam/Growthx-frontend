import OnboardingWizard from "./(auth)/onboarding/_components/OnboardingWizard";
import AnnouncementBanner from "@/components/common/AnnouncementBanner";
import Header from "@/components/common/Header";
import { ANNOUNCEMENT_MESSAGE } from "@/constants";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBanner message={ANNOUNCEMENT_MESSAGE} />
      <Header />
      <main className="flex-1">
        <OnboardingWizard />
      </main>
    </div>
  );
}
