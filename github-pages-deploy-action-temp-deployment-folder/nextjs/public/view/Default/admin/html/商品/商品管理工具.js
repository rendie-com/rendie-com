//解决IE6 IE7 JSON.stringify JSON 未定义问题
"object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(a){return 10>a?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){let b=meta[a];return"string"==typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){let c,d,e,f,h,g=gap,i=b[a];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(a)),"function"==typeof rep&&(i=rep.call(b,a,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,h=[],"[object Array]"===Object.prototype.toString.apply(i)){for(f=i.length,c=0;f>c;c+=1)h[c]=str(c,i)||"null";return e=0===h.length?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&"object"==typeof rep)for(f=rep.length,c=0;f>c;c+=1)"string"==typeof rep[c]&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=0===h.length?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});let cx,escapable,gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(a,b,c){let d;if(gap="",indent="","number"==typeof c)for(d=0;c>d;d+=1)indent+=" ";else"string"==typeof c&&(indent=c);if(rep=b,b&&"function"!=typeof b&&("object"!=typeof b||"number"!=typeof b.length))throw new Error("JSON.stringify");return str("",{"":a})}),"function"!=typeof JSON.parse&&(cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,JSON.parse=function(text,reviver){function walk(a,b){let c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),void 0!==d?e[c]=d:delete e[c]);return reviver.call(a,b,e)}let j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();

function aeopAeProductSKUs_skuPrice(des,num){//取价格属性中的第一个价格
	try{ 
		eval("let obj="+des)
		if(obj[0])
		{
			return (obj[0].skuPrice*num).toFixed(2)
		}
		else
		{
			return ""
		}
	 }catch(e){return ""}
}
function des_images(des){//取详请中的图片以"|"分隔
	let patt1,result=[],ret=[]
	patt1=/<img[\s\S]+?src=[\"']?([^\"']{4,}?)[\"'][\S\s]*?[\/]?>/ig
	do
	{
		result=patt1.exec(des);
		if(result){
			if(ret.join("|").indexOf(result[1])==-1)//去重复
			{
				ret[ret.length]=result[1];
			}
		}
	}while(result!=null)
	return ret.join("|")
}
function des_images2(des){//取详请中的图片以","分隔
	let patt1,result=[],ret=[],i=0
	patt1=/<img[\s\S]+?src=[\"']?([^\"']{4,}?)[\"'][\S\s]*?[\/]?>/ig
	do
	{
		result=patt1.exec(des);
		if(result){
			if(ret.join("|").indexOf(result[1])==-1)//去重复
			{
				ret[ret.length]=result[1];
			}
		}
		i++
		if(i==8)result=null
	}while(result!=null)
	return ret.join(",")
}
function typetoname(type){
	return '<r:type where=" where @.from=\'aliexpress\' and @.fromid=\''+type+'\'" size=1>\
						<r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:upid/>\'" size=1>\
							<r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:upid/>\'" size=1>\
								<r:type where=" where @.from=\'aliexpress\' and @.fromid=\'<:upid/>\'" size=1>\
								<:enname/>>>\
								</r:type>\
							<:enname/>>>\
							</r:type>\
						<:enname/>>>\
						</r:type>\
						<:enname/>\
					</r:type>'
}
function aeopAeProductPropertys(aeop){
	let arr=[],txt
	try{
		eval("let obj="+aeop)
		for(let i=0;i<obj.length;i++){
			arr[i]=obj[i].attrName+":"+obj[i].attrValue
		}
		txt=arr.join("\n")
		txt=txt.replace(/"/ig,"\"\"");
		return txt
	 }catch(e){return ""}
}
function productwhere(id){
 let str=' :type in(<r:type where=" where @.from=\'aliexpress\' and @.fromid=\''+id+'\'" size=100>\
						<if "<:isleaf/>"=="True"}\
							\'<:fromid/>\',\
						<else/>\
							<r:type where=" where @.from=\'aliexpress\' and @.upid=\'<:fromid/>\'" size=100>\
								<if "<:isleaf/>"=="True"}\
									\'<:fromid/>\',\
								<else/>\
									<r:type where=" where @.from=\'aliexpress\' and @.upid=\'<:fromid/>\'" size=100>\
										<if "<:isleaf/>"=="True"}\
											\'<:fromid/>\',\
										<else/>\
											<r:type where=" where @.from=\'aliexpress\' and @.upid=\'<:fromid/>\'" size=100>\
												<if "<:isleaf/>"=="True"}\'<:fromid/>\',</if>\
											</r:type>\
										</if>\
									</r:type>\
								</if>\
							</r:type>\
						</if>\
					</r:type>\
					\''+id+'\') and '
 return str
}