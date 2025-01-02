'use strict';
var fun =
{
    obj: {
        A1: 1, A2: 0,
        B1: 1, B2: 0, Barr: []
    },
    token: "",
    a01: function () {
        //obj.arr[4]    返回URL
        //obj.arr[5]    执行任务编号。       如：全部 ➜ 下架
        //obj.arr[6]    账号来源ID。         all：表示全部账号
        let html = Tool.header("上下架操作...") + '\
        <div class="p-2">\
          <table class="table  align-middle table-hover">\
          <tbody>\
		    <tr><td class="w150 right">账号：</td><td id="username" colspan="2"></td></tr>\
		    <tr><td class="right">账号进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		    <tr><td class="right">商品页进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
		    <tr><td class="right">操作内容：</td><td id="title" colspan="2"></td></td>\
		    <tr><td class="right">提示：</td><td id="state" colspan="2">正在准备账号...</td></tr>\
            <tr>\
                <td class="right">请求地址：</td><td colspan="2"><input type="text" class="form-control" id="thisUrl" disabled="disabled"></td>\
            </tr>\
            <tr>\
                <td class="right">post参数：</td><td colspan="2"><textarea id="thisPost" rows="10" class="form-control" disabled="disabled"></textarea></td>\
            </tr>\
            <tr>\
                <td class="right">返回内容：</td><td colspan="2"><textarea id="thisJson" rows="30" class="form-control" disabled="disabled"></textarea></td>\
            </tr>\
          </tbody>\
          </table>\
        </div>'
        Tool.html(this.a02A, this, html);
    },
    a02A: function () {
        gg.isRD(this.a02,this)
    },
    a02: function () {
        let where = "";
        if (obj.arr[6] != "all") { where = " where @.fromid=" + obj.arr[6]; }
        let str = Tool.DH_seller(where, "username,password,fromid,cookies", this.obj.A2);//获取敦煌【seller】表1条信息
        Tool.ajax.a01(str, this.obj.A1, this.a03, this)//获得账号等信息
    },
    a03: function (oo) {
        if (this.obj.A2 == 0) this.obj.A2 = oo.A2;
        $("#username").html(oo.username);
        this.obj.fromid = oo.fromid;
        $("#title").html('正在进行敦煌网产品【' + this.b01() + '】操作...');
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a04, this, null, oo)
    },
    a04: function (oo) {
        $("#state").html("正在验证登陆。。。");
        Tool.verifyUser.a01(oo.username, oo.password, oo.cookies, this.a05, this);
    },
    a05: function () {
        switch (obj.arr[5]) {
            case "1": this.d01(); break;//全部 ➜ 上架            
            case "2": this.e01(); break;//(手动审核状态:9.图片且详情审核通过)且(本地商品状态:更新成功) ➜ 上架           
            case "3": this.d01(); break;//非((手动审核状态:9.图片且详情审核通过)且(本地商品状态:更新成功)) ➜ 下架           
            default: alert("未知:" + obj.arr[5]); break;
        }
    },
    a06: function () {
        this.obj.A1++;
        this.obj.B1 = 1;
        this.obj.B2 = 0;
        this.obj.Barr = [];
        $("#B1").html("0%").css("width", "0%");
        $("#B2").html('');
        this.a02();
    },
    b01: function () {
        let State = "";
        switch (obj.arr[5]) {
            case "1": State = "全部 ➜ 下架"; break;
            case "2": State = "(手动审核状态:9.图片且详情审核通过)且(本地商品状态:更新成功) ➜ 上架"; break;
            case "3": State = "非((手动审核状态:9.图片且详情审核通过)且(本地商品状态:更新成功)) ➜ 下架"; break;
            default: State = "未知任务编号:" + obj.arr[5]; break;
        }
        return State
    },
    d01: function () {
        let html
        if (obj.arr[5] == "1") {
            html = '[' + (this.obj.B2 == 0 ? '<@page/>' : 0) + '\
            <r:proupdhgate db="sqlite.dhgate" size=60 page=2 where=" where @.upuserid=' + this.obj.fromid + ' and not(@.Status=1) order by @.id asc">,\
                <:fromid/>\
            </r:proupdhgate>]'
            Tool.ajax.a01(html, 1, this.d02, this);
        }
        else if (obj.arr[5] == "3") {
            html = '[' + (this.obj.B2 == 0 ? '<@page/>' : 0) + '\
            <r:proupdhgate db="sqlite.dhgate" size=60 page=2 where=" where @.upuserid=' + this.obj.fromid + ' and not(@.proStatus=1 and @.ManualReview=9) and @.Status=0 order by @.id asc">,\
                <:fromid/>\
            </r:proupdhgate>]'
            Tool.ajax.a01(html, this.obj.B1, this.d02, this);
        }
    },
    d02: function (oo) {
        if (this.obj.B2 == 0) this.obj.B2 = oo[0];
        oo.shift();
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.d03, this, this.a06, oo);
    },
    d03: function (ids) {
        let url = "https://seller.dhgate.com/prodmanage/shelf/prodShelf.do?dhpath=10001,21001,0202"
        let params = [
            {
                "name": "vipMessageShow",
                "value": "1"
            },
            {
                "name": "prodShelfForm.changeProdGroupId",
                "value": ""
            },
            {
                "name": "prodShelfForm.dispatcheOperation",
                "value": "batchDownShelf"
            },
            {
                "name": "prodShelfForm.hasOperationTip",
                "value": "0"
            },
            {
                "name": "prodShelfForm.operationTip",
                "value": ""
            },
            {
                "name": "prodShelfForm.sortType",
                "value": "0"
            },
            {
                "name": "prodShelfForm.sortField",
                "value": ""
            },
            {
                "name": "prodShelfForm.isNewVersion",
                "value": ""
            },
            {
                "name": "prodShelfForm.searchUsedFlag",
                "value": ""
            },
            {
                "name": "prodShelfForm.isGuidePageShow",
                "value": "1"
            },
            {
                "name": "prodShelfForm.hasGoldStallAuthority",
                "value": ""
            },
            {
                "name": "prodShelfForm.databaseAvailable",
                "value": "3"
            },
            {
                "name": "prodShelfForm.supplierIdentityState",
                "value": "1"
            },
            {
                "name": "prodShelfForm.isStudentSupplier",
                "value": "0"
            },
            {
                "name": "prodShelfForm.isMoreSearchConditions",
                "value": "1"
            },
            {
                "name": "csrftoken",
                "value": "u5enef6kir"
            },
            {
                "name": "isOverseasWarehouseSeller",
                "value": ""
            },
            {
                "name": "prodShelfForm.productName",
                "value": ""
            },
            {
                "name": "prodShelfForm.itemcode",
                "value": ""
            },
            {
                "name": "prodShelfForm.skuCode",
                "value": ""
            },
            {
                "name": "prodShelfForm.skuId",
                "value": ""
            },
            {
                "name": "prodShelfForm.selectedProdGroupId",
                "value": ""
            },
            {
                "name": "prodShelfForm.onShelfBeginDateStr",
                "value": ""
            },
            {
                "name": "prodShelfForm.onShelfEndDateStr",
                "value": ""
            },
            {
                "name": "prodShelfForm.euResPersionId",
                "value": ""
            },
            {
                "name": "selEuResPersionId",
                "value": ""
            },
            {
                "name": "prodShelfForm.myshopSale",
                "value": ""
            },
            {
                "name": "prodShelfForm.operateDateBeginStr",
                "value": ""
            },
            {
                "name": "prodShelfForm.operateDateEndStr",
                "value": ""
            },
            {
                "name": "prodShelfForm.scoreItem",
                "value": "0"
            },
            {
                "name": "prodShelfForm.sourceType",
                "value": ""
            },
            {
                "name": "prodShelfForm.promoteType",
                "value": ""
            },
            {
                "name": "prodShelfForm.googleStatus",
                "value": "0"
            },
            {
                "name": "prodShelfForm.ifCateAttrChange",
                "value": ""
            },
            {
                "name": "prodShelfForm.ifShipToPrice",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShortVideoClaimId",
                "value": ""
            },
            {
                "name": "prodShelfForm.isLastThreeMonth",
                "value": "1"
            },
            {
                "name": "selectpagesize",
                "value": "60"
            },
            {
                "name": "page",
                "value": ""
            }
        ]
        for (let i = 0; i < ids.length; i++) {
            params.push({ name: "prodShelfForm.itemcodeChecked", value: "" + ids[i] })
        }
        $("#thisUrl").val(url);
        $("#thisPost").html(JSON.stringify(params, null, 2));
        gg.postFetch(url, Tool.postData(params), this.d04, this, ids);
    },
    d04: function (t, ids) {
        $("#thisJson").html(JSON.stringify(ids, null, 2));
        let txt = '""<r: db="sqlite.dhgate">update @.proupdhgate set @.status=1 where @.fromid in(' + ids.join(",") + ')</r:>';
        Tool.ajax.a01(txt, 1, this.d05, this)
    },
    d05: function (t) {
        if (t == "") {
            this.obj.B1++;
            this.d01();
        }
        else {
            $("#state").html("错误:0001<hr/><pre>" + t + "<pre>");
        }
    },
    e01: function () {
        let html = '[' + (this.obj.B2 == 0 ? '<@page/>' : 0) + '\
        <r:proupdhgate db="sqlite.dhgate" size=10 page=2 where=" where @.upuserid=' + this.obj.fromid + ' and @.proStatus=1 and @.ManualReview=9 and not(@.Status=0) order by @.id asc">,\
            <:fromid/>\
        </r:proupdhgate>]'
        Tool.ajax.a01(html, 1, this.e02, this)
    },
    e02: function (oo) {
        if (this.obj.B2 == 0) this.obj.B2 = oo[0];
        oo.shift();
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.e03, this, this.a06, oo);
    },
    e03: function (ids) {
        let params = [
            {
                "name": "downShelfForm.changeProdGroupId",
                "value": ""
            },
            {
                "name": "downShelfForm.dispatcheOperation",
                "value": "batchUpShelf"
            },
            {
                "name": "downShelfForm.hasOperationTip",
                "value": "0"
            },
            {
                "name": "downShelfForm.operationTip",
                "value": "%E6%82%A8%E9%80%89%E6%8B%A9%E7%9A%84%E4%BA%A7%E5%93%81%E5%B7%B2%E7%BB%8F%E4%B8%8A%E6%9E%B6"
            },
            {
                "name": "downShelfForm.shippingmodelid",
                "value": ""
            },
            {
                "name": "downShelfForm.selectedItemcode",
                "value": ""
            },
            {
                "name": "downShelfForm.sortType",
                "value": "asc"
            },
            {
                "name": "downShelfForm.sortField",
                "value": ""
            },
            {
                "name": "downShelfForm.isNewVersion",
                "value": ""
            },
            {
                "name": "downShelfForm.searchUsedFlag",
                "value": ""
            },
            {
                "name": "downShelfForm.hasGoldStallAuthority",
                "value": ""
            },
            {
                "name": "downShelfForm.isStudentSupplier",
                "value": "0"
            },
            {
                "name": "downShelfForm.totalShelfProductNum",
                "value": "381"
            },
            {
                "name": "downShelfForm.isHonestSeller",
                "value": "0"
            },
            {
                "name": "downShelfForm.isMoreSearchConditions",
                "value": "1"
            },
            {
                "name": "csrftoken",
                "value": "dd7cv1gi3a"
            },
            {
                "name": "isOverseasWarehouseSeller",
                "value": ""
            },
            {
                "name": "downShelfForm.productName",
                "value": ""
            },
            {
                "name": "downShelfForm.itemcode",
                "value": ""
            },
            {
                "name": "downShelfForm.skuCode",
                "value": ""
            },
            {
                "name": "downShelfForm.skuId",
                "value": ""
            },
            {
                "name": "downShelfForm.selectedProdGroupId",
                "value": ""
            },
            {
                "name": "downShelfForm.operateDateBeginStr",
                "value": ""
            },
            {
                "name": "downShelfForm.operateDateEndStr",
                "value": ""
            },
            {
                "name": "downShelfForm.prodSupportPlan",
                "value": ""
            },
            {
                "name": "downShelfForm.myshopSale",
                "value": ""
            },
            {
                "name": "downShelfForm.withdrawaltype",
                "value": ""
            },
            {
                "name": "downShelfForm.forceWithdrawalOnStartStr",
                "value": ""
            },
            {
                "name": "downShelfForm.forceWithdrawalOnEndStr",
                "value": ""
            },
            {
                "name": "downShelfForm.sourceType",
                "value": ""
            },
            {
                "name": "downShelfForm.googleStatus",
                "value": "0"
            },
            {
                "name": "downShelfForm.ifShipToPrice",
                "value": ""
            },
            {
                "name": "selectpagesize",
                "value": "60"
            },
            {
                "name": "page",
                "value": ""
            }
        ]
        ////////////////////////////////////
        for (let i = 0; i < ids.length; i++) {
            params.push({ name: "downShelfForm.itemcodeChecked", value: "" + ids[i] })
        }
        let url = "https://seller.dhgate.com/prodmanage/downshelf/prodDownShelf.do?dhpath=10001,21001,0202"
        $("#thisUrl").val(url);
        $("#thisPost").html(JSON.stringify(params, null, 2));
        gg.postFetch(url, Tool.postData(params), this.e04, this, ids);
    },
    e04: function (t, ids) {
        $("#thisJson").html(JSON.stringify(ids, null, 2));
        let sql = 'update @.proupdhgate set @.status=0 where @.fromid in(' + ids.join(",") + ')'
        let txt = '""<r: db="sqlite.dhgate">' + sql + '</r:>';
        Tool.ajax.a01(txt, 1, this.e05, this)
    },
    e05: function (t) {
        if (t == "") {
            this.obj.B1++;
            this.e01();
        } else {
            $("#state").html("错误:0001<hr/><pre>" + t + "<pre>");
        }
    }
}
fun.a01();

