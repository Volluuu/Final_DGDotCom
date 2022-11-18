import {
  AddCircleOutlineRounded,
  Close,
  RemoveCircleOutline,
} from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function DetailInfo(props) {
  // DetailDto
  const { row } = props;

  //이동 Hook
  const navi = useNavigate();

  //로그인한 u_num
  const u_num = sessionStorage.u_num;
  console.log("u_num:" + Number(u_num));

  //amount(수량)
  const [amount, setAmount] = useState(1);
  const [cnt, setCnt] = useState(0);

  //수량 증가
  const addamount = () => {
    if (amount < 5) {
      setAmount(amount + 1);
    }
    setItemlist({ ...itemlist, amount });
  };
  //수량 감소
  const subamount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
    setItemlist({ ...itemlist, amount });
  };

  //데이터를 담을 배열
  const [itemlist, setItemlist] = useState({});
  console.log("1. itemlist:" + JSON.stringify(itemlist));

  //데이터 담는 함수
  const additemlist = (e) => {
    setItemlist({
      ...row,
      p_size: e.target.value,
      amount: amount,
    });
  };

  //유저정보
  const [u_data, setU_data] = useState("");
  //유저정보 불러오기
  const userdata = () => {
    let userUrl = localStorage.url + "/cart/userdata?u_num=" + u_num;

    axios.get(userUrl).then((res) => {
      // console.log("user 호출 성공");
      setU_data(res.data);
    });
  };

  //결제
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
          <button type='button' class="btn btn-secondary" style="width:30%; height:50px; margin-top:20px" onclick='window.open("AddressApi", "", "width=500,height=700")' >주소찾기</button>
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
            name: itemlist.p_name,
            // amount: sumPayment, // 가격
            amount: "100",
            // amount: itemlist.price * amount,
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
              let msg = "결제가 완료되었습니다.\n";
              msg += "고유ID : " + rsp.imp_uid + "\n";
              msg += "상점 거래ID : " + rsp.merchant_uid + "\n";
              msg += "결제 선택 : " + rsp.pg + "\n";
              msg += "결제 방식 : " + rsp.pay_method + "\n";
              msg += "결제 금액 : " + rsp.paid_amount + "\n";
              // msg += "카드 승인번호 : " + rsp.apply_num + "\n";
              msg += "상품명 : " + rsp.name + "\n";
              msg += "구매자 이름 : " + rsp.buyer_name + "\n";
              msg += "구매자 번호 : " + rsp.buyer_tel + "\n";
              msg += "구매자 주소 : " + rsp.buyer_addr + "\n";
              msg += "구매자 이메일 : " + rsp.buyer_email + "\n";

              alert("결제 성공:" + msg);
              // Swal.fire({
              //   position: "center",
              //   icon: "success",
              //   title: "결제가 완료되었습니다",
              //   showConfirmButton: false,
              //   timer: 1500,
              // });

              let tradeInsertUrl = localStorage.url + "/cart/insertTrade";

              axios
                .post(tradeInsertUrl, {
                  u_num,
                  p_num: itemlist.p_num,
                  merchant_uid: rsp.merchant_uid,
                  t_name: rsp.buyer_name,
                  t_hp: rsp.buyer_tel,
                  t_email: rsp.buyer_email,
                  t_addr: rsp.buyer_addr,
                  count: itemlist.amount,
                  lastprice: itemlist.price * itemlist.amount,
                  p_size: itemlist.p_size,
                  state: "결제완료",
                })
                .then((res) => {
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "결제가 완료되었습니다",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navi("/mypage/all");
                })
                .catch((error) => {
                  console.log("실패" + error);
                });
            } else {
              // 결제 실패 시 로직,
              Swal.fire({
                position: "center",
                icon: "success",
                title: rsp.error_msg,
                showConfirmButton: false,
                timer: 1500,
              });
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

  useEffect(() => {
    setItemlist({
      ...row,
      p_size: itemlist.p_size,
      amount: amount,
    });
  }, [amount]);

  // console.log("amount:" + amount);
  //장바구니 이벤트
  const addcart = (e) => {
    let insertUrl = localStorage.url + "/cart/insert";

    if (itemlist.p_size != null) {
      axios
        .post(insertUrl, {
          u_num,
          p_num: itemlist.p_num,
          p_size: itemlist.p_size,
          amount,
        })
        .then((res) => {
          // alert("장바구니 추가");
          Swal.fire({
            title: "장바구니에 추가되었습니다",
            text: "장바구니로 이동하시겠습니까?",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "장바구니로 이동",
          }).then((result) => {
            if (result.isConfirmed) {
              navi("/mypage/cart");
            }
          });
          setItemlist([]);
          setAmount(1);
          // navi("/product/list");
        });
    } else {
      alert("사이즈를 선택해주세요");
      return;
    }
  };

  // select 양식 함수
  function selectform() {
    const category = row.category;
    switch (category) {
      case "스몰 레더":
      case "가방":
      case "스카프":
      case "모자":
      case "기타":
      case "벨트":
      case "쥬얼리":
      case "시계":
        return (
          <select
            className="form-select"
            p_num={row.p_num}
            onClick={additemlist}
            style={{ width: "300px", cursor: "pointer" }}
          >
            <option disabled selected>
              선택
            </option>
            <option value="Free">Free</option>
          </select>
        );
      case "자켓":
      case "후드":
      case "스웨트 셔츠":
      case "반팔 티셔츠":
      case "셔츠":
      case "긴팔 티셔츠":
      case "니트 웨어":
      case "바지":
      case "반바지":
      case "코트":
      case "패딩":
        return (
          <select
            className="form-select sizeselect"
            p_num={row.p_num}
            onClick={additemlist}
            style={{ width: "300px", cursor: "pointer" }}
          >
            <option disabled selected>
              선택
            </option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        );

      case "샌들":
      case "슬리퍼":
      case "스니커즈":
      case "로퍼/플랫":
        return (
          <select
            className="form-select sizeselect"
            p_num={row.p_num}
            onClick={additemlist}
            style={{ width: "300px", cursor: "pointer" }}
          >
            <option disabled selected>
              선택
            </option>
            <option value="230">230mm</option>
            <option value="240">240mm</option>
            <option value="250">250mm</option>
            <option value="260">260mm</option>
            <option value="270">270mm</option>
            <option value="280">280mm</option>
          </select>
        );
      default:
        return (
          <select
            className="form-select sizeselect"
            onClick={additemlist}
            style={{ width: "300px", cursor: "pointer" }}
          >
            <option disabled selected>
              선택
            </option>
            <option disabled>재고 없음</option>
          </select>
        );
    }
  }

  return (
    <div>
      <h1>{row.category}</h1>
      <br />
      <h3>{row.brand}</h3>
      <h5>{row.p_name}</h5>

      <br />
      <h5>
        {Number(row.price)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        원
      </h5>
      <br />
      <div>
        <p>옵션 선택</p>
        {selectform(row.category)}
      </div>
      <br />
      <div>
        <p>수량</p>
        <RemoveCircleOutline
          value={amount}
          onClick={subamount}
          style={{ cursor: "pointer" }}
        />
        &nbsp;<span>{amount}</span>&nbsp;
        <AddCircleOutlineRounded
          value={amount}
          onClick={addamount}
          style={{ cursor: "pointer" }}
        />
      </div>
      <br />
      {itemlist && itemlist.p_name === null ? (
        <></>
      ) : (
        <div
          style={{
            boxShadow: "5px 5px 10px gray",
            width: "50%",
            float: "right",
          }}
        >
          <Close style={{ float: "right", cursor: "pointer" }}></Close>
          <p>{itemlist.p_name}</p>
          <p>{itemlist.amount}</p>
          <h5>
            총 결제 금액 : {itemlist.amount && itemlist.amount} /
            {Number(row.price * amount)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            원
          </h5>
        </div>
      )}
      <br />
      <br />
      <br />
      <br />
      <div></div>
      <div style={{ textAlign: "center" }}>
        <button
          type="button"
          className="btn btn-outline-danger btn-lg purchasebtn"
          onClick={requestBtn}
        >
          구매
        </button>
        &nbsp;&nbsp;
        <button
          type="button"
          className="btn btn-outline-success btn-lg cartbtn"
          onClick={addcart}
        >
          장바구니
        </button>
        &nbsp;&nbsp;
        <button
          type="button"
          className="btn btn-outline-info btn-lg"
          onClick={() => navi("/product/list")}
        >
          상점으로
        </button>
      </div>
      <br />
    </div>
  );
}

export default DetailInfo;
