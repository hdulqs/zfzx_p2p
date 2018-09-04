package com.hurong.credit.service.creditFlow.customer.person.impl;

import java.util.List;

import com.hurong.core.service.impl.BaseServiceImpl;
import com.hurong.core.web.paging.PagingBean;
import com.hurong.credit.dao.creditFlow.customer.person.PersonRelationDao;
import com.hurong.credit.model.creditFlow.customer.person.PersonRelation;
import com.hurong.credit.service.creditFlow.customer.person.PersonRelationService;

public class PersonRelationServiceImpl extends BaseServiceImpl<PersonRelation> implements PersonRelationService{
	@SuppressWarnings("unused")
	private PersonRelationDao dao;
	
	public PersonRelationServiceImpl(PersonRelationDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public PersonRelation getById(Integer id) {
		
		return dao.getById(id);
	}

	@Override
	public List<PersonRelation> getListByPersonId(Integer personId,
			PagingBean pb) {
		
		return dao.getListByPersonId(personId, pb);
	}

	@Override
	public List<PersonRelation> getByIdAndType(int personId, String personType) {
		return dao.getByIdAndType(personId,personType);
	}
}