import React, {useEffect, useState} from 'react';
import axios from "axios";
import styled from "styled-components";
import {Link} from "react-router-dom";

const SelectedProduct = (props) => {
    const {elt} = props;
    const [product, setProduct] = useState({});
    const getProduct = () => {
        axios.get(`http://localhost:9003/style/user/selected?num=${elt}`).then(r => {
            setProduct(r.data);
        })
    }
    const getName = () => {
        return product.p_name;
    }

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <Link to={"/product/detail/" + product.p_num}>
            <Wrapper>
                <img src={"http://localhost:9003/product/" + product.photo} alt=""/>
                <div>
                    <div>{getName()}</div>
                    <div>{product.price}원</div>
                </div>
            </Wrapper>
        </Link>
    );
};

export default React.memo(SelectedProduct);

const Wrapper = styled.div`
  display: flex;

  & > img {
    width: 20%;
  }

  & > div {
    margin: auto;

    & > div {
      font-size: 12px;
      width: 200px;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`