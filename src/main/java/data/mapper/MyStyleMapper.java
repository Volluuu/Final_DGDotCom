package data.mapper;

import data.dto.CommentDto;
import data.dto.StyleDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MyStyleMapper {
	public List<StyleDto> getStyleListSelectByTag(String tag);

	public List<StyleDto> getAllStyleOrderByNew();

	public List<StyleDto> getAllStyleOrderByPop();

	public void insertStyle(StyleDto dto);
	public void deleteStyle(int style_num);
	//*****************************************************댓글 관련 Mapper ***************
	public List<CommentDto> getAllComment(int style_num);

	public List<CommentDto> getReply(Map<String, Object> map);

	public void insertComment(Map<String, Object> map);

	public void reviseComment(Map<String, Object> map);

	public void deleteComment(int comment_num);
	//*****************************************************좋아요 관련 Mapper ***************
	public int getLikeCount(int style_num);
	public int getCommentCount(int style_num);
	public void addLike(Map<String, Integer> map);
	public void substractLike(Map<String, Integer> map);
	public boolean isCheck(Map<String, Integer> map);
}
