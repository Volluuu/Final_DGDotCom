import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import StyleComponent from "./StyleComponent";
import axios from "axios";
import {Link, NavLink} from "react-router-dom";

const MyStyle = () => {
    const [styleList, setStyleList] = useState([]);
    const getStyleListOrderByNew = async () => {
        const res = await axios.get("http://localhost:9003/style/list/new");
        setStyleList(res.data);
    }
    const getStyleListOrderByPop = async () => {
        const res = await axios.get("http://localhost:9003/style/list/pop");
        setStyleList(res.data);
    }
    //********************************************isActive 관련*****************************************************
    const [isActive, setIsActive] = useState({
        pop : true,
        new : false
    })
    const activeNew = e => {
        setIsActive({
            ...isActive,
            pop : false,
            new : true
        })
        getStyleListOrderByNew().then();
    }
    const activePop = e => {
        setIsActive({
            ...isActive,
            pop : true,
            new : false
        })
        getStyleListOrderByPop().then();
    }
    //********************************************isActive 관련*****************************************************

    useEffect(() => {
        getStyleListOrderByNew().then();
    }, []);

    return (
        <>
            <div>

                <StyledTabList>
                    <div>
                        <PopAndNew onClick={activePop} className={isActive.pop? "active":""}>인기</PopAndNew>
                        <PopAndNew onClick={activeNew} className={isActive.new? "active":""}>최신</PopAndNew>
                    </div>
                </StyledTabList>
                <KeywordBind>
                    #캐트릿 #발렌시아가 #오뭐신 #유니온 #KREAM스타일 #마르지엘라 #데일리룩 #윈디챌린지
                </KeywordBind>
                <SocialFeed>
                    <ul>
                        {
                            styleList.filter((elt, idx) => idx === 0 || idx % 4 === 0).map((elt, idx) =>
                                <li>
                                    <StyleComponent elt={elt} key={elt.style_num}>

                                    </StyleComponent>
                                </li>
                            )
                        }
                    </ul>
                    <ul>
                        {
                            styleList.filter((elt, idx) => idx % 4 === 1).map((elt, idx) =>
                                <li>
                                    <StyleComponent elt={elt} key={elt.style_num}>

                                    </StyleComponent>
                                </li>
                            )
                        }
                    </ul>
                    <ul>
                        {
                            styleList.filter((elt, idx) => idx % 4 === 2).map((elt, idx) =>
                                <li>
                                    <StyleComponent elt={elt} key={elt.style_num}>

                                    </StyleComponent>
                                </li>
                            )
                        }
                    </ul>
                    <ul>
                        {
                            styleList.filter((elt, idx) => idx % 4 === 3).map((elt, idx) =>
                                <li>
                                    <StyleComponent elt={elt} key={elt.style_num}>

                                    </StyleComponent>
                                </li>
                            )
                        }
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

  & > div {
    width: 200px;
    justify-content: space-between;
    display: flex;
  }
`
const PopAndNew = styled.button`
  font-size: 18px;
  border: 1px solid white;
  padding: 12px 14px;
  line-height: 50%;
  &.active {
    border-radius: 20px;
    background-color: black;
    color: white;
    font-weight:400;
  }
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

  & > ul > li {
    margin-bottom: 5px;
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