//let oo = {
//    method: "dh.item.upshelf.list",
//    v: "2.0",
//    timestamp: Tool.gettime(""),
//    access_token: this.token,
//    itemCodes: ids.join(",")
//}, url = "http://api.dhgate.com/dop/router"
//$("#thisUrl").val(url);
//$("#thisPost").html(JSON.stringify(oo, null, 2));
//gg.postFetch(url, oo, this.e04, this, ids);

//$("#thisJson").html(JSON.stringify(oo, null, 2));
//if (oo.isSuccess) {
//    this.e06(ids, []);
//}
//else if (oo.status.message == "回调业务服务异常: methodv=dh.item.upshelf.list$2.0") {
//    this.e05(oo.status.subErrors, ids)
//}
//else {
//    $("#state").html('上架错误');
//    Tool.pre(oo);
//}
//e05: function (arr, ids) {
//let Farr = [], itemCode, isbool = false;
//for (let i = 0; i < arr.length; i++) {
//    if (arr[i].message.indexOf("侵权产品，不可以做修改操作，只可以删除！") != -1 ||
//        arr[i].message.indexOf("禁销产品，不可以做修改操作，只可以删除！") != -1) {
//        isbool = true;
//        itemCode = parseInt(arr[i].message.substr(0, arr[i].message.indexOf(":")))
//        ids.splice(ids.indexOf(itemCode), 1)//删除ids中的itemCode
//        Farr.push("update @.proupdhgate set @.status=7,@.err=" + Tool.rpsql(arr[i].message) + " where @.fromID=" + itemCode)
//    }
//    else if (
//        arr[i].message.indexOf("无效治理商品不可编辑上架") != -1 ||
//        arr[i].message.indexOf("重复铺货") != -1 ||
//        arr[i].message.indexOf("操作失败，请确认当前的产品是否是当前用户的。") != -1) {
//        // "message": "434427085:此商品和您关联账户下已提交商品重复铺货， 不可直接上架，请重新填写商品信息"
//        //"message": "475205471:无效治理商品不可编辑上架"
//        isbool = true;
//        itemCode = arr[i].message.substr(0, arr[i].message.indexOf(":"))
//        Farr.push("update @.proupdhgate set @.status=7,@.err=" + Tool.rpsql(arr[i].message) + " where @.fromID=" + itemCode)
//    }
//    //else if (arr[i].message.indexOf("请确认当前的产品是否是当前用户的") != -1) {
//    //    //"message": "434427085:操作失败，请确认当前的产品是否是当前用户的。"
//    //    cccccccccccccccccc
//    //}
//    //else if (arr[i].message.indexOf("产品校验失败") != -1) {
//    //    //"message": "产品校验失败。"
//    //    ddddddddddddd
//    //}
//    //else if (arr[i].message.indexOf("产品信息质量等级为差，不允许上架，请修改完善相关产品信息再上架") != -1) {
//    //    ddddddddddddddddddddd
//    //}
//    //else if (arr[i].message.indexOf("上架产品数量超限") != -1) {
//    //    //"message": "上架产品数量超限！"
//    //    ffffffffffffff
//    //}
//    else {
//        Tool.pre(["上架出错", arr])
//    }
//}
//if (isbool) this.e06(ids, Farr)
//},