package data.controller;

import data.dto.AdminDto;
import data.dto.JoinDto;
import data.dto.ProductDto;
import data.dto.UserDto;
import data.mapper.AdminMapper;
import data.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    AdminMapper adminMapper;
    /*------------------------- 유저 시작 ---------------------------*/

    //유저 리스트
    @GetMapping("/user")
    public List<UserDto> AdminGetAllUser()
    {
        return adminMapper.AdminGetAllUser();
    }

    //유저 페이징
    @GetMapping("/userpagelist")
    public Map<String,Object> AdminUserPaging(@RequestParam(defaultValue = "1") int currentPage) {
        System.out.println("currentPage="+currentPage);

        //페이징처리
        int utotalCount;//총갯수
        int perPage = 4;//한페이지당 출력할 글 갯수
        int perBlock = 3; //출력할 페이지 갯수
        int startNum; //db에서 가져올 시작번호
        int startPage;//출력할 시작페이지
        int endPage;//출력할 끝페이지
        int totalPage; //총 페이지수
        int no;//출력할 시작번호

        //총갯수
        utotalCount = adminMapper.TotalUser();
        //총 페이지수
        totalPage = utotalCount / perPage + (utotalCount % perPage == 0 ? 0 : 1);
        //시작페이지
        startPage = (currentPage - 1) / perBlock * perBlock + 1;
        //끝페이지
        endPage = startPage + perBlock - 1;
        if (endPage > totalPage)
            endPage = totalPage;

        //시작번호
        startNum = (currentPage - 1) * perPage;
        //각페이지당 출력할 번호
        no = utotalCount - (currentPage - 1) * perPage;
        //데이터 가져오기
        Map<String, Integer> map = new HashMap<>();
        map.put("startnum", startNum);
        map.put("perpage", perPage);

        List<UserDto> ulist = adminMapper.AdminUserPaging(map);

        //출력할 페이지번호들을 Vector에 담아서 보내기
        Vector<Integer> parr = new Vector<>();
        for (int i = startPage; i <= endPage; i++) {
            parr.add(i);
        }

        //리액트로 필요한 변수들을 Map에 담아서 보낸다
        Map<String, Object> smap = new HashMap<>();
        smap.put("utotalCount",utotalCount);
        smap.put("ulist",ulist);
        smap.put("parr",parr);
        smap.put("startPage",startPage);
        smap.put("endPage",endPage);
        smap.put("no",no);
        smap.put("totalPage",totalPage);

        return smap;

    }

    //삭제
    @DeleteMapping("/deleteuser")
    public void deleteUser(@RequestParam int u_num)
    {
        adminMapper.DeleteUser(u_num);
    }

    /*------------------------- 상품 시작 ---------------------------*/

    //상품 가져오기
    @GetMapping("/product")
    public List<ProductDto> TotalProduct()
    {
        return adminMapper.GetAllProduct();
    }
    //상품 리스트
    @GetMapping("/ProductPaging")
    public Map<String,Object> ProductPaging(@RequestParam(defaultValue = "1") int currentPage) {
        System.out.println("currentPage=" + currentPage);
        //페이징 처리
        int ptotalCount;//총갯수
        int perPage = 6;//한페이지당 출력할 글 갯수
        int perBlock = 10; //출력할 페이지 갯수
        int startNum; //db에서 가져올 시작번호
        int startPage;//출력할 시작페이지
        int endPage;//출력할 끝페이지
        int totalPage; //총 페이지수
        int no;//출력할 시작번호

        //총갯수
        ptotalCount = adminMapper.TotalProduct();
        //총 페이지수
        totalPage = ptotalCount / perPage + (ptotalCount % perPage == 0 ? 0 : 1);
        //시작페이지
        startPage = (currentPage - 1) / perBlock * perBlock + 1;

        //끝페이지
        endPage = startPage + perBlock - 1;
        if (endPage > totalPage)
            endPage = totalPage;

        //시작번호
        startNum = (currentPage - 1) * perPage;
        //각페이지당 출력할 번호
        no = ptotalCount - (currentPage - 1) * perPage;
        //데이터 가져오기
        Map<String, Integer> map = new HashMap<>();
        map.put("startnum", startNum);
        map.put("perpage", perPage);

        List<JoinDto> list = adminMapper.ProductPaging(map);

        //출력할 페이지번호들을 Vector에 담아서 보내기
        Vector<Integer> parr = new Vector<>();
        for (int i = startPage; i <= endPage; i++) {
            parr.add(i);
        }

        //리액트로 필요한 변수들을 Map에 담아서 보낸다
        Map<String, Object> smap = new HashMap<>();
        smap.put("ptotalCount",ptotalCount);
        smap.put("list",list);
        smap.put("parr",parr);
        smap.put("startPage",startPage);
        smap.put("endPage",endPage);
        smap.put("no",no);
        smap.put("totalPage",totalPage);

        return smap;
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






