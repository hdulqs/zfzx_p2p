package com.hurong.credit.action.pay;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;
import java.net.URLDecoder;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.hurong.core.Constants;
import com.hurong.core.util.AppUtil;
import com.hurong.core.util.RequestUtil;
import com.hurong.core.util.StringUtil;
import com.hurong.core.web.action.BaseAction;
import com.hurong.credit.config.DynamicConfig;
import com.hurong.credit.model.financePurchase.BpMoneyManager;
import com.hurong.credit.model.pay.BpBidLoan;
import com.hurong.credit.model.pay.MoneyMoreMore;
import com.hurong.credit.model.pay.ResultLoanBean;
import com.hurong.credit.model.thirdInterface.PlThirdInterfaceLog;
import com.hurong.credit.model.user.BpCustMember;
import com.hurong.credit.service.financePurchase.BpMoneyManagerService;
import com.hurong.credit.service.pay.BpBidLoanService;
import com.hurong.credit.service.thirdInterface.HuiFuService;
import com.hurong.credit.service.thirdInterface.PlThirdInterfaceLogService;
import com.hurong.credit.service.user.BpCustMemberService;
import com.hurong.credit.util.HibernateProxyTypeAdapter;
import com.hurong.credit.util.MD5;
import com.hurong.credit.util.MyUserSession;
import com.hurong.credit.util.TemplateConfigUtil;

public class FontHuiFuAction extends BaseAction {

	private BpCustMember bpCustMember;
	@Resource
	private BpCustMemberService bpCustMemberService;
	@Resource
	private PlThirdInterfaceLogService plThirdInterfaceLogService;
	@Resource
	private HuiFuService huiFuService;
	public static final String GBKCHARSET = "GBK";
	public static final String UTF8CHARSET = "UTF-8";
	//得到config.properties读取的所有资源
	private static Map configMap = AppUtil.getConfigMap();
	public static final String Version20="20";
	
	//平台专属账户号 不可修改
	public static final String ServFeeAcct_ID="MDT000001";
	/**
	 * 借款手续费率
	 * 数字，保留 2 位小数，例如：0.01，0.99，2.00，2.01，999.99．取值范围 0.01<= MaxTenderRate <=999.99 
	 */
	public static final String BorrowerRate_0="1.00";
	/**
	 * 最大投资手续费率
	 * 数字，保留 2 位小数，例如：0.01，0.99，2.00，2.01，999.99．取值范围 0.01<= MaxTenderRate <=999.99 
	 */
	public static final String MaxTenderRate_0="0.10";
	/**
	 * 签名验证密码
	 */
	public static final String SIGNPASS = "530125";
	/**
	 * 版本号定长 2位目前固定为 10 。 如版本升级，能向前兼容。
	 */
	String Version;
	/**
	 * 消息类型变长每一种消息类型代表交易，具体码见 每一种消息类型代表交易，具体码见 HH TUTUTUTUTUTUTUTU
	 */
	String CmdId;
	/**
	 * 商户客号变长 16 位商户客户号，由汇付生成，商户的唯一性标识
	 */
	String MerCustId;
	/**
	 * 用户客号变长 16 位用户客户号，由汇付生成，用户的唯一性标识
	 */
	String UsrId;
	/**
	 * 真实名称变长 50 位
	 */
	String UsrName;
	/**
	 * 卡号类型
	 */
	String IdType;
	/**
	 * 返回前台地址
	 */
	String RetUrl;
	/**
	 * 返回后台通知地址
	 */
	String BgRetUrl;
	/**
	 * 商户私有域 变长 12 0位 为商户的自定义字段，该在交易完成后由 为商户的自定义字段，该在交易完成后由 商户专属 平台 原样返回
	 * 。注意：如果该字段中包含了文符请 。注意：如果该字段中包含了文符请 。注意：如果该字段中包含了文符请 。注意：如果该字段中包含了文符请
	 * 对该字段的数据进行 base64base64base64 base64base64加密后再使用。 加
	 */
	String MerPriv;
	/**
	 * 证件号
	 */
	String IdNo;
	/**
	 * 手机号 定长 11 位 商户专属平台 系
	 */
	String UsrMp;
	/**
	 * 邮箱
	 */
	String UsrEmail;
	/**
	 * 编码集 变长 加签验的时候商户，告知汇付系统是什么编 加签验的时候商户，告知汇付系统是什么编 加签验的时候商户，告知汇付系统是什么编 码
	 */
	String CharSet;
	/**
	 * 加密验证
	 */
	String ChkValue;
	/**
	 * 返回code
	 */
	String RespCode;
	/**
	 * 返回 说明
	 */
	String RespDesc;

