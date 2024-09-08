'use strict';
Object.assign(Tool, {
    common_create_UnitWeight_category:
    {
        obj: {
            F1: 1, F2: Tool.shopPro_unitWeight.length, Farr: Tool.shopPro_unitWeight,//shopee只能创建10个子类目
            G1: 1, G2: 0, Garr: [],//商品进度
            tw: {
                name: "🌟組織重量",//单位重量
                unit: "g"
            },
            my: {
                name: "🌟Unit Weight",//单位重量
                unit: "g"
            },
            br: {
                name: "🌟Unidade de peso",//单位重量
                unit: "g"
            },
        },
        a01: function (seller, site, next, This, t) {
            let oo = {
                seller: seller,
                site: site,
                next: next,
                This: This,
                t: t,
                draft_id: 0,//空父类目ID（首次创建子类目要用）
                collection_list: [],//子类目ID调整顺序 
                parent_shop_category_id: 0,//父类目ID（俩次次上创建子类目要用）
            }
            this.a02(oo)
        },
        a02: function (oo) {
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
                name: this.obj[oo.site].name
            }
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json;charset=UTF-8'
                },
            ]
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.a03, this, oo)
        },
        a03: function (t, oo) {
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
                this.a04(oo);
            }
            else {
                Tool.pre(["出错", t])
            }
        },
        a04: function (oo) {
            Tool.x1x2("F", this.obj.F1, this.obj.F2, this.d01, this, this.f01, oo)
        },
        //////////////////////////////////////////////
        d01: function (oo) {
            let where = ""
            if (this.obj.F1 != this.obj.F2) {
                where = " and @.UnitWeight<=" + (this.obj.Farr[this.obj.F1 - 1][3]/1000)
            }
            let str = '[' + (this.obj.G2 == 0 ? '<@page/>' : '0') + '\
            <r:shopPro_' + oo.site + ' size="10" db="sqlite.shopee" page=2 where=" where @.status=1 and @.UnitWeight&gt;' + (this.obj.Farr[this.obj.F1 - 1][2]/1000) + where + '">,<:fromid/></r:shopPro_' + oo.site + '>]'
            Tool.ajax.a01(str, this.obj.G1, this.d02, this, oo);
        },
        d02: function (arr, oo) {
            if (this.obj.G2 == 0) this.obj.G2 = arr[0];
            arr.shift();
            this.obj.Garr = this.obj.Garr.concat(arr);
            Tool.x1x2("G", this.obj.G1, this.obj.G2, this.d03, this, this.e01, oo)
        },
        d03: function (oo) {
            this.obj.G1++;
            this.d01(oo)
        },
        /////////////////////////////////////
        e01: function (oo) {
            let arr = [
                "SPC_CDS=" + oo.seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + oo.seller[oo.site].shopId,
                "cbsc_shop_region=" + oo.site,
            ]
            let url = " https://seller.shopee.cn/api/shopcategory/v4/category/create_parent_or_sub_category/?" + arr.join("&")
            $("#url").html(url + '【post】');
            $("#state").html("正在创建shopee子类目。。。");
            let data
            if (oo.parent_shop_category_id) {
                //俩次次上创建子类目
                data = {
                    "sub_shop_category": {
                        "name": (this.obj.F1 == this.obj.F2 ? '>' + ((this.obj.F1 - 1)*10) : ((this.obj.F1 - 1)*10) + "-" + (this.obj.F1)*10) + this.obj[oo.site].unit,
                        "collection_type": "customized",
                        "parent_shop_category_id": oo.parent_shop_category_id,
                        "product_id_list": this.obj.Garr
                    }
                }
            }
            else {
                //首次
                data = {
                    "sub_shop_category":
                    {
                        "name": (this.obj.F1 == this.obj.F2 ? '>' + ((this.obj.F1 - 1)*10) : ((this.obj.F1 - 1)*10) + "-" + (this.obj.F1*10)) + this.obj[oo.site].unit,
                        "collection_type": "customized",
                        "to_delete_draft_id": oo.draft_id,
                        "parent_shop_category_name": this.obj[oo.site].name,//单位重量
                        "cover_image": "",
                        "product_id_list": this.obj.Garr
                    }
                }
            }
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json'
                },
            ]
            if (this.obj.Garr.length == 0) {
                this.e04({ message: "success" }, oo)
            }
            else {
                gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.e02, this, oo)
            }
        },
        e02: function (t, oo) {
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
                this.e03(t.data.sub_shop_category_id, oo);
            }
            else {
                Tool.pre(["出错01", t, this.obj.Aarr])
            }
        },
        e03: function (sub_shop_category_id, oo) {
            oo.collection_list.push({ "id": sub_shop_category_id, "sort_weight": oo.collection_list.length });
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
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.e04, this, oo)
        },
        e04: function (t, oo) {
            if (t.message = "message") {
                this.obj.F1++;
                this.obj.G1 = 1; this.obj.G2 = 0; this.obj.Garr = [];
                $("#G1").css("width", "0%");
                $("#G1,#G2").html("");
                this.a04(oo);
            }
            else {
                Tool.pre(["出错", t])
            }
        },
        /////////////////////////////////////////////////////
        f01: function (oo) {
            let parr = [
                "SPC_CDS=" + oo.seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + oo.seller[oo.site].shopId,
                "cbsc_shop_region=" + oo.site,
            ]
            let url = "https://seller.shopee.cn/api/shopcategory/v4/category/update_shop_collection_sequence/?" + parr.join("&")
            $("#url").html(url + '【post】');
            $("#state").html("正在调整顺序 。。。");
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json'
                },
            ]           
            let arr = oo.collection_list
            for (let i = 0; i < arr.length; i++) {
                arr[i].sort_weight = arr.length - arr[i].sort_weight
            }
            let data = { "collection_list": arr }
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.f02, this, oo)
        },
        f02: function (t, oo) {
            if (t.message = "message") {
                $("#state").html("关键词完成。");
                oo.next.apply(oo.This, [oo.t])
            }
            else {
                Tool.pre(["出错", t])
            }
        },
    }
})