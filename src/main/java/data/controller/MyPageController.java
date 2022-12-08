package data.controller;

import data.dto.*;
import data.mapper.MyPageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/mypage")
public class MyPageController {

    @Autowired
    MyPageMapper myPageMapper;

    @GetMapping("/userbyname")
    public UserDto userByName(@RequestParam String u_name) {
        return myPageMapper.userByName(u_name);
    }

    @GetMapping("/userbynum")
    public UserDto userByNum(@RequestParam int u_num) {
        return myPageMapper.userByNum(u_num);
    }

    @GetMapping("/mypageform")
    public Map<String, Object> mypageform(int u_num) {
        // userDto 반환
        UserDto user = myPageMapper.userByNum(u_num);

        // 사용자에 대한 주문내역 반환
        Map<String, Object> jmap = new HashMap<>();
        jmap.put("u_num", u_num);
        List<JoinDto> joined = myPageMapper.joinTradeProductByU_num(jmap);

        Map<String, Object> mypageformmap = new HashMap<>();
        mypageformmap.put("user", user); // userDto 반환
        mypageformmap.put("joined", joined); // 검색 데이터 상세 정보 리스트

        return mypageformmap;
    }

    @GetMapping("/order")
    public Map<String, Object> orderPagingList(@RequestParam(defaultValue = "1") int currentPage, int u_num,
                                               @RequestParam(required = false) String startDate,
                                               @RequestParam(required = false) String endDate) {
//        System.out.println("currentPage="+currentPage);
//        System.out.println("startDate=" + startDate);
//        System.out.println("endDate=" + endDate);
        int perPage = 10; // 한 페이지당 출력할 글 갯수
        int perBlock = 3; // 출력할 페이지 갯수

        //총 갯수
        int totalCount;
        Map<String, Object> tmap = new HashMap<>();
        tmap.put("u_num", u_num);
        if (startDate == "")
            startDate = myPageMapper.getMinDayByU_num(u_num);
        System.out.println(startDate);
        tmap.put("startDate", startDate);
        if (endDate == null) {
            Date now = new Date();
            String year = Integer.toString(now.getYear() + 1900);
            String month = Integer.toString(now.getMonth() + 1);
            String date = Integer.toString(now.getDate());

            endDate = year + "-" + (month.length() == 1 ? "0" + month : month) + "-" + (date.length() == 1 ? "0" + date : date) + " 23:59:59";
        } else {
            endDate = endDate + " 23:59:59";
        }
        tmap.put("endDate", endDate);
        // 검색 옵션 나중에 넣기
        totalCount = myPageMapper.tradeTotalCount(tmap);
        // 총 페이지 수
        int totalPage;
        totalPage = totalCount / perPage + (totalCount % perPage == 0 ? 0 : 1);

        // 출력할 시작페이지
        int startPage;
        startPage = (currentPage - 1) / perBlock * perBlock + 1;

        // 출력할 끝페이지
        int endPage;
        endPage = startPage + perBlock - 1;
        if (endPage > totalPage)
            endPage = totalPage;

        // db에서 가져올 시작번호
        int startNum;
        startNum = (currentPage - 1) * perPage;

        // 출력할 시작 번호
        int no;
        no = totalCount - (currentPage - 1) * perPage;

        //일반 페이징
        Map<String, Object> pmap = new HashMap<>();
        pmap.put("u_num", u_num);
        pmap.put("startNum", startNum);
        pmap.put("perPage", perPage);
        pmap.put("startDate", startDate);
        pmap.put("endDate", endDate);
        // 검색 옵션 나중에 넣기
        List<JoinDto> joinPaging = myPageMapper.joinTradeProductByU_num(pmap);

        //기간 검색 + 페이징
        if (startDate != null && endDate != null) {
            pmap.put("startDate", startDate);
            endDate = endDate.concat(" 23:59:59");
            pmap.put("endDate", endDate);
            joinPaging = myPageMapper.joinTradeProductByU_num(pmap);
        }

        List<ReviewDto> rlist = new ArrayList<>();
        for (int i = 0; i < joinPaging.size(); i++) {
            int p_num = joinPaging.get(i).getP_num();
            ReviewDto dto = new ReviewDto();
            dto.setP_num(p_num);
            dto.setU_num(u_num);
            rlist.add(myPageMapper.reviewDetail(dto));
        }

        Map<String, Object> jmap = new HashMap<>();
        jmap.put("u_num", u_num);
        jmap.put("startDate", startDate);
        jmap.put("endDate", endDate);
        List<JoinDto> joined = myPageMapper.joinTradeProductByU_num(jmap);

        //출력할 페이지번호들을 Vector에 담아서 보내기
        Vector<Integer> pidx = new Vector<>();
        for (int i = startPage; i <= endPage; i++) {
            pidx.add(i);
        }

        // 유저 이름도 반환
        UserDto userDto = myPageMapper.userByNum(u_num);
        String u_name = userDto.getU_name();

        //최초 거래 일자
        String minDate = myPageMapper.getMinDayByU_num(u_num);

        //리액트에서 필요한 변수들을 Map에 담아서 보낸다
        Map<String, Object> smap = new HashMap<>();
        smap.put("no", no); // 데이터 출력 번호
        smap.put("u_name", u_name); // userDto 반환
        smap.put("minDate", minDate); // 최초 거래 일자 반환
        smap.put("joined", joined); // 검색 데이터 상세 정보 리스트
        smap.put("joinPaging", joinPaging); // 검색 데이터 상세 정보 리스트 + 페이징
        smap.put("pidx", pidx); // 페이징 인덱스번호
        smap.put("rlist", rlist); // 리뷰 리스트
        smap.put("startPage", startPage); // 페이징 [이전]
        smap.put("endPage", endPage); // 페이징 [다음]
        smap.put("totalPage", totalPage); // 페이징 [다음]

        return smap;
    }

    @GetMapping("/reviewmodal")
    public ProductDto reviewModal(int p_num) {
        Map<String, Object> map = new HashMap<>();
        map.put("p_num", p_num);
        return myPageMapper.getProductByP_num(map);
    }

    @PostMapping("/reviewinsert")
    public void reviewInsert(@RequestBody ReviewDto dto) {
        // 리뷰 작성 이벤트
        myPageMapper.reviewInsert(dto);

        // 리뷰 작성 시 1,000P 지급 이벤트
        myPageMapper.awardPoint(dto.getU_num());
    }

    @GetMapping("/reviewdetail")
    public ReviewDto reviewDetail(int p_num, int u_num, int r_num) {
        ReviewDto dto = new ReviewDto();
        dto.setP_num(p_num);
        dto.setU_num(u_num);
        dto.setR_num(r_num);
        return myPageMapper.reviewDetail(dto);
    }

    @PutMapping("/reviewupdate")
    public void reviewUpdate(@RequestBody ReviewDto dto) {
//        System.out.println("r_num"+dto.getR_num());
//        System.out.println("content"+dto.getContent());
//        System.out.println("star"+dto.getStar());
        myPageMapper.reviewUpdate(dto);
    }

}
