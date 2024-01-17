'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import styled from 'styled-components';
import 'swiper/swiper-bundle.css';

function Carousel() {
  return (
    <div className="flex justify-center">
      <CarouselBlock className="h-[250px] md:h-[430px] max-w-[976px]">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          loop
          autoplay={{ delay: 5000 }}
        >
          {[...Array(3)].map((_, idx) => (
            <SwiperSlide key={idx}>
              <div className="h-[450px] w-[976px] bg-black300">Slide {idx + 1}</div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-next" />
          <div className="swiper-button-prev" />
        </Swiper>
      </CarouselBlock>
    </div>
  );
}

export default Carousel;

const CarouselBlock = styled.div`
  .swiper-button-next::after,
  .swiper-button-prev::after {
    opacity: 0;
  }
  border-radius: 7.5px;
  overflow: hidden;
  margin: 0.5rem 1.5rem 0 1.5rem;
`;
