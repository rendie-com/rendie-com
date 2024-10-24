'use strict';
var fun =
{
  a01: function () {
    obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
    if (obj.arr[3] == "js01") { Tool.scriptArr(['admin/js/敦煌网/搜索词追踪/无排名/从敦煌网获取【热搜关键词】.js']); }
    else if (obj.arr[3] == "js02") { Tool.scriptArr(['admin/js/敦煌网/搜索词追踪/有排名/关键词中有排名的打开浏览.js']); }
    else if (obj.arr[3] == "js03") { Tool.scriptArr(['admin/js/敦煌网/搜索词追踪/无排名/关键词中无排名的查找排名.js']); }
    else if (obj.arr[3] == "js03") { Tool.scriptArr(['admin/js/敦煌网/搜索词追踪/无排名/关键词中无排名的查找排名.js']); }
    else if (obj.arr[3] == "js04") { Tool.scriptArr(['admin/js/敦煌网/搜索词追踪/有排名/index.js']); }
    else {
      obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
      obj.arr[5] = obj.arr[5] ? obj.arr[5] : "1";//搜索字段
      obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//搜索关键词
      this.a02();
    }
  },
  a02: function () {
    //order by @.myRanking desc,@.searchIdx desc
    let str = '[\
    {\
      "size":30,\
      "count":<@count/>\
    }\
    <r:keys size=30 db="sqlite.dhgate" where=" where @.myRanking=0 '+ this.b03() + ' order by @.searchIdx desc" page=2>,\
		{\
			"keys":"<:keys/>",\
			"searchIdx":<:searchIdx/>,\
			"searchPopularity":<:searchPopularity/>,\
			"searchIdxChange":<:searchIdxChange/>,\
			"clickIdx":<:clickIdx/>,\
			"clickSearchRate":<:clickSearchRate/>,\
			"productNumber":<:productNumber/>,\
			"confirmVisitRate":<:confirmVisitRate/>,\
			"country":"<:country/>",\
			"clickSearchRate":<:clickSearchRate/>,\
			"addtime":<:addtime/>,\
			"uptime":<:uptime/>,\
			"myRanking":<:myRanking/>,\
			"rankingtime":<:rankingtime/>,\
			"myshop":"<:myshop/>"\
		}\
    </r:keys>]'
    Tool.ajax.a01(str, obj.arr[4],this.a03,  this);
  },
  a03: function (oo) {
    let html = ""
    for (let i = 1; i < oo.length; i++) {
      html += '\
			<tr>\
				<td class="left">'+ oo[i].keys + '</td>\
				<td>'+ oo[i].searchIdx + '</td>\
				<td>'+ oo[i].searchPopularity + '</td>\
				<td>'+ oo[i].searchIdxChange + '</td>\
				<td>'+ oo[i].clickIdx + '</td>\
				<td>'+ oo[i].clickSearchRate + '%</td>\
				<td>'+ oo[i].productNumber + '</td>\
				<td>'+ oo[i].confirmVisitRate + '%</td>\
				<td>'+ oo[i].country + '</td>\
				<td>'+ Tool.js_date_time2(oo[i].addtime) + '</td>\
				<td>'+ Tool.js_date_time2(oo[i].uptime) + '</td>\
			</tr>'
    }
    html += '<tr><td colspan="11" class="left">' + Tool.page(oo[0].count, oo[0].size, 4) + '</td></tr>'
    let html2 = Tool.header() + '\
    <div class="input-group w-50 m-2">\
      <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[5] + '">' + this.b02(obj.arr[5]) + '</button>\
      <ul class="dropdown-menu">\
        <li class="dropdown-item pointer" onclick="fun.c05(1)" value="1">热搜关键词</li>\
        <li class="dropdown-item pointer" onclick="fun.c05(2)" value="2">热搜TOP3国家</a></li>\
      </ul>\
      <input type="text" class="form-control" id="searchword" value="'+ Tool.Trim(Tool.unescape(obj.arr[6])) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
      <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
    </div><div class="p-2">\
			<table class="table align-top table-hover center">\
				<thead class="table-light">'+ this.b01() + '</thead>\
				<tbody>'+ html + '</tbody>\
			</table>\
		</div>'
    Tool.html(null, null, html2)
  },
  b01: function () {
    let html = '\
    <tr>\
      <th class="left" style="padding-left: 30px;position: relative;">\
				<button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
        <ul class="dropdown-menu">\
          <li onClick="Tool.open4(\'js01\')"><a class="dropdown-item pointer" title="从【sport_11】中获取，因为它出钱了。">*从敦煌网获取【热搜关键词】</a></li>\
          <li onClick="Tool.open4(\'js03\')"><a class="dropdown-item pointer" title="7天一次">*关键词中无排名的查找排名</a></li>\
        </ul>\
				热搜关键词\
			</th>\
      <th>搜索热度</th>\
      <th>搜索人气</th>\
      <th>热度变化</th>\
      <th>点击量</th>\
      <th>点击率</th>\
      <th>平台产品数</th>\
      <th>浏览-成交转化率</th>\
      <th>热搜TOP3国家</th>\
      <th>添加时间</th>\
      <th>关键词更新时间</th>\
    </tr>'
    return html;
  },
  b02: function (val) {
    let name = "";
    switch (val) {
      case "1": name = "热搜关键词"; break;
      case "2": name = "热搜TOP3国家"; break;
      default: name = "未知：" + val;
    }
    return name
  },
  b03: function () {
    let str = "";
    if (obj.arr[6] != "-_-20") {
      switch (obj.arr[5]) {
        case "1": str += " and @.keys like '%" + Tool.unescape(obj.arr[6]) + "%'"; break;//热搜关键词
        case "2": str += " and @.country like '%" + Tool.unescape(obj.arr[6]) + "%'"; break;//热搜TOP3国家
      }
    }
    return str;
  },
  c01: function () { },
  c02: function () {
    let Field = $("#Field").val(), searchword = Tool.Trim($("#searchword").val());
    if (searchword) {
      searchword = encodeURIComponent(searchword)
      Tool.main('/' + obj.arr[0] + "/list/" + obj.arr[2] + "/" + obj.arr[3] + "/1/" + Field + "/" + searchword);
    } else { alert("请输入搜索内容"); }
  },
  c03: function () {
  },
  c04: function () {
  },
  c05: function (val) {
    let name = this.b02("" + val)
    $("#Field").html(name).val(val)
  }
}
fun.a01();