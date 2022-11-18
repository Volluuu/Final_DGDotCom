import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import StyleComponent from "./StyleComponent";
import axios from "axios";

const MyStyle = () => {
    const [styleList, setStyleList] = useState([]);

    const getStyleList = async () => {
            const res = await axios.get("http://localhost:9003/style/list");
            setStyleList(res.data);
        }

    useEffect(() => {
        getStyleList().then();
        console.log("axios complete");
    }, []);

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
                    <ul>
                        <li>
                            {

                            }
                            <StyleComponent></StyleComponent>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <StyleComponent></StyleComponent>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <StyleComponent></StyleComponent>

                        </li>
                    </ul>
                    <ul>
                        <li>
                            <StyleComponent></StyleComponent>
                        </li>
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
  padding: 30px 40px 0px;
  width: 1280px;
  margin: 0 auto;

  & > ul {
    width: 24%;
    margin: 0.5%;
  }

  @media (max-width: 1280px) {
    width: 100%;
    & > ul {
      width: 24%;
      margin: 0.5%;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 8px 0px;
    & > ul {
      width: 47.5%;
      margin: 1.25%;
    }
  }
`


export default MyStyle;