import React from "react";
import Menu from "./home/menu";
import {Route, Routes, useLocation} from "react-router-dom";
import Home from "./home/Home";
import LoginForm from "./user/LoginForm";
import SignupForm from "./user/SignupForm";
import ProductList from "./productlist/ProductList";
import ProductDetail from "./productdetail/ProductDetail";
import DashBoard from "./admin/DashBoard";
import MypageRoute from "./mypage/MypageRoute";
import UserInfo from "./admin/UserInfo";
import AdProduct from "./admin/AdProduct";
import Cs from "./admin/Cs";
import MypageOrder from "./mypage/MypageOrder";
import Banner from "./admin/Banner";

function RouteMain(props) {
  return (
     <div>
      {/*<Menu />*/}
     {/* <br style={{ clear: "both" }} />
      <br />*/}
      <Routes>
        {/* 홈 */}
        <Route path={"/"} element={
            <>
                <Menu/>
                <Home/>
            </>
            } />
        {/* 로그인 및 회원가입 */}
        <Route path={"/user"}>
          <Route path={"login"} element={
              <React.Fragment>
                  <Menu/>
              <LoginForm/>
              </React.Fragment>
          } />
          <Route path={"signup"} element={
              <React.Fragment>
                  <Menu/>
              <SignupForm />
              </React.Fragment>
          }/>
        </Route>

        {/* 상품 관련 (리스트, 상세페이지)*/}
        <Route path={"/product"}>
          <Route path={"list/:currentPage"} element={
            <React.Fragment>
                  <Menu/>
              <ProductList/>
            </React.Fragment>
          }/>
          <Route path={"detail/:p_num"} element={
              <React.Fragment>
                  <Menu/>
                  <ProductDetail />
              </React.Fragment>
          }/>
        </Route>


        {/* 관리자 페이지 */}
        <Route path={"/admin"}>
          <Route path={"DashBoard"} element={<DashBoard/>}/>
          <Route path={"UserInfo"} element={<UserInfo/>}/>
          <Route path={"AdProduct"} element={<AdProduct/>}/>
          <Route path={"Shipping"} element={<AdProduct/>}/>
          <Route path={"Cs"} element={<Cs/>}/>
          <Route path={"Banner"} element={<Banner/>}/>
        </Route>

        {/* 마이 페이지 이중 라우터 */}
        <Route path={"/mypage"}>
            <Route path={":path"} element={
                <React.Fragment>
                    <Menu/>
                <MypageRoute/>
                </React.Fragment>
            }>
                <Route path={":currentPage"} element={
                    <React.Fragment>
                        <Menu/>
                    <MypageRoute/>
                    </React.Fragment>
                }/>
            </Route>
        </Route>

        {/* 잘못된 주소*/}
        <Route
          path={"*"}
          element={
            <div>
              <img alt={""} src={"404.png"} style={{ width: "800px" }} />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default RouteMain;
