package data.config;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

public interface MailServiceInter {

    /* 회원가입, 비밀번호 변경에 필요한 이메일 발송 */
    public MimeMessage createMessage(String to) throws MessagingException, UnsupportedEncodingException;

    public String createKey();

    public String sendSimpleMessage(String to) throws Exception;

    /* 비밀번호 찾기에 필요한 이메일 발송 */
    public MimeMessage createPassMessage(String to) throws MessagingException, UnsupportedEncodingException;

    public String createPassKey();

    public String sendFindPassMessage(String to) throws Exception;


}
