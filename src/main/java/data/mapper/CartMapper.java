package data.mapper;

import data.dto.CartDto;
import data.dto.TradeDto;
import data.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface CartMapper {

//    유저 정보
    public UserDto userCart(int u_num);
//    총 수량
    public int getCartCount();
    // u_num 총 수향
    public int getUserCartCount(int u_num);
//    장바구니 추가
    public void insertCart(CartDto dto);
//    리스트 출력
    public List<CartDto> getCartList(Map<String,Integer>map);
//    카트 데이터
    public CartDto getData(int c_num);
//    삭제
    public void deleteCart(int c_num);
//    수정
    public void updateCart(CartDto dto);
    // 결제
    public void insertTrade(TradeDto dto);
}
