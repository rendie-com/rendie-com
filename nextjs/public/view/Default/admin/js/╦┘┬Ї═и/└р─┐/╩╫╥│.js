'use strict';
var fun =
{
  a01: function () {
    //obj.params.jsFile     表示选择JS文件
    let data = [
      {
        action: "sqlite",
        database: "aliexpress",
        sql: "select " + Tool.fieldAs("id,isleaf,hide,sort,count1,count2,count3,name,enname,fromid") + " FROM @.type where @.upid=0 order by @.sort desc",
      }]
    Tool.ajax.a01(data, this.a02, this);
  },
  a02: function (t) {
    let html = '', td1 = '',arr=t[0];
    for (let i = 0; i < arr.length; i++) {
      td1 = arr[i].name + '（' + arr[i].enname + '）' + (arr[i].count ? '【<strong>' + arr[i].count + '</strong>】' : '');
      html += '\
      <tr '+ (arr[i].hide == 0 ? '' : 'style="color:#99abab;"') + '>\
        <td class="center">'+ (i+1) + '</td>\
        <td>'+ (arr[i].isleaf == 1 ? '<a href="javascript:" class="Mo"></a>' : '<a href="javascript:" class="Mo MoA" onclick="fun.c03($(this),' + arr[i].fromid + ')"></a> ') + arr[i].fromid + '</td>\
        <td>'+ td1 + '</td>\
        <td class="center">'+ arr[i].count3 + '</td>\
        <td class="center">'+ arr[i].count1 + '</td>\
        <td class="center">'+ arr[i].count2 + '</td>\
        <td class="center">'+ arr[i].sort + '</td>\
        <td class="left w30" style="padding-left: 30px;position: relative;">\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
        <li onClick="fun.c09('+ arr[i].id + ',' + arr[i].hide + ')"><a class="dropdown-item pointer">已' + (arr[i].hide == 0 ? '显示' : '隐藏') + '</a></li>\
        </ul>\
        </td>\
      </tr>'
    }
    html = '\
    <header class="panel-heading">\
	    <div class="active" onclick="Tool.main(\'\')">【速卖通】类目</div>\
        <div onclick="Tool.main(\'?jsFile=js01\')">绑定到【敦煌网】类目</div>\
    </header>\
    <div class="p-2">\
      <table class="table table-hover">\
      <thead class="table-light">\
        <tr>\
          <th class="w50">编号</th>\
          <th class="w200 center">来源ID</th>\
          <th>分类名称（英文）</th>\
          <th class="w70 center" title="发往美国免运费，且已上传的商品。">已上传</th>\
          <th class="w70 center" title="发往美国免运费，且未上传的商品。">可上传</th>\
          <th class="w70 center" title="是发往美国收运费">收运费</th>\
          <th class="w70 center">排序</th>\
					<th class="left w30" style="padding-left: 30px;position: relative;">\
						<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
						<ul class="dropdown-menu">\
							<li onClick="Tool.open4(\'js07\')"><a class="dropdown-item pointer" title="包括【已上传，可上传】">统计一级类目数量</a></li>\
							<li onClick="fun.c07()"><a class="dropdown-item pointer">*采集类目</a></li>\
							<li onClick="fun.c08()"><a class="dropdown-item pointer">*采集类目属性</a></li>\
							<li onClick="Tool.open4(\'js04\')"><a class="dropdown-item pointer">统计一级二级三级类目的商品数量</a></li>\
							<li onClick="Tool.open4(\'js05\')"><a class="dropdown-item pointer">统计叶子类目的商品数量</a></li>\
							<li onClick="fun.c11()"><a class="dropdown-item pointer" title="排序值小于500">按条件隐藏一级类目</a></li>\
							<li onClick="fun.c12()"><a class="dropdown-item pointer" title="排序值小于1">按条件隐藏二级类目</a></li>\
							<li onClick="Tool.open4(\'js06\')"><a class="dropdown-item pointer" title="排序值小于1">按条件隐藏三级类目</a></li>\
							<li onClick="fun.c14()"><a class="dropdown-item pointer" title="排序值小于1">按条件隐藏叶子类目</a></li>\
						</ul>\
					</th>\
        </tr>\
      </thead>\
      <tbody>'+ html + '</tbody>\
      </table>\
    </div>'
    Tool.html(null, null, html);
  },
  c03: function (This, id) {
    if (This.attr("Class") == "Mo MoB") { This.attr("Class", "Mo MoA"); $(".Mo" + id).hide(); }
    else {
      This.attr("Class", "Mo MoB")
      if ($(".Mo" + id).length) { $(".Mo" + id).show(); }
      else {
        This.parent().parent().after('<tr><td class="Mo' + id + ' p-0" colspan="7"><img height="30" src="/' + o.path + 'admin/img/loading_42x42.gif"/></td></tr>');
        let str = '[{}\
                <r:type db="sqlite.aliexpress" where=" where @.upid='+ id + ' order by @.sort desc" size=200>\
                  ,{\
                  "id":<:id/>,\
                  "sort":<:sort/>,\
                  "hide":<:hide/>,\
                  "fromid":"<:fromid/>",\
                  "name":"<:name tag=js/>",\
                  "enname":"<:enname tag=js/>",\
                  <if <:isleaf/>==1>\
                    <r:typebind db="sqlite.aliexpress" size=1 where=" where @.type=<1:fromid/>">\
                      "typebind":"<:type/>",\
                      "dhtypepath":<:dhtypepath tag=0/>,\
                    </r:typebind>\
                  </if>\
                  "count":"共条",\
                  "isleaf":"<:isleaf/>"\
                }\
                </r:type>]'
        let m1 = parseInt(This.css("margin-left")) + 20
        Tool.ajax.a01(str, 1, this.c04, this, [id, m1])
      }
    }
  },
  c04: function (o1, o2) {
    let html = "", t1 = ""
    for (let i = 1; i < o1.length; i++) {
      if (o1[i].isleaf == "1") {
        t1 = '<a href="javascript:"  onclick="fun.c01($(this),\'' + o1[i].fromid + '\')" class="detail-button">查看属性</a>\
        <a href="javascript:" class="detail-button" onClick="fun.c05(\''+ o1[i].fromid + '\',\'' + o1[i].typebind + '\']);" id="alitype' + o1[i].fromid + '">\
        '+ (o1[i].dhtypepath ? '已绑【' + o1[i].dhtypepath.join(" &gt; ") + '】' : "未绑定") + '</a> '
      }
      else { t1 = ""; }
      html += '\
      <tr '+ (o1[i].hide == 0 ? '' : 'style="color:#99abab;"') + '>\
        <td class="w50 center">'+ i + '</td>\
				<td class="w200">'+ (o1[i].isleaf == 0 ? '<a href="javascript:" class="Mo MoA" onclick="fun.c03($(this),\'' + o1[i].fromid + '\')" style="margin-left:' + o2[1] + 'px;"></a>' : '<a class="Mo" style="margin-left:' + o2[1] + 'px;"></a>') + '&nbsp;' + o1[i].fromid + '</td>\
        <td class="p-0">'+ o1[i].name + '（' + o1[i].enname + '）' + t1 + '<button type="button" class="btn btn-sm btn-outline-secondary" title="按类目采集，采列表页面，前2页。" onclick="fun.c06(\'' + o1[i].fromid + '\')">*采集运费模板</button></td>\
				<td class="w70 center">'+ o1[i].sort + '</td>\
        <td class="left w30" style="padding-left: 30px;position: relative;">\
					<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
					<ul class="dropdown-menu">\
						<li onClick="fun.c09('+ o1[i].id + ',' + o1[i].hide + ')"><a class="dropdown-item pointer">已' + (o1[i].hide == 0 ? '显示' : '隐藏') + '</a></li>\
					</ul>\
				</td>\
      </tr>'
    }
    $(".Mo" + o2[0]).html('<table class="table align-middle table-hover mb-0"><tbody>' + html + '</tbody></table>');
  },
  c11: function () {
    let html = '""<r: db="sqlite.aliexpress">update @.type set @.hide=0 where @.upid=0<1/>update @.type set @.hide=1 where @.upid=0 and @.sort<500</r:>'
    Tool.ajax.a01(html, 1, Tool.reload)
  },
  c12: function () {
    let str = '[0<r:type db="sqlite.aliexpress" where=" where @.upid=0 and @.hide=0" size=50>,<:fromid/></r:type>]'
    Tool.ajax.a01(str, 1, this.c13, this);
  },
  c13: function (oo) {
    oo.shift();
    alert("有必要再说")
    let html = '""<r: db="sqlite.aliexpress">update @.type set @.hide=1 where @.upid in(' + oo.join(",") + ') and @.sort<1</r:>'
    Tool.ajax.a01(html, 1, Tool.reload)
  },
}
fun.a01();



