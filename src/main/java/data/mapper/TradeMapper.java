package data.mapper;

import data.dto.TradeDto;
import data.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface TradeMapper {
    //    유저 정보
    public UserDto userOrder(int u_num);
    //    총 수량
    public int getOrderCount();
    // u_num 총 수향
    public int getUserOrderCount(int u_num);
    //    장바구니 추가
    public void insertOrder(TradeDto dto);
    //    리스트 출력
    public List<TradeDto> getOrderList(Map<String,Integer> map);
    //    오더 데이터
    public TradeDto getOrderData(int t_num);
    //    주문번호 데이터
    public List<TradeDto> getUidData(Map<String,Object>map);
    //    삭제
    public void deleteorder(int t_num);
    //    주문내역 삭제
    public void deleteUid(String merchant_uid);
//    수정
//    public updateCart(CartDto dto);

}
