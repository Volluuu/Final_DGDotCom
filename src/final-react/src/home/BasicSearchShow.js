import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const RecLink = styled(Link)`
  margin: 5px;
  font-weight: 600;
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 3px;
  color: black;
  background-color: #F4F4F4;
`
const HotLink = styled(Link)`

`
const Title_p = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`

const CategoryElt = styled(Link)`
  margin: 0 auto;
  width: 120px;
  height: 140px;
  & > img.CategoryEltPhoto {
    width: 120px;
    height:120px;
    border-radius: 50%;
  }
  & > p.CategoryEltInfo {
    text-align: center;
    font-size: 12px;
    padding-top: 5px;
  }
`
const PopLink = styled(Link)`
    width: 130px;
  height : 80px;
  margin : 0 auto;
  background-color: black;
  color: white;
  text-align: center;
  line-height: 80px;
  font-size: 18px;
  margin-bottom: 5px;
`
const BasicSearchShow = (props) => {
    const {latest, setLatest, word, open, handleOpen, handleClose, deleteLatest} = props;
    const recommend = ["시계", "긴팔 티셔츠", "쥬얼리", "스커트", "코트", "패딩", "니트 웨어", "바지", "자켓"];
    const [hot, setHot] = useState([]);
    const [hot_brand, setHot_brand] = useState([]);

    const updateHot = async () => {
        const res = await axios.get(process.env.REACT_APP_URL + "/list/hot");
        setHot(res.data);
    }
    const updateHotBrand = async () => {
        const res = await axios.get(process.env.REACT_APP_URL + "/list/brand");
        setHot_brand(res.data);
    }

    useEffect(() => {
        updateHot().then(r => {});
        updateHotBrand().then(r => {});

    }, []);

    return (
        <WrapperDiv>
            <Title_p>최근 검색어<span onClick={deleteLatest} style={{cursor:"pointer", marginLeft:"10px"}}>지우기</span></Title_p>
            <EltDiv>
            {
                // user table에서 search 컬럼을 가져와서 list.map 구현
                latest.length < 1 ? <p>최근검색어 없음</p> :
                latest.map((elt, idx) => <RecLink key={idx} to={`/product/list/?keyword=${elt}`} handleClose={handleClose}>{elt}</RecLink>)
            }
            </EltDiv>
            <Title_p style={{marginBottom: "5px"}}>추천 검색어 </Title_p>
            <EltDiv>
                {
                    // Link로 돌리면 될듯 ㅋㅋ ez
                    recommend.map((elt, idx) =><RecLink key={idx} to={`/product/list/?keyword=${elt}`} onClick={handleClose}>{elt}</RecLink>)
                }
            </EltDiv>
            <Title_p>인기 검색어</Title_p>
            <EltDiv style={{justifyContent: "space-around", paddingLeft:"10px"}}>
                {/*//인기 검색어 테이블을 만들어야 할듯 없으면 테이블에 추가, 있으면 해당 검색어의 count를 1추가*/}
                <ul style={{width: "50%", justifyContent: "left"}}>
                    {
                        hot.filter((elt, idx) => idx < 5).map((elt, idx) =>
                            <li style={{marginBottom: "20px"}} key={idx}><HotLink key={idx}  onClick={handleClose}
                             to={`/product/list/?keyword=${elt.word}`}><b style={{marginRight:"5px"}}>{idx + 1}</b> {elt.word}
                            </HotLink>
                            </li>)
                    }
                </ul>
                <ul style={{width: "50%", justifyContent: "left"}}>
                    {
                        hot.filter((elt, idx) => idx >= 5).map((elt, idx) =>
                            <li style={{marginBottom: "20px"}} key={idx}><HotLink key={idx}  onClick={handleClose}
                            to={`/product/list/?keyword=${elt.word}`}><b style={{marginRight:"5px"}}>{idx + 6}</b> {elt.word}
                            </HotLink>
                            </li>)
                    }
                </ul>
            </EltDiv>
            <Title_p>카테고리</Title_p>

            <EltDiv>
                <CategoryElt to={`/product/list/?keyword=후드`}  onClick={handleClose}>
                    <img className={"CategoryEltPhoto"} src={process.env.REACT_APP_URL + "/product/20221104020517860.PNG"} alt=""/>
                    <p className={"CategoryEltInfo"}>상의</p>
                </CategoryElt>
                <CategoryElt to={`/product/list/?keyword=바지`}  onClick={handleClose}>
                    <img className={"CategoryEltPhoto"} src={process.env.REACT_APP_URL + "/product/20221104020634615.PNG"} alt=""/>
                    <p className={"CategoryEltInfo"}>하의</p>
                </CategoryElt><CategoryElt to={`/product/list/?keyword=패딩`} onClick={handleClose}>
                <img className={"CategoryEltPhoto"} src={process.env.REACT_APP_URL + "/product/20221104001835856.PNG"} alt=""/>
                <p className={"CategoryEltInfo"}>아우터</p>
            </CategoryElt><CategoryElt to={`/product/list/?keyword=패션잡화`} onClick={handleClose}>
                <img className={"CategoryEltPhoto"} src={process.env.REACT_APP_URL + "/product/20221104022610637.PNG"} alt=""/>
                <p className={"CategoryEltInfo"}>패션잡화</p>
            </CategoryElt>
            </EltDiv>

            <Title_p>인기 브랜드</Title_p>
            <EltDiv >
                {
                    hot_brand.map((elt, idx) => <PopLink onClick={handleClose} key={idx} to={`/product/list/?brands=${elt.brand}`}>{elt.brand}</PopLink>)
                }
            </EltDiv>
        </WrapperDiv>
    );
};

const WrapperDiv = styled.div`
  width:700px;
  height:800px;
  @media(max-width:768px) {
    width: 415px;
  }
`
const EltDiv = styled.div`
    display:flex;
    width:auto;
  flex-wrap:wrap;
  margin-bottom: 20px;
  @media(max-width: 768px) {
    width:415px;
  }
`

export default BasicSearchShow;
