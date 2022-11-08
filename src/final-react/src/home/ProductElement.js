import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {Link} from "react-router-dom";
import styled from "styled-components";

const randomColor = ["#FEBEBE", "#FFEFD5", "#F0FFF0", "#CDECFA", "#CCE1FF", "#CEBEE1" , "#DCFFDC", "#FAFAD2", "#dcdcdc"];
const useStyles = makeStyles((theme) => ({
    root       : {
        display : "flex",
        width   : 300,
        height  : 440,
        margin  : "auto",
        flexWrap: "wrap",
    },
    media      : {
        height         : 300,
        width          : 300,
        paddingTop     : '56.25%', // 16:9
        backgroundColor: "#DDFFF6",
    },
    infoBox    : {

        fontSize   : "16px",
        paddingLeft: "16px",

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
const ProductCard = styled(Link)`
    margin: 0 auto;
    margin-bottom: 20px;
    transition : all 0.05s linear;
    &:hover {
      transform: scale(1.05);
    }
`
export default function ProductElement() {
    const classes = useStyles();

    return (
        <ProductCard to={"/login"}>
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image="http://localhost:9003/product/20221104024539930.PNG"
                title="Paella dish"
            />

            <div className={classes.infoBox}>
                <div>
                    <p className={classes.brand}>Stussy</p>
                    <p className={classes.productname}>Stussy Stock Sweater Black</p>
                </div>
            </div>
            <p style={{position: "relative", bottom: 0, left: "5%"}}>261,000원</p>
        </Card>
        </ProductCard>
    );
}
