package data.jwtsecurity.config;

import data.jwtsecurity.jwt.JwtAccessDeniedHandler;
import data.jwtsecurity.jwt.JwtAuthenticationEntryPoint;
import data.jwtsecurity.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;


@EnableWebSecurity // SecurityConfig가 스프링 필터 체인에 등록되는 것
@RequiredArgsConstructor
@CrossOrigin
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    //    @Autowired
//    LoginIdPwValidator loginIdPwValidator;
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring()
                .antMatchers("/h2-console/**", "/favicon.ico");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // CSRF 설정 Disable
        http
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .csrf().disable()
                // exception handling 할 때 우리가 만든 클래스를 추가
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

//                // h2-console 을 위한 설정을 추가
//                .and()
//                .headers()
//                .frameOptions()
//                .sameOrigin()

                // 시큐리티는 기본적으로 세션을 사용
                // 여기서는 세션을 사용하지 않기 때문에 세션 설정을 Stateless 로 설정
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                // 로그인, 회원가입 API 는 토큰이 없는 상태에서 요청이 들어오기 때문에 permitAll 설정
                .and()
                .authorizeRequests()
                .antMatchers("/admin/**").permitAll()
                .antMatchers("/cart/**").permitAll()
                .antMatchers("/list/**").permitAll()
                .antMatchers("/product/**").permitAll()
                .antMatchers("/auth/**").permitAll()
                .antMatchers("/user/**").permitAll()
                .antMatchers("/user/withdrawal").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN") // 회원 탈퇴
                .antMatchers("/mypage/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")
//                .anyRequest().authenticated()   // 나머지 API 는 전부 인증 필요
                .anyRequest().permitAll()   // 나머지 API 는 전부 인증 불필요

                // JwtFilter 를 addFilterBefore 로 등록했던 JwtSecurityConfig 클래스를 적용
                .and()
                .apply(new JwtSecurityConfig(tokenProvider));
    }


//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//                .cors().configurationSource(corsConfigurationSource())
//                .and()
//                .csrf().disable() // csrf 해제 Cross site Request forgery : 사이트간 위조 요청 방지
//                .authorizeRequests() // 요청에 의한 보안검사 시작
//                .anyRequest().permitAll() // 이 외의 주소는 다 허용한다
//                .and()
//                .formLogin() //폼 방식 로그인을 사용할 것임
//                .loginProcessingUrl("/user/signin") // 사용자 이름과 암호를 제출할 URL
//                .successHandler(successHandler())
//                .failureHandler(new MyLoginFailureHandler())
//                .permitAll();
//        return http.build();
//    }

    //    @Bean
//    public AuthenticationSuccessHandler successHandler() {
//        return new MyLoginSuccessHandler("/");
//    }
//
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
//
//
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration auth) throws Exception {
//
//        return auth.getAuthenticationManager();
////        return auth.authenticationManagerBuilder().inMemoryAuthentication()
////                .withUser()
//    }


}
