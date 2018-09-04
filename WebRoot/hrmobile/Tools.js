
/**
 * 扩展 container
 * by cjj
 */
Ext.override(Ext.Container, {  
    getCmpByName : function(name) {  
        var getByName = function(container, name) {  
            var items = container.items;  
            if (items != null) {  
                for (var i = 0; i < items.getCount(); i++) {  
                    var comp = items.get(i);
                    var cp = getByName(comp, name);  
                    if (cp != null)  
                        return cp;
                    if (comp.getName && name == comp.getName()) {  
                        return comp;  
                        break;  
                    }
                    if(comp._itemId&&comp._itemId==name){
                    	return comp;
                    }
                }  
            }  
            return null;  
        };  
        return getByName(this, name);  
    },
    
    validate:function(fileds) {
    	
    	var isWrong = false;
    	for (var i = 0; i < fileds.length; i++) {
    		var item = fileds.get(i);
    		if(isInputFiled(item)){
	    		if (item.getRequired()&& isEmpty(item.getValue())) {
	    			isWrong = true;
	    			item.setStyle(wrongStyle);
	    		}
	    		var thisStyle = item.getStyle();
	    		if (!Ext.isEmpty(thisStyle) && thisStyle.indexOf(rightStyle)<0) {
	    			isWrong = true;
	    		}
    		}else{
    			if(item.xtype=='fieldset'){
    				isWrong = !this.validate(item.items);
    			}
    		}
    	}
    	if (isWrong) {
    		Ext.Msg.alert("警告", "数据录入不正确");
    		return false;
    	}

    	return true;
    }
    
});

Ext.override(Ext.MessageBox, {  
	statics: {
        OK    : {text: '确定',     itemId: 'ok',  ui: 'action'},
        YES   : {text: '是',    itemId: 'yes', ui: 'action'},
        NO    : {text: '否',     itemId: 'no'},
        CANCEL: {text: '取消', itemId: 'cancel'},

        INFO    : Ext.baseCSSPrefix + 'msgbox-info',
        WARNING : Ext.baseCSSPrefix + 'msgbox-warning',
        QUESTION: Ext.baseCSSPrefix + 'msgbox-question',
        ERROR   : Ext.baseCSSPrefix + 'msgbox-error',

        OKCANCEL: [
            {text: '取消', itemId: 'cancel'},
            {text: '确定',     itemId: 'ok',  ui : 'action'}
        ],
        YESNOCANCEL: [
            {text: '取消', itemId: 'cancel'},
            {text: '否',     itemId: 'no'},
            {text: '是',    itemId: 'yes', ui: 'action'}
        ],
        YESNO: [
            {text: '否',  itemId: 'no'},
            {text: '是', itemId: 'yes', ui: 'action'}
        ]
	}
});

Ext.define('mobile.FormTextField', {
	extend: 'Ext.field.Text',
	xtype: 'formTextfield',
	constructor: function (config) {
		var validate = config.validate;
		Ext.apply(config,{
			listeners : {
				scope : this,
				'blur' : function(cop, e, eOpt) {
					this.blurValidate(cop, e, eOpt, validate);
				}
			}
		});
		this.callParent([config]);
	},
	
	wrongStyle:"background:#d71345",
	rightStyle:"background:#fff",
	
    blurValidate:function(filed, e, eOpt, matchValue) {
    	var mobileValue = filed.getValue();
    	if (isStringEmpty(mobileValue)) {
    		if (!filed.getRequired()) {
    			filed.setStyle(this.rightStyle);
    		} else {
    			filed.setStyle(this.wrongStyle);
    		}
    	} else {
    		if (!mobileValue.match(matchValue)) {
    			filed.setStyle(this.wrongStyle);
    		} else {
    			filed.setStyle(this.rightStyle);
    		}
    	}
    }
	
});

// 底部工具条
Ext.define('mobile.ButtomToolBar', {
	extend : 'Ext.Toolbar',
	name : "buttomToolBar",
	constructor : function(config) {
		config = config || {};
		Ext.apply(config, {
			docked : 'bottom',
			items : [
			    {
					xtype : 'spacer'
				},{
					xtype : 'spacer'
				},{
					xtype : 'button',
					html : config.leftButtonName,
					handler:config.leftHandler,
					hidden:config.lhidden
				},
				{
					xtype : 'button',
					html : config.rightButtonName,
					handler:config.rightHandler,
					hidden:config.rhidden,
					margin:"0 0 0 3"
				},{
					xtype : 'spacer'
				}, {
					xtype : 'spacer'
				}
			]
		});

		this.callParent([config]);
	}
});

/**
 * 扩展list
 * by cjj
 */
