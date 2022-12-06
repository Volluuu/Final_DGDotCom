import React from "react";

function OrderUser(props) {
  const { row } = props;
  console.dir(row);

  return (
    <div>
      <h3>배송지 정보</h3>
      <table
        className="table table-hover"
        style={{ float: "right", width: "50%" }}
      >
        <tbody>
          <tr>
            <th>배송받을 분</th>
            <td>{row && row.list[0].t_name}</td>
          </tr>
          <tr>
            <th>배송받을 연락처</th>
            <td>{row && row.list[0].t_hp}</td>
          </tr>
          <tr>
            <th>배송받을 주소</th>
            <td>{row && row.list[0].t_addr}</td>
          </tr>
          <tr>
            <th>배송받을 e-mail</th>
            <td>{row && row.list[0].t_email}</td>
          </tr>
          {/* <tr>
            <th>배송 정보</th>
            <td>{row && row.list[0].invoice}</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}

export default OrderUser;
