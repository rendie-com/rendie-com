'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0,
        Num: 0,//当天数据连续为0时，的次数超过30次，就终止程序。
        time: 0
    },
    a01: function () {
        this.obj.A2 = obj.arr[5] ? parseInt(obj.arr[5]) : 10;//翻页
        let html = Tool.header("正在【同步店铺数据】（" + this.obj.A2 + "天）。。。") + '\
        <div class="p-2">\
          <table class="table table-hover">\
          <tbody>\
            <tr><td class="right w150">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
            <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
          </tbody>\
          </table>\
        </div>'
        this.obj.time = Tool.userDate13(Date.now(), "/")
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a03, this)
    },
    a03: function () {
        let arr2 = this.obj.time.split("/"), timeA = Tool.gettime(this.obj.time);
        let str = '\
		<r:shopanalysis db="sqlite.dhgate" size=1 where=" where @.year='+ arr2[0] + ' and @.month=' + Number(arr2[1]) + ' and @.day=' + Number(arr2[2]) + '">\
		{\
			"day":'+ arr2.join("") + ',\
			"Exposure":<:sum(@.Exposure) tag=0/>,\
			"Browse":<:sum(@.Browse) tag=0/>,\
			"visitors":<:sum(@.visitors) tag=0/>,\
			"money":<:sum(@.money) tag=0/>,\
			"OrderNum":<:sum(@.OrderNum) tag=0/>,\
			"DelayQuantity":<:sum(@.DelayQuantity) tag=0/>,\
			"UploadVolume":<:sum(@.UploadVolume) tag=0/>,\
			"AuditFailed":<:sum(@.AuditFailed) tag=0/>,\
			"DelVolume":<:sum(@.DelVolume) tag=0/>,\
			"UpdateVolume":<:sum(@.UpdateVolume) tag=0/>,\
			"DeliverGoods":<:sum(@.DeliverGoods) tag=0/>,\
			"OnShelves":<:sum(@.OnShelves) tag=0/>,\
			"ImgBrowse":<.Db(sqlite.main,select count(1) as Total FROM @.dhgatelogimg where @.addtime<'+ (timeA + 60 * 60 * 24) + ' and @.addtime>=' + timeA + ' and @.fromurl like \'%dhgate.com/%\',count)/>\
		}\
		</r:shopanalysis>'
        timeA -= 60 * 60 * 24//减一天
        this.obj.time = Tool.userDate13(timeA * 1000, "/")//减一天
        $("#state").html("正在获取数据。。。");
        Tool.ajax.a01(str, 1, this.a04, this);

    },
    a04: function (oo) {
        let sel = "select count(1) from @.shopanalysis_day where @.day=" + oo.day
        let arrL = [], arrR = [], arrUp = [], num = 0
        for (let k in oo) {
            arrL.push("@." + k);
            arrR.push(oo[k]);
            if (k != "day") { arrUp.push("@." + k + "=" + oo[k]); num += oo[k]; }
        }
        $("#state").html("正在导入。。。");
        let str = '""\
		<if Fun(Db(sqlite.dhgate,'+ sel + ',count))==0>\
			<r: db="sqlite.dhgate">insert into @.shopanalysis_day('+ arrL.join(",") + ')values(' + arrR.join(",") + ')</r:>\
		<else/>\
			<r: db="sqlite.dhgate">update @.shopanalysis_day set '+ arrUp.join(",") + ' where @.day=' + oo.day + '</r:>\
		</if>'
        if (num == 0) {
            this.obj.Num++;
            if (this.obj.Num < 30) {
                Tool.ajax.a01(str, 1, this.a05, this);
            }
            else { $("#state").html("程序终止，【连续】数超过30次没有数据。【" + oo.day + "】"); }
        }
        else {
            this.obj.Num = 0;//注：目的是为了【连续】有效
            Tool.ajax.a01(str, 1, this.a05, this);
        }
    },
    a05: function (t) {
        if (Tool.Trim(t) == "") {
            this.obj.A1++;
            this.a02()
        }
        else {
            Tool.at("出错：" + t);
        }
    }
}
fun.a01();