Ext.define('mobile.List', {
    extend: 'Ext.List',
    name: 'htList',
    constructor: function (config) {
	config = config || {};
	this.username = config.username;
	Ext.define('taskItem'+config.modeltype, {
		extend: 'Ext.data.Model',
		config: {
			fields: config.fields
		}
	});
		
		this.store = Ext.create('Ext.data.Store', {
			model: 'taskItem'+config.modeltype,
			sorters : config.sorters,
		//	params:config.params,
			grouper : {
						groupFn : function(record) {
							var groupedFiled=config.groupedFiled;
							if(config.grouped){
								if(config.isGroupedAll){
									return record.get(groupedFiled);
								}else{
									return toPinYin(record.get(groupedFiled))[0][0];
								}
								
							}
							return '';
						}
					},
			proxy: {
		        type: "ajax",
		        url : config.url,
	            actionMethods: {
	                create : 'POST',
	                read   : 'POST', 
	                update : 'POST',
	                destroy: 'POST'
	            },
	            extraParams: config.params,
		        reader: {
		            type: "json",
		            rootProperty: config.root,
		           	totalProperty: config.totalProperty
		        }
		    },
			pageSize:limit,
		    autoLoad: true
		});
		if(!Ext.isEmpty(config.isload)){
		 this.store.addListener('load',function(this1, records, successful, operation, eOpts ){
		 	config.loadfunction(this1,records);
		 })
		
		}
		//设置定时器 每隔5分钟就重新刷新list数据
		var me=this;
	/*	window.setInterval(function(){
			me.store.loadPage(1);
		},1000*60*5);*/
		this.searchCol = config.searchCol;
		this.selfSearch = config.selfSearch;
		
		var toolbars = [];
		
		var topToolbar = config.topToolbar;
		if(typeof this.searchCol!='undefined'){
			topToolbar = Ext.create('Ext.Toolbar', {
	            docked: 'top',
		        items: [
		            {xtype:'spacer'},
		            {
		                xtype: 'searchfield',
		                placeHolder: ' 搜索...',
		                name:'searchField',
		                flex:3
		            },
		            {
		                xtype: 'button',
			            iconCls: 'search',
			            iconMask: true,
		                scope:this,
		                flex:.5,
		                handler: typeof selfSearch != 'undefined'? selfSearch:this.onSearchTask
		            },
		            {xtype:'spacer'}
		        ]
			});
			toolbars.push(topToolbar);
		}
		
		var bottomToolbar = config.bottomToolbar;
		if(typeof bottomToolbar!='undefined'){
			toolbars.push(bottomToolbar);
		}
		//取消store分组
		var isGrouper = config.grouped;
		if(!isGrouper){
			this.store.setGrouper(null);
		}
		var plugins = [];
		// 下拉刷新
		var pullRefresh = config.pullRefresh;
		if(pullRefresh){
			plugins.push({
	        	xclass: 'Ext.plugin.PullRefresh',
	        	pullRefreshText: '下拉刷新',
	            releaseRefreshText: '释放刷新',
	            lastUpdatedText: '上次刷新:',
				loadingText: '<font style="font-size:13px">请稍候</font>',
	        	list:this.store,
	        	refreshFn:this.refreshStore
	         });
		}
		// 分页
		var listPaging = config.listPaging;
		if(listPaging){
			plugins.push({
				xclass: 'Ext.plugin.ListPaging',
	        	loadMoreText:'<span class="noMoreRecordsText">查看更多</span>',
	        	noMoreRecordsText:'<span class="noMoreRecordsText">没有更多数据</span>'
	        	
			});
		}
         if(!Ext.isEmpty(config.items)){
            config.items.forEach(function(e){  
	          toolbars.push(e);
	        }) 
         	
         }
    	Ext.apply(config,{
    	    selectedCls:'listitems_select',
		    fullscreen: true,
		    store: this.store,
            items: toolbars,
            emptyText: '<div class="noMoreRecordsText" style="margin-top:20px">暂无数据</div>',
		    plugins: plugins
		//    items:config.items
    	});
    	
    	if (typeof config.useSelect != 'undefined' && config.useSelect) {
			var isSelectAll=true;
			var hasBottmToolbar=!Ext.isEmpty(config.bottomToolbar);
			Ext.apply(config, {
				editCls : 'simpleList',
				// 是否在多选状态（不可更改）
				isSimple : false,
				// 设置数据主键(可配置)
				ckId : 'id',
				// 加上这个 ，如果不加 会出现 bug
				onItemDisclosure: false,
				// 多选时弹出菜单栏(可配置)
				simpleToolBar : {
					// 默认位置
					docked : 'bottom',
					items : [{
								xtype : 'button',
								text : '全选',
								align : 'left',
								listeners : {
									tap : function(button) {
										var list = button.up('list');
										if (isSelectAll) {
											this.setText('取消全选');
											list.selectAll();
										} else {
											this.setText('全选');
											list.deselectAll();
										}
										isSelectAll = !isSelectAll;
									}
								}
							}, {
								cls : 'moreButton',
								xtype : 'button',
								text : '取消',
								align : 'right',
								listeners : {
									tap : function(button) {
										var list = button.up('list');
										// 移除多选栏
										this.getParent().getParent().hide();
										//显示添加栏
										if (hasBottmToolbar) {
											this.getParent().getParent()
													.getParent().config.bottomToolbar
													.show();
										}
										this.getParent().getParent().destroy();
										// 结束多选
										list.endSimple();
										isSelectAll=true;
									}
								}
							}, {
								cls : 'moreButton',
								xtype : 'button',
								text : config.buttonText,
								align : 'right',
								listeners : {
									tap : function(button) {
										var list = button.up('list');
										var items = list.getSelection();
										// 获取选中项
										var values = [];
										var returnFileds=list.config.returnFileds;
										var hasReturnFileds=!Ext.isEmpty(returnFileds);
										if(hasReturnFileds){
											values="{";
											for(var i=0,field;field=returnFileds[i];i++){
												values+="\""+field+"\":[],";
											}
											values=values.substring(0,values.length-1);
											values+="}";
											values=Ext.util.JSON.decode(values);
										}
										for (var i = 0, item; item = items[i]; i++) {
											if(hasReturnFileds){
												for(var j=0;j<returnFileds.length;j++){
													var temp=values[returnFileds[j]];
													temp.push(item.data[returnFileds[j]]);
												}
											}else{
												values.push(item.data[list.config.ckId]);
											}
										}
										var thisBar=this.getParent().getParent();
										// 移除多选边栏
										if (!Ext.isEmpty(values)) {
											Ext.Msg.show({
												message : '确认操作？',
												width : 300,
												buttons : [{
															text : '确定',
															itemId : '1'
														}, {
															text : '取消',
															itemId : '0'
														}],
												fn : function(itemId) {
													if (itemId != '0') {
														thisBar.hide();
														if (hasBottmToolbar) {
															thisBar.getParent().config.bottomToolbar.show();
														}
														thisBar.getParent().config.doneSuccess(values);
														thisBar.destroy();
														// 结束多选
														list.endSimple();
													}
												}
											});
										} else {
											Ext.Msg.alert("警告", "请选择数据");
										}
										isSelectAll=true;
									}
								}
							}]
				},
				listeners : {
					// 监控是否在多选状态
					itemtap : function(list, index, target, record, e) {
						// 如果在多选状态停止后续事件的执行
						if (this.config.isSimple) {
							e.stopEvent();
						}
					},
					itemsingletap : function(list, index, target, record, e) {
						if (!Ext.isEmpty(this.config.itemsingletap)) {
							this.config.itemsingletap(list, index, target,record);
						}
					},
					// 只要按键长按住就会触发，和按键是否离开没有关系
					itemtaphold : function(list, index, target, record, e) {
						// 开始多选
						this.beginSimple();
					},
					initialize : function(list,opra){
						if(this.config.selectWhenIN){
							this.beginSimple();
						}
					}
				}
			});
		}
		var me=this;
		me.callParent([config]);
//		window.setInterval(function(){
//				me.callParent([config]);
//		},2000);
    	
    },
    
    // 进入多选状态
	beginSimple : function() {
		if (!this.config.isSimple) {
			// 取消全选
			this.deselectAll();
			// 进入多选模式
			this.setMode('SIMPLE');
			// 添加css
			this.addCls(this.config.editCls);
			// 显示OnItemDisclosure
			this.setOnItemDisclosure(true);
			// 加入标记，以便在itemtap事件中进行判定
			this.config.isSimple = true;
			//隐藏标记栏
			if(!Ext.isEmpty(this.config.bottomToolbar)){
			    this.config.bottomToolbar.hide();
			}
			// 添加多选边栏
			this.add(this.getSimpleToolBar());
		}
	},// 获取多选边栏
	getSimpleToolBar : function() {
		var simpleToolBar = Ext.create('Ext.TitleBar',
				this.config.simpleToolBar);
		return simpleToolBar;
	},
	// 结束多选模式
	endSimple : function() {
		console.log('endSimple');
		// 取消全选
		this.deselectAll();
		// 进入单选模式
		this.setMode('SINGLE');
		// 移除css
		this.removeCls(this.config.editCls);
		// 隐藏OnItemDisclosure
		this.setOnItemDisclosure(false);
		// 加入标记，以便在itemtap事件中进行判定
		this.config.isSimple = false;
	},
	// 更新OnItemDisclosure需要
	updateOnItemDisclosure : function(newConfig, oldConfig) {
		if (oldConfig == null) {
			return;
		}
		var items = this.listItems;
		for (var i = 0, ln = items.length; i < ln; i++) {
			var dItem = items[i].getDisclosure();
			newConfig === false ? dItem.hide() : dItem.show();
		}
	},
    
    onSearchTask:function(){
    	var searchVal = this.down('toolbar').getCmpByName('searchField');
    	this.store.getProxy().setExtraParam(this.searchCol, searchVal.getValue());
		this.store.loadPage(1);
    },
    
    refreshStore:function(config){
    	var store = config.config.list;
    	store.loadPage(1);
    }

});



