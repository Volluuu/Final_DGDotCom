import React from 'react';
import EventBanner from "./EventBanner";
import BannerSwiper from "./BannerSwiper";
import AnnouncementBar from "./AnnouncementBar";

function Home(props) {
    localStorage.url = process.env.REACT_APP_URL;
    return (
        <div>
            <AnnouncementBar/>
            <BannerSwiper/>
            <EventBanner type={"first"}/>
            <EventBanner type={"second"}/>
            <EventBanner type={"third"}/>
        </div>
    );
}

export default Home;