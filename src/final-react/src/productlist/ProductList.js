import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function ProductList(props) {
  localStorage.url = process.env.REACT_APP_URL;
  const navi = useNavigate();
  const [productlist, setProductlist] = useState();

  const { currentPage } = useParams();
  console.log("proCP:" + currentPage);

  const productUrl = localStorage.url + "/product/";
  console.log("proUrl:" + productUrl);

  const getPageList = () => {
    let url = localStorage.url + "/product/list?currentPage=" + currentPage;

    console.log("Url:" + url);
    axios.get(url).then((res) => {
      console.log("axios 성공");
      setProductlist(res.data);
    });
  };

  useEffect(() => {
    console.log("list 호출");
    getPageList();
  }, [currentPage]);

  return (
    <div>
      <h1>상품 리스트 폼</h1>
      {productlist &&
        productlist.list.map((pl, i) => (
          <Link to={`/product/detail/${pl.p_num}`} key={i}>
            <div
              style={{
                width: "300px",
                height: "420px",
                display: "inline-block",
                marginLeft: "20px",
                marginRight: "20px",
                textAlign: "center",
              }}
              key={i}
              p_num={pl.p_num}
            >
              <img
                alt=""
                src={productUrl + pl.photo}
                width="300px"
                height="300px"
                style={{ margin: "0 auto" }}
              />
              <br />
              <span>{pl.brand}</span>
              <br />
              <span>{pl.p_name}</span>
              <br />
              <span>
                {Number(pl.price)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                원
              </span>
              <br />
              {pl.discount === 0 ? <></> : <span>{pl.discount}%</span>}
            </div>
          </Link>
        ))}
    </div>
  );
}

export default ProductList;
