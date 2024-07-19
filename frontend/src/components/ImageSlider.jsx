import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination } from 'swiper';

SwiperCore.use([Autoplay, Pagination]);

function ImageSlider() {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      className='mySwiper'
    >
      <SwiperSlide>
        <img
          src='https://source.unsplash.com/random/1600x900?1'
          alt='slide 1'
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src='https://source.unsplash.com/random/1600x900?2'
          alt='slide 2'
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src='https://source.unsplash.com/random/1600x900?3'
          alt='slide 3'
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src='https://source.unsplash.com/random/1600x900?4'
          alt='slide 4'
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default ImageSlider;
