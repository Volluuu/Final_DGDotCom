import React from 'react';
import styled from "styled-components";

const StyleComponent = (props) => {
    const {elt} = props;
    const imgSrc = elt.photo;
    return (
        <WrapperDiv>
            <SocialImg src={imgSrc}/>
            <CardDetail>
                <div className="user_name">{elt.u_num}</div>
                <div className="text_box">
                    content : {elt.content} <br/>
                    tag : {elt.tag} <br/>
                    likes : {elt.likes} <br/>
                    comment : {elt.comment} <br/>
                    writeday : {elt.writeday} <br/>
                </div>
                <ul className="product_list">
                    <li>{elt.p_list}</li>
                </ul>
            </CardDetail>
        </WrapperDiv>
    );
};
const WrapperDiv = styled.div`
  width: 100%;
  background-color: mediumpurple;

`
const SocialImg = styled.img`
  width: 100%;
  border-radius: 10px;
`
const CardDetail = styled.div`
  padding: 8px 4px 0px;

  & > img {

  }

  & > .user_name {

  }

  & > div.text_box {
    width: 100%;
    word-break: break-all;
    flex-wrap: wrap;
  }

  & > .product_list {

  }
`
export default StyleComponent;
