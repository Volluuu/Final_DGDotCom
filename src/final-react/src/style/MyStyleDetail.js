import React, {Children} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import StyleComment from "./StyleComment";

const styles = (theme) => ({
    root       : {
        margin : 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right   : theme.spacing(1),
        top     : theme.spacing(1),
        color   : theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

export default function MyStyleDetail(props) {
    const {children, elt, genderImg, userData} = props;
    console.log(genderImg);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button onClick={handleClickOpen} style={{color:"#AAA"}}>
                {children}
            </button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true}
                    maxWidth={"lg"}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    상세보기
                </DialogTitle>
                <DialogContent dividers>
                    <WrapperDiv>
                        <ImgDiv>
                            <img src={`http://localhost:9003/mystyle/${elt.photo}`} alt=""/>
                        </ImgDiv>

                        <CommentDiv>
                            <UserInfo>
                                <div className="user_name">
                                    <img src={`${userData.gender}.png`} alt="" style={{width: "24px", marginRight: "10px"}}/>
                                    {userData.u_name}</div>
                                <div className="text_box">
                                    {elt.content}
                                </div>
                                <div className="tag_box">
                                    {
                                        elt.tag.split(",").map((elt, idx) => <span key={elt} style={{marginRight: "3px"}}>#{elt}</span>)
                                    }
                                </div>
                            </UserInfo>
                            <CommentList>
                                <StyleComment style={elt}/>
                            </CommentList>
                        </CommentDiv>
                    </WrapperDiv>
                </DialogContent>
            </Dialog>
        </div>
    );
}

const WrapperDiv = styled.div`
  display: flex;
`
const ImgDiv = styled.div`
  width: 70%;
  background-color: black;
  display: flex;
  justify-content: center;

  & > img {
    height:  100%;
  }
`
const CommentDiv = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`

const UserInfo = styled.div`
  width: 100%;
  height: auto;
  padding-left: 10px;
  margin-bottom: 10px;
  & > div.text_box {
    width: 100%;
    word-break: break-all;
    flex-wrap: wrap;
  }

  & > div.tag_box {
    margin-bottom: 5px;
  }
  & > .user_name {
    font-size: 15px;
    line-height: 24px;
    margin-bottom: 10px;
  }
`
const CommentList = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  word-break: break-all;
`