Ext.define('mobileloan.List', {
    extend: 'Ext.List',
    name: 'htList',
    constructor: function (config) {
	config = config || {};
	this.username = config.username;
	Ext.define('taskItem'+config.modeltype, {
		extend: 'Ext.data.Model',
		config: {
			fields: config.fields
		}
	});
		
		this.store = Ext.create('Ext.data.Store', {
			model: 'taskItem'+config.modeltype,
			sorters : config.sorters,
		//	params:config.params,
			grouper : {
						groupFn : function(record) {
							var groupedFiled=config.groupedFiled;
							if(config.grouped){
								if(config.isGroupedAll){
									return record.get(groupedFiled);
								}else{
									return toPinYin(record.get(groupedFiled))[0][0];
								}
								
							}
							return '';
						}
					},
			proxy: {
		        type: "ajax",
		        url : config.url,
	            actionMethods: {
	                create : 'POST',
	                read   : 'POST', 
	                update : 'POST',
	                destroy: 'POST'
	            },
	            extraParams: config.params,
		        reader: {
		            type: "json",
		            rootProperty: config.root,
		           	totalProperty: config.totalProperty
		        }
		    },
			pageSize:limit,
		    autoLoad: true
		});
		if(!Ext.isEmpty(config.isload)){
		 this.store.addListener('load',function(this1, records, successful, operation, eOpts ){
		 	config.loadfunction(this1,records);
		 })
		
		}
		//设置定时器 每隔5分钟就重新刷新list数据
		var me=this;
	/*	window.setInterval(function(){
			me.store.loadPage(1);
		},1000*60*5);*/
		this.searchCol = config.searchCol;
		this.selfSearch = config.selfSearch;
		
		var toolbars = [];
		
		var topToolbar = config.topToolbar;
		if(typeof this.searchCol!='undefined'){
			topToolbar = Ext.create('Ext.Toolbar', {
	            docked: 'top',
		        items: [
		            {xtype:'spacer'},
		            {
		                xtype: 'searchfield',
		                placeHolder: ' 搜索...',
		                name:'searchField',
		                flex:3
		            },
		            {
		                xtype: 'button',
			            iconCls: 'search',
			            iconMask: true,
		                scope:this,
		                flex:.5,
		                handler: typeof selfSearch != 'undefined'? selfSearch:this.onSearchTask
		            },
		            {xtype:'spacer'}
		        ]
			});
			toolbars.push(topToolbar);
		}
		
		var bottomToolbar = config.bottomToolbar;
		if(typeof bottomToolbar!='undefined'){
			toolbars.push(bottomToolbar);
		}
		//取消store分组
		var isGrouper = config.grouped;
		if(!isGrouper){
			this.store.setGrouper(null);
		}
		var plugins = [];
		// 下拉刷新
		var pullRefresh = config.pullRefresh;
		if(pullRefresh){
			plugins.push({
	        	xclass: 'Ext.plugin.PullRefresh',
	        	pullRefreshText: '下拉刷新',
	            releaseRefreshText: '释放刷新',
	            lastUpdatedText: '上次刷新:',
				loadingText: '<font style="font-size:13px">请稍候</font>',
	        	list:this.store,
	        	refreshFn:this.refreshStore
	         });
		}
		// 分页
		var listPaging = config.listPaging;
		if(listPaging){
			plugins.push({
				xclass: 'Ext.plugin.ListPaging',
	        	loadMoreText:'<span class="noMoreRecordsText"></span>',
	        	noMoreRecordsText:'<span class="noMoreRecordsText"></span>'
	        	
			});
		}
         if(!Ext.isEmpty(config.items)){
            config.items.forEach(function(e){  
	          toolbars.push(e);
	        }) 
         	
         }
    	Ext.apply(config,{
    	    selectedCls:'listitems_select',
		    fullscreen: true,
		    store: this.store,
            items: toolbars,
            emptyText: '<div class="noMoreRecordsText" style="margin-top:20px">暂无数据</div>',
		    plugins: plugins
		//    items:config.items
    	});
    	
    	if (typeof config.useSelect != 'undefined' && config.useSelect) {
			var isSelectAll=true;
			var hasBottmToolbar=!Ext.isEmpty(config.bottomToolbar);
			Ext.apply(config, {
				editCls : 'simpleList',
				// 是否在多选状态（不可更改）
				isSimple : false,
				// 设置数据主键(可配置)
				ckId : 'id',
				// 加上这个 ，如果不加 会出现 bug
				onItemDisclosure: false,
				// 多选时弹出菜单栏(可配置)
				simpleToolBar : {
					// 默认位置
					docked : 'bottom',
					items : [{
								xtype : 'button',
								text : '全选',
								align : 'left',
								listeners : {
									tap : function(button) {
										var list = button.up('list');
										if (isSelectAll) {
											this.setText('取消全选');
											list.selectAll();
										} else {
											this.setText('全选');
											list.deselectAll();
										}
										isSelectAll = !isSelectAll;
									}
								}
							}, {
								cls : 'moreButton',
								xtype : 'button',
								text : '取消',
								align : 'right',
								listeners : {
									tap : function(button) {
										var list = button.up('list');
										// 移除多选栏
										this.getParent().getParent().hide();
										//显示添加栏
										if (hasBottmToolbar) {
											this.getParent().getParent()
													.getParent().config.bottomToolbar
													.show();
										}
										this.getParent().getParent().destroy();
										// 结束多选
										list.endSimple();
										isSelectAll=true;
									}
								}
							}, {
								cls : 'moreButton',
								xtype : 'button',
								text : config.buttonText,
								align : 'right',
								listeners : {
									tap : function(button) {
										var list = button.up('list');
										var items = list.getSelection();
										// 获取选中项
										var values = [];
										var returnFileds=list.config.returnFileds;
										var hasReturnFileds=!Ext.isEmpty(returnFileds);
										if(hasReturnFileds){
											values="{";
											for(var i=0,field;field=returnFileds[i];i++){
												values+="\""+field+"\":[],";
											}
											values=values.substring(0,values.length-1);
											values+="}";
											values=Ext.util.JSON.decode(values);
										}
										for (var i = 0, item; item = items[i]; i++) {
											if(hasReturnFileds){
												for(var j=0;j<returnFileds.length;j++){
													var temp=values[returnFileds[j]];
													temp.push(item.data[returnFileds[j]]);
												}
											}else{
												values.push(item.data[list.config.ckId]);
											}
										}
										var thisBar=this.getParent().getParent();
										// 移除多选边栏
										if (!Ext.isEmpty(values)) {
											Ext.Msg.show({
												message : '确认操作？',
												width : 300,
												buttons : [{
															text : '确定',
															itemId : '1'
														}, {
															text : '取消',
															itemId : '0'
														}],
												fn : function(itemId) {
													if (itemId != '0') {
														thisBar.hide();
														if (hasBottmToolbar) {
															thisBar.getParent().config.bottomToolbar.show();
														}
														thisBar.getParent().config.doneSuccess(values);
														thisBar.destroy();
														// 结束多选
														list.endSimple();
													}
												}
											});
										} else {
											Ext.Msg.alert("警告", "请选择数据");
										}
										isSelectAll=true;
									}
								}
							}]
				},
				listeners : {
					// 监控是否在多选状态
					itemtap : function(list, index, target, record, e) {
						// 如果在多选状态停止后续事件的执行
						if (this.config.isSimple) {
							e.stopEvent();
						}
					},
					itemsingletap : function(list, index, target, record, e) {
						if (!Ext.isEmpty(this.config.itemsingletap)) {
							this.config.itemsingletap(list, index, target,record);
						}
					},
					// 只要按键长按住就会触发，和按键是否离开没有关系
					itemtaphold : function(list, index, target, record, e) {
						// 开始多选
						this.beginSimple();
					},
					initialize : function(list,opra){
						if(this.config.selectWhenIN){
							this.beginSimple();
						}
					}
				}
			});
		}
		var me=this;
		me.callParent([config]);
//		window.setInterval(function(){
//				me.callParent([config]);
//		},2000);
    	
    },
    
    // 进入多选状态
	beginSimple : function() {
		if (!this.config.isSimple) {
			// 取消全选
			this.deselectAll();
			// 进入多选模式
			this.setMode('SIMPLE');
			// 添加css
			this.addCls(this.config.editCls);
			// 显示OnItemDisclosure
			this.setOnItemDisclosure(true);
			// 加入标记，以便在itemtap事件中进行判定
			this.config.isSimple = true;
			//隐藏标记栏
			if(!Ext.isEmpty(this.config.bottomToolbar)){
			    this.config.bottomToolbar.hide();
			}
			// 添加多选边栏
			this.add(this.getSimpleToolBar());
		}
	},// 获取多选边栏
	getSimpleToolBar : function() {
		var simpleToolBar = Ext.create('Ext.TitleBar',
				this.config.simpleToolBar);
		return simpleToolBar;
	},
	// 结束多选模式
	endSimple : function() {
		console.log('endSimple');
		// 取消全选
		this.deselectAll();
		// 进入单选模式
		this.setMode('SINGLE');
		// 移除css
		this.removeCls(this.config.editCls);
		// 隐藏OnItemDisclosure
		this.setOnItemDisclosure(false);
		// 加入标记，以便在itemtap事件中进行判定
		this.config.isSimple = false;
	},
	// 更新OnItemDisclosure需要
	updateOnItemDisclosure : function(newConfig, oldConfig) {
		if (oldConfig == null) {
			return;
		}
		var items = this.listItems;
		for (var i = 0, ln = items.length; i < ln; i++) {
			var dItem = items[i].getDisclosure();
			newConfig === false ? dItem.hide() : dItem.show();
		}
	},
    
    onSearchTask:function(){
    	var searchVal = this.down('toolbar').getCmpByName('searchField');
    	this.store.getProxy().setExtraParam(this.searchCol, searchVal.getValue());
		this.store.loadPage(1);
    },
    
    refreshStore:function(config){
    	var store = config.config.list;
    	store.loadPage(1);
    }

});


