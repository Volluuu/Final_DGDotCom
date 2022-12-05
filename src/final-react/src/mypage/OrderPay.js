import React from "react";

function OrderPay(props) {
  const { row } = props;
  console.log("aa:", row);
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
            <th>전체 금액</th>
            <td>
              {row.list
                ?.map((pitem) => pitem.price * pitem.count)
                .reduce((prev, curr) => prev + curr, 0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </td>
          </tr>
          <tr>
            <th>할인된 금액</th>
            <td>
              {row.list
                ?.map(
                  (pitem) =>
                    pitem.price * pitem.count - pitem.lastprice * pitem.count
                )
                .reduce((prev, curr) => prev + curr, 0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </td>
          </tr>
          <tr>
            <th>결제 금액</th>
            <td>
              {row.list
                ?.map((pitem) => pitem.lastprice * pitem.count)
                .reduce((prev, curr) => prev + curr, 0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </td>
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
