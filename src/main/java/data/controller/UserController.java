package data.controller;

//import data.config.LoginIdPwValidator;

import data.config.RegisterMail;
import data.dto.UserDto;
import data.dto.RefreshTokenDto;
import data.jwtsecurity.controller.dto.TokenDto;
import data.jwtsecurity.jwt.TokenProvider;
import data.mapper.TokenMapper;
import data.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.Console;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

    @Autowired
    TokenMapper tokenMapper;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    RegisterMail registerMail;
    @Autowired
    UserMapper userMapper;
    @Autowired
    AuthenticationManagerBuilder authenticationManagerBuilder;
    @Autowired
    TokenProvider tokenProvider;

    @PostMapping("/signup")
    public void signup(@RequestBody UserDto userDto) {
        if (userMapper.getUserInfo(userDto.getEmail()) != null) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다.");
        } else {
            userDto.setPass(passwordEncoder.encode(userDto.getPass()));
            userMapper.insertUser(userDto);
        }
    }

    //이메일 중복 체크
    @GetMapping("/emailcheck")
    public int emailCheck(@RequestParam String email) {
        return userMapper.emailCheck(email);
    }

    // 이메일 인증
    @PostMapping("/mailconfirm")
    public String mailConfirm(@RequestBody Map<String, String> map) throws Exception {
        String email = map.get("email");
//        System.out.println(email);
        String code = registerMail.sendSimpleMessage(email);
//        System.out.println("인증 코드 : " + code);
        return code;
    }

    // 핸드폰 번호 중복 체크
    @GetMapping("/hpcheck")
    public int hpCheck(@RequestParam String hp) {
        return userMapper.hpCheck(hp);
    }


    @PostMapping("/login")
    public TokenDto signIn(@RequestBody UserDto dto) {
        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPass());

        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 4. RefreshToken 저장
        RefreshTokenDto RTDto = new RefreshTokenDto();
        RTDto.setRt_key(authentication.getName());
        RTDto.setRt_value(tokenDto.getRefreshToken());
        if (tokenMapper.countRefreshToken(RTDto) > 0) {
            tokenMapper.updateRefreshToken(RTDto);
        } else {
            tokenMapper.insertRefreshToken(RTDto);
        }


        tokenDto.setU_num(userMapper.getUserInfo(dto.getEmail()).getU_num());
        return tokenDto;
    }

//    @PostMapping("/logout")
//    public String logout(HttpServletRequest request, HttpServletResponse response) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        if (auth != null) {
//            new SecurityContextLogoutHandler().logout(request, response, auth);
//        }
////        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());
//        return "로그아웃";
//    }

    // 이메일, 비번, 이름, 번호, 성별 수정
}
