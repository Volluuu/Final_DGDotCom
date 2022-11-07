import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";

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

    const selectList = useCallback(
        (e) => {
            //axios 호출
        },
        [],
    );

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            setOpen(false);
            setWord(e.target.value);
            navigate("/product/list/1");
        },
        [],
    );
    // useEffect(() => {
    //     if(!word.equal('')) {
    //         const debounce = setTimeout(()=>{
    //             if(word) updateData();
    //         },200)
    //         return () => {
    //             clearTimeout(debounce);
    //         }
    //         axios.get("http://localhost:9003/list/search").then(res=>{
    //             setSearchList(res.data);
    //         },)
    //     }
    // }, [word]);

    return (
        <div>
            <button type="button" onClick={handleOpen}
                    style={{width: "100px", height: "100px", border: "3px solid black"}}>
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
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">찾으시는 상품의 상품명을 입력해주세요</h2>
                        <p id="transition-modal-description">
                            <form onSubmit={onSubmit}>
                                <input type="text" placeholder={"상품명 입력"} style={{
                                    border     : "1px solid #ccc",
                                    width      : "90%",
                                    height     : "34px",
                                    marginRight: "20px",
                                }} name={"word"} value={word} onChange={changeWord}/>
                                <button type={"submit"}
                                        style={{backgroundColor: "black", color: "white", padding: "5px"}}>검색
                                </button>
                                <div style={{width: "768px", height: "600px"}}>
                                    {
                                        searchList.map((product, idx)=><p key={idx}>{product.p_name}</p>)
                                    }
                                </div>
                                <NavLink to={"/product/list/1"} onClick={handleClose}>리스트로 이동</NavLink><br/>
                            </form>
                        </p>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
