import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ProductElement from "./ProductElement";

const Banner = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  background-color: bisque;
  text-align: center;
  color: white;
  font-size: 100px;
  font-weight: 600;
`;
const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1280px;
  //background-color: wheat;
  margin: 0 auto;
  margin-bottom: 50px;
  @media (max-width: 1280px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
// ============================================================================================

const EventBanner = (props) => {
  const { type } = props;
  const data = {
    first: {
      img: "https://kream-phinf.pstatic.net/MjAyMjExMjhfMyAg/MDAxNjY5NjI2Nzc4NDYx.4orS2rlexxRe1oTJTt-uEmO2imPqUPEWoyUoTDjvSIgg.WI11YR0sNvPT_GO81-mff71jUsdqAN-Sw9GD4TMMOK8g.JPEG/a_a786b0aea34b43b29d703299d51e1d25.jpg?type=m_2560",
      title: "인기상품",
      engtitle: "Most Popular",
      num: [12, 456, 789, 33],
      backgroundColor: "#4d5a48",
    },
    second: {
      img: "https://kream-phinf.pstatic.net/MjAyMjExMjhfMjk4/MDAxNjY5NjI1MjMzNzY2.Dxuop5dHN8qTPjJxVcAmxpoXmzPgymt3_Ynn4iLiLh0g.69CMFunDmEqTN886glOXwKLb1R8aoxfEJGfA6UaHf8gg.JPEG/a_14a4f8d840544d02a54b144749e5ae75.jpg?type=m_2560",
      title: "A.P.C. 가방 모음",
      engtitle: "A.P.C. packpack",
      num: [25, 27, 29, 33],
      backgroundColor: "#ded2a8",
    },
    third: {
      img: "https://kream-phinf.pstatic.net/MjAyMjExMjhfMjIy/MDAxNjY5NjI2Njc1ODE5.GIQL7cx3Q98fNwy2Kqoj6z8x6TEKuTDdfOGDNT7WGuAg.gBUVfsJhkcFUukEoCfc9UJ1rL6Y-007uqKneimwbBIAg.JPEG/a_063562e0e9724bcab1d2cf8a818f45b3.jpg?type=m_2560",
      title: "인기상품",
      engtitle: "Most Popular",
      num: [1137, 1099, 1330, 996],
      backgroundColor: "#e1ddc2",
    },
  };
  const myType = data[type];
  return (
    <div>
      <Banner
        style={{
          height: "480px",
          display: "flex",
          justifyContent: "center",
          backgroundColor: myType.backgroundColor,
        }}
      >
        <img src={myType.img} alt="" />
      </Banner>
      <List style={{ marginBottom: "5px" }}>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>
          {myType.engtitle}
        </p>
      </List>
      <List style={{ marginBottom: "10px", borderBottom: "2px solid #ccc" }}>
        <p>{myType.title}</p>
      </List>
      <List>
        {myType.num.map((elt, idx) => (
          <ProductElement key={idx} type={"big"} num={elt} />
        ))}
      </List>
    </div>
  );
};

export default EventBanner;
