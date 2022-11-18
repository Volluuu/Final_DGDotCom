package data.mapper;

import data.dto.StyleDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MyStyleMapper {
public List<StyleDto> getAllStyle();
}
