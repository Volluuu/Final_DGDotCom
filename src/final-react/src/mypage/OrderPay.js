import React from "react";

function OrderPay(props) {
  const { row } = props;
  return (
    <div>
      <h3>결제 정보</h3>
      <table className="table table-hover" style={{ width: "90%" }}>
        <tbody>
          <tr>
            <th>결제 방법</th>
            <td>카카오페이</td>
          </tr>
          <tr>
            <th>결제 금액</th>
            <td>
              {row &&
                row.list[0].lastprice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </td>
          </tr>
          <tr style={{ visibility: "hidden", border: "1px solid white" }}>
            <th>-</th>
            <td></td>
          </tr>
          <tr style={{ visibility: "hidden", border: "1px solid white" }}>
            <th>-</th>
            <td></td>
          </tr>
          <tr style={{ visibility: "hidden", border: "1px solid white" }}>
            <th>-</th>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrderPay;
