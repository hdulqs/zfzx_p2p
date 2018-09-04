/**
 * @author
 * @class PlThirdInterfaceLogView
 * @extends Ext.Panel
 * @description [PlThirdInterfaceLog]管理
 * @company 智维软件
 * @createtime:
 */
PlThirdInterfaceLogView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				PlThirdInterfaceLogView.superclass.constructor.call(this, {
							id : 'PlThirdInterfaceLogView',
							title : '[PlThirdInterfaceLog]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				// 初始化搜索条件Panel
				this.searchPanel=new HT.SearchPanel({
							layout : 'form',
							region : 'north',
							colNums:3,
							items:[
																					 																																					 								{
									fieldLabel:'typeName',
									name : 'Q_typeName_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'typeId',
									name : 'Q_typeId_L_EQ',
									flex:1,
																		xtype:'numberfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'code',
									name : 'Q_code_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'codeMsg',
									name : 'Q_codeMsg_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'bigMsg',
									name : 'Q_bigMsg_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'createTime',
									name : 'Q_createTime_D_EQ',
									flex:1,
																		xtype:'datefield',
									format:'Y-m-d'
																	}
																,
															 							 																																					 								{
									fieldLabel:'interfaceName',
									name : 'Q_interfaceName_S_EQ',
									flex:1,
																		xtype : 'textfield'
																	}
																,
															 							 																																					 								{
									fieldLabel:'memberId',
									name : 'Q_memberId_L_EQ',
									flex:1,
																		xtype:'numberfield'
																	}
																,
															 							 																													 								 								{
									fieldLabel:'memberType',
									name : 'Q_memberType_N_EQ',
									flex:1,
																		xtype:'numberfield'
																	}
															 							 							 															],
								buttons:[
									{
										text:'查询',
										scope:this,
										iconCls:'btn-search',
										handler:this.search
									},{
										text:'重置',
										scope:this,
										iconCls:'btn-reset',
										handler:this.reset
									}							
								]	
				});// end of searchPanel

				this.topbar = new Ext.Toolbar({
						items : [{
									iconCls : 'btn-add',
									text : '添加[PlThirdInterfaceLog]',
									xtype : 'button',
									scope : this,
									handler : this.createRs
								}, {
									iconCls : 'btn-del',
									text : '删除[PlThirdInterfaceLog]',
									xtype : 'button',
									scope:this,
									handler : this.removeSelRs
								}]
				});
	
				this.gridPanel=new HT.GridPanel({
					region:'center',
					tbar:this.topbar,
					//使用RowActions
					rowActions:true,
					id:'PlThirdInterfaceLogGrid',
					url : __ctxPath + "/thirdInterface/listPlThirdInterfaceLog.do",
					fields : [{
									name : 'id',
									type : 'int'
								}
																																																	,'typeName'
																																										,'typeId'
																																										,'code'
																																										,'codeMsg'
																																										,'bigMsg'
																																										,'createTime'
																																										,'interfaceName'
																																										,'memberId'
																																										,'memberType'
																																			],
					columns:[
								{
									header : 'id',
									dataIndex : 'id',
									hidden : true
								}
																																																								,{
																	header : 'typeName',	
																	dataIndex : 'typeName'
								}
																																																,{
																	header : 'typeId',	
																	dataIndex : 'typeId'
								}
																																																,{
																	header : 'code',	
																	dataIndex : 'code'
								}
																																																,{
																	header : 'codeMsg',	
																	dataIndex : 'codeMsg'
								}
																																																,{
																	header : 'bigMsg',	
																	dataIndex : 'bigMsg'
								}
																																																,{
																	header : 'createTime',	
																	dataIndex : 'createTime'
								}
																																																,{
																	header : 'interfaceName',	
																	dataIndex : 'interfaceName'
								}
																																																,{
																	header : 'memberId',	
																	dataIndex : 'memberId'
								}
																																																,{
																	header : 'memberType',	
																	dataIndex : 'memberType'
								}
																																								, new Ext.ux.grid.RowActions({
									header:'管理',
									width:100,
									actions:[{
											 iconCls:'btn-del',qtip:'删除',style:'margin:0 3px 0 3px'
										},{
											 iconCls:'btn-edit',qtip:'编辑',style:'margin:0 3px 0 3px'
										}
									],
									listeners:{
										scope:this,
										'action':this.onRowAction
									}
								})
					]//end of columns
				});
				
				this.gridPanel.addListener('rowdblclick',this.rowClick);
					
			},// end of the initComponents()
			//重置查询表单
			reset : function(){
				this.searchPanel.getForm().reset();
			},
			//按条件搜索
			search : function() {
				$search({
					searchPanel:this.searchPanel,
					gridPanel:this.gridPanel
				});
			},
			//GridPanel行点击处理事件
			rowClick:function(grid,rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
					new PlThirdInterfaceLogForm({id:rec.data.id}).show();
				});
			},
			//创建记录
			createRs : function() {
				new PlThirdInterfaceLogForm().show();
			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
					url:__ctxPath+ '/thirdInterface/multiDelPlThirdInterfaceLog.do',
					ids:id,
					grid:this.gridPanel
				});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
					url:__ctxPath + '/thirdInterface/multiDelPlThirdInterfaceLog.do',
					grid:this.gridPanel,
					idName:'id'
				});
			},
			//编辑Rs
			editRs : function(record) {
				new PlThirdInterfaceLogForm({
					id : record.data.id
				}).show();
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this,record.data.id);
						break;
					case 'btn-edit' :
						this.editRs.call(this,record);
						break;
					default :
						break;
				}
			}
});
