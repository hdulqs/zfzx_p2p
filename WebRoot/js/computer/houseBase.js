//全局变量，对所有页面均有效 
//注意：所有数额均不能带引号！！

//通知存款年利率
var notifyYearDate1 = 0.81;  //提前一天通知
var notifyYearDate7 = 1.35;  //提前七天通知

//利息税
var interestRate = 0; 

//活期储蓄利率
var currentRate = 0.36;

//整存整取利率
var lumpRate90 = 1.91;  //三个月
var lumpRate180 = 2.20;  //半年
var lumpRate360 = 2.50;  //一年
var lumpRate720 = 3.25;  //两年
var lumpRate1080 = 3.85;  //三年
var lumpRate1800 = 4.20;  //五年

//整存零取
var smallRate360 = 1.71;  //一年
var smallRate1080 = 1.98;  //三年
var smallRate1800 = 2.25;  //五年

//零存整取
var slRate360 = 1.71;  //一年
var slRate1080 = 1.98;  //三年
var slRate1800 = 2.25;  //五年

//存本取息
var idRate360 = 1.71;  //一年
var idRate1080 = 1.98;  //三年
var idRate1800 = 2.25;  //五年

//个人贷款利率
var loadRate = 3.33; 


//个人所得税
var personUnexpectedRate = 0.2; //意外所得税 
var personPaperRate = 0.3; //稿酬所得 
var personTaxBase = 2000; //个税起征额 

//外汇储蓄利息税
var fxRateFee = 0;
//外汇储蓄汇率
var fxRateArray = [
//活期  七天通知  一个月  三个月  六个月  一年  二年 
[0.1000,0.1000,0.2500,0.4000,0.7500,1.0000,1.2000] , //*美元 
[0.1250,0.1750,0.2500,0.3500,0.6000,0.7500,0.7500], //英镑  
[0.1000,0.3750,0.4500,0.6500,0.9550,1.1000,1.1500], //*欧元  
[0.0001,0.0005,0.0100,0.0100,0.0100,0.0100,0.0100], //日元 
[0.0200,0.0200,0.1000,0.2500,0.5000,0.7000,0.7500], //港币 
[0.0100,0.0500,0.0500,0.0500,0.3000,0.4000,0.4000], //加拿大元 
[0.0001,0.0005,0.0100,0.0100,0.0100,0.0100,0.0100], //瑞士法郎 
[0.2375,0.2625,1.2400,1.3875,1.5075,1.5750,1.5750], //澳大利亚元 
[0.0001,0.0005,0.0100,0.0100,0.0100,0.0100,0.0100] //新加坡元 
];

//房贷利率
//1，2，3....为ID 再有利率变动增加时，需要递增
//title用户下拉框显示
//rate依次为 商贷 1～5年  商贷 5-30年  公积金 1～5年  公积金 5-30年
// isdefault: true, 为下拉框中的默认显示项

//商贷利率 1-5年  5-30年
var houseLoanBuzzRate = {



	
	1	: {
		title	: "14年11月21日利率下限(7折)",
		rate	: [ 0.0420, 0.0431]
	},
	2	: {
		title	: "14年11月21日利率下限(8折)",
		rate	: [ 0.0480, 0.0492]
	},
	3	: {
		title	: "14年11月21日利率下限(85折)",
		rate	: [ 0.0510, 0.0523]
	},	
	4	: {
		title	: "14年11月21日利率下限(9折)",
		rate	: [ 0.0540, 0.0554]
	},
	5	: {
		title	: "14年11月21日利率下限(95折)",
		rate	: [ 0.0570, 0.0584]
	},		
	6	: {
		title	: "14年11月21日基准利率",
		rate	: [ 0.0600, 0.0615]
	},
	7	: {
		title	: "14年11月21日利率上限(1.1倍)",
		rate	: [ 0.0660, 0.0676]
	},



	8	: {
		title	: "15年3月1日利率下限(7折)",
		rate	: [ 0.0403, 0.0413]
	},
	9	: {
		title	: "15年3月1日利率下限(8折)",
		rate	: [ 0.0460, 0.0472]
	},
	10	: {
		title	: "15年3月1日利率下限(85折)",
		rate	: [ 0.0489, 0.0502]
	},	
	11	: {
		title	: "15年3月1日利率下限(9折)",
		rate	: [ 0.0518, 0.0531]
	},
	12	: {
		title	: "15年3月1日利率下限(95折)",
		rate	: [ 0.0546, 0.0561]
	},		
	13	: {
                isdefault: true,
		title	: "15年3月1日基准利率",
		rate	: [ 0.0575, 0.0590]
	},
	14	: {
		title	: "15年3月1日利率上限(1.1倍)",
		rate	: [ 0.0633, 0.0649]
	}


												
};
//公积金贷款利率 1-5年  5-30年
var houseLoanCounRate = {


	1	: {
		title	: "12年7月6日后",
		rate	: [ 0.0400, 0.0450]
	},
	2	: {
		title	: "14年11月21日后",
		rate	: [ 0.0375, 0.0425]
	},
	3	: {
		isdefault: true,
		title	: "15年3月1日后",
		rate	: [ 0.0350, 0.0400]
	}
									
};
//首页右侧房贷利率
var houseLoanRateRight = [ 
["10.10.20后商贷基准", 5.96, 6.14],
["08.12.23后商贷基准", 5.76, 5.94],
["08.12.23后商贷8折", 4.61, 4.75],
["08.12.23后商贷7折", 4.03, 4.16],
["08.12.23后公积金贷", 3.33, 3.87],
["08.11.27后公积金贷", 3.51, 4.05] ];