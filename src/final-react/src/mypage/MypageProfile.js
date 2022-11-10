import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

function MypageProfile(props) {
    const [u_num, setU_num] = useState(sessionStorage.u_num); // 세션의 u_num으로 초기값 설정
    const [userDto, setUserDto] = useState(''); // 세션의 u_num으로 받아온 유저 데이터
    const [emailModify, setEmailModify] = useState(false);
    const [emailError, setEmailError] = useState(false); // true면 에러가 있는거, false면 에러가 없는 거
    const [passModify, setPassModify] = useState(false);
    const [nameModify, setNameModify] = useState(false);
    const emailRef = useRef("");

    // 이메일 유효성 검사는 state로 해야할 듯
    const [emailState, setEmailState] = useState('');
    // 값 받아올 때 Ref 쓰기

    const userByNum = () => {
        let userByNumUrl = process.env.REACT_APP_URL + "/mypage/userbynum?u_num=" + u_num;
        axios.get(userByNumUrl)
            .then(res => {
                setUserDto(res.data);
            })
    }

    useEffect(() => {
        userByNum(); // window.location.reload() 할까?
    }, [userDto])


    return (
        <div data-v-587be1b3="" data-v-39b2348a="" className="content_area">
            <div data-v-587be1b3="" className="my_profile">
                <div data-v-88eb18f6="" data-v-587be1b3="" className="content_title border">
                    <div data-v-88eb18f6="" className="title">
                        <h3 data-v-88eb18f6="">프로필 정보</h3>
                    </div>
                </div>
                <div data-v-6dea036d="" data-v-587be1b3="" className="user_profile">
                    <div data-v-6dea036d="" className="profile_thumb">
                        <img data-v-6dea036d="" alt="사용자 이미지" className="thumb_img"
                             src="https://kream-phinf.pstatic.net/MjAyMjExMDhfOSAg/MDAxNjY3ODc2MTAyMzgz.BT0jn7UXH7k600dgkczo_x_l9IBu93cz-OOVjsrwzEQg.hBpb4a21Swhk6BqPbJOfAUrc5UZ8V3t37vazXgiPOG8g.PNG/p_3e240138bd144a8a955371d751af02fb.PNG?type=m"/>
                    </div>
                    <div data-v-6dea036d="" className="profile_detail">
                        <strong data-v-6dea036d="" className="name">{userDto.u_name}</strong>
                        <div data-v-6dea036d="" className="profile_btn_box">
                            <Link data-v-3d1bcc82="" data-v-6dea036d="" to="#!" className="btn outlinegrey small">
                                이미지 변경
                            </Link>
                            <Link data-v-3d1bcc82="" data-v-6dea036d="" to="#!"
                                  className="btn outlinegrey small"> 이미지 삭제 </Link></div>
                    </div>
                </div>
                <input data-v-587be1b3="" type="file" accept="image/jpeg,image/png" hidden="hidden"/>
                {/*<canvas data-v-587be1b3="" style={{display: "none"}} width="1000" height="1000"></canvas>*/}
                <div data-v-587be1b3="" className="profile_info">
                    <div data-v-587be1b3="" className="profile_group">
                        <h4 data-v-587be1b3="" className="group_title">로그인 정보</h4>
                        <div data-v-587be1b3="" className="unit" style={{display: emailModify ? "none" : ""}}>
                            <h5 data-v-587be1b3="" className="title">이메일 주소</h5>
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
                                    className="btn btn_modify outlinegrey small"
                                    onClick={() => {
                                        setEmailModify(!emailModify);
                                    }}> 변경
                            </button>
                        </div>
                        <div data-v-587be1b3="" className="modify" style={{display: !emailModify ? "none" : ""}}>
                            <div data-v-6c561060="" data-v-587be1b3=""
                                 className={emailError ? "input_box has_error" : "input_box"}>
                                <h6 data-v-587be1b3="" data-v-6c561060="" className="input_title">
                                    이메일 주소 변경
                                </h6>
                                <div data-v-6c561060="" className="input_item">
                                    <input data-v-6c561060="" type="email" autoComplete="off" ref={emailRef}
                                           className="input_txt" placeholder=
                                               {
                                                   userDto.email &&
                                                   userDto.email.charAt(0) + // 첫 번째 글자 출력
                                                   "*".repeat((userDto.email.split("@")[0].length) - 2) + // 마지막 글자 제외하고 * 출력
                                                   userDto.email.charAt(userDto.email.indexOf("@") - 1) + // 마지막 글자 출력
                                                   "@" +
                                                   userDto.email.split("@")[1] // @ 뒤 주소 출력
                                               }
                                           onChange={(e) => {
                                               let exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
                                               if (exptext.test(emailRef.current.value) === false) {
                                                   setEmailError(true);
                                               } else {
                                                   setEmailError(false);
                                               }
                                           }}/>
                                </div>
                                <p data-v-587be1b3="" data-v-6c561060="" className="input_error">이메일 주소를 정확히 입력해주세요.</p>
                            </div>
                            <div data-v-587be1b3="" className="modify_btn_box">
                                <button data-v-3d1bcc82="" data-v-587be1b3="" type="button"
                                        className="btn outlinegrey medium" slot="button"
                                        onClick={() => {
                                            setEmailModify(!emailModify);
                                            setEmailError(false);
                                            emailRef.current.value = "";
                                        }}> 취소
                                </button>
                                <button data-v-3d1bcc82="" data-v-587be1b3="" disabled="" type="button"
                                    // className={emailError?(emailRef!==""?"btn solid medium":"btn solid medium disabled"):(emailRef===""?"btn solid medium disabled":"btn solid medium disabled")} slot="button"> 인증 메일 발송
                                        className={!emailError && emailRef.current.value !== "" ? "btn solid medium" : "btn solid medium disabled"}
                                        slot="button"> 인증 메일 발송
                                </button>
                            </div>
                        </div>
                        <div data-v-587be1b3="" className="unit" style={{display: passModify ? "none" : ""}}>
                            <h5 data-v-587be1b3="" className="title">비밀번호</h5>
                            <p data-v-587be1b3="" className="desc password">●●●●●●●●●</p>
                            <button data-v-3d1bcc82="" data-v-587be1b3="" type="button"
                                    className="btn btn_modify outlinegrey small"
                                    onClick={() => {
                                        setPassModify(!passModify);
                                    }}> 변경
                            </button>
                        </div>
                        <div data-v-587be1b3="" className="modify" style={{display: !passModify ? "none" : ""}}>
                            <h5 data-v-587be1b3="" className="title">비밀번호 변경</h5>
                            <div data-v-6c561060="" data-v-587be1b3="" className="input_box">
                                <h6 data-v-587be1b3="" data-v-6c561060="" className="input_title">이전 비밀번호</h6>
                                <div data-v-6c561060="" className="input_item">
                                    <input data-v-6c561060="" type="password" placeholder="영문, 숫자, 특수문자 조합 8-16자"
                                           autoComplete="off" className="input_txt"/>
                                </div>
                                <p data-v-587be1b3="" data-v-6c561060="" className="input_error">
                                    영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)
                                </p>
                            </div>
                            <div data-v-6c561060="" data-v-587be1b3="" className="input_box">
                                <h6 data-v-587be1b3="" data-v-6c561060="" className="input_title">새 비밀번호</h6>
                                <div data-v-6c561060="" className="input_item">
                                    <input data-v-6c561060="" type="password" placeholder="영문, 숫자, 특수문자 조합 8-16자"
                                           autoComplete="off" className="input_txt"/>
                                </div>
                                <p data-v-587be1b3="" data-v-6c561060="" className="input_error">
                                    영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)
                                </p>
                            </div>
                            <div data-v-587be1b3="" className="modify_btn_box">
                                <button data-v-3d1bcc82="" data-v-587be1b3="" type="button"
                                        className="btn outlinegrey medium" slot="button"
                                        onClick={() => {
                                            setPassModify(!passModify);
                                        }}> 취소
                                </button>
                                <button data-v-3d1bcc82="" data-v-587be1b3="" disabled="disabled" type="button"
                                        className="btn solid medium disabled" slot="button"> 저장
                                </button>
                            </div>
                        </div>
                    </div>
                    <div data-v-587be1b3="" className="profile_group">
                        <h4 data-v-587be1b3="" className="group_title">개인 정보</h4>
                        <div data-v-587be1b3="" className="unit" style={{display: nameModify ? "none" : ""}}>
                            <h5 data-v-587be1b3="" className="title">이름</h5>
                            <p data-v-587be1b3="" className="desc">{userDto.u_name}</p>
                            <button data-v-3d1bcc82="" data-v-587be1b3="" type="button"
                                    className="btn btn_modify outlinegrey small"
                                    onClick={() => {
                                        setNameModify(!nameModify);
                                    }}> 변경
                            </button>
                        </div>
                        <div data-v-587be1b3="" className="modify name" style={{display: !nameModify ? "none" : ""}}>
                            <h5 data-v-587be1b3="" className="title">이름</h5>
                            <div data-v-6c561060="" data-v-587be1b3="" className="input_box">
                                <h6 data-v-587be1b3="" data-v-6c561060="" className="input_title">
                                    새로운 이름
                                </h6>
                                <div data-v-6c561060="" className="input_item">
                                    <input data-v-6c561060="" type="text" placeholder={userDto.u_name}
                                           autoComplete="off"
                                           className="input_txt"/>
                                </div>
                                <p data-v-587be1b3="" data-v-6c561060="" className="input_error">
                                    올바른 이름을 입력해주세요. (2-50자)
                                </p>
                            </div>
                            <div data-v-587be1b3="" className="modify_btn_box">
                                <button data-v-3d1bcc82="" data-v-587be1b3="" type="button"
                                        className="btn outlinegrey medium" slot="button"
                                        onClick={() => {
                                            setNameModify(!nameModify);
                                        }}> 취소
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
                            <p data-v-587be1b3="" className="desc">
                                {userDto.hp && userDto.hp.substring(0, 5) + "***-*" + userDto.hp.substring(10)}
                            </p>
                            {/* 휴대폰 번호 인증 API 구현 */}
                            <button data-v-3d1bcc82="" data-v-587be1b3="" type="button"
                                    className="btn btn_modify outlinegrey small"> 변경
                            </button>
                        </div>
                        <div data-v-587be1b3="" className="unit">
                            <h5 data-v-587be1b3="" className="title">성별</h5>
                            <p data-v-587be1b3="" className="desc">{userDto.gender === "M" ? "남성" : "여성"}</p>
                        </div>
                    </div>
                    <Link data-v-587be1b3="" to="/my/withdrawal" className="btn_withdrawal">회원 탈퇴</Link></div>
            </div>
        </div>
    );
}

export default MypageProfile;