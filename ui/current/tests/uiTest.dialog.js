
	var uiTestDialog = {
		"dialog": {
			"default": {
				"" : "$('#foo').dialog();",
				"clone" : "$('#foo').clone().dialog();",
				"empty" : "$([]).dialog();",
				"detached" : "$('<div/>').dialog();"
			},
			"options": {
				"buttons" : {
					"OkCancel" : "$('#foo').dialog({ width: 650, height: 300,\n\tbuttons: {\n\t\t'Ok': function() {\n\t\t\t$(this).dialogClose();\n\t\t},\n\t\t'Cancel': function() {\n\t\t\t$(this).dialogClose();\n\t\t}\n\t}\n});"
				},
				"draggable" : {
					"true" : "$('#foo').dialog({\n\t draggable: true \n});",
					"false" : "$('#foo').dialog({\n\t draggable: false \n});"
				},
				"height" : {
					"400" : "$('#foo').dialog({\n\t height: 400 \n});",
					"600" : "$('#foo').dialog({\n\t height: 600 \n});"
				},
				"maxHeight" : {
					"40" : "$('#foo').dialog({\n\t maxHeight: 40 \n});",
					"400" : "$('#foo').dialog({\n\t maxHeight: 400 \n});",
					"600" : "$('#foo').dialog({\n\t maxHeight: 600 \n});"
				},
				"minHeight" : {
					"40" : "$('#foo').dialog({\n\tminHeight: 40 \n});",
					"400" : "$('#foo').dialog({\n\tminHeight: 400 \n});",
					"600" : "$('#foo').dialog({\n\tminHeight: 600 \n});"
				},
				"maxWidth" : {
					"40" : "$('#foo').dialog({\n\t maxWidth: 40 \n});",
					"400" : "$('#foo').dialog({\n\t maxWidth: 400 \n});",
					"600" : "$('#foo').dialog({\n\t maxWidth: 600 \n});"
				},
				"minWidth" : {
					"40" : "$('#foo').dialog({\n\t minWidth: 40 \n});",
					"400" : "$('#foo').dialog({\n\t minWidth: 400 \n});",
					"600" : "$('#foo').dialog({\n\t minWidth: 600 \n});"
				},
				"position" : {
					"center" : "$('#foo').dialog({\n\t position: 'center' \n});",
					"top" : "$('#foo').dialog({\n\t position: 'top' \n});",
					"right" : "$('#foo').dialog({\n\t position: 'right' \n});",
					"bottom" : "$('#foo').dialog({\n\t position: 'bottom' \n});",
					"left" : "$('#foo').dialog({\n\t position: 'left' \n});"
				},
				"resizable" : {
					"true" : "$('#foo').dialog({\n\t resizable: true \n});",
					"false" : "$('#foo').dialog({\n\t resizable: false \n});"
				},
				"title" : {
					"attribute" : "$('#foo').attr( 'title', 'Dialog Title' ).dialog();",
					"option" : "$('#foo').dialog({\n\t title: 'Dialog Title' \n});"
				},
				"width" : {
					"400" : "$('#foo').dialog({\n\t width: 400 \n});",
					"600" : "$('#foo').dialog({\n\t width: 600 \n});"
				}
			},
			"callbacks": {
			},
			"methods": {
				"dialogInit" : "$('#foo').dialogInit();\nsetTimeout(\"$('#foo').dialogOpen();\", 1000);",
				"dialogOpen" : "$('#foo').dialog({ width: 450 }).dialogClose();\n setTimeout(\"$('#foo').dialogOpen();\", 1000)",
				"dialogClose" : "$('#foo').dialog({ width: 450 });\n setTimeout(\"$('#foo').dialogClose();\", 1000);"
			}
		}
	};