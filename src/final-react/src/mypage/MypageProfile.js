import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

function MypageProfile(props) {
    const [u_num, setU_num] = useState(sessionStorage.u_num); // 세션의 u_num으로 초기값 설정
    const [userDto, setUserDto] = useState(''); // 세션의 u_num으로 받아온 유저 데이터
    const [emailUpdate, setEmailUpdate]=useState("none");
    const userByNum = () => {
        let userByNumUrl = process.env.REACT_APP_URL + "/mypage/userbynum?u_num=" + u_num;
        axios.get(userByNumUrl)
            .then(res => {
                setUserDto(res.data);
            })
    }

    useEffect(() => {
        userByNum();
    }, [userDto])

    return (
        <div data-v-587be1b3="" data-v-39b2348a="" className="content_area">
            <div data-v-587be1b3="" className="my_profile">
                <div data-v-88eb18f6="" className="title">
                    <h3 data-v-88eb18f6="">
                        <b>프로필 정보</b>
                    </h3>
                </div>
                <div data-v-6dea036d="" data-v-587be1b3="" className="user_profile">
                    <div data-v-6dea036d="" className="profile_thumb">
                        <img data-v-6dea036d=""
                             src="https://kream-phinf.pstatic.net/MjAyMjExMDhfOSAg/MDAxNjY3ODc2MTAyMzgz.BT0jn7UXH7k600dgkczo_x_l9IBu93cz-OOVjsrwzEQg.hBpb4a21Swhk6BqPbJOfAUrc5UZ8V3t37vazXgiPOG8g.PNG/p_3e240138bd144a8a955371d751af02fb.PNG?type=m"
                             alt="사용자 이미지" className="thumb_img"/>
                    </div>
                    <div data-v-6dea036d="" className="profile_detail">
                        <strong data-v-6dea036d="" className="name">
                            {userDto.u_name}
                        </strong>
                        <div data-v-6dea036d="" className="profile_btn_box">
                            <Link data-v-3d1bcc82="" data-v-6dea036d="" to="#!" className="btn outlinegrey small">
                                이미지 변경
                            </Link>
                            <Link data-v-3d1bcc82="" data-v-6dea036d="" to="#!" className="btn outlinegrey small">
                                삭제
                            </Link>
                        </div>
                    </div>
                </div>
                <input data-v-587be1b3="" type="file" accept="image/jpeg,image/png" hidden="hidden"/>
                <canvas data-v-587be1b3="" style={{display: "none", width: "1000", height: "1000"}}></canvas>
                <div data-v-587be1b3="" className="profile_info">
                    <div data-v-587be1b3="" className="profile_group">
                        <h4 data-v-587be1b3="" className="group_title">로그인 정보</h4>
                        <div data-v-587be1b3="" className="unit" style={{display: "none"}}>
                            <h5 data-v-587be1b3="" className="title">
                                이메일 주소
                            </h5>
                            <p data-v-587be1b3="" className="desc email">
                                {
                                    userDto.email &&
                                    userDto.email.charAt(0) + // 첫 번째 글자 출력
                                    "*".repeat((userDto.email.split("@")[0].length) - 2) + // 마지막 글자 제외하고 * 출력
                                    userDto.email.charAt(userDto.email.indexOf("@") - 1) + // 마지막 글자 출력
                                    "@" +
                                    userDto.email.split("@")[1] // @ 뒤 주소 출력
                                }
                            </p>
                            <button data-v-3d1bcc82="" data-v-587be1b3="" type="button"
                                    className="btn btn_modify outlinegrey small"> 변경
                            </button>
                        </div>
                        <div data-v-587be1b3="" className="modify">
                            <div data-v-6c561060="" data-v-587be1b3="" className="input_box">
                                <h6 data-v-587be1b3="" data-v-6c561060="" className="input_title">
                                    이메일 주소 변경
                                </h6>
                                <div data-v-6c561060="" className="input_item">
                                    <input data-v-6c561060="" type="email" autoComplete="off"
                                           className="input_txt" placeholder={
                                        userDto.email &&
                                        userDto.email.charAt(0) + // 첫 번째 글자 출력
                                        "*".repeat((userDto.email.split("@")[0].length) - 2) + // 마지막 글자 제외하고 * 출력
                                        userDto.email.charAt(userDto.email.indexOf("@") - 1) + // 마지막 글자 출력
                                        "@" +
                                        userDto.email.split("@")[1] // @ 뒤 주소 출력
                                    }/>
                                </div>
                                <p data-v-587be1b3="" data-v-6c561060="" className="input_error"></p>
                            </div>
                            <div data-v-587be1b3="" className="modify_btn_box">
                                <button data-v-3d1bcc82="" data-v-587be1b3="" type="button"
                                        className="btn outlinegrey medium" slot="button"> 취소
                                </button>
                                <button data-v-3d1bcc82="" data-v-587be1b3="" disabled="disabled" type="button"
                                        className="btn solid medium disabled" slot="button"> 인증 메일 발송
                                </button>
                            </div>
                        </div>
                        <div data-v-587be1b3="" className="unit" style={{display: "none"}}>
                            <h5 data-v-587be1b3="" className="title">비밀번호</h5>
                            <p data-v-587be1b3="" className="desc password">●●●●●●●●●</p>
                            <button data-v-3d1bcc82="" data-v-587be1b3="" type="button"
                                    className="btn btn_modify outlinegrey small"> 변경
                            </button>
                        </div>
                        <div data-v-587be1b3="" className="modify">
                            <h5 data-v-587be1b3="" className="title">비밀번호 변경</h5>
                            <div data-v-6c561060="" data-v-587be1b3="" className="input_box">
                                <h6 data-v-587be1b3="" data-v-6c561060="" className="input_title">
                                    이전 비밀번호
                                </h6>
                                <div data-v-6c561060="" className="input_item">
                                    <input data-v-6c561060="" type="password" autoComplete="off"
                                           className="input_txt" placeholder="영문, 숫자, 특수문자 조합 8-16자"/>
                                </div>
                                <p data-v-587be1b3="" data-v-6c561060="" className="input_error">
                                    영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)
                                </p>
                            </div>
                            <div data-v-6c561060="" data-v-587be1b3="" className="input_box">
                                <h6 data-v-587be1b3="" data-v-6c561060="" className="input_title">
                                    새 비밀번호
                                </h6>
                                <div data-v-6c561060="" className="input_item">
                                    <input data-v-6c561060="" type="password" autoComplete="off"
                                           className="input_txt" placeholder="영문, 숫자, 특수문자 조합 8-16자"/>
                                </div>
                                <p data-v-587be1b3="" data-v-6c561060="" className="input_error">
                                    영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)
                                </p>
                            </div>
                            <div data-v-587be1b3="" className="modify_btn_box">
                                <button data-v-3d1bcc82="" data-v-587be1b3="" type="button"
                                        className="btn outlinegrey medium" slot="button"> 취소
                                </button>
                                <button data-v-3d1bcc82="" data-v-587be1b3="" disabled="disabled" type="button"
                                        className="btn solid medium disabled" slot="button"> 저장
                                </button>
                            </div>
                        </div>
                    </div>
                    <div data-v-587be1b3="" className="profile_group">
                        <h4 data-v-587be1b3="" className="group_title">개인 정보</h4>
                        <div data-v-587be1b3="" className="unit"><h5 data-v-587be1b3="" className="title">이름</h5>
                            <p data-v-587be1b3="" className="desc">ostschloss</p>
                            <button data-v-3d1bcc82="" data-v-587be1b3="" type="button"
                                    className="btn btn_modify outlinegrey small"> 변경
                            </button>
                        </div>
                        <div data-v-587be1b3="" className="modify name" style={{display: "none"}}><h5
                            data-v-587be1b3="" className="title">이름</h5>
                            <div data-v-6c561060="" data-v-587be1b3="" className="input_box">
                                <h6 data-v-587be1b3="" data-v-6c561060="" className="input_title">
                                    새로운 이름
                                </h6>
                                <div data-v-6c561060="" className="input_item">
                                    <input data-v-6c561060="" type="text" autoComplete="off"
                                           className="input_txt" placeholder="고객님의 이름"/>
                                </div>
                                <p data-v-587be1b3="" data-v-6c561060="" className="input_error">
                                    올바른 이름을 입력해주세요. (2-50자)
                                </p>
                            </div>
                            <div data-v-587be1b3="" className="modify_btn_box">
                                <button data-v-3d1bcc82="" data-v-587be1b3="" type="button"
                                        className="btn outlinegrey medium" slot="button"> 취소
                                </button>
                                <button data-v-3d1bcc82="" data-v-587be1b3="" disabled="disabled" type="button"
                                        className="btn solid medium disabled" slot="button"> 저장
                                </button>
                            </div>
                        </div>
                        <div data-v-587be1b3="" className="unit">
                            <h5 data-v-587be1b3="" className="title">
                                휴대폰 번호
                            </h5>
                            <p data-v-587be1b3="" className="desc">010-4***-*185</p>
                            <button data-v-3d1bcc82="" data-v-587be1b3="" type="button"
                                    className="btn btn_modify outlinegrey small"> 변경
                            </button>
                        </div>
                        <div data-v-587be1b3="" className="unit">
                            <h5 data-v-587be1b3="" className="title">신발 사이즈</h5>
                            <p data-v-587be1b3="" className="desc">285</p>
                            <button data-v-3d1bcc82="" data-v-587be1b3="" type="button"
                                    className="btn btn_modify outlinegrey small"> 변경
                            </button>
                        </div>
                        <div data-v-1f7c6d3f="" data-v-feb03f9c="" data-v-587be1b3="" className="layer lg"
                             style={{display: "none"}}>
                            <div data-v-1f7c6d3f="" className="layer_container">
                                <div data-v-1f7c6d3f="" className="layer_header">
                                    <h2 data-v-feb03f9c="" data-v-1f7c6d3f="" className="title">사이즈 선택</h2>
                                </div>
                                <div data-v-1f7c6d3f="" className="layer_content">
                                    <div data-v-feb03f9c="" data-v-1f7c6d3f="" className="size_list_area">
                                        <div data-v-1b874462="" data-v-feb03f9c="" className="size_item"
                                             data-v-1f7c6d3f="">
                                            <Link data-v-3d1bcc82="" data-v-1b874462="" to="#!"
                                                  className="btn outlinegrey medium">
                                                <span data-v-1b874462="" className="info_txt">230</span>
                                            </Link>
                                        </div>
                                        <div data-v-1b874462="" data-v-feb03f9c="" className="size_item"
                                             data-v-1f7c6d3f="">
                                            <Link data-v-3d1bcc82="" data-v-1b874462="" to="#!"
                                                  className="btn outlinegrey medium">
                                                <span data-v-1b874462="" className="info_txt">240</span>
                                            </Link>
                                        </div>
                                        <div data-v-1b874462="" data-v-feb03f9c="" className="size_item"
                                             data-v-1f7c6d3f="">
                                            <Link data-v-3d1bcc82="" data-v-1b874462="" to="#!"
                                                  className="btn outlinegrey medium">
                                                <span data-v-1b874462="" className="info_txt">250</span>
                                            </Link>
                                        </div>
                                        <div data-v-1b874462="" data-v-feb03f9c="" className="size_item"
                                             data-v-1f7c6d3f="">
                                            <Link data-v-3d1bcc82="" data-v-1b874462="" to="#!"
                                                  className="btn outlinegrey medium">
                                                <span data-v-1b874462="" className="info_txt">260</span>
                                            </Link>
                                        </div>
                                        <div data-v-1b874462="" data-v-feb03f9c="" className="size_item"
                                             data-v-1f7c6d3f="">
                                            <Link data-v-3d1bcc82="" data-v-1b874462="" to="#!"
                                                  className="btn outlinegrey medium">
                                                <span data-v-1b874462="" className="info_txt">270</span>
                                            </Link>
                                        </div>
                                        <div data-v-1b874462="" data-v-feb03f9c="" className="size_item"
                                             data-v-1f7c6d3f="">
                                            <Link data-v-3d1bcc82="" data-v-1b874462="" to="#!"
                                                  className="btn outlinegrey medium">
                                                <span data-v-1b874462="" className="info_txt">280</span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div data-v-feb03f9c="" data-v-1f7c6d3f="" className="layer_btn">
                                        <Link data-v-3d1bcc82="" data-v-feb03f9c="" to="#!" className="btn solid medium"
                                              data-v-1f7c6d3f=""> 확인 </Link>
                                    </div>
                                </div>
                                {/*<a data-v-feb03f9c="" data-v-1f7c6d3f="" className="btn_layer_close">*/}
                                {/*    <svg data-v-feb03f9c="" data-v-1f7c6d3f="" xmlns="http://www.w3.org/2000/svg"*/}
                                {/*         className="ico-close icon sprite-icons">*/}
                                {/*        <use data-v-feb03f9c="" data-v-1f7c6d3f=""*/}
                                {/*             href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-ico-close"></use>*/}
                                {/*    </svg>*/}
                                {/*</a>*/}
                            </div>
                        </div>
                    </div>
                    <div data-v-587be1b3="" className="profile_group">
                        <h4 data-v-587be1b3="" className="group_title">광고성 정보 수신</h4>
                        <div data-v-587be1b3="" className="unit to_receive">
                            <p data-v-587be1b3="" className="desc">문자 메시지</p>
                            <div data-v-587be1b3="" className="radio_txt_box">
                                <div data-v-42808438="" data-v-587be1b3="" className="radio_item">
                                    <input data-v-42808438="" id="agree1" type="radio" name="message_radio"
                                           className="radio_input"/>
                                    <label data-v-42808438="" htmlFor="agree1" className="radio_label">
                                        <svg data-v-42808438="" xmlns="http://www.w3.org/2000/svg"
                                             className="ico-radio-inactive icon sprite-icons">
                                            <use data-v-42808438=""
                                                 href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-ico-radio-inactive"></use>
                                        </svg>
                                        <span data-v-42808438="" className="label_txt">수신 동의</span>
                                    </label>
                                </div>
                                <div data-v-42808438="" data-v-587be1b3="" className="radio_item">
                                    <input data-v-42808438="" id="disagree1" type="radio" name="message_radio"
                                           className="radio_input"/>
                                    <label data-v-42808438="" htmlFor="disagree1" className="radio_label">
                                        <svg data-v-42808438="" xmlns="http://www.w3.org/2000/svg"
                                             className="ico-radio-inactive icon sprite-icons">
                                            <use data-v-42808438=""
                                                 href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-ico-radio-inactive"></use>
                                        </svg>
                                        <span data-v-42808438="" className="label_txt">수신거부</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div data-v-587be1b3="" className="unit to_receive">
                            <p data-v-587be1b3="" className="desc">이메일</p>
                            <div data-v-587be1b3="" className="radio_txt_box">
                                <div data-v-42808438="" data-v-587be1b3="" className="radio_item">
                                    <input data-v-42808438="" id="agree2" type="radio" name="email_radio"
                                           className="radio_input"/>
                                    <label data-v-42808438="" htmlFor="agree2" className="radio_label">
                                        <svg data-v-42808438="" xmlns="http://www.w3.org/2000/svg"
                                             className="ico-radio-inactive icon sprite-icons">
                                            <use data-v-42808438=""
                                                 href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-ico-radio-inactive"></use>
                                        </svg>
                                        <span data-v-42808438="" className="label_txt">수신 동의</span>
                                    </label>
                                </div>
                                <div data-v-42808438="" data-v-587be1b3="" className="radio_item">
                                    <input data-v-42808438="" id="disagree2" type="radio" name="email_radio"
                                           className="radio_input"/>
                                    <label data-v-42808438="" htmlFor="disagree2" className="radio_label">
                                        <svg data-v-42808438="" xmlns="http://www.w3.org/2000/svg"
                                             className="ico-radio-inactive icon sprite-icons">
                                            <use data-v-42808438=""
                                                 href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-ico-radio-inactive"></use>
                                        </svg>
                                        <span data-v-42808438="" className="label_txt">수신거부</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link data-v-587be1b3="" to="/my/withdrawal" className="btn_withdrawal">회원 탈퇴</Link>
                </div>
            </div>
        </div>
    );
}

export default MypageProfile;