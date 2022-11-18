import React, {useEffect, useRef, useState} from 'react'
import axios from "axios";
import Swal from "sweetalert2";

const padNumber = (num, length) => {
    return String(num).padStart(length, '0');
}

const AuthTimer = () => {
    let tempMin = localStorage.accessToken ? 30 : 0;
    const tempSec = 0;
    const initialTime = useRef(tempMin * 60 + tempSec);
    const interval = useRef(null);

    const [min, setMin] = useState(padNumber(tempMin, 2));
    const [sec, setSec] = useState(padNumber(tempSec, 2));

    useEffect(() => {
        interval.current = setInterval(() => {
            initialTime.current -= 1;
            setSec(padNumber(initialTime.current % 60, 2));
            setMin(padNumber(parseInt(initialTime.current / 60), 2));
        }, 1000);
        return () => clearInterval(interval.current);
    }, []);

    // 초가 변할 때만 실행되는 useEffect
    // initialTime을 검사해서 0이 되면 interval을 멈춘다.
    useEffect(() => {
        if (initialTime.current <= 0) {
            clearInterval(interval.current);
            // 30분 지나면 로그아웃
            let deleteRefreshToken = process.env.REACT_APP_URL + "/user/logout?u_num=" + sessionStorage.u_num;
            axios.delete(deleteRefreshToken)
                .then(res => {
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("accessToken");
                    sessionStorage.removeItem("u_num");
                    sessionStorage.removeItem("loginok");
                })
                .then(res => {
                    Swal.fire({
                        icon: "info",
                        text: "자동 로그아웃"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    })
                })
        }
    }, [sec]);

    return (
        <div style={{position: "absolute", top: "55px", right: "500px"}}>
            {min} : {sec}
        </div>
    )
}

export default React.memo(AuthTimer);