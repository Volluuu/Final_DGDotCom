import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";

function Menu(props) {
    const [u_name, setU_name] = useState('');
    useEffect(() => {
        setU_name(sessionStorage.u_name);
    }, [])

    return (
        <ul className={'menu'}>
            <li>
                <NavLink to={"/"}>홈(메인)</NavLink>
            </li>
            <li>
                <NavLink to={"/user/login"}>로그인</NavLink>
            </li>
            <li>
                <NavLink to={"/user/signup"}>회원가입</NavLink>
            </li>
            <li>
                <NavLink to={"/product/list"}>상품 리스트</NavLink>
            </li>
            <li>
                <NavLink to={"/product/detail/1703"}>상품 상세</NavLink>
            </li>
            <li>
                <NavLink to={"/admin"}>관리자페이지</NavLink>
            </li>
            <li>
                <NavLink to={"/mypage"}>마이페이지</NavLink>
            </li>
            <span>[{u_name}]님</span>
            {/*<button type={'button'} onClick={()=>{*/}
            {/*    sessionStorage.removeItem("u_name");*/}
            {/*    sessionStorage.u_name="세션이름 바꾸기";*/}
            {/*}}>세션 u_name 바꾸기</button>*/}
            {/* 세션 바꿔도 바로 안 바뀜 */}
        </ul>

    );
}

export default Menu;