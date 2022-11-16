package data.controller;

import data.dto.TradeDto;
import data.mapper.CartMapper;
import data.mapper.TradeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/trade")
public class TradeController {

    @Autowired
    TradeMapper tradeMapper;

    @Autowired
    CartMapper cartMapper;

    @PostMapping("/insert")
    public void insertCart(@RequestBody TradeDto dto)
    {
       tradeMapper.insertOrder(dto);

    }
}
