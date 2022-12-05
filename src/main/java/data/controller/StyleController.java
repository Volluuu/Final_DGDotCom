package data.controller;

import data.dto.*;
import data.mapper.ListMapper;
import data.mapper.MyStyleMapper;
import data.mapper.ProductMapper;
import data.mapper.UserMapper;
import data.util.FileUtil;
import org.apache.ibatis.binding.BindingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.*;

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

	@GetMapping("/list/like/count")
	public int getLikeContent(@RequestParam int style_num) {
		if (mapper.getLikeCount(style_num) == 0) {
			return 0;
		}
		return mapper.getLikeCount(style_num);
	}
	@GetMapping("/list/comment/count")
	public int getCommentCount(@RequestParam int style_num) {
		if (mapper.getCommentCount(style_num) == 0) {
			return 0;
		}
		return mapper.getCommentCount(style_num);
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
	@GetMapping("/list/like/check")
	public boolean isCheck(@RequestParam int u_num, @RequestParam int style_num) {
		boolean check;
		Map<String, Integer> map = new HashMap<>();
		map.put("u_num", u_num);
		map.put("style_num", style_num);
		try {
			check = mapper.isCheck(map);
		} catch (BindingException e) {
			return false;
		}
		return check;

	}
//	스타일 추가하기
String uploadFileName;
	@PostMapping("/list/insert/style/photo")
	public String fileUpload(@RequestParam MultipartFile uploadFile, HttpServletRequest request)
	{

		System.out.println("상품사진 업로드");
		//업로드할 폴더 구하기
		String path = request.getSession().getServletContext().getRealPath("/mystyle");
		//기존 업로드 파일이 있을 경우 삭제 후 다시 업로드
		if (uploadFileName != null) {
			FileUtil.deletePhoto(path, uploadFileName);
		}

		//이전 업로드한 사진을 지운 후 현재 사진 업로드하기
		uploadFileName = FileUtil.getChangeFileName(uploadFile.getOriginalFilename());
		try {
			uploadFile.transferTo(new File(path + "/" + uploadFileName));
			System.out.println("업로드 성공");
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		return uploadFileName;
	}
	@PostMapping("/list/insert/style")
	public void insertStyle(@RequestBody StyleDto dto)
	{
		dto.setPhoto(uploadFileName);
		mapper.insertStyle(dto);
		uploadFileName = null;
	}
	@PostMapping("/list/delete/style")
	public void deleteStyle(@RequestParam int style_num) {
		mapper.deleteStyle(style_num);
	}


	//*****************************************************댓글 관련 Controller ****************************************
	@GetMapping("/comment/root")
	public List<CommentDto> get(@RequestParam int style_num) {
		return mapper.getAllComment(style_num);
	}

	@GetMapping("/comment/content")
	public Map<String, Object> getCommentData(@RequestParam int style_num) {
		Map<String, Object> map = new HashMap<>();
		List<CommentDto> list = mapper.getAllComment(style_num);
		List<UserDto> user = new ArrayList<>();
		for (CommentDto commentDto : list) {
			user.add(user_mapper.getUserByNum(commentDto.getU_num()));
		}
		map.put("list", list);
		map.put("user", user);
		return map;
	}

	@GetMapping("/comment/reply")
	public List<CommentDto> getReply(@RequestParam Map<String, Object> allParameters)
	{
		return mapper.getReply(allParameters);
	}

	@PostMapping("/comment/insert")
	public void insertComment(@RequestBody Map<String, Object> allParameters) {
		mapper.insertComment(allParameters);
	}

	@PostMapping("/comment/revise")
	public void reviseComment(@RequestBody Map<String, Object> allParameters) {
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

