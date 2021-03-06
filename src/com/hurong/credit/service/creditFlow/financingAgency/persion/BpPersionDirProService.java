package com.hurong.credit.service.creditFlow.financingAgency.persion;
/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import com.hurong.core.service.BaseService;
import com.hurong.credit.model.creditFlow.financingAgency.persion.BpPersionDirPro;

import java.util.List;

/**
 * 
 * @author 
 *
 */
public interface BpPersionDirProService extends BaseService<BpPersionDirPro>{
	/**
	 * 统计项目的发标情况  （发标金额 ，剩余金额，发标数量 ，发标占比）
	 * @param pack
	 * @return
	 */
	public BpPersionDirPro residueMoneyMeth(BpPersionDirPro pack);

    List<BpPersionDirPro> getInfo(Long pdirProId);
}