	/**
	 * 用户客号 变长 16 位 用户客户号，由汇付生成，用户的唯一性标识
	 */
	String UsrCustId;
	String TrxId;
	/**
	 * 银行账号
	 */
	String OpenAcctId;
	/**
	 * 开户银行代号
	 */
	String OpenBankId;
	/**
	 * 由商户的系统生成，必须保证唯一，请使用纯数字
	 */
	String OrdId;
	/**
	 * 订单日期 定长 8 位 例如：20130307
	 */
	String OrdDate;
	/**
	 * 支 付 网 关 业 网关的细分业务类型，如 B2C、B2B、WH
	 */
	String GateBusiId;
	/**
	 * 借贷记标记 D：借记 C：贷记
	 */
	String DcFlag;
	/**
	 * 交易金额
	 */
	String TransAmt;

	/**
	 * 账户余额 账户资金余额，该余额能真正反映账户的资金量
	 */
	String AcctBal;
	/**
	 * 冻结金额 冻结余额
	 */
	String FrzBal;
	/**
	 * 可用余额 账户可以支取的余额
	 */
	String AvlBal;
	/**
	 * 最 大 投 资 手续费率数字，保留 2 位小数，例如：0.01，0.99，2.00，2.01，999.99
	 */
	String MaxTenderRate;
	/**
	 * 借款人信息
	 */
	String BorrowerDetails;
	/**
	 * 是否冻结定长 1 位是否冻结，Y：冻结；N：不冻结
	 */
	String IsFreeze;
	/**
	 * 冻结订单号
	 */
	String FreezeOrdId;
	/**
	 * 入参扩展域 变长 512 位 用于扩展请求参数
	 */
	String ReqExt;
	/**
	 * 冻结标识定长 18 位 组成规则为：8 位商户专属平台日期+10 位系统流水号
	 */
	String FreezeTrxId;
	/**
	 * 返参扩展域 变长 512 位 用于扩展返回参数
	 */
	String RespExt;
	/**
	 * 出账客户号	变长 16 位	出账客户号，由汇付生成，用户的唯一性标识
	 */
	String OutCustId;
	/**
	 * 手续费
	 */
    String Fee;
    /**
     * 入账客户
     */
    String InCustId;
    /**
     * 由商户的系统生成，必须保证唯一。如果本次交易从属
于另一个交易流水，则需要通过填写该流水号来关联。
例如：本次放款：商户流水号是 OrdId，日期是 OrdDate，
关联投标订单流水是 SubOrdId，日期是 SubOrdDate
     */
    String SubOrdId;
    String SubOrdDate;
    /**
     * 是否默认 Y:是默认，N：不是默认
     */
    String IsDefault;
    /**
     * 分账账户串
     * 放款1.0、还款1.0、债权转让1.0接口格式：
     *  [{"DivAcctId":"MDT000023","DivAmt":"1.00"}, 
     *  {"DivAcctId":"MDT000024","DivAmt":"2.00"}, 
		*{"DivAcctId":"MDT000025","DivAmt":"3.00"}] 
		
		*放款2.0、还款2.0接口格式：
	*	[{"DivCustId":"6000060000009547","DivAcctId":"MDT
	*	000001","DivAmt":"1.00"}, 
	*	{"DivCustId":"6000060000002526","DivAcctId":"MDT0
	*	00001","DivAmt":"2.00"}, 
	*	{"DivCustId":"6000060000002528","DivAcctId":"MDT0
	*	00001","DivAmt":"3.00"}]

     */
    String DivDetails;
    
    String OutAcctId;
    String InAcctId;
    
    String DivAcctId;
    /**
     * 续 费 收 取 对象标志  I/O 
     * I：向入款客户号InCustId收取
       O：向出款客户号OutCustId收取
     */
    String FeeObjFlag;
    
    String ServFee; //服务费
    String ServFeeAcctId; //收取服务费子账号
    
    String remark;
    
    
    public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	

	public String getServFee() {
		return ServFee;
	}

	public void setServFee(String servFee) {
		ServFee = servFee;
	}

	public String getServFeeAcctId() {
		return ServFeeAcctId;
	}

	public void setServFeeAcctId(String servFeeAcctId) {
		ServFeeAcctId = servFeeAcctId;
	}

