import React, {useRef, useState} from "react";
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";

// import required modules
import {Autoplay, Navigation, Pagination} from "swiper";

export default function BannerSwiper() {
    return (
        <>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#222",
                    "--swiper-pagination-color": "red"
                }}
                navigation={true}
                pagination={{clickable: true}}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay               : 3500,
                    disableOnInteraction: false,
                }}
                modules={[Navigation, Pagination, Autoplay]} className="mySwiper">
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
        </>
    );
}
