import React from 'react';
import EventBanner from "./EventBanner";
import BannerSwiper from "./BannerSwiper";
import AnnouncementBar from "./AnnouncementBar";

function Home(props) {
    localStorage.url = process.env.REACT_APP_URL;
    //http://localhost:9003
    return (
        <div>
            <AnnouncementBar/>
            <BannerSwiper/>
            <EventBanner/>
            <EventBanner/>
            <EventBanner/>
        </div>
    );
}

export default Home;