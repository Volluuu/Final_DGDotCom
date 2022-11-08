import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailImage from "./DetailImage";
import DetailInfo from "./DetailInfo";
import DetailRowItem from "./DetailRowItem";

function ProductDetail(props) {
  const { p_num } = useParams();
  console.log("p_num:" + p_num);
  const [productdata, setProductdata] = useState({});

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
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h1>상품 상세 폼</h1>
      <div style={{ float: "left", width: "50%" }}>
        <DetailImage row={productdata} />
      </div>
      <div>
        <DetailInfo row={productdata} />
      </div>
    </div>
  );
}

export default ProductDetail;
