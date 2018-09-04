var result,
	data,
	enterPrise,
	bpP1,
	bpP2,
	bpB1,
	bpB2,
	bp_PB,
	planKeep,
	userName,
	content1,
	content2;
Ext.define('hrmobile.public.myhome.Rmmplan.Rmmdetail', {
	extend : 'Ext.Container',
	name : 'Rmmdetail',
	constructor : function(config) {

		// 获取data数据
		data = config.data;
		
		// 获取企业数据
		enterPrise = config.enterPrise;
		
		// li样式
		var liStyle = [
			'height: initial;' +
			'padding: 10px 0;',
			'overflow: hidden;'
		].join('');
		

		// span样式
		var span2 = [
			'width:66%;' +
			'word-break:break-all;' +
			'text-align:left;'
			//'color:' + btnBg +  ';'
		].join('');
		
		// 个人或企业
		bp_PB = my.isObjEmpty(data,'bpPersionDirPro') || my.isObjEmpty(data,'bpPersionOrPro') || my.isObjEmpty(data,'bpBusinessDirPro')  || my.isObjEmpty(data,'bpBusinessOrPro');
		
		// 企业的项目信息/担保信息/风险控制
		planKeep = my.isObjEmpty(bp_PB,'plPersionDirProKeep') || my.isObjEmpty(data,'plPersionOrProKeep') || my.isObjEmpty(bp_PB,'plBusinessDirProKeep')  || my.isObjEmpty(bp_PB,'plBusinessOrProKeep');
		
		// 获取变量里不同的参数进行判断
		switch (data.proType) {
			// 如果是个人信息
			case "P_Dir":
				userName = my.isObjEmpty(bp_PB, 'loginName' ,'未填写', isSubName((bp_PB['loginName']), 2, 4));
				break;
			case "P_Or":
				userName = my.isObjEmpty(bp_PB, 'persionName' ,'未填写', isSubName((bp_PB['persionName']), 2, 4));
				break;
			// 如果是企业信息
			case "B_Dir":
					bpB1 = enterPrise;
					bpP2 = data.bpBusinessDirPro.plBusinessDirProKeep;
				break;
			case "B_Or":
					bpB1 = enterPrise;
					bpB2 = data.bpBusinessOrPro.plBusinessDirProKeep;
				break;
		}
		
		
		// 动态添加li封装函数
		function addLiEle (labelText, text, id) {
			// 判断是否需要传id
			var id = id || '';
			
			// 获取动态li
			var li = '<li class="biddetailli">' +
						'<span class="left biddetailleft">' +
							labelText +
						':</span>' +
						'<span class="biddetailspanreighr" id="' + id + '">' +
			 				text +
			 		'</span>' +
			 		'</li>'
			return li;
		}
		
		// 动态添加项目信息li封装
		function addinfoLiEle(labelText, text) {
			// 获取动态li
			var li = '<li style="' + liStyle + '" class="biddetailli1">' +
			           	 '<span class="biddetailleft left">' +
			           	 	labelText +
			           	 ':</span>' +
			           	 '<span class="biddetailspanreighr" style="' + span2 + '">'+ 
			           	 	text +
			           	 '</span>' +
			           	'</li>'
			   return li;
		}
		
		// 如果是P_Or和P_Dir类型,进入以下代码块
		if (data.proType == "P_Or" || data.proType == "P_Dir") {
			Ext.apply(config, {
				title : "<font color=" + topColor + " style='font-size:"
						+ topsize + "'>基本信息</font>",
				name : 'menu',
				scrollable : {
					direction : 'vertical'
				},
				items : [{
					xtype : 'container',
					items : [{
						xtype : 'label',
						html : '<body class="fill">' +
								 '<div style="font-size:17px;color:#000;color:' + listColor + ';">' +
								 		'<div style=" margin:10px">基本信息</div>' +
								 '</div>' +
								 '<nav class="assets-nav assets1-top">' +
								 	'<ul>' +
									// 个人基本信息persionDirBid_content.ftl 或 persionOrBid_content.ftl
									addLiEle("用户名",(my.isObjEmpty(bp_PB, 'userName','未填',isSubName(bp_PB['loginName'], 2))), 'userName') +
									addLiEle("年龄",(my.isObjEmpty(bp_PB, 'age','未填'))) +
									addLiEle("学历",(my.isObjEmpty(bp_PB, 'education','未填'))) +
									addLiEle("学校",(my.isObjEmpty(bp_PB, 'educationSchool','未填'))) +
//									addLiEle("婚姻",(my.isObjEmpty(bp_PB, 'marriage','未填'))) +
									addLiEle("月收入",(my.isObjEmpty(bp_PB, 'monthIncome','未提供'))) +
									addLiEle("主要财务",(my.isObjEmpty(planKeep, 'mainFinance','未填'))) +
									
									addLiEle("公司行业",(my.isObjEmpty(bp_PB, 'companyIndustry','未填'))) +
									addLiEle("公司规模",(my.isObjEmpty(bp_PB, 'companyScale','未填'))) +
									addLiEle("岗位职位",(my.isObjEmpty(bp_PB, 'position','未填'))) +
								 	addLiEle("工作城市",(my.isObjEmpty(bp_PB, 'workCity','未填'))) +
								 	addLiEle("工作时间",(my.isObjEmpty(bp_PB, 'workTime','未填'))) +
								 	addLiEle("主要债务",(my.isObjEmpty(planKeep, 'mainDebt','未填'))) +
//									addLiEle("工作单位",(my.isObjEmpty(bpP1, 'currentcompany','未填',isSubWorkUnit))) +
								 '</ul>' +
								 '</nav>' +
								/*'<div style="font-size:17px;color:#000;color:' + listColor + ';">' +
								'    <div style="margin:10px">' +
								'        信用评级' +
								'    </div>' +
								'</div>' +
								'<nav' +
								'    class="assets-nav assets1-top">' +
								'    <ul>' +
								'        <li class="biddetailli">' +
								'            <span' +
								'                style="float: left; margin-left: 3%; color:#f5f508; font-size: 21px;">' +
								               (bpP2.plKeepCreditlevel.remark == null || bpP2.plKeepCreditlevel.remark == "" ? "未填" :bpP2.plKeepCreditlevel.remark) +
								'            </span>' +
								'        </li>' +
								'    </ul>' +
								'</nav>' +*/

								// 项目信息
								 '<div style="font-size:17px;color:#000;color:' +
								  		listColor +
								 	';">' +
								 	'<div style=" margin:10px">' +
								 		'项目信息' +
								 	'</div>' +
								 '</div>'+
							    '<nav class="assets-nav assets1-top">'+
							        '<ul>'+
							        	addinfoLiEle("项目描述",(my.isObjEmpty(planKeep, 'proDes','未填'))) +
							            addinfoLiEle("资金用途",(my.isObjEmpty(planKeep, 'proUseWay','未填'))) +
							            addinfoLiEle("还款来源",(my.isObjEmpty(planKeep, 'proPayMoneyWay','未填'))) +
							        '</ul>'+
							    '</nav>'+
							    
							    
							    // 风险控制
							    '<div style="font-size:17px;color:#000;color:' + listColor + ';">' +
								 	'<div style=" margin:10px">' +
								 		'风险控制' +
								 	'</div>' +
								 '</div>'+
							    '<nav class="assets-nav assets1-top">'+
							        '<ul>'+
							       		 '<li style="' + liStyle + '" class="biddetailli1">' +
							           	 '<span class="biddetailspanreighr" style="width: 93%; word-break: break-all; text-align: left;text-indent: 2rem;">'+ 
							           	 	(my.isObjEmpty(planKeep, 'proRiskCtr','未填'))  +
							           	 '</span>' +
							           	'</li>'+
							        '</ul>'+
							    '</nav>'+
	
								/*'<div style="font-size:17px;color:#000;color:' + listColor +  ';">' +
								'    <div style="margin:10px">' +
								'        风险控制' +
								'    </div>' +
								'</div>' +
								'<nav' +
								'    class="assets-nav assets1-top">' +
								'    <ul>' +
								'        <li class="biddetailli" style="margin-bottom: 0px;">' +
								'            <span' +
								'                class="biddetailspanreighr">' +
								'                (bpP2.proRiskCtr == null || bpP2.proRiskCtr == "" ?' +
								'                "未填" : bpP2.proRiskCtr)' +
								'            </span>' +
								'        </li>' +
								'    </ul>' +
								'</nav>' +*/

								'</body>',
						aaa : function() {
							var companyIndustry = bpP1.companyIndustry;
							if (companyIndustry.length > 15) {
								return companyIndustry.substr(0, 15);
							} else {
								return companyIndustry;
							}
						}
					}],
					listeners : {
						// 缩放事件
						resize : function () {
							$('#userName').html(userName);
							
						},
						
						// 页面加载事件
						painted : function() {
							// 数据全部颜色
							//$('li.biddetailli').find('span:eq(1)').css('color', '#FF7626');
							$('span.TextColor').css('color','');
						}
					}
				}]
			});
		}
		// 如果类型是B_Or和B_Dir 进入以下企业代码块
		if (data.proType == "B_Or" || data.proType == "B_Dir") {
			Ext.apply(config, {
				title : "<font color=" + topColor + " style='font-size:"
						+ topsize + "'>基本信息</font>",
				name : 'menu',
				scrollable : {
					direction : 'vertical'
				},
				items : [{
					xtype : 'container',
					items : [{
						xtype : 'label',
						html : '<body class="fill">'
								+ '<div style="font-size:17px;color:#000;color:' + listColor + ';"' +
										'><div style=" margin:10px">企业基本信息</div>' +
									'</div>'
								+ '<nav class="assets-nav assets1-top">' +
								 '<ul>' +
									// 企业基本信息 businessDirBid_content.ftl 或 businessOrBid_content.ftl
									addLiEle("企业名称",(my.isObjEmpty(bpB1, 'enterprisename','未填', isSubName((bpB1['enterprisename']), 2, 6)))) +
									addLiEle("注册资金",(my.isObjEmpty(bpB1, 'registermoney','未填', '万元'))) +
									addLiEle("经营所在地",(my.isObjEmpty(bpB1, 'managecityName','未填'))) +
									addLiEle("经营范围",(my.isObjEmpty(bpB1, 'proBusinessScope','未填'))) +
									addLiEle("主要财务",(my.isObjEmpty(bpB1, 'mainFinance','未填'))) +
									
									addLiEle("所有制性质",(my.isObjEmpty(bpB1, 'ownership','未填'))) +
									addLiEle("注册时间",(my.isObjEmpty(bpB1, 'opendate','未填'))) +
									addLiEle("行业",(my.isObjEmpty(bpB1, 'hangyeName','未填'))) +
									addLiEle("经营描述",(my.isObjEmpty(bpB1, 'proBusinessStatus','未填'))) +
									addLiEle("主要债务",(my.isObjEmpty(bpB1, 'mainDebt','未填'))) +
								 '</ul>' +
								'</nav>' +
								
								/*'<div style="font-size:17px;color:#000;color:red;">' +
								'    <div style=" margin:10px">' +
								'        信用评级' +
								'    </div>' +
								'</div>' +
								'<nav class="assets-nav assets1-top">' +
								'    <ul>' +
								'        <li class="biddetailli" style="margin-bottom: 0px;">' +
								'            <span' +
								'                class="biddetailspanreighr">' +
								                (bpP2.proRiskCtr==null||bpP2.proRiskCtr == "" ? "未填":bpP2.proRiskCtr) +
								'            </span>' +
								'        </li>' +
								'    </ul>' +
								'</nav>' +*/

								 // 项目信息
								 '<div style="font-size:17px;color:#000;color:' +
								  		listColor +
								 	';">' +
								 	'<div style=" margin:10px">' +
								 		'项目信息' +
								 	'</div>' +
								 '</div>'+
							    '<nav class="assets-nav assets1-top">'+
							        '<ul>'+
							        	addinfoLiEle("项目描述",(my.isObjEmpty(planKeep, 'proDes','未填'))) +
							            addinfoLiEle("资金用途",(my.isObjEmpty(planKeep, 'proUseWay','未填'))) +
							            addinfoLiEle("还款来源",(my.isObjEmpty(planKeep, 'proPayMoneyWay','未填'))) +
							        '</ul>'+
							    '</nav>'+
							    
							     // 担保信息
								 '<div style="font-size:17px;color:#000;color:' +
								  		listColor +
								 	';">' +
								 	'<div style=" margin:10px">' +
								 		'担保信息' +
								 	'</div>' +
								 '</div>'+
							    '<nav class="assets-nav assets1-top">'+
							        '<ul>'+
							        	addinfoLiEle("担保公司名称",(my.isObjEmpty(planKeep, 'guarantorsName','未填'))) +
							            addinfoLiEle("担保说明",(my.isObjEmpty(planKeep, 'guarantorsAdvise','未填'))) +
							            addinfoLiEle("担保机构简介",(my.isObjEmpty(planKeep, 'guarantorsDes','未填'))) +
							        '</ul>'+
							    '</nav>'+
							    
							    // 风险控制
							    '<div style="font-size:17px;color:#000;color:' + listColor + ';">' +
								 	'<div style=" margin:10px">' +
								 		'风险控制' +
								 	'</div>' +
								 '</div>'+
							    '<nav class="assets-nav assets1-top">'+
							        '<ul>'+
							       		 '<li style="' + liStyle + '" class="biddetailli1">' +
							           	 '<span class="biddetailspanreighr" style="width: 93%; word-break: break-all; text-align: left;text-indent: 2rem;">'+ 
							           	 	(my.isObjEmpty(planKeep, 'proRiskCtr','未填'))  +
							           	 '</span>' +
							           	'</li>'+
							        '</ul>'+
							    '</nav>'+
								'</body>'
					}]
				}],
					listeners : {
						// 页面加载事件
						painted : function() {
							// 数据全部颜色
//							$('li.biddetailli').find('span:eq(1)').css('color', '#FF7626');
							
							$('span.TextColor').css('color','');
						}
					}
			});
		}
		this.callParent([config]);
		
		
		listxinghao = function(userName) {
			var userName = userName;
			if (userName.length > 4) {
				var content2 = userName.toString().substring(
						userName.length - 2, userName.length);
				var content1 = userName.toString().substring(0, 2);
				userName = content1 + "****" + content2;
				return userName;
			}
		}
	}

});