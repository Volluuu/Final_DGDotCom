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
                    "--swiper-pagination-color": "black",
                    height:"auto",
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
                <SwiperSlide>
                    <img
                        src="https://kream-phinf.pstatic.net/MjAyMjExMzBfMTcy/MDAxNjY5Nzc2NjUwMjE1.lqwCkD1RiAci3dwMa1jZU_FietiberaL09O8xVq1kswg.b9Tf_wjeeEkLZxsay6LnMngJ4s9hS_bdUeuxtskxYQIg.JPEG/a_785a59d8b7ee4721ad9eabade6702206.jpg?type=m_2560"
                        alt=""/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://kream-phinf.pstatic.net/MjAyMjExMjlfMjM1/MDAxNjY5NzA3NDc2MTcy.1V3FVxMTaVKL7l8FozSRwXevqWxJV251MX7RFAnx2ucg.RrXoPAmoIuIfcr1K1h6gQso9mv2MBe8SBuukWJCPWCgg.JPEG/a_674e561f5097495db0038f8e04f8df0e.jpg?type=m_2560" alt=""/>
                </SwiperSlide>
                <SwiperSlide style={{backgroundColor:"#333333"}}>
                    <img src="https://kream-phinf.pstatic.net/MjAyMjEyMDFfMTk4/MDAxNjY5ODc3NzAxMDg2.pdrfAxzlw8Mh4VkSJ1GDBTEZtjALHrySLi7CZ-0Te3Yg.I7dtBiwRcaYirB0nxocA2183I0wKXVWbckLiDKcfyn4g.JPEG/a_28425514133d44a5b7449fdcf4527464.jpg?type=m_2560" alt=""
                        style={{height:"549.39px", width:"auto",}}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://kream-phinf.pstatic.net/MjAyMjExMzBfMjE5/MDAxNjY5Nzk5MjM4MTM2.Y_z9l8TV2p8jt0gD2I7yM9S9FIjBcCMrQKOPlYE4fQkg.3G40QWMarkpxXCz0FMaR3z5oijOSplNWPhiafNVZYzQg.JPEG/a_34a77d6f99b04fe8959746609e72e07f.jpg?type=m_2560" alt=""/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://kream-phinf.pstatic.net/MjAyMjEyMDJfOTIg/MDAxNjY5OTUwOTgyMDUy.xSMnckFSTqOg1MIJLBDn3CY5aQcHEzrofE8VVKmaATsg.3cLuAWxeXUXKKHB21oKBYEC4V3wa59FVpItisxuFqf8g.JPEG/a_6fc775cbdaab495a8328627191d5adbe.jpg?type=m_2560" alt=""/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://kream-phinf.pstatic.net/MjAyMjEyMDVfMjky/MDAxNjcwMjEwMjE0OTk4.jETNCw53N1ZBkcRaFCaE18X95uO80nEjRbAEFQKa0AIg.qPrK_DRXthWjIqyi9aIxr7X7i3Txmfbv1wPRxwp2b1wg.JPEG/a_d2746750015840a89b608c3a66c58521.jpg?type=m_2560" alt=""/>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
