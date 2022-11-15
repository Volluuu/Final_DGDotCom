package data.jwtsecurity.service;

import data.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import data.mapper.UserMapper;
import org.springframework.stereotype.Service;

import java.io.Console;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    //    private final MemberRepository memberRepository;
    @Autowired
    UserMapper userMapper;
//    @Autowired
//    PasswordEncoder passwordEncoder;

    //    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println(username);
        UserDto user = userMapper.getUserInfo(username);
        if (user == null) {
            System.out.println(username);
            throw new UsernameNotFoundException(username + "-> DB에서 찾을 수 없습니다.");

        } else {
            System.out.println("******************* Found user *******************");
//            System.out.println("id : " + users.getUsername());
            GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(user.getIsadmin().toString());
            System.out.println(grantedAuthority);
            System.out.println(new User(user.getEmail(), user.getEmail(), Collections.singleton(grantedAuthority)));
            return new User(user.getEmail(), user.getPass(), Collections.singleton(grantedAuthority));
//                    (
//                    userDto.getEmail(),
//                    userDto.getPass(),
//                    Collections.singleton(grantedAuthority));
        }
    }

//        return userMapper.getUserInfo(username)
//                .map(this::createUserDetails)
//                .orElseThrow(() -> new UsernameNotFoundException(username + " -> 데이터베이스에서 찾을 수 없습니다."));


//    // DB 에 User 값이 존재한다면 UserDetails 객체로 만들어서 리턴
//    private UserDetails createUserDetails(Member member) {
//        System.out.println(1);
//        System.out.println(member.getAuthority());
//        System.out.println(member.getEmail());
//        System.out.println(member.getPassword());
//        System.out.println(member.getId());
//        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(member.getAuthority().toString());
//
//        return new User(
//                String.valueOf(member.getId()),
//                member.getPassword(),
//                Collections.singleton(grantedAuthority)
//        );
//    }
}