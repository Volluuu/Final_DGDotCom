import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const SignupForm = () => {
    const [u_name,setU_name]=useState('');
    const [email,setEmail]=useState('');
    const [pass,setPass]=useState('');
    const [btnok,setBtnok]=useState(false);//중복체크 버튼 클릭여부판단
    const [idmsg,setIdmsg]=useState('');//아이디 가능여부 메세지
    const [hp,setHp]=useState('');//핸드폰 번호
    const [addr,setAddr]=useState('');//주소
    const [gender,setGender]=useState('');//성별

    const navi=useNavigate();

    //아이디 중복체크 버튼
    const btnIdCheck=()=>{
        let url=localStorage.url+"/login/idcheck?email="+email;
        // let url=sessionStorage.url+"/login/idcheck?myid="+myid;
        axios.get(url)
            .then(res=>{
                if(res.data===0){
                    setIdmsg("가입가능");
                    setBtnok(true);
                }else{
                    setIdmsg("가입불가");
                    setBtnok(false);
                }
            })
    }

    //아이디 입력시 호출되는 이벤트
    const inputIdChange=(e)=>{
        setEmail(e.target.value);
        setBtnok(false);//중복체크후 아이디를 다시 입력할경우때문에 추가함
        setIdmsg('');//아이디에 대한 메세지도 지우기
    }

    const onSubmitButton=(e)=>{
        e.preventDefault();//기본 이벤트 무효화

        //아이디 중복 버튼을 클릭했는지 여부
        if(!btnok){
            alert("이메일 중복체크 버튼을 눌러주세요");
            return;
        }

        let url=localStorage.url+"/member/insert";
        // let url=sessionStorage.url+"/member/insert";
        axios.post(url,{u_name,email,pass,hp,addr,gender})
            .then(res=>{
                alert("회원가입 성공");
                setEmail('');
                setU_name('');
                setPass('');
                setHp('');
                setAddr('');
                setGender('');
                setBtnok(false);
                //로그인폼으로 이동
                navi("/login");
            })
    }

    return (
        <div>
            <form onSubmit={onSubmitButton}>
                <table className='table table-bordered' style={{width:'500px'}}>
                    <caption align='top'><h2>회원가입</h2></caption>
                    <tbody>
                    <tr>
                        <th>이메일</th>
                        <td>
                            <div className='input-group'>
                                <input type={'text'} required
                                       value={email} onChange={inputIdChange}/>
                                <button type='button'
                                        onClick={btnIdCheck}>이메일중복</button>
                                &nbsp;
                                <b style={{width:'100px'}}>{idmsg}</b>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>비밀번호</th>
                        <td>
                            <input type={'password'}
                                   value={pass} onChange={(e)=>setPass(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <th>이름</th>
                        <td>
                            <div className='input-group' >
                                <input type={'text'} required value={u_name}
                                       onChange={(e)=>setU_name(e.target.value)}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>핸드폰 번호</th>
                        <td>
                            <div className='input-group' >
                                <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                                       placeholder='xxx-xxxx-xxxx'
                                       value={hp}
                                       onChange={(e)=>{
                                           if(e.target.value.length===3 || e.target.value.length===8){
                                               e.target.value=e.target.value+'-';
                                           }
                                           setHp(e.target.value);
                                       }}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>성별</th>
                        <td>
                            <div className='input-group' >
                                <select className='form-select'
                                        onChange={(e)=>{
                                            setGender(e.target.value);
                                        }}>
                                    <option>M</option>
                                    <option>F</option>

                                </select>

                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td>
                            <div className='input-group' >
                                <input type={'text'}
                                       onChange={(e)=>setU_name(e.target.value)}/>
                            </div>
                        </td>
                    </tr>


                    <tr>
                        {/*<th>회원가입</th>*/}
                        <td colSpan={2} align={"center"} >
                            <button type='submit'>회원가입</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}
export default SignupForm;
