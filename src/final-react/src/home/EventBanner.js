import React, {useState} from 'react';
import styled from 'styled-components'
import {Link} from "react-router-dom";
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
`
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
`
// ============================================================================================


const EventBanner = () => {

    const [bannerInfo, setBannerInfo] = useState([]);
    const [infoForm, setInfoForm] = useState({
        Img: '',

    });

    return (
        <div>
            <Banner>1조 파이날 프로젝트 많관부 많참부</Banner>
            <List style={{marginBottom:"5px"}}>
            <p>I can't say anything, I hold you and only tears flow</p>
            </List>
            <List style={{marginBottom:"10px", borderBottom:"2px solid #ccc"}}>
                <p>나는 아무말도 못하고 그댈 안고서 그냥 눈물만 흘러</p>
            </List>
            <List>
                <ProductElement type={"big"}/>
                <ProductElement type={"big"}/>
                <ProductElement type={"big"}/>
                <ProductElement type={"big"}/>
            </List>
        </div>
    );
};

export default EventBanner;
