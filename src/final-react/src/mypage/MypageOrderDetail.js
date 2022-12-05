import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import OrderPay from "./OrderPay";
import OrderUser from "./OrderUser";

function MypageOrderDetail(props) {
  const [orderList, setOrderList] = useState(""); //데이터를 담을 state
  const [u_data, setU_data] = useState(""); //유저데이터
  const u_num = sessionStorage.u_num;
  const merchant_uid = useParams(""); //파라미터로 받은 data
  const productUrl = localStorage.url + "/product/";
  const navi = useNavigate();

  // console.log(merchant_uid);

  //유저정보 불러오기
  const userdata = () => {
    let userUrl = localStorage.url + "/cart/userdata?u_num=" + u_num;

    axios.get(userUrl).then((res) => {
      // console.log("user 호출 성공");
      setU_data(res.data);
    });
  };

  const List = () => {
    // if (orderList === "") {
    //   return;
    // }
    let detailUrl =
      localStorage.url +
      "/trade/orderdetail?merchant_uid=" +
      merchant_uid.currentPage +
      "&u_num=" +
      u_num;

    axios
      .get(detailUrl, {
        headers: { Authorization: `Bearer ${localStorage.accessToken}` },
      })
      .then((res) => {
        // alert("호출성공");
        setOrderList(res.data);
      })
      .catch((error) => {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        sessionStorage.removeItem("u_num");
        sessionStorage.removeItem("loginok");
        if (error.response.status === 401) {
          navi("/user/login");
          window.location.reload();
        } else if (error.response.status === 403) {
          Swal.fire({
            icon: "warning",
            title: "권한이 없습니다.",
          }).then((result) => {
            navi("/");
            window.location.reload();
          });
        }
      });
  };

  // const fdata = () => {
  //   let data = orderList.list[0];

  //   console.log("data:", data);
  // };

  useEffect(() => {
    List();
    userdata();
  }, []);

  // useEffect(() => {
  //   List();
  // }, [orderList]);

  // useEffect(() => {
  //   fdata();
  // }, [orderList]);

  return (
    <div>
      <div data-v-39b2348a="" className="content_area">
        <div className="my_purchase">
          <div data-v-88eb18f6="" className="content_title">
            <div data-v-88eb18f6="" className="title">
              <h3 data-v-88eb18f6="">
                <b>주문 상세 내역</b>
                &nbsp;
                <span style={{ fontSize: "0.6em" }}>
                  {u_data.u_name}님의 주문내역을 한 눈에 볼 수 있습니다!
                </span>
              </h3>
              <br />
              <h5>
                주문 번호 : {merchant_uid.currentPage} &nbsp;&nbsp;주문일자 :
                {orderList && orderList.list[0].day}
              </h5>
            </div>
          </div>
          <br />
          <div data-v-f263fda4="">
            <div
              data-v-50c8b1d2=""
              data-v-f263fda4=""
              className="purchase_list all bid"
            >
              <table
                style={{ textAlign: "center" }}
                className="table table-hover"
              >
                <thead>
                  <tr>
                    <th style={{ width: "30%" }}>상품정보</th>
                    <th style={{ width: "10%" }}>할인</th>
                    <th style={{ width: "10%" }}>개당 가격(수량)</th>
                    <th style={{ width: "10%" }}>사이즈</th>
                    <th style={{ width: "10%" }}>주문상태</th>
                    <th style={{ width: "10%" }}>배송상태</th>
                  </tr>
                </thead>

                {orderList &&
                  orderList.list.map((oitem, idx) => (
                    <tbody key={idx}>
                      <tr>
                        <td
                          style={{ textAlign: "left", verticalAlign: "middle" }}
                        >
                          <Link
                            style={{ verticalAlign: "middle" }}
                            to={`/product/detail/${oitem.p_num}`}
                          >
                            <img
                              alt=""
                              src={productUrl + oitem.photo}
                              width="100px"
                              style={{ float: "left" }}
                            />
                            <span>{oitem.p_name}</span>
                          </Link>
                        </td>
                        <td>
                          {oitem.discount}%
                          <br />(
                          {((oitem.price * oitem.discount) / 100)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          원)
                        </td>
                        <td>
                          {oitem.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          원
                          <br />({oitem.count}개)
                        </td>
                        <td>{oitem.p_size}</td>
                        <td style={{ whiteSpace: "pre-line" }}>
                          {oitem.invoice === null
                            ? "상품 준비중"
                            : `상품 발송
                            (${oitem.invoice})`}
                        </td>
                        <td>{oitem.state}</td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            </div>
          </div>
          <br></br>
          <div>
            <div style={{ float: "left", width: "50%" }}>
              <OrderPay row={orderList} />
            </div>
            <div style={{}}>
              <OrderUser row={orderList} />
            </div>
          </div>

          {/* <div data-v-50c8b1d2="" className="purchase_list bidding ask">
          <div data-v-541a17ff="" data-v-50c8b1d2="" className="empty_area"> */}
          <div style={{ textAlign: "center" }}>
            <br />
          </div>
        </div>
      </div>
      <br />
      <div
        style={{
          textAlign: "center",
          margin: "0 auto",
          width: "80%",
        }}
      >
        <Link
          data-v-3d1bcc82=""
          data-v-541a17ff=""
          to="/product/list"
          className="btn outlinegrey small"
        >
          {" "}
          SHOP 바로가기{" "}
        </Link>
      </div>
    </div>
  );
}

export default MypageOrderDetail;
