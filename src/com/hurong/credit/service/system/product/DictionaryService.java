package com.hurong.credit.service.system.product;
/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/


import java.util.List;

import com.hurong.core.service.BaseService;
import com.hurong.credit.model.system.product.Dictionary;

/**
 * 
 * @author 
 *
 */
public interface DictionaryService extends BaseService<Dictionary>{
	public List<Dictionary> getByProTypeId(long proTypeId);
	public List<Dictionary> getByProTypeId2(long proTypeId,String status);
	public String getQueryDicId(long dicId);
}

