import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {InputBase} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Chip from '@material-ui/core/Chip';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


function ProductList(props) {


    //필터
    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' },
    ]);

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };


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
              <b>카테고리</b><br/><br/>
              <Accordion>
                  <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                      <Typography >아우터</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                      <Typography>
                          <FormControlLabel control={<Checkbox/>} label="자켓"/>
                          <FormControlLabel control={<Checkbox/>} label="후드"/>
                          <FormControlLabel control={<Checkbox/>} label="스웨트셔츠"/>
                          <FormControlLabel control={<Checkbox/>} label="니트웨어"/>
                          <FormControlLabel control={<Checkbox/>} label="긴팔 티셔츠"/>
                          <FormControlLabel control={<Checkbox/>} label="반팔 티셔츠"/>
                      </Typography>
                  </AccordionDetails>
              </Accordion>
          </div>


          <div style={{marginTop:'50px',marginLeft:'300px',width:'1000px',height:'100px'}}>
                <Chip variant="outlined" color="primary" size="small" onDelete={handleDelete} label="테스트" />
        </div>


          <div style={{marginLeft:'300px',marginTop:'100px', width: '1050px'}}>
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
              <span>{pl.price}</span>
              <br />
              <span>{pl.discount}</span>
            </div>
          </Link>
        ))}
    </div>
      </div>
  );
}

export default ProductList;
