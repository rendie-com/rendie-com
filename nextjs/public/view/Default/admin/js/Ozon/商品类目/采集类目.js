'use strict';
var fun =
{
    obj: { A1: 1, A2: 0, Aarr: [] },
    a01: function () {
        let html = Tool.header('Ozon -&gt; 类目列表 -&gt; 采集类目') + '\
        <div class="p-2">\
            <table class="table table-hover">\
            <tbody>\
            <tr><td class="right w150">类目进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
            <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
            <tr><td class="right">提示：</td><td id="state" colspan="2">...</td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        gg.isRD(this.a03, this)
    },
    a03: function () {
        let url = "https://seller.ozon.ru/api/v1/seller-tree/get-by-company-id"
        $("#state").html("正在获取网址中的类目。。。");
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '【post】</a>');
        let data = JSON.stringify({ company_id: "1036832" })
        let headers = [
            //{
            //    "name": "Origin",
            //    "value": "https://seller.ozon.ru"
            //},
            //{
            //    "name": "Referer",
            //    "value": "https://seller.ozon.ru/app/products/add/general-info"
            //},
            {
                "name": "Content-Type",
                "value": 'application/json'
            },
            {
                "name": "X-O3-App-Name",
                "value": 'seller-ui'
            },
            {
                "name": "X-O3-Company-Id",
                "value": '1036832'
            },
            {
                "name": "X-O3-Language",
                "value": 'zh-Hans'
            },
            {
                "name": "X-O3-Page-Type",
                "value": 'products-other'
            }
        ]
        gg.setHeaders_postHtml(url, headers, data, this.a04, this)
    },
    a04: function (arr) {
        let Aarr = [];
        arr = arr.result;
        for (let i in arr)//第一层
        {
            this.b01(arr[i], 0, Aarr)
            //////////////////////////////////
            for (let j in arr[i].nodes)//第二层
            {
                this.b01(arr[i].nodes[j], i, Aarr)
                /////////////////////////////////
                for (let k in arr[i].nodes[j].nodes)//第三层
                {
                    this.b01(arr[i].nodes[j].nodes[k], j, Aarr)
                    /////////////////////////////////
                    for (let l in arr[i].nodes[j].nodes[k].nodes)//第四层
                    {
                        this.b01(arr[i].nodes[j].nodes[k].nodes[l], k, Aarr)
                    }
                }
            }
        }
        $("#state").html("正在拼装SQL。。。");
        this.obj.Aarr = Aarr
        this.obj.A2 = Math.ceil(Aarr.length / 50)
        this.a05()
    },
    a05: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a06, this)
    },
    a06: function () {
        let nArr = []
        for (let i = 0; i < this.obj.Aarr.length; i++) {
            nArr.push(this.obj.Aarr[0])
            this.obj.Aarr.shift();
            if (i == 49) { break; }
        }
        Tool.ajax.a01('"ok"' + nArr.join(""), 1, this.a07, this)
    },
    a07: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            this.a05()
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    b01: function (oo, upid, Aarr) {
        let selectType, insertType;
        let name = oo.descriptionTypeName
        if (name == "") name = oo.descriptionCategoryName
        selectType = "select count(1) from @.type where @.fromID=" + oo.descriptionCategoryId + " and @.upid=" + upid
        insertType = "insert into @.Type(@.name,@.upid,@.fromID,@.isleaf,@.hide)values('" + name.replace(/'/ig, "''") + "'," + upid + "," + oo.descriptionCategoryId + "," + (Object.keys(oo.nodes).length ? 0 : 1) + "," + (oo.disabled ? 1 : 0) + ")"
        Aarr.push('<if Fun(Db(sqlite.ozon,' + selectType + ',count))==0><r: db="sqlite.ozon">' + insertType + '</r:></if>')
    }
}
fun.a01();