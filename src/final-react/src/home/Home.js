import React from 'react';

function Home(props) {
    sessionStorage.u_name = "이동건";
    sessionStorage.u_num=1;
    localStorage.url = process.env.REACT_APP_URL;
    //http://localhost:9003
    return (
        <div>
            <h1>홈(메인)</h1>
            <br/>
            <h3>세션 - u_name : 이동건 , u_num : 1<br/><br/>로컬 - url 주소</h3>
        </div>
    );
}

export default Home;