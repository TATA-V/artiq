import DefaultLayout from 'src/components/provider/DefaultLayout';

interface Props {
  children: React.ReactNode;
}

function DashboardLayout({ children }: Props) {
  return (
    <DefaultLayout>
      {children}
    </DefaultLayout>
  );
}

export default DashboardLayout;
