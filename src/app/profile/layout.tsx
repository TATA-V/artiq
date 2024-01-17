import DefaultLayout from 'src/components/provider/DefaultLayout';

interface Props {
  children: React.ReactNode;
}

function ProfileLayout({ children }: Props) {
  return (
    <DefaultLayout>
      {children}
    </DefaultLayout>
  );
}

export default ProfileLayout;
