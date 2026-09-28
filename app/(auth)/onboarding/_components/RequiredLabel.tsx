const RequiredLabel = ({ children }: { children: string }) => (
  <>
    {children}
    <span className="text-red-500">*</span>
  </>
);

export default RequiredLabel;
