import { Card } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailDelivery from "./DetailDelivery";
import DetailImage from "./DetailImage";
import DetailInfo from "./DetailInfo";
import DetailReview from "./DetailReview";

function ProductDetail(props) {
  const { p_num } = useParams(); //u_num
  // console.log("p_num:" + p_num);
  const [productdata, setProductdata] = useState({}); //구매 데이터
  const productUrl = localStorage.url + "/product/"; //상품 정보 url
  const [reviewData, setReviewData] = useState(""); //리뷰 데이터
  const [avgReviewCnt, setAvgReviewCnt] = useState(0);

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
    let reviewUrl = localStorage.url + "/product/reviewlist?p_num=" + p_num;
    axios.get(reviewUrl).then((res) =>
      // console.log("axios review 성공");
      setReviewData(res.data)
    );
  };
  // console.log("bb:", reviewData);

  //별점 평균 계산하기
  const [starRate, setStarRate] = useState(0);
  const avgReview = () => {
    if (reviewData === "") {
      return;
    }
    // console.log("aa:", reviewData);
    setAvgReviewCnt(reviewData.list.length);
    let starArr = [];
    for (let i = 0; i < reviewData.list.length; i++) {
      starArr.push(reviewData.list[i].star);
    }

    if (starArr.length === 0) {
      setStarRate(0);
    } else {
      const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
      setStarRate(Math.round(average(starArr) * 10) / 10);
      // console.log("ss:", average(starArr));
    }
  };
  // console.log("detail:" + JSON.stringify(productdata));
  useEffect(() => {
    productDetail(p_num);
    reviewList(p_num);
    avgReview();
  }, []);
  // console.log("review:", reviewData.list.length);

  useEffect(() => {
    avgReview();
  }, [reviewData]);
  return (
    <div
      style={{
        width: "70%",
        margin: "0 auto",
      }}
    >
      <br />
      <h1>상품 상세 정보</h1>
      <br />
      <br />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "40%",
            minWidth: "600px",
            textAlign: "center",
            cursor: "zoom-in",
            // border: "1px solid black",
            position: "relative",
            height: "100vh",
          }}
        >
          <Card>
            <DetailImage row={productdata} />
          </Card>
        </div>
        <div
          style={{
            width: "40%",
            minWidth: "600px",
            // border: "1px solid red",
            position: "relative",
          }}
        >
          <div>
            <Card>
              <DetailInfo
                row={productdata}
                star={starRate}
                rev={avgReviewCnt}
              />
            </Card>
          </div>
          <br />
          <div>
            <Card>
              <DetailDelivery />
            </Card>
          </div>
        </div>
      </div>

      <br />
      <br />
      <div
        style={{
          width: "100%",
          margin: "0 auto",
          // border: "1px solid blue",
        }}
      >
        <DetailReview row={reviewData} />
      </div>
    </div>
  );
}

export default ProductDetail;
