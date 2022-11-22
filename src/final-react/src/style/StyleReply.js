import React, {useEffect, useState} from 'react';
import axios from "axios";

const StyleReply = (props) => {
    const {parent} = props;
    const [replyList, setReplyList] = useState([]);
    console.log("parent : " + parent);
    const getList = () => {
        axios.get(`http://localhost:9003/style/comment/reply?parent=${parent}`).then(res=>setReplyList(res.data));
    }

    useEffect(() => {
        getList();
    }, []);
    if(parent) {
        return (
            <div style={{marginLeft:"20px"}}>
                {
                    replyList.map((elt, idx)=><div>대댓글 / 내 부모의 parent값은 {elt.parent} 나의 comment_num은 {elt.comment_num}
                        <StyleReply parent={elt.comment_num}/></div>)
                }
            </div>
        );

    }
    return (
        <div></div>
    )
};

export default StyleReply;
