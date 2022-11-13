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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;


@Configuration
@EnableWebSecurity // SecurityConfig가 스프링 필터 체인에 등록되는 것
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {


    @Autowired
    LoginIdPwValidator loginIdPwValidator;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .csrf().disable() // csrf 해제 Cross site Request forgery : 사이트간 위조 요청 방지
                .authorizeRequests() // 요청에 의한 보안검사 시작
//                .antMatchers("/admin/**").hasAuthority("ADMIN") // ROLE_ADMIN을 소유한 사용자만 접근 가능
//                .antMatchers("/cart/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN") // cart 가입한 사람만
//                .antMatchers("/list/**").authenticated() // list 모두 허용
//                .antMatchers("/mypage/**").hasAnyAuthority("ADMIN")
//                .antMatchers("/mypage/**").authenticated()
//                .antMatchers("/mypage/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN") // mypage 가입한 사람만
//                .antMatchers("/product/**").permitAll() // product 모두 허용
//                .antMatchers("/product/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")
                // product 모두 허용
//                .antMatchers("/user/**").permitAll() // user 모두 허용
                .anyRequest().permitAll() // 이 외의 주소는 다 허용한다
//                .anyRequest().denyAll()
//                .anyRequest().authenticated()
                .and()
                .exceptionHandling()
                .accessDeniedPage("/admin")
//                .authenticationEntryPoint(new CustomAuthenticationEntryPoint())
                .and()
                .formLogin() //폼 방식 로그인을 사용할 것임
//                .loginPage("/login") //사용자 정의 로그인 페이지
                .loginProcessingUrl("/user/signin") // 사용자 이름과 암호를 제출할 URL
//                .defaultSuccessUrl("/mypage", true) // 로그인 성공 후 랜딩 페이지
//                .usernameParameter("email")
//                .passwordParameter("pass")
//                .defaultSuccessUrl("/")
                .successHandler(successHandler())
                .failureHandler(new MyLoginFailureHandler())
                .permitAll()
                .and()
                .logout()
//                .failureUrl("/login?error=true") // 로그인 실패 시 방문 페이지
//                .failureHandler(AuthenticationFailureHandler)
//                .logout(); // 폼 방식 로그아웃을 사용할 것임
                .logoutUrl("/user/logout")
                .deleteCookies("JSESSIONID")
                .invalidateHttpSession(true); // 세션 날리기

//                .logoutSuccessHandler(LogoutSuccessHandler);
        return http.build();
    }

    @Bean
    public AuthenticationSuccessHandler successHandler() {
        return new MyLoginSuccessHandler("/");
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration corsConfiguration = new CorsConfiguration();
//        corsConfiguration.addAllowedOrigin("http//localhost:3000");
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedOriginPattern("*");
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration auth) throws Exception {

        return auth.getAuthenticationManager();
//        return auth.authenticationManagerBuilder().inMemoryAuthentication()
//                .withUser()
    }


}
