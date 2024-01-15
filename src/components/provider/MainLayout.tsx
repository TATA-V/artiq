interface Props {
  children: React.ReactNode;
}

function MainLayout({ children } : Props) {
  return (
    <div className="flex justify-center">
      <div className="w-[1024px] px-6 min-h-[80vh]">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
