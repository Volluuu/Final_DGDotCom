import React, {useState} from 'react';
import {Link} from "react-router-dom";

function FindPass(props) {
    const [emailSended, setEmailSended] = useState(false);

    return (
        <div data-v-3007c576="" className="container help">
            <div className="content lg">
                <div className="help_area">
                    {!emailSended ?
                        <div>
                            <h2 className="help_title">비밀번호 찾기</h2>
                            <div className="help_notice">
                                <p className="notice_txt"> 가입 시 등록하신 휴대폰 번호와 이메일을 입력하시면,<br/>휴대폰으로 임시 비밀번호를 전송해 드립니다.
                                </p>
                            </div>
                            <div data-v-6c561060="" className="input_box">
                                <h3 data-v-6c561060="" className="input_title">휴대폰 번호</h3>
                                <div data-v-6c561060="" className="input_item">
                                    <input data-v-6c561060="" type="text" placeholder="가입하신 휴대폰 번호" autoComplete="off"
                                           className="input_txt"/>
                                </div>
                                <p data-v-6c561060="" className="input_error">휴대폰 번호를 정확히 입력해주세요.</p>
                            </div>
                            <div data-v-6c561060="" className="input_box">
                                <h3 data-v-6c561060="" className="input_title">이메일 주소</h3>
                                <div data-v-6c561060="" className="input_item">
                                    <input data-v-6c561060="" type="text" placeholder="예) kream@kream.co.kr"
                                           autoComplete="off" className="input_txt"/>
                                </div>
                                <p data-v-6c561060="" className="input_error">이메일 주소를 정확히 입력해주세요.</p>
                            </div>
                            <div className="help_btn_box">
                                <Link data-v-6e799857="" disabled="disabled" to="#!"
                                      className="btn full solid disabled">
                                    문자 발송하기
                                </Link>
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