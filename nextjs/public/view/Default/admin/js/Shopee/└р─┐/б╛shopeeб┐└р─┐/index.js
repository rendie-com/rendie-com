'use strict';
var fun =
{
  a01: function () {
    //obj.params.jsFile     表示选择JS文件
    let data = [{
        action: "sqlite",
        database: "shopee/类目/类目",
        sql: "select " + Tool.fieldAs("id,isleaf,hide,sort,count1,count2,count3,name,enname,fromid") + " FROM @.table where @.upid=0 order by @.sort asc",
    }]
    Tool.ajax.a01(data, this.a02, this);
  },
  a02: function (t) {
    let arr = t[0]
    let html = '', td1 = '';
    for (let i = 0; i < arr.length; i++) {
      td1 = arr[i].name + '（' + arr[i].enname + '）' + (arr[i].count ? '【<strong>' + arr[i].count + '</strong>】' : '');
      html += '\
      <tr '+ (arr[i].hide == 0 ? '' : 'style="color:#99abab;"') + '>\
        <td class="left w30" style="padding-left: 30px;position: relative;">\
					<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
					<ul class="dropdown-menu">\
						<li onClick="fun.c09('+ arr[i].id + ',' + arr[i].hide + ')"><a class="dropdown-item pointer">已' + (arr[i].hide == 0 ? '显示' : '隐藏') + '</a></li>\
					</ul>\
				</td>\
        <td class="center">'+ (i + 1) + '</td>\
				<td>'+ (arr[i].isleaf == 1 ? '<a href="javascript:" class="Mo"></a>' : '<a href="javascript:" class="Mo MoA" onclick="fun.c03($(this),' + arr[i].fromid + ')"></a> ') + arr[i].fromid + '</td>\
        <td>'+ td1 + '</td>\
        <td class="center">'+ arr[i].count3 + '</td>\
        <td class="center">'+ arr[i].count1 + '</td>\
        <td class="center">'+ arr[i].count2 + '</td>\
        <td class="center">'+ arr[i].sort + '</td>\
      </tr>'
    }
    html = Tool.header(obj.params.jsFile) + '\
    <div class="p-2">\
      <table class="table table-hover">\
      <thead class="table-light">\
        <tr>\
					<th class="left w30" style="padding-left: 30px;position: relative;">\
						<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
						<ul class="dropdown-menu">\
							<li onClick="Tool.openR(\'?jsFile=js01\')"><a class="dropdown-item pointer">*采集类目</a></li>\
							<li onClick="Tool.openR(\'?jsFile=js02\')"><a class="dropdown-item pointer">*采集类目属性</a></li>\
						</ul>\
					</th>\
          <th class="w50">编号</th>\
          <th class="w200 center">来源ID</th>\
          <th>分类名称（英文）</th>\
          <th class="w70 center" title="发往美国免运费，且已上传的商品。">已上传</th>\
          <th class="w70 center" title="发往美国免运费，且未上传的商品。">可上传</th>\
          <th class="w70 center" title="是发往美国收运费">收运费</th>\
          <th class="w70 center">排序</th>\
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
        This.parent().parent().after('<tr><td class="Mo' + id + ' p-0" colspan="8"><img height="30" src="/' + o.path + 'admin/img/loading_42x42.gif"/></td></tr>');
        let data = [{
            action: "sqlite",
            database: "shopee/类目/类目",
            sql: "select @.id,@.sort,@.hide,@.fromid,@.name,@.enname,@.isleaf FROM @.table where @.upid=" + id + " order by @.sort asc",
          }]
        let m1 = parseInt(This.css("margin-left")) + 20
        Tool.ajax.a01(data, this.c04, this, [id, m1])
      }
    }
  },
  c04: function (t, o2) {
    let html = "", t1 = "", o1 = t[0]
    for (let i = 1; i < o1.length; i++) {
      if (o1[i].isleaf == "1") {
        t1 = '<a href="javascript:"  onclick="fun.c01($(this),\'' + o1[i].fromid + '\')" class="detail-button">查看属性</a>'
      }
      else { t1 = ""; }
      html += '\
        <tr '+ (o1[i].hide == 0 ? '' : 'style="color:#99abab;"') + '>\
            <td class="w50 center">'+ i + '</td>\
            <td class="w200">'+ (o1[i].isleaf == 0 ? '<a href="javascript:" class="Mo MoA" onclick="fun.c03($(this),\'' + o1[i].fromid + '\')" style="margin-left:' + o2[1] + 'px;"></a>' : '<a class="Mo" style="margin-left:' + o2[1] + 'px;"></a>') + '&nbsp;' + o1[i].fromid + '</td>\
            <td class="p-0">'+ o1[i].name + '（' + o1[i].enname + '）' + t1 + '</td>\
            <td class="w70 center">'+ o1[i].sort + '</td>\
            <td class="left w30" style="padding-left: 30px;position: relative;">\
            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu">\
            <li onClick="fun.c09('+ o1[i].id + ',' + o1[i].hide + ')"><a class="dropdown-item pointer">已' + (o1[i].hide == 0 ? '显示' : '隐藏') + '</a></li>\
            </ul>\
            </td>\
        </tr>'
    }
    $(".Mo" + o2[0]).html('\
        <table class="table align-middle table-hover mb-0">\
          <tbody>'+ html + '</tbody>\
        </table>');
  },
  c11: function () {
    let html = '""<r: db="sqlite.shopee">update @.type set @.hide=0 where @.upid=0<1/>update @.type set @.hide=1 where @.upid=0 and @.sort<500</r:>'
    Tool.at(html)
    //Tool.ajax.a01(html, 1, Tool.reload)
  },
  c12: function () {
    let str = '[0<r:type db="sqlite.shopee" where=" where @.upid=0 and @.hide=0" size=50>,<:fromid/></r:type>]'
    Tool.ajax.a01(str, 1, this.c13, this);
  },
  c13: function (oo) {
    oo.shift();
    alert("有必要再说")
    let html = '""<r: db="sqlite.shopee">update @.type set @.hide=1 where @.upid in(' + oo.join(",") + ') and @.sort<1</r:>'
    //Tool.ajax.a01(html,1,Tool.reload)
  },
}
fun.a01();