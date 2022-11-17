package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Data
@Alias("JoinDto")
public class JoinDto {
    private int t_num;
    private int p_num;
    private int u_num;
    private int i_num;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp day;
    private int lastprice;
    private int count;
    private String invoice;
    private String state;
    private String category;
    private String photo;
    private String brand;
    private String gender;
    private String p_name;
    private String p_size;
    private int amount;
    private int sellamount;
    private int price;
    private int discount;
    private int readcount;
}
