package data.controller;

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
//    페이징처리 리스트 출력

	@GetMapping("/search")
	public List<ProductDto> getProductList(@RequestParam String word)
	{
		List<ProductDto> list = listMapper.getSearchList(word);
		System.out.println(list);
		return list;
	}
}
