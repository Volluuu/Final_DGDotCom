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
const BasicSearchShow = () => {
    const [hot, setHot] = useState([]);

    const updateData = () => {
        const res = axios.get("http://localhost:9003/list/hot").then(res => {
            setHot(res.data);
        });
    }

    useEffect(() => {
        updateData();
    }, [hot]);

    return (
        <div style={{width: "768px", height: "600px"}}>
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
            <div style={{marginBottom: "20px", width:"768px", display:"flex", justifyContent:"space-around"}}>
                {/*//인기 검색어 테이블을 만들어야 할듯 없으면 테이블에 추가, 있으면 해당 검색어의 count를 1추가*/}
                <ol style={{width:"384px", justifyContent:"left"}}>
                    {
                        hot.filter((elt, idx) => idx < 5).map((elt, idx) =>
                            <li key={idx}><HotLink key={idx} to={`/product/list/1?currentPage=1&keyword=${elt.word}`}><b>{idx+1}</b> {elt.word}</HotLink>
                            </li>)
                    }
                </ol>
                <ol style={{width:"384px", justifyContent:"left"}}>
                    {
                        hot.filter((elt, idx) => idx >= 5).map((elt, idx) =>
                            <li key={idx}><HotLink key={idx} to={`/product/list/1?currentPage=1&keyword=${elt.word}`}><b>{idx+1}</b> {elt.word}</HotLink>
                        </li>)
                    }
                </ol>
                {/*{*/}
                {/*    hot.filter((elt,idx)=><HotLink key={idx} to={`/product/list/1?currentPage=1&categories=${elt.word}`}>{elt.word}</HotLink>)*/}
                {/*}*/}
            </div>
            <Title_p>카테고리</Title_p>
            <p>카테고리에 넣을 내용 : 신발 의류 패션잡하 뮤직이즈마이라이프 테크</p>
            <Title_p>인기 브랜드</Title_p>
            {
                //readcount와 brand를 기준으로 select를 해온 뒤 브랜드 이미지 넣기는 귀찮으니까 ㅋㅋ 버튼으로 이동하게 만들어야지
            }

        </div>
    );
};

export default BasicSearchShow;
