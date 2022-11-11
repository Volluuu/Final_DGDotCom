package data.mapper;

import data.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    //스프링 시큐리티용 로그인
    public UserDto getUserInfo(String email);

    public UserDto getUserByNum(int u_num);

    //스프링 시큐리티용 회원가입
    public void insertUser(UserDto dto);

    // 이메일 중복 체크
    public int emailCheck(String email);

    // 핸드폰 중복 체크
    public int hpCheck(String hp);


}
