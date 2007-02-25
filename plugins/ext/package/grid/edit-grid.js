/*
 * Ext - JS Library 1.0 Alpha 2
 * Copyright(c) 2006-2007, Jack Slocum.
 * 
 * http://www.extjs.com/license.txt
 */

Ext.grid.EditorGrid=function(_1,_2){Ext.grid.EditorGrid.superclass.constructor.call(this,_1,_2);this.container.addClass("xedit-grid");if(!this.selModel){this.selModel=new Ext.grid.CellSelectionModel();}this.activeEditor=null;Ext.apply(this.events,{"beforeedit":true,"afteredit":true});this.on("bodyscroll",this.stopEditing,this);this.on(this.clicksToEdit==1?"cellclick":"celldblclick",this.onCellDblClick,this);};Ext.extend(Ext.grid.EditorGrid,Ext.grid.Grid,{isEditor:true,clicksToEdit:2,onCellDblClick:function(g,_4,_5){this.startEditing(_4,_5);},onEditComplete:function(ed,_7,_8){this.editing=false;ed.un("specialkey",this.onEditorKey,this);if(_7!=_8){var r=this.dataSource.getAt(ed.row);var _a=this.colModel.getDataIndex(ed.col);if(this.fireEvent("afteredit",this,r,_a,ed.row,ed.col)!==false){r.set(_a,_7);}}this.view.focusCell(ed.row,ed.col);},startEditing:function(_b,_c,_d){this.stopEditing();if(this.colModel.isCellEditable(_c,_b)){this.view.focusCell(_b,_c);var r=this.dataSource.getAt(_b);var _f=this.colModel.getDataIndex(_c);if(this.fireEvent("beforeedit",this,r,_f,_b,_c)!==false){this.editing=true;(function(){var ed=this.colModel.getCellEditor(_c,_b);ed.row=_b;ed.col=_c;ed.on("complete",this.onEditComplete,this,{single:true});ed.on("specialkey",this.selModel.onEditorKey,this.selModel);this.activeEditor=ed;var v;if(_d){v=_d.join("");_d.splice(0,_d.length);}else{v=r.data[_f];}ed.startEdit(this.view.getCell(_b,_c),v);}).defer(50,this);}}},stopEditing:function(){if(this.activeEditor){this.activeEditor.completeEdit();}this.activeEditor=null;}});

Ext.grid.GridEditor=function(_1,_2){Ext.grid.GridEditor.superclass.constructor.call(this,_1,_2);};Ext.extend(Ext.grid.GridEditor,Ext.Editor,{alignment:"tl-tl",autoSize:"width",hideEl:false,cls:"xgrid-editor",shim:false,shadow:"frame"});

