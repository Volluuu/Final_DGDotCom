import React from 'react';

function Home(props) {
    sessionStorage.u_name="사용자명";
    localStorage.url=process.env.REACT_APP_URL;
    //http://localhost:9003
    return (
        <div>
            <h1>홈(메인)</h1>
            <br/>
            <h3>세션 : u_name / 로컬 : url</h3>
        </div>
    );
}

export default Home;