import React from 'react';
import styled from "styled-components";


const ImgBanner = styled.div`
  height: 200px;
  padding : 2% 3% 0%;
  color: white;
  background-color: #565656;
  background-image: url("https://kream.co.kr/_nuxt/img/home_banner_bottom1.79549cb.png");
  background-position: 100% 0;
  background-repeat: no-repeat;
  background-size: 350px 200px;
  @media (max-width: 768px) {
    width: 100%;
    display: block;
  }
  @media (min-width: 768px) {
    width: 50%;
  }
`
const ImageBox = styled.div`
  display: flex;
  @media (max-width: 768px) {
    display: inline;
  }
`

const Footer = () => {
    return (
        <div>
            <ImageBox>
                <ImgBanner>
                    <p style={{marginBottom:"10px"}}>D : Dynamic</p>
                    항상 역동적인 감각으로 패션을 바라봅니다.
                </ImgBanner>
                <ImgBanner style={{
                    backgroundImage: 'url("https://kream.co.kr/_nuxt/img/home_banner_bottom2.0077547.png")',
                    backgroundColor: "#3B3A3C"
                }}>
                    <p style={{marginBottom:"10px"}}>G : Gorgeous</p>
                    DG는 언제나 멋을 추구합니다.
                </ImgBanner>
            </ImageBox>
            <div style={{padding: "50px 40px"}}>
                <div>
                    <p style={{fontSize:"30px"}}>DG.com</p>
                </div>
                <div style={{color:"#BBB", fontSize:"12px"}}>
                    DG 주식회사 · 대표 동건Lee&nbsp; 사업자등록번호 : 123-45-67890&nbsp; 사업자정보확인통신판매업 : 제 2021-서울강남C-0093호&nbsp;사업장소재지 : 경기도 서울시 강남구 역삼1동 삼오빌딩 7층 &nbsp;호스팅 서비스 : 아마존 AWS <br/>
                    <br/>
                    DG(주)는 통신판매 중개자로서 통신판매의 당사자가 아니므로 개별 판매자가 등록한 상품정보에 대해서 책임을 지지 않습니다. 단, 거래과정에서 검수하고 보증하는 내용에 대한 책임은 당사에 있습니다.
                </div>
            </div>

        </div>
    );
};

export default Footer;
