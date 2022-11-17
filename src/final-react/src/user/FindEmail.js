import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function FindEmail(props) {
    const [finded, setFinded] = useState(false);
    const hpRef = useRef('');
    const [hpError, setHpError] = useState(false); // true면 에러가 있는거, false면 에러가 없는 거
    const [emailFindBtn, setEmailFindBtn] = useState(true); // 유효한 이메일이면 false
    const [email, setEmail] = useState('');

    // 핸드폰 번호로 이메일 찾기
    const findEmail = () => {
        let hp = hpRef.current.value;
        let findEmailUrl = process.env.REACT_APP_URL + "/user/findemail?hp=" + hp;
        axios.get(findEmailUrl)
            .then(res => {
                console.dir(res.data);
                if (res.data !== "") {
                    setEmail(res.data);
                    setFinded(true);
                    Swal.fire({
                        icon: "info",
                        text: "일치하는 사용자 정보를 찾았습니다."
                    })
                } else {
                    hpRef.current.value = "";
                    setEmailFindBtn(true);
                    Swal.fire({
                        icon: "warning",
                        text: "일치하는 사용자 정보를 찾을 수 없습니다."
                    }).then(res => {
                        hpRef.current.focus();
                    })
                }
            })
    }
    return (
        <div data-v-3007c576="" className="container help">
            <div className="content lg">
                <div className="help_area">
                    {!finded ?
                        <div>
                            <h2 className="help_title">이메일 아이디 찾기</h2>
                            <div className="help_notice">
                                <p className="notice_txt"> 가입 시 등록한 휴대폰 번호를 입력하면<br/> 이메일 주소의 일부를 알려드립니다.</p>
                            </div>
                            <div data-v-6c561060="" className="input_box">
                                <h3 data-v-6c561060="" className="input_title">휴대폰 번호 (&nbsp;<span
                                    style={{fontSize: "1.3em"}}>-</span>&nbsp;포함)
                                </h3>
                                <div data-v-6c561060="" className="input_item">
                                    <input data-v-6c561060="" type="text" placeholder="예) 010-4154-8185"
                                           autoComplete="off" ref={hpRef}
                                           className="input_txt"
                                           onKeyUp={(e) => {
                                               let hp = hpRef.current.value;
                                               let exphp = /^(01[016789]{1})-[0-9]{3,4}-[0-9]{4}$/;
                                               if (!exphp.test(hp)) {
                                                   setHpError(true);
                                                   setEmailFindBtn(true);
                                               } else {
                                                   setHpError(false);
                                                   setEmailFindBtn(false);
                                                   if (e.keyCode === 13) {
                                                       findEmail();
                                                   }
                                               }
                                           }}/>
                                </div>
                            </div>
                            <div className="help_btn_box">
                                <button data-v-6e799857="" disabled={emailFindBtn ? true : false}
                                        type="button" className="btn full solid"
                                        onClick={findEmail}>
                                    이메일 아이디 찾기
                                </button>
                            </div>
                        </div> : <div>
                            <h2 className="help_title success">
                                <span>이메일 주소 찾기에</span> <span>성공하였습니다.</span>
                            </h2>
                            <div className="success_notice">
                                <dl>
                                    <dt className="notice_title">이메일 주소</dt>
                                    <dd className="notice_txt">
                                        {
                                            email &&
                                            email.charAt(0) + // 첫 번째 글자 출력
                                            "*".repeat((email.split("@")[0].length) - 2) + // 마지막 글자 제외하고 * 출력
                                            email.charAt(email.indexOf("@") - 1) + // 마지막 글자 출력
                                            "@" +
                                            email.split("@")[1] // @ 뒤 주소 출력
                                        }
                                    </dd>
                                </dl>
                            </div>
                            <div className="success_btn_box">
                                <Link data-v-6e799857="" to="/user/find_password" className="btn outline large"
                                      style={{lineHeight: "40px"}}>
                                    비밀번호 찾기
                                </Link>
                                <Link data-v-6e799857="" to="/user/login" className="btn nuxt-link-active solid large"
                                      style={{lineHeight: "40px"}}>
                                    로그인
                                </Link>
                            </div>
                        </div>}
                </div>
            </div>

        </div>
    );
}

export default FindEmail;