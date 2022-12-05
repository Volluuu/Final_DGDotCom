import React from 'react';
import styled from "styled-components"
import {Link} from "react-router-dom";

const SearchElement = styled.div`
    border-bottom : 5px solid #dee2e6;
    display: flex;
    padding : 10px;
    & > img {
      border : 1px solid black; 
      width:80px;
      height:80px;
    }
  height: 100px;
  
`
const SearchCard = ({key, product, style}) => {

    const ProductUrl = `${process.env.REACT_APP_URL}/product/${product.photo}`
    const detailUrl = `/product/detail/${product.p_num}`
    return (
        <div className={"SearchCard-virtualized"} style={style}>
            <Link to={detailUrl}>
        <SearchElement>
            <img src={ProductUrl} alt=""/>
            <div style={{paddingLeft:"10px"}}>
                <p style={{fontSize:"12px" , marginBottom:"5px"}}>{product.brand}</p>
                <p style={{fontSize:"14px"}}>{product.p_name}</p>
            </div>
            </SearchElement>
            </Link>
        </div>
    );
};

export default React.memo(SearchCard);
