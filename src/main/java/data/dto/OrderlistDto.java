package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Data
@Alias("OrderlistDto")
public class OrderlistDto {
    private int o_num;
    private int u_num;
    private int p_num;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm" ,timezone = "Asia/Seoul")
    private Timestamp orderday;
    private String o_name;
    private String o_hp;
    private String o_email;
    private String o_address;
    private String post;
    private int amount;
    private int pay;
}
