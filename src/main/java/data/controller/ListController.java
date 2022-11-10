package data.controller;

import data.dto.KeywordDto;
import data.dto.ProductDto;
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

	@GetMapping("/search")
	public List<ProductDto> getProductList(@RequestParam String word) {
		return listMapper.getSearchList(word);
	}

	@PostMapping("/keyword")
	public void refreshKeyword(@RequestParam KeywordDto dto){

	}
}
