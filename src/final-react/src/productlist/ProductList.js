import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import {InputBase} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import Chip from '@material-ui/core/Chip';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


function ProductList(props) {
    console.log('다시 렌더링')


    localStorage.url = process.env.REACT_APP_URL;

    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    console.log(searchParams.get('category'));
    const [productlist, setProductlist] = useState();
    const spCategory = searchParams.getAll('category') || [];
    console.log({spCategory})
    const [category, setCategory] = useState(spCategory);

    const { currentPage } = useParams();
    console.log("proCP:" + currentPage);

    const productUrl = localStorage.url + "/product/";
    console.log("proUrl:" + productUrl);



    const getPageList = () => {
        // let url = localStorage.url + "/product/list?currentPage=" + currentPage;
        let url = `${localStorage.url}/product/list?currentPage=${currentPage}&category=${spCategory.join('&category=')}`;

        console.log("Url:" + url);
        axios.get(url).then((res) => {
            console.log("axios 성공");
            setProductlist(res.data);
        });
    };

    const selectCategory = (category) => {
        navigate(`?category=${category}`);
    };
    useEffect(() => {
        console.log("list 호출");
        getPageList(spCategory);
        setCategory(spCategory)
    }, []);

    return (
        <div>
            <h3 style={{textAlign:'center'}} >SHOP</h3><br/>
            <form style={{textAlign:'center', width:'700px', height:'150px',
                marginLeft:'400px'}}>
                <TextField id="standard-basic" placeholder="검색어 입력"
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <SearchIcon />
                                   </InputAdornment>
                               ),
                           }}
                />
            </form>

            <div style={{width:'15%', height:'700px',float:'left',
                marginLeft:'10px'}}>
                <b>FILTER</b><br/><br/>
                <Accordion>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>카테고리</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <b>의류</b><br/>
                            &nbsp;&nbsp;<FormControlLabel control={<Checkbox onClick={() => {selectCategory('자켓')}} />} label="자켓"/><br/>
                            &nbsp;&nbsp;<FormControlLabel control={<Checkbox onClick={() => {selectCategory('후드')}}/>} label="후드"/><br/>
                            {/*<FormControlLabel control={<Checkbox onClick={() => {selectCategory('스웨트셔츠')}}/>} label="스웨트셔츠"/>*/}
                            {/*<FormControlLabel control={<Checkbox onClick={() => {selectCategory('니트웨어')}}/>} label="니트웨어"/>*/}
                            {/*<FormControlLabel control={<Checkbox onClick={() => {selectCategory('긴팔 티셔츠')}}/>} label="긴팔 티셔츠"/>*/}
                            {/*<FormControlLabel control={<Checkbox onClick={() => {selectCategory('반팔 티셔츠')}}/>} label="반팔 티셔츠"/><br/>*/}
                            {/*<FormControlLabel control={<Checkbox onClick={() => {selectCategory('셔츠')}}/>} label="셔츠"/><br/>*/}
                            {/*<FormControlLabel control={<Checkbox onClick={() => {selectCategory('패딩')}}/>} label="패딩"/><br/>*/}
                            {/*<FormControlLabel control={<Checkbox onClick={() => {selectCategory('코드')}}/>} label="코트"/><br/>*/}
                            {/*<FormControlLabel control={<Checkbox onClick={() => {selectCategory('바지)}}/>} label="바지"/><br/>*/}
                            {/*<FormControlLabel control={<Checkbox onClick={() => {selectCategory('반바지')}}/>} label="반바지"/>*/}<br/>
                            <b>신발</b><br/>
                            <FormControlLabel control={<Checkbox/>} label="스니커즈"/>
                            <FormControlLabel control={<Checkbox/>} label="로퍼/플랫"/>
                            <FormControlLabel control={<Checkbox/>} label="샌들/슬리퍼"/><br/><br/>
                            <b>패션잡화</b><br/>
                            <FormControlLabel control={<Checkbox/>} label="시계"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="가방"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="스몰레더"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="주얼리"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="모자"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="스카프"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="벨트"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="기타"/><br/>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>브랜드</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <FormControlLabel control={<Checkbox/>} label="A.P.C"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="Burberry"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="Creed"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="Gucci"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="Montblanc"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="Nike"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="Patagonia"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="Rolex"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="Supreme"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="Vans"/><br/>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>성별</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <FormControlLabel control={<Checkbox/>} label="남자"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="여자"/><br/>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>의류 사이즈</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <FormControlLabel control={<Checkbox/>} label="S"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="M"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="L"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="XL"/><br/>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>신발 사이즈</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <FormControlLabel control={<Checkbox/>} label="230"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="240"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="250"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="260"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="270"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="280"/><br/>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>가격</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <FormControlLabel control={<Checkbox/>} label="10만원 이하"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="10만원 - 30만원 이하"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="30만원 - 50만원 이하"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="50만원 이상"/><br/>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

            </div>


            <div style={{marginLeft:'300px',marginTop:'80px', width: '1050px'}}>
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
        </div>
    );
}

export default ProductList;
