import Cards from 'src/components/Main/AuctionCards';
import Carousel from 'src/components/Main/Carousel';
import DefaultLayout from 'src/components/provider/DefaultLayout';

function MainPage() {
  return (
    <>
      <Carousel />
      <DefaultLayout>
        <div className="py-8 text-[2rem] font-medium">
          test
        </div>
        <Cards />
      </DefaultLayout>
    </>
  );
}

export default MainPage;
