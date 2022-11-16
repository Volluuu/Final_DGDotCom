import React from 'react';
import {useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function InsertForm(props) {
    const [p_name, setP_name] = useState("");
    const [photo, setPhoto] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [gender, setGender] = useState("");
    const [price, setPrice] = useState("");
    const [p_size, setP_size] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const navi = useNavigate();

    const photoUrl = localStorage.url + "/product/";

    const uploadPhoto = (e) => {
        let uploadUrl = localStorage.url + "/admin/pimgupload";

        const uploadFile = new FormData();
        uploadFile.append("uploadFile",e.target.files[0]);

        axios({
            method: "post",
            url: uploadUrl,
            data: uploadFile,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(res=>{
            setPhoto(res.data);
        })
    }

    //submit이벤트
    const onSubmit =(e) => {
        e.preventDefault();

        let url = localStorage.url + "/admin/productInsert";

        axios.post(url, {category,photo,brand,gender,p_name,price,p_size,amount})
            .then(res=>{
                setCategory('');
                setPhoto('');
                setBrand('');
                setGender('');
                setP_name('');
                setPrice('');
                setP_size('');
                setAmount('');
                setMessage('상품이 추가되었습니다!')
                navi('/admin/adproduct');
            })
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '5rem',
        }}>
            <form onSubmit={onSubmit} style={{
                border: '2px solid lightgray',
                minWidth: '500px'
            }}>
                <input
                    type="text"
                    value={category}
                    placeholder="종류"
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        marginBottom: '2rem',
                        border: '1px solid lightgray'
                    }}
                />

                <input
                    type="text"
                    value={brand}
                    placeholder="브랜드"
                    onChange={(e) => setBrand(e.target.value)}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        marginBottom: '2rem',
                        border: '1px solid lightgray'
                    }}
                />

                <input
                    type="text"
                    value={p_name}
                    placeholder="이름"
                    onChange={(e) => setP_name(e.target.value)}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        marginBottom: '2rem',
                        border: '1px solid lightgray'
                    }}
                />

                <input
                    type="text"
                    value={gender}
                    placeholder="성별"
                    onChange={(e) => setGender(e.target.value)}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        marginBottom: '2rem',
                        border: '1px solid lightgray'
                    }}
                />

                <input
                    type="text"
                    value={price}
                    placeholder="가격"
                    onChange={(e) => setPrice(e.target.value)}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        marginBottom: '2rem',
                        border: '1px solid lightgray'

                    }}
                />

                <input
                    type="text"
                    value={p_size}
                    placeholder="사이즈"
                    onChange={(e) => setP_size(e.target.value)}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        marginBottom: '2rem',
                        border: '1px solid lightgray'
                    }}
                />
                <input
                    type="text"
                    value={amount}
                    placeholder="재고수"
                    onChange={(e) => setAmount(e.target.value)}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        marginBottom: '2rem',
                        border: '1px solid lightgray'
                    }}
                />

                <input
                    type="file"
                    placeholder="사진"
                    onChange={uploadPhoto}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        marginBottom: '2rem',
                        border: '1px solid lightgray'
                    }}
                />

                <button type="submit"
                        className='insertbtn'
                        style={{
                            width: '100%',
                            border: 'none',
                            fontSize: '1.2em',
                            borderRadius: '0.2rem',
                            cursor: 'pointer',
                        }}>추가하기
                </button>

                <div className="message">{message ? <p>{message}</p> : null}</div>
            </form>
        </div>
    );
}

export default InsertForm;
