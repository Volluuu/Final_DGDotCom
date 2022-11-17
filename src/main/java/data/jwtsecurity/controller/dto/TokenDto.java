package data.jwtsecurity.controller.dto;

import lombok.*;
import org.apache.ibatis.type.Alias;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Alias("TokenDto")
public class TokenDto {
    private String grantType;
    private String accessToken;
    private String refreshToken;
    private Long accessTokenExpiresIn;
    private int u_num;


}
