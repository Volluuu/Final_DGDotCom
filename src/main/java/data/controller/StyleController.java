package data.controller;

import data.dto.StyleDto;
import data.mapper.MyStyleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/style")
public class StyleController {

	@Autowired
	MyStyleMapper mapper;

	@GetMapping("/list")
	public List<StyleDto> getAllStyle() {

		return mapper.getAllStyle();
	}
}
