import React, {useEffect, useState} from 'react';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import MypageRoute from "./MypageRoute";
import axios from "axios";
function MypageForm(props) {
    const [u_name,setU_name]=useState('');
    const [userDto, setUserDto]=useState({});
    const [u_num,setU_num]=useState(1);

    const myPageHome=()=>{
        let myPageHomeUrl=process.env.REACT_APP_URL+"/mypage/home";
        axios.get(myPageHomeUrl)
            .then(res=>{
                alert('성공');
            })
    }

    // useEffect(()=>{
    //     myPageHome();
    // },[])


    const userByName=()=>{
        setU_name(sessionStorage["u_name"]);
        console.log("u_name="+u_name);
        let userByNameUrl=process.env.REACT_APP_URL+"/mypage/userbyname?u_name="+u_name;
        axios.get(userByNameUrl)
            .then(res=>{
                alert("성공");
                console.dir(res);
            })
    }

    const userByNum=()=>{
        let userByNumUrl=process.env.REACT_APP_URL+"/mypage/userbynum?u_num="+u_num;
        axios.get(userByNumUrl)
            .then(res=>{
                alert("성공");
                setUserDto(res.data);
            })
    }

    const upd=()=>{
        let updUrl=process.env.REACT_APP_URL+"/user/update";
        axios.post(updUrl)
            .then(res=>alert("업데이트 완료"))
    }
    useEffect(()=>{
        upd();
    },[])
    // useEffect(()=>{
    //     userByNum();
    // },[])
    return (
        <div>
            <h1>마이페이지 폼</h1>
            {
                userDto &&
                <h1>{userDto.u_name}</h1>
            }
            <h1>ㅎㅇ</h1>
            <MypageRoute/>
        </div>
    );
}

export default MypageForm;