import React, { useState } from 'react'
import styled from 'styled-components'


const Tag = () => {
    const [tagItem, setTagItem] = useState('')
    const [tagList, setTagList] = useState([])

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

    return (
        <WholeBox>
            <TagInput
                type='text'
                placeholder='Press enter to add tags'
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
    )
}

const WholeBox = styled.div`
  padding: 10px;
  height: 100vh;
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
    border-color: tomato;
  }
`

const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: tomato;
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
  color: tomato;
`

const TagInput = styled.input`
  display: inline-flex;
  min-width: 150px;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
`

export default Tag