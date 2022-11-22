package data.mapper;

import data.dto.CommentDto;
import data.dto.StyleDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MyStyleMapper {
	public List<StyleDto> getAllStyleOrderByNew();

	public List<StyleDto> getAllStyleOrderByPop();

//*****************************************************댓글 관련 Mapper ***************
	public List<CommentDto> getAllComment();
	public List<CommentDto> getReply(int parent);
}
