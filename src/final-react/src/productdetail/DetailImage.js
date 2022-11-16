import React from "react";

// 이미지 출력 컴포넌트
function DetailImage(props) {
  const photoUrl = localStorage.url + "/product/";
  return <div>{<img alt="" src={photoUrl + props.row.photo} />}</div>;
}

export default DetailImage;
