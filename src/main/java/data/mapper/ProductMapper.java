package data.mapper;

import data.dto.ProductDto;
import data.dto.TradeDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ProductMapper {
//    총 수향 출력
    public int getTotalCount();
    //페이징처리 리스트 호출
    public List<ProductDto> getProductList(Map<String,Object>map);
//    상품 데이터 출력
    public ProductDto getProduct(int p_num);
    //리뷰 데이터
    public List<ProductDto> getReviewData(Map<String,Object>map);
}
