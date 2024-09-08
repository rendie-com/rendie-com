'use strict';
var fun =
{
    time: new Date(),
    obj: { A1: 1, A2: 0, B1: 1, B2: 0, Barr: [], code: {} },//配置信息
    sql: {},//保存到商品表的语句
    sqlDes: {},//保存到商品详情表的语句
    a01: function () {
        obj.arr[5] = obj.arr[5] ? obj.arr[5] : "-_-20";//有数据说明是按DH【卖家账户】更新商品信息
        obj.arr[6] = obj.arr[6] ? obj.arr[6] : "-_-20";//有数据说明是按proid更新商品信息
        let html = Tool.header('正在将【20天外】没更新的【来源数据】进行更新...') + '\
        <div class="p-2">\
          <table class="table mb-0 table-hover">\
          <tbody>\
            <tr><td class="right w150">页进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
            <tr>\
              <td class="right">条进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
            <tr><td class="right">统计：</td><td id="doTime" colspan="2"></td></tr>\
				    <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr>\
            <tr><td class="right">请求地址：</td><td id="url" colspan="2"></td></tr>\
          </tbody>\
          </table>\
			    <table class="table table-hover"><tbody id="body"></tbody></table>\
        </div>'
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        gg.isRD(this.a03, this);
    },
    a03: function () {
        let str = '\
        <r:gather db="sqlite.aliexpress" size=1>\
        {\
          "code":<:code/>\
        }\
        </r:gather>';
        Tool.ajax.a01(str, 1, this.a04, this);
    },
    a04: function (oo) {
        this.obj.code = oo.code;
        this.a05();
    },
    a05: function () {
        let html, day20 = parseInt((new Date().getTime() - 1000 * 60 * 60 * 24 * 2) / 1000)
        if (obj.arr[5] == "-_-20") {
            if (obj.arr[6] == "-_-20") {
                html = '[{"A2":' + (this.obj.A1 == 1 ? '<@page/>' : 0) + '}<r:pro page=2 db="sqlite.aliexpress" size=100 where=" where  @.datetime<' + day20 + ' and @.hide<9 order by @.isUpDHgate desc,@.datetime desc">,' + this.b04('') + '</r:pro>]'
                Tool.ajax.a01($2, $4, $1, $3)
            }
            else {
                html = '[{"A2":1}<r:pro db="sqlite.aliexpress" size=1 where=" where @.proid=\'' + obj.arr[7] + '\'">,' + this.b04('') + '</r:pro>]';
                Tool.at(html)
            }
        }
        else {
            html = '[{"A2":<@page/>}\
			<r:proupdhgate page=2 db="sqlite.dhgate" size=100 where=" a Inner Join @.pro b on a.@.proid=b.@.proid where b.@.datetime<'+ day20 + ' and a.@.upuserid=' + obj.arr[5] + '">,' + this.b04('a.@.') + '</r:proupdhgate>]'
            Tool.at(html)
            //Tool.ajax.a01($2,$4,$1,$3)
        }
    },
    a06: function (oo) {
        if (this.obj.A1 == 1) { this.obj.A2 = oo[0].A2 }
        this.obj.Barr = oo;
        this.obj.B2 = oo.length - 1
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a07, this);
    },
    a07: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a08, this, this.a09);
    },
    a08: function () {
        $("#doTime").html(Tool.doTime(this.time, (this.obj.A1 - 1) * this.obj.B2 + this.obj.B1, this.obj.A2 * this.obj.B2));
        let arr = this.obj.Barr[this.obj.B1]
        let url = "https://www.aliexpress.com/item/" + arr.fromid + ".html"
        let html = '';
        if (arr.upuser) { html += '<tr><td class="right">DH账号：</td><td>' + arr.upuser + '</td></tr>'; }
        html += '\
		<tr><td class="right w150">内容链接：</td><td><a href="'+ url + '" target="_blank">' + url + '</a></td></tr>\
		<tr><td class="right">上次【平均价】：</td><td>'+ arr.price + '</td></tr>\
		<tr><td class="right">上次【更新时间】：</td><td>'+ Tool.js_date_time2(arr.datetime) + '（' + Tool.dateDHM(false, arr.datetime * 1000, "s") + '）</td></tr>'
        $("#body").html(html)
        this.a10(url, arr.proid);

    },
    a09: function () {
        $("#A2").html(this.obj.A1 + '/' + this.obj.A2 + ' (完)')
        this.obj.A1++;
        this.obj.B1 = 1;
        this.obj.Barr = [];
        $("#B1").css("width", "0%");
        $("#B1,#B2").html("");
        this.a05();
    },
    a10: function (url, proid) {
        $("#state").html('正在打开【内容页】。。。');
        this.sql = { proid: proid };
        this.sqlDes = { proid: proid };
        $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
        Tool.gatherArticle.a01(url, this.a11, this);
    },
    a11: function (oo) {
        if (oo.status == 404) {
            this.a19();
        }
        else if (oo.status == "shelf") {
            this.a20();
        }
        else if (oo.status == "ok") {
            this.a12();
        }
        else {
            alert("不可能出现的错误")
        }
    },
    a12: function () {
        let html = '\
        {\
        <r:prodes size=1 db="sqlite.aliexpressprodes'+ Tool.pronum(this.sql.proid, 50) + '" where=" where @.proid=\'' + this.sql.proid + '\'">\
          "aeopAeProductSKUs":<:aeopAeProductSKUs/>,\
          "HistoryPrice":<:HistoryPrice/>\
        </r:prodes>\
        }'
        $("#state").html('正在验证价格，来判断是否需在DH更新...');
        Tool.ajax.a01(html, 1, this.a13, this)
    },
    a13: function (oo) {
        if (oo.aeopAeProductSKUs) {
            let sql = this.sql, availQuantityArr = this.b01(oo, this.sqlDes.aeopAeProductSKUs);//返回值分别为：最高项库存和是否要新
            if (sql.name) {
                this.a14(sql, availQuantityArr, oo)
            }
            else { $("#state").html('("采集内容有误,没有获取到标题...'); }
        }
        else {
            alert("aaaaaaaaaaaaaaa")
            //this.a019();//没有找到该商品详情
        }
    },
    a14: function (sql, availQuantityArr, oo) {
        //【网络】最高项库存<20，设置该数据【库存不足】。
        let arr1 = this.obj.Barr[this.obj.B1]
        if (availQuantityArr[0] < 20) {
            if (arr1.hide == 2) { sql.hide = 6; sql.err = '二次库存不足【最高项库存<20】'; }//以前【库存不足】，现在【库存不足】了，改为【二次库存不足】
            else if (arr1.hide == 6) { sql.hide = 60; sql.err = '三次库存不足【最高项库存<20】'; }//以前【二次库存不足】，现在【库存不足】了，改为【三次库存不足】
            else if (arr1.hide == 60) { }//以前【三次库存不足】，就不动它
            else { sql.hide = 2; sql.err = '库存不足【最高项库存<20】'; }
        }
        else {
            if (arr1.hide == 1) { sql.hide = 4; sql.err = '首次正常'; }//以前【已下架】，现在【正常】了，改为【首次正常】
            else if (arr1.hide == 2) { sql.hide = 4; sql.err = '首次正常'; }//以前【库存不足】，现在【正常】了，改为【首次正常】
            else if (arr1.hide == 3) { sql.hide = 4; sql.err = '首次正常'; }//以前【404】，现在【正常】了，改为【首次正常】
            else if (arr1.hide == 4) { sql.hide = 0; }//以前【首次正常】，现在【正常】了，改为【正常】
            else if (arr1.hide == 5) { sql.hide = 4; sql.err = '首次正常'; }//以前【二次已下架】，现在【正常】了，改为【首次正常】
            else if (arr1.hide == 6) { sql.hide = 4; sql.err = '首次正常'; }//以前【二次库存不足】，现在【正常】了，改为【首次正常】
        }
        this.a15(oo, sql, availQuantityArr[1], arr1);
    },
    a15: function (oo, sql, isupdate, barr) {
        let arr3 = oo.HistoryPrice;
        if (arr3.length == 0)//历史价格
        {
            this.sqlDes.HistoryPrice =
                [
                    {
                        price: sql.price,
                        Discount: sql.Discount,
                        Review: sql.Review,
                        SaleNum: sql.SaleNum,
                        ReviewsNum: sql.ReviewsNum,
                        time: Tool.js_date_time(new Date())
                    }
                ];
        }
        else {
            arr3[arr3.length - 1].time = arr3[arr3.length - 1].time.replace(/-/ig, "/");
            if (new Date(new Date(arr3[arr3.length - 1].time).getTime() + 1000 * 60 * 60 * 24 * 7) <= new Date())//之前的与现在的时间，至少相差7天以上,才能进来
            {
                arr3.push(
                    {
                        price: sql.price,
                        Discount: sql.Discount,
                        Review: sql.Review,
                        SaleNum: sql.SaleNum,
                        ReviewsNum: sql.ReviewsNum,
                        time: Tool.js_date_time(new Date())
                    });
            }
            this.sqlDes.HistoryPrice = arr3;
        }
        $("#body").append('<tr><td class="right">历史价格：</td><td><pre>' + JSON.stringify(this.sqlDes.HistoryPrice, null, 2) + '</pre></td><tr>')
        this.a16(oo, sql, isupdate, barr)
    },
    a16: function (oo, sql, isupdate, barr) {
        let sqlDes = this.sqlDes
        let str = "", isbool = false, p1 = 0;
        if (sqlDes.HistoryPrice.length == 3)//第一次到达3次，要更新一下
        {
            sql.err = '【第一次到达3次】，因为没有3次，成本就是原价，到达3次，成本就是最小折扣价。';
            isbool = true;
        }
        else if (sqlDes.HistoryPrice.length > 3) { sqlDes.HistoryPrice.shift(); }
        //////////////////////////////////////////////////////////////////////
        if (sqlDes.HistoryPrice.length == 3) {
            p1 = barr.price * 0.05
            if (parseInt(sql.price) > parseInt(barr.price + p1) || parseInt(sql.price) < parseInt(barr.price - p1))//【均价改变】
            {
                sql.err = '【均价改变】而更新,这次价格变动超过±5%';
                isbool = true;
            }
            else if (sql.Discount < barr.Discount && sql.Discount < sqlDes.HistoryPrice[0].Discount)//【折扣改变】
            {
                sql.err = '【折扣改变】而更新,这次是最小折扣。';
                isbool = true;
            }
            else if (isupdate)//【库存<20的组数，出现改变】而更新
            {
                sql.err = '【库存<15的组数，出现改变】而更新';
                isbool = true;
            }
            if (isbool) {
                //proStatus=2  表示【更新来源时需要更新】
                str = "<1/>update @.proupdhgate set @.proStatus=2 where @.proid='" + barr.proid + "'";
            }
        }
        ////////////////////////////////////////////////////////////barr.fromid == sql.fromID || 
        if (1 == 1)//"" + barr.shopid == sql.shopId
        {
            sqlDes.HistoryPrice = JSON.stringify(sqlDes.HistoryPrice)
            sqlDes.aeopAeProductSKUs = JSON.stringify(sqlDes.aeopAeProductSKUs)
            Tool.ajax.a01(str), 1, this.a17, this.b02(sql, this);
        }
        else {

            Tool.pre([
                "【fromID】不一致。\
                以前（fromid）：" + barr.fromid + "\
                现在（fromID）：" + sql.fromID + "\
                以前（shopId）：" + barr.shopid + "\
                现在（shopId）：" + sql.shopId,
                barr,
                sql]);
        }
    },
    a17: function (t) {
        if (t == "") {
            Tool.ajax.a01(this.b03(this.sqlDes), 1, this.a18, this);
        }
        else {
            Tool.at('出错：' + t);
        }
    },
    a18: function (t) {
        if (t == "") {
            $("#B2").html(this.obj.B1 + '/' + this.obj.B2 + ' (完)')
            this.obj.B1++;
            this.a07()
        }
        else {
            Tool.pre(t)
            alert("asasasasasas")
            //eval("let oo="+t)
            //this.a18(oo);		
        }
    },
    a19: function ()//404
    {
        let arr1 = this.obj.Barr[this.obj.B1], hide;
        if (arr1.hide == 3) { hide = 58; }//以前【已下架】，现在【已下架】了，改为【二次已下架】
        else if (arr1.hide == 59) { hide = 59; }
        else { hide = 3; }//以前【404】，现在【404】了，改为【二次404】
        let str = '<r: db="sqlite.aliexpress">update @.pro set @.hide=' + hide + ',@.datetime=' + Tool.gettime("") + ',@.time1=' + Tool.gettime("") + ',@.err=\'该商品404错误\' where @.proid=\'' + this.sql.proid + '\'</r:>';
        Tool.ajax.a01(str, 1, this.a18, this);
    },
    a20: function ()//该商品已下架
    {
        let arr1 = this.obj.Barr[this.obj.B1], hide;
        if (arr1.hide == 1) { hide = 5; }//以前【已下架】，现在【已下架】了，改为【二次已下架】
        else if (arr1.hide == 5) { hide = 59; }//以前【二次已下架】，现在【已下架】了，改为【三次已下架】
        else if (arr1.hide == 59) { hide = 59; }
        else { hide = 1; }
        ///////////////////////////////////////////////////////////

        let str = '[<r: db=\"sqlite.aliexpress\">update @.pro set @.hide=' + hide + ',@.datetime=' + Tool.gettime("") + ',@.time1=' + Tool.gettime("") + ',@.err=\'该商品已下架\' where @.proid=\'' + arr1.proid + '\'</r:>]';
        alert("bbbbbbbbbbbbbbbbb")
        //Tool.ajax.a01( str,1,this.a18, this);
    },
    //  a019:function()//没有找到该商品详情
    //  {
    //    let arr1=this.cache[this.cache[0].B1];
    //    let str='[<r: db=\"sqlite.aliexpress\">update @.pro set @.hide=30,@.datetime='+Tool.gettime("")+',@.time1='+Tool.gettime("")+',@.err=\'没有找到该商品详情\' where @.proid=\''+arr1.proid+'\'</r:>]';
    //   Tool.ajax.a01(str,1,this.a18,this);
    //},
    b01: function (arr2, arr3)//返回值分别为：最高项库存和是否要更新
    {
        //【库存不足】 即最高项库存<20
        //当本地所有【库存<20】的组数 与 采集到的【库存<20】的组数 不同，则设置该数据【需要更新】。即：多价格中【库存<20】的组数改变。
        let isupdate = false,//是否要更新
            availQuantity1 = 0,//本地
            availQuantity2 = 0,//网络
            availQuantity3 = 0;//最高项库存
        for (let i = 0; i < arr2.aeopAeProductSKUs[1].length; i++)//【本地】只要【库存<20】就累加
        {
            if (arr2.aeopAeProductSKUs[1][i].skuVal.availQuantity < 20) { availQuantity1++; }
        }
        ////////////////////////////////////////////////////
        for (let i = 0; i < arr3[1].length; i++)//【网络】只要【库存<20】就累加
        {
            if (availQuantity3 < arr3[1][i].skuVal.availQuantity) { availQuantity3 = arr3[1][i].skuVal.availQuantity; }
            if (arr3[1][i].skuVal.availQuantity < 20) { availQuantity2++; }
        }
        if (availQuantity1 != availQuantity2) { isupdate = true; }//【库存<20】的组数不同了，设置该数据【需要更新】
        return [availQuantity3, isupdate]
    },
    b02: function (sql, str) {
        let arr = []
        for (let p in sql) {
            if ("|Discount|price|type|weight|length|width|height|SaleNum|shopId|Review|hide|".indexOf("|" + p + "|") == -1) {
                arr.push("@." + p + "=" + Tool.rpsql(Tool.utf16toEntities(sql[p])));
            }
            else { arr.push("@." + p + "=" + sql[p]); }
        }
        let str1 = "<r: db=\"sqlite.aliexpress\">update @.pro set " + arr.join(",") + ",@.datetime=" + Tool.gettime("") + ",@.time1=" + Tool.gettime("") + " where @.proid='" + sql.proid + "'" + str + "</r:>"
        return str1
    },
    b03: function (oo) {
        let arr = []
        for (let p in oo) {
            arr.push("@." + p + "=" + Tool.rpsql(Tool.utf16toEntities(oo[p])));
        }

        let str = '<r: db="sqlite.aliexpressprodes' + Tool.pronum(oo.proid, 50) + '">update @.prodes set ' + arr.join(",") + ' where @.proid=\'' + oo.proid + '\'</r:>'
        return str;
    },
    b04: function (val) {
        let str = '\
		{\
			"proid":"<:'+ val + 'proid/>",\
			"datetime":<:'+ val + 'datetime/>,\
			"fromid":<:'+ val + 'fromid/>,\
			"shopid":<:'+ val + 'shopid/>,\
			"price":<:'+ val + 'price f=2/>,\
			"Discount":<:'+ val + 'Discount/>,\
			"hide":<:'+ val + 'hide/>,\
			"SaleNum":<:'+ val + 'SaleNum/>,\
			"Review":<:'+ val + 'Review/>\
		}'
        return str;
    }
}
fun.a01();