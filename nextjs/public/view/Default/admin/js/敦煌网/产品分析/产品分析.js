'use strict';
var fun =
{
    a01: function () {
        obj.arr[4] = obj.arr[4] ? obj.arr[4] : 1;//翻页
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//
        obj.arr[7] = obj.arr[7] ? obj.arr[7] : "-_-20";//
        obj.arr[8] = obj.arr[8] ? obj.arr[8] : "-_-20";//
        obj.arr[9] = obj.arr[9] ? obj.arr[9] : "-_-20";//
        this.a02()
    },
    a02: function () {
        let str = '\
    [\
      {"count":<@count/>,"size":10}\
      <r:proupdhgate db="sqlite.dhgate" size=1 page=2>,\
		{\
        "fromID":"<:fromID/>",\
        "dhFromURL":"<:fromURL/>",\
        "upuser":"<:upuser/>",\
        "exposureTimes":"",\
        "pageViews":"",\
        "cartTimes":"",\
        "paidProductNumber":"",\
        "addtime":"<:addtime/>",\
        "time":"<:uptime/>",\
        "downtime":"<:downtime/>",\
        <r:pro db="sqlite.aliexpress" where=" where @.proid=\'<:proid/>\'" size=1>\
        "pic1":"<:pic1/>",\
        "name":"<:name/>",\
        "type":"<:type/>",\
        "typename":"\
            <r:type db="sqlite.aliexpress" where=" where @.fromid=<:type/>" size=1>\
			<r:type db="sqlite.aliexpress" where=" where @.fromid=<:upid/>" size=1>\
				<r:type db="sqlite.aliexpress" where=" where @.fromid=<:upid/>" size=1>\
					<r:type db="sqlite.aliexpress" where=" where @.fromid=<:upid/>" size=1>\
						<:name/>&nbsp;&gt;&nbsp;</r:type>\
					<:name/>&nbsp;&gt;&nbsp;</r:type>\
				<:name/>&nbsp;&gt;&nbsp;</r:type>\
            <:name/></r:type>",\
        "SaleNum":<:SaleNum/>,\
        "minprice":<:minprice f=2/>,\
        "maxprice":<:maxprice f=2/>,\
        "lotNum":<:lotNum/>,\
        "unit":"<:unit/>",\
        "err":"<:err tag=js/>",\
        </r:pro>\
        "id":"<:id/>"\
      }\
      </r:proupdhgate>\
		]'
        Tool.ajax.a01(str, 1, this.a03, this)
    },
    a03: function (arr) {
        let html = '';
        for (let i = 1; i < arr.length; i++) {
            html += '\
      <tr>\
        <td>'+ this.b03(arr[i]) + '</td>\
        <td>'+ arr[i].upuser + '</td>\
        <td>\
          详情页:'+ arr[i].showNum1 + ' - 平台活动:' + arr[i].showNum2 + '<hr>\
          店铺活动:'+ arr[i].showNum3 + ' - 流量快车:' + arr[i].showNum4 + '<hr>\
          广告投放:'+ arr[i].showNum5 + ' - 邮件:' + arr[i].showNum6 + '\
        </td>\
        <td>'+ arr[i].is404 + '</td>\
        <td>'+ arr[i].exposureTimes + '</td>\
        <td>'+ arr[i].pageViews + '</td>\
        <td>'+ arr[i].cartTimes + '</td>\
        <td>'+ arr[i].paidProductNumber + '</td>\
        <td>'+ arr[i].addtime + '<hr/>' + arr[i].time + '<hr/>' + arr[i].downtime + '</td>\
      </tr>'
        }
        html += '\
    <tr>\
      <td colspan="9" class="left"><a class="detail-button" href="javascript:;" onclick="fun.b01()">【详情页展示量】清零</a><a class="detail-button" href="javascript:;" onclick="fun.a01()">同步【详情页展示量】</a><a class="detail-button" href="javascript:;" onclick="fun.c01()">智能同步30天内的【曝光量、浏览量、购物车、销量】</a>\
    </td>\
    </tr>\
    <tr><td colspan="9" class="left">'+ Tool.page(arr[0].count, arr[0].size, 4) + '</td></tr>'
        html = '\
    <header class="panel-heading">\
      <div onclick="Tool.main()">图片访问日志</div>\
      <div onclick="Tool.main(\'js01\')">商品访问日志</div>\
      <div onclick="Tool.main(\'js02\')" class="active">商品分析</div>\
    </header>\
      <div class="input-group w-50 m-2">\
        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[7] + '">' + this.b02(obj.arr[7]) + '</button>\
        <ul class="dropdown-menu">\
          <li class="dropdown-item pointer" onclick="fun.c03(1)" value="1">商品编码</li>\
          <li class="dropdown-item pointer" onclick="fun.c03(2)" value="2">商品来源ID</a></li>\
        </ul>\
        <input type="text" class="form-control" id="searchword" value="'+ (obj.arr[8] == "-_-20" ? "" : Tool.unescape(obj.arr[8])) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
        <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
      </div>\
    <div class="p-2">\
      <table class="table align-middle center">\
        <thead class="table-light">'+ this.b01() + '</thead>\
        <tbody>'+ html + '</tbody>\
      </table>\
    </div>'
        Tool.html(null, null, html)
    },
    b01: function () {
        let html = '\
    <tr>\
      <th>信息</th>\
      <th>\
        <select onChange="Tool.open(5,this.options[this.selectedIndex].value)" class="form-select">\
        <option value="">来源</Option>\
        <r:APIaccount size=50 where=" where @.from=\'dhgate\' and @.hide=0 and @.binduserID=1 order by @.sort asc">\
        <Option value="<:escape_(and @.upuserid=[APIaccount:fromid])/>" {if "Fun(arr(4))"=="Fun(escape_(and @.upuserid=[APIaccount:fromid]))"} selected="selected"{/if}> [APIaccount:UserName] </option>\
        </r:APIaccount>\
        </Select>\
      </th>\
      <th class="w200">\
        <select onChange="Tool.open(7,this.options[this.selectedIndex].value)" class="form-select">\
        <option value="">展示量</Option>\
        <Option value="">【详情页的展示量】倒序</option>\
        <Option value="">【平台活动的展示量】倒序</option>\
        <Option value="">【店铺活动的展示量】倒序</option>\
        <Option value="">【流量快车的展示量】倒序</option>\
        <Option value="">【广告投放的展示量】倒序</option>\
        <Option value="">【邮件的展示量】倒序</option>\
        </Select>\
      </th>\
      <th class="w70">\
        <Select onChange="Tool.open(5,this.options[this.selectedIndex].value)" class="form-select">\
        <Option value="">是否错误</Option>\
        <Option value="<:escape_(and @.is404=0)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.is404=0))"} selected="selected"{/if}>正常</Option>\
        <Option value="<:escape_(and @.is404=1)/>" {if "Fun(arr(5))"=="Fun(escape_(and @.is404=1))"} selected="selected"{/if}>有404</Option>\
        </Select>\
      </th>\
      <th class="w70">\
        <select onChange="Tool.open(7,this.options[this.selectedIndex].value)" class="form-select">\
        <option value="">曝光量</Option>\
        <Option value="">倒序</option>\
        </Select>\
      </th>\
      <td class="w70">\
        <select onChange="Tool.open(7,this.options[this.selectedIndex].value)" class="form-select">\
        <option value="">浏览量</Option>\
        <Option value="">倒序</option>\
        </Select>\
      </th>\
      <th class="w70">\
        <select onChange="Tool.open(7,this.options[this.selectedIndex].value)" class="form-select">\
        <option value="">购物车</Option>\
        <Option value="">倒序</option>\
        </Select>\
      </th>\
      <td class="w70">\
        <select onChange="Tool.open(7,this.options[this.selectedIndex].value)" class="form-select">\
        <option value="">销量</Option>\
        <Option value="">倒序</option>\
        </Select>\
      </th>\
      <th class="w170">\
        <select onChange="Tool.open(7,this.options[this.selectedIndex].value)" class="form-select">\
        <option value="">【上传/更新/下架】时间</Option>\
        <Option value="">【10天内】会下架的商品</option>\
        <Option value="">【上传时间】倒序</option>\
        <Option value="">【更新时间】倒序</option>\
        </Select>\
      </th>\
    </tr>'
        return html;
    },
    b02: function (val) {
        let name = "";
        switch (val) {
            case "1":
            case "-_-20":
                name = "商品编码"; break;
            case "2": name = "商品来源ID"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b03: function (arr) {
        let price = arr.minprice == arr.maxprice ? arr.minprice : arr.minprice + "-" + arr.maxprice
        return '\
    <table class="table mb-0 table-bordered table-hover left">\
      <tr>\
        <td rowspan="3" class="center">\
          <a target="_blank" href="'+ arr.pic1 + '"><img class="border" src="' + arr.pic1 + '_100x100.jpg" title="点击预览" width="90"></a>\
        </td>\
        <td>\
        <a href="'+ arr.fromurl + '" target="_blank">' + arr.name + '</a>（<span id="type' + arr.type + '">' + arr.typename + '</span>）\
        </td>\
      </tr>\
      <tr>\
        <td>\
        <strong>销量：</strong>'+ arr.SaleNum + '&nbsp;&nbsp;\
        <strong>价格：</strong>$'+ price + '（' + (arr.lotNum == 1 ? arr.unit : arr.lotNum + " " + arr.unit + "/lot") + '）\
        </td>\
      </tr>\
      <tr>\
        <td><strong>错误信息：</strong>'+ arr.err + '</td>\
      </tr>\
    </table>'
    },
    c01: function () { },
    c02: function () {
        let searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            searchword = encodeURIComponent(searchword);
            Tool.main('/' + obj.arr[0] + "/list/" + obj.arr[2] + "/" + obj.arr[3] + "/1/%20/%20/%20/" + $("#Field").val() + "/" + searchword);
        } else { alert("请输入搜索内容"); }

    },
    c03: function (val) {
        let name = this.b02("" + val)
        $("#Field").html(name).val(val)
    }
}
fun.a01();