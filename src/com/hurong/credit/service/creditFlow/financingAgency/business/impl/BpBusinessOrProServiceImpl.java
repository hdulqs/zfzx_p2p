package com.hurong.credit.service.creditFlow.financingAgency.business.impl;
/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.math.BigDecimal;
import java.util.Iterator;

import com.hurong.core.service.impl.BaseServiceImpl;
import com.hurong.credit.dao.creditFlow.financingAgency.business.BpBusinessOrProDao;
import com.hurong.credit.model.creditFlow.financingAgency.PlBidPlan;
import com.hurong.credit.model.creditFlow.financingAgency.business.BpBusinessOrPro;
import com.hurong.credit.model.creditFlow.financingAgency.business.BpBusinessOrPro;
import com.hurong.credit.service.creditFlow.financingAgency.business.BpBusinessOrProService;

/**
 * 
 * @author 
 *
 */
public class BpBusinessOrProServiceImpl extends BaseServiceImpl<BpBusinessOrPro> implements BpBusinessOrProService{
	@SuppressWarnings("unused")
	private BpBusinessOrProDao dao;
	
	public BpBusinessOrProServiceImpl(BpBusinessOrProDao dao) {
		super(dao);
		this.dao=dao;
	}
	@Override
	public BpBusinessOrPro residueMoneyMeth(BpBusinessOrPro pack) {

		//已发布债权金额合计
		BigDecimal publishOrMoney=new BigDecimal(0);
		//已发布金额/总金额
		double rate=0;
		//发布笔数
		int num=0;
		Iterator<PlBidPlan> it =pack.getPlBidPlans().iterator();
		while (it.hasNext()) {
			PlBidPlan releaseProj=(PlBidPlan)it.next();
			publishOrMoney=publishOrMoney.add(releaseProj.getBidMoney());
			num++;
		}
		 rate=publishOrMoney.divide(pack.getBidMoney(),3,BigDecimal.ROUND_HALF_EVEN).multiply(new BigDecimal(100)).doubleValue(); //乘以100 算出 是 % 之多少
		 pack.setPublishOrMoney(publishOrMoney);
		 pack.setPublishOrNum(num);
		 pack.setRate(rate);
		 pack.setResidueMoney(pack.getBidMoney().subtract(publishOrMoney));
		return pack;
	
	}
}