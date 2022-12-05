import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import SearchListVirtualStyle from "./SearchListVirtualStyle";
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
        display        : 'flex',
    },
}));


export default function SearchModalStyle(props) {
    const {product, setProduct} = props;
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
    const [searchList, setSearchList] = useState([]);
    const [latest, setLatest] = useState([]);
    const changeWord = useCallback(
        (e) => {
            setWord(e.target.value);
        },
        [],
    );

    const updateWord = async () => {
        await axios.get(`${process.env.REACT_APP_URL}/list/search?word=${word}`).then(res => {
            setSearchList(res.data);
        })
    }

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (word) {
                updateWord().then();
            } else {
                setSearchList([]);
            }
        }, 200)
        return () => {
            clearTimeout(debounce);
        }
    }, [word, latest]);
    return (
        <>
            <button type="button" onClick={handleOpen}
                    style={{width: "60px", height: "30px", border: "3px solid black", fontFamily:"inherit"}}>
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
                    <div className={classes.paper} style={{height: "100%", display: "flex", overflowY: "auto"}}>
                        <p id="transition-modal-description">
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
                                                height         : "34px",
                                                width          : "50px",
                                            }}>검색
                                    </button>
                                </InputBar>
                                <div style={{margin: "0 auto"}}>
                                    {
                                        word === '' ? <NoResult>no result</NoResult> :
                                            <SearchListVirtualStyle searchlist={searchList} open={open} handOpen={handleOpen} handleClose={handleClose} product={product} setProduct={setProduct}/>
                                    }
                                </div>
                        </p>
                    </div>
                </Fade>
            </Modal>
        </>
    );
}

const InputBar = styled.div`
  width: 700px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 415px;
    & > input {
      width: auto;
    }
  }
`
const NoResult = styled.div`
  width: 700px;
  height: 800px;
  @media (max-width: 768px) {
    width: 415px;
  }
`
