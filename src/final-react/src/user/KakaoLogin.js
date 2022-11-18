import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {REDIRECT_URI, REST_API_KEY} from "./kakaoLoginData";

function KakaoLogin(props) {
    const location = useLocation();
    const navi = useNavigate();
    const KAKAO_CODE = location.search.split("=")[1];

    const getKakaoToken = () => {
        axios({
            method: "POST",
            url: "https://kauth.kakao.com/oauth/token",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                "grant_type": "authorization_code",
                "client_id": `${REST_API_KEY}`,
                "redirect_uri": `${REDIRECT_URI}`,
                "code": `${KAKAO_CODE}`,
            }
        })
            .then(res => {
                console.dir(res.data);
                getKakaoUserInfo(res.data.access_token);
                // if (res.data.access_token) {
                //     localStorage.setItem("accessToken", res.data.access_token);
                //     localStorage.setItem("refreshToken", res.data.access_token);
                // } else {
                //     navi("/");
                // }
            })
    }

    const getKakaoUserInfo = (accessToken) => {
        let getInfoUrl = "https://kapi.kakao.com/v2/user/me";
        axios({
            method: 'POST',
            url: getInfoUrl,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-type': "application/x-www-form-urlencoded;charset=utf-8"
            },
        }).then(res => {
            console.dir(res.data);
        })
    }

    useEffect(() => {
        if (!location.search) return;
        getKakaoToken();
    }, []);


    return (
        <div>
            Kakao Login
        </div>
    );
}

export default KakaoLogin;