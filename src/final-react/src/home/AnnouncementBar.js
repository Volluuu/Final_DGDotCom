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
                    letterSpacing:"2px"
                }}>공지사항 : 네이버 로그인 개인정보방침 관련으로 인해 지원 중단</SwiperSlide>
                <SwiperSlide style={{
                    color:"white",
                    backgroundColor:"black",
                    height:"30px",
                    width:"100%",
                    letterSpacing:"2px"

                }}>공지사항 : 12월 9일 강남구청 자바 3기 수료</SwiperSlide>
                <SwiperSlide style={{
                    color:"white",
                    backgroundColor:"black",
                    height:"30px",
                    width:"100%",
                    letterSpacing:"2px"
                }}>공지사항 : 1조 프로젝트 많은 관심과 응원 부탁드립니다.</SwiperSlide>
                <SwiperSlide style={{
                    color:"white",
                    backgroundColor:"black",
                    height:"30px",
                    width:"100%",
                    letterSpacing:"2px"
                }}>공지사항 : 12월 9일(금) ~ 12월 12(월) 수료식으로 인해 배송 지연</SwiperSlide>
            </Swiper>
        </>
    );
}
