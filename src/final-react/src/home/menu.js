import React, {useEffect, useRef, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import styled from "styled-components";
import TransitionsModal from "./SearchModal";
import axios from "axios";
import AnnouncementBar from "./AnnouncementBar";
import Swal from "sweetalert2";
import AuthTimer from "../user/AuthTimer";

const Menubar = styled.div`
  padding-top: 10px;
  border-bottom: 2px solid #eee;
  display: flex;
  justify-content: right;
  margin-bottom: 10px;
`;
const Searchbar = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Category = styled(NavLink)`
  font-size: 1.1rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: black;
  padding-bottom: 0.25rem;

  &:hover {
    color: #ccc;
  }

  &.active.underline {
    font-weight: 600;
    border-bottom: 4px solid #495057;
    color: #495057;

    &:hover {
      color: #ccc;
    }
  }

  & + .up {
    margin-left: 4rem;

    :last-child {
      margin-right: 2rem;
    }
  }

  & + .down {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

function Menu(props) {


    // 로그아웃
    const logout = () => {
        // DB에서 refresh_token 지우기
        let deleteRefreshToken = process.env.REACT_APP_URL + "/user/logout?u_num=" + sessionStorage.u_num;
        axios.delete(deleteRefreshToken)
            .then(res => {
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
                sessionStorage.removeItem("u_num");
                sessionStorage.removeItem("loginok");
            })
            .then(res => {
                Swal.fire({
                    icon: "success",
                    text: "로그아웃 완료"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                })
            })
    }

    // 로그인 연장 버튼 이벤트
    const reissue = () => {
        if (sessionStorage.loginok === "yes") {
            let reissueUrl = process.env.REACT_APP_URL + "/user/reissue";

            axios.post(reissueUrl, {
                u_num: sessionStorage.u_num,
                accessToken: localStorage.accessToken,
                refreshToken: localStorage.refreshToken
            }).then(res => {
                console.dir(res.data)
                localStorage.accessToken = res.data.accessToken;
                localStorage.refreshToken = res.data.refreshToken;
            }).then(res => {
                window.location.reload();
            })
                .catch(error => {
                    console.dir(error);
                    console.dir(error.response);
                })
        }
    }

    // 새로고침 했을 때 로그인 연장 이벤트
    const reissueReload = () => {
        if (sessionStorage.loginok === "yes") {
            let reissueUrl = process.env.REACT_APP_URL + "/user/reissue";

            axios.post(reissueUrl, {
                u_num: sessionStorage.u_num,
                accessToken: localStorage.accessToken,
                refreshToken: localStorage.refreshToken
            }).then(res => {
                console.dir(res.data)
                localStorage.accessToken = res.data.accessToken;
                localStorage.refreshToken = res.data.refreshToken;
            }).catch(error => {
                console.dir(error);
                console.dir(error.response);
            })
        }
    }

    window.addEventListener('beforeunload', (event) => {
        event.preventDefault();
        // 변경사항이 저장되지 않을 수 있습니다. alert 창 (크롬)
        // event.returnValue = '';
        reissueReload();

    })

    return (
        <>
            <Menubar>
                <Category to={"/mystyle"} className={"up underline"}>
                    스타일
                </Category>
                <Category to={"/product/list"} className={"up underline"}>
                    상품 리스트
                </Category>
                <Category to={"/product/detail/1703"} className={"up underline"}>
                    상품 상세
                </Category>
                <Category to={"/admin/dashboard"} className={"up underline"}>
                    관리자페이지
                </Category>
                {/*<button type={'button'} onClick={()=>{*/}
                {/*    sessionStorage.removeItem("u_name");*/}
                {/*    sessionStorage.u_name="세션이름 바꾸기";*/}
                {/*}}>세션 u_name 바꾸기</button>*/}
                {/* 세션 바꿔도 바로 안 바뀜 */}
            </Menubar>
            <Searchbar>
                <NavLink to={"/"}>
                    <b style={{fontSize: "30px"}}>동건닷컴</b>
                </NavLink>
                <span style={{marginRight: "20px"}}>

{
    sessionStorage.loginok !== 'yes' ?
        <>
            <Category to={"/user/login"} className={"down underline"}>
                로그인
            </Category>
            <Category to={"/user/signup"} className={"down underline"}>
                회원가입
            </Category>
        </> : <>
            <Category onClick={reissue} className={"down"}>
                로그인 연장
            </Category>
            <Category onClick={logout} className={"down"}>
                로그아웃
            </Category>
            <Category to={"/mypage/cart"} className={"down underline"}>
                장바구니
            </Category>
            <Category to={"/mypage/all"} className={"down underline"}>
                마이페이지
            </Category>
        </>
}
                    <TransitionsModal/>
        </span>
            </Searchbar>
        </>
    );
}

export default Menu;
