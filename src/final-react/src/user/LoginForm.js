import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "./UserCss.css";
import axios from "axios";

function LoginForm(props) {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false); // true면 에러가 있는거, false면 에러가 없는 거
    const [emailErrorMsg, setEmailErrorMsg] = useState("이메일 주소를 정확히 입력해주세요.");

    const [pass, setPass] = useState('');
    const [passError, setPassError] = useState(false); // true면 에러가 있는거, false면 에러가 없는 거
    const [loginBtn, setLoginBtn] = useState(true); // 로그인 버튼

    const navi = useNavigate();

    const onSubmitLogin = (e) => {
        e.preventDefault();
        let signinUrl = process.env.REACT_APP_URL + "/user/signin";

        axios.post(signinUrl,
            {"username": email, "password": pass},
            {headers: {"Content-Type": "application/x-www-form-urlencoded"}})
            .then(res => {
                console.log("이메일 전송 완료");
                console.dir(res);
                sessionStorage.u_num = 1;
                sessionStorage.loginok = "yes";
                navi(-1);
                // navi("/");
                // if (res.data === 0) {
                //     alert("아이디를 다시 확인해주세요.");
                //     setEmail('');
                //     setPass('');
                //     document.getElementById("email").focus();
                //     sessionStorage.removeItem("loginok");
                // } else if (res.data === -1) {
                //     alert("비밀번호가 틀렸습니다.");
                //     setPass('');
                //     document.getElementById("pass").focus();
                //     sessionStorage.removeItem("loginok");
                // } else {
                //     alert("로그인 성공");
                //     navi(-1);
                //     sessionStorage.u_num = res.data;
                //     sessionStorage.loginok = "yes";
                // }
            }).catch(res => {
            alert("로그인 실패");
            console.dir(res);
        })
    }

    const onLoginBtnState = () => {
        if (!emailError && pass !== "") {
            setLoginBtn(false);
        } else if (emailError) {
            setLoginBtn(true);
        } else if (pass === "") {
            setLoginBtn(true);
        }
    }

    // const loginBtnEvent = () => {
    //     let signinUrl = process.env.REACT_APP_URL + "/user/signin";
    //
    //     axios.post(signinUrl, {email, pass})
    //         .then(res => {
    //             if (res.data === 0) {
    //                 alert("아이디나 비밀번호가 틀렸습니다.");
    //                 window.location.reload();
    //                 sessionStorage.loginok = "no";
    //             } else {
    //                 alert("로그인 성공");
    //                 window.location.reload();
    //                 sessionStorage.u_num = res.data;
    //                 sessionStorage.loginok = "yes";
    //             }
    //         })
    // }

    // email, pass 바뀔 때마다 렌더링
    useEffect(() => {
        onLoginBtnState();
    }, [email, pass])

    return (
        <div className="content lg" data-v-b02d33c2="">
            <div className="login_area" data-v-b02d33c2="">
                <h2 style={{textAlign: "center"}}><span>DG.com Login</span></h2>
                <form onSubmit={onSubmitLogin}>
                    <div data-v-6c561060="" data-v-b02d33c2=""
                         className={emailError ? "input_box has_error" : "input_box"}>
                        <h3 className="input_title" data-v-6c561060="" data-v-b02d33c2="">이메일 주소</h3>
                        <div className="input_item" data-v-6c561060="">
                            <input type="text" placeholder="예) email@email.com" autoComplete="off" className="input_txt"
                                   value={email} data-v-6c561060="" id="email"
                                   onChange={(e) => {
                                       setEmail(e.target.value);
                                       let exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
                                       if (exptext.test(email) === false) {
                                           setEmailError(true);
                                       } else {
                                           setEmailError(false);
                                       }
                                       onLoginBtnState();
                                   }}/>
                            {/*<button type="button" className="btn input_delete" style={{display: ""}} data-v-3d1bcc82=""*/}
                            {/*        data-v-b02d33c2="" data-v-6c561060="">*/}
                            {/*    <svg xmlns="http://www.w3.org/2000/svg" className="ico-delete-circle icon sprite-icons"*/}
                            {/*         data-v-b02d33c2="">*/}
                            {/*        <use href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-ico-delete-circle"*/}
                            {/*             data-v-b02d33c2=""></use>*/}
                            {/*    </svg>*/}
                            {/*</button>*/}
                        </div>
                        <p className="input_error" data-v-6c561060="" data-v-b02d33c2="">{emailErrorMsg}</p>
                    </div>
                    <div data-v-6c561060="" data-v-b02d33c2=""
                         className="input_box">
                        <h3 className="input_title" data-v-6c561060="" data-v-b02d33c2="">비밀번호</h3>
                        <div className="input_item" data-v-6c561060="">
                            <input type="password" placeholder="" autoComplete="off" className="input_txt" name="pass"
                                   data-v-6c561060="" value={pass} id="pass"
                                   onChange={(e) => {
                                       setPass(e.target.value);
                                       onLoginBtnState();
                                   }}/></div>
                    </div>
                    <div className="login_btn_box" data-v-b02d33c2="">
                        <button type={"submit"} className="btn full solid"
                                disabled={loginBtn ? true : false}
                                data-v-3d1bcc82=""
                                data-v-b02d33c2=""
                        >
                            로그인
                        </button>
                    </div>
                </form>
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
                    <button type="button" className="btn btn_login_naver full outline" data-v-3d1bcc82=""
                            data-v-b02d33c2="">
                        <svg xmlns="http://www.w3.org/2000/svg" className="logo-social icon sprite-icons"
                             data-v-b02d33c2="">
                            <use href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-logo-naver"
                                 data-v-b02d33c2=""></use>
                        </svg>
                        네이버로 로그인
                    </button>
                    <button type="button" className="btn btn_login_apple full outline" data-v-3d1bcc82=""
                            data-v-b02d33c2="">
                        <svg xmlns="http://www.w3.org/2000/svg" className="logo-social icon sprite-icons"
                             data-v-b02d33c2="">
                            <use href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-logo-apple"
                                 data-v-b02d33c2=""></use>
                        </svg>
                        Apple로 로그인
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;