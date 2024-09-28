'use strict';
Object.assign(Tool, {
    common_create_key_category:
    {
        obj: {
            A1: 1, A2: 0,
            B1: 1, B2: 10,//shopee只能创建10个子类目
            tw: {
                name: "🔥熱門關鍵字"//热门关键词
            },
            my: {
                name: "🔥Hot Keywords"//热门关键词
            },
            br: {
                name: "🔥Palavras-chave quentes"//热门关键词
            }
        },
        a01: function (seller, site, next, This, t) {
            let oo = {
                seller: seller,
                site: site,
                next: next,
                This: This,
                t: t,
                keys: {},
                draft_id: 0,//空父类目ID（首次创建子类目要用）
                keyObj: {},//关键词类目ID（判断是否重复用，和添加商品用的）
                keyArr: [],//已处理的关键词
                collection_list: [],//子类目ID调整顺序 
                parent_shop_category_id: 0,//父类目ID（俩次次上创建子类目要用）
            }
            this.a02(oo)
        },
        a02: function (oo) {
            //and not(@.key is null) 
            let str = '[\
            {"A2":'+ (this.obj.A2 == 0 ? '<@count/>' : '0') + '}\
            <r:shopPro_'+ oo.site + ' size=10 db="sqlite.shopee" page=2 where=" where @.status=1">,\
            {\
                <r:GlobalPro size=1 db="sqlite.shopee" where=" where @.proid=\'<:proid/>\'">\
                    "key":<:'+ oo.site + '_ads_key tag=json/>,\
                </r:GlobalPro>\
                "fromid":<:fromid/>\
            }\
            </r:shopPro_'+ oo.site + '>]'
            Tool.ajax.a01(str, this.obj.A1, this.a03, this, oo);
        },
        a03: function (t, oo) {
            if (this.obj.A2 == 0) this.obj.A2 = t[0].A2;
            t.shift();
            oo.keys = t;
            Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, this.d01, oo)
        },
        a04: function (oo) {
            for (let i = 0; i < oo.keys.length; i++) {
                if (oo.keys[i].key) {
                    if (oo.keyObj[oo.keys[i].key]) {
                        oo.keyObj[oo.keys[i].key].push(oo.keys[i].fromid)
                    }
                    else {
                        oo.keyObj[oo.keys[i].key] = [oo.keys[i].fromid]
                    }
                }
            }
            this.a05(oo)
        },
        a05: function (oo) {
            this.obj.A1++;
            this.a02(oo);
        },
        ///////////////////////
        d01: function (oo) {
            let arr = []
            for (let k in oo.keyObj) {
                arr.push([k, oo.keyObj[k], oo.keyObj[k].length])
            }
            if (arr.length == 0) {
                $("#state").html("没有关键词跳出。");
                //this.f03(oo)
            }
            else {
                arr.sort(function (A, B) {
                    return B[2] - A[2]
                })
                oo.keyArr = arr;
                this.d02(oo)
            }
        },
        d02: function (oo) {
            //采集商品要用，采集店铺要用。
            let str = '"ok"<r: file="/' + o.path + 'admin/js/Shopee/采集箱/config_' + oo.site + '.js">let config_' + oo.site + '=' + JSON.stringify(oo.keyArr, null, 2) + '</r:>';
            Tool.ajax.a01(str, 1, this.d03, this, oo);
        },
        d03: function (t,oo) {
            if (t == "ok") {
                this.d04(oo);
            }
            else {
                Tool.pre(["出错", t]);
            }
        },
        d04: function (oo) {
            let arr = [
                "SPC_CDS=" + oo.seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + oo.seller[oo.site].shopId,
                "cbsc_shop_region=" + oo.site,
            ]
            let url = "https://seller.shopee.cn/api/shopcategory/v4/category/create_collection_draft/?" + arr.join("&")
            $("#url").html(url + '【post】');
            $("#state").html("正在创建shopee类目。。。");
            let data = {
                name: this.obj[oo.site].name//热门关键词
            }
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json'
                },
            ]
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.d05, this, oo)
        },
        d05: function (t, oo) {
            /*
            {
              "code": 0,
              "message": "success",
              "data": {
                "draft_id": 46731
              }
            }
            */
            if (t.message == "success") {
                oo.draft_id = t.data.draft_id
                this.d06(oo);
            }
            else if (t.code == 340007) {
                Tool.at("类目已存在，请手动删除类目，再来。")
            }
            else {
                Tool.pre(["出错", t])
            }
        },
        d06: function (oo) {
            Tool.x1x2("B", this.obj.B1, this.obj.B2, this.d07, this, this.f01, oo)
        },
        d07: function (oo) {
            let arr = [
                "SPC_CDS=" + oo.seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + oo.seller[oo.site].shopId,
                "cbsc_shop_region=" + oo.site,
            ]
            let url = "https://seller.shopee.cn/api/shopcategory/v4/category/create_parent_or_sub_category/?" + arr.join("&")
            $("#url").html(url + '【post】');
            $("#state").html("正在创建shopee子类目。。。");
            let data
            if (oo.parent_shop_category_id) {
                //俩次次上创建子类目
                data = {
                    "sub_shop_category": {
                        "name": Tool.titleCase(oo.keyArr[this.obj.B1 - 1][0]),
                        "collection_type": "customized",
                        "parent_shop_category_id": oo.parent_shop_category_id,
                        "product_id_list": oo.keyArr[this.obj.B1 - 1][1]
                    }
                }
            }
            else {
                //首次
                data = {
                    "sub_shop_category":
                    {
                        "name": Tool.titleCase(oo.keyArr[this.obj.B1 - 1][0]),
                        "collection_type": "customized",
                        "to_delete_draft_id": oo.draft_id,
                        "parent_shop_category_name": this.obj[oo.site].name,//热门关键词
                        "cover_image": "",
                        "product_id_list": oo.keyArr[this.obj.B1 - 1][1]
                    }
                }
            }
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json'
                },
            ]
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.e01, this, oo)
        },
        /////////////////////////////////////////
        e01: function (t, oo) {
            /*
           {
             "code": 0,
             "message": "success",
             "data": {
               "parent_shop_category_id": 251967340,
               "sub_shop_category_id": 251967341
             }
           }
           */
            if (t.message == "success") {
                oo.parent_shop_category_id = t.data.parent_shop_category_id;//父类目ID（俩次次上创建子类目要用）
                this.e02(t.data.sub_shop_category_id, oo);
            }
            else if (t.code == 140000) {
                Tool.at("无法创建子类目，请重新【*获取【全部广告】信息】")
            }
            else {
                Tool.pre(["出错01", t, oo.keyArr[this.obj.B1 - 1]])
            }
        },
        e02: function (sub_shop_category_id, oo) {
            oo.collection_list.push({ "id": sub_shop_category_id, "sort_weight": 11 - this.obj.B1 });
            //////////////////////////////////////////////////////////////////////////////
            let arr = [
                "SPC_CDS=" + oo.seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + oo.seller[oo.site].shopId,
                "cbsc_shop_region=" + oo.site,
            ]
            let url = "https://seller.shopee.cn/api/shopcategory/v4/category/update_category/?" + arr.join("&")
            $("#url").html(url + '【post】');
            $("#state").html("正在启用shopee子类目。。。");
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json'
                },
            ]
            let data = { "shop_category_id": sub_shop_category_id, "status": "active" }
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.e03, this, oo)
        },
        e03: function (t, oo) {
            if (t.message = "message") {
                this.obj.B1++;
                this.d06(oo);
            }
            else {
                Tool.pre(["出错", t])
            }
        },
        ///////////////////////////////////////////////////
        f01: function (oo) {
            let arr = [
                "SPC_CDS=" + oo.seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + oo.seller[oo.site].shopId,
                "cbsc_shop_region=" + oo.site,
            ]
            let url = "https://seller.shopee.cn/api/shopcategory/v4/category/update_shop_collection_sequence/?" + arr.join("&")
            $("#url").html(url + '【post】');
            $("#state").html("正在 调整顺序 。。。");
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json'
                },
            ]
            let data = { "collection_list": oo.collection_list }
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.f02, this, oo)
        },
        f02: function (t, oo) {
            if (t.message = "message") {
                $("#state").html("关键词完成。");
                this.f03(oo);
            }
            else {
                Tool.pre(["出错", t])
            }
        },
        f03: function (oo) {
            this.obj.A1 = 1; this.obj.A2 = 0;
            this.obj.B1 = 1;
            oo.next.apply(oo.This, [oo.t])
        },
    }
})