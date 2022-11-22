import React, { useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import MypageMenu from "./MypageMenu";
import MypageOrder from "./MypageOrder";
import MypageCart from "./MypageCart";
import MypageProfile from "./MypageProfile";
import MypageForm from "./MypageForm";
import "./MypageCss.css";
import MypageOrderDetail from "./MypageOrderDetail";

function MypageRoute(props) {
  const { path } = useParams();

  return (
    <div className="container my lg" data-v-39b2348a="">
      <div data-v-39b2348a="">
        <MypageMenu />
      </div>
      {path === "all" && <MypageForm />}
      {path === "order" && <MypageOrder />}
      {path === "cart" && <MypageCart />}
      {path === "profile" && <MypageProfile />}
      {path === "orderdetail" && <MypageOrderDetail />}
    </div>
  );
}

export default MypageRoute;
