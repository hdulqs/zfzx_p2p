<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta name="format-detection" content="telephone=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
    <title>法律文章</title>
    <link charset="utf-8" type="text/css" rel="stylesheet" href="${base}/mobileNew/css/reset.min.css"/>
    <link charset="utf-8" type="text/css" rel="stylesheet" href="${base}/mobileNew/css/swiper.min.css"/>
  <%--  <link charset="utf-8" type="text/css" rel="stylesheet" href="${base}/mobileNew/css/seeArticle.css"/>--%>
    <style>
        html {
            font-size: 100px;
        }

        .nav_box{
            position:fixed;
            width:100%;
            height:0.88rem;
            background-color: #fff;
            left:0;
            top:0;
            z-index:9;
        }

        .nav_box .nav{
            width:100%;
            height:0.88rem;
            line-height:0.88rem;
            text-align:center;
            font-size:0.36rem;
            color: #1A1A1A;
            position: relative;
            border-bottom: 1px solid #E7E7E7;
        }

        .nav_box .nav .back{
            display: inline-block;
            position: absolute;
            left:0.2rem;
            width:0.22rem;
            height:0.88rem;
            background: url(${base}/mobileNew/img/imf/jiantou.png)no-repeat center;
            background-size:0.22rem  0.4rem;
        }

        .seeArticle{
            width: 6.7rem;
            height:auto;
            margin: 0.4rem auto 0.4rem;
        }

        .seeArticle h3{
            width: 100%;
            height:0.4rem;
            line-height: 0.4rem;
            text-align: center;
            font-size: 0.28rem;
            color: #1A1A1A;
            margin-bottom: 0.4rem;
        }

        .seeArticle p{
            display: inline-block;
            width: 100%;
            font-size:0.28rem;
            color: #1A1A1A;
            line-height: 0.44rem;
            margin: 0.2rem auto;
        }

        .seeArticle h6{
            display: inline-block;
            width: 100%;
            font-size:0.28rem;
            color: #1A1A1A;
            line-height: 0.44rem;
            margin: 0.2rem auto;
        }

    </style>
</head>
<body>
<%--<div class="nav_box">
    <div class="nav">
        <a href="javascript:history.go(-1);" class="back"></a>
        信息披露
    </div>
