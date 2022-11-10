package data.controller;

import data.config.RegisterMail;
import data.dto.UserDto;
import data.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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

    // 이메일, 비번, 이름, 번호, 성별


}
