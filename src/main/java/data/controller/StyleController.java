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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

	@GetMapping("/list/like")
	public int getLikeContent(@RequestParam int style_num) {
		if (mapper.getLikeCount(style_num) == 0) {
			return 0;
		}
		return mapper.getLikeCount(style_num);
	}

	@PostMapping("list/like/add")
	public void addLike(@RequestParam int u_num, @RequestParam int style_num) {
		Map<String, Integer> map = new HashMap<>();
		map.put("u_num", u_num);
		map.put("style_num", style_num);
		mapper.addLike(map);
	}

	@PostMapping("list/like/substract")
	public void substractLike(@RequestParam int u_num, @RequestParam int style_num) {
		Map<String, Integer> map = new HashMap<>();
		map.put("u_num", u_num);
		map.put("style_num", style_num);
		mapper.substractLike(map);
	}




	//*****************************************************댓글 관련 Controller ****************************************
	@GetMapping("/comment/root")
	public List<CommentDto> get(@RequestParam int style_num) {
		return mapper.getAllComment(style_num);
	}

//	@GetMapping("/comment/root")
//	public Map<String, Object> getCommentData(@RequestParam int style_num) {
//		return mapper.getAllComment(style_num);
//	}

	@GetMapping("/comment/reply")
	public List<CommentDto> getReply(@RequestParam Map<String, Object> allParameters)
	{
		return mapper.getReply(allParameters);
	}

	@PostMapping("/comment/insert")
	@ResponseBody
	public void insertComment(@RequestParam Map<String, Object> allParameters) {
		mapper.insertComment(allParameters);
	}

	@PostMapping("/comment/revise")
	public void reviseComment(@RequestParam Map<String, Object> allParameters) {
		mapper.reviseComment(allParameters);
	}

	@PostMapping("/comment/delete")
	public void deleteComment(@RequestParam int comment_num) {
		mapper.deleteComment(comment_num);
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

