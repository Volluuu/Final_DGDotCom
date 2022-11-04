package data.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    // localhost:9003이 잘 실행 되고 있는지 확인 용
    @GetMapping("/")
    public String home() {
        return "서버 실행 잘 됨";
    }
}
