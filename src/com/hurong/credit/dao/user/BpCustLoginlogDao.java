package com.hurong.credit.dao.user;
/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import com.hurong.core.dao.BaseDao;
import com.hurong.credit.model.user.BpCustLoginlog;

/**
 * 
 * @author 
 *
 */
public interface BpCustLoginlogDao extends BaseDao<BpCustLoginlog>{

	List<BpCustLoginlog> listByMemberId(Long id);
	
}