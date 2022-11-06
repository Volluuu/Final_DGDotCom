package data.mapper;

import data.dto.TradeDto;
import data.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

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






}
