package com.hurong.credit.model.p2p;
/*
 *  北京互融时代软件有限公司   -- http://www.hurongtime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

/**
 * 
 * @author 
 *
 */
/**
 * BpFinanceApply Base Java Bean, base class for the.credit.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * TODO: add class/table comments
 */
public class BpFinanceApply extends com.hurong.core.model.BaseModel {

    protected Long loanId;
	protected Long productId;
	protected String linkPersion;
	protected String phone;
	protected java.math.BigDecimal loanMoney;
	protected Short isOnline;
	protected String loanTimeLen;
	protected String area;
	protected String remark;
	protected java.util.Date createTime;
	protected String productName;
	protected String businessName;
	protected String type;
	protected String flowNode;
	protected String currnodeid;
	protected String finishState;
	
	protected Long backNowMonthing;//回款中本月笔数
	protected Long backNowTotleing;//回款中总共的笔数
	protected Long backNowMonth;//已回款本月笔数
	protected Long backNowTotle;//已回款总共的笔数
	
	public Long getBackNowMonthing() {
		return backNowMonthing;
	}

	public void setBackNowMonthing(Long backNowMonthing) {
		this.backNowMonthing = backNowMonthing;
	}
	public Long getBackNowTotleing() {
		return backNowTotleing;
	}

	public void setBackNowTotleing(Long backNowTotleing) {
		this.backNowTotleing = backNowTotleing;
	}

	public Long getBackNowMonth() {
		return backNowMonth;
	}

	public void setBackNowMonth(Long backNowMonth) {
		this.backNowMonth = backNowMonth;
	}

	public Long getBackNowTotle() {
		return backNowTotle;
	}

	public void setBackNowTotle(Long backNowTotle) {
		this.backNowTotle = backNowTotle;
	}

	public String getFinishState() {
		return finishState;
	}

	public void setFinishState(String finishState) {
		this.finishState = finishState;
	}

	public String getCurrnodeid() {
		return currnodeid;
	}

	public void setCurrnodeid(String currnodeid) {
		this.currnodeid = currnodeid;
	}

	public String getFlowNode() {
		return flowNode;
	}

	public void setFlowNode(String flowNode) {
		this.flowNode = flowNode;
	}

	public String getBusinessName() {
		return businessName;
	}

	public void setBusinessName(String businessName) {
		this.businessName = businessName;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	protected Short state;


	/**
	 * Default Empty Constructor for class BpFinanceApply
	 */
	public BpFinanceApply () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class BpFinanceApply
	 */
	public BpFinanceApply (
		 Long in_loanId
        ) {
		this.setLoanId(in_loanId);
    }

    

	/**
	 * 我要融资id	 * @return Long
     * @hibernate.id column="loanId" type="java.lang.Long" generator-class="native"
	 */
	public Long getLoanId() {
		return this.loanId;
	}
	
	/**
	 * Set the loanId
	 */	
	public void setLoanId(Long aValue) {
		this.loanId = aValue;
	}	

	/**
	 * 产品id	 * @return Long
	 * @hibernate.property column="productId" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getProductId() {
		return this.productId;
	}
	
	/**
	 * Set the productId
	 */	
	public void setProductId(Long aValue) {
		this.productId = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="linkPersion" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getLinkPersion() {
		return this.linkPersion;
	}
	
	/**
	 * Set the linkPersion
	 */	
	public void setLinkPersion(String aValue) {
		this.linkPersion = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="phone" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getPhone() {
		return this.phone;
	}
	
	/**
	 * Set the phone
	 */	
	public void setPhone(String aValue) {
		this.phone = aValue;
	}	

	/**
	 * 融资金额	 * @return java.math.BigDecimal
	 * @hibernate.property column="loanMoney" type="java.math.BigDecimal" length="10" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getLoanMoney() {
		return this.loanMoney;
	}
	
	/**
	 * Set the loanMoney
	 */	
	public void setLoanMoney(java.math.BigDecimal aValue) {
		this.loanMoney = aValue;
	}	

	/**
	 * 是否是线上客户 0 否 1是	 * @return Short
	 * @hibernate.property column="isOnline" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getIsOnline() {
		return this.isOnline;
	}
	
	/**
	 * Set the isOnline
	 */	
	public void setIsOnline(Short aValue) {
		this.isOnline = aValue;
	}	

	/**
	 * 融资期限	 * @return String
	 * @hibernate.property column="loanTimeLen" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getLoanTimeLen() {
		return this.loanTimeLen;
	}
	
	/**
	 * Set the loanTimeLen
	 */	
	public void setLoanTimeLen(String aValue) {
		this.loanTimeLen = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="area" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getArea() {
		return this.area;
	}
	
	/**
	 * Set the area
	 */	
	public void setArea(String aValue) {
		this.area = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="remark" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getRemark() {
		return this.remark;
	}
	
	/**
	 * Set the remark
	 */	
	public void setRemark(String aValue) {
		this.remark = aValue;
	}	

	/**
	 * 	 * @return java.util.Date
	 * @hibernate.property column="createTime" type="java.util.Date" length="19" not-null="false" unique="false"
	 */
	public java.util.Date getCreateTime() {
		return this.createTime;
	}
	
	/**
	 * Set the createTime
	 */	
	public void setCreateTime(java.util.Date aValue) {
		this.createTime = aValue;
	}	

	/**
	 * 状态 0 新提交 1 已经审核	 * @return Short
	 * @hibernate.property column="state" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getState() {
		return this.state;
	}
	
	/**
	 * Set the state
	 */	
	public void setState(Short aValue) {
		this.state = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof BpFinanceApply)) {
			return false;
		}
		BpFinanceApply rhs = (BpFinanceApply) object;
		return new EqualsBuilder()
				.append(this.loanId, rhs.loanId)
				.append(this.productId, rhs.productId)
				.append(this.linkPersion, rhs.linkPersion)
				.append(this.phone, rhs.phone)
				.append(this.loanMoney, rhs.loanMoney)
				.append(this.isOnline, rhs.isOnline)
				.append(this.loanTimeLen, rhs.loanTimeLen)
				.append(this.area, rhs.area)
				.append(this.remark, rhs.remark)
				.append(this.createTime, rhs.createTime)
				.append(this.state, rhs.state)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.loanId) 
				.append(this.productId) 
				.append(this.linkPersion) 
				.append(this.phone) 
				.append(this.loanMoney) 
				.append(this.isOnline) 
				.append(this.loanTimeLen) 
				.append(this.area) 
				.append(this.remark) 
				.append(this.createTime) 
				.append(this.state) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("loanId", this.loanId) 
				.append("productId", this.productId) 
				.append("linkPersion", this.linkPersion) 
				.append("phone", this.phone) 
				.append("loanMoney", this.loanMoney) 
				.append("isOnline", this.isOnline) 
				.append("loanTimeLen", this.loanTimeLen) 
				.append("area", this.area) 
				.append("remark", this.remark) 
				.append("createTime", this.createTime) 
				.append("state", this.state) 
				.toString();
	}



}
