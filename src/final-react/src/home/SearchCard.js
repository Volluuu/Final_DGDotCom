import React from 'react';
import styled from "styled-components"

const SearchElement = styled.div`
    border : 1px solid black;
    padding : 10px;
    & > img {
      border : 1px solid black;

      width:80px;
      height:80px;
    }
`

const SearchCard = ({key, product}) => {

    const ProductUrl = `http://localhost:9003/product/${product.photo}`
    console.log(ProductUrl);
    return (
        <SearchElement>
            <img src={ProductUrl} alt=""/>
        </SearchElement>
    );
};

export default React.memo(SearchCard);
