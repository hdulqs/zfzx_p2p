package com.hurong.credit.service.creditFlow.bonusSystem.record;
/*
 *  北京互融时代软件有限公司   -- http://www.hurongtime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hurong.core.service.BaseService;
import com.hurong.credit.model.creditFlow.bonusSystem.record.WebBonusRecord;
import com.hurong.credit.model.creditFlow.bonusSystem.setting.WebBonusSetting;
import com.hurong.credit.model.p2p.BpPersonCenterData;
import com.hurong.credit.model.user.BpCustMember;

/**
 * 
 * @author 
 *
 */
public interface WebBonusRecordService extends BaseService<WebBonusRecord>{

	
	/**
	 * 通过积分规则计算出应该加多少分还是减多少分,区分每个用户
	 * 
	 * @param webBonusSetting   传入一个积分规则计算分值
	 * @return 返回分值，没有分值返回0
	 */
	public Long findBySetting(Long userId,WebBonusSetting webBonusSetting);
	
	/**
	 * 根据p2p用户ID查询所有的积分记录
	 * @param userId
	 * @param sort 排序
	 * 		  asc正序  desc倒序   默认倒序
	 * 		  
	 * @return 当前用户的所有积分记录
	 */
	public List<WebBonusRecord> listByUserId(Long userId,String sort);
	/**
	 * 查询所对应的积分
	 * @param userId
	 * @param recordDirector
	 * @return
	 */
	public int findRecordNumber(Long userId,String recordDirector);
	/**
	 * 根据活动编号查询
	 * @param activityNumber
	 * @param bpCustMemberId
	 * @param remark
	 * @return
	 */
	public List<WebBonusRecord> getActivityNumber(String activityNumber,String bpCustMemberId,String remark);

	/**
	 * 查询我的积分
	 * @return
	 */
	public String getMyIntegral(HttpServletRequest request,BpCustMember member);
	
	public String  queryMyIntegral(BpCustMember member);
	
	/**
	 * 生成json串的方法
	 * @param obj
	 * @param Num
	 * @return
	 */
	public String  CreateJson(Object obj,Integer Num);
}


