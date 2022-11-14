import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function AdProduct(props) {
    const {currentPage} = useParams();
    console.log("current page: " + currentPage);
    const [data,setData] = useState('');

    const photoUrl=localStorage.url+"/product/";
    const ProductPaging = () => {
        let url = localStorage.url +"/admin/ProductPaging?currentPage="+
            (currentPage===undefined?'1':currentPage);
        axios.get(url)
            .then(res => {
                console.dir(res.data);
                setData(res.data);
            })
    }

    //currentPage 값이 변경될때마다 함수 다시 호출
    useEffect(()=>{
        ProductPaging();
    },[currentPage])
    return (
        <div className='container-fluid'>
            <div className='row'>
                <h5>총 {data.totalCount}개</h5>
                <table className='table-hj'>
                    <thead className='thead-hj'>
                    <tr className='tr-hj' align='center'>
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
                    {
                        data.list &&
                        data.list.map((r,idx) =>
                            <tr key={idx} className='tr-hj' align='center'>
                                <td className='td-hj'>{data.no-idx}</td>
                                <td className='td-hj'><img style={{width:'70px', borderRadius:'15px'}}
                                    alt='' src={photoUrl+r.photo}/></td>
                                <td className='td-hj'>{r.category}</td>
                                <td className='td-hj'>{r.brand}</td>
                                <td className='td-hj'>{r.p_name}</td>
                                <td className='td-hj'>{r.price}</td>
                                <td className='td-hj'>{r.sellamount}</td>
                                <td className='td-hj'>{r.p_size}</td>
                                <td className='td-hj'>{r.amount}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
                <div style={{width:'630'}}>
                    {/*이전*/}
                    {
                        data.startPage>1?
                            <Link to={`/admin/adproduct/${data.startPage-1}`} className='pagenum'>
                                <b style={{color:'black'}}>이전</b>
                            </Link> : ''
                    }
                    {
                        data.parr &&
                        data.parr.map((n,i)=>
                            <Link to={`/admin/adproduct/${n}`} className='pagenum'>
                                <b style={{color:n==currentPage?'red':'black'}}>
                                    {n}
                                </b>
                            </Link>)
                    }
                    {/* 다음으로 이동  */}
                    {
                        data.endPage<data.totalPage?
                            <Link to={`/admin/adproduct/${data.endPage+1}`} className='pagenum'>
                                <b style={{color:'black'}}>다음</b>
                            </Link> : ''
                    }
                </div>
            </div>
        </div>
    );
}

export default AdProduct;