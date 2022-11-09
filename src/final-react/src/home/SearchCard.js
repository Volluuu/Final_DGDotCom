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
const Virtual = styled.div`
     & + .SearchCard-virtualized {
      & + & {
        border-top: 1px solid  #dee2e6;
      }
      &:nth-child(even) {
        background: #f8f9fa;
      }
    }
`
const SearchCard = ({key, product, style}) => {

    const ProductUrl = `http://localhost:9003/product/${product.photo}`
    const detailUrl = `/product/detail/${product.p_num}`
    console.log(ProductUrl);
    return (
        <div className={"SearchCard-virtualized"} style={style}>
            <Link to={detailUrl}>
        <SearchElement>
            <img src={ProductUrl} alt=""/>
            <div style={{paddingLeft:"10px"}}>
                <p style={{fontSize:"14px" , marginBottom:"5px"}}>{product.brand}</p>
                <p style={{fontSize:"18px"}}>{product.p_name}</p>
            </div>
            </SearchElement>
            </Link>
        </div>
    );
};

export default React.memo(SearchCard);
