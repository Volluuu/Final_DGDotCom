//package data.jwtsecurity.controller;
//
//import data.jwtsecurity.controller.dto.MemberResponseDto;
////import data.jwtsecurity.service.MemberService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/member")
//public class MemberController {
//    private final MemberService memberService;
//
//    @GetMapping("/me")
//    public ResponseEntity<MemberResponseDto> getMyMemberInfo() {
//        return ResponseEntity.ok(memberService.getMyInfo());
//    }
//
//    @GetMapping("/{email}")
//    public ResponseEntity<MemberResponseDto> getMemberInfo(@PathVariable String email) {
//        return ResponseEntity.ok(memberService.getMemberInfo(email));
//    }
//}