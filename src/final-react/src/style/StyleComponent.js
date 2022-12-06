import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import SelectedProduct from "./SelectedProduct";
import MyStyleDetail from "./MyStyleDetail";

const StyleComponent = (props) => {
    const {elt} = props;
    const imgSrc = localStorage.url + `/mystyle/${elt.photo}`;
    const [userData, setUserData] = useState({});
    const [genderImg, setGenderImg] = useState('');
    const [check, setCheck] = useState(false);
    const [like, setLike] = useState(0);
    const [comment, setComment] = useState(0);
    const getUser = async () => {
        await axios.get(`${process.env.REACT_APP_URL}/style/user/num?num=${elt.u_num}`).then(r => {
            setUserData(r.data);
            setGenderImg(`${r.data.gender}.png`);
            elt.writeday = elt.writeday.substr(0, 10);
        });
    }

    //axios를 호출하여 커멘트의 갯수를 가져오는 함수
    const getLikeCount = async () => {
        const res = await axios.get(`${process.env.REACT_APP_URL}/style/list/like/count?style_num=${elt.style_num}`);
        setLike(res.data);
    }
    const getCommentCount = async () => {
        const res = await axios.get(`${process.env.REACT_APP_URL}/style/list/comment/count?style_num=${elt.style_num}`)
        setComment(res.data);
    }
    const isCheck = async () => {
        if(sessionStorage.loginok===undefined) {

        } else {
            const res = await axios.get(`${process.env.REACT_APP_URL}/style/list/like/check/?u_num=${sessionStorage.u_num}&style_num=${elt.style_num}`)
                setCheck(res.data);
        }

    }
    //좋아요 버튼을 눌렀을 때 색깔이 바뀌는 이벤트 + axios를 호출하여 like 수를 바꿔주는 이벤트
    const likeChange = async e => {
        e.preventDefault();
        if(sessionStorage.loginok===undefined) {
            alert("로그인 한 후 좋아요를 누를 수 있어요");
            return;
        }
        if(check) {
            await setCheck(false);
            //게시글의 like count를 -1하는 axios 호출 ***************************************************************
            await axios.post(`${process.env.REACT_APP_URL}/style/list/like/substract/?u_num=${sessionStorage.u_num}&style_num=${elt.style_num}`).then(r=>{
                alert("좋아요 감소");
                getLikeCount();
            })
        } else {
            setCheck(true);
            //게시글의 like count를 +1하는 axios 호출 ***************************************************************
            await axios.post(`${process.env.REACT_APP_URL}/style/list/like/add/?u_num=${sessionStorage.u_num}&style_num=${elt.style_num}`).then(r=>{
                alert("좋아요 증가");
                getLikeCount();
            })
        }
    }

    useEffect(() => {
        getUser().then();
        getLikeCount().then();
        getCommentCount().then();
        isCheck().then();
    }, []);

    return (
        <WrapperDiv>
            <MyStyleDetail elt={elt} key={elt.style_num} gender={genderImg} userData={userData}>
                <SocialImg src={imgSrc}/>
            </MyStyleDetail>
            <CardDetail>
                <div className="user_name">
                    <img src={genderImg} alt="" style={{width: "24px", marginRight: "10px"}}/>
                    {userData.u_name}</div>
                <div className="text_box">
                    {elt.content}
                </div>
                <div className="tag_box">
                    {
                        elt.tag==="" ? <span key={elt} style={{marginRight: "3px"}}>선택된 태그가 없습니다.</span> :
                        elt.tag.split(",").map((elt, idx) => <span key={elt} style={{marginRight: "3px"}}>#{elt}</span>)
                    }
                </div>
                <div className="likeAndComment">
                    {
                        sessionStorage.loginok === undefined ?
                            <ThumbUpAltOutlinedIcon onClick={likeChange} fontSize={"small"} style={{marginRight: "3px", cursor:"pointer"}}/> :
                            check === true? <ThumbUpAltIcon onClick={likeChange} fontSize={"small"} style={{marginRight: "3px", color:"#444" ,cursor:"pointer"}}/> :
                                <ThumbUpAltOutlinedIcon onClick={likeChange} fontSize={"small"} style={{marginRight: "3px", cursor:"pointer"}}/>

                    }
                    <div style={{height:"20px", lineHeight:"22px", marginRight:"5px"}}>{like}</div>
                    <MyStyleDetail elt={elt} key={elt.style_num} gender={genderImg} userData={userData}>
                        <SmsOutlinedIcon fontSize={"small"} style={{marginLeft: "5px", marginRight: "3px"}}/>{comment}
                    </MyStyleDetail>
                </div>
                <div className="product_list">
                    {
                        elt.p_list.split(",").map((elt,idx)=><SelectedProduct elt={elt} key={elt}/>)
                    }
                </div>
            </CardDetail>
        </WrapperDiv>
    );
};
const WrapperDiv = styled.div`
  width: 100%;
`
const SocialImg = styled.img`
  width: 100%;
  border-radius: 10px;
`
const CardDetail = styled.div`
  text-align: left;
  padding: 8px 4px 0px;
  margin-left: 8px;
  & > div. {
  }

  & > img {

  }

  & > .user_name {
    font-size: 15px;
    line-height: 24px;
    margin-bottom: 10px;
  }

  & > div.text_box {
    width: 100%;
    word-break: break-all;
    flex-wrap: wrap;
  }

  & > div.tag_box {
    margin-bottom: 5px;
  }

  & > div.likeAndComment{
    display: flex;
    color:#AAA;
    line-height: 50%;
  }
`
export default React.memo(StyleComponent);
