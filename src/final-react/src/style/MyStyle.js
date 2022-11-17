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
                    <TestBlock><SocialImg src={"404.png"}/><CardDetail>
                        <div className="user_name">abcd</div>
                        <div className="text_box">#asdf#werewr#sdfs#sfsd#asdf#werewr#sdfs#sfsd#asdf#werewr#sdfs#sfsd#asdf#werewr#sdfs#sfsd#asdf#werewr#sdfs#sfsd#asdf#werewr#sdfs#sfsd</div>
                        <ul className="product_list">나이키 신발</ul>
                    </CardDetail></TestBlock>
                    <ul style={{width:"23%"}}>
                        <li style={{width:"400px"}}>
                            <TestBlock>
                                <SocialImg src={"404.png"}/>
                                <CardDetail>
                                    <div className="user_name">abcd</div>
                                    <div
                                        className="text_box">#asdf#werewr#sdfs#sfsd#asdf#werewr#sdfs#sfsd#asdf#werewr#sdfs#sfsd#asdf#werewr#sdfs#sfsd#asdf#werewr#sdfs#sfsd#asdf#werewr#sdfs#sfsd
                                    </div>
                                    <ul className="product_list"><li>나이키신발</li></ul>
                                </CardDetail>
                            </TestBlock>
                        </li>
                    </ul>
                    <ul>

                    </ul>
                    <ul>

                    </ul>
                    <ul>

                    </ul>
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
const TestBlock = styled.span`
  width: 23%;
  background-color: mediumpurple;
  margin: 1%;
  @media (max-width: 768px) {
    width: 47.5%;
    margin: 1.25%;
  }
`
const SocialImg = styled.img`
  width: 100%;
  border-radius: 10px;
`
const CardDetail = styled.div`
  padding: 8px 4px 0px;

  & > img {

  }

  & > .user_name {

  }

  & > div.text_box {
    width: 100%;
    word-break: break-all;
    flex-wrap: wrap;
  }

  & > .product_list {

  }
`

export default MyStyle;