import React from "react";

function DetailImage(props) {
  const photoUrl = localStorage.url + "/product/";
  return (
    <div>
      <h1>Image</h1>
      {<img alt="" src={photoUrl + props.row.photo} />}
    </div>
  );
}

export default DetailImage;
