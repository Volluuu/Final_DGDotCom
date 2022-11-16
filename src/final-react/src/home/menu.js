import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import styled from "styled-components";
import TransitionsModal from "./SearchModal";
import axios from "axios";
import AnnouncementBar from "./AnnouncementBar";
import Swal from "sweetalert2";

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

  &.active {
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
    const [loginok, setLoginok] = useState("");
    const navi = useNavigate();

    useEffect(() => {
        setLoginok(sessionStorage.loginok);
    }, []);

    const logout = () => {
        localStorage.removeItem("accessToken");
        sessionStorage.removeItem("u_num");
        sessionStorage.removeItem("loginok");
        Swal.fire({
            icon: "success",
            text: "로그아웃 완료"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }
        })

    }

    return (
        <>
            <Menubar>
                <Category to={"/product/list"} className={"down"}>
                    상품 리스트
                </Category>
                <Category to={"/product/detail/1703"} className={"up"}>
                    상품 상세
                </Category>
                <Category to={"/admin/dashboard"} className={"up"}>
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
    loginok !== 'yes' ?
        <>
            <Category to={"/user/login"} className={"up"}>
                로그인
            </Category>
            <Category to={"/user/signup"} className={"up"}>
                회원가입
            </Category>
        </> : <>
            <Category className={"up"} onClick={logout}>
                로그아웃
            </Category>
            <Category to={"/mypage/cart"} className={"down"}>
                장바구니
            </Category>
            <Category to={"/mypage/all"} className={"down"}>
                마이페이지
            </Category>
        </>
}
                    <TransitionsModal/>
        </span>
            </Searchbar>
            <AnnouncementBar/>
        </>
    );
}

export default Menu;
