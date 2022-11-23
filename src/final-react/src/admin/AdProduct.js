import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';
import './button.css'
import Checkbox from "@material-ui/core/Checkbox";
import EditIcon from '@material-ui/icons/Edit';


function AdProduct(props) {
    const {currentPage} = useParams();
    const {i_num} = useParams();
    console.log("current page: " + currentPage);
    const [data, setData] = useState('');
    const [checkItems, setCheckItems] = useState([]);
    const navi = useNavigate();

    const photoUrl = localStorage.url + "/product/";

    const ProductPaging = () => {
        let url = localStorage.url + "/admin/ProductPaging?currentPage=" + (currentPage === undefined ? '1' : currentPage);
        axios.get(url)
            .then(res => {
                setData(res.data);
            })
    }


    // 체크박스 전체 단일 개체 선택
    const handleSingleCheck = (checked, id) => {
        if (checked) {
            setCheckItems([...checkItems, id]);
        } else {
            // 체크 해제
            setCheckItems(checkItems.filter((r) => r !== id));
        }
    };

    // 체크박스 전체 선택
    const handleAllCheck = (checked) => {
        if (checked) {
            // console.log("제발....ㅠㅠ.ㅠ.");
            console.dir(checked);
            const idArray = [];
            // 전체 체크 박스가 체크 되면 id를 가진 모든 elements를 배열에 넣어주어서,
            // 전체 체크 박스 체크
            data.list.forEach((el) => idArray.push(el.p_num));
            console.log();
            setCheckItems(idArray);
        }

        // 반대의 경우 전체 체크 박스 체크 삭제
        else {
            setCheckItems([]);
        }
    };


    console.log(checkItems.length);

    //상품 삭제
    const deleteProduct = (p_num) => {
        const deleteUrl = localStorage.url + "/admin/deleteProduct?p_num=" + p_num

        if (window.confirm("삭제하시겠습니까?")) {
            alert("삭제완료");
            axios.delete(deleteUrl)
                .then(res => {
                    window.location.reload();
                })
        } else {
            alert("취소합니다");
        }

    }


//currentPage 값이 변경될때마다 함수 다시 호출
    useEffect(() => {
        ProductPaging();
    }, [currentPage])

    return (
        <div className='hjhj'>
            <div className='container-fluid'>
                <div className='row'>
                    <h5>총 {data.ptotalCount}개</h5>
                    <table className='table-hj'>
                        <thead className='thead-hj'>
                        <tr className='tr-hj' align='center'>
                            <th className='th-hj'>
                                <Checkbox
                                    name="checkAll"
                                    type={"checkbox"}
                                    onChange={(e) => handleAllCheck(e.target.checked)}
                                    // checkItems의 갯 수와 불러오는 데이터가 같을 때, 전체 선택을 활성화
                                    // 하나라도 빼면 체크 박스 해제
                                    checked={
                                        checkItems.length === 6
                                            ? true
                                            : false
                                    }></Checkbox></th>
                            <th className='th-hj'>번호</th>
                            <th className='th-hj'>사진</th>
                            <th className='th-hj'>종류</th>
                            <th className='th-hj'>브랜드</th>
                            <th className='th-hj'>이름</th>
                            <th className='th-hj'>가격</th>
                            <th className='th-hj'>판매수</th>
                            <th className='th-hj'>사이즈</th>
                            <th className='th-hj'>재고 수</th>
                            <th className='th-hj'>수정</th>
                        </tr>
                        </thead>

                        <tbody className='tbody-hj'>
                        {data.list && data.list.map((r, idx) => <tr key={idx} className='tr-hj' align='center'>
                            <td className='td-hj'><Checkbox
                                type={"checkbox"}
                                onChange={(e) => handleSingleCheck(e.target.checked, r.p_num)}
                                // checkItems에 data.id가 있으면 체크 아니면 체크 해제
                                checked={checkItems.includes(r.p_num) ? true : false}
                            /></td>
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
                            <td className='td-hj'><EditIcon
                                style={{cursor: 'pointer'}}
                                onClick={() => {
                                    navi(`/admin/pupdateform/${r.i_num}`);
                                }}/></td>
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
                            <button href="#"
                                    type='button'
                                    className="hj-btn hj-btn-green"
                                    style={{margin: '20px'}}
                                    onClick={() => {
                                navi("/admin/insertform");
                            }}>추가
                            </button>

                            <button className="hj-btn hj-btn-red"
                                    type='button'
                                    onClick={() => {
                                deleteProduct(checkItems)
                            }}>삭제
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdProduct;