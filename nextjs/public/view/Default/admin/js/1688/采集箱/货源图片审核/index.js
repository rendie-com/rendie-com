'use strict';
var fun =
{
    a01: function () {
        //obj.params.jsFile     选择JS文件
        obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页
        obj.params.field = obj.params.field ? obj.params.field : "1";//搜索字段
        obj.params.searchword = obj.params.searchword ? obj.params.searchword : "";//搜索关键词
        obj.params.aliexpress_type = obj.params.aliexpress_type ? obj.params.aliexpress_type : "";//速卖通类目
        obj.params.manualreview_1688 = obj.params.manualreview_1688 ? obj.params.manualreview_1688 : "";//手动审核1688状态
        this.a02();
    },
    a02: function () {
        let where = this.b19();
        let data = [{
            action: "sqlite",
            database: "1688",
            sql: "select count(1) as total FROM @.product " + where,
        }, {
            action: "sqlite",
            database: "1688",
            sql: "select " + Tool.fieldAs("id,proid") + " FROM @.product " + where + Tool.limit(1, obj.params.page),
            list: [{
                action: "sqlite",
                database: "aliexpress_prodes/${proid50:proid}",
                sql: "select " + Tool.fieldAs("DHpic,DHattrPic,DHdesPic") + " FROM @.prodes where @.proid='${proid}' limit 1",
            }]
        }, {
            action: "sqlite",
            database: "aliexpress",
            sql: "select " + Tool.fieldAs("fromid,name") + " FROM @.type where @.upid=0 and @.isleaf=0 order by @.sort desc,@.id asc",
        }]
        Tool.ajax.a01(data, this.a03, this, where);
    },
    a03: function (t, where) {
        if (t[0][0].total == 0) {
            let html = Tool.header(obj.params.jsFile) + '\
            <div class="p-2">\
                '+ this.b01() + '\
               <div class="p-2 center">没有数据</div>\
            </div>'
            Tool.html(null, null, html);
        }
        else {
            this.a04(t, where)
        }
    },
    a04: function (t, where) {
        t[1][0].list[0][0].DHattrPic = JSON.parse(t[1][0].list[0][0].DHattrPic);//后面还会用到
        t[1][0].list[0][0].DHdesPic = JSON.parse(t[1][0].list[0][0].DHdesPic);//后面还会用到
        t.DHpicArr = this.b03(JSON.parse(t[1][0].list[0][0].DHpic), t[1][0].list[0][0].DHattrPic, t[1][0].list[0][0].DHdesPic);
        t.where = where;
        Tool.ajax.a01(this.b07(t.DHpicArr[0][1]), this.a05, this, t);
    },
    a05: function (t1, t2) {
        let DHpic = JSON.parse(t2[1][0].list[0][0].DHpic)
        let html = Tool.header(obj.params.jsFile) + '\
        <div class="p-2">\
            '+ this.b01() + '\
            <table class="table table-bordered table-hover">\
            <thead class="table-light">'+ this.b02(t2.DHpicArr, t2[1][0].proid, t2[2], t2.where) + '</thead>\
            <tbody>\
                 <tr>\
                    <td>'+ this.b11(t2[1][0].proid) + '</td>\
                    <td id="list">\
                        <table class="table mb-0 table-bordered align-middle" id="list'+ t2.DHpicArr[0][1] + '">' + this.b10(t2.DHpicArr[0][1], t2[1][0].proid, t1[0][0].subject, t1[0][0].state, t1[0][0].saleNum) + '</table>\
                    </td>\
                </tr>\
                <tr>\
                    <td><div class="center">属性图：'+ t2[1][0].list[0][0].DHattrPic.length + ' 张</div>' + this.b06(t2[1][0].list[0][0].DHdesPic) + '</td>\
                    <td id="attrPic"><div id="attrPic' + t2.DHpicArr[0][1] + '">' + this.b12(t1[1][0].sku) + '</div></td>\
                </tr>\
                <tr>\
                   <td><div class="center">放大镜图：'+ DHpic.length + ' 张</div>' + this.b06(DHpic) + '</td>\
                   <td id="pic"><div id="pic' + t2.DHpicArr[0][1] + '">' + this.b09("放大镜图", JSON.parse(t1[1][0].pic)) + '</div></td>\
                </tr>\
               <tr>\
                   <td><div class="center">详情图：'+ t2[1][0].list[0][0].DHdesPic.length + ' 张</div>' + this.b06(t2[1][0].list[0][0].DHdesPic) + '</td>\
                   <td id="desPic"><div id="desPic' + t2.DHpicArr[0][1] + '">' + this.b13(t1[1][0].des) + '</div></td>\
                </tr>\
            </tbody>\
            </table>' + Tool.page(t2[0][0].total, 1, obj.params.page) + '\
        </div>'
        Tool.html(this.a06, this, html);
    },
    a06: function () {
        $('.easyzoom').easyZoom();
    },
    //////////////////////////////////////////////////////////////
    b01: function () {
        return '\
        <div class="input-group w-50 mb-2">\
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.params.field + '">' + this.b08(obj.params.field) + '</button>\
          <ul class="dropdown-menu">\
                <li class="dropdown-item pointer" onclick="fun.c07(1)">商品编码</li>\
                <li class="dropdown-item pointer" onclick="fun.c07(2)">自动匹配的【详情ID】</a></li>\
                <li class="dropdown-item pointer" onclick="fun.c07(3)">手动选中的【详情ID】</a></li>\
          </ul>\
          <input type="text" class="form-control" id="searchword" value="'+ Tool.Trim(obj.params.searchword) + '" onKeyDown="if(event.keyCode==13) fun.c08();">\
          <button class="btn btn-outline-secondary" type="button"onclick="fun.c08();">搜索</button>\
        </div>'
    },
    b02: function (DHpicArr, proid, type, where) {
        let liArr = []
        for (let i = 0; i < 5; i++) {
            liArr.push('<li ' + (i == 0 ? 'class="hover"' : '') + ' onclick="fun.c01($(this),' + DHpicArr[i][1] + ',\'' + proid + '\')" title="在' + DHpicArr[i][2] + '个商品ID中，其中商品ID（' + DHpicArr[i][1] + '）出现' + DHpicArr[i][0] + '次。">【' + DHpicArr[i][0] + "/" + DHpicArr[i][2] + '】次</li>')
        }
        let html = '\
        <tr><td colspan="2" class="left">查询条件：'+ where + '</td></tr>\
        <tr><th colspan="2" class="p-0">'+ this.b15(type) + '</th></tr>\
        <tr>\
            <th class="w-50 p-0"><ul class="makeHtmlTab" id="makeHtmlTabA"><li onclick="fun.c02($(this),1)">速卖通</li><li class="hover" onclick="fun.c02($(this),2)">敦煌网</li></ul></th>\
            <th class="w-50 p-0"><ul class="makeHtmlTab" id="makeHtmlTabB">'+ liArr.join("") + '</ul></th>\
        </tr>'
        return html;
    },
    b03: function (arr1, arr2, arr3) {
        $("#state").html("正在拼成一个数组...");
        if (arr1 == 0) arr1 = [];
        let pic = arr1.concat(arr2).concat(arr3)
        let idArr = [];
        for (let i = 0; i < pic.length; i++) {
            if (pic[i]) {//去掉“空位置”
                idArr = idArr.concat(pic[i].picA._1688.idArr);
            }
        }
        return this.b04(idArr);
    },
    b04: function (idArr) {
        $("#state").html("正在计算重复...");
        let o1 = {}
        for (let i = 0; i < idArr.length; i++) {
            if (o1[idArr[i]]) {
                o1[idArr[i]]++;
            }
            else {
                o1[idArr[i]] = 1;
            }
        }
        return this.b05(o1, idArr.length)
    },
    b05: function (o1, len) {
        $("#state").html("正在排序...");
        let arr = []
        for (let k in o1) {
            arr.push([o1[k], k, len]);
        }
        return arr.sort(function (a, b) { return b[0] - a[0] })
    },
    b06: function (pic) {
        let str1 = '', str2 = '';
        for (let i = 0; i < pic.length; i++) {
            if (pic[i]) {
                str1 += '\
                <figure class="figure border mb-1 mt-1 p-1 easyzoom easyzoom--overlay">\
                    <a href="https://ae02.alicdn.com/kf/' + pic[i].picA.fileurl + '" target="_blank">\
                        <img src="https://ae02.alicdn.com/kf/' + pic[i].picA.fileurl + '_200x200.jpg" class="figure-img img-fluid rounded w190">\
                    </a>\
                </figure>'
                /////////////////////////////////////////////
                str2 += '\
                <figure class="figure border mb-1 mt-1 p-1 easyzoom easyzoom--overlay">\
                    <a href="https://image.dhgate.com/' + pic[i].picB.fileurl + '" target="_blank">\
                        <img src="https://image.dhgate.com/webp/m/170x170/' + pic[i].picB.fileurl + '" class="figure-img img-fluid rounded w190">\
                    </a>\
                </figure>'
            }
            else {
                str1 += '<figure class="figure border m-2 p-2">空位置</figure>'
                str2 += '<figure class="figure border m-2 p-2">空位置</figure>'
            }
        }
        return '<div name="aliexpress" class="hide">' + str1 + '</div><div name="dhgate">' + str2 + '</div>';
    },
    b07: function (id) {
        let data = [{
            action: "sqlite",
            database: "1688",
            sql: "select " + Tool.fieldAs("subject,state,saleNum") + " FROM @.proList where @.fromid=" + id,
        }, {
            action: "sqlite",
            database: "1688_prodes/" + Tool.remainder(id, 99),
            sql: "select " + Tool.fieldAs("pic,sku,des") + " FROM @.prodes where @.fromid=" + id,
        }]
        return data;
    },
    b08: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "商品编码"; break;
            case "2": name = "自动匹配的【详情ID】"; break;
            case "3": name = "手动选中的【详情ID】"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b09: function (name, arr) {
        let str = ""
        if (!arr) arr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]) {
                str += '\
                <figure class="figure border mb-1 mt-1 p-1 easyzoom easyzoom--overlay">\
                    <a href="' + arr[i] + '" target="_blank">\
                        <img src="' + arr[i] + '" class="figure-img img-fluid mb-0 rounded w190">\
                    </a>\
                </figure>'
            }
            else {
                str += '<figure class="figure border m-2 p-2">空位置</figure>'
            }
        }
        return '<div class="center">' + name + '：' + arr.length + ' 张</div>' + str
    },
    b10: function (fromid, proid, subject, state, saleNum) {
        let url = "https://detail.1688.com/offer/" + fromid + ".html"
        return '\
        <tbody>\
            <tr>\
                <td class="right w150">1688标题：</td><td>' + subject + '</td>\
            </tr>\
            <tr>\
                <td class="right">状态：</td><td>' + this.b21(state) + '</td>\
            </tr>\
            <tr>\
                <td class="right">销量：</td><td>' + saleNum + '</td>\
            </tr>\
            <tr>\
                <td class="right">1688详情地址：</td><td><a href="'+ url + '" target="_blank">' + url + '</a></td>\
            </tr>\
            <tr>\
                <td class="right">手动审核1688状态：</td>\
                <td>\
                    <div class="btn-group">\
                        <button type="button" class="btn btn-secondary" onclick="fun.c03(1,'+ fromid + ',\'' + proid + '\')">使用1688属性图</button>\
                        <button type="button" class="btn btn-secondary" onclick="fun.c03(2,'+ fromid + ',\'' + proid + '\')">需要修改</button>\
                        <button type="button" class="btn btn-secondary" onclick="fun.c03(3,'+ fromid + ',\'' + proid + '\')">审核不通过</button>\
                        <button type="button" class="btn btn-secondary" onclick="fun.c03(4,'+ fromid + ',\'' + proid + '\')">异常</button>\
                        <button type="button" class="btn btn-secondary" onclick="fun.c03(5,'+ fromid + ',\'' + proid + '\')">标题要改</button>\
                    </div>\
                </td>\
            </tr>\
        </tbody>'
    },
    b11: function (proid) {
        return '\
        <table class="table mb-0 table-bordered table-hover">\
        <tbody>\
            <tr>\
                <td class="right w150">编码：</td><td>'+ proid + '</td>\
            </tr>\
        </tbody>\
        </table>'
    },
    b12: function (sku) {
        let str = "";
        if (sku) {
            if (sku.skuProps) {
                let arr = sku.skuProps[0].value, newArr = []
                for (let i = 0; i < arr.length; i++) {
                    newArr.push(arr[i].imageUrl);
                }
                str = this.b09("属性图", newArr)
            }
            else {
                str = "没有【属性图】"
            }
        }
        else {
            str = "没有【属性图】"
        }
        return str;
    },
    b13: function (des) {
        let str = ""
        if (des) {
            let arr = this.b14(des)
            if (arr) {
                str = this.b09("详情图", arr[1])
            }
            else {
                str = "没有【详情图】"
            }
        }
        else {
            str = "没有【详情图】"
        }
        return str;
    },
    //取出图片
    b14: function (html) {
        let reg = /<img.*?>/ig
        // 提取出html中所有的img标签
        let arr = html.match(reg)
        if (arr == null) {
            return null;
        }
        else {
            let reg1 = /\s+src=['"](.*?)['"]/i
            let arr1 = arr.map(item => {
                if (item.match(reg1)) {//有时后img标签里面没有src属性。
                    return item.match(reg1)[1];
                }
                else { return null; }
            });
            //console.log([arr,arr1])
            //Tool.pre([arr, arr1])
            return [arr, arr1];
        }
    },
    b15: function (type) {
        return '\
        <table class="table mb-0">\
        <tbody>\
            <tr>\
                <td class="right w70">筛选：</td>\
                <td class="p-0">'+ this.b20(obj.params.aliexpress_type, config.proupdhgate_type_count, type) + '</td>\
                <td class="p-0">'+ this.b18(obj.params.manualreview_1688, config.GlobalPro_ManualReview_1688_count) + '</td>\
            </tr>\
        </tbody>\
        </table>'
    },
    b16: function () {

    },
    b17: function () {

    },
    b18: function (val, configArr) {
        let nArr = [], arr = Tool.ManualReview_1688;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + (""+arr[i][0] == ""+val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '（' + configArr[i] + '）</option>');
        }
        return '\
        <select onChange="fun.c06(\'manualreview_1688\',this.options[this.selectedIndex].value)" class="form-select">\
            <option value="">手动审核1688状态</option>\
            <option value="-1">更新数量</option>\
            ' + nArr.join("") + '\
        </select>';
    },
    b19: function () {
        let arr = ["@.ManualReview=9", "@.DHAfterReview=0"];
        if (obj.params.searchword != "") {
            switch (obj.params.field) {
                case "1": arr.push("@.proid='" + obj.params.searchword + "'"); break;//商品编码
                case "2": arr.push("@.fromid=" + obj.params.searchword); break;//自动匹配的【详情ID】
                case "3": arr.push("@.manualreview_1688_fromid=" + obj.params.searchword); break;//手动选中的【详情ID】
            }
        }
        if (obj.params.aliexpress_type != "") { arr.push("@.type1=" + obj.params.aliexpress_type); }
        if (obj.params.manualreview_1688 != "") { arr.push("@.manualreview_1688=" + obj.params.manualreview_1688); }
        return (arr.length == 0 ? "" : " where " + arr.join(" and "));
    },
    b20: function (type, configArr, typeArr) {
        let nArr = [];
        for (let i = 0; i < typeArr.length; i++) {
            nArr.push('<option value="' + typeArr[i].fromid + '" ' + ("" + typeArr[i].fromid == type ? 'selected="selected"' : '') + '>' + (i+1) + '.' + typeArr[i].name + '(' + configArr["" + typeArr[i].fromid] + ')</option>');
        }
        return '\
        <select onChange="fun.c09(\'aliexpress_type\',this.options[this.selectedIndex].value)" class="form-select">\
          <option value="">速卖通类目</option>\
          <option value="-1">更新数量</option>\
          ' + nArr.join("") + '\
        </select>';
    },
    b21: function (state) {
        let str = ""
        switch (state) {
            case 0: str = "正常"; break;
            case 1: str = "404错误"; break;
            case 2: str = "商品已下架"; break;
            case 3: str = "采集内容已改变"; break;
            case 4: str = "xxxxx"; break;
            case 5: str = "xxxxx"; break;
            case 6: str = "库存为零"; break;
            case 7: str = "1688自已出错了"; break;
            case 8: str = "1688的另一个版本"; break;
            case 9: str = "xxxxx"; break;
            default: str = "未知：" + state;
        }
        return str;
    },
    //////////////////////////////////////////////////////////////
    c01: function (This, id, proid) {
        $('#makeHtmlTabB li').attr("class", "")
        This.attr("class", "hover")
        $("#pic > div,#attrPic > div,#desPic > div,#list > table").hide();
        if ($("#pic" + id).length == 0) {
            $("#pic").append('<div id="pic' + id + '">加载中。。。</div>');
            $("#attrPic").append('<div id="attrPic' + id + '">加载中。。。</div>');
            $("#desPic").append('<div id="desPic' + id + '">加载中。。。</div>');
            $("#list").append('<table class="table mb-0 table-bordered" id="list' + id + '"><tr><td>加载中。。。</td></tr></table>');
            this.d01(id, proid)
        }
        else {
            $("#pic" + id).show();
            $("#attrPic" + id).show();
            $("#desPic" + id).show();
            $("#list" + id).show();
        }
    },
    c02: function (This, id) {
        $('#makeHtmlTabA li').attr("class", "")
        This.attr("class", "hover")
        if (id == 1) {
            $("[name=aliexpress]").show();
            $("[name=dhgate]").hide();
        }
        else {
            $("[name=aliexpress]").hide();
            $("[name=dhgate]").show();
        }
    },
    c03: function (manualreview_1688, manualreview_1688_fromid, proid) {
        let data=[{
            action: "sqlite",
            database: "1688",
            sql: "update @.product set @.manualreview_1688=" + manualreview_1688 + ",@.manualreview_1688_fromid=" + manualreview_1688_fromid + " where @.proid='" + proid + "'",
        }]
        Tool.ajax.a01(data, Tool.reload);
    },
    c04: function (val) {

    },
    c05: function (val) {

    },
    c06: function (name, val) {
        if (val == "-1") {
            Tool.openR("?jsFile=js18");
        }
        else {
            Tool.open(name, val);
        }
    },
    c07: function (val) {
        let name = this.b08("" + val);
        $("#Field").html(name).val(val);
    },
    c08: function () {
        let Field = $("#Field").val(), searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            searchword = encodeURIComponent(searchword);
            Tool.main(obj.params.jsFile + "/1/" + Field + "/" + searchword);
        }
        else {
            alert("请输入搜索内容");
        }
    },
    c09: function (name, val) {
        if (val == "-1") {
            Tool.openR("?jsFile=js22");
        }
        else {
            Tool.open(name, val);
        }
    },
    //////////////////////////////////////////////////////////////
    d01: function (id, proid) {
        Tool.ajax.a01(this.b07(id), this.d02, this, [id, proid]);
    },
    d02: function (t, arr) {
        if(t[1].length==0){
            $("#pic" + arr[0]).html("找不到了");
            $("#attrPic" + arr[0]).html("找不到了");
            $("#desPic" + arr[0]).html("找不到了");
            $("#list" + arr[0]).html(this.b10(arr[0], arr[1], t[0][0].subject, t[0][0].state, t[0][0].saleNum));   
        }
        else{
            $("#pic" + arr[0]).html(this.b09("放大镜图", JSON.parse(t[1][0].pic)));
            $("#attrPic" + arr[0]).html(this.b12(JSON.parse(t[1][0].sku)));
            $("#desPic" + arr[0]).html(this.b13(t[1][0].des));
            $("#list" + arr[0]).html(this.b10(arr[0], arr[1], t[0][0].subject, t[0][0].state, t[0][0].saleNum));
        }
    },
}
fun.a01();