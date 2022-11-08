package data.mapper;

import data.dto.CartDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface CartMapper {

//    총 수량
    public int getCartCount();
//    장바구니 추가
    public void insertCart(CartDto dto);
//    리스트 출력
    public List<CartDto> getCartList(Map<String,Integer>map);
//    카트 데이터
    public CartDto getData(int c_num);
//    삭제
    public void deleteCart(int c_num);
//    수정
//    public updateCart(CartDto dto);

}
