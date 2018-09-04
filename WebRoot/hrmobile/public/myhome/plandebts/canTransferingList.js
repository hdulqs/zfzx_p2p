
//creditorList.js
Ext.define('hrmobile.public.myhome.plandebts.canTransferingList', {
    extend: 'mobile.List',
    name:'canTransferingList',
    constructor: function (config) {
    	config = config || {};
    	recordsitoInvestlist=new Array();
    	Ext.apply(config,{
    		modeltype:"canTransferingList",
    		flex:1,
    		width:"100%",
		    height:"100%",
			title:"<font color="+topColor+" style='font-size:"+topsize+"'>我要投资</font>",
    		items:[/*bottomBar*/],
    		pullRefresh: true,
		    listPaging: true,
		    isload:true,
		    loadfunction:function(this1,records){
		    	for (var i=records.length-1; i >= 0; i--) {  
				    recordsitoInvestlist.push( records[i] );  
		    	}  
					
		    },
    		fields:[ {
						name : 'bidPlanID'
					},{
						name : 'bidProName' //
					},{
						name : 'saleMoney' //
					},{
						name : 'yearAccrualRate' //
					},{
						name : 'intentDate' //
					},{
						name : 'startMoney' //
					},{
						name : 'loanLife' //
					},{
						name : 'bidProName' //
					},{
						name : 'progress' //
					},{
						name : 'state' //
					},{
						name : 'publishSingeTime' //
					},{
						name : 'bidInfoID' //
					},{
						name : 'preparesellTime' //orderNo
					},{
						name : 'orderNo' //orderNo
					},{
						name : 'startDate' //orderNo
					}],
    	        url : __ctxPath + '/creditFlow/financingAgency/canTransferingListPlBidSale.do',
	    		root:'result',
	    	    totalProperty: 'totalCounts',
	    	    params : {
						isMobile : "1"
			},
 	       pressedCls:'',
		   itemTpl: new Ext.XTemplate(
			   '<body>'+
					'<div class="container">'+
					    '<div class="content">'+
					        '<ul>'+
					            '<li class="box-white border-gray">'+
					                '<div class="box-content">'+
					                    '<div class="content_left lf"  onclick="javascript:Plbidplan({bidPlanID});">'+
					                        '<h3>'+
					                            '<img src="hrmobile/resources/imagesP2p/s_logo.png" alt="">' +
					                            '<i>{bidProName}</i>'+
					                            '<img src="hrmobile/resources/imagesP2p/quan.png" alt="">'+
					                            '<img src="hrmobile/resources/imagesP2p/new.png" alt="">'+
					                        '</h3>'+
					                        '<p style="font-size:16px;">'+
					                            '<span>项目年化</span>'+
					                            '<span>金额</span>'+
					                            '<span>期限</span>'+
					                        '</p>'+
					                        '<p style="font-size:16px;">'+
					                        	'<span><b class="text-red">{yearAccrualRate}%</b></span>'+
					                            '<span><b class="text-red">{saleMoney:this.saleMoney}</b><em>万</em></span>'+
					                            '<span><b class="text-red">{intentDate}</span>'+
					                        '</p>'+
					                    '</div>'+
					                    '<div class="content_right rg" style="margin-top:5%;">'+
					                        '<button onclick="javascript:feringseting({bidPlanID:\'{bidPlanID}\',orderNo:\'{orderNo}\'})">回款计划</button>'+
					                        '<button onclick="javascript:guapaijiaoyi({bidInfoID:\'{bidInfoID}\',yearAccrualRate:\'{yearAccrualRate}\',intentDate:\'{intentDate}\',startDate:\'{startDate}\',bidProName:\'{bidProName}\'})">挂牌交易</button>'+
					                    '</div>'+
					                '</div>'+
					            '</li>'+
					        '</ul>'+
					    '</div>'+
					'</div>'+
				'</body>'
                     ,{
		    			saleMoney: function(saleMoney) {
		    				return saleMoney/10000;
						}
					})
    	});
       
    	this.callParent([config]);
    	Plbidplan =function(bidPlanID){
		     		Ext.Ajax.request({
					url: __ctxPath +"/creditFlow/financingAgency/bidPlanDetailPlBidPlan.do",
					 params : {
						isMobile : "1",
						bidId:bidPlanID
			         },
				     success : function(response) {
				    	var responseText1=response.responseText.replace(/[\n]/ig,'');
				    	var responseText = Ext.util.JSON.decode(responseText1);
				    	var data=responseText.data;
				    	var listMaterials=responseText.listMaterials;
				    	var enterPrise = responseText.enterPrise;
				    	var pltype = responseText.pltype;
				    	var proDes = responseText.proDes;
				    	hidebottomBarIndex();
				    	mobileNavi.push(Ext.create('hrmobile.public.myhome.bidDetail',{data:data,listMaterials:listMaterials,enterPrise:enterPrise,proDes:proDes,pltype:pltype}));
		            }});
		}
    	
    	
    	feringseting =function(data) {
    	 	var orderNo =data.orderNo;
    	 	var bidPlanID =data.bidPlanID;
         	var url=__ctxPath +"/user/paymentplanBpCustMember.do?str="+bidPlanID+",Financing,"+orderNo;
         	mobileNavi.push(Ext.create('hrmobile.public.myhome.planbid.Paymentplan',{url:url}));
    	 }
    	guapaijiaoyi =function(data) {
    		mobileNavi.push(Ext.create('hrmobile.public.myhome.plandebts.buyplanbid',{data:data}));
    	 }
    },
    a:function(e){}
});
