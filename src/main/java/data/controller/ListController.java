package data.controller;

import data.dto.KeywordDto;
import data.dto.ProductDto;
import data.mapper.KeywordMapper;
import data.mapper.ListMapper;
import data.mapper.ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/list")
public class ListController {

	@Autowired
	ProductMapper productMapper;
	@Autowired
	ListMapper listMapper;
	@Autowired
	KeywordMapper keywordMapper;
	@GetMapping("/search")
	public List<ProductDto> getProductList(@RequestParam String word) {
		return listMapper.getSearchList(word);
	}
	@GetMapping("/card")
	public ProductDto getElt(@RequestParam int num) {
		return listMapper.getElt(num);
	}

//**********************************************위에는 리스트 아래는 키워드 나누기 귀찬아서 ㅎㅎ; ***************
	@PostMapping("/keyword")
	public void refreshKeyword(@RequestParam String word){
		int count = keywordMapper.isThere(word);
		if(count == 0) {
			keywordMapper.insertKeyword(word);
		} else {
			keywordMapper.updateKeyword(word);
		}
	}
	@GetMapping("/hot")
	public List<KeywordDto> getTopTen() {
		return keywordMapper.getTopTen();
	}
	@GetMapping("/brand")
	public List<ProductDto> getHotBrand() {
		return keywordMapper.getHotBrand();
	}
}
