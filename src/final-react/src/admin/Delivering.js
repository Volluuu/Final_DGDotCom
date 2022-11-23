import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";



function Delivering(props) {
    const {currentPage} = useParams();
    const [data, setData] = useState('');
    const [invoice, setInvoice] = useState('');

    const DeliveringPaging = () => {
        let url = localStorage.url + "/admin/DeliveringPaging?currentPage=" + (currentPage === undefined ? '1' : currentPage);
        axios.get(url)
            .then(res => {
                setData(res.data);
            })
    }

    const updateInvoice = (e) => {
        let inin = document.querySelector(".ii").previousElementSibling.value;

        let url = localStorage.url + '/admin/updateinvoice';
        axios.put(url, {invoice: inin, t_num: e})
            .then(res => {
                alert('송장번호가 수정되었습니다');
                window.location.reload();
            })
    }

        const completeInvoice = (e) => {
            let good = document.querySelector(".good").value;
            console.log(good);
            let url = localStorage.url + '/admin/completedelivery';
            console.dir(data);
            if(window.confirm("배송완료 처리하겠습니까?")) {
                alert('배송완료로 처리했습니다')
                axios.post(url, {state: good, t_num: e})
                    .then(res => {
                        window.location.reload();
                    })
            }else{
                alert('취소합니다');
            }
        }

    //currentPage 값이 변경될때마다 함수 다시 호출
    useEffect(() => {
        DeliveringPaging();
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
                        <th className='th-hj'>배송</th>
                    </tr>
                    </thead>

                    <tbody className='tbody-hj'>
                    {
                        data.tlist &&
                        data.tlist.map((r, d_number) =>
                            <tr key={d_number} className='tr-hj' align='center'>
                                <td className='td-hj'>{d_number + 1}</td>
                                <td className='td-hj'>{r.t_name}</td>
                                <td className='td-hj'>{r.t_hp}</td>
                                <td className='td-hj'>{r.t_addr}</td>
                                <td className='td-hj'>{r.count}</td>
                                <td className='td-hj'>{r.lastprice}</td>
                                <td className='td-hj'>{r.p_size}</td>
                                <td className='td-hj'><input type={'text'}
                                                             defaultValue={r.invoice}
                                                             style={{border: '1px solid lightgray', width: '100%'}}/>

                                    <button type='button'
                                            className='ii'
                                            onClick={() => {
                                                updateInvoice(r.t_num);
                                            }}
                                    ><strong>수정하기</strong>
                                    </button>
                                </td>
                                <td className='td-hj'>{r.state}</td>
                                <td className='td-hj'>{r.day}</td>
                                <td className='td-hj'>
                                    <button
                                        type='button'
                                        className='good hj-btn-m hj-btn-green'
                                       onClick={() => {
                                           completeInvoice(r.t_num);
                                       }}>배송완료
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
                <div style={{width: '630'}}>
                    {/*이전*/}
                    {
                        data.startPage > 1 ?
                            <Link to={`/admin/delivering/${data.startPage - 1}`} className='pagenum'>
                                <b style={{color: 'black'}}>이전</b>
                            </Link> : ''
                    }
                    {
                        data.parr &&
                        data.parr.map((n, i) =>
                            <Link to={`/admin/delivering/${n}`} className='pagenum'>
                                <b style={{color: n == currentPage ? 'red' : 'black'}}>
                                    {n}
                                </b>
                            </Link>)
                    }
                    {/* 다음으로 이동  */}
                    {
                        data.endPage < data.totalPage ?
                            <Link to={`/admin/delivering/${data.endPage + 1}`} className='pagenum'>
                                <b style={{color: 'black'}}>다음</b>
                            </Link> : ''
                    }
                </div>
            </div>
        </div>

    );
}

export default Delivering;