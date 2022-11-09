import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation, createSearchParams } from "react-router-dom";
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

//select
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));





function ProductList(props) {
    console.log('다시 렌더링')

    localStorage.url = process.env.REACT_APP_URL;

    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    console.log(searchParams.get('categories'));
    const [productlist, setProductlist] = useState();
    const categories = searchParams.getAll('categories') || [];
    const brands = searchParams.getAll('brands') || [];
    const genders = searchParams.getAll('genders') || [];

    const { currentPage } = useParams();
    console.log("proCP:" + currentPage);

    const productUrl = localStorage.url + "/product/";
    console.log("proUrl:" + productUrl);

    const getPageList = () => {
        axios.get(localStorage.url + "/product/list", {
            params: createSearchParams({
                currentPage: 1,
                categories,
                brands,
                genders
            })
        }).then((res) => {
            console.log("axios 성공");
            setProductlist(res.data);
        });
    };

    const selectCategory = (category) => {
        if (categories.includes(category)) {
            categories.splice(categories.findIndex((c) => c === category), 1);
        } else {
            categories.push(category);
        }
        navigate({
            pathname: '',
            search: '?' + createSearchParams({
                currentPage: 1,
                categories,
                brands,
                genders
            })
        });
    };

    const checkCategory = (category) => {
        return categories.includes(category);
    };

    const selectBrand = (brand) => {
        if (brands.includes(brand)) {
            brands.splice(brands.findIndex((b) => b === brand), 1);
        } else {
            brands.push(brand);
        }
        navigate({
            pathname: '',
            search: '?' + createSearchParams({
                currentPage: 1,
                categories,
                brands,
                genders
            })
        });
    };

    const checkBrand = (brand) => {
        return brands.includes(brand);
    };

    const selectGender = (gender) => {
        if (genders.includes(gender)) {
            genders.splice(genders.findIndex((b) => b === gender), 1);
        } else {
            genders.push(gender);
        }
        navigate({
            pathname: '',
            search: '?' + createSearchParams({
                currentPage: 1,
                categories,
                brands,
                genders
            })
        });
    };

    const checkGender = (gender) => {
        return genders.includes(gender);
    };

    useEffect(() => {
        console.log("list 호출");
        getPageList();
    }, [location.search]);


    // // return focus to the button when we transitioned from !open -> open
    // const prevOpen = React.useRef(open);
    // React.useEffect(() => {
    //     if (prevOpen.current === true && open === false) {
    //         anchorRef.current.focus();
    //     }
    //
    //     prevOpen.current = open;
    // }, [open]);

    //select
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };


    return (
        <div>
            <h3 style={{textAlign:'center'}} >SHOP</h3><br/>
            <form style={{textAlign:'center', width:'950px', height:'150px',
                marginLeft:'400px',marginTop:'50px'}}>
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
            <div style={{marginLeft:'1400px',width:'150px'}}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">정렬기준</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={age}
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                        </MenuItem>
                        <MenuItem value={20}>가격높은순</MenuItem>
                        <MenuItem value={30}>가격낮은순</MenuItem>
                    </Select>
                </FormControl>

            </div>



            <div style={{width:'15%', height:'700px',float:'left',
                marginLeft:'40px'}}>
                <b>FILTER</b><br/><br/>
                <Accordion>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>카테고리</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <b>의류</b><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('jacket')}} checked={checkCategory('jacket')} />} label="자켓"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('hood')}} checked={checkCategory('hood')} />} label="후드"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('sweatshirt')}} checked={checkCategory('sweatshirt')} />} label="스웨트셔츠"/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('neat')}} checked={checkCategory('neat')} />} label="니트웨어"/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('longtshirt')}} checked={checkCategory('longtshirt')} />} label="긴팔 티셔츠"/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('tshirt')}} checked={checkCategory('tshirt')} />} label="반팔 티셔츠"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('shirt')}} checked={checkCategory('shirt')} />} label="셔츠"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('padding')}} checked={checkCategory('padding')} />} label="패딩"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('coat')}} checked={checkCategory('cort')} />} label="코트"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('pants')}} checked={checkCategory('pants')} />} label="바지"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('shortpants')}} checked={checkCategory('shortpants')} />} label="반바지"/><br/><br/>
                            <b>신발</b><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('sneakers')}} checked={checkCategory('sneakers')} />} label="스니커즈"/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('loafer')}} checked={checkCategory('loafer')} />} label="로퍼/플랫"/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('sandal')}} checked={checkCategory('sandal')} />} label="샌들/슬리퍼"/><br/><br/>
                            <b>패션잡화</b><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('watch')}} checked={checkCategory('watch')} />} label="시계"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('bag')}} checked={checkCategory('bag')} />} label="가방"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('leather')}} checked={checkCategory('leather')} />} label="스몰레더"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('jewelry')}} checked={checkCategory('jewelry')} />} label="주얼리"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('cap')}} checked={checkCategory('cap')} />} label="모자"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('scarf')}} checked={checkCategory('scarf')} />} label="스카프"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('belt')}} checked={checkCategory('belt')} />} label="벨트"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('etc')}} checked={checkCategory('etc')} />} label="기타"/><br/>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>브랜드</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <FormControlLabel control={<Checkbox onClick={() => {selectBrand('A.P.C.')}} checked={checkBrand('A.P.C.')} />} label="A.P.C."/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectBrand('Burberry')}} checked={checkBrand('Burberry')} />} label="Burberry"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectBrand('Creed')}} checked={checkBrand('Creed')} />} label="Creed"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectBrand('Gucci')}} checked={checkBrand('Gucci')} />} label="Gucci"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectBrand('Montblanc')}} checked={checkBrand('Montblanc')} />} label="Montblanc"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectBrand('Nike')}} checked={checkBrand('Nike')} />} label="Nike"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectBrand('Patagonia')}} checked={checkBrand('Patagonia')} />} label="Patagonia"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectBrand('Rolex')}} checked={checkBrand('Rolex')} />} label="Rolex"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectBrand('Supreme')}} checked={checkBrand('Supreme')} />} label="Supreme"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectBrand('Vans')}} checked={checkBrand('Vans')} />} label="Vans"/><br/>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>성별</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <FormControlLabel control={<Checkbox onClick={() => {selectGender('M')}} checked={checkGender('M')}/>} label="남자"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectGender('F')}} checked={checkGender('F')}/>} label="여자"/><br/>
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


            <div style={{marginLeft:'320px',marginTop:'60px', width: '1350px'}}>

                {productlist &&
                    productlist.list.map((pl, i) => (
                        <Link to={`/product/detail/${pl.p_num}`} key={i}>
                            <div
                                style={{
                                    width: "270px",
                                    height: "390px",
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
