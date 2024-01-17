import DefaultLayout from 'src/components/provider/DefaultLayout';

interface Props {
  children: React.ReactNode;
}

function ChatLayout({ children }: Props) {
  return (
    <DefaultLayout>
      {children}
    </DefaultLayout>
  );
}

export default ChatLayout;
