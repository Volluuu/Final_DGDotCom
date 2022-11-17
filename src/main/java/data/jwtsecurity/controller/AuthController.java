//package data.jwtsecurity.controller;
//
//import data.dto.UserDto;
//import data.jwtsecurity.controller.dto.MemberRequestDto;
//import data.jwtsecurity.controller.dto.MemberResponseDto;
//import data.jwtsecurity.controller.dto.TokenDto;
//import data.jwtsecurity.controller.dto.TokenRequestDto;
//import data.jwtsecurity.service.AuthService;
//import data.mapper.UserMapper;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/auth")
//@RequiredArgsConstructor
//public class AuthController {
//    private final AuthService authService;
//
//    @Autowired
//    PasswordEncoder passwordEncoder;
//    @Autowired
//    UserMapper userMapper;
//
//
////    @PostMapping("/login")
////    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto memberRequestDto) {
////        return ResponseEntity.ok(authService.login(memberRequestDto));
////    }
//
//    @PostMapping("/reissue")
//    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
//        return ResponseEntity.ok(authService.reissue(tokenRequestDto));
//    }
//}