	public String getOutAcctId() {
		return OutAcctId;
	}

	public void setOutAcctId(String outAcctId) {
		OutAcctId = outAcctId;
	}

	public String getInAcctId() {
		return InAcctId;
	}

	public void setInAcctId(String inAcctId) {
		InAcctId = inAcctId;
	}

	String IsUnFreeze;
    String UnFreezeOrdId;
    
    
    
    public String getIsUnFreeze() {
		return IsUnFreeze;
	}

	public void setIsUnFreeze(String isUnFreeze) {
		IsUnFreeze = isUnFreeze;
	}

	public String getUnFreezeOrdId() {
		return UnFreezeOrdId;
	}

	public void setUnFreezeOrdId(String unFreezeOrdId) {
		UnFreezeOrdId = unFreezeOrdId;
	}

	public String getFeeObjFlag() {
		return FeeObjFlag;
	}

	public void setFeeObjFlag(String feeObjFlag) {
		FeeObjFlag = feeObjFlag;
	}

	public String getOutCustId() {
		return OutCustId;
	}

	public void setOutCustId(String outCustId) {
		OutCustId = outCustId;
	}

	public String getFee() {
		return Fee;
	}

	public void setFee(String fee) {
		Fee = fee;
	}

	public String getInCustId() {
		return InCustId;
	}

	public void setInCustId(String inCustId) {
		InCustId = inCustId;
	}

	public String getSubOrdId() {
		return SubOrdId;
	}

	public void setSubOrdId(String subOrdId) {
		SubOrdId = subOrdId;
	}

	public String getSubOrdDate() {
		return SubOrdDate;
	}

	public void setSubOrdDate(String subOrdDate) {
		SubOrdDate = subOrdDate;
	}

	public String getIsDefault() {
		return IsDefault;
	}

	public void setIsDefault(String isDefault) {
		IsDefault = isDefault;
	}

	public String getDivDetails() {
		return DivDetails;
	}

	public void setDivDetails(String divDetails) {
		DivDetails = divDetails;
	}

	public String getDivAcctId() {
		return DivAcctId;
	}

	public void setDivAcctId(String divAcctId) {
		DivAcctId = divAcctId;
	}

	public String getDivCustId() {
		return DivCustId;
	}

	public void setDivCustId(String divCustId) {
		DivCustId = divCustId;
	}

	public String getDivAmt() {
		return DivAmt;
	}

	public void setDivAmt(String divAmt) {
		DivAmt = divAmt;
	}

	/**
     * 手 续 费 分 账客户号
     */
    String DivCustId;
    String DivAmt;
    
    String FeeAmt ;
    String FeeCustId ;
    String FeeAcctId ;
    
    
	public String getFeeAmt() {
		return FeeAmt;
	}

	public void setFeeAmt(String feeAmt) {
		FeeAmt = feeAmt;
	}

	public String getFeeCustId() {
		return FeeCustId;
	}

	public void setFeeCustId(String feeCustId) {
		FeeCustId = feeCustId;
	}

	public String getFeeAcctId() {
		return FeeAcctId;
	}

	public void setFeeAcctId(String feeAcctId) {
		FeeAcctId = feeAcctId;
	}

	public String getAcctBal() {
		return AcctBal;
	}

	public void setAcctBal(String acctBal) {
		AcctBal = acctBal;
	}

	public String getFrzBal() {
		return FrzBal;
	}

	public void setFrzBal(String frzBal) {
		FrzBal = frzBal;
	}

	public String getAvlBal() {
		return AvlBal;
	}

	public void setAvlBal(String avlBal) {
		AvlBal = avlBal;
	}

	public String getOrdId() {
		return OrdId;
	}

	public void setOrdId(String ordId) {
		OrdId = ordId;
	}

	public String getOrdDate() {
		return OrdDate;
	}

	public void setOrdDate(String ordDate) {
		OrdDate = ordDate;
	}

	public String getGateBusiId() {
		return GateBusiId;
	}

	public void setGateBusiId(String gateBusiId) {
		GateBusiId = gateBusiId;
	}

	public String getDcFlag() {
		return DcFlag;
	}

	public void setDcFlag(String dcFlag) {
		DcFlag = dcFlag;
	}

	public String getTransAmt() {
		return TransAmt;
	}

	public void setTransAmt(String transAmt) {
		TransAmt = transAmt;
	}

