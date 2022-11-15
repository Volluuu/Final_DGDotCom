import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import SearchCard from "./SearchCard";
import SearchListVirtual from "./SearchListVirtual";
import BasicSearchShow from "./BasicSearchShow";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
    modal: {
        display       : 'flex',
        alignItems    : 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border         : '2px solid #000',
        boxShadow      : theme.shadows[5],
        padding        : theme.spacing(2, 4, 3),
        display:'flex',
    },
}));

export default function TransitionsModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setWord('');
    };
    //검색 리스트를 가져오는 이벤트 **********************************
    const [word, setWord] = useState('');
    const navigate = useNavigate();
    const [searchList, setSearchList] = useState([]);
    const changeWord = useCallback(
        (e) => {
            setWord(e.target.value);
        },
        [],
    );

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (word === '') {
                navigate("/product/list");

            } else {
                navigate(`/product/list?keyword=${word}`)
            }
            const setOpenAndWord = () => {
                setOpen(false);
                setWord('');
            }
        },
        [word],
    );
    const updateWord = () => {
        const res = axios.get(`http://localhost:9003/list/search?word=${word}`).then(res => {
            setSearchList(res.data);
        })
    }

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (word) {
                updateWord();
            } else {
                setSearchList([]);
            }
        }, 200)
        return () => {
            clearTimeout(debounce);
        }
    }, [word]);
    return (
        <>
            <button type="button" onClick={handleOpen}
                    style={{width: "60px", height: "30px", border: "3px solid black"}}>
                검색
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper} style={{height: "100%", display:"flex"}}>
                        <p id="transition-modal-description">
                            <form onSubmit={onSubmit}>
                                <InputBar>
                                    <input className={"in"} type="text" placeholder={"상품명 입력"} autoFocus={true} style={{
                                        border     : "1px solid #ccc",
                                        width      : "90%",
                                        height     : "34px",
                                        marginRight: "20px",
                                        marginTop  : "20px",
                                    }} name={"word"} value={word} onChange={changeWord}/>
                                    <button type={"submit"}
                                            style={{
                                                backgroundColor: "black",
                                                color          : "white",
                                                padding        : "5px",
                                                marginTop      : "20px",
                                                height        : "34px",
                                                width: "50px",
                                            }}>검색
                                    </button>
                                </InputBar>
                                <div style={{margin:"0 auto"}}>
                                {
                                    word === '' ? <BasicSearchShow/> : searchList.length < 1 ?
                                        <NoResult>no result</NoResult> :
                                        <SearchListVirtual searchlist={searchList}/>
                                }
                                </div>
                                <NavLink to={"/product/list"} onClick={handleClose}>상품 리스트로 이동</NavLink><br/>
                            </form>
                        </p>
                    </div>
                </Fade>
            </Modal>
        </>
    );
}

const InputBar = styled.div`
  width         : 700px;
  display       : flex;
  justify-content: space-between;
  @media(max-width: 768px) {
    width:432px;
    & > input {
      width: auto;
    }
  }
`
const NoResult = styled.div`
    width:700px;
  height:800px;
  @media(max-width: 768px) {
    width: 432px;
  }
`
