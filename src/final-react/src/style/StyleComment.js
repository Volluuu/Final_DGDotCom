import React, {useEffect, useState} from 'react';
import axios from "axios";
import StyleReply from "./StyleReply";

const StyleComment = (props) => {
    const {style} = props;

    const [list, setList] = useState([]);
    const [commentUserData, setCommentUserData] = useState([]);

    const [commentData, setCommentData] = useState([{
        list           : {},
        commentUserData: {}
    }]);

    const getData = () => {
        axios.get(`http://localhost:9003/style/comment/root?style_num=${style.style_num}`).then(res => {
            setList(res.data);
            console.log(res.data);

        });
        list.map((elt) => {
            axios.get(`http://localhost:9003/style/user/num?num=${elt.u_num}`).then(res => {
                setCommentUserData(commentUserData.concat(res.data));
            })
        })
    }

    const getUserData = async () => {
        await axios.get(`http://localhost:9003/style/comment/root?style_num=${style.style_num}`).then(res => {
            console.dir(res.data);
            res.data.map((elt) => {
                axios.get(`http://localhost:9003/style/user/num?num=${elt.u_num}`).then(res => {
                    console.dir(res.data);
                    setCommentData(commentData.concat({
                        list           : elt,
                        commentUserData: res.data
                    }))
                })
            })
        });

    }

    // const comment_box = () => {
    //     const result = [];
    //     axios.get(`http://localhost:9003/style/comment/root?style_num=${style.style_num}`).then(res => {
    //         setList(res.data);
    //     });
    //     list.map((elt)=>result.concat(elt))
    //     return result;
    // }

    useEffect(() => {
        // getData();
        getUserData().then();
    }, []);


    return (<>
            <div style={{border: "1px solid black", height: "603px", overflowY: "auto", paddingLeft: "5px"}}>

                {/*{*/}
                {/*    list.map((elt, idx) =>*/}
                {/*        <div key={idx}>작성 내용 : {elt.content} <br/><StyleReply style={style}*/}
                {/*                                                              parent={elt.comment_num}/>*/}
                {/*        </div>)*/}
                {/*}*/}

                {
                    commentData.map((elt, idx) => <div key={idx}>
                        이름 : {elt.commentUserData.u_name} 작성 내용
                        : {elt.list.content} <br/><StyleReply style={style} parent={elt.list.comment_num}/>
                    </div>)
                }

            </div>
            <input style={{width: "100%", height: "50px", backgroundColor: "#CCC"}} placeholder={"댓글을 입력해주세요"}/>
        </>
    );
};

export default React.memo(StyleComment);
