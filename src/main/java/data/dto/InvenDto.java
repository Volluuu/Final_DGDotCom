package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Data
@Alias("InvenDto")
public class InvenDto {
    private int i_num;
    private int p_num;
    private int sellamount;
    private String p_size;
    private int amount;
}
