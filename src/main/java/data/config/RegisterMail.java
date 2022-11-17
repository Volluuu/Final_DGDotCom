package data.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Random;

@Service
public class RegisterMail implements MailServiceInter {

    @Autowired
    JavaMailSender emailsender; // Bean 등록해둔 MailConfig를 emailsender 라는 이름으로 Autowired

    private String ePw; // 인증 번호

    private String password;

    @Override
    public MimeMessage createMessage(String to) throws MessagingException, UnsupportedEncodingException {
//        System.out.println("보내는 대상 : " + to);
//        System.out.println("인증 번호 : " + ePw);

        MimeMessage message = emailsender.createMimeMessage();

        message.addRecipients(Message.RecipientType.TO, to);
        message.setSubject("DG.COM 이메일 인증"); // 제목

        String cert = "";
        cert += "<div style='margin:100px;'>";
        cert += "<h2> 안녕하세요. DG.com 입니다.</h2>";
        cert += "<br>";
        cert += "<p>아래 코드를 창으로 돌아가 입력해주세요</p>";
        cert += "<br>";
        cert += "<p>항상 당신의 쇼핑을 응원합니다. 감사합니다!</p>";
        cert += "<br>";
        cert += "<div align='center' style='border:1px solid black; font-family:verdana;'>";
        cert += "<h3 style='color:blue;'>인증 코드입니다.</h3>";
        cert += "<div style='font-size:130%;'>";
        cert += "CODE : ";
        cert += "<strong>";
        cert += ePw; // 메일에 인증번호 넣기
        cert += "</strong>";
        cert += "<br><br></div></div>";
        message.setText(cert, "utf-8", "html"); // 내용 charset 타입, subtype
        //보내는 사람의 이메일 주소, 보내는 사람 이름
        message.setFrom(new InternetAddress("bitcamp701@naver.com", "이동건")); // 보내는 사람

        return message;
    }

    //랜덤 인증 코드 전송
    @Override
    public String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 4; i++) { // 인증코드 4자리
            int index = rnd.nextInt(3); // 0~2까지 랜덤, index 값에 따라 아래 switch문 실행

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    // a~z (ex. 1+97=98 => (char)98= 'b'
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    // A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    //0~9
                    break;
            }
        }
        return key.toString();
    }

    // 메일 발송
    // sendSimpleMessage 의 매개변수로 들어온 to는 곧 이메일 주소가 되고,
    // MimeMessage 객체 안에 내가 전송할 메일의 내용을 답는다.
    // 그리고 bean으로 등록해둔 javaMail 객체를 ㅏㅅ용해서 이메일 send
    @Override
    public String sendSimpleMessage(String to) throws Exception {
        ePw = createKey();

        MimeMessage message = createMessage(to); // 메일 발송
        try { // 예외 처리
            emailsender.send(message);
        } catch (MailException es) {
            es.printStackTrace();
            throw new IllegalArgumentException();
        }

        return ePw;
    }

    @Override
    public MimeMessage createPassMessage(String to) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = emailsender.createMimeMessage();

        message.addRecipients(Message.RecipientType.TO, to);
        message.setSubject("DG.COM 임시 비밀번호"); // 제목

        String repass = "";
        repass += "<div style='margin:100px;'>";
        repass += "<h2> 안녕하세요. DG.com 입니다.</h2>";
        repass += "<br>";
        repass += "<p>이전 비밀번호는 폐기되었습니다.</p>";
        repass += "<br>";
        repass += "<p>아래의 비밀번호로 로그인 후 비밀번호 변경을 해주세요.</p>";
        repass += "<br>";
        repass += "<div align='center' style='border:1px solid black; font-family:verdana;'>";
        repass += "<h3 style='color:blue;'>변경된 비밀번호 입니다.</h3>";
        repass += "<div style='font-size:130%;'>";
        repass += "비밀번호 : ";
        repass += "<strong>";
        repass += password;
        repass += "</strong>";
        repass += "<br><br></div></div>";
        message.setText(repass, "utf-8", "html"); // 내용 charset 타입, subtype
        //보내는 사람의 이메일 주소, 보내는 사람 이름
        message.setFrom(new InternetAddress("bitcamp701@naver.com", "이동건")); // 보내는 사람

        return message;
    }

    @Override
    public String createPassKey() {
        StringBuffer passKey = new StringBuffer();
        Random rnd = new Random();

        passKey.append((char) ((int) (rnd.nextInt(4) + 35))); // #, $, %, & 중 1개 1개
        passKey.append((char) ((int) (rnd.nextInt(26)) + 65)); // A~Z 1개
        for (int i = 0; i < 6; i++) { // 숫자 6자리
            passKey.append(rnd.nextInt(10)); // 0~9
        }

        return passKey.toString();
    }

    @Override
    public String sendFindPassMessage(String to) throws Exception {
        password = createPassKey();
        MimeMessage message = createPassMessage(to); // 메일 발송
        try { // 예외 처리
            emailsender.send(message);
        } catch (MailException es) {
            es.printStackTrace();
            throw new IllegalArgumentException();
        }

        return password;
    }

}
