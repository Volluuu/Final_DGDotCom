package data.controller;

import data.dto.ProductDto;
import data.mapper.ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

@RestController
@CrossOrigin
@RequestMapping("/product")
public class ProductController {

    @Autowired
    ProductMapper productMapper;

//    페이징처리 리스트 출력

    @GetMapping("/list")
    public Map<String, Object> getProductList(
            @RequestParam(defaultValue = "1") int currentPage,
            @RequestParam(required = false) String[] categories,
            @RequestParam(required = false) String[] brands,
            @RequestParam(required = false) String[] genders,
            @RequestParam(required = false) String[] sizes,
            @RequestParam (required = false) String[] prices,
            @RequestParam(required = false) String priceOrderBy,
            @RequestParam(defaultValue = "") String keyword
    ) {
//        System.out.println("ProCP:"+curr@RequestParam (required = false) String[] prices,entPage);

        //페이징처리
        int totalCount = productMapper.getTotalCount();

//        System.out.println("tot:"+totalCount);
        int perPage = 16;//한 페이지당 보여질 글의 갯수
        int perBlock = 5;//한 블럭당 보여질 페이지의 갯수
        int startNum;//db에서 가져올 글의 시작번호(mysql은 첫글이 0번,오라클은 1번)
        int startPage;//각블럭당 보여질 시작페이지
        int endPage;//각 블럭당 보여질 끝페이지
        int totalPage;//총 페이지수
        int no;//각 페이지당 출력할 시작번호

        //총 페이지수를 구한다
        //총글의갯수/한페이지당보여질갯수로 나눔(7/5=1)
        //나머지가 1이라도 있으면 무조건 1페이지 추가(1+1=2페이지가 필요)
        totalPage = totalCount / perPage + (totalCount % perPage == 0 ? 0 : 1);

        //각 블럭당 보여질 시작페이지
        //perBlock=5 일경우 현재페이지가 1~5 일경우는 시작페이지가 1, 끝페이지가 5
        //만약 현재페이지가 13 일경우는 시작페이지가 11, 끝페이지가 15
        startPage = (currentPage - 1) / perBlock * perBlock + 1;
        endPage = startPage + perBlock - 1;
        //총페이지수가 23개일경우 마지막 블럭은 끝페이지가 25가 아니라 23이라야한다
        if (endPage > totalPage)
            endPage = totalPage;

        //각 페이지에서 보여질 시작번호
        //예: 1페이지->0, 2페이지:5, 3페이지 : 10...
        startNum = (currentPage - 1) * perPage;

        //각페이지당 출력할 시작번호 구하기
        //예: 총글갯수가 23이라면  1페이지는 23,2페이지는 18,3페이지는 13...
        no = totalCount - (currentPage - 1) * perPage;

        //페이지에서 보여질 글만 가져오기
        Map<String, Object> map = new HashMap<>();
        map.put("startNum", startNum);
        map.put("perPage", perPage);
        map.put("categories", categories);
        map.put("brands", brands);
        map.put("genders", genders);
        map.put("priceOrderBy", priceOrderBy);
        map.put("sizes", sizes);
        map.put("prices", prices);
        map.put("keyword", keyword);

        List<ProductDto> list = productMapper.getProductList(map);

        //풀력할 페이지 번호들 vector로 담아서 보내기
        //리액트에서 출력할때 parr로 출력하면됨
        Vector<Integer> parr = new Vector<>();
        for (int i = startPage; i <= endPage; i++) {
            parr.add(i);
        }

        //리액트로 필요한 변수들을 Map에 담아서 보낸가
        Map<String, Object> smap = new HashMap<>();
        smap.put("list", list);
        smap.put("totalCount", totalCount);
        smap.put("parr", parr);
        smap.put("startPage", startPage);
        smap.put("endPage", endPage);
        smap.put("no", no);
        smap.put("totalPage", totalPage); //다음페이지 생성 여부 확인

        return smap;
    }

    @GetMapping("/detail")
    public ProductDto getProductDetail(@RequestParam int p_num) {
//        System.out.println("p_num:"+p_num);

        return productMapper.getProduct(p_num);
    }
}