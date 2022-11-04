import React from 'react';
import {NavLink} from "react-router-dom";

function MypageMenu(props) {
    return (
            <ul className={'menu'}>
                <li>
                    <NavLink to={"/mypage"}>마이페이지</NavLink>
                </li>
                <li>
                    <NavLink to={"/mypage/order"}>주문 내역</NavLink>
                </li>
                <li>
                    <NavLink to={"/mypage/basket"}>장바구니</NavLink>
                </li>
                <li>
                    <NavLink to={"/mypage/profile"}>내 프로필</NavLink>
                </li>
            </ul>
    );
}

export default MypageMenu;