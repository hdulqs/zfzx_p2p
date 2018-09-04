package com.hurong.credit.model.financeProduct;
/*
 *  北京互融时代软件有限公司   -- http://www.zhiweitime.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import java.math.BigDecimal;

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

/**
 * 
 * @author 
 *
 */
/**
 * PlFinanceProductUseraccount Base Java Bean, base class for the.credit.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * TODO: add class/table comments
 */
public class PlFinanceProductUseraccount extends com.hurong.core.model.BaseModel {

    protected Long id;//主键Id
	protected Long userId;//用户Id
	protected String userName;//用户名
	protected String userloginName;//用户登陆名
	protected Long productId;//产品主键
	protected String productName;//产品名称
	protected java.util.Date openDate;//开户日期
	/**
	 * 账户状态
	 * -1表示关闭状态
	 * 1表示 开启状态
	 */
	protected Short accountStatus=1;//账户状态
	protected java.util.Date modifyDate;//修改日期
	//账户总金额
	private BigDecimal  currentMoney=new BigDecimal(0);
	//累计账户总收益
	private BigDecimal  totalIntestMoney=new BigDecimal(0);
	//昨日收益
	private BigDecimal yesterdayEarn=new BigDecimal(0);
	//转入金额
	private BigDecimal incomeMoney=new BigDecimal(0);
	//转出金额	
	private BigDecimal payMoney=new BigDecimal(0);
   //计息金额
	private BigDecimal intestMoney=new BigDecimal(0); 
	//在途金额(尚不能计入计息的金额)
	private BigDecimal onwayMoney=new BigDecimal(0); 
	public BigDecimal getCurrentMoney() {
		return currentMoney;
	}

	public void setCurrentMoney(BigDecimal currentMoney) {
		this.currentMoney = currentMoney;
	}

	public BigDecimal getTotalIntestMoney() {
		return totalIntestMoney;
	}

	public void setTotalIntestMoney(BigDecimal totalIntestMoney) {
		this.totalIntestMoney = totalIntestMoney;
	}

	public BigDecimal getYesterdayEarn() {
		return yesterdayEarn;
	}

	public void setYesterdayEarn(BigDecimal yesterdayEarn) {
		this.yesterdayEarn = yesterdayEarn;
	}

	/**
	 * Default Empty Constructor for class PlFinanceProductUseraccount
	 */
	public PlFinanceProductUseraccount () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class PlFinanceProductUseraccount
	 */
	public PlFinanceProductUseraccount (
		 Long in_id
        ) {
		this.setId(in_id);
    }

    

	/**
	 * 	 * @return Long
     * @hibernate.id column="id" type="java.lang.Long" generator-class="native"
	 */
	public Long getId() {
		return this.id;
	}
	
	/**
	 * Set the id
	 */	
	public void setId(Long aValue) {
		this.id = aValue;
	}	

	/**
	 * 	 * @return Long
	 * @hibernate.property column="userId" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getUserId() {
		return this.userId;
	}
	
	/**
	 * Set the userId
	 */	
	public void setUserId(Long aValue) {
		this.userId = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="userName" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getUserName() {
		return this.userName;
	}
	
	/**
	 * Set the userName
	 */	
	public void setUserName(String aValue) {
		this.userName = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="userloginName" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getUserloginName() {
		return this.userloginName;
	}
	
	/**
	 * Set the userloginName
	 */	
	public void setUserloginName(String aValue) {
		this.userloginName = aValue;
	}	

	/**
	 * 	 * @return Long
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
	 * @hibernate.property column="productName" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getProductName() {
		return this.productName;
	}
	
	/**
	 * Set the productName
	 */	
	public void setProductName(String aValue) {
		this.productName = aValue;
	}	

	/**
	 * 	 * @return java.util.Date
	 * @hibernate.property column="openDate" type="java.util.Date" length="19" not-null="false" unique="false"
	 */
	public java.util.Date getOpenDate() {
		return this.openDate;
	}
	
	/**
	 * Set the openDate
	 */	
	public void setOpenDate(java.util.Date aValue) {
		this.openDate = aValue;
	}	

	/**
	 * 	 * @return Short
	 * @hibernate.property column="accountStatus" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getAccountStatus() {
		return this.accountStatus;
	}
	
	/**
	 * Set the accountStatus
	 */	
	public void setAccountStatus(Short aValue) {
		this.accountStatus = aValue;
	}	

	/**
	 * 	 * @return java.util.Date
	 * @hibernate.property column="modifyDate" type="java.util.Date" length="19" not-null="false" unique="false"
	 */
	public java.util.Date getModifyDate() {
		return this.modifyDate;
	}
	
	/**
	 * Set the modifyDate
	 */	
	public void setModifyDate(java.util.Date aValue) {
		this.modifyDate = aValue;
	}	


	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof PlFinanceProductUseraccount)) {
			return false;
		}
		PlFinanceProductUseraccount rhs = (PlFinanceProductUseraccount) object;
		return new EqualsBuilder()
				.append(this.id, rhs.id)
				.append(this.userId, rhs.userId)
				.append(this.userName, rhs.userName)
				.append(this.userloginName, rhs.userloginName)
				.append(this.productId, rhs.productId)
				.append(this.productName, rhs.productName)
				.append(this.openDate, rhs.openDate)
				.append(this.accountStatus, rhs.accountStatus)
				.append(this.modifyDate, rhs.modifyDate)
				.append(this.companyId, rhs.companyId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.id) 
				.append(this.userId) 
				.append(this.userName) 
				.append(this.userloginName) 
				.append(this.productId) 
				.append(this.productName) 
				.append(this.openDate) 
				.append(this.accountStatus) 
				.append(this.modifyDate) 
				.append(this.companyId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("id", this.id) 
				.append("userId", this.userId) 
				.append("userName", this.userName) 
				.append("userloginName", this.userloginName) 
				.append("productId", this.productId) 
				.append("productName", this.productName) 
				.append("openDate", this.openDate) 
				.append("accountStatus", this.accountStatus) 
				.append("modifyDate", this.modifyDate) 
				.append("companyId", this.companyId) 
				.toString();
	}

	public void setIncomeMoney(BigDecimal incomeMoney) {
		this.incomeMoney = incomeMoney;
	}

	public BigDecimal getIncomeMoney() {
		return incomeMoney;
	}

	public void setPayMoney(BigDecimal payMoney) {
		this.payMoney = payMoney;
	}

	public BigDecimal getPayMoney() {
		return payMoney;
	}

	public void setIntestMoney(BigDecimal intestMoney) {
		this.intestMoney = intestMoney;
	}

	public BigDecimal getIntestMoney() {
		return intestMoney;
	}

	public void setOnwayMoney(BigDecimal onwayMoney) {
		this.onwayMoney = onwayMoney;
	}

	public BigDecimal getOnwayMoney() {
		return onwayMoney;
	}



}
