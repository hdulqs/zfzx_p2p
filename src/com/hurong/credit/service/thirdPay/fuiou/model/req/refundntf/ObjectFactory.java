//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.2-147 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2011.12.16 at 12:49:29 ���� CST 
//


package com.hurong.credit.service.thirdPay.fuiou.model.req.refundntf;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.hurong.credit.service.thirdPay.fuiou.model.req.refundntf package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _Refundntf_QNAME = new QName("", "refundntf");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.hurong.credit.service.thirdPay.fuiou.model.req.refundntf
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link ReFundntfReqType }
     * 
     */
    public ReFundntfReqType createReFundntfReqType() {
        return new ReFundntfReqType();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ReFundntfReqType }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "", name = "refundntf")
    public JAXBElement<ReFundntfReqType> createRefundntf(ReFundntfReqType value) {
        return new JAXBElement<ReFundntfReqType>(_Refundntf_QNAME, ReFundntfReqType.class, null, value);
    }

}
