import { Rating } from "@mui/material";
import React, { useMemo, useRef, useState } from "react";

function DetailReview(props) {
  const { row } = props;
  // console.dir(row);

  return (
    <div>
      <span>
        <b style={{ fontSize: "40px" }}>Review</b>
        &nbsp;&nbsp;
        <b style={{ fontSize: "20px" }}>({row && row.list.length})</b>
      </span>
      <table
        className="table table-borderless"
        style={
          {
            // display: "table-cell",
            // border: "1px solid blue",
          }
        }
      >
        {row && row.list.length !== 0 ? (
          row.list.map((ritem, idx) => (
            <tbody key={idx}>
              <tr>
                <td
                  style={{
                    width: "8%",
                    verticalAlign: "middle",
                    textAlign: "center",
                  }}
                >
                  {idx + 1}
                </td>
                <td
                  style={{
                    width: "10%",
                    verticalAlign: "middle",
                    textAlign: "center",
                  }}
                >
                  {ritem.u_name}
                </td>
                <td
                  style={{
                    width: "50%",
                    wordBreak: "break-all",
                    verticalAlign: "middle",
                  }}
                >
                  {ritem.content}
                </td>
                <td style={{ width: "15%", verticalAlign: "middle" }}>
                  <Rating
                    name="half-rating"
                    value={ritem.star}
                    precision={0.1}
                    readOnly
                  />
                  ({ritem.star})
                </td>
                <td style={{ width: "15%", verticalAlign: "middle" }}>
                  {ritem.writeday}
                </td>
              </tr>
            </tbody>
          ))
        ) : (
          <thead>
            <tr>
              <th>등록된 리뷰가 없습니다</th>
            </tr>
          </thead>
        )}
      </table>
    </div>
  );
}

export default DetailReview;
