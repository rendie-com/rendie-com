'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0,//页进度
    },
    a01: function () {
        //obj.arr[4]    返回URL
        let html = Tool.header("1688 &gt; 采集箱 &gt; 次商品列表 &gt; 把【offerList表】复制到【proList表】中") + '\
        <div class="p-2">\
          <table class="table  align-middle table-hover">\
            <tbody>\
                <tr><td class="right w150">页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
            </tbody>\
          </table>\
        </div>';
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        let str = '[\
        {"A2":'+ (this.obj.A2 == 0 ? '<@page/>' : '0') + '}\
            <r:offerList size=10 page=2 db="sqlite.1688">,\
		    {\
                "saleNum":<:saleNum/>,\
		        "unit":<:unit tag=json/>,\
		        "unitWeight":<:unitWeight/>,\
		        "deliveryLimit":<:deliveryLimit/>,\
		        "freight":<:freight/>,\
		        "companyName":<:companyName tag=json/>,\
		        "province":<:province tag=json/>,\
		        "city":<:city tag=json/>,\
		        "imgUrl":<:imgUrl tag=json/>,\
		        "subject":<:subject tag=json/>,\
		        "companyUrl":<:companyUrl tag=json/>,\
		        "brand":<:brand tag=json/>,\
		        "fromid":<:fromid/>,\
		        "categoryId":<:categoryId/>,\
		        "state":<:state/>,\
		        "errorMsg":<:errorMsg tag=json/>,\
		        "uptime":<:uptime/>,\
		        "addtime":<:addtime/>\
            }\
            </r:offerList>]'
        $("#state").html("正在获取商品信息...");
        Tool.ajax.a01(str, this.obj.A1, this.a03, this);
    },
    a03: function (arr) {
        if (this.obj.A2 == 0) { this.obj.A2 = arr[0].A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, arr);
    },
    a04: function (arr) {
        $("#state").html("正在更新数据...");
        let str = "",arr3=[]
        for (let i = 1; i < arr.length; i++) {
            if (arr3.indexOf(arr[i].fromid) == -1) {//去重
                arr3.push(arr[i].fromid)
                let arr1 = [
                    "saleNum",
                    "unit",
                    "unitWeight",
                    "deliveryLimit",
                    "freight",
                    "companyName",
                    "province",
                    "city",
                    "imgUrl",
                    "subject",
                    "companyUrl",
                    "brand",
                    "fromid",
                    "categoryId",
                    "state",
                    "errorMsg",
                    "uptime",
                    "addtime"
                ]
                let arr2 = [
                    arr[i].saleNum,
                    Tool.rpsql(arr[i].unit),
                    arr[i].unitWeight,
                    arr[i].deliveryLimit,
                    arr[i].freight,
                    Tool.rpsql(arr[i].companyName),
                    Tool.rpsql(arr[i].province),
                    Tool.rpsql(arr[i].city),
                    Tool.rpsql(arr[i].imgUrl),
                    Tool.rpsql(arr[i].subject),
                    Tool.rpsql(arr[i].companyUrl),
                    Tool.rpsql(arr[i].brand),
                    arr[i].fromid,
                    arr[i].categoryId,
                    arr[i].state,
                    Tool.rpsql(arr[i].errorMsg),
                    arr[i].uptime,
                    arr[i].addtime
                ]
                str += '\
                <if Fun(Db(sqlite.1688,select count(1) from @.proList where @.fromid=' + arr[i].fromid + ',count))==0>\
                    <r: db="sqlite.1688">insert into @.proList(@.'+ arr1.join(",@.") + ')values(' + arr2.join(",") + ')</r:>\
                </if>';
            }           
        }
        Tool.ajax.a01('"ok"' + str, 1, this.a06, this)
    },
    a06: function (t) {
        if (t == "ok") {
            $("#state").html("等0秒后，再下一条...");
            Tool.Time("name", 0, this.a07, this)
        }
        else {
            $("#state").html("更新出错,延时1秒后再来。")
            //Tool.Time("name", 1000, this.a02, this, oo)
            Tool.pre(["更新出错01：", t]);
        }
    },
    a07: function (t) {
        this.obj.A1++;
        this.a02()
    },
}
fun.a01();