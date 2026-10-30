import AccountSection from "./_components/AccountSection";
import DataConsentSection from "./_components/DataConsentSection";
import LearningProgress from "./_components/LearningProgress";
import PreferencesSection from "./_components/PreferencesSection";
import PrivacySection from "./_components/PrivacySection";
import ProfileHeader from "./_components/ProfileHeader";
import ProfileSummary from "./_components/ProfileSummary";

const ProfilePage = () => (
  <div className="mx-auto flex max-w-6xl flex-col gap-6">
    <ProfileHeader />

    <div className="mx-auto flex w-full max-w-lg flex-col gap-5 pb-10">
      <ProfileSummary />
      <LearningProgress />
      <PreferencesSection />
      <DataConsentSection />
      <AccountSection />
      <PrivacySection />
    </div>
  </div>
);

export default ProfilePage;
