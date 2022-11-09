import React, {useState} from 'react';
import {Route, Routes, useParams} from "react-router-dom";
import MypageMenu from "./MypageMenu";
import MypageOrder from "./MypageOrder";
import MypageBasket from "./MypageBasket";
import MypageProfile from "./MypageProfile";
import MypageForm from "./MypageForm";
import "./MypageCss.css";
import MypageOrderList from "./MypageOrderList";

function MypageRoute(props) {
    const {path}=useParams();

    return (
        <div className="container my lg" data-v-39b2348a="">
            <div data-v-39b2348a="">
                <MypageMenu/>
            </div>
            {
                path==="all" &&
                <MypageForm/>
            }
            {
                path==="order" &&
                <MypageOrder/>
            }
            {
                path==="basket" &&
                <MypageBasket/>
            }
            {
                path==="profile" &&
                <MypageProfile/>
            }
        </div>
    );
}

export default MypageRoute;