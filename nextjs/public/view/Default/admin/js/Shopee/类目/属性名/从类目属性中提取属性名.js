var fun =
{
    obj:
    {
        A1: 1, A2: 0,
    },
    a01: function () {
        let html = Tool.header('Shopee &gt; 商品类目 &gt; 属性名 &gt; 从类目属性中提取属性名') + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
                <tbody>\
                    <tr><td class="right w150">类目属性条进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
                </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        let str = '[' + (this.obj.A2 == 0 ? '<@count/>' : 0) + '<r:attr size=1 page=2 db="sqlite.shopee">,<:json/></r:attr>]'
        $("#state").html("正在获取属性信息。。。")
        Tool.ajax.a01(str, this.obj.A1, this.a03, this);
    },
    a03: function (t) {
        if (this.obj.A2 == 0) { this.obj.A2 = t[0] }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, t[1].data.list[0].attribute_tree);
    },
    a04: function (arr) {
        let select, insert, Aarr = [];
        for (let i = 0; i < arr.length; i++) {
            select = "select count(1) from @.attrName where @.fromid=" + arr[i].attribute_id
            insert = "insert into @.attrName(@.cnName,@.enName,@.fromID)values('" + (arr[i].display_name).replace(/'/ig, "''") + "','" + (arr[i].name).replace(/'/ig, "''") + "'," + arr[i].attribute_id + ")"
            Aarr.push('<if Fun(Db(sqlite.shopee,' + select + ',count))==0><r: db="sqlite.shopee">' + insert + '</r:></if>')
        }
        $("#state").html("正在添加信息。。。");
        Tool.ajax.a01('"ok"' + Aarr.join(""), 1, this.a05, this);
    },
    a05: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            this.a02();
        }
        else {
            Tool.at("出错" + t);
        }
    },
}
fun.a01();