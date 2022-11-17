import React from 'react';
import styled from "styled-components";

const MyStyle = () => {
    return (
        <>
            <div>
                <StyledTabList>
                    <button>인기</button>
                    <button>최신</button>
                    <button>내스타일</button>
                </StyledTabList>
                <KeywordBind>
                    #캐트릿 #발렌시아가 #오뭐신 #유니온 #KREAM스타일 #마르지엘라 #데일리룩 #윈디챌린지
                </KeywordBind>
                <SocialFeed>
                    <TestBlock></TestBlock>
                    <TestBlock></TestBlock>
                    <TestBlock></TestBlock>
                    <TestBlock></TestBlock>
                    <TestBlock></TestBlock>
                    <TestBlock></TestBlock>
                    <TestBlock></TestBlock>
                    <TestBlock></TestBlock>
                    <TestBlock></TestBlock>
                </SocialFeed>
            </div>
        </>
    );
};

const StyledTabList = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`
const KeywordBind = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;

`
const SocialFeed = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 30px 40px 0px;
  width: 1280px;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 8px 0px;

  }
`
const TestBlock = styled.div`
  width: 23%;
  height: 400px;
  background-color: mediumpurple;
  margin: 1%  ;
  @media (max-width: 768px) {
    width: 47.5%;
    margin: 1.25%;
  }
`
const socialImg =styled.img`
    
`
const CardDetail = styled.div`
    
`

export default MyStyle;