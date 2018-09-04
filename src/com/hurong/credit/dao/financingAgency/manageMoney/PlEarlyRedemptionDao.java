package com.hurong.credit.dao.financingAgency.manageMoney;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import com.hurong.core.dao.BaseDao;
import com.hurong.credit.model.financingAgency.manageMoney.PlEarlyRedemption;


/**
 * 
 * @author 
 *
 */
public interface PlEarlyRedemptionDao extends BaseDao<PlEarlyRedemption>{
	public List<PlEarlyRedemption> listByOrderId(Long orderId);
	public PlEarlyRedemption getByRequestNo(String getByRequestNo);
}