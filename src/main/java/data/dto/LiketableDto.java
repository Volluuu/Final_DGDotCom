package data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("LiketableDto")
public class LiketableDto {
	private int like_num;
	private int u_num;
	private int style_num;
}
