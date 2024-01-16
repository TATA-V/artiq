'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import styled from 'styled-components';

function Carousel() {
  return (
    <CarouselBlock>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
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
            <div className="h-[450px] bg-black300 w-full">Slide {idx + 1}</div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-next" />
        <div className="swiper-button-prev" />
      </Swiper>
    </CarouselBlock>
  );
}

export default Carousel;

const CarouselBlock = styled.div`
  .swiper-button-next::after,
  .swiper-button-prev::after {
    opacity: 0;
  }
  height: 450px;
  margin-top: 8px;
  border-radius: 7.5px;
  overflow: hidden;
  width: 100%;
`;
