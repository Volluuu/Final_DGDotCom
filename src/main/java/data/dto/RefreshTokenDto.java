package data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("RTDto")
public class RefreshTokenDto {
    private String rt_key;
    private String rt_value;
}
