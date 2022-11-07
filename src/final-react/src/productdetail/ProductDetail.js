import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailImage from "./DetailImage";
import DetailInfo from "./DetailInfo";

function ProductDetail(props) {
  const { p_num } = useParams();
  console.log("p_num:" + p_num);
  const [productdata, setProductdata] = useState([]);

  const productUrl = localStorage.url + "/product/";

  const productDetail = (p_num) => {
    let url = localStorage.url + "/product/detail?p_num=" + p_num;
    console.log("url:" + url);

    axios.get(url).then((res) => {
      console.log("axios detail 성공");
      setProductdata(res.data);
    });
  };

  console.log("detail:" + JSON.stringify(productdata));
  useEffect(() => {
    productDetail(p_num);
  }, []);

  return (
    <div>
      <h1>상품 상세 폼</h1>
      <div style={{ float: "left", width: "40%" }}>
        <DetailImage row={productdata} />
      </div>
      <div>
        <DetailInfo row={productdata} />
      </div>
    </div>
  );
}

export default ProductDetail;
