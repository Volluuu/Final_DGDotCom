import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {REDIRECT_URI, REST_API_KEY} from "./kakaoLoginData";
import Swal from "sweetalert2";
import Menu from "../home/menu";
import {useDaumPostcodePopup} from "react-daum-postcode";
import {postcodeScriptUrl} from "react-daum-postcode/lib/loadPostcode";
import Home from "../home/Home";
import Footer from "../home/Footer";

function KakaoLogin(props) {
    const location = useLocation();
    const navi = useNavigate();
    const KAKAO_CODE = location.search.split("=")[1];

    const [firstKakao, setFirstKakao] = useState(false); // 카카오 첫 로그인이면 true
    const [email, setEmail] = useState();
    const passRef = useRef('');
    const [passError, setPassError] = useState(false); // true면 에러가 있는거, false면 에러가 없는 거
    const [name, setName] = useState();
    const hpRef = useRef('');
    const [hpError, setHpError] = useState(false); // true면 에러가 있는거, false면 에러가 없는 거
    const [hpErrorMsg, setHpErrorMsg] = useState("유효하지 않는 번호 입니다. (\"-\"를 포함하여 입력해주세요)");
    const [gender, setGender] = useState("N");
    const [genderDis, setGenderDis] = useState(true);
    const addrRef = useRef('');
    const extraAddressRef = useRef('');

    const getKakaoToken = () => {
        axios({
            method: "POST",
            url: "https://kauth.kakao.com/oauth/token",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                "grant_type": "authorization_code",
                "client_id": `${REST_API_KEY}`,
                "redirect_uri": `${REDIRECT_URI}`,
                "code": `${KAKAO_CODE}`,
            }
        })
            .then(res => {
                getKakaoUserInfo(res.data.access_token);
            })
    }

    const getKakaoUserInfo = (accessToken) => {
        let getInfoUrl = "https://kapi.kakao.com/v2/user/me";
        axios({
            method: 'POST',
            url: getInfoUrl,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-type': "application/x-www-form-urlencoded;charset=utf-8"
            },
        }).then(res => {
            // console.dir(res.data);
            kakaoEmailCheck(res.data.kakao_account.email, res.data);
        })
    }

    const kakaoEmailCheck = (email, kakaoData) => {
        let emailCheckUrl = process.env.REACT_APP_URL + "/user/emailcheck?email=" + email;
        axios.get(emailCheckUrl)
            .then(res => {
                // console.log(res.data);
                if (res.data > 0) {
                    setFirstKakao(false);
                    kakaoLogin(email);
                } else {
                    setFirstKakao(true);
                    setEmail(email);
                    // emailRef.current.value = email;
                    setName(kakaoData.kakao_account.profile.nickname);
                    // nameRef.current.value = kakaoData.kakao_account.profile.nickname;
                    if (kakaoData.kakao_account.gender === "male") {
                        setGender("M");
                    } else if (kakaoData.kakao_account.gender === "female") {
                        setGender("N");
                    } else {
                        setGender("N");
                        setGenderDis(false);
                    }
                    Swal.fire({
                        icon: "warning",
                        text: "간편 회원가입을 해주세요"
                    })
                }
            })
    }

    // 최초 카카오 회원가입을 한 경우 바로 로그인
    const kakaoLogin = (email) => {
        let signinUrl = process.env.REACT_APP_URL + "/social/login";

        axios.post(signinUrl, {
            email
        }, {headers: {"Content-Type": "application/json"}})
            .then(res => {
                localStorage.refreshToken = res.data.refreshToken;
                localStorage.accessToken = res.data.accessToken;
                sessionStorage.u_num = res.data.u_num;
                sessionStorage.loginok = "yes";
            }).then(res => {
            navi("/");
        }).then(res => {
            window.location.reload();
        })
            .catch(error => {
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
                sessionStorage.removeItem("u_num");
                sessionStorage.removeItem("loginok");
                Swal.fire({
                    icon: "error",
                    text: `아이디 또는 비밀번호를 확인해주세요.`
                })
            })
    }


    useEffect(() => {
        if (!location.search) {
            return;
        }
        getKakaoToken();
    }, []);


    // 핸드폰 중복 체크
    const hpCheck = (hp) => {
        let hpCheckUrl = process.env.REACT_APP_URL + "/user/hpcheck?hp=" + hp;
        axios.get(hpCheckUrl)
            .then(res => {
                if (res.data > 0) {
                    setHpErrorMsg("이미 가입한 번호입니다.");
                    setHpError(true);
                } else {
                    setHpError(false);
                }
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
    };
    const handleClick = () => {
        open({onComplete: handleComplete});
    };

    //회원가입
    const onSubmitSignUp = (e) => {
        e.preventDefault();
        // 비밀번호가 공백이거나 에러가 true 일 때 리턴
        if (passRef.current.value === "" || passError) {
            Swal.fire({
                icon: "warning",
                title: "유효한 비밀번호를 입력해주세요",
            })
            passRef.current.value = "";
            passRef.current.focus();
            return;
        }
        // 핸드폰이 공백이거나 에러가 true 일 때 리턴
        if (hpRef.current.value === "" || hpError) {
            Swal.fire({
                icon: "warning",
                title: "유효한 핸드폰 번호를 입력해주세요",
            })
            hpRef.current.value = "";
            hpRef.current.focus();
            return;
        }
        // 주소가 공백일 때 리턴
        if (addrRef.current.value === "") {
            Swal.fire({
                icon: "warning",
                title: "주소를 검색해주세요",
            })
            addrRef.current.focus();
            return;
        }
        if (extraAddressRef.current.value === "") {
            Swal.fire({
                icon: "warning",
                title: "상세 주소를 입력해주세요",
            })
            extraAddressRef.current.focus();
            return;
        }
        // 성별이 N이 아닐 때
        if (gender === "N") {
            Swal.fire({
                icon: "warning",
                title: "성별을 선택해주세요",
            })
            return;
        }
        let signupUrl = process.env.REACT_APP_URL + "/user/signup";
        axios.post(signupUrl, {
            email,
            u_name: name,
            pass: passRef.current.value,
            hp: hpRef.current.value,
            addr: addrRef.current.value.concat(", " + extraAddressRef.current.value),
            gender
        }, {headers: {"Content-Type": "application/json"}})
            .then(res => {
                Swal.fire({
                    icon: "success",
                    text: "카카오 간편 회원가입이 완료되었습니다.",
                })
                navi("/user/login");
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: `${error.response.status} 에러`,
                })
            })
    }

    return (
        <React.Fragment>
            <Menu/>
            {firstKakao ?
                <div className="container join" data-v-6ca47fe2="" data-v-3007c576="">
                    <div className="content lg" data-v-6ca47fe2="">
                        <div className="join_area" data-v-6ca47fe2="">
                            <h2 className="join_title" data-v-6ca47fe2="">DG.com SignUp</h2>
                            <form onSubmit={onSubmitSignUp}>
                                <div data-v-6c561060="" data-v-6ca47fe2=""
                                     className="input_box">
                                    <h3 className="input_title" data-v-6c561060="" data-v-6ca47fe2="">이메일 주소</h3>
                                    <div className="input_item" data-v-6c561060="">
                                        <input type="text" placeholder="예) dglee95@gmail.com" autoComplete="off"
                                               value={email}
                                               className="input_txt" data-v-6c561060="" disabled={true}
                                               style={{
                                                   fontSize: "1.1em",
                                                   color: "#bdbdbd",
                                                   fontStyle: "italic",
                                                   WebkitTouchCallout: "none",
                                                   userSelect: "none",
                                                   MozUserSelect: "none",
                                                   msUserSelect: "none",
                                                   WebkitUserSelect: "none",
                                               }}
                                        />
                                    </div>
                                    <p className="input_error" data-v-6c561060="" data-v-6ca47fe2=""></p>
                                    <button data-v-3d1bcc82="" data-v-587be1b3="" type="button"
                                            style={{marginBottom: "8px"}}
                                            className="btn btn_modify outlinegrey small"
                                            disabled={true}> 인증코드 받기
                                    </button>
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
                                    <p className="input_error" data-v-6c561060="" data-v-6ca47fe2=""> 영문, 숫자, 특수문자를 조합하여
                                        입력해주세요.
                                        (8-16자, 공백 없이) </p>
                                </div>

                                <div data-v-6c561060="" data-v-6ca47fe2=""
                                     className="input_box">
                                    <h3 className="input_title" data-v-6c561060="" data-v-6ca47fe2="">이름</h3>
                                    <div className="input_item" data-v-6c561060="">
                                        <input type="text" placeholder="이름을 입력하세요" autoComplete="off" value={name}
                                               className="input_txt" data-v-6c561060="" disabled={true}
                                               style={{
                                                   fontSize: "1.1em",
                                                   color: "#bdbdbd",
                                                   fontStyle: "italic",
                                                   WebkitTouchCallout: "none",
                                                   userSelect: "none",
                                                   MozUserSelect: "none",
                                                   msUserSelect: "none",
                                                   WebkitUserSelect: "none",
                                               }}
                                        />
                                    </div>
                                    <p className="input_error" data-v-6c561060="" data-v-6ca47fe2="">이름을 정확히 입력해주세요.</p>
                                </div>
                                <div data-v-6c561060="" data-v-6ca47fe2=""
                                     className={hpError ? "input_box has_error" : "input_box"}>
                                    <h3 className="input_title ess" data-v-6c561060="" data-v-6ca47fe2="">핸드폰</h3>
                                    <div className="input_item" data-v-6c561060="">
                                        <input type="text" placeholder="예) 010-4154-8185 " autoComplete="off"
                                               ref={hpRef}
                                               className="input_txt" data-v-6c561060=""
                                               onChange={() => {
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
                                        <input type="text" placeholder="예) 서울시 관악구 남현3가길 11" autoComplete="off"
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
                                                className="btn btn_modify outlinegrey small"
                                                style={{marginBottom: "42px"}}
                                                onClick={handleClick}> 주소 찾기
                                        </button>
                                        <br/>
                                        <input type="text" placeholder="상세 주소" autoComplete="off"
                                               style={{marginTop: "10px"}}
                                               className="input_txt" data-v-6c561060="" ref={extraAddressRef}/>
                                    </div>

                                </div>
                                <div className="input_box" data-v-6c561060="" data-v-6ca47fe2="">
                                    <h3 className={genderDis ? "input_title" : "input_title ess"} data-v-6c561060=""
                                        data-v-6ca47fe2="">성별</h3>
                                    <div className="input_item" data-v-6c561060="">
                                        <select className="v-select" value={gender}
                                                disabled={genderDis ? true : false}
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
                                        className="btn btn_join full solid" data-v-3d1bcc82=""
                                        data-v-6ca47fe2="" style={{lineHeight: "50%"}}> 가입하기
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                :
                <>
                    <Home/>
                    <Footer/>
                </>
            }

        </React.Fragment>
    );
}

export default KakaoLogin;