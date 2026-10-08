import CreatePasswordForm from "./_components/CreatePasswordForm";

const CreatePasswordPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { gsCode } = await searchParams;

  return <CreatePasswordForm gsCode={Array.isArray(gsCode) ? (gsCode[0] ?? "") : (gsCode ?? "")} />;
};

export default CreatePasswordPage;
