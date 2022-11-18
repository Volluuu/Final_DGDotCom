import React, {useEffect, useState} from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function BeforeDelivery(props) {
    const {currentPage} = useParams();
    const [data, setData] = useState('');
    const [checkItems, setCheckItems] = useState([]);
    const navi = useNavigate();


    const TradePaging = () => {
        let url = localStorage.url + "/admin/BeforeDeliveryPaging?currentPage=" + (currentPage === undefined ? '1' : currentPage);
        axios.get(url)
            .then(res => {
                setData(res.data);
                console.log(res.data);
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

            console.dir(checked);
            const idArray = [];
            // 전체 체크 박스가 체크 되면 id를 가진 모든 elements를 배열에 넣어주어서,
            // 전체 체크 박스 체크
            data.list.forEach((el) => idArray.push(el.t_num));
            console.log();
            setCheckItems(idArray);
        }

        // 반대의 경우 전체 체크 박스 체크 삭제
        else {
            setCheckItems([]);
        }
    };

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
                            <th className='th-hj'><Checkbox
                                type={'checkbox'}/></th>
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
                                    <td className='td-hj'><Checkbox
                                        type={'checkbox'}
                                        // onChange={}
                                    /></td>
                                    <td className='td-hj'>{r.t_num}</td>
                                    <td className='td-hj'>{r.t_name}</td>
                                    <td className='td-hj'>{r.t_hp}</td>
                                    <td className='td-hj'>{r.t_addr}</td>
                                    <td className='td-hj'>{r.count}</td>
                                    <td className='td-hj'>{r.lastprice}</td>
                                    <td className='td-hj'>{r.p_size}</td>
                                    <td className='td-hj'><input type={'text'}

                                                                 style={{border: '1px solid lightgray', width: '100%'}}
                                                                 placeholder='입력 후 Enter'/></td>
                                    <td className='td-hj'>{r.state}</td>
                                    <td className='td-hj'>{r.day}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div style={{width:'630'}}>
                        {/*이전*/}
                        {
                            data.startPage>1?
                                <Link to={`/admin/delivery/${data.startPage-1}`} className='pagenum'>
                                    <b style={{color:'black'}}>이전</b>
                                </Link> : ''
                        }
                        {
                            data.parr &&
                            data.parr.map((n,i)=>
                                <Link to={`/admin/delivery/${n}`} className='pagenum'>
                                    <b style={{color:n==currentPage?'red':'black'}}>
                                        {n}
                                    </b>
                                </Link>)
                        }
                        {/* 다음으로 이동  */}
                        {
                            data.endPage<data.totalPage?
                                <Link to={`/admin/delivery/${data.endPage+1}`} className='pagenum'>
                                    <b style={{color:'black'}}>다음</b>
                                </Link> : ''
                        }
                    </div>
                </div>
            </div>
    );
}

export default BeforeDelivery;