import React, {useEffect, useState} from 'react';
import "./userTable.css"
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function UserInfo({path}) {
    const navi = useNavigate();
    const {currentPage} = useParams();
    console.log("currentPage="+currentPage);
    const [data,setData] = useState('');

    const userPageList = () => {
        let url = localStorage.url+"/admin/userpagelist?currentPage="+
            (currentPage===undefined?'1':currentPage);
        axios.get(url)
            .then(res => {
                console.dir(res.data);
                setData(res.data);
            })
    }

    //currentPage 값이 변경될때마다 함수 다시 호출
    useEffect(()=>{
        userPageList();
    },[currentPage])

    return (
        <div className='container-fluid'>
            <div className='row'>
                <h5>총 {data.totalCount}명</h5>
                <table className='table-hj'>
                    <thead className='thead-hj'>
                    <tr className='tr-hj' align='center'>
                        <th className='th-hj'>번호</th>
                        <th className='th-hj'>이메일</th>
                        <th className='th-hj'>이름</th>
                        <th className='th-hj'>휴대전화</th>
                        <th className='th-hj'>주소</th>
                        <th className='th-hj'>성별</th>
                        <th className='th-hj'>가입일</th>
                        <th className='th-hj'>포인트</th>
                    </tr>
                    </thead>

                    <tbody className='tbody-hj'>
                    {
                        data.ulist &&
                        data.ulist.map((r,idx) =>
                            <tr key={idx} className='tr-hj' align='center'>
                                <td className='td-hj'>{data.no-idx}</td>
                                <td className='td-hj'>{r.email}</td>
                                <td className='td-hj'>{r.u_name}</td>
                                <td className='td-hj'>{r.hp}</td>
                                <td className='td-hj'>{r.addr}</td>
                                <td className='td-hj'>{r.gender}</td>
                                <td className='td-hj'>{r.gaip}</td>
                                <td className='td-hj'>{r.point}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
                <div style={{width:'630'}}>
                    {/*이전*/}
                    {
                        data.startPage>1?
                            <Link to={`/admin/userinfo/${data.startPage-1}`} className='pagenum'>
                                <b style={{color:'black'}}>이전</b>
                            </Link> : ''
                    }
                    {
                        data.parr &&
                        data.parr.map((n,i)=>
                            <Link to={`/admin/userinfo/${n}`} className='pagenum'>
                                <b style={{color:n==currentPage?'red':'black'}}>
                                    {n}
                                </b>
                            </Link>)
                    }
                    {/* 다음으로 이동  */}
                    {
                        data.endPage<data.totalPage?
                            <Link to={`/admin/userinfo/${data.endPage+1}`} className='pagenum'>
                                <b style={{color:'black'}}>다음</b>
                            </Link> : ''
                    }
                </div>
            </div>
        </div>
    );
}

export default UserInfo;