import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {Close} from "@mui/icons-material";
import {useDaumPostcodePopup} from "react-daum-postcode";
import {postcodeScriptUrl} from "react-daum-postcode/lib/loadPostcode";
import F from "./picture/F.png";
import M from "./picture/M.png";
import N from "./picture/N.png";
import K from "./picture/K.png";

function MypageProfile(props) {
    const [u_num, setU_num] = useState(sessionStorage.u_num); // 세션의 u_num으로 초기값 설정
    const [userDto, setUserDto] = useState(''); // 세션의 u_num으로 받아온 유저 데이터
    const [emailModify, setEmailModify] = useState(false);
    const [emailError, setEmailError] = useState(false); // true면 에러가 있는거, false면 에러가 없는 거
    const [emailErrorMsg, setEmailErrorMsg] = useState("이메일 주소를 정확히 입력해주세요.");
    const [emailSendBtn, setEmailSendBtn] = useState(true); // 유효한 이메일이면 false
    const [sendedCode, setSendedCode] = useState('');
    const [emailCodeModal, setEmailCodeModal] = useState('none');   // 이메일 인증번호 모달 창
    const emailCodeRef = useRef('');
    const [emailCheckMsg, setEmailCheckMsg] = useState('no'); // 이메일 인증 확인 됐을 때 yes
    const [emailInput, setEmailInput] = useState(false); // 이메일 인증이 완료되면 email input disable
    const prePassRef = useRef('');
    const postPassRef = useRef('');
    const [prePassError, setPrePassError] = useState(false); // true면 에러가 있는거, false면 에러가 없는 거
    const [postPassError, setPostPassError] = useState(false); // true면 에러가 있는거, false면 에러가 없는 거
    const [passModify, setPassModify] = useState(false);
    const [passModifyBtn, setPassModifyBtn] = useState(true); // 유효한 이메일이면 false
    const [nameModify, setNameModify] = useState(false);
    const nameRef = useRef('');
    const [nameError, setNameError] = useState(false); // true면 에러가 있는거, false면 에러가 없는 거
    const [nameModifyBtn, setNameModifyBtn] = useState(true);

    const hpRef = useRef('');
    const [hpModify, setHpModify] = useState(false);
    const [hpError, setHpError] = useState(false); // true면 에러가 있는거, false면 에러가 없는 거
    const [hpErrorMsg, setHpErrorMsg] = useState("유효하지 않는 번호 입니다. (\"-\"를 포함하여 입력해주세요)");
    const [hpModifyBtn, setHpModifyBtn] = useState(true);

    const fullAddrRef = useRef();
    const addrRef = useRef('');
    const extraAddressRef = useRef('');
    const [addrModify, setAddrModify] = useState(false);
    const [addrModifyBtn, setAddrModifyBtn] = useState(true);
    const emailRef = useRef("");
    const navi = useNavigate();

    // 이메일 유효성 검사는 state로 해야할 듯
    const [emailState, setEmailState] = useState('');
    // 값 받아올 때 Ref 쓰기

    const userByNum = () => {
        let userByNumUrl = process.env.REACT_APP_URL + "/mypage/userbynum?u_num=" + u_num;
        axios.get(userByNumUrl,
            {
                headers: {Authorization: `Bearer ${localStorage.accessToken}`}
            })
            .then(res => {
                setUserDto(res.data);
            }).catch(error => {
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            sessionStorage.removeItem("u_num");
            sessionStorage.removeItem("loginok");
            if (error.response.status === 401) {
                Swal.fire({
                    icon: "error",
                    title: "로그인 해주세요.",
                }).then(result => navi("/user/login"))
            } else if (error.response.status === 403) {
                Swal.fire({
                    icon: "warning",
                    title: "권한이 없습니다.",
                }).then(result => navi("/"))
            }
        });
    }

    useEffect(() => {
        userByNum(); // window.location.reload() 할까?
    }, [userDto])

    // 이메일 중복 체크
    const emailCheck = (email) => {
        let emailCheckUrl = process.env.REACT_APP_URL + "/user/emailcheck?email=" + email;
        axios.get(emailCheckUrl)
            .then(res => {
                if (res.data > 0) {
                    setEmailErrorMsg("이미 사용 중인 이메일 입니다");
                    setEmailError(true);
                    setEmailSendBtn(true);
                } else {
                    setEmailError(false);
                }
            })
    }

    // 이메일 인증 번호 눌렀을 때 메일 전송 이벤트
    const emailSendBtnEvent = () => {
        let email = emailRef.current.value;
        let emailSendUrl = process.env.REACT_APP_URL + "/user/mailconfirm";
        axios.post(emailSendUrl, {email})
            .then(res => {
                console.dir(res.data);
                setSendedCode(res.data);
                setEmailCodeModal("");
                emailCodeRef.current.focus();
                Swal.fire({
                    icon: "warning",
                    title: "인증번호가 발송되었습니다.",
                })
            })
    }

    // 인증코드 비교
    const emailCodeCompare = () => {
        let code = emailCodeRef.current.value;
        if (sendedCode !== code) {
            setEmailCodeModal("none");
            setSendedCode('');
            setEmailSendBtn(false);
            setEmailInput(false);
            setEmailCheckMsg("no");
            emailCodeRef.current.value = "";
            emailRef.current.focus();
            Swal.fire({
                icon: "error",
                title: "인증번호가 일치하지 않습니다.",
                text: "다시 인증해주세요.",
            })
        } else {
            setEmailCodeModal("none");
            setSendedCode('');
            setEmailSendBtn(true);
            setEmailInput(true);
            setEmailCheckMsg("yes");
            emailCodeRef.current.value = "";
            emailChange();
        }
    }

    // 이메일 변경
    const emailChange = () => {
        let emailChangeUrl = process.env.REACT_APP_URL + "/user/emailchange";
        axios.put(emailChangeUrl, {
            u_num,
            email: emailRef.current.value,
        })
            .then(res => {
                setEmailModify(!emailModify);
                setEmailError(false);
                emailRef.current.value = "";
                Swal.fire({
                    icon: "success",
                    title: "이메일이 변경되었습니다.",
                    text: `${res.data}`
                })
            })
    }

    // 이전 비밀번호 체크
    const prePassCheck = async (pass) => {
        let passCheckUrl = process.env.REACT_APP_URL + "/user/passcheck";
        await axios.post(passCheckUrl, {
            u_num,
            pass
        }).then(res => {
            console.log(res.data);
            //res.data 가 true면 이전 비밀번호랑 일치
            if (!res.data) {
                setPrePassError(true);
                setPassModifyBtn(true);
            } else {
                setPrePassError(false);
                if (prePassRef.current.value !== "" && postPassRef.current.value !== "" && !postPassError) {
                    setPassModifyBtn(false);
                } else {
                    setPassModifyBtn(true);
                }
            }

        })
    }

    // 비밀번호 변경
    const passChange = () => {
        let passChangeUrl = process.env.REACT_APP_URL + "/user/passchange";
        axios.put(passChangeUrl, {
            u_num,
            pass: postPassRef.current.value,
        })
            .then(res => {
                prePassRef.current.value = "";
                postPassRef.current.value = "";
                setPrePassError(false);
                setPostPassError(false);
                Swal.fire({
                    icon: "success",
                    title: "비밀번호가 변경되었습니다.",
                })
            })
    }

    // 이름 변경
    const nameChange = () => {
        let nameChangeUrl = process.env.REACT_APP_URL + "/user/namechange";
        axios.put(nameChangeUrl, {
            u_num,
            u_name: nameRef.current.value,
        })
            .then(res => {
                nameRef.current.value = "";
                Swal.fire({
                    icon: "success",
                    title: "이름이 변경되었습니다.",
                })
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
                    setHpModifyBtn(true);
                } else {
                    setHpError(false);
                    setHpModifyBtn(false);
                }
            })
    }

    // 휴대폰 번호 번경
    const hpChange = () => {
        let hpChangeUrl = process.env.REACT_APP_URL + "/user/hpchange";
        axios.put(hpChangeUrl, {
            u_num,
            hp: hpRef.current.value
        })
            .then(res => {
                hpRef.current.value = "";
                Swal.fire({
                    icon: "success",
                    title: "휴대폰 번호가 변경되었습니다.",
                    text: `${res.data}`
                })
            })
    }

    // 도로명 주소 API
    const open = useDaumPostcodePopup(postcodeScriptUrl);
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = "";
        if (data.addressType !== "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress += extraAddress !== "" ? `,${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? `(${extraAddress})` : "";
        }
        addrRef.current.value = fullAddress;
        setAddrModifyBtn(false);
    };
    const handleClick = () => {
        open({onComplete: handleComplete});
    };

    // 주소 변경
    const addrChange = () => {
        let addrChangeUrl = process.env.REACT_APP_URL + "/user/addrchange";
        axios.put(addrChangeUrl, {
            u_num,
            addr: (addrRef.current.value === "" ? userDto.addr.split(",")[0] : addrRef.current.value).concat(", " + extraAddressRef.current.value),
        }).then(res => {
            addrRef.current.value = "";
            extraAddressRef.current.value = "";
            Swal.fire({
                icon: "success",
                title: "주소가 변경되었습니다.",
            })
        })
    }

    //회원 탈퇴
    const withDrawal = () => {
        let withDrawalUrl = process.env.REACT_APP_URL + "/user/withdrawal?u_num=" + u_num;
        axios.delete(withDrawalUrl)
            .then(res => {
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
                sessionStorage.removeItem("u_num");
                sessionStorage.removeItem("loginok");
            })
            .then(res => {
                Swal.fire({
                    icon: "info",
                    text: "탈퇴 되었습니다."
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                })
            })

    }


    return (
        /* eslint-disable */
        <div data-v-587be1b3="" data-v-39b2348a="" className="content_area">
            <div data-v-587be1b3="" className="my_profile">
                <div data-v-88eb18f6="" data-v-587be1b3="" className="content_title">
                    <div data-v-88eb18f6="" className="title">
                        <h3 data-v-88eb18f6=""><strong>프로필 정보</strong></h3>
                    </div>
                </div>
                <div data-v-6dea036d="" data-v-587be1b3="" className="user_profile">
                    <div data-v-6dea036d="" className="profile_thumb">
                        <img data-v-6dea036d="" alt="사용자 이미지" className="thumb_img"
                             src={userDto.isadmin === "ROLE_ADMIN" ? K : userDto.gender === "M" ? M : userDto.gender === "F" ? F : N}/>
                    </div>
                    <div data-v-6dea036d="" className="profile_detail">
                        <strong data-v-6dea036d=""
                                className="name">{userDto.u_name}&nbsp;
                            <sub>{userDto.isadmin === "ROLE_ADMIN" ? "관리자" : "회원"}님</sub></strong>
                        <div data-v-6dea036d="" className="profile_btn_box">
                            {/*<Link data-v-3d1bcc82="" data-v-6dea036d="" to="#!" className="btn outlinegrey small"*/}
                            {/*      style={{pointerEvents: "none"}}>*/}
                            {/*    이미지 변경*/}
                            {/*</Link>*/}
                            {/*<Link data-v-3d1bcc82="" data-v-6dea036d="" to="#!"*/}
                            {/*      className="btn outlinegrey small"*/}
                            {/*      style={{pointerEvents: "none"}}> 이미지 삭제 </Link>*/}
                        </div>
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
                            {/*<button data-v-3d1bcc82="" data-v-587be1b3="" type="button"*/}
                            {/*        className="btn btn_modify outlinegrey small"*/}
                            {/*        onClick={() => {*/}
                            {/*            setEmailModify(!emailModify);*/}
                            {/*        }}> 변경*/}
                            {/*</button>*/}
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
                                               let email = emailRef.current.value;
                                               let exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
                                               if (exptext.test(email) === false) {
                                                   setEmailError(true);
                                                   setEmailErrorMsg("이메일 주소를 정확히 입력해주세요.");
                                                   setEmailSendBtn(true);
                                               } else {
                                                   setEmailError(false);
                                                   emailCheck(email);
                                                   setEmailSendBtn(false);
                                               }
                                           }}/>
                                </div>
                                <p data-v-587be1b3="" data-v-6c561060="" className="input_error">{emailErrorMsg}</p>
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
                                        className={!emailError && emailRef.current.value !== "" ? "btn solid medium" : "btn solid medium disabled"}
                                        slot="button"
                                        onClick={emailSendBtnEvent}> 인증 메일 발송
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
                            <div data-v-6c561060="" data-v-587be1b3=""
                                 className={prePassError ? "input_box has_error" : "input_box"}>
                                <h6 data-v-587be1b3="" data-v-6c561060="" className="input_title">이전 비밀번호</h6>
                                <div data-v-6c561060="" className="input_item">
                                    <input data-v-6c561060="" type="password" placeholder="영문, 숫자, 특수문자 조합 8-16자"
                                           autoComplete="off" className="input_txt"
                                           ref={prePassRef}
                                           onChange={() => {
                                               let prePass = prePassRef.current.value;
                                               prePassCheck(prePass);
                                           }}/>
                                </div>
                                <p data-v-587be1b3="" data-v-6c561060="" className="input_error">
                                    이전 비밀번호와 일치하지 않습니다.
                                </p>
                            </div>
                            <div data-v-6c561060="" data-v-587be1b3=""
                                 className={postPassError ? "input_box has_error" : "input_box"}>
                                <h6 data-v-587be1b3="" data-v-6c561060="" className="input_title">새 비밀번호</h6>
                                <div data-v-6c561060="" className="input_item">
                                    <input data-v-6c561060="" type="password" placeholder="영문, 숫자, 특수문자 조합 8-16자"
                                           autoComplete="off" className="input_txt"
                                           ref={postPassRef}
                                           onChange={() => {
                                               let postPass = postPassRef.current.value;
                                               let num = postPass.search(/[0-9]/g);
                                               let eng = postPass.search(/[a-z]/ig);
                                               let spe = postPass.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

                                               if (postPass.length < 8 || postPass.length > 16) {
                                                   setPostPassError(true);
                                                   setPassModifyBtn(true);
                                               } else if (postPass.search(/\s/) !== -1) {
                                                   setPostPassError(true);
                                                   setPassModifyBtn(true);
                                               } else if (num < 0 || eng < 0 || spe < 0) {
                                                   setPostPassError(true);
                                                   setPassModifyBtn(true);
                                               } else {
                                                   setPostPassError(false);
                                                   if (prePassRef.current.value !== "" && !prePassError && postPassRef.current.value !== "") {
                                                       setPassModifyBtn(false);
                                                   } else {
                                                       setPassModifyBtn(true);
                                                   }
                                               }


                                           }}/>
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
                                            prePassRef.current.value = "";
                                            postPassRef.current.value = "";
                                            setPrePassError(false);
                                            setPostPassError(false);
                                        }}> 취소
                                </button>
                                <button data-v-3d1bcc82="" data-v-587be1b3=""
                                        disabled={passModifyBtn ? true : false}
                                        type="button"
                                        className="btn solid medium" slot="button"
                                        onClick={() => {
                                            setPassModify(!passModify);
                                            passChange();
                                        }}> 저장
                                </button>
                            </div>
                        </div>
                    </div>
                    <div data-v-587be1b3="" className="profile_group">
                        <h4 data-v-587be1b3="" className="group_title">개인 정보</h4>
                        <div data-v-587be1b3="" className="unit" style={{display: nameModify ? "none" : ""}}>
                            <h5 data-v-587be1b3="" className="title">닉네임</h5>
                            <p data-v-587be1b3="" className="desc">{userDto.u_name}</p>
                            <button data-v-3d1bcc82="" data-v-587be1b3="" type="button"
                                    className="btn btn_modify outlinegrey small"
                                    onClick={() => {
                                        setNameModify(!nameModify);
                                    }}> 변경
                            </button>
                        </div>
                        <div data-v-587be1b3="" className="modify name" style={{display: !nameModify ? "none" : ""}}>
                            <h5 data-v-587be1b3="" className="title">닉네임</h5>
                            <div data-v-6c561060="" data-v-587be1b3=""
                                 className={nameError ? "input_box has_error" : "input_box"}>
                                <h6 data-v-587be1b3="" data-v-6c561060="" className="input_title">
                                    새로운 닉네임
                                </h6>
                                <div data-v-6c561060="" className="input_item">
                                    <input data-v-6c561060="" type="text" placeholder={userDto.u_name}
                                           autoComplete="off" ref={nameRef}
                                           className="input_txt"
                                           onChange={(e) => {
                                               let name = nameRef.current.value;
                                               let expname = /^[가-힣]{2,15}$/;
                                               // 공백 일 때, 길이가 1글자일 때, 공백이 들어가 있을 때
                                               if (name === "" || name.length <= 1 || name.search(/\s/) !== -1) {
                                                   setNameError(true);
                                                   setNameModifyBtn(true);
                                               } else if (!expname.test(name)) {
                                                   setNameError(true);
                                                   setNameModifyBtn(true);
                                               } else {
                                                   setNameError(false);
                                                   setNameModifyBtn(false);
                                               }
                                           }}/>
                                </div>
                                <p data-v-587be1b3="" data-v-6c561060="" className="input_error">
                                    올바른 이름을 입력해주세요. (2-10자)
                                </p>
                            </div>
                            <div data-v-587be1b3="" className="modify_btn_box">
                                <button data-v-3d1bcc82="" data-v-587be1b3="" type="button"
                                        className="btn outlinegrey medium" slot="button"
                                        onClick={() => {
                                            setNameModify(!nameModify);
                                            nameRef.current.value = "";
                                            setNameError(false);
                                        }}> 취소
                                </button>
                                <button data-v-3d1bcc82="" data-v-587be1b3=""
                                        disabled={nameModifyBtn ? true : false}
                                        type="button"
                                        className="btn solid medium" slot="button"
                                        onClick={() => {
                                            setNameModify(!nameModify);

                                            nameChange();
                                        }}> 저장
                                </button>
                            </div>
                        </div>
                        {/*휴대폰*/}
                        <div data-v-587be1b3="" className="unit" style={{display: hpModify ? "none" : ""}}>
                            <h5 data-v-587be1b3="" className="title">휴대폰 번호</h5>
                            <p data-v-587be1b3="" className="desc">
                                {userDto.hp && userDto.hp.substring(0, 5) + "***-" + userDto.hp.substring(9)}
                            </p>
                            <button data-v-3d1bcc82="" data-v-587be1b3="" type="button"
                                    className="btn btn_modify outlinegrey small"
                                    onClick={() => {
                                        setHpModify(!hpModify);
                                    }}> 변경
                            </button>
                        </div>
                        <div data-v-587be1b3="" className="modify name" style={{display: !hpModify ? "none" : ""}}>
                            <h5 data-v-587be1b3="" className="title">휴대폰 번호</h5>
                            <div data-v-6c561060="" data-v-587be1b3=""
                                 className={hpError ? "input_box has_error" : "input_box"}>
                                <h6 data-v-587be1b3="" data-v-6c561060="" className="input_title">
                                    새로운 휴대폰 번호
                                </h6>
                                <div data-v-6c561060="" className="input_item">
                                    <input data-v-6c561060="" type="text"
                                           placeholder={userDto.hp && userDto.hp.substring(0, 5) + "***-" + userDto.hp.substring(9)}
                                           autoComplete="off" ref={hpRef}
                                           className="input_txt"
                                           onChange={(e) => {
                                               let hp = hpRef.current.value;
                                               let exphp = /^(01[016789]{1})-[0-9]{3,4}-[0-9]{4}$/;
                                               if (!exphp.test(hp)) {
                                                   setHpError(true);
                                                   setHpErrorMsg("유효하지 않는 번호 입니다. (\"-\"를 포함하여 입력해주세요)");
                                                   setHpModifyBtn(true);
                                               } else {
                                                   setHpError(false);
                                                   hpCheck(hp);
                                               }
                                           }}/>
                                </div>
                                <p data-v-587be1b3="" data-v-6c561060="" className="input_error">
                                    {hpErrorMsg}
                                </p>
                            </div>
                            <div data-v-587be1b3="" className="modify_btn_box">
                                <button data-v-3d1bcc82="" data-v-587be1b3="" type="button"
                                        className="btn outlinegrey medium" slot="button"
                                        onClick={() => {
                                            setHpModify(!hpModify);
                                            hpRef.current.value = "";
                                            setHpError(false);
                                        }}> 취소
                                </button>
                                <button data-v-3d1bcc82="" data-v-587be1b3=""
                                        disabled={hpModifyBtn ? true : false}
                                        type="button"
                                        className="btn solid medium" slot="button"
                                        onClick={() => {
                                            setHpModify(!hpModify);
                                            hpChange();
                                        }}> 저장
                                </button>
                            </div>
                        </div>
                        <div data-v-587be1b3="" className="unit" style={{display: addrModify ? "none" : ""}}>
                            <h5 data-v-587be1b3="" className="title">주소</h5>
                            <p data-v-587be1b3="" className="desc">{userDto.addr}</p>
                            <button data-v-3d1bcc82="" data-v-587be1b3="" type="button"
                                    className="btn btn_modify outlinegrey small"
                                    onClick={() => {
                                        setAddrModify(!addrModify);
                                    }}> 변경
                            </button>
                        </div>
                        <div data-v-587be1b3="" className="modify name" style={{display: !addrModify ? "none" : ""}}>
                            <h5 data-v-587be1b3="" className="title">주소</h5>
                            <div data-v-6c561060="" data-v-587be1b3="" className="input_box">
                                <h6 data-v-587be1b3="" data-v-6c561060="" className="input_title">
                                    새로운 주소
                                </h6>
                                <div data-v-6c561060="" className="input_item">
                                    <input type="text" placeholder={userDto.addr && userDto.addr.split(",")[0]}
                                           autoComplete="off"
                                           ref={addrRef}
                                           className="input_txt" data-v-6c561060=""
                                           style={{
                                               color: "#bdbdbd",
                                               fontStyle: "italic",
                                               WebkitTouchCallout: "none",
                                               userSelect: "none",
                                               MozUserSelect: "none",
                                               msUserSelect: "none",
                                               WebkitUserSelect: "none",
                                           }}
                                           disabled={true}
                                    />
                                    <button data-v-3d1bcc82="" data-v-587be1b3="" type="button"
                                            className="btn btn_modify outlinegrey small" style={{marginBottom: "42px"}}
                                            onClick={handleClick}> 주소 찾기
                                    </button>
                                    <br/>
                                    <input type="text"
                                           placeholder={userDto.addr && userDto.addr.split(",")[1].substring(1)}
                                           autoComplete="off"
                                           style={{marginTop: "10px"}}
                                           className="input_txt" data-v-6c561060="" ref={extraAddressRef}
                                           onChange={() => {
                                               setAddrModifyBtn(false);
                                           }}/>
                                </div>
                            </div>
                            <div data-v-587be1b3="" className="modify_btn_box">
                                <button data-v-3d1bcc82="" data-v-587be1b3="" type="button"
                                        className="btn outlinegrey medium" slot="button"
                                        onClick={() => {
                                            setAddrModify(!addrModify);
                                            addrRef.current.value = "";
                                            extraAddressRef.current.value = "";
                                            setAddrModifyBtn(true);
                                        }}> 취소
                                </button>
                                <button data-v-3d1bcc82="" data-v-587be1b3="" disabled={addrModifyBtn ? true : false}
                                        type="button"
                                        className="btn solid medium" slot="button"
                                        onClick={() => {
                                            setAddrModify(!addrModify);
                                            setAddrModifyBtn(true);
                                            addrChange();
                                        }}> 저장
                                </button>
                            </div>
                        </div>
                        <div data-v-587be1b3="" className="unit">
                            <h5 data-v-587be1b3="" className="title">성별</h5>
                            <p data-v-587be1b3=""
                               className="desc">{userDto.gender === "M" ? "남성" : userDto.gender === "F" ? "여성" : ""}</p>
                        </div>
                    </div>
                    {/* 이메일 인증 모달 */}
                    <div data-v-1f7c6d3f="" data-v-28cabbb5="" data-v-f263fda4="" className="layer_point layer lg"
                         style={{display: emailCodeModal}}>
                        <div data-v-1f7c6d3f="" className="layer_container">
                            <div data-v-1f7c6d3f="" className="layer_header"><h2 data-v-28cabbb5=""
                                                                                 data-v-1f7c6d3f=""
                                                                                 className="title"><br/><br/>
                                4자리 코드를 입력해주세요.</h2>
                            </div>
                            <div data-v-1f7c6d3f="" className="layer_content">
                                <div data-v-28cabbb5="" data-v-1f7c6d3f="" className="layer_btn">
                                    <input type={'text'}
                                           style={{
                                               width: "100px",
                                               border: "1px solid black",
                                               borderRadius: "10px",
                                               textIndent: "25px",
                                               marginRight: "10px"
                                           }} maxLength={4}
                                           ref={emailCodeRef}/>
                                    <Link
                                        data-v-3d1bcc82=""
                                        data-v-28cabbb5=""
                                        to="#!"
                                        className="btn outline medium"
                                        data-v-1f7c6d3f=""
                                        style={{width: "100px"}}
                                        onClick={emailCodeCompare}> 확인 </Link>
                                </div>
                            </div>
                            <Link data-v-28cabbb5="" data-v-1f7c6d3f="" to="#!" className="btn_layer_close"
                                  onClick={() => {
                                      Swal.fire({
                                          title: '이메일 인증을 취소하시겠습니까?',
                                          icon: 'warning',
                                          showCancelButton: true,
                                          confirmButtonColor: '#3085d6',
                                          cancelButtonColor: '#d33',
                                          confirmButtonText: '승인',
                                          cancelButtonText: '취소',
                                          reverseButtons: false, // 버튼 순서 거꾸로

                                      }).then((result) => {
                                          if (result.isConfirmed) {
                                              Swal.fire(
                                                  '이메일 인증이 취소되었습니다.',
                                                  '',
                                                  "warning"
                                              )
                                              setEmailCodeModal("none");
                                              emailCodeRef.current.value = "";
                                          }
                                      })
                                  }}>
                                <Close/>
                            </Link>
                        </div>
                    </div>
                    <Link data-v-587be1b3="" to="#!" className="btn_withdrawal"
                          onClick={() => {
                              Swal.fire({
                                  title: '탈퇴하시겠습니까?',
                                  icon: 'warning',
                                  showCancelButton: true,
                                  confirmButtonColor: '#3085d6',
                                  cancelButtonColor: '#d33',
                                  confirmButtonText: '탈퇴',
                                  cancelButtonText: '취소',
                                  reverseButtons: false, // 버튼 순서 거꾸로
                              }).then((result) => {
                                  if (result.isConfirmed) {
                                      withDrawal();
                                  }
                              })
                          }}>회원 탈퇴
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MypageProfile;