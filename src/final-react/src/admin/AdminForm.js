import React from 'react';
import { ResponsivePie} from "@nivo/pie";
import './admin.css';



function AdminForm(props) {


    return (
        <div id='wrapper'>
            {/*사이드바 시작*/}
            <ul className='navbar-nav sidebar sidebar-dark accordion' id='accordionSidebar' style={{backgroundColor: '#38B6FF'}}>
                {/* 로고*/}
                <a className='sidebar-brand d-flex align-items-center justify-content-center' href='./admin'>
                    <img alt='#' src='logo192.png' style={{ width: '80px',height:'80px'}}/>
                </a>

                {/*로고 아래*/}
                <hr className='sidebar-divider my-0'/>

                {/*사이드바 메뉴*/}
                <div className="sidebar-heading">
                    Menu
                </div>

                <li className='nav-item active'>
                    <a className='nav-link' href='./admin/UserInfo' data-target="#collapseTwo"
                       aria-expanded="true" aria-controls="collapseTwo">
                    {/*회원관리 아이콘 넣기~!~!!~!!~~!*/}
                        <span>회원관리</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="./admin/AdProduct" data-target="#collapseUtilities"
                       aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fa-solid fa-mug-hot"></i>
                        <span>상품관리</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="./admin/Shipping" data-target="#collapseUtilities"
                       aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fa-solid fa-bowl-food"></i>
                        <span>배송관리</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="./admin/Cs" data-target="#collapseUtilities"
                       aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fa-solid fa-bowl-food"></i>
                        <span>고객센터</span>
                    </a>
                </li>
            </ul>
            {/*사이드바 끝*/}



        </div>
    );
}

export default AdminForm;