/**
 * 手机用户信息
 * by cjj
 */

Ext.define('mobile.UserInfo', {
    extend: 'Ext.Toolbar',
    
    constructor: function (config) {
		
    	config = config || {};
    
		Ext.apply(config,{
		    docked: 'bottom',
    	    items: [
    	        { xtype: 'spacer' },
    	        {
    	            xtype: 'label',
    	            html: config.username
    	        },
    	        { xtype: 'spacer' }
    	    ]
		});
		
		this.callParent([config]);
	}
});

Ext.override(Ext.DateExtras, 
	Ext.Date.monthNames =  ["1月", "2月", "3月", "4月","5月", "6月",
							"7月", "8月", "9月", "10月", "11月", "12月"]
	);
	
	
/**
 * @filename Fileup.js
 * 
 * @name File uploading component
 * @fileOverview File uploading component based on Ext.Button
 *
 * @author Constantine V. Smirnov kostysh(at)gmail.com
 * @date 20130614
 * @version 2.0.1
 * @license GNU GPL v3.0
 *
 * @requires Sencha Touch 2.1.1
 * 
 * This component can works in two modes (switched by loadAsDataUrl config):
 * 1) Load local files as dataUrl. 
 * Will be useful if you want to load a local file. For example you can load
 * image and display it inside dom or store it into localStorage.
 * 2) Upload files to server (you should also setup a server part)
 * Current PHP version of server part located in src/php folder (getfile.php)
 * 
 * Server response format (JSON):
 * {
 *     success: true,// or false
 *     message: ''// error message if success === false
 * }
 * 
 * Component has three states:
 * 1) Browse: Initial state, you can browse and select file
 * 2) Ready: File selected and ready for load or upload
 * 3) Uploading: File loading or uploading in process
 * 
 * You can configure these states (add custom text and styles).
 * Default configuration below:
 * 
 

items: [

    //Fileup configuration for "Load local file" mode
    {
        xtype: 'fileupload',
        autoUpload: true,
        loadAsDataUrl: true,
        states: {
            browse: {
                text: 'Browse and load'
            },
            ready: {
                text: 'Load'
            },

            uploading: {
                text: 'Loading',
                loading: true// Enable loading spinner on button
            }
        }
    },
    
    //Fileup configuration for "Upload file" mode
    {
        itemId: 'fileBtn',
        xtype: 'fileupload',
        autoUpload: false,
        url: 'src/php/getfile.php'
    }
]

 
 * 
 */

/**
 * @event success
 * Fired when file uploaded successfully
 * @param {Object} response Response object obtained from server
 * @param {Object} xhr Link to XMLHttpRequest object
 * @param {Object} e Success event
 */

/**
 * @event failure
 * Fired when file not uploaded or server just returns error message
 * @param {String} message Parsed error message obtained from server
 * @param {Object} response Response object obtained from server
 * @param {Object} xhr Link to XMLHttpRequest object
 * @param {Object} e Uploading error event
 */

/**
 * @event loadsuccess
 * Fired when file uploaded successfully
 * @param {Object} dataUrl DataUrl source of readed file
 * @param {Object} reader Link to FileReader object
 * @param {Object} e Load event
 */

/**
 * @event loadfailure
 * Fired when file not uploaded or server just returns error message
 * @param {String} message Parsed error message obtained from server
 * @param {Object} reader Link to FileReader object
 * @param {Object} e Loading error event
 */

