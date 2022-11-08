import {
  AddCircleOutlineRounded,
  RemoveCircleOutline,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";

function DetailInfo(props) {
  // DetailDto
  const { row } = props;

  //로그인한 u_num
  const u_num = sessionStorage.u_num;
  console.log("u_num:" + Number(u_num));

  //size
  const [size, setSize] = useState("");

  //amount(수량)
  const [amount, setAmount] = useState(1);

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
  const [itemlist, setItemlist] = useState({
    ...row,
    size: "",
    amount: amount,
  });
  console.log("1. itemlist:" + JSON.stringify(itemlist));

  //데이터 담는 함수
  const additemlist = (e) => {
    setItemlist({
      ...row,
      size: e.target.value,
      amount,
    });
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
            <option value="F" selected>
              Free
            </option>
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
            onChange={additemlist}
            defaultValue={size}
          >
            <option value="S" selected>
              S
            </option>
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
            defaultValue={size}
          >
            <option value="230" selected>
              230mm
            </option>
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
            defaultValue={size}
          >
            <option selected disabled>
              재고 없음
            </option>
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
        <span onClick={subamount} onChange={additemlist}>
          <RemoveCircleOutline />
        </span>
        &nbsp;<span>{amount}</span>&nbsp;
        <span
          onClick={addamount}
          // onChange={additemlist}
        >
          <AddCircleOutlineRounded />
        </span>
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
      <button type="button" className="btn btn-outline-success cartbtn">
        장바구니
      </button>
      <br />
    </div>
  );
}

export default DetailInfo;
