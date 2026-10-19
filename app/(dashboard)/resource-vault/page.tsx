import ResourceVaultFeed from "./_components/ResourceVaultFeed";
import ResourceVaultHeader from "./_components/ResourceVaultHeader";

const ResourceVaultPage = () => (
  <div className="mx-auto flex max-w-6xl flex-col gap-6">
    <ResourceVaultHeader />

    <div className="min-h-[640px] rounded-2xl bg-tint-soft p-6">
      <ResourceVaultFeed />
    </div>
  </div>
);

export default ResourceVaultPage;
