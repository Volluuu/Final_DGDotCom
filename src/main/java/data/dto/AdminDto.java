package data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("AdminDto")
public class AdminDto {
    public int u_num;
    public int t_num;
    public int p_num;
    public int o_num;
    public int i_num;
    public int cs_num;
    public int b_num;
    public String b_photo; //배너이미지 (banner table)
    public String post;  //결제완료인지 결제대기중인지 확인하기위한 컬럼 (orderlist table)
    public String brand; //파이그래프에 넣기 위한 데이터 얻기(product table)
    public String state; //배송상태를 확인하기위한 컬럼(trade table)
}
