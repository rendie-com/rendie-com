'use strict';
var fun =
{
    a01: function () {
        obj.params.jsFile = obj.params.jsFile ? obj.params.jsFile : ""//选择JS文件
        obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页         
        obj.params.field = obj.params.field ? obj.params.field : '1'//搜索字段
        obj.params.searchword = obj.params.searchword ? Tool.Trim(obj.params.searchword) : "";//搜索关键词
        obj.params.BeforeReview = obj.params.BeforeReview ? obj.params.BeforeReview : "";//更新前本地状态
        obj.params.mode = obj.params.mode ? obj.params.mode : "";//请选择【查询条件】
        obj.params.editStatus = obj.params.editStatus ? obj.params.editStatus : "";//修改状态
        obj.params.site = obj.params.site ? obj.params.site : "";//已发布站点
        this.a02();
    },
    a02: function () {
        let where = Tool.b01();
        let data = [{
            action: "sqlite",
            database: "shopee/商品/全球商品",
            sql: "select count(1) as total FROM @.table" + where,
        }, {
            action: "sqlite",
            database: "shopee/商品/全球商品",
            sql: "select " + Tool.fieldAs("proid,id,discount,editStatus,ms_nameLen,tw_nameLen,en_nameLen,pt_nameLen,tw_name,ms_name,en_name,pt_name,fromID,manualreview_1688_fromid,ManualReview_1688_description,tw_description,ms_description,en_description,pt_description,BeforeReview,pic,ManualReview_1688_subject,ManualReview_1688_unitWeight,tw_ads_key,my_ads_key,br_ads_key,ManualReview_1688_categoryId") + " FROM @.table" + where + Tool.limit(1, obj.params.page),
            list: [{
                action: "sqlite",
                database: "1688",
                sql: "select @.subject as subject FROM @.proList where @.fromid=${manualreview_1688_fromid}",
            }, {
                action: "sqlite",
                database: "1688/类目/现货类目",
                sql: "select @.catNamePath as catNamePath,@.fromid as fromid_1688,@.bindShopee as bindShopee FROM @.table where @.fromid=${ManualReview_1688_categoryId} limit 1",
                list: [{
                    action: "sqlite",
                    database: "shopee/类目/类目",
                    sql: "select @.upid as upid,@.name as name FROM @.table where @.fromid=${bindShopee} limit 1",
                    list: [{
                        action: "sqlite",
                        database: "shopee/类目/类目",
                        sql: "select @.upid as upid,@.name as name FROM @.table where @.fromid=${upid} limit 1",
                        list: [{
                            action: "sqlite",
                            database: "shopee/类目/类目",
                            sql: "select @.upid as upid,@.name as name FROM @.table where @.fromid=${upid} limit 1",
                            list: [{
                                action: "sqlite",
                                database: "shopee/类目/类目",
                                sql: "select @.upid as upid,@.name as name FROM @.table where @.fromid=${upid} limit 1",
                                list: [{
                                    action: "sqlite",
                                    database: "shopee/类目/类目",
                                    sql: "select @.upid as upid,@.name as name FROM @.table where @.fromid=${upid} limit 1",
                                    list: []
                                }]
                            }]
                        }]
                    }]
                }]
            }, {
                action: "sqlite",
                database: "1688_prodes/${fromid99:manualreview_1688_fromid}",
                sql: "select " + Tool.fieldAs("attrPic_shopee,sku,videoUrl,ExplanationVideo") + " FROM @.prodes where @.fromid=${manualreview_1688_fromid}",
            }, {
                action: "sqlite",
                database: "aliexpress_prodes/${proid50:proid}",
                sql: "select @.DHpic as DHpic,@.DHdesPic as DHdesPic FROM @.prodes where @.proid='${proid}'",
            }, {
                action: "sqlite",
                database: "shopee/Shopee广告/关键词",
                sql: "select @.cn_keyword as tw_keyword_cn_keyword FROM @.table where @.keyword='${tw_ads_key}' and @.site='tw'",
            }, {
                action: "sqlite",
                database: "shopee/Shopee广告/关键词",
                sql: "select @.cn_keyword as my_keyword_cn_keyword FROM @.table where @.keyword='${my_ads_key}' and @.site='my'",
            }, {
                action: "sqlite",
                database: "shopee/Shopee广告/关键词",
                sql: "select @.cn_keyword as br_keyword_cn_keyword FROM @.table where @.keyword='${br_ads_key}' and @.site='br'",
            }]
        }]
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (t) {
        let oo = t[1][0], html = "";
        if (oo) {
            html = '\
			<table class="table align-middle">\
				<tbody id="GlobalPro1">'+ Tool.b21(oo) + '</tbody>\
				<tbody id="GlobalPro2" class="hide">\
                    <tr><td class="right w170">1688属性图：</td><td>'+ (oo.list[2][0] ? Tool.b08(JSON.parse(oo.list[2][0].attrPic_shopee), oo.proid) : '') + '</td></tr>\
                    <tr><td class="right">aliexpress放大镜图：</td><td>'+ (oo.list[3][0] ? Tool.b07(JSON.parse(oo.list[3][0].DHpic), "DHpic", oo.proid) : '') + '</td></tr>\
                    <tr><td class="right">aliexpress详情图：</td><td>'+ (oo.list[3][0] ? Tool.b07(JSON.parse(oo.list[3][0].DHdesPic), "DHdesPic", oo.proid) : '') + '</td></tr>\
                </tbody>\
				<tbody id="GlobalPro3" class="hide">\
                    <tr>\
                        <td class="right">属性：</td>\
                        <td><pre>'+ (oo.list[2][0] ? JSON.stringify(JSON.parse(oo.list[2][0].sku), null, 2) : '') + '</pre></td>\
                    </tr>\
                </tbody>\
				<tbody id="GlobalPro4" class="hide">\
                    <tr><td class="right w100">详情：</td><td>' + (oo.id ? Tool.b17(oo.id,
                oo.ManualReview_1688_description,
                oo.tw_description,
                oo.ms_description,
                oo.en_description,
                oo.pt_description
            ) : '') + '</td></tr>\
                </tbody>\
				<tbody id="GlobalPro5" class="hide">\
                    <tr>\
                        <td class="right w150">放大镜位置视频：</td>\
                        <td>'+ (oo.list[2][0] ? '<video width="500" height="500" id="myVideo" controls><source src="' + oo.list[2][0].videoUrl + '" type="video/mp4">您的浏览器不支持 HTML5 video 标签。</video>' : '') + '</td>\
                    </tr>\
                    <tr>\
                        <td class="right">讲解视频：</td>\
                        <td>'+ (oo.list[2][0] ? '<video width="500" height="500" id="myVideo" controls><source src="' + oo.list[2][0].ExplanationVideo + '" type="video/mp4">您的浏览器不支持 HTML5 video 标签。</video>' : '') + '</td>\
                    </tr>\
                </tbody>\
			</table>'
        }
        html = Tool.header2(obj.params.jsFile) + '\
		<div class="p-2">\
			'+ Tool.b03() + '\
			<table class="table align-middle">\
				<thead class="table-light">\
                    <tr><td colspan="4">查询条件：' + Tool.b01() + '</td></tr>\
                    <tr>\
                        <td class="p-0">'+ Tool.b06("BeforeReview", obj.params.BeforeReview) + '</td>\
                        <td class="p-0">' + Tool.b10("mode", obj.params.mode) + '</td>\
                        <td class="p-0">' + Tool.b11("editStatus", obj.params.editStatus, config.GlobalPro_editStatus_count) + '</td>\
                        <td class="p-0">' + Tool.b15("site", obj.params.site) + '</td>\
                    </tr>\
                </thead>\
			</table>\
            <ul class="makeHtmlTab">\
                <li onclick="Tool.c14($(this),1)" class="hover">基本信息</li>\
                <li onclick="Tool.c14($(this),2)">图片</li>\
                <li onclick="Tool.c14($(this),3)">属性</li>\
                <li onclick="Tool.c14($(this),4)">详情</li>\
                <li onclick="Tool.c14($(this),5)">视频</li>\
            </ul>' + html + Tool.page(t[0][0].total, 1, obj.params.page) + '\
		</div>'
        Tool.html(this.a05, this, html)
    },
    a05: function () {
        $('.easyzoom').easyZoom();
    },
}
fun.a01();