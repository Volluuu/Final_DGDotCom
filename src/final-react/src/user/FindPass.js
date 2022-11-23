import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function FindPass(props) {
    const [emailSended, setEmailSended] = useState(false);
    const [emailSendBtn, setEmailSendBtn] = useState(true);

    const emailRef = useRef('');
    const [emailError, setEmailError] = useState(false); // true면 에러가 있는거, false면 에러가 없는 거

    const hpRef = useRef('');
    const [hpError, setHpError] = useState(false); // true면 에러가 있는거, false면 에러가 없는 거

    // 휴대폰 번호, 이메일 주소를 가진 계정 확인 후
    // 없으면 ref 두개 초기화 , error 두 개 false
    // 있으면 메일 발송 (axios put update
    const emailSend = () => {
        let findPassCheckUrl = process.env.REACT_APP_URL + "/user/findpasscheck";
        axios.post(findPassCheckUrl, {
            hp: hpRef.current.value,
            email: emailRef.current.value
        }).then(res => {
            if (res.data === 0) {
                Swal.fire({
                    icon: "warning",
                    text: "일치하는 사용자 정보를 찾을 수 없습니다."
                })
            } else {
                passUpdateAndEmailSend();
                Swal.fire({
                    icon: "info",
                    text: "새로운 비밀번호가 발송 되었습니다."
                }).then(res => {
                    setEmailSended(true);

                })
            }
        })
    }

    const passUpdateAndEmailSend = () => {
        let passUpdateAndEmailSendUrl = process.env.REACT_APP_URL + "/user/passupdateandemailsend";
        axios.put(passUpdateAndEmailSendUrl, {
            hp: hpRef.current.value,
            email: emailRef.current.value
        }).then(res => {
            console.log(res.data);
        })
    }

    return (
        /* eslint-disable */
        <div data-v-3007c576="" className="container help">
            <div className="content lg">
                <div className="help_area">
                    {!emailSended ?
                        <div>
                            <h2 className="help_title">비밀번호 찾기</h2>
                            <div className="help_notice">
                                <p className="notice_txt"> 가입 시 등록하신 휴대폰 번호와 이메일을 입력하시면,<br/>이메일로 임시 비밀번호를 전송해 드립니다.
                                </p>
                            </div>
                            <div data-v-6c561060=""
                                 className={hpError ? "input_box has_error" : "input_box"}>
                                <h3 data-v-6c561060="" className="input_title">휴대폰 번호</h3>
                                <div data-v-6c561060="" className="input_item">
                                    <input data-v-6c561060="" type="text" placeholder="예) 010-4154-8185"
                                           autoComplete="off"
                                           className="input_txt" ref={hpRef} maxLength="13"
                                           onChange={() => {
                                               let hp = hpRef.current.value;
                                               let exphp = /^(01[016789]{1})-[0-9]{3,4}-[0-9]{4}$/;
                                               if (!exphp.test(hp)) {
                                                   setHpError(true);
                                               } else {
                                                   setHpError(false);
                                                   if (emailRef.current.value !== "" && !emailError) {
                                                       setEmailSendBtn(false);
                                                   }
                                               }
                                           }}/>
                                </div>
                                <p data-v-6c561060="" className="input_error">휴대폰 번호를 정확히 입력해주세요.</p>
                            </div>
                            <div data-v-6c561060=""
                                 className={emailError ? "input_box has_error" : "input_box"}>
                                <h3 data-v-6c561060="" className="input_title">이메일 주소</h3>
                                <div data-v-6c561060="" className="input_item">
                                    <input data-v-6c561060="" type="text" placeholder="예) ostschloss@gmail.com"
                                           autoComplete="off" className="input_txt" ref={emailRef}
                                           onChange={() => {
                                               let email = emailRef.current.value;
                                               let exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
                                               if (exptext.test(email) === false) {
                                                   setEmailError(true);
                                                   setEmailSendBtn(true);
                                               } else {
                                                   setEmailError(false);
                                                   if (hpRef.current.value !== "" && !hpError) {
                                                       setEmailSendBtn(false);
                                                   }
                                               }
                                           }}/>
                                </div>
                                <p data-v-6c561060="" className="input_error">이메일 주소를 정확히 입력해주세요.</p>
                            </div>
                            <div className="help_btn_box">
                                <button data-v-6e799857="" type="button"
                                        disabled={emailSendBtn ? true : false}
                                        className="btn full solid"
                                        onClick={emailSend}>
                                    이메일 발송하기
                                </button>
                            </div>
                        </div>
                        :
                        <div>
                            <h2 className="blind">비밀번호 전송</h2>
                            <div className="temporary_notice">
                                <p className="notice_txt">비밀번호를 전송하였습니다.<br/>전송 받은 비밀번호로 로그인 후 변경 해주세요.</p>
                            </div>
                            <div className="temporary_btn_box">
                                <Link data-v-6e799857="" to="/user/login" style={{lineHeight: "40px"}}
                                      className="btn nuxt-link-active solid large"> 로그인 </Link>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
}

export default FindPass;