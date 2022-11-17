import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { data, radarData, pcData, projectionData } from "./data";
// import ChartRow from "./ChartRow";
import FullPie from "./FullPie";


const styles = (theme) => ({});

function pivotData(data) {
    const arr = [];
    const keys = data.map((d) => d.dimension);
    return Object.keys(data[0]) // returns White Men, Asian Men, White Women...
        .filter((k) => k !== "dimension")
        .map((k) => {
            return keys.reduce(
                (obj, curr, index) => {
                    obj[curr] = data[index][k];
                    return obj;
                },
                { dimension: k }
            );
        });
}

function Container(props) {
    const { classes } = props;
    return (
        <div>
            <Typography>
                <FullPie width={300} marginLeft={20} marginTop={20} height={300} data={data[0].gender} />
            </Typography>
        </div>
    );
}

Container.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Container);