Ext.define('Ext.ux.Fileup', {
    extend: 'Ext.Button',
    xtype: 'fileupload',
    
    requires: [
        'Ext.MessageBox',
//        'Ext.device.Notification',
        'Ext.Array'
    ],
    
    template: [
        
        // Default button elements (do not change!)
        {
            tag: 'span',
            reference: 'badgeElement',
            hidden: true
        },
        {
            tag: 'span',
            className: Ext.baseCSSPrefix + 'button-icon',
            reference: 'iconElement',
            hidden: true
        },
        {
            tag: 'span',
            reference: 'textElement',
            hidden: true
        },
        
        // Loading spinner
        {
            tag: 'div',
            className: Ext.baseCSSPrefix + 'loading-spinner',
            reference: 'loadingElement',
            hidden: true,
            
            children: [
                {
                    tag: 'span',
                    className: Ext.baseCSSPrefix + 'loading-top'
                },
                {
                    tag: 'span',
                    className: Ext.baseCSSPrefix + 'loading-right'
                },
                {
                    tag: 'span',
                    className: Ext.baseCSSPrefix + 'loading-bottom'
                },
                {
                    tag: 'span',
                    className: Ext.baseCSSPrefix + 'loading-left'
                }
            ]
        },
                
        // Hidden file element
        {
            tag: 'form',
            reference: 'formElement',
            hidden: false,            
            
            children: [
                {
                    tag: 'input',
                    reference: 'fileElement',
                    type: 'file',
                    name: 'userfile',
					//accept: "image/*",	//临时做的限制图片上传的
                    tabindex: -1,
                    hidden: false,
                    style: 'opacity:0;position:absolute;top:-3px;right:-3px;bottom:-3px;left:-3px;z-index:16777270;'
                }
            ]
        }
    ],
    
    // Default button states config
    defaultStates: {
         browse: {
            text: 'Browse',
            cls: Ext.baseCSSPrefix + 'fileup',
            ui: 'filebrowse'
        },

        ready: {
            text: 'Upload',
            cls: Ext.baseCSSPrefix + 'fileup-ready',
            ui: 'fileready'
        },

        uploading: {
            text: 'Uploading',
            cls: Ext.baseCSSPrefix + 'fileup-uploading',
            ui: 'fileupload',
            loading: true
        },
		
		success: {
            text: 'success',
            cls: Ext.baseCSSPrefix + 'fileup-ready',
            ui: 'fileready'
        }

    },
    
    // Current button state
    currentState: null,
    
    config: {
        cls: Ext.baseCSSPrefix + 'fileup',
        
        /**
         * @cfg {String} name Input element name, check on server for $_FILES['userfile']
         */        
        name: 'userfile',
        
        /**
         * @cfg {Boolean} autoUpload 
         * If true then "uploading" state will start after "ready" event automatically
         */
        autoUpload: false,
        
        /**
         * @cfg {Object} states 
         */
        states: true,
        
        /**
         * @cfg {Boolean} loadAsDataUrl
         */
        loadAsDataUrl: false,
        
        /**
         * @cfg {String} url URL to uploading handler script on server
         */
        url: '',
               
        /**
         * @cfg {Boolean} signRequestEnabled Enable or disable request signing feature
         */
        signRequestEnabled: false,
        
        /**
         * @cfg {Boolean} can only upload one time
         */
        single: false,
        
        /**
         * @cfg {String} signHeader Signing token header name
         */
        signHeader: '',
        
        /**
         * @cfg {Array} defaultSuccessCodes Http response success codes
         */
        defaultSuccessCodes: [200, 201]
    },
    
    // @private
    applyStates: function(states) {
        var me = this;
        
        if (states) {
            
            if (Ext.isObject(states)) {
                
                // Merge custom config with default
                return Ext.merge({}, me.defaultStates, states);
            } else {
                return me.defaultStates;
            }
        } else {
            return me.defaultStates;
        }
    },
    
    // @private
    initialize: function() {
        var me = this;
        me.callParent();
        
        me.fileElement.dom.onchange = function() {
            me.onChanged.apply(me, arguments);
        };
        
        me.on({
            scope: me,
            buffer: 250,// Avoid multiple tap 
            tap: me.onButtonTap
        });
        
        // Stup initial button state
        me.changeState('browse');
    },
    
    // @private
    onButtonTap: function() {
        var me = this;
        
        switch (me.currentState) {
            
            // Currently we handle tap event while button in ready state
            // because in all other states button is not accessible
            case 'ready':                
                me.changeState('uploading');
                var file = me.fileElement.dom.files[0];
                                
                if (!me.getLoadAsDataUrl()) {
                    me.fireEvent('uploadstart', file);
                    me.doUpload(file);                
                } else {
                    me.doLoad(file);
                }
                break;
        }
    },
    
    // @private
    onChanged: function(e) {
        var me = this;
        
        if (e.target.files.length > 0) {
            me.fireAction('ready', [e.target.files[0]], function() {
                me.changeState('ready');
                me.onButtonTap();
            }, me);
        } else {
//            Ext.device.Notification.show({
//                title: 'Error',
//                message: 'File selected but not accessible',
//                buttons: Ext.MessageBox.OK,
//                callback: function() {
//                    me.changeState('browse');
//                }
//            });
        }
    },
    
    // @private
    changeState: function(state) {
        var me = this;
        var states = me.getStates();
        
        if (Ext.isDefined(states[state])) {
            
            // Common tasks for all states
            if (states[state].text) {
                me.setText(states[state].text);
            } else {
                me.setText('');
            }
            
            if (states[state].cls) {
                me.setCls(states[state].cls);
            } else {
                me.setCls('');
            }
            
            if (states[state].ui) {
                me.setUi(states[state].ui);
            } else {
                me.setUi('normal');
            }
            
            if (states[state].loading) {
            	mobileView.setMasked({xtype: 'loadmask',message: defaultsValues.loadMaskText});
            } else {
            	mobileView.setMasked(false);
            }
            
            // State specific tasks
            switch (state) {
                case 'browse':
                    me.currentState = 'browse';
                    me.reset();                    
                    break;
                    
                case 'ready':
                    me.currentState = 'ready';
                    me.fileElement.hide();
                    
                    if (me.getAutoUpload()) {
                        me.onButtonTap();
                    }                    
                    break;
                    
                case 'uploading':
                    me.currentState = 'uploading';
                    break;
            }
        } else {
            // <debug>
            Ext.Logger.warn('Config for FileUp state "'+ state +'" not found!');
            // </debug>
        }
    },
    
    /**
     * @private
     * @method doLoad
     * Read selected file as dataUrl value.
     * If you wish to get dataUrl content 
     * then you should listen for "loadsuccess" event
     * @param {Object} file Link to loaded file element
     */
    doLoad: function(file) {
        var me = this;                
        var reader = new FileReader();

        reader.onerror = function(e) {
            var message;
            switch (e.target.error.code) {
                case e.target.error.NOT_FOUND_ERR:
                    message = 'File Not Found';
                    break;

                case e.target.error.NOT_READABLE_ERR:
                    message = 'File is not readable';
                    break;

                case e.target.error.ABORT_ERR:
                    break;

                default:
                    message = 'Can not read file';
            };
            me.fireEvent('loadfailure', message, me, e);
        };

        reader.onload = function(e) {
            me.fireEvent('loadsuccess', this.result, me, e);
            me.changeState('browse');
        };

        // Read image file
        reader.readAsDataURL(file);
    },
    
    /**
     * @private
     * @method doUpload
     * Upload selected file using XMLHttpRequest.
     * @param {Object} file Link to loaded file element
     */
    doUpload: function(file) {
        var me = this;        
        var http = new XMLHttpRequest();
        
        if (http.upload && http.upload.addEventListener) {
            
            // Uploading progress handler
            http.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                    var percentComplete = (e.loaded / e.total) * 100; 
                    me.setBadgeText(percentComplete.toFixed(0) + '%');
                }
            };
            
            // Response handler
            http.onreadystatechange = function (e) {
                if (this.readyState == 4) {
				
                    if(Ext.Array.indexOf(me.getDefaultSuccessCodes(), parseInt(this.status)) != -1) {
                        
                        var response = me.decodeResponse(this);
                        
                        if (response && response.success) {
                            // Success
                            me.fireEvent('success', response, me, e);
                            var mailformpanle = me.up('formpanel');
							var htmls = '';
							var setHtmls = function(filenames, fileIds) {
								if (filenames != null) {
									files = filenames.split(",");
									fileids = fileIds.split(",");
									for (var i = 0; i < files.length - 1; i++) {
										htmls = htmls
												+ "<ul id='"
												+ fileids[i]
												+ "'><div style='float:left;font-weight:bold;font-size:16px;'><a title='单击下载该文件' tyle='color:green;' href='"
												+ __ctxPath
												+ "/file-download?fileId="
												+ fileids[i]
												+ "'>"
												+ files[i]
												+ "</a>"
												+ "<a style='color:#d93a49;font-size:12px;' href="
												+ "'javascript:delMailAttach("
												+ fileids[i] + ")'>" + " 删除</a></ul></br>";
									}

								}
							};
							var filename = mailformpanle
									.getCmpByName('filename');
							var filenames = mailformpanle
									.getCmpByName('filenames').getValue();// 获取FormPanel的邮件控件的值
							filenames = filenames + response.fileName + ",";
							mailformpanle.getCmpByName('filenames')
									.setHtml(filenames);
							var fileIds = mailformpanle.getCmpByName('fileIds')
									.getValue();// 获取FormPanel的附件ID控件的值
							fileIds = fileIds + response.fileId + ",";
							mailformpanle.getCmpByName('fileIds')
									.setValue(fileIds);
							setHtmls(filenames, fileIds);
							filename.setHtml(htmls);
							// Single upload
							if (me.getSingle()) {
								me.changeState('success');
								return ;
							}
                        } else if (response && response.message) {
                            // Failure
                            me.fireEvent('failure', response.message, response, me, e);
                        } else {
                            // Failure
                            me.fireEvent('failure', 'Unknown error', response, me, e);
                        }
                        
                    } else {
                        
                        // Failure
                        me.fireEvent('failure', this.status + ' ' + this.statusText, response, me, e);
                    }
                    
                    me.changeState('browse');
                }
            };
            
            // Error handler
            http.upload.onerror = function(e) {
                me.fireEvent('failure', this.status + ' ' + this.statusText, {}, me, e);
            };
        }
        
        // Send form with file using XMLHttpRequest POST request
        http.open('POST', me.getUrl());
        
        if (me.getSignRequestEnabled()) {
            
            // Sign the request and then send.
            me.signRequest(http, function(http) {
    
              // Send the form.
              http.send(me.getForm(file));
            });
        } else {
            http.send(me.getForm(file));
        }
        
    },
    
    /**
     * @method getForm
     * Returns the form to send to the browser.
     *
     * @param {Object} file Link to loaded file element
     */
    getForm: function(file) {
      // Create FormData object
      var form = new FormData();

      // Add selected file to form
      form.append(this.getName(), file);

      // Return the form.
      return form;
    },

    /**
     * @method reset
     * Component reset
     */
    reset: function() {
        var me = this;
        
        me.setBadgeText(null);
        me.formElement.dom.reset();
        me.fileElement.show();
    },
    
    /**
     * @private
     * @method decodeResponse
     * Decodes a server response.
     *
     * @param {Object} response The response from the server to decode
     * @return {Object} The response to provide to the library
     */
    decodeResponse: function(response) {
        return Ext.decode(response.responseText, true);
    },
    
    /**
     * @private
     * @method signRequest
     * Sign the request before sending it.
     *
     * @param {Object} request The XHR request object.
     * @param {Function} callback Called when the request has been signed.
     */
    signRequest: function(http, callback) {
        var me = this;
        var header = me.getSignHeader(); 
        
        if (!header) {
            me.fireEvent('failure', 'Request signing header is not defined');
        }
        
        me.signProvider( 
            function(token) {
                http.setRequestHeader(header, token);
                callback(http);
            },
            function(failureText) {
                me.fireEvent('failure', 'Request signing is failed! ' + 
                                        failureText, {}, this);
            });
    },
    
    /**
     * @private
     * @method signProvider
     * Default token provider (should be redefined)
     *
     * @param {Function} success Success callback
     * @param {Function} callback Signing failure callback
     */
    signProvider: function(success, failure) {
        success('default-token');// Default behaviour
    }
});

