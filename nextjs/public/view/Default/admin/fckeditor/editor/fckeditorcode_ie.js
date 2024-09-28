/*
 * FCKeditor - The text editor for Internet - http://www.fckeditor.net
 * Copyright (C) 2
 -2009 Frederico Caldeira Knabben
 *
 * == BEGIN LICENSE ==
 *
 * Licensed under the terms of any of the following licenses at your
 * choice:
 *
 *  - GNU General Public License Version 2 or later (the "GPL")
 *    http://www.gnu.org/licenses/gpl.htm
 *
 *  - GNU Lesser General Public License Version 2.1 or later (the "LGPL")
 *    http://www.gnu.org/licenses/lgpl.htm
 *
 *  - Mozilla Public License Version 1.1 or later (the "MPL")
 *    http://www.mozilla.org/MPL/MPL-1.1.htm
 *
 * == END LICENSE ==
 *
 * This file has been compressed for better performance. The original source
 * can be found at "editor/_source".
 */
var FCK_STATUS_NOTLOADED=window.parent.FCK_STATUS_NOTLOADED=0;
var FCK_STATUS_ACTIVE=window.parent.FCK_STATUS_ACTIVE=1;
var FCK_STATUS_COMPLETE=window.parent.FCK_STATUS_COMPLETE=2;
var FCK_TRISTATE_OFF=window.parent.FCK_TRISTATE_OFF=0;
var FCK_TRISTATE_ON=window.parent.FCK_TRISTATE_ON=1;
var FCK_TRISTATE_DISABLED=window.parent.FCK_TRISTATE_DISABLED=-1;
var FCK_UNKNOWN=window.parent.FCK_UNKNOWN=-9;
var FCK_TOOLBARITEM_ONLYICON=window.parent.FCK_TOOLBARITEM_ONLYICON=0;
var FCK_TOOLBARITEM_ONLYTEXT=window.parent.FCK_TOOLBARITEM_ONLYTEXT=1;
var FCK_TOOLBARITEM_ICONTEXT=window.parent.FCK_TOOLBARITEM_ICONTEXT=2;
var FCK_EDITMODE_WYSIWYG=window.parent.FCK_EDITMODE_WYSIWYG=0;
var FCK_EDITMODE_SOURCE=window.parent.FCK_EDITMODE_SOURCE=1;
var FCK_IMAGES_PATH='images/';
var FCK_SPACER_PATH='images/spacer.gif';
var CTRL=1000;
var SHIFT=2000;
var ALT=4000;
var FCK_STYLE_BLOCK=0;
var FCK_STYLE_INLINE=1;
var FCK_STYLE_OBJECT=2;
String.prototype.Contains=function(A)//查找(a)是否存在
{
	//prototype 属性	返回对象类型原型的引用。
	return (this.indexOf(A)>-1);
	//indexOf 方法	返回 String 对象内第一次出现子字符串的字符位置。 
};
String.prototype.Equals=function()//是否，可在已有参数中找到当前标签名
{//this='input'
	var A=arguments;//[object Object]
	//arguments 	返回一个包含传递给当前执行函数的每个参数的数组。
	if (A.length==1&&A[0].pop)//false
	{//pop 方法	移除数组中的最后一个元素并返回该元素。
		//A.length=2
		//A[0]="input"
		A=A[0];
	}
	for (var i=0;i<A.length;i++)
	{//A.length=2
		if (this==A[i])//true
		return true;
	};
	return false;
};
String.prototype.IEquals=function()//当前对象等于参数返回true否则false
{
	var A=this.toUpperCase();
	//toUpperCase　　方法返回一个字符串，该字符串中的所有字母都被转化为大写字母。 
	var B=arguments;
	if (B.length==1&&B[0].pop)
	{
		B=B[0];
	}
	for (var i=0;i<B.length;i++)
	{
		if (A==B[i].toUpperCase()) return true;
	};
	return false;
};
String.prototype.ReplaceAll=function(A,B)
{
	var C=this;
	for (var i=0;i<A.length;i++)
	{
		C=C.replace(A[i],B[i]);
	};
	return C;
};
String.prototype.StartsWith=function(A)//当前字符串是否有(1)
{
	return (this.substr(0,A.length)==A);
};
String.prototype.EndsWith=function(A,B)
{
	var C=this.length;
	var D=A.length;
	if (D>C) 
	return false;
	if (B)
	{
		var E=new RegExp(A+'$','i');
		return E.test(this);
	}
	else
	return (D==0||this.substr(C-D,D)==A);
};
String.prototype.Remove=function(A,B)
{
	var s='';
	if (A>0)
	s=this.substring(0,A);
	if (A+B<this.length) 
	s+=this.substring(A+B,this.length);
	return s;
};
String.prototype.Trim=function()
{
	return this.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g,'');
};
String.prototype.LTrim=function()//删除字符串的多余空格。 
{
	return this.replace(/^[ \t\n\r]*/g,'');
};
String.prototype.RTrim=function()
{
	return this.replace(/[ \t\n\r]*$/g,'');
};
String.prototype.ReplaceNewLineChars=function(A)//将换行符替换为(1)
{
	return this.replace(/\n/g,A);
};
String.prototype.Replace=function(A,B,C)
{
	if (typeof B=='function')
	{
		return this.replace(A,function()
									   {
										   return B.apply(C||this,arguments);
										});
	}
	else 
	return this.replace(A,B);
};
Array.prototype.IndexOf=function(A)
{
	for (var i=0;i<this.length;i++)
	{
		if (this[i]==A) return i;
	};
	return-1;
};
var	FCKIECleanup=function(A)//自定义对象.(a)对象名
{//A=[object]	为"window"
	if (A._FCKCleanupObj)//未定义就为"undefined"	返回false		
	{
		this.Items=A._FCKCleanupObj.Items;
	}
	else
	{
		this.Items=[];
		A._FCKCleanupObj=this;
		FCKTools.AddEventListenerEx(A,'unload',FCKIECleanup_Cleanup);//把函数绑定为事件.(a)节点.(b)事件名.(c)事件函数.(d)参数数组
			//A=[object]
			//B="unload"
			//c=函数
	}
};
FCKIECleanup.prototype.AddItem=function(A,B)//将a和b添加到Items数组中，并返回数组的新长度值
{
	this.Items.push([A,B]);//=1		//注:是二维数组了
	//Items 方法		返回一个数组，其中包含了一个 Dictionary 对象中的所有条目。
	/*	push 方法
	将新元素添加到一个数组中，并返回数组的新长度值。
	arrayObj.push([item1 [item2 [. . . [itemN ]]]])
	参数
	arrayObj
	必选项。一个 Array 对象。
	item, item2,. . . itemN
	可选项。该 Array 的新元素。
	*/
};
function FCKIECleanup_Cleanup()//????????
{
	if (!this._FCKCleanupObj||(FCKConfig.MsWebBrowserControlCompat&&!window.FCKUnloadFlag)) //false
	return;
	var A=this._FCKCleanupObj.Items;
	while (A.length>0)
	{//A.length=519
		var B=A.pop();
		//pop 方法	移除数组中的最后一个元素并返回该元素。
		//B=",function(){o.Source=null;o.Params=null;}"
		if (B) B[1].call(B[0]);
	};
	this._FCKCleanupObj=null;
	if (CollectGarbage)//a是函数
	CollectGarbage();
};
var s=navigator.userAgent.toLowerCase();
//s="mozilla/4.0(compatible;msie 6.0; windows nt 5.2; sv1;.net clr 1.1.4322)"
//navigator	它提供了当前浏览器的类型和版本信息.
	//userAgent 属性		浏览器发往服务器的HTTP协议中的用户代理头.
		//toLowerCase	方法返回一个字符串，该字符串中的字母被转换为小写字母。
var FCKBrowserInfo=
{
	IsIE:/*@cc_on!@*/false,//激活条件编译支持。
	IsIE7:/*@cc_on!@*/false&&(parseInt(s.match(/msie (\d+)/)[1],10)>=7),//是IE 7
	//parseInt 方法	返回由字符串转换得到的整数。
	//match 方法		使用正则表达式模式对字符串执行查找，并将包含查找的结果作为数组返回。
	IsIE6:/*@cc_on!@*/false&&(parseInt(s.match(/msie (\d+)/)[1],10)>=6),//是IE 6
	IsSafari:s.Contains(' applewebkit/'),//false	查找(a)是否存在	
	IsOpera:!!window.opera,
	IsAIR:s.Contains(' adobeair/'),//查找(a)是否存在
	IsMac:s.Contains('maclngosh')//查找(a)是否存在
};
(function(A)
		  {
			  A.IsGecko=(navigator.product=='Gecko')&&!A.IsSafari&&!A.IsOpera;
			  A.IsGeckoLike=(A.IsGecko||A.IsSafari||A.IsOpera);
			  if (A.IsGecko)
			  {
				  var B=s.match(/rv:(\d+\.\d+)/);
				  var C=B&&parseFloat(B[1]);
				  if (C)
				  {
					  A.IsGecko10=(C<1.8);
					  A.IsGecko19=(C>1.8);
				  }
			  }
		  }
)(FCKBrowserInfo);
var FCKURLParams={};
(function()
		  {
			  var A=document.location.search.substr(1).split('&');//="InstanceName=m_content,Toolbar=rendie"
			  for (var i=0;i<A.length;i++)
			  {//A.length=2
				  var B=A[i].split('='); //="InstanceName,Toolbar"
				  var C=decodeURIComponent(B[0]);//="InstanceName"
				  //decodeURIComponent 方法		返回统一资源标识符 (URI) 的一个已编码组件的非编码形式。
				  var D=decodeURIComponent(B[1]);//="Toolbar"
				  FCKURLParams[C]=D;//将url后面的值存入FCKURLParams数组中
			  }
		  }
)();
var FCKEvents=function(A)
{/*
* FCKEvents : 事件處理程序管理器
* param : owner 事件處理程序管理器的 owner ( 擁有者 ) 
*/
	this.Owner=A;
	this._RegisteredEvents={};
};
/*
* FCKEvents.AttachEvent : 新增一個事件處理程序到指定事件中
* param : eventName 指定的事件名稱
* param : handler 事件處理程序
*/
FCKEvents.prototype.AttachEvent=function(A,B)//新增一個事件(a)事件名称.(b)事件函数
{
	//A="OnSelectionChange"
	//B="function(){FCKStyles.CheckSelectionChanges();}"
	var C;
	if (!(C=this._RegisteredEvents[A]))//true
	{
		this._RegisteredEvents[A]=[B];
	}
	else
	{
		if (C.IndexOf(B)==-1)
		C.push(B);
	}
};
/*
* FCKEvents.FireEvent : 觸發指定事件
* param : eventName 指定的事件名稱
* param : arg 事件處理程序的參數值
*/ 
FCKEvents.prototype.FireEvent=function(A,B){var C=true;var D=this._RegisteredEvents[A];if (D){for (var i=0;i<D.length;i++){try{C=(D[i](this.Owner,B)&&C);}catch(e){if (e.number!=-2146823277) throw e;}}};return C;};
var FCKDataProcessor=function(){};
FCKDataProcessor.prototype=
{
	ConvertToHtml:function(A)//给内容(a)增加html默认标记
	{
		//1="xxxxxxxxxxxxxxxxxxxxxx"
		if (FCKConfig.FullPage)//false
		{
			FCK.DocTypeDeclaration=A.match(FCKRegexLib.DocTypeTag);
			if (!FCKRegexLib.HasBodyTag.test(A))
			A='<body>'+A+'</body>';
			if (!FCKRegexLib.htmOpener.test(A))
			A='<html dir="'+FCKConfig.ContentLangDirection+'">'+A+'</html>';
			if (!FCKRegexLib.HeadOpener.test(A))
			A=A.replace(FCKRegexLib.htmOpener,'$&<head><title></title></head>');
			return A;
		}
		else
		{
			var B=FCKConfig.DocType+'<html dir="'+FCKConfig.ContentLangDirection+'"';
			//B='<html dir="ltr"'
			//FCKConfig.DocType=""
			//ContentLangDirection="ltr"
			if (FCKBrowserInfo.IsIE&&FCKConfig.DocType.length>0&&!FCKRegexLib.htm4DocType.test(FCKConfig.DocType)) //false
			B+=' style="overflow-y: scroll"';
			B+='><head><title></title></head><body'+FCKConfig.GetBodyAttributes()+'>'+A;
			B+='</body></html>';
			//B='<html dir="ltr"><head><title></title></head><body>xxxxxxxxxxxxxxxxxxxxxx</body></html>'
			return B;
		}
	},
	ConvertToDataFormat:function(A,B,C,D)//排版(a)节点的内容
	{
		//A.innerHTML=内容		b=true		c=true		d=true
		var E=FCKXHtml.GetXHTML(A,!B,D);//=内容
		//A.innerHTML=内容	b=false		c=true	
		if (C&&FCKRegexLib.EmptyOutParagraph.test(E)) //false
		return '';
		return E;
	},
	FixHtml:function(A){return A;}
};
var FCK=
{
	Name:FCKURLParams['InstanceName'],
	Status:0,
	EditMode:0,//开关编辑模式
	Toolbar:null,
	HasFocus:false,//HasFocus : 是否已經有物件取得了 focus 
	DataProcessor:new FCKDataProcessor(),
	GetInstanceObject:(function()
								{
									var w=window;
									return function(name)
									{//a="frameElement"
										return w[name];
									}
								})(),
	AttachToOnSelectionChange:function(A)//当文档的选中状态改变时执行(a)函数
	{
	/*	
	a=函数如下:
	function(A)
	{
		var B=(A?A.ToolbarSet:this).ItemsContextSensitive;
		for (var i=0;i<B.length;i++) 
		B[i].RefreshState();
	};	
	*/
		this.Events.AttachEvent('OnSelectionChange',A);//新增一個事件(a)事件名称.(b)事件函数
		//onselectionchange 当文档的选中状态改变时触发
	},
	GetLinkedFieldValue:function()//返回要编辑的内容
	{
		return this.LinkedField.value;//=内容
	},
	GetParentForm:function()
	{
		return this.LinkedField.form;
	},
	StartupValue:'',
	IsDirty:function()//返回内容是否相同
	{
		if (this.EditMode==1)//false
		return (this.StartupValue!=this.EditingArea.Textarea.value);
		else
		{
			if (!this.EditorDocument)//false
			return false;
			return (this.StartupValue!=this.EditorDocument.body.innerHTML);//false
		}
	},
	ResetIsDirty:function()//设置"StartupValue"为内容
	{
		if (this.EditMode==1)//false
		this.StartupValue=this.EditingArea.Textarea.value;
		else
		if (this.EditorDocument.body)//true
		this.StartupValue=this.EditorDocument.body.innerHTML;
	},
	StartEditor:function()//显示编辑器的内容
	{
		this.TempBaseTag=FCKConfig.BaseHref.length>0?'<base href="'+FCKConfig.BaseHref+'" _fcktemp="true"></base>':'';//=""
		var A=FCK.KeystrokeHandler=new FCKKeystrokeHandler();//定义"Keystrokes"和"CancelCtrlDefaults"属性
		A.OnKeystroke=_FCK_KeystrokeHandler_OnKeystroke;//=函数
		A.SetKeystrokes(FCKConfig.Keystrokes);//在"Keystrokes"数组中添加内容.
		if (FCKBrowserInfo.IsIE7)//false
		{
			if ((CTRL+86) in A.Keystrokes) A.SetKeystrokes([CTRL+86,true]);
			if ((SHIFT+45) in A.Keystrokes) A.SetKeystrokes([SHIFT+45,true]);
		};
		A.SetKeystrokes([CTRL+8,true]);//在"Keystrokes"数组中添加内容.
		this.EditingArea=new FCKEditingArea(document.getElementById('xEditingArea'));//初始化
		this.EditingArea.FFSpellChecker=FCKConfig.FirefoxSpellChecker;//false
		this.SetData(this.GetLinkedFieldValue(),true);//显示编辑器的内容
		//GetLinkedFieldValue:function()//返回要编辑的内容
		//a="xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"	
		FCKTools.AddEventListener(document,"keydown",this._TabKeyHandler);//把函数绑定为事件.(a)对象.(a)事件名.(c)事件函数
		this.AttachToOnSelectionChange(_FCK_PaddingNodeListener);//当文档的选中状态改变时执行(a)函数
		if (FCKBrowserInfo.IsGecko) //false
		this.AttachToOnSelectionChange(this._ExecCheckEmptyBlock);//当文档的选中状态改变时执行(a)函数.
	},
	SetDatarow:function(A)//显示编辑器的内容的行数
	{
		var a=A.split(/\s*\n+\s*/g)
		var C=document.createElement('TABLE');
		C.cellPadding=0;
		//cellPadding 属性可设置或返回单元格边框与单元格内容之间的空白量（以像素为单位）。
		C.cellSpacing=0;
		//cellSpacing 属性可设置或返回在表格中的单元格之间的空白量（以像素为单位）。
		C.className="m_contentrow"
		var E,F;
		for(var i=0;i<a.length;i++)
		{
			E=C.insertRow(-1);
			F=E.insertCell(-1);
			//F.onmousedown=this.a_1;
			FCKTools.AddEventListenerEx(F,'click',this.a_1,[a[i]]);//把函数绑定为事件.(a)节点.(b)事件名.(c)事件函数.(d)参数数组
			F.innerHTML+=i+1
		}
		return A+C.outerHTML;
	},
	a_1:function(a,b)
	{
		//var A=FCK.GetLinkedFieldValue()
		//A=A.replace(/<!--[\s\S]*?-->/g,"$1\n");//

		//var mytextrange=document.body.createTextRange()
		//if(mytextrange.findText(b))
		//mytextrange.select()
	},
	Focus:function()
	{
		FCK.EditingArea.Focus();
	},
	SetStatus:function(A)//设置焦点的事件
	{//a=1
		this.Status=A;
		if (A==1)//true
		{
			FCKFocusManager.AddWindow(window,true);//设置获得焦点和失去焦点的事件
			if (FCKBrowserInfo.IsIE)//true
			FCKFocusManager.AddWindow(window.frameElement,true);
			if (FCKConfig.StartupFocus)//false
			FCK.Focus();
		};
		this.Events.FireEvent('OnStatusChange',A);
	},
	FixBody:function()//不符
	{
		var A=FCKConfig.EnterMode;//='br'
		if (A!='p'&&A!='div')//true
		return;
		alert('~~~FixBody:function()') 
		var B=this.EditorDocument;
		if (!B) return;
		var C=B.body;
		if (!C) return;
		FCKDomTools.TrimNode(C);
		var D=C.firstChild;
		//firstChild 属性可返回文档的首个子节点。
		var E;
		while (D)
		{
			var F=false;
			switch (D.nodeType)
			{
				case 1:
				var G=D.nodeName.toLowerCase();
				if (!FCKListsLib.BlockElements[G]&&G!='li'&&!D.getAttribute('_fckfakelement')&&D.getAttribute('_moz_dirty')==null)
				F=true;	break;
				case 3:
				if (E||D.nodeValue.Trim().length>0) 
				F=true;	break;
				case 8:
				if (E)F=true;break;
			};
			if (F)
			{
				var H=D.parentNode;
				//扩展parentNode指针的功能，实现一次能够操纵多个父元素
				if (!E) 
				E=H.insertBefore(B.createElement(A),D);
				E.appendChild(H.removeChild(D));
				D=E.nextSibling;
			}
			else
			{
				if (E)
				{
					FCKDomTools.TrimNode(E);E=null;
				};
				D=D.nextSibling;
			}
		};
		if (E) FCKDomTools.TrimNode(E);
	},
	GetData:function(A)
	{
		//1=true
		if (FCK.EditMode==1)//false
		return FCK.EditingArea.Textarea.value;
		this.FixBody();//不符
		var B=FCK.EditorDocument;//=[object]   为另一个IFRME框架的Document对象
		if (!B)//false
		return null;
		var C=FCKConfig.FullPage;//=true
		var D=FCK.DataProcessor.ConvertToDataFormat(C?B.documentElement:B.body,!C,FCKConfig.IgnoreEmptyParagraphValue,A);//排版(a)节点的内容
		//1.nodeName="html"		2=true		3=true		4=true
		//documentElement 属性可返回文档的根节点。
		//nodeName 是节点名
		D=FCK.ProtectEventsRestore(D);//将(a)内容中以"on"开头的属性进行解码
		if (FCKBrowserInfo.IsIE)//false		//还原之前增加"___fcktoreplace:"属性
		D=D.replace(FCKRegexLib.ToReplace,'$1');
		//a=/___fcktoreplace:([\w]+)/ig
		if (C)//false
		{
			if (FCK.DocTypeDeclaration&&FCK.DocTypeDeclaration.length>0)
			D=FCK.DocTypeDeclaration+'\n'+D;
			if (FCK.XmlDeclaration&&FCK.XmlDeclaration.length>0) 
			D=FCK.XmlDeclaration+'\n'+D;
		};
		return FCKConfig.ProtectedSource.Revert(D);
	},
	UpdateLinkedField:function()
	{
		var A=FCK.GetXHTML(FCKConfig.FormatOutput);
		if (FCKConfig.htmEncodeOutput) A=FCKTools.htmEncode(A);//转义"<",">"和"&"
		FCK.LinkedField.value=A;
		FCK.Events.FireEvent('OnAfterLinkedFieldUpdate');
	},
	RegisteredDoubleClickHandlers:{},
	OnDoubleClick:function(A)
	{
		var B=FCK.RegisteredDoubleClickHandlers[A.tagName.toUpperCase()];
		if (B)
		{
			for (var i=0;i<B.length;i++)
			B[i](A);
		};
		B=FCK.RegisteredDoubleClickHandlers['*'];
		if (B)
		{
			for (var i=0;i<B.length;i++) 
			B[i](A);
		}
	},
	RegisterDoubleClickHandler:function(A,B)
	{
		var C=B||'*';C=C.toUpperCase();
		var D;
		if (!(D=FCK.RegisteredDoubleClickHandlers[C]))
		FCK.RegisteredDoubleClickHandlers[C]=[A];
		else
		{
			if (D.IndexOf(A)==-1) D.push(A);
		}
	},
	OnAfterSetHTML:function()//触发指定事件
	{
		FCKDocumentProcessor.Process(FCK.EditorDocument);//设置"StartupValue"为内容
		FCKUndo.SaveUndoStep();//触发指定事件
		FCK.Events.FireEvent('OnSelectionChange');//触发指定事件
		//OnSelectionChange		为选中文本的事件
		FCK.Events.FireEvent('OnAfterSetHTML');//执行自己
	},
	ProtectUrls:function(A)//在A,img,area标记中增加"_fcksavedurl"属性为该标记的路径
	{
		//A=内容
		A=A.replace(FCKRegexLib.ProtectUrlsA,'$& _fcksavedurl=$1');//在A标记里增加属性
		//a=/<a(?=\s).*?\shref=((?:(?:\s*)("|').*?\2)|(?:[^"'][^ >]+))/gi
		//如:<a href=""
		A=A.replace(FCKRegexLib.ProtectUrlsImg,'$& _fcksavedurl=$1');//在img标记里增加属性
		//a=/<img(?=\s).*?\ssrc=((?:(?:\s*)("|').*?\2)|(?:[^"'][^ >]+))/gi
		//如:<img src=""		
		A=A.replace(FCKRegexLib.ProtectUrlsArea,'$& _fcksavedurl=$1');//在area标记里增加属性
		//a=/<area(?=\s).*?\shref=((?:(?:\s*)("|').*?\2)|(?:[^"'][^ >]+))/gi
		//如:<area href=""	注:多边形区域标签
		return A;
	},
	ProtectEvents:function(A)//修改所有标记中有"on"开头的事件名
	{
		//a=内容
		return A.replace(FCKRegexLib.TagsWithEvent,_FCK_ProtectEvents_ReplaceTags);//修改所有标记中有"on"开头的事件名
		//replace 方法	返回根据正则表达式进行文字替换后的字符串的复制。
		//a=/<[^\>]+ on\w+[\s\r\n]*=[\s\r\n]*?('|")[\s\S]+?\>/g
		//例如:<c onx="">	注:正则查找时空格不可忽略
		//b=函数
			//_FCK_ProtectEvents_ReplaceTags(A)//修改(a)
	},
	ProtectEventsRestore:function(A)//将(a)内容中以"on"开头的属性进行解码
	{
		return A.replace(FCKRegexLib.ProtectedEvents,_FCK_ProtectEvents_RestoreEvents);
		//a=/\s\w+_fckprotectedatt="([^"]+)"/g
		//_FCK_ProtectEvents_RestoreEvents(A,B)//解码
	},
	ProtectTags:function(A)//修改ABBR,XML,EMBED,OBJECT,META,HR的开始标记和结束标记
	{
		//A='<html dir="ltr"><head><title></title></head><body>xxxxxxxxxxxxxxxxxxxxxx</body></html>'
		var B=FCKConfig.ProtectedTags;//=""
		if (FCKBrowserInfo.IsIE)//true
		B+=B.length>0?'|ABBR|XML|EMBED|OBJECT':'ABBR|XML|EMBED|OBJECT';//false
		//B="ABBR|XML|EMBED|OBJECT"
		var C;
		if (B.length>0)//true
		{//B.length=21
			C=new RegExp('<('+B+')(?!\w|:)','gi');
			//a=<(ABBR|XML|EMBED|OBJECT)(?!\w|:)
			//如:<abbr
			A=A.replace(C,'<FCK:$1');
			//如:<FCK:abbr
			C=new RegExp('<\/('+B+')>','gi');
			//a=<\/(ABBR|XML|EMBED|OBJECT)>
			//如:</abbr
			A=A.replace(C,'<\/FCK:$1>');
			//如:</FCK:abbr
		};
		B='META';
		if (FCKBrowserInfo.IsIE)//true
		B+='|HR';
		C=new RegExp('<(('+B+')(?=\\s|>|/)[\\s\\S]*?)/?>','gi');
		//a=<((META|HR)(?=\\s|>|/)[\\s\\S]*?)/?>
		//如:<META>
		A=A.replace(C,'<FCK:$1 />');
		//如:<FCK:META/>
		return A;
	},
	SetData:function(A,B)//显示编辑器的内容
	{
		//a=内容		b=true
		this.EditingArea.Mode=FCK.EditMode;//=1
		if (FCKBrowserInfo.IsIE&&FCK.EditorDocument)//false
		{
			FCK.EditorDocument.detachEvent("onselectionchange",Doc_OnSelectionChange);
		};
		FCKTempBin.Reset();//清空"Elements"数组中的内容
		FCK.Selection.Release();//设置"locked"属性为false并删除SelectionData属性
		if (FCK.EditMode==0)//true
		{
			this._ForceResetIsDirty=(B===true);//=true
			//===	全等（值和类型）	x===5 为 true；x===&quot;5&quot; 为 false
			A=FCKConfig.ProtectedSource.Protect(A);//去掉"html注释",替换script标记为修改的"html注释"
			//A=内容

			A=FCK.DataProcessor.ConvertToHtml(A);//给内容(a)增加html默认标记
			//A='<html dir="ltr"><head><title></title></head><body>xxxxxxxxxxxxxxxxxxxxxx</body></html>'
			A=A.replace(FCKRegexLib.InvalidSelfCloseTags,'$1></$2>');//给不知道的标记替换结束标记
			//如:<aa/>		结果:<aa></aa>
			A=FCK.ProtectEvents(A);//修改所有标记中有"on"开头的事件名
			A=FCK.ProtectUrls(A);//在A,img,area标记中增加"_fcksavedurl"属性为该标记的路径
			A=FCK.ProtectTags(A);//修改ABBR,XML,EMBED,OBJECT,META,HR的开始标记和结束标记
			if (FCK.TempBaseTag.length>0&&!FCKRegexLib.HasBaseTag.test(A)) //false
			A=A.replace(FCKRegexLib.HeadOpener,'$&'+FCK.TempBaseTag);
			var C='';
			if (!FCKConfig.FullPage) //true
			C+=_FCK_GetEditorAreaStyleTags();//载入外部样式
			if (FCKBrowserInfo.IsIE)//true
			C+=FCK._GetBehaviorsStyle();//载入内部样式 ".htc"
			else if (FCKConfig.ShowBorders)
			C+=FCKTools.GetStyleHtml(FCK_ShowTableBordersCSS,true);
			C+=FCKTools.GetStyleHtml(FCK_InternalCSS,true);//载入样式和语言文件
			A=A.replace(FCKRegexLib.HeadCloser,C+'$&');//替换</head>标签前插入样式内容
			//a=/<\/head\s*>/i
			this.EditingArea.OnLoad=_FCK_EditingArea_OnLoad;
			this.EditingArea.Start(A);//显示编辑器的内容
		}
		else
		{
			FCK.EditorWindow=null;
			FCK.EditorDocument=null;
			FCKDomTools.PaddingNode=null;
			this.EditingArea.OnLoad=null;
			this.EditingArea.Start(A);//显示编辑器的内容
			this.EditingArea.Textarea._FCKShowContextMenu=true;
			FCK.EnterKeyHandler=null;
			if (B) this.ResetIsDirty();
			FCK.KeystrokeHandler.AttachToElement(this.EditingArea.Textarea);
			this.EditingArea.Textarea.focus();
			FCK.Events.FireEvent('OnAfterSetHTML');
		};
		if (FCKBrowserInfo.IsGecko)//false
		window.onresize();
	},
	RedirectNamedCommands:{},
	ExecuteNamedCommand:function(A,B,C,D)
	{
		if (!D) FCKUndo.SaveUndoStep();
		if (!C&&FCK.RedirectNamedCommands[A]!=null)
		FCK.ExecuteRedirectedNamedCommand(A,B);
		else
		{
			FCK.Focus();
			FCK.EditorDocument.execCommand(A,false,B);
			FCK.Events.FireEvent('OnSelectionChange');
		};
		if (!D) FCKUndo.SaveUndoStep();
	},
	GetNamedCommandState:function(A)
	{
		try
		{
			if (FCKBrowserInfo.IsSafari&&FCK.EditorWindow&&A.IEquals('Paste'))
			return 0;
			if (!FCK.EditorDocument.queryCommandEnabled(A))
			return -1;
			else
			{
				return FCK.EditorDocument.queryCommandState(A)?1:0;
			}
		}
		catch (e)
		{return 0;}
	},
	GetNamedCommandValue:function(A)
	{
		var B='';
		var C=FCK.GetNamedCommandState(A);
		if (C==-1)
		return null;
		try
		{
			B=this.EditorDocument.queryCommandValue(A);
		}
		catch(e) {};
		return B?B:'';
	},
	Paste:function(A)
	{
		if (FCK.Status!=2||!FCK.Events.FireEvent('OnPaste')) 
		return false;
		return A||FCK._ExecPaste();
	},
	PasteFromWord:function()
	{
		FCKDialog.OpenDialog('FCKDialog_Paste',FCKLang.PasteFromWord,'dialog/fck_paste.html',400,330,'Word');
	},
	Preview:function()//预览
	{
		var A;
		if (FCKConfig.FullPage)//true
		{
			if (FCK.TempBaseTag.length>0)//false
			A=FCK.TempBaseTag+FCK.GetXHTML();
			else 
			A=FCK.GetXHTML();//=内容
		}
		else
		{
			A=FCKConfig.DocType+'<html dir="'+FCKConfig.ContentLangDirection+'"><head>'+FCK.TempBaseTag+'<title>'+FCKLang.Preview+'</title>'+_FCK_GetEditorAreaStyleTags()+'</head><body'+FCKConfig.GetBodyAttributes()+'>'+FCK.GetXHTML()+'</body></html>';
		};
		var B=FCKConfig.ScreenWidth*0.8;
		var C=FCKConfig.ScreenHeight*0.7;
		var D=(FCKConfig.ScreenWidth-B)/2;
		var E='';
		if (FCK_IS_CUSTOM_DOMAIN&&FCKBrowserInfo.IsIE)//false
		{
			window._FCKHtmlToLoad=A;
			E='javascript:void( (function(){document.open() ;document.domain="'+document.domain+'" ;document.write( window.opener._FCKHtmlToLoad );document.close() ;window.opener._FCKHtmlToLoad = null ;})() )';
		};
		var F=window.open(E,null,'toolbar=yes,location=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width='+B+',height='+C+',left='+D);
		if (!FCK_IS_CUSTOM_DOMAIN||!FCKBrowserInfo.IsIE)//true
		{
			F.document.write(A);
			F.document.close();
		}
	},
	SwitchEditMode:function(A)//开关编辑模式
	{
		//a=undefined
		var B=(FCK.EditMode==0);//true	开关
		var C=FCK.IsDirty();//false		返回内容是否相同	
		var D;
		if (B)//true
		{
			FCKCommands.GetCommand('ShowBlocks').SaveState();//=0	设置"_SavedState"属性
			if (!A&&FCKBrowserInfo.IsIE)//true
			FCKUndo.SaveUndoStep();//设置当文档的选中状态改变时触发事件
			D=FCK.GetXHTML(FCKConfig.FormatSource);//=内容
			//1=true
			//	D=FCK.SetDatarow(D);//显示编辑器的内容的行数
			if (FCKBrowserInfo.IsIE)//true
			FCKTempBin.ToHtml();//修改当前Elements数组的内容
			if (D==null)//false
			return false;
		}
		else 
		{
			D=this.EditingArea.Textarea.value;//=内容
		}
		FCK.EditMode=B?1:0;//=1
		FCK.SetData(D,!C);//显示编辑器的内容
		//a=内容		b=true
		FCK.Focus();
		FCKTools.RunFunction(FCK.ToolbarSet.RefreshModeState,FCK.ToolbarSet);
		//a=函数		b=[object Object]
		return true;
	},
	InsertElement:function(A)
	{
		if (typeof A=='string')
		A=this.EditorDocument.createElement(A);
		var B=A.nodeName.toLowerCase();
		FCKSelection.Restore();
		var C=new FCKDomRange(this.EditorWindow);
		C.MoveToSelection();
		C.DeleteContents();
		if (FCKListsLib.BlockElements[B]!=null)
		{
			if (C.StartBlock)
			{
				if (C.CheckStartOfBlock()) 
				C.MoveToPosition(C.StartBlock,3);
				else if (C.CheckEndOfBlock()) 
				C.MoveToPosition(C.StartBlock,4);
				else
				C.SplitBlock();
			};
			C.InsertNode(A);
			var D=FCKDomTools.GetNextSourceElement(A,false,null,['hr','br','param','img','area','input'],true);
			if (!D&&FCKConfig.EnterMode!='br')
			{
				D=this.EditorDocument.body.appendChild(this.EditorDocument.createElement(FCKConfig.EnterMode));
				if (FCKBrowserInfo.IsGeckoLike)
				FCKTools.AppendBogusBr(D);
			};
			if (FCKListsLib.EmptyElements[B]==null)
			C.MoveToElementEditStart(A);
			else if (D)
			C.MoveToElementEditStart(D);
			else
			C.MoveToPosition(A,4);
			if (FCKBrowserInfo.IsGeckoLike)
			{
				if (D) FCKDomTools.ScrollIntoView(D,false);
				FCKDomTools.ScrollIntoView(A,false);
			}
		}
		else
		{
			C.InsertNode(A);
			C.SetStart(A,4);
			C.SetEnd(A,4);
		};
		C.Select();
		C.Release();
		this.Focus();
		return A;
	},
	_InsertBlockElement:function(A){},
	_IsFunctionKey:function(A)
	{
		if (A>=16&&A<=20)
		return true;
		if (A==27||(A>=33&&A<=40))
		return true;
		if (A==45)
		return true;
		return false;
	},
	_KeyDownListener:function(A)
	{
		if (!A) 
		A=FCK.EditorWindow.event;
		if (FCK.EditorWindow)
		{
			if (!FCK._IsFunctionKey(A.keyCode)&&!(A.ctrlKey||A.metaKey)&&!(A.keyCode==46))
			FCK._KeyDownUndo();
		};
		return true;
	},
	_KeyDownUndo:function()
	{
		if (!FCKUndo.Typing)
		{
			FCKUndo.SaveUndoStep();
			FCKUndo.Typing=true;
			FCK.Events.FireEvent("OnSelectionChange");
		};
		FCKUndo.TypesCount++;
		FCKUndo.Changed=1;
		if (FCKUndo.TypesCount>FCKUndo.maxTypes)
		{
			FCKUndo.TypesCount=0;
			FCKUndo.SaveUndoStep();
		}
	},
	_TabKeyHandler:function(A)
	{
		if (!A) 
		A=window.event;
		var B=A.keyCode;
		if (B==9&&FCK.EditMode!=0)
		{
			if (FCKBrowserInfo.IsIE)
			{
				var C=document.selection.createRange();
				if (C.parentElement()!=FCK.EditingArea.Textarea)
				return true;
				C.text='\t';
				C.select();
			}
			else
			{
				var a=[];
				var D=FCK.EditingArea.Textarea;
				var E=D.selectionStart;
				var F=D.selectionEnd;
				a.push(D.value.substr(0,E));
				a.push('\t');
				a.push(D.value.substr(F));
				D.value=a.join('');
				D.setSelectionRange(E+1,E+1);
			};
			if (A.preventDefault)
			return A.preventDefault();
			return A.returnValue=false;
		};
		return true;
	}
};
FCK.Events=new FCKEvents(FCK);//FCK.Events : FCK 的事件處理程序管理器
FCK.GetHTML=FCK.GetXHTML=FCK.GetData;//=函数
FCK.SetHTML=FCK.SetData;//=函数
FCK.InsertElementAndGetIt=FCK.CreateElement=FCK.InsertElement;//=函数
function _FCK_ProtectEvents_ReplaceTags(A)//修改(a)
{
	//a='<b onx="x">'
	return A.replace(FCKRegexLib.EventAttributes,_FCK_ProtectEvents_ReplaceEvents);
	//a=/\s(on\w+)[\s\r\n]*=[\s\r\n]*?('|")([\s\S]*?)\2/g
	//如: onx=""
	//b=函数
		//_FCK_ProtectEvents_ReplaceEvents(A,B)//修改属性名和参数。(a)为修改前的参数.(b)为修改前的属性
			//注：请看下面规律。
			//xxx.replace(/('11')('22')('33')/g,yyy(a,b,c,d))
				//则a="112233"	b="11"	c="22"	d="33"
};
function _FCK_ProtectEvents_ReplaceEvents(A,B)//修改属性名和参数。(a)为修改前的参数.(b)为修改前的属性
{	//a='onx="x"'	b='onx'
	return ' '+B+'_fckprotectedatt="'+encodeURIComponent(A)+'"';
	//encodeURIComponent 方法	将文本字符串编码为一个统一资源标识符 (URI) 的一个有效组件。
};
function _FCK_ProtectEvents_RestoreEvents(A,B)//解码
{
	//a='onx_fckprotectedatt="%20onx%3D%%22x%22"'
	//b="%20onx%3D%%22x%22"
	return decodeURIComponent(B);//='onx="x"'
	/*
	实例
	在本例中，我们将使用 decodeURIComponent() 对编码后的 URI 进行解码：
	<script type="text/javascript">
	var test1="http://www.w3school.com.cn/My first/"
	document.write(encodeURIComponent(test1)+ "<br />")//编码
	document.write(decodeURIComponent(test1))//解码
	</script>
	输出：
	http%3A%2F%2Fwww.w3school.com.cn%2FMy%20first%2F
	http://www.w3school.com.cn/My first/
	*/
};
function _FCK_MouseEventsListener(A)
{
	if (!A) 
	A=window.event;
	if (A.type=='mousedown')
	FCK.MouseDownFlag=true;
	else if (A.type=='mouseup') 
	FCK.MouseDownFlag=false;
	else if (A.type=='mousemove')
	FCK.Events.FireEvent('OnMouseMove',A);
};
function _FCK_PaddingNodeListener()
{
	if (FCKConfig.EnterMode.IEquals('br'))
	return;
	FCKDomTools.EnforcePaddingNode(FCK.EditorDocument,FCKConfig.EnterMode);
	if (!FCKBrowserInfo.IsIE&&FCKDomTools.PaddingNode)
	{
		var A=FCKSelection.GetSelection();
		if (A&&A.rangeCount==1)
		{
			var B=A.getRangeAt(0);
			if (B.collapsed&&B.startContainer==FCK.EditorDocument.body&&B.startOffset==0)
			{
				B.selectNodeContents(FCKDomTools.PaddingNode);
				B.collapse(true);
				A.removeAllRanges();
				A.addRange(B);
			}
		}
	}
	else if (FCKDomTools.PaddingNode)
	{
		var C=FCKSelection.GetParentElement();
		var D=FCKDomTools.PaddingNode;
		if (C&&C.nodeName.IEquals('body'))
		{
			if (FCK.EditorDocument.body.childNodes.length==1&&FCK.EditorDocument.body.firstChild==D)
			{
				if (FCKSelection._GetSelectionDocument(FCK.EditorDocument.selection)!=FCK.EditorDocument)
				return;
				var B=FCK.EditorDocument.body.createTextRange();
				var F=false;
				if (!D.childNodes.firstChild)
				{
					D.appendChild(FCKTools.GetElementDocument(D).createTextNode('\ufeff'));
					F=true;
				};
				B.moveToElementText(D);
				B.select();
				if (F)
				B.pasteHTML('');
			}
		}
	}
};
function _FCK_EditingArea_OnLoad()//显示编辑器的内容
{
	FCK.EditorWindow=FCK.EditingArea.Window;//为iframe内的window对象
	FCK.EditorDocument=FCK.EditingArea.Document;//为iframe内的document对象
	if (FCKBrowserInfo.IsIE)//true
	FCKTempBin.ToElements();//不符
	FCK.InitializeBehaviors();//设置触发事件
	FCK.MouseDownFlag=false;
	FCKTools.AddEventListener(FCK.EditorDocument,'mousemove',_FCK_MouseEventsListener);
	//onmousemove 当用户将鼠标划过对象时触发。
	FCKTools.AddEventListener(FCK.EditorDocument,'mousedown',_FCK_MouseEventsListener);
	//onmousedown 当用户用任何鼠标按钮单击对象时触发。
	FCKTools.AddEventListener(FCK.EditorDocument,'mouseup',_FCK_MouseEventsListener);
	//onmouseup 当用户在鼠标位于对象之上时释放鼠标按钮时触发。
	if (FCKBrowserInfo.IsSafari)//false
	{
		var A=function(evt)
		{
			if (!(evt.ctrlKey||evt.metaKey)) return;
			if (FCK.EditMode!=0) return;
			switch (evt.keyCode)
			{
				case 89:FCKUndo.Redo();
				break;
				case 90:FCKUndo.Undo();
				break;
			}
		};
		FCKTools.AddEventListener(FCK.EditorDocument,'keyup',A);
	};
	FCK.EnterKeyHandler=new FCKEnterKey(FCK.EditorWindow,FCKConfig.EnterMode,FCKConfig.ShiftEnterMode,FCKConfig.TabSpaces);
	//FCKEnterKey=function(A,B,C,D)//设置"Enter","ShiftEnter","Backspace","CtrlBackspace","CtrlBackspace","Delete"键的事件.
	//a=[object]	b="p"	c="br"	d=0
	FCK.KeystrokeHandler.AttachToElement(FCK.EditorDocument);
	if (FCK._ForceResetIsDirty)//true
	FCK.ResetIsDirty();//设置"StartupValue"为内容
	if (FCKBrowserInfo.IsIE&&FCK.HasFocus)//false
	FCK.EditorDocument.body.setActive();
	FCK.OnAfterSetHTML();//触发指定事件
	//parent.document.write(FCK.EditorDocument.documentElement.outerHTML)
	FCKCommands.GetCommand('ShowBlocks').RestoreState();//不符
	if (FCK.Status!=0)//false
	return;
	FCK.SetStatus(1);//设置焦点的事件
};
function _FCK_GetEditorAreaStyleTags()//载入外部样式
{
	return FCKTools.GetStyleHtml(FCKConfig.EditorAreaCSS)+FCKTools.GetStyleHtml(FCKConfig.EditorAreaStyles);
	//=<link href="http://192.168.0.2/move/admin/fckeditor/editor/fck_editorarea.css" type="text/css" rel="stylesheet"/>
	//FCKTools.GetStyleHtml//载入样式
	//FCKConfig.EditorAreaCSS="http://192.168.0.2/move/admin/fckeditor/editor/fck_editorarea.css"
	//EditorAreaStyles=""
};
function _FCK_KeystrokeHandler_OnKeystroke(A,B)
{
	if (FCK.Status!=2) return false;
	if (FCK.EditMode==0)
	{
		switch (B)
		{
			case 'Paste':return!FCK.Paste();
			case 'Cut':FCKUndo.SaveUndoStep();
			return false;
		}
	}
	else
	{
		if (B.Equals('Paste','Undo','Redo','SelectAll','Cut')) return false;
	};
	var C=FCK.Commands.GetCommand(B);
	if (C.GetState()==-1) return false;
	return (C.Execute.apply(C,FCKTools.ArgumentsToArray(arguments,2))!==false);
};
(function()//定义"LinkedField"属性为"编辑区"的元素返问
		  {
			  var A=window.parent.document;//当前窗口的上一级窗口
			  //Parent 属性		指示在分级结构中是当前成员的父的成员。
			  var B=A.getElementById(FCK.Name);
			  //FCK.Name="m_content"
			  var i=0;
			  while (B||i==0)//如果不能建立ID返问，就查找名称进行返问
			  {
				  if (B&&B.tagName.toLowerCase().Equals('textarea','input'))//true
				  {
					  //tagName 	属性返回被选元素的标签名。
					  //toLowerCase 方法	返回一个字符串，该字符串中的字母被转换为小写字母。
					  //String.prototype.Equals=function()//是否，可在已有参数中找到当前标签名
					FCK.LinkedField=B;//=[object]
					break;
				  };
				  B=A.getElementsByName(FCK.Name)[i++];
			  }
		 })();
var FCKTempBin=
{
	Elements:[],
	AddElement:function(A)//在"Elements"数组中增加(a)并返回新的长度值
	{
		var B=this.Elements.length;
		this.Elements[B]=A;
		return B;
	},
	RemoveElement:function(A)
	{
		var e=this.Elements[A];
		this.Elements[A]=null;return e;
	},
	Reset:function()//清空"Elements"数组中的内容
	{
		var i=0;
		while (i<this.Elements.length)
		{//this.Elements.length=0
			this.Elements[i++]=null;
		}
		this.Elements.length=0;
	},
	ToHtml:function()//修改当前Elements数组的内容
	{
		for (var i=0;i<this.Elements.length;i++)
		{//this.Elements.length=5
			this.Elements[i]='<div>&nbsp;'+this.Elements[i].outerHTML+'</div>';
			//this.Elements[0]='<div>&nbsp;undefined</div>'
			this.Elements[i].isHtml=true;
		}
	},
	ToElements:function()//不符
	{
		var A=FCK.EditorDocument.createElement('div');//准备插入div标记
		for (var i=0;i<this.Elements.length;i++)//1
		{
			if (this.Elements[i].isHtml)//false
			{
				A.innerHTML=this.Elements[i];
				this.Elements[i]=A.firstChild.removeChild(A.firstChild.lastChild);
			}
		}
	}
};
var FCKFocusManager=FCK.FocusManager=
{//FCKFocusManager: FCK focus 管理員，用來處理 FCKeditor 的上的 focu
	IsLocked:false,//是否 lock 住 focus，不再變更 focus
	/*
	AddWindow : 設定指定的 Element 或所在的 window.document ，使其納入
　  FCKFocusManager 的 管理
　  param : element 指定的 Element 
　  param : isAreaFocus 是否讓 FCK.EditingArea 取得 focus
　 */ 
	AddWindow:function(A,B)//设置获得焦点和失去焦点的事件
	{
		//A=[object]	B=true
	/*
　　 * 決定標的 ( target ) 物件的法則
　　 * 1. 在 MSIE 中若指定 element 為 IFRAME，則 target 物件為 IFRAME。
　　 * 2. 在 MSIE 中若指定element為IFRAME中的window，則target物件為IFRAME。
　　 * 3. 若不符上述條件者，則 target 物件為 element.document
　　 */ 　
		var C;
		if (FCKBrowserInfo.IsIE)
		{
			C=A.nodeType==1?A:A.frameElement?A.frameElement:A.document;
			//C=undefined?A:A.frameElement?A.frameElement:A.document;
			//C=A.frameElement?A.frameElement:A.document;
			//C=[object]?A.frameElement:A.document;
			//C=A.frameElement;
			//C.C.outerHTML='<IFRAME id=m_content___Frame style="BORDER-RIGHT: 0px; PADDING-RIGHT: 0px; BORDER-TOP: 0px; PADDING-LEFT: 0px; BACKGROUND-IMAGE: none; PADDING-BOTTOM: 0px; MARGIN: 0px; BORDER-LEFT: 0px; WIDTH: 100%; PADDING-TOP: 0px; BORDER-BOTTOM: 0px; HEIGHT: 100%; BACKGROUND-COLOR: transparent" src="fckeditor/editor/fckeditor.html?InstanceName=m_content&amp;Toolbar=rendie" frameBorder=0 width="100%" scrolling=no height="100%"></IFRAME>'
		}
		else if (FCKBrowserInfo.IsSafari)
		{
			C=A;
		}
		else
		{
			C=A.document;
		}
	/*
　　 * 在 target 物件上設定 blur 與 focus 事件處理程序
　　 */ 
		FCKTools.AddEventListener(C,'blur',FCKFocusManager_Win_OnBlur);//为(1)节点绑定为事件.(a)函数名,(b)函数体
		//blur 使元素失去焦点并触发 onblur 事件。
		FCKTools.AddEventListener(C,'focus',B?FCKFocusManager_Win_OnFocus_Area:FCKFocusManager_Win_OnFocus);
		//focus 使得元素得到焦点并执行由 onfocus 事件指定的代码。 
	},
	/*
　 * RemoveWindow : 移除之前用 AddWindow 對指定的 element 所作的設定。
　 * param : element 指定的 Element 
　 */ 
	RemoveWindow:function(A)
	{
	/*
　　 * 決定標的 ( target ) 物件的法則
　　 * 同 AddWindow 
　　 */ 
		if (FCKBrowserInfo.IsIE)
		oTarget=A.nodeType==1?A:A.frameElement?A.frameElement:A.document;
		else
		oTarget=A.document;
	/*
　　 * 移除 target 物件上設定的 blur 與 focus 事件處理程序
　　 */ 
		FCKTools.RemoveEventListener(oTarget,'blur',FCKFocusManager_Win_OnBlur);
		FCKTools.RemoveEventListener(oTarget,'focus',FCKFocusManager_Win_OnFocus_Area);
		FCKTools.RemoveEventListener(oTarget,'focus',FCKFocusManager_Win_OnFocus);
	},
	Lock:function()//设置"IsLocked"为true
	{
		this.IsLocked=true;
	},
	/*
　 * Unlock() : 解除 loc
　 */ 
	Unlock:function()
	{
	/*
　　 * 若 FCKFocusManager._HasPendingBlur 為 true，表示已有 blur 事件發生了
　　 * 觸發在 FCK 的事件，處理程序管理器 ( FCK.Event ) 上的 blur 事件
　　 */ 
		if (this._HasPendingBlur)
		FCKFocusManager._Timer=window.setTimeout(FCKFocusManager_FireOnBlur,100);
		this.IsLocked=false;
	},
	/*
　 * _ResetTimer() : 解除掉 Unlock() 中設定的 setTimeout
　 */ 
	_ResetTimer:function()
	{
		this._HasPendingBlur=false;
		if (this._Timer)
		{
			window.clearTimeout(this._Timer);delete this._Timer;
		}
	}
};
/*
* FCKFocusManager_Win_OnBlur() : blur 事件處理程序
* 本程序為FCKFocusManager 在 AddWindow 時為指定 element 所設定的 blur 事件
* 理程序
*/
function FCKFocusManager_Win_OnBlur()
{
	/*
　 * 若 focus 被取得了，則Reset 掉目前延遲觸發的FCKFocusManager_FireOnBlur()
　 * 後再重新觸發一次
　 */ 
	if (typeof(FCK)!='undefined'&&FCK.HasFocus)
	{
		FCKFocusManager._ResetTimer();
		FCKFocusManager._Timer=window.setTimeout(FCKFocusManager_FireOnBlur,100);
	}
};
/*
* FCKFocusManager_FireOnBlur() : 觸發 blur 事件
* 本程序是用在 FCKFocusManager.Unlock()、FCKFocusManager_Win_OnBlur
* 兩個地方來延遲觸發在 FCK 的事件處理程序管理器 ( FCK.Event ) 上的 blur 事件
*/
function FCKFocusManager_FireOnBlur()
{　/*
　 * 若 focus 被鎖定，則僅將 FCKFocusManager._HasPendingBlur 設為 true，註記
　 * 有 blur 事件發生了，待進行 FCKFocusManager.Unlock() 時再觸發在 FCK 的事
　 * 處理程序管理器 ( FCK.Event ) 上的 blur 事件
　 */ 
	if (FCKFocusManager.IsLocked)
	FCKFocusManager._HasPendingBlur=true;
	else
	{　
	/*
　 * 若 focus 未被鎖定，則將 focus 去掉，並觸發在 FCK 的事件處理程序管理器
　 * ( FCK.Event ) 上的 blur 事件
　 */
		FCK.HasFocus=false;
		FCK.Events.FireEvent("OnBlur");
	}
};
/*
* FCKFocusManager_Win_OnFocus_Area() : focus 事件處理程序
* 本程序為 FCKFocusManager 在 AddWindow 時將 isAreaFocus 設為 true 時為指定
* element 所設定的 focus 事件處理程序
* FCKFocusManager_Win_OnFocus_Area() 與 FCKFocusManager_Win_OnFocus() 差別在於 FCKFocusManager_Win_OnFocus_Area() 會先讓 FCK.EditingArea 取得 focu
*/
function FCKFocusManager_Win_OnFocus_Area()
{
	if (FCKFocusManager._IsFocusing)
	return;
	FCKFocusManager._IsFocusing=true;
	FCK.Focus();
	FCKFocusManager_Win_OnFocus();
	FCKTools.RunFunction(function()
								  {
									  delete FCKFocusManager._IsFocusing;
								  });
};
/*
* FCKFocusManager_Win_OnFocus() : focus 事件處理程序
* 本程序為 FCKFocusManager 在 AddWindow 時未將 isAreaFocus 設為 true 時為指
* 定 element 所設定的 focus 事件處理程序
*/ 
function FCKFocusManager_Win_OnFocus()
{　/*
　 * Reset 掉延遲觸發的 FCKFocusManager_FireOnBlur()
　 */ 
	FCKFocusManager._ResetTimer();
	/*
　 * 若 focus 尚未被取得，且未被鎖定，則取得 focus ，並觸發在 FCK 的事件處理
　 * 序管理器 ( FCK.Event ) 上的 focus 事件。
　 */ 
	if (!FCK.HasFocus&&!FCKFocusManager.IsLocked)
	{
		FCK.HasFocus=true;
		FCK.Events.FireEvent("OnFocus");
	}
};
(function()
		  {
			  var A=window.frameElement;
			  var B=A.width;
			  var C=A.height;
			  if (/^\d+$/.test(B))
			  B+='px';
			  if (/^\d+$/.test(C))
			  C+='px';
			  var D=A.style;
			  D.border=D.padding=D.margin=0;
			  D.backgroundColor='transparent';
			  D.backgroundImage='none';
			  D.width=B;D.height=C;
			})();
FCK.Description="FCKeditor for Internet Explorer 5.5+";
FCK._GetBehaviorsStyle=function()//载入内部样式".htc"
{
	if (!FCK._BehaviorsStyle)
	{
		var A=FCKConfig.BasePath;
		var B='';
		var C;
		C='<style type="text/css" _fcktemp="true">\n';
		if (FCKConfig.ShowBorders)
		B='url('+A+'css/behaviors/showtableborders.htc)\n';
		C+='.FCK__Anchor,\n'+
			'.FCK__PageBreak,\n'+
			'.FCK__InputHidden\n';
		if (FCKConfig.DisableObjectResizing)
		{
			C+=',IMG\n';
			B+=' url('+A+'css/behaviors/disablehandles.htc)\n';
		};
		C+='{\n '+
			'position:absolute;\nleft:242px;\ntop:126px;\n'+
			'z-index:1;\n'+
			'behavior: url('+A+'css/behaviors/disablehandles.htc) ; \n}\n';
		if (B.length>0) 
		C+='TABLE \n{\n   behavior: '+B+' ; \n}\n';
		C+='</style>\n';
		FCK._BehaviorsStyle=C;
	};
	return FCK._BehaviorsStyle;
};
function Doc_OnMouseUp()
{
	if (FCK.EditorWindow.event.srcElement.tagName=='HTML')//false
	{
		FCK.Focus();
		FCK.EditorWindow.event.cancelBubble=true;
		FCK.EditorWindow.event.returnValue=false;
	}
};
function Doc_OnPaste()
{
	var A=FCK.EditorDocument.body;
	A.detachEvent('onpaste',Doc_OnPaste);
	var B=FCK.Paste(!FCKConfig.ForcePasteAsPlainText&&!FCKConfig.AutoDetectPasteFromWord);
	A.attachEvent('onpaste',Doc_OnPaste);
	return B;
};
function Doc_OnDblClick()
{
	FCK.OnDoubleClick(FCK.EditorWindow.event.srcElement);
	FCK.EditorWindow.event.cancelBubble=true;
};
function Doc_OnSelectionChange()
{
	if (!FCK.IsSelectionChangeLocked&&FCK.EditorDocument) 
	FCK.Events.FireEvent("OnSelectionChange");
};
function Doc_OnDrop()
{
	if (FCK.MouseDownFlag)
	{
		FCK.MouseDownFlag=false;
		return;
	};
	if (FCKConfig.ForcePasteAsPlainText)
	{
		var A=FCK.EditorWindow.event;
		if (FCK._CheckIsPastingEnabled()||FCKConfig.ShowDropDialog)
		FCK.PasteAsPlainText(A.dataTransfer.getData('Text'));
		A.returnValue=false;
		A.cancelBubble=true;
	}
};
FCK.InitializeBehaviors=function(A)//设置触发事件
{
	this.EditorDocument.attachEvent('onmouseup',Doc_OnMouseUp);//把函数绑定为事件.(a)函数名,(b)函数体
	//onmouseup		松开鼠标按键是发生
	this.EditorDocument.body.attachEvent('onpaste',Doc_OnPaste);
	//onpaste	 当用户粘贴数据以便从系统剪贴板向文档传送数据时在目标对象上触发。
	this.EditorDocument.body.attachEvent('ondrop',Doc_OnDrop);
	//ondrop 当鼠标按钮在拖曳操作过程中释放时在目标对象上触发
	FCK.ContextMenu._InnerContextMenu.AttachToElement(FCK.EditorDocument.body);//设置右键菜单
	//a=[object]
	this.EditorDocument.attachEvent("onkeydown",FCK._KeyDownListener);
	//onkeydown 当用户按下键盘按键时触发。
	this.EditorDocument.attachEvent("ondblclick",Doc_OnDblClick);
	//ondblclick 当用户双击对象时触发。
	this.EditorDocument.attachEvent("onbeforedeactivate",
									function()
									{
										FCKSelection.Save();
									});
	//onbeforedeactivate 在 activeElement 从当前对象变为父文档其它对象之前立即触发。
	this.EditorDocument.attachEvent("onselectionchange",Doc_OnSelectionChange);
	//onselectionchange 当文档的选中状态改变时触发。
	FCKTools.AddEventListener(FCK.EditorDocument,'mousedown',Doc_OnMouseDown);
	//onmousedown 当用户用任何鼠标按钮单击对象时触发。
};
FCK.InsertHtml=function(A)
{
	A=FCKConfig.ProtectedSource.Protect(A);//去掉"html注释",替换script标记为修改的"html注释"
	A=FCK.ProtectEvents(A);
	A=FCK.ProtectUrls(A);
	A=FCK.ProtectTags(A);//修改ABBR,XML,EMBED,OBJECT,META,HR的开始标记和结束标记
	FCKSelection.Restore();
	FCK.EditorWindow.focus();
	FCKUndo.SaveUndoStep();
	var B=FCKSelection.GetSelection();
	if (B.type.toLowerCase()=='control')
	B.clear();
	A='<span id="__fakeFCKRemove__" style="display:none;">fakeFCKRemove</span>'+A;
	B.createRange().pasteHTML(A);
	FCK.EditorDocument.getElementById('__fakeFCKRemove__').removeNode(true);
	FCKDocumentProcessor.Process(FCK.EditorDocument);
	this.Events.FireEvent("OnSelectionChange");
};
FCK.SetInnerHtml=function(A)
{
	var B=FCK.EditorDocument;
	B.body.innerHTML='<div id="__fakeFCKRemove__">&nbsp;</div>'+A;
	B.getElementById('__fakeFCKRemove__').removeNode(true);
};
function FCK_PreloadImages()//设置图片的事件和属性
{
	var A=new FCKImagePreloader();//设置_Images为空数组
	A.AddImages(FCKConfig.PreloadImages);
	//AddImages(A)//在数组_Images中添加内容.(a)一个或多个链接
		//a="http://rendie/admin/fckeditor/editor/skins/images/toolbar.start.gif, http://rendie/admin/fckeditor/editor/skins/images/toolbar.buttonarrow.gif"
	A.AddImages(FCKConfig.SkinPath+'fck_strip.gif');
	//AddImages:function(A)//在数组_Images中添加内容.(a)一个或多个链接
		//A="http://rendie/admin/fckeditor/editor/skins/fck_strip.gif"
	A.OnComplete=LoadToolbarSetup;//显示所有的工具栏
	/*
	LoadToolbarSetup的函数如下:
	function LoadToolbarSetup()
	{
		FCKeditorAPI._FunctionQueue.Add( LoadToolbar );
	}
	*/
	A.Start();//设置图片的事件和属性
};
function Document_OnContextMenu()
{
	return (event.srcElement._FCKShowContextMenu==true);
};
document.oncontextmenu=Document_OnContextMenu;
function FCK_Cleanup()
{
	this.LinkedField=null;
	this.EditorWindow=null;
	this.EditorDocument=null;
};
FCK._ExecPaste=function()
{
	if (FCK._PasteIsRunning) 
	return true;
	if (FCKConfig.ForcePasteAsPlainText)
	{
		FCK.PasteAsPlainText();
		return false;
	};
	var A=FCK._CheckIsPastingEnabled(true);
	if (A===false)
	FCKTools.RunFunction(FCKDialog.OpenDialog,FCKDialog,['FCKDialog_Paste',FCKLang.Paste,'dialog/fck_paste.html',400,330,'Security']);
	else
	{
		if (FCKConfig.AutoDetectPasteFromWord&&A.length>0)
		{
			var B=/<\w[^>]*(( class="?MsoNormal"?)|(="mso-))/gi;
			if (B.test(A))
			{
				if (confirm(FCKLang.PasteWordConfirm))
				{
					FCK.PasteFromWord();
					return false;
				}
			}
		};
		FCK._PasteIsRunning=true;
		FCK.ExecuteNamedCommand('Paste');
		delete FCK._PasteIsRunning;
	};
	return false;
};

FCK.PasteAsPlainText=function(A)
{
	if (!FCK._CheckIsPastingEnabled())
	{
		FCKDialog.OpenDialog('FCKDialog_Paste',FCKLang.PasteAsText,'dialog/fck_paste.html',400,330,'PlainText');
		return;
	};
	var B=null;
	if (!A)
	B=clipboardData.getData("Text");
	else
	B=A;
	if (B&&B.length>0)
	{
		B=FCKTools.htmEncode(B);
		B=FCKTools.ProcessLineBreaks(window,FCKConfig,B);
		var C=B.search('</p>');
		var D=B.search('<p>');
		if ((C!=-1&&D!=-1&&C<D)||(C!=-1&&D==-1))
		{
			var E=B.substr(0,C);
			B=B.substr(C+4);
			this.InsertHtml(E);
		};
		FCKUndo.SaveLocked=true;
		this.InsertHtml(B);
		FCKUndo.SaveLocked=false;
	}
};
FCK._CheckIsPastingEnabled=function(A)
{
	FCK._PasteIsEnabled=false;
	document.body.attachEvent('onpaste',FCK_CheckPasting_Listener);
	var B=FCK.GetClipboardHTML();
	document.body.detachEvent('onpaste',FCK_CheckPasting_Listener);
	if (FCK._PasteIsEnabled)
	{
		if (!A) B=true;
	}
	else
	B=false;
	delete FCK._PasteIsEnabled;
	return B;
};
function FCK_CheckPasting_Listener()
{
	FCK._PasteIsEnabled=true;
};
FCK.GetClipboardHTML=function()
{
	var A=document.getElementById('___FCKHiddenDiv');
	if (!A)
	{
		A=document.createElement('DIV');
		A.id='___FCKHiddenDiv';
		var B=A.style;
		B.position='absolute';
		B.visibility=B.overflow='hidden';
		B.width=B.height=1;
		document.body.appendChild(A);
	};
	A.innerHTML='';
	var C=document.body.createTextRange();
	C.moveToElementText(A);
	C.execCommand('Paste');
	var D=A.innerHTML;
	A.innerHTML='';
	return D;
};
FCK.CreateLink=function(A,B)
{
	var C=[];
	FCK.ExecuteNamedCommand('Unlink',null,false,!!B);
	if (A.length>0)
	{
		if (FCKSelection.GetType()=='Control')
		{
			var D=this.EditorDocument.createElement('A');
			D.href=A;
			var E=FCKSelection.GetSelectedElement();
			E.parentNode.insertBefore(D,E);
			E.parentNode.removeChild(E);
			D.appendChild(E);
			return [D];
		};
		var F='javascript:void(0);/*'+(new Date().getTime())+'*/';
		FCK.ExecuteNamedCommand('CreateLink',F,false,!!B);
		var G=this.EditorDocument.links;
		for (i=0;i<G.length;i++)
		{
			var D=G[i];
			if (D.getAttribute('href',2)==F)
			{
				var I=D.innerHTML;
				D.href=A;
				D.innerHTML=I;
				var J=D.lastChild;
				if (J&&J.nodeName=='BR')
				{
					FCKDomTools.InsertAfterNode(D,D.removeChild(J));
				};
				C.push(D);
			}
		}
	};
return C;
};
function _FCK_RemoveDisabledAtt()
{
	this.removeAttribute('disabled');
};
function Doc_OnMouseDown(A)
{
	var e=A.srcElement;
	if (e.nodeName.IEquals('input')&&e.type.IEquals(['radio','checkbox'])&&!e.disabled)
	{
		e.disabled=true;
		FCKTools.SetTimeout(_FCK_RemoveDisabledAtt,1,e);
	}
};
var FCKConfig=FCK.Config={};
if (document.location.protocol=='file:')
{
	FCKConfig.BasePath=decodeURIComponent(document.location.pathname.substr(1));
	FCKConfig.BasePath=FCKConfig.BasePath.replace(/\\/gi,'/');
	var sFullProtocol=document.location.href.match(/^(file\:\/{2,3})/)[1];
	if (FCKBrowserInfo.IsOpera) 
	sFullProtocol+='localhost/';
	FCKConfig.BasePath=sFullProtocol+FCKConfig.BasePath.substring(0,FCKConfig.BasePath.lastIndexOf('/')+1);
}
else
FCKConfig.BasePath=document.location.protocol+'//'+document.location.host+document.location.pathname.substring(0,document.location.pathname.lastIndexOf('/')+1);
//FCKConfig.BasePath=http://rendie/admin/fckeditor/editor
	//document.location.protocol="http:"
	//document.location.host="localhost"
	//document.location.host+document.location.pathname="/move/admin/fckeditor/editor/fckeditor.html"
FCKConfig.FullBasePath=FCKConfig.BasePath;
FCKConfig.EditorPath=FCKConfig.BasePath.replace(/editor\/$/,'');
//FCKConfig.BasePath="http://rendie/admin/fckeditor/"
try
{
	FCKConfig.ScreenWidth=screen.width;
	//screen.width=1440
	FCKConfig.ScreenHeight=screen.height;
	//screen.height=900
}catch (e)
{
	FCKConfig.ScreenWidth=800;
	FCKConfig.ScreenHeight=600;
};	
FCKConfig.ProcessHiddenField=function()//条件不符
{
		this.PageConfig={};
		var A=window.parent.document.getElementById(FCK.Name+'___Config');
		//Parent 属性	指示在分级结构中是当前成员的父的成员。
		//FCK.Name+'___Config'="content___Config"
		if (!A) return;//false
		var B=A.value.split('&');//=""
		for (var i=0;i<B.length;i++)
		{//B.length=1
			if (B[i].length==0) continue;//true
			//continue 语句	停止循环的当前迭代，并开始新的迭代。 
			var C=B[i].split('=');
			var D=decodeURIComponent(C[0]);
			//decodeURIComponent 方法	返回统一资源标识符 (URI) 的一个已编码组件的非编码形式。
			var E=decodeURIComponent(C[1]);
			if (D=='CustomConfigurationsPath') 
			FCKConfig[D]=E;
			else 
			if (E.toLowerCase()=="true")
			this.PageConfig[D]=true;
			else
			if (E.toLowerCase()=="false")
			this.PageConfig[D]=false;
			else if (E.length>0&&!isNaN(E)) this.PageConfig[D]=parseInt(E,10);
			else 
			this.PageConfig[D]=E;
		}
};	
function FCKConfig_LoadPageConfig()//将FCKConfig.PageConfig对象相存入PageConfig数组中
{
		var A=FCKConfig.PageConfig;
		//A=[object][Object]
		for (var B in A)
		{
		FCKConfig[B]=A[B];
		}
};	
function FCKConfig_PreProcess()//设置样式的路径
{
		var A=FCKConfig;
		//A=[object Object]
		if (A.AllowQueryStringDebug)//true
		{
			try
			{
				if ((/fckdebug=true/i).test(window.top.location.search))//false
				A.Debug=true;
			}catch (e) {  }
		};
			if (!A.PluginsPath.EndsWith('/'))//false
			A.PluginsPath+='/';
			var B=A.ToolbarComboPreviewCSS;
			if (!B||B.length==0)//true
			A.ToolbarComboPreviewCSS=A.EditorAreaCSS;
			//A.ToolbarComboPreviewCSS="http://rendie/admin/fckeditor/editor/fck_editorarea.css"
			A.RemoveAttributesArray=(A.RemoveAttributes||'').split(',');
			//A.RemoveAttributesArray="class,style,lang,width,height,align,hspace,valign"
				//A.RemoveAttributes="class,style,lang,width,height,align,hspace,valign"
			if (!FCKConfig.SkinEditorCSS||FCKConfig.SkinEditorCSS.length==0)//true
			FCKConfig.SkinEditorCSS=FCKConfig.SkinPath+'fck_editor.css';
			//http://rendie/admin/fckeditor/editor/skins/silver/fck_editor.css
			if (!FCKConfig.SkinDialogCSS||FCKConfig.SkinDialogCSS.length==0)//true
			FCKConfig.SkinDialogCSS=FCKConfig.SkinPath+'fck_dialog.css';
};	
FCKConfig.ToolbarSets={};
FCKConfig.Plugins={};
FCKConfig.Plugins.Items=[];
FCKConfig.Plugins.Add=function(A,B,C)
{
	FCKConfig.Plugins.Items.push([A,B,C]);
};
FCKConfig.ProtectedSource={};
FCKConfig.ProtectedSource._CodeTag=(new Date()).valueOf();//=1271042370859
//valueOf 方法	返回指定对象的原始值。
FCKConfig.ProtectedSource.RegexEntries=[/<!--[\s\S]*?-->/g,/<script[\s\S]*?>([\s\S]*?)<\/script>/gi,/<noscript[\s\S]*?<\/noscript>/gi];
FCKConfig.ProtectedSource.Add=function(A)
{
	this.RegexEntries.push(A);
};
FCKConfig.ProtectedSource.Protect=function(A)//去掉"html注释",替换script标记为修改的"html注释"
{//1=内容
	var B=this._CodeTag;//原始日期值
	function _Replace(protectedSource)
	{
		if(i==1||i==2)
		{
			var leftstr=protectedSource.substring(0,protectedSource.indexOf(">")+1)
			protectedSource=protectedSource.substring(protectedSource.indexOf(">")+1,protectedSource.lastIndexOf("<") )
			protectedSource=js_beautify(protectedSource);
			if(protectedSource=="")
			{
				protectedSource='\n'+leftstr+protectedSource+'<\/script>\n';
			}
			else
			{
				protectedSource='\n'+leftstr+'\n'+protectedSource+'\n<\/script>\n';
			}
		}
		var C=FCKTempBin.AddElement(protectedSource);//在"Elements"数组中增加(a)并返回新的长度值
		return '<!--{'+B+C+'}-->';
	};
	
	for (var i=0;i<this.RegexEntries.length;i++)
	{//this.RegexEntries.length=3
		A=A.replace(this.RegexEntries[i],_Replace);
		//replace(1,2) 方法	返回根据正则表达式进行文字替换后的字符串的复制。
			//1="/<!--[\s\S]*?-->/g"
			//2=函数
	};
	return A;
};
FCKConfig.ProtectedSource.Revert=function(A,B)//还原特定的"html注释"
{
	//a=内容		b=undefined
	function _Replace(m,opener,index)
	{
		//a="{!--{1277020943125}-->"
		//b="<"		c=0
		var C=B?FCKTempBin.RemoveElement(index):FCKTempBin.Elements[index];//="<!--测试内容-->"
		return FCKConfig.ProtectedSource.Revert(C,B);//重复调用自己
	};
	var D=new RegExp("(<|&lt;)!--\\{"+this._CodeTag+"(\\d+)\\}--(>|&gt;)","g");
	//D="(<|&lt;)!--\{1277020943125(\d+)\}--(>|&gt;)"
	return A.replace(D,_Replace);
};
FCKConfig.GetBodyAttributes=function()
{
	var A='';
	if (this.BodyId&&this.BodyId.length>0)
	A+=' id="'+this.BodyId+'"';
	if (this.BodyClass&&this.BodyClass.length>0)
	A+=' class="'+this.BodyClass+'"';return A;
};
FCKConfig.ApplyBodyAttributes=function(A)
{
	if (this.BodyId&&this.BodyId.length>0)
	A.id=FCKConfig.BodyId;
	if (this.BodyClass&&this.BodyClass.length>0)
	A.className+=' '+FCKConfig.BodyClass;
};
var FCKDebug=
{
	Output:function(){},
	OutputObject:function(){}
};
var FCKDomTools=
{	
	MoveChildren:function(A,B,C)
	{
		if (A==B) 
		return;
		var D;
		if (C)
		{
			while ((D=A.lastChild))
			B.insertBefore(A.removeChild(D),B.firstChild);
			//firstChild 属性可返回文档的首个子节点。
		}
		else
		{
			while ((D=A.firstChild)) 
			B.appendChild(A.removeChild(D));
		}
	},
	MoveNode:function(A,B,C)
	{
		if (C)
		B.insertBefore(FCKDomTools.RemoveNode(A),B.firstChild);
		else
		B.appendChild(FCKDomTools.RemoveNode(A));
	},
	TrimNode:function(A)//删除字符串的多余空格
	{
		//A.tagName="p"	
		this.LTrimNode(A);//删除字符串的多余空格
		this.RTrimNode(A);
	},
	LTrimNode:function(A)//删除字符串的多余空格
	{
		//A.tagName="p"	
		var B;
		while ((B=A.firstChild))//=[object]
		{
			//firstChild 属性可返回文档的首个子节点。
			if (B.nodeType==3)//true
			{
		/*
		nodeType
		nodeType 属性可返回节点的类型。
		最重要的节点类型是：
		元素类型 节点类型 
		元素element		1 
		属性attr 		2 
		文本text			3 
		注释comments 	8 
		文档document		9 
		*/
				var C=B.nodeValue.LTrim();//="x xxx"
				//String.prototype.LTrim=function()//删除字符串的多余空格。 
				var D=B.nodeValue.length;//=5
				if (C.length==0)//false
				{//C.length=5
					A.removeChild(B);
					continue;
				}
				else if (C.length<D)//false
				{
					alert("没用2")
					B.splitText(D-C.length);
					A.removeChild(A.firstChild);
				}
			};
			break;
		}
	},
	RTrimNode:function(A)//删除字符串的多余空格
	{
		//A.tagName="p"	
		var B;
		while ((B=A.lastChild))
		{//lastChild	返回元素的最后一个子节点
			if (B.nodeType==3)
			{
		/*
		nodeType 属性可返回节点的类型。
		最重要的节点类型是：
		元素类型 节点类型 
		元素element		1 
		属性attr 		2 
		文本text			3 
		注释comments 	8 
		文档document		9 
		*/
				var C=B.nodeValue.RTrim();
				var D=B.nodeValue.length;
				if (C.length==0)
				{
					B.parentNode.removeChild(B);
					continue;
				}
				else if (C.length<D)
				{
					B.splitText(C.length);
					A.lastChild.parentNode.removeChild(A.lastChild);
				}
			};
			break;
		};
		if (!FCKBrowserInfo.IsIE&&!FCKBrowserInfo.IsOpera)//false
		{
			B=A.lastChild;
			if (B&&B.nodeType==1&&B.nodeName.toLowerCase()=='br')
			{
				B.parentNode.removeChild(B);
			}
		}
	},
	RemoveNode:function(A,B)//清除(a)节点
	{//a=[object]	b=undefined
		if (B)//false
		{
			var C;
			while ((C=A.firstChild)) 
			{
				//firstChild() 方法和一个自定义函数来获取一个节点的首个子节点。
				A.parentNode.insertBefore(A.removeChild(C),A);
				//insertBefore() 方法在一个指定的子节点之前插入一个节点。
			}
		};
		return A.parentNode.removeChild(A);
		//parentNode	属性来获取节点的父节点。
		//removeChild	清除指定元素及其所有子元素之间的空格
	},
	GetFirstChild:function(A,B)
	{
		if (typeof (B)=='string')
		B=[B];
		var C=A.firstChild;
		while(C)
		{
			if (C.nodeType==1&&C.tagName.Equals.apply(C.tagName,B))
			return C;C=C.nextSibling;
		};
		return null;
	},
	GetLastChild:function(A,B)
	{
		if (typeof (B)=='string')
		B=[B];
		var C=A.lastChild;
		while(C)
		{
			if (C.nodeType==1&&(!B||C.tagName.Equals(B)))
			return C;
			C=C.previousSibling;
		};
		return null;
	},
	GetPreviousSourceElement:function(A,B,C,D)
	{
		if (!A)
		return null;
		if (C&&A.nodeType==1&&A.nodeName.IEquals(C)) 
		return null;
		if (A.previousSibling)
		A=A.previousSibling;
		else
		return this.GetPreviousSourceElement(A.parentNode,B,C,D);
		while (A)
		{
			if (A.nodeType==1)
			{
				if (C&&A.nodeName.IEquals(C))
				break;
				if (!D||!A.nodeName.IEquals(D)) 
				return A;
			}
			else if (B&&A.nodeType==3&&A.nodeValue.RTrim().length>0)
			break;
			if (A.lastChild) 
			A=A.lastChild;
			else 
			return this.GetPreviousSourceElement(A,B,C,D);
		};
		return null;
	},
	GetNextSourceElement:function(A,B,C,D,E)
	{
		while((A=this.GetNextSourceNode(A,E)))
		{
			if (A.nodeType==1)
			{
				if (C&&A.nodeName.IEquals(C)) 
				break;
				if (D&&A.nodeName.IEquals(D)) 
				return this.GetNextSourceElement(A,B,C,D);
				return A;
			}
			else if (B&&A.nodeType==3&&A.nodeValue.RTrim().length>0)
			break;
		};
		return null;
	},
	GetNextSourceNode:function(A,B,C,D)
	{
		if (!A) 
		return null;
		var E;
		if (!B&&A.firstChild)
		E=A.firstChild;
		else
		{
			if (D&&A==D) 
			return null;
			E=A.nextSibling;
			if (!E&&(!D||D!=A.parentNode))
			return this.GetNextSourceNode(A.parentNode,true,C,D);
		};
		if (C&&E&&E.nodeType!=C)
		return this.GetNextSourceNode(E,false,C,D);
		return E;
	},
	GetPreviousSourceNode:function(A,B,C,D)
	{
		if (!A) 
		return null;
		var E;
		if (!B&&A.lastChild)
		E=A.lastChild;
		else
		{
			if (D&&A==D) 
			return null;
			E=A.previousSibling;
			if (!E&&(!D||D!=A.parentNode))
			return this.GetPreviousSourceNode(A.parentNode,true,C,D);
		};
		if (C&&E&&E.nodeType!=C)
		return this.GetPreviousSourceNode(E,false,C,D);
		return E;
	},
	InsertAfterNode:function(A,B)
	{
		return A.parentNode.insertBefore(B,A.nextSibling);
	},
	GetParents:function(A)
	{
		var B=[];
		while (A)
		{
			B.unshift(A);
			A=A.parentNode;
		};
		return B;
	},
	GetCommonParents:function(A,B)
	{
		var C=this.GetParents(A);
		var D=this.GetParents(B);
		var E=[];
		for (var i=0;i<C.length;i++)
		{
			if (C[i]==D[i])
			E.push(C[i]);
		};
		return E;
	},
	GetCommonParentNode:function(A,B,C)
	{
		var D={};
		if (!C.pop)
		C=[C];
		while (C.length>0)
		D[C.pop().toLowerCase()]=1;
		var E=this.GetCommonParents(A,B);
		var F=null;
		while ((F=E.pop()))
		{
			if (D[F.nodeName.toLowerCase()]) return F;
		};
		return null;
	},
	GetIndexOf:function(A)
	{//a=[object]
		var B=A.parentNode?A.parentNode.firstChild:null;//=[object]
		//扩展parentNode指针的功能，实现一次能够操纵多个父元素
		//firstChild 属性可返回文档的首个子节点。
		var C=-1;
		while (B)
		{
			C++;
			if (B==A)
			return C;
			B=B.nextSibling;
			//nextSibling - 获取下一个同属节点
		};
		return-1;
	},
	PaddingNode:null,
	EnforcePaddingNode:function(A,B)//插入换行标记
	{
/*	
		a=返回a的"document"属性
		b='br'
		try
		{
		   //在此运行代码
		}
		catch(err)
		{
		  //在此处理错误
		}
*/
		try
		{
			if (!A||!A.body)//false
			return;
		}
		catch (e){return;};
		this.CheckAndRemovePaddingNode(A,B,true);//不符
		try
		{
			if (A.body.lastChild&&(A.body.lastChild.nodeType!=1||A.body.lastChild.tagName.toLowerCase()==B.toLowerCase())) //false
			return;
		}
		catch (e)
		{return;};
		var C=A.createElement(B);//准备插入"br"标记
		//B="br"
		if (FCKBrowserInfo.IsGecko&&FCKListsLib.NonEmptyBlockElements[B])//false
		FCKTools.AppendBogusBr(C);
		this.PaddingNode=C;
		if (A.body.childNodes.length==1&&A.body.firstChild.nodeType==1&&A.body.firstChild.tagName.toLowerCase()=='br'&&(A.body.firstChild.getAttribute('_moz_dirty')!=null||A.body.firstChild.getAttribute('type')=='_moz'))//false
		A.body.replaceChild(C,A.body.firstChild);
		else
		A.body.appendChild(C);
	},
	CheckAndRemovePaddingNode:function(A,B,C)//不符
	{
		//a=[object]	节点
		//b="br"	c=undefined
		var D=this.PaddingNode;//unll
		if (!D)//true
		return;
		alert("不符1")
		try
		{
			if (D.parentNode!=A.body||D.tagName.toLowerCase()!=B||(D.childNodes.length>1)||(D.firstChild&&D.firstChild.nodeValue!='\xa0'&&String(D.firstChild.tagName).toLowerCase()!='br'))
			{
				this.PaddingNode=null;
				return;
			}
		}
		catch (e)
		{
			this.PaddingNode=null;
			return;
		};
		if (!C)
		{
			if (D.parentNode.childNodes.length>1)
			D.parentNode.removeChild(D);
			this.PaddingNode=null;
		}
	},
	HasAttribute:function(A,B)
	{
		if (A.hasAttribute) 
		return A.hasAttribute(B);
		else
		{
			var C=A.attributes[B];
			return (C!=undefined&&C.specified);
		}
	},
	HasAttributes:function(A)
	{
		var B=A.attributes;
		for (var i=0;i<B.length;i++)
		{
			if (FCKBrowserInfo.IsIE&&B[i].nodeName=='class')
			{
				if (A.className.length>0) return true;
			}
			else if (B[i].specified)
			return true;
		};
		return false;
	},
	RemoveAttribute:function(A,B)
	{
		if (FCKBrowserInfo.IsIE&&B.toLowerCase()=='class')
		B='className';
		return A.removeAttribute(B,0);
	},
	RemoveAttributes:function (A,B)
	{
		for (var i=0;i<B.length;i++) 
		this.RemoveAttribute(A,B[i]);
	},
	GetAttributeValue:function(A,B)
	{
		var C=B;
		if (typeof B=='string')
		B=A.attributes[B];
		else
		C=B.nodeName;
		if (B&&B.specified)
		{
			if (C=='style')
			return A.style.cssText;
			else if (C=='class'||C.indexOf('on')==0)
			return B.nodeValue;
			else
			{
				return A.getAttribute(C,2);
			}
		};
		return null;
	},
	Contains:function(A,B)
	{
		if (A.contains&&B.nodeType==1) 
		return A.contains(B);
		while ((B=B.parentNode))
		{
			if (B==A)
			return true;
		};
		return false;
	},
	BreakParent:function(A,B,C)
	{
		var D=C||new FCKDomRange(FCKTools.GetElementWindow(A));
		D.SetStart(A,4);
		D.SetEnd(B,4);
		var E=D.ExtractContents();
		D.InsertNode(A.parentNode.removeChild(A));
		//removeChild	清除指定元素及其所有子元素之间的空格
		E.InsertAfterNode(A);
		D.Release(!!C);
	},
	GetNodeAddress:function(A,B)
	{
		var C=[];
		while (A&&A!=FCKTools.GetElementDocument(A).documentElement)
		{
			var D=A.parentNode;
			var E=-1;
			for(var i=0;i<D.childNodes.length;i++)
			{
				var F=D.childNodes[i];
				if (B===true&&F.nodeType==3&&F.previousSibling&&F.previousSibling.nodeType==3) 
				continue;
				E++;
				if (D.childNodes[i]==A)
				break;
			};
			C.unshift(E);
			A=A.parentNode;
		};
		return C;
	},
	GetNodeFromAddress:function(A,B,C)
	{
		var D=A.documentElement;
		for (var i=0;i<B.length;i++)
		{
			var E=B[i];
			if (!C)
			{
				D=D.childNodes[E];
				continue;
			};
			var F=-1;
			for (var j=0;j<D.childNodes.length;j++)
			{
				var G=D.childNodes[j];
				if (C===true&&G.nodeType==3&&G.previousSibling&&G.previousSibling.nodeType==3) 
				continue;
				F++;
				if (F==E)
				{
					D=G;break;
				}
			}
		};
		return D;
	},
	CloneElement:function(A)
	{
		A=A.cloneNode(false);
		A.removeAttribute('id',false);
		return A;
	},
	ClearElementJSProperty:function(A,B)
	{
		if (FCKBrowserInfo.IsIE)
		A.removeAttribute(B);
		else delete A[B];
	},
	SetElementMarker:function (A,B,C,D)
	{
		var E=String(parseInt(Math.random()*0xffffffff,10));
		B._FCKMarkerId=E;
		B[C]=D;
		if (!A[E])
		A[E]={ 'element':B,'markers':{} };
		A[E]['markers'][C]=D;
	},
	ClearElementMarkers:function(A,B,C)
	{
		var D=B._FCKMarkerId;
		if (!D) return;
		this.ClearElementJSProperty(B,'_FCKMarkerId');
		for (var j in A[D]['markers'])
		this.ClearElementJSProperty(B,j);
		if (C)
		delete A[D];
	},
	ClearAllMarkers:function(A)
	{
		for (var i in A) 
		this.ClearElementMarkers(A,A[i]['element'],true);
	},
	ListToArray:function(A,B,C,D,E)
	{
		if (!A.nodeName.IEquals(['ul','ol']))
		return [];
		if (!D)
		D=0;
		if (!C) 
		C=[];
		for (var i=0;i<A.childNodes.length;i++)
		{
			var F=A.childNodes[i];
			if (!F.nodeName.IEquals('li'))
			continue;
			var G={ 'parent':A,'indent':D,'contents':[] };
			if (!E)
			{
				G.grandparent=A.parentNode;
				if (G.grandparent&&G.grandparent.nodeName.IEquals('li'))
				G.grandparent=G.grandparent.parentNode;
			}
			else
			G.grandparent=E;
			if (B) 
			this.SetElementMarker(B,F,'_FCK_ListArray_Index',C.length);
			C.push(G);
			for (var j=0;j<F.childNodes.length;j++)
			{
				var H=F.childNodes[j];
				if (H.nodeName.IEquals(['ul','ol']))
				this.ListToArray(H,B,C,D+1,G.grandparent);
				else 
				G.contents.push(H);
			}
		};
		return C;
	},
	ArrayToList:function(A,B,C)
	{
		if (C==undefined)
		C=0;
		if (!A||A.length<C+1)
		return null;
		var D=FCKTools.GetElementDocument(A[C].parent);
		var E=D.createDocumentFragment();
		var F=null;
		var G=C;
		var H=Math.max(A[C].indent,0);
		var I=null;
		while (true)
		{
			var J=A[G];
			if (J.indent==H)
			{
				if (!F||A[G].parent.nodeName!=F.nodeName)
				{
					F=A[G].parent.cloneNode(false);
					E.appendChild(F);
				};
				I=D.createElement('li');
				F.appendChild(I);
				for (var i=0;i<J.contents.length;i++)
				I.appendChild(J.contents[i].cloneNode(true));
				G++;
			}
			else if (J.indent==Math.max(H,0)+1)
			{
				var K=this.ArrayToList(A,null,G);
				I.appendChild(K.listNode);
				G=K.nextIndex;
			}
			else if (J.indent==-1&&C==0&&J.grandparent)
			{
				var I;
				if (J.grandparent.nodeName.IEquals(['ul','ol']))
				I=D.createElement('li');
				else
				{
					if (FCKConfig.EnterMode.IEquals(['div','p'])&&!J.grandparent.nodeName.IEquals('td')) 
					I=D.createElement(FCKConfig.EnterMode);
					else
					I=D.createDocumentFragment();
				};
				for (var i=0;i<J.contents.length;i++) 
				I.appendChild(J.contents[i].cloneNode(true));
				if (I.nodeType==11)
				{
					if (I.lastChild&&I.lastChild.getAttribute&&I.lastChild.getAttribute('type')=='_moz') 
					I.removeChild(I.lastChild);
					I.appendChild(D.createElement('br'));
				};
				if (I.nodeName.IEquals(FCKConfig.EnterMode)&&I.firstChild)
				{
					this.TrimNode(I);
					if (FCKListsLib.BlockBoundaries[I.firstChild.nodeName.toLowerCase()])
					{
						var M=D.createDocumentFragment();
						while (I.firstChild)
						M.appendChild(I.removeChild(I.firstChild));
						//removeChild	清除指定元素及其所有子元素之间的空格
						I=M;
					}
				};
				if (FCKBrowserInfo.IsGeckoLike&&I.nodeName.IEquals(['div','p']))
				FCKTools.AppendBogusBr(I);
				E.appendChild(I);
				F=null;
				G++;
			}
			else return null;
			if (A.length<=G||Math.max(A[G].indent,0)<H)
			{
				break;
			}
		};
		if (B)
		{
			var N=E.firstChild;
			while (N)
			{
				if (N.nodeType==1)
				this.ClearElementMarkers(B,N);
				N=this.GetNextSourceNode(N);
			}
		};
		return { 'listNode':E,'nextIndex':G };
	},
	GetNextSibling:function(A,B)
	{
		A=A.nextSibling;
		while (A&&!B&&A.nodeType!=1&&(A.nodeType!=3||A.nodeValue.length==0))
		A=A.nextSibling;
		return A;
	},
	GetPreviousSibling:function(A,B)
	{
		A=A.previousSibling;
		while (A&&!B&&A.nodeType!=1&&(A.nodeType!=3||A.nodeValue.length==0))
		A=A.previousSibling;
		return A;
	},
	CheckIsEmptyElement:function(A,B)
	{
		var C=A.firstChild;
		var D;
		while (C)
		{
			if (C.nodeType==1)
			{
				if (D||!FCKListsLib.InlineNonEmptyElements[C.nodeName.toLowerCase()]) 
				return false;
				if (!B||B(C)===true)
				D=C;
			}
			else if (C.nodeType==3&&C.nodeValue.length>0)
			return false;
			C=C.nextSibling;
		};
		return D?this.CheckIsEmptyElement(D,B):true;
	},
	SetElementStyles:function(A,B)//设置(a)的样式.(b)样式的参数对象
	{//a=[object]	b=[object Object]
		var C=A.style;
		for (var D in B)
		{
			C[D]=B[D];//="absolute"
		}
	},
	SetOpacity:function(A,B)//设置(a)节点的不透明度.(b)透明的参数
	{
		//a=节点		b=0.50
		if (FCKBrowserInfo.IsIE)//true
		{
			B=Math.round(B*100);//round 方法		返回与给出的数值表达式最接近的整数。(四舍五入)
			A.style.filter=(B>100?'':'progid:DXImageTransform.Microsoft.Alpha(opacity='+B+')');//false
			//filter 设置或获取应用于对象的滤镜或滤镜集合。 
		}
		else
		A.style.opacity=B;
		//返回元素的透明度值，范围在1~100之间
	},
	GetCurrentElementStyle:function(A,B)
	{
		if (FCKBrowserInfo.IsIE) 
		return A.currentStyle[B];
		else return A.ownerDocument.defaultView.getComputedStyle(A,'').getPropertyValue(B);
	},
	GetPositionedAncestor:function(A)
	{
		var B=A;
		while (B!=FCKTools.GetElementDocument(B).documentElement)
		{
			if (this.GetCurrentElementStyle(B,'position')!='static')
			return B;
			if (B==FCKTools.GetElementDocument(B).documentElement&&currentWindow!=w)
			B=currentWindow.frameElement;
			else
			B=B.parentNode;
		};
		return null;
	},
	ScrollIntoView:function(A,B)
	{
		var C=FCKTools.GetElementWindow(A);
		var D=FCKTools.GetViewPaneSize(C).Height;
		var E=D*-1;
		if (B===false)
		{
			E+=A.offsetHeight||0;E+=parseInt(this.GetCurrentElementStyle(A,'marginBottom')||0,10)||0;
		};
		var F=FCKTools.GetDocumentPosition(C,A);
		E+=F.y;
		var G=FCKTools.GetScrollPosition(C).Y;
		if (E>0&&(E>G||E<G-D))
		C.scrollTo(0,E);
	},
	CheckIsEditable:function(A)
	{
		var B=A.nodeName.toLowerCase();
		var C=FCK.DTD[B]||FCK.DTD.span;
		return (C['#']&&!FCKListsLib.NonEditableElements[B]);
	},
	GetSelectedDivContainers:function()
	{
		var A=[];
		var B=new FCKDomRange(FCK.EditorWindow);
		B.MoveToSelection();
		var C=B.GetTouchedStartNode();
		var D=B.GetTouchedEndNode();
		var E=C;if (C==D)
		{
			while (D.nodeType==1&&D.lastChild) 
			D=D.lastChild;
			D=FCKDomTools.GetNextSourceNode(D);
		}
		while (E&&E!=D)
		{
			if (E.nodeType!=3||!/^[ \t\n]*$/.test(E.nodeValue))
			{
				var F=new FCKElementPath(E);
				var G=F.BlockLimit;
				if (G&&G.nodeName.IEquals('div')&&A.IndexOf(G)==-1) 
				A.push(G);
			};
			E=FCKDomTools.GetNextSourceNode(E);
		};
		return A;
	}
};
var FCKTools={};
FCKTools.CreateBogusBR=function(A)
{
	var B=A.createElement('br');
	B.setAttribute('type','_moz');
	return B;
};

FCKTools.FixCssUrls=function(A,B)
{
	//a="http://localhost/movie/admin/fckeditor/editor/css/"
	//b=样式
	if (!A||A.length==0)//false
	return B;
	return B.replace(/url\s*\(([\s'"]*)(.*?)([\s"']*)\)/g,
											  function(match,opener,path,closer)
											  {
												  //a="url(images/fck_flashlogo.gif)"
												  //b=""
												  //c="images/fck_flashlogo.gif"
												  //d=""
												  if (/^\/|^\w?:/.test(path))//false
												  return match;
												  else
												  return 'url('+opener+A+path+closer+')';
												  //="url(http://localhost/movie/admin/fckeditor/editor/css/images/fck_flashlogo.gif)"
											  }
											  );
	//a=正则
	//如:url('+A+'css/behaviors/showtableborders.htc)
};
FCKTools._GetUrlFixedCss=function(A,B)
{
	var C=A.match(/^([^|]+)\|([\s\S]*)/);
	if (C) 
	return FCKTools.FixCssUrls(C[1],C[2]);
	else return A;
};
FCKTools.AppendStyleSheet=function(A,B)
{//a=[object]	b="http://192.168.0.2/move/admin/fckeditor/editor/skins/silver/fck_editor.css"
	if (!B) return [];//false
	if (typeof(B)=='string')//true
	{
		if (/[\\\/\.][^{}]*$/.test(B))//true
		{//test 方法		返回一个 Boolean 值，它指出在被查找的字符串中是否存在模式。
			return this.AppendStyleSheet(A,B.split(','));//重复执行自己
		}
		else
		{
			return [this.AppendStyleString(A,FCKTools._GetUrlFixedCss(B))];
		}
	}
	else
	{
		var C=[];
		for (var i=0;i<B.length;i++)
		C.push(this._AppendStyleSheet(A,B[i]));
		return C;
	}
};
FCKTools.GetStyleHtml=
(function()//载入样式
 {
	 var A=function(styleDef,markTemp)//载入内部样式(a).(b)是否要将_fcktemp设为true.
	 {
		 if (styleDef.length==0)
		 return '';
		 var B=markTemp?' _fcktemp="true"':'';
		 return '\n<style type="text/css"'+B+'>\n'+styleDef+'\n</style>\n';
	};
	var C=function(cssFileUrl,markTemp)//载入样式文件(a).(b)是否要将_fcktemp设为true.
	{//cssFileUrl="http://rendie/admin/fckeditor/editor/skins/silver/fck_editor.css"
		//markTemp=undefined
		if (cssFileUrl.length==0) return '';
		var B=markTemp?' _fcktemp="true"':'';//=""
		return '\n<link href="'+cssFileUrl+'" type="text/css" rel="stylesheet" '+B+'/>\n';
	};
	return function(cssFileOrArrayOrDef,markTemp)
	{//a="http://rendie/admin/fckeditor/editor/skins/silver/fck_editor.css"
		//b=undefined
		if (!cssFileOrArrayOrDef)//false
		return '';
		if (typeof(cssFileOrArrayOrDef)=='string')//true
		{
			if (/[\\\/\.][^{}]*$/.test(cssFileOrArrayOrDef))//true
			{
				//[a-z] 	字符范围。匹配指定范围内的任意字符。
				//\ 		将下一个字符标记为一个特殊字符、或一个原义字符、或一个 后向引用、或一个八。 
				//. 		匹配除 "\n" 之外的任何单个字符。 
				//[^a-z] 	负值字符范围。匹配任何不在指定范围内的任意字符。例如，'[^a-z]' 可以匹配任何不在 'a' 到  
				//* 		匹配前面的子表达式零次或多次。
				//$ 		匹配输入字符串的结束位置。 
				return this.GetStyleHtml(cssFileOrArrayOrDef.split(','),markTemp);
				//GetStyleHtml(a,b)//将(a)变成对象再调用自己
				//a="http://rendie/admin/fckeditor/editor/skins/silver/fck_editor.css"
				//b=undefined
			}
			else
			{
				return A(this._GetUrlFixedCss(cssFileOrArrayOrDef),markTemp);
				//A(a,b)//载入内部样式(a).(b)是否要将_fcktemp设为true.
			}
		}
		else
		{
			var E='';
			for (var i=0;i<cssFileOrArrayOrDef.length;i++) 
			//cssFileOrArrayOrDef.length=1
			E+=C(cssFileOrArrayOrDef[i],markTemp);
			//C(a,b)//载入样式文件(a).(b)是否要将_fcktemp设为true.
			//a="http://rendie/admin/fckeditor/editor/skins/silver/fck_editor.css"
			//b=undefined
			return E;
		}
	}
})();//载入样式
FCKTools.GetElementDocument=function (A)//返回元素所属的根元素
{//a=[object]
	return A.ownerDocument||A.document;
	/*ownerDocument 是 文档
	ownerDocument 下含2个一节点
	一是 <!DocType>
	二是 documentElement*/

};
FCKTools.GetElementWindow=function(A)
{
	return this.GetDocumentWindow(this.GetElementDocument(A));
};
FCKTools.GetDocumentWindow=function(A)
{
	if (FCKBrowserInfo.IsSafari&&!A.parentWindow)
	this.FixDocumentParentWindow(window.top);
	return A.parentWindow||A.defaultView;
};
FCKTools.FixDocumentParentWindow=function(A)
{
	if (A.document)
	A.document.parentWindow=A;
	for (var i=0;i<A.frames.length;i++) 
	FCKTools.FixDocumentParentWindow(A.frames[i]);
};
FCKTools.htmEncode=function(A)//转义"<",">"和"&"
{
	if (!A)
	return '';
	A=A.replace(/&/g,'&amp;');
	A=A.replace(/</g,'&lt;');
	A=A.replace(/>/g,'&gt;');
	return A;
};
FCKTools.htmDecode=function(A)
{
	if (!A)
	return '';
	A=A.replace(/&gt;/g,'>');
	A=A.replace(/&lt;/g,'<');
	A=A.replace(/&amp;/g,'&');
	return A;
};
FCKTools._ProcessLineBreaksForPMode=function(A,B,C,D,E)
{
	var F=0;
	var G="<p>";
	var H="</p>";
	var I="<br />";
	if (C)
	{
		G="<li>";
		H="</li>";
		F=1;
	}
	while (D&&D!=A.FCK.EditorDocument.body)
	{
		if (D.tagName.toLowerCase()=='p')
		{
			F=1;
			break;
		};
		D=D.parentNode;
	};
	for (var i=0;i<B.length;i++)
	{
		var c=B.charAt(i);
		if (c=='\r')
		continue;
		if (c!='\n')
		{
			E.push(c);
			continue;
		};
		var n=B.charAt(i+1);
		if (n=='\r')
		{
			i++;
			n=B.charAt(i+1);
		};
		if (n=='\n')
		{
			i++;
			if (F)
			E.push(H);
			E.push(G);
			F=1;
		}
		else
		E.push(I);
	}
};
FCKTools._ProcessLineBreaksForDivMode=function(A,B,C,D,E)
{
	var F=0;
	var G="<div>";
	var H="</div>";
	if (C)
	{
		G="<li>";
		H="</li>";
		F=1;
	}
	while (D&&D!=A.FCK.EditorDocument.body)
	{
		if (D.tagName.toLowerCase()=='div')
		{
			F=1;
			break;
		};
		D=D.parentNode;
	};
	for (var i=0;i<B.length;i++)
	{
		var c=B.charAt(i);
		if (c=='\r') continue;
		if (c!='\n')
		{
			E.push(c);
			continue;
		};
		if (F)
		{
			if (E[E.length-1]==G)
			{
				E.push("&nbsp;");
			};
			E.push(H);
		};
		E.push(G);
		F=1;
	};
	if (F) 
	E.push(H);
};
FCKTools._ProcessLineBreaksForBrMode=function(A,B,C,D,E)
{
	var F=0;
	var G="<br />";
	var H="";
	if (C)
	{
		G="<li>";
		H="</li>";
		F=1;
	};
	for (var i=0;i<B.length;i++)
	{
		var c=B.charAt(i);
		if (c=='\r')
		continue;
		if (c!='\n')
		{
			E.push(c);
			continue;
		};
		if (F&&H.length)
		E.push (H);
		E.push(G);
		F=1;
	}
};
FCKTools.ProcessLineBreaks=function(A,B,C)
{
	var D=B.EnterMode.toLowerCase();
	var E=[];
	var F=0;
	var G=new A.FCKDomRange(A.FCK.EditorWindow);
	G.MoveToSelection();
	var H=G._Range.startContainer;
	while (H&&H.nodeType!=1)
	H=H.parentNode;
	if (H&&H.tagName.toLowerCase()=='li')
	F=1;
	if (D=='p')
	this._ProcessLineBreaksForPMode(A,C,F,H,E);
	else if (D=='div')
	this._ProcessLineBreaksForDivMode(A,C,F,H,E);
	else if (D=='br')
	this._ProcessLineBreaksForBrMode(A,C,F,H,E);
	return E.join("");
};
FCKTools.AddSelectOption=function(A,B,C)
{
	var D=FCKTools.GetElementDocument(A).createElement("OPTION");
	D.text=B;
	D.value=C;
	A.options.add(D);
	return D;
};
FCKTools.RunFunction=function(A,B,C,D)//在"onload"执行完后再执行(a)函数.(b)被当作当前对象.(c)参数数组.(d)为哪层页面的window对象
{
	//a=函数		b=undefined		c=undefined		d=undefined
	if (A)//true
	this.SetTimeout(A,0,B,C,D);//经过(b)时间调用(a)函数.(b)重复调用间隔,(c)被当作当前对象.(d)参数数组.(e)为哪层页面的window对象
};
FCKTools.SetTimeout=function(A,B,C,D,E)//经过(b)时间调用(a)函数.(b)重复调用间隔,(c)被当作当前对象.(d)参数数组.(e)为哪层页面的window对象
{//a=函数	b=0		c=undefined		d=undefined		e=undefined
	return (E||window).setTimeout(function()
										   {
											   if (D)//false
											   {
											   		A.apply(C,[].concat(D));
											   		//apply 方法		应用某一对象的一个方法，用另一个对象替换当前对象。
											   }
											   else
											   A.apply(C);
											},B);
};
FCKTools.SetInterval=function(A,B,C,D,E)
{
	return (E||window).setInterval(function(){A.apply(C,D||[]);},B);
};
FCKTools.ConvertStyleSizeToHtml=function(A)
{
	return A.EndsWith('%')?A:parseInt(A,10);
};
FCKTools.ConvertHtmlSizeToStyle=function(A)
{
	return A.EndsWith('%')?A:(A+'px');
};
FCKTools.GetElementAscensor=function(A,B)
{
	var e=A;
	var C=","+B.toUpperCase()+",";
	while (e)
	{
		if (C.indexOf(","+e.nodeName.toUpperCase()+",")!=-1)
		return e;
		e=e.parentNode;
		//扩展parentNode指针的功能，实现一次能够操纵多个父元素
	};
	return null;
};
FCKTools.CreateEventListener=function(A,B)
{
	var f=function()
	{
		var C=[];
		for (var i=0;i<arguments.length;i++)
		C.push(arguments[i]);
		A.apply(this,C.concat(B));
	};
	return f;
};
FCKTools.IsStrictMode=function(A)//false	(a)对象是否应用标准兼容模式的值
{//a=节点
	return ('CSS1Compat'==(A.compatMode||(FCKBrowserInfo.IsSafari?'CSS1Compat':null)));//false
	//compatMode 设置或获取表明此对象是否应用标准兼容模式的值。
	//当文档有了标准声明时， document.compatMode 的值就等于 "CSS1compat"
};
FCKTools.ArgumentsToArray=function(A,B,C)
{
	B=B||0;
	C=C||A.length;
	var D=[];
	for (var i=B;i<B+C&&i<A.length;i++)
	D.push(A[i]);
	return D;
};
FCKTools.CloneObject=function(A)//返回(a)的原型引用
{
	var B=function() {};
	B.prototype=A;
	return new B;
};
FCKTools.AppendBogusBr=function(A)
{
	if (!A) return;
	var B=this.GetLastItem(A.getElementsByTagName('br'));
	if (!B||(B.getAttribute('type',2)!='_moz'&&B.getAttribute('_moz_dirty')==null))
	{
		var C=this.GetElementDocument(A);
		if (FCKBrowserInfo.IsOpera)
		A.appendChild(C.createTextNode(''));//创建文本节点，文本内容"空"
		else 
		A.appendChild(this.CreateBogusBR(C));
	}
};
FCKTools.GetLastItem=function(A)
{
	if (A.length>0) 
	return A[A.length-1];
	return null;
};
FCKTools.GetDocumentPosition=function(w,A)
{
	var x=0;
	var y=0;
	var B=A;
	var C=null;
	var D=FCKTools.GetElementWindow(B);
	while (B&&!(D==w&&(B==w.document.body||B==w.document.documentElement)))
	{
		x+=B.offsetLeft-B.scrollLeft;
		y+=B.offsetTop-B.scrollTop;
		if (!FCKBrowserInfo.IsOpera)
		{
			var E=C;
			while (E&&E!=B)
			{
				x-=E.scrollLeft;
				y-=E.scrollTop;
				E=E.parentNode;
				//扩展parentNode指针的功能，实现一次能够操纵多个父元素
			}
		};
		C=B;
		if (B.offsetParent)
		B=B.offsetParent;
		else
		{
			if (D!=w)
			{
				B=D.frameElement;
				C=null;
				if (B)
				D=B.contentWindow.parent;
			}
			else B=null;
		}
	};
	if (FCKDomTools.GetCurrentElementStyle(w.document.body,'position')!='static'||(FCKBrowserInfo.IsIE&&FCKDomTools.GetPositionedAncestor(A)==null))
	{
		x+=w.document.body.offsetLeft;
		y+=w.document.body.offsetTop;
	};
	return { "x":x,"y":y };
};
FCKTools.GetWindowPosition=function(w,A)
{
	var B=this.GetDocumentPosition(w,A);
	var C=FCKTools.GetScrollPosition(w);
	B.x-=C.X;
	B.y-=C.Y;
	return B;
};
FCKTools.ProtectFormStyles=function(A)
{
	if (!A||A.nodeType!=1||A.tagName.toLowerCase()!='form') 
	return [];
	var B=[];
	var C=['style','className'];
	for (var i=0;i<C.length;i++)
	{
		var D=C[i];
		if (A.elements.namedItem(D))
		{
			var E=A.elements.namedItem(D);
			B.push([E,E.nextSibling]);
			A.removeChild(E);
		}
	};
	return B;
};
FCKTools.RestoreFormStyles=function(A,B)
{
	if (!A||A.nodeType!=1||A.tagName.toLowerCase()!='form')
	return;
	if (B.length>0)
	{
		for (var i=B.length-1;i>=0;i--)
		{
			var C=B[i][0];
			var D=B[i][1];
			if (D) 
			A.insertBefore(C,D);
			else 
			A.appendChild(C);
		}
	}
};
FCKTools.GetNextNode=function(A,B)
{
	if (A.firstChild)
	return A.firstChild;
	//firstChild 属性可返回文档的首个子节点。
	else if (A.nextSibling)
	return A.nextSibling;
	else
	{
		var C=A.parentNode;
		while (C)
		{
			if (C==B) return null;
			if (C.nextSibling) 
			return C.nextSibling;
			else 
			C=C.parentNode;
		}
	};
	return null;
};
FCKTools.GetNextTextNode=function(A,B,C)
{
	node=this.GetNextNode(A,B);
	if (C&&node&&C(node))
	return null;
	while (node&&node.nodeType!=3)
	{
		node=this.GetNextNode(node,B);
		if (C&&node&&C(node))
		return null;
	};
	return node;
};
FCKTools.Merge=function()
{
	var A=arguments;
	var o=A[0];
	for (var i=1;i<A.length;i++)
	{
		var B=A[i];
		for (var p in B)
		o[p]=B[p];
	};
	return o;
};
FCKTools.IsArray=function(A)
{
	return (A instanceof Array);
};
FCKTools.AppendLengthProperty=function(A,B)
{
	var C=0;
	for (var n in A)
	C++;
	return A[B||'length']=C;
};
FCKTools.NormalizeCssText=function(A)
{
	var B=document.createElement('span');
	B.style.cssText=A;
	return B.style.cssText;
};
FCKTools.Bind=function(A,B)
{
	return function()
	{
		return B.apply(A,arguments);
	};
};
FCKTools.GetVoidUrl=function()//void 运算符对表达式求值
{
	if (FCK_IS_CUSTOM_DOMAIN) //false
	return "javascript: void( function()"+
									   "{"+
									   		"document.open();"+
											"document.write('<html><head><title></title></head><body></body></html>');"+
											"document.domain = '"+FCK_RUNTIME_DOMAIN+"';"+
											//FCK_RUNTIME_DOMAIN="192.168.0.2"
											"document.close();"+
										"}() ) ;";
	if (FCKBrowserInfo.IsIE)//true
	{
		if (FCKBrowserInfo.IsIE7||!FCKBrowserInfo.IsIE6)//false
		return "";
		else
		return "javascript: '';";
	};
	return "javascript: void(0);";
	//void 运算符对表达式求值，并返回 undefined。在希望求表达式的值，但又不希望脚本的剩余部分看见这个结果时，该运算符最有用。 
};
FCKTools.ResetStyles=function(A)//设置节点的参数
{
	A.style.cssText='margin:0;padding:0;border:0;background-color:transparent;background-image:none;';
};
FCKTools.CancelEvent=function(e)
{
	return false;
};
FCKTools._AppendStyleSheet=function(A,B)
{
	return A.createStyleSheet(B).owningElement;
};
FCKTools.AppendStyleString=function(A,B)
{
	if (!B) return null;
	var s=A.createStyleSheet("");
	s.cssText=B;return s;
};
FCKTools.ClearElementAttributes=function(A)
{
	A.clearAttributes();
};
FCKTools.GetAllChildrenIds=function(A)
{
	var B=[];
	for (var i=0;i<A.all.length;i++)
	{
		var C=A.all[i].id;
		if (C&&C.length>0)
		B[B.length]=C;
	};
	return B;
};
FCKTools.RemoveOuterTags=function(e)
{
	e.insertAdjacentHTML('beforeBegin',e.innerHTML);
	e.parentNode.removeChild(e);
};
FCKTools.CreateXmlObject=function(A)//创建XML DOM对象
{
	//a="DOMDocument"
	var B;
	switch (A)//定义B
	{
		case 'XmlHttp':
		if (document.location.protocol!='file:')
		try {
				return new XMLHttpRequest();
			}
			catch(e){};
		B=['MSXML2.XmlHttp','Microsoft.XmlHttp'];
		break;
		case 'DOMDocument':
		B=['MSXML2.DOMDocument','Microsoft.XmlDom'];
		//MSXML2.DOMDocument.3.0从XML中读取数据
		break;
	};
	for (var i=0;i<2;i++)
	{
		try
		{
			return new ActiveXObject(B[i]);//创建XML DOM对象
			//B[0]="MSXML2.DOMDocument"
			/*		
			ActiveXObject 对象
			启用并返回 Automation 对象的引用。
			newObj = new ActiveXObject(servername.typename[, location])
			ActiveXObject 对象语法有这些部分：其中newObj是必选项。要赋值为 ActiveXObject 的变量名。 
			servername是必选项。提供该对象的应用程序的名称。 
			typename是必选项。要创建的对象的类型或类。 
			location是可选项。创建该对象的网络服务器的名称。 
			*/
		}
		catch (e){}
	};
	if (FCKLang.NoActiveX)
	{//NoActiveX			: "浏览器安全设置限制了本编辑器的某些功能。您必须启用安全设置中的“运行 ActiveX 控件和插件”，否则将出现某些错误并缺少功能。",
		FCKLang.NoActiveX=null;
	};
	return null;
};
FCKTools.DisableSelection=function(A)//设置"unselectable"属性是否为"on"
{//a=[object]
	A.unselectable='on';
	var e,
	i=0;
	while ((e=A.all[i++]))
	{//A.all[i++]=[object]
		switch (e.tagName)
		{//e.tagName="DIV"
			case 'IFRAME':
			case 'TEXTAREA':
			case 'INPUT':
			case 'SELECT':
			break;
			default:
			e.unselectable='on';
		}
	}
};
FCKTools.GetScrollPosition=function(A)//设置网页被卷去的左和高
{//a=[object]
	var B=A.document;
	var C=
	{
		X:B.documentElement.scrollLeft,//=0		网页被卷去的左： document.body.scrollLeft; 
		Y:B.documentElement.scrollTop //=0		网页被卷去的高： document.body.scrollTop; 
	};
	if (C.X>0||C.Y>0) 
	return C;
	return { X:B.body.scrollLeft,Y:B.body.scrollTop };
};
FCKTools.AddEventListener=function(A,B,C)//为(1)节点绑定为事件.(a)函数名,(b)函数体
{
	A.attachEvent('on'+B,C);//为节点绑定为事件.(a)函数名,(b)函数体
};
FCKTools.RemoveEventListener=function(A,B,C)
{
	A.detachEvent('on'+B,C);
};
FCKTools.AddEventListenerEx=function(A,B,C,D)//把函数绑定为事件.(a)将被用作当前对象的对象。(b)绑定的事件名.(c)事件函数.(d)为运行(c)函数的参数数组
{
//A=[object]	为节点"window"
//B="unload"	
//C=函数
//D=undefind
	var o={};
	o.Source=A;//定义"source"属性为A
	o.Params=D||[];//D不成立则为[]
	o.Listener=function(ev)//用另一个对象替换当前对象。
	{//ev.type="load"
		return C.apply(o.Source,[ev].concat(o.Params));
		/*	
		apply 方法
		应用某一对象的一个方法，用另一个对象替换当前对象。
		apply([thisObj[,argArray]])
		参数
		thisObj
		可选项。将被用作当前对象的对象。
		argArray
		可选项。将被传递给该函数的参数数组。
			a=[object]	
			b=[object],[object Object]
				concat 方法 (Array)	返回一个新数组，这个新数组是由两个或更多数组组合而成的。
		*/
	};
	if (FCK.IECleanup) //undefind	为false
	{
		FCK.IECleanup.AddItem(null,function(){o.Source=null;o.Params=null;});
	}
	A.attachEvent('on'+B,o.Listener);//为节点绑定为事件.(a)函数名,(b)函数体
	//a="onunload"
	//b=函数
	A=null;D=null;
};
FCKTools.GetViewPaneSize=function(A)//设置网页可见区域宽和高.(a)为节点
{//a=[object]
	var B;
	var C=A.document.documentElement;
	//documentElement 属性可返回文档的根节点。
	if (C&&C.clientWidth)//false
	B=C;
	else
	B=A.document.body;
	if (B)//true
	return {
		Width:B.clientWidth,//=1022		网页可见区域宽： document.body.clientWidth; 
		Height:B.clientHeight//=674		网页可见区域高： document.body.clientHeight
		};
	else
	return { Width:0,Height:0 };
};
FCKTools.SaveStyles=function(A)
{
	var B=FCKTools.ProtectFormStyles(A);
	var C={};
	if (A.className.length>0)
	{
		C.Class=A.className;
		A.className='';
	};
	var D=A.style.cssText;
	if (D.length>0)
	{
		C.Inline=D;
		A.style.cssText='';
	};
	FCKTools.RestoreFormStyles(A,B);
	return C;
};
FCKTools.RestoreStyles=function(A,B)
{
	var C=FCKTools.ProtectFormStyles(A);
	A.className=B.Class||'';
	A.style.cssText=B.Inline||'';
	FCKTools.RestoreFormStyles(A,C);
};
FCKTools.RegisterDollarFunction=function(A)//设置(a)的$属性为id返问元素
{
	A.$=A.document.getElementById;
};
FCKTools.AppendElement=function(A,B)
{
	return A.appendChild(this.GetElementDocument(A).createElement(B));
};
FCKTools.ToLowerCase=function(A)
{
	return A.toLowerCase();
};
var FCKeditorAPI;
function InitializeAPI()//初始化
{
	var A=window.parent;
	//Parent 属性		指示在分级结构中是当前成员的父的成员。
	//A=[object]
	if (!(FCKeditorAPI=A.FCKeditorAPI))//true
	{
		var B='window.FCKeditorAPI = '+
				'{'+
					'Version : "2.6.4",'+
					'VersionBuild : "21629",'+
					'Instances : window.FCKeditorAPI && window.FCKeditorAPI.Instances || {},'+
					'GetInstance : function( name )'+
					'{'+
						'return this.Instances[ name ];'+
					'},'+
					'_FormSubmit : function()'+
					'{'+
					'alert("cccccccccccccccccc")'+
						'for ( var name in FCKeditorAPI.Instances )'+
						'{'+
							'var oEditor = FCKeditorAPI.Instances[ name ] ;'+
							'if ( oEditor.GetParentForm && oEditor.GetParentForm() == this )'+
							'oEditor.UpdateLinkedField() ;'+
						'}'+
						'this._FCKOriginalSubmit() ;'+
					'},'+
					'_FunctionQueue	: window.FCKeditorAPI && window.FCKeditorAPI._FunctionQueue || '+
																								'{'+
																									'Functions : new Array(),'+
																									'IsRunning : false,'+
																									'Add : function( f )'+
																									'{'+ //f=函数
																										'this.Functions.push( f );'+
																						//push 方法	将新元素添加到一个数组中，并返回数组的新长度值。
																										'if ( !this.IsRunning )'+//true
																										'this.StartNext();'+
																									'},'+
																									'StartNext : function()'+
																									'{'+
																										'var aQueue = this.Functions ;'+
																										'if ( aQueue.length > 0 )'+//true		
																										'{'+
																											'this.IsRunning = true;'+
																											'aQueue[0].call();'+//执行aQueue数组的函数
																										'}'+
																							//call 方法	调用一个对象的一个方法，以另一个对象替换当前对象。
																										'else '+
																										'this.IsRunning = false;'+
																									'},'+
																									'Remove : function( f )'+
																									'{'+
																										'var aQueue = this.Functions;'+
																										'var i = 0, fFunc;'+
																										'while( (fFunc = aQueue[ i ]) )'+
																										//false
																										'{'+
																											'if ( fFunc == f )'+
																											'aQueue.splice( i,1 );'+
/*
splice 方法					从一个数组中移除一个或多个元素，如果必要，在所移除元素的位置上插入新元素，返回所移除的元素。
arrayObj.splice(start, deleteCount, [item1[, item2[, . . . [,itemN]]]])
arrayObj					必选项。一个Array对象。
start						必选项。指定从数组中移除元素的开始位置，这个位置是从 0 开始计算的。
deleteCount					必选项。要移除的元素的个数。
item1, item2,. . .,itemN	必选项。要在所移除元素的位置上插入的新元素。
*/
																											'i++ ;'+
																										'}'+
																										'this.StartNext();'+
																									'}'+
																								'}'+
		'}';
		if (A.execScript)//true	
		{//A.execScript函数如下:
		/*
		function execScript(){
			[native code]
			}
		/*
		execScript方法
		语法： 
		vReturn = window . execScript ( sExpression , sLanguage ) 
		参数： 
		sExpression :　 必选项。字符串(String)。要被执行的代码。 

		sLanguage :　 必选项。字符串(String)。指定执行的代码的语言。默认值为 Microsoft JScript (符合 ECMA 262 语言标准)。参阅 script 对象的 language 属性。 
 		*/
			A.execScript(B,'JavaScript');//execScript	执行指定语言的脚本代码。 
		}
		else
		{
			if (FCKBrowserInfo.IsGecko10)
			{
				eval.call(A,B);
			}
			else
			if(FCKBrowserInfo.IsAIR)
			{
				FCKAdobeAIR.FCKeditorAPI_Evaluate(A,B);
			}
			else
			if (FCKBrowserInfo.IsSafari)
			{
				var C=A.document;
				var D=C.createElement('script');
				D.appendChild(C.createTextNode(B));
				C.documentElement.appendChild(D);
			}
			else A.eval(B);
		};
		FCKeditorAPI=A.FCKeditorAPI;//=[object Object]
		FCKeditorAPI.__Instances=FCKeditorAPI.Instances;//=[object Object]
	};
	FCKeditorAPI.Instances[FCK.Name]=FCK;//=[object Object]
};
function _AttachFormSubmitToAPI()//????????????
{
	var A=FCK.GetParentForm();
	if (A)
	{
		FCKTools.AddEventListener(A,'submit',FCK.UpdateLinkedField);
		
		
		
		if (!A._FCKOriginalSubmit&&(typeof(A.submit)=='function'||(!A.submit.tagName&&!A.submit.length)))
		{
			A._FCKOriginalSubmit=A.submit;
			A.submit=FCKeditorAPI._FormSubmit;
		}
	}
};
function FCKeditorAPI_Cleanup()
{
	if (window.FCKConfig&&FCKConfig.MsWebBrowserControlCompat&&!window.FCKUnloadFlag) 
	return;
	delete FCKeditorAPI.Instances[FCK.Name];
};
function FCKeditorAPI_ConfirmCleanup()
{
	if (window.FCKConfig&&FCKConfig.MsWebBrowserControlCompat)
	window.FCKUnloadFlag=true;
};
FCKTools.AddEventListener(window,'unload',FCKeditorAPI_Cleanup);
FCKTools.AddEventListener(window,'beforeunload',FCKeditorAPI_ConfirmCleanup);
var FCKImagePreloader=function()//设置_Images为空数组
{
	this._Images=[];
};
FCKImagePreloader.prototype=
{
	AddImages:function(A)//在数组_Images中添加内容.(a)一个或多个链接
	{//A="http://rendie/admin/fckeditor/editor/skins/images/toolbar.start.gif, http://rendie/admin/fckeditor/editor/skins/images/toolbar.buttonarrow.gif "
		if (typeof(A)=='string')//false
		A=A.split(';');
		this._Images=this._Images.concat(A);
		//concat 方法 (Array)	返回一个新数组，这个新数组是由两个或更多数组组合而成的。
	},
	Start:function()//显示工具栏
	{
		var A=this._Images;
		//A="http://rendie/admin/fckeditor/editor/skins/images/toolbar.start.gif, http://rendie/admin/fckeditor/editor/skins/images/toolbar.buttonarrow.gif,http://rendie/admin/fckeditor/editor/skins/fck_strip.gif"
		this._PreloadCount=A.length;//=3
		for (var i=0;i<A.length;i++)//显示工具栏
		{
			var B=document.createElement('img');//=[object]		准备插入图片
			//createElement 为指定标签创建一个元素的实例。
			FCKTools.AddEventListenerEx(B,'load',_FCKImagePreloader_OnImage,this);//显示所有工具栏
			/*
			FCKTools.AddEventListenerEx(a,b,c,d)//把函数绑定为事件.(a)节点.(b)事件名.(c)事件函数.(d)参数数组
			注：请注意多个"onload"装载事件的执行顺序
			a=[object]
			b="load"
			c="function _FCKImagePreloader_OnImage(A,B)
			  {
				if ((--B._PreloadCount)==0&&B.OnComplete)
				B.OnComplete();
			  };"
			d=[object Object]
			*/
			FCKTools.AddEventListenerEx(B,'error',_FCKImagePreloader_OnImage,this);
			//FCKTools.AddEventListenerEx(a,b,c,d)//把函数绑定为事件.(a)节点.(b)事件名.(c)事件函数.(d)参数数组
			B.src=A[i];//A[0]="http://rendie/admin/fckeditor/editor/skins/images/toolbar.start.gif"		为"工具栏"的开始图片
			_FCKImagePreloader_ImageCache.push(B);//=1
			//push 方法		将新元素添加到一个数组中，并返回数组的新长度值。
		}
	}
};
var _FCKImagePreloader_ImageCache=[];
function _FCKImagePreloader_OnImage(A,B)//显示所有工具栏
{
	//A=[object]		//B=[object Object]		为当前指针
	if ((--B._PreloadCount)==0&&B.OnComplete)//false->false->true
	{
		B.OnComplete(); //显示所有工具栏
	}
};
var FCKRegexLib=
{
	AposEntity:/&apos;/gi,
	ObjectElements:/^(?:IMG|TABLE|TR|TD|TH|INPUT|SELECT|TEXTAREA|HR|OBJECT|A|UL|OL|LI)$/i,
	NamedCommands:/^(?:Cut|Copy|Paste|Print|SelectAll|RemoveFormat|Unlink|Undo|Redo|Bold|Italic|Underline|StrikeThrough|Subscript|Superscript|JustifyLeft|JustifyCenter|JustifyRight|JustifyFull|Outdent|Indent|InsertOrderedList|InsertUnorderedList|InsertHorizontalRule)$/i,
	BeforeBody:/(^[\s\S]*\<body[^\>]*\>)/i,
	AfterBody:/(\<\/body\>[\s\S]*$)/i,
	ToReplace:/___fcktoreplace:([\w]+)/ig,
	MetaHttpEquiv:/http-equiv\s*=\s*["']?([^"' ]+)/i,
	HasBaseTag:/<base /i,
	HasBodyTag:/<body[\s|>]/i,
	HtmlOpener:/<html\s?[^>]*>/i,
	HeadOpener:/<head\s?[^>]*>/i,
	HeadCloser:/<\/head\s*>/i,
	FCK_Class:/\s*FCK__[^ ]*(?=\s+|$)/,
	ElementName:/(^[a-z_:][\w.\-:]*\w$)|(^[a-z_]$)/,
	ForceSimpleAmpersand:/___FCKAmp___/g,
	SpaceNoClose:/\/>/g,
	EmptyParagraph:/^<(p|div|address|h\d|center)(?=[ >])[^>]*>\s*(<\/\1>)?$/,
	EmptyOutParagraph:/^<(p|div|address|h\d|center)(?=[ >])[^>]*>(?:\s*|&nbsp;)(<\/\1>)?$/,
	TagBody:/></,
	GeckoEntitiesMarker:/#\?-\:/g,
	ProtectUrlsImg:/<img(?=\s).*?\ssrc=((?:(?:\s*)("|').*?\2)|(?:[^"'][^ >]+))/gi,
	ProtectUrlsA:/<a(?=\s).*?\shref=((?:(?:\s*)("|').*?\2)|(?:[^"'][^ >]+))/gi,
	ProtectUrlsArea:/<area(?=\s).*?\shref=((?:(?:\s*)("|').*?\2)|(?:[^"'][^ >]+))/gi,
	Html4DocType:/HTML 4\.0 Transitional/i,
	DocTypeTag:/<!DOCTYPE[^>]*>/i,
	HtmlDocType:/DTD HTML/,
	TagsWithEvent:/<[^\>]+ on\w+[\s\r\n]*=[\s\r\n]*?('|")[\s\S]+?\>/g,
	EventAttributes:/\s(on\w+)[\s\r\n]*=[\s\r\n]*?('|")([\s\S]*?)\2/g,
	ProtectedEvents:/\s\w+_fckprotectedatt="([^"]+)"/g,
	StyleProperties:/\S+\s*:/g,
	InvalidSelfCloseTags:/(<(?!base|meta|link|hr|br|param|img|area|input)([a-zA-Z0-9:]+)[^>]*)\/>/gi,
	StyleVariableAttName:/#\(\s*("|')(.+?)\1[^\)]*\s*\)/g,
	RegExp:/^\/(.*)\/([gim]*)$/,
	HtmlTag:/<[^\s<>](?:"[^"]*"|'[^']*'|[^<])*>/
};
var FCKListsLib=
{
	BlockElements:
	{
		address:1,
		blockquote:1,
		center:1,
		div:1,
		dl:1,
		fieldset:1,
		form:1,
		h1:1,
		h2:1,
		h3:1,
		h4:1,
		h5:1,
		h6:1,
		hr:1,
		marquee:1,
		noscript:1,
		ol:1,
		p:1,
		pre:1,
		script:1,
		table:1,
		ul:1 
	},
	NonEmptyBlockElements:
	{
		p:1,
		div:1,
		form:1,
		h1:1,
		h2:1,
		h3:1,
		h4:1,
		h5:1,
		h6:1,
		address:1,
		pre:1,
		ol:1,
		ul:1,
		li:1,
		td:1,
		th:1 
	},
	InlineChildReqElements:
	{
		abbr:1,
		acronym:1,
		b:1,
		bdo:1,
		big:1,
		cite:1,
		code:1,
		del:1,
		dfn:1,
		em:1,
		font:1,
		i:1,
		ins:1,
		label:1,
		kbd:1,
		q:1,
		samp:1,
		small:1,
		span:1,
		strike:1,
		strong:1,
		sub:1,
		sup:1,
		tt:1,
		u:1,
		'var':1 
	},
	InlineNonEmptyElements:
	{
		a:1,
		abbr:1,
		acronym:1,
		b:1,
		bdo:1,
		big:1,
		cite:1,
		code:1,
		del:1,
		dfn:1,
		em:1,
		font:1,
		i:1,
		ins:1,
		label:1,
		kbd:1,
		q:1,
		samp:1,
		small:1,
		span:1,
		strike:1,
		strong:1,
		sub:1,
		sup:1,
		tt:1,
		u:1,
		'var':1 
	},
	EmptyElements:
	{
		base:1,
		col:1,
		meta:1,
		link:1,
		hr:1,
		br:1,
		param:1,
		img:1,
		area:1,
		input:1 
	},
	PathBlockElements:
	{
		address:1,
		blockquote:1,
		dl:1,
		h1:1,
		h2:1,
		h3:1,
		h4:1,
		h5:1,
		h6:1,
		p:1,
		pre:1,
		li:1,
		dt:1,
		de:1
	},
	PathBlockLimitElements:
	{
		body:1,
		div:1,
		td:1,
		th:1,
		caption:1,
		form:1
	},
	StyleBlockElements:
	{
		address:1,
		div:1,
		h1:1,
		h2:1,
		h3:1,
		h4:1,
		h5:1,
		h6:1,
		p:1,
		pre:1
	},
	StyleObjectElements:
	{
		img:1,
		hr:1,
		li:1,
		table:1,
		tr:1,
		td:1,
		embed:1,
		object:1,
		ol:1,
		ul:1 
	},
	NonEditableElements:
	{
		button:1,
		option:1,
		script:1,
		iframe:1,
		textarea:1,
		object:1,
		embed:1,
		map:1,
		applet:1
	},
	BlockBoundaries:
	{
		p:1,
		div:1,
		h1:1,
		h2:1,
		h3:1,
		h4:1,
		h5:1,
		h6:1,
		hr:1,
		address:1,
		pre:1,
		ol:1,
		ul:1,
		li:1,
		dt:1,
		de:1,
		table:1,
		thead:1,
		tbody:1,
		tfoot:1,
		tr:1,
		th:1,
		td:1,
		caption:1,
		col:1,
		colgroup:1,
		blockquote:1,
		body:1 
	},
	ListBoundaries:
	{
		p:1,
		div:1,
		h1:1,
		h2:1,
		h3:1,
		h4:1,
		h5:1,
		h6:1,
		hr:1,
		address:1,
		pre:1,
		ol:1,
		ul:1,
		li:1,
		dt:1,
		de:1,
		table:1,
		thead:1,
		tbody:1,
		tfoot:1,
		tr:1,
		th:1,
		td:1,
		caption:1,
		col:1,
		colgroup:1,
		blockquote:1,
		body:1,
		br:1
	}
};
/*
* FCKLanguageManager : FCK 語言管理員，用來處理 FCKeditor 的上的語言文
*/ 
var FCKLanguageManager=FCK.Language=
{
	/*
	* AvailableLanguages : 可使用語言，內含 FCKeditor 所支援的所有語
	*/ 
	AvailableLanguages://返回(a)对应的字符串
	{
		af:'Afrikaans',
		ar:'Arabic',
		bg:'Bulgarian',
		bn:'Bengali/Bangla',
		bs:'Bosnian',
		ca:'Catalan',
		cs:'Czech',
		da:'Danish',
		de:'German',
		el:'Greek',
		en:'English',
		'en-au':'English (Australia)',
		'en-ca':'English (Canadian)',
		'en-uk':'English (United Kingdom)',
		eo:'Esperanto',
		es:'Spanish',
		et:'Estonian',
		eu:'Basque',
		fa:'Persian',
		fi:'Finnish',
		fo:'Faroese',
		fr:'French',
		'fr-ca':'French (Canada)',
		gl:'Galician',
		gu:'Gujarati',
		he:'Hebrew',
		hi:'Hindi',
		hr:'Croatian',
		hu:'Hungarian',
		is:'Icelandic',
		it:'Italian',
		ja:'Japanese',
		km:'Khmer',
		ko:'Korean',
		lt:'Lithuanian',
		lv:'Latvian',
		mn:'Mongolian',
		ms:'Malay',
		nb:'Norwegian Bokmal',
		nl:'Dutch',
		no:'Norwegian',
		pl:'Polish',
		pt:'Portuguese (Portugal)',
		'pt-br':'Portuguese (Brazil)',
		ro:'Romanian',
		ru:'Russian',
		sk:'Slovak',
		sl:'Slovenian',
		sr:'Serbian (Cyrillic)',
		'sr-latn':'Serbian (Latin)',
		sv:'Swedish',
		th:'Thai',
		tr:'Turkish',
		uk:'Ukrainian',
		vi:'Vietnamese',
		zh:'Chinese Traditional',
		'zh-cn':'Chinese Simplified'
	},
	GetActiveLanguage:function()//取得要使用的語
	{/*
	* 若在fckconfig.js有設定使用自動偵測語言 ( AutoDetectLanguage ) 的
	* ，會依照以下順序取得正在使用的語言 
	*　　．瀏覽器所使用的語
	*　　．與瀏覽器語言相近的語
	*　　．在fckconfig.js中設定的預設語言－FCKConfig.DefaultLanguag
	*　　．FCKLanguageManager 的預設語言－ en:'English' 英
	*/ 
		if (FCKConfig.AutoDetectLanguage)//true
		{
			var A;
			if (navigator.userLanguage)
			{//navigator	它提供了当前浏览器的类型和版本信息.
			//userLanguage 属性可返回操作系统的自然语言设置。
				A=navigator.userLanguage.toLowerCase();
			}
			else if (navigator.language)
			A=navigator.language.toLowerCase();
			else
			{
				return FCKConfig.DefaultLanguage;
			};
			if (A.length>=5)
			{
				A=A.substr(0,5);
				if (this.AvailableLanguages[A])
				return A;
			};
			if (A.length>=2)
			{
				A=A.substr(0,2);
				if (this.AvailableLanguages[A])
				return A;
			}
		};
		return this.DefaultLanguage;
	},
	TranslateElements:function(A,B,C,D)//修改元素(b)中(c)的属性.(a)为对象.(d)是否转义"<",">"和"&"
	{//a=[object]	b="INPUT"	C="value"	d=undefined
		var e=A.getElementsByTagName(B);//传回指定名称的元素集合。
		//e[0].outerHTML='<input  class=Button id=btnOk style="visibility: hidden" onclick=Ok(); type=button value=Ok fckLang="DlgBtnOK">'
		var E,s;
		for (var i=0;i<e.length;i++)
		{//e.length=2
			if ((E=e[i].getAttribute('fckLang')))//true
			{	//E="DlgBtnOK"
				//getAttribute(a)获取该元素的(a)属性值
				if ((s=FCKLang[E]))
				{//s="确定"
					if (D)//false
					s=FCKTools.htmEncode(s);//转义"<",">"和"&"
					e[i][C]=s;
					//e[0].outerHTML='<input  class=Button id=btnOk style="visibility: hidden" onclick=Ok(); type=button value=确定 fckLang="DlgBtnOK">'
				}
			}
		}
	},
	/*
　 * param : pDocument 要翻譯的網頁的 window.document
　 */ 
	TranslatePage:function(A)//翻译指定值.(a)对象:为dowcument对象
	{//a=[object]	为document对象
		this.TranslateElements(A,'INPUT','value');//修改元素(b)中(c)的属性.(a)为对象.(d)是否转义"<",">"和"&"
		this.TranslateElements(A,'SPAN','innerHTML');//修改元素(b)中(c)的属性.(a)为对象.(d)是否转义"<",">"和"&"
		this.TranslateElements(A,'LABEL','innerHTML');//修改元素(b)中(c)的属性.(a)为对象.(d)是否转义"<",">"和"&"
		this.TranslateElements(A,'OPTION','innerHTML',true);//修改元素(b)中(c)的属性.(a)为对象.(d)是否转义"<",">"和"&"
		this.TranslateElements(A,'LEGEND','innerHTML');//修改元素(b)中(c)的属性.(a)为对象.(d)是否转义"<",">"和"&"
	},
	/*
　 * Initialize(): 初始化 FCKLanguageManager 
　 * 設定預設語言 ( this.DefaultLanguage )，取得要使用的語言
　 * ( this.ActiveLanguage.Code ) 以及其名稱 ( this.ActiveLanguage.Name 
　 */ 
	Initialize:function()//初始化 FCKLanguageManager 
	{
		if (this.AvailableLanguages[FCKConfig.DefaultLanguage])//="English"		条件成立
		{//AvailableLanguages[a]//返回(a)对应的字符串
			//a="en"
			this.DefaultLanguage=FCKConfig.DefaultLanguage;
		}
		else 
		{
			this.DefaultLanguage='en';
		}
		this.ActiveLanguage={};
		this.ActiveLanguage.Code=this.GetActiveLanguage();//="zh-cn"
		this.ActiveLanguage.Name=this.AvailableLanguages[this.ActiveLanguage.Code];//="Chinese Simplified"
		//AvailableLanguages[a]//返回(a)对应的字符串
			//a="zh-cn"
	}
};
var FCKXHtmlEntities={};
FCKXHtmlEntities.Initialize=function()//为特殊字符创建正则表达式
{
	if (FCKXHtmlEntities.Entities)//false
	return;
	var A='';
	var B,e;
	if (FCKConfig.ProcessHTMLEntities)//true	定义特殊字符
	{
		FCKXHtmlEntities.Entities=
		{//定义特殊字符
			'\t':'#09',
			'\n':'#10',
			'\r':'#13',
			' ':'nbsp',
			'¡':'iexcl',
			'¢':'cent',
			'£':'pound',
			'¤':'curren',
			'¥':'yen',
			'¦':'brvbar',
			'§':'sect',
			'¨':'uml',
			'©':'copy',
			'ª':'ordf',
			'«':'laquo',
			'¬':'not',
			'­':'shy',
			'®':'reg',
			'¯':'macr',
			'°':'deg',
			'±':'plusmn',
			'²':'sup2',
			'³':'sup3',
			'´':'acute',
			'µ':'micro',
			'¶':'para',
			'·':'middot',
			'¸':'cedil',
			'¹':'sup1',
			'º':'ordm',
			'»':'raquo',
			'¼':'frac14',
			'½':'frac12',
			'¾':'frac34',
			'¿':'iquest',
			'×':'times',
			'÷':'divide',
			'ƒ':'fnof',
			'•':'bull',
			'…':'hellip',
			'′':'prime',
			'″':'Prime',
			'‾':'oline',
			'⁄':'frasl',
			'℘':'weierp',
			'ℑ':'image',
			'ℜ':'real',
			'™':'trade',
			'ℵ':'alefsym',
			'←':'larr',
			'↑':'uarr',
			'→':'rarr',
			'↓':'darr',
			'↔':'harr',
			'↵':'crarr',
			'⇐':'lArr',
			'⇑':'uArr',
			'⇒':'rArr',
			'⇓':'dArr',
			'⇔':'hArr',
			'∀':'forall',
			'∂':'part',
			'∃':'exist',
			'∅':'empty',
			'∇':'nabla',
			'∈':'isin',
			'∉':'notin',
			'∋':'ni',
			'∏':'prod',
			'∑':'sum',
			'−':'minus',
			'∗':'lowast',
			'√':'radic',
			'∝':'prop',
			'∞':'infin',
			'∠':'ang',
			'∧':'and',
			'∨':'or',
			'∩':'cap',
			'∪':'cup',
			'∫':'int',
			'∴':'there4',
			'∼':'sim',
			'≅':'cong',
			'≈':'asymp',
			'≠':'ne',
			'≡':'equiv',
			'≤':'le',
			'≥':'ge',
			'⊂':'sub',
			'⊃':'sup',
			'⊄':'nsub',
			'⊆':'sube',
			'⊇':'supe',
			'⊕':'oplus',
			'⊗':'otimes',
			'⊥':'perp',
			'⋅':'sdot',
			'\u2308':'lceil',
			'\u2309':'rceil',
			'\u230a':'lfloor',
			'\u230b':'rfloor',
			'\u2329':'lang',
			'\u232a':'rang',
			'◊':'loz',
			'♠':'spades',
			'♣':'clubs',
			'♥':'hearts',
			'♦':'diams',
			'"':'quot',
			'>':'gt',
			'ˆ':'circ',
			'˜':'tilde',
			' ':'ensp',
			' ':'emsp',
			' ':'thinsp',
			'‌':'zwnj',
			'‍':'zwj',
			'‎':'lrm',
			'‏':'rlm',
			'–':'ndash',
			'—':'mdash',
			'‘':'lsquo',
			'’':'rsquo',
			'‚':'sbquo',
			'“':'ldquo',
			'”':'rdquo',
			'„':'bdquo',
			'†':'dagger',
			'‡':'Dagger',
			'‰':'permil',
			'‹':'lsaquo',
			'›':'rsaquo',
			'€':'euro'
		};
		for (e in FCKXHtmlEntities.Entities)
		A+=e;
		if (FCKConfig.IncludeLatinEntities)//true
		{
			B=
			{//定义汉语拼音声母字符
				'À':'Agrave',
				'Á':'Aacute',
				'Â':'Acirc',
				'Ã':'Atilde',
				'Ä':'Auml',
				'Å':'Aring',
				'Æ':'AElig',
				'Ç':'Ccedil',
				'È':'Egrave',
				'É':'Eacute',
				'Ê':'Ecirc',
				'Ë':'Euml',
				'Ì':'Igrave',
				'Í':'Iacute',
				'Î':'Icirc',
				'Ï':'Iuml',
				'Ð':'ETH',
				'Ñ':'Ntilde',
				'Ò':'Ograve',
				'Ó':'Oacute',
				'Ô':'Ocirc',
				'Õ':'Otilde',
				'Ö':'Ouml',
				'Ø':'Oslash',
				'Ù':'Ugrave',
				'Ú':'Uacute',
				'Û':'Ucirc',
				'Ü':'Uuml',
				'Ý':'Yacute',
				'Þ':'THORN',
				'ß':'szlig',
				'à':'agrave',
				'á':'aacute',
				'â':'acirc',
				'ã':'atilde',
				'ä':'auml',
				'å':'aring',
				'æ':'aelig',
				'ç':'ccedil',
				'è':'egrave',
				'é':'eacute',
				'ê':'ecirc',
				'ë':'euml',
				'ì':'igrave',
				'í':'iacute',
				'î':'icirc',
				'ï':'iuml',
				'ð':'eth',
				'ñ':'ntilde',
				'ò':'ograve',
				'ó':'oacute',
				'ô':'ocirc',
				'õ':'otilde',
				'ö':'ouml',
				'ø':'oslash',
				'ù':'ugrave',
				'ú':'uacute',
				'û':'ucirc',
				'ü':'uuml',
				'ý':'yacute',
				'þ':'thorn',
				'ÿ':'yuml',
				'Œ':'OElig',
				'œ':'oelig',
				'Š':'Scaron',
				'š':'scaron',
				'Ÿ':'Yuml'
			};
			for (e in B)
			{
				FCKXHtmlEntities.Entities[e]=B[e];//在"Entities"对象中加入数组
				A+=e;
			};
			B=null;
		};
		if (FCKConfig.IncludeGreekEntities)//true
		{
			B=
			{//定义特殊字符
				'Α':'Alpha',
				'Β':'Beta',
				'Γ':'Gamma',
				'Δ':'Delta',
				'Ε':'Epsilon',
				'Ζ':'Zeta',
				'Η':'Eta',
				'Θ':'Theta',
				'Ι':'Iota',
				'Κ':'Kappa',
				'Λ':'Lambda',
				'Μ':'Mu',
				'Ν':'Nu',
				'Ξ':'Xi',
				'Ο':'Omicron',
				'Π':'Pi',
				'Ρ':'Rho',
				'Σ':'Sigma',
				'Τ':'Tau',
				'Υ':'Upsilon',
				'Φ':'Phi',
				'Χ':'Chi',
				'Ψ':'Psi',
				'Ω':'Omega',
				'α':'alpha',
				'β':'beta',
				'γ':'gamma',
				'δ':'delta',
				'ε':'epsilon',
				'ζ':'zeta',
				'η':'eta',
				'θ':'theta',
				'ι':'iota',
				'κ':'kappa',
				'λ':'lambda',
				'μ':'mu',
				'ν':'nu',
				'ξ':'xi',
				'ο':'omicron',
				'π':'pi',
				'ρ':'rho',
				'ς':'sigmaf',
				'σ':'sigma',
				'τ':'tau',
				'υ':'upsilon',
				'φ':'phi',
				'χ':'chi',
				'ψ':'psi',
				'ω':'omega',
				'\u03d1':'thetasym',
				'\u03d2':'upsih',
				'\u03d6':'piv'
			};
			for (e in B)
			{
				FCKXHtmlEntities.Entities[e]=B[e];
				A+=e;
			};
			B=null;
		}
	}
	else
	{
		FCKXHtmlEntities.Entities={'>':'gt'};
		A='>';A+=' ';
	};
	var C='['+A+']';//特殊字符的内容
	if (FCKConfig.ProcessNumericEntities)//是否加入字符串"[^ -~]|"
	C='[^ -~]|'+C;
	var D=FCKConfig.AdditionalNumericEntities;
	if (D&&D.length>0)//false
	C+='|'+FCKConfig.AdditionalNumericEntities;
	FCKXHtmlEntities.EntitiesRegex=new RegExp(C,'g');
	// 创建正则表达式对象。
};
var FCKXHtml={};
FCKXHtml.CurrentJobNum=0;
FCKXHtml.GetXHTML=function(A,B,C)//排版(a)节点的内容.
{
	//A.innerHTML=内容 	b=true		c=true
	FCKDomTools.CheckAndRemovePaddingNode(FCKTools.GetElementDocument(A),FCKConfig.EnterMode);//不符
	//FCKTools.GetElementDocument=function (A)//返回元素所属的根元素
	//b="br"
	FCKXHtmlEntities.Initialize();//为特殊字符创建正则表达式
	this._NbspEntity=(FCKConfig.ProcessHTMLEntities?'nbsp':'#160');//="nbsp"
	//FCKConfig.ProcessHTMLEntities=true
	var D=FCK.IsDirty();//false		返回内容是否相同
	FCKXHtml.SpecialBlocks=[];
	this.XML=FCKTools.CreateXmlObject('DOMDocument');//创建XML DOM对象
	this.MainNode=this.XML.appendChild(this.XML.createElement('xhtml'));//在this.XML节点处插入'xhtml'标签
	FCKXHtml.CurrentJobNum++;//=1
	if (B)//true
	{
		this._AppendNode(this.MainNode,A);//修改(a)节点的文本(b)为特定字符
		//1.xml="<xhtml/>"	2.outerHTML=内容
	}
	else
	this._AppendChildNodes(this.MainNode,A,false);//修改(a)节点的文本
	/*
	this.MainNode.nodeName="Xhtml"
	A.nodeName="BODY"	
	nodeName 属性含有某个节点的名称。
	元素节点的 nodeName 是标签名称
	属性节点的 nodeName 是属性名称
	文本节点的 nodeName 永远是 #text
	文档节点的 nodeName 永远是 #document
*/
	var E=this._GetMainXmlString();//=内容
	this.XML=null;
	if (FCKBrowserInfo.IsSafari)//false
	E=E.replace(/^<xhtml.*?>/,'<xhtml>');
	E=E.substr(7,E.length-15).Trim();
	//substr 方法	返回一个从指定位置开始的指定长度的子字符串。
	if (FCKConfig.DocType.length>0&&FCKRegexLib.htmDocType.test(FCKConfig.DocType)) //false
	E=E.replace(FCKRegexLib.SpaceNoClose,'>');
	else
	E=E.replace(FCKRegexLib.SpaceNoClose,' />');
	if (FCKConfig.ForceSimpleAmpersand) //false
	E=E.replace(FCKRegexLib.ForceSimpleAmpersand,'&');
	if (C)//true
	E=FCKCodeFormatter.Format(E);//=内容
	for (var i=0;i<FCKXHtml.SpecialBlocks.length;i++)
	{
		//FCKXHtml.SpecialBlocks.length=1
		var F=new RegExp('___FCKsi___'+i);
		E=E.replace(F,FCKXHtml.SpecialBlocks[i]);
	};
	E=E.replace(FCKRegexLib.GeckoEntitiesMarker,'&');
	//a=/#\?-\:/g
	if (!D)//true
	FCK.ResetIsDirty();//设置"StartupValue"为内容
	FCKDomTools.EnforcePaddingNode(FCKTools.GetElementDocument(A),FCKConfig.EnterMode);//插入换行标记
	//FCKTools.GetElementDocument=function (A)//返回元素所属的根元素
	//FCKConfig.EnterMode='br'
	return E;
};
FCKXHtml._AppendAttribute=function(A,B,C)//在(1)标记处设置(2)属性的值为(3)
{
	//1.xml='<xhtml/>'		2="xmlns"	3=="http://www.w3.org/1999/xhtml"	
	try
	{
		if (C==undefined||C==null)//false
		C='';
		else if (C.replace)//true
		{
			if (FCKConfig.ForceSimpleAmpersand)//false
			C=C.replace(/&/g,'___FCKAmp___');
			C=C.replace(FCKXHtmlEntities.EntitiesRegex,FCKXHtml_GetEntity);
			//1=特殊字符的正则	//2=函数
				//FCKXHtml_GetEntity(A)//将不被HTML识别的代码，转换成特殊字符
		};
		var D=this.XML.createAttribute(B);
		//B="xmlns"			通过使用 createAttribute 来创建属性节点
		D.value=C;
		//D.xml='xmlns="http://www.w3.org/1999/xhtml"'
		A.attributes.setNamedItem(D);
		//setNamedItem()	设置指定的节点（根据名称）
		//attributes	返回指定文件的属性
		//A.xml='<html xmlns="http://www.w3.org/1999/xhtml">'
	}
	catch (e){}
};
FCKXHtml._AppendChildNodes=function(A,B,C)//在(1)节点处增加(2)节点。(3)是否转换非网页编码
{
	//A.tagName="html"	B.outerHTML=内容		c=flase
	var D=B.firstChild;
	//D.outerHTML=head标记的内容
	//firstChild 属性可返回文档的首个子节点。
	while (D)//true
	{
		this._AppendNode(A,D);//修改(a)节点的文本(b)为特定字符
		//1.tagName="html"		2.outerHTML=为head标记的内容
		D=D.nextSibling;
		//nextSibling	表示到下一节点
	};
	if (C&&B.tagName&&B.tagName.toLowerCase()!='pre')//false -> true
	{
		//B.tagName="P"
		//tagName 	属性返回被选元素的标签名。
		//toLowerCase 方法	返回一个字符串，该字符串中的字母被转换为小写字母。
		FCKDomTools.TrimNode(A);//删除字符串的多余空格
		//A.tagName="p"	
		if (FCKConfig.FillEmptyBlocks)//true
		{
			var E=A.lastChild;
			//lastChild	返回元素的最后一个子节点
			if (E&&E.nodeType==1&&E.nodeName=='br')//false
			{
				//E.nodeType=3		E.nodeName=#text
				this._AppendEntity(A,this._NbspEntity);
			}
		}
	};
	if (A.childNodes.length==0)//false -> true		当元素没子元素时设一个默认值
	{
		//childNodes 	获取所有子节点
		if (C&&FCKConfig.FillEmptyBlocks)//false
		{
			this._AppendEntity(A,this._NbspEntity);
			return A;
		};
		var F=A.nodeName;//="body"
		//nodeName 属性来获取元素的节点名称
		if (FCKListsLib.InlineChildReqElements[F])//false	因为"InlineChildReqElements"方法里找不到"F"属性
		return null;
		if (!FCKListsLib.EmptyElements[F])//true	因为是在"EmptyElements"方法里找不到"F"属性
		A.appendChild(this.XML.createTextNode(''));//在A处插入空标签
	};
	return A;
};
FCKXHtml._AppendNode=function(A,B)//修改(a)节点的文本(b)为特定字符
{
	//A.xml="xhtml"		B.outerHTML=内容
	if (!B)
	return false;
	switch (B.nodeType)//=1
	{
//		nodeType
//		nodeType 属性可返回节点的类型。
//		最重要的节点类型是：
//		元素类型 节点类型 
//		元素element		1 
//		属性attr 		2 
//		文本text			3 
//		注释comments 	8 
//		文档document		9 
		case 1:
			if (FCKBrowserInfo.IsGecko&&B.tagName.toLowerCase()=='br'&&B.parentNode.tagName.toLowerCase()=='pre')//false
			{
				var C='\r';
				if (B==B.parentNode.firstChild)
				C+='\r';
				return FCKXHtml._AppendNode(A,this.XML.createTextNode(C));
			};
			if (B.getAttribute('_fckfakelement'))//unll		getAttribute	返回属性(1)的值。
			{//getAttribute	返回属性的值。
				return FCKXHtml._AppendNode(A,FCK.GetRealElement(B));
			}
			if (FCKBrowserInfo.IsGecko&&(B.hasAttribute('_moz_editor_bogus_node')||B.getAttribute('type')=='_moz'))//false
			{
				//hasAttribute() 方法	返回元素是否拥有指定的属性。
				//getAttribute	返回属性的值。
				if (B.nextSibling) 
				return false;
				else
				{
					B.removeAttribute('_moz_editor_bogus_node');
					B.removeAttribute('type');
				}
			};
			if (B.getAttribute('_fcktemp'))//null	getAttribute	返回属性(1)的值。
			return false;
			var D=B.tagName.toLowerCase();//="html"
			if (FCKBrowserInfo.IsIE)//true
			{
				if (B.scopeName&&B.scopeName!='HTML'&&B.scopeName!='FCK')//FALSE
				{
					//B.scopeName="HTML"
					//scopeName 获取为该元素定义的命名空间。 
					D=B.scopeName.toLowerCase()+':'+D;
				}
			}
			else
			{
				if (D.StartsWith('fck:'))
				D=D.Remove(0,4);
			};
			if (!FCKRegexLib.ElementName.test(D))//false
			return false;//=/(^[a-z_:][\w.\-:]*\w$)|(^[a-z_]$)/
			if (B._fckxhtmljob&&B._fckxhtmljob==FCKXHtml.CurrentJobNum)//false
			return false;
			var E=this.XML.createElement(D);//准备插入(a)
			//E.xml="<html/>"			//D="html"
			FCKXHtml._AppendAttributes(A,B,E,D);//在(1)节点里插入(2)节点为(3)节点.(4)是跳过'body'标记的设计模式 
			//A.xml="<xhtml/>"		B.outerHTML=内容		E.xml='<html/>'		D="html"
			B._fckxhtmljob=FCKXHtml.CurrentJobNum;//=1
			var F=FCKXHtml.TagProcessors[D];//＝undefined
			if (F) //＝undefined
			{
				E=F(E,B,A);//在(1)节点里插入(2)节点为(3)节点.
			}
			else
			{
				E=this._AppendChildNodes(E,B,Boolean(FCKListsLib.NonEmptyBlockElements[D]));//在(1)节点处增加(2)节点。(3)是否转换非网页编码
				//E.tagName="html"	B.tagName="HTML"	c=false				
			}
			if (!E) //false
			return false;
			A.appendChild(E);
			break;
		case 3://修改非网页文本为特定字符。
			if (B.parentNode&&B.parentNode.nodeName.IEquals('pre')) //false
			{
				//扩展parentNode指针的功能，实现一次能够操纵多个父元素
				//String.prototype.IEquals=function()//当前对象等于参数返回true否则false
				return this._AppendTextNode(A,B.nodeValue);//修改非网页文本为特定字符。(1)为范围标记。(2)该范围的内容
			}			
			return this._AppendTextNode(A,B.nodeValue.ReplaceNewLineChars(' '));//修改非网页文本为特定字符。(1)为范围标记。(2)该范围的内容
			//A.xml=内容	2="sssssssssssss"
			//对于文本节点，nodeValue 属性包含文本。
			//String.prototype.ReplaceNewLineChars=function(A)//将换行符替换为(1)
		case 8://插入注释
			if (FCKBrowserInfo.IsIE&&!B.innerHTML) //false
			break;
			try 
			{
				A.appendChild(this.XML.createComment(B.nodeValue));
				//createComment	创建一个注释节点
				//a="{10102157327340}"
			}
			catch (e) {};
			//A.xml="<xhtml><!---{12345679889654}-></xhtml>"
			break;
		default:
			A.appendChild(this.XML.createComment("Element not supported - Type: "+B.nodeType+" Name: "+B.nodeName));
			break;
	};
	return true;

};
FCKXHtml._AppendSpecialItem=function(A)
{
	return '___FCKsi___'+(FCKXHtml.SpecialBlocks.push(A)-1);
};
FCKXHtml._AppendEntity=function(A,B)
{
	A.appendChild(this.XML.createTextNode('#?-:'+B+';'));
};
FCKXHtml._AppendTextNode=function(A,B)//修改非网页文本为特定字符。(1)为范围标记。(2)该范围的内容
{
	//A.xml="<body/>"		b="ssssssssssssss ssssssssssss "
	var C=B.length>0;//true
	if (C)
	A.appendChild(this.XML.createTextNode(B.replace(FCKXHtmlEntities.EntitiesRegex,FCKXHtml_GetEntity)));
	//A.appendChild([object].createTextNode(B.replace(正则表达式,函数)));
	//createTextNode() 方法创建新的文本节点。
	return C;
};
function FCKXHtml_GetEntity(A)//将不被HTML识别的代码，转换成特殊字符
{
	//a=" "
	var B=FCKXHtmlEntities.Entities[A]||('#'+A.charCodeAt(0));
	//charCodeAt 方法	返回一个整数，代表指定位置上字符的 Unicode 编码。
	return '#?-:'+B+';';//='#?-:nbsp;'
};
FCKXHtml.TagProcessors=
{
	a:function(A,B)
	{
		if (B.innerHTML.Trim().length==0&&!B.name)
		return false;
		var C=B.getAttribute('_fcksavedurl');
		if (C!=null)
		FCKXHtml._AppendAttribute(A,'href',C);
		if (FCKBrowserInfo.IsIE)
		{
			if (B.name)
			FCKXHtml._AppendAttribute(A,'name',B.name);
		};
		A=FCKXHtml._AppendChildNodes(A,B,false);
		return A;
	},
	area:function(A,B)
	{
		var C=B.getAttribute('_fcksavedurl');
		if (C!=null)
		FCKXHtml._AppendAttribute(A,'href',C);
		if (FCKBrowserInfo.IsIE)
		{
			if (!A.attributes.getNamedItem('coords'))
			{
				var D=B.getAttribute('coords',2);
				if (D&&D!='0,0,0')
				FCKXHtml._AppendAttribute(A,'coords',D);
			};
			if (!A.attributes.getNamedItem('shape'))
			{
				var E=B.getAttribute('shape',2);
				if (E&&E.length>0) 
				FCKXHtml._AppendAttribute(A,'shape',E.toLowerCase());
			}
		};
		return A;
	},
	body:function(A,B)
	{
		//1.xml="<body/>"	
		//2.outerHTML="<BODY contentEditable=true _fckxhtmljob="1">kkkk<A href="#" _fcksavedurl="#">fffffff</A>kkkkkkkk </BODY>"
		A=FCKXHtml._AppendChildNodes(A,B,false);
		A.removeAttribute('spellcheck');
		return A;
	},
	iframe:function(A,B)
	{
		var C=B.innerHTML;
		if (FCKBrowserInfo.IsGecko)
		C=FCKTools.htmDecode(C);
		C=C.replace(/\s_fcksavedurl="[^"]*"/g,'');
		A.appendChild(FCKXHtml.XML.createTextNode(FCKXHtml._AppendSpecialItem(C)));
		return A;
	},
	img:function(A,B)
	{
		if (!A.attributes.getNamedItem('alt'))
		FCKXHtml._AppendAttribute(A,'alt','');
		var C=B.getAttribute('_fcksavedurl');
		if (C!=null) 
		FCKXHtml._AppendAttribute(A,'src',C);
		if (B.style.width)
		A.removeAttribute('width');
		if (B.style.height) 
		A.removeAttribute('height');
		return A;
	},
	li:function(A,B,C)
	{
		if (C.nodeName.IEquals(['ul','ol'])) 
		return FCKXHtml._AppendChildNodes(A,B,true);
		var D=FCKXHtml.XML.createElement('ul');
		B._fckxhtmljob=null;
		do
		{
			FCKXHtml._AppendNode(D,B);
			do
			{
				B=FCKDomTools.GetNextSibling(B);
			}
			while (B&&B.nodeType==3&&B.nodeValue.Trim().length==0)
		}	
		while (B&&B.nodeName.toLowerCase()=='li')
		return D;
	},
	ol:function(A,B,C)
	{
//		if (B.innerHTML.Trim().length==0) ~~~~~~~~~~小星（2010-7-9）
//		return false;
		var D=C.lastChild;
		if (D&&D.nodeType==3)
		D=D.previousSibling;
		if (D&&D.nodeName.toUpperCase()=='LI')
		{
			B._fckxhtmljob=null;
			FCKXHtml._AppendNode(D,B);
			return false;
		};
		A=FCKXHtml._AppendChildNodes(A,B);
		return A;
	},
	pre:function (A,B)
	{
		var C=B.firstChild;
		if (C&&C.nodeType==3)
		A.appendChild(FCKXHtml.XML.createTextNode(FCKXHtml._AppendSpecialItem('\r\n')));
		FCKXHtml._AppendChildNodes(A,B,true);
		return A;
	},
	script:function(A,B)
	{
		if (!A.attributes.getNamedItem('type')) 
		FCKXHtml._AppendAttribute(A,'type','text/javascript');
		A.appendChild(FCKXHtml.XML.createTextNode(FCKXHtml._AppendSpecialItem(B.text)));
		return A;
	},
	span:function(A,B)
	{
		if (B.innerHTML.length==0) 
		return false;
		A=FCKXHtml._AppendChildNodes(A,B,false);
		return A;
	},
	style:function(A,B)
	{
		if (!A.attributes.getNamedItem('type')) 
		FCKXHtml._AppendAttribute(A,'type','text/css');
		var C=B.innerHTML;
		if (FCKBrowserInfo.IsIE)
		C=C.replace(/^(\r\n|\n|\r)/,'');
		A.appendChild(FCKXHtml.XML.createTextNode(FCKXHtml._AppendSpecialItem(C)));
		return A;
	},
	title:function(A,B)//在(1)节点处插入(2)
	{
		//1.xml="<title/>"	2.outerHTML='<TITLE _fckxhtmljob="1">无标题文档</TITLE>'
		A.appendChild(FCKXHtml.XML.createTextNode(FCK.EditorDocument.title));
		//1=""
		return A;
	}
};
FCKXHtml.TagProcessors.ul=FCKXHtml.TagProcessors.ol;
FCKXHtml._GetMainXmlString=function()
{
	return this.MainNode.xml;
};
FCKXHtml._AppendAttributes=function(A,B,C,D)//在(1)节点里插入(2)节点为(3)节点.(4)是跳过'body'标记的设计模式 
{
	//A.xml="<xhtml/>"		B.outerHTML=内容		C.xml='<xhtml/>'		D="html"
	var E=B.attributes,bHasStyle;
	//attributes	设置或返回文件或文件夹的属性。
	for (var n=0;n<E.length;n++)//108
	{
		var F=E[n];//=[object]
		if (F.specified)//false	->	true
		{
			//specified	如果属性值被设置在文档中，则返回 true，如果其默认值被设置在 DTD/Schema 中，则返回 false
			var G=F.nodeName.toLowerCase();//=xmlns
			var H;
			if (G.StartsWith('_fck'))//false 
			continue;
			else if (G=='style')//false
			{
				bHasStyle=true;
				continue;
			}
			else if (G=='class')//false
			{
				H=F.nodeValue.replace(FCKRegexLib.FCK_Class,'');
				if (H.length==0)
				continue;
			}
			else if (G.indexOf('on')==0)//false
			H=F.nodeValue;
			else if (D=='body'&&G=='contenteditable')//false
			continue;//contentEditable   属性。		将文档设置为设计模式 
			else if (F.nodeValue===true)//false
			H=G;
			else
			{
				try
				{
					
					H=B.getAttribute(G,2);//="http://www.w3.org/1999/xhtml"	
					//getAttribute	返回属性的值
						//1='xmlns'
				}catch (e) {}
			};
			this._AppendAttribute(C,G,H||F.nodeValue);//在(1)标记处设置(2)属性的值为(3)
			//C.xml='<xhtml/>'		G="xmlns"	3="http://www.w3.org/1999/xhtml"	
		}
	};
	if (bHasStyle||B.style.cssText.length>0)//false
	{
		//bHasStyle=undefined
		//cssText 属性是一组样式属性及其值的文本表示。这个文本格式化为一个 CSS 样式表，去掉了包围属性和值的元素选择器的花括号。
		var I=FCKTools.ProtectFormStyles(B);
		var J=B.style.cssText.replace(FCKRegexLib.StyleProperties,FCKTools.ToLowerCase);
		FCKTools.RestoreFormStyles(B,I);
		this._AppendAttribute(C,'style',J);
	}
};
FCKXHtml.TagProcessors['div']=function(A,B)
{
	if (B.align.length>0) 
	FCKXHtml._AppendAttribute(A,'align',B.align);
	A=FCKXHtml._AppendChildNodes(A,B,true);
	return A;
};
FCKXHtml.TagProcessors['font']=function(A,B)
{
	if (A.attributes.length==0)
	A=FCKXHtml.XML.createDocumentFragment();
	A=FCKXHtml._AppendChildNodes(A,B);
	return A;
};
FCKXHtml.TagProcessors['form']=function(A,B)
{
	if (B.acceptCharset&&B.acceptCharset.length>0&&B.acceptCharset!='UNKNOWN')
	FCKXHtml._AppendAttribute(A,'accept-charset',B.acceptCharset);
	var C=B.attributes['name'];
	if (C&&C.value.length>0)
	FCKXHtml._AppendAttribute(A,'name',C.value);
	A=FCKXHtml._AppendChildNodes(A,B,true);
	return A;
};
FCKXHtml.TagProcessors['input']=function(A,B)
{
	if (B.name) 
	FCKXHtml._AppendAttribute(A,'name',B.name);
	if (B.value&&!A.attributes.getNamedItem('value'))
	FCKXHtml._AppendAttribute(A,'value',B.value);
	if (!A.attributes.getNamedItem('type'))
	FCKXHtml._AppendAttribute(A,'type','text');
	return A;
};
FCKXHtml.TagProcessors['label']=function(A,B)
{
	if (B.htmFor.length>0)
	FCKXHtml._AppendAttribute(A,'for',B.htmFor);
	A=FCKXHtml._AppendChildNodes(A,B);
	return A;
};
FCKXHtml.TagProcessors['map']=function(A,B)
{
	if (!A.attributes.getNamedItem('name'))
	{
		var C=B.name;
		if (C)
		FCKXHtml._AppendAttribute(A,'name',C);
	};
	A=FCKXHtml._AppendChildNodes(A,B,true);
	return A;
};
FCKXHtml.TagProcessors['meta']=function(A,B)
{
	//alert('metametametametametametametametametametametametametametameta')
	var C=A.attributes.getNamedItem('http-equiv');
	if (C==null||C.value.length==0)
	{
		var D=B.outerHTML.match(FCKRegexLib.MetaHttpEquiv);
		if (D)
		{
			D=D[1];
			FCKXHtml._AppendAttribute(A,'http-equiv',D);
		}
	};
	return A;
};
FCKXHtml.TagProcessors['option']=function(A,B)
{
	if (B.selected&&!A.attributes.getNamedItem('selected'))
	FCKXHtml._AppendAttribute(A,'selected','selected');
	A=FCKXHtml._AppendChildNodes(A,B);
	return A;
};
FCKXHtml.TagProcessors['textarea']=FCKXHtml.TagProcessors['select']=function(A,B)
{
	if (B.name) 
	FCKXHtml._AppendAttribute(A,'name',B.name);
	A=FCKXHtml._AppendChildNodes(A,B);
	return A;
};
var FCKCodeFormatter={};
FCKCodeFormatter.Init=function()//定义正则
{
	var A=this.Regex={};
	A.BlocksOpener=/\<(A|P|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|DL|DT|DD|TITLE|META|LINK|BASE|SCRIPT|LINK|TD|TH|AREA|OPTION)[^\>]*\>/gi;
	A.BlocksCloser=/\<\/(A|P|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|DL|DT|DD|TITLE|META|LINK|BASE|SCRIPT|LINK|TD|TH|AREA|OPTION)[^\>]*\>/gi;
	A.NewLineTags=/\<(BR|HR)[^\>]*\>/gi;
	A.MainTags=/\<\/?(DIV|HEAD|BODY|FORM|TABLE|TBODY|THEAD|TR|UL)[^\>]*\>/gi;
	A.LineSplitter=/\s*\n+\s*/g;
	A.IncreaseIndent=/^\<(DIV|HEAD|BODY|FORM|TABLE|TBODY|THEAD|TR|UL|OL|DL)[ \/\>]/i;
	A.DecreaseIndent=/^\<\/(DIV|HEAD|BODY|FORM|TABLE|TBODY|THEAD|TR|UL|OL|DL)[ \>]/i;
	A.FormatIndentatorRemove=new RegExp('^'+FCKConfig.FormatIndentator);
	//a='    '
	A.ProtectedTags=/(<PRE[^>]*>)([\s\S]*?)(<\/PRE>)/gi;
};
FCKCodeFormatter._ProtectData=function(A,B,C,D)
{
	//a="<pre>___FCKsi___0xxx</pre>"
	//b="<pre>"		c="___FCKsi___0xxx"		d="</pre>"
	return B+'___FCKpd___'+(FCKCodeFormatter.ProtectedData.push(C)-1)+D;//="<pre>___FCKsi___0</pre>"
};
FCKCodeFormatter.Format=function(A)
{
	//a=内容
	if (!this.Regex)//true
	this.Init();//定义正则
	FCKCodeFormatter.ProtectedData=[];
	var B=A.replace(this.Regex.ProtectedTags,FCKCodeFormatter._ProtectData);//="<pre>___FCKsi___0</pre>"
	//a=/(<PRE[^>]*>)([\s\S]*?)(<\/PRE>)/	b=函数
	B=B.replace(this.Regex.BlocksOpener,'\n$&');
	//a=/\<(P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|DL|DT|DD|TITLE|META|LINK|BASE|SCRIPT|LINK|TD|TH|AREA|OPTION)[^\>]*\>/
	B=B.replace(this.Regex.BlocksCloser,'$&\n');
	//a=/\<\/(P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|DL|DT|DD|TITLE|META|LINK|BASE|SCRIPT|LINK|TD|TH|AREA|OPTION)[^\>]*\>/
	B=B.replace(this.Regex.NewLineTags,'$&\n');
	//a=/\<(BR|HR)[^\>]*\>/
	B=B.replace(this.Regex.MainTags,'\n$&\n');
	//a=/\<\/?(HTML|HEAD|BODY|FORM|TABLE|TBODY|THEAD|TR)[^\>]*\>/
	var C='';
	var D=B.split(this.Regex.LineSplitter);
	//a=/\s*\n+\s*/
	B='';
	for (var i=0;i<D.length;i++)
	{
		//D.length=26
		var E=D[i];//<!--{123456789}--><!--{123456789}--><!--{123456789}--><aa></aa><a href="../x">测试内容</a>
		if (E.length==0)//false
		continue;
		if (this.Regex.DecreaseIndent.test(E))//false	//减少：排版所用的"空格"
		{//this.Regex.DecreaseIndent=/^\<\/(HTML|HEAD|BODY|FORM|TABLE|TBODY|THEAD|TR|UL|OL|DL)[ \>]/
			C=C.replace(this.Regex.FormatIndentatorRemove,'');
		}
		B+=C+E+'\n';
		if (this.Regex.IncreaseIndent.test(E))//false	//增加：排版所用的"空格"
		{
			C+=FCKConfig.FormatIndentator;//='    ' 
		}
	};
	for (var j=0;j<FCKCodeFormatter.ProtectedData.length;j++)
	{
		var F=new RegExp('___FCKpd___'+j);
		B=B.replace(F,FCKCodeFormatter.ProtectedData[j].replace(/\$/g,'$$$$'));
	};
	return B.Trim();
};
var FCKUndo={};
FCKUndo.SavedData=[];
FCKUndo.CurrentIndex=-1;
FCKUndo.TypesCount=0;
FCKUndo.Changed=false;
FCKUndo.maxTypes=25;
FCKUndo.Typing=false;
FCKUndo.SaveLocked=false;
FCKUndo._GetBookmark=function()//处理选中区
{
	FCKSelection.Restore();//设置"IsSelectionChangeLocked"属性true或false
	var A=new FCKDomRange(FCK.EditorWindow);//设置"Window"为(a).设置"_Cache"为{}
	//a=[object]
	try
	{
		A.MoveToSelection();//处理选中区
	}
	catch (e)
	{
		return null;
	};
	if (FCKBrowserInfo.IsIE)//true
	{
		var B=A.CreateBookmark();//插入span标记并设置属性
		var C=FCK.EditorDocument.body.innerHTML;//=内容
		A.MoveToBookmark(B);//设置属性
		return [B,C];
	};
	return A.CreateBookmark2();
};
FCKUndo._SelectBookmark=function(A)
{
	if (!A)
	return;
	var B=new FCKDomRange(FCK.EditorWindow);
	if (A instanceof Object)
	{
		if (FCKBrowserInfo.IsIE) 
		B.MoveToBookmark(A[0]);
		else 
		B.MoveToBookmark2(A);
		try
		{
			B.Select();
		}
		catch (e)
		{
			B.MoveToPosition(FCK.EditorDocument.body,4);
			B.Select();
		}
	}
};
FCKUndo._CompareCursors=function(A,B)
{
	for (var i=0;i<Math.min(A.length,B.length);i++)
	{
		if (A[i]<B[i])
		return-1;
		else if (A[i]>B[i])
		return 1;
	};
	if (A.length<B.length) 
	return-1;
	else if (A.length>B.length) 
	return 1;
	return 0;
};
FCKUndo._CheckIsBookmarksEqual=function(A,B)
{
	if (!(A&&B))
	return false;
	if (FCKBrowserInfo.IsIE)
	{
		var C=A[1].search(A[0].StartId);
		var D=B[1].search(B[0].StartId);
		var E=A[1].search(A[0].EndId);
		var F=B[1].search(B[0].EndId);
		return C==D&&E==F;
	}
	else
	{
		return this._CompareCursors(A.Start,B.Start)==0&&this._CompareCursors(A.End,B.End)==0;
	}
};
FCKUndo.SaveUndoStep=function()//设置当文档的选中状态改变时触发事件。
{
	if (FCK.EditMode!=0||this.SaveLocked) //false
	return;
	if (this.SavedData.length)//false 
	this.Changed=true;
	var A=FCK.EditorDocument.body.innerHTML;//内容
	var B=this._GetBookmark();//处理选中区
	this.SavedData=this.SavedData.slice(0,this.CurrentIndex+1);//=""
	if (this.CurrentIndex>0&&A==this.SavedData[this.CurrentIndex][0]&&this._CheckIsBookmarksEqual(B,this.SavedData[this.CurrentIndex][1]))//false
	return;
	else if (this.CurrentIndex==0&&this.SavedData.length&&A==this.SavedData[0][0])//false
	{
		this.SavedData[0][1]=B;
		return;
	};
	if (this.CurrentIndex+1>=FCKConfig.maxUndoLevels)//false
	this.SavedData.shift();
	else 
	this.CurrentIndex++;
	this.SavedData[this.CurrentIndex]=[A,B];
	//this.CurrentIndex=0
	FCK.Events.FireEvent("OnSelectionChange");//触发指定事件
	//onselectionchange 当文档的选中状态改变时触发。
};
FCKUndo.CheckUndoState=function()
{
	return (this.Changed||this.CurrentIndex>0);
};
FCKUndo.CheckRedoState=function()
{
	return (this.CurrentIndex<(this.SavedData.length-1));
};
FCKUndo.Undo=function()
{
	if (this.CheckUndoState())
	{
		if (this.CurrentIndex==(this.SavedData.length-1))
		{
			this.SaveUndoStep();
		};
		this._ApplyUndoLevel(--this.CurrentIndex);
		FCK.Events.FireEvent("OnSelectionChange");
	}
};
FCKUndo.Redo=function()
{
	if (this.CheckRedoState())
	{
		this._ApplyUndoLevel(++this.CurrentIndex);
		FCK.Events.FireEvent("OnSelectionChange");
	}
};
FCKUndo._ApplyUndoLevel=function(A)
{
	var B=this.SavedData[A];
	if (!B)
	return;
	if (FCKBrowserInfo.IsIE)
	{
		if (B[1]&&B[1][1])
		FCK.SetInnerHtml(B[1][1]);
		else 
		FCK.SetInnerHtml(B[0]);
	}
	else 
	FCK.EditorDocument.body.innerHTML=B[0];
	this._SelectBookmark(B[1]);
	this.TypesCount=0;
	this.Changed=false;
	this.Typing=false;
};
var FCKEditingArea=function(A)//初始化
{//a=[object]	为插入内容的id返问
	this.TargetElement=A;
	this.Mode=0;
	if (FCK.IECleanup)//true 
	FCK.IECleanup.AddItem(this,FCKEditingArea_Cleanup);//将a和b添加到Items数组中，并返回数组的新长度值
};
FCKEditingArea.prototype.Start=function(A,B)//显示编辑器的内容
{
	//a=内容		b=undefined
	var C=this.TargetElement;//=[object]	在"初始化"里定义了"TargetElement“属性为元素返问
	var D=FCKTools.GetElementDocument(C);//返回元素所属的根元素
	//ownerDocument		返回元素所属的根元素 (document 对象)
	while(C.firstChild) //=unll
	C.removeChild(C.firstChild);
	//removeChild	清除指定元素及其所有子元素之间的空格
		//firstChild 属性可返回文档的首个子节点。
	if (this.Mode==0)//true
	{
		if (FCK_IS_CUSTOM_DOMAIN)//false
		A='<script>document.domain="'+FCK_RUNTIME_DOMAIN+'";</script>'+A;
		if (FCKBrowserInfo.IsIE) //true		给base标记加结束标记
		{
			
			A=A.replace(/(<base[^>]*?)\s*\/?>(?!\s*<\/base>)/gi,'$1></base>');//给base标记加结束标记
			//a=(<base[^>]*?)\s*\/?>(?!\s*<\/base>)
			//如:<base>	注:不查找".js"中的内容
		}
		else if (!B)
		{
			var E=A.match(FCKRegexLib.BeforeBody);
			var F=A.match(FCKRegexLib.AfterBody);
			if (E&&F)
			{
				var G=A.substr(E[1].length,A.length-E[1].length-F[1].length);
				A=E[1]+'&nbsp;'+F[1];
				if (FCKBrowserInfo.IsGecko&&(G.length==0||FCKRegexLib.EmptyParagraph.test(G)))
				G='<br type="_moz">';
				this._BodyHTML=G;
			}
			else
			this._BodyHTML=A;
		};
		var H=this.IFrame=D.createElement('iframe');
		//"iframe"是"浮动窗口标记"
		var I='<script type="text/javascript" _fcktemp="true">window.onerror=function(){return true;};</script>';
		H.frameBorder=0;
		H.style.width=H.style.height='100%';
		if (FCK_IS_CUSTOM_DOMAIN&&FCKBrowserInfo.IsIE)//false
		{
			window._FCKHtmlToLoad=A.replace(/<head>/i,'<head>'+I);
			H.src='javascript:void( (function()'+
												'{'+
													'document.open() ;'+
													'document.domain="'+document.domain+'" ;'+
													'document.write( window.parent._FCKHtmlToLoad );'+
													'document.close() ;'+
													'window.parent._FCKHtmlToLoad = null ;'+
												'})() )';
		}
		else if (!FCKBrowserInfo.IsGecko)//true
		{
			H.src='javascript:void(0)';
		};
		C.appendChild(H);//在C中插入H
		this.Window=H.contentWindow;
		//contentWindow属性是指指定的frame或者iframe所在的window对象
		if (!FCK_IS_CUSTOM_DOMAIN||!FCKBrowserInfo.IsIE)//true	//显示编辑器的内容
		{
			var J=this.Window.document;//=[object]
			J.open();//open 此方法以两种方式工作。
			J.write(A.replace(/<head>/i,'<head>'+I));//在head标记后面插入I
			J.close();//close 关闭输出流并强制将数据发送到显示。 
		};
		if (FCKBrowserInfo.IsAIR)//false
		FCKAdobeAIR.EditingArea_Start(J,A);
		if (FCKBrowserInfo.IsGecko10&&!B)//undefined
		{
			this.Start(A,true);
			return;
		};
		if (H.readyState&&H.readyState!='completed')//true
		{//readyState 属性存有服务器响应的状态信息。每当 readyState 改变时，onreadystatechange 函数就会被执行。
			var K=this;//[object Object]
			setTimeout(function()
								{
									try
									{
										K.Window.document.documentElement.doScroll("left");
										//doScroll	如果发生了同步的滚动则返回非零值；否则返回0。
									}
									catch(e)
									{
										setTimeout(arguments.callee,0);
										//arguments 	返回一个包含传递给当前执行函数的每个参数的数组。
											//callee 属性	返回正被执行的 Function 对象，也就是所指定的 Function 对象的正文
										return;
									};
									K.Window._FCKEditingArea=K;//在iframe内定义"_FCKEditingArea"属性为FCKEditingArea对象
									FCKEditingArea_CompleteStart.call(K.Window);//设置触发事件
									//call 方法	调用一个对象的一个方法，以另一个对象替换当前对象。
								},
						0);
		}
		else
		{
			this.Window._FCKEditingArea=this;
			if (FCKBrowserInfo.IsGecko10)
			this.Window.setTimeout(FCKEditingArea_CompleteStart,500);
			else
			FCKEditingArea_CompleteStart.call(this.Window);
		}
	}
	else
	{
		var L=this.Textarea=D.createElement('textarea');
		L.className='SourceField';
		L.dir='ltr';
		FCKDomTools.SetElementStyles(L,{
									 width:'100%',
									 height:'100%',
									 border:'none',
									 resize:'none',
									 outline:'none'
									 });
		C.appendChild(L);
		L.value=A;
		FCKTools.RunFunction(this.OnLoad);
	}
};
function FCKEditingArea_CompleteStart()//设置触发事件
{//this  指向window对象是框架里的
	if (!this.document.body)//false
	{
		this.setTimeout(FCKEditingArea_CompleteStart,50);
		return;
	};
	var A=this._FCKEditingArea;//在iframe内定义"_FCKEditingArea"属性为FCKEditingArea对象
	A.Document=A.Window.document;//为iframe内的document对象
	A.MakeEditable();//定义iframe内的属性
	FCKTools.RunFunction(A.OnLoad);//在"onload"执行完后再执行(a)函数.(b)被当作当前对象.(c)参数数组.(d)为哪层页面的window对象
	//1=function _FCK_EditingArea_OnLoad(){...}
	//a=设置触发事件
};
FCKEditingArea.prototype.MakeEditable=function()//定义iframe内的属性
{
	var A=this.Document;//为iframe内的document对象
	if (FCKBrowserInfo.IsIE)//true
	{
		A.body.disabled=true;//disabled		设置或返回是否禁用按钮。
		A.body.contentEditable=true;//contentEditable   属性。	将文档设置为设计模式
		A.body.removeAttribute("disabled");
	}
	else
	{
		try
		{
			A.body.spellcheck=(this.FFSpellChecker!==false);
			if (this._BodyHTML)
			{
				A.body.innerHTML=this._BodyHTML;A.body.offsetLeft;
				this._BodyHTML=null;
			};
			A.designMode='off';
			A.execCommand('enableObjectResizing',false,!FCKConfig.DisableObjectResizing);
			A.execCommand('enableInlineTableEditing',false,!FCKConfig.DisableFFTableHandles);
		}
		catch (e)
		{
			FCKTools.AddEventListener(this.Window.frameElement,'DOMAttrModified',FCKEditingArea_Document_AttributeNodeModified);
		}
	}
};
function FCKEditingArea_Document_AttributeNodeModified(A)
{
	var B=A.currentTarget.contentWindow._FCKEditingArea;
	if (B._timer) 
	window.clearTimeout(B._timer);
	B._timer=FCKTools.SetTimeout(FCKEditingArea_MakeEditableByMutation,1000,B);
};
function FCKEditingArea_MakeEditableByMutation()
{
	delete this._timer;
	FCKTools.RemoveEventListener(this.Window.frameElement,'DOMAttrModified',FCKEditingArea_Document_AttributeNodeModified);
	this.MakeEditable();
};
FCKEditingArea.prototype.Focus=function()
{
	try
	{
		if (this.Mode==0)
		{
			if (FCKBrowserInfo.IsIE)
			this._FocusIE();
			else 
			this.Window.focus();
		}
		else
		{
			var A=FCKTools.GetElementDocument(this.Textarea);
			if ((!A.hasFocus||A.hasFocus())&&A.activeElement==this.Textarea)
			return;
			this.Textarea.focus();
		}
	}
	catch(e) {}
};
FCKEditingArea.prototype._FocusIE=function()
{
	this.Document.body.setActive();
	this.Window.focus();
	var A=this.Document.selection.createRange();
	var B=A.parentElement();
	var C=B.nodeName.toLowerCase();
	if (B.childNodes.length>0||!(FCKListsLib.BlockElements[C]||FCKListsLib.NonEmptyBlockElements[C]))
	{
		return;
	};
	A=new FCKDomRange(this.Window);
	A.MoveToElementEditStart(B);
	A.Select();
};
function FCKEditingArea_Cleanup()
{
	if (this.Document) 
	this.Document.body.innerHTML="";
	this.TargetElement=null;
	this.IFrame=null;
	this.Document=null;
	this.Textarea=null;
	if (this.Window)
	{
		this.Window._FCKEditingArea=null;
		this.Window=null;
	}
};
var FCKKeystrokeHandler=function(A)//定义"Keystrokes"和"CancelCtrlDefaults"属性
{//a=undefined
	this.Keystrokes={};
	this.CancelCtrlDefaults=(A!==false);//true
};
FCKKeystrokeHandler.prototype.AttachToElement=function(A)
{
	FCKTools.AddEventListenerEx(A,'keydown',_FCKKeystrokeHandler_OnKeyDown,this);
	if (FCKBrowserInfo.IsGecko10||FCKBrowserInfo.IsOpera||(FCKBrowserInfo.IsGecko&&FCKBrowserInfo.IsMac)) 
	FCKTools.AddEventListenerEx(A,'keypress',_FCKKeystrokeHandler_OnKeyPress,this);
};
FCKKeystrokeHandler.prototype.SetKeystrokes=function()//在"Keystrokes"数组中添加内容.
{
	for (var i=0;i<arguments.length;i++)
	{//arguments.length=1
		var A=arguments[i];//=数组
		if (!A)//false
		continue;
		if (typeof(A[0])=='object')//true
		{//A[0]="1065,true"
			this.SetKeystrokes.apply(this,A);//执行本函数并替换当前对象
			//apply 方法		应用某一对象的一个方法，用另一个对象替换当前对象。
		}
		else
		{
			if (A.length==1)
			{//A.length=2	//A="1065,true"
				delete this.Keystrokes[A[0]];
			}
			else 
			this.Keystrokes[A[0]]=A[1]===true?true:A;//true
			//注:把"A[1]===true"看成一起.
			//A[0]=1065
			//A[1]=true
		}
	}
};
function _FCKKeystrokeHandler_OnKeyDown(A,B)
{
	var C=A.keyCode||A.which;
	var D=0;
	if (A.ctrlKey||A.metaKey)
	D+=CTRL;
	if (A.shiftKey)
	D+=SHIFT;
	if (A.altKey) 
	D+=ALT;
	var E=C+D;
	var F=B._CancelIt=false;
	var G=B.Keystrokes[E];
	if (G)
	{
		if (G===true||!(B.OnKeystroke&&B.OnKeystroke.apply(B,G))) 
		return true;
		F=true;
	};
	if (F||(B.CancelCtrlDefaults&&D==CTRL&&(C<33||C>40)))
	{
		B._CancelIt=true;
		if (A.preventDefault)
		return A.preventDefault();
		A.returnValue=false;
		A.cancelBubble=true;
		return false;
	};
	return true;
};
function _FCKKeystrokeHandler_OnKeyPress(A,B)
{
	if (B._CancelIt)
	{
		if (A.preventDefault)
		return A.preventDefault();
		return false;
	};
	return true;
};
FCK.DTD=(function(){
					var X=FCKTools.Merge;
					var A,L,J,M,N,O,D,H,P,K,Q,F,G,C,B,E,I;
					A=
					{
						  isindex:1,
						  fieldset:1
					  };
					B=
					{
						  input:1,
						  button:1,
						  select:1,
						  textarea:1,
						  label:1
					  };
					C=X({a:1},B);
					D=X({iframe:1},C);
					E=
					{
						  hr:1,
						  ul:1,
						  menu:1,
						  div:1,
						  blockquote:1,
						  noscript:1,
						  table:1,
						  center:1,
						  address:1,
						  dir:1,
						  pre:1,
						  h5:1,
						  dl:1,
						  h4:1,
						  noframes:1,
						  h6:1,
						  ol:1,
						  h1:1,
						  h3:1,
						  h2:1
					};
					F=
					{
						ins:1,
						del:1,
						script:1
					  };
					G=X(
						{
							b:1,
							acronym:1,
							bdo:1,
							'var':1,
							'#':1,
							abbr:1,
							code:1,
							br:1,
							i:1,
							cite:1,
							kbd:1,
							u:1,
							strike:1,
							s:1,tt:1,
							strong:1,
							q:1,
							samp:1,
							em:1,
							dfn:1,
							span:1
						},F);
					H=X(
						{
							sub:1,
							img:1,
							object:1,
							sup:1,
							basefont:1,
							map:1,
							applet:1,
							font:1,
							big:1,
							small:1
						},G);
					I=X(
						{
							p:1
						},H);
					J=X({iframe:1},H,B);
					K=
					{
						img:1,
						noscript:1,
						br:1,
						kbd:1,
						center:1,
						button:1,
						basefont:1,
						h5:1,
						h4:1,
						samp:1,
						h6:1,
						ol:1,
						h1:1,
						h3:1,
						h2:1,
						form:1,
						font:1,
						'#':1,
						select:1,
						menu:1,
						ins:1,
						abbr:1,
						label:1,
						code:1,
						table:1,
						script:1,
						cite:1,
						input:1,
						iframe:1,
						strong:1,
						textarea:1,
						noframes:1,
						big:1,
						small:1,
						span:1,
						hr:1,
						sub:1,
						bdo:1,
						'var':1,
						div:1,
						object:1,
						sup:1,
						strike:1,
						dir:1,
						map:1,
						dl:1,
						applet:1,
						del:1,
						isindex:1,
						fieldset:1,
						ul:1,
						b:1,
						acronym:1,
						a:1,
						blockquote:1,
						i:1,
						u:1,
						s:1,
						tt:1,
						address:1,
						q:1,
						pre:1,
						p:1,
						em:1,
						dfn:1
					};
					L=X({a:1},J);
					M={tr:1};
					N={'#':1};
					O=X({param:1},K);
					P=X({form:1},A,D,E,I);
					Q={li:1};
					return {
						col:{},
						tr:{td:1,th:1},
						img:{},
						colgroup:{col:1},
						noscript:P,
						td:P,
						br:{},
						th:P,
						center:P,
						kbd:L,
						button:X(I,E),
						basefont:{},
						h5:L,
						h4:L,
						samp:L,
						h6:L,
						ol:Q,
						h1:L,
						h3:L,
						option:N,
						h2:L,
						form:X(A,D,E,I),
						select:{optgroup:1,option:1},
						font:J,
						ins:P,
						menu:Q,
						abbr:L,
						label:L,
						table:
						{
							thead:1,
							col:1,
							tbody:1,
							tr:1,
							colgroup:1,
							caption:1,
							tfoot:1
						},
						code:L,
						script:N,
						tfoot:M,
						cite:L,
						li:P,
						input:{},
						iframe:P,
						strong:J,
						textarea:N,
						noframes:P,
						big:J,
						small:J,
						span:J,
						hr:{},
						dt:L,
						sub:J,
						optgroup:{option:1},
						param:{},
						bdo:L,
						'var':J,
						div:P,
						object:O,
						sup:J,
						dd:P,
						strike:J,
						area:{},
						dir:Q,
						map:X({
								  area:1,
								  form:1,
								  p:1
							  },A,F,E),
						applet:O,
						dl:{dt:1,dd:1},
						del:P,
						isindex:{},
						fieldset:X({legend:1},K),
						thead:M,
						ul:Q,
						acronym:L,
						b:J,
						a:J,
						blockquote:P,
						caption:L,
						i:J,
						u:J,
						tbody:M,
						s:L,
						address:X(D,I),
						tt:J,
						legend:L,
						q:L,
						pre:X(G,C),
						p:L,
						em:J,
						dfn:L
					};
				})();
var FCKStyle=function(A)
{
	this.Element=(A.Element||'span').toLowerCase();
	this._StyleDesc=A;
};
FCKStyle.prototype=
{
	GetType:function()
	{
		var A=this.GetType_$;
		if (A!=undefined) return A;
		var B=this.Element;
		if (B=='#'||FCKListsLib.StyleBlockElements[B]) 
		A=0;
		else if (FCKListsLib.StyleObjectElements[B]) 
		A=2;
		else
		A=1;
		return (this.GetType_$=A);
	},
	ApplyToSelection:function(A)
	{
		var B=new FCKDomRange(A);
		B.MoveToSelection();
		this.ApplyToRange(B,true);
	},
	ApplyToRange:function(A,B,C)
	{
		switch (this.GetType())
		{
			case 0:this.ApplyToRange=this._ApplyBlockStyle;
			break;
			case 1:this.ApplyToRange=this._ApplyInlineStyle;
			break;
			default:return;
		};
		this.ApplyToRange(A,B,C);
	},
	ApplyToObject:function(A)
	{
		if (!A) return;
		this.BuildElement(null,A);
	},
	RemoveFromSelection:function(A)
	{
		var B=new FCKDomRange(A);
		B.MoveToSelection();
		this.RemoveFromRange(B,true);
	},
	RemoveFromRange:function(A,B,C)
	{
		var D;
		var E=this._GetAttribsForComparison();
		var F=this._GetOverridesForComparison();
		if (A.CheckIsCollapsed())
		{
			var D=A.CreateBookmark(true);
			var H=A.GetBookmarkNode(D,true);
			var I=new FCKElementPath(H.parentNode);
			var J=[];
			var K=!FCKDomTools.GetNextSibling(H);
			var L=K||!FCKDomTools.GetPreviousSibling(H);
			var M;
			var N=-1;
			for (var i=0;i<I.Elements.length;i++)
			{
				var O=I.Elements[i];
				if (this.CheckElementRemovable(O))
				{
					if (L&&!FCKDomTools.CheckIsEmptyElement(O,function(el)
																	   {
																		   return (el!=H);
																		}))
					{
						M=O;
						N=J.length-1;
					}
					else
					{
						var P=O.nodeName.toLowerCase();
						if (P==this.Element)
						{
							for (var Q in E)
							{
								if (FCKDomTools.HasAttribute(O,Q))
								{
									switch (Q)
									{
										case 'style':
										this._RemoveStylesFromElement(O);
										break;
										case 'class':
										if (FCKDomTools.GetAttributeValue(O,Q)!=this.GetFinalAttributeValue(Q))
										continue;
										default:
										FCKDomTools.RemoveAttribute(O,Q);
									}
								}
							}
						};
						this._RemoveOverrides(O,F[P]);
						if (this.GetType()==1) 
						this._RemoveNoAttribElement(O);
					}
				}
				else if (L) 
				J.push(O);
				L=L&&((K&&!FCKDomTools.GetNextSibling(O))||(!K&&!FCKDomTools.GetPreviousSibling(O)));
				if (M&&(!L||(i==I.Elements.length-1)))
				{
					var R=FCKDomTools.RemoveNode(H);
					for (var j=0;j<=N;j++)
					{
						var S=FCKDomTools.CloneElement(J[j]);
						S.appendChild(R);R=S;
					};
					if (K)
					FCKDomTools.InsertAfterNode(M,R);
					else
					M.parentNode.insertBefore(R,M);
					L=false;
					M=null;
				}
			};
			if (B)
			A.SelectBookmark(D);
			if (C)
			A.MoveToBookmark(D);
			return;
		};
		A.Expand('inline_elements');
		D=A.CreateBookmark(true);
		var T=A.GetBookmarkNode(D,true);
		var U=A.GetBookmarkNode(D,false);
		A.Release(true);
		var I=new FCKElementPath(T);
		var X=I.Elements;
		var O;
		for (var i=1;i<X.length;i++)
		{
			O=X[i];
			if (O==I.Block||O==I.BlockLimit)
			break;
			if (this.CheckElementRemovable(O))
			FCKDomTools.BreakParent(T,O,A);
		};
		I=new FCKElementPath(U);
		X=I.Elements;
		for (var i=1;i<X.length;i++)
		{
			O=X[i];
			if (O==I.Block||O==I.BlockLimit)
			break;
			b=O.nodeName.toLowerCase();
			if (this.CheckElementRemovable(O))
			FCKDomTools.BreakParent(U,O,A);
		};
		var Z=FCKDomTools.GetNextSourceNode(T,true);
		while (Z)
		{
			var a=FCKDomTools.GetNextSourceNode(Z);
			if (Z.nodeType==1)
			{
				var b=Z.nodeName.toLowerCase();
				var c=(b==this.Element);
				if (c)
				{
					for (var Q in E)
					{
						if (FCKDomTools.HasAttribute(Z,Q))
						{
							switch (Q)
							{
								case 'style':
								this._RemoveStylesFromElement(Z);
								break;
								case 'class':
								if (FCKDomTools.GetAttributeValue(Z,Q)!=this.GetFinalAttributeValue(Q)) 
								continue;
								default:
								FCKDomTools.RemoveAttribute(Z,Q);
							}
						}
					}
				}
				else c=!!F[b];
				if (c)
				{
					this._RemoveOverrides(Z,F[b]);
					this._RemoveNoAttribElement(Z);
				}
			};
			if (a==U)
			break;
			Z=a;
		};
		this._FixBookmarkStart(T);
		if (B) 
		A.SelectBookmark(D);
		if (C)
		A.MoveToBookmark(D);
	},
	CheckElementRemovable:function(A,B)
	{
		if (!A) 
		return false;
		var C=A.nodeName.toLowerCase();
		if (C==this.Element)
		{
			if (!B&&!FCKDomTools.HasAttributes(A))
			return true;
			var D=this._GetAttribsForComparison();
			var E=(D._length==0);
			for (var F in D)
			{
				if (F=='_length')
				continue;
				if (this._CompareAttributeValues(F,FCKDomTools.GetAttributeValue(A,F),(this.GetFinalAttributeValue(F)||'')))
				{
					E=true;
					if (!B) break;
				}
				else
				{
					E=false;
					if (B) 
					return false;
				}
			};
			if (E) return true;
		};
		var G=this._GetOverridesForComparison()[C];
		if (G)
		{
			if (!(D=G.Attributes))
			return true;
			for (var i=0;i<D.length;i++)
			{
				var H=D[i][0];
				if (FCKDomTools.HasAttribute(A,H))
				{
					var I=D[i][1];
					if (I==null||(typeof I=='string'&&FCKDomTools.GetAttributeValue(A,H)==I)||I.test(FCKDomTools.GetAttributeValue(A,H)))
					return true;
				}
			}
		};
		return false;
	},
	CheckActive:function(A)
	{
		switch (this.GetType())
		{
			case 0:
			return this.CheckElementRemovable(A.Block||A.BlockLimit,true);
			case 1:
			var B=A.Elements;
			for (var i=0;i<B.length;i++)
			{
				var C=B[i];
				if (C==A.Block||C==A.BlockLimit)
				continue;
				if (this.CheckElementRemovable(C,true))
				return true;
			}
		};
		return false;
	},
	RemoveFromElement:function(A)
	{
		var B=this._GetAttribsForComparison();
		var C=this._GetOverridesForComparison();
		var D=A.getElementsByTagName(this.Element);
		for (var i=D.length-1;i>=0;i--)
		{
			var E=D[i];
			for (var F in B)
			{
				if (FCKDomTools.HasAttribute(E,F))
				{
					switch (F)
					{
						case 'style':
						this._RemoveStylesFromElement(E);
						break;
						case 'class':
						if (FCKDomTools.GetAttributeValue(E,F)!=this.GetFinalAttributeValue(F))
						continue;
						default:
						FCKDomTools.RemoveAttribute(E,F);
					}
				}
			};
			this._RemoveOverrides(E,C[this.Element]);
			this._RemoveNoAttribElement(E);
		};
		for (var G in C)
		{
			if (G!=this.Element)
			{
				D=A.getElementsByTagName(G);
				for (var i=D.length-1;i>=0;i--)
				{
					var E=D[i];
					this._RemoveOverrides(E,C[G]);
					this._RemoveNoAttribElement(E);
				}
			}
		}
	},
	_RemoveStylesFromElement:function(A)
	{
		var B=A.style.cssText;
		var C=this.GetFinalStyleValue();
		if (B.length>0&&C.length==0)
		return;
		C='(^|;)\\s*('+C.replace(/\s*([^ ]+):.*?(;|$)/g,'$1|').replace(/\|$/,'')+'):[^;]+';
		var D=new RegExp(C,'gi');
		B=B.replace(D,'').Trim();
		if (B.length==0||B==';')
		FCKDomTools.RemoveAttribute(A,'style');
		else 
		A.style.cssText=B.replace(D,'');
	},
	_RemoveOverrides:function(A,B)
	{
		var C=B&&B.Attributes;
		if (C)
		{
			for (var i=0;i<C.length;i++)
			{
				var D=C[i][0];
				if (FCKDomTools.HasAttribute(A,D))
				{
					var E=C[i][1];
					if (E==null||(E.test&&E.test(FCKDomTools.GetAttributeValue(A,D)))||(typeof E=='string'&&FCKDomTools.GetAttributeValue(A,D)==E))
					FCKDomTools.RemoveAttribute(A,D);
				}
			}
		}
	},
	_RemoveNoAttribElement:function(A)
	{
		if (!FCKDomTools.HasAttributes(A))
		{
			var B=A.firstChild;
			var C=A.lastChild;
			FCKDomTools.RemoveNode(A,true);
			this._MergeSiblings(B);
			if (B!=C)
			this._MergeSiblings(C);
		}
	},
	BuildElement:function(A,B)
	{
		var C=B||A.createElement(this.Element);
		var D=this._StyleDesc.Attributes;
		var E;
		if (D)
		{
			for (var F in D)
			{
				E=this.GetFinalAttributeValue(F);
				if (F.toLowerCase()=='class')
				C.className=E;
				else C.setAttribute(F,E);
			}
		};
		if (this._GetStyleText().length>0) 
		C.style.cssText=this.GetFinalStyleValue();
		return C;
	},
	_CompareAttributeValues:function(A,B,C)
	{
		if (A=='style'&&B&&C)
		{
			B=B.replace(/;$/,'').toLowerCase();
			C=C.replace(/;$/,'').toLowerCase();
		};
		return (B==C||((B===null||B==='')&&(C===null||C==='')))
	},
	GetFinalAttributeValue:function(A)
	{
		var B=this._StyleDesc.Attributes;
		var B=B?B[A]:null;
		if (!B&&A=='style')
		return this.GetFinalStyleValue();
		if (B&&this._Variables) 
		B=B.Replace(FCKRegexLib.StyleVariableAttName,this._GetVariableReplace,this);
		return B;
	},
	GetFinalStyleValue:function()
	{
		var A=this._GetStyleText();
		if (A.length>0&&this._Variables)
		{
			A=A.Replace(FCKRegexLib.StyleVariableAttName,this._GetVariableReplace,this);
			A=FCKTools.NormalizeCssText(A);
		};
		return A;
	},
	_GetVariableReplace:function()
	{
		return this._Variables[arguments[2]]||arguments[0];
	},
	SetVariable:function(A,B)
	{
		var C=this._Variables;
		if (!C) 
		C=this._Variables={};
		this._Variables[A]=B;
	},
	_FromPre:function(A,B,C)
	{
		var D=B.innerHTML;
		D=D.replace(/(\r\n|\r)/g,'\n');
		D=D.replace(/^[ \t]*\n/,'');
		D=D.replace(/\n$/,'');
		D=D.replace(/^[ \t]+|[ \t]+$/g,
							  function(match,offset,s)
							  {
								  if (match.length==1)
								  return '&nbsp;';
								  else if (offset==0) 
								  return new Array(match.length).join('&nbsp;')+' ';
								  else 
								  return ' '+new Array(match.length).join('&nbsp;');
							  });
		var E=new FCKHtmlIterator(D);
		var F=[];
		E.Each(function(isTag,value)
						{
							if (!isTag)
							{
								value=value.replace(/\n/g,'<br>');
								value=value.replace(/[ \t]{2,}/g,function (match)
																		   {
																			   return new Array(match.length).join('&nbsp;')+' ';
																			});
							};
							F.push(value);
						});
		C.innerHTML=F.join('');
		return C;
		},
	_ToPre:function(A,B,C)
	{
		var D=B.innerHTML.Trim();
		D=D.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi,'<br />');
		var E=new FCKHtmlIterator(D);
		var F=[];
		E.Each(function(isTag,value)
						{
							if (!isTag) 
							value=value.replace(/([ \t\n\r]+|&nbsp;)/g,' ');
							else if (isTag&&value=='<br />') 
							value='\n';F.push(value);
						});
		if (FCKBrowserInfo.IsIE)
		{
			var G=A.createElement('div');
			G.appendChild(C);
			C.outerHTML='<pre>\n'+F.join('')+'</pre>';
			C=G.removeChild(G.firstChild);
			//firstChild 属性可返回文档的首个子节点。
		}
		else
		C.innerHTML=F.join('');
		return C;
	},
	_CheckAndMergePre:function(A,B)
	{
		if (A!=FCKDomTools.GetPreviousSourceElement(B,true))
		return;
		var C=A.innerHTML.replace(/\n$/,'')+'\n\n'+B.innerHTML.replace(/^\n/,'');
		if (FCKBrowserInfo.IsIE) 
		B.outerHTML='<pre>'+C+'</pre>';
		else 
		B.innerHTML=C;FCKDomTools.RemoveNode(A);
	},
	_CheckAndSplitPre:function(A)
	{
		var B;
		var C=A.firstChild;
		C=C&&C.nextSibling;
		while (C)
		{
			var D=C.nextSibling;
			if (D&&D.nextSibling&&C.nodeName.IEquals('br')&&D.nodeName.IEquals('br'))
			{
				FCKDomTools.RemoveNode(C);
				C=D.nextSibling;
				FCKDomTools.RemoveNode(D);
				B=FCKDomTools.InsertAfterNode(B||A,FCKDomTools.CloneElement(A));
				continue;
			};
			if (B)
			{
				C=C.previousSibling;
				FCKDomTools.MoveNode(C.nextSibling,B);
			};
			C=C.nextSibling;
		}
	},
	_ApplyBlockStyle:function(A,B,C)
	{
		var D;
		if (B)
		D=A.CreateBookmark();
		var E=new FCKDomRangeIterator(A);
		E.EnforceRealBlocks=true;
		var F;
		var G=A.Window.document;
		var H;
		while((F=E.GetNextParagraph()))
		{
			var I=this.BuildElement(G);
			var J=I.nodeName.IEquals('pre');
			var K=F.nodeName.IEquals('pre');
			var L=J&&!K;
			var M=!J&&K;
			if (L) I=this._ToPre(G,F,I);
			else if (M)
			I=this._FromPre(G,F,I);
			else 
			FCKDomTools.MoveChildren(F,I);
			F.parentNode.insertBefore(I,F);
			FCKDomTools.RemoveNode(F);
			if (J)
			{
				if (H) 
				this._CheckAndMergePre(H,I);
				H=I;
			}
			else if (M)
			this._CheckAndSplitPre(I);
		};
		if (B) 
		A.SelectBookmark(D);
		if (C) 
		A.MoveToBookmark(D);
	},
	_ApplyInlineStyle:function(A,B,C)
	{
		var D=A.Window.document;
		if (A.CheckIsCollapsed())
		{
			var E=this.BuildElement(D);
			A.InsertNode(E);
			A.MoveToPosition(E,2);
			A.Select();
			return;
		};
		var F=this.Element;
		var G=FCK.DTD[F]||FCK.DTD.span;
		var H=this._GetAttribsForComparison();
		var I;A.Expand('inline_elements');
		var J=A.CreateBookmark(true);
		var K=A.GetBookmarkNode(J,true);
		var L=A.GetBookmarkNode(J,false);
		A.Release(true);
		var M=FCKDomTools.GetNextSourceNode(K,true);
		while (M)
		{
			var N=false;
			var O=M.nodeType;
			var P=O==1?M.nodeName.toLowerCase():null;
			if (!P||G[P])
			{
				if ((FCK.DTD[M.parentNode.nodeName.toLowerCase()]||FCK.DTD.span)[F]||!FCK.DTD[F])
				{
					if (!A.CheckHasRange()) A.SetStart(M,3);
					if (O!=1||M.childNodes.length==0)
					{
						var Q=M;var R=Q.parentNode;
						while (Q==R.lastChild&&G[R.nodeName.toLowerCase()])
						{Q=R;};
						A.SetEnd(Q,4);
						if (Q==Q.parentNode.lastChild&&!G[Q.parentNode.nodeName.toLowerCase()]) 
						N=true;
					}
					else
					{
						A.SetEnd(M,3);
					}
				}
				else
				N=true;
			}
			else
			N=true;
			M=FCKDomTools.GetNextSourceNode(M);
			if (M==L)
			{
				M=null;N=true;
			};
			if (N&&A.CheckHasRange()&&!A.CheckIsCollapsed())
			{
				I=this.BuildElement(D);
				A.ExtractContents().AppendTo(I);
				if (I.innerHTML.RTrim().length>0)
				{
					A.InsertNode(I);
					this.RemoveFromElement(I);
					this._MergeSiblings(I,this._GetAttribsForComparison());
					if (!FCKBrowserInfo.IsIE)
					I.normalize();
				};
				A.Release(true);
			}
		};
		this._FixBookmarkStart(K);
		if (B)
		A.SelectBookmark(J);
		if (C)
		A.MoveToBookmark(J);
	},
	_FixBookmarkStart:function(A)
	{
		var B;
		while ((B=A.nextSibling))
		{
			if (B.nodeType==1&&FCKListsLib.InlineNonEmptyElements[B.nodeName.toLowerCase()])
			{
				if (!B.firstChild) 
				FCKDomTools.RemoveNode(B);
				else
				FCKDomTools.MoveNode(A,B,true);
				continue;
			};
			if (B.nodeType==3&&B.length==0)
			{
				FCKDomTools.RemoveNode(B);
				continue;
			};
			break;
		}
	},
	_MergeSiblings:function(A,B)
	{
		if (!A||A.nodeType!=1||!FCKListsLib.InlineNonEmptyElements[A.nodeName.toLowerCase()])
		return;
		this._MergeNextSibling(A,B);
		this._MergePreviousSibling(A,B);
	},
	_MergeNextSibling:function(A,B)
	{
		var C=A.nextSibling;
		var D=(C&&C.nodeType==1&&C.getAttribute('_fck_bookmark'));
		if (D)
		C=C.nextSibling;
		if (C&&C.nodeType==1&&C.nodeName==A.nodeName)
		{
			if (!B)
			B=this._CreateElementAttribsForComparison(A);
			if (this._CheckAttributesMatch(C,B))
			{
				var E=A.lastChild;
				if (D)
				FCKDomTools.MoveNode(A.nextSibling,A);
				FCKDomTools.MoveChildren(C,A);
				FCKDomTools.RemoveNode(C);
				if (E) 
				this._MergeNextSibling(E);
			}
		}
	},
	_MergePreviousSibling:function(A,B)
	{
		var C=A.previousSibling;
		var D=(C&&C.nodeType==1&&C.getAttribute('_fck_bookmark'));
		if (D) C=C.previousSibling;
		if (C&&C.nodeType==1&&C.nodeName==A.nodeName)
		{
			if (!B) B=this._CreateElementAttribsForComparison(A);
			if (this._CheckAttributesMatch(C,B))
			{
				var E=A.firstChild;
				if (D) 
				FCKDomTools.MoveNode(A.previousSibling,A,true);
				FCKDomTools.MoveChildren(C,A,true);
				FCKDomTools.RemoveNode(C);
				if (E) 
				this._MergePreviousSibling(E);
			}
		}
	},
	_GetStyleText:function()
	{
		var A=this._StyleDesc.Styles;
		var B=(this._StyleDesc.Attributes?this._StyleDesc.Attributes['style']||'':'');
		if (B.length>0) B+=';';
		for (var C in A)
		B+=C+':'+A[C]+';';
		if (B.length>0&&!(/#\(/.test(B)))
		{
			B=FCKTools.NormalizeCssText(B);
		};
		return (this._GetStyleText=function(){ return B;})();
	},
	_GetAttribsForComparison:function()
	{
		var A=this._GetAttribsForComparison_$;
		if (A) return A;
		A={};
		var B=this._StyleDesc.Attributes;
		if (B)
		{
			for (var C in B)
			{
				A[C.toLowerCase()]=B[C].toLowerCase();
			}
		};
		if (this._GetStyleText().length>0)
		{
			A['style']=this._GetStyleText().toLowerCase();
		};
		FCKTools.AppendLengthProperty(A,'_length');
		return (this._GetAttribsForComparison_$=A);
	},
	_GetOverridesForComparison:function()
	{
		var A=this._GetOverridesForComparison_$;
		if (A)
		return A;
		A={};
		var B=this._StyleDesc.Overrides;
		if (B)
		{
			if (!FCKTools.IsArray(B))
			B=[B];
			for (var i=0;i<B.length;i++)
			{
				var C=B[i];
				var D;
				var E;
				var F;
				if (typeof C=='string')
				D=C.toLowerCase();
				else
				{
					D=C.Element?C.Element.toLowerCase():this.Element;F=C.Attributes;
				};
				E=A[D]||(A[D]={});
				if (F)
				{
					var G=(E.Attributes=E.Attributes||[]);
					for (var H in F)
					{
						G.push([H.toLowerCase(),F[H]]);
					}
				}
			}
		};
		return (this._GetOverridesForComparison_$=A);
	},
	_CreateElementAttribsForComparison:function(A)
	{
		var B={};
		var C=0;
		for (var i=0;i<A.attributes.length;i++)
		{
			var D=A.attributes[i];
			if (D.specified)
			{
				B[D.nodeName.toLowerCase()]=FCKDomTools.GetAttributeValue(A,D).toLowerCase();
				C++;
			}
		};
		B._length=C;
		return B;
	},
	_CheckAttributesMatch:function(A,B)
	{
		var C=A.attributes;
		var D=0;
		for (var i=0;i<C.length;i++)
		{
			var E=C[i];
			if (E.specified)
			{
				var F=E.nodeName.toLowerCase();
				var G=B[F];
				if (!G)
				break;
				if (G!=FCKDomTools.GetAttributeValue(A,E).toLowerCase())
				break;
				D++;
			}
		};
		return (D==B._length);
	}
};
var FCKStyles=FCK.Styles=
{
	_Callbacks:{},
	_ObjectStyles:{},
	ApplyStyle:function(A)
	{
		if (typeof A=='string')
		A=this.GetStyles()[A];
		if (A)
		{
			if (A.GetType()==2) 
			A.ApplyToObject(FCKSelection.GetSelectedElement());
			else
			A.ApplyToSelection(FCK.EditorWindow);
			FCK.Events.FireEvent('OnSelectionChange');
		}
	},
	RemoveStyle:function(A)
	{
		if (typeof A=='string')
		A=this.GetStyles()[A];
		if (A)
		{
			A.RemoveFromSelection(FCK.EditorWindow);
			FCK.Events.FireEvent('OnSelectionChange');
		}
	},
	AttachStyleStateChange:function(A,B,C)
	{
		var D=this._Callbacks[A];
		if (!D) D=this._Callbacks[A]=[];
		D.push([B,C]);
	},
	CheckSelectionChanges:function()
	{
		var A=FCKSelection.GetBoundaryParentElement(true);
		if (!A) return;
		var B=new FCKElementPath(A);
		var C=this.GetStyles();
		for (var D in C)
		{
			var E=this._Callbacks[D];
			if (E)
			{
				var F=C[D];
				var G=F.CheckActive(B);
				if (G!=(F._LastState||null))
				{
					F._LastState=G;
					for (var i=0;i<E.length;i++)
					{
						var H=E[i][0];
						var I=E[i][1];
						H.call(I||window,D,G);
					}
				}
			}
		}
	},
	CheckStyleInSelection:function(A)
	{
		return false;
	},
	_GetRemoveFormatTagsRegex:function ()
	{
		var A=new RegExp('^(?:'+FCKConfig.RemoveFormatTags.replace(/,/g,'|')+')$','i');
		return (this._GetRemoveFormatTagsRegex=function(){return A;})&&A;
	},
	RemoveAll:function()
	{
		var A=new FCKDomRange(FCK.EditorWindow);
		A.MoveToSelection();
		if (A.CheckIsCollapsed())
		return;
		A.Expand('inline_elements');
		var B=A.CreateBookmark(true);
		var C=A.GetBookmarkNode(B,true);
		var D=A.GetBookmarkNode(B,false);
		A.Release(true);
		var E=this._GetRemoveFormatTagsRegex();
		var F=new FCKElementPath(C);
		var G=F.Elements;
		var H;
		for (var i=1;i<G.length;i++)
		{
			H=G[i];
			if (H==F.Block||H==F.BlockLimit) 
			break;
			if (E.test(H.nodeName)) 
			FCKDomTools.BreakParent(C,H,A);
		};
		F=new FCKElementPath(D);
		G=F.Elements;
		for (var i=1;i<G.length;i++)
		{
			H=G[i];
			if (H==F.Block||H==F.BlockLimit) 
			break;
			elementName=H.nodeName.toLowerCase();
			if (E.test(H.nodeName))
			FCKDomTools.BreakParent(D,H,A);
		};
		var I=FCKDomTools.GetNextSourceNode(C,true,1);
		while (I)
		{
			if (I==D) 
			break;
			var J=FCKDomTools.GetNextSourceNode(I,false,1);
			if (E.test(I.nodeName))
			FCKDomTools.RemoveNode(I,true);
			else
			FCKDomTools.RemoveAttributes(I,FCKConfig.RemoveAttributesArray);
			I=J;
		};
		A.SelectBookmark(B);
		FCK.Events.FireEvent('OnSelectionChange');
	},
	GetStyle:function(A)
	{
		return this.GetStyles()[A];
	},
	GetStyles:function()
	{
		var A=this._GetStyles;
		if (!A)
		{
			A=this._GetStyles=FCKTools.Merge(this._LoadStylesCore(),this._LoadStylesCustom(),this._LoadStylesXml());
		};
		return A;
	},
	CheckHasObjectStyle:function(A)
	{
		return!!this._ObjectStyles[A];
	},
	_LoadStylesCore:function()
	{
		var A={};
		var B=FCKConfig.CoreStyles;
		for (var C in B)
		{
			var D=A['_FCK_'+C]=new FCKStyle(B[C]);
			D.IsCore=true;
		};
		return A;
	},
	_LoadStylesCustom:function()
	{
		var A={};
		var B=FCKConfig.CustomStyles;
		if (B)
		{
			for (var C in B)
			{
				var D=A[C]=new FCKStyle(B[C]);
				D.Name=C;
			}
		};
		return A;
	},
	_LoadStylesXml:function()
	{
		var A={};
		var B=FCKConfig.StylesXmlPath;
		if (!B||B.length==0) return A;
		var C=new FCKXml();
		C.LoadUrl(B);
		var D=FCKXml.TransformToObject(C.SelectSingleNode('Styles'));
		var E=D.$Style;
		if (!E) return A;
		for (var i=0;i<E.length;i++)
		{
			var F=E[i];
			var G=(F.element||'').toLowerCase();
			if (G.length==0) throw('The element name is required. Error loading "'+B+'"');
			var H={Element:G,Attributes:{},Styles:{},Overrides:[]};
			var I=F.$Attribute||[];
			for (var j=0;j<I.length;j++)
			{
				H.Attributes[I[j].name]=I[j].value;
			};
			var J=F.$Style||[];
			for (j=0;j<J.length;j++)
			{
				H.Styles[J[j].name]=J[j].value;
			};
			var K=F.$Override;
			if (K)
			{
				for (j=0;j<K.length;j++)
				{
					var L=K[j];
					var M={Element:L.element};
					var N=L.$Attribute;
					if (N)
					{
						M.Attributes={};
						for (var k=0;k<N.length;k++)
						{
							var O=N[k].value||null;
							if (O)
							{
								var P=O&&FCKRegexLib.RegExp.exec(O);
								if (P) O=new RegExp(P[1],P[2]||'');
							};
							M.Attributes[N[k].name]=O;
						}
					};
					H.Overrides.push(M);
				}
			};
			var Q=new FCKStyle(H);
			Q.Name=F.name||G;
			if (Q.GetType()==2)
			this._ObjectStyles[G]=true;
			A[Q.Name]=Q;
		};
		return A;
	}
};
var FCKListHandler=
{
	OutdentListItem:function(A)
	{
		var B=A.parentNode;
		if (B.tagName.toUpperCase().Equals('UL','OL'))
		{
			var C=FCKTools.GetElementDocument(A);
			var D=new FCKDocumentFragment(C);
			var E=D.RootNode;
			var F=false;
			var G=FCKDomTools.GetFirstChild(A,['UL','OL']);
			if (G)
			{
				F=true;
				var H;
				while ((H=G.firstChild))
				E.appendChild(G.removeChild(H));
				FCKDomTools.RemoveNode(G);
			};
			var I;
			var J=false;
			while ((I=A.nextSibling))
			{
				if (!F&&I.nodeType==1&&I.nodeName.toUpperCase()=='LI')
				J=F=true;
				E.appendChild(I.parentNode.removeChild(I));
				if (!J&&I.nodeType==1&&I.nodeName.toUpperCase().Equals('UL','OL'))
				FCKDomTools.RemoveNode(I,true);
			};
			var K=B.parentNode.tagName.toUpperCase();
			var L=(K=='LI');
			if (L||K.Equals('UL','OL'))
			{
				if (F)
				{
					var G=B.cloneNode(false);
					D.AppendTo(G);
					A.appendChild(G);
				}
				else if (L)
				D.InsertAfterNode(B.parentNode);
				else
				D.InsertAfterNode(B);
				if (L)
				FCKDomTools.InsertAfterNode(B.parentNode,B.removeChild(A));
				else 
				FCKDomTools.InsertAfterNode(B,B.removeChild(A));
			}
			else
			{
				if (F)
				{
					var N=B.cloneNode(false);
					D.AppendTo(N);
					FCKDomTools.InsertAfterNode(B,N);
				};
				var O=C.createElement(FCKConfig.EnterMode=='p'?'p':'div');
				FCKDomTools.MoveChildren(B.removeChild(A),O);
				FCKDomTools.InsertAfterNode(B,O);
				if (FCKConfig.EnterMode=='br')
				{
					if (FCKBrowserInfo.IsGecko) 
					O.parentNode.insertBefore(FCKTools.CreateBogusBR(C),O);
					else
					FCKDomTools.InsertAfterNode(O,FCKTools.CreateBogusBR(C));
					FCKDomTools.RemoveNode(O,true);
				}
			};
			if (this.CheckEmptyList(B))
			FCKDomTools.RemoveNode(B,true);
		}
	},
	CheckEmptyList:function(A)
	{
		return (FCKDomTools.GetFirstChild(A,'LI')==null);
	},
	CheckListHasContents:function(A)
	{
		var B=A.firstChild;
		while (B)
		{
			switch (B.nodeType)
			{
				case 1:
				if (!B.nodeName.IEquals('UL','LI'))
				return true;
				break;
				case 3:
				if (B.nodeValue.Trim().length>0)
				return true;
			};
			B=B.nextSibling;
		};
		return false;
	}
};
var FCKElementPath=function(A)
{//a=[object]
	var B=null;
	var C=null;
	var D=[];
	var e=A;
	while (e)
	{
		if (e.nodeType==1)//true
		{//nodeType	获取该节点的类型
			if (!this.LastElement)//true
			this.LastElement=e;
			var E=e.nodeName.toLowerCase();//="body"
			//toLowerCase	方法返回一个字符串，该字符串中的字母被转换为小写字母。
			//nodeName	获取该节点的名称
			if (FCKBrowserInfo.IsIE&&e.scopeName!='HTML')//false
			{//scopeName 获取为该元素定义的命名空间。 
				E=e.scopeName.toLowerCase()+':'+E;
			}
			if (!C)//true
			{
				if (!B&&FCKListsLib.PathBlockElements[E]!=null)//false
				B=e;
				if (FCKListsLib.PathBlockLimitElements[E]!=null)//true
				{
					if (!B&&E=='div'&&!FCKElementPath._CheckHasBlock(e))//false
					B=e;
					else
					C=e;
				}
			};
			D.push(e);
			if (E=='body')
			break;
		};
		e=e.parentNode;
		//扩展parentNode指针的功能，实现一次能够操纵多个父元素
	};
	this.Block=B;
	this.BlockLimit=C;
	this.Elements=D;
};
FCKElementPath._CheckHasBlock=function(A)
{
	var B=A.childNodes;
	for (var i=0,count=B.length;i<count;i++)
	{
		var C=B[i];
		if (C.nodeType==1&&FCKListsLib.BlockElements[C.nodeName.toLowerCase()])
		return true;
	};
	return false;
};
var FCKDomRange=function(A)//设置"Window"为(a).设置"_Cache"为{}
{//a=[object]
	this.Window=A;
	this._Cache={};
};
FCKDomRange.prototype=
{
	_UpdateElementInfo:function()//设置属性
	{
		var A=this._Range;//=[object Object]
		if (!A)//false
		this.Release(true);
		else
		{
			var B=A.startContainer;//=[object]
			var C=new FCKElementPath(B);
			this.StartNode=B.nodeType==3?B:B.childNodes[A.startOffset];//false
			//A.startOffset=0
			//nodeType	获取该节点的类型
			//childNodes 	获取所有子节点
			this.StartContainer=B;
			this.StartBlock=C.Block;
			this.StartBlockLimit=C.BlockLimit;
			if (A.collapsed)//true
			{
				this.EndNode=this.StartNode;
				this.EndContainer=this.StartContainer;
				this.EndBlock=this.StartBlock;
				this.EndBlockLimit=this.StartBlockLimit;
			}
			else
			{
				var D=A.endContainer;
				if (B!=D)
				C=new FCKElementPath(D);
				var E=D;
				if (A.endOffset==0)
				{
					while (E&&!E.previousSibling) 
					E=E.parentNode;
					if (E) 
					E=E.previousSibling;
				}
				else if (E.nodeType==1)
				E=E.childNodes[A.endOffset-1];
				this.EndNode=E;
				this.EndContainer=D;
				this.EndBlock=C.Block;
				this.EndBlockLimit=C.BlockLimit;
			}
		};
		this._Cache={};
	},
	CreateRange:function()
	{
		return new FCKW3CRange(this.Window.document);
	},
	DeleteContents:function()
	{
		if (this._Range)
		{
			this._Range.deleteContents();
			this._UpdateElementInfo();
		}
	},
	ExtractContents:function()
	{
		if (this._Range)
		{
			var A=this._Range.extractContents();
			this._UpdateElementInfo();
			return A;
		};
		return null;
	},
	CheckIsCollapsed:function()//返回true
	{
		if (this._Range) //true
		return this._Range.collapsed;
		return false;
	},
	Collapse:function(A)
	{
		if (this._Range) 
		this._Range.collapse(A);
		this._UpdateElementInfo();
	},
	Clone:function()//设置"_Range"属性
	{
		var A=FCKTools.CloneObject(this);//返回(a)的原型引用
		if (this._Range)//true 
		A._Range=this._Range.cloneRange();//返回选择区域起始指针和结束指针
		return A;
	},
	MoveToNodeContents:function(A)
	{
		if (!this._Range) 
		this._Range=this.CreateRange();
		this._Range.selectNodeContents(A);
		this._UpdateElementInfo();
	},
	MoveToElementStart:function(A)
	{
		this.SetStart(A,1);
		this.SetEnd(A,1);
	},
	MoveToElementEditStart:function(A)
	{
		var B;
		while (A&&A.nodeType==1)
		{
			if (FCKDomTools.CheckIsEditable(A)) 
			B=A;
			else if (B)
			break;
			A=A.firstChild;
		};
		if (B) 
		this.MoveToElementStart(B);
	},
	InsertNode:function(A)//移动结束指针
	{//=[object]
		if (this._Range)//true
		this._Range.insertNode(A);//移动结束指针
	},
	CheckIsEmpty:function()
	{
		if (this.CheckIsCollapsed()) 
		return true;
		var A=this.Window.document.createElement('div');
		this._Range.cloneContents().AppendTo(A);
		FCKDomTools.TrimNode(A);
		return (A.innerHTML.length==0);
	},
	CheckStartOfBlock:function()
	{
		var A=this._Cache;
		var B=A.IsStartOfBlock;
		if (B!=undefined)
		return B;
		var C=this.StartBlock||this.StartBlockLimit;
		var D=this._Range.startContainer;
		var E=this._Range.startOffset;
		var F;
		if (E>0)
		{
			if (D.nodeType==3)
			{
				var G=D.nodeValue.substr(0,E).Trim();
				if (G.length!=0) return A.IsStartOfBlock=false;
			}
			else 
			F=D.childNodes[E-1];
		};
		if (!F) 
		F=FCKDomTools.GetPreviousSourceNode(D,true,null,C);
		while (F)
		{
			switch (F.nodeType)
			{
				case 1:
				if (!FCKListsLib.InlineChildReqElements[F.nodeName.toLowerCase()])
				return A.IsStartOfBlock=false;
				break;
				case 3:
				if (F.nodeValue.Trim().length>0)
				return A.IsStartOfBlock=false;
			};
			F=FCKDomTools.GetPreviousSourceNode(F,false,null,C);
		};
		return A.IsStartOfBlock=true;
	},
	CheckEndOfBlock:function(A)
	{
		var B=this._Cache.IsEndOfBlock;
		if (B!=undefined) 
		return B;
		var C=this.EndBlock||this.EndBlockLimit;
		var D=this._Range.endContainer;
		var E=this._Range.endOffset;
		var F;
		if (D.nodeType==3)
		{
			var G=D.nodeValue;
			if (E<G.length)
			{
				G=G.substr(E);
				if (G.Trim().length!=0)
				return this._Cache.IsEndOfBlock=false;
			}
		}
		else 
		F=D.childNodes[E];
		if (!F) 
		F=FCKDomTools.GetNextSourceNode(D,true,null,C);
		var H=false;
		while (F)
		{
			switch (F.nodeType)
			{
				case 1:
				var I=F.nodeName.toLowerCase();
				if (FCKListsLib.InlineChildReqElements[I])
				break;
				if (I=='br'&&!H)
				{
					H=true;
					break;
				};
				return this._Cache.IsEndOfBlock=false;
				case 3:
				if (F.nodeValue.Trim().length>0) 
				return this._Cache.IsEndOfBlock=false;
			};
			F=FCKDomTools.GetNextSourceNode(F,false,null,C);
		};
		if (A)
		this.Select();
		return this._Cache.IsEndOfBlock=true;
	},
	CreateBookmark:function(A)//插入span标记并设置属性
	{//a=undefined
		var B=
		{
			StartId://="1274281623389S"
			(new Date()).valueOf()+Math.floor(Math.random()*1000)+'S',
			//valueOf 方法	返回指定对象的原始值。
			//floor 方法	返回小于等于其数值参数的最大整数。 
			//random 方法	返回介于 0 和 1 之间的伪随机数。
			EndId://="1274281656489E"
			(new Date()).valueOf()+Math.floor(Math.random()*1000)+'E'
		};
		var C=this.Window.document;
		var D;
		var E;
		var F;
		if (!this.CheckIsCollapsed())//false
		{
			E=C.createElement('span');
			E.style.display='none';
			E.id=B.EndId;
			E.setAttribute('_fck_bookmark',true);
			E.innerHTML='&nbsp;';
			F=this.Clone();
			F.Collapse(false);
			F.InsertNode(E);
		};
		D=C.createElement('span');//准备插入span标记
		D.style.display='none';//隐藏该标记
		D.id=B.StartId;//="1274281623389S"
		D.setAttribute('_fck_bookmark',true);
		//setAttribute 设置指定标签属性的值。 
		//例如:table.setAttribute("border", "2");	//设置表格的边框属性
		D.innerHTML='&nbsp;';
		//D.innerHTML='<SPAN id=1274281623389S style="DISPLAY:none" _fck_bookark="true">&nbsp;<SPAN>'
		F=this.Clone();//设置"_Range"属性
		F.Collapse(true);
		//collapse 将插入点移动到当前范围的开始或结尾
		F.InsertNode(D);//移动结束指针
		if (A)//false
		{
			B.StartNode=D;
			B.EndNode=E;
		};
		if (E)//false
		{
			this.SetStart(D,4);
			this.SetEnd(E,3);
		}
		else 
		this.MoveToPosition(D,4);//移动开始指针
		return B;
	},
	GetBookmarkNode:function(A,B)//返回(a)对象的id引用。(b)为是否返回
	{//a=[object Object]	b=true
		var C=this.Window.document;
		if (B)//true
		return A.StartNode||C.getElementById(A.StartId);
		else 
		return A.EndNode||C.getElementById(A.EndId);
	},
	MoveToBookmark:function(A,B)//设置属性
	{//a=[object Object]	b=undefined
		var C=this.GetBookmarkNode(A,true);//返回(a)对象的id引用。(b)为是否返回
		var D=this.GetBookmarkNode(A,false);//=null
		this.SetStart(C,3);
		//setStart()	把该范围的开始点设置为指定的节点中的指定偏移量
		if (!B) 
		FCKDomTools.RemoveNode(C);//清除(a)节点
		//removeNode 从文档层次中删除对象。 
		if (D)//false
		{
			this.SetEnd(D,3);
			if (!B)
			FCKDomTools.RemoveNode(D);
		}
		else 
		this.Collapse(true);//collapse 将插入点移动到当前范围的开始或结尾
		this._UpdateElementInfo();//设置属性
	},
	CreateBookmark2:function()
	{
		if (!this._Range)
		return { "Start":0,"End":0 };
		var A=
		{
			"Start":
			[this._Range.startOffset],
			"End":
			[this._Range.endOffset]
		};
		var B=this._Range.startContainer.previousSibling;
		var C=this._Range.endContainer.previousSibling;
		var D=this._Range.startContainer;
		var E=this._Range.endContainer;
		while (B&&B.nodeType==3&&D.nodeType==3)
		{
			A.Start[0]+=B.length;
			D=B;
			B=B.previousSibling;
		}
		while (C&&C.nodeType==3&&E.nodeType==3)
		{
			A.End[0]+=C.length;
			E=C;
			C=C.previousSibling;
		};
		if (D.nodeType==1&&D.childNodes[A.Start[0]]&&D.childNodes[A.Start[0]].nodeType==3)
		{
			var F=D.childNodes[A.Start[0]];
			var G=0;
			while (F.previousSibling&&F.previousSibling.nodeType==3)
			{
				F=F.previousSibling;
				G+=F.length;
			};
			D=F;
			A.Start[0]=G;
		};
		if (E.nodeType==1&&E.childNodes[A.End[0]]&&E.childNodes[A.End[0]].nodeType==3)
		{
			var F=E.childNodes[A.End[0]];
			var G=0;
			while (F.previousSibling&&F.previousSibling.nodeType==3)
			{
				F=F.previousSibling;
				G+=F.length;
			};
			E=F;
			A.End[0]=G;
		};
		A.Start=FCKDomTools.GetNodeAddress(D,true).concat(A.Start);
		A.End=FCKDomTools.GetNodeAddress(E,true).concat(A.End);
		return A;
	},
	MoveToBookmark2:function(A)
	{
		var B=FCKDomTools.GetNodeFromAddress(this.Window.document,A.Start.slice(0,-1),true);
		var C=FCKDomTools.GetNodeFromAddress(this.Window.document,A.End.slice(0,-1),true);
		this.Release(true);
		this._Range=new FCKW3CRange(this.Window.document);
		var D=A.Start[A.Start.length-1];
		var E=A.End[A.End.length-1];
		while (B.nodeType==3&&D>B.length)
		{
			if (!B.nextSibling||B.nextSibling.nodeType!=3)
			break;
			D-=B.length;
			B=B.nextSibling;
		}
		while (C.nodeType==3&&E>C.length)
		{
			if (!C.nextSibling||C.nextSibling.nodeType!=3)
			break;
			E-=C.length;
			C=C.nextSibling;
		};
		this._Range.setStart(B,D);
		this._Range.setEnd(C,E);
		this._UpdateElementInfo();
	},
	MoveToPosition:function(A,B)//移动开始指针
	{//a=[object]	b=4
		this.SetStart(A,B);
		//把该范围的开始点设置为指定的节点中的指定偏移量。
		this.Collapse(true);
	},
	SetStart:function(A,B,C)
	{
		var D=this._Range;
		if (!D)
		D=this._Range=this.CreateRange();
		switch(B)
		{
			case 1:
			D.setStart(A,0);
			break;
			case 2:
			D.setStart(A,A.childNodes.length);
			break;
			case 3:
			D.setStartBefore(A);
			break;
			case 4:
			D.setStartAfter(A);
		};
		if (!C) 
		this._UpdateElementInfo();
	},
	SetEnd:function(A,B,C)
	{
		var D=this._Range;
		if (!D)
		D=this._Range=this.CreateRange();
		switch(B)
		{
			case 1:
			D.setEnd(A,0);
			break;
			case 2:
			D.setEnd(A,A.childNodes.length);
			break;
			case 3:
			D.setEndBefore(A);
			break;
			case 4:
			D.setEndAfter(A);
		};
		if (!C)
		this._UpdateElementInfo();
	},
	Expand:function(A)
	{
		var B,oSibling;
		switch (A)
		{
			case 'inline_elements':
			if (this._Range.startOffset==0)
			{
				B=this._Range.startContainer;
				if (B.nodeType!=1)
				B=B.previousSibling?null:B.parentNode;
				if (B)
				{
					while (FCKListsLib.InlineNonEmptyElements[B.nodeName.toLowerCase()])
					{
						this._Range.setStartBefore(B);
						if (B!=B.parentNode.firstChild)
						break;
						B=B.parentNode;
					}
				}
			};
			B=this._Range.endContainer;
			var C=this._Range.endOffset;
			if ((B.nodeType==3&&C>=B.nodeValue.length)||(B.nodeType==1&&C>=B.childNodes.length)||(B.nodeType!=1&&B.nodeType!=3))
			{
				if (B.nodeType!=1)
				B=B.nextSibling?null:B.parentNode;
				if (B)
				{
					while (FCKListsLib.InlineNonEmptyElements[B.nodeName.toLowerCase()])
					{
						this._Range.setEndAfter(B);
						if (B!=B.parentNode.lastChild)
						break;
						B=B.parentNode;
					}
				}
			};
			break;
			case 'block_contents':
			case 'list_contents':
			var D=FCKListsLib.BlockBoundaries;
			if (A=='list_contents'||FCKConfig.EnterMode=='br') 
			D=FCKListsLib.ListBoundaries;
			if (this.StartBlock&&FCKConfig.EnterMode!='br'&&A=='block_contents')
			this.SetStart(this.StartBlock,1);
			else
			{
				B=this._Range.startContainer;
				if (B.nodeType==1)
				{
					var E=B.childNodes[this._Range.startOffset];
					if (E)
					B=FCKDomTools.GetPreviousSourceNode(E,true);
					else
					B=B.lastChild||B;
				}
				while (B&&(B.nodeType!=1||(B!=this.StartBlockLimit&&!D[B.nodeName.toLowerCase()])))
				{
					this._Range.setStartBefore(B);
					B=B.previousSibling||B.parentNode;
				}
			};
			if (this.EndBlock&&FCKConfig.EnterMode!='br'&&A=='block_contents'&&this.EndBlock.nodeName.toLowerCase()!='li')
			this.SetEnd(this.EndBlock,2);
			else
			{
				B=this._Range.endContainer;
				if (B.nodeType==1)
				B=B.childNodes[this._Range.endOffset]||B.lastChild;
				while (B&&(B.nodeType!=1||(B!=this.StartBlockLimit&&!D[B.nodeName.toLowerCase()])))
				{
					this._Range.setEndAfter(B);
					B=B.nextSibling||B.parentNode;
				};
				if (B&&B.nodeName.toLowerCase()=='br')
				this._Range.setEndAfter(B);
			};
			this._UpdateElementInfo();
		}
	},
	SplitBlock:function(A)
	{
		var B=A||FCKConfig.EnterMode;
		if (!this._Range)
		this.MoveToSelection();
		if (this.StartBlockLimit==this.EndBlockLimit)
		{
			var C=this.StartBlock;
			var D=this.EndBlock;
			var E=null;
			if (B!='br')
			{
				if (!C)
				{
					C=this.FixBlock(true,B);
					D=this.EndBlock;
				};
				if (!D)
				D=this.FixBlock(false,B);
			};
			var F=(C!=null&&this.CheckStartOfBlock());
			var G=(D!=null&&this.CheckEndOfBlock());
			if (!this.CheckIsEmpty())
			this.DeleteContents();
			if (C&&D&&C==D)
			{
				if (G)
				{
					E=new FCKElementPath(this.StartContainer);
					this.MoveToPosition(D,4);
					D=null;
				}
				else if (F)
				{
					E=new FCKElementPath(this.StartContainer);
					this.MoveToPosition(C,3);
					C=null;
				}
				else
				{
					this.SetEnd(C,2);
					var H=this.ExtractContents();
					D=C.cloneNode(false);
					D.removeAttribute('id',false);
					H.AppendTo(D);
					FCKDomTools.InsertAfterNode(C,D);
					this.MoveToPosition(C,4);
					if (FCKBrowserInfo.IsGecko&&!C.nodeName.IEquals(['ul','ol']))
					FCKTools.AppendBogusBr(C);
				}
			};
			return {PreviousBlock:C,NextBlock:D,WasStartOfBlock:F,WasEndOfBlock:G,ElementPath:E};
		};
		return null;
	},
	FixBlock:function(A,B)
	{
		var C=this.CreateBookmark();
		this.Collapse(A);
		this.Expand('block_contents');
		var D=this.Window.document.createElement(B);
		this.ExtractContents().AppendTo(D);
		FCKDomTools.TrimNode(D);
		if (FCKDomTools.CheckIsEmptyElement(D,function(element){ return element.getAttribute('_fck_bookmark')!='true';})&&FCKBrowserInfo.IsGeckoLike)
		FCKTools.AppendBogusBr(D);
		this.InsertNode(D);
		this.MoveToBookmark(C);
		return D;
	},
	Release:function(A)//初始化.(a)是否不清空"Window"属性
	{//a=true
		if (!A)//false
		this.Window=null;
		this.StartNode=null;
		this.StartContainer=null;
		this.StartBlock=null;
		this.StartBlockLimit=null;
		this.EndNode=null;
		this.EndContainer=null;
		this.EndBlock=null;
		this.EndBlockLimit=null;
		this._Range=null;
		this._Cache=null;
	},
	CheckHasRange:function()
	{
		return!!this._Range;
	},
	GetTouchedStartNode:function()
	{
		var A=this._Range;
		var B=A.startContainer;
		if (A.collapsed||B.nodeType!=1)
		return B;
		return B.childNodes[A.startOffset]||B;
	},
	GetTouchedEndNode:function()
	{
		var A=this._Range;
		var B=A.endContainer;
		if (A.collapsed||B.nodeType!=1)
		return B;
		return B.childNodes[A.endOffset-1]||B;
	}
};
FCKDomRange.prototype.MoveToSelection=function()//处于理选中区
{
	this.Release(true);//初始化.(a)是否不清空"Window"属性
	this._Range=new FCKW3CRange(this.Window.document);//设置初始值.设置"_Document"属性为(a)
	var A=this.Window.document.selection;
	//selection 对象		代表了当前激活选中区，即高亮文本块，和/或文档中用户可执行某些操作的其它元素。
	if (A.type!='Control')//true
	{//A.type="None"	type 获取选中区的类型。 
		var B=this._GetSelectionMarkerTag(true);//创建一个层并返回一个id返问.(a)为是否将插入点移动到当前范围的开始或结尾 
		var C=this._GetSelectionMarkerTag(false);
		if (!B&&!C)//false
		{
			this._Range.setStart(this.Window.document.body,0);
			this._UpdateElementInfo();
			return;
		};
		this._Range.setStart(B.parentNode,FCKDomTools.GetIndexOf(B));//设置属性
		///扩展parentNode指针的功能，实现一次能够操纵多个父元素
		//a=[object]	b=18
		B.parentNode.removeChild(B);
		//removeChild	清除指定元素及其所有子元素之间的空格
		this._Range.setEnd(C.parentNode,FCKDomTools.GetIndexOf(C));
		//a=[object]	b=18
		C.parentNode.removeChild(C);
		//removeChild() 方法删除子节点。
		this._UpdateElementInfo();//设置属性
	}
	else
	{
		var D=A.createRange().item(0);
		if (D)
		{
			this._Range.setStartBefore(D);
			this._Range.setEndAfter(D);
			this._UpdateElementInfo();
		}
	}
};
FCKDomRange.prototype.Select=function(A)
{
	if (this._Range)
	this.SelectBookmark(this.CreateBookmark(true),A);
};
FCKDomRange.prototype.SelectBookmark=function(A,B)
{//a=[object Object]	b=undefined
	var C=this.CheckIsCollapsed();//true
	var D;
	var E;
	var F=this.GetBookmarkNode(A,true);//=[object]
	if (!F)
	return;
	var G;
	if (!C)
	G=this.GetBookmarkNode(A,false);
	var H=this.Window.document.body.createTextRange();//=[object]
	H.moveToElementText(F);
	H.moveStart('character',1);
	if (G)//undefined
	{
		var I=this.Window.document.body.createTextRange();
		I.moveToElementText(G);
		H.setEndPoint('EndToEnd',I);
		H.moveEnd('character',-1);
	}
	else
	{
		D=(B||!F.previousSibling||F.previousSibling.nodeName.toLowerCase()=='br')&&!F.nextSibing;//true
		E=this.Window.document.createElement('span');
		E.innerHTML='&#65279;';
		F.parentNode.insertBefore(E,F);
		if (D)//true
		{
			F.parentNode.insertBefore(this.Window.document.createTextNode('\ufeff'),F);
		}
	};
	if (!this._Range)
	this._Range=this.CreateRange();
	this._Range.setStartBefore(F);
	F.parentNode.removeChild(F);
	if (C)
	{
		if (D)
		{
			H.moveStart('character',-1);
			H.select();
			this.Window.document.selection.clear();
		}
		else 
		H.select();
		FCKDomTools.RemoveNode(E);
	}
	else
	{
		this._Range.setEndBefore(G);
		G.parentNode.removeChild(G);
		H.select();
	}
};
FCKDomRange.prototype._GetSelectionMarkerTag=function(A)//创建一个层并返回一个id返问.(a)为是否将插入点移动到当前范围的开始或结尾 
{//a=true
	var B=this.Window.document;
	var C=B.selection;
	//selection 对象		代表了当前激活选中区，即高亮文本块，和/或文档中用户可执行某些操作的其它元素。
	var D;
	try
	{
		D=C.createRange();
		//通过selection对象的createRange()方法基于当前被选择区域创建
	}
	catch (e)
	{
		return null;
	};
	if (D.parentElement().document!=B) return null;//false
	//parentElement()方法返回包含文本范围容器的引用
	D.collapse(A===true);
	//collapse([Boolean]) 
	//可以用collapse()方法把文本范围从当前尺寸重叠成字符间的单个插入点。collapse()方法的可选参数是Boolean值,它指出范围是在当前范围的开始点重合，还是结束点重合。默认值为true，在开始点重合
	var E='fck_dom_range_temp_'+(new Date()).valueOf()+'_'+Math.floor(Math.random()*1000);
	//E="fck_dom_range_temp_1264225919718_89"
	D.pasteHTML('<span id="'+E+'"></span>');
	return B.getElementById(E);
};
var FCKDomRangeIterator=function(A)
{
	this.Range=A;
	this.ForceBrBreak=false;
	this.EnforceRealBlocks=false;
};
FCKDomRangeIterator.CreateFromSelection=function(A)
{
	var B=new FCKDomRange(A);
	B.MoveToSelection();
	return new FCKDomRangeIterator(B);
};
FCKDomRangeIterator.prototype=
{
	GetNextParagraph:function()
	{
		var A;
		var B;
		var C;
		var D;
		var E;
		var F=this.ForceBrBreak?FCKListsLib.ListBoundaries:FCKListsLib.BlockBoundaries;
		if (!this._LastNode)
		{
			var B=this.Range.Clone();
			B.Expand(this.ForceBrBreak?'list_contents':'block_contents');
			this._NextNode=B.GetTouchedStartNode();
			this._LastNode=B.GetTouchedEndNode();
			B=null;
		};
		var H=this._NextNode;
		var I=this._LastNode;
		this._NextNode=null;
		while (H)
		{
			var J=false;
			var K=(H.nodeType!=1);
			var L=false;
			if (!K)
			{
				var M=H.nodeName.toLowerCase();
				if (F[M]&&(!FCKBrowserInfo.IsIE||H.scopeName=='HTML'))
				{
					if (M=='br') 
					K=true;
					else if (!B&&H.childNodes.length==0&&M!='hr')
					{
						A=H;C=H==I;
						break;
					};
					if (B)
					{
						B.SetEnd(H,3,true);
						if (M!='br')
						this._NextNode=FCKDomTools.GetNextSourceNode(H,true,null,I)||H;
					};
					J=true;
				}
				else
				{
					if (H.firstChild)
					{
						if (!B)
						{
							B=new FCKDomRange(this.Range.Window);
							B.SetStart(H,3,true);
						};
						H=H.firstChild;
						continue;
					};
					K=true;
				}
			}
			else if (H.nodeType==3)
			{
				if (/^[\r\n\t ]+$/.test(H.nodeValue))
				K=false;
			};
			if (K&&!B)
			{
				B=new FCKDomRange(this.Range.Window);
				B.SetStart(H,3,true);
			};
			C=((!J||K)&&H==I);
			if (B&&!J)
			{
				while (!H.nextSibling&&!C)
				{
					var N=H.parentNode;
					if (F[N.nodeName.toLowerCase()])
					{
						J=true;
						C=C||(N==I);
						break;
					};
					H=N;
					K=true;
					C=(H==I);
					L=true;
				}
			};
			if (K) 
			B.SetEnd(H,4,true);
			if ((J||C)&&B)
			{
				B._UpdateElementInfo();
				if (B.StartNode==B.EndNode&&B.StartNode.parentNode==B.StartBlockLimit&&B.StartNode.getAttribute&&B.StartNode.getAttribute('_fck_bookmark')) 
				B=null;
				else break;
			};
			if (C) 
			break;
			H=FCKDomTools.GetNextSourceNode(H,L,null,I);
		};
		if (!A)
		{
			if (!B)
			{
				this._NextNode=null;
				return null;
			};
			A=B.StartBlock;
			if (!A&&!this.EnforceRealBlocks&&B.StartBlockLimit.nodeName.IEquals('DIV','TH','TD')&&B.CheckStartOfBlock()&&B.CheckEndOfBlock())
			{
				A=B.StartBlockLimit;
			}
			else if (!A||(this.EnforceRealBlocks&&A.nodeName.toLowerCase()=='li'))
			{
				A=this.Range.Window.document.createElement(FCKConfig.EnterMode=='p'?'p':'div');
				B.ExtractContents().AppendTo(A);
				FCKDomTools.TrimNode(A);
				B.InsertNode(A);
				D=true;
				E=true;
			}
			else if (A.nodeName.toLowerCase()!='li')
			{
				if (!B.CheckStartOfBlock()||!B.CheckEndOfBlock())
				{
					A=A.cloneNode(false);
					B.ExtractContents().AppendTo(A);
					FCKDomTools.TrimNode(A);
					var O=B.SplitBlock();
					D=!O.WasStartOfBlock;
					E=!O.WasEndOfBlock;
					B.InsertNode(A);
				}
			}
			else if (!C)
			{
				this._NextNode=A==I?null:FCKDomTools.GetNextSourceNode(B.EndNode,true,null,I);
				return A;
			}
		};
		if (D)
		{
			var P=A.previousSibling;
			if (P&&P.nodeType==1)
			{
				if (P.nodeName.toLowerCase()=='br') 
				P.parentNode.removeChild(P);
				else if (P.lastChild&&P.lastChild.nodeName.IEquals('br')) 
				P.removeChild(P.lastChild);
			}
		};
		if (E)
		{
			var Q=A.lastChild;
			if (Q&&Q.nodeType==1&&Q.nodeName.toLowerCase()=='br') 
			A.removeChild(Q);
		};
		if (!this._NextNode)
		this._NextNode=(C||A==I)?null:FCKDomTools.GetNextSourceNode(A,true,null,I);
		return A;
	}
};
var FCKDocumentFragment=function(A)
{
	this._Document=A;
	this.RootNode=A.createElement('div');
};
FCKDocumentFragment.prototype=
{
	AppendTo:function(A)
	{
		FCKDomTools.MoveChildren(this.RootNode,A);
	},
	AppendHtml:function(A)
	{
		var B=this._Document.createElement('div');
		B.innerHTML=A;FCKDomTools.MoveChildren(B,this.RootNode);
	},
	InsertAfterNode:function(A)
	{
		var B=this.RootNode;
		var C;
		while((C=B.lastChild)) 
		FCKDomTools.InsertAfterNode(A,B.removeChild(C));
	}
};
var FCKW3CRange=function(A)//设置初始值.设置"_Document"属性为(a)
{//a=[object]
	this._Document=A;
	this.startContainer=null;
	this.startOffset=null;
	this.endContainer=null;
	this.endOffset=null;
	this.collapsed=true;
};
FCKW3CRange.CreateRange=function(A)
{
	return new FCKW3CRange(A);
};
FCKW3CRange.CreateFromRange=function(A,B)//设置选择区域起始指针和结束指针
{//a=[object]	b=[object]
	var C=FCKW3CRange.CreateRange(A);
	//通过selection对象的createRange()方法基于当前被选择区域创建
	C.setStart(B.startContainer,B.startOffset);
	//a=[object]	b=0
	C.setEnd(B.endContainer,B.endOffset);
	//a=[object]	b=0
	return C;
};
FCKW3CRange.prototype=
{
	_UpdateCollapsed:function()//设置"collapsed"属性
	{
		this.collapsed=(this.startContainer==this.endContainer&&this.startOffset==this.endOffset);//=true
	},
	setStart:function(A,B)//设置属性
	{//a=[object]	b=18
		this.startContainer=A;
		this.startOffset=B;
		if (!this.endContainer)//true
		{
			this.endContainer=A;
			this.endOffset=B;
		};
		this._UpdateCollapsed();//设置"collapsed"属性
	},
	setEnd:function(A,B)
	{
		this.endContainer=A;
		this.endOffset=B;
		if (!this.startContainer)
		{
			this.startContainer=A;
			this.startOffset=B;
		};
		this._UpdateCollapsed();
	},
	setStartAfter:function(A)
	{
		this.setStart(A.parentNode,FCKDomTools.GetIndexOf(A)+1);
	},
	setStartBefore:function(A)
	{
		this.setStart(A.parentNode,FCKDomTools.GetIndexOf(A));
	},
	setEndAfter:function(A)
	{
		this.setEnd(A.parentNode,FCKDomTools.GetIndexOf(A)+1);
	},
	setEndBefore:function(A)
	{
		this.setEnd(A.parentNode,FCKDomTools.GetIndexOf(A));
	},
	collapse:function(A)
	{
		if (A)
		{
			this.endContainer=this.startContainer;
			this.endOffset=this.startOffset;
		}
		else
		{
			this.startContainer=this.endContainer;
			this.startOffset=this.endOffset;
		};
		this.collapsed=true;
	},
	selectNodeContents:function(A)
	{
		this.setStart(A,0);
		this.setEnd(A,A.nodeType==3?A.data.length:A.childNodes.length);
	},
	insertNode:function(A)//移动结束指针
	{//a=[object]
		var B=this.startContainer;//=[object]
		var C=this.startOffset;//=[object]
		if (B.nodeType==3)//false
		{//nodeType	获取该节点的类型
			B.splitText(C);
			if (B==this.endContainer)
			this.setEnd(B.nextSibling,this.endOffset-this.startOffset);
			FCKDomTools.InsertAfterNode(B,A);
			return;
		}
		else
		{
			B.insertBefore(A,B.childNodes[C]||null);
			//insertBefore() 方法的作用是：在现有的子节点前插入一个新的子节点
				//获取列表结构包含的所有列表项节点
			if (B==this.endContainer)//true
			{
				this.endOffset++;
				this.collapsed=false;
			}
		}
	},
	deleteContents:function()
	{
		if (this.collapsed)
		return;
		this._ExecContentsAction(0);
	},
	extractContents:function()
	{
		var A=new FCKDocumentFragment(this._Document);
		if (!this.collapsed)
		this._ExecContentsAction(1,A);
		return A;
	},
	cloneContents:function()
	{
		var A=new FCKDocumentFragment(this._Document);
		if (!this.collapsed)
		this._ExecContentsAction(2,A);
		return A;
	},
	_ExecContentsAction:function(A,B)
	{
		var C=this.startContainer;
		var D=this.endContainer;
		var E=this.startOffset;
		var F=this.endOffset;
		var G=false;
		var H=false;
		if (D.nodeType==3) 
		D=D.splitText(F);
		else
		{
			if (D.childNodes.length>0)
			{
				if (F>D.childNodes.length-1)
				{
					D=FCKDomTools.InsertAfterNode(D.lastChild,this._Document.createTextNode(''));
					H=true;
				}
				else
				D=D.childNodes[F];
			}
		};
		if (C.nodeType==3)
		{
			C.splitText(E);
			if (C==D)
			D=C.nextSibling;
		}
		else
		{
			if (E==0)
			{
				C=C.insertBefore(this._Document.createTextNode(''),C.firstChild);
				G=true;
			}
			else if (E>C.childNodes.length-1)
			{
				C=C.appendChild(this._Document.createTextNode(''));
				G=true;
			}
			else
			C=C.childNodes[E].previousSibling;
		};
		var I=FCKDomTools.GetParents(C);
		var J=FCKDomTools.GetParents(D);
		var i,topStart,topEnd;
		for (i=0;i<I.length;i++)
		{
			topStart=I[i];
			topEnd=J[i];
			if (topStart!=topEnd)
			break;
		};
		var K,levelStartNode,levelClone,currentNode,currentSibling;
		if (B)
		K=B.RootNode;
		for (var j=i;j<I.length;j++)
		{
			levelStartNode=I[j];
			if (K&&levelStartNode!=C)
			levelClone=K.appendChild(levelStartNode.cloneNode(levelStartNode==C));
			currentNode=levelStartNode.nextSibling;
			while(currentNode)
			{
				if (currentNode==J[j]||currentNode==D)
				break;
				currentSibling=currentNode.nextSibling;
				if (A==2)
				K.appendChild(currentNode.cloneNode(true));
				else
				{
					currentNode.parentNode.removeChild(currentNode);
					if (A==1)
					K.appendChild(currentNode);
				};
				currentNode=currentSibling;
			};
			if (K) 
			K=levelClone;
		};
		if (B)
		K=B.RootNode;
		for (var k=i;k<J.length;k++)
		{
			levelStartNode=J[k];
			if (A>0&&levelStartNode!=D)
			levelClone=K.appendChild(levelStartNode.cloneNode(levelStartNode==D));
			if (!I[k]||levelStartNode.parentNode!=I[k].parentNode)
			{
				currentNode=levelStartNode.previousSibling;
				while(currentNode)
				{
					if (currentNode==I[k]||currentNode==C)
					break;
					currentSibling=currentNode.previousSibling;
					if (A==2)
					K.insertBefore(currentNode.cloneNode(true),K.firstChild);
					else
					{
						currentNode.parentNode.removeChild(currentNode);
						if (A==1) 
						K.insertBefore(currentNode,K.firstChild);
					};
					currentNode=currentSibling;
				}
			};
			if (K) 
			K=levelClone;
		};
		if (A==2)
		{
			var L=this.startContainer;
			if (L.nodeType==3)
			{
				L.data+=L.nextSibling.data;
				L.parentNode.removeChild(L.nextSibling);
			};
			var M=this.endContainer;
			if (M.nodeType==3&&M.nextSibling)
			{
				M.data+=M.nextSibling.data;
				M.parentNode.removeChild(M.nextSibling);
			}
		}
		else
		{
			if (topStart&&topEnd&&(C.parentNode!=topStart.parentNode||D.parentNode!=topEnd.parentNode))
			{
				var N=FCKDomTools.GetIndexOf(topEnd);
				if (G&&topEnd.parentNode==C.parentNode) 
				N--;
				this.setStart(topEnd.parentNode,N);
			};
			this.collapse(true);
		};
		if(G) 
		C.parentNode.removeChild(C);
		if(H&&D.parentNode)
		D.parentNode.removeChild(D);
	},
	cloneRange:function()//返回选择区域起始指针和结束指针
	{
		return FCKW3CRange.CreateFromRange(this._Document,this);//设置选择区域起始指针和结束指针
		//a=[object]	b=[object]
	}
};
var FCKEnterKey=function(A,B,C,D)//设置"Enter","ShiftEnter","Backspace","CtrlBackspace","CtrlBackspace","Delete"键的事件.
{//a=[object]	b="p"	c="br"	d=0
	this.Window=A;
	this.EnterMode=B||'p';
	this.ShiftEnterMode=C||'br';
	var E=new FCKKeystrokeHandler(false);//定义"Keystrokes"和"CancelCtrlDefaults"属性
	E._EnterKey=this;
	E.OnKeystroke=FCKEnterKey_OnKeystroke;
	E.SetKeystrokes([[13,'Enter'],[SHIFT+13,'ShiftEnter'],[8,'Backspace'],[CTRL+8,'CtrlBackspace'],[46,'Delete']]);
	//SetKeystrokes=function()//在"Keystrokes"数组中添加内容.
	this.TabText='';
	if (D>0||FCKBrowserInfo.IsSafari)//false
	{
		while (D--)
		this.TabText+='\xa0';
		E.SetKeystrokes([9,'Tab']);
	};
	E.AttachToElement(A.document);
};
function FCKEnterKey_OnKeystroke(A,B)
{
	var C=this._EnterKey;
	try
	{
		switch (B)
		{
			case 'Enter':
			return C.DoEnter();
			break;
			case 'ShiftEnter':
			return C.DoShiftEnter();
			break;
			case 'Backspace':
			return C.DoBackspace();
			break;
			case 'Delete':
			return C.DoDelete();
			break;
			case 'Tab':
			return C.DoTab();
			break;
			case 'CtrlBackspace':
			return C.DoCtrlBackspace();
			break;
		}
	}
	catch (e){};
	return false;
};
FCKEnterKey.prototype.DoEnter=function(A,B)
{
	FCKUndo.SaveUndoStep();
	this._HasShift=(B===true);
	var C=FCKSelection.GetParentElement();
	var D=new FCKElementPath(C);
	var E=A||this.EnterMode;
	if (E=='br'||D.Block&&D.Block.tagName.toLowerCase()=='pre')
	return this._ExecuteEnterBr();
	else 
	return this._ExecuteEnterBlock(E);
};
FCKEnterKey.prototype.DoShiftEnter=function()
{
	return this.DoEnter(this.ShiftEnterMode,true);
};
FCKEnterKey.prototype.DoBackspace=function()
{
	var A=false;
	var B=new FCKDomRange(this.Window);
	B.MoveToSelection();
	if (FCKBrowserInfo.IsIE&&this._CheckIsAllContentsIncluded(B,this.Window.document.body))
	{
		this._FixIESelectAllBug(B);
		return true;
	};
	var C=B.CheckIsCollapsed();
	if (!C)
	{
		if (FCKBrowserInfo.IsIE&&this.Window.document.selection.type.toLowerCase()=="control")
		{
			var D=this.Window.document.selection.createRange();
			for (var i=D.length-1;i>=0;i--)
			{
				var E=D.item(i);
				E.parentNode.removeChild(E);
			};
			return true;
		};
		return false;
	};
	if (FCKBrowserInfo.IsIE)
	{
		var F=FCKDomTools.GetPreviousSourceElement(B.StartNode,true);
		if (F&&F.nodeName.toLowerCase()=='br')
		{
			var G=B.Clone();
			G.SetStart(F,4);
			if (G.CheckIsEmpty())
			{
				F.parentNode.removeChild(F);
				return true;
			}
		}
	};
	var H=B.StartBlock;
	var I=B.EndBlock;
	if (B.StartBlockLimit==B.EndBlockLimit&&H&&I)
	{
		if (!C)
		{
			var J=B.CheckEndOfBlock();
			B.DeleteContents();
			if (H!=I)
			{
				B.SetStart(I,1);
				B.SetEnd(I,1);
			};
			B.Select();
			A=(H==I);
		};
		if (B.CheckStartOfBlock())
		{
			var K=B.StartBlock;
			var L=FCKDomTools.GetPreviousSourceElement(K,true,['BODY',B.StartBlockLimit.nodeName],['UL','OL']);
			A=this._ExecuteBackspace(B,L,K);
		}
		else if (FCKBrowserInfo.IsGeckoLike)
		{
			B.Select();
		}
	};
	B.Release();
	return A;
};
FCKEnterKey.prototype.DoCtrlBackspace=function()
{
	FCKUndo.SaveUndoStep();
	var A=new FCKDomRange(this.Window);
	A.MoveToSelection();
	if (FCKBrowserInfo.IsIE&&this._CheckIsAllContentsIncluded(A,this.Window.document.body))
	{
		this._FixIESelectAllBug(A);
		return true;
	};
	return false;
};
FCKEnterKey.prototype._ExecuteBackspace=function(A,B,C)
{
	var D=false;
	if (!B&&C&&C.nodeName.IEquals('LI')&&C.parentNode.parentNode.nodeName.IEquals('LI'))
	{
		this._OutdentWithSelection(C,A);
		return true;
	};
	if (B&&B.nodeName.IEquals('LI'))
	{
		var E=FCKDomTools.GetLastChild(B,['UL','OL']);
		while (E)
		{
			B=FCKDomTools.GetLastChild(E,'LI');
			E=FCKDomTools.GetLastChild(B,['UL','OL']);
		}
	};
	if (B&&C)
	{
		if (C.nodeName.IEquals('LI')&&!B.nodeName.IEquals('LI'))
		{
			this._OutdentWithSelection(C,A);
			return true;
		};
		var F=C.parentNode;
		var G=B.nodeName.toLowerCase();
		if (FCKListsLib.EmptyElements[G]!=null||G=='table')
		{
			FCKDomTools.RemoveNode(B);
			D=true;
		}
		else
		{
			FCKDomTools.RemoveNode(C);
			while (F.innerHTML.Trim().length==0)
			{
				var H=F.parentNode;H.removeChild(F);
				F=H;
			};
			FCKDomTools.LTrimNode(C);
			FCKDomTools.RTrimNode(B);
			A.SetStart(B,2,true);
			A.Collapse(true);
			var I=A.CreateBookmark(true);
			if (!C.tagName.IEquals(['TABLE'])) 
			FCKDomTools.MoveChildren(C,B);
			A.SelectBookmark(I);
			D=true;
		}
	};
	return D;
};
FCKEnterKey.prototype.DoDelete=function()
{
	FCKUndo.SaveUndoStep();
	var A=false;
	var B=new FCKDomRange(this.Window);
	B.MoveToSelection();
	if (FCKBrowserInfo.IsIE&&this._CheckIsAllContentsIncluded(B,this.Window.document.body))
	{
		this._FixIESelectAllBug(B);
		return true;
	};
	if (B.CheckIsCollapsed()&&B.CheckEndOfBlock(FCKBrowserInfo.IsGeckoLike))
	{
		var C=B.StartBlock;
		var D=FCKTools.GetElementAscensor(C,'td');
		var E=FCKDomTools.GetNextSourceElement(C,true,[B.StartBlockLimit.nodeName],['UL','OL','TR'],true);
		if (D)
		{
			var F=FCKTools.GetElementAscensor(E,'td');
			if (F!=D) 
			return true;
		};
		A=this._ExecuteBackspace(B,C,E);
	};
	B.Release();
	return A;
};
FCKEnterKey.prototype.DoTab=function()
{
	var A=new FCKDomRange(this.Window);
	A.MoveToSelection();
	var B=A._Range.startContainer;
	while (B)
	{
		if (B.nodeType==1)
		{
			var C=B.tagName.toLowerCase();
			if (C=="tr"||C=="td"||C=="th"||C=="tbody"||C=="table")
			return false;
			else
			break;
		};
		B=B.parentNode;
	};
	if (this.TabText)
	{
		A.DeleteContents();
		A.InsertNode(this.Window.document.createTextNode(this.TabText));
		A.Collapse(false);
		A.Select();
	};
	return true;
};
FCKEnterKey.prototype._ExecuteEnterBlock=function(A,B)
{
	var C=B||new FCKDomRange(this.Window);
	var D=C.SplitBlock(A);
	if (D)
	{
		var E=D.PreviousBlock;
		var F=D.NextBlock;
		var G=D.WasStartOfBlock;
		var H=D.WasEndOfBlock;
		if (F)
		{
			if (F.parentNode.nodeName.IEquals('li'))
			{
				FCKDomTools.BreakParent(F,F.parentNode);
				FCKDomTools.MoveNode(F,F.nextSibling,true);
			}
		}
		else if (E&&E.parentNode.nodeName.IEquals('li'))
		{
			FCKDomTools.BreakParent(E,E.parentNode);
			C.MoveToElementEditStart(E.nextSibling);
			FCKDomTools.MoveNode(E,E.previousSibling);
		};
		if (!G&&!H)
		{
			if (F.nodeName.IEquals('li')&&F.firstChild&&F.firstChild.nodeName.IEquals(['ul','ol'])) 
			F.insertBefore(FCKTools.GetElementDocument(F).createTextNode('\xa0'),F.firstChild);
			if (F) 
			C.MoveToElementEditStart(F);
		}
		else
		{
			if (G&&H&&E.tagName.toUpperCase()=='LI')
			{
				C.MoveToElementStart(E);
				this._OutdentWithSelection(E,C);
				C.Release();
				return true;
			};
			var I;
			if (E)
			{
				var J=E.tagName.toUpperCase();
				if (!this._HasShift&&!(/^H[1-6]$/).test(J))
				{
					I=FCKDomTools.CloneElement(E);
				}
			}
			else if (F)
			I=FCKDomTools.CloneElement(F);
			if (!I)
			I=this.Window.document.createElement(A);
			var K=D.ElementPath;
			if (K)
			{
				for (var i=0,len=K.Elements.length;i<len;i++)
				{
					var L=K.Elements[i];
					if (L==K.Block||L==K.BlockLimit) 
					break;
					if (FCKListsLib.InlineChildReqElements[L.nodeName.toLowerCase()])
					{
						L=FCKDomTools.CloneElement(L);
						FCKDomTools.MoveChildren(I,L);
						I.appendChild(L);
					}
				}
			};
			if (FCKBrowserInfo.IsGeckoLike)
			FCKTools.AppendBogusBr(I);
			C.InsertNode(I);
			if (FCKBrowserInfo.IsIE)
			{
				C.MoveToElementEditStart(I);
				C.Select();
			};
			C.MoveToElementEditStart(G&&!H?F:I);
		};
		if (FCKBrowserInfo.IsGeckoLike)
		{
			if (F)
			{
				var M=this.Window.document.createElement('span');
				M.innerHTML='&nbsp;';
				C.InsertNode(M);
				FCKDomTools.ScrollIntoView(M,false);
				C.DeleteContents();
			}
			else
			{
				FCKDomTools.ScrollIntoView(F||I,false);
			}
		};
		C.Select();
	};
	C.Release();
	return true;
};
FCKEnterKey.prototype._ExecuteEnterBr=function(A)
{
	var B=new FCKDomRange(this.Window);
	B.MoveToSelection();
	if (B.StartBlockLimit==B.EndBlockLimit)
	{
		B.DeleteContents();
		B.MoveToSelection();
		var C=B.CheckStartOfBlock();
		var D=B.CheckEndOfBlock();
		var E=B.StartBlock?B.StartBlock.tagName.toUpperCase():'';
		var F=this._HasShift;
		var G=false;
		if (!F&&E=='LI')
		return this._ExecuteEnterBlock(null,B);
		if (!F&&D&&(/^H[1-6]$/).test(E))
		{
			FCKDomTools.InsertAfterNode(B.StartBlock,this.Window.document.createElement('br'));
			if (FCKBrowserInfo.IsGecko)
			FCKDomTools.InsertAfterNode(B.StartBlock,this.Window.document.createTextNode(''));
			B.SetStart(B.StartBlock.nextSibling,FCKBrowserInfo.IsIE?3:1);
		}
		else
		{
			var H;
			G=E.IEquals('pre');
			if (G)
			H=this.Window.document.createTextNode(FCKBrowserInfo.IsIE?'\r':'\n');
			else
			H=this.Window.document.createElement('br');
			B.InsertNode(H);
			if (FCKBrowserInfo.IsGecko)
			FCKDomTools.InsertAfterNode(H,this.Window.document.createTextNode(''));
			if (D&&FCKBrowserInfo.IsGeckoLike)
			FCKTools.AppendBogusBr(H.parentNode);
			if (FCKBrowserInfo.IsIE) 
			B.SetStart(H,4);
			else 
			B.SetStart(H.nextSibling,1);
			if (!FCKBrowserInfo.IsIE)
			{
				var I=null;
				if (FCKBrowserInfo.IsOpera)
				I=this.Window.document.createElement('span');
				else 
				I=this.Window.document.createElement('br');
				H.parentNode.insertBefore(I,H.nextSibling);
				FCKDomTools.ScrollIntoView(I,false);
				I.parentNode.removeChild(I);
			}
		};
		B.Collapse(true);
		B.Select(G);
	};
	B.Release();
	return true;
};
FCKEnterKey.prototype._OutdentWithSelection=function(A,B)
{
	var C=B.CreateBookmark();
	FCKListHandler.OutdentListItem(A);
	B.MoveToBookmark(C);
	B.Select();
};
FCKEnterKey.prototype._CheckIsAllContentsIncluded=function(A,B)
{
	var C=false;
	var D=false;
	if (A.StartContainer==B||A.StartContainer==B.firstChild) 
	C=(A._Range.startOffset==0);
	if (A.EndContainer==B||A.EndContainer==B.lastChild)
	{
		var E=A.EndContainer.nodeType==3?A.EndContainer.length:A.EndContainer.childNodes.length;
		D=(A._Range.endOffset==E);
	};
	return C&&D;
};
FCKEnterKey.prototype._FixIESelectAllBug=function(A)
{
	var B=this.Window.document;
	B.body.innerHTML='';
	var C;
	if (FCKConfig.EnterMode.IEquals(['div','p']))
	{
		C=B.createElement(FCKConfig.EnterMode);
		B.body.appendChild(C);
	}
	else 
	C=B.body;
	A.MoveToNodeContents(C);
	A.Collapse(true);
	A.Select();
	A.Release();
};
var FCKDocumentProcessor={};
FCKDocumentProcessor._Items=[];
FCKDocumentProcessor.AppendNew=function()
{
	var A={};
	this._Items.push(A);
	return A;
};
FCKDocumentProcessor.Process=function(A)//设置"StartupValue"为内容
{//a=[object]  为IFRME框架里的Document对象
	var B=FCK.IsDirty();//false		返回内容是否相同
	var C,i=0;
	while((C=this._Items[i++])) 
	{
		C.ProcessDocument(A);
	}
	if (!B)//true
	FCK.ResetIsDirty();//设置"StartupValue"为内容
};
var FCKDocumentProcessor_CreateFakeImage=function(A,B)//在(2)元素处增加(1)样式
{
	//1='FCK__Anchor'	2=""
	var C=FCKTools.GetElementDocument(B).createElement('IMG');
	C.className=A;
	C.src=FCKConfig.BasePath+'images/spacer.gif';
	C.setAttribute('_fckfakelement','true',0);
	C.setAttribute('_fckrealelement',FCKTempBin.AddElement(B),0);
	return C;
};
if (FCKBrowserInfo.IsIE||FCKBrowserInfo.IsOpera)
{
	var FCKAnchorsProcessor=FCKDocumentProcessor.AppendNew();
	FCKAnchorsProcessor.ProcessDocument=function(A)//设置(1)对象的'A'标记的属性
	{
		//A=[object]	为IFRME框架里的Document对象
		var B=A.getElementsByTagName('A');
		//getElementsByTagName() 方法可返回带有指定标签名的对象的集合。
		var C;
		var i=B.length-1;//=127
		while (i>=0&&(C=B[i--]))
		{
			if (C.style.display=='none')//false -> true
			{
					var D=FCKDocumentProcessor_CreateFakeImage('FCK__Anchor',C.cloneNode(true));//在(2)元素处增加(1)样式
					//cloneNode(a) 方法可创建指定的节点的精确拷贝。
						//a		必需。假如逻辑参数被设置为真，那么被克隆的节点会克隆原节点的所有子节点。
					D.setAttribute('_fckanchor','true',0);
					//setAttribute 设置指定标签属性的值。 
					C.parentNode.insertBefore(D,C);
					//扩展parentNode指针的功能，实现一次能够操纵多个父元素
					//insertBefore() 方法在一个指定的子节点之前插入一个节点。
					C.parentNode.removeChild(C);
					//removeChild	清除指定元素及其所有子元素之间的空格
			}
		}
	}
};
var FCKPageBreaksProcessor=FCKDocumentProcessor.AppendNew();
FCKPageBreaksProcessor.ProcessDocument=function(A)//设置(1)对象'DIV'标记的属性
{//a=[object]
	var B=A.getElementsByTagName('DIV');
	//getElementsByTagName() 方法可返回带有指定标签名的对象的集合。
	var C;
	var i=B.length-1;//=51
	while (i>=0&&(C=B[i--]))//51
	{
		//C.outerHTML="<DIV>内容</DIV>"
		if (C.style.pageBreakAfter=='always'&&C.childNodes.length==1&&C.childNodes[0].style&&C.childNodes[0].style.display=='none')
		{
/*			pageBreakAfter 属性设置元素后否应当放置分页符。
				Object.style.pageBreakAfter=auto|always|avoid|left|right
				值										描述
				auto									默认。如果必要则在元素后插入分页符。
				always									在元素后插入分页符。
				avoid									避免在元素后插入分页符。
				left									在元素之后足够的分页符，一直到一张空白的左页为止。
				right									在元素之后足够的分页符，一直到一张空白的右页为止。
			childNodes 属性返回子节点的列表
				childNodes[0]  元素的第一个子节点 (文本节点) 
*/
			var D=FCKDocumentProcessor_CreateFakeImage('FCK__PageBreak',C.cloneNode(true));//在(2)元素处增加(1)样式
			C.parentNode.insertBefore(D,C);
			//扩展parentNode指针的功能，实现一次能够操纵多个父元素
			C.parentNode.removeChild(C);
			//insertBefore() 方法在一个指定的子节点之前插入一个节点。
			//removeChild	清除指定元素及其所有子元素之间的空格
		}
	}
};
var FCKEmbedAndObjectProcessor=
(function()
		  {
			  var A=[];
			  var B=function(el)
			  {
				  var C=el.cloneNode(true);
				  var D;
				  var E=D=FCKDocumentProcessor_CreateFakeImage('FCK__UnknownObject',C);
				  FCKEmbedAndObjectProcessor.RefreshView(E,el);
				  for (var i=0;i<A.length;i++) 
				  D=A[i](el,D)||D;
				  if (D!=E)
				  FCKTempBin.RemoveElement(E.getAttribute('_fckrealelement'));
				  el.parentNode.replaceChild(D,el);
			  };
			  var F=function(elementName,doc)
			  {
				  var G=doc.getElementsByTagName(elementName);
				  for (var i=G.length-1;i>=0;i--)
				  B(G[i]);
			  };
			  var H=function(doc)
			  {
				  F('object',doc);
				  F('embed',doc);
			  };
			  return FCKTools.Merge(FCKDocumentProcessor.AppendNew(),
																   {
																	   ProcessDocument:function(doc)//设置(1)对象'object'标记和'embed'的标记属性
																	   {
																		   //1=[object]
																		   if (FCKBrowserInfo.IsGecko)//false
																		   FCKTools.RunFunction(H,this,[doc]);
																		   else
																		   H(doc);
																		},
																		RefreshView:function(placeHolder,original)
																		{
																			if (original.getAttribute('width')>0)																										
																			placeHolder.style.width=FCKTools.ConvertHtmlSizeToStyle(original.getAttribute('width'));
																			if (original.getAttribute('height')>0)
																			placeHolder.style.height=FCKTools.ConvertHtmlSizeToStyle(original.getAttribute('height'));
																		},
																		AddCustomHandler:function(func)
																		{
																			A.push(func);
																		}
																	});
		})();
FCK.GetRealElement=function(A)
{
	var e=FCKTempBin.Elements[A.getAttribute('_fckrealelement')];
	if (A.getAttribute('_fckflash'))
	{
		if (A.style.width.length>0) 
		e.width=FCKTools.ConvertStyleSizeToHtml(A.style.width);
		if (A.style.height.length>0)
		e.height=FCKTools.ConvertStyleSizeToHtml(A.style.height);
	};
	return e;
};
if (FCKBrowserInfo.IsIE)
{
	FCKDocumentProcessor.AppendNew().ProcessDocument=function(A)//设置(1)对象的'HR'标记的属性
	{
		//1=[object]
		var B=A.getElementsByTagName('HR');
		//getElementsByTagName() 方法可返回带有指定标签名的对象的集合。
		var C;
		var i=B.length-1;
		while (i>=0&&(C=B[i--]))
		{
			var D=A.createElement('hr');
			D.mergeAttributes(C,true);
			FCKDomTools.InsertAfterNode(C,D);
			C.parentNode.removeChild(C);
		}
	}
};
FCKDocumentProcessor.AppendNew().ProcessDocument=function(A)//设置(1)对象的'INPUT'标记的属性
{
	var B=A.getElementsByTagName('INPUT');
	var C;
	var i=B.length-1;
	while (i>=0&&(C=B[i--]))
	{
		if (C.type=='hidden')
		{
			var D=FCKDocumentProcessor_CreateFakeImage('FCK__InputHidden',C.cloneNode(true));//在(2)元素处增加(1)样式
			D.setAttribute('_fckinputhidden','true',0);
			////setAttribute 设置指定标签属性的值
			C.parentNode.insertBefore(D,C);
			//扩展parentNode指针的功能，实现一次能够操纵多个父元素
			//insertBefore() 方法在一个指定的子节点之前插入一个节点。
			C.parentNode.removeChild(C);
		}
	}
};
FCKEmbedAndObjectProcessor.AddCustomHandler(function(A,B)
													 {
														 if (!(A.nodeName.IEquals('embed')&&(A.type=='application/x-shockwave-flash'||/\.swf($|#|\?)/i.test(A.src)))) 
														 return;
														 B.className='FCK__Flash';
														 B.setAttribute('_fckflash','true',0);
													});
if (FCKBrowserInfo.IsSafari)
{
	FCKDocumentProcessor.AppendNew().ProcessDocument=function(A)
	{
		var B=A.getElementsByClassName?A.getElementsByClassName('Apple-style-span'):Array.prototype.filter.call(A.getElementsByTagName('span'),function(item){																																							return item.className=='Apple-style-span';
																																							});
for (var i=B.length-1;i>=0;i--) FCKDomTools.RemoveNode(B[i],true);}
};
var FCKSelection=FCK.Selection=
{
	GetParentBlock:function()
	{
		var A=this.GetParentElement();
		while (A)
		{
			if (FCKListsLib.BlockBoundaries[A.nodeName.toLowerCase()])
			break;
			A=A.parentNode;
		};
		return A;
	},
	ApplyStyle:function(A)
	{
		FCKStyles.ApplyStyle(new FCKStyle(A));
	}
};
FCKSelection.GetType=function()
{
	try
	{
		var A=FCKSelection.GetSelection().type;
		if (A=='Control'||A=='Text') 
		return A;
		if (this.GetSelection().createRange().parentElement) 
		return 'Text';
	}
	catch(e){};
	return 'None';
};
FCKSelection.GetSelectedElement=function()//不符
{
	if (this.GetType()=='Control')//false	true
	{//this.GetType()="text"
		var A=this.GetSelection().createRange();//=[object]		//选中单击选区
		if (A&&A.item) //=[object]
		return this.GetSelection().createRange().item(0);//=[object]
	};
	return null;
};
FCKSelection.GetParentElement=function()
{
	switch (this.GetType())
	{
		case 'Control':
		var A=FCKSelection.GetSelectedElement();
		return A?A.parentElement:null;
		case 'None':
		return null;
		default:
		return this.GetSelection().createRange().parentElement();
	}
};
FCKSelection.GetBoundaryParentElement=function(A)
{
	switch (this.GetType())
	{
		case 'Control':
		var B=FCKSelection.GetSelectedElement();
		return B?B.parentElement:null;
		case 'None':
		return null;
		default:
		var C=FCK.EditorDocument;
		var D=C.selection.createRange();
		D.collapse(A!==false);
		var B=D.parentElement();
		return FCKTools.GetElementDocument(B)==C?B:null;
	}
};
FCKSelection.SelectNode=function(A)
{
	FCK.Focus();
	this.GetSelection().empty();
	var B;
	try
	{
		B=FCK.EditorDocument.body.createControlRange();
		B.addElement(A);
	}
	catch(e)
	{
		B=FCK.EditorDocument.body.createTextRange();
		B.moveToElementText(A);
	};
	B.select();
};
FCKSelection.Collapse=function(A)
{
	FCK.Focus();
	if (this.GetType()=='Text')
	{
		var B=this.GetSelection().createRange();
		B.collapse(A==null||A===true);
		B.select();
	}
};
FCKSelection.HasAncestorNode=function(A)
{
	var B;
	if (this.GetSelection().type=="Control")
	{
		B=this.GetSelectedElement();
	}
	else
	{
		var C=this.GetSelection().createRange();
		B=C.parentElement();
	}
	while (B)
	{
		if (B.nodeName.IEquals(A)) 
		return true;
		B=B.parentNode;
	};
	return false;
};
FCKSelection.MoveToAncestorNode=function(A)
{
	var B,oRange;
	if (!FCK.EditorDocument) 
	return null;
	if (this.GetSelection().type=="Control")
	{
		oRange=this.GetSelection().createRange();
		for (i=0;i<oRange.length;i++)
		{
			if (oRange(i).parentNode)
			{
				B=oRange(i).parentNode;
				break;
			}
		}
	}
	else
	{
		oRange=this.GetSelection().createRange();
		B=oRange.parentElement();
	}
	while (B&&!B.nodeName.Equals(A))
	B=B.parentNode;
	return B;
};
FCKSelection.Delete=function()
{
	var A=this.GetSelection();
	if (A.type.toLowerCase()!="none")
	{
		A.clear();
	};
	return A;
};
FCKSelection.GetSelection=function()//选中单击选区
{
	this.Restore();
	return FCK.EditorDocument.selection;
};
FCKSelection.Save=function(A)//创建一个选择区域
{//true
	var B=FCK.EditorDocument;
	if (!B)//false
	return;
	if (this.locked)//false
	return;
	this.locked=!!A;//true
	var C=B.selection;//=[object]	
	var D;
	if (C)//true
	{
		try 
		{
			D=C.createRange();//[object]	//通过selection对象的createRange()方法基于当前被选择区域创建
		}
		catch(e) {};
		if (D)//true
		{
			if (D.parentElement&&FCKTools.GetElementDocument(D.parentElement())!=B)//false
			D=null;
			else if (D.item&&FCKTools.GetElementDocument(D.item(0))!=B)//false
			D=null;
		}
	};
	this.SelectionData=D;//定义"SelectionData"属性
};
FCKSelection._GetSelectionDocument=function(A)
{//a=[object]
	var B=A.createRange();//创建一个选择区域
	if (!B)//false
	return null;
	else if (B.item)
	return FCKTools.GetElementDocument(B.item(0));//返回元素所属的根元素
	else 
	return FCKTools.GetElementDocument(B.parentElement());//返回元素所属的根元素
};
FCKSelection.Restore=function()//设置"IsSelectionChangeLocked"属性true或false		
{
	if (this.SelectionData)//false->true
	{//设置"locked"属性为false并删除SelectionData属性
		FCK.IsSelectionChangeLocked=true;
		try
		{
			if (String(this._GetSelectionDocument(FCK.EditorDocument.selection).body.contentEditable)=='true')//false->true
			{
				FCK.IsSelectionChangeLocked=false;
				return;
			};
			this.SelectionData.select();
		}
		catch (e) {};
		FCK.IsSelectionChangeLocked=false;
	}
};
FCKSelection.Release=function()//设置"locked"属性为false并删除SelectionData属性
{
	this.locked=false;
	delete this.SelectionData;//删除SelectionData属性
};
var FCKTableHandler={};
FCKTableHandler.InsertRow=function(A)
{
	var B=FCKSelection.MoveToAncestorNode('TR');
	if (!B) return;
	var C=B.cloneNode(true);
	B.parentNode.insertBefore(C,B);
	FCKTableHandler.ClearRow(A?C:B);
};
FCKTableHandler.DeleteRows=function(A)
{
	if (!A)
	{
		var B=FCKTableHandler.GetSelectedCells();
		var C=[];
		for (var i=0;i<B.length;i++)
		{
			var D=B[i].parentNode;
			C[D.rowIndex]=D;
		};
		for (var i=C.length;i>=0;i--)
		{
			if (C[i]) 
			FCKTableHandler.DeleteRows(C[i]);
		};
		return;
	};
	var E=FCKTools.GetElementAscensor(A,'TABLE');
	if (E.rows.length==1)
	{
		FCKTableHandler.DeleteTable(E);
		return;
	};
	A.parentNode.removeChild(A);
};
FCKTableHandler.DeleteTable=function(A)
{
	if (!A)
	{
		A=FCKSelection.GetSelectedElement();
		if (!A||A.tagName!='TABLE')
		A=FCKSelection.MoveToAncestorNode('TABLE');
	};
	if (!A)
	return;
	FCKSelection.SelectNode(A);
	FCKSelection.Collapse();
	if (A.parentNode.childNodes.length==1)
	A.parentNode.parentNode.removeChild(A.parentNode);
	else 
	A.parentNode.removeChild(A);
};
FCKTableHandler.InsertColumn=function(A)
{
	var B=null;
	var C=this.GetSelectedCells();
	if (C&&C.length)
	B=C[A?0:(C.length-1)];
	if (!B) 
	return;
	var D=FCKTools.GetElementAscensor(B,'TABLE');
	var E=B.cellIndex;
	for (var i=0;i<D.rows.length;i++)
	{
		var F=D.rows[i];
		if (F.cells.length<(E+1))
		continue;
		B=F.cells[E].cloneNode(false);
		if (FCKBrowserInfo.IsGeckoLike) 
		FCKTools.AppendBogusBr(B);
		var G=F.cells[E];
		F.insertBefore(B,(A?G:G.nextSibling));
	}
};
FCKTableHandler.DeleteColumns=function(A)
{
	if (!A)
	{
		var B=FCKTableHandler.GetSelectedCells();
		for (var i=B.length;i>=0;i--)
		{
			if (B[i])
			FCKTableHandler.DeleteColumns(B[i]);
		};
		return;
	};
	if (!A) return;
	var C=FCKTools.GetElementAscensor(A,'TABLE');
	var D=A.cellIndex;
	for (var i=C.rows.length-1;i>=0;i--)
	{
		var E=C.rows[i];
		if (D==0&&E.cells.length==1)
		{
			FCKTableHandler.DeleteRows(E);
			continue;
		};
		if (E.cells[D])
		E.removeChild(E.cells[D]);
	}
};
FCKTableHandler.InsertCell=function(A,B)
{
	var C=null;
	var D=this.GetSelectedCells();
	if (D&&D.length)
	C=D[B?0:(D.length-1)];
	if (!C) 
	return null;
	var E=FCK.EditorDocument.createElement('TD');
	if (FCKBrowserInfo.IsGeckoLike) 
	FCKTools.AppendBogusBr(E);
	if (!B&&C.cellIndex==C.parentNode.cells.length-1)
	C.parentNode.appendChild(E);
	else 
	C.parentNode.insertBefore(E,B?C:C.nextSibling);
	return E;
};
FCKTableHandler.DeleteCell=function(A)
{
	if (A.parentNode.cells.length==1)
	{
		FCKTableHandler.DeleteRows(A.parentNode);
		return;
	};
	A.parentNode.removeChild(A);
};
FCKTableHandler.DeleteCells=function()
{
	var A=FCKTableHandler.GetSelectedCells();
	for (var i=A.length-1;i>=0;i--)
	{
		FCKTableHandler.DeleteCell(A[i]);
	}
};
FCKTableHandler._MarkCells=function(A,B)
{
	for (var i=0;i<A.length;i++) A[i][B]=true;
};
FCKTableHandler._UnmarkCells=function(A,B)
{
	for (var i=0;i<A.length;i++)
	{
		FCKDomTools.ClearElementJSProperty(A[i],B);
	}
};
FCKTableHandler._ReplaceCellsByMarker=function(A,B,C)
{
	for (var i=0;i<A.length;i++)
	{
		for (var j=0;j<A[i].length;j++)
		{
			if (A[i][j][B]) A[i][j]=C;
		}
	}
};
FCKTableHandler._GetMarkerGeometry=function(A,B,C,D)
{
	var E=0;
	var F=0;
	var G=0;
	var H=0;
	for (var i=C;A[B][i]&&A[B][i][D];i++)
	E++;
	for (var i=C-1;A[B][i]&&A[B][i][D];i--)
	{
		E++;G++;
	};
	for (var i=B;A[i]&&A[i][C]&&A[i][C][D];i++)
	F++;
	for (var i=B-1;A[i]&&A[i][C]&&A[i][C][D];i--)
	{
		F++;H++;
	};
	return { 'width':E,'height':F,'x':G,'y':H };
};
FCKTableHandler.CheckIsSelectionRectangular=function()
{
	var A=FCKTableHandler.GetSelectedCells();
	if (A.length<1)
	return false;
	for (var i=0;i<A.length;i++)
	{
		if (A[i].parentNode.parentNode!=A[0].parentNode.parentNode)
		return false;
	};
	this._MarkCells(A,'_CellSelected');
	var B=this._CreateTableMap(A[0]);
	var C=A[0].parentNode.rowIndex;
	var D=this._GetCellIndexSpan(B,C,A[0]);
	var E=this._GetMarkerGeometry(B,C,D,'_CellSelected');
	var F=D-E.x;
	var G=C-E.y;
	if (E.width>=E.height)
	{
		for (D=F;D<F+E.width;D++)
		{
			C=G+(D-F) % E.height;
			if (!B[C]||!B[C][D])
			{
				this._UnmarkCells(A,'_CellSelected');
				return false;
			};
			var g=this._GetMarkerGeometry(B,C,D,'_CellSelected');
			if (g.width!=E.width||g.height!=E.height)
			{
				this._UnmarkCells(A,'_CellSelected');
				return false;
			}
		}
	}
	else
	{
		for (C=G;C<G+E.height;C++)
		{
			D=F+(C-G) % E.width;
			if (!B[C]||!B[C][D])
			{
				this._UnmarkCells(A,'_CellSelected');
				return false;
			};
			var g=this._GetMarkerGeometry(B,C,D,'_CellSelected');
			if (g.width!=E.width||g.height!=E.height)
			{
				this._UnmarkCells(A,'_CellSelected');
				return false;
			}
		}
	};
	this._UnmarkCells(A,'_CellSelected');
	return true;
};
FCKTableHandler.MergeCells=function()
{
	var A=this.GetSelectedCells();
	if (A.length<2)
	return;
	var B=A[0];
	var C=this._CreateTableMap(B);
	var D=B.parentNode.rowIndex;
	var E=this._GetCellIndexSpan(C,D,B);
	this._MarkCells(A,'_SelectedCells');
	var F=this._GetMarkerGeometry(C,D,E,'_SelectedCells');
	var G=E-F.x;
	var H=D-F.y;
	var I=FCKTools.GetElementDocument(B).createDocumentFragment();
	for (var i=0;i<F.height;i++)
	{
		var J=0;
		for (var j=0;j<F.width;j++)
		{
			var K=C[H+i][G+j];
			while (K.childNodes.length>0)
			{
				var L=K.removeChild(K.firstChild);
				if (L.nodeType!=1||(L.getAttribute('type',2)!='_moz'&&L.getAttribute('_moz_dirty')!=null))
				{
					I.appendChild(L);
					J++;
				}
			}
		};
		if (J>0) 
		I.appendChild(FCK.EditorDocument.createElement('br'));
	};
	this._ReplaceCellsByMarker(C,'_SelectedCells',B);
	this._UnmarkCells(A,'_SelectedCells');
	this._InstallTableMap(C,B.parentNode.parentNode.parentNode);
	B.appendChild(I);
	if (FCKBrowserInfo.IsGeckoLike&&(!B.firstChild)) 
	FCKTools.AppendBogusBr(B);
	this._MoveCaretToCell(B,false);
};
FCKTableHandler.MergeRight=function()
{
	var A=this.GetMergeRightTarget();
	if (A==null) 
	return;
	var B=A.refCell;
	var C=A.tableMap;
	var D=A.nextCell;
	var E=FCK.EditorDocument.createDocumentFragment();
	while (D&&D.childNodes&&D.childNodes.length>0)
	E.appendChild(D.removeChild(D.firstChild));
	D.parentNode.removeChild(D);
	B.appendChild(E);
	this._MarkCells([D],'_Replace');
	this._ReplaceCellsByMarker(C,'_Replace',B);
	this._InstallTableMap(C,B.parentNode.parentNode.parentNode);
	this._MoveCaretToCell(B,false);
};
FCKTableHandler.MergeDown=function()
{
	var A=this.GetMergeDownTarget();
	if (A==null)
	return;
	var B=A.refCell;
	var C=A.tableMap;
	var D=A.nextCell;
	var E=FCKTools.GetElementDocument(B).createDocumentFragment();
	while (D&&D.childNodes&&D.childNodes.length>0)
	E.appendChild(D.removeChild(D.firstChild));
	if (E.firstChild)
	E.insertBefore(FCK.EditorDocument.createElement('br'),E.firstChild);
	B.appendChild(E);
	this._MarkCells([D],'_Replace');
	this._ReplaceCellsByMarker(C,'_Replace',B);
	this._InstallTableMap(C,B.parentNode.parentNode.parentNode);
	this._MoveCaretToCell(B,false);
};
FCKTableHandler.HorizontalSplitCell=function()
{
	var A=FCKTableHandler.GetSelectedCells();
	if (A.length!=1) 
	return;
	var B=A[0];
	var C=this._CreateTableMap(B);
	var D=B.parentNode.rowIndex;
	var E=FCKTableHandler._GetCellIndexSpan(C,D,B);
	var F=isNaN(B.colSpan)?1:B.colSpan;
	if (F>1)
	{
		var G=Math.ceil(F/2);
		var H=FCK.EditorDocument.createElement(B.nodeName);
		if (FCKBrowserInfo.IsGeckoLike)
		FCKTools.AppendBogusBr(H);
		var I=E+G;
		var J=E+F;
		var K=isNaN(B.rowSpan)?1:B.rowSpan;
		for (var r=D;r<D+K;r++)
		{
			for (var i=I;i<J;i++) 
			C[r][i]=H;
		}
	}
	else
	{
		var L=[];
		for (var i=0;i<C.length;i++)
		{
			var M=C[i].slice(0,E);
			if (C[i].length<=E)
			{
				L.push(M);
				continue;
			};
			if (C[i][E]==B)
			{
				M.push(B);
				M.push(FCK.EditorDocument.createElement(B.nodeName));
				if (FCKBrowserInfo.IsGeckoLike) 
				FCKTools.AppendBogusBr(M[M.length-1]);
			}
			else
			{
				M.push(C[i][E]);
				M.push(C[i][E]);
			};
			for (var j=E+1;j<C[i].length;j++)
			M.push(C[i][j]);
			L.push(M);
		};
		C=L;
	};
	this._InstallTableMap(C,B.parentNode.parentNode.parentNode);
};
FCKTableHandler.VerticalSplitCell=function()
{
	var A=FCKTableHandler.GetSelectedCells();
	if (A.length!=1)
	return;
	var B=A[0];
	var C=this._CreateTableMap(B);
	var D=B.parentNode.rowIndex;
	var E=FCKTableHandler._GetCellIndexSpan(C,D,B);
	var F=isNaN(B.colSpan)?1:B.colSpan;
	var G=B.rowSpan;
	if (isNaN(G)) 
	G=1;
	if (G>1)
	{
		B.rowSpan=Math.ceil(G/2);
		var H=D+Math.ceil(G/2);
		var I=C[H];
		var J=null;
		for (var i=E+1;i<I.length;i++)
		{
			if (I[i].parentNode.rowIndex==H)
			{
				J=I[i];
				break;
			}
		};
		var K=FCK.EditorDocument.createElement(B.nodeName);
		K.rowSpan=Math.floor(G/2);
		if (F>1)
		K.colSpan=F;
		if (FCKBrowserInfo.IsGeckoLike) 
		FCKTools.AppendBogusBr(K);
		B.parentNode.parentNode.parentNode.rows[H].insertBefore(K,J);
	}
	else
	{
		var L=B.parentNode.sectionRowIndex+1;
		var M=FCK.EditorDocument.createElement('tr');
		var N=B.parentNode.parentNode;
		if (N.rows.length>L) 
		N.insertBefore(M,N.rows[L]);
		else 
		N.appendChild(M);
		for (var i=0;i<C[D].length;)
		{
			var O=C[D][i].colSpan;
			if (isNaN(O)||O<1)
			O=1;
			if (i==E)
			{
				i+=O;
				continue;
			};
			var P=C[D][i].rowSpan;
			if (isNaN(P))
			P=1;
			C[D][i].rowSpan=P+1;
			i+=O;
		};
		var K=FCK.EditorDocument.createElement(B.nodeName);
		if (F>1)
		K.colSpan=F;
		if (FCKBrowserInfo.IsGeckoLike) 
		FCKTools.AppendBogusBr(K);
		M.appendChild(K);
	}
};
FCKTableHandler._GetCellIndexSpan=function(A,B,C)
{
	if (A.length<B+1)
	return null;
	var D=A[B];
	for (var c=0;c<D.length;c++)
	{
		if (D[c]==C)
		return c;
	};
	return null;
};
FCKTableHandler._GetCellLocation=function(A,B)
{
	for (var i=0;i<A.length;i++)
	{
		for (var c=0;c<A[i].length;c++)
		{
			if (A[i][c]==B) 
			return [i,c];
		}
	};
	return null;
};
FCKTableHandler._CreateTableMap=function(A)
{
	var B=(A.nodeName=='TABLE'?A:A.parentNode.parentNode.parentNode);
	var C=B.rows;
	var r=-1;
	var D=[];
	for (var i=0;i<C.length;i++)
	{
		r++;
		if (!D[r]) 
		D[r]=[];
		var c=-1;
		for (var j=0;j<C[i].cells.length;j++)
		{
			var E=C[i].cells[j];
			c++;
			while (D[r][c])
			c++;
			var F=isNaN(E.colSpan)?1:E.colSpan;
			var G=isNaN(E.rowSpan)?1:E.rowSpan;
			for (var H=0;H<G;H++)
			{
				if (!D[r+H])
				D[r+H]=[];
				for (var I=0;I<F;I++)
				{
					D[r+H][c+I]=C[i].cells[j];
				}
			};
			c+=F-1;
		}
	};
	return D;
};
FCKTableHandler._InstallTableMap=function(A,B)
{
	var C=FCKBrowserInfo.IsIE?"_fckrowspan":"rowSpan";
	for (var i=0;i<A.length;i++)
	{
		for (var j=0;j<A[i].length;j++)
		{
			var D=A[i][j];
			if (D.parentNode)
			D.parentNode.removeChild(D);
			D.colSpan=D[C]=1;
		}
	};
	var E=0;
	for (var i=0;i<A.length;i++)
	{
		for (var j=0;j<A[i].length;j++)
		{
			var D=A[i][j];
			if (!D)
			continue;
			if (j>E)
			E=j;
			if (D._colScanned===true)
			continue;
			if (A[i][j-1]==D)
			D.colSpan++;
			if (A[i][j+1]!=D)
			D._colScanned=true;
		}
	};
	for (var i=0;i<=E;i++)
	{
		for (var j=0;j<A.length;j++)
		{
			if (!A[j]) 
			continue;
			var D=A[j][i];
			if (!D||D._rowScanned===true)
			continue;
			if (A[j-1]&&A[j-1][i]==D) 
			D[C]++;
			if (!A[j+1]||A[j+1][i]!=D)
			D._rowScanned=true;
		}
	};
	for (var i=0;i<A.length;i++)
	{
		for (var j=0;j<A[i].length;j++)
		{
			var D=A[i][j];
			FCKDomTools.ClearElementJSProperty(D,'_colScanned');
			FCKDomTools.ClearElementJSProperty(D,'_rowScanned');
		}
	};
	for (var i=0;i<A.length;i++)
	{
		var I=FCK.EditorDocument.createElement('tr');
		for (var j=0;j<A[i].length;)
		{
			var D=A[i][j];
			if (A[i-1]&&A[i-1][j]==D)
			{
				j+=D.colSpan;
				continue;
			};
			I.appendChild(D);
			if (C!='rowSpan')
			{
				D.rowSpan=D[C];
				D.removeAttribute(C);
			};
			j+=D.colSpan;
			if (D.colSpan==1)
			D.removeAttribute('colspan');
			if (D.rowSpan==1) 
			D.removeAttribute('rowspan');
		};
		if (FCKBrowserInfo.IsIE)
		{
			B.rows[i].replaceNode(I);
		}
		else
		{
			B.rows[i].innerHTML='';
			FCKDomTools.MoveChildren(I,B.rows[i]);
		}
	}
};
FCKTableHandler._MoveCaretToCell=function (A,B)
{
	var C=new FCKDomRange(FCK.EditorWindow);
	C.MoveToNodeContents(A);
	C.Collapse(B);
	C.Select();
};
FCKTableHandler.ClearRow=function(A)
{
	var B=A.cells;
	for (var i=0;i<B.length;i++)
	{
		B[i].innerHTML='';
		if (FCKBrowserInfo.IsGeckoLike) 
		FCKTools.AppendBogusBr(B[i]);
	}
};
FCKTableHandler.GetMergeRightTarget=function()
{
	var A=this.GetSelectedCells();
	if (A.length!=1)
	return null;
	var B=A[0];
	var C=this._CreateTableMap(B);
	var D=B.parentNode.rowIndex;
	var E=this._GetCellIndexSpan(C,D,B);
	var F=E+(isNaN(B.colSpan)?1:B.colSpan);
	var G=C[D][F];
	if (!G)
	return null;
	this._MarkCells([B,G],'_SizeTest');
	var H=this._GetMarkerGeometry(C,D,E,'_SizeTest');
	var I=this._GetMarkerGeometry(C,D,F,'_SizeTest');
	this._UnmarkCells([B,G],'_SizeTest');
	if (H.height!=I.height||H.y!=I.y) 
	return null;
	return { 'refCell':B,'nextCell':G,'tableMap':C };
};
FCKTableHandler.GetMergeDownTarget=function()
{
	var A=this.GetSelectedCells();
	if (A.length!=1)
	return null;
	var B=A[0];
	var C=this._CreateTableMap(B);
	var D=B.parentNode.rowIndex;
	var E=this._GetCellIndexSpan(C,D,B);
	var F=D+(isNaN(B.rowSpan)?1:B.rowSpan);
	if (!C[F])
	return null;
	var G=C[F][E];
	if (!G)
	return null;
	if (B.parentNode.parentNode!=G.parentNode.parentNode) 
	return null;
	this._MarkCells([B,G],'_SizeTest');
	var H=this._GetMarkerGeometry(C,D,E,'_SizeTest');
	var I=this._GetMarkerGeometry(C,F,E,'_SizeTest');
	this._UnmarkCells([B,G],'_SizeTest');
	if (H.width!=I.width||H.x!=I.x) 
	return null;
	return { 'refCell':B,'nextCell':G,'tableMap':C };
};
FCKTableHandler.GetSelectedCells=function()
{
	if (FCKSelection.GetType()=='Control')
	{
		var A=FCKSelection.MoveToAncestorNode(['TD','TH']);
		return A?[A]:[];
	};
	var B=[];
	var C=FCKSelection.GetSelection().createRange();
	var D=FCKSelection.GetParentElement();
	if (D&&D.tagName.Equals('TD','TH'))
	B[0]=D;
	else
	{
		D=FCKSelection.MoveToAncestorNode('TABLE');
		if (D)
		{
			for (var i=0;i<D.cells.length;i++)
			{
				var E=FCK.EditorDocument.body.createTextRange();
				E.moveToElementText(D.cells[i]);
				if (C.inRange(E)||(C.compareEndPoints('StartToStart',E)>=0&&C.compareEndPoints('StartToEnd',E)<=0)||(C.compareEndPoints('EndToStart',E)>=0&&C.compareEndPoints('EndToEnd',E)<=0))
				{
					B[B.length]=D.cells[i];
				}
			}
		}
	};
	return B;
};
var FCKXml=function()
{
	this.Error=false;
};
FCKXml.GetAttribute=function(A,B,C)
{
	var D=A.attributes.getNamedItem(B);
	return D?D.value:C;
};
FCKXml.TransformToObject=function(A)
{
	if (!A)
	return null;
	var B={};
	var C=A.attributes;
	for (var i=0;i<C.length;i++)	
	{
		var D=C[i];
		B[D.name]=D.value;
	};
	var E=A.childNodes;
	for (i=0;i<E.length;i++)
	{
		var F=E[i];
		if (F.nodeType==1)
		{
			var G='$'+F.nodeName;
			var H=B[G];
			if (!H) 
			H=B[G]=[];
			H.push(this.TransformToObject(F));
		}
	};
	return B;
};
FCKXml.prototype=
{
	LoadUrl:function(A)
	{
		this.Error=false;
		var B=FCKTools.CreateXmlObject('XmlHttp');
		if (!B)
		{
			this.Error=true;
			return;
		};
		B.open("GET",A,false);
		B.send(null);
		if (B.status==200||B.status==304||(B.status==0&&B.readyState==4))
		{
			this.DOMDocument=B.responseXML;
			if (!this.DOMDocument||this.DOMDocument.firstChild==null)
			{
				this.DOMDocument=FCKTools.CreateXmlObject('DOMDocument');
				this.DOMDocument.async=false;
				this.DOMDocument.resolveExternals=false;
				this.DOMDocument.loadXML(B.responseText);
			}
		}
		else
		{
			this.DOMDocument=null;
		};
		if (this.DOMDocument==null||this.DOMDocument.firstChild==null)
		{
			this.Error=true;
			if (window.confirm('Error loading "'+A+'"\r\nDo you want to see more info?')) 
			alert('URL requested: "'+A+'"\r\nServer response:\r\nStatus: '+B.status+'\r\nResponse text:\r\n'+B.responseText);
		}
	},
	SelectNodes:function(A,B)
	{
		if (this.Error) 
		return [];
		if (B) 
		return B.selectNodes(A);
		else
		return this.DOMDocument.selectNodes(A);
	},
	SelectSingleNode:function(A,B)
	{
		if (this.Error)
		return null;
		if (B)
		return B.selectSingleNode(A);
		else
		return this.DOMDocument.selectSingleNode(A);
	}
};
var FCKNamedCommand=function(A)
{
	this.Name=A;
};
FCKNamedCommand.prototype.Execute=function()
{
	FCK.ExecuteNamedCommand(this.Name);
};
FCKNamedCommand.prototype.GetState=function()
{
	if (FCK.EditMode!=0)
	return -1;
	return FCK.GetNamedCommandState(this.Name);
};
var FCKStyleCommand=function(){};
FCKStyleCommand.prototype=
{
	Name:'Style',
	Execute:function(A,B)
	{
		FCKUndo.SaveUndoStep();
		if (B.Selected)
		FCK.Styles.RemoveStyle(B.Style);
		else
		FCK.Styles.ApplyStyle(B.Style);
		FCKUndo.SaveUndoStep();
		FCK.Focus();
		FCK.Events.FireEvent('OnSelectionChange');
	},
	GetState:function()
	{
		if (FCK.EditMode!=0||!FCK.EditorDocument)
		return -1;
		if (FCKSelection.GetType()=='Control')
		{
			var A=FCKSelection.GetSelectedElement();
			if (!A||!FCKStyles.CheckHasObjectStyle(A.nodeName.toLowerCase()))
			return -1;
		};
		return 0;
	}
};
//Max扩展，向编辑器加入任意html
var FCKMaxInsertCommand=function(A){ this.Name='MaxInsert'; this.InsertHtml=A; };
FCKMaxInsertCommand.prototype.Execute=function(){
	if(this.InsertHtml=='quote')
	{
		var quoteString = "<table style='border-right: #cccccc 1px dotted; table-layout: fixed; border-top: #cccccc 1px dotted; border-left: #cccccc 1px dotted; border-bottom: #cccccc 1px dotted' cellspacing=0 cellpadding=6 width='95%' align=center border=0>\r\n";
    quoteString += "<tr><td style='word-wrap: break-word' bgcolor='#fdfddf'>\r\n<font color='#FF0000'>&nbsp;</font><br>\r\n";
    quoteString += "</td></tr></table>\r\n";
		this.InsertHtml = quoteString;
	}
	FCK.InsertHtml(this.InsertHtml);
};
FCKMaxInsertCommand.prototype.GetState=function(){return 0;}

var FCKDialogCommand=function(A,B,C,D,E,F,G,H)//初始化
{//a="link"		b="超链接"	c="dialog/fck_link.html"	d=400	e=300	f=undefined		g=undefined		h=undefined
	this.Name=A;
	this.Title=B;
	this.Url=C;
	this.Width=D;
	this.Height=E;
	this.CustomValue=H;
	this.GetStateFunction=F;
	this.GetStateParam=G;
	this.Resizable=false;
};
FCKDialogCommand.prototype.Execute=function()
{
	FCKDialog.OpenDialog('FCKDialog_'+this.Name,this.Title,this.Url,this.Width,this.Height,this.CustomValue,null,this.Resizable);//显示按扭响应事件
	//a="FCKDialog_table"	b="表格属性"		c="dialog/fck_table.html"	d=480	e=250	f=undefined		g=null	h=false
};
FCKDialogCommand.prototype.GetState=function()
{
	if (this.GetStateFunction) 
	return this.GetStateFunction(this.GetStateParam);
	else
	return FCK.EditMode==0?0:-1;
};
var FCKUndefinedCommand=function()
{
	this.Name='Undefined';
};
FCKUndefinedCommand.prototype.Execute=function()
{
	alert(FCKLang.NotImplemented);
};
FCKUndefinedCommand.prototype.GetState=function()
{
	return 0;
};
var FCKFormatBlockCommand=function(){};
FCKFormatBlockCommand.prototype=
{
	Name:'FormatBlock',
	Execute:FCKStyleCommand.prototype.Execute,
	GetState:function()
	{
		return FCK.EditorDocument?0:-1;
	}
};
var FCKFontNameCommand=function(){};
FCKFontNameCommand.prototype=
{
	Name:'FontName',
	Execute:FCKStyleCommand.prototype.Execute,
	GetState:FCKFormatBlockCommand.prototype.GetState
};
var FCKFontSizeCommand=function(){};
FCKFontSizeCommand.prototype=
{
	Name:'FontSize',
	Execute:FCKStyleCommand.prototype.Execute,
	GetState:FCKFormatBlockCommand.prototype.GetState
};
var FCKPreviewCommand=function()
{
	this.Name='Preview';
};
FCKPreviewCommand.prototype.Execute=function()
{
	FCK.Preview();
};
FCKPreviewCommand.prototype.GetState=function()
{
	return 0;
};
var FCKSaveCommand=function()
{
	this.Name='Save';
};
FCKSaveCommand.prototype.Execute=function()
{
	alert("dddddddddddddd")
	var A=FCK.GetParentForm();
	if (typeof(A.onsubmit)=='function')
	{
		var B=A.onsubmit();
		if (B!=null&&B===false) return;
	};
	if (typeof(A.submit)=='function'){A.submit();}else{A.submit.click();}
	
};
FCKSaveCommand.prototype.GetState=function()
{
	return 0;
};
var FCKNewPageCommand=function()
{
	this.Name='NewPage';
};
FCKNewPageCommand.prototype.Execute=function()
{
	alert("分枝2")
	FCKUndo.SaveUndoStep();
	FCK.SetData('');
	FCKUndo.Typing=true;
	FCK.Focus();
};
FCKNewPageCommand.prototype.GetState=function()
{
	return 0;
};
var FCKSourceCommand=function()//设置初始值
{
	this.Name='Source';
};
FCKSourceCommand.prototype.Execute=function()//显示编辑区的内容
{
	if (FCKConfig.SourcePopup)//false	是否弹窗显视源码
	{
		var A=FCKConfig.ScreenWidth*0.65;
		var B=FCKConfig.ScreenHeight*0.65;
		FCKDialog.OpenDialog('FCKDialog_Source',FCKLang.Source,'dialog/fck_source.html',A,B,null,null,true);
	}
	else 
	FCK.SwitchEditMode();//显示编辑区的内容
};
FCKSourceCommand.prototype.GetState=function()
{
	return (FCK.EditMode==0?0:1);
};
var FCKUndoCommand=function()
{
	this.Name='Undo';
};
FCKUndoCommand.prototype.Execute=function()
{
	FCKUndo.Undo();
};
FCKUndoCommand.prototype.GetState=function()
{
	if (FCK.EditMode!=0)
	return -1;
	return (FCKUndo.CheckUndoState()?0:-1);
};
var FCKRedoCommand=function()
{
	this.Name='Redo';
};
FCKRedoCommand.prototype.Execute=function()
{
	FCKUndo.Redo();
};
FCKRedoCommand.prototype.GetState=function()
{
	if (FCK.EditMode!=0) 
	return -1;
	return (FCKUndo.CheckRedoState()?0:-1);
};
var FCKPageBreakCommand=function()
{
	this.Name='PageBreak';
};
FCKPageBreakCommand.prototype.Execute=function()
{
	FCKUndo.SaveUndoStep();
	var e=FCK.EditorDocument.createElement('DIV');
	e.style.pageBreakAfter='always';
	e.innerHTML='<span style="DISPLAY:none">&nbsp;</span>';
	var A=FCKDocumentProcessor_CreateFakeImage('FCK__PageBreak',e);
	var B=new FCKDomRange(FCK.EditorWindow);
	B.MoveToSelection();
	var C=B.SplitBlock();
	B.InsertNode(A);
	FCK.Events.FireEvent('OnSelectionChange');
};
FCKPageBreakCommand.prototype.GetState=function()
{
	if (FCK.EditMode!=0) 
	return -1;
	return 0;
};
var FCKUnlinkCommand=function()
{
	this.Name='Unlink';
};
FCKUnlinkCommand.prototype.Execute=function()
{
	FCKUndo.SaveUndoStep();
	if (FCKBrowserInfo.IsGeckoLike)
	{
		var A=FCK.Selection.MoveToAncestorNode('A');
		if (A)
		FCKTools.RemoveOuterTags(A);
		return;
	};
	FCK.ExecuteNamedCommand(this.Name);
};
FCKUnlinkCommand.prototype.GetState=function()
{
	if (FCK.EditMode!=0) 
	return -1;
	var A=FCK.GetNamedCommandState(this.Name);
	if (A==0&&FCK.EditMode==0)
	{
		var B=FCKSelection.MoveToAncestorNode('A');
		var C=(B&&B.name.length>0&&B.href.length==0);
		if (C) A=-1;
	};
	return A;
};
var FCKVisitLinkCommand=function()
{
	this.Name='VisitLink';
};
FCKVisitLinkCommand.prototype=
{
	GetState:function()
	{
		if (FCK.EditMode!=0) 
		return -1;
		var A=FCK.GetNamedCommandState('Unlink');
		if (A==0)
		{
			var B=FCKSelection.MoveToAncestorNode('A');
			if (!B.href) A=-1;
		};
		return A;
	},
	Execute:function()
	{
		var A=FCKSelection.MoveToAncestorNode('A');
		var B=A.getAttribute('_fcksavedurl')||A.getAttribute('href',2);
		if (!/:\/\//.test(B))
		{
			var C=FCKConfig.BaseHref;
			var D=FCK.GetInstanceObject('parent');
			if (!C)
			{
				C=D.document.location.href;
				C=C.substring(0,C.lastIndexOf('/')+1);
			};
			if (/^\//.test(B))
			{
				try
				{
					C=C.match(/^.*:\/\/+[^\/]+/)[0];
				}
				catch (e)
				{
					C=D.document.location.protocol+'://'+D.parent.document.location.host;
				}
			};
			B=C+B;
		};
		if (!window.open(B,'_blank')) 
		alert(FCKLang.VisitLinkBlocked);
	}
};
var FCKSelectAllCommand=function()
{
	this.Name='SelectAll';
};
FCKSelectAllCommand.prototype.Execute=function()
{
	if (FCK.EditMode==0)
	{
		FCK.ExecuteNamedCommand('SelectAll');
	}
	else
	{
		var A=FCK.EditingArea.Textarea;
		if (FCKBrowserInfo.IsIE)
		{
			A.createTextRange().execCommand('SelectAll');
		}
		else
		{
			A.selectionStart=0;
			A.selectionEnd=A.value.length;
		};
		A.focus();
	}
};
FCKSelectAllCommand.prototype.GetState=function()
{
	if (FCK.EditMode!=0)
	return -1;
	return 0;
};
var FCKPasteCommand=function()
{
	this.Name='Paste';
};
FCKPasteCommand.prototype=
{
	Execute:function()
	{
		if (FCKBrowserInfo.IsIE) 
		FCK.Paste();
		else
		FCK.ExecuteNamedCommand('Paste');
	},
	GetState:function()
	{
		if (FCK.EditMode!=0) return -1;
		return FCK.GetNamedCommandState('Paste');
	}
};
var FCKRuleCommand=function()
{
	this.Name='Rule';
};
FCKRuleCommand.prototype=
{
	Execute:function()
	{
		FCKUndo.SaveUndoStep();
		FCK.InsertElement('hr');
	},
	GetState:function()
	{
		if (FCK.EditMode!=0)
		return -1;
		return FCK.GetNamedCommandState('InsertHorizontalRule');
	}
};
var FCKCutCopyCommand=function(A)
{
	this.Name=A?'Cut':'Copy';
};
FCKCutCopyCommand.prototype=
{
	Execute:function()
	{
		var A=false;
		if (FCKBrowserInfo.IsIE)
		{
			var B=function()
			{
				A=true;
			};
			var C='on'+this.Name.toLowerCase();
			FCK.EditorDocument.body.attachEvent(C,B);
			FCK.ExecuteNamedCommand(this.Name);
			FCK.EditorDocument.body.detachEvent(C,B);
		}
		else
		{
			try
			{
				FCK.ExecuteNamedCommand(this.Name);
				A=true;
			}
			catch(e){}
		};
		if (!A)
		alert(FCKLang['PasteError'+this.Name]);
	},
	GetState:function()
	{
		return FCK.EditMode!=0?-1:FCK.GetNamedCommandState('Cut');
	}
};
var FCKAnchorDeleteCommand=function()
{
	this.Name='AnchorDelete';
};
FCKAnchorDeleteCommand.prototype=
{
	Execute:function()
	{
		if (FCK.Selection.GetType()=='Control')
		{
			FCK.Selection.Delete();
		}
		else
		{
			var A=FCK.Selection.GetSelectedElement();
			if (A)
			{
				if (A.tagName=='IMG'&&A.getAttribute('_fckanchor'))
				oAnchor=FCK.GetRealElement(A);
				else 
				A=null;
			};
			if (!A)
			{
				oAnchor=FCK.Selection.MoveToAncestorNode('A');
				if (oAnchor)
				FCK.Selection.SelectNode(oAnchor);
			};
			if (oAnchor.href.length!=0)
			{
				oAnchor.removeAttribute('name');
				if (FCKBrowserInfo.IsIE)
				oAnchor.className=oAnchor.className.replace(FCKRegexLib.FCK_Class,'');
				return;
			};
			if (A)
			{
				A.parentNode.removeChild(A);
				return;
			};
			if (oAnchor.innerHTML.length==0)
			{
				oAnchor.parentNode.removeChild(oAnchor);
				return;
			};
			FCKTools.RemoveOuterTags(oAnchor);
		};
		if (FCKBrowserInfo.IsGecko)
		FCK.Selection.Collapse(true);
	},
	GetState:function()
	{
		if (FCK.EditMode!=0) 
		return -1;
		return FCK.GetNamedCommandState('Unlink');
	}
};
var FCKDeleteDivCommand=function(){};
FCKDeleteDivCommand.prototype=
{
	GetState:function()
	{
		if (FCK.EditMode!=0) 
		return -1;
		var A=FCKSelection.GetParentElement();
		var B=new FCKElementPath(A);
		return B.BlockLimit&&B.BlockLimit.nodeName.IEquals('div')?0:-1;
	},
	Execute:function()
	{
		FCKUndo.SaveUndoStep();
		var A=FCKDomTools.GetSelectedDivContainers();
		var B=new FCKDomRange(FCK.EditorWindow);
		B.MoveToSelection();
		var C=B.CreateBookmark();
		for (var i=0;i<A.length;i++)
		FCKDomTools.RemoveNode(A[i],true);
		B.MoveToBookmark(C);
		B.Select();
	}
};
var FCKNbsp=function()
{
	this.Name='Non Breaking Space';
};
FCKNbsp.prototype=
{
	Execute:function()
	{
		FCK.InsertHtml('&nbsp;');
	},
	GetState:function()
	{
		return (FCK.EditMode!=0?-1:0);
	}
};
var FCKShowBlockCommand=function(A,B)//设置Name属性为(a),_SavedState属性为(b)
{//a="ShowBlocks"	b=0
	this.Name=A;
	if (B!=undefined)
	this._SavedState=B;
	else
	this._SavedState=null;
};
FCKShowBlockCommand.prototype.Execute=function()
{
	var A=this.GetState();
	if (A==-1)
	return;
	var B=FCK.EditorDocument.body;
	if (A==1)
	B.className=B.className.replace(/(^| )FCK__ShowBlocks/g,'');
	else
	B.className+=' FCK__ShowBlocks';
	if (FCKBrowserInfo.IsIE)
	{
		try
		{
			FCK.EditorDocument.selection.createRange().select();
		}
		catch (e){}
	}
	else
	{
		var C=FCK.EditorWindow.getSelection().focusNode;
		if (C)
		{
			if (C.nodeType!=1)
			C=C.parentNode;
			FCKDomTools.ScrollIntoView(C,false);
		}
	};
	FCK.Events.FireEvent('OnSelectionChange');
};
FCKShowBlockCommand.prototype.GetState=function()//=0	返回一个值,-1或0或1
{
	if (FCK.EditMode!=0)//false
	return -1;
	if (!FCK.EditorDocument)//false
	return 0;
	if (/FCK__ShowBlocks(?:\s|$)/.test(FCK.EditorDocument.body.className))//false
	{
		return 1;
	}
	return 0;
};
FCKShowBlockCommand.prototype.SaveState=function()//=0	设置"_SavedState"属于
{
	this._SavedState=this.GetState();//=0	返回一个值,-1或0或1
};
FCKShowBlockCommand.prototype.RestoreState=function()//不符
{
	if (this._SavedState!=null&&this.GetState()!=this._SavedState)//false
	this.Execute();
};
var FCKSpellCheckCommand=function()
{
	this.Name='SpellCheck';
	this.IsEnabled=true;
};
FCKSpellCheckCommand.prototype.Execute=function()
{
	switch (FCKConfig.SpellChecker)
	{
		case 'ieSpell':
		this._RunIeSpell();
		break;
		case 'SpellerPages':
		FCKDialog.OpenDialog('FCKDialog_SpellCheck','Spell Check','dialog/fck_spellerpages.html',440,480);
		break;
		case 'WSC':
		FCKDialog.OpenDialog('FCKDialog_SpellCheck','Spell Check','wsc/w.html',530,480);
	}
};
FCKSpellCheckCommand.prototype._RunIeSpell=function()
{
	try
	{
		var A=new ActiveXObject("ieSpell.ieSpellExtension");
		A.CheckAllLinkedDocuments(FCK.EditorDocument);
	}
	catch(e)
	{
		if(e.number==-2146827859)
		{
			if (confirm(FCKLang.IeSpellDownload))
			window.open(FCKConfig.IeSpellDownloadUrl,'IeSpellDownload');
		}
		else
		alert('Error Loading ieSpell: '+e.message+' ('+e.number+')');
	}
};
FCKSpellCheckCommand.prototype.GetState=function()
{
	if (FCK.EditMode!=0) 
	return -1;
	return this.IsEnabled?0:-1;
};
var FCKTextColorCommand=function(A)
{
	this.Name=A=='ForeColor'?'TextColor':'BGColor';
	this.Type=A;
	var B;
	if (FCKBrowserInfo.IsIE)
	B=window;
	else if (FCK.ToolbarSet._IFrame)
	B=FCKTools.GetElementWindow(FCK.ToolbarSet._IFrame);
	else
	B=window.parent;
	this._Panel=new FCKPanel(B);
	this._Panel.AppendStyleSheet(FCKConfig.SkinEditorCSS);
	this._Panel.MainNode.className='FCK_Panel';
	this._CreatePanelBody(this._Panel.Document,this._Panel.MainNode);
	FCK.ToolbarSet.ToolbarItems.GetItem(this.Name).RegisterPanel(this._Panel);
	FCKTools.DisableSelection(this._Panel.Document.body);
};
FCKTextColorCommand.prototype.Execute=function(A,B,C)
{
	this._Panel.Show(A,B,C);
};
FCKTextColorCommand.prototype.SetColor=function(A)
{
	FCKUndo.SaveUndoStep();
	var B=FCKStyles.GetStyle('_FCK_'+(this.Type=='ForeColor'?'Color':'BackColor'));
	if (!A||A.length==0) 
	FCK.Styles.RemoveStyle(B);
	else
	{
		B.SetVariable('Color',A);
		FCKStyles.ApplyStyle(B);
	};
	FCKUndo.SaveUndoStep();
	FCK.Focus();
	FCK.Events.FireEvent('OnSelectionChange');
};
FCKTextColorCommand.prototype.GetState=function()
{
	if (FCK.EditMode!=0)
	return -1;
	return 0;
};
function FCKTextColorCommand_OnMouseOver()
{
	this.className='ColorSelected';
};
function FCKTextColorCommand_OnMouseOut()
{
	this.className='ColorDeselected';
};
function FCKTextColorCommand_OnClick(A,B,C)
{
	this.className='ColorDeselected';
	B.SetColor(C);
	B._Panel.Hide();
};
function FCKTextColorCommand_AutoOnClick(A,B)
{
	this.className='ColorDeselected';
	B.SetColor('');
	B._Panel.Hide();
};
function FCKTextColorCommand_MoreOnClick(A,B)
{
	this.className='ColorDeselected';
	B._Panel.Hide();
	FCKDialog.OpenDialog('FCKDialog_Color',FCKLang.DlgColorTitle,'dialog/fck_colorselector.html',410,320,FCKTools.Bind(B,B.SetColor));
};
FCKTextColorCommand.prototype._CreatePanelBody=function(A,B)
{
	function CreateSelectionDiv()
	{
		var C=A.createElement("DIV");
		C.className='ColorDeselected';
		FCKTools.AddEventListenerEx(C,'mouseover',FCKTextColorCommand_OnMouseOver);
		FCKTools.AddEventListenerEx(C,'mouseout',FCKTextColorCommand_OnMouseOut);
		return C;
	};
	var D=B.appendChild(A.createElement("TABLE"));
	D.className='ForceBaseFont';
	D.style.tableLayout='fixed';
	D.cellPadding=0;
	D.cellSpacing=0;
	D.border=0;
	D.width=150;
	var E=D.insertRow(-1).insertCell(-1);
	E.colSpan=8;
	var C=E.appendChild(CreateSelectionDiv());
	C.innerHTML='<table cellspacing="0" cellpadding="0" width="100%" border="0">\n			<tr>\n				<td><div class="ColorBoxBorder"><div class="ColorBox" style="background-color: #000000"></div></div></td>\n				<td nowrap width="100%" align="center">'+FCKLang.ColorAutomatic+'</td>\n			</tr>\n		</table>';
	FCKTools.AddEventListenerEx(C,'click',FCKTextColorCommand_AutoOnClick,this);
	if (!FCKBrowserInfo.IsIE)
	C.style.width='96%';
	var G=FCKConfig.FontColors.toString().split(',');
	var H=0;
	while (H<G.length)
	{
		var I=D.insertRow(-1);
		for (var i=0;i<8;i++,H++)
		{
			if (H<G.length)
			{
				var J=G[H].split('/');
				var K='#'+J[0];
				var L=J[1]||K;
			};
			C=I.insertCell(-1).appendChild(CreateSelectionDiv());
			C.innerHTML='<div class="ColorBoxBorder"><div class="ColorBox" style="background-color: '+K+'"></div></div>';
			if (H>=G.length)
			C.style.visibility='hidden';
			else 
			FCKTools.AddEventListenerEx(C,'click',FCKTextColorCommand_OnClick,[this,L]);
		}
	};
	if (FCKConfig.EnableMoreFontColors)
	{
		E=D.insertRow(-1).insertCell(-1);
		E.colSpan=8;
		C=E.appendChild(CreateSelectionDiv());
		C.innerHTML='<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td nowrap align="center">'+FCKLang.ColorMoreColors+'</td></tr></table>';
		FCKTools.AddEventListenerEx(C,'click',FCKTextColorCommand_MoreOnClick,this);
	};
	if (!FCKBrowserInfo.IsIE)
	C.style.width='96%';
};
var FCKPastePlainTextCommand=function()
{
	this.Name='PasteText';
};
FCKPastePlainTextCommand.prototype.Execute=function()
{
	FCK.PasteAsPlainText();
};
FCKPastePlainTextCommand.prototype.GetState=function()
{
	if (FCK.EditMode!=0) 
	return -1;
	return FCK.GetNamedCommandState('Paste');
};
var FCKPasteWordCommand=function()
{
	this.Name='PasteWord';
};
FCKPasteWordCommand.prototype.Execute=function()
{
	FCK.PasteFromWord();
};
FCKPasteWordCommand.prototype.GetState=function()
{
	if (FCK.EditMode!=0||FCKConfig.ForcePasteAsPlainText)
	return -1;
	else
	return FCK.GetNamedCommandState('Paste');
};
var FCKTableCommand=function(A)
{
	this.Name=A;
};
FCKTableCommand.prototype.Execute=function()
{
	FCKUndo.SaveUndoStep();
	if (!FCKBrowserInfo.IsGecko)
	{
		switch (this.Name)
		{
			case 'TableMergeRight':
			return FCKTableHandler.MergeRight();
			case 'TableMergeDown':
			return FCKTableHandler.MergeDown();
		}
	};
	switch (this.Name)
	{
		case 'TableInsertRowAfter':
		return FCKTableHandler.InsertRow(false);
		case 'TableInsertRowBefore':
		return FCKTableHandler.InsertRow(true);
		case 'TableDeleteRows':
		return FCKTableHandler.DeleteRows();
		case 'TableInsertColumnAfter':
		return FCKTableHandler.InsertColumn(false);
		case 'TableInsertColumnBefore':
		return FCKTableHandler.InsertColumn(true);
		case 'TableDeleteColumns':
		return FCKTableHandler.DeleteColumns();
		case 'TableInsertCellAfter':
		return FCKTableHandler.InsertCell(null,false);
		case 'TableInsertCellBefore':
		return FCKTableHandler.InsertCell(null,true);
		case 'TableDeleteCells':
		return FCKTableHandler.DeleteCells();
		case 'TableMergeCells':
		return FCKTableHandler.MergeCells();
		case 'TableHorizontalSplitCell':
		return FCKTableHandler.HorizontalSplitCell();
		case 'TableVerticalSplitCell':
		return FCKTableHandler.VerticalSplitCell();
		case 'TableDelete':
		return FCKTableHandler.DeleteTable();
		default:
		return alert(FCKLang.UnknownCommand.replace(/%1/g,this.Name));
	}
};
FCKTableCommand.prototype.GetState=function()
{
	if (FCK.EditorDocument!=null&&FCKSelection.HasAncestorNode('TABLE'))
	{
		switch (this.Name)
		{
			case 'TableHorizontalSplitCell':
			case 'TableVerticalSplitCell':
			if (FCKTableHandler.GetSelectedCells().length==1) 
			return 0;
			else
			return -1;
			case 'TableMergeCells':
			if (FCKTableHandler.CheckIsSelectionRectangular()&&FCKTableHandler.GetSelectedCells().length>1) 
			return 0;
			else 
			return -1;
			case 'TableMergeRight':
			return FCKTableHandler.GetMergeRightTarget()?0:-1;
			case 'TableMergeDown':
			return FCKTableHandler.GetMergeDownTarget()?0:-1;
			default:
			return 0;
		}
	}
	else
	return -1;
};
var FCKFitWindow=function()
{
	this.Name='FitWindow';
};
FCKFitWindow.prototype.Execute=function()
{
	var A=window.frameElement;
	var B=A.style;
	var C=parent;
	var D=C.document.documentElement;
	var E=C.document.body;
	var F=E.style;
	var G;
	var H,oEditorScrollPos;
	if (FCK.EditMode==0)
	{
		H=new FCKDomRange(FCK.EditorWindow);
		H.MoveToSelection();
		oEditorScrollPos=FCKTools.GetScrollPosition(FCK.EditorWindow);
	}
	else
	{
		var I=FCK.EditingArea.Textarea;
		H=!FCKBrowserInfo.IsIE&&[I.selectionStart,I.selectionEnd];
		oEditorScrollPos=[I.scrollLeft,I.scrollTop];
	};
	if (!this.Ismaximized)
	{
		if(FCKBrowserInfo.IsIE)
		C.attachEvent('onresize',FCKFitWindow_Resize);
		else
		C.addEventListener('resize',FCKFitWindow_Resize,true);
		this._ScrollPos=FCKTools.GetScrollPosition(C);
		G=A;
		while((G=G.parentNode))
		{
			if (G.nodeType==1)
			{
				G._fckSavedStyles=FCKTools.SaveStyles(G);
				G.style.zIndex=FCKConfig.FloatingPanelsZIndex-1;
			}
		};
		if (FCKBrowserInfo.IsIE)
		{
			this.documentElementOverflow=D.style.overflow;
			D.style.overflow='hidden';
			F.overflow='hidden';
		}
		else
		{
			F.overflow='hidden';
			F.width='0px';
			F.height='0px';
		};
		this._EditorFrameStyles=FCKTools.SaveStyles(A);
		var J=FCKTools.GetViewPaneSize(C);
		B.position="absolute";
		A.offsetLeft;
		B.zIndex=FCKConfig.FloatingPanelsZIndex-1;
		B.left="0px";
		B.top="0px";
		B.width=J.Width+"px";
		B.height=J.Height+"px";
		if (!FCKBrowserInfo.IsIE)
		{
			B.borderRight=B.borderBottom="9999px solid white";
			B.backgroundColor="white";
		};
		C.scrollTo(0,0);
		var K=FCKTools.GetWindowPosition(C,A);
		if (K.x!=0)
		B.left=(-1*K.x)+"px";
		if (K.y!=0)
		B.top=(-1*K.y)+"px";
		this.Ismaximized=true;
	}
	else
	{
		if(FCKBrowserInfo.IsIE)
		C.detachEvent("onresize",FCKFitWindow_Resize);
		else
		C.removeEventListener("resize",FCKFitWindow_Resize,true);
		G=A;
		while((G=G.parentNode))
		{
			if (G._fckSavedStyles)
			{
				FCKTools.RestoreStyles(G,G._fckSavedStyles);
				G._fckSavedStyles=null;
			}
		};
		if (FCKBrowserInfo.IsIE)
		D.style.overflow=this.documentElementOverflow;
		FCKTools.RestoreStyles(A,this._EditorFrameStyles);
		C.scrollTo(this._ScrollPos.X,this._ScrollPos.Y);
		this.Ismaximized=false;
	};
	FCKToolbarItems.GetItem('FitWindow').RefreshState();
	if (FCK.EditMode==0)
	FCK.EditingArea.MakeEditable();
	FCK.Focus();
	if (FCK.EditMode==0)
	{
		H.Select();
		FCK.EditorWindow.scrollTo(oEditorScrollPos.X,oEditorScrollPos.Y);
	}
	else
	{
			if (!FCKBrowserInfo.IsIE)
			{
				I.selectionStart=H[0];
				I.selectionEnd=H[1];
			};
			I.scrollLeft=oEditorScrollPos[0];
			I.scrollTop=oEditorScrollPos[1];
		}
};
FCKFitWindow.prototype.GetState=function()
{
	if (FCKConfig.ToolbarLocation!='In')
	return -1;
	else 
	return (this.Ismaximized?1:0);
};
function FCKFitWindow_Resize()
{
	var A=FCKTools.GetViewPaneSize(parent);
	var B=window.frameElement.style;
	B.width=A.Width+'px';
	B.height=A.Height+'px';
};
var FCKListCommand=function(A,B)
{
	this.Name=A;
	this.TagName=B;
};
FCKListCommand.prototype=
{
	GetState:function()
	{
		if (FCK.EditMode!=0||!FCK.EditorWindow)
		return -1;
		var A=FCKSelection.GetBoundaryParentElement(true);
		var B=A;
		while (B)
		{
			if (B.nodeName.IEquals(['ul','ol']))
			break;
			B=B.parentNode;
		};
		if (B&&B.nodeName.IEquals(this.TagName))
		return 1;
		else 
		return 0;
	},
	Execute:function()
	{
		FCKUndo.SaveUndoStep();
		var A=FCK.EditorDocument;
		var B=new FCKDomRange(FCK.EditorWindow);
		B.MoveToSelection();
		var C=this.GetState();
		if (C==0)
		{
			FCKDomTools.TrimNode(A.body);
			if (!A.body.firstChild)
			{
				var D=A.createElement('p');
				A.body.appendChild(D);
				B.MoveToNodeContents(D);
			}
		};
		var E=B.CreateBookmark();
		var F=[];
		var G={};
		var H=new FCKDomRangeIterator(B);
		var I;
		H.ForceBrBreak=(C==0);
		var J=true;
		var K=null;
		while (J)
		{
			while ((I=H.GetNextParagraph()))
			{
				var L=new FCKElementPath(I);
				var M=null;
				var N=false;
				var O=L.BlockLimit;
				for (var i=L.Elements.length-1;i>=0;i--)
				{
					var P=L.Elements[i];
					if (P.nodeName.IEquals(['ol','ul']))
					{
						if (O._FCK_ListGroupObject)
						O._FCK_ListGroupObject=null;
						var Q=P._FCK_ListGroupObject;
						if (Q) Q.contents.push(I);
						else
						{
							Q={ 'root':P,'contents':[I] };
							F.push(Q);
							FCKDomTools.SetElementMarker(G,P,'_FCK_ListGroupObject',Q);
						};
						N=true;
						break;
					}
				};
				if (N)
				continue;
				var R=O;
				if (R._FCK_ListGroupObject) 
				R._FCK_ListGroupObject.contents.push(I);
				else
				{
					var Q={ 'root':R,'contents':[I] };
					FCKDomTools.SetElementMarker(G,R,'_FCK_ListGroupObject',Q);
					F.push(Q);
				}
			};
			if (FCKBrowserInfo.IsIE) 
			J=false;
			else
			{
				if (K==null)
				{
					K=[];
					var T=FCKSelection.GetSelection();
					if (T&&F.length==0)
					K.push(T.getRangeAt(0));
					for (var i=1;T&&i<T.rangeCount;i++) 
					K.push(T.getRangeAt(i));
				};
				if (K.length<1)
				J=false;
				else
				{
					var U=FCKW3CRange.CreateFromRange(A,K.shift());
					B._Range=U;
					B._UpdateElementInfo();
					if (B.StartNode.nodeName.IEquals('td'))
					B.SetStart(B.StartNode,1);
					if (B.EndNode.nodeName.IEquals('td')) 
					B.SetEnd(B.EndNode,2);
					H=new FCKDomRangeIterator(B);
					H.ForceBrBreak=(C==0);
				}
			}
		};
		var W=[];
		while (F.length>0)
		{
			var Q=F.shift();
			if (C==0)
			{
				if (Q.root.nodeName.IEquals(['ul','ol'])) 
				this._ChangeListType(Q,G,W);
				else
				this._CreateList(Q,W);
			}
			else if (C==1&&Q.root.nodeName.IEquals(['ul','ol']))
			this._RemoveList(Q,G);
		};
		for (var i=0;i<W.length;i++)
		{
			var M=W[i];
			var Z=false;
			var a=M;
			while (!Z)
			{
				a=a.nextSibling;
				if (a&&a.nodeType==3&&a.nodeValue.search(/^[\n\r\t ]*$/)==0) 
				continue;
				Z=true;
			};
			if (a&&a.nodeName.IEquals(this.TagName))
			{
				a.parentNode.removeChild(a);
				while (a.firstChild) 
				M.appendChild(a.removeChild(a.firstChild));
			};
			Z=false;
			a=M;
			while (!Z)
			{
				a=a.previousSibling;
				if (a&&a.nodeType==3&&a.nodeValue.search(/^[\n\r\t ]*$/)==0)
				continue;
				Z=true;
			};
			if (a&&a.nodeName.IEquals(this.TagName))
			{
				a.parentNode.removeChild(a);
				while (a.lastChild) 
				M.insertBefore(a.removeChild(a.lastChild),M.firstChild);
			}
		};
		FCKDomTools.ClearAllMarkers(G);
		B.MoveToBookmark(E);
		B.Select();
		FCK.Focus();
		FCK.Events.FireEvent('OnSelectionChange');
	},
	_ChangeListType:function(A,B,C)
	{
		var D=FCKDomTools.ListToArray(A.root,B);
		var E=[];
		for (var i=0;i<A.contents.length;i++)
		{
			var F=A.contents[i];
			F=FCKTools.GetElementAscensor(F,'li');
			if (!F||F._FCK_ListItem_Processed)
			continue;
			E.push(F);
			FCKDomTools.SetElementMarker(B,F,'_FCK_ListItem_Processed',true);
		};
		var G=FCKTools.GetElementDocument(A.root).createElement(this.TagName);
		for (var i=0;i<E.length;i++)
		{
			var H=E[i]._FCK_ListArray_Index;
			D[H].parent=G;
		};
		var I=FCKDomTools.ArrayToList(D,B);
		for (var i=0;i<I.listNode.childNodes.length;i++)
		{
			if (I.listNode.childNodes[i].nodeName.IEquals(this.TagName))
			C.push(I.listNode.childNodes[i]);
		};
		A.root.parentNode.replaceChild(I.listNode,A.root);
	},
	_CreateList:function(A,B)
	{
		var C=A.contents;
		var D=FCKTools.GetElementDocument(A.root);
		var E=[];
		if (C.length==1&&C[0]==A.root)
		{
			var F=D.createElement('div');
			while (C[0].firstChild)
			F.appendChild(C[0].removeChild(C[0].firstChild));
			C[0].appendChild(F);
			C[0]=F;
		};
		var G=A.contents[0].parentNode;
		for (var i=0;i<C.length;i++) 
		G=FCKDomTools.GetCommonParents(G,C[i].parentNode).pop();
		for (var i=0;i<C.length;i++)
		{
			var H=C[i];
			while (H.parentNode)
			{
				if (H.parentNode==G)
				{
					E.push(H);
					break;
				};
				H=H.parentNode;
			}
		};
		if (E.length<1) 
		return;
		var I=E[E.length-1].nextSibling;
		var J=D.createElement(this.TagName);
		B.push(J);
		while (E.length)
		{
			var K=E.shift();
			var L=D.createDocumentFragment();
			while (K.firstChild)
			L.appendChild(K.removeChild(K.firstChild));
			K.parentNode.removeChild(K);
			var M=D.createElement('li');
			M.appendChild(L);
			J.appendChild(M);
		};
		G.insertBefore(J,I);
	},
	_RemoveList:function(A,B)
	{
		var C=FCKDomTools.ListToArray(A.root,B);
		var D=[];
		for (var i=0;i<A.contents.length;i++)
		{
			var E=A.contents[i];
			E=FCKTools.GetElementAscensor(E,'li');
			if (!E||E._FCK_ListItem_Processed)
			continue;
			D.push(E);
			FCKDomTools.SetElementMarker(B,E,'_FCK_ListItem_Processed',true);
		};
		var F=null;
		for (var i=0;i<D.length;i++)
		{
			var G=D[i]._FCK_ListArray_Index;
			C[G].indent=-1;
			F=G;
		};
		for (var i=F+1;i<C.length;i++)
		{
			if (C[i].indent>C[i-1].indent+1)
			{
				var H=C[i-1].indent+1-C[i].indent;
				var I=C[i].indent;
				while (C[i]&&C[i].indent>=I)
				{
					C[i].indent+=H;
					i++;
				};
				i--;
			}
		};
		var J=FCKDomTools.ArrayToList(C,B);
		if (A.root.nextSibling==null||A.root.nextSibling.nodeName.IEquals('br'))
		{
			if (J.listNode.lastChild.nodeName.IEquals('br'))
			J.listNode.removeChild(J.listNode.lastChild);
		};
		A.root.parentNode.replaceChild(J.listNode,A.root);
	}
};
var FCKJustifyCommand=function(A)
{
	this.AlignValue=A;
	var B=FCKConfig.ContentLangDirection.toLowerCase();
	this.IsDefaultAlign=(A=='left'&&B=='ltr')||(A=='right'&&B=='rtl');
	var C=this._CssClassName=(function()
									   {
										   var D=FCKConfig.JustifyClasses;
										   if (D)
										   {
											   switch (A)
											   {
												   case 'left':
												   return D[0]||null;
												   case 'center':
												   return D[1]||null;
												   case 'right':
												   return D[2]||null;
												   case 'justify':
												   return D[3]||null;
												}
											};
											return null;
										})();
	if (C&&C.length>0)
	this._CssClassRegex=new RegExp('(?:^|\\s+)'+C+'(?=$|\\s)');
};
FCKJustifyCommand._GetClassNameRegex=function()
{
	var A=FCKJustifyCommand._ClassRegex;
	if (A!=undefined)
	return A;var B=[];
	var C=FCKConfig.JustifyClasses;
	if (C)
	{
		for (var i=0;i<4;i++)
		{
			var D=C[i];
			if (D&&D.length>0) 
			B.push(D);
		}
	};
	if (B.length>0)
	A=new RegExp('(?:^|\\s+)(?:'+B.join('|')+')(?=$|\\s)');
	else 
	A=null;
	return FCKJustifyCommand._ClassRegex=A;
};
FCKJustifyCommand.prototype=
{
	Execute:function()
	{
		FCKUndo.SaveUndoStep();
		var A=new FCKDomRange(FCK.EditorWindow);
		A.MoveToSelection();
		var B=this.GetState();
		if (B==-1)
		return;
		var C=A.CreateBookmark();
		var D=this._CssClassName;
		var E=new FCKDomRangeIterator(A);
		var F;
		while ((F=E.GetNextParagraph()))
		{
			F.removeAttribute('align');
			if (D)
			{
				var G=F.className.replace(FCKJustifyCommand._GetClassNameRegex(),'');
				if (B==0)
				{
					if (G.length>0)
					G+=' ';
					F.className=G+D;
				}
				else if (G.length==0)
				FCKDomTools.RemoveAttribute(F,'class');
			}
			else
			{
				var H=F.style;
				if (B==0) 
				H.textAlign=this.AlignValue;
				else
				{
					H.textAlign='';
					if (H.cssText.length==0)
					F.removeAttribute('style');
				}
			}
		};
		A.MoveToBookmark(C);
		A.Select();
		FCK.Focus();
		FCK.Events.FireEvent('OnSelectionChange');
	},
	GetState:function()
	{
		if (FCK.EditMode!=0||!FCK.EditorWindow) 
		return -1;
		var A=new FCKElementPath(FCKSelection.GetBoundaryParentElement(true));
		var B=A.Block||A.BlockLimit;
		if (!B||B.nodeName.toLowerCase()=='body')
		return 0;
		var C;
		if (FCKBrowserInfo.IsIE) 
		C=B.currentStyle.textAlign;
		else
		C=FCK.EditorWindow.getComputedStyle(B,'').getPropertyValue('text-align');
		C=C.replace(/(-moz-|-webkit-|start|auto)/i,'');
		if ((!C&&this.IsDefaultAlign)||C==this.AlignValue) 
		return 1;
		return 0;
	}
};
var FCKIndentCommand=function(A,B)
{
	this.Name=A;
	this.Offset=B;
	this.IndentCSSProperty=FCKConfig.ContentLangDirection.IEquals('ltr')?'marginLeft':'marginRight';
};
FCKIndentCommand._InitIndentModeParameters=function()
{
	if (FCKConfig.IndentClasses&&FCKConfig.IndentClasses.length>0)
	{
		this._UseIndentClasses=true;
		this._IndentClassMap={};
		for (var i=0;i<FCKConfig.IndentClasses.length;i++)
		this._IndentClassMap[FCKConfig.IndentClasses[i]]=i+1;
		this._ClassNameRegex=new RegExp('(?:^|\\s+)('+FCKConfig.IndentClasses.join('|')+')(?=$|\\s)');
	}
	else
	this._UseIndentClasses=false;
};
FCKIndentCommand.prototype=
{
	Execute:function()
	{
		FCKUndo.SaveUndoStep();
		var A=new FCKDomRange(FCK.EditorWindow);
		A.MoveToSelection();
		var B=A.CreateBookmark();
		var C=FCKDomTools.GetCommonParentNode(A.StartNode||A.StartContainer,A.EndNode||A.EndContainer,['ul','ol']);
		if (C) 
		this._IndentList(A,C);
		else 
		this._IndentBlock(A);
		A.MoveToBookmark(B);
		A.Select();
		FCK.Focus();
		FCK.Events.FireEvent('OnSelectionChange');
	},
	GetState:function()
	{
		if (FCK.EditMode!=0||!FCK.EditorWindow)
		return -1;
		if (FCKIndentCommand._UseIndentClasses==undefined)
		FCKIndentCommand._InitIndentModeParameters();
		var A=FCKSelection.GetBoundaryParentElement(true);
		var B=FCKSelection.GetBoundaryParentElement(false);
		var C=FCKDomTools.GetCommonParentNode(A,B,['ul','ol']);
		if (C)
		{
			if (this.Name.IEquals('outdent')) 
			return 0;
			var D=FCKTools.GetElementAscensor(A,'li');
			if (!D||!D.previousSibling) return -1;return 0;
		};
		if (!FCKIndentCommand._UseIndentClasses&&this.Name.IEquals('indent'))
		return 0;
		var E=new FCKElementPath(A);
		var F=E.Block||E.BlockLimit;
		if (!F) return -1;
		if (FCKIndentCommand._UseIndentClasses)
		{
			var G=F.className.match(FCKIndentCommand._ClassNameRegex);
			var H=0;
			if (G!=null)
			{
				G=G[1];
				H=FCKIndentCommand._IndentClassMap[G];
			};
			if ((this.Name=='outdent'&&H==0)||(this.Name=='indent'&&H==FCKConfig.IndentClasses.length))
			return -1;
			return 0;
		}
		else
		{
			var I=parseInt(F.style[this.IndentCSSProperty],10);
			if (isNaN(I))
			I=0;
			if (I<=0) return -1;
			return 0;
		}
	},
	_IndentBlock:function(A)
	{
		var B=new FCKDomRangeIterator(A);
		B.EnforceRealBlocks=true;
		A.Expand('block_contents');
		var C=FCKDomTools.GetCommonParents(A.StartContainer,A.EndContainer);
		var D=C[C.length-1];
		var E;
		while ((E=B.GetNextParagraph()))
		{
			if (!(E==D||E.parentNode==D)) 
			continue;
			if (FCKIndentCommand._UseIndentClasses)
			{
				var F=E.className.match(FCKIndentCommand._ClassNameRegex);
				var G=0;
				if (F!=null)
				{
					F=F[1];
					G=FCKIndentCommand._IndentClassMap[F];
				};
				if (this.Name.IEquals('outdent')) 
				G--;
				else if (this.Name.IEquals('indent'))
				G++;
				G=Math.min(G,FCKConfig.IndentClasses.length);
				G=Math.max(G,0);
				var H=E.className.replace(FCKIndentCommand._ClassNameRegex,'');
				if (G<1)
				E.className=H;
				else 
				E.className=(H.length>0?H+' ':'')+FCKConfig.IndentClasses[G-1];
			}
			else
			{
				var I=parseInt(E.style[this.IndentCSSProperty],10);
				if (isNaN(I)) I=0;
				I+=this.Offset;
				I=Math.max(I,0);
				I=Math.ceil(I/this.Offset)*this.Offset;E.style[this.IndentCSSProperty]=I?I+FCKConfig.IndentUnit:'';
				if (E.getAttribute('style')=='') 
				E.removeAttribute('style');
			}
		}
	},
	_IndentList:function(A,B)
	{
		var C=A.StartContainer;
		var D=A.EndContainer;
		while (C&&C.parentNode!=B)
		C=C.parentNode;
		while (D&&D.parentNode!=B)
		D=D.parentNode;
		if (!C||!D)
		return;
		var E=C;
		var F=[];
		var G=false;
		while (G==false)
		{
			if (E==D)
			G=true;
			F.push(E);
			E=E.nextSibling;
		};
		if (F.length<1) 
		return;
		var H=FCKDomTools.GetParents(B);
		for (var i=0;i<H.length;i++)
		{
			if (H[i].nodeName.IEquals(['ul','ol']))
			{
				B=H[i];
				break;
			}
		};
		var I=this.Name.IEquals('indent')?1:-1;
		var J=F[0];
		var K=F[F.length-1];
		var L={};
		var M=FCKDomTools.ListToArray(B,L);
		var N=M[K._FCK_ListArray_Index].indent;
		for (var i=J._FCK_ListArray_Index;i<=K._FCK_ListArray_Index;i++) 
		M[i].indent+=I;
		for (var i=K._FCK_ListArray_Index+1;i<M.length&&M[i].indent>N;i++) 
		M[i].indent+=I;
		var O=FCKDomTools.ArrayToList(M);
		if (O) B.parentNode.replaceChild(O.listNode,B);
		FCKDomTools.ClearAllMarkers(L);
	}
};
var FCKBlockQuoteCommand=function(){};
FCKBlockQuoteCommand.prototype=
{
	Execute:function()
	{
		FCKUndo.SaveUndoStep();
		var A=this.GetState();
		var B=new FCKDomRange(FCK.EditorWindow);
		B.MoveToSelection();
		var C=B.CreateBookmark();
		if (FCKBrowserInfo.IsIE)
		{
			var D=B.GetBookmarkNode(C,true);
			var E=B.GetBookmarkNode(C,false);
			var F;
			if (D&&D.parentNode.nodeName.IEquals('blockquote')&&!D.previousSibling)
			{
				F=D;
				while ((F=F.nextSibling))
				{
					if (FCKListsLib.BlockElements[F.nodeName.toLowerCase()])
					FCKDomTools.MoveNode(D,F,true);
				}
			};
			if (E&&E.parentNode.nodeName.IEquals('blockquote')&&!E.previousSibling)
			{
				F=E;while ((F=F.nextSibling))
				{
					if (FCKListsLib.BlockElements[F.nodeName.toLowerCase()])
					{
						if (F.firstChild==D)
						FCKDomTools.InsertAfterNode(D,E);
						else 
						FCKDomTools.MoveNode(E,F,true);
					}
				}
			}
		};
		var G=new FCKDomRangeIterator(B);
		var H;
		if (A==0)
		{
			var I=[];
			while ((H=G.GetNextParagraph()))
			I.push(H);
			if (I.length<1)
			{
				para=B.Window.document.createElement(FCKConfig.EnterMode.IEquals('p')?'p':'div');
				B.InsertNode(para);
				para.appendChild(B.Window.document.createTextNode('\ufeff'));
				B.MoveToBookmark(C);
				B.MoveToNodeContents(para);
				B.Collapse(true);
				C=B.CreateBookmark();
				I.push(para);
			};
			var J=I[0].parentNode;
			var K=[];
			for (var i=0;i<I.length;i++)
			{
				H=I[i];J=FCKDomTools.GetCommonParents(H.parentNode,J).pop();
			}
			while (J.nodeName.IEquals('table','tbody','tr','ol','ul'))
			J=J.parentNode;
			var L=null;
			while (I.length>0)
			{
				H=I.shift();
				while (H.parentNode!=J)
				H=H.parentNode;
				if (H!=L)
				K.push(H);
				L=H;
			}
			while (K.length>0)
			{
				H=K.shift();
				if (H.nodeName.IEquals('blockquote'))
				{
					var M=FCKTools.GetElementDocument(H).createDocumentFragment();
					while (H.firstChild)
					{
						M.appendChild(H.removeChild(H.firstChild));
						I.push(M.lastChild);
					};
					H.parentNode.replaceChild(M,H);
				}
				else
				I.push(H);
			};
			var N=B.Window.document.createElement('blockquote');
			J.insertBefore(N,I[0]);
			while (I.length>0)
			{
				H=I.shift();
				N.appendChild(H);
			}
		}
		else if (A==1)
		{
			var O=[];
			var P={};
			while ((H=G.GetNextParagraph()))
			{
				var Q=null;
				var R=null;
				while (H.parentNode)
				{
					if (H.parentNode.nodeName.IEquals('blockquote'))
					{
						Q=H.parentNode;
						R=H;break;
					};
					H=H.parentNode;
				};
				if (Q&&R&&!R._fckblockquotemoveout)
				{
					O.push(R);FCKDomTools.SetElementMarker(P,R,'_fckblockquotemoveout',true);
				}
			};
			FCKDomTools.ClearAllMarkers(P);
			var S=[];var T=[],P={};
			var U=function(N)
			{
				for (var i=0;i<N.childNodes.length;i++)
				{
					if (FCKListsLib.BlockElements[N.childNodes[i].nodeName.toLowerCase()])
					return false;
				};
				return true;
			};
			while (O.length>0)
			{
				var W=O.shift();
				var N=W.parentNode;
				if (W==W.parentNode.firstChild)
				N.parentNode.insertBefore(N.removeChild(W),N);
				else
				if (W==W.parentNode.lastChild)
				N.parentNode.insertBefore(N.removeChild(W),N.nextSibling);
				else
				FCKDomTools.BreakParent(W,W.parentNode,B);
				if (!N._fckbqprocessed)
				{
					T.push(N);
					FCKDomTools.SetElementMarker(P,N,'_fckbqprocessed',true);
				};
				S.push(W);
			};
			for (var i=T.length-1;i>=0;i--)
			{
				var N=T[i];
				if (U(N))
				FCKDomTools.RemoveNode(N);
			};
			FCKDomTools.ClearAllMarkers(P);
			if (FCKConfig.EnterMode.IEquals('br'))
			{
				while (S.length)
				{
					var W=S.shift();
					var a=true;
					if (W.nodeName.IEquals('div'))
					{
						var M=FCKTools.GetElementDocument(W).createDocumentFragment();
						var c=a&&W.previousSibling&&!FCKListsLib.BlockBoundaries[W.previousSibling.nodeName.toLowerCase()];
						if (a&&c)
						M.appendChild(FCKTools.GetElementDocument(W).createElement('br'));
						var d=W.nextSibling&&!FCKListsLib.BlockBoundaries[W.nextSibling.nodeName.toLowerCase()];
						while (W.firstChild)
						M.appendChild(W.removeChild(W.firstChild));
						if (d)
						M.appendChild(FCKTools.GetElementDocument(W).createElement('br'));
						W.parentNode.replaceChild(M,W);a=false;
					}
				}
			}
		};
		B.MoveToBookmark(C);
		B.Select();
		FCK.Focus();
		FCK.Events.FireEvent('OnSelectionChange');
	},
	GetState:function()
	{
		if (FCK.EditMode!=0||!FCK.EditorWindow)
		return -1;
		var A=new FCKElementPath(FCKSelection.GetBoundaryParentElement(true));
		var B=A.Block||A.BlockLimit;
		if (!B||B.nodeName.toLowerCase()=='body')
		return 0;
		for (var i=0;i<A.Elements.length;i++)
		{
			if (A.Elements[i].nodeName.IEquals('blockquote')) return 1;
		};
		return 0;
	}
};
var FCKCoreStyleCommand=function(A)
{
	this.Name='CoreStyle';
	this.StyleName='_FCK_'+A;
	this.IsActive=false;
	FCKStyles.AttachStyleStateChange(this.StyleName,this._OnStyleStateChange,this);
};
FCKCoreStyleCommand.prototype=
{
	Execute:function()
	{
		FCKUndo.SaveUndoStep();
		if (this.IsActive) 
		FCKStyles.RemoveStyle(this.StyleName);
		else 
		FCKStyles.ApplyStyle(this.StyleName);
		FCK.Focus();
		FCK.Events.FireEvent('OnSelectionChange');
	},
	GetState:function()
	{
		if (FCK.EditMode!=0) return -1;
		return this.IsActive?1:0;
	},
	_OnStyleStateChange:function(A,B)
	{
		this.IsActive=B;
	}
};
var FCKRemoveFormatCommand=function()
{
	this.Name='RemoveFormat';
};
FCKRemoveFormatCommand.prototype=
{
	Execute:function()
	{
		FCKStyles.RemoveAll();
		FCK.Focus();
		FCK.Events.FireEvent('OnSelectionChange');
	},
	GetState:function()
	{
		return FCK.EditorWindow?0:-1;
	}
};
var FCKCommands=FCK.Commands={};
FCKCommands.LoadedCommands={};
FCKCommands.RegisterCommand=function(A,B)//以(a)为下标将(b)存入"LoadedCommands"数组中
{
	this.LoadedCommands[A]=B;
};
FCKCommands.GetCommand=function(A)//动态选择对象并初始化
{
	//a="Source"
	var B=FCKCommands.LoadedCommands[A];//=[object Object]	
	if (B) return B;//true
	switch (A)
	{
		case 'Bold':
		case 'Italic':
		case 'Underline':
		case 'StrikeThrough':
		case 'Subscript':
		case 'Superscript':
		B=new FCKCoreStyleCommand(A);
		break;
		case 'RemoveFormat':
		B=new FCKRemoveFormatCommand();
		break;
		case 'DocProps':
		B=new FCKDialogCommand('DocProps',FCKLang.DocProps,'dialog/fck_docprops.html',400,380,FCKCommands.GetFullPageState);
		break;
		case 'Templates':
		B=new FCKDialogCommand('Templates',FCKLang.DlgTemplatesTitle,'dialog/fck_template.html',380,450);
		break;
		case 'Link':
		B=new FCKDialogCommand('Link',FCKLang.DlgLnkWindowTitle,'dialog/fck_link.html',400,300);
		break;
		case 'Unlink':
		B=new FCKUnlinkCommand();
		break;
		case 'VisitLink':
		B=new FCKVisitLinkCommand();
		break;
		case 'Anchor':
		B=new FCKDialogCommand('Anchor',FCKLang.DlgAnchorTitle,'dialog/fck_anchor.html',370,160);
		break;
		case 'AnchorDelete':
		B=new FCKAnchorDeleteCommand();
		break;
		case 'BulletedList':
		B=new FCKDialogCommand('BulletedList',FCKLang.BulletedListProp,'dialog/fck_listprop.html?UL',370,160);
		break;
		case 'NumberedList':
		B=new FCKDialogCommand('NumberedList',FCKLang.NumberedListProp,'dialog/fck_listprop.html?OL',370,160);
		break;
		case 'About':
		B=new FCKDialogCommand('About',FCKLang.About,'dialog/fck_about.html',420,330,function(){ return 0;});
		break;
		case 'Find':
		B=new FCKDialogCommand('Find',FCKLang.DlgFindAndReplaceTitle,'dialog/fck_replace.html',340,230,null,null,'Find');
		break;
		case 'Replace':
		B=new FCKDialogCommand('Replace',FCKLang.DlgFindAndReplaceTitle,'dialog/fck_replace.html',340,230,null,null,'Replace');
		break;
		case 'Image':
		B=new FCKDialogCommand('Image',FCKLang.DlgImgTitle,'dialog/fck_image.html',450,390);
		break;
		case 'Flash':
		B=new FCKDialogCommand('Flash',FCKLang.DlgFlashTitle,'dialog/fck_flash.html',450,390);
		break;
		case 'MaxPage':
		B=new FCKMaxInsertCommand('#p#副标题#e#');break;
		case 'SpecialChar':
		B=new FCKDialogCommand('SpecialChar',FCKLang.DlgSpecialCharTitle,'dialog/fck_specialchar.html',400,290);
		break;
		case 'Smiley':
		B=new FCKDialogCommand('Smiley',FCKLang.DlgSmileyTitle,'dialog/fck_smiley.html',FCKConfig.SmileyWindowWidth,FCKConfig.SmileyWindowHeight);
		break;
		case 'Table':
		B=new FCKDialogCommand('Table',FCKLang.DlgTableTitle,'dialog/fck_table.html',480,250);
		//b="表格属性"
		break;
		case 'TableProp':
		B=new FCKDialogCommand('Table',FCKLang.DlgTableTitle,'dialog/fck_table.html?Parent',480,250);
		break;
		case 'TableCellProp':
		B=new FCKDialogCommand('TableCell',FCKLang.DlgCellTitle,'dialog/fck_tablecell.html',550,240);
		break;
		case 'Style':
		B=new FCKStyleCommand();
		break;
		case 'FontName':
		B=new FCKFontNameCommand();
		break;
		case 'FontSize':
		B=new FCKFontSizeCommand();
		break;
		case 'FontFormat':
		B=new FCKFormatBlockCommand();
		break;
		case 'Source':
		B=new FCKSourceCommand();
		break;
		case 'Preview':
		B=new FCKPreviewCommand();
		break;
		case 'Save':
		B=new FCKSaveCommand();
		break;
		case 'NewPage':
		B=new FCKNewPageCommand();
		break;
		case 'PageBreak':
		B=new FCKPageBreakCommand();
		break;
		case 'Rule':
		B=new FCKRuleCommand();
		break;
		case 'Nbsp':
		B=new FCKNbsp();
		break;
		case 'TextColor':
		B=new FCKTextColorCommand('ForeColor');
		break;
		case 'BGColor':
		B=new FCKTextColorCommand('BackColor');
		break;
		case 'Paste':
		B=new FCKPasteCommand();
		break;
		case 'PasteText':
		B=new FCKPastePlainTextCommand();
		break;
		case 'PasteWord':
		B=new FCKPasteWordCommand();
		break;
		case 'JustifyLeft':
		B=new FCKJustifyCommand('left');
		break;
		case 'JustifyCenter':
		B=new FCKJustifyCommand('center');
		break;
		case 'JustifyRight':
		B=new FCKJustifyCommand('right');
		break;
		case 'JustifyFull':
		B=new FCKJustifyCommand('justify');
		break;
		case 'Indent':
		B=new FCKIndentCommand('indent',FCKConfig.IndentLength);
		break;
		case 'Outdent':
		B=new FCKIndentCommand('outdent',FCKConfig.IndentLength*-1);
		break;
		case 'Blockquote':
		B=new FCKBlockQuoteCommand();
		break;
		case 'CreateDiv':
		B=new FCKDialogCommand('CreateDiv',FCKLang.CreateDiv,'dialog/fck_div.html',380,210,null,null,true);
		break;
		case 'EditDiv':
		B=new FCKDialogCommand('EditDiv',FCKLang.EditDiv,'dialog/fck_div.html',380,210,null,null,false);
		break;
		case 'DeleteDiv':
		B=new FCKDeleteDivCommand();
		break;
		case 'TableInsertRowAfter':
		B=new FCKTableCommand('TableInsertRowAfter');
		break;
		case 'TableInsertRowBefore':
		B=new FCKTableCommand('TableInsertRowBefore');
		break;
		case 'TableDeleteRows':
		B=new FCKTableCommand('TableDeleteRows');
		break;
		case 'TableInsertColumnAfter':
		B=new FCKTableCommand('TableInsertColumnAfter');
		break;
		case 'TableInsertColumnBefore':
		B=new FCKTableCommand('TableInsertColumnBefore');
		break;
		case 'TableDeleteColumns':
		B=new FCKTableCommand('TableDeleteColumns');
		break;
		case 'TableInsertCellAfter':
		B=new FCKTableCommand('TableInsertCellAfter');
		break;
		case 'TableInsertCellBefore':
		B=new FCKTableCommand('TableInsertCellBefore');
		break;
		case 'TableDeleteCells':
		B=new FCKTableCommand('TableDeleteCells');
		break;
		case 'TableMergeCells':
		B=new FCKTableCommand('TableMergeCells');
		break;
		case 'TableMergeRight':
		B=new FCKTableCommand('TableMergeRight');
		break;
		case 'TableMergeDown':
		B=new FCKTableCommand('TableMergeDown');
		break;
		case 'TableHorizontalSplitCell':
		B=new FCKTableCommand('TableHorizontalSplitCell');
		break;
		case 'TableVerticalSplitCell':
		B=new FCKTableCommand('TableVerticalSplitCell');
		break;
		case 'TableDelete':
		B=new FCKTableCommand('TableDelete');
		break;
		case 'Form':
		B=new FCKDialogCommand('Form',FCKLang.Form,'dialog/fck_form.html',380,210);
		break;
		case 'Checkbox':
		B=new FCKDialogCommand('Checkbox',FCKLang.Checkbox,'dialog/fck_checkbox.html',380,200);
		break;
		case 'Radio':
		B=new FCKDialogCommand('Radio',FCKLang.RadioButton,'dialog/fck_radiobutton.html',380,200);
		break;
		case 'TextField':
		B=new FCKDialogCommand('TextField',FCKLang.TextField,'dialog/fck_textfield.html',380,210);
		break;
		case 'Textarea':
		B=new FCKDialogCommand('Textarea',FCKLang.Textarea,'dialog/fck_textarea.html',380,210);
		break;
		case 'HiddenField':
		B=new FCKDialogCommand('HiddenField',FCKLang.HiddenField,'dialog/fck_hiddenfield.html',380,190);
		break;
		case 'Button':
		B=new FCKDialogCommand('Button',FCKLang.Button,'dialog/fck_button.html',380,210);
		break;
		case 'Select':
		B=new FCKDialogCommand('Select',FCKLang.SelectionField,'dialog/fck_select.html',400,340);
		break;
		case 'ImageButton':
		B=new FCKDialogCommand('ImageButton',FCKLang.ImageButton,'dialog/fck_image.html?ImageButton',450,390);
		break;
		case 'SpellCheck':
		B=new FCKSpellCheckCommand();
		break;
		case 'FitWindow':
		B=new FCKFitWindow();
		break;
		case 'Undo':
		B=new FCKUndoCommand();
		break;
		case 'Redo':
		B=new FCKRedoCommand();
		break;
		case 'Copy':
		B=new FCKCutCopyCommand(false);
		break;
		case 'Cut':
		B=new FCKCutCopyCommand(true);
		break;
		case 'SelectAll':
		B=new FCKSelectAllCommand();
		break;
		case 'InsertOrderedList':
		B=new FCKListCommand('insertorderedlist','ol');
		break;
		case 'InsertUnorderedList':
		B=new FCKListCommand('insertunorderedlist','ul');
		break;
		case 'ShowBlocks':
		B=new FCKShowBlockCommand('ShowBlocks',FCKConfig.StartupShowBlocks?1:0);//设置Name属性为(a),_SavedState属性为(b)
		//设置Name属性为(a),_SavedState属性为(b)
			//b=false
		break;
		case 'Undefined':
		B=new FCKUndefinedCommand();
		break;
		default:
		if (FCKRegexLib.NamedCommands.test(A)) 
		B=new FCKNamedCommand(A);
		else
		{
			alert(FCKLang.UnknownCommand.replace(/%1/g,A));
			return null;
		}
	};
	FCKCommands.LoadedCommands[A]=B;
	return B;
};
FCKCommands.GetFullPageState=function()
{
	return FCKConfig.FullPage?0:-1;
};
FCKCommands.GetBooleanState=function(A)
{
	return A?-1:0;
};
var FCKPanel=function(A)//定义属性
{//a=[object]
	this.IsRTL=(FCKLang.Dir=='rtl');//false
	//FCKLang.Dir="ltr"
	this.IsContextMenu=false;
	this._LockCounter=0;
	this._Window=A||window;
	var B;
	if (FCKBrowserInfo.IsIE)//true
	{
		this._Popup=this._Window.createPopup();//=[object]
		var C=this._Window.document;//=[object]
		if (FCK_IS_CUSTOM_DOMAIN&&!FCKBrowserInfo.IsIE7)//false
		{
			C.domain=FCK_ORIGINAL_DOMAIN;document.domain=FCK_ORIGINAL_DOMAIN;
		};
		B=this.Document=this._Popup.document;
		if (FCK_IS_CUSTOM_DOMAIN)//false
		{
			B.domain=FCK_RUNTIME_DOMAIN;
			C.domain=FCK_RUNTIME_DOMAIN;
			document.domain=FCK_RUNTIME_DOMAIN;
		};
		FCK.IECleanup.AddItem(this,FCKPanel_Cleanup);//将a和b添加到Items数组中，并返回数组的新长度值
	}
	else
	{
		var D=this._IFrame=this._Window.document.createElement('iframe');
		FCKTools.ResetStyles(D);//设置节点的参数
		D.src='javascript:void(0)';
		D.allowTransparency=true;
		D.frameBorder='0';
		D.scrolling='no';
		D.style.width=D.style.height='0px';
		FCKDomTools.SetElementStyles(D,{position:'absolute',zIndex:FCKConfig.FloatingPanelsZIndex});
		this._Window.document.body.appendChild(D);
		var E=D.contentWindow;
		B=this.Document=E.document;
		var F='';
		if (FCKBrowserInfo.IsSafari)
		F='<base href="'+window.document.location+'">';
		B.open();
		B.write('<html><head>'+F+'<\/head><body style="margin:0px;padding:0px;"><\/body><\/html>');
		B.close();
		if(FCKBrowserInfo.IsAIR) 
		FCKAdobeAIR.Panel_Contructor(B,window.document.location);
		FCKTools.AddEventListenerEx(E,'focus',FCKPanel_Window_OnFocus,this);
		FCKTools.AddEventListenerEx(E,'blur',FCKPanel_Window_OnBlur,this);
	};
	B.dir=FCKLang.Dir;
	FCKTools.AddEventListener(B,'contextmenu',FCKTools.CancelEvent);
	this.MainNode=B.body.appendChild(B.createElement('DIV'));
	this.MainNode.style.cssFloat=this.IsRTL?'right':'left';
};
FCKPanel.prototype.AppendStyleSheet=function(A)
{//a="http://192.168.0.2/move/admin/fckeditor/editor/skins/silver/fck_editor.css"
	FCKTools.AppendStyleSheet(this.Document,A);
	//a=[object]	b="http://192.168.0.2/move/admin/fckeditor/editor/skins/silver/fck_editor.css"
};
FCKPanel.prototype.Preload=function(x,y,A)
{
	if (this._Popup) 
	this._Popup.show(x,y,0,0,A);
};
FCKPanel.prototype.ResizeForSubpanel=function(A,B,C)
{
	if (!FCKBrowserInfo.IsIE7) 
	return false;
	if (!this._Popup.isOpen)
	{
		this.Subpanel=null;
		return false;
	};
	if (B==0&&C==0)
	{
		if (this.Subpanel!==A)
		return false;
		this.Subpanel=null;
		this.IncreasedX=0;
	}
	else
	{
		this.Subpanel=A;
		if ((this.IncreasedX>=B)&&(this.IncreasedY>=C))
		return false;
		this.IncreasedX=Math.max(this.IncreasedX,B);
		this.IncreasedY=Math.max(this.IncreasedY,C);
	};
	var x=this.ShowRect.x;
	var w=this.IncreasedX;
	if (this.IsRTL)
	x=x-w;
	var D=this.ShowRect.w+w;
	var E=Math.max(this.ShowRect.h,this.IncreasedY);
	if (this.ParentPanel) 
	this.ParentPanel.ResizeForSubpanel(this,D,E);
	this._Popup.show(x,this.ShowRect.y,D,E,this.RelativeElement);
	return this.IsRTL;
};
FCKPanel.prototype.Show=function(x,y,A,B,C)
{
	var D;
	var E=this.MainNode;
	if (this._Popup)
	{
		this._Popup.show(x,y,0,0,A);
		FCKDomTools.SetElementStyles(E,{B:B?B+'px':'',C:C?C+'px':''});
		D=E.offsetWidth;
		if (FCKBrowserInfo.IsIE7)
		{
			if (this.ParentPanel&&this.ParentPanel.ResizeForSubpanel(this,D,E.offsetHeight))
			{
				FCKTools.RunFunction(this.Show,this,[x,y,A]);
				return;
			}
		};
		if (this.IsRTL)
		{
			if (this.IsContextMenu)
			x=x-D+1;
			else if (A)
			x=(x*-1)+A.offsetWidth-D;
		};
		if (FCKBrowserInfo.IsIE7)
		{
			this.ShowRect={x:x,y:y,w:D,h:E.offsetHeight};
			this.IncreasedX=0;
			this.IncreasedY=0;
			this.RelativeElement=A;
		};
		this._Popup.show(x,y,D,E.offsetHeight,A);
		if (this.OnHide)
		{
			if (this._Timer)
			CheckPopupOnHide.call(this,true);
			this._Timer=FCKTools.SetInterval(CheckPopupOnHide,100,this);
		}
	}
	else
	{
		if (typeof(FCK.ToolbarSet.CurrentInstance.FocusManager)!='undefined') 
		FCK.ToolbarSet.CurrentInstance.FocusManager.Lock();
		if (this.ParentPanel)
		{
			this.ParentPanel.Lock();
			FCKPanel_Window_OnBlur(null,this.ParentPanel);
		};
		if (FCKBrowserInfo.IsGecko&&FCKBrowserInfo.IsMac)
		{
			this._IFrame.scrolling='';
			FCKTools.RunFunction(function(){ this._IFrame.scrolling='no';},this);
		};
		if (FCK.ToolbarSet.CurrentInstance.GetInstanceObject('FCKPanel')._OpenedPanel&&FCK.ToolbarSet.CurrentInstance.GetInstanceObject('FCKPanel')._OpenedPanel!=this) 
		FCK.ToolbarSet.CurrentInstance.GetInstanceObject('FCKPanel')._OpenedPanel.Hide(false,true);
		FCKDomTools.SetElementStyles(E,{B:B?B+'px':'',C:C?C+'px':''});
		D=E.offsetWidth;
		if (!B)
		this._IFrame.width=1;
		if (!C)	
		this._IFrame.height=1;
		D=E.offsetWidth||E.firstChild.offsetWidth;
		var F=FCKTools.GetDocumentPosition(this._Window,A.nodeType==9?(FCKTools.IsStrictMode(A)?A.documentElement:A.body):A);
		var G=FCKDomTools.GetPositionedAncestor(this._IFrame.parentNode);
		if (G)
		{
			var H=FCKTools.GetDocumentPosition(FCKTools.GetElementWindow(G),G);
			F.x-=H.x;
			F.y-=H.y;
		};
		if (this.IsRTL&&!this.IsContextMenu) x=(x*-1);
		x+=F.x;
		y+=F.y;
		if (this.IsRTL)
		{
			if (this.IsContextMenu) 
			x=x-D+1;
			else if (A)
			x=x+A.offsetWidth-D;
		}
		else
		{
			var I=FCKTools.GetViewPaneSize(this._Window);
			var J=FCKTools.GetScrollPosition(this._Window);
			var K=I.Height+J.Y;
			var L=I.Width+J.X;
			if ((x+D)>L)
			x-=x+D-L;
			if ((y+E.offsetHeight)>K) 
			y-=y+E.offsetHeight-K;
		};
		FCKDomTools.SetElementStyles(this._IFrame,{left:x+'px',top:y+'px'});
		this._IFrame.contentWindow.focus();
		this._IsOpened=true;var M=this;
		this._resizeTimer=setTimeout(function()
											  {
												  var N=E.offsetWidth||E.firstChild.offsetWidth;
												  var O=E.offsetHeight;
												  M._IFrame.style.width=N+'px';
												  M._IFrame.style.height=O+'px';
												},0);
		FCK.ToolbarSet.CurrentInstance.GetInstanceObject('FCKPanel')._OpenedPanel=this;
	};
	FCKTools.RunFunction(this.OnShow,this);
};
FCKPanel.prototype.Hide=function(A,B)
{
	if (this._Popup)
	this._Popup.hide();
	else
	{
		if (!this._IsOpened||this._LockCounter>0)
		return;
		if (typeof(FCKFocusManager)!='undefined'&&!B)
		FCKFocusManager.Unlock();
		this._IFrame.style.width=this._IFrame.style.height='0px';
		this._IsOpened=false;
		if (this._resizeTimer)
		{
			clearTimeout(this._resizeTimer);
			this._resizeTimer=null;
		};
		if (this.ParentPanel) 
		this.ParentPanel.Unlock();
		if (!A) 
		FCKTools.RunFunction(this.OnHide,this);
	}
};
FCKPanel.prototype.CheckIsOpened=function()
{
	if (this._Popup)
	return this._Popup.isOpen;
	else 
	return this._IsOpened;
};
FCKPanel.prototype.CreateChildPanel=function()
{
	var A=this._Popup?FCKTools.GetDocumentWindow(this.Document):this._Window;
	var B=new FCKPanel(A);
	B.ParentPanel=this;
	return B;
};
FCKPanel.prototype.Lock=function()
{
	this._LockCounter++;
};
FCKPanel.prototype.Unlock=function()
{
	if (--this._LockCounter==0&&!this.HasFocus)
	this.Hide();
};
function FCKPanel_Window_OnFocus(e,A)
{
	A.HasFocus=true;
};
function FCKPanel_Window_OnBlur(e,A)
{
	A.HasFocus=false;
	if (A._LockCounter==0)
	FCKTools.RunFunction(A.Hide,A);
};
function CheckPopupOnHide(A)
{
	if (A||!this._Popup.isOpen)
	{
		window.clearInterval(this._Timer);
		this._Timer=null;
		if (this._Popup&&this.ParentPanel&&!A) 
		this.ParentPanel.ResizeForSubpanel(this,0,0);
		FCKTools.RunFunction(this.OnHide,this);
	}
};
function FCKPanel_Cleanup()
{
	this._Popup=null;
	this._Window=null;
	this.Document=null;
	this.MainNode=null;
	this.RelativeElement=null;
};
var FCKIcon=function(A)//取出(a)的值
{//a="http://192.168.0.2/move/admin/fckeditor/editor/skins/silver/fck_strip.gif,16,45"
	var B=A?typeof(A):'undefined';//="object"
	switch (B)
	{
		case 'number':
		this.Path=FCKConfig.SkinPath+'fck_strip.gif';
		this.Size=16;
		this.Position=A;
		break;
		case 'undefined':
		this.Path=FCK_SPACER_PATH;
		break;
		case 'string':
		this.Path=A;
		break;
		default:
		this.Path=A[0];//="http://192.168.0.2/move/admin/fckeditor/editor/skins/silver/fck_strip.gif"
		this.Size=A[1];//=16
		this.Position=A[2];//=45
	}
};
FCKIcon.prototype.CreateIconElement=function(A)//在(a)节点中设置图片位置和样式
{//a=[object]
	var B,eIconImage;
	if (this.Position)//=1	为true
	{
		var C='-'+((this.Position-1)*this.Size)+'px';//="-0px"
		if (FCKBrowserInfo.IsIE)//true
		{
			B=A.createElement('DIV');
			eIconImage=B.appendChild(A.createElement('IMG'));
			eIconImage.src=this.Path;//="http://192.168.0.2/move/admin/fckeditor/editor/skins/silver/fck_strip.gif"
			eIconImage.style.top=C;
		}
		else
		{
			B=A.createElement('IMG');
			B.src=FCK_SPACER_PATH;
			B.style.backgroundPosition='0px '+C;
			B.style.backgroundImage='url("'+this.Path+'")';
		}
	}
	else
	{
		if (FCKBrowserInfo.IsIE)
		{
			B=A.createElement('DIV');
			eIconImage=B.appendChild(A.createElement('IMG'));
			eIconImage.src=this.Path?this.Path:FCK_SPACER_PATH;
		}
		else
		{
			B=A.createElement('IMG');
			B.src=this.Path?this.Path:FCK_SPACER_PATH;
		}
	};
	B.className='TB_Button_Image';
	return B;
};
var FCKToolbarButtonUI=function(A,B,C,D,E,F)//设置属性
{//a="Source"	b="源代码"		c=null
//d="http://192.168.0.2/move/admin/fckeditor/editor/skins/silver/fck_strip.gif,16,1"
//e=null	f=2
	this.Name=A;
	this.Label=B||A;//="文本颜色"
	this.Tooltip=C||this.Label;
	this.Style=E||0;
	this.State=F||0;
	this.Icon=new FCKIcon(D);
	if (FCK.IECleanup)//true
	FCK.IECleanup.AddItem(this,FCKToolbarButtonUI_Cleanup);//将a和b添加到Items数组中，并返回数组的新长度值
	//FCKToolbarButtonUI_Cleanup()//设置当前"MainElement"属性为null
};
FCKToolbarButtonUI.prototype._CreatePaddingElement=function(A)//返回设置好的图片样式
{//a=[object]
	var B=A.createElement('IMG');
	B.className='TB_Button_Padding';
	B.src=FCK_SPACER_PATH;//="http://192.168.0.2/move/admin/fckeditor/editor/images/spacer.gif"
	return B;
};
FCKToolbarButtonUI.prototype.Create=function(A)//显示一个按扭的所有事件
{//a=[object]
	var B=FCKTools.GetElementDocument(A);//返回元素所属的根元素
	var C=this.MainElement=B.createElement('DIV');
	C.title=this.Tooltip;//="源代码"
	if (FCKBrowserInfo.IsGecko)//false
	C.onmousedown=FCKTools.CancelEvent;
	FCKTools.AddEventListenerEx(C,'mouseover',FCKToolbarButtonUI_OnMouseOver,this);//把函数绑定为事件.(a)节点.(b)事件名.(c)事件函数.(d)参数数组
	FCKTools.AddEventListenerEx(C,'mouseout',FCKToolbarButtonUI_OnMouseOut,this);//把函数绑定为事件.(a)节点.(b)事件名.(c)事件函数.(d)参数数组
	FCKTools.AddEventListenerEx(C,'click',FCKToolbarButtonUI_OnClick,this);//把函数绑定为事件.(a)节点.(b)事件名.(c)事件函数.(d)参数数组
	this.ChangeState(this.State,true);//设置(a)的样式,(b)是否设置样式
	//a=0	b=true
	if (this.Style==0&&!this.ShowArrow)//false
	{
		C.appendChild(this.Icon.CreateIconElement(B));
	}
	else
	{
		var D=C.appendChild(B.createElement('TABLE'));
		//appendChild() 方法可向节点的子节点列表的末尾添加新的子节点。
		D.cellPadding=0;
		//cellPadding 属性可设置或返回单元格边框与单元格内容之间的空白量（以像素为单位）。
		D.cellSpacing=0;
		//cellSpacing 属性可设置或返回在表格中的单元格之间的空白量（以像素为单位）。
		var E=D.insertRow(-1);
		//nsertRow() 方法用于在表格中的指定位置插入一个新行。
		var F=E.insertCell(-1);
		if (this.Style==0||this.Style==2) //true		显示按扭图片
		{
			F.appendChild(this.Icon.CreateIconElement(B));
			//CreateIconElement=function(A)//在(a)节点中设置图片位置和样式
		}
		else 
		F.appendChild(this._CreatePaddingElement(B));
		if (this.Style==1||this.Style==2)//true	
		{
			F=E.insertCell(-1);
			F.className='TB_Button_Text';
			F.noWrap=true;
			F.appendChild(B.createTextNode(this.Label));
			//this.Label="源代码"
		};
		if (this.ShowArrow)//undefined
		{
			if (this.Style!=0)
			{
				E.insertCell(-1).appendChild(this._CreatePaddingElement(B));
			};
			F=E.insertCell(-1);
			var G=F.appendChild(B.createElement('IMG'));
			G.src=FCKConfig.SkinPath+'images/toolbar.buttonarrow.gif';
			G.width=5;
			G.height=3;
		};
		F=E.insertCell(-1);
		F.appendChild(this._CreatePaddingElement(B));
		//_CreatePaddingElement=function(A)//返回设置好的图片样式
	};
	A.appendChild(C);
};
FCKToolbarButtonUI.prototype.ChangeState=function(A,B)//设置(a)的样式,(b)是否设置样式
{//a=0	b=true
	if (!B&&this.State==A)//false
	return;
	var e=this.MainElement;
	if (!e) return;//false
	switch (parseInt(A,10))//=0
	{//parseInt 方法	返回由字符串转换得到的整数。

		case 0:e.className='TB_Button_Off';
		break;
		case 1:e.className='TB_Button_On';
		break;
		case -1:e.className='TB_Button_Disabled';
		break;
	};
	this.State=A;
};
function FCKToolbarButtonUI_OnMouseOver(A,B)//设置经鼠标经过效果(a)节点.(b)当月前对象
{
	if (B.State==0) 
	this.className='TB_Button_Off_Over';
	else if (B.State==1)
	this.className='TB_Button_On_Over';
};
function FCKToolbarButtonUI_OnMouseOut(A,B)//设置经鼠标离开效果(a)节点.(b)当前对象
{
	if (B.State==0)
	this.className='TB_Button_Off';
	else if (B.State==1)
	this.className='TB_Button_On';
};
function FCKToolbarButtonUI_OnClick(A,B)//单击事件
{
	//a=[object]	
	//b=[object Object]		为"FCKToolbarButtonUI"这个对象的引用
	if (B.OnClick&&B.State!=-1)//true	"State"为初始化的值
	{
		B.OnClick();
		//a=[object Object]		初始化
	}
};
function FCKToolbarButtonUI_Cleanup()//设置当前"MainElement"属性为null
{
	this.MainElement=null;
};
var FCKToolbarButton=function(A,B,C,D,E,F,G)//定义图片的参数.(a)为CommandName参数.(b)为Label参数.(c)为Tooltip参数.(d)为Style参数.(e)为SourceView参数.(f)为ContextSensitive参数.
{
	//a="Source"	//b="源代码"	//c="null"	//d=2	//e=true	//f=true	//g=1
	this.CommandName=A;//="Source"
	this.Label=B;//="源代码"	
	this.Tooltip=C;//="null"
	this.Style=D;//=2
	this.SourceView=E?true:false;//true
	this.ContextSensitive=F?true:false;//true
	if (G==null)//false
	{
		this.IconPath=FCKConfig.SkinPath+'toolbar/'+A.toLowerCase()+'.gif';
		//toLowerCase 方法	返回一个字符串，该字符串中的字母被转换为小写字母。
	}
	else if (typeof(G)=='number')//true
	{
		this.IconPath=[FCKConfig.SkinPath+'fck_strip.gif',16,G];
		//this.IconPath="http://192.168.0.2/move/admin/fckditor/skins/silver/fck_strip.gif,16,1"
	}
	else
	this.IconPath=G;
};
FCKToolbarButton.prototype.Create=function(A)//显示一个按扭的所有事件
{//a=[object]
	this._UIButton=new FCKToolbarButtonUI(this.CommandName,this.Label,this.Tooltip,this.IconPath,this.Style);//设置属性
	//a="source"		b="源代码"		c=null		d="http://192.168.0.2/move/admin/fckditor/skins/silver/fck_strip.gif,16,1"	e=2
	this._UIButton.OnClick=this.Click;
	this._UIButton._ToolbarButton=this;//理解:"FCKToolbarButtonUI"对象的"_ToolbarButton"属性等于"FCKToolbarButton"对象的引用
	this._UIButton.Create(A);//显示一个按扭的所有事件
};
FCKToolbarButton.prototype.RefreshState=function()
{
	var A=this._UIButton;
	if (!A) return;
	var B=FCK.ToolbarSet.CurrentInstance.Commands.GetCommand(this.CommandName).GetState();
	if (B==A.State) return;
	A.ChangeState(B);
};
FCKToolbarButton.prototype.Click=function()//单击事件
{
	var A=this._ToolbarButton||this;//注:this指针为"FCKToolbarButtonUI"对象
	FCK.ToolbarSet.CurrentInstance.Commands.GetCommand(A.CommandName).Execute();
	//A.CommandName="Source"
};
FCKToolbarButton.prototype.Enable=function()
{
	this.RefreshState();
};
FCKToolbarButton.prototype.Disable=function()
{
	this._UIButton.ChangeState(-1);
};
var FCKSpecialCombo=function(A,B,C,D,E)
{
	this.FieldWidth=B||100;
	this.PanelWidth=C||150;
	this.PanelmaxHeight=D||150;
	this.Label='&nbsp;';
	this.Caption=A;
	this.Tooltip=A;
	this.Style=2;
	this.Enabled=true;
	this.Items={};
	this._Panel=new FCKPanel(E||window);
	this._Panel.AppendStyleSheet(FCKConfig.SkinEditorCSS);
	this._PanelBox=this._Panel.MainNode.appendChild(this._Panel.Document.createElement('DIV'));
	this._PanelBox.className='SC_Panel';
	this._PanelBox.style.width=this.PanelWidth+'px';
	this._PanelBox.innerHTML='<table cellpadding="0" cellspacing="0" width="100%" style="TABLE-LAYOUT: fixed"><tr><td nowrap></td></tr></table>';
	this._ItemsHolderEl=this._PanelBox.getElementsByTagName('TD')[0];
	if (FCK.IECleanup) 
	FCK.IECleanup.AddItem(this,FCKSpecialCombo_Cleanup);
};
function FCKSpecialCombo_ItemOnMouseOver()
{
	this.className+=' SC_ItemOver';
};
function FCKSpecialCombo_ItemOnMouseOut()
{
	this.className=this.originalClass;
};
function FCKSpecialCombo_ItemOnClick(A,B,C)
{
	this.className=this.originalClass;
	B._Panel.Hide();
	B.SetLabel(this.FCKItemLabel);
	if (typeof(B.OnSelect)=='function')
	B.OnSelect(C,this);
};
FCKSpecialCombo.prototype.ClearItems=function ()
{
	if (this.Items)
	this.Items={};
	var A=this._ItemsHolderEl;
	while (A.firstChild)
	A.removeChild(A.firstChild);
};
FCKSpecialCombo.prototype.AddItem=function(A,B,C,D)
{
	var E=this._ItemsHolderEl.appendChild(this._Panel.Document.createElement('DIV'));
	E.className=E.originalClass='SC_Item';
	E.innerHTML=B;
	E.FCKItemLabel=C||A;
	E.Selected=false;
	if (FCKBrowserInfo.IsIE) E.style.width='100%';
	if (D) 
	E.style.backgroundColor=D;
	FCKTools.AddEventListenerEx(E,'mouseover',FCKSpecialCombo_ItemOnMouseOver);
	FCKTools.AddEventListenerEx(E,'mouseout',FCKSpecialCombo_ItemOnMouseOut);
	FCKTools.AddEventListenerEx(E,'click',FCKSpecialCombo_ItemOnClick,[this,A]);
	this.Items[A.toString().toLowerCase()]=E;
	return E;
};
FCKSpecialCombo.prototype.SelectItem=function(A)
{
	if (typeof A=='string')
	A=this.Items[A.toString().toLowerCase()];
	if (A)
	{
		A.className=A.originalClass='SC_ItemSelected';
		A.Selected=true;
	}
};
FCKSpecialCombo.prototype.SelectItemByLabel=function(A,B)
{
	for (var C in this.Items)
	{
		var D=this.Items[C];
		if (D.FCKItemLabel==A)
		{
			D.className=D.originalClass='SC_ItemSelected';
			D.Selected=true;
			if (B)
			this.SetLabel(A);
		}
	}
};
FCKSpecialCombo.prototype.DeselectAll=function(A)
{
	for (var i in this.Items)
	{
		if (!this.Items[i])
		continue;
		this.Items[i].className=this.Items[i].originalClass='SC_Item';
		this.Items[i].Selected=false;
	};
	if (A)
	this.SetLabel('');
};
FCKSpecialCombo.prototype.SetLabelById=function(A)
{
	A=A?A.toString().toLowerCase():'';
	var B=this.Items[A];
	this.SetLabel(B?B.FCKItemLabel:'');
};
FCKSpecialCombo.prototype.SetLabel=function(A)
{
	A=(!A||A.length==0)?'&nbsp;':A;
	if (A==this.Label) 
	return;
	this.Label=A;
	var B=this._LabelEl;
	if (B)
	{
		B.innerHTML=A;
		FCKTools.DisableSelection(B);
	}
};
FCKSpecialCombo.prototype.SetEnabled=function(A)
{
	this.Enabled=A;
	if (this._OuterTable) 
	this._OuterTable.className=A?'':'SC_FieldDisabled';
};
FCKSpecialCombo.prototype.Create=function(A)
{
	var B=FCKTools.GetElementDocument(A);
	var C=this._OuterTable=A.appendChild(B.createElement('TABLE'));
	C.cellPadding=0;
	C.cellSpacing=0;
	C.insertRow(-1);
	var D;
	var E;
	switch (this.Style)
	{
		case 0:
		D='TB_ButtonType_Icon';
		E=false;
		break;
		case 1:
		D='TB_ButtonType_Text';
		E=false;
		break;
		case 2:
		E=true;break;
	};
	if (this.Caption&&this.Caption.length>0&&E)
	{
		var F=C.rows[0].insertCell(-1);
		F.innerHTML=this.Caption;
		F.className='SC_FieldCaption';
	};
	var G=FCKTools.AppendElement(C.rows[0].insertCell(-1),'div');
	if (E)
	{
		G.className='SC_Field';
		G.style.width=this.FieldWidth+'px';
		G.innerHTML='<table width="100%" cellpadding="0" cellspacing="0" style="TABLE-LAYOUT: fixed;">'+
						'<tbody>'+
							'<tr>'+
								'<td class="SC_FieldLabel">'+
									'<label>&nbsp;</label>'+
								'</td>'+
								'<td class="SC_FieldButton">'+
									'&nbsp;'+
								'</td>'+
							'</tr>'+
						'</tbody>'+
					'</table>';
		this._LabelEl=G.getElementsByTagName('label')[0];
		this._LabelEl.innerHTML=this.Label;
	}
	else
	{
		G.className='TB_Button_Off';
		G.innerHTML='<table title="'+this.Tooltip+'" class="'+D+'" cellspacing="0" cellpadding="0" border="0">'+
						'<tr>'+
							'<td>'+
								'<img class="TB_Button_Padding" src="'+FCK_SPACER_PATH+'" />'+
							'</td>'+
							'<td class="TB_Text">'+
								this.Caption+
							'</td>'+
							'<td>'+
								'<img class="TB_Button_Padding" src="'+FCK_SPACER_PATH+'" />'+
							'</td>'+
							'<td class="TB_ButtonArrow">'+
								'<img src="'+FCKConfig.SkinPath+'images/toolbar.buttonarrow.gif" width="5" height="3">'+
							'</td>'+
							'<td>'+
								'<img class="TB_Button_Padding" src="'+FCK_SPACER_PATH+'" />'+
							'</td>'+
						'</tr>'+
					'</table>';
	};
	FCKTools.AddEventListenerEx(G,'mouseover',FCKSpecialCombo_OnMouseOver,this);
	FCKTools.AddEventListenerEx(G,'mouseout',FCKSpecialCombo_OnMouseOut,this);
	FCKTools.AddEventListenerEx(G,'click',FCKSpecialCombo_OnClick,this);
	FCKTools.DisableSelection(this._Panel.Document.body);
};
function FCKSpecialCombo_Cleanup()
{
	this._LabelEl=null;
	this._OuterTable=null;
	this._ItemsHolderEl=null;
	this._PanelBox=null;
	if (this.Items)
	{
		for (var A in this.Items)
		this.Items[A]=null;
	}
};
function FCKSpecialCombo_OnMouseOver(A,B)
{
	if (B.Enabled)
	{
		switch (B.Style)
		{
			case 0:
			this.className='TB_Button_On_Over';
			break;
			case 1:
			this.className='TB_Button_On_Over';
			break;
			case 2:
			this.className='SC_Field SC_FieldOver';
			break;
		}
	}
};
function FCKSpecialCombo_OnMouseOut(A,B)
{
	switch (B.Style)
	{
		case 0:
		this.className='TB_Button_Off';
		break;
		case 1:
		this.className='TB_Button_Off';
		break;
		case 2:
		this.className='SC_Field';
		break;
	}
};
function FCKSpecialCombo_OnClick(e,A)
{
	if (A.Enabled)
	{
		var B=A._Panel;
		var C=A._PanelBox;
		var D=A._ItemsHolderEl;
		var E=A.PanelmaxHeight;
		if (A.OnBeforeClick)
		A.OnBeforeClick(A);
		if (FCKBrowserInfo.IsIE)
		B.Preload(0,this.offsetHeight,this);
		if (D.offsetHeight>E)
		C.style.height=E+'px';
		else 
		C.style.height='';
		B.Show(0,this.offsetHeight,this);
	}
};
var FCKToolbarSpecialCombo=function()
{
	this.SourceView=false;
	this.ContextSensitive=true;
	this.FieldWidth=null;
	this.PanelWidth=null;
	this.PanelmaxHeight=null;
};
FCKToolbarSpecialCombo.prototype.DefaultLabel='';
function FCKToolbarSpecialCombo_OnSelect(A,B)
{
	FCK.ToolbarSet.CurrentInstance.Commands.GetCommand(this.CommandName).Execute(A,B);
};
FCKToolbarSpecialCombo.prototype.Create=function(A)
{
	this._Combo=new FCKSpecialCombo(this.GetLabel(),
												  this.FieldWidth,
												  this.PanelWidth,
												  this.PanelmaxHeight,
												  FCKBrowserInfo.IsIE?window:FCKTools.GetElementWindow(A).parent
												  );
	this._Combo.Tooltip=this.Tooltip;
	this._Combo.Style=this.Style;
	this.CreateItems(this._Combo);
	this._Combo.Create(A);
	this._Combo.CommandName=this.CommandName;
	this._Combo.OnSelect=FCKToolbarSpecialCombo_OnSelect;
};
function FCKToolbarSpecialCombo_RefreshActiveItems(A,B)
{
	A.DeselectAll();
	A.SelectItem(B);
	A.SetLabelById(B);
};
FCKToolbarSpecialCombo.prototype.RefreshState=function()
{
	var A;
	var B=FCK.ToolbarSet.CurrentInstance.Commands.GetCommand(this.CommandName).GetState();
	if (B!=-1)
	{
		A=1;
		if (this.RefreshActiveItems) 
		this.RefreshActiveItems(this._Combo,B);
		else
		{
			if (this._LastValue!==B)
			{
				this._LastValue=B;
				if (!B||B.length==0)
				{
					this._Combo.DeselectAll();
					this._Combo.SetLabel(this.DefaultLabel);
				}
				else
				FCKToolbarSpecialCombo_RefreshActiveItems(this._Combo,B);
			}
		}
	}
	else
	A=-1;
	if (A==this.State)
	return;
	if (A==-1)
	{
		this._Combo.DeselectAll();
		this._Combo.SetLabel('');
	};
	this.State=A;
	this._Combo.SetEnabled(A!=-1);
};
FCKToolbarSpecialCombo.prototype.Enable=function()
{
	this.RefreshState();
};
FCKToolbarSpecialCombo.prototype.Disable=function()
{
	this.State=-1;
	this._Combo.DeselectAll();
	this._Combo.SetLabel('');
	this._Combo.SetEnabled(false);
};
var FCKToolbarStyleCombo=function(A,B)
{
	if (A===false) return;
	this.CommandName='Style';
	this.Label=this.GetLabel();
	this.Tooltip=A?A:this.Label;
	this.Style=B?B:2;
	this.DefaultLabel=FCKConfig.DefaultStyleLabel||'';
};
FCKToolbarStyleCombo.prototype=new FCKToolbarSpecialCombo;
FCKToolbarStyleCombo.prototype.GetLabel=function()
{
	return FCKLang.Style;
};
FCKToolbarStyleCombo.prototype.GetStyles=function()
{
	var A={};
	var B=FCK.ToolbarSet.CurrentInstance.Styles.GetStyles();
	for (var C in B)
	{
		var D=B[C];
		if (!D.IsCore) 
		A[C]=D;
	};
	return A;
};
FCKToolbarStyleCombo.prototype.CreateItems=function(A)
{
	var B=A._Panel.Document;
	FCKTools.AppendStyleSheet(B,FCKConfig.ToolbarComboPreviewCSS);
	FCKTools.AppendStyleString(B,FCKConfig.EditorAreaStyles);
	B.body.className+=' ForceBaseFont';
	FCKConfig.ApplyBodyAttributes(B.body);
	var C=this.GetStyles();
	for (var D in C)
	{
		var E=C[D];
		var F=E.GetType()==2?D:FCKToolbarStyleCombo_BuildPreview(E,E.Label||D);
		var G=A.AddItem(D,F);
		G.Style=E;
	};
	A.OnBeforeClick=this.StyleCombo_OnBeforeClick;
};
FCKToolbarStyleCombo.prototype.RefreshActiveItems=function(A)
{
	var B=FCK.ToolbarSet.CurrentInstance.Selection.GetBoundaryParentElement(true);
	if (B)
	{
		var C=new FCKElementPath(B);
		var D=C.Elements;
		for (var e=0;e<D.length;e++)
		{
			for (var i in A.Items)
			{
				var E=A.Items[i];
				var F=E.Style;
				if (F.CheckElementRemovable(D[e],true))
				{
					A.SetLabel(F.Label||F.Name);
					return;
				}
			}
		}
	};
	A.SetLabel(this.DefaultLabel);
};
FCKToolbarStyleCombo.prototype.StyleCombo_OnBeforeClick=function(A)
{
	A.DeselectAll();
	var B;
	var C;
	var D;
	var E=FCK.ToolbarSet.CurrentInstance.Selection;
	if (E.GetType()=='Control')
	{
		B=E.GetSelectedElement();
		D=B.nodeName.toLowerCase();
	}
	else
	{
		B=E.GetBoundaryParentElement(true);
		C=new FCKElementPath(B);
	};
	for (var i in A.Items)
	{
		var F=A.Items[i];
		var G=F.Style;
		if ((D&&G.Element==D)||(!D&&G.GetType()!=2))
		{
			F.style.display='';
			if ((C&&G.CheckActive(C))||(!C&&G.CheckElementRemovable(B,true)))
			A.SelectItem(G.Name);
		}
		else 
		F.style.display='none';
	}
};
function FCKToolbarStyleCombo_BuildPreview(A,B)
{
	var C=A.GetType();
	var D=[];
	if (C==0)
	D.push('<div class="BaseFont">');
	var E=A.Element;
	if (E=='bdo')
	E='span';
	D=['<',E];
	var F=A._StyleDesc.Attributes;
	if (F)
	{
		for (var G in F)
		{
			D.push(' ',G,'="',A.GetFinalAttributeValue(G),'"');
		}
	};
	if (A._GetStyleText().length>0)
	D.push(' style="',A.GetFinalStyleValue(),'"');
	D.push('>',B,'</',E,'>');
	if (C==0) 
	D.push('</div>');
	return D.join('');
};
var FCKToolbarFontFormatCombo=function(A,B)
{
	if (A===false) return;
	this.CommandName='FontFormat';
	this.Label=this.GetLabel();
	this.Tooltip=A?A:this.Label;
	this.Style=B?B:2;
	this.NormalLabel='Normal';
	this.PanelWidth=190;
	this.DefaultLabel=FCKConfig.DefaultFontFormatLabel||'';
};
FCKToolbarFontFormatCombo.prototype=new FCKToolbarStyleCombo(false);
FCKToolbarFontFormatCombo.prototype.GetLabel=function()
{
	return FCKLang.FontFormat;
};
FCKToolbarFontFormatCombo.prototype.GetStyles=function()
{
	var A={};
	var B=FCKLang['FontFormats'].split(';');
	var C={p:B[0],pre:B[1],address:B[2],h1:B[3],h2:B[4],h3:B[5],h4:B[6],h5:B[7],h6:B[8],div:B[9]||(B[0]+' (DIV)')};
	var D=FCKConfig.FontFormats.split(';');
	for (var i=0;i<D.length;i++)
	{
		var E=D[i];
		var F=FCKStyles.GetStyle('_FCK_'+E);
		if (F)
		{
			F.Label=C[E];
			A['_FCK_'+E]=F;
		}
		else
		alert("The FCKConfig.CoreStyles['"+E+"'] setting was not found. Please check the fckconfig.js file");
	};
	return A;
};
FCKToolbarFontFormatCombo.prototype.RefreshActiveItems=function(A)
{
	var B=FCK.ToolbarSet.CurrentInstance.Selection.GetBoundaryParentElement(true);
	if (B)
	{
		var C=new FCKElementPath(B);
		var D=C.Block;
		if (D)
		{
			for (var i in A.Items)
			{
				var E=A.Items[i];
				var F=E.Style;
				if (F.CheckElementRemovable(D))
				{
					A.SetLabel(F.Label);
					return;
				}
			}
		}
	};
	A.SetLabel(this.DefaultLabel);
};
FCKToolbarFontFormatCombo.prototype.StyleCombo_OnBeforeClick=function(A)
{
	A.DeselectAll();
	var B=FCK.ToolbarSet.CurrentInstance.Selection.GetBoundaryParentElement(true);
	if (B)
	{
		var C=new FCKElementPath(B);
		var D=C.Block;
		for (var i in A.Items)
		{
			var E=A.Items[i];
			var F=E.Style;
			if (F.CheckElementRemovable(D))
			{
				A.SelectItem(E);
				return;
			}
		}
	}
};
var FCKToolbarFontsCombo=function(A,B)
{
	this.CommandName='FontName';
	this.Label=this.GetLabel();
	this.Tooltip=A?A:this.Label;
	this.Style=B?B:2;
	this.DefaultLabel=FCKConfig.DefaultFontLabel||'';
};
FCKToolbarFontsCombo.prototype=new FCKToolbarFontFormatCombo(false);
FCKToolbarFontsCombo.prototype.GetLabel=function()
{
	return FCKLang.Font;
};
FCKToolbarFontsCombo.prototype.GetStyles=function()
{
	var A=FCKStyles.GetStyle('_FCK_FontFace');
	if (!A)
	{
		alert("The FCKConfig.CoreStyles['Size'] setting was not found. Please check the fckconfig.js file");
		return {};
	};
	var B={};
	var C=FCKConfig.FontNames.split(';');
	for (var i=0;i<C.length;i++)
	{
		var D=C[i].split('/');
		var E=D[0];
		var F=D[1]||E;
		var G=FCKTools.CloneObject(A);//返回(a)的原型引用
		G.SetVariable('Font',E);
		G.Label=F;B[F]=G;
	};
	return B;
};
FCKToolbarFontsCombo.prototype.RefreshActiveItems=FCKToolbarStyleCombo.prototype.RefreshActiveItems;
FCKToolbarFontsCombo.prototype.StyleCombo_OnBeforeClick=function(A)
{
	A.DeselectAll();
	var B=FCKSelection.GetBoundaryParentElement(true);
	if (B)
	{
		var C=new FCKElementPath(B);
		for (var i in A.Items)
		{
			var D=A.Items[i];
			var E=D.Style;
			if (E.CheckActive(C))
			{
				A.SelectItem(D);
				return;
			}
		}
	}
};
var FCKToolbarFontSizeCombo=function(A,B)
{
	this.CommandName='FontSize';
	this.Label=this.GetLabel();
	this.Tooltip=A?A:this.Label;
	this.Style=B?B:2;
	this.DefaultLabel=FCKConfig.DefaultFontSizeLabel||'';
	this.FieldWidth=70;
};
FCKToolbarFontSizeCombo.prototype=new FCKToolbarFontFormatCombo(false);
FCKToolbarFontSizeCombo.prototype.GetLabel=function()
{
	return FCKLang.FontSize;
};
FCKToolbarFontSizeCombo.prototype.GetStyles=function()
{
	var A=FCKStyles.GetStyle('_FCK_Size');
	if (!A)
	{
		alert("The FCKConfig.CoreStyles['FontFace'] setting was not found. Please check the fckconfig.js file");
		return {};
	};
	var B={};
	var C=FCKConfig.FontSizes.split(';');
	for (var i=0;i<C.length;i++)
	{
		var D=C[i].split('/');
		var E=D[0];
		var F=D[1]||E;
		var G=FCKTools.CloneObject(A);//返回(a)的原型引用
		G.SetVariable('Size',E);
		G.Label=F;
		B[F]=G;
	};
	return B;
};
FCKToolbarFontSizeCombo.prototype.RefreshActiveItems=FCKToolbarStyleCombo.prototype.RefreshActiveItems;
FCKToolbarFontSizeCombo.prototype.StyleCombo_OnBeforeClick=FCKToolbarFontsCombo.prototype.StyleCombo_OnBeforeClick;
var FCKToolbarPanelButton=function(A,B,C,D,E)
{
	this.CommandName=A;
	var F;
	if (E==null) 
	F=FCKConfig.SkinPath+'toolbar/'+A.toLowerCase()+'.gif';
	else if (typeof(E)=='number')
	F=[FCKConfig.SkinPath+'fck_strip.gif',16,E];
	var G=this._UIButton=new FCKToolbarButtonUI(A,B,C,F,D);
	G._FCKToolbarPanelButton=this;
	G.ShowArrow=true;
	G.OnClick=FCKToolbarPanelButton_OnButtonClick;
};
FCKToolbarPanelButton.prototype.TypeName='FCKToolbarPanelButton';
FCKToolbarPanelButton.prototype.Create=function(A)
{
	A.className+='Menu';
	this._UIButton.Create(A);
	var B=FCK.ToolbarSet.CurrentInstance.Commands.GetCommand(this.CommandName)._Panel;
	this.RegisterPanel(B);
};
FCKToolbarPanelButton.prototype.RegisterPanel=function(A)
{
	if (A._FCKToolbarPanelButton)
	return;
	A._FCKToolbarPanelButton=this;
	var B=A.Document.body.appendChild(A.Document.createElement('div'));
	B.style.position='absolute';
	B.style.top='0px';
	var C=A._FCKToolbarPanelButtonLineDiv=B.appendChild(A.Document.createElement('IMG'));
	C.className='TB_ConnectionLine';
	C.style.position='absolute';
	C.src=FCK_SPACER_PATH;
	A.OnHide=FCKToolbarPanelButton_OnPanelHide;
};
function FCKToolbarPanelButton_OnButtonClick(A)
{
	var B=this._FCKToolbarPanelButton;
	var e=B._UIButton.MainElement;
	B._UIButton.ChangeState(1);
	var C=FCK.ToolbarSet.CurrentInstance.Commands.GetCommand(B.CommandName);
	var D=C._Panel;
	D._FCKToolbarPanelButtonLineDiv.style.width=(e.offsetWidth-2)+'px';
	C.Execute(0,e.offsetHeight-1,e);
};
function FCKToolbarPanelButton_OnPanelHide()
{
	var A=this._FCKToolbarPanelButton;
	A._UIButton.ChangeState(0);
};
FCKToolbarPanelButton.prototype.RefreshState=FCKToolbarButton.prototype.RefreshState;
FCKToolbarPanelButton.prototype.Enable=FCKToolbarButton.prototype.Enable;
FCKToolbarPanelButton.prototype.Disable=FCKToolbarButton.prototype.Disable;
var FCKToolbarItems={};
FCKToolbarItems.LoadedItems={};
FCKToolbarItems.RegisterItem=function(A,B)
{
	this.LoadedItems[A]=B;
};
FCKToolbarItems.GetItem=function(A)//设置(a)的参数
{//a="Source"
	var B=FCKToolbarItems.LoadedItems[A];//在LoadedItems对象中增加项目a
	if (B) return B; //B=undefined	
	switch (A)
	{//a="Source"
		case 'Source':
		B=new FCKToolbarButton('Source',FCKLang.Source,null,2,true,true,1);//定义图片的参数.(a)为CommandName参数.(b)为Label参数.(c)为Tooltip参数.(d)为Style参数.(e)为SourceView参数.(f)为ContextSensitive参数.
		//FCKLang.Source="源代码"	在"zh-cn.js"中定义
		break;
		case 'DocProps':
		B=new FCKToolbarButton('DocProps',FCKLang.DocProps,null,null,null,null,2);
		//FCKLang.DocProps="页面属性"
		break;
		case 'Save':
		B=new FCKToolbarButton('Save',FCKLang.Save,null,null,true,null,3);
		//FCKLang.Save="保存"
		break;
		case 'NewPage':
		B=new FCKToolbarButton('NewPage',FCKLang.NewPage,null,null,true,null,4);
		//FCKLang.NewPage="新建"
		break;
		case 'Preview':
		B=new FCKToolbarButton('Preview',FCKLang.Preview,null,null,true,null,5);
		//FCKLang.Preview="预览"
		break;
		case 'Templates':
		B=new FCKToolbarButton('Templates',FCKLang.Templates,null,null,null,null,6);
		//FCKLang.Templates="模板"
		break;
		case 'About':
		B=new FCKToolbarButton('About',FCKLang.About,null,null,true,null,47);
		//FCKLang.About="关于 FCKeditor"
		break;
		case 'Cut':
		B=new FCKToolbarButton('Cut',FCKLang.Cut,null,null,false,true,7);
		//FCKLang.Cut="剪切"
		break;
		case 'Copy':
		B=new FCKToolbarButton('Copy',FCKLang.Copy,null,null,false,true,8);
		//FCKLang.Copy="复制"
		break;
		case 'Paste':
		B=new FCKToolbarButton('Paste',FCKLang.Paste,null,null,false,true,9);
		//FCKLang.Paste="粘贴"
		break;
		case 'PasteText':
		B=new FCKToolbarButton('PasteText',FCKLang.PasteText,null,null,false,true,10);
		//FCKLang.PasteText="粘贴为无格式文本"
		break;
		case 'PasteWord':
		B=new FCKToolbarButton('PasteWord',FCKLang.PasteWord,null,null,false,true,11);
		//FCKLang.PasteWord="从 MS Word 粘贴"
		break;
		case 'Print':
		B=new FCKToolbarButton('Print',FCKLang.Print,null,null,false,true,12);
		//FCKLang.Print="打印"
		break;
		case 'SpellCheck':
		B=new FCKToolbarButton('SpellCheck',FCKLang.SpellCheck,null,null,null,null,13);
		//FCKLang.SpellCheck="拼写检查"
		break;
		case 'Undo':
		B=new FCKToolbarButton('Undo',FCKLang.Undo,null,null,false,true,14);
		//FCKLang.Undo="撤消"
		break;
		case 'Redo':
		B=new FCKToolbarButton('Redo',FCKLang.Redo,null,null,false,true,15);
		//FCKLang.Redo="重做"
		break;
		case 'SelectAll':
		B=new FCKToolbarButton('SelectAll',FCKLang.SelectAll,null,null,true,null,18);
		//FCKLang.SelectAll="全选"
		break;
		case 'RemoveFormat':
		B=new FCKToolbarButton('RemoveFormat',FCKLang.RemoveFormat,null,null,false,true,19);
		//FCKLang.RemoveFormat="清除格式"
		break;
		case 'FitWindow':
		B=new FCKToolbarButton('FitWindow',FCKLang.FitWindow,null,null,true,true,66);
		//FCKLang.FitWindow="全屏编辑"
		break;
		case 'Bold':
		B=new FCKToolbarButton('Bold',FCKLang.Bold,null,null,false,true,20);
		//FCKLang.Bold="加粗"
		break;
		case 'Italic':
		B=new FCKToolbarButton('Italic',FCKLang.Italic,null,null,false,true,21);
		//FCKLang.Italic="倾斜"
		break;
		case 'Underline':
		B=new FCKToolbarButton('Underline',FCKLang.Underline,null,null,false,true,22);
		//FCKLang.Underline="下划线"
		break;
		case 'StrikeThrough':
		B=new FCKToolbarButton('StrikeThrough',FCKLang.StrikeThrough,null,null,false,true,23);
		//FCKLang.StrikeThrough="删除线"
		break;
		case 'Subscript':
		B=new FCKToolbarButton('Subscript',FCKLang.Subscript,null,null,false,true,24);
		//FCKLang.Subscript="下标"
		break;
		case 'Superscript':
		B=new FCKToolbarButton('Superscript',FCKLang.Superscript,null,null,false,true,25);
		//FCKLang.Superscript="上标"
		break;
		case 'OrderedList':
		B=new FCKToolbarButton('InsertOrderedList',FCKLang.NumberedListLbl,FCKLang.NumberedList,null,false,true,26);
		// FCKLang.NumberedListLbl="编号列表"
		//FCKLang.NumberedList="插入/删除编号列表"
		break;
		case 'UnorderedList':
		B=new FCKToolbarButton('InsertUnorderedList',FCKLang.BulletedListLbl,FCKLang.BulletedList,null,false,true,27);
		//FCKLang.BulletedListLbl="项目列表"
		//FCKLang.BulletedList="插入/删除项目列表"
		break;
		case 'Outdent':
		B=new FCKToolbarButton('Outdent',FCKLang.DecreaseIndent,null,null,false,true,28);
		//FCKLang.DecreaseIndent="减少缩进量"
		break;
		case 'Indent':
		B=new FCKToolbarButton('Indent',FCKLang.IncreaseIndent,null,null,false,true,29);
		//FCKLang.IncreaseIndent="增加缩进量"
		break;
		case 'Blockquote':
		B=new FCKToolbarButton('Blockquote',FCKLang.Blockquote,null,null,false,true,73);
		//FCKLang.Blockquote="块引用"
		break;
		case 'CreateDiv':
		B=new FCKToolbarButton('CreateDiv',FCKLang.CreateDiv,null,null,false,true,74);
		//FCKLang.CreateDiv="插入 Div 标签"
		break;
		case 'Link':
		B=new FCKToolbarButton('Link',FCKLang.InsertLinkLbl,FCKLang.InsertLink,null,false,true,34);
		//FCKLang.InsertLinkLbl="超链接"
		//FCKLang.InsertLink="插入/编辑超链接"
		break;
		case 'Unlink':
		B=new FCKToolbarButton('Unlink',FCKLang.RemoveLink,null,null,false,true,35);
		//FCKLang.RemoveLink="取消超链接"
		break;
		case 'Anchor':
		B=new FCKToolbarButton('Anchor',FCKLang.Anchor,null,null,null,null,36);
		//FCKLang.Anchor="插入/编辑锚点链接"
		break;
		case 'Image':
		B=new FCKToolbarButton('Image',FCKLang.InsertImageLbl,FCKLang.InsertImage,null,false,true,37);
		//FCKLang.InsertImageLbl="图象"
		//FCKLang.InsertImage="插入/编辑图象"
		break;
		case 'Flash':
		B=new FCKToolbarButton('Flash',FCKLang.InsertFlashLbl,FCKLang.InsertFlash,null,false,true,38);
		//FCKLang.InsertFlashLbl="Flash"
		//FCKLang.InsertFlash="插入/编辑 Flash"
		break;
		case 'Table':
		B=new FCKToolbarButton('Table',FCKLang.InsertTableLbl,FCKLang.InsertTable,null,false,true,39);
		//FCKLang.InsertTableLbl="表格"
		//FCKLang.InsertTable="插入/编辑表格"
		break;
		case 'SpecialChar':
		B=new FCKToolbarButton('SpecialChar',FCKLang.InsertSpecialCharLbl,FCKLang.InsertSpecialChar,null,false,true,42);
		//FCKLang.InsertSpecialCharLbl="特殊符号"
		//FCKLang.InsertSpecialChar="插入特殊符号"
		break;
		case 'MaxPage':
		B=new FCKToolbarButton('MaxPage',FCKLang.PageBreakLbl,FCKLang.PageBreakLbl,null,false,true,78);
		break;
		case 'Smiley':
		B=new FCKToolbarButton('Smiley',FCKLang.InsertSmileyLbl,FCKLang.InsertSmiley,null,false,true,41);
		//FCKLang.InsertSmileyLbl="表情符"
		//FCKLang.InsertSmiley="插入表情图标"
		break;
		case 'PageBreak':
		B=new FCKToolbarButton('PageBreak',FCKLang.PageBreakLbl,FCKLang.PageBreak,null,false,true,43);
		//FCKLang.PageBreakLbl="分页符"
		//FCKLang.PageBreak="插入分页符"
		break;
		case 'Rule':
		B=new FCKToolbarButton('Rule',FCKLang.InsertLineLbl,FCKLang.InsertLine,null,false,true,40);
		//FCKLang.InsertLineLbl="水平线"
		//FCKLang.InsertLine="插入水平线"
		break;
		case 'JustifyLeft':
		B=new FCKToolbarButton('JustifyLeft',FCKLang.LeftJustify,null,null,false,true,30);
		//FCKLang.LeftJustify="左对齐"
		break;
		case 'JustifyCenter':
		B=new FCKToolbarButton('JustifyCenter',FCKLang.CenterJustify,null,null,false,true,31);
		//FCKLang.CenterJustify="居中对齐"
		break;
		case 'JustifyRight':
		B=new FCKToolbarButton('JustifyRight',FCKLang.RightJustify,null,null,false,true,32);
		//FCKLang.RightJustify="右对齐"
		break;
		case 'JustifyFull':
		B=new FCKToolbarButton('JustifyFull',FCKLang.BlockJustify,null,null,false,true,33);
		//FCKLang.BlockJustify="两端对齐"
		break;
		case 'Style':
		B=new FCKToolbarStyleCombo();
		break;
		case 'FontName':
		B=new FCKToolbarFontsCombo();
		break;
		case 'FontSize':
		B=new FCKToolbarFontSizeCombo();
		break;
		case 'FontFormat':
		B=new FCKToolbarFontFormatCombo();
		break;
		case 'TextColor':
		B=new FCKToolbarPanelButton('TextColor',FCKLang.TextColor,null,null,45);
		//FCKLang.TextColor="文本颜色"
		break;
		case 'BGColor':
		B=new FCKToolbarPanelButton('BGColor',FCKLang.BGColor,null,null,46);
		//FCKLang.BGColor="背景颜色"
		break;
		case 'Find':
		B=new FCKToolbarButton('Find',FCKLang.Find,null,null,null,null,16);
		//FCKLang.Find="查找"
		break;
		case 'Replace':
		B=new FCKToolbarButton('Replace',FCKLang.Replace,null,null,null,null,17);
		//FCKLang.Replace="替换"
		break;
		case 'Form':
		B=new FCKToolbarButton('Form',FCKLang.Form,null,null,null,null,48);
		//FCKLang.Form="表单"
		break;
		case 'Checkbox':
		B=new FCKToolbarButton('Checkbox',FCKLang.Checkbox,null,null,null,null,49);
		//FCKLang.Checkbox="复选框"
		break;
		case 'Radio':
		B=new FCKToolbarButton('Radio',FCKLang.RadioButton,null,null,null,null,50);
		//FCKLang.RadioButton="单选按钮"
		break;
		case 'TextField':
		B=new FCKToolbarButton('TextField',FCKLang.TextField,null,null,null,null,51);
		//FCKLang.TextField="单行文本"
		break;
		case 'Textarea':
		B=new FCKToolbarButton('Textarea',FCKLang.Textarea,null,null,null,null,52);
		//FCKLang.Textarea="多行文本"
		break;
		case 'HiddenField':
		B=new FCKToolbarButton('HiddenField',FCKLang.HiddenField,null,null,null,null,56);
		//FCKLang.HiddenField="隐藏域"
		break;
		case 'Button':
		B=new FCKToolbarButton('Button',FCKLang.Button,null,null,null,null,54);
		//FCKLang.Button="按钮"
		break;
		case 'Select':
		B=new FCKToolbarButton('Select',FCKLang.SelectionField,null,null,null,null,53);
		//FCKLang.SelectionField="列表/菜单"
		break;
		case 'ImageButton':
		B=new FCKToolbarButton('ImageButton',FCKLang.ImageButton,null,null,null,null,55);
		//FCKLang.ImageButton="图像域"
		break;
		case 'ShowBlocks':
		B=new FCKToolbarButton('ShowBlocks',FCKLang.ShowBlocks,null,null,null,true,72);
		//FCKLang.ShowBlocks="显示区块"
		break;
		default:
		alert(FCKLang.UnknownToolbarItem.replace(/%1/g,A));
		return null;
	};
	FCKToolbarItems.LoadedItems[A]=B;//在LoadedItems对象中增加项目a
	return B;
};
var FCKToolbar=function()//定义该对象的Items数组为空
{
	this.Items=[];
};
FCKToolbar.prototype.AddItem=function(A)//在的Items数组中增加a
{
	return this.Items[this.Items.length]=A;
};
FCKToolbar.prototype.AddButton=function(A,B,C,D,E,F)
{
	if (typeof(D)=='number') 
	D=[this.DefaultIconsStrip,this.DefaultIconSize,D];
	var G=new FCKToolbarButtonUI(A,B,C,D,E,F);
	G._FCKToolbar=this;
	G.OnClick=FCKToolbar_OnItemClick;
	return this.AddItem(G);
};
function FCKToolbar_OnItemClick(A)
{
	var B=A._FCKToolbar;
	if (B.OnItemClick)
	B.OnItemClick(B,A);
};
FCKToolbar.prototype.AddSeparator=function()//增加FCKToolbarSeparator对象
{
	this.AddItem(new FCKToolbarSeparator());
};
FCKToolbar.prototype.Create=function(A)//显示工具栏
{//a=[object]
	var B=FCKTools.GetElementDocument(A);//=[object]
	var e=B.createElement('table');//=[object]
	e.className='TB_Toolbar';
	e.style.styleFloat=e.style.cssFloat=(FCKLang.Dir=='ltr'?'left':'right');//="left"
	e.dir=FCKLang.Dir;//="ltr"
	e.cellPadding=0;
	e.cellSpacing=0;
	var C=e.insertRow(-1);
	var D;
	if (!this.HideStart)//true	在"table"标记最后一列插入一个"div"标记并设置样式.
	{
		D=C.insertCell(-1);
		D.appendChild(B.createElement('div')).className='TB_Start';
	};
	for (var i=0;i<this.Items.length;i++)
	{//this.Items.length=28
		this.Items[i].Create(C.insertCell(-1));
	};
	if (!this.HideEnd)//true
	{
		D=C.insertCell(-1);
		D.appendChild(B.createElement('div')).className='TB_End';
		//appendChild() 方法可向节点的子节点列表的末尾添加新的子节点。
	};
	A.appendChild(e);
};
var FCKToolbarSeparator=function(){};
FCKToolbarSeparator.prototype.Create=function(A)
{
	FCKTools.AppendElement(A,'div').className='TB_Separator';
};
var FCKToolbarBreak=function(){};
FCKToolbarBreak.prototype.Create=function(A)
{
	var B=FCKTools.GetElementDocument(A).createElement('div');
	B.className='TB_Break';
	B.style.clear=FCKLang.Dir=='rtl'?'left':'right';
	A.appendChild(B);
};
function FCKToolbarSet_Create(A)//控制工具栏
{
	//a=undefined
	var B;
	var C=A||FCKConfig.ToolbarLocation;//="In"	在FCKConfig.js中定义
	switch (C)//="In"
	{
		case 'In':
		document.getElementById('xToolbarRow').style.display='';//取消ID为"xToolbarRow"的隐藏
		B=new FCKToolbarSet(document);//控制工具栏的展开和折叠
		break;
		case 'None':
		B=new FCKToolbarSet(document);
		break;
		default:
		FCK.Events.AttachEvent('OnBlur',FCK_OnBlur);
		FCK.Events.AttachEvent('OnFocus',FCK_OnFocus);
		var D;
		var E=C.match(/^Out:(.+)\((\w+)\)$/);
		if (E)
		{
			if (FCKBrowserInfo.IsAIR)
			FCKAdobeAIR.ToolbarSet_GetOutElement(window,E);
			else
			D=eval('parent.'+E[1]).document.getElementById(E[2]);
		}
		else
		{
			E=C.match(/^Out:(\w+)$/);
			if (E) D=parent.document.getElementById(E[1]);
		};
		if (!D)
		{
			alert('Invalid value for "ToolbarLocation"');
			return arguments.callee('In');
		};
		B=D.__FCKToolbarSet;
		if (B)
		break;
		var F=FCKTools.GetElementDocument(D).createElement('iframe');
		F.src='javascript:void(0)';
		F.frameBorder=0;
		F.width='100%';
		F.height='10';
		D.appendChild(F);
		F.unselectable='on';
		var G=F.contentWindow.document;
		var H='';
		if (FCKBrowserInfo.IsSafari)
		H='<base href="'+window.document.location+'">';
		G.open();
		G.write('<html>'+
				'<head>'+
				H+
				'<script type="text/javascript">'+
				'var adjust = function()'+
				'{'+
					'window.frameElement.height = document.body.scrollHeight ; '+
				'}; '+
				'window.onresize = window.onload = function()'+
				'{'+
					'var timer = null;'+
					'var lastHeight = -1;'+
					'var lastChange = 0;'+
					'var poller = function()'+
					'{'+
						'var currentHeight = document.body.scrollHeight || 0;'+
						'var currentTime = (new Date()).getTime();'+
						'if (currentHeight != lastHeight)'+
						'{'+
							'lastChange = currentTime;'+
							'adjust();'+
							'lastHeight = document.body.scrollHeight;'+
						'}'+
						'if (lastChange < currentTime - 1000)'+
						'clearInterval(timer);'+
					'};'+
					'timer = setInterval(poller, 100);'+
				'}'+
				'<\/script>'+
				'</head>'+
				'<body style="overflow: hidden">'+
				document.getElementById('xToolbarSpace').innerHTML+
				'</body>'+
				'</html>'
				);
		G.close();
		if(FCKBrowserInfo.IsAIR)
		FCKAdobeAIR.ToolbarSet_InitOutFrame(G);
		FCKTools.AddEventListener(G,'contextmenu',FCKTools.CancelEvent);
		FCKTools.AppendStyleSheet(G,FCKConfig.SkinEditorCSS);
		B=D.__FCKToolbarSet=new FCKToolbarSet(G);
		B._IFrame=F;
		if (FCK.IECleanup)
		FCK.IECleanup.AddItem(D,FCKToolbarSet_Target_Cleanup);
	};
	B.CurrentInstance=FCK;//=[object Object]
	if (!B.ToolbarItems)//true
	B.ToolbarItems=FCKToolbarItems;
	FCK.AttachToOnSelectionChange(B.RefreshItemsState);//当文档的选中状态改变时执行(a)函数
	/*
	a的函数如下:
	function(A)
	{
		var B=(A?A.ToolbarSet:this).ItemsContextSensitive;
		for (var i=0;i<B.length;i++) 
		B[i].RefreshState();
	};	
	*/
	return B;
};
function FCK_OnBlur(A)
{
	var B=A.ToolbarSet;
	if (B.CurrentInstance==A)
	B.Disable();
};
function FCK_OnFocus(A)
{
	var B=A.ToolbarSet;
	var C=A||FCK;
	B.CurrentInstance.FocusManager.RemoveWindow(B._IFrame.contentWindow);
	B.CurrentInstance=C;
	C.FocusManager.AddWindow(B._IFrame.contentWindow,true);
	B.Enable();
};
function FCKToolbarSet_Cleanup()
{
	this._TargetElement=null;
	this._IFrame=null;
};
function FCKToolbarSet_Target_Cleanup()
{
	this.__FCKToolbarSet=null;
};
var FCKToolbarSet=function(A)//控制工具栏的展开和折叠
{//a=[object]	为"document"对象
	this._Document=A;
	this._TargetElement=A.getElementById('xToolbar');
	var B=A.getElementById('xExpandHandle');
	var C=A.getElementById('xCollapseHandle');
	B.title=FCKLang.ToolbarExpand;//="展开工具栏"		在"zh-cn.js"中定义
	FCKTools.AddEventListener(B,'click',FCKToolbarSet_Expand_OnClick);//添加事件到对象.(a)对象.(b)事件名.(c)事件函数
	//a=[object]
	/*	FCKToolbarSet_Expand_OnClick的函数如下:
	function FCKToolbarSet_Expand_OnClick()
	{
		FCK.ToolbarSet.Expand();
	};
	*/
	C.title=FCKLang.ToolbarCollapse;//="折叠工具栏"		在"zh-cn.js"中定义
	FCKTools.AddEventListener(C,'click',FCKToolbarSet_Collapse_OnClick);
	if (!FCKConfig.ToolbarCanCollapse||FCKConfig.ToolbarStartExpanded)//true	控制工具栏的显示或隐藏
	{
		this.Expand();//隐藏工具栏
	}
	else
	{
		this.Collapse();//显示工具栏
	}
	C.style.display=FCKConfig.ToolbarCanCollapse?'':'none';//显示"折叠工具栏"样子.注:图片是在样式中定义的.
	if (FCKConfig.ToolbarCanCollapse)//true		显示工具栏
	C.style.display='';
	else
	A.getElementById('xTBLeftBorder').style.display='';
	this.Toolbars=[];
	this.IsLoaded=false;
	if (FCK.IECleanup)//[object Object]		为true
	{
	FCK.IECleanup.AddItem(this,FCKToolbarSet_Cleanup);//将a,b添加到一个数组中
	}
};
function FCKToolbarSet_Expand_OnClick()
{
	FCK.ToolbarSet.Expand();
};
function FCKToolbarSet_Collapse_OnClick()
{
	FCK.ToolbarSet.Collapse();
};
FCKToolbarSet.prototype.Expand=function()//隐藏工具栏
{
	this._ChangeVisibility(false);//A为false则"隐藏工具栏"否则"显示工具栏"
};
FCKToolbarSet.prototype.Collapse=function()
{
	this._ChangeVisibility(true);
};
FCKToolbarSet.prototype._ChangeVisibility=function(A)//A为false则"隐藏工具栏"否则"显示工具栏"
{//A=false
	this._Document.getElementById('xCollapsed').style.display=A?'':'none';//A为"false"则ID为"xCollapsed"就隐藏
	this._Document.getElementById('xExpanded').style.display=A?'none':'';//A为"false"则ID为"xExpanded"就显示
	/*	
	Boolean 表达式
	一个值为 true 或者 false 的表达式。如果需要，非 Boolean 表达式也可以被转换为 Boolean 值，但是要遵循下列规则：
	所有的对象都被当作 true。 	
	当且仅当字符串为空时，该字符串被当作 false。 
	null 和 undefined 被当作 false。 
	当且仅当数字为零时，该数字被当作 false。
	*/
	if (FCKBrowserInfo.IsGecko)//false
	{
		FCKTools.RunFunction(window.onresize);
	}
};
FCKToolbarSet.prototype.Load=function(A)//显示所有的工具栏
{//A="rendie"
	this.Name=A;
	this.Items=[];
	this.ItemsWysiwygOnly=[];
	this.ItemsContextSensitive=[];
	this._TargetElement.innerHTML='';
	var B=FCKConfig.ToolbarSets[A];		//B="['Source','Preview','-','PasteText','PasteWord','Undo','Redo','Find','Replace','RemoveFormat','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyFull','-','Link','Unlink','-','Image','Flash','-','Table','Rule','Smiley','-','TextColor','BGColor'],['Bold','Italic','-','Style','FontFormat','FontName','FontSize']"
	if (!B)//false	是否提标错误:"工具栏设置不存在"
	{
		alert(FCKLang.UnknownToolbarSet.replace(/%1/g,A));
		return;
	};
	this.Toolbars=[];
	for (var x=0;x<B.length;x++)//分组显示工具栏
	{
		//B.length=2
		var C=B[x];
//C="Source','Preview','-','PasteText','PasteWord','Undo','Redo','Find','Replace','RemoveFormat','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyFull','-','Link','Unlink','-','Image','Flash','-','Table','Rule','Smiley','-','TextColor','BGColor'"
		if (!C) continue;//false
		//continue 语句		停止循环的当前迭代，并开始新的迭代。 
		var D;
		if (typeof(C)=='string')//false
		{
			if (C=='/')
			D=new FCKToolbarBreak();
		}
		else
		{
			D=new FCKToolbar();//定义该对象的Items数组为空
			for (var j=0;j<C.length;j++)
			{//C.lengt=28
				var E=C[j];//C[0]="Source"
				if (E=='-')//false
				{
					D.AddSeparator();//增加FCKToolbarSeparator对象
				}
				else
				{
					var F=FCKToolbarItems.GetItem(E);//设置(a)的参数		已指向"FCKToolbarButton"对象
					//a="Source"
					if (F)//=[object Object]	为true		返回数组的新长度值
					{
						D.AddItem(F);//在的Items数组中增加a
						this.Items.push(F);//=1
						//push 方法		将新元素添加到一个数组中，并返回数组的新长度值。
						if (!F.SourceView)//false
						this.ItemsWysiwygOnly.push(F);
						if (F.ContextSensitive)//true
						this.ItemsContextSensitive.push(F);//=1
					}
				}
			}
		};
		D.Create(this._TargetElement);//显示工具栏
		//a=[object]	为节点
		this.Toolbars[this.Toolbars.length]=D;
		//this.Toolbars.length=0	
	};
	FCKTools.DisableSelection(this._Document.getElementById('xCollapseHandle').parentNode);//设置"unselectable"属性是否为"on"
	if (FCK.Status!=2)//ture
	FCK.Events.AttachEvent('OnStatusChange',this.RefreshModeState);//绑定一個事件(a)事件名称(b)事件函数
	//状态变化时会触发OnStatusChange事件
	else 
	this.RefreshModeState();
	this.IsLoaded=true;
	this.IsEnabled=true;
	FCKTools.RunFunction(this.OnLoad);//在"onload"执行完后再执行(a)函数.(b)被当作当前对象.(c)参数数组.(d)为哪层页面的window对象
	/*
	function StartEditor()//　移除 OnLoad 事件接收器
	{
		FCK.ToolbarSet.OnLoad = null ;
		FCKeditorAPI._FunctionQueue.Remove( LoadToolbar ) ;
		FCK.Events.AttachEvent( 'OnStatusChange', WaitForActive ) ;//新增一個事件處理程序到指定事件中
		FCK.StartEditor() ;
	}*/

};
FCKToolbarSet.prototype.Enable=function()
{
	if (this.IsEnabled) return;
	this.IsEnabled=true;
	var A=this.Items;
	for (var i=0;i<A.length;i++) 
	A[i].RefreshState();
};
FCKToolbarSet.prototype.Disable=function()
{
	if (!this.IsEnabled) return;
	this.IsEnabled=false;
	var A=this.Items;
	for (var i=0;i<A.length;i++)
	A[i].Disable();
};
FCKToolbarSet.prototype.RefreshModeState=function(A)
{
	if (FCK.Status!=2) return;
	var B=A?A.ToolbarSet:this;
	var C=B.ItemsWysiwygOnly;
	if (FCK.EditMode==0)
	{
		for (var i=0;i<C.length;i++) 
		C[i].Enable();
		B.RefreshItemsState(A);
	}
	else
	{
		B.RefreshItemsState(A);
		for (var j=0;j<C.length;j++)
		C[j].Disable();
	}
};
FCKToolbarSet.prototype.RefreshItemsState=function(A)
{
	var B=(A?A.ToolbarSet:this).ItemsContextSensitive;
	for (var i=0;i<B.length;i++) 
	B[i].RefreshState();
};
var FCKDialog=(function(){
							var A;
							var B;
							var C;
							var D=window.parent;
							while (D.parent&&D.parent!=D)//false
							{
								try
								{
									if (D.parent.document.domain!=document.domain)
									break;
									if (D.parent.document.getElementsByTagName('frameset').length>0)
									break;
								}
								catch (e)
								{
									break;
								};
								D=D.parent;
							};
							var E=D.document;
							var F=function()
							{
								if (!B)//true
								B=FCKConfig.FloatingPanelsZIndex+999;//=10999
								return++B;
							};
							var G=function()//动态设置C节点宽度和高度
							{
								if (!C)	return;//false
								var H=FCKTools.IsStrictMode(E)?E.documentElement:E.body;
								//FCKTools.IsStrictMode=function(A)//false	(a)对象是否应用标准兼容模式的值
								//documentElement 获取对文档根结点的引用。
								FCKDomTools.SetElementStyles(C,{
															 'width':Math.max(
																			  H.scrollWidth,//=1070
																			  //scrollWidth	是对象的实际内容的宽，不包边线宽度，会随对象中内容的多少改变（内容多了可能会改变对象的实际宽度） 
																			  H.clientWidth,//=1070
																			  //clientWidth	是对象可见的宽度，不包滚动条等边线，会随窗口的显示大小改变。
																			  E.scrollWidth||0//=0
																			  )-1+'px',
															 'height':Math.max(
																			   H.scrollHeight,//=737
																			   H.clientHeight,//=737
																			   E.scrollHeight||0//=0
																			   )-1+'px'
															 	
															 });//设置(a)的样式.(b)样式的参数对象
							};
							return {
								OpenDialog:function(dialogName,dialogTitle,dialogPage,width,height,customValue,parentWindow,resizable)//显示按扭响应事件
								{//a="FCKDialog_table"	b="表格属性"		c="dialog/fck_table.html"	d=480	e=250	f=undefined		g=null	h=false
								  alert(11111111111111)
									if (!A) //true
									this.DisplayMainCover();//创建一个层并设置样式,不透明度
									var I=
									{
										Title:dialogTitle,
										Page:dialogPage,
										Editor:window,
										CustomValue:customValue,
										TopWindow:D//为window成没的父成员
									};
									FCK.ToolbarSet.CurrentInstance.Selection.Save(true);//创建一个选择区域
									var J=FCKTools.GetViewPaneSize(D);//设置网页可见区域宽和高.(a)为节点
									var K={ 'X':0,'Y':0 };
									var L=FCKBrowserInfo.IsIE&&(!FCKBrowserInfo.IsIE7||!FCKTools.IsStrictMode(D.document));
									if (L)//true
									K=FCKTools.GetScrollPosition(D);//设置网页被卷去的左和高
									var M=Math.max(K.Y+(J.Height-height-20)/2,0);//返回a和b的最大者
									//a=233.5
									var N=Math.max(K.X+(J.Width-width-20)/2,0);
									//a=285
									var O=E.createElement('iframe');
									FCKTools.ResetStyles(O);//设置节点的参数
									O.src=FCKConfig.BasePath+'fckdialog.html';
									//O.src="http://localhost/movie/admin/fckeditor/editor/fckdialog.html"
									O.frameBorder=0;
									//FrameBorder：区域边框的宽度，为了让“内部框架“与邻近的内容相融合，常设置为0。
									O.allowTransparency=true;
									// allowTransparency 设置或获取对象是否可为透明。
									FCKDomTools.SetElementStyles(O,{
																 'position':(L)?'absolute':'fixed',
																 'top':M+'px',
																 'left':N+'px',
																 'width':width+'px',
																 'height':height+'px',
																 'zIndex':F()
																 });//设置(a)的样式.(b)样式的参数对象
																 alert(I)
									O._DialogArguments=I;//定义"_DialogArguments"属性
									E.body.appendChild(O);
									O._ParentDialog=A;
									A=O;
								},
								OnDialogClose:function(dialogWindow)
								{
									var O=dialogWindow.frameElement;
									FCKDomTools.RemoveNode(O);
									if (O._ParentDialog)
									{
										A=O._ParentDialog;
										O._ParentDialog.contentWindow.SetEnabled(true);
									}
									else
									{
										if (!FCKBrowserInfo.IsIE)
										FCK.Focus();
										this.HideMainCover();
										setTimeout(function(){ A=null;},0);
										FCK.ToolbarSet.CurrentInstance.Selection.Release();
									}
								},
								DisplayMainCover:function()//创建一个层并设置样式,不透明度
								{
									C=E.createElement('div');
									FCKTools.ResetStyles(C);//设置节点的参数
									FCKDomTools.SetElementStyles(C,{
																 'position':'absolute',
																 'zIndex':F(),
																 'top':'0px',
																 'left':'0px',
																 'backgroundColor':FCKConfig.BackgroundBlockerColor//='#ffffff'
																 });//设置(a)的样式.(b)样式的参数对象
									FCKDomTools.SetOpacity(C,FCKConfig.BackgroundBlockerOpacity);//设置(a)节点的不透明度.(b)透明的参数
									//a=节点		b=0.50
									if (FCKBrowserInfo.IsIE&&!FCKBrowserInfo.IsIE7)//true
									{
										var Q=E.createElement('iframe');
										FCKTools.ResetStyles(Q);//设置节点的参数
										Q.hideFocus=true;
										//hideFocus 设置或获取表明对象是否显式标明焦点的值。 
										Q.frameBorder=0;
										//frameBorder 属性可设置或返回是否显示 iframe 周围的边框。
										Q.src=FCKTools.GetVoidUrl();//void 运算符对表达式求值
										FCKDomTools.SetElementStyles(Q,{
																	 'width':'100%',
																	 'height':'100%',
																	 'position':'absolute',
																	 'left':'0px',
																	 'top':'0px',
																	 'filter':'progid:DXImageTransform.Microsoft.Alpha(opacity=0)'
																	 });//设置(a)的样式.(b)样式的参数对象
										C.appendChild(Q);
									};
									FCKTools.AddEventListener(D,'resize',G);//把函数绑定为事件.(a)节点.(b)事件名.(c)事件函数.(d)参数数组
									//a=父节点	c=函数		resize在调整控件大小时发生。
									G();//动态设置C节点宽度和高度
									E.body.appendChild(C);
									FCKFocusManager.Lock();//设置"IsLocked"为true
									var R=FCK.ToolbarSet.CurrentInstance.GetInstanceObject('frameElement');//获得这个引用
									R._fck_originalTabIndex=R.tabIndex;//=-32768
									R.tabIndex=-1;//TabIndex就是按Tab键有顺序的获取定义过的TabIndex元素设置在各个元素之间的焦点。
								},
								HideMainCover:function()
								{
									FCKDomTools.RemoveNode(C);
									FCKFocusManager.Unlock();
									var R=FCK.ToolbarSet.CurrentInstance.GetInstanceObject('frameElement');
									R.tabIndex=R._fck_originalTabIndex;
									FCKDomTools.ClearElementJSProperty(R,'_fck_originalTabIndex');
								},
								GetCover:function()//返回C
								{
									return C;
								}
							};
						})();
var FCKMenuItem=function(A,B,C,D,E,F)
{
	this.Name=B;
	this.Label=C||B;
	this.IsDisabled=E;
	this.Icon=new FCKIcon(D);
	this.SubMenu=new FCKMenuBlockPanel();
	this.SubMenu.Parent=A;
	this.SubMenu.OnClick=FCKTools.CreateEventListener(FCKMenuItem_SubMenu_OnClick,this);
	this.CustomData=F;if (FCK.IECleanup) FCK.IECleanup.AddItem(this,FCKMenuItem_Cleanup);
};
FCKMenuItem.prototype.AddItem=function(A,B,C,D,E)
{
	this.HasSubMenu=true;
	return this.SubMenu.AddItem(A,B,C,D,E);
};
FCKMenuItem.prototype.AddSeparator=function()
{
	this.SubMenu.AddSeparator();
};
FCKMenuItem.prototype.Create=function(A)
{
	var B=this.HasSubMenu;
	var C=FCKTools.GetElementDocument(A);
	var r=this.MainElement=A.insertRow(-1);
	r.className=this.IsDisabled?'MN_Item_Disabled':'MN_Item';
	if (!this.IsDisabled)
	{
		FCKTools.AddEventListenerEx(r,'mouseover',FCKMenuItem_OnMouseOver,[this]);
		FCKTools.AddEventListenerEx(r,'click',FCKMenuItem_OnClick,[this]);
		if (!B) 
		FCKTools.AddEventListenerEx(r,'mouseout',FCKMenuItem_OnMouseOut,[this]);
	};
	var D=r.insertCell(-1);
	D.className='MN_Icon';
	D.appendChild(this.Icon.CreateIconElement(C));
	D=r.insertCell(-1);
	D.className='MN_Label';
	D.noWrap=true;
	D.appendChild(C.createTextNode(this.Label));
	D=r.insertCell(-1);
	if (B)
	{
		D.className='MN_Arrow';
		var E=D.appendChild(C.createElement('IMG'));
		E.src=FCK_IMAGES_PATH+'arrow_'+FCKLang.Dir+'.gif';
		E.width=4;
		E.height=7;
		this.SubMenu.Create();
		this.SubMenu.Panel.OnHide=FCKTools.CreateEventListener(FCKMenuItem_SubMenu_OnHide,this);
	}
};
FCKMenuItem.prototype.Activate=function()
{
	this.MainElement.className='MN_Item_Over';
	if (this.HasSubMenu)
	{
		this.SubMenu.Show(this.MainElement.offsetWidth+2,-2,this.MainElement);
	};
	FCKTools.RunFunction(this.OnActivate,this);
};
FCKMenuItem.prototype.Deactivate=function()
{
	this.MainElement.className='MN_Item';
	if (this.HasSubMenu) this.SubMenu.Hide();
};
function FCKMenuItem_SubMenu_OnClick(A,B)
{
	FCKTools.RunFunction(B.OnClick,B,[A]);
};
function FCKMenuItem_SubMenu_OnHide(A)
{
	A.Deactivate();
};
function FCKMenuItem_OnClick(A,B)
{
	if (B.HasSubMenu)
	B.Activate();
	else
	{
		B.Deactivate();
		FCKTools.RunFunction(B.OnClick,B,[B]);
	}
};
function FCKMenuItem_OnMouseOver(A,B)
{
	B.Activate();
};
function FCKMenuItem_OnMouseOut(A,B)
{
	B.Deactivate();
};
function FCKMenuItem_Cleanup()
{
	this.MainElement=null;
};
var FCKMenuBlock=function()
{
	this._Items=[];
};
FCKMenuBlock.prototype.Count=function()
{
	return this._Items.length;
};
FCKMenuBlock.prototype.AddItem=function(A,B,C,D,E)
{
	var F=new FCKMenuItem(this,A,B,C,D,E);
	F.OnClick=FCKTools.CreateEventListener(FCKMenuBlock_Item_OnClick,this);
	F.OnActivate=FCKTools.CreateEventListener(FCKMenuBlock_Item_OnActivate,this);
	this._Items.push(F);return F;
};
FCKMenuBlock.prototype.AddSeparator=function()
{
	this._Items.push(new FCKMenuSeparator());
};
FCKMenuBlock.prototype.RemoveAllItems=function()
{
	this._Items=[];
	var A=this._ItemsTable;
	if (A)
	{
		while (A.rows.length>0) A.deleteRow(0);
	}
};
FCKMenuBlock.prototype.Create=function(A)
{
	if (!this._ItemsTable)
	{
		if (FCK.IECleanup)
		FCK.IECleanup.AddItem(this,FCKMenuBlock_Cleanup);
		this._Window=FCKTools.GetElementWindow(A);
		var B=FCKTools.GetElementDocument(A);
		var C=A.appendChild(B.createElement('table'));
		C.cellPadding=0;
		C.cellSpacing=0;
		FCKTools.DisableSelection(C);
		var D=C.insertRow(-1).insertCell(-1);
		D.className='MN_Menu';
		var E=this._ItemsTable=D.appendChild(B.createElement('table'));
		E.cellPadding=0;
		E.cellSpacing=0;
	};
	for (var i=0;i<this._Items.length;i++) 
	this._Items[i].Create(this._ItemsTable);
};
function FCKMenuBlock_Item_OnClick(A,B)
{
	if (B.Hide)
	B.Hide();
	FCKTools.RunFunction(B.OnClick,B,[A]);
};
function FCKMenuBlock_Item_OnActivate(A)
{
	var B=A._ActiveItem;
	if (B&&B!=this)
	{
		if (!FCKBrowserInfo.IsIE&&B.HasSubMenu&&!this.HasSubMenu)
		{
			A._Window.focus();
			A.Panel.HasFocus=true;
		};
		B.Deactivate();
	};
	A._ActiveItem=this;
};
function FCKMenuBlock_Cleanup()
{
	this._Window=null;
	this._ItemsTable=null;
};
var FCKMenuSeparator=function(){};
FCKMenuSeparator.prototype.Create=function(A)
{
	var B=FCKTools.GetElementDocument(A);
	var r=A.insertRow(-1);
	var C=r.insertCell(-1);
	C.className='MN_Separator MN_Icon';
	C=r.insertCell(-1);
	C.className='MN_Separator';
	C.appendChild(B.createElement('DIV')).className='MN_Separator_Line';
	C=r.insertCell(-1);
	C.className='MN_Separator';
	C.appendChild(B.createElement('DIV')).className='MN_Separator_Line';
};
var FCKMenuBlockPanel=function()
{
	FCKMenuBlock.call(this);
};
FCKMenuBlockPanel.prototype=new FCKMenuBlock();
FCKMenuBlockPanel.prototype.Create=function()
{
	var A=this.Panel=(this.Parent&&this.Parent.Panel?this.Parent.Panel.CreateChildPanel():new FCKPanel());
	A.AppendStyleSheet(FCKConfig.SkinEditorCSS);
	FCKMenuBlock.prototype.Create.call(this,A.MainNode);
};
FCKMenuBlockPanel.prototype.Show=function(x,y,A)
{
	if (!this.Panel.CheckIsOpened()) 
	this.Panel.Show(x,y,A);
};
FCKMenuBlockPanel.prototype.Hide=function()
{
	if (this.Panel.CheckIsOpened())
	this.Panel.Hide();
};
var FCKContextMenu=function(A,B)
{//a=[object]	b="ltr"
	this.CtrlDisable=false;//　設定 CtrlDisable 屬性
	var C=this._Panel=new FCKPanel(A);　//　設定 _Panel 屬性
	C.AppendStyleSheet(FCKConfig.SkinEditorCSS);
	//a="http://192.168.0.2/move/admin/fckeditor/editor/skins/silver/fck_editor.css"
	C.IsContextMenu=true;
	if (FCKBrowserInfo.IsGecko) 
	C.Document.addEventListener('draggesture',function(e){e.preventDefault();return false;},true);
	var D=this._MenuBlock=new FCKMenuBlock();//　設定 _MenuBlock 屬性
	D.Panel=C;
	D.OnClick=FCKTools.CreateEventListener(FCKContextMenu_MenuBlock_OnClick,this);
	this._Redraw=true;//　設定 _Redraw 屬性
};
FCKContextMenu.prototype.SetMouseClickWindow=function(A)
{
	if (!FCKBrowserInfo.IsIE)
	{
		this._Document=A.document;
		if (FCKBrowserInfo.IsOpera&&!('oncontextmenu' in document.createElement('foo')))
		{
			this._Document.addEventListener('mousedown',FCKContextMenu_Document_OnMouseDown,false);
			this._Document.addEventListener('mouseup',FCKContextMenu_Document_OnMouseUp,false);
		};
		this._Document.addEventListener('contextmenu',FCKContextMenu_Document_OnContextMenu,false);
	}
};
FCKContextMenu.prototype.AddItem=function(A,B,C,D,E)
{
	var F=this._MenuBlock.AddItem(A,B,C,D,E);
	this._Redraw=true;
	return F;
};
FCKContextMenu.prototype.AddSeparator=function()
{
	this._MenuBlock.AddSeparator();
	this._Redraw=true;
};
FCKContextMenu.prototype.RemoveAllItems=function()
{
	this._MenuBlock.RemoveAllItems();
	this._Redraw=true;
};
FCKContextMenu.prototype.AttachToElement=function(A)//设置右键菜单
{//a=[object]
	if (FCKBrowserInfo.IsIE)//true
	FCKTools.AddEventListenerEx(A,'contextmenu',FCKContextMenu_AttachedElement_OnContextMenu,this);
	//oncontextmenu 在用户使用鼠标右键单击客户区打开上下文菜单时触发。
	else
	A._FCKContextMenu=this;
};
function FCKContextMenu_Document_OnContextMenu(e)
{
	if (FCKConfig.BrowserContextMenu)
	return true;
	var A=e.target;
	while (A)
	{
		if (A._FCKContextMenu)
		{
			if (A._FCKContextMenu.CtrlDisable&&(e.ctrlKey||e.metaKey))
			return true;
			FCKTools.CancelEvent(e);
			FCKContextMenu_AttachedElement_OnContextMenu(e,A._FCKContextMenu,A);
			return false;
		};
		A=A.parentNode;
	};
	return true;
};
var FCKContextMenu_OverrideButton;
function FCKContextMenu_Document_OnMouseDown(e)
{
	if(!e||e.button!=2)
	return false;
	if (FCKConfig.BrowserContextMenu)
	return true;
	var A=e.target;
	while (A)
	{
		if (A._FCKContextMenu)
		{
			if (A._FCKContextMenu.CtrlDisable&&(e.ctrlKey||e.metaKey))
			return true;
			var B=FCKContextMenu_OverrideButton;
			if(!B)
			{
				var C=FCKTools.GetElementDocument(e.target);
				B=FCKContextMenu_OverrideButton=C.createElement('input');
				B.type='button';
				var D=C.createElement('p');
				C.body.appendChild(D);
				D.appendChild(B);
			};
			B.style.cssText='position:absolute;top:'+(e.clientY-2)+'px;left:'+(e.clientX-2)+'px;width:5px;height:5px;opacity:0.01';
		};
		A=A.parentNode;
	};
	return false;
};
function FCKContextMenu_Document_OnMouseUp(e)
{
	if (FCKConfig.BrowserContextMenu)
	return true;
	var A=FCKContextMenu_OverrideButton;
	if(A)
	{
		var B=A.parentNode;
		B.parentNode.removeChild(B);
		FCKContextMenu_OverrideButton=undefined;
		if(e&&e.button==2)
		{
			FCKContextMenu_Document_OnContextMenu(e);
			return false;
		}
	};
	return true;
};
function FCKContextMenu_AttachedElement_OnContextMenu(A,B,C)
{//a=[object]	b=[object Object]	c=undefined
	alet("右击")
	if ((B.CtrlDisable&&(A.ctrlKey||A.metaKey))||FCKConfig.BrowserContextMenu)//false
	return true;
	var D=C||this;
	if (B.OnBeforeOpen)
	B.OnBeforeOpen.call(B,D);
	if (B._MenuBlock.Count()==0)
	return false;
	if (B._Redraw)
	{
		B._MenuBlock.Create(B._Panel.MainNode);
		B._Redraw=false;
	};
	FCKTools.DisableSelection(B._Panel.Document.body);
	var x=0;
	var y=0;
	if (FCKBrowserInfo.IsIE)
	{
		x=A.screenX;
		y=A.screenY;
	}
	else if (FCKBrowserInfo.IsSafari)
	{
		x=A.clientX;
		y=A.clientY;
	}
	else
	{
		x=A.pageX;
		y=A.pageY;
	};
	B._Panel.Show(x,y,A.currentTarget||null);
	return false;
};
function FCKContextMenu_MenuBlock_OnClick(A,B)
{
	B._Panel.Hide();
	FCKTools.RunFunction(B.OnItemClick,B,A);
};
FCK.ContextMenu={};
FCK.ContextMenu.Listeners=[];
FCK.ContextMenu.RegisterListener=function(A)//将(a)添加到Listeners数组中，并返回数组的新长度值。
{//A="undifined"
	if (A) //条件不成立
	{
	this.Listeners.push(A);
	//push 方法		将新元素添加到一个数组中，并返回数组的新长度值。
	};
};
function FCK_ContextMenu_Init()//?????????????
{
	var A=FCK.ContextMenu._InnerContextMenu=new FCKContextMenu(FCKBrowserInfo.IsIE?window:window.parent,FCKLang.Dir);//一个 FCKContextMenu 的物件
		//FCKLang.Dir="ltr"		在"zh-cn.js"中定义.
		//Parent 属性	指示在分级结构中是当前成员的父的成员。
	A.CtrlDisable=FCKConfig.BrowserContextMenuOnCtrl;//=false	设定属性
	A.OnBeforeOpen=FCK_ContextMenu_OnBeforeOpen;//函数如下:
/*	function FCK_ContextMenu_OnBeforeOpen()
{
	FCK.Events.FireEvent('OnSelectionChange');
	var A,sTagName;
	if ((A=FCKSelection.GetSelectedElement()))
	sTagName=A.tagName;
	var B=FCK.ContextMenu._InnerContextMenu;
	B.RemoveAllItems();
	var C=FCK.ContextMenu.Listeners;
	for (var i=0;i<C.length;i++) 
	C[i].AddItems(B,A,sTagName);
};*/
	A.OnItemClick=FCK_ContextMenu_OnItemClick;//函数如下:
/*function FCK_ContextMenu_OnItemClick(A)
{
	if (!FCKBrowserInfo.IsIE) 
	FCK.Focus();
	FCKCommands.GetCommand(A.Name).Execute(A.CustomData);
};*/
	//把 OnBeforeOpen、OnItemClick 等事件處理器接上
	var B=FCK.ContextMenu;//=[object Object]
	for (var i=0;i<FCKConfig.ContextMenu.length;i++)
	//用 FCK.ContextMenu.RegisterListener 把 FCKConfig.ContextMenu 下所有 FCKContentMenu 的 Listener 都 register 到起來
	{//FCKConfig.ContextMenu.length=18
		B.RegisterListener(FCK_ContextMenu_GetListener(FCKConfig.ContextMenu[i]));//=undefined
		//B.RegisterListener(A)//将(a)添加到Listeners数组中，并返回数组的新长度值。
			//FCK_ContextMenu_GetListener(A)=undefined
				//FCKConfig.ContextMenu[0]="Generic"
	}
	
};
function FCK_ContextMenu_GetListener(A)//?????????????
{//A="Generic"
	switch (A)
	{
		case 'Generic':
			return{
			AddItems:function(menu,tag,tagName)
			{
				menu.AddItem('Cut',FCKLang.Cut,7,FCKCommands.GetCommand('Cut').GetState()==-1);
				menu.AddItem('Copy',FCKLang.Copy,8,FCKCommands.GetCommand('Copy').GetState()==-1);
				menu.AddItem('Paste',FCKLang.Paste,9,FCKCommands.GetCommand('Paste').GetState()==-1);
			}
		};
		case 'Table':return		{
			AddItems:function(menu,tag,tagName)
			{
				var B=(tagName=='TABLE');
				var C=(!B&&FCKSelection.HasAncestorNode('TABLE'));
				if (C)
				{
					menu.AddSeparator();
					var D=menu.AddItem('Cell',FCKLang.CellCM);
					D.AddItem('TableInsertCellBefore',FCKLang.InsertCellBefore,69);
					D.AddItem('TableInsertCellAfter',FCKLang.InsertCellAfter,58);
					D.AddItem('TableDeleteCells',FCKLang.DeleteCells,59);
					if (FCKBrowserInfo.IsGecko)
					D.AddItem('TableMergeCells',FCKLang.MergeCells,60,FCKCommands.GetCommand('TableMergeCells').GetState()==-1);
					else
					{
						D.AddItem('TableMergeRight',FCKLang.MergeRight,60,FCKCommands.GetCommand('TableMergeRight').GetState()==-1);
						D.AddItem('TableMergeDown',FCKLang.MergeDown,60,FCKCommands.GetCommand('TableMergeDown').GetState()==-1);
					};
					D.AddItem('TableHorizontalSplitCell',FCKLang.HorizontalSplitCell,61,FCKCommands.GetCommand('TableHorizontalSplitCell').GetState()==-1);
					D.AddItem('TableVerticalSplitCell',FCKLang.VerticalSplitCell,61,FCKCommands.GetCommand('TableVerticalSplitCell').GetState()==-1);
					D.AddSeparator();
					D.AddItem('TableCellProp',FCKLang.CellProperties,57,FCKCommands.GetCommand('TableCellProp').GetState()==-1);
					menu.AddSeparator();D=menu.AddItem('Row',FCKLang.RowCM);
					D.AddItem('TableInsertRowBefore',FCKLang.InsertRowBefore,70);
					D.AddItem('TableInsertRowAfter',FCKLang.InsertRowAfter,62);
					D.AddItem('TableDeleteRows',FCKLang.DeleteRows,63);
					menu.AddSeparator();D=menu.AddItem('Column',FCKLang.ColumnCM);
					D.AddItem('TableInsertColumnBefore',FCKLang.InsertColumnBefore,71);
					D.AddItem('TableInsertColumnAfter',FCKLang.InsertColumnAfter,64);
					D.AddItem('TableDeleteColumns',FCKLang.DeleteColumns,65);
				};
				if (B||C)
				{
					menu.AddSeparator();
					menu.AddItem('TableDelete',FCKLang.TableDelete);
					menu.AddItem('TableProp',FCKLang.TableProperties,39);
				}
			}
		};
		case 'Link':return {
			AddItems:function(menu,tag,tagName)
			{
				var E=(tagName=='A'||FCKSelection.HasAncestorNode('A'));
				if (E||FCK.GetNamedCommandState('Unlink')!=-1)
				{
					var F=FCKSelection.MoveToAncestorNode('A');
					var G=(F&&F.name.length>0&&F.href.length==0);
					if (G) return;
					menu.AddSeparator();
					menu.AddItem('VisitLink',FCKLang.VisitLink);
					menu.AddSeparator();
					if (E) menu.AddItem('Link',FCKLang.EditLink,34);
					menu.AddItem('Unlink',FCKLang.RemoveLink,35);
				}
			}
		};
		case 'Image':return		{
			AddItems:function(menu,tag,tagName)
			{
				if (tagName=='IMG'&&!tag.getAttribute('_fckfakelement'))
				{
					menu.AddSeparator();
					menu.AddItem('Image',FCKLang.ImageProperties,37);
				}
			}
		};
		case 'Anchor':return 		{
			AddItems:function(menu,tag,tagName)
			{
				var F=FCKSelection.MoveToAncestorNode('A');
				var G=(F&&F.name.length>0);
				if (G||(tagName=='IMG'&&tag.getAttribute('_fckanchor')))
				{
					menu.AddSeparator();
					menu.AddItem('Anchor',FCKLang.AnchorProp,36);
					menu.AddItem('AnchorDelete',FCKLang.AnchorDelete);
				}
			}
		};
		case 'Flash':return 		{
			AddItems:function(menu,tag,tagName)
			{
				if (tagName=='IMG'&&tag.getAttribute('_fckflash'))
				{
					menu.AddSeparator();
					menu.AddItem('Flash',FCKLang.FlashProperties,38);
				}
			}
		};
		case 'Form':return 		{
			AddItems:function(menu,tag,tagName)
			{
				if (FCKSelection.HasAncestorNode('FORM'))
				{
					menu.AddSeparator();
					menu.AddItem('Form',FCKLang.FormProp,48);
				}
			}
		};
		case 'Checkbox':return		{
			AddItems:function(menu,tag,tagName)
			{
				if (tagName=='INPUT'&&tag.type=='checkbox')
				{
					menu.AddSeparator();
					menu.AddItem('Checkbox',FCKLang.CheckboxProp,49);
				}
			}
		};
		case 'Radio':return		{
			AddItems:function(menu,tag,tagName)
			{
				if (tagName=='INPUT'&&tag.type=='radio')
				{
					menu.AddSeparator();
					menu.AddItem('Radio',FCKLang.RadioButtonProp,50);
				}
			}
		};
		case 'TextField':return		{
			AddItems:function(menu,tag,tagName)
			{
				if (tagName=='INPUT'&&(tag.type=='text'||tag.type=='password'))
				{
					menu.AddSeparator();
					menu.AddItem('TextField',FCKLang.TextFieldProp,51);
				}
			}
		};
		case 'HiddenField':return		{
			AddItems:function(menu,tag,tagName)
			{
				if (tagName=='IMG'&&tag.getAttribute('_fckinputhidden'))
				{
					menu.AddSeparator();
					menu.AddItem('HiddenField',FCKLang.HiddenFieldProp,56);
				}
			}
		};
		case 'ImageButton':return 		{
			AddItems:function(menu,tag,tagName)
			{
				if (tagName=='INPUT'&&tag.type=='image')
				{
					menu.AddSeparator();
					menu.AddItem('ImageButton',FCKLang.ImageButtonProp,55);
				}
			}
		};
		case 'Button':return 		{
			AddItems:function(menu,tag,tagName)
			{
				if (tagName=='INPUT'&&(tag.type=='button'||tag.type=='submit'||tag.type=='reset'))
				{
					menu.AddSeparator();
					menu.AddItem('Button',FCKLang.ButtonProp,54);
				}
			}
		};
		case 'Select':return 		{
			AddItems:function(menu,tag,tagName)
			{
				if (tagName=='SELECT')
				{
					menu.AddSeparator();
					menu.AddItem('Select',FCKLang.SelectionFieldProp,53);
				}
			}
		};
		case 'Textarea':return		{
			AddItems:function(menu,tag,tagName)
			{
				if (tagName=='TEXTAREA')
				{
					menu.AddSeparator();
					menu.AddItem('Textarea',FCKLang.TextareaProp,52);
				}
			}
		};
		case 'BulletedList':return		{
			AddItems:function(menu,tag,tagName)
			{
				if (FCKSelection.HasAncestorNode('UL'))
				{
					menu.AddSeparator();
					menu.AddItem('BulletedList',FCKLang.BulletedListProp,27);
				}
			}
		};
		case 'NumberedList':return		{
			AddItems:function(menu,tag,tagName)
			{
				if (FCKSelection.HasAncestorNode('OL'))
				{
					menu.AddSeparator();
					menu.AddItem('NumberedList',FCKLang.NumberedListProp,26);
				}
			}
		};
		case 'DivContainer':return 		{
			AddItems:function(menu,tag,tagName)
			{
				var J=FCKDomTools.GetSelectedDivContainers();
				if (J.length>0)
				{
					menu.AddSeparator();
					menu.AddItem('EditDiv',FCKLang.EditDiv,75);
					menu.AddItem('DeleteDiv',FCKLang.DeleteDiv,76);
				}
			}
		};
	};
	return null;
};
function FCK_ContextMenu_OnBeforeOpen()
{
	FCK.Events.FireEvent('OnSelectionChange');
	var A,sTagName;
	if ((A=FCKSelection.GetSelectedElement()))
	sTagName=A.tagName;
	var B=FCK.ContextMenu._InnerContextMenu;
	B.RemoveAllItems();
	var C=FCK.ContextMenu.Listeners;
	for (var i=0;i<C.length;i++) 
	C[i].AddItems(B,A,sTagName);
};
function FCK_ContextMenu_OnItemClick(A)
{
	if (!FCKBrowserInfo.IsIE) 
	FCK.Focus();
	FCKCommands.GetCommand(A.Name).Execute(A.CustomData);
};
var FCKHtmlIterator=function(A)
{
	this._sourceHtml=A;
};
FCKHtmlIterator.prototype=
{
	Next:function()
	{
		var A=this._sourceHtml;
		if (A==null)
		return null;
		var B=FCKRegexLib.htmTag.exec(A);
		var C=false;
		var D="";
		if (B)
		{
			if (B.index>0)
			{
				D=A.substr(0,B.index);
				this._sourceHtml=A.substr(B.index);
			}
			else
			{
				C=true;
				D=B[0];
				this._sourceHtml=A.substr(B[0].length);
			}
		}
		else
		{
			D=A;
			this._sourceHtml=null;
		};
		return { 'isTag':C,'value':D };
	},
	Each:function(A)
	{
		var B;
		while ((B=this.Next()))
		A(B.isTag,B.value);
	}
};
var FCKHtmlIterator=function(A)
{
	this._sourceHtml=A;
};
FCKHtmlIterator.prototype=
{
	Next:function()
	{
		var A=this._sourceHtml;
		if (A==null)
		return null;
		var B=FCKRegexLib.htmTag.exec(A);
		var C=false;
		var D="";
		if (B)
		{
			if (B.index>0)
			{
				D=A.substr(0,B.index);
				this._sourceHtml=A.substr(B.index);
			}
			else
			{
				C=true;
				D=B[0];
				this._sourceHtml=A.substr(B[0].length);
			}
		}
		else
		{
			D=A;
			this._sourceHtml=null;
		};
		return { 'isTag':C,'value':D };
	},
	Each:function(A)
	{
		var B;
		while ((B=this.Next())) 
		A(B.isTag,B.value);
	}
};
var FCKPlugin=function(A,B,C)
{
	this.Name=A;
	this.BasePath=C?C:FCKConfig.PluginsPath;
	this.Path=this.BasePath+A+'/';
	if (!B||B.length==0)
	this.AvailableLangs=[];
	else 
	this.AvailableLangs=B.split(',');
};
FCKPlugin.prototype.Load=function()
{
	if (this.AvailableLangs.length>0)
	{
		var A;
		if (this.AvailableLangs.IndexOf(FCKLanguageManager.ActiveLanguage.Code)>=0)
		A=FCKLanguageManager.ActiveLanguage.Code;
		else
		A=this.AvailableLangs[0];
		LoadScript(this.Path+''+A+'.js');
	};
	LoadScript(this.Path+'fckplugin.js');
};
var FCKPlugins=FCK.Plugins={};
FCKPlugins.ItemsCount=0;
FCKPlugins.Items={};
FCKPlugins.Load=function()//???????????????
{
	var A=FCKPlugins.Items;//=[object Object]
	for (var i=0;i<FCKConfig.Plugins.Items.length;i++)
	{//FCKConfig.Plugins.Items.length=0
		var B=FCKConfig.Plugins.Items[i];
		var C=A[B[0]]=new FCKPlugin(B[0],B[1],B[2]);
		FCKPlugins.ItemsCount++;
	};
	for (var s in A)
	{//A=[object Object]
		A[s].Load();
	};
	FCKPlugins.Load=null;
};
