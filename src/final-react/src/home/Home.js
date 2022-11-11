import React from 'react';
import EventBanner from "./EventBanner";

function Home(props) {
    localStorage.url = process.env.REACT_APP_URL;
    //http://localhost:9003
    return (
        <div>
            <EventBanner/>
            <EventBanner/>
            <EventBanner/>
        </div>
    );
}

export default Home;