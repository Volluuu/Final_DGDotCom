package data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Data
@Alias("StyleDto")
public class StyleDto {
	private int style_num;
	private String photo;
	private int u_num;
	private String content;
	private String tag;
	private String p_list;
	private int likes;
	private int comment;
	private Timestamp writeday;
}