//  b10:function(js)
//	{
//		let str='';
//		for(let i=1;i<js.length;i++)
//		{
//			str+='<ul class="Tul list-group-item-action row"><li title="attrId='+js[i].attrId+'\nissku='+js[i].issku+'\nischild='+js[i].ischild+'\ntype='+js[i].type+'"  class="right w200">'+js[i].nameCn+'('+js[i].name+'):</li><li>'+this.b11(js[i])+'</li></ul>';
//		}
//		return str;
//	},
//  b11:function(oo)
//	{
//		let str="",oo2
//		if(oo.type=="input")
//		{
//			str='<input type="text" size="50" class="form-select">'
//		}
//		else if(oo.type=="list_box"||oo.type=="interval")
//		{
//			str='<select class="form-select"><option>请选择【'+oo.nameCn+'】</option>'
//			oo2=oo.js[0]
//			if(oo2)
//			{
//				for(let i=0;i<oo2.length;i++)
//				{
//					str+='<option title="id:'+oo2[i].id+'" value="'+oo2[i].id+'">'+oo2[i].names.zh+' ('+oo2[i].names.en+')</option>';
//				}
//			}
//			str+='</select>'
//		}
//		else if(oo.type=="check_box")
//		{
//			oo2=oo.js[0]
//			for(let i=0;i<oo2.length;i++)
//			{str+='<label class="checklabel"><input type="checkbox" title="id:'+oo2[i].id+'">'+oo2[i].names.zh+' ('+oo2[i].names.en+')</label>';}
//		}
//		else
//		{
//			str='未知 type:'+oo.type;
//		}
//		return str;
//	},
//  c01:function(This,id)
//	{
//		if($("#attributes"+id).length==0)
//		{
//			let str='[{}<r:attr db="sqlite.aliexpress" where=" where @.cateId='+id+' order by @.sort,:id asc" size=30>\
//			,{\
//				"cateId":'+id+',\
//				"ischild":"[attr:ischild]",\
//				"attrId":"[attr:attrId]",\
//				"type":"[attr:type]",\
//				"name":"[attr:name]",\
//				"nameCn":"[attr:nameCn]",\
//				"js":[[attr:js]]\
//			}</r:attr>]'
//		 Tool.ajax.a01
//		}
//		else if($("#attributes"+id).is(":visible"))
//		{$("#attributes"+id).hide()}
//		else
//		{$("#attributes"+id).show()}
//	},
//	c02:function(arr,oo)
//	{
//		oo[0].parent().parent().after('<div id="attributes'+oo[1]+'">'+this.b10(arr)+'</div>') ;
//	},
//  c05:function(alitype,bind)
//	{
//    obj.F4=[alitype,bind]
//    Tool.scriptArr(['admin/js/敦煌网/卖家账户/修改/绑定DH后类目.js']);
//  },
//  c06:function(SearchText)
//	{
//    SearchText=SearchText.replace(/\&/g," ")
//    let r=Tool.escape("/"+obj.arr.join("/"));//返回URL
//    Tool.main('/'+obj.arr[0]+"/list/"+obj.arr[2]+"/js1/"+SearchText+"/4/"+r);
//  },
//  c07:function()
//	{
//     let r=Tool.escape("/"+obj.arr.join("/"));//返回URL
//     Tool.main('/'+obj.arr[0]+"/list/"+obj.arr[2]+"/js2/"+r);
//  },
//  c08:function()
//	{
//     let r=Tool.escape("/"+obj.arr.join("/"));//返回URL
//     Tool.main('/'+obj.arr[0]+"/list/"+obj.arr[2]+"/js3/"+r);
//  },
//  c09:function(id,hide)
//	{
//		if(hide==0)
//		{hide=1;}
//		else
//		{hide=0;}
//		let html='""<r: db="sqlite.aliexpress">update @.type set @.hide='+hide+' where @.id='+id+'</r:>'

//  },




//  c14:function()
//	{
//		let html='""<r: db="sqlite.aliexpress">update @.type set @.hide=1 where @.isleaf=1 and @.sort<1</r:>'

//  }  