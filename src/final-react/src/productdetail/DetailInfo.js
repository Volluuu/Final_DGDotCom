import {
  AddCircleOutlineRounded,
  RemoveCircleOutline,
} from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    setItemlist({
      ...row,
      p_size: itemlist.p_size,
      amount: amount,
    });
  }, [amount]);

  console.log("amount:" + amount);
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
          alert("장바구니 추가");
          setItemlist([]);
          setAmount(1);
          navi("/product/list");
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
            className="form-select sizeselect"
            p_num={row.p_num}
            onClick={additemlist}
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
          <select className="form-select sizeselect" onClick={additemlist}>
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
      <h1>info</h1>
      <span>{row.brand}</span>
      <br />
      <span>{row.p_name}</span>
      <br />
      <span>{row.category}</span>
      <br />
      <span>
        {Number(row.price)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        원
      </span>
      <br />
      <div>
        <span>옵션 선택</span>
        {selectform(row.category)}
      </div>
      <div>
        <span>수량</span>
        <br />
        <RemoveCircleOutline value={amount} onClick={subamount} />
        &nbsp;<span>{amount}</span>&nbsp;
        <AddCircleOutlineRounded value={amount} onClick={addamount} />
      </div>
      <div>
        <h1>
          총 결제 금액 : {itemlist.amount && itemlist.amount} //
          {Number(row.price * amount)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          원
        </h1>
      </div>
      <button type="button" className="btn btn-outline-danger purchasebtn">
        구매
      </button>
      &nbsp;&nbsp;
      <button
        type="button"
        className="btn btn-outline-success cartbtn"
        onClick={addcart}
      >
        장바구니
      </button>
      <br />
    </div>
  );
}

export default DetailInfo;
