package data.mapper;

import data.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MyPageMapper {
    // u_name을 받아서 UserDto를 반환하는 메서드
    public UserDto userByName(String u_name);
    // u_num을 받아서 UserDto를 반환하는 메서드
    public UserDto userByNum(int u_num);

}
