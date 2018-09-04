package com.hurong.credit.service.thirdPay.fuiou.model.ntfrsp.verify;

import java.io.StringReader;
import java.io.StringWriter;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

public class VerifyNtfRspCoder{
    private static String CHARSET = "UTF-8";
    private static JAXBContext jaxbContext;

    static{
        try{
            jaxbContext = JAXBContext.newInstance("com.fuiou.mer.model.ntfrsp.verify");
        }catch(JAXBException e){
            // this is a deployment error
            throw new Error(e);
        }
    }

    public static String marshal(VerifyNtfRspType verifyNtfRspType) throws JAXBException{
        Marshaller m = jaxbContext.createMarshaller();
        m.setProperty(Marshaller.JAXB_ENCODING, CHARSET);
        m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, new Boolean(false));
        JAXBElement<VerifyNtfRspType> jaxbElement = (new ObjectFactory()).createVerifyntfrsp(verifyNtfRspType);
        StringWriter sw = new StringWriter();
        m.marshal(jaxbElement, sw);
        return sw.toString();
    }

    public static VerifyNtfRspType unmarshal(String xml) throws JAXBException{
        Unmarshaller u = jaxbContext.createUnmarshaller();
        StringReader sw = new StringReader(xml);
        JAXBElement<?> element = (JAXBElement<?>) u.unmarshal(sw);
        VerifyNtfRspType verifyNtfRspType = (VerifyNtfRspType) element.getValue();
        return verifyNtfRspType;
    }
}
