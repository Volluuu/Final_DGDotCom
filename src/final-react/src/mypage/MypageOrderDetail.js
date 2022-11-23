import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function MypageOrderDetail(props) {
  const [orderList, setOrderList] = useState(""); //데이터를 담을 state
  const [u_data, setU_data] = useState("");
  const u_num = sessionStorage.u_num;
  const merchant_uid = useParams("");
  const productUrl = localStorage.url;

  console.log(merchant_uid);

  //유저정보 불러오기
  const userdata = () => {
    let userUrl = localStorage.url + "/cart/userdata?u_num=" + u_num;

    axios.get(userUrl).then((res) => {
      // console.log("user 호출 성공");
      setU_data(res.data);
    });
  };

  const List = () => {
    let detailUrl =
      localStorage.url +
      "/trade/orderdetail?merchant_uid=" +
      merchant_uid.currentPage +
      "&u_num=" +
      u_num;

    axios.get(detailUrl).then((res) => {
      // alert("호출성공");
      setOrderList(res.data);
    });
  };

  console.log("data:" + JSON.stringify(orderList));

  useEffect(() => {
    List();
  }, []);

  return (
    <div data-v-39b2348a="" className="content_area">
      <div className="my_purchase">
        <div data-v-88eb18f6="" className="content_title">
          <div data-v-88eb18f6="" className="title">
            <h3 data-v-88eb18f6="">
              <b>주문 상세 내역</b>
              <br />
              <span style={{ fontSize: "0.6em" }}>
                님의 주문내역을 한 눈에 볼 수 있습니다!
              </span>
            </h3>
          </div>
        </div>
        <div data-v-0c307fea="" className="purchase_list_tab sell detail_tab">
          <div data-v-0c307fea="" className="tab_item tab_on">
            1
          </div>
          <div data-v-0c307fea="" className="tab_item tab_on">
            2
          </div>
          <div data-v-0c307fea="" className="tab_item tab_on">
            3
          </div>
        </div>
        <div className="period_search">
          <div className="period_month">4</div>
          <div className="period_calendar_wrapper">
            <div className="period_calendar">5</div>
            <div className="period_btn_box">
              <button className="btn_search is_active">조회</button>
            </div>
          </div>
        </div>
        <div data-v-f263fda4="">
          <div
            data-v-50c8b1d2=""
            data-v-f263fda4=""
            className="purchase_list all bid"
          >
            <div
              style={{
                display: "grid",
                gridTemplateRows: "repeat(14, 1fr)",
                gridTemplateColumns: "3fr 1fr 1fr 1fr 1fr 1fr",
                textAlign: "center",
              }}
            >
              <div style={{ gridColumn: "1/7", gridRow: "1/2" }}>
                <hr style={{ height: "3px" }} />
              </div>
              <b style={{ paddingTop: "6px" }}>상품정보</b>
              <b style={{ paddingTop: "6px" }}>할인</b>
              <b style={{ paddingTop: "6px" }}>개당 가격(수량)</b>
              <b style={{ paddingTop: "6px" }}>사이즈</b>
              <b style={{ paddingTop: "6px" }}>주문상태</b>
              <b style={{ paddingTop: "6px" }}>배송상태</b>
              <div style={{ gridColumn: "1/7", gridRow: "3/4" }}>
                <hr style={{ height: "3px" }} />
              </div>
              {orderList &&
                orderList.list.map((oitem, idx) => (
                  <React.Fragment key={idx}>
                    <span
                      style={{
                        textAlign: "left",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <Link to={`/product/detail/${oitem.p_num}`}>
                        <img alt="" src={productUrl + oitem.photo} />
                        <span>{oitem.p_name}</span>
                      </Link>
                      <span>{oitem.discount}</span>
                      <span>
                        {oitem.price}
                        <br />
                        {oitem.amount}
                      </span>
                      <span>{oitem.p_size}</span>
                      <span>{oitem.p_name}</span>
                      <span>{oitem.p_name}</span>
                    </span>
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>

        <div data-v-50c8b1d2="" className="purchase_list bidding ask">
          <div data-v-541a17ff="" data-v-50c8b1d2="" className="empty_area">
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
      </div>
    </div>
  );
}

export default MypageOrderDetail;
