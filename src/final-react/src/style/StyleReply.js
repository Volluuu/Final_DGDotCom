import React, {useEffect, useState} from 'react';
import axios from "axios";

const StyleReply = (props) => {
    const {parent, style} = props;
    const [replyList, setReplyList] = useState([]);
    const [newList, setNewList] = useState([{
        list : {},
        commentUserData : {}
    }]);
    const getList = () => {
        axios.get(`http://localhost:9003/style/comment/reply?parent=${parent}&style_num=${style.style_num}`).then(res=>setReplyList(res.data));
    }
    const getUserData = async () => {
        await axios.get(`http://localhost:9003/style/comment/reply?parent=${parent}&style_num=${style.style_num}`).then(res => {
            res.data.map((elt) => {
                axios.get(`http://localhost:9003/style/user/num?num=${elt.u_num}`).then(res => {
                    setNewList(newList.concat({
                        list           : elt,
                        commentUserData: res.data
                    }))
                })
            })
    });
    }

    useEffect(() => {
        // getList();
        getUserData().then();
    }, []);
    if(parent) {
        return (
            <div style={{marginLeft:"20px"}}>
                {
                    replyList.map((elt, idx)=><div>대댓글 / 내 부모의 parent값은 {elt.parent} 나의 comment_num은 {elt.comment_num}
                        <StyleReply style={style} parent={elt.comment_num}/></div>)
                }
                {
                    newList.map((elt, idx)=><div>대댓글 / 내 부모의 parent값은 {elt.list.parent} 나의 comment_num은 {elt.list.comment_num}
                        <StyleReply style={style} parent={elt.list.comment_num}/></div>)
                }
            </div>
        );

    }
    return (
        <div></div>
    )
};

export default StyleReply;
