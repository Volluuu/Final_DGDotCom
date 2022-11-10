import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MypageBasket(props) {
  const [u_num, setU_num] = useState(sessionStorage.u_num); // 세션의 u_num으로 초기값 설정
  const [cartlist, setCartlist] = useState(""); //cart table 데이터
  const productUrl = process.env.REACT_APP_URL + "/product/"; // 이미지 주소

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
      console.log("chkarr2:" + JSON.stringify(checkedListArray));
    }
    // 전체 해제 시,
    else {
      setCheckList([]);
    }
  });

  console.log("chkList:" + JSON.stringify(checkList));
  // 개별 체크 클릭 시 발생하는 함수
  const singleCheck = useCallback((checked, citem) => {
    if (checked) {
      setCheckList([...checkList, citem]);
    } else {
      setCheckList(checkList.filter((el) => el !== citem));
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

  useEffect(() => {
    cartdata();
  }, []);

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
            <th style={{ width: "8%" }}>할인</th>
            <th style={{ width: "5%" }}>수량</th>
            <th style={{ width: "10%" }}>주문금액</th>
            <th style={{ width: "12%" }}>주문관리</th>
            <th style={{ width: "8%" }}>배송비</th>
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
                    style={{ marginTop: "17px" }}
                    onChange={(e) => singleCheck(e.target.checked, citem)}
                    checked={checkList.includes(citem) ? true : false}
                  />
                </td>

                <td style={{ textAlign: "left" }}>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={"#"}
                  >
                    <img
                      alt=""
                      src={productUrl + citem.photo}
                      width="60px"
                      height="60px"
                    />
                    &nbsp; &nbsp;
                    {citem.p_name.length < 13
                      ? citem.p_name
                      : citem.p_name.slice(0, 13) + "..."}
                  </Link>
                </td>
                <td>{citem.p_size}</td>
                <td style={{ textAlign: "right" }}>
                  {citem.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </td>
                <td>discount</td>
                <td>{citem.amount}</td>
                <td style={{ textAlign: "right" }}>
                  {(citem.price * citem.amount)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-dark btn-sm"
                    value={citem.c_num}
                    onClick={deleteCart}
                  >
                    삭제
                  </button>
                </td>
                <td>배송비</td>
              </tr>
            ))}
          <tr>
            <td colSpan={2}>
              <button type="button" className="btn btn-outline-danger btn-sm">
                선택 삭제
              </button>
            </td>
            <td colSpan={6} style={{ textAlign: "center" }}>
              총 결제 금액 :
            </td>
            <td colSpan={2} style={{ textAlign: "right" }}>
              <button type="button" className="btn btn-outline-success">
                결제 하기
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MypageBasket;
