//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.2-147 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.11.24 at 11:19:51 ���� CST 
//


package com.hurong.credit.service.thirdPay.fuiou.model.req.qrytrans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for QryTransReqType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="QryTransReqType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="ver" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="busicd" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="orderno" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="startdt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="enddt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="transst" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "QryTransReqType", propOrder = {
    "ver",
    "busicd",
    "orderno",
    "startdt",
    "enddt",
    "transst"
})
public class QryTransReqType {

    protected String ver;
    protected String busicd;
    protected String orderno;
    protected String startdt;
    protected String enddt;
    protected String transst;

    /**
     * Gets the value of the ver property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVer() {
        return ver;
    }

    /**
     * Sets the value of the ver property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVer(String value) {
        this.ver = value;
    }

    /**
     * Gets the value of the busicd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBusicd() {
        return busicd;
    }

    /**
     * Sets the value of the busicd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBusicd(String value) {
        this.busicd = value;
    }

    /**
     * Gets the value of the orderno property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOrderno() {
        return orderno;
    }

    /**
     * Sets the value of the orderno property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOrderno(String value) {
        this.orderno = value;
    }

    /**
     * Gets the value of the startdt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStartdt() {
        return startdt;
    }

    /**
     * Sets the value of the startdt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStartdt(String value) {
        this.startdt = value;
    }

    /**
     * Gets the value of the enddt property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEnddt() {
        return enddt;
    }

    /**
     * Sets the value of the enddt property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEnddt(String value) {
        this.enddt = value;
    }

    /**
     * Gets the value of the transst property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTransst() {
        return transst;
    }

    /**
     * Sets the value of the transst property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTransst(String value) {
        this.transst = value;
    }

}
