<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>${systemConfig.metaTitle} - 经营场所认证</title>
<!-- 上传文件js开始-->
<link href="${base}/js/swfupload/scripts/swfupload/css/default.css" rel="stylesheet" type="text/css" />
<#include "/WEB-INF/template/${systemConfig.theme}/layout/all.ftl">
<script language= "javascript" src="${base}/js/swfupload/scripts/json.js"></script>
<script type="text/javascript" src="${base}/js/swfupload/scripts/swfupload/swfupload.js"></script>
<script type="text/javascript" src="${base}/js/swfupload/scripts/swfupload/swfupload.queue.js"></script>
<script type="text/javascript" src="${base}/js/swfupload/scripts/swfupload/fileprogress.js"></script>
<script type="text/javascript" src="${base}/js/swfupload/scripts/swfupload/swfuploadProperties.js"></script>
<script type="text/javascript" src="${base}/js/swfupload/scripts/swfupload/handlers.js"></script>
<!-- 上传文件js结束-->
<script type="text/javascript">

	function closeDiag(){
		 var id = document.getElementById("DiagId").value;
		 var loadid=$("#loadid").val();
		 var currentnode=$("#currentnode").val();
		 parent.document.getElementById("_DialogFrame_"+id).style.display = "none";
		 //隐藏table
		 parent.document.getElementById("_DialogTable_"+id).style.display = "none";
		 //去掉遮罩
		 fadeEffect(topWin.$id("_DialogBGMask"),0,0,isIE6?20:10);
		 //关闭后父窗体可点击
		 topWin.$id("_DialogBGDiv").style.cssText = "position:absolute;left:0px;top:0px;width:0;height:0;";
		 //刷新指定路径
		//parent.window.location.href="${base}/financePurchase/retPersonapplyUser.do?id="+loadid;
		parent.window.location.href="${base}/user/getNodeMemBpCustMember.do?menuNode="+currentnode+"&loadid="+loadid;
	}
	
</script>
</head>
<body >
	<div class="bpbox">
	<form>
	<h3>经营场所认证</h3>
    <p class="text">固定的经营场所是衡量借款人信用的<span style="color:red;">必要</span>依据。</p>
    <div id="attestSlide">
    <ul class="attes">
    	<h4>认证说明：</h4>
    	<li>（1）注册满1年的营业执照正副本照片<span class="sample"><a class="sample"title="经营执照正副本" href="${base}/theme/${systemConfig.theme}/images/samples/businesslisence.jpg">
                    <i style="font-style:normal;">   （点击样例）</i></a></span></li>
        <li>（2）经营场地租赁合同，及近90天的租金发票或水电缴费单据<span class="sample"> <a class="sample"title="经营租赁合同" href="${base}/theme/${systemConfig.theme}/images/samples/leasecontract.jpg">
                    <i style="font-style:normal;">   （点击样例）</i></a></span></li>
    </ul>
    <ul class="attes">
    	<h4>认证有效期：<span style="color:red;">6个月</span></h4>
    	<li>上传资料：请确认您上传的资料是清晰的、完整的、未经修改的数码照片或彩色扫描照片。每张图片大小不大于1.5M。</li>
    </ul>
    </div>
    <div class="picture">
    	<h4><span>*</span>上传经营场所证明：</h4>
       	<form id="form1" action="${base}/FileUploadServlet" method="post" enctype="multipart/form-data">
				<div>
					<div>
						<div class="fieldset flash" id="fsUploadProgress1">
							<span class="legend">上传文件列表</span>
							<input type="hidden" id="saveDataId1"/>
						</div>
						<div style="padding-left: 5px;">
							<span id="spanButtonPlaceholder1"></span>
							<input id="btnCancel1" type="hidden" value="Cancel Uploads" onClick="cancelQueue(upload1);" disabled="disabled" style="margin-left: 2px; height: 22px; font-size: 8pt;" />
						</div>
					</div>
				</div>
			</form>
         <form id="myForm" action="${base}/material/updateStateMaterial.do" method="post" >
         	
         <input type="hidden" value="${diagId}" name="diagId" id="DiagId"/>
         <input type="hidden" value="${loadid}" name="loadid" id="loadid"/>
         <input type="hidden" value="${currentnode}" name="currentnode" id="currentnode"/>
         <input type="hidden" value="CompanyPlace" name="type"/>
         <input type="button" class="btn"  onClick="closeDiag()" value="提交审核"/>
        </form>
         <div class="warn">
         <span>★注：</span>
         <br />
         升升投是一个信用交易平台。一旦发现用户上传的资料含有造假行为，升升投会将用户永久拉黑，适当情况下会进行依法披露。请让我们携手，为构建和谐诚信社会共同努力！
         </div>
    </div>
    </form>
</div>

<div id="blueimp-gallery" class="blueimp-gallery" style="display: none;">
        <div class="slides" style="width: 5464px;margin-top:40px;"></div>
        <h3 class="title"></h3>
        <a class="prev">‹</a>
        <a class="next">›</a>
        <a class="close">×</a>
        <a class="play-pause"></a>
        <ol class="indicator"></ol>
    </div>
    
<script type="text/javascript">
		var attestSlide = document.getElementById('attestSlide');
		attestSlide.onclick = function (event) {
            event = event || window.event;
            
            var target = event.target || event.srcElement,
                link = target.src ? target.parentNode : target,
                options = {index: link, event: event},
                links = this.getElementsByTagName('a');
                	if(target.tagName=='I'){                	
		            	blueimp.Gallery(links, options);
		            }
              
               
        };
</script>

</body>
</html>