import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import StyleComponent from "./StyleComponent";
import axios from "axios";
import {Link, NavLink} from "react-router-dom";
import MyStyleDetail from "./MyStyleDetail";

const MyStyle = () => {
    const [styleList, setStyleList] = useState([]);
    const [nowTag, setNowTag] = useState('');
    const getStyleListOrderByNew = async () => {
        const res = await axios.get("http://localhost:9003/style/list/new");
        setStyleList(res.data);
        console.dir(styleList);
    }
    const getStyleListOrderByPop = async () => {
        const res = await axios.get("http://localhost:9003/style/list/pop");
        setStyleList(res.data);
    }
    const getStyleListSelectByTag = async (tag) => {
        const subTag = tag.substr(1);
        const res = await axios.get(`http://localhost:9003/style/list/tags?tag=${subTag}`);
        await setStyleList(res.data);
    }
    //********************************************isActive 관련*****************************************************
    const [isActive, setIsActive] = useState({
        pop: false,
        new: true
    })
    const activeNew = e => {
        setIsActive({
            ...isActive,
            pop: false,
            new: true
        })
        setNowTag('');
        getStyleListOrderByNew().then();
    }
    const activePop = e => {
        setIsActive({
            ...isActive,
            pop: true,
            new: false
        })
        setNowTag('');
        getStyleListOrderByPop().then();
    }
    const activeTag = e => {
        setIsActive({
            ...isActive,
            pop: false,
            new: false,
        })
        setNowTag(e.target.innerText.substr(1));
        getStyleListSelectByTag(e.target.innerText).then();
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
                        <PopAndNew onClick={activeNew} className={isActive.new ? "active" : ""}>최신</PopAndNew>
                        <PopAndNew onClick={activePop} className={isActive.pop ? "active" : ""}>인기</PopAndNew>
                    </div>
                </StyledTabList>
                <KeywordBind>
                    <button onClick={activeTag}>#태그1</button>
                    <button onClick={activeTag}>#발렌시아가</button>
                    <button onClick={activeTag}>#오뭐신</button>
                    <button onClick={activeTag}>#유니온</button>
                    <button onClick={activeTag}>#KREAM스타일</button>
                    <button onClick={activeTag}>#마르지엘라</button>
                    <button onClick={activeTag}>#데일리룩</button>
                    <button onClick={activeTag}>#윈디챌린지</button>
                </KeywordBind>
                {styleList.length !== 0 ?
                    <SocialFeed>
                        <ul>
                            {
                                styleList.filter((elt, idx) => idx === 0 || idx % 4 === 0).map((elt, idx) =>
                                    <li>
                                            <StyleComponent elt={elt} key={elt.style_num}/>
                                    </li>
                                )
                            }
                        </ul>
                        <ul>
                            {
                                styleList.filter((elt, idx) => idx % 4 === 1).map((elt, idx) =>
                                    <li>
                                        <StyleComponent elt={elt} key={elt.style_num}/>
                                    </li>
                                )
                            }
                        </ul>
                        <ul>
                            {
                                styleList.filter((elt, idx) => idx % 4 === 2).map((elt, idx) =>
                                    <li>
                                        <StyleComponent elt={elt} key={elt.style_num}/>
                                    </li>
                                )
                            }
                        </ul>
                        <ul>
                            {
                                styleList.filter((elt, idx) => idx % 4 === 3).map((elt, idx) =>
                                    <li>
                                        <StyleComponent elt={elt} key={elt.style_num}/>
                                    </li>
                                )
                            }
                        </ul>
                    </SocialFeed> : <SocialFeed>
                        <div style={{margin: "0 auto", color: "#AAA", height: "500px", verticalAlign: "middle"}}>
                            '{nowTag}' 태그가 들어간 게시물이 없어요 !
                        </div>
                    </SocialFeed>
                }

            </div>
        </>
    );
};

const StyledTabList = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 20px;
  & > div {
    width: 200px;
    justify-content: space-between;
    display: flex;
  }
`
const PopAndNew = styled.button`
  font-size: 18px;
  border: 1px solid white;
  padding: 16px 12px;
  line-height: 50%;
  font-weight: 600;
  &.active {
    border-radius: 20px;
    background-color: #222222;
    color: white;
    font-weight: 600;
  }
`
const KeywordBind = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;

  & > button {
    display: inline-block;
    padding: 8px 10px;
    border: 1px solid #ebebeb;
    border-radius: 12px;
    font-size: 15px;
    font-family: inherit;
  }
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
      margin-top: 20px;
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