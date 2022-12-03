import React, {useEffect, useState} from 'react';
import './admin.css';
import axios from "axios";
import {Pie} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';
import './userTable.css';
import {Chart, ArcElement,CategoryScale,LineController, LineElement, PointElement, LinearScale, Title,registerables} from 'chart.js'
import {useParams} from "react-router-dom";
Chart.register(CategoryScale,ArcElement,LineController, LineElement, PointElement, LinearScale, Title,...registerables);

function DashBoard(props) {
    const {currentPage} = useParams();
    const [dashproduct, setDashproduct] = useState([]);
    const [udata, setUdata] = useState('');
    const [pdata, setPdata] = useState([]);
    const [rdata, setRdata] = useState('');
    const [stdata, setStdata] = useState('');

    const photouurl = localStorage.url + "/product/";

    let sdata = {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [
            {
                type: 'bar',
                label: '요일별 판매량',
                backgroundColor: 'rgb(75, 192, 192)',
                data: [2230000, 2059692, 3069504, 4950493, 3493829, 7695038, 6005340],
                borderWidth: 2,
            },
        ],
    };

    let cdata = {
        labels: ['스몰레더', '가방', '스웨트 셔츠', '반바지', '스니커즈'],
        datasets: [
            {
                label: '상품별 갯수',
                data: [94, 193, 121, 114, 149],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderWidth: 2,
            },
        ],
    };

    const userList = () => {
        let userUrl = localStorage.url + "/admin/user";
        axios.get(userUrl)
            .then(res => {
                setUdata(res.data);
            });
    }

    const product = () => {
        let producturl = localStorage.url + "/admin/allproduct";
        axios.get(producturl)
            .then(res => {
                setPdata(res.data);
            });
    }

    const review = () => {
        let reviewUrl = localStorage.url + "/admin/review";
        axios.get(reviewUrl)
            .then(res => {
                setRdata(res.data);
            });
    }

    const style = () => {
        let styleUrl = localStorage.url + "/admin/style";
        axios.get(styleUrl)
            .then(res => {
                setStdata(res.data);
            })
    }

    const productPaging = () => {
        let productListurl = localStorage.url + "/admin/ProductPaging?currentPage=" + (currentPage === undefined ? '1' : currentPage);
        axios.get(productListurl)
            .then(res => {
                console.dir(res.data);
                setDashproduct(res.data);
            });
    }


    useEffect(() => {
        userList();
        product();
        review();
        style();
    }, []); //처음시작시 딱 한번 호출

    useEffect(() => {
        productPaging();
    }, [currentPage])


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
                                                    className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{rdata.length}개
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
                                            스타일 개수
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{stdata}개</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fa-solid fa-question fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*// <!-- Content Row -->*/}

                <div className="row">

                    {/*// <!-- Area Chart -->*/}
                    <div className="col-xl-8 col-lg-7">
                        <div className="card shadow mb-4">

                            {/*// <!-- Card Header - Dropdown -->*/}
                            <div
                                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">일별 판매량</h6>
                                <div className="dropdown no-arrow">

                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                         aria-labelledby="dropdownMenuLink">
                                    </div>
                                </div>
                            </div>
                            {/*// <!-- Card Body -->*/}
                            <div className="card-body">
                                <div style={{width: '100%'}}>
                                    <Line type="line" data={sdata}
                                          style={{width: '100%', minWidth: '100%', height: '100%'}}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*// <!-- Pie Chart -->*/}
                    <div className="col-xl-4 col-lg-2">
                        <div className="card shadow mb-4">
                            {/*//  <!-- Card Header - Dropdown -->*/}
                            <div
                                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">상품별 개수</h6>
                                <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                    </a>
                                </div>
                            </div>
                            {/*// <!-- Card Body -->*/}
                            <div className="card-body">
                                <div>
                                    <div style={{width: '97%'}}>
                                        <Pie type="pie" data={cdata}
                                             style={{width: '95%', height: '100%', minHeight: '100%'}}/>
                                    </div>
                                </div>
                                <div className="mt-4 text-center small">
                                        <span className="mr-2">
                                            <i className="fas fa-circle text-primary"></i>
                                        </span>
                                    <span className="mr-2">
                                            <i className="fas fa-circle text-success"></i>
                                        </span>
                                    <span className="mr-2">
                                            <i className="fas fa-circle text-info"></i>
                                        </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




            </div>


            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between"
            style={{marginLeft:'10px'}}>
                <h6 className="m-0 font-weight-bold text-primary">최근 등록 상품</h6>

            </div>
            {/*최근 등록 상품 시작*/}
            <div className='hjhj' style={{marginBottom:'5rem' ,width:'98%', marginLeft:'12px'}}>
                <div className='container-fluid'>
                    <div className='row'>
                        <table className='table-hj'>
                            <thead className='thead-hj'>
                            <tr className='tr-hj' align='center'>
                                <th className='th-hj'>사진</th>
                                <th className='th-hj'>상품명</th>
                                <th className='th-hj'>브랜드</th>
                                <th className='th-hj'>가격</th>
                            </tr>
                            </thead>
                            <tbody className='tbody-hj'>
                            {
                                dashproduct &&
                                dashproduct.productList?.map((r,idx) =>
                                    <tr key={idx} className='tr-hj' align='center'>
                                        <td className='td-hj'><img style={{width: '70px', borderRadius: '15px'}}
                                                                   alt='' src={photouurl + r.photo}/></td>
                                        <td className='td-hj'>{r.p_name}</td>
                                        <td className='td-hj'>{r.brand}</td>
                                        <td className='td-hj'>{r.price}</td>
                                    </tr>

                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/*최근 등록상품 끝*/}




        </div>

    );
}

export default DashBoard;
