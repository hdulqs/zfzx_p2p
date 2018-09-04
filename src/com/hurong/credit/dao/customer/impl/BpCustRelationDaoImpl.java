package com.hurong.credit.dao.customer.impl;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import com.hurong.core.dao.impl.BaseDaoImpl;
import com.hurong.credit.dao.customer.BpCustRelationDao;
import com.hurong.credit.model.customer.BpCustRelation;

/**
 * 
 * @author 
 *
 */
@SuppressWarnings("unchecked")
public class BpCustRelationDaoImpl extends BaseDaoImpl<BpCustRelation> implements BpCustRelationDao{

	public BpCustRelationDaoImpl() {
		super(BpCustRelation.class);
	}

	@Override
	public BpCustRelation getByLoanTypeAndId(String loanUserType,
			Long loanUserId) {
		String hql  = "from BpCustRelation bp where bp.offlineCustType= ? and bp.offlineCusId=? ";
		
		return (BpCustRelation) findUnique(hql, new Object[]{loanUserType,loanUserId});
	}

	@Override
	public BpCustRelation getP2pCustById(Long custId) {
		String hql  = "from BpCustRelation bp where  bp.p2pCustId=? ";
		
		return (BpCustRelation) findUnique(hql, new Object[]{custId});
	}

	@Override
	public BpCustRelation getP2pCustLoanById(Long custId) {
		String hql  = "from BpCustRelation bp where  bp.p2pCustId=? and bp.offlineCustType='p_loan' ";
		
		return (BpCustRelation) findUnique(hql, new Object[]{custId});
	}

	@Override
	public BpCustRelation getCustRelation(Long offlineCusId) {
		String hql  = "from BpCustRelation as cust where cust.offlineCusId=? ";
		
		return (BpCustRelation) findUnique(hql, new Object[]{offlineCusId});
	}

	@Override
	public BpCustRelation getRelation(Long offlineCusId) {
		String hql  = "from BpCustRelation bp where  bp.offlineCusId=? and bp.offlineCustType='p_loan' ";
		return (BpCustRelation) findUnique(hql, new Object[]{offlineCusId});
	}

	@Override
	public BpCustRelation getCustOffine(Long custId, String custType) {
		String hql  = "from BpCustRelation bp where  bp.p2pCustId=? and bp.offlineCustType=? ";
		return (BpCustRelation) findUnique(hql, new Object[]{custId,custType});	
	}

	@Override
	public List<BpCustRelation> getP2pCustListById(Long custId) {
		// TODO Auto-generated method stub
		String hql  = "select * from bp_cust_relation bp where  bp.p2pCustId=?";
		return this.getSession().createSQLQuery(hql).addEntity(BpCustRelation.class).setParameter(0, custId).list();
	}
	

}