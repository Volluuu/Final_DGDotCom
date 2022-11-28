import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const randomColor = [
  "#FEBEBE",
  "#FFEFD5",
  "#F0FFF0",
  "#CDECFA",
  "#CCE1FF",
  "#CEBEE1",
  "#DCFFDC",
  "#FAFAD2",
  "#dcdcdc",
];

const ProductCard = styled(Link)`
  margin: 0 auto;
  margin-bottom: 20px;
  transition: all 0.05s linear;

  &:hover {
    transform: scale(1.05);
  }
`;
function ProductElement(props) {
  const { type, num } = props;
  //makeStyles : css파일을 js안에 선언한다고 생각하고 사용. 변수에 할당해서 사용
  //             JSX문법안에서 className={변수명.root}와 같이 사용
  const useBig = makeStyles((theme) => ({
    root: {
      display: "flex",
      width: 300,
      height: 440,
      margin: "auto",
      flexWrap: "wrap",
    },
    media: {
      height: 300,
      width: 300,
      paddingTop: "56.25%", // 16:9
      backgroundColor: "#DDFFF6",
    },
    infoBox: {
      fontSize: "16px",
      paddingLeft: "16px",
      width: "300px",
    },
    brand: {
      textDecoration: "underline",
      marginBottom: "3px",
    },
    productname: {
      fontSize: "20px",
      lineHeight: "22px",
    },
  }));
  const useSmall = makeStyles((theme) => ({
    root: {
      //카드의 전체를 정의하는 객체
      display: "flex",
      width: 270, //가로
      height: 396, //세로
      margin: "auto",
      flexWrap: "wrap",
    },
    media: {
      //사진의 속성을 정의하는 객체
      height: 270, //사진의 높이
      width: 270, //사진의 넓이
      paddingTop: "56.25%", // 16:9
      backgroundColor: "#DDFFF6",
    },
    infoBox: {
      //카드 내 정보를 출력하는 부분의 픽셀들
      fontSize: "14.4px", // 글자크기
      paddingLeft: "14.4px", // 패딩
      width: "270px",
    },
    brand: {
      // 브랜드 글자 표시하는 객체
      textDecoration: "underline",
      marginBottom: "2.7px", // 글자 크기
    },
    productname: {
      // 상품 이름 표시하는 객체
      fontSize: "18px", //글자크기
      lineHeight: "19.8px", // 자간
    },
  }));
  //새로운 클래스를 만들었을 때 변수에 선언을 먼저 해준 뒤 classes라는 변수에 다시 할당하여 사용
  //리액트의 Hook은 반복문, 조건문(이항연산자) 내에서 사용불가
  const big = useBig();
  const small = useSmall();
  const classes = type === "big" ? big : small;

  //**********************************************************************************
  const [elt, setElt] = useState("");
  const updateData = () => {
    const res = axios
      .get(`http://localhost:9003/list/card?num=${num}`)
      .then((res) => {
        setElt(res.data);
      });
  };
  useEffect(() => {
    updateData();
  }, []);

  return (
    <ProductCard to={`/product/detail/${elt.p_num}`}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={`http://localhost:9003/product/${elt.photo}`}
          title="Paella dish"
        />
        <div className={classes.infoBox}>
          <div>
            <p className={classes.brand}>{elt.brand}</p>
            <p className={classes.productname}>{elt.p_name}</p>
          </div>
        </div>
        <p style={{ position: "relative", bottom: 0, left: "5%" }}>
          {elt.price}
        </p>
      </Card>
    </ProductCard>
  );
}
export default React.memo(ProductElement);
