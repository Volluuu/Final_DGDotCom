import React, {useEffect, useState} from 'react';
import "./userTable.css"
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Input} from "@mui/material";
import Checkbox from "@material-ui/core/Checkbox";

function UserInfo({path}) {
    const {currentPage} = useParams();
    console.log("currentPage="+currentPage);
    const [data,setData] = useState('');
    const [checkItems, setCheckItems] = useState([]);

    const userPageList = () => {
        let url = localStorage.url+"/admin/userpagelist?currentPage="+
            (currentPage===undefined?'1':currentPage);
        axios.get(url)
            .then(res => {
                console.dir(res.data);
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
            data.ulist.forEach((el) => idArray.push(el.u_num));
            console.log();
            setCheckItems(idArray);
        }

        // 반대의 경우 전체 체크 박스 체크 삭제
        else {
            setCheckItems([]);
        }
    };

    //유저 삭제
    const deleteUser = (u_num) => {
        const deleteUrl = localStorage.url + "/admin/deleteuser?u_num="+u_num;

        if(window.confirm("삭제하시겠습니까?"))
        {
            alert("삭제완료");
            axios.delete(deleteUrl)
                .then(res => {
                    window.location.reload();
                })
        }else {
            alert("취소합니다");
        }
    }

    //currentPage 값이 변경될때마다 함수 다시 호출
    useEffect(()=>{
        userPageList();
    },[currentPage])

    return (

        <div className='container-fluid'>
            <div className='row'>
                <h5>총 {data.utotalCount}명</h5>
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
                                    checkItems.length === 4
                                        ? true
                                        : false
                                }></Checkbox></th>
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
                                <td className='td-hj'><Checkbox
                                    type={"checkbox"}
                                    onChange={(e) => handleSingleCheck(e.target.checked,r.u_num)}
                                    // checkItems에 data.id가 있으면 체크 아니면 체크 해제
                                    checked={checkItems.includes(r.u_num) ? true : false}
                                /></td>
                                <td className='td-hj'>{r.u_num}</td>
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
                    <div style={{float:'right'}}>
                        <button className="btn-gradient red" onClick={()=>{deleteUser(checkItems);
                        }}>삭제</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;