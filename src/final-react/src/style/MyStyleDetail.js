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
    const {children, elt} = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button onClick={handleClickOpen}>
                {children}
            </button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true}
                    maxWidth={"lg"}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {elt.u_num} : u_num을 사용해서 axios하기
                </DialogTitle>
                <DialogContent dividers>
                    <WrapperDiv>
                        <ImgDiv>
                            <img src={`http://localhost:9003/mystyle/${elt.photo}`} alt=""/>
                        </ImgDiv>

                        <CommentDiv>
                            <UserInfo>
                                {elt.content}
                            </UserInfo>
                            <CommentList>
                                <StyleComment/>
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
  display: flex;
  flex-wrap: wrap;
`

const UserInfo = styled.div`
  width: 100%;
  height: 10%;
`
const CommentList = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  word-break: break-all;
`