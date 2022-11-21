import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useParams, Link, useNavigate} from "react-router-dom";
import {Close} from "@mui/icons-material";
import Swal from "sweetalert2";
import F from "./picture/F.png";
import M from "./picture/M.png";
import N from "./picture/N.png";
import K from "./picture/K.png";

function MypageForm(props) {
    const [u_num, setU_num] = useState(sessionStorage.u_num); // 세션의 u_num으로 초기값 설정
    const [userDto, setUserDto] = useState(""); // 세션의 u_num으로 받아온 유저 데이터
    const [tradeData, setTradeData] = useState({}); // 페이징 처리할 모든 데이터 담기
    const [pointStyle, setPointStyle] = useState("none"); // 모달 창 State
    const productUrl = process.env.REACT_APP_URL + "/product/"; // 이미지 주소
    const [cartlist, setCartlist] = useState(""); //장바구니 데이터
    const navi = useNavigate();

    // 세션의 u_num으로 받아오는 유저 정보
    const mypageform = () => {
        // u_num, currentPage로 주문 내역 받아오기
        let orderListUrl =
            process.env.REACT_APP_URL + "/mypage/mypageform?u_num=" + u_num;
        axios
            .get(orderListUrl, {
                withCredentials: true,
                headers: {Authorization: `Bearer ${localStorage.accessToken}`},
            })
            .then((res) => {
                setTradeData(res.data.joined);
                setUserDto(res.data.user);
            })
            .catch((error) => {
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
                sessionStorage.removeItem("u_num");
                sessionStorage.removeItem("loginok");
                if (error.response.status === 401) {
                    Swal.fire({
                        icon: "error",
                        title: "로그인 해주세요.",
                    }).then((result) => navi("/user/login"));
                } else if (error.response.status === 403) {
                    Swal.fire({
                        icon: "warning",
                        title: "권한이 없습니다.",
                    }).then((result) => navi("/"));
                }
            });
    };

    //u_num에 해당하는 cart data 불러오기
    const cartdata = () => {
        const cartListUrl = localStorage.url + "/cart/list?u_num=" + u_num;

        axios
            .get(cartListUrl, {
                withCredentials: true,
                headers: {Authorization: `Bearer ${localStorage.accessToken}`},
            })
            .then((res) => {
                console.log("cart data 호출 성공");
                setCartlist(res.data);
                console.dir("data:" + JSON.stringify(cartlist));
            });
    };

    useEffect(() => {
        mypageform();
        cartdata();
    }, []);

    return (
        <div data-v-f263fda4="" data-v-39b2348a="" className="content_area">
            {userDto && (
                // 회원 정보 구역
                <div data-v-f263fda4="" className="my_home">
                    <div
                        data-v-5acef129=""
                        data-v-f263fda4=""
                        className="user_membership"
                    >
                        <div data-v-5acef129="" className="user_detail">
                            <div data-v-5acef129="" className="user_thumb">
                                <img
                                    data-v-5acef129=""
                                    src={userDto.isadmin === "ROLE_ADMIN" ? K : userDto.gender === "M" ? M : userDto.gender === "F" ? F : N}
                                    alt="사용자 이미지"
                                    className="thumb_img"
                                />
                            </div>
                            <div data-v-5acef129="" className="user_info">
                                <div data-v-5acef129="" className="info_box">
                                    {/* 이름 */}
                                    <strong data-v-5acef129="" className="name">
                                        {userDto.u_name}
                                        <span
                                            style={{fontSize: "0.8em"}}>{userDto.isadmin !== "ROLE_ADMIN" ? "고객님 정보" : ""}</span>
                                    </strong>
                                    {/* 이메일 */}
                                    <p data-v-5acef129="" className="email">
                                        {
                                            userDto.email.charAt(0) + // 첫 번째 글자 출력
                                            "*".repeat(userDto.email.split("@")[0].length - 2) + // 마지막 글자 제외하고 * 출력
                                            userDto.email.charAt(userDto.email.indexOf("@") - 1) + // 마지막 글자 출력
                                            "@" +
                                            userDto.email.split("@")[1] // @ 뒤 주소 출력
                                        }
                                    </p>
                                    {/* 프로필 버튼 */}
                                    <Link
                                        data-v-3d1bcc82=""
                                        data-v-5acef129=""
                                        to="/mypage/profile"
                                        className="btn btn outlinegrey small"
                                        type="button"
                                    >
                                        프로필 수정
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div data-v-5acef129="" className="membership_detail">
                            {/* 고객 권한, 가입일 */}
                            <Link
                                data-v-5acef129=""
                                to="#!"
                                className="membership_item disabled"
                            >
                                <strong
                                    data-v-5acef129=""
                                    className="info"
                                    style={{color: userDto.isadmin === "ROLE_ADMIN" ? "red" : ""}}
                                >
                                    {userDto.isadmin === "ROLE_ADMIN" ? "관리자" : "일반 회원"}
                                </strong>
                                <p data-v-5acef129="" className="title">
                                    {userDto.gaip.substring(0, 10)} 가입
                                </p>
                            </Link>
                            {/* 적립금 및 알림창 */}
                            <Link
                                data-v-5acef129=""
                                to="#!"
                                className="membership_item"
                                onClick={() => {
                                    setPointStyle("");
                                }}
                            >
                                <strong data-v-5acef129="" className="info">
                                    {userDto.point
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    P
                                </strong>
                                <p data-v-5acef129="" className="title">
                                    {" "}
                                    적립금{" "}
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div data-v-f263fda4="" className="inventory_box">
                        <div data-v-77bfdc51="" data-v-f263fda4="">
                            <div
                                data-v-6752ceb2=""
                                data-v-77bfdc51=""
                                className="my_home_title"
                            >
                                <h3 data-v-6752ceb2="" className="title">
                                    주문 내역
                                </h3>
                                <Link
                                    data-v-6752ceb2=""
                                    to="/mypage/order"
                                    className="btn_more"
                                >
                  <span data-v-6752ceb2="" className="btn_txt">
                    더보기
                  </span>
                                </Link>
                            </div>
                            <div data-v-77bfdc51="" className="purchase_list_tab inventory">
                                {/* 주문 내역 전체 건 수 */}
                                <div data-v-77bfdc51="" className="tab_item">
                                    <Link data-v-77bfdc51="" to="#!" className="tab_link">
                                        <dl data-v-77bfdc51="" className="tab_box">
                                            <dt data-v-77bfdc51="" className="title">
                                                <h6>
                                                    <b>전체</b>
                                                </h6>
                                            </dt>
                                            <dd
                                                data-v-77bfdc51=""
                                                className="count"
                                                style={{color: "#31B46E"}}
                                            >
                                                {tradeData && tradeData.length}
                                            </dd>
                                        </dl>
                                    </Link>
                                </div>
                                {/* 주문 내역 배송 전 건수 */}
                                <div data-v-77bfdc51="" className="tab_item">
                                    <Link data-v-77bfdc51="" to="#!" className="tab_link">
                                        <dl data-v-77bfdc51="" className="tab_box">
                                            <dt data-v-77bfdc51="" className="title">
                                                <h6>배송 전</h6>
                                            </dt>
                                            <dd
                                                data-v-77bfdc51=""
                                                className="count"
                                                style={{color: "#FF0000"}}
                                            >
                                                {tradeData &&
                                                    tradeData
                                                        .map((item) => item.state === "배송 전")
                                                        .reduce((prev, curr) => prev + curr, 0)}
                                            </dd>
                                        </dl>
                                    </Link>
                                </div>
                                {/* 주문 내역 배송 중 건수 */}
                                <div data-v-77bfdc51="" className="tab_item">
                                    <Link data-v-77bfdc51="" to="#!" className="tab_link">
                                        <dl data-v-77bfdc51="" className="tab_box">
                                            <dt data-v-77bfdc51="" className="title">
                                                <h6>배송 중</h6>
                                            </dt>
                                            <dd
                                                data-v-77bfdc51=""
                                                className="count"
                                                style={{color: "#0000FF"}}
                                            >
                                                {tradeData &&
                                                    tradeData
                                                        .map((item) => item.state === "배송 중")
                                                        .reduce((prev, curr) => prev + curr, 0)}
                                            </dd>
                                        </dl>
                                    </Link>
                                </div>
                                {/* 주문 내역 배송 완료 건수 */}
                                <div data-v-77bfdc51="" className="tab_item">
                                    <Link data-v-77bfdc51="" to="#!" className="tab_link">
                                        <dl data-v-77bfdc51="" className="tab_box">
                                            <dt data-v-77bfdc51="" className="title">
                                                <h6>배송 완료</h6>
                                            </dt>
                                            <dd
                                                data-v-77bfdc51=""
                                                className="count"
                                                style={{color: "#A020F0"}}
                                            >
                                                {tradeData &&
                                                    tradeData
                                                        .map((item) => item.state === "배송 완료")
                                                        .reduce((prev, curr) => prev + curr, 0)}
                                            </dd>
                                        </dl>
                                    </Link>
                                </div>
                            </div>
                            {tradeData && tradeData.length === 0 ? (
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
                                            <Link
                                                data-v-3d1bcc82=""
                                                data-v-541a17ff=""
                                                to="/product/list"
                                                className="btn outlinegrey small"
                                            >
                                                {" "}
                                                SHOP 바로가기{" "}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // 해당 유저의 주문 내역이 있을 경우
                                <div data-v-f263fda4="">
                                    <div
                                        data-v-50c8b1d2=""
                                        data-v-f263fda4=""
                                        className="purchase_list all bid"
                                    >
                                        <div
                                            style={{
                                                display: "grid",
                                                gridTemplateRows: "repeat(10, 1fr)",
                                                gridTemplateColumns: "1fr 3fr 1fr 1fr",
                                                textAlign: "center",
                                            }}
                                        >
                                            <hr style={{gridColumn: "1/5", gridRow: "1/2"}}/>
                                            <b style={{paddingTop: "6px"}}>주문일자</b>
                                            <b style={{paddingTop: "6px"}}>상품명</b>
                                            <b style={{paddingTop: "6px", textAlign: "right"}}>
                                                총 결제 금액
                                            </b>
                                            <b style={{paddingTop: "6px"}}>배송상태</b>
                                            <hr style={{gridColumn: "1/5", gridRow: "3/4"}}/>
                                            {tradeData &&
                                                tradeData.slice(0, 5).map((jitem, idx) => (
                                                    <React.Fragment key={idx}>
                            <span style={{fontWeight: "inherit"}}>
                              {jitem.day}
                            </span>
                                                        <span
                                                            style={{
                                                                color:
                                                                    jitem.state === "배송 전"
                                                                        ? "#FF0000"
                                                                        : jitem.state === "배송 중"
                                                                            ? "#0000FF"
                                                                            : "#A020F0",
                                                                textAlign: "left",
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                            }}
                                                        >
                              <Link to={`/product/detail/${jitem.p_num}`}>
                                <img
                                    alt={""}
                                    src={productUrl + jitem.photo}
                                    style={{maxWidth: "33px"}}
                                />
                                  &nbsp;{jitem.p_name}
                              </Link>
                            </span>
                                                        <span style={{textAlign: "right"}}>
                              {(jitem.lastprice * jitem.count)
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                            원
                            </span>
                                                        <span
                                                            style={{
                                                                color:
                                                                    jitem.state === "배송 전"
                                                                        ? "#FF0000"
                                                                        : jitem.state === "배송 중"
                                                                            ? "#0000FF"
                                                                            : "#A020F0",
                                                            }}
                                                        >
                              {jitem.state}
                            </span>
                                                    </React.Fragment>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* 장바구니 구역 */}
                    <div data-v-6752ceb2="" data-v-f263fda4="" className="my_home_title">
                        <h3 data-v-6752ceb2="" className="title">
                            {" "}
                            장바구니{" "}
                        </h3>
                        <Link data-v-6752ceb2="" to="/mypage/cart" className="btn_more">
              <span data-v-6752ceb2="" className="btn_txt">
                더보기
              </span>
                        </Link>
                    </div>
                    <div data-v-f263fda4="" className="recent_purchase">
                        <div
                            data-v-0c307fea=""
                            data-v-f263fda4=""
                            className="purchase_list_tab"
                        >
                            {/* 장바구니 전체 건 수 */}
                            <div data-v-0c307fea="" className="tab_item">
                                <Link data-v-0c307fea="" to="#!" className="tab_link">
                                    <dl data-v-0c307fea="" className="tab_box">
                                        <dt data-v-0c307fea="" className="title">
                                            <h6>
                                                <b>전체</b>
                                            </h6>
                                        </dt>
                                        <dd
                                            data-v-0c307fea=""
                                            className="count"
                                            style={{color: "#31B46E"}}
                                        >
                                            {/* u_num db에 저장되었는 cart 수량 */}
                                            {cartlist.Ucnt}
                                        </dd>
                                    </dl>
                                </Link>
                            </div>
                            {/* 주문 중 건 수 */}
                            <div data-v-0c307fea="" className="tab_item">
                                <Link data-v-0c307fea="" to="#!" className="tab_link">
                                    <dl data-v-0c307fea="" className="tab_box">
                                        <dt data-v-0c307fea="" className="title">
                                            <h6>주문 중</h6>
                                        </dt>
                                        <dd
                                            data-v-0c307fea=""
                                            className="count"
                                            style={{color: "#0000FF"}}
                                        >
                                            0
                                        </dd>
                                    </dl>
                                </Link>
                            </div>
                        </div>
                        {/* 장바구니 */}
                        <div
                            data-v-50c8b1d2=""
                            data-v-f263fda4=""
                            className="purchase_list all ask"
                        >
                            <table
                                className="table table-borderless"
                                style={{textAlign: "center", color: "black"}}
                            >
                                <thead>
                                <tr>
                                    <th style={{width: "100px"}}>번호</th>
                                    <th style={{width: "300px"}}>상품명</th>
                                    <th style={{width: "150px"}}>상품가격</th>
                                    <th style={{width: "100px"}}>수량</th>
                                    <th style={{width: "100px"}}>옵션</th>
                                    <th style={{width: "150px"}}>결제금액</th>
                                    <th>등록일</th>
                                </tr>
                                </thead>
                                <tbody>
                                {cartlist.list && cartlist.Ucnt === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            data-v-541a17ff=""
                                            className="desc"
                                            style={{color: "gray"}}
                                        >
                                            <br/>
                                            장바구니가 비어 있습니다.
                                        </td>
                                    </tr>
                                ) : (
                                    cartlist.list &&
                                    cartlist.list.slice(0, 5).map((citem, i) => (
                                        <tr key={i} c_num={citem.c_num}>
                                            <td style={{width: "100px"}}>{i + 1}</td>
                                            <Link to={"/product/detail/" + citem.p_num}>
                                                <td style={{width: "300px", textAlign: "left"}}>
                                                    <img
                                                        alt=""
                                                        src={productUrl + citem.photo}
                                                        width="50px"
                                                        height="50px"
                                                    />
                                                    {citem.p_name.slice(0, 15) + "..."}
                                                </td>
                                            </Link>
                                            <td style={{width: "150px", textAlign: "right"}}>
                                                {citem.price
                                                    .toString()
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                원
                                            </td>
                                            <td style={{width: "100px"}}>{citem.amount}</td>
                                            <td style={{width: "100px"}}>{citem.p_size}</td>
                                            <td style={{width: "150px", textAlign: "right"}}>
                                                {(citem.price * citem.amount)
                                                    .toString()
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                원
                                            </td>
                                            <td>{citem.addday.slice(0, 11)}</td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                            <div style={{textAlign: "center", marginTop: "30px"}}>
                                <Link
                                    data-v-3d1bcc82=""
                                    data-v-541a17ff=""
                                    to="/product/list"
                                    className="btn outlinegrey small"
                                >
                                    {" "}
                                    SHOP 바로가기{" "}
                                </Link>
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                    <div
                        data-v-1f7c6d3f=""
                        data-v-28cabbb5=""
                        data-v-f263fda4=""
                        className="layer_point layer lg"
                        style={{display: pointStyle}}
                    >
                        <div data-v-1f7c6d3f="" className="layer_container">
                            <div data-v-1f7c6d3f="" className="layer_header">
                                <h2 data-v-28cabbb5="" data-v-1f7c6d3f="" className="title">
                                    적립금 이용안내
                                </h2>
                            </div>
                            <div data-v-1f7c6d3f="" className="layer_content">
                                <div
                                    data-v-28cabbb5=""
                                    data-v-1f7c6d3f=""
                                    className="usable_wrap"
                                >
                                    <div
                                        data-v-28cabbb5=""
                                        data-v-1f7c6d3f=""
                                        className="usable_point"
                                    >
                                        <h3 data-v-28cabbb5="" data-v-1f7c6d3f="" className="title">
                                            사용 가능한 포인트
                                        </h3>
                                        <p
                                            data-v-28cabbb5=""
                                            data-v-1f7c6d3f=""
                                            className="point_box"
                                        >
                      <span
                          data-v-28cabbb5=""
                          data-v-1f7c6d3f=""
                          className="point"
                      >
                        {userDto.point
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </span>
                                            <span
                                                data-v-28cabbb5=""
                                                data-v-1f7c6d3f=""
                                                className="unit"
                                            >
                        P
                      </span>
                                        </p>
                                        <div
                                            data-v-28cabbb5=""
                                            data-v-1f7c6d3f=""
                                            className="point_info"
                                        >
                                            <p
                                                data-v-28cabbb5=""
                                                data-v-1f7c6d3f=""
                                                className="info_item"
                                            >
                                                포인트 유효기간은 운영 정책에 따라 달라질 수 있습니다.
                                            </p>
                                        </div>
                                    </div>
                                    <ul
                                        data-v-28cabbb5=""
                                        data-v-1f7c6d3f=""
                                        className="usable_list"
                                    >
                                        <li
                                            data-v-28cabbb5=""
                                            data-v-1f7c6d3f=""
                                            className="usable_item"
                                        >
                                            환불 / 취소 시, 사용한 포인트는 환불되지 않습니다.
                                        </li>
                                        <li
                                            data-v-28cabbb5=""
                                            data-v-1f7c6d3f=""
                                            className="usable_item"
                                        >
                                            사용하지 않으실 경우 유효기간이 지나면 자동 소멸됩니다.
                                        </li>
                                        <li
                                            data-v-28cabbb5=""
                                            data-v-1f7c6d3f=""
                                            className="usable_item"
                                        >
                                            회원탈퇴 시 모든 포인트는 사라집니다.
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    data-v-28cabbb5=""
                                    data-v-1f7c6d3f=""
                                    className="layer_btn"
                                >
                                    <Link
                                        data-v-3d1bcc82=""
                                        data-v-28cabbb5=""
                                        to="#!"
                                        className="btn outline medium"
                                        data-v-1f7c6d3f=""
                                        onClick={() => setPointStyle("none")}
                                    >
                                        {" "}
                                        확인{" "}
                                    </Link>
                                </div>
                            </div>
                            <Link
                                data-v-28cabbb5=""
                                data-v-1f7c6d3f=""
                                to="#!"
                                className="btn_layer_close"
                                onClick={() => setPointStyle("none")}
                            >
                                {" "}
                                <Close/>{" "}
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MypageForm;
