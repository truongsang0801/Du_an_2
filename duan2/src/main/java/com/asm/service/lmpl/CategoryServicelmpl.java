package com.asm.service.lmpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asm.dao.CategoryDAO;
import com.asm.entity.Category;
import com.asm.service.CategoryService;

@Service
public class CategoryServicelmpl implements CategoryService{

	@Autowired
	CategoryDAO cdao;
	
	@Override
	public List<Category> findAll() {
		return cdao.findAll();
	}

}
