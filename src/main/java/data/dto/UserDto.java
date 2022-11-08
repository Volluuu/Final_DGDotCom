package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Data
@Alias("UserDto")
public class UserDto {
    private int u_num;
    private String email;
    private String u_name;
    private String pass;
    private String hp;
    private String addr;
    private String gender;
    private String isadmin;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp gaip;
    private int point;
}
