package data.controller;

import data.dto.CommentDto;
import data.dto.ProductDto;
import data.dto.StyleDto;
import data.dto.UserDto;
import data.mapper.ListMapper;
import data.mapper.MyStyleMapper;
import data.mapper.ProductMapper;
import data.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/style")
public class StyleController {

	@Autowired
	MyStyleMapper mapper;
	@Autowired
	UserMapper user_mapper;
	@Autowired
	ProductMapper pro;
	@Autowired
	ListMapper list;
	//*****************************************************리스트 관련 Controller ****************************************

	@GetMapping("/list/new")
	public List<StyleDto> orderByNew() {
		return mapper.getAllStyleOrderByNew();

	}

	@GetMapping("/list/pop")
	public List<StyleDto> orderByPop() {
		return mapper.getAllStyleOrderByPop();
	}

	@GetMapping("/list/tags")
	public List<StyleDto> selectByTag(@RequestParam String tag) {
		String subTag = tag.substring(1);
		return mapper.getStyleListSelectByTag(tag);
	}

	//*****************************************************댓글 관련 Controller ****************************************
	@GetMapping("/comment/root")
	public List<CommentDto> get() {
		return mapper.getAllComment();
	}

	@GetMapping("/comment/reply")
	public List<CommentDto> getReply(@RequestParam int parent) {
		return mapper.getReply(parent);
	}

	//*****************************************************유저 정보 반환 관련 Controller ****************************************
	@GetMapping("/user/num")
	public UserDto getUserByNum(@RequestParam int num) {
		return user_mapper.getUserByNum(num);
	}

	@GetMapping("/user/selected")
	public ProductDto getElt(@RequestParam int num) {
		return list.getElt(num);
	}
}

