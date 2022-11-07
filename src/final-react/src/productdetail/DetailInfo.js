import React, { useState } from "react";

function DetailInfo(props) {
  const { row } = props;

  const [options, setOption] = useState([]);
  const [sum, setSum] = useState(0);

  return (
    <div>
      <h1>info</h1>
      <span>{row.brand}</span>
      <br />
      <span>{row.p_name}</span>
      <span>{row.category}</span>
      <br />
      <div>
        {row.category === "스몰 레더" ||
        "가방" ||
        "스카프" ||
        "모자" ||
        "기타" ||
        "벨트" ||
        "쥬얼리" ? (
          <select className="form-select sizeselec">
            <option value="F">Free</option>
          </select>
        ) : row.category === "자켓" ||
          "후드" ||
          "스웨트 셔츠" ||
          "반팔 티셔츠" ||
          "셔츠" ||
          "긴팔 티셔츠" ||
          "니트 웨어" ||
          "바지" ||
          "반바지" ||
          "코트" ||
          "패딩" ? (
          <select className="form-select sizeselec">
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        ) : row.category === "샌들" || "슬리퍼" || "스니커즈" || "로퍼/플랫" ? (
          <select className="form-select sizeselec">
            <option value="230">230mm</option>
            <option value="240">240mm</option>
            <option value="250">250mm</option>
            <option value="260">260mm</option>
            <option value="270">270mm</option>
            <option value="280">280mm</option>
          </select>
        ) : (
          <select className="form-select sizeselec">
            <option selected disabled>
              재고 없음
            </option>
          </select>
        )}
      </div>
      <span>{row.price}</span>
      <br />
      <input type={"number"} className="form-number"></input>
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
