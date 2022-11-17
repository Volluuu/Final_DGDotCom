package data.mapper;

import data.dto.RefreshTokenDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TokenMapper {
    public void insertRefreshToken(RefreshTokenDto RTDto);

    public void updateRefreshToken(RefreshTokenDto RTDto);

    public int countRefreshToken(RefreshTokenDto RTDto);

    // u_num이 가진 refreshToken 반환
    public RefreshTokenDto selectRefreshToken(String rt_key);
}
