'use strict';
var fun =
{
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "1";//搜索字段
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//搜索关键词
        obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20";//评分
        obj.arr[8] = obj.arr[8] ? obj.arr[8] : "-_-20";//关注量
        this.a02();
    },
    a02: function () {
        let str = '[\
		{"size":20,"count":<@count/>}\
    <r:shop db="sqlite.aliexpress" size="20" page=2 where="'+ this.b03() + ' order by @.uptime desc,@.id desc">,\
		{\
			"id":<:id/>,\
			"shopid":<:shopid/>,\
			"sellerId":<:sellerId/>,\
			"count1":<:count1/>,\
			"count2":<:count2/>,\
			"addtime":<:addtime/>,\
			"uptime":<:uptime/>,\
			"UpTortNum":<:UpTortNum/>,\
			"score":<:score/>,\
			"Followers":<:Followers/>,\
			"name":<:name tag=json/>\
		}\
		</r:shop>]'
        //<r:pro db="sqlite.aliexpress" size=1 where=" where @.hide=0 and @.shopid=<:shopid/>"><:count(1)/></r:pro>
        Tool.ajax.a01(str, obj.arr[4],this.a03,  this)
    },
    a03: function (oo) {
        let html = ''
        for (let i = 1; i < oo.length; i++) {
            html += '\
      <tr>\
        <td><a href="https://www.aliexpress.com/store/'+ oo[i].shopid + '" target="_blank">' + oo[i].shopid + '</a></td>\
        <td>'+ oo[i].sellerId + '</td>\
        <td class="left">'+ oo[i].name + '</td>\
        <td>'+ oo[i].count1 + '</td>\
        <td>'+ oo[i].count2 + '</td>\
        <td>'+ oo[i].UpTortNum + '</td>\
        <td>'+ oo[i].score + '</td>\
        <td>'+ oo[i].Followers + '</td>\
        <td>'+ Tool.js_date_time2(oo[i].addtime) + '</td>\
        <td>'+ Tool.js_date_time2(oo[i].uptime) + '</td>\
        <td style="padding-left: 30px;position: relative;">\
          <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown'+ oo[i].id + '"><div></div><div></div><div></div></button>\
          <ul class="dropdown-menu" aria-labelledby="dropdown'+ oo[i].id + '">\
            <li onClick="fun.c03('+ oo[i].shopid + ',1)"><a class="dropdown-item pointer">演示</a></li>\
            <li onClick="fun.c03('+ oo[i].shopid + ',2)"><a class="dropdown-item pointer">执行</a></li>\
            <li onClick="fun.c06('+ oo[i].id + ')"><a class="dropdown-item pointer">修改</a></li>\
            <li onClick="fun.c04('+ oo[i].id + ')"><a class="dropdown-item pointer">删除</a></li>\
          </ul>\
        </td>\
      </tr>'
        }
        html += '<tr><td class="left" colspan="11">' + Tool.page(oo[0].count, oo[0].size, 4) + '</td></tr>'
        html = Tool.header(obj.arr[3]) + '\
    <div class="input-group w-50 m-2">\
      <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[5] + '">' + this.b02(obj.arr[5]) + '</button>\
      <ul class="dropdown-menu">\
        <li class="dropdown-item pointer" onclick="fun.c07(1)" value="1">店铺名称</li>\
        <li class="dropdown-item pointer" onclick="fun.c07(2)" value="2">店铺ID</li>\
      </ul>\
      <input type="text" class="form-control" id="searchword" value="'+ (obj.arr[6] == "-_-20" ? "" : Tool.unescape(obj.arr[6])) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
      <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
    </div>\
    <div class="p-2">\
		<table class="table table-hover center">\
			<thead class="table-light">'+ this.b01() + '</thead>\
			<tbody>'+ html + '</tbody>\
		</table>\
	</div>'
        Tool.html(null, null, html);
    },
    b01: function () {
        return '\
    <tr>\
      <th class="w100" title="店铺地址的ID">店铺ID</th>\
      <th class="w100" title="没什么用">卖家ID</th>\
      <th class="left">店铺名称</th>\
      <th class="w100">商品总量</th>\
      <th class="w100">商品正常量</th>\
      <th class="w70">侵权量</th>\
      <th class="p-0">'+ this.b05() + '</th>\
      <th class="p-0">'+ this.b06() + '</th>\
      <th class="w170">添加时间</th>\
      <th class="w170">更新时间</th>\
      <th class="w30" style="padding-left: 30px;position: relative;">\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu" aria-labelledby="dropdown0">\
          <li onClick="Tool.open4(\'js15\')"><a class="dropdown-item pointer">从商品表中获取店铺ID</a></li>\
          <li onClick="Tool.open4(\'js09\')"><a class="dropdown-item pointer">*更新【店铺】信息</a></li>\
          <li onClick="Tool.open4(\'js14\')"><a class="dropdown-item pointer">删除已关闭的店铺及商品</a></li>\
          <li onClick="fun.c05()"><a class="dropdown-item pointer">删除【商品总量】为零的店铺</a></li>\
          <li onClick="Tool.open4(\'js16\')"><a class="dropdown-item pointer">按店铺ID统计商品数量</a></li>\
        </ul>\
      </th>\
    </tr>'
    },
    b02: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "店铺名称"; break;
            case "2": name = "店铺ID"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b03: function () {
        let arr = []
        if (obj.arr[6] != "-_-20") {
            switch (obj.arr[5]) {
                case "1": arr.push("@.name like '%" + Tool.unescape(obj.arr[6]) + "%'"); break;//店铺名称
                case "2": arr.push("@.shopid='" + Tool.unescape(obj.arr[6]) + "'"); break;//店铺ID
            }
        }
        if (obj.arr[7] != "-_-20") {
            arr.push("@.score&lt;" + obj.arr[7])
        }
        if (obj.arr[8] != "-_-20") {
            arr.push("@.Followers&lt;" + obj.arr[8])
        }
        let str = ''
        if (arr.length != 0) { str = " where " + arr.join(" and "); }
        return str;
    },
    b04: function () {

    },
    b05: function () {
        return '\
		<Select class="form-select" onChange="Tool.open(7,this.options[this.selectedIndex].value)">\
		<Option value="-_-20">评分</Option>\
		<Option value="98" '+ (obj.arr[7] == "98" ? 'selected="selected"' : '') + '>评分&lt;98</Option>\
		<Option value="97" '+ (obj.arr[7] == "97" ? 'selected="selected"' : '') + '>评分&lt;97</Option>\
		<Option value="96" '+ (obj.arr[7] == "96" ? 'selected="selected"' : '') + '>评分&lt;96</Option>\
		<Option value="95" '+ (obj.arr[7] == "95" ? 'selected="selected"' : '') + '>评分&lt;95</Option>\
		<Option value="94" '+ (obj.arr[7] == "94" ? 'selected="selected"' : '') + '>评分&lt;94</Option>\
		<Option value="93" '+ (obj.arr[7] == "93" ? 'selected="selected"' : '') + '>评分&lt;93</Option>\
		<Option value="92" '+ (obj.arr[7] == "92" ? 'selected="selected"' : '') + '>评分&lt;92</Option>\
		<Option value="91" '+ (obj.arr[7] == "91" ? 'selected="selected"' : '') + '>评分&lt;91</Option>\
		<Option value="90" '+ (obj.arr[7] == "90" ? 'selected="selected"' : '') + '>评分&lt;90</Option>\
	</Select>'
    },
    b06: function () {
        return '<Select class="form-select" onChange="Tool.open(8,this.options[this.selectedIndex].value)">\
		<Option value="-_-20">关注量</Option>\
		<Option value="5000" '+ (obj.arr[8] == "5000" ? 'selected="selected"' : '') + '>关注量&lt;5000</Option>\
		<Option value="4000" '+ (obj.arr[8] == "4000" ? 'selected="selected"' : '') + '>关注量&lt;4000</Option>\
		<Option value="3000" '+ (obj.arr[8] == "3000" ? 'selected="selected"' : '') + '>关注量&lt;3000</Option>\
		<Option value="2000" '+ (obj.arr[8] == "2000" ? 'selected="selected"' : '') + '>关注量&lt;2000</Option>\
		<Option value="1000" '+ (obj.arr[8] == "1000" ? 'selected="selected"' : '') + '>关注量&lt;1000</Option>\
		<Option value="500" '+ (obj.arr[8] == "500" ? 'selected="selected"' : '') + '>关注量&lt;500</Option>\
	</Select>'
    },
    c01: function () {
    },
    c02: function () {
        let searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            searchword = encodeURIComponent(searchword)
            Tool.main('/' + obj.arr[0] + "/list/" + obj.arr[2] + "/" + obj.arr[3] + "/1/" + $("#Field").val() + "/" + searchword);
        } else { alert("请输入搜索内容"); }
    },
    c03: function (A, B) {
        let r = Tool.escape("/" + obj.arr.join("/"));//返回URL
        Tool.main('/js01/' + A + '/' + B + '/' + r);
    },
    c04: function (id)//删除
    {
        let html = '""<r: db="sqlite.aliexpress">delete from @.shop where @.id=' + id + '</r:>'
        Tool.ajax.a01(html,1,Tool.reload)
    },
    c05: function (t) {
        let html = '""<r: db="sqlite.aliexpress">delete from @.shop where @.count1=0</r:>'
        Tool.ajax.a01(html,1,Tool.reload)
    },
    c06: function (id) {
        Tool.main('/js02/' + id);
    },
    c07: function (val) {
        let name = this.b02("" + val)
        $("#Field").html(name).val(val)
    },



}
fun.a01();
/*

 d01:function()
    {
        let html='\
    {\
      <r:shop size=1 where=" where @.id='+obj.arr[4]+'">\
      "shopid":<:shopid/>,\
      "replaceItem":"<:replaceItem tag=js/>",\
      "id":<:id/>\
      </r:shop>\
    }'
       Tool.ajax.a01(html,1,this.d02,this)
  },
    d02:function(oo)
  {
    let html='\
    <header class="panel-heading"><a href="javascript:" onclick="Tool.main(\''+obj.arr[2]+'\')" class="arrow_back"></a>修改替换规则</header>\
    <div class="p-2">\
      <table class="table table-hover align-middle">\
        <tbody>\
          <tr><td class="right w150">店铺名称：</td><td><input type="text" class="form-control form-control-sm" id="shopid" value="'+oo.shopid+'"></td></tr>\
          <tr><td class="right">查找后替换为空:</td><td><textarea class="form-control form-control-sm" rows="20" id="replaceItem">'+oo.replaceItem+'</textarea></td></tr>\
          <tr><td></td><td><button type="button" class="btn btn-secondary btn-sm" onclick="fun.d03('+oo.id+')">确定修改</button></td></tr>\
        </tbody>\
      </table>\
    </div>'
    Tool.html(null,null,html);    
  },
  d03:function(id)//确定修改
    {
          let html='<r: db="sqlite.aliexpress">update @.shop set @.shopid='+$("#shopid").val()+',:replaceItem=\''+$("#replaceItem").val().replace(/'/ig,"''")+'\' where @.id='+id+'</r:>'
       Tool.ajax.a01(html,1,this.c05,this)
  }
	
	
	
    e01:function()
    {
    let searchword=($("#searchword").val()).replace(/(^\s*)|(\s*$)/g, "");;
        if(searchword)
        {
            let where=obj.arr[0]+"/"+obj.arr[1]+"/"+obj.arr[2]+"/1/"+encodeURIComponent(" where @.shopid="+searchword)
            Tool.main(where+"/"+searchword);
        }else{alert("店铺ID不能为空")}
    }	
  */