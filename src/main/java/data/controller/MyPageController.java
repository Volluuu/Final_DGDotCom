package data.controller;

import data.dto.TradeDto;
import data.dto.UserDto;
import data.mapper.MyPageMapper;
import data.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

@RestController
@CrossOrigin
@RequestMapping("/mypage")
public class MyPageController {

    @Autowired
    MyPageMapper myPageMapper;

    @GetMapping("/userbyname")
    public UserDto userByName(@RequestParam String u_name){
        return myPageMapper.userByName(u_name);
    }

    @GetMapping("/userbynum")
    public UserDto userByNum(@RequestParam int u_num){
        return myPageMapper.userByNum(u_num);
    }

    @GetMapping("/orderlist")
    public Map<String, Object> orderPagingList(@RequestParam(defaultValue = "1") int currentPage, int u_num){
        System.out.println("currentPage="+currentPage);
        int perPage=4; // 한 페이지당 출력할 글 갯수
        int perBlock=2; // 출력할 페이지 갯수

        //총 갯수
        int totalCount;
        Map<String, Object> tmap=new HashMap<>();
        tmap.put("u_num",u_num);
        
        // 검색 옵션 나중에 넣기
        totalCount= myPageMapper.tradeTotalCount(tmap);
        // 배송 전 갯수
        tmap.put("state","배송 전");
        int beforeShip= myPageMapper.tradeTotalCount(tmap);
        // 총 결제 금액
        int totalPrice= myPageMapper.tradeTotalPrice(tmap);
        // 총 페이지 수
        int totalPage;
        totalPage=totalCount/perPage+(totalCount%perPage==0?0:1);

        // 출력할 시작페이지
        int startPage;
        startPage=(currentPage-1)/perBlock*perBlock+1;

        // 출력할 끝페이지
        int endPage;
        endPage=startPage+perBlock-1;
        if(endPage>totalPage)
            endPage=totalPage;

        // db에서 가져올 시작번호
        int startNum;
        startNum=(currentPage-1)*perPage;

        // 출력할 시작 번호
        int no;
        no=totalCount-(currentPage-1)*perPage;

        //데이터 가져오기
        Map<String, Object> pmap=new HashMap<>();
        pmap.put("u_num",u_num);
        pmap.put("startNum",startNum);
        pmap.put("perPage",perPage);
        // 검색 옵션 나중에 넣기
        List<TradeDto> tlist=myPageMapper.tradePagingByU_num(pmap);

        //출력할 페이지번호들을 Vector에 담아서 보내기
        Vector<Integer> pidx=new Vector<>();
        for(int i=startPage;i<=endPage;i++){
            pidx.add(i);
        }

        //이름도 반환
        UserDto dto= myPageMapper.userByNum(u_num);
        String u_name=dto.getU_name();
        
        
        
        //리액트에서 필요한 변수들을 Map에 담아서 보낸다
        Map<String, Object> smap=new HashMap<>();
        smap.put("u_name",u_name); // 이름도 같이 반환
        smap.put("totalPrice",totalPrice); // 이름도 같이 반환
        smap.put("totalCount",totalCount); //데이터 총 갯수
        smap.put("no",no); // 데이터 출력 번호
        smap.put("startPage",startPage); // 페이징 [이전]
        smap.put("endPage",endPage); // 페이징 [다음]
        smap.put("totalPage",totalPage); // 페이징 [다음]
        smap.put("beforeShip",beforeShip); // 배송 전 갯수
        smap.put("tlist",tlist); // 데이터 출력
        smap.put("pidx",pidx); // 페이징 인덱스번호

        return smap;
    }

}