	public String getOpenAcctId() {
		return OpenAcctId;
	}

	public void setOpenAcctId(String openAcctId) {
		OpenAcctId = openAcctId;
	}

	public String getOpenBankId() {
		return OpenBankId;
	}

	public void setOpenBankId(String openBankId) {
		OpenBankId = openBankId;
	}

	public String getTrxId() {
		return TrxId;
	}

	public void setTrxId(String trxId) {
		TrxId = trxId;
	}

	public String getUsrCustId() {
		return UsrCustId;
	}

	public void setUsrCustId(String usrCustId) {
		UsrCustId = usrCustId;
	}

	public String getChkValue() {
		return ChkValue;
	}

	public void setChkValue(String chkValue) {
		ChkValue = chkValue;
	}

	public String getVersion() {
		return Version;
	}

	public void setVersion(String version) {
		Version = version;
	}

	public String getCmdId() {
		return CmdId;
	}

	public void setCmdId(String cmdId) {
		CmdId = cmdId;
	}

	public String getMerCustId() {
		return MerCustId;
	}

	public void setMerCustId(String merCustId) {
		MerCustId = merCustId;
	}

	public String getUsrId() {
		return UsrId;
	}

	public void setUsrId(String usrId) {
		UsrId = usrId;
	}

	public String getUsrName() {
		return UsrName;
	}

	public void setUsrName(String usrName) {
		UsrName = usrName;
	}

	public String getIdType() {
		return IdType;
	}

	public void setIdType(String idType) {
		IdType = idType;
	}

	public String getRetUrl() {
		return RetUrl;
	}

	public void setRetUrl(String retUrl) {
		retUrl=StringUtil.stringURLDecoderByUTF8(retUrl);
		RetUrl = retUrl;
	}

	public String getBgRetUrl() {
		return BgRetUrl;
	}

	public void setBgRetUrl(String bgRetUrl) {
		bgRetUrl=StringUtil.stringURLDecoderByUTF8(bgRetUrl);
		BgRetUrl = bgRetUrl;
	}

	public String getMerPriv() {
		return MerPriv;
	}

	public void setMerPriv(String merPriv) {
		MerPriv = merPriv;
	}

	public String getIdNo() {
		return IdNo;
	}

	public void setIdNo(String idNo) {
		IdNo = idNo;
	}

	public String getUsrMp() {
		return UsrMp;
	}

	public void setUsrMp(String usrMp) {
		UsrMp = usrMp;
	}

	public String getUsrEmail() {
		return UsrEmail;
	}

	public void setUsrEmail(String usrEmail) {
		UsrEmail = usrEmail;
	}

	public String getCharSet() {
		return CharSet;
	}

	public void setCharSet(String charSet) {
		CharSet = charSet;
	}

	public String getRespCode() {
		return RespCode;
	}

	public void setRespCode(String respCode) {
		RespCode = respCode;
	}

	public String getRespDesc() {
		return RespDesc;
	}

	public void setRespDesc(String respDesc) {
		RespDesc = respDesc;
	}

	public String getMaxTenderRate() {
		return MaxTenderRate;
	}

	public void setMaxTenderRate(String maxTenderRate) {
		MaxTenderRate = maxTenderRate;
	}

	public String getBorrowerDetails() {
		return BorrowerDetails;
	}

	public void setBorrowerDetails(String borrowerDetails) {
		BorrowerDetails = borrowerDetails;
	}

	public String getIsFreeze() {
		return IsFreeze;
	}

	public void setIsFreeze(String isFreeze) {
		IsFreeze = isFreeze;
	}

	public String getFreezeOrdId() {
		return FreezeOrdId;
	}

	public void setFreezeOrdId(String freezeOrdId) {
		FreezeOrdId = freezeOrdId;
	}

	public String getReqExt() {
		return ReqExt;
	}

	public void setReqExt(String reqExt) {
		ReqExt = reqExt;
	}

	public String getFreezeTrxId() {
		return FreezeTrxId;
	}

	public void setFreezeTrxId(String freezeTrxId) {
		FreezeTrxId = freezeTrxId;
	}

	public String getRespExt() {
		return RespExt;
	}

	public void setRespExt(String respExt) {
		RespExt = respExt;
	}

