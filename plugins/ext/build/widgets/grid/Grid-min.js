/*
 * Ext - JS Library 1.0 Alpha 2
 * Copyright(c) 2006-2007, Jack Slocum.
 * 
 * http://www.extjs.com/license.txt
 */

Ext.grid.Grid=function(_1,_2){this.container=Ext.get(_1);this.container.update("");this.container.setStyle("overflow","hidden");this.id=this.container.id;Ext.apply(this,_2);if(this.ds){this.dataSource=this.ds;delete this.ds;}if(this.cm){this.colModel=this.cm;delete this.cm;}if(this.sm){this.selModel=this.sm;delete this.sm;}this.events={"click":true,"dblclick":true,"contextmenu":true,"mousedown":true,"mouseup":true,"mouseover":true,"mouseout":true,"keypress":true,"keydown":true,"cellclick":true,"celldblclick":true,"rowclick":true,"rowdblclick":true,"headerclick":true,"headerdblclick":true,"rowcontextmenu":true,"cellcontextmenu":true,"headercontextmenu":true,"bodyscroll":true,"columnresize":true,"columnmove":true,"startdrag":true,"enddrag":true,"dragdrop":true,"dragover":true,"dragenter":true,"dragout":true};};Ext.extend(Ext.grid.Grid,Ext.util.Observable,{minColumnWidth:25,autoSizeColumns:false,autoSizeHeaders:true,monitorWindowResize:true,maxRowsToMeasure:0,trackMouseOver:false,enableDragDrop:false,enableColumnMove:true,enableRowHeightSync:false,stripeRows:true,autoHeight:false,autoWidth:false,view:null,allowTextSelectionPattern:/INPUT|TEXTAREA|SELECT/i,render:function(){var c=this.container;if((!c.dom.offsetHeight||c.dom.offsetHeight<20)||c.getStyle("height")=="auto"){this.autoHeight=true;}if((!c.dom.offsetWidth||c.dom.offsetWidth<20)){this.autoWidth=true;}var _4=this.getView();_4.init(this);c.on("click",this.onClick,this);c.on("dblclick",this.onDblClick,this);c.on("contextmenu",this.onContextMenu,this);c.on("keydown",this.onKeyDown,this);this.relayEvents(c,["mousedown","mouseup","mouseover","mouseout","keypress"]);this.getSelectionModel().init(this);_4.render();return this;},reconfigure:function(_5,_6){this.view.bind(_5,_6);this.dataSource=_5;this.colModel=_6;this.view.refresh(true);},onKeyDown:function(e){this.fireEvent("keydown",e);},destroy:function(_8,_9){var c=this.container;c.removeAllListeners();this.view.destroy();this.colModel.purgeListeners();if(!_9){this.purgeListeners();}c.update("");if(_8===true){c.remove();}},processEvent:function(_b,e){this.fireEvent(_b,e);var t=e.getTarget();var v=this.view;var _f=v.findHeaderIndex(t);if(_f!==false){this.fireEvent("header"+_b,this,_f,e);}else{var row=v.findRowIndex(t);var _11=v.findCellIndex(t);if(row!==false){this.fireEvent("row"+_b,this,row,e);if(_11!==false){this.fireEvent("cell"+_b,this,row,_11,e);}}}},onClick:function(e){this.processEvent("click",e);},onContextMenu:function(e,t){this.processEvent("contextmenu",e);},onDblClick:function(e){this.processEvent("dblclick",e);},walkCells:function(row,col,_18,fn,_1a){var cm=this.colModel,_1c=cm.getColumnCount();var ds=this.dataSource,_1e=ds.getCount(),_1f=true;if(_18<0){if(col<0){row--;_1f=false;}while(row>=0){if(!_1f){col=_1c-1;}_1f=false;while(col>=0){if(fn.call(_1a||this,row,col,cm)===true){return [row,col];}col--;}row--;}}else{if(col>=_1c){row++;_1f=false;}while(row<_1e){if(!_1f){col=0;}_1f=false;while(col<_1c){if(fn.call(_1a||this,row,col,cm)===true){return [row,col];}col++;}row++;}}return null;},getSelections:function(){return this.selModel.getSelections();},autoSize:function(){this.view.layout();if(this.view.adjustForScroll){this.view.adjustForScroll();}},stopEditing:function(){},getSelectionModel:function(){if(!this.selModel){this.selModel=new Ext.grid.RowSelectionModel();}return this.selModel;},getDataSource:function(){return this.dataSource;},getColumnModel:function(){return this.colModel;},getView:function(){if(!this.view){this.view=new Ext.grid.GridView();}return this.view;},getDragDropText:function(){return this.ddText.replace("%0",this.selModel.getCount());}});Ext.grid.Grid.prototype.ddText="%0 selected row(s)";
