import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// ES6 Modules or TypeScript
import Swal from "sweetalert2";

function MypageBasket(props) {
  const [u_num, setU_num] = useState(sessionStorage.u_num); // 세션의 u_num으로 초기값 설정
  const [cartlist, setCartlist] = useState(""); //cart table 데이터
  const productUrl = process.env.REACT_APP_URL + "/product/"; // 이미지 주소
  const [sumPayment, setSumPayment] = useState(""); //총 결제 금액
  const navi = useNavigate();
  // CommonJS
  const Swal = require("sweetalert2"); //swal창

  Swal.bindClickHandler();

  Swal.mixin({
    toast: true,
  }).bindClickHandler("data-swal-toast-template");

  //u_num에 해당하는 cart data 불러오기
  const cartdata = () => {
    const cartListUrl = localStorage.url + "/cart/list?u_num=" + u_num;

    axios.get(cartListUrl).then((res) => {
      console.log("cart data 호출 성공");
      setCartlist(res.data);
      console.dir("data:" + JSON.stringify(cartlist));
    });
  };

  // 체크된 아이템을 담을 배열
  const [checkList, setCheckList] = useState([]);

  // 전체 체크 클릭 시 발생하는 함수
  const allCheck = useCallback((checked) => {
    // 전체 선택 시,
    if (checked) {
      const checkedListArray = [];
      cartlist.list.forEach((list) => checkedListArray.push(list));
      setCheckList(checkedListArray);
      // console.log("chkarr2:" + JSON.stringify(checkedListArray));
      console.dir(checkedListArray);
      totalPay();
    }
    // 전체 해제 시,
    else {
      setCheckList([]);
      totalPay();
    }
  });

  console.log("chkList:" + JSON.stringify(checkList));
  // 개별 체크 클릭 시 발생하는 함수
  const singleCheck = useCallback((checked, citem) => {
    if (checked) {
      setCheckList([...checkList, citem]);
      totalPay();
    } else {
      setCheckList(checkList.filter((el) => el !== citem));
      totalPay();
    }
  });

  //장바구니 삭제
  const deleteCart = (e) => {
    console.log("c_num" + e.target.value);
    let deleteUrl = localStorage.url + "/cart/delete?c_num=" + e.target.value;

    axios.get(deleteUrl).then((res) => {
      console.log("axios 삭제 호출");
      alert("삭제되었습니다.");
      window.location.reload();
    });
  };

  //선택 삭제
  const selectDeleteCart = () => {
    let num = "";
    for (let i = 0; i < checkList.length; i++) {
      let c_num = checkList[i].c_num;
      console.log(num);

      let selDeleteUrl = localStorage.url + "/cart/delete?c_num=" + c_num;

      axios.get(selDeleteUrl).then((res) => {
        window.location.reload();
      });
    }
    alert(checkList.length + "개가 삭제되었습니다");
  };

  //총 결제 금액 계산
  const totalPay = () => {
    let total = 0;
    for (let i = 0; i < checkList.length; i++) {
      total += Number(
        checkList[i].discount !== 0
          ? ((checkList[i].price * checkList[i].discount) / 100) *
              checkList[i].amount
          : checkList[i].price * checkList[i].amount
      );
    }
    if (checkList.length == 0) {
      total = 0;
    }
    setSumPayment(total);
    total = "";
  };

  // 결제
  const requestPay = () => {
    const IMP = window.IMP; // 생략 가능
    IMP.init("imp81470772"); // 가맹점 식별 코드
    // IMP.request_pay(param, callback) 결제창 호출
    IMP.request_pay(
      {
        // param
        pg: "kakaopay.TC0ONETIME", // PG사 선택란 : 카카오페이
        pay_method: "card", // 지불 수단
        merchant_uid: "merchant_" + new Date().getTime(), //가맹점에서 구별할 수 있는 고유한id
        name: "test", // 상품명
        amount: sumPayment, // 가격
        buyer_email: "test@gmail.com",
        buyer_name: "tester", // 구매자 이름
        buyer_tel: "010-4242-4242", // 구매자 연락처
        buyer_addr: "서울특별시 강남구 신사동", // 구매자 주소지
        buyer_postcode: "01181", // 구매자 우편번호
      },
      (rsp) => {
        // callback
        if (rsp.success) {
          // 결제 성공 시 로직,
          let msg = "결제가 완료되었습니다.";
          msg += "고유ID : " + rsp.imp_uid;
          msg += "상점 거래ID : " + rsp.merchant_uid;
          msg += "결제 금액 : " + rsp.paid_amount;
          msg += "카드 승인번호 : " + rsp.apply_num;
          alert("결제 성공~" + msg);
        } else {
          // 결제 실패 시 로직,
          alert("실패 :" + rsp.error_msg);
        }
      }
    );
  };

  //초기 실행
  useEffect(() => {
    cartdata();
    totalPay();
  }, []);

  //체크된 값들이 추가될때 마다 결제 금액 계산하기 위해 렌더링
  useEffect(() => {
    totalPay();
    console.log(sumPayment);
  }, [checkList]);

  return (
    <div data-v-f263fda4="" data-v-39b2348a="" className="content_area">
      <h1>Order / Payment</h1>
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
                  style={{ color: "#31B46E" }}
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
                  <h6>선택된 상품 수</h6>
                </dt>
                <dd
                  data-v-0c307fea=""
                  className="count"
                  style={{ color: "#0000FF" }}
                >
                  {checkList.length}
                </dd>
              </dl>
            </Link>
          </div>
        </div>
      </div>
      <br />
      <table>
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th style={{ width: "5%" }}>번호</th>
            <th style={{ width: "5%" }}>
              <input
                type="checkbox"
                name="select-all"
                className="form-check-input"
                onClick={totalPay}
                onChange={(e) => allCheck(e.target.checked)}
                checked={
                  checkList.length === 0
                    ? false
                    : checkList.length === cartlist.list.length
                    ? true
                    : false
                }
              />
              선택
            </th>
            <th style={{ width: "20%" }}>상품명</th>
            <th style={{ width: "8%" }}>사이즈</th>
            <th style={{ width: "10%" }}>판매가</th>
            <th style={{ width: "8%" }}>할인율</th>
            <th style={{ width: "5%" }}>수량</th>
            <th style={{ width: "10%" }}>주문금액</th>
            <th style={{ width: "12%" }}>주문관리</th>
            <th style={{ width: "9%" }}>배송비</th>
          </tr>
        </thead>
        <tbody>
          {cartlist &&
            cartlist.list.map((citem, i) => (
              <tr key={i} c_num={citem.c_num} style={{ textAlign: "center" }}>
                <td>{i + 1}</td>
                <td style={{ verticalAlign: "top" }}>
                  <input
                    type="checkbox"
                    name="check-item"
                    key={citem.c_num}
                    className="form-check-input"
                    style={{ marginTop: "30px" }}
                    onClick={totalPay}
                    onChange={(e) => singleCheck(e.target.checked, citem)}
                    checked={checkList.includes(citem) ? true : false}
                  />
                </td>

                <td style={{ textAlign: "left" }}>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                      verticalAlign: "middle",
                      width: "100%",
                      lineHeight: "80px",
                    }}
                    to={"/product/detail/" + citem.p_num}
                  >
                    <img
                      alt=""
                      src={productUrl + citem.photo}
                      width="60px"
                      height="60px"
                    />
                    &nbsp; &nbsp;
                    {citem.p_name.length < 10
                      ? citem.p_name
                      : citem.p_name.slice(0, 10) + "..."}
                  </Link>
                </td>
                <td>{citem.p_size}</td>
                <td style={{ textAlign: "right" }}>
                  {citem.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </td>
                <td>{citem.discount}</td>
                <td>{citem.amount}</td>
                <td style={{ textAlign: "right" }}>
                  {citem.discount === 0
                    ? (citem.price * citem.amount)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : (((citem.price * citem.discount) / 100) * citem.amount)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-dark btn-sm"
                    value={citem.c_num}
                  >
                    수정
                  </button>
                  <br />
                  <button
                    type="button"
                    className="btn btn-outline-dark btn-sm"
                    value={citem.c_num}
                    onClick={deleteCart}
                  >
                    삭제
                  </button>
                </td>
                <td>
                  배송비
                  <br />
                  <p style={{ fontSize: "5px" }}>(10만원이상 무료배송)</p>
                </td>
              </tr>
            ))}
          {cartlist && cartlist.list.length !== 0 ? (
            <tr>
              <td colSpan={2}>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={selectDeleteCart}
                >
                  선택 삭제
                </button>
              </td>
              <td colSpan={6} style={{ textAlign: "center" }}>
                <p>
                  총 결제 금액 : \
                  {sumPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </td>
              <td colSpan={2} style={{ textAlign: "right" }}>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={requestPay}
                >
                  결제 하기
                </button>
                <button data-swal-template="#my-template">Trigger modal</button>
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                <br />
                <br />
                <br />
                <p>장바구니가 비었습니다</p>
                <br />
                <Link
                  data-v-3d1bcc82=""
                  data-v-541a17ff=""
                  to="/product/list/1"
                  className="btn outlinegrey small"
                >
                  {" "}
                  SHOP 바로가기{" "}
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <template id="my-template">
        <swal-title>Save changes to "Untitled 1" before closing?</swal-title>
        <swal-icon type="warning" color="red"></swal-icon>
        <swal-button type="confirm">Save As</swal-button>
        <swal-button type="cancel">Cancel</swal-button>
        <swal-button type="deny">Close without Saving</swal-button>
        <swal-param name="allowEscapeKey" value="false" />
        <swal-param name="customClass" value='{ "popup": "my-popup" }' />
        <swal-function-param
          name="didOpen"
          value="popup => console.log(popup)"
        />
      </template>
    </div>
  );
}

export default MypageBasket;
