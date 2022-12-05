import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import styled from "styled-components";

const StyleReply = (props) => {
    const {parent, style, cnt, plus, getData, list, deleteComment} = props;
    const [replyList, setReplyList] = useState([]);
    const [comment, setComment] = useState("");

    const answerRef = useRef([]);
    const answerInputRef = useRef([]);
    const openRef = useRef([]);

    const LeftMargin = cnt + "px";
    const minus = "-" + plus + "px";
    const getList = (props) => {
        axios.get(`${process.env.REACT_APP_URL}/style/comment/reply?parent=${parent}&style_num=${style.style_num}`).then(res => setReplyList(res.data));
    }
    const pressAnswer = (num) => {

        if (answerRef.current[num].value === "no") {
            answerRef.current[num].value = "yes";
            openRef.current[num].style.display = "inline";
            answerInputRef.current[num].style.display = "inline";
            answerInputRef.current[num].value = "";
        } else {
            answerRef.current[num].value = "no";
            openRef.current[num].style.display = "none";
            answerInputRef.current[num].style.display = "none";
            answerInputRef.current[num].value = "";
        }
    }
    const roadData = () => {
        getData();
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
            answerRef.current[num].value = "no";
            openRef.current[num].style.display = "none";
            answerInputRef.current[num].style.display = "none";
        }).then(r => {
            roadData();
        }).then(r => {
            getList();
        });
    }

    useEffect(() => {
        getList();
    }, [comment]);

    if (parent) {
        return (
            <div style={{paddingLeft: LeftMargin}}>
                {
                    replyList.map((elt, idx) =>
                        <div key={elt.comment_num}>
                            <div style={{fontSize: "14px"}}>
                                <div style={{display: "flex", paddingBottom: "10px"}}>
                                    <div style={{lineHeight: "26px", width: "45px", fontWeight: "600"}}>
                                        {elt.u_name} :
                                    </div>
                                    <div style={{}}>
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
                                {
                                    <form onSubmit={(e) => submitAnswer(e, idx, elt.comment_num)} ref={(element) => {
                                        openRef.current[idx] = element
                                    }} style={{display: "none", marginLeft:minus}}>
                                        <input style={{width: "320px", height: "48px", backgroundColor: "#CCC"}}
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
                                            textAlign: "center",
                                            marginLeft: "5px",
                                            height: "100%"
                                        }}
                                                type={"submit"}
                                        >등록
                                        </button>
                                    </form>
                                }
                                <div>
                                    <StyleReply style={style} parent={elt.comment_num} cnt={cnt} plus={plus + 10} getData={getData} list={list} deleteComment={deleteComment}/>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );

    }
    return (
        <div></div>
    )
};

export default StyleReply;
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