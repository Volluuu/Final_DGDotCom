import React from 'react';
import {Route, Routes, useParams} from "react-router-dom";
import MypageMenu from "./MypageMenu";
import MypageOrder from "./MypageOrder";
import MypageBasket from "./MypageBasket";
import MypageProfile from "./MypageProfile";
import MypageForm from "./MypageForm";
import "./MypageCss.css";

function MypageRoute(props) {
    const path=useParams();
    console.log(path);

    return (
        <div className="container my lg" data-v-39b2348a="">
            <div data-v-39b2348a="">
                <MypageMenu/>
            </div>
            {
                path.path==="all" &&
                <MypageForm/>
            }
            {
                path.path==="order" &&
                <MypageOrder/>
            }
            {
                path.path==="basket" &&
                <MypageBasket/>
            }
            {
                path.path==="profile" &&
                <MypageProfile/>
            }
            <Routes>
                <Route path={"all"} element={<MypageForm/>}/>
                <Route path={"order"} element={<MypageOrder/>}/>
                <Route exact path={"basket"} element={<MypageBasket/>}/>
                <Route exact path={"profile"} element={<MypageProfile/>}/>
            </Routes>
        </div>
    );
}

export default MypageRoute;