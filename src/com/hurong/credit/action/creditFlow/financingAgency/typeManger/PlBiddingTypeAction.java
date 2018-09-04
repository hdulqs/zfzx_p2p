package com.hurong.credit.action.creditFlow.financingAgency.typeManger;
/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.hurong.core.util.BeanUtil;

import com.hurong.core.command.QueryFilter;
import com.hurong.core.web.action.BaseAction;


import com.hurong.credit.model.creditFlow.financingAgency.typeManger.PlBiddingType;
import com.hurong.credit.service.creditFlow.financingAgency.typeManger.PlBiddingTypeService;
/**
 * 
 * @author 
 *
 */
public class PlBiddingTypeAction extends BaseAction{
	@Resource
	private PlBiddingTypeService plBiddingTypeService;
	private PlBiddingType plBiddingType;
	
	private Long biddingTypeId;

	public Long getBiddingTypeId() {
		return biddingTypeId;
	}

	public void setBiddingTypeId(Long biddingTypeId) {
		this.biddingTypeId = biddingTypeId;
	}

	public PlBiddingType getPlBiddingType() {
		return plBiddingType;
	}

	public void setPlBiddingType(PlBiddingType plBiddingType) {
		this.plBiddingType = plBiddingType;
	}
	/**
	 * 字典项
	 */
	   public String loadItem(){
		   
		   QueryFilter filter=new QueryFilter(getRequest());
		   List<PlBiddingType> list= plBiddingTypeService.getAll(filter);
			   StringBuffer buff = new StringBuffer("[");
				for (PlBiddingType dic : list) {
					buff.append("[").append(dic.getBiddingTypeId()).append(",'")
							.append(dic.getName()).append("'],");

				}
				if (list.size() > 0) {
					buff.deleteCharAt(buff.length() - 1);
				}
				buff.append("]");
				setJsonString(buff.toString());
		   
		   return SUCCESS;
	   }

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<PlBiddingType> list= plBiddingTypeService.getAll(filter);
		
		Type type=new TypeToken<List<PlBiddingType>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				plBiddingTypeService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		PlBiddingType plBiddingType=plBiddingTypeService.get(biddingTypeId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(plBiddingType));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(plBiddingType.getBiddingTypeId()==null){
			plBiddingTypeService.save(plBiddingType);
		}else{
			PlBiddingType orgPlBiddingType=plBiddingTypeService.get(plBiddingType.getBiddingTypeId());
			try{
				BeanUtil.copyNotNullProperties(orgPlBiddingType, plBiddingType);
				plBiddingTypeService.save(orgPlBiddingType);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
