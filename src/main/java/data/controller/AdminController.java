package data.controller;

import data.dto.AdminDto;
import data.dto.UserDto;
import data.mapper.AdminMapper;
import data.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    AdminMapper adminMapper;
    /*------------------------- 유저 시작 ---------------------------*/

    @GetMapping("/userList")
    public List<UserDto> AdminGetAllUser()
    {
        return adminMapper.AdminGetAllUser();
    }


    /*------------------------- 배너 시작 ---------------------------*/

    //사진 업로드시 저장할 파일명
    String uploadFileName;

    //배너 사진 업로드
    @PostMapping("/bannerUpload")
    public String bannerUpload(@RequestParam MultipartFile uploadFile, HttpServletRequest request) {
        System.out.println("Banner upload");

        //업로드할 폴더 지정
        String path = request.getSession().getServletContext().getRealPath("/bannerImage");

        //기존 업로드 파일이 있을 경우 삭제 후 다시 업로드
        if (uploadFileName != null) {
            FileUtil.deletePhoto(path, uploadFileName);
        }

        //이전 업로드한 사진을 지운 후 현재 사진 업로드 하기
        uploadFileName = FileUtil.getChangeFileName(uploadFile.getOriginalFilename());
        try {
            uploadFile.transferTo(new File(path + "/" + uploadFileName));
            System.out.println("업로드 성공");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return uploadFileName;
    }

    @GetMapping("/bannerList")
    public List<AdminDto> getBannerList()
    {
        return adminMapper.getBannerList();
    }

    @PostMapping("/insertBanner")
    public void InsertBanner(@RequestBody AdminDto adto) {
        //업로드한 파일이름 넣기
        adto.setB_photo(uploadFileName);
        adminMapper.InsertBanner(adto);
        uploadFileName = null;
    }

    @GetMapping("/updateBanner")
    public void UpdateBanner(@RequestParam AdminDto adto)
    {
        adto.setB_photo(uploadFileName);
        adminMapper.UpdateBanner(adto);
        uploadFileName = null;
    }

    @DeleteMapping("/deleteBanner")
    public void DeleteBanner(@RequestParam int b_num,HttpServletRequest request)
    {
        String path = request.getSession().getServletContext().getRealPath("/bannerImage");

        //삭제할 기존 파일명
        String oldFileName = adminMapper.getBannerData(b_num).getB_photo();
        FileUtil.deletePhoto(path, oldFileName);//사진 사젝

        adminMapper.DeleteBanner(b_num);
    }
         /*------------------------- 배너 끝 ---------------------------*/


}
