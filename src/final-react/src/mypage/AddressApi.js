import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";

function AddressApi(props) {
  //주소 state
  // const [modalState, setModalState] = useState(false);
  const [inputAddressValue, setInputAddressValue] = useState("");
  const [inputZipCodeValue, setInputZipCodeValue] = useState("");

  const postCodeStyle = {
    width: "500px",
    height: "700px",
  }; // 스타일 정의 code

  const onCompletePost = (data) => {
    setInputAddressValue(data.address);
    setInputZipCodeValue(data.zonecode);
    // window.close();
    console.log("data:" + JSON.stringify(data));

    if (inputAddressValue !== null && inputZipCodeValue !== null) {
      // window.close();
    }
  }; //

  console.log("11:" + inputAddressValue);
  console.log("22:" + inputZipCodeValue);

  return (
    <div>
      <DaumPostcode
        style={postCodeStyle}
        onComplete={onCompletePost}
      ></DaumPostcode>
    </div>
  );
}

export default AddressApi;
