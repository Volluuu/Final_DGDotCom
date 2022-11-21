import React from "react";
import Menu from "./home/menu";
import {Route, Routes, useLocation} from "react-router-dom";
import Home from "./home/Home";
import LoginForm from "./user/LoginForm";
import SignupForm from "./user/SignupForm";
import ProductList from "./productlist/ProductList";
import ProductDetail from "./productdetail/ProductDetail";
import MypageRoute from "./mypage/MypageRoute";
import AdminRoute from "./admin/AdminRoute";
import Footer from "./home/Footer";
import AddressApi from "./mypage/AddressApi";
import AuthTimer from "./user/AuthTimer";
import KakaoLogin from "./user/KakaoLogin";
import FindEmail from "./user/FindEmail";
import FindPass from "./user/FindPass";
import NaverLogin from "./user/NaverLogin";

function RouteMain(props) {
    return (
        <div>
            {sessionStorage.loginok === "yes" ? <AuthTimer/> : ""}

            {/*<Menu />*/}
            {/* <br style={{ clear: "both" }} />
      <br />*/}
            <Routes>
                {/* 홈 */}
                <Route
                    path={"/"}
                    element={
                        <React.Fragment>
                            <Menu/>
                            <Home/>
                            <Footer/>
                        </React.Fragment>
                    }
                />
                {/* 카카오 로그인 */}
                <Route path={"/kakaoLogin"} element={<KakaoLogin/>}/>
                {/* 네이버 로그인 */}
                <Route path={"/naverLogin"} element={<NaverLogin/>}/>
                {/* 로그인 및 회원가입 */}
                <Route path={"/user"}>
                    <Route
                        path={"login"}
                        element={
                            <React.Fragment>
                                <Menu/>
                                <LoginForm/>
                            </React.Fragment>
                        }
                    />
                    <Route
                        path={"signup"}
                        element={
                            <React.Fragment>
                                <Menu/>
                                <SignupForm/>
                            </React.Fragment>
                        }
                    />
                    <Route
                        path={"find_email"}
                        element={
                            <React.Fragment>
                                <Menu/>
                                <FindEmail/>
                            </React.Fragment>
                        }/>
                    <Route
                        path={"find_password"}
                        element={
                            <React.Fragment>
                                <Menu/>
                                <FindPass/>
                            </React.Fragment>
                        }/>
                </Route>

                {/* 상품 관련 (리스트, 상세페이지)*/}
                <Route path={"/product"}>
                    {/* <Route path={"list/:currentPage"} element={ */}
                    <Route
                        path={"list"}
                        element={
                            <React.Fragment>
                                <Menu/>
                                <ProductList/>
                            </React.Fragment>
                        }
                    />
                    <Route
                        path={"detail/:p_num"}
                        element={
                            <React.Fragment>
                                <Menu/>
                                <ProductDetail/>
                            </React.Fragment>
                        }
                    />
                </Route>

                {/* 관리자 페이지 */}
                <Route path={"/admin"}>
                    <Route
                        path={":path"}
                        element={
                            <React.Fragment>
                                <AdminRoute/>
                            </React.Fragment>
                        }
                    >
                        <Route
                            path={":currentPage"}
                            element={
                                <React.Fragment>
                                    <AdminRoute/>
                                </React.Fragment>
                            }
                        />
                    </Route>
                </Route>

                {/* 마이 페이지 이중 라우터 */}
                <Route path={"/mypage"}>
                    <Route
                        path={":path"}
                        element={
                            <React.Fragment>
                                <Menu/>
                                <MypageRoute/>
                            </React.Fragment>
                        }
                    >
                        <Route
                            path={":currentPage"}
                            element={
                                <React.Fragment>
                                    <Menu/>
                                    <MypageRoute/>
                                </React.Fragment>
                            }
                        />
                    </Route>
                    <Route path={"AddressApi"} element={<AddressApi/>}></Route>
                </Route>


                {/* 잘못된 주소*/}
                <Route
                    path={"*"}
                    element={
                        <div>
                            <img alt={""} src={"404.png"} style={{width: "800px"}}/>
                        </div>
                    }
                />
            </Routes>
        </div>
    );
}

export default RouteMain;
