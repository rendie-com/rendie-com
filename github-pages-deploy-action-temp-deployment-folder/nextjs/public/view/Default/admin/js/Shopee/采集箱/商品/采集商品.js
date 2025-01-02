var fun =
{
    obj:
    {
        A1: 1, A2: 1, key: "",
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
    //////////////////////////////////////////////
    b02: function (site) {
        if (site == "tw") { site = "xiapi" }
        return "https://" + site + ".xiapibuy.com/search?keyword=" + this.obj.key + "&page=" + (this.obj.A1 - 1) + "&sortBy=ctime";//搜索   
    },
    ///////////////////////////////////
    c01: function (This, val) {
        This.attr("disabled", true);
        this.obj.key = val;
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
        gg.tabs_remove_create_indexOf(3, this.b02(obj.params.site), false, false, this.d04, this)
    },
    d04: function (t) {
        Tool.ajax.text("/" + o.path + "admin/js/Shopee/采集箱/商品/注入_翻页和显示完整内容.js", this.d05, this);
    },
    d05: function (t) {
        gg.tabs_executeScript_indexOf(3, ["jquery"], t + "\nfun01.a01()", ["商品个数：60=60=60</title>"], false, this.e01, this)
    },
    ////////////////////////////////////////////////////
    e01: function (t) {
        let itemidArr = Tool.StrSplits(t, "itemid=", "&")
        let shopidArr = Tool.StrSplits(t, "shopid=", "\"")
        let nameArr = Tool.StrSplits(t, '.webp" alt="', "\"")
        let imageArr = Tool.StrSplits(t, '<div class="relative z-0 w-full pt-full"><img src="', "\"")
        let priceArr = Tool.StrSplits(t, '<span class="font-medium text-base/5 truncate">', "</span>")
        let shop_locationArr = Tool.StrSplits(t, '<span class="ml-[3px] align-middle">', "</span>")
        this.obj.A2 = Tool.int(Tool.StrSlice(t, 'class="shopee-mini-page-controller__total">', '</span>'));
        if (itemidArr.length == shopidArr.length &&
            shopidArr.length == nameArr.length &&
            nameArr.length == imageArr.length &&
            imageArr.length == priceArr.length &&
            priceArr.length == shop_locationArr.length
        ) {
            this.e02(itemidArr, shopidArr, nameArr, imageArr, priceArr, shop_locationArr)
        }
        else {
            Tool.at("内容出错：\n\n" + t)
        }
    },
    e02: function (itemidArr, shopidArr, nameArr, imageArr, priceArr, shop_locationArr) {
        let data = []
        for (let i = 0; i < itemidArr.length; i++) {
            let arrL = [
                "@.itemid",
                "@.shopid",
                "@.name",
                "@.image",
                "@.price",
                "@.shop_location",
                "@.addtime",
            ]
            let arrR = [
                shopidArr[i],
                shopidArr[i],
                Tool.rpsql(nameArr[i]),
                Tool.rpsql(imageArr[i]),
                priceArr[i].replace(/,/g, ""),
                Tool.rpsql(shop_locationArr[i]),
                Tool.gettime(""),
            ]
            let arrUp = []; for (let i = 0; i < arrL.length; i++) { arrUp.push(arrL[i] + "=" + arrR[i]); }
            ////////////////////////////////////////////////////////////////////////////////////////////////
            data.push({
                action: "sqlite",
                database: "shopee/采集箱/商品/" + obj.params.site,
                sql: "select @.itemid as itemid from @.table where @.itemid=" + itemidArr[i],
                list: [{
                    action: "sqlite",
                    database: "shopee/采集箱/商品/" + obj.params.site,
                    sql: "update @.table set " + arrUp.join(",") + " where @.itemid=" + itemidArr[i],
                }],
                elselist: [{
                    action: "sqlite",
                    database: "shopee/采集箱/商品/" + obj.params.site,
                    sql: "insert into @.table(" + arrL.join(",") + ")values(" + arrR.join(",") + ")",
                }]
            })
        }
        Tool.ajax.a01(data, this.e03, this);
    },
    e03: function (t) {
        let iserr = false;
        for (let i = 0; i < t.length; i++) {
            if (t[i][0].list[0].length != 0) { iserr = true; break; }
        }
        if (iserr) {
            Tool.pre(["有出错", t]);
        }
        else {
            this.obj.A1++;
            this.f01()
        }
    },
    f01: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.f02, this)
    },
    f02: function (t) {
        Tool.ajax.text("/" + o.path + "admin/js/Shopee/采集箱/商品/注入_翻页和显示完整内容.js", this.f03, this);
    },
    f03: function (t) {
        //问：为什么不直接访问下一页？答：这样会很容易出现验证码。
        gg.tabs_executeScript_indexOf(3, ["jquery"], t + "\nfun01.d01(" + this.obj.A1 + ")", ["已打开下一页。"], false, this.d04, this)
    },   
}
fun.a01();