import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function DeliveryComplete(props) {
    const {currentPage} = useParams();
    const [data, setData] = useState('');
    const navi = useNavigate();

    const DeliveryCompletePaging = () => {
        let url = localStorage.url + "/admin/DeliveryCompletePaging?currentPage=" + (currentPage === undefined ? '1' : currentPage);
        axios.get(url)
            .then(res => {
                console.dir(res.data);
                setData(res.data);
            })
    }

    //currentPage 값이 변경될때마다 함수 다시 호출
    useEffect(() => {
        DeliveryCompletePaging();
    }, [currentPage])
    return (
        <div className='container-fluid'>

            <div className='row'>
                <h5>총 {data.stotalCount}개</h5>
                <table className='table-hj'>
                    <thead className='thead-hj'>
                    <tr className='tr-hj' align='center'>
                        <th className='th-hj'>번호</th>
                        <th className='th-hj'>받는분</th>
                        <th className='th-hj'>휴대전화</th>
                        <th className='th-hj'>주소</th>
                        <th className='th-hj'>갯수</th>
                        <th className='th-hj'>총 가격</th>
                        <th className='th-hj'>사이즈</th>
                        <th className='th-hj'>송장번호</th>
                        <th className='th-hj'>상태</th>
                        <th className='th-hj'>주문일</th>
                    </tr>
                    </thead>

                    <tbody className='tbody-hj'>
                    {
                        data.tlist &&
                        data.tlist.map((r, idx) =>
                            <tr key={idx} className='tr-hj' align='center'>
                                <td className='td-hj'>{data.no - idx}</td>
                                <td className='td-hj'>{r.t_name}</td>
                                <td className='td-hj'>{r.t_hp}</td>
                                <td className='td-hj'>{r.t_addr}</td>
                                <td className='td-hj'>{r.count}</td>
                                <td className='td-hj'>{r.lastprice}</td>
                                <td className='td-hj'>{r.p_size}</td>
                                <td className='td-hj'>{r.invoice}</td>
                                <td className='td-hj'>{r.state}</td>
                                <td className='td-hj'>{r.day}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
                <div style={{width: '630'}}>
                    {/*이전*/}
                    {
                        data.startPage > 1 ?
                            <Link to={`/admin/deliverycomplete/${data.startPage - 1}`} className='pagenum'>
                                <b style={{color: 'black'}}>이전</b>
                            </Link> : ''
                    }
                    {
                        data.parr &&
                        data.parr.map((n, i) =>
                            <Link to={`/admin/deliverycomplete/${n}`} className='pagenum'>
                                <b style={{color: n == currentPage ? 'red' : 'black'}}>
                                    {n}
                                </b>
                            </Link>)
                    }
                    {/* 다음으로 이동  */}
                    {
                        data.endPage < data.totalPage ?
                            <Link to={`/admin/deliverycomplete/${data.endPage + 1}`} className='pagenum'>
                                <b style={{color: 'black'}}>다음</b>
                            </Link> : ''
                    }
                </div>
            </div>
        </div>
    );
}

export default DeliveryComplete;