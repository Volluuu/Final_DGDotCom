package data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("KeywordDto")
public class KeywordDto {
	private int word_num;
	private String word;
	private int word_count;
}
