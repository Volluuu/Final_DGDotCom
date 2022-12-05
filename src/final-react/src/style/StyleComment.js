import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import StyleReply from "./StyleReply";
import styled from "styled-components";

const StyleComment = (props) => {
    const {style} = props;

    const [list, setList] = useState([]);
    const [comment, setComment] = useState("");
    const commentRef = useRef();
    const answerRef = useRef([]);
    const answerInputRef = useRef([]);
    const openRef = useRef([]);
    const getData = () => {
        axios.get(`${process.env.REACT_APP_URL}/style/comment/root?style_num=${style.style_num}`).then(res => {
            setList(res.data);
        });
    }

    const submitComment = (e) => {
        e.preventDefault();
        if (sessionStorage.loginok === undefined) {
            alert("댓글은 로그인 한 후 적을 수 있어요");
            setComment("");
            commentRef.current.value = "";
            return;
        }
        axios({
            method: "POST",
            url   : process.env.REACT_APP_URL + `/style/comment/insert`,
            data  : {
                "u_num"    : sessionStorage.u_num,
                "style_num": style.style_num,
                "content"  : comment,
                "root"     : "yes",
                "parent"   : null
            }
        }).then(r => {
            setComment("");
            commentRef.current.value = "";
        });
    }
    const pressAnswer = (num) => {
        console.log(answerRef.current[num].value);

        if (answerRef.current[num].value === "no") {
            answerRef.current[num].value = "yes";
            openRef.current[num].style.display = "inline";
            answerInputRef.current[num].style.display = "inline";
            answerInputRef.current[num].value = "";
            answerInputRef.current[num].focus();
        } else {
            answerRef.current[num].value = "no";
            openRef.current[num].style.display = "none";
            answerInputRef.current[num].style.display = "none";
            answerInputRef.current[num].value = "";
        }
    }
    const submitAnswer = (e, num, comment_num) => {
        e.preventDefault();
        if (sessionStorage.loginok === undefined) {
            alert("댓글은 로그인 한 후 적을 수 있어요");
            setComment("");
            answerInputRef.current[num].value = "";
            return;
        }
        axios({
            method: "POST",
            url   : process.env.REACT_APP_URL + `/style/comment/insert`,
            data  : {
                "u_num"    : sessionStorage.u_num,
                "style_num": style.style_num,
                "content"  : comment,
                "root"     : "no",
                "parent"   : comment_num
            }
        }).then(r => {
            setComment("");
            commentRef.current.value = "";
            answerRef.current[num].value = "no";
            openRef.current[num].style.display = "none";
            answerInputRef.current[num].style.display = "none";
        }).then(r => {
            getData();
            console.log("submitAnswer 내의 getdata");
        });
    }

    const deleteComment = (num) => {
        if (window.confirm("정말로 댓글을 삭제 하시겠습니까?")) {
            axios.post(process.env.REACT_APP_URL + `/style/comment/delete?comment_num=${num}`).then(r => {
                alert("삭제되었습니다.")
            })
        }
    }
    const reviseComment = () => {

    }

    useEffect(() => {
        getData();
    }, [comment]);


    return (<>
            <UnactiveScroll>
                {
                    list.length < 1 ? <div style={{
                            width: "200px",
                            height: "100px",
                            margin: "0 auto",
                            textAlign: "center",
                            lineHeight: "100px",
                            color: "#CCC"
                        }}>댓글이 없어요!</div> :
                        list.map(
                            (elt, idx) =>
                                <div key={elt.comment_num}>
                                    <div style={{display: "flex", fontSize: "14px", paddingBottom: "10px"}}>
                                        <div style={{width: "45px", height: "100%", fontWeight: "600"}}>
                                            {elt.u_name} :
                                        </div>
                                        <div style={{width: "80%", wordBreak: "break-all"}}>
                                            {elt.isdel ? <div style={{color:"#ccc", display:"inline-block", height:"100%"}}>삭제된 댓글입니다</div> :
                                                <div style={{display:"inline-block", height:"100%"}}>{elt.content}</div>}
                                            <Answer ref={(element) => {
                                                answerRef.current[idx] = element;
                                            }}
                                                    value={"no"}
                                                    onClick={() => pressAnswer(idx)}
                                            >답글</Answer>
                                            {sessionStorage.u_num==elt.u_num? <DeleteButton onClick={() => deleteComment(elt.comment_num)}>
                                                x
                                            </DeleteButton> : ""}
                                        </div>
                                    </div>
                                    <form onSubmit={(e) => submitAnswer(e, idx, elt.comment_num)} ref={(element) => {
                                        openRef.current[idx] = element
                                    }} style={{display: "none"}}>
                                        <input style={{width: "90%", height: "48px", backgroundColor: "#CCC"}}
                                               placeholder={"댓글을 입력해주세요"}
                                               ref={(element) => {
                                                   answerInputRef.current[idx] = element
                                               }}
                                               onKeyUp={() => {
                                                   let searchQuery = answerInputRef.current[idx].value;
                                                   setTimeout(() => {
                                                       if (searchQuery === answerInputRef.current[idx].value) {
                                                           setComment(searchQuery);
                                                       }
                                                   }, 100);
                                               }}
                                        />
                                        <button style={{
                                            fontFamily: "inherit",
                                            textAlign : "center",
                                            marginLeft: "5px",
                                            height    : "100%"
                                        }}
                                                type={"submit"}
                                        >등록
                                        </button>
                                    </form>
                                    <div key={idx}>
                                        <StyleReply style={style} parent={elt.comment_num} cnt={10} plus={10}
                                                    getData={getData} list={list} deleteComment={deleteComment}/>
                                    </div>
                                </div>
                        )
                }
            </UnactiveScroll>
            <div style={{border: "1px solid #CCC", borderLeft: "none", width: "100%"}}>
                <form onSubmit={submitComment}>
                    <input style={{width: "90%", height: "48px", backgroundColor: "#CCC"}}
                           placeholder={"댓글을 입력해주세요"}
                           ref={commentRef}
                           onKeyUp={() => {
                               let searchQuery = commentRef.current.value;
                               setTimeout(() => {
                                   if (searchQuery === commentRef.current.value) {
                                       setComment(searchQuery);
                                   }
                               }, 100);
                           }}
                    />
                    <button style={{fontFamily: "inherit", textAlign: "center", marginLeft: "5px", height: "100%"}}
                            type={"submit"}
                    >등록
                    </button>
                </form>
            </div>

        </>
    );
};

export default StyleComment;

const UnactiveScroll = styled.div`

  border: 1px solid #CCC;
  border-top: none;
  border-bottom: none;
  height: 600px;
  overflow-y: auto;
  padding-left: 5px;
  width: 400px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-height: 768px) {
    height: 400px;
  }
`
const Answer = styled.button`
  font-size: 10px;
  font-family: inherit;
  color: #2c9faf;

  &:hover {
    color: #96dbe4;
  }

  margin-left: 5px;
`

const DeleteButton = styled.button`
  margin-left: 5px;
  color: #ccc;
`