import React from 'react';
// import { ResponsivePie} from "@nivo/pie";
import './admin.css';


function DashBoard(props) {


    return (
        <div id='wrapper'>
            {/*사이드바 시작, 사이드바 색깔 변경가능*/}
            <ul className='navbar-nav sidebar sidebar-dark accordion' id='accordionSidebar'
                style={{backgroundColor: 'mediumpurple'}}>
                {/* 로고*/}
                <a className='sidebar-brand d-flex align-items-center justify-content-center' href='./admin'>
                    <img alt='#' src='logo192.png' style={{width: '80px', height: '80px'}}/>
                </a>

                {/*로고 아래*/}
                <hr className='sidebar-divider my-0'/>

                {/*사이드바 메뉴*/}
                <div className="sidebar-heading" style={{fontSize: '24px'}}>
                    Menu
                </div>

                <li className='nav-item active'>
                    <a className='nav-link' href='./UserInfo' data-target="#collapseTwo"
                       aria-expanded="true" aria-controls="collapseTwo">
                        {/*회원관리 아이콘 넣기~!~!!~!!~~!*/}
                        <span>회원관리</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="./AdProduct" data-target="#collapseUtilities"
                       aria-expanded="true" aria-controls="collapseUtilities">
                        {/*상품관리 아이콘 넣기~!~!!~!!~~!*/}
                        <span>상품관리</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="./Shipping" data-target="#collapseUtilities"
                       aria-expanded="true" aria-controls="collapseUtilities">
                        {/*배송관리 아이콘 넣기~!~!!~!!~~!*/}
                        <span>배송관리</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="./Cs" data-target="#collapseUtilities"
                       aria-expanded="true" aria-controls="collapseUtilities">
                        {/*고객센터 아이콘 넣기~!~!!~!!~~!*/}
                        <span>고객센터</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="./Banner" data-target="#collapseUtilities"
                       aria-expanded="true" aria-controls="collapseUtilities">
                        {/*배너관리 아이콘 넣기~!~!!~!!~~!*/}
                        <span>배너관리</span>
                    </a>
                </li>
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
                                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa-solid fa-address-card"></i>&nbsp;
                                    <span className="mr-2 d-none d-lg-inline large"
                                          style={{color: 'white'}}>관리자</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <br/>

                    {/*대쉬보드 카드 시작*/}
                    <div className='container-fluid'>
                        <div className='row'>

                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-primary shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div
                                                    className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    총 회원 수
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">2459명</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fa-solid fa-user fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-success shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div
                                                    className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                    상품 수
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">1271개</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fa-solid fa-plane fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-info shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div
                                                    className="text-xs font-weight-bold text-info text-uppercase mb-1">오늘
                                                    작성된 리뷰
                                                </div>
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col-auto">
                                                        <div
                                                            className="h5 mb-0 mr-3 font-weight-bold text-gray-800">37개
                                                        </div>
                                                    </div>
                                                    <div className="col">

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fa-solid fa-comment-medical fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-warning shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div
                                                    className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                    새로운 문의사항
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">78개</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fa-solid fa-question fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>  {/*대쉬보드카드 끝*/}


                </div>
            </div>


        </div>
    );
}

export default DashBoard;