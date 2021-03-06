package com.hurong.credit.service.creditFlow.financingAgency.business;
/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/

import com.hurong.core.service.BaseService;
import com.hurong.credit.model.creditFlow.financingAgency.business.BpBusinessDirPro;

import java.util.List;

/**
 * 
 * @author 
 *
 */
public interface BpBusinessDirProService extends BaseService<BpBusinessDirPro>{
	/**
	 * 统计项目的发标情况  （发标金额 ，剩余金额，发标数量 ，发标占比）
	 * @param pack
	 * @return
	 */
	public BpBusinessDirPro residueMoneyMeth(BpBusinessDirPro pack);

	public List<BpBusinessDirPro> getBusinessId(Long BdirProId);

}


