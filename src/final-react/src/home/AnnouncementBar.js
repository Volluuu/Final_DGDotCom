import React from "react";
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";

// import required modules
import {Autoplay} from "swiper";

export default function AnnouncementBar() {
    return (
        <>
            <Swiper
                style={{height:"30px"}}
                direction={"vertical"}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay               : 5000,
                    disableOnInteraction: true,
                }}
                modules={[Autoplay]} className="mySwiper">
                <SwiperSlide style={{
                    color:"white",
                    backgroundColor:"black",
                    height:"30px",
                    width:"100%",
                }}>공지사항11111111111111111111111111111111</SwiperSlide>
                <SwiperSlide style={{
                    color:"white",
                    backgroundColor:"black",
                    height:"30px",
                    width:"100%"
                }}>공지사항22222222222222222222222222222222</SwiperSlide>
                <SwiperSlide style={{
                    color:"white",
                    backgroundColor:"black",
                    height:"30px",
                    width:"100%"
                }}>공지사항33333333333333333333333333333333</SwiperSlide>
                <SwiperSlide style={{
                    color:"white",
                    backgroundColor:"black",
                    height:"30px",
                    width:"100%"
                }}>공지사항44444444444444444444444444444444</SwiperSlide>
            </Swiper>
        </>
    );
}
