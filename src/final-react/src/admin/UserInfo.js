import React, {} from 'react';
import "./userTable.css"

class UserInfo extends React.Component {
    render() {
        // const navi = useNavigate();
        // const {currentPage} = useParams();
        // console.log("currentPage="+currentPage);
        // const [data,setData] = useState('');
        //
        // const userpageList = () => {
        //     let url = localStorage.url+"/admin/userpagelist?currentPage="+currentPage;
        //     axios.get(url)
        //         .then(res => {
        //             setData(res.data);
        //             console.log(res.data);
        //         })
        // }
        //
        // //currentPage 값이 변경될때마다 함수 다시 호출
        // useEffect(()=>{
        //     userpageList();
        // },[currentPage])

        return (
            <div className='container-fluid'>
                <div className='row'>
                    <h5>총</h5>
                    <table>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>이메일</th>
                                <th>이름</th>
                                <th>번호</th>
                                <th>주소</th>
                                <th>휴대전화</th>
                                <th>성별</th>
                                <th>가입일</th>
                                <th>포인트</th>
                            </tr>
                        </thead>

                        <tbody>
                        {

                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default UserInfo;