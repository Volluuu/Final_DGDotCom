import React from 'react';
import styled from "styled-components";
import StyleComponent from "./StyleComponent";

const SocialFeed = (props) => {
    const {styleList} = props;
    return (
        <div></div>
    );
};
const FeedStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 30px 40px 0px;
  width: 1280px;
  margin: 0 auto;

  & > ul {
    width: 24%;
    margin: 0.5%;
  }

  & > ul > li {
    margin-bottom: 5px;
  }

  @media (max-width: 1280px) {
    width: 100%;
    & > ul {
      width: 24%;
      margin: 0.5%;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 8px 0px;
    & > ul {
      width: 47.5%;
      margin: 1.25%;
    }
  }
`
export default SocialFeed;
