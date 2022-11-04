package data.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity // SecurityConfig가 스프링 필터 체인에 등록되는 것
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig{

    @Autowired
    LoginIdPwValidator loginIdPwValidator;
//    private org.springframework.security.web.authentication.logout.LogoutSuccessHandler LogoutSuccessHandler;
//    private org.springframework.security.web.authentication.AuthenticationFailureHandler AuthenticationFailureHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable() // csrf 해제 Cross site Request forgery : 사이트간 위조 요청 방지
                .authorizeRequests() // 요청에 의한 보안검사 시작
//                .antMatchers("/admin/**").hasAuthority("ROLE_ADMIN") // ROLE_ADMIN을 소유한 사용자만 접근 가능
//                .antMatchers("/mypage/**").authenticated() // mypage라는 주소로 들어오면 인증이 필요하다 (로그인 한 사람만)
                .anyRequest().permitAll() // 이 외의 주소는 다 허용한다
                .and()
                .formLogin() //폼 방식 로그인을 사용할 것임
//                .loginPage("/login") //사용자 정의 로그인 페이지
//                .loginProcessingUrl("/process_login") // 사용자 이름과 암호를 제출할 URL
                .defaultSuccessUrl("/mypage", true) // 로그인 성공 후 랜딩 페이지
                .permitAll()
//                .failureUrl("/login?error=true") // 로그인 실패 시 방문 페이지
//                .failureHandler(AuthenticationFailureHandler)
                .and()
                .logout(); // 폼 방식 로그아웃을 사용할 것임
//                .logoutUrl("/perform_logout")
//                .deleteCookies("JSESSIONID")
//                .logoutSuccessHandler(LogoutSuccessHandler);
        return http.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration auth) throws Exception {
        return auth.getAuthenticationManager();
    }


}
