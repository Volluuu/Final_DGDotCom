package data.mapper;

import data.dto.KeywordDto;
import data.dto.ProductDto;
import data.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface KeywordMapper {
	//검색어를 기준으로 리스트 목록 가져오기
	public List<KeywordDto> getTopTen();
	public void insertKeyword(String word);
	public void updateKeyword(String word);
	public int isThere(String word);
	public List<ProductDto> getHotBrand();
	public String getLatestWord(int num);
	public void updateLatestWord(Map<String, Object> map);
	public void deleteLatestWord(int num);
}
