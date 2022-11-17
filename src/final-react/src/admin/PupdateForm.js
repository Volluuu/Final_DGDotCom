import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import EditIcon from '@material-ui/icons/Edit';

function PupdateForm(props) {
    const [p_name, setP_name] = useState([]);
    const [photo, setPhoto] = useState([]);
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [gender, setGender] = useState([]);
    const [price, setPrice] = useState([]);
    const [p_size, setP_size] = useState([]);
    const [amount, setAmount] = useState([]);
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

    //파일 업로드
    const onUploadChange = (e) => {
        let uploadUrl = localStorage.url + "/admin/pimgupload2";
        const uploadFile = new FormData();
        uploadFile.append("uploadFile", e.target.files[0]);
        axios({
            method: 'post',
            url: uploadUrl,
            data: uploadFile,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
            setPhoto(res.data);

        })
    }

    //수정 버튼 이벤트
    const onSubmits = (e) => {
        e.preventDefault();
        let updateUrl = localStorage.url + "/admin/updateProduct"
        console.dir(data);

        axios.post(updateUrl, data)
            .then(res => {
                navi(`/admin/adproduct`)
            })
        // axios.post(updateUrl, fooddata)
        //     .then(res => {
        //         navi(`/food/detail/${num}`);
    }

    useEffect(() => {
        selectProductData();
    }, []);
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '5rem',
        }}>
            <form onSubmit={onSubmits} style={{
                border: '2px solid lightgray',
                minWidth: '500px'
            }}>
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
                        marginBottom: '2rem',
                        border: '1px solid lightgray'
                    }}
                />

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
                        marginBottom: '2rem',
                        border: '1px solid lightgray'
                    }}
                />

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
                        marginBottom: '2rem',
                        border: '1px solid lightgray'
                    }}
                />

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
                        marginBottom: '2rem',
                        border: '1px solid lightgray'
                    }}
                />

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
                        marginBottom: '2rem',
                        border: '1px solid lightgray'

                    }}
                />

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
                        marginBottom: '2rem',
                        border: '1px solid lightgray'
                    }}
                />
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
                        marginBottom: '2rem',
                        border: '1px solid lightgray'
                    }}
                />

                <input
                    type="file"
                    placeholder="사진"

                    onChange={onUploadChange}
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
                        }}>수정하기
                </button>
            </form>
        </div>
    );
}

export default PupdateForm;