// 提交添加mask
Ext.define('Ext.Ajax', {
	extend : 'Ext.data.Connection',
	singleton : true,

	/**
	 * @property {Boolean} autoAbort Whether a new request should abort
	 *           any pending requests.
	 */
	autoAbort : false,
	request : function(options) {
		options = options || {};
		options.timeout = defaultsValues.timeout;
		if(options.url.indexOf("autoload=true")==-1){
			mobileView.setMasked(false);
		}
		options.failure = function() {
//			Ext.Msg.alert("错误", "链接失败");
			mobileView.setMasked(false);
		};
		if(options.success){
			var successFunction=options.success;
			options.success=function(response){
				successFunction(response);
				mobileView.setMasked(false);
			};
		}else if(options.exception){
			var exceptionFunction=options.exception;
			options.exception=function(response){
				exceptionFunction(response);
				mobileView.setMasked(false);
			};
		}else{
			options.success=function(response){
				mobileView.setMasked(false);
			};
		}
			
		var me = this, scope = options.scope || window, username = options.username
				|| me.getUsername(), password = options.password
				|| me.getPassword() || '', async, requestOptions, request, headers, xhr;

		if (me.fireEvent('beforerequest', me, options) !== false) {
			requestOptions = me.setOptions(options, scope);

			if (this.isFormUpload(options) === true) {
				this.upload(options.form, requestOptions.url,
						requestOptions.data, options);
				return null;
			}

			// if autoabort is set, cancel the current transactions
			if (options.autoAbort === true || me.getAutoAbort()) {
				me.abort();
			}

			// create a connection object
			xhr = this.getXhrInstance();

			async = options.async !== false
					? (options.async || me.getAsync())
					: false;

			// open the request
			if (username) {
				xhr.open(requestOptions.method, requestOptions.url, async,
						username, password);
			} else {
				xhr.open(requestOptions.method, requestOptions.url, async);
			}

			headers = me.setupHeaders(xhr, options, requestOptions.data,
					requestOptions.params);

			// create the transaction object
			request = {
				id : ++Ext.data.Connection.requestId,
				xhr : xhr,
				headers : headers,
				options : options,
				async : async,
				timeout : setTimeout(function() {
							request.timedout = true;
							me.abort(request);
						}, options.timeout || me.getTimeout())
			};
			me.requests[request.id] = request;

			// bind our statechange listener
			if (async) {
				xhr.onreadystatechange = Ext.Function.bind(me.onStateChange,
						me, [request]);
			}

			// start the request!
			xhr.send(requestOptions.data);
			if (!async) {
				return this.onComplete(request);
			}
			return request;
		} else {
			Ext.callback(options.callback, options.scope, [options, undefined,
							undefined]);
			return null;
		}
	}
});

