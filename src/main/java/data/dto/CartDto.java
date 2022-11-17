package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Data
@Alias("CartDto")
public class CartDto {
    private int c_num;
    private int u_num;
    private int p_num;
    private String p_size;
    private int amount;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp addday;
    private String p_name;
    private  int price;
    private  String photo;
    private int discount;
//    유저 테이블 정보
//    private String email;
//    private String u_name;
//    private String pass;
//    private String hp;
//    private String addr;
//    private String gender;
//    private String isadmin;
//    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
//    private Timestamp gaip;
//    private int point;
//    private String search;
}
