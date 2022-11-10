import axios from 'axios';
import React, {useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom';

function SignupForm(props) {
    const emailRef = useRef('');
    const [emailError, setEmailError] = useState(false); // true면 에러가 있는거, false면 에러가 없는 거
    const [emailErrorMsg, setEmailErrorMsg] = useState("이메일 주소를 정확히 입력해주세요.");
    const passRef = useRef('');
    const [passError, setPassError] = useState(false); // true면 에러가 있는거, false면 에러가 없는 거
    let nameRef = useRef('');
    const [nameError, setNameError] = useState(false); // true면 에러가 있는거, false면 에러가 없는 거
    const hpRef = useRef('');
    const [hpError, setHpError] = useState(false); // true면 에러가 있는거, false면 에러가 없는 거
    const [hpErrorMsg, setHpErrorMsg] = useState("유효하지 않는 번호 입니다. (\"-\"를 포함하여 입력해주세요)");
    const addrRef = useRef('');
    const [gender, setGender] = useState("N");

    const navi = useNavigate();

    // 이메일 중복 체크
    const emailCheck = (email) => {
        let emailCheckUrl = process.env.REACT_APP_URL + "/user/emailcheck?email=" + email;
        axios.get(emailCheckUrl)
            .then(res => {
                console.log("이메일 중복 체크");
                console.dir(res.data);
                if (res.data > 0) {
                    setEmailErrorMsg("이미 사용 중인 이메일 입니다");
                    setEmailError(true);
                } else {
                    setEmailError(false);
                }
            })
    }

    // 핸드폰 중복 체크
    const hpCheck = (hp) => {
        let hpCheckUrl = process.env.REACT_APP_URL + "/user/hpcheck?hp=" + hp;
        axios.get(hpCheckUrl)
            .then(res => {
                console.log("핸드폰 중복 체크");
                console.dir(res.data);
                if (res.data > 0) {
                    setHpErrorMsg("이미 가입한 번호입니다.");
                    setHpError(true);
                } else {
                    setHpError(false);
                }
            })
    }

    const onSubmitSignUp = (e) => {
        e.preventDefault();
        // 이메일이 공백이거나 에러가 true 일 때 리턴
        if (emailRef.current.value === "" || emailError) {
            alert("유효한 이메일을 입력해주세요");
            emailRef.current.value = "";
            emailRef.current.focus();
            return;
        }
        // 비밀번호가 공백이거나 에러가 true 일 때 리턴
        if (passRef.current.value === "" || passError) {
            alert("유효한 비밀번호를 입력해주세요");
            passRef.current.value = "";
            passRef.current.focus();
            return;
        }
        // 이름이 공백이거나 에러가 true 일 때 리턴
        if (nameRef.current.value === "" || nameError) {
            alert("유효한 이름을 입력해주세요");
            nameRef.current.value = "";
            nameRef.current.focus();
            return;
        }
        // 핸드폰이 공백이거나 에러가 true 일 때 리턴
        if (hpRef.current.value === "" || hpError) {
            alert("유효한 핸드폰 번호를 입력해주세요");
            hpRef.current.value = "";
            hpRef.current.focus();
            return;
        }
        // 주소가 공백일 때 리턴
        if (addrRef.current.value === "") {
            alert("주소를 입력해주세요");
            addrRef.current.value = "";
            addrRef.current.focus();
            return;
        }
        // 성별이 N이 아닐 때
        if (gender === "N") {
            alert("성별을 선택해주세요");
            return;
        }
        let signupUrl = process.env.REACT_APP_URL + "/user/signup";
        axios.post(signupUrl, {
            email: emailRef.current.value,
            u_name: nameRef.current.value,
            pass: passRef.current.value,
            hp: hpRef.current.value,
            addr: addrRef.current.value,
            gender
        })
            .then(res => {
                navi("/user/login");
                alert("회원가입 성공");
            })
    }

    return (
        <div className="container join" data-v-6ca47fe2="" data-v-3007c576="">
            <div className="content lg" data-v-6ca47fe2="">
                <div className="join_area" data-v-6ca47fe2="">
                    <h2 className="join_title" data-v-6ca47fe2="">DG.com SignUp</h2>
                    <form onSubmit={onSubmitSignUp}>
                        <div data-v-6c561060="" data-v-6ca47fe2=""
                             className={emailError ? "input_box has_error" : "input_box"}>
                            <h3 className="input_title ess" data-v-6c561060="" data-v-6ca47fe2="">이메일 주소</h3>
                            <div className="input_item" data-v-6c561060="">
                                <input type="text" placeholder="예) email@naver.com" autoComplete="off" ref={emailRef}
                                       className="input_txt" data-v-6c561060=""
                                       onChange={(e) => {
                                           let email = emailRef.current.value;

                                           let exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
                                           if (exptext.test(email) === false) {
                                               setEmailError(true);
                                               setEmailErrorMsg("이메일 주소를 정확히 입력해주세요.");
                                           } else {
                                               setEmailError(false);
                                               emailCheck(email);
                                           }

                                       }}/>
                            </div>
                            <p className="input_error" data-v-6c561060="" data-v-6ca47fe2="">{emailErrorMsg}</p>
                        </div>
                        <div data-v-6c561060="" data-v-6ca47fe2=""
                             className={passError ? "input_box has_error" : "input_box"}>
                            <h3 className="input_title ess" data-v-6c561060="" data-v-6ca47fe2="">비밀번호</h3>
                            <div className="input_item" data-v-6c561060="">
                                <input type="password" placeholder="영문, 숫자, 특수문자 조합 8-16자" autoComplete="off"
                                       ref={passRef} className="input_txt" data-v-6c561060=""
                                       onChange={(e) => {
                                           let pw = passRef.current.value;
                                           let num = pw.search(/[0-9]/g);
                                           let eng = pw.search(/[a-z]/ig);
                                           let spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

                                           if (pw.length < 8 || pw.length > 16) {
                                               setPassError(true);
                                           } else if (pw.search(/\s/) !== -1) {
                                               setPassError(true);
                                           } else if (num < 0 || eng < 0 || spe < 0) {
                                               setPassError(true);
                                           } else {
                                               setPassError(false);
                                           }
                                       }}/>
                            </div>
                            <p className="input_error" data-v-6c561060="" data-v-6ca47fe2=""> 영문, 숫자, 특수문자를 조합하여 입력해주세요.
                                (8-16자, 공백 없이) </p>
                        </div>

                        <div data-v-6c561060="" data-v-6ca47fe2=""
                             className={nameError ? "input_box has_error" : "input_box"}>
                            <h3 className="input_title ess" data-v-6c561060="" data-v-6ca47fe2="">이름</h3>
                            <div className="input_item" data-v-6c561060="">
                                <input type="text" placeholder="이름을 입력하세요" autoComplete="off" ref={nameRef}
                                       className="input_txt" data-v-6c561060=""
                                       onChange={(e) => {
                                           let name = nameRef.current.value;
                                           let expname = /^[가-힣]{2,15}$/;
                                           // 공백 일 때, 길이가 1글자일 때, 공백이 들어가 있을 때
                                           if (name === "" || name.length <= 1 || name.search(/\s/) !== -1) {
                                               setNameError(true);
                                           } else if (!expname.test(name)) {
                                               setNameError(true);
                                           } else {
                                               setNameError(false);
                                           }
                                       }}/>
                            </div>
                            <p className="input_error" data-v-6c561060="" data-v-6ca47fe2="">이름을 정확히 입력해주세요.</p>
                        </div>
                        <div data-v-6c561060="" data-v-6ca47fe2=""
                             className={hpError ? "input_box has_error" : "input_box"}>
                            <h3 className="input_title ess" data-v-6c561060="" data-v-6ca47fe2="">핸드폰</h3>
                            <div className="input_item" data-v-6c561060="">
                                <input type="text" placeholder="예) 010-4154-8185 " autoComplete="off" ref={hpRef}
                                       className="input_txt" data-v-6c561060=""
                                       onChange={(e) => {
                                           let hp = hpRef.current.value;
                                           let exphp = /^(01[016789]{1})-[0-9]{3,4}-[0-9]{4}$/;
                                           if (!exphp.test(hp)) {
                                               setHpError(true);
                                               setHpErrorMsg("유효하지 않는 번호 입니다. (\"-\"를 포함하여 입력해주세요)");
                                           } else {
                                               setHpError(false);
                                               hpCheck(hp);
                                           }

                                       }}/>

                            </div>
                            <p className="input_error" data-v-6c561060="" data-v-6ca47fe2="">{hpErrorMsg}</p>
                        </div>
                        <div className="input_box" data-v-6c561060="" data-v-6ca47fe2="">
                            <h3 className="input_title ess" data-v-6c561060="" data-v-6ca47fe2="">주소</h3>
                            <div className="input_item" data-v-6c561060="">
                                <input type="text" placeholder="예) 서울시 관악구 남현3가길 11" autoComplete="off" ref={addrRef}
                                       className="input_txt" data-v-6c561060=""/>
                            </div>
                            <p className="input_error" data-v-6c561060="" data-v-6ca47fe2=""></p>
                        </div>
                        <div className="input_box" data-v-6c561060="" data-v-6ca47fe2="">
                            <h3 className="input_title ess" data-v-6c561060="" data-v-6ca47fe2="">성별</h3>
                            <div className="input_item" data-v-6c561060="">
                                <select className="v-select" value={gender}
                                        onChange={(e) => setGender(e.target.value)}>
                                    <option hidden value="N">성별을 고르세요</option>
                                    <option value="M">남자</option>
                                    <option value="F">여자</option>
                                </select>
                            </div>
                            <p className="input_error" data-v-6c561060="" data-v-6ca47fe2=""></p>
                        </div>
                        <br/>
                        <button type={"submit"}
                                className="btn btn_join full solid
                                " data-v-3d1bcc82=""
                                data-v-6ca47fe2=""> 가입하기
                        </button>
                        {/*disabled*/}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;
