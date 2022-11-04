import React from 'react';
import {useParams} from "react-router-dom";

function ProductDetail(props) {
    const {p_num}=useParams();
    console.log(p_num);
    return (
        <div>
            <h1>상품 상세 폼</h1>
        </div>
    );
}

export default ProductDetail;