// 下拉汉化
Ext.override(Ext.picker.Picker, {
	applyCancelButton: function(config) {
        if (config) {
            if (Ext.isBoolean(config)) {
                config = {};
            }

            if (typeof config == "string") {
                config = {
                    text: config
                };
            }

            Ext.applyIf(config, {
                align: 'left',
                text: '取消'
            });
        }

        return Ext.factory(config, 'Ext.Button', this.getCancelButton());
    },
    applyDoneButton: function(config) {
        if (config) {
            if (Ext.isBoolean(config)) {
                config = {};
            }

            if (typeof config == "string") {
                config = {
                    text: config
                };
            }

            Ext.applyIf(config, {
                ui: 'action',
                align: 'right',
                text: '确定'
            });
        }

        return Ext.factory(config, 'Ext.Button', this.getDoneButton());
    }
});
Ext.define('tableHeader', {
    extend: 'Ext.Panel',
    name: 'tableHeader',
      constructor: function (config) {
      	/*var headerStr=config.headerStr;
      	var headerArray=new Array(headerStr);*/
      		var headerArray=config.header;
      	var html="";
      	for(var idx0=0;idx0<headerArray.length;idx0++){
      	  html=html+headerArray[idx0]+"&nbsp;&nbsp;"
      	}
        Ext.apply(config,
        {docked:'top',
        laout:'hbox',
        height:50,
        style:"margin-left:13px;",
        items:[
        	{html:html
           }]
        })
        
        this.callParent([config]);
        
      }
    });
 Ext.define('DicIndep', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
									name : 'text',
									type : 'string'
								}, {
									name : 'value',
									type : 'string'
								}]
    }
});  
//{"success":true,"totalCounts":2,"result":[{"text":"30/360","value":"dateModel_360"},{"text":"30/365","value":"dateModel_365"}]}

  Ext.define('DicIndepCombo', { 
  	extend: 'Ext.field.Select',
  	xtype: 'dicIndepCombo',
    name: 'DicIndepCombo',
    constructor : function(config) {
    	  Ext.apply(this, config);
    	 var nodeKey = this.nodeKey;
        var isDisplayItemName = this.isDisplayItemName;
    	var store=Ext.create('Ext.data.Store', {
          	 	model: "DicIndep",
                autoLoad : true,
                proxy: {
		        type: "ajax",
		        url : __ctxPath + "/htmobile/loadIndepItemsVmInfo.do?nodeKey="+nodeKey,
		        reader : {
							type : 'json',
							rootProperty : 'result'
						}
                }
                });
          Ext.apply(config,{
          	 store : store,
          	 displayField: 'text',
           	 valueField: 'value'
          	 
        })
        
        this.callParent([config]);
    }
});

  Ext.define('Dickeycombo', { 
  	extend: 'Ext.field.Select',
  	xtype: 'dickeycombo',
    name: 'dickeycombo',
    constructor : function(config) {
    	  Ext.apply(this, config);
    	 var nodeKey = this.nodeKey;
        var isDisplayItemName = this.isDisplayItemName;
    	var store=Ext.create('Ext.data.Store', {
          	 	model: "DicIndep",
                autoLoad : true,
                proxy: {
		        type: "ajax",
		          url : __ctxPath + "/htmobile/loadItemByNodeKeyVmInfo.do?nodeKey="+nodeKey,
		        reader : {
							type : 'json',
							rootProperty : 'result'
						}
                }
                });
          Ext.apply(config,{
          	 store : store,
          	 displayField: 'text',
           	 valueField: 'value'
          	 
        })
        
        this.callParent([config]);
    }
});
  Ext.define('StoreSelect', { 
  	extend: 'Ext.data.Store',
  	xtype: 'storeSelect',
    name: 'storeSelect',
    constructor : function(config) {
    	  Ext.apply(this, config);
          Ext.apply(config,{
          	 	model: "DicIndep",
                autoLoad : true,
                proxy: {
		        type: "ajax",
		          url : config.url,
		        reader : {
							type : 'json',
							rootProperty : 'result'
						}
                }
          	 
        })
        
        this.callParent([config]);
    }
});
 Ext.define('Tellphone', { 
  	extend: 'Ext.Panel',
  	xtype: 'tellphone',
    name: 'tellphone',
    constructor : function(config) {
    	  var cellphone=config.value;
    	   var label=config.label;
    	  Ext.apply(this, config);
          Ext.apply(config,{
          html:'<div class="fieldlabel">'+label+'</div><br/><a href="tel:'+cellphone+'" class="fieldtext">'+cellphone+'</a>'																																																																																																																												
		                   
          })
        
        this.callParent([config]);
    }
});
//因为原来的文本不能自动高度
 Ext.define('Textarea', { 
  	extend: 'Ext.Panel',
  	xtype: 'textarea',
    name: 'textarea',
    constructor : function(config) {
    	
    	  var value=config.value;
    	   var label=config.label;
    	  Ext.apply(this, config);
          Ext.apply(config,{
          html:'<div class="fieldlabel">'+label+'</div><br/><div class="fieldtext">'+value+'</div>'																																																																																																																												
		                   
          })
        
        this.callParent([config]);
    }
});
 /*Ext.define('Moneyfield', { 
  	extend: 'Ext.field.Text',
  	xtype: 'moneyfield',
    name: 'moneyfield',
    constructor : function(config) {
    	  var value=config.value;
    	  numberFormat=function(num) {
		    				var num = new Number(num);
						  return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
						}  
    	  Ext.apply(this, config);
          Ext.apply(config,{
		    value:numberFormat(value)               
          })
        
        this.callParent([config]);
    }
});*/
 Ext.define('Textfieldlabelleft', { 
  	extend: 'Ext.field.Text',
  	xtype: 'fieldlabelleft',
    name: 'fieldlabelleft',
    constructor : function(config) {
    	  Ext.apply(this, config);
          Ext.apply(config,{
		    label:"<div class='fieldlabelleft'>"+this.label+"</div>"              
          })
        
        this.callParent([config]);
    }
});

Ext.override(Ext.Panel, {
    loadData : function(conf) {
        if (!conf.root) {
            conf.root = 'data';
        }
        var ct = this;
        // 遍历该表单下所有的子项控件，并且为它赋值
        var setByName = function(container, data) {
            var items = container.items;
            if (items != null && items != undefined && items.getCount) {
                for (var i = 0; i < items.getCount(); i++) {
                    var comp = items.get(i);
                    if (comp.items) {
                        setByName(comp, data);
                        continue;
                    }
                    // 判断组件的类型，并且根据组件的名称进行json数据的自动匹配
                    var xtype = comp.getXType();
                    try {
                        if (xtype == 'textfield' || xtype == 'textarea'
                                || xtype == 'radio' || xtype == 'checkbox'
                                || xtype == 'datefield' || xtype == 'combo'
                                || xtype == 'hidden'|| xtype=='smdiccombo'|| xtype=='dicIndepCombo'
                                || xtype == 'datetimefield' || xtype=='mordiccombo' || xtype=='csdiccombo'
                                || xtype == 'htmleditor'
                                || xtype == 'displayfield'
                                || xtype == 'diccombo' || xtype == 'fckeditor'
                                || xtype == 'numberfield' || xtype=='dicIndepCombo' || xtype=='dickeycombo'  || xtype=='moneyfield' || xtype=='zwcheckbox') {
                            var name = comp.getName();
                            if (name) {
                                if (conf.preName) {
                                    if (name.indexOf(conf.preName) != -1) {
                                        name = name
                                                .substring(conf.preName.length
                                                        + 1);
                                    }
                                }
                                var val = eval(conf.root + '.' + name);
                                if (val != null && val != undefined) {
                                    comp.setValue(val);
                                    comp.fireEvent('loadData',comp);//update by gao ,这样就可以回填值的时候触发事件了，哈哈
                                }
                                 if(xtype=='moneyfield'){
                                    var preName = comp.preName;
                                     var val;
                                    if(typeof(comp.preName)=="undefined" || preName== undefined || preName == null || preName == ""){
                                       val = eval(conf.root + '.' +name.substring(0,name.length-1));
                                       
                                    }else{
                                        val = eval(conf.root + '.' + preName+ '.'+name.substring(0,name.length-1));
                                    }
                                       comp.setValue(Ext.util.Format.number(val,'0,000.00'));
                                       comp.hiddenField.value=val;
                                    comp.fireEvent('loadData',comp);//
                                
                                  }
                                  if(xtype=='zwcheckbox'){
                                    var preName = comp.preName;
                                     var val = eval(conf.root + '.' + preName+ '.'+name);
                                     if(val==1){
                                        comp.setValue(true);
                                     }else if(val==0){
                                         comp.setValue(false);
                                     }
                                      
                                    comp.fireEvent('loadData',comp);//
                                
                                  }
                         
                            }
                        }
                    } catch (e) {
                        // alert(e);
                    }
                }
            }
        };
        if (!ct.loadMask) {
            ct.loadMask = new Ext.LoadMask(Ext.getBody());
            ct.loadMask.show();
        }
        var scope = conf.scope ? conf.scope : ct;
        var params = conf.params ? conf.params : {};
        Ext.Ajax.request({
            method : 'POST',
            url : conf.url,
            scope : scope,
            params : params,
            success : function(response, options) {
                var json = Ext.util.JSON.decode(response.responseText);
                var data = null;
                if (conf.root) {
                    data = eval('json.' + conf.root);
                } else {
                    data = json;
                }
                setByName(ct, data);
                if (ct.loadMask) {
                    ct.loadMask.hide();
                    ct.loadMask = null;
                }
                if (conf.success) {
                    conf.success.call(scope, response, options);
                }
            },// end of success
            failure : function(response, options) {
                if (ct.loadMask) {
                    ct.loadMask.hide();
                    ct.loadMask = null;
                }
                if (conf.failure) {
                    conf.failure.call(scope, response, options);
                }
            }
        });
    }
});

