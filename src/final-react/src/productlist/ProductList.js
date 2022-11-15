import axios from "axios";
import React, { useEffect, useState } from "react";
import {random} from 'lodash'
import { Link, useNavigate, useParams, useLocation, createSearchParams } from "react-router-dom";
import {InputBase} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

//칩
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

//아코디언
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import Typography from '@material-ui/core/Typography';

//체크박스
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//정렬 select
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import styled from "styled-components";

const useStyles3 = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

//칩
const useStyles5 = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
        border: 'none',
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));


const ProductCard = styled(Link)`
  margin: 0 auto;
  margin-bottom: 20px;
  transition: all 0.05s linear;

  &:hover {
    transform: scale(1.05);
  }
`

function ProductList(props) {
    const useBig = makeStyles((theme) => ({
        root       : {
            display : "inline-block",
            width   : 300,
            height  : 440,
            margin  : "16px",
        },
        media      : {
            height         : 300,
            width          : 300,
            paddingTop     : '56.25%', // 16:9
            // backgroundColor: "#DDFFF6",
        },
        infoBox    : {
            fontSize   : "16px",
            paddingLeft: "16px",
            width:"300px",
        },
        brand      : {
            textDecoration: "underline",
            marginBottom  : "3px",
        },
        productname: {
            fontSize  : "20px",
            lineHeight: "22px",
        },

    }));
    const big = useBig();
    const randomColor = () => {
        return ["#ffe6e6", "#fff5e6", "#F0FFF0", "#e8f6fd", "#e6f0ff", "#f2eef7", "#e6ffe6", "#fcfce8", "#dcdcdc"][random(0, 8)];
    };
    console.log('다시 렌더링')

    localStorage.url = process.env.REACT_APP_URL;

    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const [productlist, setProductlist] = useState();
    const categories = searchParams.getAll('categories');
    const brands = searchParams.getAll('brands');
    const genders = searchParams.getAll('genders');
    const sizes = searchParams.getAll('sizes');
    let currentPage = searchParams.get('currentPage') || 1;
    const [isConnection, setIsConnection] = useState(false);

    // const { currentPage } = useParams();
    // console.log("proCP:" + currentPage);

    const productUrl = localStorage.url + "/product/";
    console.log("proUrl:" + productUrl);

    const makeSearchParms = (parms) => {
        const _params = {
            currentPage: parms?.currentPage || 1,
            categories,
            brands,
            genders,
            sizes,
            keyword
        }
        if (!parms?.currentPage) delete _params.currentPage;
        return createSearchParams(_params);
    }

    const getPageList = (params) => {
        console.log(0, productlist)

        axios.get(localStorage.url + "/product/list", {
            params: makeSearchParms(params)
        }).then((res) => {
            console.log("axios 성공");
            if (Number(currentPage) === 1) {
                console.log(1, currentPage)
                setProductlist(res.data.list);
            } else {
                console.log(2, productlist)
                console.log(3, res.data.list)
                setProductlist([].concat(productlist || [], res.data.list));
            }
        }).finally(() => {
            setIsConnection(false);
        });
    };

    const selectCategory = (category) => {
        if (categories.includes(category) || categories.includes(encodeURIComponent(category))) {
            categories.splice(categories.findIndex((c) => c === category || c === encodeURIComponent(category)), 1);
        } else {
            categories.push(category);
        }
        navigate({
            pathname: '',
            search: '?' + makeSearchParms()
        });
    };

    const checkCategory = (category) => {
        return categories.includes(category) || categories.includes(encodeURIComponent(category));
    };

    const selectBrand = (brand) => {
        if (brands.includes(brand)) {
            brands.splice(brands.findIndex((b) => b === brand), 1);
        } else {
            brands.push(brand);
        }
        navigate({
            pathname: '',
            search: '?' + makeSearchParms()
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
            search: '?' + makeSearchParms()
        });
    };

    const checkGender = (gender) => {
        return genders.includes(gender);
    };

    const selectSize = (size) => {
        if (sizes.includes(size)) {
            sizes.splice(sizes.findIndex((c) => c === size), 1);
        } else {
            sizes.push(size);
        }
        navigate({
            pathname: '',
            search: '?' + makeSearchParms()
        });
    };

    const checkSize = (size) => {
        return sizes.includes(size);
    };

    useEffect(() => {
        console.log("list 호출");
        setKeyword(searchParams.get('keyword') || undefined);
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
    const classes = useStyles3();
    const [priceOrderBy, setPriceOrderBy] = React.useState(searchParams.get('priceOrderBy') || undefined);
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setPriceOrderBy(event.target.value);
        navigate({
            pathname: '',
            search: '?' + makeSearchParms({
                priceOrderBy: event.target.value
            })
        });
    };

    const [keyword, setKeyword] = React.useState(searchParams.get('keyword') || undefined);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };


    //칩
    const chipclasses = useStyles5();
    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
    ]);

    useEffect(() => {
        const infiniteScroll = (event) => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                if (isConnection) return;
                setIsConnection(true);
                currentPage = Number(currentPage) + 1
                console.log('스크롤 마지막');
                getPageList({
                    currentPage
                });
            }
        };
        window.addEventListener('scroll', infiniteScroll);
        return () => {
            window.removeEventListener('scroll', infiniteScroll);
        };
    }, [])

    return (
        <div>
            <h3 style={{textAlign:'center'}} >SHOP</h3><br/>
            <form style={{textAlign:'center', width:'950px', height:'150px',
                marginLeft:'400px',marginTop:'50px'}}>
                <TextField id="standard-basic" placeholder="검색어 입력"
                           value={keyword}
                           style={{width:'300px'}}
                           onChange={(event) => {setKeyword(event.target.value)}}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <SearchIcon />
                                   </InputAdornment>
                               ),
                           }}
                />
            </form>

            <div style={{marginLeft:'1490px',width:'150px'}}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">정렬기준</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={priceOrderBy}
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                        </MenuItem>
                        <MenuItem value="desc">가격높은순</MenuItem>
                        <MenuItem value="asc">가격낮은순</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div style={{marginLeft:'335px',width:'200px'}}>
                <Paper component="ul" className={chipclasses.root}  elevation={0}>
                    {chipData.map((data) => {
                        let icon;

                        if (data.label === 'React') {

                        }
                        return (
                            <li key={data.key}>
                                <Chip
                                    label={data.label}

                                    className={chipclasses.chip}
                                />
                            </li>
                        );
                    })}
                </Paper>
            </div>

            <div style={{width:'15%', height:'700px',float:'left',
                marginLeft:'40px'}}>
                <b>CATEGORY</b><br/><br/>
                <Accordion>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>의류</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('자켓')}} checked={checkCategory('자켓')} />} label="자켓"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('후드')}} checked={checkCategory('후드')} />} label="후드"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('스웨트 셔츠')}} checked={checkCategory('스웨트 셔츠')} />} label="스웨트 셔츠"/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('니트 웨어')}} checked={checkCategory('니트 웨어')} />} label="니트 웨어"/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('긴팔 티셔츠')}} checked={checkCategory('긴팔 티셔츠')} />} label="긴팔 티셔츠"/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('반팔 티셔츠')}} checked={checkCategory('반팔 티셔츠')} />} label="반팔 티셔츠"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('셔츠')}} checked={checkCategory('셔츠')} />} label="셔츠"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('패딩')}} checked={checkCategory('패딩')} />} label="패딩"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('코트')}} checked={checkCategory('코트')} />} label="코트"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('바지')}} checked={checkCategory('바지')} />} label="바지"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('반바지')}} checked={checkCategory('반바지')} />} label="반바지"/><br/><br/>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>신발</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('스니커즈')}} checked={checkCategory('스니커즈')} />} label="스니커즈"/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('로퍼/플랫')}} checked={checkCategory('로퍼/플랫')} />} label="로퍼/플랫"/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('샌들/슬리퍼')}} checked={checkCategory('샌들/슬리퍼')} />} label="샌들/슬리퍼"/><br/><br/>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>패션잡화</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('시계')}} checked={checkCategory('시계')} />} label="시계"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('가방')}} checked={checkCategory('가방')} />} label="가방"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('스몰 레더')}} checked={checkCategory('스몰 레더')} />} label="스몰 레더"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('쥬얼리')}} checked={checkCategory('쥬얼리')} />} label="쥬얼리"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('모자')}} checked={checkCategory('모자')} />} label="모자"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('스카프')}} checked={checkCategory('스카프')} />} label="스카프"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('벨트')}} checked={checkCategory('벨트')} />} label="벨트"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectCategory('기타')}} checked={checkCategory('기타')} />} label="기타"/><br/>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <br/><br/>

                <b>FILTER</b><br/><br/>
                <Accordion>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>브랜드</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <FormControlLabel control={<Checkbox onClick={() => {selectBrand('A.P.C.')}} checked={checkBrand('A.P.C.')} />} label="A.P.C."/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectBrand('Burberry')}} checked={checkBrand('Burberry')} />} label="Burberry"/><br/>
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
                            <FormControlLabel control={<Checkbox onClick={() => {selectGender('U')}} checked={checkGender('U')}/>} label="공용"/><br/>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>의류 사이즈</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <FormControlLabel control={<Checkbox onClick={() => {selectSize('S')}} checked={checkSize('S')} />} label="S"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectSize('M')}} checked={checkSize('M')} />} label="M"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectSize('L')}} checked={checkSize('L')} />} label="L"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectSize('XL')}} checked={checkSize('XL')} />} label="XL"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectSize('F')}} checked={checkSize('F')} />} label="F"/><br/>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>신발 사이즈</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <FormControlLabel control={<Checkbox onClick={() => {selectSize('230')}} checked={checkSize('230')} />} label="230"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectSize('240')}} checked={checkSize('240')} />} label="240"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectSize('250')}} checked={checkSize('250')} />} label="250"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectSize('260')}} checked={checkSize('260')} />} label="260"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectSize('270')}} checked={checkSize('270')} />} label="270"/><br/>
                            <FormControlLabel control={<Checkbox onClick={() => {selectSize('280')}} checked={checkSize('280')} />} label="280"/><br/>
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


            <div style={{marginLeft:'320px',marginTop:'36px', width: '1350px'}}>

                {productlist &&
                    productlist.map((pl, i) => (
                        //             <Link to={`/product/detail/${pl.p_num}`} key={i}>
                        //                 <div
                        //                     style={{
                        //                         width: "270px",
                        //                         height: "390px",
                        //                         display: "inline-block",
                        //                         marginLeft: "20px",
                        //                         marginRight: "20px",
                        //                         textAlign: "center",
                        //                     }}
                        //                     key={i}
                        //                     p_num={pl.p_num}
                        //                 >
                        //                     <img
                        //                         alt=""
                        //                         src={productUrl + pl.photo}
                        //                         width="300px"
                        //                         height="300px"
                        //                         style={{ margin: "0 auto" }}
                        //                     />
                        //                     <br />
                        //                     <span>{pl.brand}</span>
                        //                     <br />
                        //                     <span>{pl.p_name}</span>
                        //                     <br />
                        //                     <span>
                        //     {Number(pl.price)
                        //         .toString()
                        //         .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        //                         원
                        //   </span>
                        //                     <br />
                        //                     {pl.discount === 0 ? <></> : <span>{pl.discount}%</span>}
                        //                 </div>
                        //             </Link>
                        <ProductCard to={`/product/detail/${pl.p_num}`}>
                            <Card className={big.root}>
                                <CardMedia
                                    className={big.media}
                                    image={productUrl + pl.photo}
                                    // title="Paella dish"
                                    style={{backgroundColor: randomColor()}}
                                />
                                <div className={big.infoBox}>
                                    <div>
                                        <p className={big.brand}>{pl.brand}</p>
                                        <p className={big.productname}>{pl.p_name}</p>
                                    </div>
                                </div>
                                <p style={{position: "relative", bottom: 0, left: "5%"}}>{
                                    Number(pl.price)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }</p>
                            </Card>
                        </ProductCard>
                    ))}
            </div>
        </div>
    );
}

export default ProductList;