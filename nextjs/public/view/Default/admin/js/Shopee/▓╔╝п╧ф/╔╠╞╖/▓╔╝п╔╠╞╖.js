var fun =
{
    obj:
    {
        A1: 1, A2: 0, key: "",
    },
    a01: function () {
        //obj.params.jsFile         选择JS文件        
        //obj.params.site           站点
        //obj.params.return         返回URL       
        this.a02()
    },
    a02: function () {
        let html = Tool.header(obj.params.return, "Shopee &gt; 采集箱 &gt; 商品 &gt; 采集商品") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle">\
            <tbody>\
		         <tr><td class="right w150">站点：</td><td colspan="2">'+ Tool.site(obj.params.site) + '</td></tr>\
                 <tr><td class="right">请选择关键词：</td><td colspan="2">'+ this.b01(obj.params.site) + '</td></tr>\
		        <tr><td class="right">关键词页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		        <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            </tbody>\
            </table>\
        </div>'
        Tool.html(null, null, html);
    },
    //////////////////////////////////////////////
    b01: function (site) {
        let arr = []
        if (site == "my") {
            arr = config_my
        }
        else if (site == "br") {
            arr = config_br
        }
        else if (site == "tw") {
            arr = config_tw
        }
        let str1 = ""
        for (let i = 0; i < arr.length; i++) {
            str1 += '<option value="' + arr[i][0] + '">' + (i + 1) + '.' + arr[i][0] + '(' + arr[i][2] + ')</option>'
        }
        let str2 = '\
        <select onChange="fun.c01($(this),this.options[this.selectedIndex].value)" class="form-select">\
            <option value="-_-20">请选择关键词</option>'+ str1 + '\
        </select>';
        return str2;
    },
    ///////////////////////////////////
    c01: function (This, val) {
        This.attr("disabled", true);
        this.obj.key = val;
        this.obj.A2 = 9;//为什么是9？答：最多只能翻到第9页。
        this.d01()
    },
    ////////////////////////////////////////
    d01: function () {
        gg.isRD(this.d02, this);
    },
    d02: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d03, this)
    },
    d03: function () {
        let url = "https://" + (obj.params.site == "tw" ? 'xiapi' : obj.params.site) + ".xiapibuy.com/search?keyword=" + this.obj.key + "&page=" + (this.obj.A1 - 1) + "&sortBy=ctime";//搜索        
        gg.tabs_remove_create_getHeaders(2, url, ["/api/v4/search/search_items"], false, this.d04, this)
    },
    d04: function (t) {
        gg.setHeaders_getHtml(t.url, t.requestHeaders, this.d05, this)
    },
    d05: function (t) {
        if (t.items) {
            this.d06(t.items)
        }
        else {
            Tool.pre(["内容不对1111", t])
        }
    },
    d06: function (arr) {
        let itemidArr = [];
        let insertObj = {}, updateObj = {}
        for (let i = 0; i < arr.length; i++) {
            let arrL = [
                "@.currency",
                "@.itemid",
                "@.shopid",
                "@.name",
                "@.image",
                "@.price",
                "@.shop_location",
                "@.addtime",
            ]
            let arrR = [
                Tool.rpsql(arr[i].item_basic.currency),
                arr[i].itemid,
                arr[i].shopid,
                Tool.rpsql(arr[i].item_basic.name),
                Tool.rpsql(arr[i].item_basic.image),
                arr[i].item_basic.price,
                Tool.rpsql(arr[i].item_basic.shop_location),
                arr[i].item_basic.ctime,
            ]
            let arrUp = []; for (let i = 0; i < arrL.length; i++) { arrUp.push(arrL[i] + "=" + arrR[i]); }
            insertObj[arr[i].itemid] = 'insert into @.table(' + arrL.join(",") + ')values(' + arrR.join(",") + ')'
            updateObj[arr[i].itemid] = 'update @.table set ' + arrUp.join(",") + ' where @.itemid=' + arr[i].itemid
            itemidArr.push(arr[i].itemid);
        }
        let data = [{
            action: "sqlite",
            database: "shopee/采集箱/商品/"+obj.params.site,
            sql: "select @.itemid as itemid from @.table where @.itemid in(" + itemidArr.join(",") + ")",
        }]
        Tool.ajax.a01(data, this.d07, this, [insertObj, updateObj]);
    },
    d07: function (t, sqlArr) {
        let arr = t[0], nArr = []
        for (let i = 0; i < arr.length; i++) {
            nArr.push(arr[i].itemid);
        }
        this.d08(nArr, sqlArr[0], sqlArr[1])
    },
    d08: function (itemidArr, insertObj, updateObj) {
        let data = []
        for (let k in insertObj) {
            if (itemidArr.indexOf(Tool.int(k)) == -1) {
                data.push({
                    action: "sqlite",
                    database: "shopee/采集箱/商品/"+obj.params.site,
                    sql: insertObj[k],
                })
            }
            else {
                data.push({
                    action: "sqlite",
                    database: "shopee/采集箱/商品/"+obj.params.site,
                    sql: updateObj[k],
                })
            }
        }
        Tool.ajax.a01(data, this.d09, this);
    },
    d09: function (t) {
        let iserr = false;
        for (let i = 0; i < t.length; i++) {
            if (t[i] != null) { iserr = true; break; }
        }
        if (iserr) {
            Tool.pre(["有出错", t]);
        }
        else {
            this.obj.A1++;
            this.e01()
        }
    },
    e01: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.e02, this)
    },
    e02: function () {
        Tool.ajax.text("/" + o.path + "admin/js/Shopee/采集箱/商品/注入_翻页.js", this.e03, this);
    },
    e03: function (txt) {
        gg.tabs_executeScript_getHeaders(2, txt, ["/api/v4/search/search_items"], false, this.e04, this)
    },
    e04: function (t) {
        if (t.url.indexOf("&newest=" + ((this.obj.A1 - 1) * 60) + "&") != -1) {
            this.d04(t)
        }
        else {
            Tool.pre(["页码不对", t.url])
        }
    },
}
fun.a01();