Ext.define('', { override: 'Ext.picker.Date',

	  setValue: function(value, animated) { //设置默认定位当前日期
       
    	if (!value) {
            value = new Date();
        } 
        if (Ext.isDate(value)) {
            value = {
                day  : value.getDate(),
                month: value.getMonth() + 1,
                year : value.getFullYear()
            };
        }

        this.callParent([value, animated]);
    
    }
	
});

Ext.define('com.hurong.timePicker',{
  extend:'Ext.DatePicker',
  xtype:'todaypickerux',
  alias:'widget.timepickerux',
/*  requires:[
     'Ext.DateExtras',
     'Ext.util.InputBlocker'
  
  ],*/
  config:{
    	border:0,
    	stretchx:false,
    	userTitles:true,
        dayText: '日',
        monthText: '月',
        slotOrder: [
            'year',
            'month',
            'day'
        ],
        yearFrom: 1980,
        yearText: '年',
        yearTo: 2050,
        doneButton: '确定',
        cancelButton: '取消'
    },
  setValue: function(value, animated) { //设置默认定位当前日期
       
    	if (!value) {
            value = new Date();
        } 
        if (Ext.isDate(value)) {
            value = {
                day  : value.getDate(),
                month: value.getMonth() + 1,
                year : value.getFullYear()
            };
        }

        this.callParent([value, animated]);
    
    }
	/* setValue: function(value, animated) { //设置默认定位当前日期
        if (!value) {
            value = new Date();
        }
        if(Ext.isDate(value)) {
            value = {
                day: value.getDate(),
                month: value.getMonth() + 1,
                year: value.getFullYear(),
                hour: value.getHours(),
                minute: value.getMinutes()
            };
            com.newgrand.timePicker.superclass.superclass.setValue.call(this, value, animated);
            this.onSlotPick();
        }
    },*/
})




Ext.define('com.hurong.buttonpress',{
  extend:'Ext.Button',
  xtype:'buttonpress',
  alias:'widget.buttonpress',
  
   doRelease: function(me, e) {
         
  	      
  	      
  	         
        if (!me.getDisabled()) {
            if (me.hasOwnProperty('pressedTimeout')) {
                clearTimeout(me.pressedTimeout);
                delete me.pressedTimeout;
            }
            else {
             //   me.element.removeCls(me.getPressedCls());
            }
        }
    },

  onPress: function() {
  	 
        var me = this,
            element = me.element,
            pressedDelay = me.getPressedDelay(),
            pressedCls= me.getCls()[0].split("_")[0]+"_select";
             var otherbuttonobjarray=this.config.this1.items.items[0];
             
                otherbuttonobjarray.forEach(function(e){ 
                   var nocls= e.getCls()[0].split("_")[0];
                  e.setCls(nocls);
                
                 });
  	         
            
        if (!me.getDisabled()) {
            if (pressedDelay > 0) {
                me.pressedTimeout = setTimeout(function() {
                    delete me.pressedTimeout;
                    if (element) {
                        element.setCls(pressedCls);
                    }
                }, pressedDelay);
            }
            else {
                me.setIconCls(pressedCls);
                
            }
        }
    }
})


Ext.define('hurong.navigation.View',{
  extend:'Ext.navigation.View',
  xtype:'hurongNavigationView',
  alias:'hurong.navigation.View',
  showAnimation:'fade',
  doPop: function() {
        var me = this,
        innerItems = this.getInnerItems();
        me.remove(innerItems[innerItems.length - 1]);
        var obj=this.getActiveItem();
        if(obj.$className=="hrmobile.public.myhome.main"||obj.$className=="hrmobile.public.myhome.index"||obj.$className=="hrmobile.public.myhome.investManage"){
            mobileNavi.getNavigationBar().hide();
          	showbottomBarIndex();
        }else if(obj.$className=="hrmobile.public.myhome.investManage"||obj.$className=="hrmobile.public.myhome.login")
        {
          	showbottomBarIndex();
        }else if(obj.$className=="hrmobile.public.myhome.loanList" ){
        	Ext.getCmp('login').setHidden(false);
        	showbottomBarIndex();
        }
        return obj;
    },
   	reset: function() {
        return this.pop(this.getInnerItems().length);
    },
 	push : function(a) {
		if(a.$className=="hrmobile.public.myhome.main"){
			if(Ext.isEmpty(curUserInfo)){
				ajaxgetuserid();
			}
			mobileNavi.getNavigationBar().hide();
		}else if(a.$className=="hrmobile.public.myhome.index"){
            mobileNavi.getNavigationBar().hide();
		}else if(a.$className=="hrmobile.public.myhome.loanList"){
			Ext.getCmp('login').setHidden(false);
			mobileNavi.getNavigationBar().show();
		}else{
			Ext.getCmp('login').setHidden(true);
		    mobileNavi.getNavigationBar().show();    
		}
			return this.add(a)
		}
})

/*Ext.define('hurong.plugin.PullRefresh',{
  extend:'Ext.plugin.PullRefresh',
  xtype:'hurongPullRefresh',
  alias:'hurong.plugin.PullRefresh',
  fetchLatest: function() {
	   var me=this,
	   list=this.getList(),
	   store=list.getStore();
	   
	   store.loadPage(1,function(){
		   me.setState("loaded");
        if (me.getAutoSnapBack()) {
            me.snapBack();
        }
		   
		   
	   }
		   
	  ) 
	      
	
}  
})*/
Ext.override(Ext.plugin.PullRefresh, {  
    fetchLatest : function(name) {
	   var me=this,
	   list=this.getList(),
	   store=list.getStore();
	   store.loadPage(1,function(){
		   me.setState("loaded");
        if (me.getAutoSnapBack()) {
            me.snapBack();
        }
	   }
	  ) 
    }
   }
  )
  
  Ext.define('hrmobile.zy.FieldScroller', {  
		    override: 'Ext.viewport.Default',  
		  
		    onElementFocus: function() {  
		        this.callParent(arguments);  
		  
		        this.scrollFocusedFieldIntoView();  
		    },  
		  
		    scrollFocusedFieldIntoView: function() { 
		        var me = this,  
		            focusedDom = me.focusedElement,  
		            fieldEl = focusedDom && Ext.fly(focusedDom).up('.x-field'),  
		            fieldId = fieldEl && fieldEl.id,  
		            fieldCmp = fieldId && Ext.getCmp(fieldId),  
		            offsetTop = 0,  
		            scrollingContainer, scroller, scrollerEl, domCursor, thresholdY, containerHeight;  
		  
		        if (!fieldCmp) {  
		            return;  
		        }  
		  
		        scrollingContainer = fieldCmp.up('{getScrollable()}');  
		  
		        if (scrollingContainer) {  
		            scroller = scrollingContainer.getScrollable().getScroller();  
		            scrollerEl = scroller.getElement();  
		            domCursor = focusedDom;  
		  
		            while (domCursor && domCursor !== scrollerEl.dom) {  
		                offsetTop += domCursor.offsetTop;  
		                domCursor = domCursor.offsetParent;  
		            }  
		  
		            containerHeight = scroller.getContainerSize().y;  
		            thresholdY = offsetTop + fieldEl.getHeight() + (me.config.fieldFocusPadding || 10)+400;
		            // console.log('offsetTop=%o, containerHeight=%o, thresholdY=%o', offsetTop, containerHeight, thresholdY);  
		  
		            if (scroller.position.y + containerHeight < thresholdY) {  
		                // console.log('scrolling to ', thresholdY - containerHeight);  
		                scroller.scrollTo(0, thresholdY - containerHeight, false);  
		            }  
		        }  
		    }  
		}, function() {  
		    Ext.onSetup(function() {  
		        Ext.Viewport.on('resize', 'scrollFocusedFieldIntoView');  
		    });  
		});  
