import axios from 'axios';
import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';

export const SignupForm = () => {
    const [u_name, setU_name] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [btnok, setBtnok] = useState(false);//중복체크 버튼 클릭여부판단
    const [idmsg, setIdmsg] = useState('');//아이디 가능여부 메세지
    const [hp, setHp] = useState('');//핸드폰 번호
    const [addr, setAddr] = useState('');//주소
    const [gender, setGender] = useState('');//성별

    const navi = useNavigate();

    //아이디 중복체크 버튼
    const btnIdCheck = () => {
        let url = localStorage.url + "/login/idcheck?email=" + email;
        // let url=sessionStorage.url+"/login/idcheck?myid="+myid;
        axios.get(url)
            .then(res => {
                if (res.data === 0) {
                    setIdmsg("가입가능");
                    setBtnok(true);
                } else {
                    setIdmsg("가입불가");
                    setBtnok(false);
                }
            })
    }

    //아이디 입력시 호출되는 이벤트
    const inputIdChange = (e) => {
        setEmail(e.target.value);
        setBtnok(false);//중복체크후 아이디를 다시 입력할경우때문에 추가함
        setIdmsg('');//아이디에 대한 메세지도 지우기
    }

    const onSubmitButton = (e) => {
        e.preventDefault();//기본 이벤트 무효화

        //아이디 중복 버튼을 클릭했는지 여부
        if (!btnok) {
            alert("이메일 중복체크 버튼을 눌러주세요");
            return;
        }

        let url = localStorage.url + "/member/insert";
        // let url=sessionStorage.url+"/member/insert";
        axios.post(url, {u_name, email, pass, hp, addr, gender})
            .then(res => {
                alert("회원가입 성공");
                setEmail('');
                setU_name('');
                setPass('');
                setHp('');
                setAddr('');
                setGender('');
                setBtnok(false);
                //로그인폼으로 이동
                navi("/login");
            })
    }

    return (
        <div className="container join" data-v-6ca47fe2="" data-v-3007c576="">
            <div className="content lg" data-v-6ca47fe2="">
                <div className="join_area" data-v-6ca47fe2="">
                    {/*<form onSubmit={onSi}*/}
                    <h2 className="join_title" data-v-6ca47fe2="">회원가입</h2>
                    <div className="input_box" data-v-6c561060="" data-v-6ca47fe2="">
                        <h3 className="input_title ess" data-v-6c561060="" data-v-6ca47fe2="">이메일 주소</h3>
                        <div className="input_item" data-v-6c561060="">
                            <input type="text" placeholder="예) kream@kream.co.kr" autoComplete="off"/* value="" */ className="input_txt" data-v-6c561060=""/>
                        </div>
                        <p className="input_error" data-v-6c561060="" data-v-6ca47fe2=""></p>
                    </div>
                    <div className="input_box has_button" data-v-6c561060="" data-v-6ca47fe2="">
                        <h3 className="input_title ess" data-v-6c561060="" data-v-6ca47fe2="">비밀번호</h3>
                        <div className="input_item" data-v-6c561060="">
                            <input type="password" placeholder="영문, 숫자, 특수문자 조합 8-16자" autoComplete="off" value="" className="input_txt" data-v-6c561060=""/>
                        </div>
                        <p className="input_error" data-v-6c561060="" data-v-6ca47fe2=""> 영문, 숫자, 특수문자를 조합하여 입력해주세요. (8-16자) </p>
                    </div>
                    <div className="input_box" data-v-6c561060="" data-v-6ca47fe2="">
                        <h3 className="input_title" data-v-6c561060="" data-v-6ca47fe2="">신발 사이즈</h3>
                        <div className="input_item" data-v-6c561060="">
                            <input type="text" placeholder="선택하세요" disabled="disabled" autoComplete="off" value="" className="input_txt hover" data-v-6c561060=""/>
                            <button type="button" className="btn btn_size_select" data-v-3d1bcc82="" data-v-6ca47fe2="" data-v-6c561060="">
                                <svg xmlns="http://www.w3.org/2000/svg" className="ico-arr-right icon sprite-icons" data-v-6ca47fe2="">
                                    <use href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-ico-arr-right" data-v-6ca47fe2=""></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="join_terms" data-v-6ca47fe2="">
                        <div className="terms_box" data-v-6ca47fe2="">
                            <div className="check_main" data-v-6ca47fe2="">
                                <div className="checkbox_item" data-v-4c714e9f="" data-v-6ca47fe2="">
                                    <input id="group_check_1" type="checkbox" name="" className="blind" data-v-4c714e9f=""/>
                                    <label htmlFor="group_check_1" className="check_label" data-v-4c714e9f="">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon sprite-icons ico-check-inactive" data-v-4c714e9f="">
                                            <use href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-ico-check-inactive" data-v-4c714e9f=""></use>
                                        </svg>
                                        <span className="label_txt" data-v-4c714e9f="">[필수] 만 14세 이상이며 모두 동의합니다.</span>
                                    </label>
                                </div>
                                <button type="button" className="btn" data-v-3d1bcc82="" data-v-6ca47fe2="">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon sprite-icons ico-plus"
                                         data-v-6ca47fe2="">
                                        <use href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-ico-plus"
                                             data-v-6ca47fe2=""></use>
                                    </svg>
                                </button>
                            </div>
                            <div className="check_sub" data-v-6ca47fe2="">
                                <div className="checkbox_item" data-v-4c714e9f="" data-v-6ca47fe2="">
                                    <input
                                    id="agreement" type="checkbox" name="" className="blind" data-v-4c714e9f=""/>
                                    <label
                                    htmlFor="agreement" className="check_label" data-v-4c714e9f="">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="icon sprite-icons ico-check-inactive" data-v-4c714e9f="">
                                        <use href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-ico-check-inactive"
                                             data-v-4c714e9f=""></use>
                                    </svg>
                                    <span className="label_txt" data-v-4c714e9f="">이용약관 동의</span></label><Link href="#!"
                                                                                                               className="btn_view"
                                                                                                               data-v-4c714e9f=""
                                                                                                               data-v-6ca47fe2=""> 내용
                                    보기 </Link></div>
                                <div className="checkbox_item" data-v-4c714e9f="" data-v-6ca47fe2=""><input id="privacy"
                                                                                                            type="checkbox"
                                                                                                            name=""
                                                                                                            className="blind"
                                                                                                            data-v-4c714e9f=""/><label
                                    htmlFor="privacy" className="check_label" data-v-4c714e9f="">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="icon sprite-icons ico-check-inactive" data-v-4c714e9f="">
                                        <use href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-ico-check-inactive"
                                             data-v-4c714e9f=""></use>
                                    </svg>
                                    <span className="label_txt" data-v-4c714e9f="">개인정보 수집 및 이용 동의</span></label><Link
                                    href="#!" className="btn_view" data-v-4c714e9f="" data-v-6ca47fe2=""> 내용 보기 </Link>
                                </div>
                            </div>
                        </div>
                        <div className="terms_box" data-v-6ca47fe2="">
                            <div className="check_main" data-v-6ca47fe2="">
                                <div className="checkbox_item" data-v-4c714e9f="" data-v-6ca47fe2=""><input
                                    id="group_check_2" type="checkbox" name="" className="blind"
                                    data-v-4c714e9f=""/><label htmlFor="group_check_2" className="check_label"
                                                               data-v-4c714e9f="">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="icon sprite-icons ico-check-inactive" data-v-4c714e9f="">
                                        <use href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-ico-check-inactive"
                                             data-v-4c714e9f=""></use>
                                    </svg>
                                    <span className="label_txt"
                                          data-v-4c714e9f="">[선택] 광고성 정보 수신에 모두 동의합니다.</span></label></div>
                                <button type="button" className="btn" data-v-3d1bcc82="" data-v-6ca47fe2="">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon sprite-icons ico-plus"
                                         data-v-6ca47fe2="">
                                        <use href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-ico-plus"
                                             data-v-6ca47fe2=""></use>
                                    </svg>
                                </button>
                            </div>
                            <div className="check_sub" data-v-6ca47fe2="">
                                <div className="checkbox_item" data-v-4c714e9f="" data-v-6ca47fe2=""><input
                                    id="allow_marketing" type="checkbox" name="" className="blind"
                                    data-v-4c714e9f=""/><label htmlFor="allow_marketing" className="check_label"
                                                               data-v-4c714e9f="">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="icon sprite-icons ico-check-inactive" data-v-4c714e9f="">
                                        <use href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-ico-check-inactive"
                                             data-v-4c714e9f=""></use>
                                    </svg>
                                    <span className="label_txt" data-v-4c714e9f="">앱 푸시</span></label></div>
                                <div className="checkbox_item" data-v-4c714e9f="" data-v-6ca47fe2=""><input
                                    id="allow_marketing_sms" type="checkbox" name="" className="blind"
                                    data-v-4c714e9f=""/><label htmlFor="allow_marketing_sms" className="check_label"
                                                               data-v-4c714e9f="">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon sprite-icons ico-check-inactive" data-v-4c714e9f="">
                                        <use href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-ico-check-inactive"
                                             data-v-4c714e9f=""></use>
                                    </svg>
                                    <span className="label_txt" data-v-4c714e9f="">문자 메시지</span></label></div>
                                <div className="checkbox_item" data-v-4c714e9f="" data-v-6ca47fe2=""><input
                                    id="allow_marketing_email" type="checkbox" name="" className="blind"
                                    data-v-4c714e9f=""/><label htmlFor="allow_marketing_email" className="check_label"
                                                               data-v-4c714e9f="">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="icon sprite-icons ico-check-inactive" data-v-4c714e9f="">
                                        <use href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-ico-check-inactive"
                                             data-v-4c714e9f=""></use>
                                    </svg>
                                    <span className="label_txt" data-v-4c714e9f="">이메일</span></label></div>
                            </div>
                        </div>
                    </div>
                    <Link disabled="disabled" href="#!" className="btn btn_join full solid disabled" data-v-3d1bcc82=""
                          data-v-6ca47fe2=""> 가입하기 </Link></div>
                <div className="layer lg" style={{display: "none"}} data-v-1f7c6d3f="" data-v-feb03f9c=""
                     data-v-6ca47fe2="">
                    <div className="layer_container" data-v-1f7c6d3f="">
                        <div className="layer_header" data-v-1f7c6d3f=""><h2 className="title" data-v-1f7c6d3f=""
                                                                             data-v-feb03f9c="">사이즈 선택</h2></div>
                        <div className="layer_content" data-v-1f7c6d3f="">
                            <div className="size_list_area" data-v-1f7c6d3f="" data-v-feb03f9c="">
                                <div className="size_item" data-v-1b874462="" data-v-feb03f9c="" data-v-1f7c6d3f="">
                                    <Link href="#!" className="btn outlinegrey medium" data-v-3d1bcc82=""
                                          data-v-1b874462=""><span className="info_txt"
                                                                   data-v-1b874462="">220</span></Link></div>
                                <div className="size_item" data-v-1b874462="" data-v-feb03f9c="" data-v-1f7c6d3f="">
                                    <Link href="#!" className="btn outlinegrey medium" data-v-3d1bcc82=""
                                          data-v-1b874462=""><span className="info_txt"
                                                                   data-v-1b874462="">225</span></Link></div>
                                <div className="size_item" data-v-1b874462="" data-v-feb03f9c="" data-v-1f7c6d3f="">
                                    <Link href="#!" className="btn outlinegrey medium" data-v-3d1bcc82=""
                                          data-v-1b874462=""><span className="info_txt"
                                                                   data-v-1b874462="">230</span></Link></div>
                                <div className="size_item" data-v-1b874462="" data-v-feb03f9c="" data-v-1f7c6d3f="">
                                    <Link href="#!" className="btn outlinegrey medium" data-v-3d1bcc82=""
                                          data-v-1b874462=""><span className="info_txt"
                                                                   data-v-1b874462="">235</span></Link></div>
                                <div className="size_item" data-v-1b874462="" data-v-feb03f9c="" data-v-1f7c6d3f="">
                                    <Link href="#!" className="btn outlinegrey medium" data-v-3d1bcc82=""
                                          data-v-1b874462=""><span className="info_txt"
                                                                   data-v-1b874462="">240</span></Link></div>
                                <div className="size_item" data-v-1b874462="" data-v-feb03f9c="" data-v-1f7c6d3f="">
                                    <Link href="#!" className="btn outlinegrey medium" data-v-3d1bcc82=""
                                          data-v-1b874462=""><span className="info_txt"
                                                                   data-v-1b874462="">245</span></Link></div>
                                <div className="size_item" data-v-1b874462="" data-v-feb03f9c="" data-v-1f7c6d3f="">
                                    <Link href="#!" className="btn outlinegrey medium" data-v-3d1bcc82=""
                                          data-v-1b874462=""><span className="info_txt"
                                                                   data-v-1b874462="">250</span></Link></div>
                                <div className="size_item" data-v-1b874462="" data-v-feb03f9c="" data-v-1f7c6d3f="">
                                    <Link href="#!" className="btn outlinegrey medium" data-v-3d1bcc82=""
                                          data-v-1b874462=""><span className="info_txt"
                                                                   data-v-1b874462="">255</span></Link></div>
                                <div className="size_item" data-v-1b874462="" data-v-feb03f9c="" data-v-1f7c6d3f="">
                                    <Link href="#!" className="btn outlinegrey medium" data-v-3d1bcc82=""
                                          data-v-1b874462=""><span className="info_txt"
                                                                   data-v-1b874462="">260</span></Link></div>
                                <div className="size_item" data-v-1b874462="" data-v-feb03f9c="" data-v-1f7c6d3f="">
                                    <Link href="#!" className="btn outlinegrey medium" data-v-3d1bcc82=""
                                          data-v-1b874462=""><span className="info_txt"
                                                                   data-v-1b874462="">265</span></Link></div>
                                <div className="size_item" data-v-1b874462="" data-v-feb03f9c="" data-v-1f7c6d3f="">
                                    <Link href="#!" className="btn outlinegrey medium" data-v-3d1bcc82=""
                                          data-v-1b874462=""><span className="info_txt"
                                                                   data-v-1b874462="">270</span></Link></div>
                                <div className="size_item" data-v-1b874462="" data-v-feb03f9c="" data-v-1f7c6d3f="">
                                    <Link href="#!" className="btn outlinegrey medium" data-v-3d1bcc82=""
                                          data-v-1b874462=""><span className="info_txt"
                                                                   data-v-1b874462="">275</span></Link></div>
                                <div className="size_item" data-v-1b874462="" data-v-feb03f9c="" data-v-1f7c6d3f="">
                                    <Link href="#!" className="btn outlinegrey medium" data-v-3d1bcc82=""
                                          data-v-1b874462=""><span className="info_txt"
                                                                   data-v-1b874462="">280</span></Link></div>
                                <div className="size_item" data-v-1b874462="" data-v-feb03f9c="" data-v-1f7c6d3f="">
                                    <Link href="#!" className="btn outlinegrey medium" data-v-3d1bcc82=""
                                          data-v-1b874462=""><span className="info_txt"
                                                                   data-v-1b874462="">285</span></Link></div>
                                <div className="size_item" data-v-1b874462="" data-v-feb03f9c="" data-v-1f7c6d3f="">
                                    <Link href="#!" className="btn outlinegrey medium" data-v-3d1bcc82=""
                                          data-v-1b874462=""><span className="info_txt"
                                                                   data-v-1b874462="">290</span></Link></div>
                                <div className="size_item" data-v-1b874462="" data-v-feb03f9c="" data-v-1f7c6d3f="">
                                    <Link href="#!" className="btn outlinegrey medium" data-v-3d1bcc82=""
                                          data-v-1b874462=""><span className="info_txt"
                                                                   data-v-1b874462="">295</span></Link></div>
                                <div className="size_item" data-v-1b874462="" data-v-feb03f9c="" data-v-1f7c6d3f="">
                                    <Link href="#!" className="btn outlinegrey medium" data-v-3d1bcc82=""
                                          data-v-1b874462=""><span className="info_txt"
                                                                   data-v-1b874462="">300</span></Link></div>
                            </div>
                            <div className="layer_btn" data-v-1f7c6d3f="" data-v-feb03f9c=""><Link href="#!"
                                                                                                   className="btn solid disabled medium"
                                                                                                   data-v-3d1bcc82=""
                                                                                                   data-v-feb03f9c=""
                                                                                                   data-v-1f7c6d3f=""> 확인 </Link>
                            </div>
                        </div>
                        <Link className="btn_layer_close" data-v-1f7c6d3f="" data-v-feb03f9c="">
                            <svg xmlns="http://www.w3.org/2000/svg" className="ico-close icon sprite-icons"
                                 data-v-1f7c6d3f="" data-v-feb03f9c="">
                                <use href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-ico-close" data-v-1f7c6d3f=""
                                     data-v-feb03f9c=""></use>
                            </svg>
                        </Link></div>
                </div>
                <div className="layer lg layer_privacy" style={{display: "none"}} data-v-1f7c6d3f="" data-v-33332626=""
                     data-v-6ca47fe2="">
                    <div className="layer_container" data-v-1f7c6d3f="">
                        <div className="layer_header" data-v-1f7c6d3f=""><h2 className="title" data-v-1f7c6d3f=""
                                                                             data-v-33332626="">개인정보 수집 및 이용</h2></div>
                        <div className="layer_content" data-v-1f7c6d3f="">
                            <div id="wrap" data-v-3ffe84fe="" data-v-33332626="" data-v-1f7c6d3f="">
                                <div className="agreement_list" data-v-3ffe84fe="">
                                    <div className="agreement_subtitle" data-v-3ffe84fe=""> 크림(주)(이하 회사)는 서비스 제공을 위하여
                                        아래와 같이 개인정보를 수집 ・ 이용 및 제공합니다.
                                    </div>
                                </div>
                                <div className="divider" data-v-3ffe84fe=""></div>
                                <div className="agreement_list" data-v-3ffe84fe="">
                                    <div className="agreement_title" data-v-3ffe84fe="">개인정보 수집 및 이용 내역</div>
                                    <div className="agreement_subtitle" data-v-3ffe84fe=""></div>
                                    <br data-v-3ffe84fe=""/>
                                    <div data-v-3ffe84fe="">
                                        <table data-v-3ffe84fe="">
                                            <caption data-v-3ffe84fe=""><span className="blind" data-v-3ffe84fe="">개인정보 수집 및 이용 내역 표</span>
                                            </caption>
                                            <colgroup data-v-3ffe84fe="">
                                                <col style={{width: "40%"}} data-v-3ffe84fe=""/>
                                                <col style={{width: "30%"}} data-v-3ffe84fe=""/>
                                                <col style={{width: "10%"}} data-v-3ffe84fe=""/>
                                                <col style={{width: "20%"}} data-v-3ffe84fe=""/>
                                            </colgroup>
                                            <thead data-v-3ffe84fe="">
                                            <tr data-v-3ffe84fe="">
                                                <th scope="col" data-v-3ffe84fe="">항목</th>
                                                <th scope="col" data-v-3ffe84fe="">수집 및 이용 목적</th>
                                                <th scope="col" data-v-3ffe84fe="">필수 여부</th>
                                                <th scope="col" data-v-3ffe84fe="">보유 및 이용기간</th>
                                            </tr>
                                            </thead>
                                            <tbody data-v-3ffe84fe="">
                                            <tr data-v-3ffe84fe="">
                                                <th scorp="row" data-v-3ffe84fe=""> NAVER 회원: 이용자 식별자<br
                                                    data-v-3ffe84fe=""/>APPLE 회원: 이용자 식별자<br data-v-3ffe84fe=""/>이메일 회원:
                                                    ID(이메일 주소), 비밀번호, 이름, 휴대폰번호, 성별, 생년월일, CI/DI
                                                </th>
                                                <td rowSpan="2" data-v-3ffe84fe="">회원 가입 및 프로필 관리</td>
                                                <td data-v-3ffe84fe="">필수</td>
                                                <td rowSpan="3" data-v-3ffe84fe="">회원 탈퇴 또는 서비스 종료 시까지</td>
                                            </tr>
                                            <tr data-v-3ffe84fe="">
                                                <th scorp="row" data-v-3ffe84fe=""> (공통) 별명, 프로필 사진, 신발 사이즈, 배송 주소, 카드
                                                    정보, 거래 은행 및 계좌번호
                                                </th>
                                                <td data-v-3ffe84fe="">선택</td>
                                            </tr>
                                            <tr data-v-3ffe84fe="">
                                                <th scorp="row" data-v-3ffe84fe=""> 개인: 이름, 주소, 휴대폰번호, 이메일, 입금계좌
                                                    정보(계좌번호, 예금주명), 신분증 사본<br data-v-3ffe84fe=""/>사업자: 이름, 주소, 휴대폰번호,
                                                    이메일, 입금계좌 정보(계좌번호, 예금주명), 사업자등록증, 입금계좌 신고서
                                                </th>
                                                <td data-v-3ffe84fe="">매입/매출 거래처 등록</td>
                                                <td data-v-3ffe84fe="">필수</td>
                                            </tr>
                                            <tr data-v-3ffe84fe="">
                                                <th scorp="row" data-v-3ffe84fe="">휴대폰번호</th>
                                                <td data-v-3ffe84fe="">ID 찾기</td>
                                                <td data-v-3ffe84fe="">필수</td>
                                                <td data-v-3ffe84fe="">ID 찾기 이용 시까지</td>
                                            </tr>
                                            <tr data-v-3ffe84fe="">
                                                <th scorp="row" data-v-3ffe84fe="">휴대폰번호, 이메일주소</th>
                                                <td data-v-3ffe84fe="">비밀번호 찾기</td>
                                                <td data-v-3ffe84fe="">필수</td>
                                                <td data-v-3ffe84fe="">비밀번호 찾기 이용 시까지</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <ul className="more_info_list" data-v-3ffe84fe=""></ul>
                                    </div>
                                </div>
                                <div className="divider" data-v-3ffe84fe=""></div>
                                <div className="agreement_list" data-v-3ffe84fe="">
                                    <div className="agreement_title" data-v-3ffe84fe=""></div>
                                    <div className="agreement_subtitle" data-v-3ffe84fe=""> 개인정보의 수집 및 이용에 대한 동의를
                                        거부하시더라도 서비스의 이용은 가능합니다.<br data-v-3ffe84fe=""/><br data-v-3ffe84fe=""/><strong
                                            data-v-3ffe84fe="">다만, 수집 및 이용을 거부하신 정보와 연계된 서비스(회원 가입 및 프로필 관리, 매입/매출 거래처
                                            등록, ID/비밀번호 찾기)는 동의 전까지 일부 또는 전체를 이용하실 수 없습니다.</strong><br
                                            data-v-3ffe84fe=""/><br data-v-3ffe84fe=""/><Link target="_blank"
                                                                                              href="/privacy"
                                                                                              className="link"
                                                                                              data-v-3ffe84fe="">개인정보
                                            처리방침 전문 보기</Link></div>
                                </div>
                            </div>
                        </div>
                        <Link className="btn_layer_close" data-v-1f7c6d3f="" data-v-33332626="">
                            <svg xmlns="http://www.w3.org/2000/svg" className="ico-close icon sprite-icons"
                                 data-v-1f7c6d3f="" data-v-33332626="">
                                <use href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-ico-close" data-v-1f7c6d3f=""
                                     data-v-33332626=""></use>
                            </svg>
                        </Link></div>
                </div>
                <div className="layer lg layer_agreement" style={{display: "none"}} data-v-1f7c6d3f=""
                     data-v-17b3a53d="" data-v-6ca47fe2="">
                    <div className="layer_container" data-v-1f7c6d3f="">
                        <div className="layer_header" data-v-1f7c6d3f=""><h2 className="title" data-v-1f7c6d3f=""
                                                                             data-v-17b3a53d="">이용약관</h2></div>
                        <div className="layer_content" data-v-1f7c6d3f="">
                            <div className="editor_viewer" data-v-17b3a53d="" data-v-1f7c6d3f=""><p><strong>KREAM 서비스 이용
                                약관</strong></p><p>&nbsp;</p><p><strong>제 1 조 (목적)</strong></p><p>이 약관은 "회원" 개인 상호 간 또는
                                “제휴 사업자”와 “회원” 개인 간에 상품 등을 매매하는 것을 중개하고, "상품" 등에 관한 정보를 상호 교환할 수 있도록 크림 주식회사(이하 "회사"라
                                합니다)가 운영, 제공하는 KREAM 서비스(이하 "서비스")에 대한 것으로 본 약관에서는 "서비스"의 이용과 관련하여 "회사"와 "회원"과의 권리, 의무 및
                                책임사항, 기타 필요한 사항을 규정합니다.</p><p>&nbsp;</p><p><strong>제 2 조 (용어의 정의)</strong></p><p>이 약관에서
                                사용하는 용어의 정의는 다음 각 호와 같으며, 정의되지 않은 용어에 대한 해석은 관계 법령 및 지침, 본 이용약관, 개인정보취급방침, 상관례 등에
                                의합니다.</p>
                                <ul>
                                    <li>"서비스"라 함은 회사가 PC 및/또는 모바일 환경에서 제공하는 KREAM 서비스 및 관련 제반 서비스를 말합니다.</li>
                                    <li>"회원"이라 함은 "회사"의 "서비스"에 접속하여 이 약관에 따라 "회사"와 이용계약을 체결하고 "회사"가 제공하는 "서비스"를 이용하는 고객을
                                        말합니다.
                                    </li>
                                    <li>"구매자" 또는 "구매회원"이라 함은 "상품"을 구매하거나 또는 구매할 의사로 서비스를 이용하는 회원을 말합니다.</li>
                                    <li>"판매자" 또는 "판매회원"이라 함은 "서비스"에 "상품"을 등록하여 판매하거나 또는 제공할 의사로 서비스를 이용하는 회원을 말합니다.</li>
                                    <li>"입찰"이라 함은 "상품"을 구매하기 위하여 원하는 "상품"의 구매 가격을 제출하는 행위 또는 "상품"을 판매하기 위하여 원하는 "상품"의 판매
                                        가격을 제출하는 행위를 말합니다.
                                    </li>
                                    <li>"거래 체결"이라 함은 "입찰"에 의하여 상품의 거래가 성립되는 것을 말합니다.</li>
                                    <li>"게시물"이라 함은 "회원"이 "서비스"를 이용함에 있어 "서비스"상에 게시한 문자, 음성, 음향, 화상, 동영상 등의 정보 형태의 글(댓글
                                        포함), 사진(이미지), 동영상 및 각종 파일과 링크 등 일체를 의미합니다.
                                    </li>
                                    <li>"회원정보"라 함은 "서비스"를 이용하는 고객이 등록한 정보를 말합니다.</li>
                                    <li>"서비스수수료"라 함은 "회원"이 "서비스"를 이용하면서 발생할 수 있는 수수료입니다. "상품"의 판매/구매 및 제반 서비스를 이용함에 따라
                                        부과되는 시스템이용료로서 거래 수수료 또는 판매완료 수수료, 유료부가서비스수수료 등이 있으며, 관련내용은 제24조(서비스수수료)에 명시된 바에
                                        따릅니다.
                                    </li>
                                    <li>"포인트"라 함은 "서비스"의 효율적 이용을 위해 "회사"가 임의로 책정 또는 지급, 조정할 수 있는 "서비스" 상의 가상 데이터를 의미합니다.
                                        "포인트"의 적립, 지급, 사용 등과 관련한 구체적인 정책에 대해서는 이용약관 및 공지사항 등으로 별도 고지하는 바에 따릅니다.
                                    </li>
                                    <li>“상품”이라 함은 본 약관에 따라 “회원” 간 거래 대상으로서 “서비스”에 등록된 재화 또는 용역을 말합니다.</li>
                                    <li>“제휴 사업자”라 함은 “KREAM EXCLUSIVE DROPS” 및 “B2C 상품 페이지”에서 제공하는 통신판매중개를 이용하여 “회원”과
                                        “제휴 사업자 판매 상품”을 거래하고자 “회사”와 별도의 계약을 체결한 사업자를 말합니다.
                                    </li>
                                    <li>“제휴 사업자 판매 상품”이라 함은 “상품”과는 달리 “제휴 사업자”가 “회사”와 체결한 별도의 계약에 따라 “KREAM EXCLUSIVE
                                        DROPS” 및 “B2C 상품 페이지”에서 “회원”에게 판매하는 재화 또는 용역을 말합니다.
                                    </li>
                                </ul>
                                <p>&nbsp;</p><p><strong>제 3 조 (약관의 명시, 효력 및 변경)</strong></p><p>1. "회사"는 이 약관의 내용을 "회원"이
                                    쉽게 알 수 있도록 "서비스" 초기 화면에 게시합니다.<br/><br/>2. "회사"가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여
                                    현행약관과 함께 제1항의 방식에 따라 그 개정약관의 적용일자 7일 전부터 공지합니다. 다만, "회원"에게 불리한 내용으로 약관을 개정하는 경우에는 그
                                    적용일자 30일 전부터 공지 외에 "회원정보"에 등록된 이메일 등 전자적 수단을 통해 별도로 명확히 통지하도록 합니다.<br/><br/>3. "회사"가
                                    전항에 따라 "회원"에게 통지하면서 공지 기간 이내에 거부의사를 표시하지 않으면 승인한 것으로 본다는 뜻을 명확하게 고지하였음에도 "회원"이 명시적으로
                                    거부의사를 밝히지 않거나, "서비스"를 이용할 경우에는 "회원"이 개정약관에 동의한 것으로 봅니다.<br/><br/>4. "회원"이 개정약관에 동의하지
                                    않는 경우 "회사"는 개정약관의 내용을 적용할 수 없으며, 이 경우 회원은 제8조 제1항의 규정에 따라 이용계약을 해지할 수 있습니다.</p>
                                <p>&nbsp;</p><p><strong>제 4 조 (약관의 해석)</strong></p><p>"회사"는 개별 서비스에 대해서 별도의 이용약관 및 정책(이하
                                    "개별 약관 등")을 둘 수 있으며, 해당 내용이 이 약관과 상충할 경우에는 "개별 약관 등"이 우선하여 적용됩니다.<br/><br/>이 약관에
                                    명시되지 않은 사항은 '약관의 규제에 관한 법률'(이하 "약관법"), ‘전자상거래 등에서의 소비자보호에 관한 법률’(이하 "전자상거래법"),
                                    ‘정보통신망이용촉진및정보보호등에관한법률’(이하 "정보통신망법"), 공정거래위원회가 정하는 전자상거래 등에서의 소비자보호지침(이하 "소비자보호지침") 및
                                    관계 법령 또는 상관례에 따릅니다.</p><p>&nbsp;</p><p><strong>제 5 조 (이용계약의 체결)</strong></p><p>1.
                                    이용계약은 "회원"이 되고자 하는 자(이하 "가입신청자")가 약관의 내용에 대하여 동의를 한 후 회원가입신청을 하고 "회사"가 이러한 신청에 대하여
                                    승낙함으로써 체결됩니다. "회사"는 "가입신청자"의 신청에 대하여 서비스 이용을 승낙함을 원칙으로 합니다. 다만, "회사"는 다음 각 호에 해당하는
                                    신청에 대하여는 승낙을 하지 않거나, 사후에 이용계약을 해지할 수 있습니다.</p>
                                <ul>
                                    <li>가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</li>
                                    <li>타인의 명의를 도용하여 이용신청을 하는 경우</li>
                                    <li>허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우</li>
                                    <li>14세 미만 아동이 회원가입 시 법정대리인(부모 등)의 동의를 얻지 아니한 경우</li>
                                    <li>사업자(이하 ‘사업자’에는 개인사업자 포함)가 이용신청을 하는 경우</li>
                                    <li>이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우</li>
                                </ul>
                                <p>2. "회사"는 "서비스" 관련 설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다.<br/><br/>3.
                                    회원가입신청의 승낙을 하지 아니하거나 유보한 경우, "회사"는 원칙적으로 이를 "가입신청자"에게 알리도록 합니다.<br/><br/>4. 이용계약의 성립
                                    시기는 "회사"가 가입완료를 신청절차 상에서 표시한 시점으로 합니다.<br/><br/>5. "회사"는 "회원"에 대해 회사정책에 따라 등급별로 구분하여
                                    이용시간, 이용횟수, 서비스 메뉴 등을 세분하여 이용에 차등을 둘 수 있습니다.</p><p>&nbsp;</p><p><strong>제 6 조 ("회원"의
                                    "아이디" 및 "비밀번호"의 관리에 대한 의무)</strong></p><p>1. "회원"의 "아이디"와 "비밀번호"에 관한 관리책임은 "회원"에게
                                    있으며, 이를 제3자가 이용하도록 하여서는 안 됩니다.<br/><br/>2. "회사"는 "회원"의 "아이디"가 개인정보 유출 우려가 있거나, 회사 및
                                    회사의 운영자로 오인한 우려가 있는 경우 등 "회원" 및 "서비스" 보호에 필요한 경우 해당 "아이디"의 이용을 제한할 수 있습니다.<br/><br/>3.
                                    "회원"은 "아이디"및 "비밀번호"가 도용되거나 제3자가 사용하고 있음을 인지한 경우에는 이를 즉시 "회사"에 통지하고 "회사"의 안내에 따라야
                                    합니다.<br/><br/>4. 제3항의 경우에 해당 "회원"이 "회사"에 그 사실을 통지하지 않거나, 통지한 경우에도 "회사"의 안내에 따르지 않아
                                    발생한 불이익에 대하여 "회사"는 책임지지 않습니다.</p><p>&nbsp;</p><p><strong>제 7 조 (이용제한 등)</strong></p>
                                <p>1. "회사"는 "회원"이 이 약관 또는 관련 법령을 위반하거나 "서비스"의 정상적인 운영을 방해한 경우, 경고, 일시정지, 영구이용정지, 이용계약
                                    해지(재가입 제한 조치 포함) 등(이하 "이용제한 등")으로 "서비스" 이용을 단계적으로 제한할 수 있습니다.<br/><br/>2. "회사"는 전항에도
                                    불구하고, "회원"의 의무 위반 행위나 "서비스" 운영 방해 행위에 대하여 사안의 중대성이나 긴급성 등을 토대로 "서비스"에 미치는 영향을 고려하여
                                    경고 등의 단계적인 조치를 거치지 않고 곧바로 일시 정지나 영구이용정지, 이용계약 해지(재가입 제한 조치 포함)를 할 수 있습니다.<br/>특히,
                                    ‘주민등록법'을 위반한 명의도용 및 결제도용, '저작권법'을 위반한 불법프로그램의 제공 및 운영방해, "정보통신망법"을 위반한 불법통신 및 해킹,
                                    악성프로그램의 배포, 접속권한 초과행위 등과 같이 관련법을 위반하여 서비스에 중대한 영향을 끼친 경우에는 즉시 영구이용정지를 할 수 있으며,
                                    영구이용정지를 할 수 있는 위반행위는 이에 제한되지 않습니다. 본 항에 따른 영구이용정지 시 "서비스" 이용을 통해 획득한 "포인트" 및 기타 혜택
                                    등도 모두 소멸되며, "회사"는 이에 대해 별도로 보상하지 않습니다.<br/><br/>3. 본 조에 따른 "이용제한 등"의 사유는 아래의 사항을
                                    포함하나 이에 한하지 아니하며, 구체적인 제한의 조건 및 세부내용은 본 약관 또는 운영 정책 및 개별 서비스 상의 이용약관이나 운영정책에서 정하는 바에
                                    의합니다.<br/>(관련정책 : <Link href="https://kream.co.kr/faq/block">링크</Link>)</p>
                                <ul>
                                    <li>일정 횟수 이상의 가품 판정 또는 중고품 거래</li>
                                    <li>부정거래(시세조작 행위, 자전거래 등) 시도</li>
                                    <li>이용정지 중인 계정을 소유한 "회원"과 동일인임이 확인되는 활성계정</li>
                                    <li>“제휴 사업자” 아닌 사업자의 “서비스” 이용</li>
                                    <li>본 약관 또는 관련 법령 위반</li>
                                </ul>
                                <p>4. "회원"은 본 조에 따른 이용제한 등에 대해 "회사"가 정한 절차에 따라 이의신청을 할 수 있습니다. 이 때 이의가 정당하다고 "회사"가 인정하는
                                    경우 "회사"는 즉시 "서비스"의 이용을 재개합니다.</p><p>&nbsp;</p><p><strong>제 8 조 (계약해제, 해지 등)</strong>
                                </p><p>1. "회원"은 언제든지 고객센터 또는 내 정보 관리 메뉴 등을 통하여 이용계약 해지(탈퇴) 신청을 할 수 있으며, "회사"는 관련 법령 등이
                                    정하는 바에 따라 이를 즉시 처리합니다. 다만, 아래와 같은 경우 해지(탈퇴) 처리가 제한될 수 있습니다.<br/><br/>가. "회원"에게 부과된
                                    서비스 수수료나 부과된 페널티 금액의 미납이 있는 경우, 본 약관 제16조 제3항의 "마이너스(-) 포인트"가 남아 있는 경우, "회사"와 "회원"
                                    사이에 분쟁 계속 중인 경우 등과 같이 이용계약을 해지하는 것이 적절하지 않은 경우에는 해당하는 사유가 완전히 해소될 때까지 해지(탈퇴) 처리가 제한될
                                    수 있습니다.<br/><br/>나. 만약 현재 진행 중인 거래, 문의, 또는 민원이 있거나 본 약관 제7조에 따라 이용제한 등의 조치가 된 경우에는
                                    해지(탈퇴) 신청이 불가능하며, 해당하는 사유가 완전히 처리 완료된 후 본 약관 및 운영정책에서 정하는 바에 따라 탈퇴 및 이용계약 해지가 가능합니다.<br/><br/>2.
                                    "회원"이 계약을 해지할 경우, 관련법 및 개인정보취급방침에 따라 "회사"가 회원정보를 보유하는 경우를 제외하고는 해지 즉시 "회원"의 모든 데이터는
                                    소멸됩니다.<br/><br/>3. "회원"이 계약을 해지하는 경우, "회원"이 작성한 "게시물" 중 피드, 블로그 등과 같이 본인 계정에 등록된 게시물
                                    일체는 삭제됩니다. 다만, 타인에 의해 담기, 스크랩 등이 되어 재게시되거나, 공용게시판에 등록된 "게시물" 등은 삭제되지 않으니 사전에 삭제 후
                                    탈퇴하시기 바랍니다.<br/><br/>4. 이용계약의 해지(탈퇴)는 "회원"이 해지 이전에 거래한 "상품"과 관련하여 발생한 책임 및 "회사" 및 거래
                                    상대방 등과의 관계에서 기발생한 권리관계 및 손해배상 청구권 등 기존 권리관계에 영향을 미치지 아니합니다.</p><p>&nbsp;</p><p>
                                    <strong>제 9 조 ("서비스"의 이용)</strong></p><p>1. "회사"는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절
                                    또는 운영상 상당한 이유가 있는 경우 "서비스"의 제공을 일시적으로 중단할 수 있습니다. 이 경우 "회사"는 제20조에 정한 방법으로 "회원"에게
                                    통지합니다. 다만, "회사"가 사전에 통지할 수 없는 부득이한 사유가 있는 경우 사후에 통지할 수 있습니다.<br/><br/>2. "회사"는 서비스의
                                    제공에 필요한 경우 정기점검을 실시할 수 있으며, 정기점검시간은 서비스제공화면 등에 공지한 바에 따릅니다.</p><p>&nbsp;</p><p>
                                    <strong>제 10 조 ("서비스"의 내용)</strong></p><p>1. "상품"의 중개 서비스<br/>"회원" 개인 상호간에 미사용
                                    secondhand "상품"에 대한 거래가 이루어질 수 있도록 회사가 온라인으로 제공하는 "상품"에 대한 중개 서비스 및 관련 부가서비스 일체를
                                    말합니다. "회원"의 "상품"에 대한 거래는 입찰에 의한 거래 체결 또는 "판매자" 및 "구매자"가 설정한 가격에 즉시 거래 체결되는 방식을 모두
                                    제공할 수 있습니다.<br/><br/>2. 정보 서비스<br/>"회사"가 각 "회원"에 대한 판매정보, 구매정보, 거래실적, 신용도, 회원정보 등
                                    "회원"의 거래 기록을 모아 "회원" 상호 간의 상품의 거래 및 중개서비스를 신속하고 편리하게 이용하도록 하기 위하여 제공하는 서비스를
                                    말합니다.<br/><br/>3. “KREAM EXCLUSIVE DROPS” 및 “B2C 상품 페이지”<br/>“회사”가 “제휴 사업자”와 체결한 별도의
                                    계약에 따라 제공하는 통신판매중개 서비스 및 관련 부가서비스 일체를 말합니다. “제휴 사업자”는 별도로 마련된 “KREAM EXCLUSIVE
                                    DROPS” 및 “B2C 상품 페이지” 이외에 개인 상호간 “상품” 거래 중개 서비스를 이용하지 않습니다.<br/><br/>4. 기타 정보
                                    서비스<br/>"상품" 서비스 이외에 "회사"가 제공하는 서비스를 통하여 "회원"에게 온라인으로 제공하는 정보서비스, 커뮤니티 등의 인터넷 서비스를
                                    말합니다.</p><p>&nbsp;</p><p><strong>제 11 조 ("서비스"의 변경 및 중지)</strong></p><p>1. "회사"는 상당한
                                    이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는 일부 "서비스"를 제한, 변경하거나 중지할 수 있습니다.<br/><br/>2.
                                    "회사"는 제1항에 의한 서비스 중단의 경우에 인터넷 등에 사전 공지하거나 제20조("회원"에 대한 통지)에 정한 방법으로 "회원"에게
                                    통지합니다.<br/><br/>3. "서비스"의 내용, 이용방법, 이용시간에 대하여 변경이 있는 경우에는 변경사유, 변경될 "서비스"의 내용 및 제공일자
                                    등은 그 변경 전에 해당 "서비스" 초기화면에 게시 합니다.<br/><br/>4. "회사"는 무료 수수료, 배송비 면제, 추가 정산 등 각종 프로모션
                                    이벤트의 일부 또는 전부를 해당 프로모션 예산 조기 소진 시 또는 "회사"의 정책 및 운영의 필요상 수정, 중단, 변경할 수 있으며, 이에 대하여
                                    "회원"에게 별도의 보상을 하지 않습니다.</p><p>&nbsp;</p><p><strong>제 12 조 ("게시물"의 저작권)</strong></p>
                                <p>1. "회원"은 저작권, 상표권 등 지식재산권, 개인정보 등 제3자의 권리를 침해하여서는 아니 되며, 저작권, 개인정보 보호 관련 규정 등 관련 법령을
                                    준수하기 위해 충분한 주의를 기울여야만 합니다. 만약 "회원"이 등록한 게시물이 제 3자의 저작권 등 권리를 침해한 경우, 그와 같은 침해에 대하여
                                    회사의 고의 또는 중과실이 인정되지 아니하는 한, 민형사상 모든 책임은 "회원" 당사자에게 있습니다.<br/><br/>2. "회원"은 "서비스"를
                                    이용함으로써 얻은 정보 중 "회사" 또는 “제휴 사업자”에게 지적재산권이 귀속된 정보를 "회사"의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송
                                    기타 방법에 의하여 영리목적으로 이용하거나 제 3자에게 이용하게 하여서는 안됩니다.<br/><br/>3. "회사"는 "회원"이 작성한 각종 게시물을
                                    판촉, 홍보 등의 목적으로 "서비스"에서 사용하는 것 외에도 "서비스" 제공에 필요한 범위에서 타 사이트에 복제, 배포, 전송, 전시할 수 있으며,
                                    본질적인 내용에 변경을 가하지 않는 범위 내에서 수정, 편집될 수 있습니다.<br/><br/>4. "회원"이 공개한 "게시물"은 "서비스"를 통해 전체
                                    "회원", 관련 제반 서비스에 공유될 수 있으며, "회사"는 해당 "게시물"을 "서비스"의 홍보, 안내 등의 목적으로 사용할 수
                                    있습니다.<br/><br/>5. "회사"가 작성한 저작물에 대한 저작권 및 기타 지적 재산권은 "회사"에 귀속합니다.</p><p>&nbsp;</p>
                                <p><strong>제 13 조 ("게시물"의 관리)</strong></p><p>1. 자동화된 수단을 활용하는 등 서비스의 기능을 비정상적으로 이용하여 게재된
                                    게시물, 서비스의 제공 취지와 부합하지 않는 내용의 게시물은 다른 이용자들의 정상적인 서비스 이용에 불편을 초래하고 더 나아가 서비스의 원활한 제공을
                                    방해하므로 역시 제한될 수 있습니다. 이용 제한의 대상이 될 수 있는 부적절한 게시물에 대한 상세한 내용은 본 약관 제24조의 규정 및 <strong>정보통신에
                                        관한 심의 규정</strong>, 기타 운영 정책 등을 참고해 주시기 바랍니다.<br/><br/>2. "회원"은 자신의 "게시물"이 타인의
                                    저작권이나 명예 등 제3자의 권리를 침해하지 않도록 주의하여야 합니다. "회사"는 이에 대한 문제를 해결하기 위해 "정보통신망법" 또는 "저작권법"
                                    등을 근거로 권리 침해 주장자의 요청에 따른 게시물 게시중단, 원 게시자의 이의신청에 따른 해당 게시물 게시 재개 등을 내용으로 하는 <strong>게시중단요청
                                        서비스</strong>를 운영하고 있습니다. 타인의 "게시물"로 인해 자신의 저작권이나 명예가 침해되었다고 생각하는 "회원"은 게시중단요청
                                    서비스를 통해 해당 "게시글"의 게시중단 요청을 할 수 있습니다.<br/><br/>3. "회사"는 전항에 따른 권리자의 요청이 없는 경우라도
                                    "전자상거래법", "정보통신망법", "저작권법", "정보통신에 관한 심의 규정"등 권리침해가 인정될 만한 사유가 있거나 기타 "회사" 정책 및 관련법에
                                    위반되는 경우에는 관련법에 따라 해당 "게시물"에 대해 임시조치 등을 취할 수 있습니다.<br/><br/>4. 본 조에 따른 세부절차는 "정보통신망법"
                                    및 "저작권법"이 규정한 범위 내에서 "회사"가 정한 "게시중단요청서비스"에 따르며, 부적절한 게시글을 게시한 "회원"에 대해서는 제7조 및 운영정책
                                    등에서 정한 바에 따라 이용제한 조치를 취할 수 있습니다.</p><p>&nbsp;</p><p><strong>제 14 조 (권리의 귀속)</strong>
                                </p><p>1. "서비스"에 대한 저작권 및 지적재산권은 "회사"에 귀속됩니다. 단, "회원"의 "게시물" 및 제휴계약에 따라 제공된 저작물 등은
                                    제외합니다.<br/><br/>2. "회사"는 서비스와 관련하여 "회원"에게 "회사"가 정한 이용조건에 따라 계정, "아이디", "포인트" 등을 이용할
                                    수 있는 이용권한만을 부여하며, "회원"은 이에 대한 양도, 판매, 담보제공 등의 처분행위를 할 수 없습니다.<br/><br/>3. "회사"가
                                    "서비스"를 제공함에 사용되는 보안 기술이나 소프트웨어에 대해 "회원"은 회피 또는 변경하려 시도를 하여서는 안되며, "서비스" 및 이에 필요한 기술
                                    또는 소프트웨어를 부정 사용 및 타인이 그렇게 하는 것을 조장하는 행위 등은 금지되어 있습니다. 만약 "회원"이 그와 같은 행위를 하는 경우 이에 대한
                                    모든 책임은 "회원" 본인에게 있습니다.</p><p>&nbsp;</p><p><strong>제 15 조 ("회사"의 의무)</strong></p>
                                <p>1. "회사"는 관련법령 및 이 약관 등에서 금지한 행위를 하지 않으며, 계속적이고 안정적으로 "서비스"를 제공하기 위하여 최선을 다하여
                                    노력합니다.<br/><br/>2. "회사"는 "회원"이 안전하게 "서비스"를 이용할 수 있도록 개인정보(신용정보 포함)보호를 위해 보안시스템을 갖추어야
                                    하며 개인정보보호정책을 공시하고 준수합니다.<br/><br/>3. "회사"는 서비스 이용과 관련하여 "회원"으로부터 제기된 의견이나 불만이 정당하다고
                                    인정할 경우에는 이를 처리하여야 합니다. "회원"이 제기한 의견이나 불만사항에 대해서는 게시판을 활용하거나 전자우편 등을 통하여 "회원"에게 처리과정
                                    및 결과를 전달합니다.</p><p>&nbsp;</p><p><strong>제 16 조 ("포인트")</strong></p><p>1. "회사"는 서비스의
                                    효율적 이용 및 운영을 위해 사전 공지 후 "포인트"에 대한 정책을 변경하거나 "포인트"의 일부 또는 전부를 조정할 수 있으며, "포인트"는 회사가
                                    정한 기간에 따라 주기적으로 소멸할 수 있습니다.<br/>(관련정책 : <Link
                                        href="https://kream.co.kr/faq/point">링크</Link>)<br/><br/>2. "회사"가 "회원"에게 "포인트"를
                                    적립하였더라도 추후 "회원"의 거래취소, 반품, 이벤트 부정 응모 등 "포인트" 적립이 무효 또는 취소되거나 "포인트"가 부정한 방법으로 적립되었을
                                    경우 그에 상응하는 "포인트"는 자동 차감될 수 있습니다.<br/><br/>3. 전항에 따른 "포인트" 자동 차감 시 "회원"의 "포인트" 잔액이
                                    "포인트" 차감 분 보다 적을 경우 "마이너스(-) 포인트"로 관리되며, 추후 "회원"이 적립하는 "포인트"와 상계됩니다.<br/><br/>4. 1)
                                    "회원"이 "회사"와의 계약을 해지(탈회)하거나 기타 사유로 인하여 서비스 이용 자격을 박탈 당하는 등의 사유가 발생할 경우 또는 2) "회사"의
                                    정책상 "마이너스(-) 포인트"에 대한 청구를 진행하거나 관리 방법을 변경하기로 결정한 경우에는 "회사"가 해당 "회원"에게 마이너스(-) 1포인트 당
                                    한화(KRW) 1원으로 산정한 금액을 청구할 수 있습니다.</p><p>&nbsp;</p><p><strong>제 17 조 ("대리행위의
                                    부인")</strong></p><p>1. "회사"는 "상품" 거래의 당사자가 아닌 중개자로서 "회원" 상호 간의 거래에 대해서 효율적인 서비스를 위한
                                    시스템 운영 및 관리 책임만을 부담하며, "상품"의 거래와 관련하여 "구매자" 또는 "판매자"를 대리하지 아니합니다. "회원" 사이에 성립된 거래 및
                                    "회원"이 제공하고 등록한 정보에 대해서는 해당 "회원"이 그에 대한 모든 책임을 부담하여야 합니다.<br/><br/>2. “회사”는 “제휴 사업자
                                    판매 상품” 거래의 당사자가 아닌 중개자로서 “회원”과 “제휴 사업자” 간의 거래에 대해서 효율적인 서비스를 위한 시스템 운영 및 관리 책임만을
                                    부담하며, “제휴 사업자 판매 상품”의 거래와 관련하여 “제휴 사업자” 또는 “회원”을 대리하지 아니합니다. “회원”과 “제휴 사업자” 사이에 성립된
                                    거래 및 “제휴 사업자”가 제공하고 등록한 정보에 대해서는 “제휴 사업자”가 통신판매업자로서의 책임을 부담하고, 해당 “회원”과 “제휴 사업자”가
                                    당사자로서 책임을 부담하여야 합니다.</p><p>&nbsp;</p><p><strong>제 18 조 ("보증의 부인")</strong></p><p>1.
                                    "회사"가 제공하는 시스템을 통하여 이루어지는 "구매자"와 "판매자" 간의 거래와 관련하여 판매의사 또는 구매의사의 존부 및 진정성, 등록 "상품"의
                                    품질, 완전성, 안전성, 적법성, 및 타인의 권리에 대한 비침해성, "구매자" 또는 "판매자"가 입력하는 정보 및 그 정보를 통하여 링크된 URL에
                                    게재된 자료의 진실성 또는 적법성 등 일체에 대하여 "회사"는 보증하지 아니하며, "판매자"가 "상품"의 정보를 고의적으로 속일 경우에는 모든 책임은
                                    "판매자"에게 있습니다. 단, "회사"는 검수센터의 과실로 인한 검수 실책에 대한 내용에 대해서는 관련 법령 및 본 약관에 따른 책임을
                                    부담합니다.<br/><br/>2. "회사"가 제공하는 시스템을 통하여 이루어지는 "회원"과 "제휴 사업자" 간의 거래와 관련하여 판매의사 또는
                                    구매의사의 존부 및 진정성, 등록 "제휴 사업자 판매 상품"의 품질, 완전성, 안전성, 적법성, 및 타인의 권리에 대한 비침해성, "회원" 또는 "제휴
                                    사업자"가 입력하는 정보 및 그 정보를 통하여 링크된 URL에 게재된 자료의 진실성 또는 적법성 등 일체에 대하여 "회사"는 어떠한 보증도 하지
                                    아니하며, "제휴 사업자"가 그의 고의 또는 과실로 "상품"의 정보를 정확하게 알리지 아니하는 경우 모든 책임은 "제휴 사업자"에게 있습니다.<br/><br/>3. <strong>“제휴
                                        사업자 판매 상품”에 대하여서는 “회사”의 검수 서비스 및 검수와 관련된 보증이 제공되지 않습니다.</strong><br/><br/>4.
                                    "판매자" 및 “제휴 사업자”는 "상품"의 판매로 인하여 관세법 등에서 정한 내용에 위반되지 않도록 세금 납부 등 판매에 필요한 절차를 본인의 책임으로
                                    이행하여야 하며, "회사"는 "판매자" 및 “제휴 사업자”의 "상품" 등록 또는 판매로 인한 법령 위반에 대해 책임을 부담하지 않습니다.</p>
                                <p>&nbsp;</p><p><strong>제 19 조 (개인정보보호 의무)</strong></p><p>"회사"는 이용계약 체결 과정에서 가입신청자의 이메일
                                    주소 등의 정보를 수집할 수 있으며, "회사"는 "개인정보보호법" 등 관계 법령이 정하는 바에 따라 "회원"의 "개인정보"를 보호하기 위해 노력합니다.
                                    "개인정보"의 보호 및 사용에 대해서는 관련법 및 "회사"의 개인정보보호정책이 적용됩니다.</p><p>&nbsp;</p><p><strong>제 20 조
                                    ("회원"에 대한 통지)</strong></p><p>1. "회사"가 "회원"에 대한 통지를 하는 경우 이 약관에 별도 규정이 없는 한 "회원"이 지정한
                                    전자우편주소, 서비스 내 전자메모 및 쪽지 등으로 할 수 있습니다.<br/><br/>2. "회사"는 "회원" 전체에 대한 통지의 경우 7일 이상
                                    "회사"의 게시판에 게시함으로써 제1항의 통지에 갈음할 수 있습니다.</p><p>&nbsp;</p><p><strong>제 21 조 (부적절
                                    행위)</strong></p><p>1. "회사"는 본 약관에서 명시한 사항들과 관련법령 및 상거래의 일반 원칙을 위반하는 부적절 행위를 행한
                                    "회원"에게 "서비스"의 이용에 대한 제재를 가할 수 있으며, 필요한 경우 관련 법령에 따라 민형사상의 책임 물을 수 있으니 "서비스" 이용에 주의
                                    부탁드립니다.<br/><br/>2. "회원"이 다음의 사유에 해당하는 부적절 행위를 한 경우 "회사"는 사전 통보없이 해당 "회원" 이 등록한 내용을
                                    삭제조치하고 "회원"의 "서비스" 이용을 제한하거나 "회원" 자격을 상실시킬 수 있습니다.</p>
                                <ul>
                                    <li>타인의 정보도용</li>
                                    <li>"서비스"에서 예정하고 있거나 "회사"가 허락한 범위를 벗어나 영리를 목적으로 서비스를 사용하는 행위</li>
                                    <li>"서비스"에 허위정보 등록</li>
                                    <li>거래부적합 상품 등록</li>
                                    <li>과대, 과장 광고 (스팸성 홍보글, 도배행위 등)</li>
                                    <li>"회사"의 승인을 구하지 않은 상업성 광고 (개인사업자, 법인의 자사홍보등)</li>
                                    <li>대가를 받고 게시물을 작성하였음에도 이러한 사실을 추천・보증 등에 관한 심사지침에서 정한 방식에 따라 밝히지 않은 게시물</li>
                                    <li>결제부정행위 (타인의 명의나 카드정보, 계좌정보 등을 도용하여 회사가 제공하는 구매 서비스를 이용하는 행위는 금지됩니다.)</li>
                                    <li>시스템의 오류를 회사에 알리지않고 해당 오류를 이용해 이득을 취하는 행위(동일 전화번호로 인증을 반복하여 포인트를 취하는 행위 등)</li>
                                    <li>타인의 전화번호 또는 이메일을 도용하거나 허위로 이메일을 기재하여 이득을 취하는 행위</li>
                                    <li>"회사"가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                                    <li>기타 관련법령, 본 약관의 규정, 이용안내 및 "서비스"와 관련하여 공지한 주의사항, "회사"가 통지하는 사항을 위반한 행위</li>
                                    <li>"회사"의 업무에 방해되거나 기타 "회사"가 필요하다고 판단하는 경우</li>
                                    <li>검수 타이 또는 검수 실링(VOID 스티커) 등 검수 완료 증표의 위변조 행위 및 타 상품, 물품 등에 대한 검수 완료 증표 재체결 행위
                                    </li>
                                    <li>타인의 개인정보를 이용하여 거래 또는 주문하는 행위</li>
                                    <li>"회원"이 "서비스" 이외의 경로를 통하여 임의로 상품 매매계약을 체결한 후 "서비스"를 통해 해당 계약의 구매자에게 직접 발송되도록 거래 또는
                                        주문하는 행위
                                    </li>
                                    <li>"회사"의 "서비스" 이미지, 등 상표, 저작물 등의 전부 또는 일부를 무단히 이용·도용하거나 별도의 계약관계 내지 협력관계가 존재하지
                                        아니함에도 마치 "회사"와 관계가 있는 것과 같이 오인하게 하여 "서비스"와의 혼동을 주거나 이에 편승하고자 하는 행위
                                    </li>
                                    <li>“제휴 사업자”가 아닌 사업자의 “서비스” 이용 또는 거래 시도</li>
                                    <li>“제휴 사업자”의 “KREAM EXCLUSIVE DROPS” 및 “B2C 상품 페이지” 이외의 “서비스” 이용 또는 거래 시도</li>
                                    <li>부정거래(시세조작 행위, 자전거래 등) 시도</li>
                                </ul>
                                <p>3. <strong>“회원”은 “이상 고가 거래” 또는 “이상 저가 거래”와 같은 거래 시도 또는 거래 체결에 대하여 보관판매 서비스 등 거래 형태를
                                    불문하고 “회사”가 사전 통보없이 (1) “거래 체결” 이전인 경우 해당 “회원”이 등록한 내용, 입찰 또는 체결 시도를 삭제∙취소 또는 거래 제한
                                    조치하고, (2) “거래 체결” 이후인 경우 거래 상대방인 “회원”(“이상 고가 거래” 시 “구매자”, “이상 저가 거래” 시 “판매자”를 의미함)의
                                    의사를 확인한 후 기 체결된 거래를 취소할 수 있다는 점을 확인하고 이에 동의합니다.</strong><br/><br/>4. “회원”은 본조 제3항의
                                    “이상 고가 거래” 또는 “이상 저가 거래” 등의 거래 시도 또는 거래 체결에 대한 취소 등의 조치가 “회원”의 조작 실수, 착오로 인한 사고 발생을
                                    예방하고, “회원”의 조작 실수를 유도하거나 “상품” 시세를 조작하여 건전한 거래 질서를 어지럽히려는 시도 등 각종 거래 사고와 부정거래 등을 방지하기
                                    위하여 “회사”가 부득이 취하는 조치임을 이해하고 동의하며, “이상 고가 거래” 및 “이상 저가 거래” 취소 등에 관한 구체적인 사항은 이용정책에
                                    정하여진 바에 따릅니다.<br/>(관련정책 : <Link href="https://kream.co.kr/faq/fake_price">링크</Link>)<br/><br/>5.
                                    “회사”는 해당 입찰/거래에서의 “상품” 입찰 또는 체결 가격, 해당 “상품”의 과거 거래 체결가, 제조사 또는 주요 대형 유통사에서 책정한 해당
                                    “상품”의 판매가 등을 기준으로 본조 제3항에 따른 취소 등의 대상이 되는 “이상 고가 거래” 또는 “이상 저가 거래” 여부를
                                    판단합니다.<br/><br/>6. “회사”와 거래 상대방인 “회원”(“이상 고가 거래” 시 “구매자”, “이상 저가 거래” 시 “판매자”를 의미함)은
                                    본조 제3항에 따라 이루어진 “회원”의 등록 내용, 입찰 또는 체결 시도에 대한 삭제∙취소∙거래 제한 조치 또는 “거래 체결” 건 취소 조치 등과
                                    관련하여 거래 재체결, 재진행, 재입찰, “상품” 매입/판매 또는 손해배상(시세 등락에 관한 사항 포함) 등 어떠한 의무나 책임도 부담하지 아니합니다.
                                </p><p>&nbsp;</p><p><strong>제 22 조 (거래 적합 대상 품목 및 상품 등록)</strong></p><p>1. "회원"은 신발, 의류,
                                    액세서리 등 "회사"가 거래 적합 대상으로 정한 품목 및 목록에 대해서만 거래를 하여야 하며, "회사"는 거래적합대상 품목 및 목록에 대해서
                                    공지사항으로 고지하거나 등록 가능 상품 지정(또는 제한) 등의 방법으로 "회원"이 알 수 있도록 합니다.<br/><br/>2. "서비스"에서는
                                    "회사"가 등록 대상으로 삼은 "상품"만이 거래의 대상이 될 수 있습니다. "회원"은 거래적합대상 품목에 속하지 않은 상품(이하 ‘거래 부적합
                                    상품’)에 대해서는 "서비스"를 통해 거래를 하여서는 안되며, "회사"는 "거래 부적합 상품"에 대해서는 서비스 또는 검수, 보증 의무를 부담하지
                                    않습니다. 또한 "회원"이 "거래 부적합 상품"을 등록할 경우, "회사"는 사전 통보없이 해당 "회원"이 등록한 내용을 삭제조치하고 , "회원"의
                                    "서비스" 이용을 제한하거나 "회원" 자격을 상실시킬 수 있습니다.<br/><br/><strong>3. "회원"은 "상품" 등록 시 "상품"을 구매한
                                        영수증 또는 인보이스(이하 ‘영수증 등’)를 포함하는 것을 권장합니다. 그러나 미사용 Secondhand 제품을 거래 대상 "상품"으로 하는
                                        "서비스"의 특성 상, 실제 제품 외에 "판매자"가 "상품"을 구매하였을 때 수령한 영수증 등을 등록하는 것을 필수로 요구하지는 않습니다.
                                        "구매자"는 "상품"에는 영수증 등이 포함되지 않을 수 있다는 점에 동의하며, 영수증 등이 포함되지 않아 "상품"의 제조사로부터 A/S를 받지
                                        못하는 등의 불이익이 발생한 경우 "회사" 및 "판매자"는 책임을 부담하지 않습니다.</strong></p><p>&nbsp;</p><p>
                                    <strong>제 23 조 (거래 신청 및 계약의 성립 등)</strong></p><p>1. "회사"는 "판매자"가 등록한 "상품"의 원활한 거래를
                                    위하여 SNS(인스타그램, 페이스북, 트위터 등), 블로그, 커뮤니티 사이트 등 다양한 홍보 채널에 "상품"을 노출할 수 있습니다. 다만, "회원"은
                                    "상품"의 노출을 원치 않는 경우 "회사"에 홍보 채널에서의 노출 제외를 요청할 수 있습니다.<br/><br/>2. "구매자" 또는 "판매자"는 자신이
                                    구매 또는 판매하고자 하는 "상품"의 가격을 자유롭게 정할 수 있으며, 판매 및 구매 등 거래신청에 대한 승낙의 표시가 "판매자"와 "구매자" 상호간
                                    합의하에 이루어진 경우, "거래 체결"이 된 것으로 봅니다.<br/><br/>3. 전항에도 불구하고 “제휴 사업자 판매 상품”의 경우 “회원”의 구매
                                    신청에 대하여 “제휴 사업자”로부터 위탁 받은 “회사”가 수신 확인 통지를 함으로써 매매 계약이 성립합니다. 해당 수신 확인 통지에는 “회원”의 구매
                                    신청에 대한 확인 및 판매 가능 여부, 구매 신청의 정정 취소 등에 관한 정보 등을 포함합니다.<br/><br/>4. “회사”는 “제휴 사업자 판매
                                    상품”에 대한 “회원”의 구매 신청에 대하여 신청 내용에 허위, 기재누락, 오기가 있는 경우, 관련 법령에 의하여 미성년자가 구입할 수 없는 제품 또는
                                    용역을 미성년자가 구매하는 경우, 해당 제품 등이 품절된 경우, 해당 구매 신청이 제21조 부적절행위 등 본 약관 위반에 해당하는 경우 또는 기타
                                    구매신청에 승낙하는 것이 “회사”의 기술상 현저히 지장이 있다고 판단될 경우에는 승낙하지 않을 수 있습니다.<br/><br/>5. 미성년자가
                                    법정대리인의 동의를 얻지 못하고 상품을 서비스에 등록해 파는 것이 확인된 경우 "회사"는 사전 통보없이 계약을 해지할 수 있습니다.<br/><br/>6.
                                    "회원" 은 자신이 "판매자"로 등록한 제품의 정보를 "거래 체결"이 이뤄지기 전에 삭제하거나 수정할 수 있습니다.<br/><br/>7. "회원"은
                                    "상품" 판매를 위하여 "상품"가격을 등록할 수 있으며, 등록한 "상품"은 "거래체결" 전까지 철회하는 것이 가능합니다. "거래체결" 이후에는
                                    "회사"가 정한 일정 취소 수수료를 부담해야 취소 가능하며, "회사"는 취소 수수료에 대해서 별도 공지 사항 등으로 고지합니다.<br/><br/>8.
                                    "회사"는 전자상거래법에서 정한 바에 따라 거래 당사자들에게 상대방에 관한 정보를 열람할 수 있도록 하며, "판매자" 또는 "구매자"가 상대방 당사자에
                                    대한 성명, 전화번호 등 법에서 정한 정보를 요청하는 경우 이를 제공할 수 있습니다.</p><p>&nbsp;</p><p><strong>제 24 조
                                    ("서비스수수료")</strong></p><p>1. "회사"가&nbsp;부과하는 "서비스수수료"는
                                    "상품"의&nbsp;중개&nbsp;및&nbsp;검수&nbsp;등&nbsp;제반
                                    "서비스"를&nbsp;이용함에&nbsp;따라&nbsp;부과되는&nbsp;이용료로서&nbsp;거래&nbsp;완료&nbsp;시,&nbsp;대금&nbsp;결제/지급&nbsp;시&nbsp;또는&nbsp;부가서비스&nbsp;제공&nbsp;시&nbsp;등에&nbsp;부과될&nbsp;수&nbsp;있습니다.
                                    "회사"는&nbsp;서비스&nbsp;제공&nbsp;비용,&nbsp;시장상황,&nbsp;취급품목,&nbsp;거래방식등을&nbsp;고려하여
                                    "회원"에게&nbsp;제공하는 "서비스"에&nbsp;대한&nbsp;서비스수수료를&nbsp;정합니다.<br/><br/>2. "회사"는&nbsp;각
                                    "서비스"&nbsp;및&nbsp;서비스이용료의&nbsp;구체적인&nbsp;내용(서비스의&nbsp;내용,&nbsp;이용&nbsp;방법,&nbsp;실시&nbsp;기간,&nbsp;수수료율&nbsp;등)을
                                    KREAM&nbsp;사이트의&nbsp;공지사항&nbsp;또는&nbsp;판매자/구매자&nbsp;화면에&nbsp;별도로&nbsp;게시합니다.<br/>(관련정책
                                    : <Link href="https://kream.co.kr/faq/service_fee">링크</Link>)<br/><br/>가. 거래완료 수수료 및
                                    페널티 등<br/>1) 거래&nbsp;수수료는 "회사"가&nbsp;제공하는&nbsp;시스템을&nbsp;통하여 "상품"을&nbsp;거래한
                                    "판매자"와&nbsp;“구매자”에게&nbsp;아래와&nbsp;같이&nbsp;각&nbsp;부과됩니다.&nbsp;수수료&nbsp;결제&nbsp;실패&nbsp;또는&nbsp;수수료가&nbsp;정상&nbsp;결제되지&nbsp;않은&nbsp;경우&nbsp;해당&nbsp;“판매자”&nbsp;또는&nbsp;“구매자”의&nbsp;“거래&nbsp;체결”이&nbsp;제한되며,&nbsp;해당&nbsp;거래&nbsp;및&nbsp;입찰&nbsp;등&nbsp;거래&nbsp;시도의&nbsp;효력이&nbsp;인정되지&nbsp;않습니다.
                                </p>
                                <ul>
                                    <li>“회사”는&nbsp;“판매자”에게&nbsp;해당&nbsp;“상품”&nbsp;판매&nbsp;대금&nbsp;정산&nbsp;지급&nbsp;시&nbsp;“판매자”에&nbsp;대한&nbsp;거래&nbsp;수수료에&nbsp;해당하는&nbsp;금액을&nbsp;공제하고&nbsp;지급할&nbsp;수&nbsp;있습니다.</li>
                                    <li>“회사”는&nbsp;“구매자”의&nbsp;“상품”&nbsp;구매&nbsp;대금&nbsp;결제&nbsp;시&nbsp;“상품”&nbsp;구매&nbsp;대금에&nbsp;“구매자”에&nbsp;대한&nbsp;거래&nbsp;수수료를&nbsp;합산한&nbsp;금액을&nbsp;결제할&nbsp;수&nbsp;있습니다.
                                        (결제&nbsp;방식&nbsp;등은&nbsp;제25조에서&nbsp;안내하고&nbsp;있는&nbsp;바와&nbsp;동일함.)
                                    </li>
                                </ul>
                                <p>2)
                                    귀책사유가&nbsp;있는&nbsp;"판매자"&nbsp;또는&nbsp;“구매자”의&nbsp;경우에는&nbsp;거래가&nbsp;최종적으로&nbsp;완료되었는지나&nbsp;반품&nbsp;여부에&nbsp;관계없이&nbsp;거래&nbsp;수수료가&nbsp;환불되지&nbsp;않을&nbsp;수&nbsp;있습니다.&nbsp;단,
                                    “판매자”&nbsp;또는&nbsp;“구매자”가&nbsp;해당&nbsp;귀책사유로&nbsp;인하여&nbsp;취소수수료&nbsp;또는&nbsp;페널티를&nbsp;부과받은&nbsp;경우에는&nbsp;거래&nbsp;수수료를&nbsp;별도로&nbsp;부과하지&nbsp;아니하거나&nbsp;거래&nbsp;수수료를&nbsp;환불&nbsp;처리할&nbsp;수&nbsp;있습니다.<br/>3)
                                    입찰 방식을 제공하고, 정품을 보장하는 "서비스"의 특성에 따라 부득이하게 "판매자"의 배송 지연 또는 거부, 검수 불합격, "판매자"의 판매 취소 등
                                    "판매자"의 귀책사유로 인해 거래가 취소되는 경우에는 "판매자"에게 취소수수료 또는 페널티가 추가로 부과될 수 있습니다. 또한 "판매자"의 귀책사유로
                                    인한 거래 취소 시 해당 "상품" 판매를 위해 "회사"가 "구매자"에게 제공한 쿠폰, 적립금 등이 있는 경우에는 해당 금액에 대해서도 반환 청구될 수
                                    있습니다. "판매자"의 경우 취소수수료 또는 페널티 수수료는 "판매자"가 등록한 카드에서 자동 결제됩니다.<br/><br/>나. "회원"이 페널티 결제
                                    방법으로 카드를 등록한 경우 페널티 수수료는 "회원"이 동의한 다음 각 호의 규정에 따라 페널티 부과 요건 발생 시 "회원"이 등록한 카드에서 자동
                                    결제됩니다.<br/>1) "회원"은 "판매자"로서 "상품" 등록 시 동의한 ‘페널티 부과 규정’에 따라 페널티 수수료 발생 시 별도의 인증과정 없이
                                    페널티 수수료가 결제될 수 있음을 이해하고 이에 동의합니다.<br/>2) 자동결제 시점에 회원의 신용카드 등의 유효성, 한도 등의 문제로 결제 실패가
                                    발생한 경우에 미수로 처리되며, 해당 미수 금액이 정상적으로 결제되기 전까지 해당 "회원"은 서비스 이용이 제한될 수 있습니다.<br/>3) "회원"은
                                    제2호에 따라 미수가 발생한 경우, "회사"가 (i) "회사"의 정책에 따라 "회원"에 대한 별도 고지 없이 "회원"이 등록한 결제수단으로 재결제
                                    시도를 진행하거나 (ii) "회원"의 별건 신규 판매 거래 발생 시 해당 거래 대금 정산을 보류하거나 종래 발생한 페널티 수수료 금액을 차감한 후
                                    정산할 수 있음을 이해하고 이에 동의합니다.<br/>4) 결제 시점에 시스템 장애로 인하여 결제 실패가 된 경우에는, 시스템 정상화가 된 시점에
                                    "회원"에 대한 별도 고지 없이 다시 결제를 진행합니다.<br/><br/>다. "회사"는 필요한 경우 서비스 수수료를 신설, 변경할 수 있으며,
                                    "회사"는 판매 활성화 등을 위하여 서비스이용료 범위 내에서 특정 "상품"에 대한 서비스 수수료를 할인할 수 있습니다. 또한 "회사"는 특정 판매자에
                                    대한 서비스 수수료를 판매실적, "회원"의 특성 등 "회사"가 정하여 사전에 공지사항 등을 통하여 공지한 일정한 기준과 절차에 따라 감경 또는 면제할
                                    수 있습니다.</p><p>&nbsp;</p><p><strong>제 25 조 (대금결제)</strong></p><p>1. "상품"의 매매계약은 "회원"이
                                    "회사" 또는 "판매자"가 제시한 "상품"의 판매 조건에 응하여 "구매자"가 구매의 의사표시를 하거나 "구매자"의 구매 조건에 응하여 "판매자"가 판매
                                    의사를 표시함으로써 체결됩니다.<br/><br/>2. “제휴 사업자 판매 상품”의 매매계약은 “회원”이 “제휴 사업자”가 “KREAM EXCLUSIVE
                                    DROPS” 및 “B2C 상품 페이지”를 통하여 제시한 “제휴 사업자 판매 상품”의 판매 조건에 응하여 구매 신청의 의사표시를 하고 이에 대하여 “제휴
                                    사업자”로부터 위탁 받은 “회사”가 제23조 제3항의 수신확인통지형태로 승낙함으로써 체결됩니다.<br/><br/>3. "회사"는 "회원"이 현금, 카드
                                    기타의 방법으로 매매 대금을 결제할 수 있는 방법을 제공합니다. 다만, "회원"의 신용도 조작, "상품"가격 교란 행위 방지 등을 위해 부득이 카드
                                    결제 등 일정한 결제 방법만을 허용할 수 있으며, 이를 위해 "거래체결" 또는 “제휴 사업자 판매 상품”에 대한 청약의 의사표시에 앞서 사전에
                                    카드정보를 등록하도록 할 수 있습니다. 매매 대금의 결제와 관련하여 구매자 또는 “회원”이 입력한 정보 및 그 정보와 관련하여 발생한 책임과 불이익은
                                    전적으로 "구매자" 또는 “회원”이 부담하여야 합니다.<br/><br/>4. 시세가 변동되는 "상품"을 입찰에 따라 거래하도록 하는 "서비스"의 특성
                                    상 허위 거래 등을 방지하기 위해 입찰에 따른 거래체결 시 또는 즉시 구매 시 등록된 카드에서 결제가 진행되며, "상품"을 주문한 후 일정 기간 내에
                                    매매대금이 결제되지 않을 경우 "회사"는 당해 주문을 회원의 동의 없이 취소할 수 있습니다.<br/><br/>5. “제휴 사업자 판매 상품”에 대한
                                    매매대금이 정상적으로 결제되지 않을 경우 “회사”는 당해 주문을 “회원”의 동의 없이 취소할 수 있습니다.<br/><br/>6. "회사"는 "구매자"의
                                    "상품" 매매계약 및 “제휴 사업자 판매 상품” 매매계약 체결 내용을 구매 내역을 통해 확인할 수 있도록 조치하며, 매매계약의 취소 방법 및 절차를
                                    안내합니다.<br/><br/>7. "회사"는 "구매자" 또는 “회원”이 매매대금 결제 시 사용한 결제 수단에 대해 정당한 사용권한을 가지고 있는지의
                                    여부를 확인할 수 있으며, 이에 대한 확인이 완료될 때까지 거래 진행을 중지하거나, 확인이 불가한 해당 거래를 취소할 수 있습니다. 특히, 고액결제의
                                    경우 안전을 위해 카드사에서 확인전화를 드릴 수도 있습니다. 확인과정에서 도난 카드의 사용이나 타인 명의의 주문 등 정상적인 주문이 아니라고 판단될
                                    경우 임의로 주문을 보류 또는 취소할 수 있습니다.<br/><br/>8. 체크카드 잔액부족, 유효기간이 지난 카드가 등록되어 상품 구매가 불발된 경우,
                                    타인의 결제로 인한 "상품" 또는 “제휴 사업자 판매 상품” 구매 실패는 당사가 책임지지 않습니다.<br/><br/>9. “회원”은 “상품” 또는
                                    “제휴 사업자 판매 상품”의 대금 결제와 관련하여 “회원”이 입력한 정보 및 그 정보와 관련하여 발생하는 제반 문제에 대한 책임을 부담합니다.</p>
                                <p>&nbsp;</p><p><strong>제 26 조 (거래체결 완료 "상품"의 처리)</strong></p><p>1. 주문 처리에는 "구매자"의 신용카드
                                    승인, 판매자의 배송, 당사의 "상품"판정 및 주문"상품"의 포장에 걸리는 시간이 소요됩니다. 주문 처리 이후에는 "회사"에서 귀하의 배송지로
                                    "상품"이 배달됩니다.<br/><br/>2. 제공된 주문 처리시간에 맞추어 출고를 할 수 있도록 최선을 다함에도 불구하고, "상품"의 공급 가능 일정은
                                    판매자의 "상품"배송 지연, "상품"판정 소요시간, 배송업체의 내부 상황, 기상악화로 인한 천재지변등에 의해 언제든지 변경될 수
                                    있습니다.<br/><br/>3. "회원" 또는 "구매자"의 주문 관련 문의는 "회사" 고객센터 (1588-7813)로 연락하여 주시거나 "서비스" 내
                                    1:1문의를 통해 문의 할 수 있습니다.</p><p>&nbsp;</p><p><strong>제 27 조 (검수 등)</strong></p><p>1.
                                    "회사"는 별도의 검수센터를 운영하고 있습니다. "거래체결"이 되어 판매자로부터 배송된 "상품"에 대하여 "회사"가 운영하는 검수센터의 전문가 그룹을
                                    통해 철저하게 검수함을 원칙으로 합니다. 검수과정에서 "상품"의 하자, 구성품의 누락, 사이즈 오류, 가품 판정 등의 사유에 의해 판매가 거절 될 수
                                    있습니다.<br/><br/>2. 검수기준에 대해서는 "서비스"내 별도 고지하는 내용에 따릅니다. 단, "상품"의 정품 여부 이외의 사항 중 "회사"가
                                    제공하는 검수 기준에 명시되어 있지 않거나 검수 기준 범위 내에 해당하는 사항(단순 불량, 경미한 오염 및 훼손, 원제조업체 공정상 오류 등)은 검수
                                    합격에 따른 보장 대상에 포함되지 아니하고, "회사"는 이에 대하여 책임지지 아니합니다.<br/><br/>3. 미사용 Secondhand인 "상품"의
                                    특성에 따라 "회사"는 "상품"에 영수증 등이 포함되지 않은 것은 "검수 불합격 상품"으로 판단하지 않으며, 원제조업자가 A/S를 위해서 영수증 등을
                                    필수적으로 요구함에도 "판매자"가 영수증 등을 포함하지 않고 판매한 "상품"에 대해서는 "회사"는 이를 "검수 불합격 상품"으로 보지
                                    않습니다.<br/><br/>4. 전문가 그룹의 종합적인 검수에 따라 검수 기준에 미달(가품판정, 이상"상품", 구성품누락, 사이즈 오류 등, 이하
                                    "검수 불합격 상품"이라 합니다)하는 것으로 확정 되면, 판매가 즉시 중단되며 거래가 취소됩니다. "검수 불합격 상품"은 판매자에게 즉시 반송처리
                                    진행되며 사전 고지된 페널티 부과 규정에 따라 페널티 수수료 등이 부과됩니다. 또한 고의적으로 이상"상품" 또는 상표법 위반의 가품을 판매한다고
                                    판단되는 판매자는 페널티 부과와 별도로 "회사"의 서비스 이용이 일시 또는 영구적으로 제한될 수 있습니다.<br/><br/>5. 판매 등록되어 배송된
                                    "상품"이 "검수 불합격 상품"에 해당하여 반송되는 경우, "회사"는 "판매자"가 최초 등록한 주소로만 반송하며 "회원"이 "상품"과 함께 보낸
                                    영수증이 반환되는 것을 보장하지 않습니다.<br/><br/>6. "검수 불합격 상품" 중 가품으로 판정된 상품에 대해서는 상표법 등 관계 법령 위반
                                    혐의로 수사기관에 신고될 수 있으며, 가품으로 판정된 해당 상품은 수사기관에 제출, 압수 등으로 인해 "회원"에게 반환되지 않을 수 있습니다.<br/><br/>7.
                                    회사"는 원제조업체의 자체 실링 또는 밀봉(스티커, 테이프 등 형태 불문, 이하 "자체 실링")이 존재하여 이를 개봉할 경우 가치가 현저히 감소되는
                                    "상품"에 대하여서는 검수 시 별도로 "자체 실링"을 개봉하지 아니하고 확인할 수 있는 외관상 이상 여부만을 확인하여 검수 합격 여부를
                                    결정합니다.<br/><br/>8. <strong>“제휴 사업자 판매 상품”에 대하여서는 “회사”의 검수 서비스 및 검수와 관련된 보증이 제공되지
                                        않습니다.</strong><br/><br/>&nbsp;</p><p><strong>제 28 조 (배송 등)</strong></p><p>1.
                                    "판매자"와 "구매자" 간 거래에 대해서 "판매자"는 "거래체결"의 확인 통지를 받은 후 "회사"가 공지사항 또는 별도 안내 사항 등으로 고지한 시간
                                    이내에 발송정보 입력 지원이 제공되어 "회사"가 배송 현황을 파악할 수 있는 방식으로 해당 "상품"을 발송하여야 합니다. "판매자"는 반드시 "상품"
                                    발송을 완료한 후 "회사"가 제공한 시스템에 배송정보를 정확히 입력해야 합니다. 배송정보를 잘못 입력하거나 허위로 입력한 경우, "회사"가 배송 현황을
                                    파악할 수 없는 방식으로 "상품"을 발송하는 경우 또는 "상품" 발송을 지체한 경우 계약해지, 페널티 부과, 판매 자격 제한 등의 불이익을 받을 수
                                    있습니다. 공휴일 및 기타 휴무일 또는 천재지변, 명절 기간, 배송업체 파업 등 불가항력적인 사유가 발생한 경우 그 해당기간은 배송 소요기간에서
                                    제외됩니다. 또한 "판매자"의 배송비는 "판매자"가 부담하는 것을 원칙으로 하며, "상품" 발송 시 착불을 선택하는 경우 "회사"는 거래대금에서
                                    배송비를 공제하거나 제24조 페널티 수수료 부과를 위해 등록한 카드에서 결제할 수 있습니다.<br/>(관련정책 : <Link
                                        href="https://kream.co.kr/faq/penalty">링크</Link>)<br/><br/>2. "판매자"는 최선의 방법으로
                                    배송을 진행해야 하며, 배송에 문제가 발생 시 지체 없이 "회사"에 알려 "회사" 및 "구매자"에게 손해가 발생하지 않도록 하여야 합니다. 통지를
                                    지체하여 손해가 발생 했을 때에는 "판매자"의 귀책사유에 따라 배상 의무가 발생할 수 있습니다.<br/><br/>3. "회사"는 "회원" 상호 간
                                    거래된 "상품"에 대해 "판매자"로부터 "상품"을 제공 받아 검수를 진행하며, "판매자"로부터 전달 받은 "상품"이 검수를 통과한 경우 해당 "상품"을
                                    "구매자"에게 지체없이 배송합니다. 구매자의 배송비는 최초 "상품" 결제 시 청구되며, 예외적으로 구매실적, 이벤트 등에 의하여 면제될 수
                                    있습니다.<br/><br/>4. 검수가 완료된 "상품"은 보통 검수 완료 후 2-5 영업일 이내에 배송됩니다. 해외 배송은 원칙적으로 불가하고,
                                    대한민국 내의 주소지로만 배송이 가능합니다. 또한, 도서산간지역 배송의 경우 배송업체의 사정에 따라 늦어지는 경우도 있습니다.<br/><br/>5.
                                    "상품" 포장이 완료된 "상품"은 배송지를 변경하는 것이 불가능합니다. 배송 진행 과정에서의 정보 변경은 도움을 드리기 어려울 수 있으며, 배송완료와
                                    동시에 "상품"의 분실에 대한 모든 권리와 책임은 "구매자" 및 대리 수취인에게 있습니다.<br/><br/>6. "회사"의 검수 과정에 합격하여
                                    "구매자"에게 출고 완료된 "상품"이 배송 중 사고(훼손, 오염, 도난 등 포함)로 인하여 멸실 또는 훼손된 경우, "구매자"는 사고 배송업체의 보상
                                    정책에 따라 보상 받게 됩니다. 보상 절차 진행에 필요한 경우 "회사" 또는 사고 배송업체는 "구매자"로부터 해당 "상품" 실물을 수령하여 멸실, 훼손
                                    정도를 확인할 수 있습니다. 구체적인 보상의 범위는 사고 배송업체의 보상 정책에 따르되, 해당 "판매자"와 "구매자" 간 거래체결 금액을 초과하지
                                    않습니다.<br/>(관련정책 : <Link
                                        href="https://kream.co.kr/faq/ship_compensation">링크</Link>)<br/><br/>7. "회사"는
                                    전항에 따라 해당 "상품" 실물을 수령한 날로부터 30일 이내에 "구매자"에게 보상 금액을 확정하여 지급합니다. 만약 "회사"가 30일 이내에 보상금
                                    지급을 하지 못할 것으로 예상될 경우 "회사"는 지체 없이 "구매자"에게 그러한 사실과 함께 예상되는 처리 일정을 통지합니다.<br/><br/>8.
                                    “제휴 사업자 판매 상품”의 배송 관련 사항은 본조의 적용을 받지 아니하고, “제휴 사업자”가 개별 “제휴 사업자 판매 상품” 판매 페이지에 고지한
                                    바에 따라 처리됩니다. 단, “제휴 사업자 판매 상품” 배송에 대하여서 해당 “제휴 사업자 판매 상품” 판매 페이지에 별도로 고지된 바 없는 경우 아래
                                    각호를 원칙으로 하여 처리됩니다.</p>
                                <ul>
                                    <li>“제휴 사업자 판매 상품”의 판매 페이지에 고지되는 예상 배송 소요기간은 입금 또는 대금결제 확인일의 익일을 기산일로 하여 배송이 완료되기까지의
                                        기간(천재지변, 명절 기간, 배송업체 파업 등 불가항력적인 사유가 발생한 경우 그 해당기간은 배송 소요기간에서 제외)을 말합니다.
                                    </li>
                                    <li>“회사”는 “제휴 사업자”가 “회사”로부터 “회원”의 입금 또는 대금결제에 대한 확인통지를 받은 후 3영업일 이내에 배송에 필요한 조치를
                                        취하도록 안내하는 것을 원칙으로 합니다.
                                    </li>
                                    <li>해외 배송은 원칙적으로 불가하고, 대한민국 내의 주소지로만 배송이 가능합니다. 또한, 도서산간지역 배송의 경우 배송업체의 사정에 따라 늦어지는
                                        경우도 있습니다.
                                    </li>
                                    <li>"제휴 사업자 판매 상품”이 배송 준비 단계로 나아간 경우 배송지를 변경하는 것이 불가능합니다. 배송 진행 과정에서의 정보 변경은 도움을 드리기
                                        어려울 수 있으며, 배송완료와 동시에 "제휴 사업자 판매 상품"의 분실에 대한 모든 권리와 책임은 해당 "회원" 및 대리 수취인에게 있습니다.
                                    </li>
                                </ul>
                                <p>9. “회원”이 “구매자 보관판매 서비스”를 신청한 경우 “회사”는 해당 “회원”에게 “상품”을 발송하지 아니하고, 해당 “상품”에 대한 거래가
                                    정상적으로 완결됨과 동시에 “구매자 보관판매 서비스”를 제공합니다.</p><p>&nbsp;</p><p><strong>제 29 조 (보관판매
                                    서비스)</strong></p><p>1. "회사"는 기존 거래 내역 등을 고려하여 일정 조건에 해당하는 "회원"이 "판매자"로서 "서비스"에 “회사”가
                                    지정한 보관판매 서비스 제공 대상 "상품"을 등록하거나 “구매자”로서 보관판매 서비스 제공 대상 “상품”에 대한 입찰 등 구매 신청할 경우 해당
                                    "회원"의 신청 및 동의 하에 본 조에 따른 보관판매 서비스(이하 "보관판매 서비스")를 제공할 수 있습니다.<br/><br/>2. “회사”는 아래와
                                    같은 유형의 "보관판매 서비스"를 제공할 수 있습니다.</p>
                                <ul>
                                    <li>판매자 보관판매 서비스: "판매자"가 "상품"의 "거래 체결" 이전에 “보관판매 서비스”를 신청하고 "회사"에 "상품"을 발송하여 본 약관
                                        제27조 등에 따른 검수 과정을 선제적으로 거친 후, 검수 합격 상품에 한하여 "회사"가 해당 "상품"을 보관하고 "입찰" 과정을 거쳐 "거래
                                        체결"이 완료될 경우 "구매자"에게 "상품"을 발송하는 형태의 서비스(이하 “판매자 보관판매 서비스”)
                                    </li>
                                    <li>구매자 보관판매 서비스: “구매자”가 “상품”에 대한 입찰 등 구매 신청 시점에 해당 “상품”에 대한 “보관판매 서비스”를 신청한 경우 검수
                                        합격 등 정상적으로 거래가 완결된 상품에 한하여 “회사”가 해당 “상품”을 보관하고 “입찰” 과정을 거쳐 “거래 체결”이 완료될 경우 해당
                                        거래의 “구매자”에게 “상품”을 발송하는 형태의 서비스(이하 “구매자 보관판매 서비스”)
                                    </li>
                                    <li>만약 “구매자”가 이미 “회사”가 “보관판매 서비스”를 통하여 보관하고 있는 “상품”에 대하여 “구매자 보관판매 서비스”를 신청할 경우 이미
                                        검수 합격한 “상품”에 해당하므로 “회사”는 추가적인 검수를 진행하지 아니하고, 해당 “구매자”에게 “상품”을 발송하지 아니하며, 해당
                                        “구매자”에게 “구매자 보관판매 서비스”를 제공합니다.
                                    </li>
                                </ul>
                                <p>3. "회사"가 제공하는 "판매자 보관판매 서비스"를 신청 및 동의한 "판매자"는 동 서비스 신청 시점으로부터 "회사"가 공지사항 또는 별도 안내 사항
                                    등으로 고지한 시간 이내에 "회사"가 별도 통지한 장소로 "상품"을 발송하고 "회사"가 요구하는 방식에 따라 발송 관련 정보 입력을 완료하여야 합니다.<br/><br/>4.
                                    "회사"는 "판매자 보관판매 서비스"를 신청 및 동의한 "판매자"에게 "상품"당 "회사"가 공지사항 또는 별도 안내 사항 등으로 고지한 일정 금액의
                                    보증금(이하 "보증금")을 부과합니다. "보증금"은 "판매자 보관판매 서비스" 신청 시 "판매자"가 사전 등록한 카드를 통해 자동 결제됩니다.
                                    "보증금"은 본 조 제9항에서 정한 사유가 발생할 경우 일부 또는 전부 차감될 수 있습니다. 차감되지 아니한 "보증금" 잔액은 "상품" 검수
                                    완료일로부터 2영업일 이내에 당초 결제하였던 수단에 따라 결제 취소 등의 절차를 거쳐 반환됩니다. (단, 개별 신용카드사 등의 사정에 따라 반영 시점이
                                    상이할 수 있음)<br/><br/>5. "회사"는 "상품" 보관이 개시된 날(검수합격일을 원칙으로 하고, 추가 검수가 없는 연속된 보관판매 서비스의
                                    경우 대금결제일을 기준으로 함)로부터 30일 간 무료로 해당 "상품"을 보관(이하 "무료 보관 기간")합니다. 다만, "상품" 보관 기간이 보관
                                    개시일로부터 30일을 초과하는 경우 "회사"는 해당 “보관판매 서비스”를 신청한 “회원”에게 "상품"당 "회사"가 공지사항 또는 별도 안내 사항 등으로
                                    고지한 일정 금액의 보관비(이하 "보관비")를 부과합니다. "보관비"는 "무료 보관 기간" 만료 시 해당 “보관판매 서비스”를 신청한 “회원”이 사전
                                    등록한 카드를 통해 자동 결제됩니다. “보관판매 서비스”를 신청한 “회원”은 "무료 보관 기간" 만료일까지 "회사"에 보관 기간을 연장하지 아니한다는
                                    의사를 표시할 수 있으며, 이와 관련하여 "회사"는 해당 “회원”에게 반송에 필요한 비용 등을 부과할 수 있습니다.<br/><br/>6. "보관판매
                                    서비스"에 따른 "상품"의 보관기간은 검수 합격일(추가 검수가 없는 연속된 보관판매 서비스의 경우 대금결제일을 기준으로 함)로부터 최대 120일
                                    이내에서 "회사"가 공지사항 또는 별도 안내 사항 등으로 고지한 기간(이하 "최대 보관 기간")입니다. "보관비"가 정상 결제되지 아니하거나 "최대
                                    보관 기간"이 도과한 "상품"은 해당 “보관판매 서비스”를 신청한 “회원”이 사전에 입력한 주소로 반송됩니다. 이와 관련하여 "회사"는 해당 “보관판매
                                    서비스”를 신청한 “회원”에게 반송에 필요한 비용 등을 부과할 수 있습니다.<br/><br/>7. "보관판매 서비스”를 신청한 “회원”이 정해진 기한
                                    내 발송 관련 정보 입력(허위 정보 입력 포함)을 하지 아니하거나 입력된 발송 정보에 따른 발송일로부터 5영업일 이내에 "상품"이 "회사"에 입고되지
                                    아니한 경우 또는 "상품"이 검수 불합격되는 경우 해당 "보관판매 서비스"는 종료되며, "회사"에 "상품"이 도달한 경우 해당 “보관판매 서비스”를
                                    신청한 “회원”이 사전에 입력한 주소로 반송됩니다. 이와 관련하여 "회사"는 해당 “보관판매 서비스”를 신청한 “회원”에게 반송에 필요한 비용 등을
                                    부과할 수 있습니다.<br/><br/>8. “보관판매 서비스”를 신청한 "판매자" 또는 “구매자”는 "거래 체결" 전까지 "회사"에 "보관판매 서비스"
                                    신청 철회 의사를 통지함으로써 동 서비스 신청을 철회할 수 있습니다. 이 경우 해당 "보관판매 서비스"는 종료되며, "회사"에 "상품"이 도달한 경우
                                    해당 “회원”이 사전에 입력한 주소로 반송됩니다. 이와 관련하여 "회사"는 해당 “보관판매 서비스”를 철회한 “회원”에게 반송에 필요한 비용 등을
                                    부과할 수 있습니다.<br/><br/>9. "회사"는 아래와 같은 경우 “보관판매 서비스”를 신청한 "회원"에게 보관 및 반송 등에 필요한 비용을
                                    부과할 수 있으며, 해당 비용은 "보증금" 전부·일부 차감 또는 "보관판매 서비스" 신청 시 해당 "회원"이 등록한 카드를 통해 자동
                                    결제됩니다.<br/>(관련정책 : <Link href="https://kream.co.kr/faq/service_fee">링크</Link>)</p>
                                <ul>
                                    <li>보증금 차감: (1) "판매자"가 "보관판매 서비스"를 신청한 시점으로부터 1시간 경과한 이후 "보관판매 서비스" 신청을 철회하는 경우, (2)
                                        정해진 기한 내 발송 관련 정보를 입력하지 아니한 경우(허위 정보 입력 포함), (3) "판매자"가 "회사"가 지정하는 양식에 "상품" 배송
                                        정보를 입력한 시점 이후 "보관판매 서비스" 신청을 철회하는 경우, (4) 입력된 발송 정보에 따른 발송일로부터 5영업일 이내에 "상품"이
                                        "회사"에 입고되지 아니한 경우
                                    </li>
                                    <li>신청에 따른 결제: "회원"이 "상품" 반송관련 비용을 확인 및 반송 신청을 한 경우</li>
                                    <li>자동 결제: (1) "무료 보관 기간"이 만료되는 경우, (2) "최대 보관 기간" 내 "거래 체결"이 되지 아니하여 반송되는 경우, (3)
                                        "보관비", 반송관련 비용 및 페널티 등 각종 비용이 정상 결제 처리되지 아니한 경우, (4) 본 약관 및 "회사" 정책이 정하는 페널티 부과
                                        사유 등이 발생하는 경우
                                    </li>
                                    <li>구체적인 결제 금액 등에 대하여서는 상기 링크된 이용정책에 정하여진 바에 따름</li>
                                </ul>
                                <p>10. "상품"의 검수합격 후 보관창고 이동 및 상품 적치 기간 중에는 해당 "상품"의 반송 및 "입찰" 등록이 불가피하게 제한 또는 지연될 수
                                    있습니다. "회사"는 "상품"의 보관창고 이동 및 상품 적치 기간이 종료하여 "보관판매 서비스" 제공이 가능한 상태가 되면 "서비스"를 통해 “보관판매
                                    서비스”를 신청한 "회원"에게 그와 같은 사실을 통지합니다.<br/><br/>11. "회사"는 "회원"의 "보관판매 서비스"의 이용에 따라 보관되는
                                    "상품"이 손상되지 않고 입고 당시의 상태로 유지, 보관될 수 있도록 보관 창고 및 제반 시설을 철저히 관리합니다.<br/><br/>12. "회사"가
                                    보관 중인 "회원"의 "상품"에 멸실이 발생한 때에는 "회사"의 고의나 과실로 인한 경우에 한하여 "회사"는 "상품" 멸실일 기준 "회원"의 "상품"과
                                    동일한 품목 및 규격의 가장 최근 거래가격을 한도로 하여 손해배상 책임을 부담합니다.<br/><br/>13. "회사"가 보관 중인 "회원"의 "상품"이
                                    파손 또는 오염된 때에는 "회사"의 고의나 과실로 인한 경우로서 수리 및 재처리 후 사용이 가능한 경우에 한해 해당 수리비 및 재 처리비를 실비로
                                    배상하며, 수리 및 재처리 후 사용이 불가한 경우는 전항의 멸실의 경우에 의합니다. 단, "회사"는 "회사"의 과실 없이 "상품" 보관 중 자연발생적
                                    변색, 변질, 경화, 마모 등에 대하여는 "회사"는 책임을 부담하지 아니합니다.<br/><br/>14. "보관판매 서비스"에 대하여 본조에서 정하지
                                    아니한 사항(결제 취소, 배송 정책, 페널티 부과, 마이너스 포인트, 동 서비스를 이용하여 "상품"을 구매하는 "구매자"에 관한 사항 등 포함)은 본
                                    약관 및 "회사"의 정책에 따라 일반 서비스에 적용되는 규정이 동일하게 적용됩니다.</p><p>&nbsp;</p><p><strong>제 30 조
                                    (청약철회의 제한)</strong></p><p>1. <strong>"서비스"에서 "회원" 상호 간 이뤄진 "상품"의 매매는 개인 간에 이뤄지는 거래로
                                    전자상거래법 제17조에서 정한 청약철회에 따른 환불, 교환이 적용되지 않기 때문에 "거래체결" 이후에는 다른 일반 전자 상거래와 달리 단순 변심에 따른
                                    계약 철회, 취소 등이 불가능하고, 검수기준을 충족하지 못하는 "이상 상품"인 경우만 계약 취소 및 환불 청구가 가능합니다.</strong> 구매자는
                                    구매 시에 이 점에 대해 반드시 유의하여 진행해 주시기 바랍니다.<br/><br/>2. “서비스” 중 “KREAM EXCLUSIVE DROPS” 및
                                    “B2C 상품 페이지”에서 “회원”과 “제휴 사업자” 간 이뤄진 “제휴 사업자 판매 상품”의 매매에 한하여서는 원칙적으로 전자상거래법 제17조에서 정한
                                    청약철회권이 인정될 수 있으며, 구체적인 내용은 개별 “제휴 사업자 판매 상품” 판매 페이지에 고지한 내용과 전자상거래법 관련 규정에
                                    따릅니다.<br/><br/>3. 아래 각호의 사유를 포함하여 관련 법령 등에 따라 청약철회권이 제한되는 경우에는 “제휴 사업자 판매 상품”이라 하더라도
                                    계약 취소 및 환불 청구가 불가능하오니 “회원”은 “제휴 사업자 판매 상품” 구매 시 이 점에 대하여 반드시 유의하여 진행해 주시기 바랍니다.</p>
                                <ul>
                                    <li>“회원”에게 책임 있는 사유로 “제휴 사업자 판매 상품” 등이 멸실 또는 훼손된 경우 (다만, “제휴 사업자 판매 상품” 등의 내용을 확인하기
                                        위하여 포장 등을 훼손한 경우는 제외함)
                                    </li>
                                    <li>“회원”의 사용 또는 일부 소비에 의하여 “제휴 사업자 판매 상품” 등의 가치가 현저히 감소한 경우</li>
                                    <li>시간의 경과에 의하여 재판매가 곤란할 정도로 “제휴 사업자 판매 상품” 등의 가치가 현저히 감소한 경우</li>
                                    <li>복제 가능한 “제휴 사업자 판매 상품” 등의 포장을 훼손한 경우</li>
                                    <li>“회사”가 “제휴 사업자 판매 상품” 등의 청약철회 등의 제한에 관해 사전에 고지한 경우</li>
                                    <li>용역 또는 『문화산업진흥 기본법』 제2조 제5호의 디지털콘텐츠의 제공이 개시된 경우 (다만, 가분적 용역 또는 가분적 디지털콘텐츠로 구성된
                                        계약의 경우에는 제공이 개시되지 아니한 부분에 대하여는 제외함)
                                    </li>
                                    <li>주문에 따라 개별적으로 생산되는 “제휴 사업자 판매 상품” 등 그에 대하여 청약철회 등을 인정할 경우 “제휴 사업자” 등에게 회복할 수 없는
                                        중대한 피해가 예상되는 경우로서, 사전에 해당 거래에 대하여 별도로 그 사실을 고지하고 “회원”의 서면(전자문서를 포함)에 의한 동의를 받은
                                        경우
                                    </li>
                                    <li>기타 관련 법령에 따라 인정되는 청약철회권 제한 사유가 존재하는 경우</li>
                                </ul>
                                <p>&nbsp;</p><p><strong>제 31 조 (등록 상품에 대한 거래 계약의 해지 또는 취소)</strong></p><p>1. 판매 및 구매 등
                                    거래에 있어 해지 신청에 대한 승낙의 표시가 "회원" 상호간 합의 하에 이루어진 경우, 거래 계약이 해지된 것으로 봅니다.<br/><br/>2.
                                    "회사"는 판매자가 등록한 상품이 서비스 이용약관에 위배되는 제품이거나 "상품"이 "판매자"가 등록한 내용과 다를 경우에는 사전 통보 없이 계약을 해지
                                    할 수 있습니다.<br/><br/>3. 또한 "판매자"가 "회사"가 지정한 배송날짜 안에 제품을 배송하지 않으면 계약이 해지될 수
                                    있습니다.<br/><br/>4. "서비스"의 특성 상 "거래 체결"된 "상품"의 경우에도 "판매자"의 "상품"이 "회사"의 검수를 통과하지 못하거나
                                    "판매자"가 "상품"의 배송 전에 판매를 취소하는 경우에는 "회원" 상호 간 체결된 계약은 해지 또는 취소될 수 있습니다.<br/><br/>5.
                                    "구매자" 역시 제한시간 이내 결제를 완료하지 않으면 계약이 해지될 수 있습니다.</p><p>&nbsp;</p><p><strong>제 31 조의 2
                                    (제휴 사업자 판매 상품에 대한 거래 취소 및 반품 등)</strong></p><p>1. “회원”은 구매한 “제휴 사업자 판매 상품”이 발송되기 전까지
                                    구매를 취소할 수 있으며, 배송 단계 이후에는 취소가 아닌 반품 절차에 따라 처리됩니다.<br/><br/>2. “회원”이 “제휴 사업자 판매 상품”에
                                    대한 결제를 완료한 후 배송대기, 배송요청 상태에서는 취소신청 접수 시 특별한 사정이 없는 한 3~4영업일 내 취소처리가 완료됩니다.<br/><br/>3.
                                    배송준비 상태에서 취소신청한 때에 이미 “제휴 사업자 판매 상품”이 발송이 된 경우에는 발송된 “제휴 사업자 판매 상품”의 왕복배송비를 해당 “회원”이
                                    부담하는 것을 원칙으로 하며, 취소가 아닌 반품절차에 따라 처리됩니다.<br/><br/>4. “제휴 사업자 판매 상품”의 반품에 소요되는 비용은 반품에
                                    대한 귀책사유가 있는 당사자에게 귀속되는 것을 원칙으로 합니다. 예를 들어 단순 변심 또는 착오로 인한 주문 등의 경우 “회원”이 관련 비용을
                                    부담하고, “제휴 사업자 판매 상품”에 하자가 있는 경우에는 “제휴 사업자”가 이를 부담합니다.<br/><br/>5. “회원”이 “제휴 사업자 판매
                                    상품”의 반품 신청 시 반품송장번호를 미기재 또는 허위기재/오기재하거나 반품사유에 관하여 “회사” 또는 “제휴 사업자”에게 정확히 통보하지 않는 경우
                                    또는 반품에 필요한 비용이 정상적으로 결제되지 아니한 경우에는 반품 및 환불처리가 부득이 지연될 수 있습니다.<br/><br/>6. “제휴 사업자 판매
                                    상품”이 한정 소량 생산되는 품목이거나 성질상 재생산이나 수리가 어려운 물품인 경우 교환이나 A/S가 제한될 수 있습니다. 단, 이러한 경우에도
                                    전자상거래 등에서의 소비자보호에 관한 법률에 근거한 “제휴 사업자 판매 상품” 반품(환불)이 제한되는 것은 아닙니다.<br/><br/>7. “제휴
                                    사업자 판매 상품” 거래 취소 또는 반품 등으로 인한 환급은 구매 시 결제 수단과 동일한 수단으로 이루어 지는 것이 원칙이고, “회원”은 “회사” 또는
                                    “제휴 사업자”에 구매 시 결제 수단과 다른 수단으로 환급을 요구할 수 없습니다.</p><p>&nbsp;</p><p><strong>제 32 조
                                    (미성년자의 계약 취소 및 환불에 관한 사항)</strong></p><p>"회원"이 만 19세 미만의 미성년자인 경우, "상품" 또는 “제휴 사업자
                                    판매 상품”의 구매 또는 판매(각 입찰행위 포함), 유료 결제 서비스를 이용하고자 하는 경우에는 부모 등 법정대리인의 동의를 얻어야 하며, 그렇지 않은
                                    경우에는 미성년자 본인 또는 법정대리인이 그 계약을 취소할 수 있습니다.</p><p>&nbsp;</p><p><strong>제 33 조 ("이상 상품"에
                                    대한 환불)</strong></p><p>1. 구입한 "상품"이 검수기준을 충족하지 못하는 "이상 상품"인 경우 "회사"의 환불 정책에 따라, 고객의
                                    "상품" 수령일로부터 3일 이내("상품" 수령 후 72시간, 주말 및 법정 공휴일 제외)에 환불이 가능합니다. <strong>본 규정에 따른 환불은
                                        "회사"가 제공하는 검수 및 배송에 대한 책임이며, "상품"의 중개에 따른 책임에 해당하지 않습니다. 환불은 필요한 경우 A/S로 대체될 수
                                        있습니다.</strong><br/><br/>2. "이상 상품"의 정의: "회사"에서 거래되는 "상품"은 미사용 secondhand "상품"이며
                                    개별 브랜드의 제조 특성에 따른 퀄리티의 차이가 있을 수 있습니다. "회사"가 제공하는 검수 기준에 미달함에도 불구하고 검수 합격되어 출고된 경우
                                    "이상 상품"으로 분류될 수 있습니다. 다만, 출고 이후 발생한 불량 등의 경우 "이상 상품"에 해당하지 아니하고, "회사"는 이에 대한 책임을 지지
                                    아니 합니다.<br/><br/>3. "회사"가 제공하는 검수 기준은 "상품"의 원제조업체가 제공하는 제품별 보증 기준과 동일하지 아니하며, "회사"는
                                    원제조업체의 보증 기준 등 "회사"의 검수 기준이 아닌 기준에 따른 보증 및 책임을 지지 아니합니다.<br/><br/>4. "이상 상품"에 해당하는
                                    것으로 의심될 경우, 문제가 되는 부분에 대하여 "회사" 고객센터 (1588-7813) 로 연락주시거나 "서비스" 내 1:1문의로 문의하여 주시기
                                    바랍니다.<br/><br/>5. 환불 시 반품 확인여부를 확인한 후 3영업일 이내에 결제 금액을 환불해 드립니다. 신용카드로 결제하신 경우는 신용카드
                                    승인을 취소하여 결제 대금이 청구되지 않게 합니다.(단, 신용카드 결제일에 맞춰 대금이 청구될 수 있으며 이 경우 익월 신용카드 대금청구시 카드사에서
                                    환급 처리 됩니다)<br/><br/>6. "회사"는 검수 통과 "상품"에 한하여 검수 타이 또는 검수 실링(VOID 스티커) 등 검수 완료 증표(이하
                                    "검수 완료 증표")를 부착하고 있습니다. <strong>"상품" 수령 후 "검수 완료 증표"를 훼손 또는 제거하는 경우 수령한 "상품"을 사용한
                                        것으로 보아 환불 또는 거래 취소가 불가능하며, "회사"는 해당 "상품"에 대한 책임을 지지 아니 합니다.</strong><br/>(관련정책
                                    : <Link href="https://kream.co.kr/faq/authentication">링크</Link>)<br/><br/>7. 원제조업체의
                                    "자체 실링"이 존재하여 이를 개봉할 경우 가치가 현저히 감소되는 <strong>"상품" 수령 후 "자체 실링"이 개봉되었거나 훼손 또는 제거되었을
                                        경우 환불 또는 거래 취소가 불가능하며, "회사"는 해당 "상품"에 대한 책임을 지지 아니
                                        합니다.</strong><br/><br/>8. <strong>원제조업체의 "자체 실링"이 존재하여 이를 개봉할 경우 가치가 현저히 감소되는
                                        "상품"의 경우 그 특성상 개봉 없이 검수가 진행되므로 "회사"는 해당 "상품"에 대한 책임(보증, 불량, A/S 책임 및 "이상 상품"과
                                        관련한 책임 등을 포함하되 이에 한하지 아니함)을 지지 아니합니다.</strong> 이러한 "상품"의 보증, 불량, A/S 등에 대하여서는
                                    원제조업체에 문의하시기 바랍니다.<br/><br/>9. “제휴 사업자 판매 상품”의 보증, 불량, A/S 책임은 본조의 적용을 받지 아니하고, “제휴
                                    사업자”가 개별 “제휴 사업자 판매 상품” 판매 페이지에 고지한 바에 따라 처리됩니다.<br/><br/>&nbsp;</p><p><strong>제 34
                                    조 (판매대금 지급 등)</strong></p><p>1. "구매자"가 지급(결제)한 판매대금은 "회사"의 검수가 완료되면 "구매자"에게 "상품"이
                                    배송되기 전이라도 등록된 판매대금에서 수수료를 제한 금액이 수취계좌로 입금될 수 있으며, "구매자"는 이러한 판매대금 지급에 대해 동의합니다. "이상
                                    상품"에 해당하여 환불이 이뤄지는 경우, "회사"는 즉시 결제수단을 제공한 사업자로 하여금 대금 청구를 정지하거나 취소하도록 요청하며, 이미
                                    "판매자"에게 판매대금이 지급된 경우에는 "회사"는 "판매자"와 연대하여 "구매자"에 대한 환불금 지급 의무를 부담합니다.<br/><br/>2.
                                    구매자의 환불이 확정된 경우 곧바로 "회사"는 "판매자"가 회원가입 또는 "상품" 등록 시에 등록한 이메일 등의 연락처로 환불 사실을 알리며,
                                    "판매자"는 이러한 사실을 통지 받은 판매대금을 즉시 "회사"의 계좌로 반납하여야 합니다. 판매대금 반납이 지체되는 경우에는 연 10%의 지연이자가
                                    발생할 수 있습니다. 자세한 정보는 고객센터로 문의 주시기 바랍니다.</p><p>&nbsp;</p><p><strong>제 35 조
                                    (금지행위)</strong></p><p>"판매회원"은 다음 각 호에 해당하는 행위를 하여서는 아니 되며 이를 위반한 경우 "회사"는 다음 각 호에서
                                    개별적으로 규정하고 있는 제재조치를 취할 수 있으며, 이로 인하여 삭제된 "상품"의 거래완료수수료 또는 부가서비스 수수료, 기본이용료 등 이용료는
                                    환불되지 않습니다.<br/><br/>1. 허위체결 금지<br/>1) 허위체결이란 "판매자"가 상품 노출순위 및 판매자 신용등급 조작, 상품평 조작 등
                                    매출증대를 위해 본인 또는 타인의 ID를 사용하여 판매자 본인의 상품을 구매하는 체결 행위를 말하며, "회사"는 이를 금지하고 있습니다.<br/>2)
                                    허위체결 적발 시 "회사"는 회원 ID에 대하여 신용점수 차감, 이용제한, 계약해지, 정산금 지급보류(1개월 이내) 등 필요한 조치를 취할 수
                                    있습니다.<br/>3) 허위체결 적발 시 "회사"는 사안에 따라 "판매자"에게 부가적인 확인 요청 및 자진취소 또는 반품을 요구할 수 있으며,
                                    "판매자"는 이에 협조할 의무가 있습니다.<br/><br/>2. 입찰 조작 금지<br/>1) 입찰 조작이란 "판매회원" 자신의 상품을 고가에 낙찰시키기
                                    위하여 부정한 방법으로 상품에 대한 입찰 또는 응찰 하는 행위를 말하며, "회사"는 이를 금지하고 있습니다.<br/>2) 입찰 조작행위 적발 시
                                    "회사"는 허위체결의 경우에 준하여 로그인 제한, 거래 제한 등의 조치를 취할 수 있습니다.<br/><br/>3. 중복등록 및 카테고리 위반등록 금지
                                    외<br/>1) 중복등록이란 동일한 "상품"을 중복하여 등록하는 것으로서, "회사"는 중복등록 행위를 금지하고 있습니다.<br/>2) 카테고리 위반이란
                                    해당상품과 관계없는 카테고리에 상품을 등록하는 것으로서, 회사는 이를 금지하고 있습니다.<br/>3) 기타 비정상적인 방법으로 상품을 노출하는 모든
                                    행위를 금지합니다.<br/>4) 중복등록 및 카테고리 위반등록 적발 시 회사는 적발 횟수에 따라 상품 판매 제한, 판매자 ID 중지, 이용제한 등의
                                    조치를 취할 수 있습니다.</p><p>&nbsp;</p><p><strong>제 36 조 (회사의 면책 등)</strong></p><p>1. "회사"는
                                    "회원" 상호 간의 "상품" 매매에 대하여 "회원"들에게 온라인 거래 장소를 제공하고 기타 부가 서비스를 제공하는 것을 "서비스"의 내용으로 합니다.
                                    이에 원칙적으로 "판매자"가 등록한 "상품"에 관한 정보 및 "구매자"와의 거래에 관하여 분쟁이 발생한 경우 회사는 그 분쟁에 개입하지 않으며 그
                                    분쟁의 결과로 인한 모든 책임은 "판매자" 또는 "구매자"인 회원이 부담합니다. 특히, "거래 체결" 후에 "판매자"가 "상품"의 판매를 취소하는
                                    경우, "상품"을 "회사"에 권고 기간 내에 배송하지 않거나 배송정보를 입력하지 않는 경우, "회사"의 검수에 불합격하는 등 "판매자"의 귀책으로
                                    인하여 계약이 해지 또는 취소되는 경우에 "회사"는 이로 인한 "구매자"의 손해 발생에 대해 책임을 지지 않습니다. 다만, "판매자"와 "구매자" 간
                                    거래에 있어 회사의 귀책사유로 인하여 "판매자" 또는 "구매자"에 손해가 발생한 경우에는 그에 대한 책임을 부담합니다.<br/><br/>2. 제1항에서
                                    정한 내용에도 불구하고 "회사"의 귀책사유로 인해 검수센터의 검수 판정에 오류가 발생한 경우, 검수가 완료된 "상품"을 "구매회원"에게 배송하는
                                    과정에서 "회사"의 귀책사유로 인해 발생한 손해에 대해서는 "회사"가 책임을 부담합니다. 단, 이 때 "회사"에서 "구매회원"의 손해 보상에 대해
                                    별도로 정한 정책이 적용되지 않는 한 "구매회원"의 손해는 "상품"을 구매한 가격을 한도로 합니다.<br/><br/>3. "회사"는 천재지변 또는 이에
                                    준하는 불가항력, "회사"의 과실 없이 발생한 정보통신설비의 보수점검, 교체 또는 고장, 통신의 두절 등으로 인하여 일시적 또는 종국적으로 서비스를
                                    제공할 수 없는 경우, "서비스" 제공에 관한 책임이 면제됩니다. 이 경우 "회사"는 "회사"가 제공하는 인터넷사이트 화면에 게시하거나 기타의 방법으로
                                    회원들에게 통지합니다.<br/><br/>4. "회사"는 회사의 고의 또는 과실이 없는 한 인터넷 이용자 또는 "회원"의 귀책사유로 인한 서비스 이용의
                                    장애에 대하여 책임을 지지 않습니다.<br/><br/>5. "회원"이 자신의 개인정보를 타인에게 유출 또는 제공함으로써, 발생하는 피해에 대해서
                                    "회사"는 일체의 책임을 지지 않습니다.<br/><br/>6. "회사"는 다음과 같은 사항으로부터 발생하는 손해에 대해 책임을 지지 아니합니다.</p>
                                <ul>
                                    <li>"회원" 상태 정보의 허위 또는 부정확성에 기인하는 손해</li>
                                    <li>그 성질과 경위를 불문하고 "서비스"에 대한 접속 및 "서비스"의 이용과정에서 발생하는 개인적인 손해</li>
                                    <li>서버에 대한 제3자의 모든 불법적인 접속 또는 서버의 불법적인 이용으로부터 발생하는 손해</li>
                                    <li>서버에 대한 전송 또는 서버로부터의 전송에 대한 제3자의 모든 불법적인 방해 또는 중단행위로부터 발생하는 손해</li>
                                    <li>제3자가 "서비스"를 이용하여 불법적으로 전송, 유포하거나 또는 전송, 유포되도록 한 모든 바이러스, 스파이웨어 및 기타 악성 프로그램으로 인한
                                        손해
                                    </li>
                                    <li>전송된 데이터의 오류 및 생략, 누락, 파괴 등으로 발생되는 손해</li>
                                    <li>"회원" 간의 "회원" 상태 정보 등록 및 "서비스" 이용 과정에서 발생하는 명예훼손 기타 불법행위로 인한 각종 민형사상 책임</li>
                                    <li>"회사"는 적법한 권리자의 요구가 있는 경우에는 당해 "상품"에 관한 정보를 삭제하거나 수정할 수 있으며, "판매자"는 이로 인한 손해배상을
                                        회사에 청구할 수 없습니다.
                                    </li>
                                </ul>
                                <p>7. "회사"는 "회원"과 “제휴 사업자” 간의 "제휴 사업자 판매 상품" 매매에 대하여 "회원"과 “제휴 사업자”들에게 온라인 거래 장소를 제공하고
                                    기타 부가 서비스를 제공하는 것을 "서비스" 중 “KREAM EXCLUSIVE DROPS” 및 “B2C 상품 페이지”의 내용으로 합니다. 이에
                                    “회사”는 원칙적으로 "제휴 사업자"가 등록한 "제휴 사업자 판매 상품"에 관한 정보, "회원"과의 거래 및 관련 분쟁에 대하여 개입하지 않으며 이에
                                    대한 모든 책임은 “제휴 사업자 판매 상품” 매매의 당사자인 "제휴 사업자" 또는 해당 “제휴 사업자 판매 상품”을 구매한 “회원”이 부담합니다.
                                    다만, "제휴 사업자"와 "회원" 간 거래에 있어 “제휴 사업자”의 과실 없이 “회사”의 귀책사유로 인하여 “제휴 사업자 판매 상품”을 구매한
                                    “회원”에게 손해가 발생한 경우에는 그러하지 아니합니다.<br/><br/>8. 본 약관 조항 중 검수, 배송에 관한 사항 등 오직 “회원” 간 거래만을
                                    전제로 하는 경우 “제휴 사업자”, “제휴 사업자 판매 상품”, “KREAM EXCLUSIVE DROPS” 및 “B2C 상품 페이지”와 관련하여서는
                                    원칙적으로 적용되지 않으며, 본 약관의 내용과 “제휴 사업자 판매 상품” 관련 페이지에 고지된 내용이 다를 경우 “제휴 사업자 판매 상품” 관련
                                    페이지에 고지된 내용이 우선 적용됩니다.<br/><br/>9. “회사”는 “회원”이 본인인증한 개인 본인이 아닌 제3자 또는 사업자(개인사업자
                                    포함)로서 “서비스”를 이용하거나 거래하는 등 본 약관 또는 관련 법령 위반을 전제로 한 어떠한 요구에도 응하지 아니 하며, 필요한 경우 관계 당국에
                                    신고하는 등의 조치를 취할 수 있습니다.</p><p>&nbsp;</p><p><strong>제 37 조 (분쟁조정)</strong></p><p>1.
                                    회사는 “회원”과 “제휴 사업자” 간 분쟁이 발생하는 경우에 이를 합리적이고 원활히 조정하기 위하여 고객센터 및 1:1 문의 채널을 운영하고 있습니다.<br/><br/>2.
                                    “회원”은 분쟁조정센터의 조정에 신의칙에 입각하여 성실히 응하여야 합니다.</p><p>&nbsp;</p><p><strong>제 38 조
                                    (기타)</strong></p><p>1. 본 약관에 대해서는 대한민국법을 준거법으로 하고, 대한민국 법원이 관할권을 갖는 것으로
                                    합니다.<br/><br/>2. "회사"와 "회원" 간 발생한 분쟁에 관한 소송은 제소 당시의 "회원"의 주소에 의하고, 주소가 없는 경우 거소를
                                    관할하는 지방법원의 전속관할로 합니다. 단, 제소 당시 "회원"의 주소 또는 거소가 명확하지 아니한 경우의 관할법원은 민사소송법에 따라 정합니다.
                                    해외에 주소나 거소가 있는 고객의 경우 "회사"와 "회원"간 발생한 분쟁에 관한 소송은 대한민국 서울중앙지방법원을 관할 법원으로 합니다.</p>
                                <p>&nbsp;</p>
                                <ul>
                                    <li>공고일자: 2022년 7월 28일</li>
                                    <li>시행일자: 2022년 8월 4일</li>
                                </ul>
                            </div>
                        </div>
                        <Link className="btn_layer_close" data-v-1f7c6d3f="" data-v-17b3a53d="">
                            <svg xmlns="http://www.w3.org/2000/svg" className="ico-close icon sprite-icons"
                                 data-v-1f7c6d3f="" data-v-17b3a53d="">
                                <use href="/_nuxt/a9c19cb959b9bb0e43f56db79ee357b4.svg#i-ico-close" data-v-1f7c6d3f=""
                                     data-v-17b3a53d=""></use>
                            </svg>
                        </Link></div>
                </div>
            </div>
            <div className="banner_bottom lg" data-v-5f9a95a3="" data-v-6ca47fe2=""><Link href="#!"
                                                                                          className="banner_box"
                                                                                          data-v-5f9a95a3="">
                <div className="banner_info" data-v-5f9a95a3=""><strong className="info_subtitle" data-v-5f9a95a3="">service
                    guide</strong><p className="info_title" data-v-5f9a95a3="">KREAM은 처음이지? <br/>서비스 소개를 확인해보세요.</p>
                    <span className="info_txt" data-v-5f9a95a3="">서비스 안내</span></div>
            </Link><Link href="#!" className="banner_box" data-v-5f9a95a3="">
                <div className="banner_info" data-v-5f9a95a3=""><strong className="info_subtitle" data-v-5f9a95a3="">download
                    the app</strong><p className="info_title" data-v-5f9a95a3="">KREAM 앱을 설치하여 <br/>한정판 스니커즈를 FLEX 하세요!
                </p><span className="info_txt" data-v-5f9a95a3="">앱 설치하기</span></div>
            </Link></div>
        </div>
        // <div>
        //     <form onSubmit={onSubmitButton}>
        //         <table className='table table-bordered' style={{width:'500px'}}>
        //             <caption align='top'><h2>회원가입</h2></caption>
        //             <tbody>
        //             <tr>
        //                 <th>이메일</th>
        //                 <td>
        //                     <div className='input-group'>
        //                         <input type={'text'} required
        //                                value={email} onChange={inputIdChange}/>
        //                         <button type='button'
        //                                 onClick={btnIdCheck}>이메일중복</button>
        //                         &nbsp;
        //                         <b style={{width:'100px'}}>{idmsg}</b>
        //                     </div>
        //                 </td>
        //             </tr>
        //             <tr>
        //                 <th>비밀번호</th>
        //                 <td>
        //                     <input type={'password'}
        //                            value={pass} onChange={(e)=>setPass(e.target.value)}/>
        //                 </td>
        //             </tr>
        //             <tr>
        //                 <th>이름</th>
        //                 <td>
        //                     <div className='input-group' >
        //                         <input type={'text'} required value={u_name}
        //                                onChange={(e)=>setU_name(e.target.value)}/>
        //                     </div>
        //                 </td>
        //             </tr>
        //             <tr>
        //                 <th>핸드폰 번호</th>
        //                 <td>
        //                     <div className='input-group' >
        //                         <input type="tel" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        //                                placeholder='xxx-xxxx-xxxx'
        //                                value={hp}
        //                                onChange={(e)=>{
        //                                    if(e.target.value.length===3 || e.target.value.length===8){
        //                                        e.target.value=e.target.value+'-';
        //                                    }
        //                                    setHp(e.target.value);
        //                                }}/>
        //                     </div>
        //                 </td>
        //             </tr>
        //             <tr>
        //                 <th>성별</th>
        //                 <td>
        //                     <div className='input-group' >
        //                         <select className='form-select'
        //                                 onChange={(e)=>{
        //                                     setGender(e.target.value);
        //                                 }}>
        //                             <option>M</option>
        //                             <option>F</option>
        //
        //                         </select>
        //
        //                     </div>
        //                 </td>
        //             </tr>
        //             <tr>
        //                 <th>주소</th>
        //                 <td>
        //                     <div className='input-group' >
        //                         <input type={'text'}
        //                                onChange={(e)=>setAddr(e.target.value)}/>
        //                     </div>
        //                 </td>
        //             </tr>
        //
        //
        //             <tr>
        //                 {/*<th>회원가입</th>*/}
        //                 <td colSpan={2} align={"center"} >
        //                     <button type='submit'>회원가입</button>
        //                 </td>
        //             </tr>
        //             </tbody>
        //         </table>
        //     </form>
        // </div>
    )
}
export default SignupForm;
