import React, {useEffect, useState} from 'react';
import axios from "axios";
import StyleReply from "./StyleReply";

const StyleComment = () => {
    const [list, setList] = useState([]);
    const getList = () => {
        axios.get("http://localhost:9003/style/comment/root").then(res=>setList(res.data));
        console.log(list);
    }

    useEffect(() => {
        getList();
    }, []);

    return (
        <div style={{border:"1px solid black", width:"600px"}}>
            {list.map((elt, idx)=><div>작성자 u_num : {elt.u_num}/ 작성 내용 : {elt.content} <br/><StyleReply parent={elt.comment_num}/></div>)}
        </div>
    );
};

export default StyleComment;
