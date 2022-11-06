import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import MypageOrderList from "./MypageOrderList";
import Calendar from "react-calendar";

function MypageOrder(props) {
    // const [currentPage, setCurrentPage]=useState(1);
    const {currentPage} = useParams();
    const navi=useNavigate();
    const [u_num, setU_num] = useState(sessionStorage.u_num); // 세션의 u_num으로 초기값 설정
    const [tradeData, setTradeData] = useState({}); // 페이징 처리할 모든 데이터 담기
    const productUrl = localStorage.url + "/product/";

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
    const [today, setToday] = useState(new Date());

    // u_num 을 가진 거래내역 페이징 처리
    const getOrderList = () => {
        let orderListUrl = process.env.REACT_APP_URL + "/mypage/orderlist?u_num=" + u_num + "&currentPage=" + (currentPage === undefined ? "1" : currentPage);
        axios.get(orderListUrl)
            .then(res => {
                setTradeData(res.data);
                setStartDate(res.data.minDate.slice(0, 10));
            })
    }

    useEffect(() => {
        getOrderList();
    }, [currentPage])

    const searchByDay = () => {
        if (startDate === "" || endDate === "") {
            alert("조회 날짜를 선택하세요");
            return;
        }
        let searchByDayUrl = process.env.REACT_APP_URL + "/mypage/orderlist?u_num=" + u_num + "&currentPage=" + (currentPage === undefined ? "1" : currentPage) + "&startDate=" + startDate + "&endDate=" + endDate;
        axios.get(searchByDayUrl)
            .then(res=>{
                setTradeData(res.data);
            })
    }

    return (
        <div data-v-39b2348a="" className="content_area">
            <div className="my_purchase">
                <div data-v-88eb18f6="" className="content_title">
                    <div data-v-88eb18f6="" className="title"><h3 data-v-88eb18f6=""><b>주문 내역</b><span
                        style={{fontSize: "0.6em"}}>{tradeData.u_name && tradeData.u_name} 님의 주문내역을 한 눈에 볼 수 있습니다!</span>
                    </h3>
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
                            <dd data-v-0c307fea=""
                                className="count">{tradeData.totalPrice && tradeData.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                            </dd>
                        </dl>
                    </a></div>
                    <div data-v-0c307fea="" className="tab_item"><a data-v-0c307fea="" href="#" className="tab_link">
                        <dl data-v-0c307fea="" className="tab_box">
                            <dt data-v-0c307fea="" className="title">총 결제 내역</dt>
                            <dd data-v-0c307fea="" className="count">{tradeData.totalCount && tradeData.totalCount}건
                            </dd>
                        </dl>
                    </a></div>
                    <div data-v-0c307fea="" className="tab_item"><a data-v-0c307fea="" href="#" className="tab_link">
                        <dl data-v-0c307fea="" className="tab_box">
                            <dt data-v-0c307fea="" className="title">배송 전</dt>
                            <dd data-v-0c307fea="" className="count">{tradeData.stateCount && tradeData.stateCount[0]}건
                            </dd>
                        </dl>
                    </a></div>
                </div>
                <div className="period_search">
                    <div className="period_month">
                        <ul className="month_list">
                            <li className="month_item"><a href="#" className="month_link"
                                                          onClick={() => {
                                                              setStartDate(new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString().slice(0, 10));
                                                              setEndDate(today.toISOString().slice(0, 10));
                                                          }}>최근 2개월</a></li>
                            <li className="month_item"><a href="#" className="month_link"
                                                          onClick={() => {
                                                              setStartDate(new Date(new Date().setMonth(new Date().getMonth() - 4)).toISOString().slice(0, 10));
                                                              setEndDate(today.toISOString().slice(0, 10));
                                                          }}>4개월</a></li>
                            <li className="month_item"><a href="#" className="month_link"
                                                          onClick={() => {
                                                              setStartDate(new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString().slice(0, 10));
                                                              setEndDate(today.toISOString().slice(0, 10));
                                                          }}>6개월</a></li>
                            <li className="month_item custom"></li>
                        </ul>
                    </div>
                    <div className="period_calendar_wrapper" today={today}>
                        <div className="period_calendar">
                            <div className="calendar_wrap" style={{width: "150px", cursor: "pointer"}}>
                                <div className="calendar" style={{width: "300px"}}>
                                    <input type={"date"} className="cal_input" onChange={(e) => {
                                        setStartDate(e.target.value);
                                    }} value={startDate} min={tradeData.minDate && tradeData.minDate.slice(0, 10)}
                                           max={endDate}/>
                                    <span className="cal_btn">
                            {/*                캘린더 아이콘*/}
                            </span>
                                </div>

                            </div>
                            <span className="swung_dash">&emsp;~&emsp;</span>
                            <div className="calendar_wrap" style={{width: "150px", cursor: "pointer"}}>
                                <input type={"date"} className="cal_input" onChange={(e) => {
                                    setEndDate(e.target.value);
                                }} value={endDate} max={today.toISOString().slice(0, 10)}/>
                                <span className="cal_btn">
                                        {/*    캘린더 아이콘 */}
                                        </span>
                            </div>
                        </div>
                        <div className="period_btn_box">
                            <button className="btn_search is_active"
                                    onClick={()=>{
                                        navi("/mypage/order/1");
                                        searchByDay();
                                    }}>조회
                            </button>
                        </div>
                    </div>
                </div>

                <div data-v-f263fda4="">
                    <div data-v-50c8b1d2="" data-v-f263fda4="" className="purchase_list all bid">
                        <div style={{
                            display: "grid",
                            gridTemplateRows: "repeat(14, 1fr)",
                            gridTemplateColumns: "1fr 3fr 1fr 1fr",
                            textAlign: "center"
                        }}>
                            <div style={{gridColumn: "1/5", gridRow: "1/2"}}>
                                <hr/>
                            </div>
                            <b style={{paddingTop: "6px"}}>주문일자</b>
                            <b style={{paddingTop: "6px"}}>상품명</b>
                            <b style={{paddingTop: "6px", textAlign: "right"}}>총 결제 금액</b>
                            <b style={{paddingTop: "6px"}}>배송상태</b>
                            <div style={{gridColumn: "1/5", gridRow: "3/4"}}>
                                <hr/>
                            </div>
                            {
                                tradeData.joinPaging &&
                                tradeData.joinPaging.map((jitem, idx) => (
                                    <React.Fragment key={idx}>
                                        <span style={{fontWeight: "inherit"}}>{jitem.day.substring(0, 10)}</span>
                                        <span style={{
                                            textAlign: "left",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}><a href={`/product/detail/${jitem.p_num}`}>{jitem.p_name}</a></span>
                                        <span
                                            style={{textAlign: "right"}}>{(jitem.lastprice * jitem.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</span>
                                        <span>{jitem.state}</span>
                                    </React.Fragment>
                                ))
                            }
                            <div style={{gridColumn: "1/5"}}>
                                {
                                    tradeData &&
                                    tradeData.startPage > 1 ?
                                        <a className={'pagenum'} href={`/mypage/order/${tradeData.startPage - 1}`}
                                        ><b style={{color: 'black'}}>이전</b></a> : <></>
                                }
                                {
                                    tradeData.pidx &&
                                    tradeData.pidx.map((n, i) =>
                                        <a key={i} className={'pagenum'}
                                           style={{color: n == currentPage ? 'red' : 'blue'}}
                                           href={`/mypage/order/${n}`}
                                        ><b>{n}</b></a>)

                                }
                                {
                                    tradeData &&
                                    tradeData.endPage < tradeData.totalPage ?
                                        <a className={'pagenum'} href={`/mypage/order/${tradeData.endPage + 1}`}
                                        ><b style={{color: 'black'}}>다음</b></a> : <></>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <ul data-v-a54c4c26="" className="search_info">
                    <li data-v-a54c4c26="" className="info_item"><p data-v-a54c4c26="">첫 주문 일자 이후부터 조회 가능합니다.</p>
                    </li>
                    <li data-v-a54c4c26="" className="info_item"><p data-v-a54c4c26="">주문 내역은 최근 날짜 기준으로 노출됩니다.</p>
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