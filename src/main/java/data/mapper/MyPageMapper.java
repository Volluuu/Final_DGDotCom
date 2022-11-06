package data.mapper;

import com.fasterxml.jackson.annotation.JsonFormat;
import data.dto.JoinDto;
import data.dto.ProductDto;
import data.dto.TradeDto;
import data.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@Mapper
public interface MyPageMapper {
    /* User */
    public UserDto userByName(String u_name); // u_name을 받아서 UserDto를 반환하는 메서드

    public UserDto userByNum(int u_num); // u_num을 받아서 UserDto를 반환하는 메서드

    /* Trade */
    public int tradeTotalCount(Map<String, Object> map); // u_num에 해당하는 총 갯수
    public int tradeTotalPrice(Map<String, Object> map); // 총 구매가격
    public List<TradeDto> tradePagingByU_num(Map<String, Object> map); // u_num에 해당하는 거래내역 반환 메서드 + 페이징 처리
    public List<JoinDto> joinTradeProductByU_num(Map<String, Object> map); // u_num에 해당하는 trade와 각 trade의 product를 반환하는 Join select + 페이징
    public String getMinDayByU_num(int u_num); // 최초 거래 일자 반환 메서드


    /* Product */
    public ProductDto getProductByP_num(Map<String, Object> map); // p_num에 해당하는 상품내역 반환 메서드




}
