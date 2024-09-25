var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        B1: 1, B2: 0,
        seller: {},//提交要用
    },
    a01: function () {
        let html = Tool.header(obj.params.return, 'Shopee &gt; 品牌 &gt; 正在【获取Shopee品牌】...') + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
                <tbody>\
                    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
                    <tr><td class="right">类目进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr><td class="right">品牌页进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
                    <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
                    <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
                </tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        Tool.login.a01(this.a03, this)
    },
    a03: function (t) {
        this.obj.seller = t;
        this.a04()
    },
    a04: function () {
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
        Tool.ajax.a01(data, this.a05, this);
    },
    a05: function (t) {
        if (this.obj.A2 == 0) { this.obj.A2 = t[1][0].total; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a06, this, null, t[0][0].fromid);
    },
    a06: function (typeID) {
        this.obj.seller.typeID = typeID;
        this.obj.seller.cursor = "";//下一页
        this.d01()
    },
    ///////////////////////
    b01: function (brand_id, arr) {
        let name = "";
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].brand_id == brand_id) {
                name = arr[i].name;
                break;
            }
        }
        return name;
    },
    /////////////////////////////////////////////
    d01: function () {
        let pArr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "category_ids=" + this.obj.seller.typeID,
            "brand_status=1",
            "limit=50",
            "cursor=" + this.obj.seller.cursor,
            "brand_name=",
            "cnsc_shop_id=" + this.obj.seller["my"].shopId,
            "cbsc_shop_region=my"
        ]
        let url = "https://seller.shopee.cn/api/v3/mtsku/get_mtsku_brand_list?" + pArr.join("&")
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        $("#state").html("正在搜索商品SKU。。。");
        gg.getFetch(url,"json", this.d02, this)
    },
    d02: function (oo) {
        if (oo.code === 0) {
            if (oo.data.list[0].page_info.has_next) {
                this.obj.seller.cursor = oo.data.list[0].page_info.cursor//下一页
                this.obj.B2 = this.obj.B1 + 1;
            }
            Tool.x1x2("B", this.obj.B1, this.obj.B2, this.d03, this, this.e01, oo.data.list[0].brand_list);
        }
        else {
            Tool.pre(["出错", oo])
        }
    },
    d03: function (arr) {
        let nArr = [];
        for (let i = 0; i < arr.length; i++) {
            nArr.push(arr[i].brand_id);
        }
        let data = [{
            action: "sqlite",
            database: "shopee/品牌",
            sql: "select " + Tool.fieldAs("brand_id,category_ids") + " FROM @.table where @.brand_id in(" + nArr.join(",") + ") ",
        }]
        Tool.ajax.a01(data, this.d04, this, { brand_idArr: nArr, arr: arr });
    },
    d04: function (t, oo) {
        let arr = t[0]
        let updateArr = [];
        for (let i = 0; i < arr.length; i++) {
            //能进来，就说明本地有这个品牌了
            //那就看能不能增加类目            
            if (arr[i].category_ids === 0) {
                arr[i].category_ids = [];
            }
            else{
                arr[i].category_ids = JSON.parse(arr[i].category_ids);
            }
            //////////////////////
            if (arr[i].category_ids.indexOf(this.obj.seller.typeID) == -1) {
                arr[i].category_ids.push(this.obj.seller.typeID)
                updateArr.push("update @.table set @.category_ids=" + Tool.rpsql(JSON.stringify(arr[i].category_ids)) + " where @.brand_id=" + arr[i].brand_id)
            }
            //删除后就全是要插入的了。
            oo.brand_idArr = oo.brand_idArr.filter(item => item !== arr[i].brand_id);//删除数组中的指定元素
        }
        this.d05(updateArr, oo)
    },
    d05: function (updateArr, oo) {
        let insertArr = [], arr = oo.brand_idArr
        for (let i = 0; i < arr.length; i++) {
            insertArr.push('insert into @.table(@.brand_id,@.category_ids,@.name,@.addtime)values(' + arr[i] + ',\'[' + this.obj.seller.typeID + ']\',' + Tool.rpsql(this.b01(arr[i], oo.arr)) + ',' + Tool.gettime("") + ')')
        }
        $("#state").html("正在添加或更新品牌。。。");
        this.d06(updateArr.concat(insertArr))
    },
    d06: function (arr) {
        let data = []
        for (let i = 0; i < arr.length; i++) {
            data.push({
                action: "sqlite",
                database: "shopee/品牌",
                sql: arr[i],
            })
        }
        Tool.ajax.a01(data, this.d07, this);
    },
    d07: function (t) {
        let isErr = false
        for (let i = 0; i < t.length; i++) {
            if (t[i].length != 0) {
                isErr = true;
                break;
            }
        }
        if (isErr) {
            Tool.pre(["有错误", t])
        }
        else {
            this.obj.B1++;
            this.d01();
        }
    },
    ///////////////////////////////////////////////
    e01: function () {
        this.obj.B1 = 1; this.obj.B2 = 0;
        this.obj.A1++;
        this.a04();
    },
}
fun.a01();