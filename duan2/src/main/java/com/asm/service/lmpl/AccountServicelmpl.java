package com.asm.service.lmpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asm.dao.AccountDAO;
import com.asm.entity.Account;
import com.asm.service.AccountService;

@Service
public class AccountServicelmpl implements AccountService{

	@Autowired
	AccountDAO adao;
	
	@Override
	public Account findById(String username) {
		return adao.findById(username).get();
	}

}
