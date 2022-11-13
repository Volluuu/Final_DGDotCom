package data.controller;

import data.config.LoginIdPwValidator;
import data.config.RegisterMail;
import data.dto.UserDto;
import data.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RegisterMail registerMail;
    @Autowired
    UserMapper userMapper;

    @Autowired
    LoginIdPwValidator loginIdPwValidator;

    // 가입
    @PostMapping("/signup")
    public void signUp(@RequestBody UserDto dto) {
        dto.setPass(passwordEncoder.encode(dto.getPass()));
        userMapper.insertUser(dto);
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
        System.out.println(email);
        String code = registerMail.sendSimpleMessage(email);
        System.out.println("인증 코드 : " + code);
        return code;
    }

    // 핸드폰 번호 중복 체크
    @GetMapping("/hpcheck")
    public int hpCheck(@RequestParam String hp) {
        return userMapper.hpCheck(hp);
    }


//    @PostMapping("/signin")
//    public int signIn(@RequestBody UserDto dto) {
//        User user = (User) loginIdPwValidator.loadUserByUsername(dto.getEmail());
//
//        if (user == null) {
//            return 0; // 이메일에 해당하는 유저가 없을 경우 0 반환
//        } else if (!passwordEncoder.matches(dto.getPass(), user.getPassword())) {
//            return -1; // 이메일에 해당하는 비밀번호가 틀릴 경우 -1 반환
//        } else {
//            // 이메일에 해당하는 비밀번호가 맞을 경우 u_num 반환
//            return userMapper.getUserInfo(user.getUsername()).getU_num();
//        }
//    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());
        return "로그아웃";
    }

    // 이메일, 비번, 이름, 번호, 성별 수정
}
