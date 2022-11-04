package data.config;

import data.dto.UserDto;
import data.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class LoginIdPwValidator implements UserDetailsService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserDto user=userMapper.getUserInfo(email);

        if(user==null){
            return null;
        }

        String pw=user.getPass();
        String roles=user.getIsadmin(); // ADMIN

        return User.builder()
                .username(email)//아이디
                .password(pw)
                .roles(roles)
                .build();
    }
}
