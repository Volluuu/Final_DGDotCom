package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Data
@Alias("ProductDto")
public class ProductDto {
    private int p_num;
    private String category;
    private String photo;
    private String brand;
    private String gender;
    private String p_name;
    private int price;
    private int discount;
    private int readcount;
}