	/**
	 * 汇付注册 返回参数
	 * 
	 * @return
	 */
	public String register() {
		logger.info(RequestUtil.queryString(this.getRequest()));
		String msgData = CmdId + RespCode + MerCustId + UsrId + UsrCustId
				+ BgRetUrl + TrxId + RetUrl + MerPriv;
		System.out.println("注册返回=="+RequestUtil.queryString(this.getRequest()));
		// 校验
		sign(msgData);
		
		this.setSuccessResultValue(TemplateConfigUtil.getDynamicConfig(
				DynamicConfig.MESSAGE).getTemplateFilePath());
		return "freemarker";
	}

	/**
	 * 返回充值参数
	 * 
	 * @return
	 */
	public String recharge() {
		logger.info(RequestUtil.queryString(this.getRequest()));
		
		String msgData = CmdId + RespCode + MerCustId + UsrCustId + OrdId
				+ OrdDate + TransAmt + TrxId + RetUrl + BgRetUrl + MerPriv;
		// 校验
		sign(msgData);
		System.out.println("充值返回=="+RequestUtil.queryString(this.getRequest()));
		// 后台去掉
		this.setSuccessResultValue(TemplateConfigUtil.getDynamicConfig(
				DynamicConfig.MESSAGE).getTemplateFilePath());
		return "freemarker";
	}
    //投标
	public String tender() {
		logger.info(RequestUtil.queryString(this.getRequest()));
		try{
		String msgData = CmdId+ RespCode + MerCustId  + OrdId  + OrdDate  +  TransAmt  +  UsrCustId  + TrxId + IsFreeze+ FreezeOrdId+FreezeTrxId +RetUrl + BgRetUrl + MerPriv+ RespExt ;
		// 校验
		sign(msgData);
		System.out.println("投标返回=="+RequestUtil.queryString(this.getRequest()));
		// 后台去掉
		this.setSuccessResultValue(TemplateConfigUtil.getDynamicConfig(
				DynamicConfig.MESSAGE).getTemplateFilePath());
		}catch(Exception e){
			e.printStackTrace();
		}
		return "freemarker";
	}
	//放款
	public String loans(){
		logger.info(RequestUtil.queryString(this.getRequest()));
		String msgData =  CmdId  + RespCode + MerCustId  + OrdId  + OrdDate  + OutCustId  + OutAcctId 
		+TransAmt+ Fee+  InCustId  + InAcctId  +SubOrdId+ SubOrdDate+ FeeObjFlag+ IsDefault +
IsUnFreeze + UnFreezeOrdId + FreezeTrxId + BgRetUrl + MerPriv + RespExt ;
		// 校验
		sign(msgData);
		
		// 后台去掉
		this.setSuccessResultValue(TemplateConfigUtil.getDynamicConfig(
				DynamicConfig.MESSAGE).getTemplateFilePath());
		return "freemarker";
	}
	
	public String WebWithdraw(){
		logger.info(RequestUtil.queryString(this.getRequest()));
		String msgData =CmdId + RespCode + MerCustId+ OrdId + UsrCustId + TransAmt+ OpenAcctId + 
		OpenBankId + FeeAmt + FeeCustId + FeeAcctId + ServFee + ServFeeAcctId +RetUrl + BgRetUrl+ 
		MerPriv+ "";
		
		System.out.println("进入取现接口后台======="+RespCode+"返回消息"+RespDesc);
		// 校验
		sign(msgData);
		
		// 后台去掉
		this.setSuccessResultValue(TemplateConfigUtil.getDynamicConfig(
				DynamicConfig.MESSAGE).getTemplateFilePath());
		return "freemarker";
	}

	// 验证
	private void sign(String msgData) {
		boolean isSuccess = huiFuService.DecodSign(msgData, ChkValue);
		RespDesc=StringUtil.stringURLDecoderByUTF8(RespDesc);
		System.out.println("前台："+msgData+"======="+ChkValue);
		System.out.println("===进入前台"+RespDesc);
		System.out.println("===进入前台"+isSuccess);
		System.out.println("===进入前"+CmdId);
		if (isSuccess&&RespCode.equals("000")) {
			
			//设置 返回提示消息
			if(CmdId.equals("Cash")){
				RespDesc="申请提现成功，请耐心等待审核！";
			}
			webMsgInstance("0", Constants.CODE_SUCCESS, RespDesc,  "", "", "", "", "");

		} else {
			if(CmdId.equals("Cash")){
				RespDesc="申请提现失败！";
			}
			//设置 返回提示消息
			webMsgInstance("0", Constants.CODE_FAILED, RespDesc,  "", "", "", "", "");
			
		}
	}


}
