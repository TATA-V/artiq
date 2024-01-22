interface Props {
  children: React.ReactNode;
}

function ProfileLayout({ children }: Props) {
  return (
    <>
      {children}
    </>
  );
}

export default ProfileLayout;
