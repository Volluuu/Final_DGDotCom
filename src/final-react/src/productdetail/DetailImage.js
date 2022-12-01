import { Card } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";

// 이미지 출력 컴포넌트
function DetailImage(props) {
  const photoUrl = localStorage.url + "/product/"; //DB 위치
  const photo = photoUrl + props.row.photo; //DB에서 사진 받아올 주소
  const productImageRef = useRef(""); //이미지 박스 Ref
  const imageZoomRef = useRef(""); //Zoom이미지 Ref
  const boxRef = useRef(""); //커버 박스 Ref
  const cursorBoxRef = useRef(""); //커서 Ref
  const productImageTagRef = useRef(""); //이미지 Ref

  // let cx = imageZoomRef.current.offsetWidth / cursorBoxRef.current.offsetWidth;
  // let cy =
  //   imageZoomRef.current.offsetHeight / cursorBoxRef.current.offsetHeight;
  let cx = 4; //너비 확대 사이즈
  let cy = 4; //높이 확대 사이즈

  // console.log("data:", cx, ",", cy);

  //img 벗어났을때 이벤트
  const imgMouseLeaveFunc = (e) => {
    e.preventDefault();
    //DIV tag이름일때
    if (e.target.tagName == "DIV") {
      if (cursorBoxRef.current !== undefined) {
        cursorBoxRef.current.style.visibility = "hidden"; //커서 숨기기
        imageZoomRef.current.style.visibility = "hidden"; //확대 이미지 숨기기
      }
    }
  };

  //img 이동 이벤트
  const imgMousMoveFunc = (e) => {
    e.preventDefault();
    const rect = e.target.getBoundingClientRect();

    //커서 좌표 잡기
    const getCursorPos = (e) => {
      const rect = e.target.getBoundingClientRect(); //event.target.getBoundingClientRect()
      //-> 이를 통해 이미지 태그가 페이지에서 어떤 좌표점에 있는지 확인할 수 있습니다.
      let a,
        x = 0,
        y = 0;

      a = rect;
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      x = x - window.scrollX;
      y = y - window.scrollY;
      return { x: x, y: y };
    };

    const pos = getCursorPos(e);

    // let x = cursorBoxRef.current.offsetWidth / 2;
    // let y = cursorBoxRef.current.offsetHeight / 2;
    let x = pos.x - cursorBoxRef.current.offsetWidth / 2;
    let y = pos.y - cursorBoxRef.current.offsetHeight / 2;

    // console.log("x:", x);
    // console.log("y:", y);

    let xCoordi = e.pageX - 25; //커서 조절
    let yCoordi = e.pageY - 25; //커서 조절

    setCursorCoordi({
      cursorX: xCoordi,
      cursorY: yCoordi,
    });

    //태그가 img일때
    if (e.target.tagName == "IMG") {
      // cursorBoxRef.current.style.visibility = "visible"; //커서가 있으면 계속 렌더링되어 느려짐
      // cursorBoxRef.current.style.backgroundColor = "#fdfdfd"; //커서가 있으면 계속 렌더링되어 느려짐
      // cursorBoxRef.current.style.opacity = "0.7"; //커서가 있으면 계속 렌더링되어 느려짐
      imageZoomRef.current.style.visibility = "visible"; //이미지 속성 변경
      imageZoomRef.current.style.backgroundSize =
        productImageTagRef.current.width * cx +
        "px " +
        productImageTagRef.current.height * cy +
        "px"; //이미지 확대 크기 설정

      imageZoomRef.current.style.backgroundPosition =
        "-" + x * cx + "px " + "-" + y * cy + "px";
      //커서 이동에 따른 포지션 변경. 의도와 반대로 정반대쪽의 영역을 확대.
      //이유는 backgroundPosition에 속성은 양수 일때 바둑판식으로 되어 있어 이미지를 밀어냄.
      //따라서 음수로 해주어야 안쪽으로 이미지를 끌어 확대한다.
    }
  };

  //커서 값에 대한 state
  const [cursorCoordi, setCursorCoordi] = useState({
    cursorX: 0,
    cursorY: 0,
  });

  //이미지를 background로 설정하여 속성 변경해준다
  //useEffect로 커서 변경 시, 실행되도록
  useEffect(() => {
    imageZoomRef.current.style.backgroundImage = `url(${photo}`;
  }, [cursorCoordi]);

  useEffect(() => {
    imageZoomRef.current.style.backgroundImage = `url(${photo}`;
    imageZoomRef.current.style.visibility = "hidden";
  }, []);

  return (
    <div
      className="productContainer"
      style={{ height: "550px", display: "inline-block" }}
    >
      <div className="productHeader" style={{ width: "100%", height: "550px" }}>
        <div
          className="productImage"
          ref={productImageRef}
          name="productImage"
          style={{
            width: "570px",

            display: "inline-block",
            padding: "20px 20px",
          }}
          onMouseOver={imgMouseLeaveFunc}
        >
          <img
            alt=""
            src={photoUrl + props.row.photo}
            ref={productImageTagRef}
            onMouseMove={imgMousMoveFunc}
            width="500px"
            height="500px"
          />
        </div>

        <div
          ref={imageZoomRef}
          className="imageZoom"
          name="zoomImage"
          style={{
            position: "absolute",
            // width: "530px",
            // height: "530px",
            // marginTop: "32px",
            // top: "22%",
            width: "600px",
            height: "600px",
            // marginTop: "32px",
            // top: "15%",
            display: "inline-block",
            backgroundColor: "white",
            zIndex: "1",
          }}
        ></div>

        <div ref={boxRef}>
          <div
            ref={cursorBoxRef}
            style={{
              position: "absolute",
              width: "100px",
              height: "100px",
              left: `${cursorCoordi.cursorX}px`,
              top: `${cursorCoordi.cursorY}px`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default DetailImage;
