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
    const [discount, setDiscount] = useState("");
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
    const onSubmit = (e) => {
        e.preventDefault();

        let url = localStorage.url + "/admin/productInsert";

        axios.post(url, {category,photo,brand,gender,p_name,price,p_size,amount,discount})
            .then(res=>{
                setCategory('');
                setPhoto('');
                setBrand('');
                setGender('');
                setP_name('');
                setPrice('');
                setP_size('');
                setAmount('');
                setDiscount('');
                setMessage('상품이 추가되었습니다!')
                navi('/admin/adproduct');
            })
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem'
        }}>
            <form onSubmit={onSubmit} style={{
                border: '2px solid lightgray',
                minWidth: '500px'
            }}>
                <div style={{
                    display: 'block',
                    width: '100%',
                    height: '3rem',
                    padding: '0.5rem',
                    fontSize: '1.1em',
                    fontWeight: '500'}}>
                    종류</div>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        marginBottom:'12px',
                        border: '1px solid lightgray'
                    }}
                />

                <div style={{
                    display: 'block',
                    width: '100%',
                    height: '3rem',
                    padding: '0.5rem',
                    fontSize: '1.1em',
                    fontWeight: '500'}}>
                    브랜드</div>
                <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        marginBottom:'12px',
                        border: '1px solid lightgray'
                    }}
                />

                <div style={{
                    display: 'block',
                    width: '100%',
                    height: '3rem',
                    padding: '0.5rem',
                    fontSize: '1.1em',
                    fontWeight: '500'}}>
                    상품명</div>
                <input
                    type="text"
                    value={p_name}
                    onChange={(e) => setP_name(e.target.value)}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        marginBottom:'12px',
                        border: '1px solid lightgray'
                    }}
                />

                <div style={{
                    display: 'block',
                    width: '100%',
                    height: '3rem',
                    padding: '0.5rem',
                    fontSize: '1.1em',
                    fontWeight: '500'}}>
                    성별</div>
                <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        marginBottom:'12px',
                        border: '1px solid lightgray'
                    }}
                />

                <div style={{
                    display: 'block',
                    width: '100%',
                    height: '3rem',
                    padding: '0.5rem',
                    fontSize: '1.1em',
                    fontWeight: '500'}}>
                    가격</div>
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        marginBottom:'12px',
                        border: '1px solid lightgray'

                    }}
                />

                <div style={{
                    display: 'block',
                    width: '100%',
                    height: '3rem',
                    padding: '0.5rem',
                    fontSize: '1.1em',
                    fontWeight: '500'}}>
                    할인율</div>
                <input
                    type="text"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        marginBottom:'12px',
                        border: '1px solid lightgray'
                    }}
                />

                <div style={{
                    display: 'block',
                    width: '100%',
                    height: '3rem',
                    padding: '0.5rem',
                    fontSize: '1.1em',
                    fontWeight: '500'}}>
                    사이즈</div>
                <input
                    type="text"
                    value={p_size}
                    onChange={(e) => setP_size(e.target.value)}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        marginBottom:'12px',
                        border: '1px solid lightgray'
                    }}
                />

                <div style={{
                    display: 'block',
                    width: '100%',
                    height: '3rem',
                    padding: '0.5rem',
                    fontSize: '1.1em',
                    fontWeight: '500'}}>
                    재고수</div>
                <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        marginBottom:'12px',
                        border: '1px solid lightgray'
                    }}
                />

                <div style={{
                    display: 'block',
                    width: '100%',
                    height: '3rem',
                    padding: '0.5rem',
                    fontSize: '1.1em',
                    fontWeight: '500'}}>
                    사진</div>
                <input
                    type="file"
                    onChange={uploadPhoto}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        marginBottom:'12px',
                        border: '1px solid lightgray'
                    }}
                />

                <button type="submit"
                        className='hj-btn hj-btn-green'
                        style={{
                            width: '100%',
                            border: 'none',
                            fontSize: '1.2em',
                            borderRadius: '0.2rem',
                            cursor: 'pointer',
                            marginTop: '2rem'
                        }}>추가하기
                </button>

                <div className="message">{message ? <p>{message}</p> : null}</div>
            </form>
        </div>
    );
}

export default InsertForm;
