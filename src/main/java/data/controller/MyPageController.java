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

    @GetMapping("/orderlist")
    public Map<String, Object> orderPagingList(@RequestParam(defaultValue = "1") int currentPage, int u_num,
                                               @RequestParam(required = false) String startDate,
                                               @RequestParam(required = false) String endDate) {
//        System.out.println("currentPage="+currentPage);
//        System.out.println("startDate="+startDate);
//        System.out.println("endDate="+endDate);
        int perPage = 10; // 한 페이지당 출력할 글 갯수
        int perBlock = 3; // 출력할 페이지 갯수

        //총 갯수
        int totalCount;
        Map<String, Object> tmap = new HashMap<>();
        tmap.put("u_num", u_num);
        if (startDate == null)
            startDate = myPageMapper.getMinDayByU_num(u_num);
        tmap.put("startDate", startDate);
        if (endDate == null){
            endDate = new Date().toLocaleString().substring(0,11).replaceAll(". ","-").concat(" 23:59:59");
        }
        tmap.put("endDate", endDate);
        // 검색 옵션 나중에 넣기
        totalCount = myPageMapper.tradeTotalCount(tmap);
        // 총 결제 금액
        int totalPrice = myPageMapper.tradeTotalPrice(tmap);
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
        pmap.put("startDate",startDate);
        pmap.put("endDate",endDate);
        // 검색 옵션 나중에 넣기
        List<JoinDto> joinPaging = myPageMapper.joinTradeProductByU_num(pmap);

        //기간 검색 + 페이징
        if (startDate != null && endDate != null) {
            pmap.put("startDate", startDate);
            endDate=endDate.concat(" 23:59:59");
            pmap.put("endDate", endDate);
            joinPaging = myPageMapper.joinTradeProductByU_num(pmap);
        }

        List<ReviewDto> rlist=new ArrayList<>();
        for(int i=0;i<joinPaging.size();i++){
            int p_num=joinPaging.get(i).getP_num();
            ReviewDto dto=new ReviewDto();
            dto.setP_num(p_num);
            dto.setU_num(u_num);
            rlist.add(myPageMapper.reviewDetail(dto));
        }
        //출력할 페이지번호들을 Vector에 담아서 보내기
        Vector<Integer> pidx = new Vector<>();
        for (int i = startPage; i <= endPage; i++) {
            pidx.add(i);
        }

        Map<String, Object> jmap = new HashMap<>();
        jmap.put("u_num", u_num);
        List<JoinDto> joined = myPageMapper.joinTradeProductByU_num(jmap);

        // 유저 이름도 반환
        UserDto userDto = myPageMapper.userByNum(u_num);

        // 배송 전, 중, 완료 갯수 구하기

        Map<String, Object> stmap1 = new HashMap<>(); // 배송 전
        Map<String, Object> stmap2 = new HashMap<>(); // 배송 중
        Map<String, Object> stmap3 = new HashMap<>(); // 배송 완료
        stmap1.put("u_num", u_num);
        stmap1.put("state", "배송 전");
        stmap2.put("u_num", u_num);
        stmap2.put("state", "배송 중");
        stmap3.put("u_num", u_num);
        stmap3.put("state", "배송 완료");

        Map<String, Integer> st1 = new HashMap<>();
        st1.put("st1", myPageMapper.tradeTotalCount(stmap1));
        Map<String, Integer> st2 = new HashMap<>();
        st2.put("st2", myPageMapper.tradeTotalCount(stmap2));
        Map<String, Integer> st3 = new HashMap<>();
        st3.put("st1", myPageMapper.tradeTotalCount(stmap1));

        List<Object> stateCount = new ArrayList<>();
        stateCount.add(myPageMapper.tradeTotalCount(stmap1));
        stateCount.add(myPageMapper.tradeTotalCount(stmap2));
        stateCount.add(myPageMapper.tradeTotalCount(stmap3));

        //최초 거래 일자
        String minDate = myPageMapper.getMinDayByU_num(u_num);

        //리액트에서 필요한 변수들을 Map에 담아서 보낸다
        Map<String, Object> smap = new HashMap<>();
        smap.put("user",userDto); // userDto 반환
        smap.put("minDate", minDate); // 최초 거래 일자 반환
        smap.put("totalPrice", totalPrice); // 총 결제 금액 반환
        smap.put("totalCount", totalCount); //데이터 총 갯수
        smap.put("stateCount", stateCount); //데이터 총 갯수
        smap.put("no", no); // 데이터 출력 번호
        smap.put("startPage", startPage); // 페이징 [이전]
        smap.put("endPage", endPage); // 페이징 [다음]
        smap.put("totalPage", totalPage); // 페이징 [다음]
//        smap.put("beforeShip",beforeShip); // 배송 전 갯수
//        smap.put("mapsize",tlist.size()); // 검색 데이터 갯수
//        smap.put("tlist",tlist); // 검색 데이터 리스트
//        smap.put("plist",plist); // 검색 데이터 상세 정보 리스트
        smap.put("joinPaging", joinPaging); // 검색 데이터 상세 정보 리스트 + 페이징
        smap.put("joined", joined); // 검색 데이터 상세 정보 리스트
        smap.put("pidx", pidx); // 페이징 인덱스번호
        smap.put("rlist", rlist); // 리뷰 리스트

        return smap;
    }

    @GetMapping("/reviewmodal")
    public ProductDto reviewModal(int p_num){
        Map<String, Object> map=new HashMap<>();
        map.put("p_num",p_num);
        return myPageMapper.getProductByP_num(map);
    }

    @PostMapping("/reviewinsert")
    public void reviewInsert(@RequestBody ReviewDto dto){
        // 리뷰 작성 이벤트
        myPageMapper.reviewInsert(dto);

        // 리뷰 작성 시 1,000P 지급 이벤트
        myPageMapper.awardPoint(dto.getU_num());
    }

    @GetMapping("/reviewdetail")
    public ReviewDto reviewDetail(int p_num, int u_num, int r_num){
        ReviewDto dto=new ReviewDto();
        dto.setP_num(p_num);
        dto.setU_num(u_num);
        dto.setR_num(r_num);
        return myPageMapper.reviewDetail(dto);
    }

    @PutMapping("/reviewupdate")
    public void reviewUpdate(@RequestBody ReviewDto dto){
//        System.out.println("r_num"+dto.getR_num());
//        System.out.println("content"+dto.getContent());
//        System.out.println("star"+dto.getStar());
        myPageMapper.reviewUpdate(dto);
    }

}
