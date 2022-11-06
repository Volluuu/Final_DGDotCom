import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import MypageOrderList from "./MypageOrderList";

function MypageOrder(props) {
    const {currentPage}=useParams(); // currentPage 값 받아오기
    const [u_num, setU_num] = useState(sessionStorage.u_num); // 세션의 u_num으로 초기값 설정
    const [tradeData, setTradeData]=useState({}); // 페이징 처리할 모든 데이터 담기
    const productUrl=localStorage.url+"/product/";

    // u_num 을 가진 거래내역 페이징 처리
    const getOrderList=()=>{
        let orderListUrl=process.env.REACT_APP_URL+"/mypage/orderlist?u_num="+u_num+"&currentPage="+(currentPage===undefined?1:currentPage);
        axios.get(orderListUrl)
            .then(res=>{
                setTradeData(res.data);
            })
    }

    useEffect(()=>{
        getOrderList();
    },[currentPage])

    return (
        <div data-v-39b2348a="" className="content_area">
            <div className="my_purchase">
                <div data-v-88eb18f6="" className="content_title">
                    <div data-v-88eb18f6="" className="title"><h3 data-v-88eb18f6="">주문 내역<span style={{fontSize:"0.6em"}}>{tradeData.u_name} 님의 주문내역을 한 눈에 볼 수 있습니다!</span></h3>
                    </div>
                    </div>
                <div data-v-0c307fea="" className="purchase_list_tab sell detail_tab">
                    {/*<div data-v-0c307fea="" className="tab_item total"><a data-v-0c307fea="" href="#"*/}
                    {/*                                                      className="tab_link">*/}
                    {/*    <dl data-v-0c307fea="" className="tab_box">*/}
                    {/*        <dt data-v-0c307fea="" className="title">전체</dt>*/}
                    {/*        <dd data-v-0c307fea="" className="count">0</dd>*/}
                    {/*    </dl>*/}
                    {/*</a></div>*/}
                    <div data-v-0c307fea="" className="tab_item tab_on"><a data-v-0c307fea="" href="#"
                                                                           className="tab_link">
                        <dl data-v-0c307fea="" className="tab_box">
                            <dt data-v-0c307fea="" className="title">총 결제 금액</dt>
                            <dd data-v-0c307fea="" className="count">{tradeData.totalPrice}원</dd>
                        </dl>
                    </a></div>
                    <div data-v-0c307fea="" className="tab_item"><a data-v-0c307fea="" href="#" className="tab_link">
                        <dl data-v-0c307fea="" className="tab_box">
                            <dt data-v-0c307fea="" className="title">총 결제 내역</dt>
                            <dd data-v-0c307fea="" className="count">{tradeData.totalCount}개</dd>
                            </dl>
                    </a></div>
                    <div data-v-0c307fea="" className="tab_item"><a data-v-0c307fea="" href="#" className="tab_link">
                        <dl data-v-0c307fea="" className="tab_box">
                            <dt data-v-0c307fea="" className="title">배송 전</dt>
                            <dd data-v-0c307fea="" className="count">{tradeData.beforeShip}</dd>
                        </dl>
                    </a></div>
                </div>
                <div className="period_search">
                    <div className="period_month">
                        <ul className="month_list">
                            <li className="month_item"><a href="#" className="month_link">최근 2개월</a></li>
                            <li className="month_item"><a href="#" className="month_link">4개월</a></li>
                            <li className="month_item"><a href="#" className="month_link">6개월</a></li>
                            <li className="month_item custom"><a href="#" className="month_link">기간조회</a></li>
                        </ul>
                        </div>
                    <div className="period_calendar_wrapper" today="Sun Nov 06 2022 03:55:20 GMT+0900 (대한민국 표준시)">
                        <div className="period_calendar">
                            <div className="calendar_wrap"><span><div className="calendar"><input disabled="disabled"
                                                                                                  className="cal_input"/><span
                                className="cal_btn"></span></div><div data-v-4cb7b681=""
                                                                      className="vc-popover-content-wrapper"></div></span>
                            </div>
                            <span className="swung_dash">~</span>
                            <div className="calendar_wrap"><span><div className="calendar"><input className="cal_input"/><span
                                className="cal_btn"></span></div><div data-v-4cb7b681=""
                                                                      className="vc-popover-content-wrapper"></div></span>
                            </div>
                        </div>
                        <div className="period_btn_box">
                            <button className="btn_search is_active">조회</button>
                        </div>
                    </div>
                </div>
                <MypageOrderList/>
                <ul data-v-a54c4c26="" className="search_info">
                    <li data-v-a54c4c26="" className="info_item"><p data-v-a54c4c26="">한 번에 조회 가능한 기간은 최대 6개월입니다.</p>
                    </li>
                    <li data-v-a54c4c26="" className="info_item"><p data-v-a54c4c26="">기간별 조회 결과는 입찰일 기준으로 노출됩니다.</p>
                    </li>
                </ul>
                <div data-v-50c8b1d2="" className="purchase_list bidding ask">
                    <div data-v-50c8b1d2="" className="purchase_head">
                        <div data-v-50c8b1d2="" className="head_product"><a data-v-50c8b1d2="" href="#"
                                                                            className="btn_filter"> 전체</a></div>
                        <div data-v-50c8b1d2="" className="head_status">
                            <div data-v-50c8b1d2="" className="status_box field_price"><a data-v-50c8b1d2="" href="#"
                                                                                          className="status_link"><span
                                data-v-50c8b1d2="" className="status_txt">판매 희망가</span></a></div>
                            <div data-v-50c8b1d2="" className="status_box field_date_purchased"><a data-v-50c8b1d2=""
                                                                                                   href="#"
                                                                                                   className="status_link"><span
                                data-v-50c8b1d2="" className="status_txt">구매일</span></a></div>
                            <div data-v-50c8b1d2="" className="status_box field_date_paid"><a data-v-50c8b1d2=""
                                                                                              href="#"
                                                                                              className="status_link"><span
                                data-v-50c8b1d2="" className="status_txt">정산일</span></a></div>
                            <div data-v-50c8b1d2="" className="status_box field_expires_at"><a data-v-50c8b1d2=""
                                                                                               href="#"
                                                                                               className="status_link"><span
                                data-v-50c8b1d2="" className="status_txt">만료일</span></a></div>
                            <div data-v-50c8b1d2="" className="status_box field_status ascending"><a data-v-50c8b1d2=""
                                                                                                     href="#"
                                                                                                     className="status_link"><span
                                data-v-50c8b1d2="" className="status_txt">상태</span></a></div>
                        </div>
                    </div>
                    <div data-v-541a17ff="" data-v-50c8b1d2="" className="empty_area"><p data-v-541a17ff=""
                                                                                         className="desc">판매 입찰 내역이
                        없습니다.</p><a data-v-3d1bcc82="" data-v-541a17ff="" href="#"
                                    className="btn outlinegrey small"> SHOP 바로가기 </a></div>
                    </div>
                </div>
        </div>
    );
}

export default MypageOrder;