import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailImage from "./DetailImage";
import DetailInfo from "./DetailInfo";
import DetailReview from "./DetailReview";

function ProductDetail(props) {
  const { p_num } = useParams(); //u_num
  // console.log("p_num:" + p_num);
  const [productdata, setProductdata] = useState({}); //구매 데이터
  const productUrl = localStorage.url + "/product/"; //상품 정보 url
  const [reviewData, setReviewData] = useState(""); //리뷰 데이터

  //상세정보 불러오기
  const productDetail = (p_num) => {
    let url = localStorage.url + "/product/detail?p_num=" + p_num;
    // console.log("url:" + url);
    axios.get(url).then((res) => {
      // console.log("axios detail 성공");
      setProductdata(res.data);
    });
  };

  //리뷰정보 불러오기
  const reviewList = (p_num) => {
    let reviewUrl = localStorage.url + "/trade/reviewlist?p_num=" + p_num;
    axios
      .get(reviewUrl, {
        headers: { Authorization: `Bearer ${localStorage.accessToken}` },
      })
      .then((res) => {
        // console.log("axios review 성공");
        setReviewData(res.data);
      });
  };
  // console.log("detail:" + JSON.stringify(productdata));
  useEffect(() => {
    productDetail(p_num);
    reviewList(p_num);
  }, []);

  return (
    <div style={{ width: "70%", margin: "0 auto", minWidth: "800px" }}>
      <br />
      <h1>상품 상세 정보</h1>
      <br />
      <br />
      <div
        style={{
          float: "left",
          width: "50%",
          minWidth: "50%",
          cursor: "zoom-in",
        }}
      >
        <DetailImage row={productdata} />
      </div>
      <div style={{ minWidth: "500px" }}>
        <DetailInfo row={productdata} />
      </div>
      <div
        style={{
          position: "absolute",
          width: "70%",
          top: "85%",
        }}
      >
        <DetailReview row={reviewData} />
      </div>
    </div>
  );
}

export default ProductDetail;
