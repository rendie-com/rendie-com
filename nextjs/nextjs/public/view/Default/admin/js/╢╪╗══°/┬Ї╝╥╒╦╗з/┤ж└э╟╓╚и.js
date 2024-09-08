'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0,
    },
    a01: function () {
        let html = '\
		<div class="Tul thead"><a href="javascript:" onclick="Tool.main()" class="arrow_back"></a>正在处理侵权...</div>\
		<ul class="Tul list-group-item-action"><li class="w100 right">账号：</li><li id="username"></li></ul>\
		<ul class="Tul list-group-item-action"><li class="w100 right">账号进度：</li>'+ Tool.htmlProgress('A') + '</ul>\
		<ul class="Tul list-group-item-action"><li class="w100 right">侵权页进度：</li>'+ Tool.htmlProgress('B') + '</ul>\
		<ul class="Tul list-group-item-action row"><li class="w100 right">提示：</li><li id="state">正在准备账号...</li></ul>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        let str = '\
        {\
            <r:APIaccount size=1 page=2 where=" where @.from=\'dhgate\' order by @.sort asc,@.id asc">\
                "username":"[APIaccount:username]",\
                "password":"[APIaccount:password]",\
                "fromid":"[APIaccount:fromid]"\
            </r:APIaccount>,\
            "A1":'+ this.obj.A1 + ',"A2":<@page/>,\
            "B1":1,"B2":1\
        }'
        Tool.ajax.a01( str, this.obj.A1,this.a03, this);
    },
    a03: function (oo) {
        this.obj = oo;
        win.isRD(this.a04, this);
    },
    a04: function () {
        if (this.obj.A1 <= this.obj.A2) {
            let p1 = Math.ceil(this.obj.A1 / this.obj.A2 * 100);
            $("#username").html(this.obj.username);
            $("#A1").html(p1 + "%").css("width", p1 + "%");
            $("#A2").html(this.obj.A1 + '/' + this.obj.A2 + '（个）');
            $("#state").html("正在【登录】。。。");
            F1.login(this, this.a05);
        }
        else
        {
            $("#state").html("全部完成");
        }
    },
    a05: function () {
        win.WebSetHTML("2", 'html|', "加载中。。。");
        if (this.obj.B1 <= this.obj.B2) {
            let URL = "http://seller.dhgate.com/sellerbrand/beComplained/list.do?dhpath=10001,70,7002&page=" + this.obj.B1;
            $("#state").html("正在打开【违规待处理产品 - 知识产权投诉产品】页面。。。");
            win.WebUrl("2", URL, this.a06, this);
        }
        else {
            $("#state").html("正在退出。。。");
            $("#A2").html(this.obj.A1 + '/' + this.obj.A2 + '（完）');
            this.obj.A1++;
            F1.loginout(this, this.a02);
        }
    },
    a06: function () {
        let str = win.WebGetHTML("2", "html|");
        if (str.indexOf('条记录') != -1) {
            let rcount = Tool.Trim(Tool.StrSlice(str, '共有', '条记录'));
            this.obj.B2 = Math.ceil(parseInt(rcount) / 20)
            let p1 = Math.ceil(this.obj.B1 / this.obj.B2 * 100);
            $("#B1").html(p1 + "%").css("width", p1 + "%");
            $("#B2").html(this.obj.B1 + '/' + this.obj.B2 + '（页）');
            let prodRepeatGroupNum = Tool.Trim(Tool.StrSlice(str, '重复产品组(<b>', '</b>)'));
            let violateProductNum = Tool.Trim(Tool.StrSlice(str, '疑似侵权产品(<b>', '</b>)'));
            let freezeProductNum = Tool.Trim(Tool.StrSlice(str, '冻结产品(<b>', '</b>)'));
            let brandComplaintProductNum = Tool.Trim(Tool.StrSlice(str, '品牌商投诉产品(<b>', '</b>)'));
            let pirateBeComplainedNum = Tool.Trim(Tool.StrSlice(str, '盗图投诉产品 (<b>', '</b>)'));
            if (prodRepeatGroupNum != "0" || violateProductNum != "0" || freezeProductNum != "0" || brandComplaintProductNum != "0" || pirateBeComplainedNum != "0") { alert("除了【知识产权投诉产品】，还有其它项侵权。需要开发，样本。"); }
            else { this.a07(str); }
        }
        else if (str.indexOf('Sorry, there is no records about your') != -1) {
            this.obj.B1 = this.obj.B2 + 1;
            this.a05();
        }
        else { Tool.Time(this.a06, 300, this, "1"); }
    },
    a07: function (str) {
        let fromidArr = [], desArr = Tool.StrSplits(str, '<tr class="tr-border">', "</tr>");
        for (let i = 0; i < desArr.length; i++) {
            fromidArr[i] = Tool.StrSlice(desArr[i], "openItemLink('", "'");
            desArr[i] = desArr[i].replace(new RegExp("<.*?>", "ig"), " ");
        }
        let str = '[0\
        <r:dhUpPro size=10 page=2 where=" where @.from=\'dhgate\' and @.fromid in('+ fromidArr.join(',') + ')">\
        ,{\
            "proid":"[dhUpPro:proid]",\
            <r:product where=" where @.proid=\'[dhUpPro:proid]\'" size=1>\
            "shopid":[dhUpPro:shopid],\
            </r:product>\
            "fromid":"[dhUpPro:fromid]"\
        }\
        </r:dhUpPro>]'
       Tool.ajax.a01( str, "1",this.a08, this, desArr);
    },
    a08: function (oo, desArr) {
        let shopidArr = [];
        for (let i = 1; i < oo.length; i++)//去重复
        {
            if (shopidArr.indexOf(oo[i].shopid) == -1)//确保不重复
            {
                shopidArr.push(oo[i].shopid);
                /////////////把【店铺ID】放到备注里面去,在后面的代码中会用到【店铺ID】有确定是哪个备注////////////////////////
                for (let j = 0; j < desArr.length; j++) {
                    if (desArr[j].indexOf(oo[i].fromid) != -1) { desArr[j] += "【店铺ID:" + oo[i].shopid + "】"; }
                }
            }
        }
        this.a09(shopidArr, desArr)
    },
    a09: function (shopidArr, desArr) {
        $("#state").html("正在进行禁限。。。")
        let des = "", sql = [], str = "";
        for (let i = 0; i < shopidArr.length; i++) {
            des = "";
            for (let j = 0; j < desArr.length; j++) {
                if (desArr[j].indexOf("【店铺ID:" + shopidArr[i] + "】") != -1) {
                    des = desArr[j].replace(/'/ig, "''");
                    break;
                }
            }
            str += "<if Fun(Db(select top 1 count(1) from @.Restriction where @.name='" + shopidArr[i] + "' and @.mode=3 and @.from='aliexpress',count))==0><r: tag=\"sql\">insert into @.Restriction(:from,:mode,:name,:des,:time)values('aliexpress',3," + shopidArr[i] + ",'" + des + "',getdate())</r:></if>"
            sql.push("update @.product set @.hide=53,:err='" + des + "' where @.from='aliexpress' and @.shopid=" + shopidArr[i] + "<1/>update @.Restriction set @.time=getdate() where @.name='" + shopidArr[i] + "' and @.mode=3 and @.from='aliexpress'<1/>delete from @.freight where @.shopid=" + shopidArr[i])
        }
        if (sql.length == 0) { this.a10(""); }
        else {
            str += "<r: db=\"sqlite.aliexpress\">" + sql.join("<1/>") + "</r:>";
           Tool.ajax.a01( str,1,this.a10,this);
        }
    },
    a10: function (t) {
        if (t == "") {
            $("#B2").html(this.obj.B1 + '/' + this.obj.B2 + ' (完)');
            this.obj.B1++;
            this.a05();
        }
        else {
            alert("操作失败：" + t);
        }
    }
}
fun.a01();