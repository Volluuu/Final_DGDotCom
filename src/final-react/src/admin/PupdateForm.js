import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import EditIcon from '@material-ui/icons/Edit';
import './button.css';

function PupdateForm(props) {
    const [photo, setPhoto] = useState([]);
    const {pnum} = useParams();
    const [data, setData] = useState([]);
    const navi = useNavigate();
    const {i_num} = useParams();
    const {currentPage} = useParams();


    let url = localStorage.url + "/admin/select?p_num="+currentPage;
    console.log(currentPage);

    const photoUrl = localStorage.url + "/product/";

    const selectProductData = () => {
        axios.get(url)
            .then(res => {
                setData(res.data);
                console.dir(res.data);
            })
    }

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

    //수정 버튼 이벤트
    const onSubmits = (e) => {
    e.preventDefault();
        let updateUrl = localStorage.url + "/admin/updateProduct";

        // setData(photo)
        console.log('데이터')
        console.dir(data);

        axios.post(updateUrl, data)
            .then(res => {
                setPhoto([]);
                navi(`/admin/adproduct`)
            })
    }

    useEffect(() => {
        selectProductData();
    }, []);
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem'
        }}>
            <form onSubmit={onSubmits} style={{
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
                    value={data.category}
                    placeholder="종류"
                    onChange={(e) => {
                        setData({
                           ...data,
                        category:e.target.value
                        })
                    }}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        border: '1px solid lightgray',
                        marginBottom:'12px',
                        color:'lightgray'
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
                    value={data.brand}
                    placeholder="브랜드"
                    onChange={(e) =>
                    {
                        setData({
                            ...data,
                            brand:e.target.value
                        })
                    }}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        border: '1px solid lightgray',
                        marginBottom:'12px',
                        color:'lightgray'
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
                    value={data.p_name}
                    placeholder="이름"
                    onChange={(e) =>  {
                        setData({
                            ...data,
                            p_name:e.target.value
                        })
                    }}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        border: '1px solid lightgray',
                        marginBottom:'12px',
                        color:'lightgray'
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
                    value={data.gender}
                    placeholder="성별"
                    onChange={(e) =>  {
                        setData({
                            ...data,
                            gender:e.target.value
                        })
                    }}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        border: '1px solid lightgray',
                        marginBottom:'12px',
                        color:'lightgray'
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
                    value={data.price}
                    placeholder="가격"
                    onChange={(e) =>  {
                        setData({
                            ...data,
                            price:e.target.value
                        })
                    }}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        border: '1px solid lightgray',
                        marginBottom:'12px',
                        color:'lightgray'

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
                    value={data.discount}
                    placeholder="할인율"
                    onChange={(e) =>  {
                        setData({
                            ...data,
                            discount:e.target.value
                        })
                    }}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        border: '1px solid lightgray',
                        marginBottom:'12px',
                        color:'lightgray'
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
                    value={data.p_size}
                    placeholder="사이즈"
                    onChange={(e) =>  {
                        setData({
                            ...data,
                            p_size:e.target.value
                        })
                    }}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        border: '1px solid lightgray',
                        marginBottom:'12px',
                        color:'lightgray'
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
                    value={data.amount}
                    placeholder="재고수"
                    onChange={(e) =>  {
                        setData({
                            ...data,
                            amount:e.target.value
                        })
                    }}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '3rem',
                        padding: '0.5rem',
                        fontSize: '1.1em',
                        fontWeight: '500',
                        border: '1px solid lightgray',
                        marginBottom:'12px',
                        color:'lightgray'
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
                    className='upimage'
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
                    }}/>
                <p style={{marginTop:'4px',marginBottom:'12px'}}>* 이미지를 넣지않으면 기본이미지가 유지됩니다.</p>

                <button type="submit"
                        className='hj-btn hj-btn-green'
                        style={{
                            width: '100%',
                            border: 'none',
                            fontSize: '1.2em',
                            borderRadius: '0.2rem',
                            cursor: 'pointer',
                            marginTop: '2rem'
                        }}>수정하기
                </button>
            </form>
        </div>
    );
}

export default PupdateForm;