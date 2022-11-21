package data.controller;

import data.dto.RefreshTokenDto;
import data.dto.UserDto;
import data.jwtsecurity.controller.dto.TokenDto;
import data.jwtsecurity.jwt.TokenProvider;
import data.mapper.TokenMapper;
import data.mapper.UserMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.web.bind.annotation.*;

import java.security.Key;
import java.util.Date;

@RestController
@CrossOrigin
@RequestMapping("/social")
public class SocialController {

    private static final String AUTHORITIES_KEY = "auth";
    private static final String BEARER_TYPE = "bearer";
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30;            // 30분
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;  // 7일
    private final Key key;

    @Autowired
    AuthenticationManagerBuilder authenticationManagerBuilder;
    @Autowired
    TokenProvider tokenProvider;
    @Autowired
    UserMapper userMapper;
    @Autowired
    TokenMapper tokenMapper;

    public SocialController(@Value("${jwt.secret}") String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }


    @PostMapping("/login")
    public TokenDto signIn(@RequestBody UserDto dto) {
//        System.out.println(dto.getEmail());
//        System.out.println(dto.getPass());
//         1. Login ID/PW 를 기반으로 AuthenticationToken 생성
//        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPass());
//        System.out.println("소셜 1 " + authenticationToken);
//         2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
//            authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
//        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
//        System.out.println("소셜 2 " + authentication);
//         3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = new TokenDto();
        String authorities = userMapper.getUserInfo(dto.getEmail()).getIsadmin();
        long now = (new Date()).getTime();
        // Access Token 생성
        Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
//        System.out.println(accessTokenExpiresIn);
        String accessToken = Jwts.builder()
                .setSubject(dto.getEmail())                 // payload "sub": "name"
                .claim(AUTHORITIES_KEY, authorities)        // payload "auth": "ROLE_USER"
                .setExpiration(accessTokenExpiresIn)        // payload "exp": 1516239022 (예시)
                .signWith(key, SignatureAlgorithm.HS512)    // header "alg": "HS512"
                .compact();
//        System.out.println(accessToken);
//        System.out.println(accessToken.toString());
        // Refresh Token 생성
        String refreshToken = Jwts.builder()
                .setExpiration(new Date(now + REFRESH_TOKEN_EXPIRE_TIME))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
//        System.out.println(refreshToken);
//        System.out.println(refreshToken.toString());
        tokenDto.setGrantType(BEARER_TYPE);
        tokenDto.setAccessToken(accessToken);
        tokenDto.setAccessTokenExpiresIn(accessTokenExpiresIn.getTime());
        tokenDto.setRefreshToken(refreshToken);

        // 4. RefreshToken 저장
        RefreshTokenDto RTDto = new RefreshTokenDto();
        RTDto.setRt_key(Integer.toString(userMapper.getUserInfo(dto.getEmail()).getU_num()));
        RTDto.setRt_value(tokenDto.getRefreshToken());
        if (tokenMapper.countRefreshToken(RTDto) > 0) {
            tokenMapper.updateRefreshToken(RTDto);
        } else {
            tokenMapper.insertRefreshToken(RTDto);
        }

        tokenDto.setU_num(userMapper.getUserInfo(dto.getEmail()).getU_num());
        tokenDto.setRefreshToken(RTDto.getRt_value());
        return tokenDto;
    }
}
