'use strict';
var fun =
{
    obj:
    {
        A1: 1, A2: 0,
        bannedWord_keyouyun: []
    },
    a01: function () {
        let html = Tool.header(obj.params.return, "Shopee &gt; 商品 &gt; 全球商品 &gt; 更新前本地状态_更新商品") + '\
        <div class="p-2">\
            <table class="table table-hover align-middle mb-0">\
                <tbody>\
                    <tr><td class="w170 right">账号：</td><td id="username" colspan="2"></td></tr>\
                    <tr><td class="right">更新条件：</td><td id="where" colspan="2"></td></tr>\
                    <tr><td class="right">商品进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                    <tr>\
                        <td class="right">成本定价：</td>\
                        <td colspan="2">\
                            <b>全球商品价格 = 1688商品最高的那一个原价（统一的价格）</b><hr/> \
                            注：<br/>\
                            （1）如果【全球商品】价格那里显示的是“USD”，也没关系，实际是当做“人民币”来结算的。<br/>\
                            （2）实际定价在“发布到各个站点”时再定价。\
                        </td></tr>\
                    <tr><td class="right">状态：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
               </tbody>\
               <tbody id="tbody"></tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        Tool.login.a01(this.a03, this)
    },
    a03: function (t) {
        $("#state").html("正在获禁限词。。。");
        let data = [{
            action: "sqlite",
            database: "shopee/违禁词/客优云",
            sql: "select @.name as name FROM @.table where @.isWhitelist=0",
        }]
        Tool.ajax.a01(data, this.a04, this)
    },
    a04: function (t) {
        let arr = []
        for (let i = 0; i < t[0].length; i++) {
            arr.push(t[0][i].name)
        }
        this.obj.bannedWord_keyouyun = arr
        this.d01();
    },
    /////////////////////////////////////
    b01: function (title, attr) {
        title = title.toLowerCase().replace(/亚马逊|批发|速卖通|跨境|外贸|现货|厂家直销|工厂|wish|直销|pdd|专供|供应|厂家直供|ebay|代发|厂家|混批|logo/g, "")
        for (let i = 0; i < attr.length; i++) {
            if (attr[i].name == "品牌") {
                title = this.b08(title, attr[i].value.toLowerCase())
            }
        }
        return Tool.Trim(title);
    },
    b03: function (arr1, oo, shopeeFromid) {
        if (oo.code == 0) {
            let o2 = oo.data.stock_list
            if (o2[0].item_id == shopeeFromid) {
                if (arr1.length == o2[0].model_stock_list.length) {
                    arr1 = this.b04(arr1, o2[0].model_stock_list)
                }
                else {
                    //pre([arr1,arr1.length+"|---------------|"+oo[0].model_stock_list.length,oo[0].model_stock_list])
                    //alert("俩边库存不一样长。")

                }
            }
            else { alert("商品ID，不对。。。") }
        }
        else { Tool.pre(["出错。。。。。", oo]); }
        return arr1
    },
    b04: function (arr1, arr2) {
        for (let i = 0; i < arr1.length; i++) {
            arr1[i].mtsku_model_id = arr2[i].model_id
            //arr1[i].stock_setting_list=[]
            //arr1[i].normal_price=null
        }
        return arr1
    },
    b06: function (pic, dhpic, attrPic, dhdespic)//要9张图片
    {
        let rArr = [pic]
        for (let i = 0; i < dhpic.length; i++) {
            if (rArr.indexOf(dhpic[i].picB.shopee) == -1) {//去重
                rArr.push(dhpic[i].picB.shopee)
            }
        }
        //////////////////////////////////
        if(attrPic){
            for (let i = 0; i < attrPic.length; i++) {
                if (rArr.length == 9) {
                    break;
                }
                else {
                    if (attrPic[i].shopee) {
                        if (rArr.indexOf(attrPic[i].shopee) == -1) {//去重
                            rArr.push(attrPic[i].shopee);
                        }
                    }
                }
            }
        }        
        //////////////////////////////////////
        for (let i = 0; i < dhdespic.length; i++) {
            if (rArr.length == 9) {
                break;
            }
            else {
                if (dhdespic[i].picB) {
                    if (rArr.indexOf(dhdespic[i].picB.shopee) == -1) {//去重
                        rArr.push(dhdespic[i].picB.shopee)
                    }
                }
            }
        }
        return rArr;
    },
    b07: function (deliverylimit)//要9张图片
    {
        let oo = {
            day: deliverylimit,
            msg: ""
        }
        if (deliverylimit) {
            if (deliverylimit < 4) {
                oo.day = 2
            }
            else {
                $("#state").html("发货天数异常4天");
                oo.msg = "发货天数超过4天";
            }
        }
        else {
            $("#state").html("发货天数异常");
            oo.msg = "发货天数异常。";
        }
        return oo
    },
    b08: function (title, value) {
        //例如：https://detail.1688.com/offer/667240254545.html     R640734           品牌        e－Manco / 壹门阔
        title = title.replace("&amp;", "&")
        value = value.replace("－", "")
        let arr = value.split("/")
        title = title.replace(arr[0], "");
        if (arr.length == 2) title = title.replace(arr[1], "");
        return title;
    },
    b09: function (manualreview_1688_description, description, unit, scale, sellunit) {
        let des1 = ""
        if (manualreview_1688_description) {
            des1 += manualreview_1688_description
        }
        else {
            //注：在1688中看到如【按包起批1包=100个】的内容时，那在个单时只能填100的倍数。
            if (scale > 1) {
                des1 = "✅ 单位:" + sellunit + " (1件=1" + sellunit + ",1" + sellunit + "=" + scale + unit + ") \n" + description

            }
            else {
                des1 = "✅ 单位:" + unit + (unit == "件" ? "" : "(1件=1" + unit + ")") + " \n" + description
            }

        }
        let html = '<tr><td class="right">商品描述：</td><td colspan="2">' + des1.split("\n").join("<br/>") + '</td></tr>'
        $("#tbody").append(html);
        let des2 = des1 + '\
    \n\
    你好，谢谢你光临我们的商店！\n\
    我们确保我们的服务和产品质量良好，值得信赖。\n\
    如果您对该产品有任何疑问，请随时给我们留言！🥰 ❤️\n\
    \n\
    ♥️1.当我们收到你的订单时，我们会尽快把包裹寄出去。\n\
    ♥️2.当你拿到包裹时，以及你对物品和服务是否满意。请给我们留下五星反馈和精美的图片。我们将不胜感激。向我们展示，赢得秘密礼物！\n\
    ♥️3.如有任何问题，请在提出争议或给我们留下负面反馈之前与我们联系。我们将尽力解决问题。\n\
    ♥️4.您可以在Shopee上留言与我们联系\n\
    \n\
    ✨ 如果你喜欢我们的产品，请记得关注我们❤️'
        return [des2, des1];
    },
    /////////////////////////////////////////////
    d01: function () {
        $("#state").html("正在获取商品信息。。。");
        let where = " where @.isup=1 and @.BeforeReview=0 and @.ManualReview_1688=1 and @.ManualReview_1688_state=0"
        //where = " where @.isup=1 and @.proid='R872'"
        $("#where").html(where);
        let data = [{
            action: "sqlite",
            database: "shopee/商品/全球商品",
            sql: "select " + Tool.fieldAs("video,proid,pic,manualreview_1688_unitweight,manualreview_1688_subject,manualreview_1688_description,fromid,manualreview_1688_fromid") + " FROM @.table" + where + " limit 1"
        }, {
            action: "sqlite",
            database: "shopee/商品/全球商品",
            sql: "select count(1) as total FROM @.table" + where
        }]
        Tool.ajax.a01(data, this.d02, this);
    },
    d02: function (t) {
        if (t[0].length == 0) {
            $("#state").html("全部完成");
        }
        else {
            let oo = { GlobalPro: t[0][0] }
            if (this.obj.A2 == 0) { this.obj.A2 = t[1][0].total; }
            let data = [{
                action: "sqlite",
                database: "1688",
                sql: "select " + Tool.fieldAs("categoryid,unitweight,deliverylimit,freight,subject,unit") + " FROM @.proList where @.fromid=" + oo.GlobalPro.manualreview_1688_fromid
            }, {
                action: "sqlite",
                database: "1688_prodes/" + Tool.remainder(oo.GlobalPro.manualreview_1688_fromid, 99),
                sql: "select " + Tool.fieldAs("attr,sku,attrpic_shopee") + " FROM @.prodes where @.fromid=" + oo.GlobalPro.manualreview_1688_fromid
            },
            {
                action: "sqlite",
                database: "aliexpress_prodes/" + Tool.pronum(oo.GlobalPro.proid, 50),
                sql: "select " + Tool.fieldAs("dhpic,dhdespic") + " FROM @.prodes where @.proid='" + oo.GlobalPro.proid + "'"
            }]
            Tool.ajax.a01(data, this.d03, this, oo);
        }

    },
    d03: function (t, oo) {
        oo._1688_proList = t[0][0];
        oo._1688_prodes = t[1][0];
        oo.aliexpress_prodes = t[2][0];
        let data = [{
            action: "sqlite",
            database: "1688",
            sql: "select " + Tool.fieldAs("catnamepath,bindshopee") + " FROM @.category0 where @.fromid=" + t[0][0].categoryid
        }]
        Tool.ajax.a01(data, this.d04, this, oo);
    },
    d04: function (t, oo) {
        oo.category = t[0][0]
        this.d05(oo);
    },
    d05: function (oo) {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d06, this, null, oo)
    },
    d06: function (oo) {
        if (oo.category.bindshopee == 0) {
            $("#state").html("没绑定类目");
            this.f01(3, "没绑定类目", oo.GlobalPro.proid)
        }
        else if (!oo.category.catnamepath) {
            $("#state").html("类目名称丢失");
            alert("aaaawwwwwwwwwwwwwwwww")
            //this.f01(2, "类目名称丢失", oo.GlobalPro.proid)
        }
        else {
            let url1 = 'https://detail.1688.com/offer/' + oo.GlobalPro.manualreview_1688_fromid + '.html';
            let url2 = 'https://seller.shopee.cn/portal/product/mtsku/' + oo.GlobalPro.fromid
            let html = '\
                <tr><td class="right">1688详情页地址：</td><td colspan="2"><a href="' + url1 + '" target="_blank">' + url1 + '</a></td></tr>\
                <tr><td class="right">Shopee商品ID：</td><td colspan="2"><a href="' + url2 + '" target="_blank">' + oo.GlobalPro.fromid + '</a></td></tr>\
                <tr><td class="right">商品编码：</td><td colspan="2">' + oo.GlobalPro.proid + '</td></tr>\
                <tr><td class="right">1688类目名称：</td><td colspan="2">' + oo.category.catnamepath + '</td></tr>\
                <tr><td class="right">1688单位：</td><td colspan="2">' + oo._1688_proList.unit + '</td></tr>\
                <tr><td class="right">绑定到Shopee类目ID：</td><td colspan="2">' + oo.category.bindshopee + '</a></td></tr>'
            $("#tbody").append(html);
            Tool.attributes.a01(oo.category.bindshopee, JSON.parse(oo._1688_prodes.attr), this.d07, this, oo)//属性绑定。返回：类目路径，属性，绑定不了的属性
        }
    },
    d07: function (o1, oo) {
        if (o1 == "属性值,想绑定,绑定不了，请查看原因。") {
            Tool.at("属性值,想绑定,绑定不了，请查看原因。")
            //this.f01(10, "属性值,想绑定,绑定不了，请查看原因。", oo.proid)
        }
        else if (o1 == "必填属性,必需要给一个值。") {
            Tool.pre("必填属性,必需要给一个值。")
            //this.f01(9, "必填属性,必需要给一个值。", oo.proid)
        }
        else {
            oo.post = {
                category_path: o1.category_path,
                attributes: o1.attributes,
                description: o1.description
            }
            let html = '\
                <tr><td class="right">category_path：</td><td colspan="2">' + oo.post.category_path + '</td></tr>\
                <tr><td class="right">attributes：</td><td colspan="2"><textarea id="sql" rows="10" class="form-control form-control-sm">' + JSON.stringify(oo.post.attributes, null, 2) + '</textarea></td></tr>'
            $("#tbody").append(html);
            this.d08(oo);
        }
    },
    d08: function (oo) {
        let o1 = oo._1688_prodes
        if (o1.sku) {
            let sku_shopee = Tool.sku.a01(JSON.parse(o1.sku), JSON.parse(o1.attrpic_shopee), oo._1688_proList.freight, oo.GlobalPro.proid)
            if (sku_shopee.model_list) {
                this.d09(sku_shopee, oo)
            }
            else {
                Tool.pre(["价格出错", sku_shopee])
            }
        }
        else {
            Tool.pre('sku格式不对')
            //this.f01(11, 'sku格式不对', oo.proid);
        }
    },
    d09: function (sku_shopee, oo) {
        let arr = sku_shopee.tier_variation, isbool = true;
        for (let i = 0; i < arr.length; i++) {
            switch (arr[i].name) {
                case "颜色": arr[i].name = "color"; break;
                case "型号": arr[i].name = "model"; break;
                case "尺码": arr[i].name = "size"; break;
                case "规格": arr[i].name = "Specification"; break;
                case "纯度": arr[i].name = "purity"; break;
                case "颜色分类": arr[i].name = "sort by color"; break;
                case "规格（长*宽）": arr[i].name = "length*width"; break;
                case "": arr[i].name = ""; break;
                case "片数": arr[i].name = "Number of pcs"; break;
                case "尺寸": arr[i].name = "size"; break;
                case "容量": arr[i].name = "capacity"; break;
                case "图案": arr[i].name = "pattern"; break;
                case "外观颜色": arr[i].name = "Exterior color"; break;
                case "种类": arr[i].name = "type"; break;
                case "层数（规格）": arr[i].name = "Specification"; break;
                case "规格型号": arr[i].name = "models"; break;
                case "xxxx": arr[i].name = "xxx"; break;
                case "xxxx": arr[i].name = "xxx"; break;
                case "xxxx": arr[i].name = "xxx"; break;
                case "xxxx": arr[i].name = "xxx"; break;
                case "xxxx": arr[i].name = "xxx"; break;
                case "xxxx": arr[i].name = "xxx"; break;
                case "xxxx": arr[i].name = "xxx"; break;
                case "xxxx": arr[i].name = "xxx"; break;
                case "xxxx": arr[i].name = "xxx"; break;
                default:
                    isbool = false;
                    Tool.at("【" + arr[i].name + "】还没翻译");
            }
        }
        $("#tbody").append(' <tr><td class="right">sku：</td><td colspan="2"><textarea id="sql" rows="10" class="form-control form-control-sm">' + JSON.stringify(sku_shopee, null, 2) + '</textarea></td></tr>');
        if (isbool) {
            this.e01(sku_shopee, oo)
        }
    },
    /////////////////////////////////////////////////
    e01: function (sku_shopee, oo) {
        if (typeof (sku_shopee) == "object") {
            oo.post.tier_variation = sku_shopee.tier_variation;
            oo.post.model_list = sku_shopee.model_list;
            /////////////////////////////////////////////////
            let url = "https://seller.shopee.cn/api/v3/mtsku/get_mtsku_stock/?SPC_CDS_VER=2&item_id_list=" + oo.GlobalPro.fromid
            gg.getFetch(url,"json", this.e02, this, oo)
        }
        else {
            Tool.pre(["出错1111", sku_shopee])
            //this.f01(5, o1, oo.proid);
        }
    },
    e02: function (o1, o2) {
        o2.post.model_list = this.b03(o2.post.model_list, o1, o2.GlobalPro.fromid)//shopee要求这么做
        ////////////////////
        let unitweight
        if (o2.GlobalPro.manualreview_1688_unitweight) {
            unitweight = o2.GlobalPro.manualreview_1688_unitweight;
        }
        else {
            unitweight = o2._1688_proList.unitweight;//说明：1688的重量，可以填4位小数。
        }
        ////////////////////////////////
        let name
        if (o2.GlobalPro.manualreview_1688_subject) {
            name = o2.GlobalPro.manualreview_1688_subject
        }
        else {
            name = this.b01(o2._1688_proList.subject, o2._1688_prodes.attr)
        }
        /////////////////////////////////////
        let _1688_sku = JSON.parse(o2._1688_prodes.sku)
        let descriptionArr = this.b09(o2.GlobalPro.manualreview_1688_description, o2.post.description, o2._1688_proList.unit, _1688_sku.startAmount, _1688_sku.sellunit)
        ////////////////////////////////////
        let images = this.b06(o2.GlobalPro.pic, JSON.parse(o2.aliexpress_prodes.dhpic), JSON.parse(o2._1688_prodes.attrpic_shopee), JSON.parse(o2.aliexpress_prodes.dhdespic))
        let deliverylimit = this.b07(o2._1688_proList.deliverylimit)//发货天数
        let data = {
            name: name,
            brand_id: 1145793,//1145793：表示品牌名称【Malaysia Collection】
            description: descriptionArr[0],
            description_type: "normal",
            images: images,//要9张图片
            video_list: (o2.GlobalPro.video == 0 ? [] : JSON.parse(o2.GlobalPro.video)),
            category_path: o2.post.category_path,
            attributes: o2.post.attributes,
            size_chart: "",
            tier_variation: o2.post.tier_variation,
            model_list: o2.post.model_list,
            weight: unitweight < 0.01 ? "0.01" : unitweight.toFixed(2),//注：这个最小值，只能填写0.01。
            dimension: { width: 0, height: 0, length: 0 },
            days_to_ship: deliverylimit.day,
            condition: 1,
            seller_sku: o2.GlobalPro.proid,
            mtsku_item_id: o2.GlobalPro.fromid,
            ds_cat_rcmd_id: ""
        }
        let html = '\
            <tr><td class="right">视频：</td><td colspan="2"><textarea id="sql" rows="10" class="form-control form-control-sm">' + JSON.stringify(data.video_list, null, 2) + '</textarea></td></tr>\
            <tr><td class="right">标题：</td><td colspan="2">' + name + '</td></tr>\
            <tr><td class="right">放大镜图：</td><td colspan="2">' + images.join("<br/>") + '</td></tr>\
            <tr><td class="right">重量：</td><td colspan="2">' + unitweight + ' KG</td></tr>\
            <tr><td class="right">发货天数：</td><td colspan="2">' + deliverylimit.day + '天</a></td></tr>'
        $("#tbody").append(html);
        if (deliverylimit.msg) {
            $("#state").html("天货天数异常")
            this.f01(15, deliverylimit.msg + "，发货天数为：" + deliverylimit.day + "天", o2.GlobalPro.proid)
        }
        else {
            //下面二行，主要添加标题和重量，以后有内容，就用这个内容更新数据
            o2.GlobalPro._name = name
            o2.GlobalPro._unitweight = unitweight.toFixed(2)
            o2.GlobalPro._description = descriptionArr[1];
            this.e03(data, o2.GlobalPro)
        }
    },
    e03: function (data, GlobalPro) {
        let str = JSON.stringify(data), arr = this.obj.bannedWord_keyouyun, isBool = true
        str = str.replace(/亚马逊|东南亚|进口|欧美|出口|外贸|跨境|速卖通|wish|药|哦|logo|医|amazon|非洲|分销|直销/g, "")
        for (let i = 1; i < arr.length; i++) {
            if (str.indexOf(arr[i]) != -1) {
                Tool.pre(["有违禁词【" + arr[i]] + "】，请修改后再来。", data)
                isBool = false; break;
            }
        }
        if (isBool) {
            let url = 'https://seller.shopee.cn/api/v3/mtsku/update_mtsku/?SPC_CDS_VER=2'
            $("#state").html("更新商品。。。")
            gg.postFetch(url, str, this.e04, this, GlobalPro);
        }
    },
    e04: function (oo, GlobalPro) {
        if (oo.code == 0) {
            let arr = [
                '@.uptime=' + Tool.gettime(""),
                '@.BeforeReview=1',
                '@.err=null',
            ]
            if (!GlobalPro.manualreview_1688_subject || !GlobalPro.manualreview_1688_unitweight || !GlobalPro.manualreview_1688_description) {//没有才会添加
                arr.push("@.manualreview_1688_subject=" + Tool.rpsql(GlobalPro._name))
                arr.push("@.manualreview_1688_unitweight=" + GlobalPro._unitweight)
                arr.push("@.manualreview_1688_description=" + Tool.rpsql(GlobalPro._description))
            }
            let data = [{
                action: "sqlite",
                database: "shopee/商品/全球商品",
                sql: "update @.table set " + arr.join(",") + "  where @.proid='" + GlobalPro.proid + "'",
            }]
            $("#state").html("更新成功，正在保存结果。。。")
            Tool.ajax.a01(data, this.f02, this)
        }
        else if (oo.user_message == "There is duplicate tier option name and it cannot be duplicated") {
            this.f01(7, oo.user_message, GlobalPro.proid)
        }
        else if (oo.user_message == "Update product failed") {
            Tool.pre(oo)
            $("#state").html("更新失败，延时1秒后重式。")
            //Tool.Time("name", 1000, this.d01, this)
        }
        else if (oo.user_message == "Model number should be less than 100" || oo.user_message == "SKU number should be less than 100") {
            this.f01(8, oo.user_message, GlobalPro.proid)
        }

        else if (oo.user_message.indexOf("Product DTS value") != -1) {
            this.f01(12, oo.user_message, GlobalPro.proid)
        }
        else if (oo.user_message.indexOf("Option name length") != -1) {
            this.f01(13, oo.user_message, GlobalPro.proid)
        }
        else if (oo.user_message.indexOf("of the cheapest variation is out of limit7") != -1) {
            this.f01(14, oo.user_message, GlobalPro.proid)
        }
        else if (oo.user_message == "Your attribute info is invalid. Please fill in the category related attributes with correct attribute value") {
            this.f01(9, oo.user_message, GlobalPro.proid)
        }
        else {
            //let err = oo.message     
            //if (err.length > 255) { err = err.substr(0, 252) + "..."; }
            //this.f01(2, err, proid)
            Tool.pre(["更新出错", oo])
        }
    },
    /////////////////////////////////////
    f01: function (BeforeReview, err, proid) {
        let data = [{
            action: "sqlite",
            database: "shopee/商品/全球商品",
            sql: "update @.table set @.BeforeReview=" + BeforeReview + ",@.err=" + Tool.rpsql(err) + ",@.uptime=" + Tool.gettime("") + " where @.proid='" + proid + "'",
        }]
        Tool.ajax.a01(data, this.f02, this)
    },
    f02: function (t) {
        if (t[0].length == 0) {
            this.obj.A1++;
            $("#state").html("更新成功，下一条。。。")
            $("#tbody").html("");
            this.d01();
        }
        else {
            Tool.at("出错000：" + t)
        }
    },
}
fun.a01();