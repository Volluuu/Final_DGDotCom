import React, {useEffect, useRef, useState} from 'react';
import {Link, NavLink, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Close, StarBorderRounded, StarRounded} from "@mui/icons-material";
import Swal from "sweetalert2";

function MypageOrder(props) {
    // const [currentPage, setCurrentPage]=useState(1);
    let {currentPage} = useParams();
    if (currentPage === undefined) currentPage = 1;
    const navi = useNavigate();
    const [u_num, setU_num] = useState(sessionStorage.u_num); // 세션의 u_num으로 초기값 설정
    const [tradeData, setTradeData] = useState({}); // 페이징 처리할 모든 데이터 담기
    const [alertStyle, setAlertStyle] = useState('none'); // 조회 기간 창 state
    const [reviewModal, setReviewModal] = useState('none'); // 리뷰 모달 창 state
    const [updateReviewModal, setUpdateReviewModal] = useState('none'); // 리뷰 수정 모달 창 state
    const [productDto, setProductDto] = useState({}); // 리뷰 작성할 때 값 받아오기
    const [reviewDto, setReviewDto] = useState(''); // 리뷰 수정할 때 값 받아오기
    const [star, setStar] = useState([false, false, false, false, false]); // 별점
    const [updateStar, setUpdateStar] = useState([false, false, false, false, false]); // 수정 폼 별점
    const [p_num, setP_num] = useState(''); // 리뷰 작성, 수정할 때 p_num 넘기기 위함
    const textRef = useRef(''); // 리뷰 쓸 때 textarea 값
    const updateRef = useRef('') // 리뷰 수정 할 때 textarea 값
    const productUrl = localStorage.url + "/product/";

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
    const [today, setToday] = useState(new Date());


    // u_num 을 가진 거래내역 페이징 처리
    const getOrderList = () => {
        let orderListUrl = process.env.REACT_APP_URL + "/mypage/order?u_num=" + u_num + "&currentPage=" + (currentPage === undefined ? "1" : currentPage) + "&startDate=" + startDate + "&endDate=" + endDate;
        axios.get(orderListUrl, {
            headers: {Authorization: `Bearer ${localStorage.accessToken}`}
        })
            .then(res => {
                setTradeData(res.data);
                console.dir(res.data);
            }).catch(error => {
            if (error.response.status === 401) {
                Swal.fire({
                    icon: "error",
                    title: "로그인 해주세요.",
                }).then(result => navi("/user/login"))
            } else if (error.response.status === 403) {
                Swal.fire({
                    icon: "warning",
                    title: "권한이 없습니다.",
                }).then(result => navi("/"))
            }
        });
    }

    useEffect(() => {
        getOrderList();
    }, [currentPage])


    const onReviewModal = (p_num) => {
        let reviewModalUrl = process.env.REACT_APP_URL + "/mypage/reviewmodal?p_num=" + p_num;
        axios.get(reviewModalUrl, {
            headers: {Authorization: `Bearer ${localStorage.accessToken}`}
        })
            .then(res => setProductDto(res.data))
    }

    // 리뷰 작성 액션
    const reviewInsert = () => {
        let score = star.filter(Boolean).length;
        if (score === 0) {
            alert("별점을 선택하세요");
            setStar([false, false, false, false, false]);
            textRef.current.value = "";
            return;
        }
        if (textRef.current.value === "") {
            alert("내용을 입력하세요");
            setStar([false, false, false, false, false]);
            textRef.current.value = "";
            return;
        }
        let reviewInsertUrl = process.env.REACT_APP_URL + "/mypage/reviewinsert";
        axios.post(reviewInsertUrl, {
            u_num, p_num, content: textRef.current.value, star: score
        }, {headers: {Authorization: `Bearer ${localStorage.accessToken}`}})
            .then(res => {
                alert("소중한 리뷰 감사합니다.")
                // 작성 후 리로드
                window.location.reload();
            })
    }

    // 리뷰 수정 버튼 눌렀을 때 값 넣기
    const onUpdateModal = async (p_num, r_num) => {
        let updateModalUrl = process.env.REACT_APP_URL + "/mypage/reviewdetail?p_num=" + p_num + "&r_num=" + r_num + "&u_num=" + u_num;
        // 동기 처리를 위한 async await
        await axios.get(updateModalUrl, {
            headers: {Authorization: `Bearer ${localStorage.accessToken}`}
        })
            .then(res => {
                //리뷰 내역을 들고 오면 ReviewDto에 담기
                setReviewDto(res.data);
                updateRef.current.value = res.data.content;
                let starStates = [...updateStar];
                for (let i = 0; i < 5; i++) {
                    starStates[i] = i <= (res.data.star - 1) ? true : false;
                }
                setUpdateStar(starStates);
            })
    }

    // 리뷰 수정 액션
    const reviewUpdate = () => {
        let score = updateStar.filter(Boolean).length;
        if (updateRef.current.value === "") {
            alert("내용을 입력하세요");
            setUpdateStar([false, false, false, false, false]);
            updateRef.current.value = "";
            return;
        }
        let reviewUpdateUrl = process.env.REACT_APP_URL + "/mypage/reviewupdate";
        axios.put(reviewUpdateUrl, {
            content: updateRef.current.value, star: score, r_num: reviewDto.r_num,
            headers: {Authorization: `Bearer ${localStorage.accessToken}`}
        })
            .then(res => {
                alert("리뷰 수정이 완료되었습니다.");
                // 수정 후 리로드
                window.location.reload();
            })
    }

    // 리뷰 [작성] 할 때 별점 선택
    const starClick = (index) => {
        let starStates = [...star]
        for (let i = 0; i < 5; i++) {
            starStates[i] = i <= index ? true : false;
        }
        setStar(starStates);
    }

    //리뷰 [수정] 할 때 별점 선택
    const updateStarClick = (index) => {
        let starStates = [...star]
        for (let i = 0; i < 5; i++) {
            starStates[i] = i <= index ? true : false;
        }
        setUpdateStar(starStates);
    }

    return (
        <div data-v-39b2348a="" className="content_area">
            <div className="my_purchase">
                <div data-v-88eb18f6="" className="content_title">
                    <div data-v-88eb18f6="" className="title">
                        <h3 data-v-88eb18f6=""><b>주문 내역</b>
                            <span style={{fontSize: "0.6em"}}>{tradeData.u_name && tradeData.u_name} 님의 주문내역을 한 눈에 볼 수 있습니다!</span>
                        </h3>
                    </div>
                </div>
                <div data-v-0c307fea="" className="purchase_list_tab sell detail_tab">
                    <div data-v-0c307fea="" className="tab_item tab_on">
                        <Link data-v-0c307fea="" to="#!" className="tab_link">
                            <dl data-v-0c307fea="" className="tab_box">
                                <dt data-v-0c307fea="" className="title">결제 금액</dt>
                                <dd data-v-0c307fea="" className="count">
                                    {tradeData.joined &&
                                        tradeData.joined.map(item => item.lastprice * item.count)
                                            .reduce((prev, curr) => prev + curr, 0)
                                            .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                                </dd>
                            </dl>
                        </Link>
                    </div>
                    <div data-v-0c307fea="" className="tab_item tab_on">
                        <Link data-v-0c307fea="" to="#!" className="tab_link">
                            <dl data-v-0c307fea="" className="tab_box">
                                <dt data-v-0c307fea="" className="title">내역</dt>
                                <dd data-v-0c307fea="" className="count"
                                    style={{color: "#0000FF"}}>
                                    {tradeData.joined && tradeData.joined.length}
                                </dd>
                            </dl>
                        </Link>
                    </div>
                    <div data-v-0c307fea="" className="tab_item tab_on">
                        <Link data-v-0c307fea="" to="#!" className="tab_link">
                            <dl data-v-0c307fea="" className="tab_box">
                                <dt data-v-0c307fea="" className="title">배송 전</dt>
                                <dd data-v-0c307fea="" className="count"
                                    style={{color: "#FF0000"}}>
                                    {tradeData.joined &&
                                        tradeData.joined.map(item => item.state === "배송 전")
                                            .reduce((prev, curr) => prev + curr, 0)}
                                </dd>

                            </dl>
                        </Link>
                    </div>
                </div>
                <div className="period_search">
                    <div className="period_month">
                        <ul className="month_list">
                            <li className="month_item">
                                <Link to="#!" className="month_link"
                                      onClick={() => {
                                          setStartDate(tradeData.minDate.slice(0, 10));
                                          setEndDate(today.toISOString().slice(0, 10));
                                      }}>전체</Link>
                            </li>
                            <li className="month_item">
                                <Link to="#" className="month_link"
                                      onClick={() => {
                                          setStartDate(new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString().slice(0, 10));
                                          setEndDate(today.toISOString().slice(0, 10));
                                      }}>최근 2개월</Link></li>
                            <li className="month_item">
                                <Link to="#" className="month_link"
                                      onClick={() => {
                                          setStartDate(new Date(new Date().setMonth(new Date().getMonth() - 4)).toISOString().slice(0, 10));
                                          setEndDate(today.toISOString().slice(0, 10));
                                      }}>4개월</Link>
                            </li>
                            <li className="month_item">
                                <Link to="#" className="month_link"
                                      onClick={() => {
                                          setStartDate(new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString().slice(0, 10));
                                          setEndDate(today.toISOString().slice(0, 10));
                                      }}>6개월</Link>
                            </li>
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

                {tradeData.joined && tradeData.joined.length === 0 ? (
                    // 해당 유저의 주문 내역이 없을 경우
                    <div data-v-f263fda4="">
                        <div
                            data-v-50c8b1d2=""
                            data-v-f263fda4=""
                            className="purchase_list all bid"
                        >
                            <div
                                data-v-541a17ff=""
                                data-v-50c8b1d2=""
                                className="empty_area"
                            >
                                <p data-v-541a17ff="" className="desc">
                                    주문 내역이 없습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
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

                                {tradeData.joinPaging && tradeData.joinPaging.map((jitem, idx) => (
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
                                            {jitem.state === "배송 완료" && tradeData.rlist[idx] === null ?
                                                <button type={"button"} style={{float: "left"}}
                                                        className={"btn btn-primary btn-sm"}
                                                        onClick={() => {
                                                            setReviewModal("");
                                                            onReviewModal(jitem.p_num);
                                                            setP_num(jitem.p_num);
                                                        }}>작성</button> : jitem.state === "배송 완료" && tradeData.rlist[idx] !== null ?
                                                    <button type={"button"} style={{float: "left"}}
                                                            className={"btn btn-success btn-sm"}
                                                            onClick={() => {
                                                                setUpdateReviewModal("");
                                                                onReviewModal(jitem.p_num);
                                                                onUpdateModal(jitem.p_num, tradeData.rlist[idx].r_num);
                                                                setP_num(jitem.p_num);
                                                            }}>수정</button> : <button type={"button"}
                                                                                     style={{
                                                                                         float: "left",
                                                                                         cursor: "wait"
                                                                                     }}
                                                                                     className={"btn btn-light btn-sm"}
                                                                                     disabled>불가</button>}
                                        </span>
                                    </React.Fragment>))}
                                <div style={{gridColumn: "1/7", gridRow: "14/15"}}>
                                    {tradeData && tradeData.startPage > 1 ?
                                        <Link className={'pagenum'} to={`/mypage/order/${tradeData.startPage - 1}`}
                                        ><b style={{color: 'black'}}>이전</b></Link> : <></>}
                                    {tradeData.pidx && tradeData.pidx.map((n, i) => <NavLink key={i}
                                                                                             className={'pagenum'}
                                                                                             style={{color: n === Number(currentPage) ? 'red' : 'blue'}}
                                                                                             to={`/mypage/order/${n}`}
                                    ><b>{n}</b></NavLink>)

                                    }
                                    {tradeData && tradeData.endPage < tradeData.totalPage ?
                                        <Link className={'pagenum'} to={`/mypage/order/${tradeData.endPage + 1}`}
                                        ><b style={{color: 'black'}}>다음</b></Link> : <></>}
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
                <ul data-v-a54c4c26="" className="search_info">
                    <li data-v-a54c4c26="" className="info_item"><p data-v-a54c4c26="">첫 주문 일자 이후부터 조회 가능합니다.</p>
                    </li>
                    <li data-v-a54c4c26="" className="info_item"><p data-v-a54c4c26="">주문 내역은 최근 날짜 기준으로 노출됩니다.</p>
                    </li>
                    <li data-v-a54c4c26="" className="info_item"><p data-v-a54c4c26="">후기 작성 시 1,000P를 지급해드립니다.</p>
                    </li>
                </ul>
                <div data-v-50c8b1d2="" className="purchase_list bidding ask">
                    <div data-v-541a17ff="" data-v-50c8b1d2="" className="empty_area">
                        <Link data-v-3d1bcc82="" data-v-541a17ff="" to="/product/list"
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
                        <div data-v-28cabbb5="" data-v-1f7c6d3f="" className="layer_btn"><Link
                            data-v-3d1bcc82=""
                            data-v-28cabbb5=""
                            to="#!"
                            className="btn outline medium"
                            data-v-1f7c6d3f=""
                            onClick={() => setAlertStyle("none")}> 확인 </Link>
                        </div>
                    </div>
                    <Link data-v-28cabbb5="" data-v-1f7c6d3f="" to="#!" className="btn_layer_close"
                          onClick={() => setAlertStyle("none")}>
                        <Close/>
                    </Link>
                </div>
            </div>
            {/* 후기 작성을 위한 Modal 창 */}
            {reviewModal === "" ?
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
                                        <img alt={''} src={productUrl + productDto.photo}
                                             style={{maxWidth: "100px"}}/>
                                    </h3><p
                                    data-v-28cabbb5="" data-v-1f7c6d3f="" className="point_box" style={{
                                    fontSize: "0.9em",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }}>{productDto.p_name}
                                </p>
                                    <div data-v-28cabbb5="" data-v-1f7c6d3f="" className="point_info">
                                        <p data-v-28cabbb5="" data-v-1f7c6d3f=""
                                           className="info_item"> {productDto.brand} / {productDto.price && productDto.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 </p>
                                    </div>
                                </div>
                                별점 :{star.map((ele, idx) => (ele ?
                                <StarRounded style={{cursor: "pointer", color: "#F1C40F"}}
                                             onClick={() => starClick(idx)}/> :
                                <StarBorderRounded style={{cursor: "pointer", color: "#F1C40F"}}
                                                   onClick={() => starClick(idx)}/>))}
                                <br/>
                                <textarea style={{width: "380px", height: "100px", border: "1px solid black"}}
                                          ref={textRef} required>

                            </textarea>
                                <ul data-v-28cabbb5="" data-v-1f7c6d3f="" className="usable_list">

                                    <li data-v-28cabbb5="" data-v-1f7c6d3f="" className="usable_item">
                                        별점, 내용을 필수로 입력해주세요.
                                    </li>
                                    <li data-v-28cabbb5="" data-v-1f7c6d3f="" className="usable_item">
                                        후기 작성 후 삭제는 불가능합니다.
                                    </li>
                                    <li data-v-28cabbb5="" data-v-1f7c6d3f="" className="usable_item">
                                        후기 작성 시 1,000P를 지급합니다. (아직 ㅎ)
                                    </li>
                                </ul>
                            </div>
                            <div data-v-28cabbb5="" data-v-1f7c6d3f="" className="layer_btn"><Link
                                data-v-3d1bcc82=""
                                data-v-28cabbb5=""
                                to="#!"
                                className="btn outline medium"
                                data-v-1f7c6d3f=""
                                onClick={() => {
                                    if (window.confirm("리뷰를 등록 하시겠습니까?")) {
                                        reviewInsert();
                                        setReviewModal("none");
                                        textRef.current.value = "";
                                        setP_num('');
                                        setStar([false, false, false, false, false]);
                                    }
                                }}> 리뷰 등록 </Link>
                            </div>
                        </div>
                        <Link data-v-28cabbb5="" data-v-1f7c6d3f="" to="#!" className="btn_layer_close"
                              onClick={() => {
                                  if (window.confirm("리뷰 작성을 취소하시겠습니까?")) {
                                      setReviewModal("none");
                                      textRef.current.value = "";
                                      setP_num('');
                                      setStar([false, false, false, false, false]);
                                  }
                              }}>
                            <Close/>
                        </Link>
                    </div>
                </div> :
                updateReviewModal === "" ?
                    <div data-v-1f7c6d3f="" data-v-28cabbb5="" data-v-f263fda4="" className="layer_point layer lg"
                         style={{display: updateReviewModal}}>
                        <div data-v-1f7c6d3f="" className="layer_container">
                            <div data-v-1f7c6d3f="" className="layer_header"><h2 data-v-28cabbb5=""
                                                                                 data-v-1f7c6d3f=""
                                                                                 className="title">후기 수정</h2>
                            </div>
                            <div data-v-1f7c6d3f="" className="layer_content">
                                <div data-v-28cabbb5="" data-v-1f7c6d3f="" className="usable_wrap">
                                    <div data-v-28cabbb5="" data-v-1f7c6d3f="" className="usable_point">
                                        <h3 data-v-28cabbb5="" data-v-1f7c6d3f="" className="title">
                                            <img alt={''} src={productUrl + productDto.photo}
                                                 style={{maxWidth: "100px"}}/>
                                        </h3><p
                                        data-v-28cabbb5="" data-v-1f7c6d3f="" className="point_box" style={{
                                        fontSize: "0.9em",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}>{productDto.p_name}
                                    </p>
                                        <div data-v-28cabbb5="" data-v-1f7c6d3f="" className="point_info">
                                            <p data-v-28cabbb5="" data-v-1f7c6d3f=""
                                               className="info_item"> {productDto.brand} / {productDto.price && productDto.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 </p>
                                        </div>
                                    </div>
                                    별점 : {updateStar.map((ele, idx) => (ele ?
                                    <StarRounded style={{cursor: "pointer", color: "#F1C40F"}}
                                                 onClick={() => updateStarClick(idx)}/> :
                                    <StarBorderRounded style={{cursor: "pointer", color: "#F1C40F"}}
                                                       onClick={() => updateStarClick(idx)}/>))}
                                    <br/>
                                    <textarea style={{width: "380px", height: "100px", border: "1px solid black"}}
                                              ref={updateRef} required>

                                </textarea>
                                    <ul data-v-28cabbb5="" data-v-1f7c6d3f="" className="usable_list">
                                        <li data-v-28cabbb5="" data-v-1f7c6d3f="" className="usable_item">
                                            동일 상품에 대한 후기 작성은 한 번만 가능합니다.
                                        </li>
                                        <li data-v-28cabbb5="" data-v-1f7c6d3f="" className="usable_item">
                                            후기 삭제는 불가합니다.&emsp;(&nbsp;단&nbsp;,&nbsp;회원 탈퇴 시 삭제 처리)
                                        </li>
                                    </ul>
                                </div>
                                <div data-v-28cabbb5="" data-v-1f7c6d3f="" className="layer_btn"><Link
                                    data-v-3d1bcc82=""
                                    data-v-28cabbb5=""
                                    to="#!"
                                    className="btn outline medium"
                                    data-v-1f7c6d3f=""
                                    onClick={() => {
                                        if (window.confirm("리뷰를 수정 하시겠습니까?")) {
                                            reviewUpdate();
                                            setUpdateReviewModal("none");
                                            updateRef.current.value = "";
                                            setP_num('');
                                            setUpdateStar([false, false, false, false, false]);
                                        }
                                    }}> 리뷰 수정 </Link>
                                </div>
                            </div>
                            <Link data-v-28cabbb5="" data-v-1f7c6d3f="" to="#!" className="btn_layer_close"
                                  onClick={() => {
                                      if (window.confirm("리뷰 수정을 취소하시겠습니까?")) {
                                          setUpdateReviewModal("none");
                                          updateRef.current.value = "";
                                          setP_num('');
                                          setUpdateStar([false, false, false, false, false]);
                                      }
                                  }}>
                                <Close/>
                            </Link>
                        </div>
                    </div> : <></>
            }
        </div>);
}

export default MypageOrder;