import { height } from "@mui/system";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { Link, useNavigate } from "react-router-dom";
// ES6 Modules or TypeScript
import Swal from "sweetalert2";
// import ModalBasic from "./ModalBasic";
import "../admin/button.css";
import AddressApi from "./AddressApi";

function MypageBasket(props) {
  const [u_num, setU_num] = useState(sessionStorage.u_num); // 세션의 u_num으로 초기값 설정
  const [cartlist, setCartlist] = useState(""); //cart table 데이터
  const productUrl = process.env.REACT_APP_URL + "/product/"; // 이미지 주소
  const [sumPayment, setSumPayment] = useState(""); //총 결제 금액
  const [u_data, setU_data] = useState(""); //유저정보
  const [perchasedata, setPerchasedata] = useState({}); //결제정보
  const navi = useNavigate();

  // CommonJS
  const Swal = require("sweetalert2"); //swal창

  //유저정보 불러오기
  const userdata = () => {
    let userUrl = localStorage.url + "/cart/userdata?u_num=" + u_num;

    axios.get(userUrl).then((res) => {
      // console.log("user 호출 성공");
      setU_data(res.data);
    });
  };

  //u_num에 해당하는 cart data 불러오기
  const cartdata = () => {
    const cartListUrl = localStorage.url + "/cart/list?u_num=" + u_num;

    axios.get(cartListUrl).then((res) => {
      // console.log("cart data 호출 성공");
      setCartlist(res.data);
      // console.dir("data:" + JSON.stringify(cartlist));
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
      // console.dir(checkedListArray);
      totalPay();
      // console.log("chkList:" + JSON.stringify(checkList));
    }
    // 전체 해제 시,
    else {
      setCheckList([]);
      totalPay();
    }
  });

  // 개별 체크 클릭 시 발생하는 함수
  const singleCheck = useCallback((checked, citem) => {
    if (checked) {
      setCheckList([...checkList, citem]);
      totalPay();
      // console.log("chkList:" + JSON.stringify(checkList));
    } else {
      setCheckList(checkList.filter((el) => el !== citem));
      totalPay();
    }
  });

  //장바구니 삭제
  const deleteCart = (e) => {
    // console.log("c_num" + e.target.value);
    let deleteUrl = localStorage.url + "/cart/delete?c_num=" + e.target.value;

    axios.get(deleteUrl).then((res) => {
      // console.log("axios 삭제 호출");
      alert("삭제되었습니다.");
      window.location.reload();
    });
  };

  //선택 삭제
  const selectDeleteCart = () => {
    let num = "";
    for (let i = 0; i < checkList.length; i++) {
      let c_num = checkList[i].c_num;
      // console.log(num);

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
    if (checkList.length === 0) {
      total = 0;
    }
    setSumPayment(total);
    total = "";
  };

  //주소 state
  // const [modalState, setModalState] = useState(false);
  // const [inputAddressValue, setInputAddressValue] = useState("");
  // const [inputZipCodeValue, setInputZipCodeValue] = useState("");
  const inputAddressValue = "";
  const inputZipCodeValue = "";

  // //주소 찾기
  // const postCodeStyle = {
  //   width: "400px",
  //   height: "400px",
  //   display: modalState ? "block" : "none",
  // }; // 스타일 정의 code

  // const onCompletePost = (data) => {
  //   setModalState(false);
  //   setInputAddressValue(data.address);
  //   setInputZipCodeValue(data.zonecode);
  // }; // onCompletePost 함수

  //주소 데이터
  // const [inputZipCodeValue, setInputZipCodeValue] = useState("");
  // const [inputAddressValue, setInputAddressValue] = useState("");

  // const getData = (inputZipCodeValue, inputAddressValue) => {
  //   setInputZipCodeValue(inputZipCodeValue);
  //   setInputAddressValue(inputAddressValue);
  // };
  // 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  function onCompletePost() {
    alert("전달");
  }

  //결제 버튼 클릭 시, Swal 이벤트
  function requestBtn() {
    // let b = sel();

    Swal.fire({
      title: "결제 정보 입력",
      html: `<h6 style="float:left;margin-left:50px;margin-top:30px">배송받을 이름</h6><br/>
          <input type="text" id="o_name" class="swal2-input" placeholder="구매자 이름 입력" value=${u_data.u_name} style="width:80%">
        <h6 style="float:left;margin-left:50px;margin-top:30px">배송받을 연락처 </h6><br/>
          <input type="text" id="o_hp" class="swal2-input" placeholder="전화번호 입력(-포함)" maxLength="13" oninput="this.value = this.value.replace(/[^0-9.]/g, '')" value=${u_data.hp} style="width:80%">
        <h6 style="float:left;margin-left:50px;margin-top:30px">배송받을 주소</h6><br/>
        <div class="input-group">
          <input type="address" id="addrcode" class="swal2-input" placeholder="우편번호" style="width:40%; margin-left:45px" >
          <button type='button' class="btn btn-secondary" style="width:30%; height:50px; margin-top:20px" onclick='window.open("AddressApi", "new window", "width=500,height=700")'>주소찾기</button>
        </div>
         <input type="address" id="o_addr" class="swal2-input" placeholder="주소입력" style="width:80%"  >
         <input type="address" id="o_addrdetail" class="swal2-input" placeholder="상세 주소 입력" style="width:80%">
        <h6 style="float:left;margin-left:50px;margin-top:30px">구매 이메일</h6><br/>
          <input type="email" id="o_email" class="swal2-input" placeholder="이메일 입력" value=${u_data.email} style="width:80%">`,
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      confirmButtonText: "결제하기",
      focusConfirm: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
      preConfirm: () => {
        // const o_name = Swal.getPopup().querySelector("#o_name").value;
        const o_name = document.getElementById("o_name").value;
        const o_hp = document.getElementById("o_hp").value;
        const addrcode = document.getElementById("addrcode").value;
        const o_addr = document.getElementById("o_addr").value;
        const o_addrdetail = document.getElementById("o_addrdetail").value;
        const o_email = document.getElementById("o_email").value;
        if (
          o_name === "" ||
          o_addr === "" ||
          o_hp === "" ||
          o_email === "" ||
          addrcode === "" ||
          o_addrdetail === ""
        ) {
          Swal.showValidationMessage(
            `잘못된 정보입니다. 다시 확인 후 입력해주세요`
          );
          return false;
        }

        return {
          o_name,
          o_hp,
          o_addr,
          addrcode,
          o_addrdetail,
          o_email,
        };
      },
    }).then((result) => {
      // console.dir(result);
      let p_nameArr = new Array();
      for (let i = 0; i < checkList.length; i++) {
        p_nameArr += checkList[i].p_name;
        // console.log("aa:" + p_nameArr);
      }

      if (result.isConfirmed) {
        //---------------------------------------------------------------

        const IMP = window.IMP; // 생략 가능
        IMP.init("imp81470772"); // 가맹점 식별 코드

        // IMP.request_pay(param, callback) 결제창 호출
        IMP.request_pay(
          {
            // param
            // pg: "html5_inicis.INIpayTest", // PG 모듈
            pg: "kakaopay.TC0ONETIME", // PG 모듈
            pay_method: "card", // 지불 수단
            merchant_uid: "order_" + new Date().getTime(), //가맹점에서 구별할 수 있는 고유한id
            name:
              p_nameArr.slice(0, 12) +
              " ... 외 " +
              (checkList.length - 1) +
              "건", // 상품명
            // amount: sumPayment, // 가격
            amount: "100",
            buyer_email: result.value.o_email,
            buyer_name: result.value.o_name, // 구매자 이름
            buyer_tel: result.value.o_hp, // 구매자 연락처
            buyer_addr:
              "(" +
              result.value.addrcode +
              ")" +
              result.value.o_addr +
              ", " +
              result.value.o_addrdetail, // 구매자 주소지
            // buyer_postcode: "01181", // 구매자 우편번호
            // m_redirect_url: localStorage.url+"/c"
          },
          (rsp) => {
            // callback
            // console.log("rsp:" + JSON.stringify(rsp));
            if (rsp.success) {
              // // 결제 성공 시, 출력 창
              // let msg = "결제가 완료되었습니다.\n";
              // msg += "고유ID : " + rsp.imp_uid + "\n";
              // msg += "상점 거래ID : " + rsp.merchant_uid + "\n";
              // msg += "결제 선택 : " + rsp.pg + "\n";
              // msg += "결제 방식 : " + rsp.pay_method + "\n";
              // msg += "결제 금액 : " + rsp.paid_amount + "\n";
              // // msg += "카드 승인번호 : " + rsp.apply_num + "\n";
              // msg += "상품명 : " + rsp.name + "\n";
              // msg += "구매자 이름 : " + rsp.buyer_name + "\n";
              // msg += "구매자 번호 : " + rsp.buyer_tel + "\n";
              // msg += "구매자 주소 : " + rsp.buyer_addr + "\n";
              // msg += "구매자 이메일 : " + rsp.buyer_email + "\n";

              // alert("결제 성공:" + msg);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "결제가 완료되었습니다",
                showConfirmButton: false,
                timer: 1500,
              });

              for (let i = 0; i < checkList.length; i++) {
                let tradeInsertUrl = localStorage.url + "/trade/insert";

                axios
                  .post(tradeInsertUrl, {
                    u_num,
                    p_num: checkList[i].p_num,
                    merchant_uid: rsp.merchant_uid,
                    t_name: rsp.buyer_name,
                    t_hp: rsp.buyer_tel,
                    t_email: rsp.buyer_email,
                    t_addr: rsp.buyer_addr,
                    count: checkList[i].amount,
                    lastprice: sumPayment,
                    p_size: checkList[i].p_size,
                    state: "결제완료",
                  })
                  .then((res) => {
                    let deleteUrl =
                      localStorage.url +
                      "/cart/delete?c_num=" +
                      checkList[i].c_num;

                    axios.get(deleteUrl).then((res) => {
                      window.location.reload();
                    });
                  })
                  .catch((error) => {
                    console.log("실패" + error);
                  });
              }
            } else {
              // 결제 실패 시 로직,
              alert("실패 :" + rsp.error_msg);
            }
          }
        );
        //--------------------------------------------------------------------
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "결제가 취소되었습니다",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

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
      <h1 style={{ textAlign: "left" }}>Order / Payment</h1>
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
                    style={{ marginTop: "46px" }}
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
                    className="btn btn-secondary"
                    value={citem.c_num}
                  >
                    수정
                  </button>
                  <br />
                  <button
                    type="button"
                    className="btn btn-secondary"
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
                {checkList && checkList.length === 0 ? (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => alert("선택된 항목이 없습니다")}
                  >
                    선택 삭제
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={selectDeleteCart}
                  >
                    선택 삭제
                  </button>
                )}
              </td>
              <td colSpan={5} style={{ textAlign: "center" }}>
                <p>
                  총 결제 금액 : \
                  {sumPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </td>
              <td colSpan={2} style={{ textAlign: "center" }}>
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
                  <button className="btn btn-success" onClick={requestBtn}>
                    결제하기
                  </button>
                )}
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
      {/* <DaumPostcodeEmbed
        style={postCodeStyle}
        onComplete={onCompletePost}
      ></DaumPostcodeEmbed> */}
      {false && <AddressApi onCompletePost={onCompletePost} />}
      {/* <div id="popupDom">
        {isPopupOpen && (
          <PopupDom>
            <PopupPostCode onClose={closePostCode} />
          </PopupDom>
        )}
      </div> */}
    </div>
  );
}

export default MypageBasket;
