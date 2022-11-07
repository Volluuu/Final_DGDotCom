import React, { useState } from "react";
import { useParams } from "react-router-dom";

function DetailInfo(props) {
  const { row } = props;
  const [sum, setSum] = useState(0);
  const u_num = sessionStorage.u_num;
  console.log("u_num:" + Number(u_num));
  const [addlist, setAddlist] = useState([
    {
      ...row,
      size: "",
      amount: "",
    },
  ]);
  const [itemlist, setItemlist] = useState([]);

  console.log("1. itemlist:" + JSON.stringify(itemlist));

  const arritem = (e) => setItemlist(itemlist.concat(addlist));

  const additemlist = (e) => {
    setAddlist([
      {
        ...row,
        size: e.target.selected,
        amount: e.target.value,
      },
      setItemlist(addlist),
    ]);
  };
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
            onChange={arritem}
          >
            <option value="F">Free</option>
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
            onChange={arritem}
          >
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
            onChange={additemlist}
          >
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
          <select className="form-select sizeselect">
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
      <div>{selectform(row.category)}</div>
      <span>
        {Number(row.price)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        원
      </span>
      <br />
      <div>
        11
        {itemlist !== null ? (
          <div>
            <span>{itemlist.p_name}</span>
            <br />
            <input
              type={"number"}
              step={1}
              name="amount"
              className="form-control"
              onChange={(e) => setAddlist({ size: e.target.value })}
            />
            <br />
          </div>
        ) : (
          <></>
        )}
      </div>
      <br />
      <button type="button" className="btn btn-outline-danger purchasebtn">
        구매
      </button>
      &nbsp;&nbsp;
      <button type="button" className="btn btn-outline-success cartbtn">
        장바구니
      </button>
    </div>
  );
}

export default DetailInfo;
