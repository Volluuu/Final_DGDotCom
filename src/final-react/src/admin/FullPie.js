import React from "react";
import PropTypes from "prop-types";
import { Pie } from "@nivo/pie";
import { red, blue, green, orange, purple } from "@material-ui/core/colors";

// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.
function FullPie({ data, palette, height,width,marginLeft,marginTop}) {
    return (
        <Pie
            width={width}
            height={height}
            data={data}
            marginLeft={marginLeft}
            marginTop={marginTop}
            innerRadius={0.5}
            padAngle={2}
            cornerRadius={3}
            labelSkipWidth={18}
            slicesLabelsTextColor="#FFFFFF"
            colors={palette}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={8}
            radialLabelsLinkHorizontalLength={8}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor="inherit"
            slicesLabelsSkipAngle={10}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        />
    );
}

FullPie.defaultProps = {
    palette: [blue[500], red[500], green[500], orange[500], purple[500]],
    height: 300,
    marginLeft: 35,
    marginTop: 30,
    width: 300

};

export default FullPie;
