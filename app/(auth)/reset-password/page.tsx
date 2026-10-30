import ResetPasswordForm from "./_components/ResetPasswordForm";

const ResetPasswordPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { token } = await searchParams;

  return <ResetPasswordForm token={Array.isArray(token) ? (token[0] ?? "") : (token ?? "")} />;
};

export default ResetPasswordPage;
