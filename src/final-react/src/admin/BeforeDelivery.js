import React, {useEffect, useRef, useState} from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function BeforeDelivery(props) {
    const {currentPage} = useParams();
    const [data, setData] = useState('');

    const navi = useNavigate();

    const TradePaging = () => {
        let url = localStorage.url + "/admin/BeforeDeliveryPaging?currentPage=" + (currentPage === undefined ? '1' : currentPage);
        axios.get(url)
            .then(res => {
                console.dir(res.data);
                setData(res.data);
            })
    }
   // update button이벤트
    const insertInvoice = (e,t_num) => {
        // let upin = document.querySelector(".ui").previousElementSibling.value;
        // console.log(upin);
        let upin = e.target.previousElementSibling.value;
        if(e.target.previousElementSibling.value===''){
            alert('송장번호를 입력해주세요')
            return;
        }else{
        console.log(e.target.previousElementSibling.value);
        let url = localStorage.url + '/admin/insertinvoice';
        console.dir(data);
        axios.put(url, {invoice: upin, t_num: t_num})
            .then(res => {
                alert('송장번호가 저장되었습니다');
                window.location.reload();
            })
    }}

    //currentPage 값이 변경될때마다 함수 다시 호출
    useEffect(() => {
        TradePaging();
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
                        data.tlist.map((r, d_number) =>
                            <tr key={d_number} className='tr-hj' align='center'>
                                <td className='td-hj'>{d_number+++1}</td>
                                <td className='td-hj'>{r.t_name}</td>
                                <td className='td-hj'>{r.t_hp}</td>
                                <td className='td-hj'>{r.t_addr}</td>
                                <td className='td-hj'>{r.count}</td>
                                <td className='td-hj'>{r.lastprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                <td className='td-hj'>{r.p_size}</td>
                                <td className='td-hj'>

                                    <input type={'text'}
                                           style={{border: '1px solid lightgray', width: '100%'}}
                                            />

                                    <button type='button'
                                            className='ui'
                                            onClick={(e) => {
                                                insertInvoice(e,r.t_num);
                                            }}
                                    >추가하기
                                    </button>
                                </td>
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
                            <Link to={`/admin/beforedelivery/${data.startPage - 1}`} className='pagenum'>
                                <b style={{color: 'black'}}>이전</b>
                            </Link> : ''
                    }
                    {
                        data.parr &&
                        data.parr.map((n, i) =>
                            <Link to={`/admin/beforedelivery/${n}`} className='pagenum'>
                                <b style={{color: n == currentPage ? 'red' : 'black'}}>
                                    {n}
                                </b>
                            </Link>)
                    }
                    {/* 다음으로 이동  */}
                    {
                        data.endPage < data.totalPage ?
                            <Link to={`/admin/beforedelivery/${data.endPage + 1}`} className='pagenum'>
                                <b style={{color: 'black'}}>다음</b>
                            </Link> : ''
                    }
                </div>
            </div>
        </div>

    );
}

export default BeforeDelivery;