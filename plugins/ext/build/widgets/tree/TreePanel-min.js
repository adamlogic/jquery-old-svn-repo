/*
 * Ext - JS Library 1.0 Alpha 2
 * Copyright(c) 2006-2007, Jack Slocum.
 * 
 * http://www.extjs.com/license.txt
 */

Ext.tree.TreePanel=function(el,_2){Ext.tree.TreePanel.superclass.constructor.call(this);this.el=Ext.get(el);this.id=this.el.id;Ext.apply(this,_2||{},{rootVisible:true,lines:true,enableDD:false,hlDrop:Ext.enableFx});Ext.apply(this.events,{"beforeload":true,"load":true,"textchange":true,"beforeexpand":true,"beforecollapse":true,"expand":true,"disabledchange":true,"collapse":true,"beforeclick":true,"click":true,"dblclick":true,"contextmenu":true,"beforechildrenrendered":true,"startdrag":true,"enddrag":true,"dragdrop":true,"beforenodedrop":true,"nodedrop":true,"nodedragover":true});if(this.singleExpand){this.on("beforeexpand",this.restrictExpand,this);}};Ext.extend(Ext.tree.TreePanel,Ext.data.Tree,{restrictExpand:function(_3){var p=_3.parentNode;if(p){if(p.expandedChild&&p.expandedChild.parentNode==p){p.expandedChild.collapse();}p.expandedChild=_3;}},setRootNode:function(_5){Ext.tree.TreePanel.superclass.setRootNode.call(this,_5);if(!this.rootVisible){_5.ui=new Ext.tree.RootTreeNodeUI(_5);}return _5;},getEl:function(){return this.el;},getLoader:function(){return this.loader;},expandAll:function(){this.root.expand(true);},collapseAll:function(){this.root.collapse(true);},getSelectionModel:function(){if(!this.selModel){this.selModel=new Ext.tree.DefaultSelectionModel();}return this.selModel;},expandPath:function(_6,_7,_8){_7=_7||"id";var _9=_6.split(this.pathSeparator);var _a=this.root;if(_a.attributes[_7]!=_9[1]){if(_8){_8(false,null);}return;}var _b=1;var f=function(){if(++_b==_9.length){if(_8){_8(true,_a);}return;}var c=_a.findChild(_7,_9[_b]);if(!c){if(_8){_8(false,_a);}return;}_a=c;c.expand(false,false,f);};_a.expand(false,false,f);},selectPath:function(_e,_f,_10){_f=_f||"id";var _11=_e.split(this.pathSeparator);var v=_11.pop();if(_11.length>0){var f=function(_14,_15){if(_14&&_15){var n=_15.findChild(_f,v);if(n){n.select();if(_10){_10(true,n);}}}else{if(_10){_10(false,n);}}};this.expandPath(_11.join(this.pathSeparator),_f,f);}else{this.root.select();if(_10){_10(true,this.root);}}},render:function(){this.container=this.el.createChild({tag:"ul",cls:"x-tree-root-ct "+(this.lines?"x-tree-lines":"x-tree-no-lines")});if(this.containerScroll){Ext.dd.ScrollManager.register(this.el);}if((this.enableDD||this.enableDrop)&&!this.dropZone){this.dropZone=new Ext.tree.TreeDropZone(this,this.dropConfig||{ddGroup:this.ddGroup||"TreeDD",appendOnly:this.ddAppendOnly===true});}if((this.enableDD||this.enableDrag)&&!this.dragZone){this.dragZone=new Ext.tree.TreeDragZone(this,this.dragConfig||{ddGroup:this.ddGroup||"TreeDD",scroll:this.ddScroll});}this.getSelectionModel().init(this);this.root.render();if(!this.rootVisible){this.root.renderChildren();}return this;}});
