package data.controller;

import data.dto.KeywordDto;
import data.dto.ProductDto;
import data.dto.UserDto;
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
	public void refreshKeyword(@RequestParam String word) {
		int count = keywordMapper.isThere(word);
		if (count == 0) {
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

	@GetMapping("/latest/get")
	public List<String> getLatestword(@RequestParam int num) {
		String search = keywordMapper.getLatestWord(num);
		if (search == null) {
			return null;
		}
		return Arrays.asList(search.split(","));
	}

	@PostMapping("/latest/update")
	public void updateLatestWord(@RequestParam String word, @RequestParam int num) {
		String search = keywordMapper.getLatestWord(num);
		int listSize;
		if (search == null) {
			listSize = 0;
		} else {
			listSize = Arrays.asList(search.split(",")).size();
		}
		String newSearch;
		Map<String, Object> map = new HashMap<>();
		if (word != null && listSize == 0) {
			newSearch = word;
			map.put("search", newSearch);
			map.put("num", num);
			keywordMapper.updateLatestWord(map);
		} else if (word != null && listSize <= 4) {
			newSearch = search.concat("," + word);
			map.put("search", newSearch);
			map.put("num", num);
			keywordMapper.updateLatestWord(map);
		} else if (word != null && listSize > 4) {
			newSearch = search.substring(search.indexOf(",") + 1).concat(","+word);
			map.put("search", newSearch);
			map.put("num", num);
			keywordMapper.updateLatestWord(map);
		}
	}

	@PostMapping("/latest/delete")
	public void deleteLatestWord(@RequestParam int num) {
		keywordMapper.deleteLatestWord(num);
	}
}
