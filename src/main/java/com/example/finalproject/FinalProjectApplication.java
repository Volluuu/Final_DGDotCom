package com.example.finalproject;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@ComponentScan({"data.*"})
@MapperScan({"data.*"})
@EnableScheduling
public class FinalProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(FinalProjectApplication.class, args);
    }

}
