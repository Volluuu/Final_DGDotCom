package data.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class MyLoginFailureHandler implements AuthenticationFailureHandler {


    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {
        System.out.println("실패");
        exception.printStackTrace();
        writePrintErrorResponse(response, exception);

    }

    private void writePrintErrorResponse(HttpServletResponse response, AuthenticationException exception) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> responseMap = new HashMap<>();
            String msg = getExceptionMessage(exception);
            responseMap.put("status", 401);
            responseMap.put("msg", msg);
            response.getOutputStream().print(objectMapper.writeValueAsString(responseMap));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private String getExceptionMessage(AuthenticationException exception) {
        if (exception instanceof BadCredentialsException) {
            return "비밀번호 불일치";
        } else if (exception instanceof UsernameNotFoundException) {
            return "아이디 없음";
        } else if (exception instanceof AccountExpiredException) {
            return "게정 만료";
        } else if (exception instanceof CredentialsExpiredException) {
            return "비밀번호 만료";
        } else if (exception instanceof DisabledException) {
            return "계정 비활성화";
        } else if (exception instanceof LockedException) {
            return "계정 잠김";
        } else {
            return "확인된 에러가 없습니다.";
        }
    }
}
