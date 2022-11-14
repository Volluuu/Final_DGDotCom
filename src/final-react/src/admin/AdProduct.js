import React, {useCallback, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';
import './button.css'
import Checkbox from "@material-ui/core/Checkbox";


function AdProduct(props) {
    const {currentPage} = useParams();
    console.log("current page: " + currentPage);
    const [data, setData] = useState('');

    // 체크된 아이템을 담을 배열
    const [checkItems, setCheckItems] = useState([]);

    // 체크박스 단일 선택
    const handleSingleCheck = (checked, id) => {
        if (checked) {
            // 단일 선택 시 체크된 아이템을 배열에 추가
            setCheckItems(prev => [...prev, id]);
        } else {
            // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
            setCheckItems(checkItems.filter((el) => el !== id));
        }
    };

    // 체크박스 전체 선택
    const handleAllCheck = (checked) => {
        if (checked) {
            // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
            const idArray = [];
            data.forEach((el) => idArray.push(el.id));
            setCheckItems(idArray);
        } else {
            // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
            setCheckItems([]);
        }
    }


    const photoUrl = localStorage.url + "/product/";
    const ProductPaging = () => {
        let url = localStorage.url + "/admin/ProductPaging?currentPage=" + (currentPage === undefined ? '1' : currentPage);
        axios.get(url)
            .then(res => {
                console.dir(res.data);
                setData(res.data);
            })
    }

    //currentPage 값이 변경될때마다 함수 다시 호출
    useEffect(() => {
        ProductPaging();
    }, [currentPage])
    return (<div className='container-fluid'>
            <div className='row'>
                <h5>총 {data.ptotalCount}개</h5>
                <table className='table-hj'>
                    <thead className='thead-hj'>
                    <tr className='tr-hj' align='center'>
                        <th className='th-hj'><Checkbox type='checkbox' name='selectAll'
                                                     onChange={(e) => handleAllCheck(e.target.checked)}
                            // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                                                     checked={checkItems.length === data.length ? true : false}/>
                        </th>
                        <th className='th-hj'>번호</th>
                        <th className='th-hj'>사진</th>
                        <th className='th-hj'>종류</th>
                        <th className='th-hj'>브랜드</th>
                        <th className='th-hj'>이름</th>
                        <th className='th-hj'>가격</th>
                        <th className='th-hj'>판매수</th>
                        <th className='th-hj'>사이즈</th>
                        <th className='th-hj'>재고 수</th>
                    </tr>
                    </thead>

                    <tbody className='tbody-hj'>
                    {data.list && data.list.map((r, idx) => <tr key={idx} className='tr-hj' align='center'>
                        <td className='td-hj'><Checkbox type='checkbox' name={`select-${data.p_name}`}
                            onChange={(e) => handleSingleCheck(e.target.checked, data.p_name)}
                            // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                        checked={checkItems.includes(data.p_name) ? true : false} /></td>
                        <td className='td-hj'>{data.no - idx}</td>
                        <td className='td-hj'><img style={{width: '70px', borderRadius: '15px'}}
                                                   alt='' src={photoUrl + r.photo}/></td>
                        <td className='td-hj'>{r.category}</td>
                        <td className='td-hj'>{r.brand}</td>
                        <td className='td-hj'>{r.p_name}</td>
                        <td className='td-hj'>{r.price}</td>
                        <td className='td-hj'>{r.sellamount}</td>
                        <td className='td-hj'>{r.p_size}</td>
                        <td className='td-hj'>{r.amount}</td>
                    </tr>)}
                    </tbody>
                </table>
                <div style={{width: '630'}}>
                    {/*이전*/}
                    {data.startPage > 1 ? <Link to={`/admin/adproduct/${data.startPage - 1}`} className='pagenum'>
                        <b style={{color: 'black'}}>이전</b>
                    </Link> : ''}
                    {data.parr && data.parr.map((n, i) => <Link to={`/admin/adproduct/${n}`} className='pagenum'>
                        <b style={{color: n == currentPage ? 'red' : 'black'}}>
                            {n}
                        </b>
                    </Link>)}
                    {/* 다음으로 이동  */}
                    {data.endPage < data.totalPage ?
                        <Link to={`/admin/adproduct/${data.endPage + 1}`} className='pagenum'>
                            <b style={{color: 'black'}}>다음</b>
                        </Link> : ''}
                    <div style={{float: 'right'}}>
                        <button href="#" className="btn-gradient green">추가</button>
                        <button href="#" className="btn-gradient purple">수정</button>
                        <button href="#" className="btn-gradient red">삭제</button>
                    </div>
                </div>
            </div>
        </div>);
}

export default AdProduct;

let html = styled.html`
height: 100%;
`

let body = styled.body`
height: 100%;
display: grid;
place-content: center;
`