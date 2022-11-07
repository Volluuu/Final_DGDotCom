import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm(props) {
    const [email,setEmail]=useState('');
    const [pass,setPass]=useState('');
    const navi=useNavigate();

    //submit 이벤트
    const onSubmitLogin=(e)=>{
        e.preventDefault();

        // let url=sessionStorage.url+"/login/check";
        let url=localStorage.url+"/user/login/check";


        axios.post(url,{email,pass})
            .then(res=>{
                console.log(res.data.check);
                console.log(res.data.u_name);

                // localstorage는 닫아도 남아있음
                // sessionStorage은 닫으면 안남아있음

                if(res.data.check===1){
                    //각종정보를 Storage 에 저장
                    // localStorage.loginok='yes';
                    // localStorage.myid=myid;
                    // localStorage.myname=res.data.myname;

                    sessionStorage.loginok='yes';
                    sessionStorage.email=email;
                    sessionStorage.u_name=res.data.u_name;

                    //일단 Home 으로 이동
                    navi("/");
                    window.location.reload();//새로고침
                }else{
                    alert("아이디 또는 비밀번호가 맞지 않습니다");
                    setEmail('');
                    setPass('');

                }
            });
    }
    return (
        <div className="login">
            <form onSubmit={onSubmitLogin}>
                <table className="table table-bordered">
                    <tr>
                        <th style={{width:'100px',backgroundColor:'#ddd'}}>아이디</th>
                        <td>
                            <input type="text"  className="form-control"
                                   placeholder="이메일" required autoFocus
                                   value={email}
                                   onChange={(e)=>setEmail(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <th style={{width:'100px',backgroundColor:'#ddd'}}>비밀번호</th>
                        <td>
                            <input type="password" className="form-control"
                                   required placeholder="비밀번호"
                                   value={pass}
                                   onChange={(e)=>setPass(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="table-danger" align="center">
                            <button type="submit" className="btn btn-default"
                                    style={{width:'150px'}}>회원로그인</button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>


    );
}

export default LoginForm;