import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";

// import required modules
import { Autoplay } from "swiper";

export default function AnnouncementBar() {
  return (
    <>
      <Swiper
        style={{ height: "30px" }}
        direction={"vertical"}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide
          style={{
            color: "white",
            backgroundColor: "black",
            height: "30px",
            width: "100%",
            letterSpacing: "2px",
          }}
        >
          공지사항 : 네이버 로그인 개인정보방침 관련으로 인해 지원 중단
        </SwiperSlide>
        <SwiperSlide
          style={{
            color: "white",
            backgroundColor: "black",
            height: "30px",
            width: "100%",
            letterSpacing: "2px",
          }}
        >
          공지사항 : 개인정보처리방침 개정 내용 사전 안내 (12/9~)
        </SwiperSlide>
        <SwiperSlide
          style={{
            color: "white",
            backgroundColor: "black",
            height: "30px",
            width: "100%",
            letterSpacing: "2px",
          }}
        >
          공지사항 : DG.com 스토어 이용 약관 일부 개정 안내(12/6~)
        </SwiperSlide>
        <SwiperSlide
          style={{
            color: "white",
            backgroundColor: "black",
            height: "30px",
            width: "100%",
            letterSpacing: "2px",
          }}
        >
          공지사항 : 12월 9일(금) ~ 12월 12(월) 배송사 파업으로 인해 배송 지연
        </SwiperSlide>
      </Swiper>
    </>
  );
}
