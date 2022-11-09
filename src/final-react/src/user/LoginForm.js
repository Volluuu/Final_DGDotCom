import axios from 'axios';
import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import "./UserCss.css";

function LoginForm(props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navi = useNavigate();

    //submit 이벤트
    const onSubmitLogin = (e) => {
        e.preventDefault();

        // let url=sessionStorage.url+"/login/check";
        let url = localStorage.url + "/user/login/check";


        axios.post(url, {email, pass})
            .then(res => {
                console.log(res.data.check);
                console.log(res.data.u_name);

                // localstorage는 닫아도 남아있음
                // sessionStorage은 닫으면 안남아있음

                if (res.data.check === 1) {
                    //각종정보를 Storage 에 저장
                    // localStorage.loginok='yes';
                    // localStorage.myid=myid;
                    // localStorage.myname=res.data.myname;

                    sessionStorage.loginok = 'yes';
                    sessionStorage.email = email;
                    sessionStorage.u_name = res.data.u_name;

                    //일단 Home 으로 이동
                    navi("/");
                    window.location.reload();//새로고침
                } else {
                    alert("아이디 또는 비밀번호가 맞지 않습니다");
                    setEmail('');
                    setPass('');

                }
            });
    }
    return (
        <div className="content lg" data-v-b02d33c2="">
            <div className="login_area" data-v-b02d33c2="">
                    <h2 style={{textAlign:"center"}}><span>DG.com Login</span></h2>
                <div className="has_button input_box" data-v-6c561060="" data-v-b02d33c2="">
                    <h3 className="input_title" data-v-6c561060="" data-v-b02d33c2="">이메일 주소</h3>
                    <div className="input_item" data-v-6c561060="">
                        <input type="text" placeholder="예) email@email.com" autoComplete="off" className="input_txt" data-v-6c561060=""/>
                        <button type="button" className="btn input_delete" style={{display: "none"}} data-v-3d1bcc82="" data-v-b02d33c2="" data-v-6c561060="">
                            <svg xmlns="http://www.w3.org/2000/svg" className="ico-delete-circle icon sprite-icons" data-v-b02d33c2="">
                                <use href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-ico-delete-circle" data-v-b02d33c2=""></use>
                            </svg>
                        </button>
                    </div>
                    <p className="input_error" data-v-6c561060="" data-v-b02d33c2="">이메일 주소를 정확히 입력해주세요.</p>
                </div>
                <div className="input_box has_button" data-v-6c561060="" data-v-b02d33c2="">
                    <h3 className="input_title" data-v-6c561060="" data-v-b02d33c2="">비밀번호</h3>
                    <div className="input_item" data-v-6c561060="">
                        <input type="password" placeholder="" autoComplete="off" className="input_txt" data-v-6c561060=""/></div>
                    <p className="input_error" data-v-6c561060="" data-v-b02d33c2="">
                        영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)
                    </p>
                </div>
                <div className="login_btn_box" data-v-b02d33c2="">
                    <Link disabled="disabled" to="#" className="btn full solid disabled" data-v-3d1bcc82="" data-v-b02d33c2="">
                        로그인
                    </Link>
                </div>
                <ul className="look_box" data-v-b02d33c2="">
                    <li className="look_list" data-v-b02d33c2="">
                        <Link to="/join" className="look_link" data-v-b02d33c2=""> 이메일 가입 </Link>
                    </li>
                    <li className="look_list" data-v-b02d33c2="">
                        <Link to="/login/find_email" className="look_link" data-v-b02d33c2=""> 이메일 찾기 </Link>
                    </li>
                    <li className="look_list" data-v-b02d33c2="">
                        <Link to="/login/find_password" className="look_link" data-v-b02d33c2=""> 비밀번호 찾기 </Link>
                    </li>
                </ul>
                <div className="social_login" data-v-b02d33c2="">
                    <button type="button" className="btn btn_login_naver full outline" data-v-3d1bcc82="" data-v-b02d33c2="">
                        <svg xmlns="http://www.w3.org/2000/svg" className="logo-social icon sprite-icons" data-v-b02d33c2="">
                            <use href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-logo-naver" data-v-b02d33c2=""></use>
                        </svg>
                        네이버로 로그인
                    </button>
                    <button type="button" className="btn btn_login_apple full outline" data-v-3d1bcc82="" data-v-b02d33c2="">
                        <svg xmlns="http://www.w3.org/2000/svg" className="logo-social icon sprite-icons" data-v-b02d33c2="">
                            <use href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-logo-apple" data-v-b02d33c2=""></use>
                        </svg>
                        Apple로 로그인
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;