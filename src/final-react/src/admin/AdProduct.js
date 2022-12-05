import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import './button.css'
import Checkbox from "@material-ui/core/Checkbox";
import EditIcon from '@material-ui/icons/Edit';
// import Pagination from "react-js-pagination";
import {Pagination} from "@mui/material";
import UsePagination from "./usePagination";

// import UsePagination from "./usePagination";


function AdProduct(props) {


    const [productdata, setProductData] = useState([]);
    const [checkItems, setCheckItems] = useState([]);
    const navi = useNavigate();
    let [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    let items = 8;
    const [searchList, setSearchList] = useState([]);
    const pcount = Math.ceil(searchList.length / items);
    const _perPage = UsePagination(searchList, items);

    const handleChange = (e, p) => {
        setPage(p);
        _perPage.jump(p);
        setCheckItems([]);
    };


    const photoUrl = localStorage.url + "/product/";



    // const handlePageChange = (page) => {
    //     setPage(page);
    // };


    // 체크박스 전체 단일 개체 선택
    const handleSingleCheck = (checked, id) => {
        if (checked) {
            setCheckItems([...checkItems, id]);
            console.log(id);
        } else {
            // 체크 해제
            setCheckItems(checkItems.filter((r) => r !== id));
        }
    };

    // 체크박스 전체 선택
    const handleAllCheck = (checked) => {
        if (checked) {
            console.dir(checked);
            const idArray = [];
            // 전체 체크 박스가 체크 되면 id를 가진 모든 elements를 배열에 넣어주어서,
            // 전체 체크 박스 체크
            _perPage.currentData().forEach((el) => idArray.push(el.p_num));
            console.log();
            setCheckItems(idArray);
        }

        // 반대의 경우 전체 체크 박스 체크 삭제
        else {
            setCheckItems([]);
        }
    };
    const search = () => {
        setSearchList(productdata.filter((r) => {
            if (searchTerm == '') {
                return r;
            } else if (r.p_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                r.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                r.brand.toLowerCase().includes(searchTerm.toLowerCase())) {
                return r;
            }
        }))
    }


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


    const allProduct = () => {
            let url = localStorage.url + "/admin/product";
            axios.get(url).then(res => {
            setProductData(res.data);
            setSearchList(res.data);
        })
    }
//currentPage 값이 변경될때마다 함수 다시 호출

    useEffect(() =>{
     search();

    }, [searchTerm])

    useEffect(() => {
        allProduct();
    }, [])



    return (
        <div className='hjhj'>
            <div className="search">
                <input type="text"
                       style={{margin:'0 12px'}}
                       className='search-input'
                       placeholder="검색어 입력"
                       onChange={(e) => {
                           setSearchTerm(e.target.value);
                       }}/>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    {/*<h5>총 {data.ptotalCount}개</h5>*/}
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
                                        checkItems.length === 8
                                            ? true
                                            : false
                                    }></Checkbox></th>
                            <th className='th-hj'>번호</th>
                            <th className='th-hj'>사진</th>
                            <th className='th-hj'>종류</th>
                            <th className='th-hj'>브랜드</th>
                            <th className='th-hj'>상품명</th>
                            <th className='th-hj'>가격</th>
                            <th className='th-hj'>판매수</th>
                            <th className='th-hj'>할인율</th>
                            <th className='th-hj'>사이즈</th>
                            <th className='th-hj'>재고 수</th>
                            <th className='th-hj'>수정</th>
                        </tr>
                        </thead>

                        <tbody className='tbody-hj'>
                        {productdata &&
                            _perPage.currentData().map((r, idx) =>
                                <tr key={idx} className='tr-hj' align='center'>
                                    <td className='td-hj'>
                                        <Checkbox
                                            type={"checkbox"}
                                            onChange={(e) => handleSingleCheck(e.target.checked, r.p_num)}
                                            // checkItems에 data.id가 있으면 체크 아니면 체크 해제
                                            checked={checkItems.includes(r.p_num) ? true : false}
                                        /></td>
                                    <td className='td-hj'>{r.p_num}</td>
                                    <td className='td-hj'><img style={{width: '70px', borderRadius: '15px'}}
                                                               alt='' src={photoUrl + r.photo}/></td>
                                    <td className='td-hj'>{r.category}</td>
                                    <td className='td-hj'>{r.brand}</td>
                                    <td className='td-hj'>{r.p_name}</td>
                                    <td className='td-hj'>{r.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td className='td-hj'>{r.sellamount}</td>
                                    <td className='td-hj'>{r.discount}</td>
                                    <td className='td-hj'>{r.p_size}</td>
                                    <td className='td-hj'>{r.amount}</td>
                                    <td className='td-hj'>
                                        <EditIcon
                                            style={{cursor: 'pointer'}}
                                            onClick={() => {
                                                navi(`/admin/pupdateform/${r.i_num}`);
                                            }}/></td>
                                </tr>
                            )
                            //     .slice(
                            //     items * (page - 1),
                            //     items * (page - 1) + items
                            // )
                        }
                        </tbody>
                    </table>
                    <div>
                        <Pagination
                            onChange={handleChange}
                            count={pcount}
                            page={page}
                        />
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