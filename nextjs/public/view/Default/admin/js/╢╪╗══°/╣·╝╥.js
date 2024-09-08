'use strict';
var fun =
{
    //obj.arr[0]      后台目录
    //obj.arr[1]      列表页/内容页
    //obj.arr[2]      模板页ID  
    obj: { A1: 1, A2: 0, B1: 1, B2: 0 },
    a01: function () {
        obj.arr[3] = obj.arr[3] ? obj.arr[3] : "-_-20";//选择JS文件
        obj.arr[4] = obj.arr[4] ? parseInt(obj.arr[4]) : 1;//翻页
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "1";//搜索字段
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//搜索关键词    
        if (obj.arr[3] == "js01") { this.a04(); }
        else { this.a02(); }
    },
    a02: function () {
        let str = '[0\
        <r:country size="300" db="sqlite.dhgate" where=" where @.upid=\'0\' order by @.name asc">,\
        {\
          "id":"<:id/>",\
          "isleaf":<:isleaf/>,\
          "countryid":"<:countryid/>",\
          "sort":"<:sort/>",\
          "fromid":"<:fromid/>",\
          "name":"<:name/>",\
          "des":"<:des/>",\
          "area":"<:area/>",\
          "chinaarea":"<:chinaarea/>",\
          "countrycode":"<:countrycode/>",\
          "currency":"<:currency/>",\
          "callingcode":"<:callingcode/>"\
        }\
        </r:country>]'
        Tool.ajax.a01(str, obj.arr[4], this.a03, this)
    },
    a03: function (arr) {
        let li1 = '', html2 = ''
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].isleaf == 0) { li1 = '<a href="javascript:" class="Mo MoA" onclick="fun.c02($(this),\'' + arr[i].fromid + '\')"></a>' + i; }
            else { li1 = '<a class="Mo"></a>' + i; }
            html2 += '\
              <tr>\
                <td class="left">'+ li1 + '</td>\
                <td>'+ arr[i].fromid + '</td>\
                <td>'+ arr[i].countryid + '</td>\
                <td class="left">'+ this.b04(arr[i].countryid) + arr[i].name + '（' + arr[i].des + '）</td>\
                <td>'+ (arr[i].hide == "0" ? '显' : '隐') + '</td>\
                <td>'+ arr[i].area + '</td>\
                <td>'+ arr[i].chinaarea + '</td>\
                <td>'+ arr[i].countrycode + '</td>\
                <td>'+ arr[i].currency + '</td>\
                <td>'+ arr[i].callingcode + '</td>\
                <td>'+ arr[i].sort + '</td>\
              </ul>'
        }
        html2 += '\
        <tr>\
          <td colspan="12" class="left"><button type="button" class="btn btn-sm btn-secondary" onclick="fun.d01()">获取国家下的【State/Province/Region】</button></td>\
        </tr>'
        let html = this.b01() + '\
        <div class="p-2">\
          <table class="table table-hover center align-middle">\
            <thead class="table-light">\
            <tr>\
              <th>编号</th>\
              <th>来源ID</th>\
              <th>代码</th>\
              <th class="left">国家名称（描述）</th>\
              <th>显隐</th>\
              <th>区域</th>\
              <th>区域洲</th>\
              <th>国家代码</th>\
              <th>币种</th>\
              <th>区号代码</th>\
              <th>排序</th>\
            </tr>\
            </thead>\
            <tbody>'+ html2 + '</tbody>\
          </table>\
        </div>'
        Tool.html(null, null, html)
    },
    a04: function () {

        let str = '[{"count":<@count/>,"size":30}<r:countrybind size="30" db="sqlite.dhgate" where=" where 1=1 ' + this.b02() + ' order by @.id desc" page=2>,\
    {\
    "id":<:id/>,\
    "addressA":"<:addressA/>",\
    "addressB":"<:addressB/>",\
    "isleafB":"<:isleafB/>"\
    }\
    </r:countrybind>]'
        Tool.ajax.a01( str, obj.arr[4],this.a05, this)
    },
    a05: function (arr) {
        let html3 = '\
    <div class="input-group w-50 m-2">\
      <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.arr[5] + '">' + this.b03(obj.arr[5]) + '</button>\
      <ul class="dropdown-menu">\
        <li class="dropdown-item pointer" onclick="fun.c05(1)" value="1">【敦煌网】地址</li>\
        <li class="dropdown-item pointer" onclick="fun.c05(2)" value="2">【速卖通】地址</a></li>\
      </ul>\
      <input type="text" class="form-control" id="searchword" value="'+ (obj.arr[6] == "-_-20" ? '' : Tool.unescape(obj.arr[6])) + '" onKeyDown="if(event.keyCode==13) fun.c04();">\
      <button class="btn btn-outline-secondary" type="button"onclick="fun.c04();">搜索</button>\
    </div>'
        let html2 = ''
        for (let i = 1; i < arr.length; i++) {
            html2 += '\
      <tr>\
        <td class="left">' + arr[i].addressA + '</td>\
        <td class="left">' + arr[i].addressB + '</td>\
        <td>' + arr[i].isleafB + '</td>\
        <td class="p-0"><button type="button" class="btn btn-sm btn-outline-secondary" onclick="fun.e01($(this),' + arr[i].id + ')">删除</button></td>\
      </tr>'
        }
        html2 += '\
    <tr>\
      <td class="left" colspan="4">'+ Tool.page(arr[0].count, arr[0].size, 4) + '</td>\
    </tr>'
        /////////////////////////////////////////////////////////////////////////////////////////////////
        let html = this.b01() + html3 + '\
    <div class="p-2">\
      <table class="table table-hover center align-middle">\
        <thead class="table-light">\
        <tr>\
          <th class="left">敦煌网地址</th>\
          <th class="left">绑定到【速卖通】地址</th>\
          <th>速卖通叶子节点</th>\
          <th>操作</th>\
        </tr>\
        </thead>\
        <tbody>'+ html2 + '</tbody>\
      </table>\
    </div>'
        Tool.html(null, null, html)
    },
    b01: function () {
        let html = '\
    <header class="panel-heading">\
      <div onclick="Tool.main()" '+ (obj.arr[3] == "-_-20" ? 'class="active"' : '') + '>【敦煌网】国家</div>\
      <div onclick="Tool.main(\'js01\')" '+ (obj.arr[3] == "js01" ? 'class="active"' : '') + '>绑定到【速卖通】</div>\
    </header>'
        return html;
    },
    b02: function () {
        let str = "";
        if (obj.arr[6] != "-_-20") {
            switch (obj.arr[5]) {
                case "1": str = "and :addressA like '%" + Tool.unescape(obj.arr[6]) + "%'"; break;//敦煌网地址
                case "2": str = "and :addressB like '%" + Tool.unescape(obj.arr[6]) + "%'"; break;//绑定到【速卖通】地址        
                default: str = "";
            }
        }
        return str;
    },
    b03: function (val) {
        let name = "";
        switch (val) {
            case "1":
            case "-_-20":
                name = "【敦煌网】地址"; break;
            case "2": name = "【速卖通】地址"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b04: function (countryid) {
        let str = ""
        if (countryid == "PS" || countryid == "KV") { }
        else {
            str = '<img src="https://image.dhgate.com/images/flag/' + countryid + '.gif"/> '
        }
        return str
    },
    c01: function () { },
    c02: function (This, fromid) {
        if (This.attr("Class") == "Mo MoB") { $("#Mo" + fromid).hide(); This.attr("Class", "Mo MoA"); }
        else {
            This.attr("Class", "Mo MoB");
            if ($("#Mo" + fromid).length) { $("#Mo" + fromid).show(); }
            else {
                let str = '[{}<r:country db="sqlite.dhgate" size="3500" where=" where @.upid=\'' + fromid + '\'">,{"id":"<:id/>","countryid":"<:countryid/>","isleaf":"<:isleaf/>","bind":"","fromid":"<:fromid/>","name":"<:name/>","sort":"<:sort/>"}\
        </r:country>]';
                Tool.ajax.a01(str,1,this.c03,  this,  [This, fromid])
            }
        }
    },
    c03: function (arr, oo) {
        if (arr.length == 3500) { alert("益出"); }
        else {
            let m1 = parseInt(oo[0].css("margin-left")) + 20, html = '', li1
            for (let i = 1; i < arr.length; i++) {
                if (arr[i].isleaf == "False") { li1 = '<a href="javascript:" class="Mo MoA" onclick="fun.c01($(this),\'' + arr[i].fromid + '\')" style="margin-left:' + m1 + 'px;"></a>' + i }
                else { li1 = '<a class="Mo" style="margin-left:' + m1 + 'px;"></a>' + i }
                html += '\
      <ul class="Tul list-group-item-action center">\
      <li class="w100 left">'+ li1 + '</li>\
      <li class="w150">'+ arr[i].fromid + '</li>\
      <li class="w70">'+ arr[i].countryid + '</li>\
      <li class="w300 left">'+ arr[i].name + '</li>\
      </ul>';
            }
            html = '<div id="Mo' + oo[1] + '">' + html + '</div>'
            oo[0].parent().parent().after(html);
        }
    },
    c04: function () {
        let searchword = encodeURIComponent(Tool.Trim($("#searchword").val()));
        if (searchword) {
            Tool.main(o.mode + obj.arr[0] + "/list/" + obj.arr[2] + "/" + obj.arr[3] + "/1/" + $("#Field").val() + "/" + searchword);
        } else { alert("请输入搜索内容"); }
    },
    c05: function (val) {
        let name = this.b03("" + val)
        $("#Field").html(name).val(val)
    },
    d01: function () {
        let str = '[{"page":<@page/>}<r:country db="sqlite.dhgate" size="50" page=2 where=" where @.upid=\'0\' order by @.id asc">,{\
      "id":"<:id/>",\
      "count":<:countryid Fun=Db(sqlite.dhgate,select count(1) from @.country where @.upid=\'$1\',count)/>,\
      "countryid":"<:countryid/>"\
    }\
    </r:country>]'
        Tool.ajax.a01(str, this.obj.A1, this.d02, this)
    },
    d02: function (arr) {
        this.obj.A2 = arr[0].page
        this.obj.B2 = arr.length - 1;
        if (arr.length == 1) { alert("请在【敦煌网】-【开放平台】-【基础】-【国家列表】-【一键采集所有国家】") }
        else {
            if (this.obj.A1 <= this.obj.A2) {
                let p1 = Math.ceil(this.obj.A1 / this.obj.A2 * 100)
                let html = '<div class="Tul thead"><a href="javascript:location.reload();" class="arrow_back"></a>正在获取国家下的【State/Province/Region】...</div>\
        <ul class="Tul tr"><li class="right w100">国家进度：</li><li id="A1" class="w500"><div class="progress"><span style="width:'+ p1 + '%;"><span>' + p1 + '%</span></span></div></li><li id="A2" class="w40">' + this.obj.A1 + '/' + this.obj.A2 + '</li><li id="A3">（页）</li></ul>\
        <ul class="Tul tr"><li class="right w100">国家进度：</li><li id="B1" class="w500"></li><li id="B2" class="w40"></li><li id="B3"></li></ul>\
        <ul class="Tul tr"><li class="right w100">状态：</li><li id="state"></li></ul>'
                $("#table").html(html);
                this.d03(arr);
            }
            else { this.obj.A1 = 1; this.obj.B1 = 1; $("#A3").html("（完）"); }
        }
    },
    d03: function (arr) {
        if (this.obj.B1 <= this.obj.B2) {
            let p1 = Math.ceil(this.obj.B1 / this.obj.B2 * 100)
            $("#B1").html('<div class="progress"><span style="width:' + p1 + '%;"><span>' + p1 + '%</span></span></div>')
            $("#B2").html('' + this.obj.B1 + '/' + this.obj.B2 + '');
            $("#B3").html('（条）');
            let url = 'https://dg.dhgate.com/cart/placeorder.do?act=getCountryProvinceInfo&country=' + arr[this.obj.B1].countryid
           Tool.ajax.a01( this, [url,this.d04, "", url, arr])//可以跨域请求
        }
        else {
            this.obj.B1 = 1;
            this.obj.A1++;
            this.d01();
        }
    },
    d04: function (arr, oo) {
        let str = "";
        $("#state").html(oo[0] + " （" + arr.length + " 个【省/洲】）")
        if (oo[1][this.obj.B1].count == arr.length)//俩边的【省/洲】一样多
        {
            $("#B3").html('（完）'); this.obj.B1++; this.d03(oo[1]);
        }
        else if (oo[1][this.obj.B1].count > arr.length)//数据库大于远程,
        {

            alert("数据库(" + oo[1][this.obj.B1].count + ")大于远程(" + arr.length + "),需要删除，该国家的所有【省/洲】");
        }
        else {
            if (arr.length != 0) {
                str = '<r: db="sqlite.dhgate">update @.country set @.isleaf=0 where @.upid=\'0\' and @.id=' + oo[1][this.obj.B1].id + '</r:>'
                for (let i = 0; i < arr.length; i++) {
                    str += '<if Fun(Db(select count(1) from @.country where @.upid=\'' + oo[1][this.obj.B1].countryid + '\' and @.fromid=\'' + arr[i].provinceid + '\',count))==0><r: db="sqlite.dhgate">insert into @.country(:fromid,:name,:sort,:upid)values(\'' + arr[i].provinceid + '\',\'' + arr[i].name.replace(/'/ig, "''") + '\',\'' + arr[i].sortvalue + '\',\'' + oo[1][this.obj.B1].countryid + '\')</r:></if>'
                }
               Tool.ajax.a01( str, 1,this.d05, this, oo[1])
            }
            else { $("#B3").html('（完）'); this.obj.B1++; this.d03(oo[1]); }
        }
    },
    d05: function (t, arr) {
        if (t == "") {
            $("#B3").html('（完）');
            this.obj.B1++;
            this.d03(arr);
        } else { $("#state").html(t) }
    },
    e01: function (This, id) {
        if (confirm('确定要删除吗？')) {
            let str = '<r: db="sqlite.dhgate">delete from @.countrybind where @.id=' + id + '</r:>'
           Tool.ajax.a01( str, 1,this.e02, this, This);
        }
    },
    e02: function (t, This) {
        if (t == "") { This.parent().parent().remove(); } else { document.write("出错:" + t) }
    }
}
fun.a01();