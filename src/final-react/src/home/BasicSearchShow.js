import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const recommend = ["시계", "긴팔 티셔츠", "쥬얼리", "스커트", "코트", "패딩", "니트 웨어", "바지", "자켓"];

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

const BasicSearchShow = () => {
    const [hot, setHot] = useState([]);
    const [hot_brand, setHot_brand] = useState([]);

    const updateHot = async () => {
        const res = await axios.get("http://localhost:9003/list/hot");
        setHot(res.data);
    }
    const updateHotBrand = async () => {
        const res = await axios.get("http://localhost:9003/list/brand");
        setHot_brand(res.data);
    }

    useEffect(() => {
        updateHot().then(r => {});
        updateHotBrand().then(r => {});
    }, []);

    return (
        <div style={{width: "768px", height: "800px"}}>
            <Title_p>최근 검색어</Title_p>
            {
                // user table에서 search 컬럼을 가져와서 list.map 구현
                // 로그인 구현되면 시작

            }
            <div style={{marginBottom: "20px"}}>
                <Title_p style={{marginBottom: "5px"}}>추천 검색어</Title_p>
                {
                    // Link로 돌리면 될듯 ㅋㅋ ez
                    recommend.map((elt, idx) => <RecLink key={idx} to={`/product/list/1`}>{elt}</RecLink>)
                }
            </div>
            <Title_p>인기 검색어</Title_p>
            <div style={{marginBottom: "20px", width: "768px", display: "flex", justifyContent: "space-around"}}>
                {/*//인기 검색어 테이블을 만들어야 할듯 없으면 테이블에 추가, 있으면 해당 검색어의 count를 1추가*/}
                <ul style={{width: "384px", justifyContent: "left"}}>
                    {
                        hot.filter((elt, idx) => idx < 5).map((elt, idx) =>
                            <li style={{marginBottom: "20px"}} key={idx}><HotLink key={idx}
                                                                                  to={`/product/list/1?currentPage=1&keyword=${elt.word}`}><b style={{marginRight:"5px"}}>{idx + 1}</b> {elt.word}
                            </HotLink>
                            </li>)
                    }
                </ul>
                <ul style={{width: "384px", justifyContent: "left"}}>
                    {
                        hot.filter((elt, idx) => idx >= 5).map((elt, idx) =>
                            <li style={{marginBottom: "20px"}} key={idx}><HotLink key={idx}
                                                                                  to={`/product/list/1?currentPage=1&keyword=${elt.word}`}><b style={{marginRight:"5px"}}>{idx + 6}</b> {elt.word}
                            </HotLink>
                            </li>)
                    }
                </ul>
            </div>
            <Title_p>카테고리</Title_p>

            <div style={{display:"flex" , marginBottom:"20px"}}>
                <CategoryElt to={"/product/list/1"}>
                    <img className={"CategoryEltPhoto"} src="http://localhost:9003/product/20221104020517860.PNG" alt=""/>
                    <p className={"CategoryEltInfo"}>상의</p>
                </CategoryElt>
                <CategoryElt to={"/product/list/1"}>
                    <img className={"CategoryEltPhoto"} src="http://localhost:9003/product/20221104020634615.PNG" alt=""/>
                    <p className={"CategoryEltInfo"}>하의</p>
                </CategoryElt><CategoryElt to={"/product/list/1"}>
                <img className={"CategoryEltPhoto"} src="http://localhost:9003/product/20221104001835856.PNG" alt=""/>
                <p className={"CategoryEltInfo"}>아우터</p>
            </CategoryElt><CategoryElt to={"/product/list/1"}>
                <img className={"CategoryEltPhoto"} src="http://localhost:9003/product/20221104022610637.PNG" alt=""/>
                <p className={"CategoryEltInfo"}>패션잡화</p>
            </CategoryElt>
            </div>

            <Title_p>인기 브랜드</Title_p>
            <div style={{width:"768px", backgroundColor:"skyblue", height:"200px", display:"flex", margin:"0 auto", flexWrap:"wrap"}}>
                {
                    hot_brand.map((elt, idx) => <Link key={idx} to={"/product/list/1"}>{elt.brand}</Link>)
                }
            </div>

        </div>
    );
};

export default BasicSearchShow;
