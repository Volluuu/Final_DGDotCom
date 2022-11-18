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

    //이메일 수정
    public void emailChange(UserDto dto);

    // 이전 비밀번호 일치 체크
    public int passCheck(UserDto dto);

    // 비밀번호 수정
    public void passChange(UserDto dto);

    // 이름 수정
    public void nameChange(UserDto dto);

    // 휴대폰 번호 수정
    public void hpChange(UserDto dto);

    // 주소 수정
    public void addrChange(UserDto dto);

    //회원 탈퇴
    public void deleteUser(int u_num);

    // 휴대폰 번호로 이메일 찾기
    public String findEmailByHp(String hp);

    // 휴대폰 번호, 이메일에 맞는 아이디 있는지 체크
    public int findPassCheck(UserDto dto);

    // 임시 비밀번호로 변경
    public void findPassUpdate(UserDto dto);

    // refresh_token 삭제
    public void deleteRefreshToken(String u_num);

}
