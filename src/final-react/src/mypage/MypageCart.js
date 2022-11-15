import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// ES6 Modules or TypeScript
import Swal from "sweetalert2";
// import ModalBasic from "./ModalBasic";
import "../admin/button.css";

function MypageBasket(props) {
  const [u_num, setU_num] = useState(sessionStorage.u_num); // 세션의 u_num으로 초기값 설정
  const [cartlist, setCartlist] = useState(""); //cart table 데이터
  const productUrl = process.env.REACT_APP_URL + "/product/"; // 이미지 주소
  const [sumPayment, setSumPayment] = useState(""); //총 결제 금액
  const [u_data, setU_data] = useState(""); //유저정보
  const [perchasedata, setPerchasedata] = useState(""); //결제정보
  const navi = useNavigate();

  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  // CommonJS
  const Swal = require("sweetalert2"); //swal창

  //유저정보 불러오기
  const userdata = () => {
    let userUrl = localStorage.url + "/cart/userdata?u_num=" + u_num;

    axios.get(userUrl).then((res) => {
      console.log("user 호출 성공");
      setU_data(res.data);
    });
  };

  //결제 버튼 클릭 시, Swal 이벤트
  async function requestBtn() {
    await Swal.fire({
      title: "결제 정보 입력",
      html: `<p style={{textAlign:'left'}}>배송받을 이름</p><br/><input type="text" id="o_name" class="swal2-input" placeholder="구매자 이름 입력" >
  <p style={{textAlign:'left'}}>배송받을 연락처 </p><br/><input type="text" id="o_hp" class="swal2-input" placeholder="전화번호 입력(-없이)" maxLength="10" oninput="this.value = this.value.replace(/[^0-9.]/g, '')">
  <p style={{textAlign:'left'}}>배송받을 주소</p><br/><div className="input-group"><input type="address" id="o_addr" class="swal2-input" placeholder="주소입력" >
  <p style={{textAlign:'left'}}>구매 이메일</p><br/><input type="email" id="o_email" class="swal2-input" placeholder="이메일 입력">
  `,
      confirmButtonText: "결제하기",
      focusConfirm: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
      preConfirm: () => {
        const o_name = Swal.getPopup().querySelector("#o_name").value;
        const o_hp = Swal.getPopup().querySelector("#o_hp").value;
        const o_addr = Swal.getPopup().querySelector("#o_addr").value;
        const o_email = Swal.getPopup().querySelector("#o_email").value;
        if (o_name === "" || o_addr === "" || o_hp === "" || o_email === "") {
          Swal.showValidationMessage(
            `잘못된 정보입니다. 다시 확인 후 입력해주세요`
          );
          return false;
        }
        return { o_name, o_hp, o_addr, o_email };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        requestPay(result);
      } else if (result.isDenied) {
        alert("취소됨");
      }
    });
  }

  // async function requestBtn() {
  //   const { value: formValues } = await Swal.fire({
  //     title: "결제 정보 입력",
  //     html:
  //       '<input id="swal-input1" class="swal2-input">' +
  //       '<input id="swal-input2" class="swal2-input">' +
  //       '<input id="swal-input3" class="swal2-input">' +
  //       '<input id="swal-input4" class="swal2-input">',
  //     confirmButtonText: "결제하기",
  //     focusConfirm: false,
  //     allowOutsideClick: false,
  //     allowEscapeKey: false,
  //     showCancelButton: true,
  //     preConfirm: () => {
  //       const o_name = document.getElementById("#swal-input1").value;
  //       const o_hp = document.getElementById("#swal-input2").value;
  //       const o_addr = document.getElementById("#swal-input3").value;
  //       const o_email = document.getElementById("#swal-input4").value;
  //       if (o_name === "" || o_addr === "" || o_hp === "" || o_email === "") {
  //         Swal.showValidationMessage(
  //           `잘못된 정보입니다. 다시 확인 후 입력해주세요`
  //         );
  //         return false;
  //       }
  //       return { o_name, o_hp, o_addr, o_email };
  //     },
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire(JSON.stringify(formValues));
  //     }
  //   });
  // }

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
  const requestPay = (result) => {
    const IMP = window.IMP; // 생략 가능
    IMP.init("imp81470772"); // 가맹점 식별 코드
    // IMP.request_pay(param, callback) 결제창 호출
    IMP.request_pay(
      {
        // param
        pg: "html5_inicis.INIpayTest", // PG 모듈
        pay_method: "card", // 지불 수단
        merchant_uid: "order_" + new Date().getTime(), //가맹점에서 구별할 수 있는 고유한id
        name: result.p_name, // 상품명
        // amount: sumPayment, // 가격
        amount: "100",
        buyer_email: result.o_email,
        buyer_name: result.o_name, // 구매자 이름
        buyer_tel: result.o_hp, // 구매자 연락처
        buyer_addr: result.o_addr, // 구매자 주소지
        // buyer_postcode: "01181", // 구매자 우편번호
      },
      (rsp) => {
        // callback
        if (rsp.success) {
          // 결제 성공 시, 출력 창
          let msg = "결제가 완료되었습니다.\n";
          msg += "고유ID : " + rsp.imp_uid + "\n";
          msg += "상점 거래ID : " + rsp.merchant_uid + "\n";
          msg += "결제 선택 : " + rsp.pg + "\n";
          msg += "결제 방식 : " + rsp.pay_method + "\n";
          msg += "결제 금액 : " + rsp.paid_amount + "\n";
          msg += "카드 승인번호 : " + rsp.apply_num + "\n";
          msg += "상품명 : " + rsp.name + "\n";
          msg += "구매자 이름 : " + rsp.buyer_name + "\n";
          msg += "구매자 번호 : " + rsp.buyer_hp + "\n";
          msg += "구매자 주소 : " + rsp.buyer_addr + "\n";
          msg += "구매자 이메일 : " + rsp.buyer_email + "\n";

          alert("결제 성공:" + msg);
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
    userdata();
  }, []);

  //체크된 값들이 추가될때 마다 결제 금액 계산하기 위해 렌더링
  useEffect(() => {
    totalPay();
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
                    className="btn-3d.cyan"
                    value={citem.c_num}
                  >
                    수정
                  </button>
                  <br />
                  <button
                    type="button"
                    className="btn-3d.cyan"
                    value={citem.c_num}
                    onClick={deleteCart}
                  >
                    삭제
                  </button>
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
              <td colSpan={5} style={{ textAlign: "center" }}>
                <p>
                  총 결제 금액 : \
                  {sumPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </td>
              <td colSpan={2} style={{ textAlign: "right" }}>
                {/* <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={requestPay}
                >
                  결제 하기
                </button> */}
                {checkList && checkList.length === 0 ? (
                  <button
                    className="btn btn-secondary"
                    onClick={() => alert("선택된 항목이 없습니다")}
                  >
                    결제하기
                  </button>
                ) : (
                  <button className="btn-3d.green" onClick={requestBtn}>
                    결제하기
                  </button>
                )}
                <button type="button" className="btn btn-danger">
                  확인용
                </button>
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
                  to="/product/list"
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
      {/* <button onClick={showModal}>모달 띄우기</button>
      {modalOpen && <ModalBasic setModalOpen={setModalOpen} />} */}
    </div>
  );
}

export default MypageBasket;
