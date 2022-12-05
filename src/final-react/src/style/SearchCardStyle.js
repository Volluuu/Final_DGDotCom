import React from 'react';
import styled from "styled-components"
import {Link} from "react-router-dom";

const SearchElement = styled.div`
    border-bottom : 5px solid #dee2e6;
    display: flex;
    padding : 10px;
  cursor:pointer;
  width: 100%;
    & > img {
      border : 1px solid black; 
      width:80px;
      height:80px;
    }
  height: 100px;
`

const SearchCardStyle = ({ thisProduct, style, product, setProduct, handleClose}) => {

    const ProductUrl = `${process.env.REACT_APP_URL}/product/${thisProduct.photo}`

    const onClick = (p_num) => {
        for(let i = 0; i < product.length; i++) {
            if(product[i].p_num === p_num) {
                alert("이미 추가한 상품입니다.")
                return;
            }
        }
        setProduct(product.concat(thisProduct));
        handleClose();
    }

    return (
        <div className={"SearchCard-virtualized"} style={style}>
                <SearchElement onClick={()=>onClick(thisProduct.p_num)}>
                    <img src={ProductUrl} alt=""/>
                    <div style={{paddingLeft:"10px"}}>
                        <p style={{fontSize:"12px" , marginBottom:"5px"}}>{thisProduct.brand}</p>
                        <p style={{fontSize:"14px"}}>{thisProduct.p_name}</p>
                    </div>
                </SearchElement>
        </div>
    );
};

export default React.memo(SearchCardStyle);
