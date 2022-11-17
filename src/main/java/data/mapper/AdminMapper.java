package data.mapper;

import data.dto.AdminDto;
import data.dto.JoinDto;
import data.dto.ProductDto;
import data.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

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
    public List<UserDto> AdminUserPaging(Map<String,Integer> map);

    /* 회원정보를 삭제하기위한 메서드 */
    public String DeleteUser(int u_num);

    /* -------------------상품시작------------------- */

    public int TotalProduct();
   public List<ProductDto> GetAllProduct();

    /* 상품정보를 불러오기위한 메서드 */
    public List<JoinDto> ProductPaging(Map<String,Integer> map);

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
