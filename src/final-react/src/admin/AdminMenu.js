import React from 'react';
import DashBoard from "./DashBoard";
import UserInfo from "./UserInfo";
import AdProduct from "./AdProduct";
// import Cs from "./Cs";
// import Banner from "./Banner";
import {useParams} from "react-router-dom";
import logo from "../admin/logo192.png";
import InsertForm from "./insertForm";
import PupdateForm from "./PupdateForm";
import BeforeDelivery from "./BeforeDelivery";
import Delivering from "./Delivering";
import DeliveryComplete from "./DeliveryComplete";

function AdminMenu(props) {
    const {path}=useParams();
    return (
        <div>
            <div id='wrapper' style={{width:'100%'}}>
                {/*사이드바 시작, 사이드바 색깔 변경가능*/}
                <ul className='navbar-nav sidebar sidebar-dark accordion' id='accordionSidebar'
                    style={{backgroundColor: 'mediumpurple'}}>
                    {/* 로고*/}
                    <a className='sidebar-brand d-flex align-items-center justify-content-center' href='/'>
                        <img alt='#' src={logo} style={{width: '80px', height: '80px'}}/>
                    </a>

                    {/*로고 아래*/}
                    <hr className='sidebar-divider my-0'/>

                    {/*사이드바 메뉴*/}
                    <div className="sidebar-heading" style={{fontSize: '24px'}}>
                        Menu
                    </div>

                    <li className='nav-item active'>
                        <a className='nav-link' href='/admin/dashboard' data-target="#collapseTwo"
                           aria-expanded="true" aria-controls="collapseTwo">
                            {/*회원관리 아이콘 넣기~!~!!~!!~~!*/}
                            <span>대쉬보드</span>
                        </a>
                    </li>

                    <li className='nav-item active'>
                        <a className='nav-link' href='/admin/userinfo' data-target="#collapseTwo"
                           aria-expanded="true" aria-controls="collapseTwo">
                            {/*회원관리 아이콘 넣기~!~!!~!!~~!*/}
                            <span>회원관리</span>
                        </a>
                    </li>

                    <li className="nav-item active">
                        <a className="nav-link" href="/admin/adproduct" data-target="#collapseTwo"
                           aria-expanded="true" aria-controls="collapseTwo">
                            {/*상품관리 아이콘 넣기~!~!!~!!~~!*/}
                            <span>상품관리</span>
                        </a>
                    </li>

                    <li className="nav-item active">
                        <a className="nav-link collapsed" href="/admin/beforedelivery"
                           data-target="#collapseTwo"
                           aria-expanded="true" aria-controls="collapseTwo">
                            {/*배송관리 아이콘 넣기~!~!!~!!~~!*/}
                            <span>배송관리</span>
                        </a>
                        <div id='collapseTwo' className='collapse show' aria-labelledby='headingTwo'
                         style={{}}>
                            <div className='py-2 collapse-inner rounded'>
                                <a className='collapse-item' href='/admin/beforedelivery'
                                style={{color:'rightgray'}}>-배송전</a>
                                <a className='collapse-item' href='/admin/delivering'
                                   style={{color:'rightgray'}}>-배송중</a>
                                <a className='collapse-item' href='/admin/deliverycomplete'
                                   style={{color:'rightgray'}}>-배송완료</a>

                            </div>

                        </div>
                    </li>

                    {/*<li className="nav-item active">*/}
                    {/*    <a className="nav-link collapsed" href="/admin/banner" data-target="#collapseTwo"*/}
                    {/*       aria-expanded="true" aria-controls="collapseTwo">*/}
                    {/*        /!*배너관리 아이콘 넣기~!~!!~!!~~!*!/*/}
                    {/*        <span>배너관리</span>*/}
                    {/*    </a>*/}
                    {/*</li>*/}

                    {/*<li className="nav-item active">*/}
                    {/*    <a className="nav-link collapsed" href="/admin/cs" data-target="#collapseUtilities"*/}
                    {/*       aria-expanded="true" aria-controls="collapseUtilities">*/}
                    {/*        /!*고객센터 아이콘 넣기~!~!!~!!~~!*!/*/}
                    {/*        <span>고객센터</span>*/}
                    {/*    </a>*/}
                    {/*</li>*/}

                </ul>
                {/*사이드바 끝*/}

                {/*상단 바 시작, 상단 바 색깔을 nav태그에서 변경 가능*/}
                <div id='content-wrapper' className='d-flex flex-column'>
                    <div id='content'>
                        <nav className='navbar navbar-expand navbar-light topbar mb-4 static-top shadow'
                             style={{backgroundColor: 'mediumpurple'}}>

                            {/*상단 바 우측 관리자 이름 표시*/}
                            <ul className="navbar-nav ml-auto">
                                {/*관리자 이름 좌측 | 표시*/}
                                <div className="topbar-divider d-none d-sm-block"></div>

                                <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link dropdown-toggle" href="src/final-react/src/home/AdminForm#" id="userDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fa-solid fa-address-card"></i>&nbsp;
                                        <span className="mr-2 d-none d-lg-inline large"
                                              style={{color: 'white'}}>관리자</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <br/>
                        {
                            path==="dashboard" &&
                            <DashBoard/>
                        }

                        {
                            path==="userinfo" &&
                            <UserInfo/>
                        }
                        {
                            path==="adproduct" &&
                            <AdProduct/>
                        }
                        {
                            path==="insertform" &&
                            <InsertForm/>
                        }
                        {
                            path==="pupdateform" &&
                            <PupdateForm/>
                        }
                        {
                            path==="beforedelivery" &&
                            <BeforeDelivery/>
                        }
                        {
                            path==="delivering" &&
                            <Delivering/>
                        }
                        {
                            path==="deliverycomplete" &&
                            <DeliveryComplete/>
                        }

                        {/*{*/}
                        {/*    path==="cs" &&*/}
                        {/*    <Cs/>*/}
                        {/*}*/}
                        {/*{*/}
                        {/*    path==="banner" &&*/}
                        {/*    <Banner/>*/}
                        {/*}*/}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminMenu;