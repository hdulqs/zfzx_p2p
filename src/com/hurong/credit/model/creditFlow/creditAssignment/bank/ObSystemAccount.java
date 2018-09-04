package com.hurong.credit.model.creditFlow.creditAssignment.bank;


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
 * ObSystemAccount Base Java Bean, base class for the.credit.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * TODO: add class/table comments
 */
public class ObSystemAccount extends com.zhiwei.core.model.BaseModel {
	//0 线上客户  1线下客户
    public static final Short type0=Short.valueOf("0");
    public static final Short type1=Short.valueOf("1");
    protected Long id;//虚拟账户表的id
	protected String accountName;//虚拟账户的账户名  默认的是投资人的姓名
	protected String accountNumber;//虚拟账户的账号
	protected Long investmentPersonId;//投资人表中投资人的id
	protected String investPersonName;//投资人的姓名
	protected java.math.BigDecimal totalMoney;//投资人账户金额（即为可投资金额）
	protected Short accountStatus;//投资人账户状态，0或者null表示没有状态，1表示取现审批中
	
	protected Short investPersionType;//投资人类型 0 线上客户 1线下客户
	
	
	//不与数据库字段映射
	protected java.math.BigDecimal   totalInvestMoney;//该账户投资人累计投资金额
	protected java.math.BigDecimal   freezeMoney;//投资预冻结金额
	protected java.math.BigDecimal   currentInvestMoney;//该账户尚冻结的投资金额
	protected java.math.BigDecimal   availableInvestMoney;//该账户目前可用投资额  
	protected java.math.BigDecimal   unBackMoney ;//表示该账户待回收的款项
	protected java.math.BigDecimal   unPrincipalRepayment;//表示该账户已经收回本金
	protected java.math.BigDecimal   unInterest;//表示该账户待回收的利息
	protected java.math.BigDecimal   allInterest;//表示该账户累计的获得的利息
	protected java.math.BigDecimal   expectAllInterest;//表示该账户预计累计收益（expectAllInterest=unInterest+allInterest）
	protected java.math.BigDecimal   personInterestRate;//表示该账户投资回报率（累计回收利息/累计投资额）
	
	
	
	public Short getInvestPersionType() {
		return investPersionType;
	}

	public void setInvestPersionType(Short investPersionType) {
		this.investPersionType = investPersionType;
	}

	public java.math.BigDecimal getPersonInterestRate() {
		return personInterestRate;
	}

	public void setPersonInterestRate(java.math.BigDecimal personInterestRate) {
		this.personInterestRate = personInterestRate;
	}

	public java.math.BigDecimal getUnBackMoney() {
		return unBackMoney;
	}

	public void setUnBackMoney(java.math.BigDecimal unBackMoney) {
		this.unBackMoney = unBackMoney;
	}

	public java.math.BigDecimal getUnPrincipalRepayment() {
		return unPrincipalRepayment;
	}

	public void setUnPrincipalRepayment(java.math.BigDecimal unPrincipalRepayment) {
		this.unPrincipalRepayment = unPrincipalRepayment;
	}

	public java.math.BigDecimal getUnInterest() {
		return unInterest;
	}

	public void setUnInterest(java.math.BigDecimal unInterest) {
		this.unInterest = unInterest;
	}

	public java.math.BigDecimal getAllInterest() {
		return allInterest;
	}

	public void setAllInterest(java.math.BigDecimal allInterest) {
		this.allInterest = allInterest;
	}

	public java.math.BigDecimal getExpectAllInterest() {
		return expectAllInterest;
	}

	public void setExpectAllInterest(java.math.BigDecimal expectAllInterest) {
		this.expectAllInterest = expectAllInterest;
	}

	public java.math.BigDecimal getFreezeMoney() {
		return freezeMoney;
	}

	public void setFreezeMoney(java.math.BigDecimal freezeMoney) {
		this.freezeMoney = freezeMoney;
	}
	
	/**
	 * Default Empty Constructor for class ObSystemAccount
	 */
	public ObSystemAccount () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ObSystemAccount
	 */
	public ObSystemAccount (
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
	 * 	 * @return String
	 * @hibernate.property column="accountName" type="java.lang.String" length="100" not-null="false" unique="false"
	 */
	public String getAccountName() {
		return this.accountName;
	}
	
	/**
	 * Set the accountName
	 */	
	public void setAccountName(String aValue) {
		this.accountName = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="accountNumber" type="java.lang.String" length="100" not-null="false" unique="false"
	 */
	public String getAccountNumber() {
		return this.accountNumber;
	}
	
	/**
	 * Set the accountNumber
	 */	
	public void setAccountNumber(String aValue) {
		this.accountNumber = aValue;
	}	

	/**
	 * 	 * @return Long
	 * @hibernate.property column="investmentPersonId" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getInvestmentPersonId() {
		return this.investmentPersonId;
	}
	
	/**
	 * Set the investmentPersonId
	 */	
	public void setInvestmentPersonId(Long aValue) {
		this.investmentPersonId = aValue;
	}	

	/**
	 * 	 * @return java.math.BigDecimal
	 * @hibernate.property column="totalMoney" type="java.math.BigDecimal" length="40" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getTotalMoney() {
		return this.totalMoney;
	}
	
	/**
	 * Set the totalMoney
	 */	
	public void setTotalMoney(java.math.BigDecimal aValue) {
		this.totalMoney = aValue;
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

	public java.math.BigDecimal getTotalInvestMoney() {
		return totalInvestMoney;
	}

	public void setTotalInvestMoney(java.math.BigDecimal totalInvestMoney) {
		this.totalInvestMoney = totalInvestMoney;
	}

	public java.math.BigDecimal getCurrentInvestMoney() {
		return currentInvestMoney;
	}

	public void setCurrentInvestMoney(java.math.BigDecimal currentInvestMoney) {
		this.currentInvestMoney = currentInvestMoney;
	}

	public java.math.BigDecimal getAvailableInvestMoney() {
		return availableInvestMoney;
	}

	public void setAvailableInvestMoney(java.math.BigDecimal availableInvestMoney) {
		this.availableInvestMoney = availableInvestMoney;
	}
	
	public String getInvestPersonName() {
		return investPersonName;
	}

	public void setInvestPersonName(String investPersonName) {
		this.investPersonName = investPersonName;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ObSystemAccount)) {
			return false;
		}
		ObSystemAccount rhs = (ObSystemAccount) object;
		return new EqualsBuilder()
				.append(this.id, rhs.id)
				.append(this.accountName, rhs.accountName)
				.append(this.accountNumber, rhs.accountNumber)
				.append(this.investmentPersonId, rhs.investmentPersonId)
				.append(this.totalMoney, rhs.totalMoney)
				.append(this.accountStatus, rhs.accountStatus)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.id) 
				.append(this.accountName) 
				.append(this.accountNumber) 
				.append(this.investmentPersonId) 
				.append(this.totalMoney) 
				.append(this.accountStatus) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("id", this.id) 
				.append("accountName", this.accountName) 
				.append("accountNumber", this.accountNumber) 
				.append("investmentPersonId", this.investmentPersonId) 
				.append("totalMoney", this.totalMoney) 
				.append("accountStatus", this.accountStatus) 
				.toString();
	}



}
