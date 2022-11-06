import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

function MypageOrderList(props) {
    const {currentPage} = useParams(); // currentPage 값 받아오기
    const [u_num, setU_num] = useState(sessionStorage.u_num); // 세션의 u_num으로 초기값 설정
    const [tradeData, setTradeData] = useState({}); // 페이징 처리할 모든 데이터 담기
    const [photoExpand, setPhotoExpand] = useState("230px"); // 사진에 마우스 오버 시 사진 확대
    const productUrl = localStorage.url + "/product/";

    // u_num 을 가진 거래내역 페이징 처리
    const getOrderList = () => {
        let orderListUrl = process.env.REACT_APP_URL + "/mypage/orderlist?u_num=" + u_num + "&currentPage=" + (currentPage === undefined ? 1 : currentPage);
        axios.get(orderListUrl)
            .then(res => {
                setTradeData(res.data);
            })
    }

    useEffect(() => {
        getOrderList();
    }, [currentPage])

    return (
        <div data-v-0358dbdc="" data-v-92942946="" className="search_result lg">
            <div data-v-0358dbdc="" className="search_result_list" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr"}}>
                {
                    tradeData.plist &&
                    tradeData.plist.map((item, i) => (
                        <div key={i} data-v-3b925b8c="" data-v-0358dbdc="" className="search_result_item"
                             ><a data-v-3b925b8c=""
                                                         href={`/product/detail/${item.p_num}`}
                                                         className="item_inner">
                            <div data-v-edf7886c="" data-v-3b925b8c="" className="product"
                                 style={{backgroundColor: "rgb(244, 244, 244)"}}>
                                <picture data-v-6c8b3524="" data-v-edf7886c="" className="picture product_img">
                                    <img data-v-6c8b3524="" alt=""
                                         src={productUrl + item.photo}
                                         className="image"/>
                                </picture>
                            </div>
                            <div data-v-3b925b8c="" className="product_info">
                                <div data-v-3b925b8c="" className="title"><p data-v-3b925b8c=""
                                                                             className="brand">{item.brand}</p>
                                    <p data-v-3b925b8c="" className="translated_name">{item.p_name}</p></div>
                                {/*<div data-v-6da6dff3="" data-v-3b925b8c="" className="badge badge_product shipping_express"> 빠른배송</div>*/}
                                <div data-v-3b925b8c="" className="price">
                                    <div data-v-3b925b8c="" className="amount"><span data-v-3b925b8c=""
                                                                                     className="discount_rate">{`${item.discount === 0 ? "" : item.discount + "% 할인"}`}</span> {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                                    </div>
                                    {/*<div data-v-3b925b8c="" className="desc"><p data-v-3b925b8c="">즉시 구매가</p></div>*/}
                                </div>
                            </div>
                        </a>
                            <div data-v-3b925b8c="" className="interest_figure"><span data-v-3b925b8c=""
                                                                                      className="wish_figure"><a
                                data-v-150a7ea0="" data-v-3b925b8c="" href="#" aria-label="별점" className="btn_wish">
                        {/*    아이콘 들어갈 자리 href 수정 */}별</a><span
                                data-v-3b925b8c="" className="text">0</span></span><span data-v-3b925b8c=""
                                                                                         className="review_figure"><a
                                data-v-3b925b8c="" href="/social/products/48860" className="review_link"
                                aria-label="리뷰 개수">
                        {/*    아이콘 들어갈 자리 href 리뷰 보는 곳으로 */}리뷰
                        </a><span
                                data-v-3b925b8c="" className="text">0</span></span></div>
                        </div>
                    ))
                }

            </div>
        </div>
    );
}

export default MypageOrderList;