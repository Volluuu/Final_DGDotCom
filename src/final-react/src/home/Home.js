import React from 'react';
import EventBanner from "./EventBanner";

function Home(props) {
    sessionStorage.u_name = "이동건";
    sessionStorage.u_num=1;
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