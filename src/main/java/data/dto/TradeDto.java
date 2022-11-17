package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Data
@Alias("TradeDto")
public class TradeDto {
    private int t_num;
    private int p_num;
    private int u_num;
    private  String merchant_uid;
    private String t_name;
    private String t_hp;
    private String t_email;
    private String t_addr;
    private int count;
    private int lastprice;
    private String p_size;
    private String invoice;
    private String state;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp day;
}
