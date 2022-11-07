import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import styled from "styled-components";
import TransitionsModal from "./SearchModal";

const Menubar = styled.div`
  background-color: #eee;
  border: 1px solid black;
  display: flex;
  justify-content: right;
  margin-bottom: 10px;
`
const Searchbar = styled.div`
  display: flex;
  justify-content: space-between;
  
`
const Category = styled(NavLink)`
  font-size: 1.5rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: black;
  padding-bottom: 0.25rem;

  &:hover {
    color: #CCC;
  }

  &.active {
    font-weight: 600;
    border-bottom: 4px solid #495057;
    color: #495057;

    &:hover {
      color: #CCC;
    }
  }

  & + & {
    margin-left: 8rem;
  }
`

function Menu(props) {
    const [u_name, setU_name] = useState("");

    useEffect(() => {
        setU_name(sessionStorage.u_name);
    }, []);

    return (
        <>
            <Menubar>

                <Category to={"/user/login"}>로그인</Category>
                <Category to={"/user/signup"}>회원가입</Category>
                <Category to={"/product/list/1"}>상품 리스트</Category>
                <Category to={"/product/detail/1703"}>상품 상세</Category>
                <Category to={"/admin"}>관리자페이지</Category>
                <Category to={"/mypage/all"}>마이페이지</Category>

                {/*<button type={'button'} onClick={()=>{*/}
                {/*    sessionStorage.removeItem("u_name");*/}
                {/*    sessionStorage.u_name="세션이름 바꾸기";*/}
                {/*}}>세션 u_name 바꾸기</button>*/}
                {/* 세션 바꿔도 바로 안 바뀜 */}
            </Menubar>
            <Searchbar>
                <NavLink to={"/"}>홈(메인)</NavLink>
                <span>
                    <TransitionsModal/>
                    [{u_name}]님
                </span>
            </Searchbar>    
        </>
    );
}

export default Menu;
