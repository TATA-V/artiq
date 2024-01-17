interface Props {
  children: React.ReactNode;
}

function DefaultLayout({ children } : Props) {
  return (
    <div className="flex justify-center">
      <div className="w-[1024px] px-6 min-h-[80vh]">
        {children}
      </div>
    </div>
  );
}

export default DefaultLayout;
