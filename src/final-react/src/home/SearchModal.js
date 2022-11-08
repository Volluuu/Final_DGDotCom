import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import SearchCard from "./SearchCard";
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
            setOpen(false);
            setWord('');
            navigate("/product/list/1");
        },
        [],
    );
    const updateData = async() => {
        const res = await axios.get(`http://localhost:9003/list/search?word=${word}`).then(res=>{
            setSearchList(res.data);
        })
    }

    useEffect(() => {
            const debounce = setTimeout(()=>{
                if(word){updateData();} else{
                    setSearchList([]);
                }
            },200)
            return () => {
                clearTimeout(debounce);
            }
    }, [word]);


    return (
        <>
            <button type="button" onClick={handleOpen}
                    style={{width: "50px", height: "30px", border: "3px solid black"}}>
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
                                <div style={{width:'768px', display:"flex", justifyContent:"space-between"}}>
                                <input type="text" placeholder={"상품명 입력"} style={{
                                    border     : "1px solid #ccc",
                                    width      : "90%",
                                    height     : "34px",
                                    marginRight: "20px",
                                }} name={"word"} value={word} onChange={changeWord}/>
                                <button type={"submit"}
                                        style={{backgroundColor: "black", color: "white", padding: "5px"}}>검색
                                </button>
                                </div>
                                <div style={{width: "768px", height: "600px", overflowY:"scroll"}}>
                                    {   searchList.length < 1 ? <div>no result</div> :
                                        searchList.map((product, idx)=><SearchCard key={idx} product={product}/>)
                                    }
                                </div>
                                <NavLink to={"/product/list/1"} onClick={handleClose}>리스트로 이동</NavLink><br/>
                            </form>
                        </p>
                    </div>
                </Fade>
            </Modal>
        </>
    );
}