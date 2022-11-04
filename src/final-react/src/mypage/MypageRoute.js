import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../home/Home";
import LoginForm from "../user/LoginForm";
import SignupForm from "../user/SignupForm";
import ProductList from "../productlist/ProductList";
import ProductDetail from "../productdetail/ProductDetail";
import AdminForm from "../admin/AdminForm";
import MypageForm from "./MypageForm";
import MypageMenu from "./MypageMenu";
import MypageOrder from "./MypageOrder";
import MypageBasket from "./MypageBasket";
import MypageProfile from "./MypageProfile";

function MypageRoute(props) {
    return (
        <div>
            <MypageMenu/>
            <Routes>
                <Route path={"order"} element={<MypageOrder/>}/>
                <Route exact path={"basket"} element={<MypageBasket/>}/>
                <Route exact path={"profile"} element={<MypageProfile/>}/>
            </Routes>
        </div>
    );
}

export default MypageRoute;