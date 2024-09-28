Object.assign(Tool, {
    common_keyword: {
        //获取shopee平台【关键词】
        a01: function (seller, site, campaign_id, next, This, t) {
            let pArr = [
                "SPC_CDS=" + seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + seller[site].shopId,
                "cbsc_shop_region=" + site
            ]
            let url = "https://seller.shopee.cn/api/pas/v1/product/manual/list_keyword_with_recommended_price/?" + pArr.join("&")
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            $("#state").html("正在获取关键词。。。");
            let oo = {
                next: next,
                This: This,
                t: t
            }
            let data = {
                "campaign_id": campaign_id,
                "need_recommended_price": true,
                "header": {}
            }
            let headers = [
                {
                    "name": "Content-Type",
                    "value": 'application/json;charset=UTF-8'
                },
            ]
            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.a02, this, oo)
        },
        a02: function (t, oo) {
            $("#state").html("已获得关键词。。。");
            if (t.msg == "OK") {
                Tool.apply(t.data, oo.next, oo.This, oo.t)
            }
            else {
                Tool.pre(["出错1122", t])
            }
        },
    },
    common_keyword_br: {
        a01: function (seller, site, campaignid, next, This, t) {
            let pArr = [
                "SPC_CDS=" + seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "cnsc_shop_id=" + seller[site].shopId,
                "cbsc_shop_region=" + site,
                "campaignid=" + campaignid,
            ]
            let url = "https://seller.shopee.cn/api/marketing/v3/pas/campaign/?" + pArr.join("&")
            $("#url").html('<a href="' + url + '" target="_blank">' + url + '</a>');
            $("#state").html("正在获取关键词。。。");
            let oo = {
                next: next,
                This: This,
                t: t
            }
            gg.getFetch(url,"json", this.a02, this, oo)
        },
        a02: function (t, oo) {
            $("#state").html("已获得关键词。。。");
            if (t.message == "success") {
                this.a03(t.data.advertisements[0].extinfo.keywords, oo)
            }
            else {
                Tool.pre(["出错1122", t])
            }
        },
        a03: function (arr, oo) {
            //修改成新版的格式。
            /*
            {
              "status": 0,//0：表示已删除；1：表示正常
              "price": "0.11",
              "match_type": 1,//0：表示广泛匹配；1：精准匹配
              "keyword": "brinco aspiral",
              "algorithm": ""
            },
            */
            let nArr = []
            for (let i = 0; i < arr.length; i++) {
                nArr.push({
                    "keyword": {
                        "bid_price": parseFloat(arr[i].price)*100000,//价格
                        "keyword": arr[i].keyword,
                        "match_type": (arr[i].match_type == 1 ? 'broad' : 'exact'),//broad表示广泛匹配;   exact表示精准匹配
                        "state": (arr[i].status == 0 ? 'deleted' : 'active')//deleted：表示已删除；active：表示正常
                    },
                    "self_addtime": 0,
                    "self_title_keyword": false,//表示为商品联想词。
                })
            }
            Tool.apply(nArr, oo.next, oo.This, oo.t)

        },
    }
})