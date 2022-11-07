import React, {useState} from 'react';
import {Link, NavLink, useParams} from "react-router-dom";

function MypageMenu(props) {
    const {path} = useParams();

    return (
        <div data-v-39b2348a="" className="snb_area"><Link data-v-39b2348a="" to="/mypage/all"
                                                        className="nuxt-link-exact-active nuxt-link-active"
                                                        aria-current="page"><h2 data-v-39b2348a=""
                                                                                className="snb_main_title">마이
            페이지</h2></Link>
            <nav data-v-7bcac446="" data-v-39b2348a="" className="snb">
                <div data-v-7bcac446="" className="snb_list"><strong data-v-7bcac446=""
                                                                     className="snb_title">쇼핑
                    정보</strong>
                    <ul data-v-4d11470e="" data-v-7bcac446="" className="snb_menu">
                        <li data-v-4d11470e="" className="menu_item"><Link data-v-4d11470e="" to="/mypage/order"
                                                                        className="menu_link"
                                                                        style={{color: path === "order" ? "#0A58CA" : ""}}> 주문
                            내역 </Link>
                        </li>
                        <li data-v-4d11470e="" className="menu_item"><a data-v-4d11470e=""
                                                                        href="/mypage/basket"
                                                                        className="menu_link"
                                                                        style={{color: path === "basket" ? "#0A58CA" : ""}}> 장바구니 </a>
                        </li>
                    </ul>
                </div>
                <div data-v-7bcac446="" className="snb_list"><strong data-v-7bcac446=""
                                                                     className="snb_title">내
                    정보</strong>
                    <ul data-v-4d11470e="" data-v-7bcac446="" className="snb_menu">
                        <li data-v-4d11470e="" className="menu_item"><a data-v-4d11470e=""
                                                                        href="/mypage/profile"
                                                                        className="menu_link"
                                                                        style={{color: path === "profile" ? "#0A58CA" : ""}}> 프로필
                            정보 </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
        ;
}

export default MypageMenu;