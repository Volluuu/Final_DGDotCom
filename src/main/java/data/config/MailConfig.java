package data.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {

    @Bean
    public JavaMailSender JavaMailService() {
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();

        javaMailSender.setHost("smtp.naver.com"); // 메인 도메인 서버 주소 (smtp 서버 ㅜㅈ소)
        javaMailSender.setUsername("bitcamp701"); // 네이버 아이디
        javaMailSender.setPassword("!bitcamp"); // 네이버 비밀번호

        javaMailSender.setPort(465); // 메일 인증 서버 포트

        javaMailSender.setJavaMailProperties(getMailProperties()); // 메일 인증서버 정보 가져오기
        return javaMailSender;
    }

    private Properties getMailProperties() {
        Properties properties = new Properties();
        properties.setProperty("mail.transport.protocol", "smtp"); // 프로토콜 설정
        properties.setProperty("mail.smtp.auth", "true"); // smtp 인증
        properties.setProperty("mail.smtp.starttls.enable", "true"); // smtp starttls 사용
        properties.setProperty("mail.debug", "true"); // 디버그 사용
        properties.setProperty("mail.smtp.ssl.trust", "smtp.naver.com"); // ssl 인증 서버는 smtp.naver.com
        properties.setProperty("mail.smtp.ssl.enable", "true"); // ssl 사용

        /*
         * 1. 프로토콜 : 복수의 컴퓨터 사이나 중앙 컴퓨터와 단말기 사이에서 데이터 통신을 원활하게 하기 위한 통신 규약
         * 2. SMTP(Simple Mail Transfer Protocol)
         *     : 이메일을 컴퓨터에서 다른 컴퓨터로 전송할 때 사용하는 메일 서버의 기본 프로토콜
         *       메일을 주고 받을 때 사용하는 프로토콜 ( 클라이언트 -> 서버, 서버 -> 서버 )
         * 3. POP3(Post Office Protocol version 3)
         *     : 메일 서버에 수신된 메일을 클라이언트로 가져올 때 사용 ( 클라이언트에만 메일 저장 )
         * 4. IMAP(Internet Mail Access Protocol)
         *     : POP3와 동일하게 수신된 메일을 클라이언트로 가져올 때 사용 ( 클라이언트, 서버에 메일 저장)
         * 5. 디버그(debug)
         *     : 컴퓨터 프로그램 개발 단계 중에 발생하는 시스템의 논리적인 오류나
         *       비정상적 연산(버그)을 찾아내고 그 원인을 밝히고 수정하는 작업 과정을 뜻함
         * 6. START TLS
         *     : 센드메일 서버에 적용할 SSL/TLS 기반의 SMTPS 기능, 메일 내용이 암호화되어 가로채서 확인하기 어려움
         * 7. SSL(Secure Sockets Layer) [보안 소켓 계층]
         *     : 디지털 인증서, 브라우저(사용자의 컴퓨터)와 서버(웹사이트) 사이의 암호화 된 연결을 수립하는데 사용
         *       웹사이트와 브라우저 사이(또는 두 서버 사이)에 전송되는 데이터를 암호화하여 연결을 보호하기위한 표준 기술
         *       해커가 개인 데이터나 금융 데이터 등의 전송되는 정보를 보거나 훔치는 것을 방지 함
         * 8. TLS(Transport Layer Security) [전송 계층 보안]
         *     : SSL의 향상된, 더욱 안전한 버전
         * */
        return properties;
    }
}
