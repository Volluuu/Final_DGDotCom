import React, {useEffect, useState} from 'react';
import { ResponsivePie} from "@nivo/pie";
import './admin.css';
import {PieChart} from "@material-ui/icons";
import axios from "axios";



function DashBoard(props) {
    const [udata, setUdata] = useState([]);
    const [pdata, setPdata] = useState('');

    const userList = () => {
        let userUrl = localStorage.url + "/admin/user";
        axios.get(userUrl)
            .then(res => {
                setUdata(res.data);
            });
    }
    useEffect(() => {
        userList();
    }, []); //처음시작시 딱 한번 호출

    const product = () => {
        let producturl = localStorage.url +"/admin/product";
        axios.get(producturl)
            .then(res => {
                setPdata(res.data);
            });
    }
    useEffect(() => {
        product();
    }, []); //처음시작

    return (

        <div>
            {/*대쉬보드 카드 시작*/}
            <div className='container-fluid'>
                <div className='row'>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div
                                            className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            총 회원 수
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{udata.length}명</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fa-solid fa-user fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-success shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div
                                            className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                            상품 수
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{pdata.length}개</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fa-solid fa-plane fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-info shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div
                                            className="text-xs font-weight-bold text-info text-uppercase mb-1">오늘
                                            작성된 리뷰
                                        </div>
                                        <div className="row no-gutters align-items-center">
                                            <div className="col-auto">
                                                <div
                                                    className="h5 mb-0 mr-3 font-weight-bold text-gray-800">37개
                                                </div>
                                            </div>
                                            <div className="col">

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fa-solid fa-comment-medical fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-warning shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div
                                            className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                            새로운 문의사항
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">78개</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fa-solid fa-question fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/*대쉬보드카드 끝*/}
            <div>
        <graph/>
            </div>
        </div>
    );
}

export default DashBoard;