package data.controller;

import data.dto.UserDto;
import data.mapper.MyPageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/mypage")
public class MyPageController {

    @Autowired
    MyPageMapper myPageMapper;

    @GetMapping("/userbyname")
    public UserDto userByName(@RequestParam String u_name){
        return myPageMapper.userByName(u_name);
    }

    @GetMapping("/userbynum")
    public UserDto userByNum(@RequestParam int u_num){
        return myPageMapper.userByNum(u_num);
    }

    @GetMapping("/home")
    public String myPageHome(){
        return "성공";
    }

}