</div>--%>
<div class="seeArticle">
    <h3>中国银监会办公厅关于印发网络借贷资金存管业务指引的通知</h3>
    <p>银监办发〔2017〕21号</p>
    <p>各银监局，各省、自治区、直辖市人民政府金融办（局），各大型银行、股份制银行，邮储银行，外资银行：</p>
    <p>为贯彻落实人民银行等十部门《关于促进互联网金融健康发展的指导意见》和中国银监会等四部门《网络借贷信息中介机构业务活动管理暂行办法》关于建立客户资金第三方存管制度的工作部署和要求，实现客户资金与网络借贷信息中介机构自有资金分账管理，防范网络借贷资金挪用风险，银监会研究制定了网络借贷资金存管业务指引，现印发给你们，请结合实际贯彻执行。</p>
    <p>2017年2月22日</p>
    <p>网络借贷资金存管业务指引</p>
    <h6>第一章 总  则</h6>
    <p>第一条 为规范网络借贷资金存管业务活动，促进网络借贷行业健康发展，根据《中华人民共和国合同法》、《中华人民共和国商业银行法》和《关于促进互联网金融健康发展的指导意见》、《网络借贷信息中介机构业务活动管理暂行办法》及其他有关法律法规，制定本指引。</p>
    <p>第二条 本指引所称网络借贷资金存管业务，是指商业银行作为存管人接受委托人的委托，按照法律法规规定和合同约定，履行网络借贷资金存管专用账户的开立与销户、资金保管、资金清算、账务核对、提供信息报告等职责的业务。存管人开展网络借贷资金存管业务，不对网络借贷交易行为提供保证或担保，不承担借贷违约责任。</p>
    <p>第三条 本指引所称网络借贷资金，是指网络借贷信息中介机构作为委托人，委托存管人保管的，由借款人、出借人和担保人等进行投融资活动形成的专项借贷资金及相关资金。</p>
    <p>第四条 本指引所称委托人，即网络借贷信息中介机构，是指依法设立，专门从事网络借贷信息中介业务活动的金融信息中介公司。</p>
    <p>第五条 本指引所称存管人，是指为网络借贷业务提供资金存管服务的商业银行。</p>
    <p>第六条 本指引所称网络借贷资金存管专用账户，是指委托人在存管人处开立的资金存管汇总账户，包括为出借人、借款人及担保人等在资金存管汇总账户下所开立的子账户。</p>
    <p>第七条 网络借贷业务有关当事机构开展网络借贷资金存管业务应当遵循“ 诚实履约、勤勉尽责、平等自愿、有偿服务”的原则。</p>
    <h6>第二章 委托人</h6>
    <p>第八条 网络借贷信息中介机构作为委托人，委托存管人开展网络借贷资金存管业务
        应符合《网络借贷信息中介机构业务活动管理暂行办法》及《网络借贷信息中介机构备案登记管理指引》的有关规定，包括但不限于在工商管理部门完成注册登记并领取营业执照、在工商登记注册地地方金融监管部门完成备案登记、按照通信主管部门的相关规定申请获得相应的增值电信业务经营许可等。</p>
    <p>第九条 在网络借贷资金存管业务中，委托人应履行以下职责：</p>
    <p>（一）负责网络借贷平台技术系统的持续开发及安全运营；</p>
    <p>（二）组织实施网络借贷信息中介机构信息披露工作，包括但不限于委托人基本信息、借贷项目信息、借款人基本信息及经营情况、各参与方信息等应向存管人充分披露的信息；</p>
    <p>（三）每日与存管人进行账务核对，确保系统数据的准确性；</p>
    <p>（四）妥善保管网络借贷资金存管业务活动的记录、账册、报表等相关资料，相关纸质或电子介质信息应当自借贷合同到期后保存5年以上；</p>
    <p>（五）组织对客户资金存管账户的独立审计并向客户公开审计结果；</p>
    <p>（六）履行并配合存管人履行反洗钱义务；</p>
    <p>（七）法律、行政法规、规章及其他规范性文件和网络借贷资金存管合同（以下简称存管合同）约定的其他职责。</p>
    <h6>第三章 存管人</h6>
    <p>第十条 在中华人民共和国境内依法设立并取得企业法人资格的商业银行，作为存管人开展网络借贷资金存管业务应符合以下要求:</p>
    <p>（一）明确负责网络借贷资金存管业务管理与运营的一级部门，部门设置能够保障存管业务运营的完整与独立；</p>
    <p>（二）具有自主管理、自主运营且安全高效的网络借贷资金存管业务技术系统；</p>
    <p>（三）具有完善的内部业务管理、运营操作、风险监控的相关制度；</p>
    <p>（四）具备在全国范围内为客户提供资金支付结算服务的能力；</p>
    <p>（五）具有良好的信用记录，未被列入企业经营异常名录和严重违法失信企业名单；</p>
    <p>（六）国务院银行业监督管理机构要求的其他条件。</p>
    <p>第十一条 存管人的网络借贷资金存管业务技术系统应当满足以下条件：</p>
    <p>（一）具备完善规范的资金存管清算和明细记录的账务体系，能够根据资金性质和用途为委托人、委托人的客户（包括出借人、借款人及担保人等）进行明细登记，实现有效的资金管理和登记；</p>
    <p>（二）具备完整的业务管理和交易校验功能,存管人应在充值、提现、缴费等资金清算环节设置交易密码或其他有效的指令验证方式，通过履行表面一致性的形式审核义务对客户资金及业务授权指令的真实性进行认证，防止委托人非法挪用客户资金；</p>
    <p>（三）具备对接网络借贷信息中介机构系统的数据接口，能够完整记录网络借贷客户信息、交易信息及其他关键信息，并具备提供账户资金信息查询的功能；</p>
    <p>（四）系统具备安全高效稳定运行的能力，能够支撑对应业务量下的借款人和出借人各类峰值操作；</p>
    <p>（五）国务院银行业监督管理机构要求的其他条件。</p>
    <p>第十二条 在网络借贷资金存管业务中，存管人应履行以下职责：</p>
    <p>（一）存管人对申请接入的网络借贷信息中介机构，应设置相应的业务审查标准，为委托人提供资金存管服务；</p>
    <p>（二）为委托人开立网络借贷资金存管专用账户和自有资金账户，为出借人、借款人和担保人等在网络借贷资金存管专用账户下分别开立子账户，确保客户网络借贷资金和网络借贷信息中介机构自有资金分账管理，安全保管客户交易结算资金；</p>
    <p>（三）根据法律法规规定和存管合同约定，按照出借人与借款人发出的指令或业务授权指令，办理网络借贷资金的清算支付；</p>
    <p>（四）记录资金在各交易方、各类账户之间的资金流转情况；</p>
    <p>（五）每日根据委托人提供的交易数据进行账务核对；</p>
    <p>（六）根据法律法规规定和存管合同约定，定期提供网络借贷资金存管报告；</p>
    <p>（七）妥善保管网络借贷资金存管业务相关的交易数据、账户信息、资金流水、存管报告等包括纸质或电子介质在内的相关数据信息和业务档案，相关资料应当自借贷合同到期后保存5年以上；</p>
    <p>（八）存管人应对网络借贷资金存管专用账户内的资金履行安全保管责任，不应外包或委托其他机构代理进行资金账户开立、交易信息处理、交易密码验证等操作；</p>
    <p>（九）存管人应当加强出借人与借款人信息管理，确保出借人与借款人信息采集、处理及使用的合法性和安全性；</p>
    <p>（十）法律、行政法规、规章及其他规范性文件和存管合同约定的其他职责。</p>
    <h6>第四章 业务规范</h6>
    <p>第十三条 存管人与委托人根据网络借贷交易模式约定资金运作流程，即资金在不同交易模式下的汇划方式和要求，包括但不限于不同模式下的发标、投标、流标、撤标、项目结束等环节。</p>
    <p>第十四条 委托人开展网络借贷资金存管业务，应指定唯一一家存管人作为资金存管机构。</p>
    <p>第十五条 存管合同至少应包括以下内容：</p>
    <p>（一）当事人的基本信息；</p>
    <p>（二）当事人的权利和义务；</p>
    <p>（三）网络借贷资金存管专用账户的开立和管理；</p>
    <p>（四）网络借贷信息中介机构客户开户、充值、投资、缴费、提现及还款等环节资金清算及信息交互的约定；</p>
    <p>（五）网络借贷资金划拨的条件和方式；</p>
    <p>（六）网络借贷资金使用情况监督和信息披露；</p>
    <p>（七）存管服务费及费用支付方式；</p>
    <p>（八）存管合同期限和终止条件；</p>
    <p>（九）风险提示；</p>
    <p>（十）反洗钱职责；</p>
    <p>（十一）违约责任和争议解决方式；</p>
    <p>（十二）其他约定事项。</p>
    <p>第十六条 委托人和存管人应共同制定供双方业务系统遵守的接口规范，并在上线前组织系统联网和灾备应急测试，及时安排系统优化升级，确保数据传输安全、顺畅。</p>
    <p>第十七条 资金对账工作由委托人和存管人双方共同完成，每日日终交易结束后，存管人根据委托人发送的日终清算数据，进行账务核对，对资金明细流水、资金余额数据进行分分资金对账、总分资金对账，确保双方账务一致。</p>
    <p>第十八条 存管人应按照存管合同的约定，定期向委托人和合同约定的对象提供资金存管报告，披露网络借贷信息中介机构客户交易结算资金的保管及使用情况，报告内容应至少包括以下信息：委托人的交易规模、借贷余额、存管余额、借款人及出借人数量等。</p>
    <p>第十九条 委托人暂停、终止业务时应制定完善的业务清算处置方案，并至少提前30个工作日通知地方金融监管部门及存管人，存管人应配合地方金融监管部门、委托人或清算处置小组等相关方完成网络借贷资金存管专用账户资金的清算处置工作，相关清算处置事宜按照有关规定及与委托人的合同约定办理。</p>
    <p>第二十条 委托人需向存管人提供真实准确的交易信息数据及有关法律文件,包括并不限于网络借贷信息中介机构当事人信息、交易指令、借贷信息、收费服务信息、借贷合同等。存管人不承担借款项目及借贷交易信息真实性的审核责任，不对网络借贷信息数据的真实性、准确性和完整性负责，因委托人故意欺诈、伪造数据或数据发生错误导致的业务风险和损失，由委托人承担相应责任。</p>
    <p>第二十一条 在网络借贷资金存管业务中，除必要的披露及监管要求外，委托人不得用“存管人”做营销宣传。</p>
    <p>第二十二条 商业银行担任网络借贷资金的存管人，不应被视为对网络借贷交易以及其他相关行为提供保证或其他形式的担保。存管人不对网络借贷资金本金及收益予以保证或承诺，不承担资金运用风险，出借人须自行承担网络借贷投资责任和风险。</p>
    <p>第二十三条 存管人应根据存管金额、期限、服务内容等因素，与委托人平等协商确定存管服务费，不得以开展存管业务为由开展捆绑销售及变相收取不合理费用。</p>
    <h6>第五章 附  则</h6>
    <p>第二十四条 网络借贷信息中介机构与商业银行开展网络借贷资金存管业务，应当依据《网络借贷信息中介机构业务活动管理暂行办法》及本指引，接受国务院银行业监督管理机构的监督管理。其他机构违法违规从事网络借贷资金存管业务的，由国务院银行业监督管理机构建立监管信息共享协调机制，对其进行业务定性，按照监管职责分工移交相应的监管部门，由监管部门依照相关规定进行查处；涉嫌犯罪的，依法移交公安机关处理。</p>
    <p>第二十五条 中国银行业协会依据本指引及其他有关法律法规、自律规则，对商业银行开展网络借贷资金存管业务进行自律管理。</p>
    <p>第二十六条 中国互联网金融协会依据本指引及其他有关法律法规、自律规则，对网络借贷信息中介机构开展网络借贷资金存管业务进行自律管理。</p>
    <p>第二十七条 对于已经开展了网络借贷资金存管业务的委托人和存管人，在业务过程中存在不符合本指引要求情形的，应在本指引公布后进行整改，整改期自本指引公布之日起不超过6个月。逾期未整改的，按照《网络借贷信息中介机构业务活动管理暂行办法》及《网络借贷信息中介机构备案登记管理指引》的有关规定执行。</p>
    <p>第二十八条 本指引解释权归国务院银行业监督管理机构。</p>
    <p>第二十九条 本指引自公布之日起施行。</p>
</div>
<script src="${base}/mobileNew/js/jquery-1.11.3.js"></script>
<script src="${base}/mobileNew/js/fontSize.js"></script>
</body>
</html>