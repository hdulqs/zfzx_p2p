package com.hurong.credit.model.article;
/*
 *  北京金智万维软件有限公司   -- http://www.credit-software.com
 *	Copyright @ 2004 - 2010 Yuseen.com all rights reserved.京ICP备 05007290 号
*/
import javassist.expr.Instanceof;

import javax.persistence.Transient;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.google.gson.annotations.Expose;
import com.hurong.core.model.BaseModel;
//import com.hurong.credit.model.p2p.article.Articlecategory;



/**
 * 
 * @author 
 *
 */
/**
 * Articlecategory Base Java Bean, base class for the.credit.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * TODO: add class/table comments
 */
public class ArticleCategory extends BaseModel {
	public static final String PATH_SEPARATOR = ",";// 树路径分隔符
	@Expose
	protected Long id;
	@Expose
    protected Long parentId;
	@Expose
	protected java.util.Date createDate;
	@Expose
	protected java.util.Date modifyDate;
	@Expose
	protected String metaDescription;
	@Expose
	protected String metaKeywords;
	@Expose
	protected String name;
	@Expose
	protected Integer orderList;
	@Expose
	protected String path;
	@Expose
	protected Integer depth;
	@Expose
	protected Integer type;

	protected java.util.Set articles = new java.util.HashSet();
	

	/**
	 * 层次	 * @return Integer
	 * @hibernate.property column="depth" type="java.lang.Integer" length="10" not-null="true" unique="false"
	 */
	public Integer getDepth() {
		return this.depth;
	}
	
	/**
	 * Set the depth
	 * @spring.validator type="required"
	 */	
	public void setDepth(Integer aValue) {
		this.depth = aValue;
	}	

	/**
	 * Default Empty Constructor for class Articlecategory
	 */
	public ArticleCategory () {
		super();
	}
	
	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	/**
	 * Default Key Fields Constructor for class ArticleCategory
	 */
	public ArticleCategory (
		 Long in_id
        ) {
		this.setId(in_id);
    }



	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
	public java.util.Set getArticles () {
		return articles;
	}	
	
	public void setArticles (java.util.Set in_articles) {
		this.articles = in_articles;
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
	 * 	 * @return java.util.Date
	 * @hibernate.property column="createDate" type="java.util.Date" length="19" not-null="false" unique="false"
	 */
	public java.util.Date getCreateDate() {
		return this.createDate;
	}
	
	/**
	 * Set the createDate
	 */	
	public void setCreateDate(java.util.Date aValue) {
		this.createDate = aValue;
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
	 * 	 * @return String
	 * @hibernate.property column="metaDescription" type="java.lang.String" length="65535" not-null="false" unique="false"
	 */
	public String getMetaDescription() {
		return this.metaDescription;
	}
	
	/**
	 * Set the metaDescription
	 */	
	public void setMetaDescription(String aValue) {
		this.metaDescription = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="metaKeywords" type="java.lang.String" length="65535" not-null="false" unique="false"
	 */
	public String getMetaKeywords() {
		return this.metaKeywords;
	}
	
	/**
	 * Set the metaKeywords
	 */	
	public void setMetaKeywords(String aValue) {
		this.metaKeywords = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="name" type="java.lang.String" length="255" not-null="true" unique="false"
	 */
	public String getName() {
		return this.name;
	}
	
	/**
	 * Set the name
	 * @spring.validator type="required"
	 */	
	public void setName(String aValue) {
		this.name = aValue;
	}	

	/**
	 * 	 * @return Integer
	 * @hibernate.property column="orderList" type="java.lang.Integer" length="10" not-null="true" unique="false"
	 */
	public Integer getOrderList() {
		return this.orderList;
	}
	
	/**
	 * Set the orderList
	 * @spring.validator type="required"
	 */	
	public void setOrderList(Integer aValue) {
		this.orderList = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="path" type="java.lang.String" length="65535" not-null="false" unique="false"
	 */
	public String getPath() {
		return this.path;
	}
	
	/**
	 * Set the path
	 */	
	public void setPath(String aValue) {
		this.path = aValue;
	}	


	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ArticleCategory)) {
			return false;
		}
		ArticleCategory rhs = (ArticleCategory) object;
		return new EqualsBuilder()
				.append(this.id, rhs.id)
				.append(this.createDate, rhs.createDate)
				.append(this.modifyDate, rhs.modifyDate)
				.append(this.metaDescription, rhs.metaDescription)
				.append(this.metaKeywords, rhs.metaKeywords)
				.append(this.name, rhs.name)
				.append(this.orderList, rhs.orderList)
				.append(this.path, rhs.path)
						.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.id) 
				.append(this.createDate) 
				.append(this.modifyDate) 
				.append(this.metaDescription) 
				.append(this.metaKeywords) 
				.append(this.name) 
				.append(this.orderList) 
				.append(this.path) 
						.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("id", this.id) 
				.append("createDate", this.createDate) 
				.append("modifyDate", this.modifyDate) 
				.append("metaDescription", this.metaDescription) 
				.append("metaKeywords", this.metaKeywords) 
				.append("name", this.name) 
				.append("orderList", this.orderList) 
				.append("path", this.path) 
						.toString();
	}

	


}
