'use strict';
var fun =
{
    token: "",
    obj: {},
    a01: function () {
        let str = '\
        [0<r:seller size=50 db="sqlite.dhgate" page=5 where=" order by @.sort asc,@.id asc">,\
        {\
          "sort":<:sort/>,\
          "Punish1":"<:Punish1/>",\
          "Punish2":"<:Punish2/>",\
          "Punish3":"<:Punish3/>",\
          "Punish3":<:Punish3/>,\
          "Punish4":<:Punish4/>,\
          "Punish5":<:Punish5/>,\
          "DHtotal":<:DHtotal/>,\
          "total":<:total/>,\
          "id":<:id/>,\
          "username":"<:username/>",\
          "note":"<:note/>",\
          "name":"<:name/>",\
          "industry":"<:industry/>",\
          "upshelf":<:upshelf/>,\
          "downshelf":<:downshelf/>,\
          "NotThrough":<:NotThrough/>,\
          "Pending":<:Pending/>,\
          "Complaint":<:Complaint/>,\
          "Cash1":<:Cash1 f=2/>,\
          "Cash2":<:Cash2 f=2/>,\
          "Cash3":<:Cash3 f=2/>,\
          "upLimit":<:upLimit/>,\
          "hide":<:hide/>,\
          "fromid":<:fromid/>\
        }\
        </r:seller>]'
        Tool.ajax.a01(str, 1, this.a02, this);
    },
    a02: function (arr) {
        let str = ""
        for (let i = 1; i < arr.length; i++) {
            str += '\
        <tr class="center">\
            <td class="p-0">\
            <input type="text" class="form-control center" value="'+ arr[i].sort + '" onblur="fun.c44($(this),' + arr[i].id + ',\'sort\',\'' + arr[i].sort + '\')"/>\
            </td>\
            <td style="padding-left: 30px;position: relative;">\
            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu">\
                <li onClick="Tool.open5(\'js03\','+ arr[i].fromid + ')"><a class="dropdown-item pointer">更多</a></li>\
                <li onclick="Tool.open5(\'js40\','+ arr[i].fromid + ')"><a class="dropdown-item pointer">同步</a></li>\
                <li onClick="Tool.main(\'js05/'+ arr[i].fromid + '\')"><a class="dropdown-item pointer">修改</a></li>\
                <li onClick="fun.c26('+ arr[i].id + ')"><a class="dropdown-item pointer">删除</a></li>\
            </ul>\
            </td>\
            <td class="left">* <a href="javascript:;" onclick="Tool.SignIn.a01('+ arr[i].id + ',$(this).parent())" title="点击登陆">' + arr[i].username + '</a></td>\
            <td>'+ arr[i].name + '</td>\
            <td title="'+ this.b02(arr[i].industry) + '">' + arr[i].industry + ' 类</td>\
            <td>'+ arr[i].Punish1 + '/' + arr[i].Punish2 + '/' + arr[i].Punish3 + '/' + arr[i].Punish4 + '/' + arr[i].Punish5 + '</td>\
            <td>'+ arr[i].upshelf + '</td>\
            <td>'+ arr[i].Pending + '</td>\
            <td>'+ arr[i].NotThrough + '</td>\
            <td>'+ arr[i].downshelf + '</td>\
            <td title="敦煌总数：'+ arr[i].DHtotal + '\n本地总数：' + arr[i].total + '\n差值：' + arr[i].total + '-' + arr[i].DHtotal + '=' + (arr[i].total - arr[i].DHtotal) + '">' + (arr[i].total == arr[i].DHtotal ? arr[i].DHtotal : '<font color="red">' + arr[i].total + '</font>') + '</td>\
            <td>'+ arr[i].Complaint + '</td>\
            <td>'+ arr[i].Cash1 + '/' + arr[i].Cash2 + '/' + arr[i].Cash3 + '</td>\
            <td class="p-0">\
            <select class="form-select" onchange="fun.c42($(this),'+ arr[i].id + ',this.options[this.selectedIndex].value)">\
                <option value="0"'+ (arr[i].hide == "0" ? ' selected="selected"' : '') + '>正常</option>\
                <option value="1"'+ (arr[i].hide == "1" ? ' selected="selected"' : '') + '>已禁用</option>\
                <option value="2"'+ (arr[i].hide == "2" ? ' selected="selected"' : '') + ' title="我个状态下，所有运费加12美元。">限物流</option>\
                <option value="3"'+ (arr[i].hide == "3" ? ' selected="selected"' : '') + ' title="当有商品要更新时，将不提示，不更新。">受限</option>\
            </select>\
            </td>\
            <td class="p-0">\
            <input type="text" value="'+ arr[i].note + '" class="form-control" onblur="fun.c44($(this),' + arr[i].id + ',\'note\',\'' + arr[i].note + '\')"/>\
            </td>\
        </tr>'
        }
        let html = '\
        <header class="panel-heading">敦煌网 -&gt; 卖家账户</header>\
        <div class="p-2">\
          <table class="table table-hover align-middle">\
            <thead class="table-light center">'+ this.b01() + '</thead>\
            <tbody>'+ str + '</tbody>\
          </table>\
        </div>'
        Tool.html(null, null, html);
    },
    b01: function () {
        let str = '\
        <tr>\
          <th class="w50">排序</th>\
          <th class="w30" style="padding-left: 30px;position: relative;">\
            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown0"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu" aria-labelledby="dropdown0">\
              <li><a class="dropdown-item pointer" onClick="Tool.main(\'js04\')">更多</a></li>\
              <li><a class="dropdown-item pointer" onClick="Tool.main(\'js01\')">推广营销</a></li>\
              <li><a class="dropdown-item pointer" onclick="Tool.open5(\'js40\',\'all\')" title="包括【上架/下架/待审核/审核未通过】和【余额/冻结/欠款】数量">同步状态</a></li>\
              <li><a class="dropdown-item pointer" onClick="fun.c02()">添加</a></li>\
              <li><a class="dropdown-item pointer" onClick="Tool.main(\'js25.html\')" title="把侵权的产品进行【店铺禁限】">*处理侵权</a></li>\
            </ul>\
          </th>\
          <th>用户名</th>\
          <th>提现人</th>\
          <th>行业</th>\
          <th title="交易违规/产品信息违规/知识产权禁限售/知识产权禁限售(第三方投诉)/待查看处罚/可解除处罚/需申诉处理的处罚">处罚</th>\
          <th>上架</th>\
          <th>待审核</th>\
          <th>未通过</th>\
          <th>下架</th>\
          <th>总数</th>\
          <th>投诉</th>\
          <th>余额/冻结/欠款</th>\
          <th>状态</th>\
          <th class="left">备注</th>\
        </tr>'
        return str
    },
    b02: function (val) {
        let str = ""
        switch (val) {
            case "A": str = "计算机和网络\n手机和手机附件\n消费类电子\n数码相机、摄影器材\n电玩游戏\n安全与监控\n家用电器"; break;
            case "B": str = "服装"; break;
            case "C": str = "表\n珠宝\n时尚配件"; break;
            case "D": str = "鞋类及鞋类辅料\n箱包及箱包辅料"; break;
            case "E": str = "婚纱礼服"; break;
            case "F": str = "健康与美容\n发制品"; break;
            case "G": str = "母婴用品\n玩具与礼物"; break;
            case "H": str = "运动与户外产品\n战术装备"; break;
            case "I": str = "家居与花园\n商业及工业"; break;
            case "J": str = "照明灯饰"; break;
            case "K": str = "汽车、摩托车"; break;
            case "L": str = "乐器"; break;
            case "M": str = "其他产品"; break;
            case "N": str = "食品饮料"; break;
            default: str = "未知"
        }
        return str;
    },
    c02: function () {
        let fromid = parseInt(Math.random() * 999)
        let html = '{if "Fun(Db(select top 1 count(1) from @.seller where @.fromid=' + fromid + ',count))"=="0"}<r: db="sqlite.dhgate">INSERT into @.seller(@.from,@.sort,@.fromid)VALUES(\'dhgate\',(SELECT count(1)+1 from @.seller where @.from=\'dhgate\'),' + fromid + ')</r:>{else/}重设{/if}'
        Tool.ajax.a01(html, 1, this.c03, this)
    },
    c03: function (t) {
        if (t == "") { location.reload(); } else if (t == "重设") { this.c02(); } else { alert("出错：" + t); }
    },
    //////////////////////////////////////////////////////////////

    c26: function (id) {
        if (confirm('确定删除吗?')) {
            let html = "\"\"<r: db=\"sqlite.dhgate\">delete from @.seller where @.id=" + id + "</r:>"
            Tool.ajax.a01(html, 1, this.c03, this)
        }
    },
    c42: function (This, id, v) {
        This.attr("disabled", true);
        let html = "\"\"<r: db=\"sqlite.dhgate\">update @.seller set @.hide=" + v + " where @.id=" + id + "</r:>"
        Tool.ajax.a01(html, 1, this.c43, this, [This, v]);
    },
    c43: function (t, arr) {
        if (t == "") {
            arr[0].attr("disabled", false);
        }
        else {
            Tool.at(t);
        }
    },
    ///////////////////////////////////////////////////////////////////////////////////
    c44: function (This, id, L, V) {
        let val = This.val(), html = "\"\"<r: db=\"sqlite.dhgate\">update @.seller set @." + L + "='" + val + "' where @.id=" + id + "</r:>"
        if (val != V && !This.attr("disabled")) {
            This.attr("disabled", true);
            This.val("加载加..."); Tool.ajax.a01(html, 1, this.c45, this, [This, val, L]);
        }
    },
    c45: function (t, oo) {
        if (t == "") {
            if (oo[2] == "sort") {
                let html = '[0<r:seller db="sqlite.dhgate" size="100" where=" order by @.sort asc">,<:id/></r:seller>]';
                Tool.ajax.a01(html, 1, this.c46, this);
            }
            else { oo[0].attr("disabled", false); oo[0].val(oo[1]); }
        }
        else { alert("出错：" + t); }
    },
    c46: function (arr) {
        let sql = []
        for (let i = 1; i < arr.length; i++) { sql.push('update @.seller set @.sort=' + i + ' where @.id=' + arr[i]); }
        let html = '""<r: db="sqlite.dhgate">' + sql.join('<1/>') + '</r:>'
        Tool.ajax.a01(html, 1, this.c47, this);
    },
    c47: function (t) {
        if (t == "") { location.reload(); }
        else { alert("出错：" + t) }
    },
    d01: function () {
        gg.isRD(this.d02, this)
    },
    d02: function () {
        Tool.ajaxText("/view/Default/admin/js/敦煌网/common_注入_登陆敦煌网.js", this.d03, this);
    },
    d03: function (t) {
        gg.tabs_executeScript_indexOf(2, "", t, "static.geetest.com/pictures/v4_pic",true, this.d04, this)
    },
    d04: function (t) {
        Tool.at(t)
        //alert("aaaaaaaaaaaaaaaa"+t)
    }
}
fun.a01();