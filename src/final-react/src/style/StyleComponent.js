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
    const imgSrc = `http://localhost:9003/mystyle/${elt.photo}`;
    const [userData, setUserData] = useState({});
    const [genderImg, setGenderImg] = useState('');
    const [check, setCheck] = useState(false);
    const getUser = () => {
        const res = axios.get(`http://localhost:9003/style/user/num?num=${elt.u_num}`).then(r => {
            setUserData(r.data);
            setGenderImg(`${r.data.gender}.png`);
            elt.writeday = elt.writeday.substr(0, 10);

        });
    }

    //좋아요 버튼을 눌렀을 때 색깔이 바뀌는 이벤트 + axios를 호출하여 like 수를 바꿔주는 이벤트
    const likeChange = e => {
        e.preventDefault();
        if(check) {
            setCheck(false);
            //게시글의 like count를 -1하는 axios 호출 ***************************************************************
        } else {
            setCheck(true);
            //게시글의 like count를 +1하는 axios 호출 ***************************************************************
        }
    }
    //axios를 호출하여 커멘트의 갯수를 가져오는 함수
    const getCommentCount = () => {

    }


    useEffect(() => {
        getUser();
    }, []);

    return (
        <WrapperDiv>
            <MyStyleDetail elt={elt} key={elt.style_num}>
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
                        elt.tag.split(",").map((elt, idx) => <span key={elt} style={{marginRight: "3px"}}>#{elt}</span>)
                    }
                </div>
                <div className="likeAndComment">
                    {
                        sessionStorage.loginok === undefined ?
                            <ThumbUpAltOutlinedIcon onClick={likeChange} fontSize={"small"} style={{marginRight: "3px", cursor:"pointer"}}/> :
                            check === true? <ThumbUpAltIcon onClick={likeChange} fontSize={"small"} style={{marginRight: "3px", color:"#444" ,cursor:"pointer"}}/> :
                                <ThumbUpAltOutlinedIcon onClick={likeChange} fontSize={"small"} style={{marginRight: "3px", cursor:"pointer"}}/>

                    }{elt.likes}
                    <SmsOutlinedIcon fontSize={"small"} style={{marginLeft: "5px", marginRight: "3px"}}/>{elt.comment}
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
  & > div.\ {
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
    color:#AAA;
  }
`
export default React.memo(StyleComponent);
