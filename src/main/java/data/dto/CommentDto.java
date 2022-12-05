package data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("CommentDto")
public class CommentDto {
	private String comment_num;
	private int u_num;
	private int style_num;
	private String content;
	private String root;
	private int parent;
	private int isdel;
	private String u_name;
	private String gender;
}
