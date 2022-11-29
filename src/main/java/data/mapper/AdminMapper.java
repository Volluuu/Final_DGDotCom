package data.mapper;

import data.dto.*;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.List;
import java.util.Map;

@Mapper
public interface AdminMapper {
    /* -------------------유저시작------------------- */
    /* 총 유저수를 불러오기위한 메서드 */
    public int TotalUser();

    /* 회원정보를 불러오기위한 메서드 */
    public List<UserDto> AdminGetAllUser();

    /* 회원정보 페이징을위한 메서드 */
//    public List<UserDto> AdminUserPaging(Map<String,Integer> map);

    /* 회원정보를 삭제하기위한 메서드 */
    public String DeleteUser(int u_num);

    /* 회원 검색 메서드*/
    public List<UserDto> SearchUser(String u_name);

    /* -------------------상품시작------------------- */

    public int TotalProduct();

    public List<ProductDto> GetAllProduct();

    /* 상품정보를 불러오기위한 메서드 */
    public List<JoinDto> AllProduct();

    /* 상품을 추가하기위한 메서드 */
    public void InsertProduct(JoinDto dto);

    public void InsertInven(JoinDto dto);

    /* 상품정보를 삭제하기위한 메서드 */
    public void DeleteProduct(int p_num);

    /* 상품정보를 업데이트하기위한 메서드 */
    public void UpdateProduct(JoinDto dto);
    /*인벤정보를 업데이트하기위한 메서드*/
    public void UpdateInven(JoinDto dto);

    /*상품의 가장 마지막 p_num을 알기위한 메서드*/
    public int getMaxPnum();

    public JoinDto selectProduct(int p_num);

    /* -------------------배송관리시작------------------- */


    /* 총 배송관리 수를 구하기위한 메서드 */
    public int TotalBeforeDelivery();

    /* 배송관리 페이징 메서드 */
    public List<TradeDto> BeforeDeliveryPaging(Map<String,Integer> map);

    /* 배송 전 상태에서 invoice넣기 */
    public void InsertInvoice(TradeDto dto);

    /* 배송 전 상태에서 invoice수정*/
    public void UpdateInvoice(TradeDto dto);

    /* 배송 중에서 배송완료로 업데이트,*/
    public void CompleteDelivery(TradeDto dto);

    /* 배송 중 총 갯수*/
    public int TotalDelivering();

    /* 배송관리 페이징 메서드 */
    public List<TradeDto> DeliveringPaging(Map<String,Integer> map);

    public int TotalDeliveryComplete();

    /* 배송관리 페이징 메서드 */
    public List<TradeDto> DeliveryCompletePaging(Map<String,Integer> map);
    /* -------------------배송관리 끝------------------- */

    /* -------------------배너시작------------------- */

    /* 배너리스트를 출력하기위한 메서드 */
    public List<AdminDto> getBannerList();

    /* 배너를 업로드하기위한 메서드 */
    public void InsertBanner(AdminDto Adto);

    /* 배너를 업데이트하기위한 메서드 */
    public void UpdateBanner(AdminDto Adto);

    /* 배너 삭제를위한 메서드 */
    public void DeleteBanner(int b_num);

    /* 배너데이터 */
    public AdminDto getBannerData(int b_num);

}
