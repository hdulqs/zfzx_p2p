package com.hurong.credit.service.creditFlow.customer.person.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.hurongtime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import com.hurong.core.service.impl.BaseServiceImpl;
import com.hurong.credit.dao.creditFlow.customer.person.BpCustPersonWorkExperienceDao;
import com.hurong.credit.model.creditFlow.customer.person.BpCustPersonWorkExperience;
import com.hurong.credit.service.creditFlow.customer.person.BpCustPersonWorkExperienceService;

/**
 * 
 * @author 
 *
 */
public class BpCustPersonWorkExperienceServiceImpl extends BaseServiceImpl<BpCustPersonWorkExperience> implements BpCustPersonWorkExperienceService{
	@SuppressWarnings("unused")
	private BpCustPersonWorkExperienceDao dao;
	
	public BpCustPersonWorkExperienceServiceImpl(BpCustPersonWorkExperienceDao dao) {
		super(dao);
		this.dao=dao;
	}

}