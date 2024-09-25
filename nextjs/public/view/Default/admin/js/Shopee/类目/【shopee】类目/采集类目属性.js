'use strict';
var fun =
{
    obj: { A1: 1, A2: 0 },
    a01: function () {
        let html = Tool.header(obj.params.return, 'Shopee -&gt; 类目列表 -&gt; 采集类目属性') + '\
		<div class="p-2"><table class="table table-hover">\
      <tbody>\
        <tr><td class="right w150">类目进度：</td>'+ Tool.htmlProgress('A') + '</tr><tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
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
        $("#state").html("正在获取叶子类目。。。");
        let data = [{
            action: "sqlite",
            database: "shopee/类目/类目",
            sql: "select @.fromid as fromid FROM @.table where @.isleaf=1" + Tool.limit(1, this.obj.A1),
        }]
        if (this.obj.A2 == 0) {
            data.push({
                action: "sqlite",
                database: "shopee/类目/类目",
                sql: "select count(1) as total FROM @.table where @.isleaf=1",
            })
        }
        Tool.ajax.a01(data, this.a04, this)
    },
    a04: function (t) {
        if (this.obj.A2 == 0) { this.obj.A2 = t[1][0].total; }
        this.a05(t[0][0].fromid);
    },
    a05: function (t) {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, t)
    },
    ///////////////////////////////////////////////////////////
    d01: function (t) {
        let url = "https://seller.shopee.cn/api/v3/mtsku/get_mtsku_attribute_tree/?SPC_CDS_VER=2&category_ids=" + t
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        gg.getFetch(url,"json", this.d02, this, t)
    },
    d02: function (json, cateId) {
        let data = [{
            action: "sqlite",
            database: "shopee/类目/属性",
            sql: "select @.cateId as cateId from @.table where @.cateId=" + cateId + " limit 1",
        }]
        let oo = { cateId: cateId, json: json.data.list[0].attribute_tree }
        Tool.ajax.a01(data, this.d03, this, oo)
    },
    d03: function (t, oo) {
        if (t[0].length == 0) {
            let data = [{
                action: "sqlite",
                database: "shopee/类目/属性",
                sql: "insert into @.table(@.cateId,@.json)values(" + oo.cateId + "," + Tool.rpsql(JSON.stringify(oo.json)) + ")",
            }]
            Tool.ajax.a01(data, this.d04, this)
        }
        else {
            this.d04([[]])
        }
    },
    d04: function (t) {
        if (t[0].length == 0) {
            this.obj.A1++;
            if (this.obj.A1 > this.obj.A2) {
                $("#state").html("全部完成")
            }
            else {
                this.a03();
            }
        }
        else {
            Tool.pre(["出错01：", t])
        }
    }
}
fun.a01();