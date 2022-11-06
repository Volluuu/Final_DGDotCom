package data.mapper;

import data.dto.ProductDto;
import data.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminMapper {
    /* 총 유저수를 불러오기위한 메서드 */
    public int TotalUser();

    /* 회원정보를 불러오기위한 메서드 */
    public UserDto UserNum(int u_num);

    /* 회원정보를 삭제하기위한 메서드 */
    public void DeleteUser(int u_num);

    /* 총 상품수를 불러오기위한 메서드 */
    public int TotalProduct();

    /* 상품정보를 불러오기위한 메서드 */
    public ProductDto ProductNum(int p_num);

    /* 상품을 추가하기위한 메서드 */
    public void InsertProduct(ProductDto dto);

    /* 상품정보를 삭제하기위한 메서드 */
    public void DeleteProduct(int p_num);

    /* 상품정보를 업데이트하기위한 메서드 */
    public void UpdateProduct(int p_num);

}
