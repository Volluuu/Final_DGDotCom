import React, {useRef, useState} from 'react';
import styled from "styled-components";
import SearchModalStyle from "./SearchModalStyle";
import axios from "axios";


export const MyStyleForm = () => {
    const [tagItem, setTagItem] = useState('')
    const [tagList, setTagList] = useState([])
    const [content, setContent] = useState('')
    const contentRef = useRef();
    const [photo, setPhoto] = useState('');
    const photoRef = useRef();
    const [product, setProduct] = useState([]);
    const onKeyPress = e => {
        if (e.target.value.length !== 0 && e.key === 'Enter') {
            submitTagItem()
        }
    }

    const submitTagItem = () => {
        let updatedTagList = [...tagList]
        updatedTagList.push(tagItem)
        setTagList(updatedTagList)
        setTagItem('')
    }

    const deleteTagItem = e => {
        const deleteTagItem = e.target.parentElement.firstChild.innerText
        const filteredTagList = tagList.filter(tagItem => tagItem !== deleteTagItem)
        setTagList(filteredTagList)
    }
    const DeleteItem = (id) => {
        if(window.confirm("해당 품목을 삭제하시겠습니까?")){
        setProduct(product.filter((elt, idx)=> id !== idx));
        }
    }
    const setImage = e => {
        if(!e.target.files[0]) {
            return;
        }
        photoRef.current = e.target.files[0];
    }
    const uploadPhoto = (e) => {
        const uploadUrl = localStorage.url + "/style/list/insert/style/photo";

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
    const submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("u_num", sessionStorage.u_num);
        //1. 사진담기
        // 위에서 해결
        //2. 내용담기
        formData.append("content", content);
        //3. 해시태그 담기
        let hashtag = "";
        for(let i = 0; i < tagList.length; i++) {
            hashtag =hashtag + "," + tagList[i];
        }
        formData.append("tag", hashtag.substr(1));

        //4. 상품 리스트 담기
        let productstr = "";
        for(let i = 0; i < product.length; i++) {
            productstr = productstr + "," + product[i].p_num;
        }
        formData.append("p_list", productstr.substr(1));

        const url = localStorage.url + "/list/insert/style";
        axios.post(url, {formData})
            .then(res=>{
                //등록완료 시 스타일페이지로 이동하게 만드는 메소드
                // navi('/admin/adproduct');
            })
    }
    return (
        <form onSubmit={submitForm}>
        <Wrapper>
            <div>
                <p>나만의 스타일을 선택해 주세요.</p>
                <input type="file" style={{cursor:"pointer"}} ref={photoRef} onChange={uploadPhoto}/>
            </div>
            <div>
                <p>스타일에 대한 간단한 소개를 적어주세요.</p>
                <input style={{}}
                       placeholder={"내용을 입력해주세요"}
                       required
                       ref={contentRef}
                       onKeyUp={() => {
                           let searchQuery = contentRef.current.value;
                           setTimeout(() => {
                               if (searchQuery === contentRef.current.value) {
                                   setContent(searchQuery);
                               }
                           }, 100);
                       }}
                />
            </div>
            <div>
                <p>해시태그를 추가해주세요(추가한 태그는 아래에서 삭제할 수 있어요)</p>
                <WholeBox>
                    <TagInput
                        type='text'
                        placeholder='해시태그 추가'
                        tabIndex={2}
                        onChange={e => setTagItem(e.target.value)}
                        value={tagItem}
                        onKeyPress={onKeyPress}
                    />
                    <TagBox>
                        {tagList.map((tagItem, index) => {
                            return (
                                <TagItem key={index}>
                                    <Text>{tagItem}</Text>
                                    <Button onClick={deleteTagItem}>X</Button>
                                </TagItem>
                            )
                        })}

                    </TagBox>
                </WholeBox>
            </div>
            <div>
                <p style={{marginBottom:"10px"}}>사진에서 착용한 상품을 골라주세요. <SearchModalStyle product={product} setProduct={setProduct}/></p>
                {
                    product.map((elt, idx)=>
                        <SearchElement key={idx}>
                            <img src={`${process.env.REACT_APP_URL}/product/${elt.photo}`} alt=""/>
                            <div style={{paddingLeft:"10px"}}>
                                <p style={{fontSize:"12px" , marginBottom:"5px"}}>{elt.brand}</p>
                                <p style={{fontSize:"14px"}}>{elt.p_name}</p>
                            </div>
                            <DeleteButton onClick={()=>DeleteItem(idx)}>삭제</DeleteButton>
                        </SearchElement>
                    )
                }
            </div>
            <Menu style={{width:"200px"}}>
                <button type={"submit"}>등록</button>
                {/*라우터 메인 수정하고 useNavigate 써서 뒤로가기 구현*/}
                <button>뒤로가기</button>
            </Menu>
        </Wrapper>
        </form>
    );
};

export default MyStyleForm;

const Wrapper = styled.div`
  display: flex;
  width: 600px;
  min-height: 800px;
  margin: 0 auto;
  margin-top: 20px;
  flex-wrap: wrap;
  border: 1px solid #DDD;
  border-radius: 20px;
  padding:10px;
  & > div {
    width: 100%;
    margin-bottom: 20px;
  }
`
const WholeBox = styled.div`
  padding: 10px;

`
const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 50px;
  margin: 10px;
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;

  &:focus-within {
    border-color: #DDD;
  }
`

const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: #DDD;
  border-radius: 5px;
  color: white;
  font-size: 13px;
`

const Text = styled.span``

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  margin-left: 5px;
  background-color: white;
  border-radius: 50%;
  color: #DDD;
`
const TagInput = styled.input`
  display: inline-flex;
  min-width: 150px;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
`
const SearchElement = styled.div`
  position: relative;
    border : 3px solid #dee2e6;
    display: flex;
    padding : 10px;
  cursor:pointer;
  width: 100%;
    & > img {
      border : 1px solid black; 
      width:80px;
      height:80px;
    }
  height: 100px;
`
const DeleteButton = styled.button`
  position: absolute;
    top:10px;
    right: 10px;
`
const Menu = styled.div`
  display:flex;
  justify-content: space-between;
  width: 200px;
  margin: 0 auto;
  & > button {
    &:hover {
      background-color: black;
      color: white;
    }
  }
`