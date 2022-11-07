import React, {useEffect, useRef, useState} from 'react';
import {NavLink, Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {
    Close, StarBorderRounded, StarRounded
} from "@mui/icons-material";

function MypageOrder(props) {
    // const [currentPage, setCurrentPage]=useState(1);
    let {currentPage} = useParams();
    if (currentPage === undefined)
        currentPage = 1;
    const navi = useNavigate();
    const [u_num, setU_num] = useState(sessionStorage.u_num); // 세션의 u_num으로 초기값 설정
    const [tradeData, setTradeData] = useState({}); // 페이징 처리할 모든 데이터 담기
    const [alertStyle, setAlertStyle] = useState('none'); // 조회 기간 창 state
    const [reviewModal, setReviewModal] = useState('none'); // 리뷰 모달 창 state
    const [productDto, setProductDto] = useState({}); // 리뷰 작성할 때 값 받아오기
    const [star, setStar] = useState([false, false, false, false, false]); // 별점
    const textRef = useRef(''); // 리뷰 쓸 때 textarea 값
    const productUrl = localStorage.url + "/product/";

    // const [startDate, setStartDate] = useState('2021-01-01');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
    const [today, setToday] = useState(new Date());

    // u_num 을 가진 거래내역 페이징 처리
    const getOrderList = () => {
        let orderListUrl = process.env.REACT_APP_URL + "/mypage/orderlist?u_num=" + u_num + "&currentPage=" + (currentPage === undefined ? "1" : currentPage) + "&startDate=" + startDate + "&endDate=" + endDate;
        axios.get(orderListUrl)
            .then(res => {
                setTradeData(res.data);
            })
    }

    useEffect(() => {
        getOrderList();
    }, [currentPage])

    const onReviewModal = (p_num) => {
        let reviewModalUrl = process.env.REACT_APP_URL + "/mypage/reviewmodal?p_num=" + p_num;
        axios.get(reviewModalUrl)
            .then(res => setProductDto(res.data))
    }

    const reviewInsert=()=>{

    }

    const starClick = (index) => {
        let starStates = [...star]
        for (let i = 0; i < 5; i++) {
            starStates[i] = i <= index ? true : false;
        }
        console.dir(starStates);
        setStar(starStates);
        console.dir(star);
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
                    <div data-v-0c307fea="" className="tab_item tab_on"><a data-v-0c307fea="" href="#!"
                                                                           className="tab_link">
                        <dl data-v-0c307fea="" className="tab_box">
                            <dt data-v-0c307fea="" className="title">결제 금액</dt>
                            <dd data-v-0c307fea=""
                                className="count">{tradeData.totalPrice && tradeData.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                            </dd>
                        </dl>
                    </a></div>
                    <div data-v-0c307fea="" className="tab_item"><a data-v-0c307fea="" href="#!" className="tab_link">
                        <dl data-v-0c307fea="" className="tab_box">
                            <dt data-v-0c307fea="" className="title">내역</dt>
                            <dd data-v-0c307fea="" className="count">{tradeData.totalCount && tradeData.totalCount}건
                            </dd>
                        </dl>
                    </a></div>
                    <div data-v-0c307fea="" className="tab_item"><a data-v-0c307fea="" href="#!" className="tab_link">
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
                            <li className="month_item"><Link to="#" className="month_link"
                                                             onClick={() => {
                                                                 setStartDate(tradeData.minDate.slice(0, 10));
                                                                 setEndDate(today.toISOString().slice(0, 10));
                                                             }}>전체</Link></li>
                            <li className="month_item"><Link to="#" className="month_link"
                                                             onClick={() => {
                                                                 setStartDate(new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString().slice(0, 10));
                                                                 setEndDate(today.toISOString().slice(0, 10));
                                                             }}>최근 2개월</Link></li>
                            <li className="month_item"><Link to="#" className="month_link"
                                                             onClick={() => {
                                                                 setStartDate(new Date(new Date().setMonth(new Date().getMonth() - 4)).toISOString().slice(0, 10));
                                                                 setEndDate(today.toISOString().slice(0, 10));
                                                             }}>4개월</Link></li>
                            <li className="month_item"><Link to="#" className="month_link"
                                                             onClick={() => {
                                                                 setStartDate(new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString().slice(0, 10));
                                                                 setEndDate(today.toISOString().slice(0, 10));
                                                             }}>6개월</Link></li>
                            <li className="month_item custom"></li>
                        </ul>
                    </div>
                    <div className="period_calendar_wrapper" today={today}>
                        <div className="period_calendar">
                            <div className="calendar_wrap" style={{width: "150px", cursor: "pointer"}}>
                                <input type={"date"} className="cal_input" onChange={(e) => {
                                    setStartDate(e.target.value);
                                }} defaultValue={tradeData.minDate && tradeData.minDate.slice(0, 10)}
                                       value={startDate} min={tradeData.minDate && tradeData.minDate.slice(0, 10)}
                                       max={endDate}/>
                            </div>
                            <span className="swung_dash">&emsp;~&emsp;</span>
                            <div className="calendar_wrap" style={{width: "150px", cursor: "pointer"}}>
                                <input type={"date"} className="cal_input" onChange={(e) => {
                                    setEndDate(e.target.value);
                                }} value={endDate} max={today.toISOString().slice(0, 10)}/>
                            </div>
                        </div>
                        <div className="period_btn_box">
                            <button className="btn_search is_active"
                                    onClick={() => {
                                        if (startDate === "" || endDate === "") {
                                            setAlertStyle("");
                                            return;
                                        }
                                        navi("/mypage/order/1");
                                        getOrderList();
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
                            gridTemplateColumns: "1fr 3fr 1fr 1fr 1fr 1fr",
                            textAlign: "center"
                        }}>
                            <div style={{gridColumn: "1/7", gridRow: "1/2"}}>
                                <hr/>
                            </div>
                            <b style={{paddingTop: "6px"}}>주문일자</b>
                            <b style={{paddingTop: "6px"}}>상품명</b>
                            <b style={{paddingTop: "6px", textAlign: "right"}}>개당 가격x수량</b>
                            <b style={{paddingTop: "6px", textAlign: "right"}}>총 결제 금액</b>
                            <b style={{paddingTop: "6px"}}>배송상태</b>
                            <b style={{paddingTop: "6px", textAlign: "left"}}>후기</b>
                            <div style={{gridColumn: "1/7", gridRow: "3/4"}}>
                                <hr/>
                            </div>
                            {
                                tradeData.joinPaging &&
                                tradeData.joinPaging.map((jitem, idx) => (
                                    <React.Fragment key={idx}>
                                        <span>{jitem.day.substring(0, 10)}</span>
                                        <span style={{
                                            textAlign: "left",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            color: jitem.state === "배송 전" ? "#FF0000" : jitem.state === "배송 중" ? "#0000FF" : "#A020F0"
                                        }}><Link to={`/product/detail/${jitem.p_num}`}>
                                            <img alt={""} src={productUrl + jitem.photo}
                                                 style={{maxWidth: "33px"}}/>&nbsp;
                                            {jitem.p_name}
                                        </Link>
                                        </span>
                                        <span><span style={{float: "right"}}>*{jitem.count}개</span><span
                                            style={{float: "right"}}>{jitem.lastprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</span></span>
                                        <span
                                            style={{textAlign: "right"}}>{(jitem.lastprice * jitem.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</span>
                                        <span
                                            style={{color: jitem.state === "배송 전" ? "#FF0000" : jitem.state === "배송 중" ? "#0000FF" : "#A020F0"}}>{jitem.state}</span>
                                        <span>
                                            {
                                                jitem.state === "배송 완료" ?
                                                    <button type={"button"} style={{float: "left"}}
                                                            className={"btn btn-primary btn-sm"}
                                                            onClick={() => {
                                                                setReviewModal("");
                                                                onReviewModal(jitem.p_num);
                                                            }}>작성</button>
                                                    : <button type={"button"}
                                                              style={{float: "left", cursor: "wait"}}
                                                              className={"btn btn-light btn-sm"}
                                                              disabled>불가</button>
                                            }
                                        </span>
                                    </React.Fragment>
                                ))
                            }
                            <div style={{gridColumn: "1/7", gridRow: "14/15"}}>
                                {
                                    tradeData &&
                                    tradeData.startPage > 1 ?
                                        <Link className={'pagenum'} to={`/mypage/order/${tradeData.startPage - 1}`}
                                        ><b style={{color: 'black'}}>이전</b></Link> : <></>
                                }
                                {
                                    tradeData.pidx &&
                                    tradeData.pidx.map((n, i) =>
                                        <NavLink key={i} className={'pagenum'}
                                                 style={{color: n === Number(currentPage) ? 'red' : 'blue'}}
                                                 to={`/mypage/order/${n}`}
                                        ><b>{n}</b></NavLink>)

                                }
                                {
                                    tradeData &&
                                    tradeData.endPage < tradeData.totalPage ?
                                        <Link className={'pagenum'} to={`/mypage/order/${tradeData.endPage + 1}`}
                                        ><b style={{color: 'black'}}>다음</b></Link> : <></>
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
                    <div data-v-541a17ff="" data-v-50c8b1d2="" className="empty_area">
                        <Link data-v-3d1bcc82="" data-v-541a17ff="" to="/product/list/1"
                              className="btn outlinegrey small"> SHOP 바로가기 </Link></div>
                </div>
            </div>

            {/*  눌렀을 때 기간 없으면 뜨는 Modal 창 */}
            <div data-v-1f7c6d3f="" data-v-28cabbb5="" data-v-f263fda4="" className="layer_point layer lg"
                 style={{display: alertStyle}}>
                <div data-v-1f7c6d3f="" className="layer_container">
                    <div data-v-1f7c6d3f="" className="layer_header"><h2 data-v-28cabbb5=""
                                                                         data-v-1f7c6d3f=""
                                                                         className="title"><br/><br/>조회 기간을 입력해주세요.</h2>
                    </div>
                    <div data-v-1f7c6d3f="" className="layer_content">
                        <div data-v-28cabbb5="" data-v-1f7c6d3f="" className="layer_btn"><a
                            data-v-3d1bcc82=""
                            data-v-28cabbb5=""
                            href="#!"
                            className="btn outline medium"
                            data-v-1f7c6d3f=""
                            onClick={() => setAlertStyle("none")}> 확인 </a>
                        </div>
                    </div>
                    <a data-v-28cabbb5="" data-v-1f7c6d3f="" href="#!" className="btn_layer_close"
                       onClick={() => setAlertStyle("none")}>
                        <Close/>
                    </a>
                </div>
            </div>
            {/* 후기 작성을 위한 Modal 창 */}
            <div data-v-1f7c6d3f="" data-v-28cabbb5="" data-v-f263fda4="" className="layer_point layer lg"
                 style={{display: reviewModal}}>
                <div data-v-1f7c6d3f="" className="layer_container">
                    <div data-v-1f7c6d3f="" className="layer_header"><h2 data-v-28cabbb5=""
                                                                         data-v-1f7c6d3f=""
                                                                         className="title">후기 작성</h2>
                    </div>
                    <div data-v-1f7c6d3f="" className="layer_content">
                        <div data-v-28cabbb5="" data-v-1f7c6d3f="" className="usable_wrap">
                            <div data-v-28cabbb5="" data-v-1f7c6d3f="" className="usable_point">
                                <h3 data-v-28cabbb5="" data-v-1f7c6d3f="" className="title">
                                    <img alt={''} src={productUrl + productDto.photo} style={{maxWidth: "100px"}}/>
                                </h3><p
                                data-v-28cabbb5="" data-v-1f7c6d3f="" className="point_box" style={{
                                fontSize: "0.9em", whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}>{productDto.p_name}
                            </p>
                                <div data-v-28cabbb5="" data-v-1f7c6d3f="" className="point_info">
                                    <p data-v-28cabbb5="" data-v-1f7c6d3f=""
                                       className="info_item"> {productDto.brand} </p></div>
                            </div>
                            별점 :{star.map((ele, idx) => (
                            ele ? <StarRounded style={{cursor: "pointer", color: "#F1C40F"}}
                                               onClick={() => starClick(idx)}/> :
                                <StarBorderRounded style={{cursor: "pointer", color: "#F1C40F"}}
                                                   onClick={() => starClick(idx)}/>
                        ))}
                            <br/>
                            <textarea style={{width: "380px", height: "100px", border: "1px solid black"}}
                                      ref={textRef} required>

                            </textarea>
                        </div>
                        <div data-v-28cabbb5="" data-v-1f7c6d3f="" className="layer_btn"><a
                            data-v-3d1bcc82=""
                            data-v-28cabbb5=""
                            href="#!"
                            className="btn outline medium"
                            data-v-1f7c6d3f=""
                            onClick={() => {
                                if(window.confirm("리뷰를 등록 하시겠습니까?")){
                                    reviewInsert();
                                    setReviewModal("none");
                                    textRef.current.value="";
                                    setStar([false,false,false,false,false]);
                                }
                            }}> 리뷰 등록 </a>
                        </div>
                    </div>
                    <a data-v-28cabbb5="" data-v-1f7c6d3f="" href="#!" className="btn_layer_close"
                       onClick={() => {
                           if(window.confirm("리뷰 작성을 취소하시겠습니까?")){
                               setReviewModal("none");
                               textRef.current.value="";
                               setStar([false,false,false,false,false]);
                           }
                       }}>
                        <Close/>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default MypageOrder;