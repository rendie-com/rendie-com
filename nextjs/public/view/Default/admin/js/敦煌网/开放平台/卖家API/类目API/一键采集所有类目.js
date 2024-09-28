'use strict';
var fun = {
    obj: {},
    token: "",
    url: "/" + o.cacheFolder + "dhtype.txt",
    time: (new Date).getTime(),
    htmlArr: [],//入库时慢慢，一次入很多会很卡。
    childAttr: [],//子属性ID  有多少。
    a01: function () {
        //obj.arr[3]    选择JS文件
        //obj.arr[4]    翻页
        //obj.arr[5]    切换账户
        //obj.arr[6]    返回URL
        let html = Tool.header2(obj.arr[6], "正在采集【敦煌网类目】") + '\
        <div class="p-2">\
            <table class="table table-hover">\
                <tbody>\
                <tr><td class="w150 right">非叶子类目进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
                <tr><td class="right">叶子类目进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
                <tr><td class="right">属性值入库进度：</td>'+ Tool.htmlProgress('C') + '</tr>\
                <tr><td class="right">统计：</td><td id="doTime" colspan="2"></td></tr>\
                <tr><td class="right">状态：</td><td id="state" colspan="2"></td></tr>\
                </body>\
            </table>\
        </div>';
        Tool.html(this.a02, this, html)
    },
    a02: function () {
        Tool.fromid_username_token.a01(this, this.a03);
    },
    a03: function (token) {
        this.token = token;
        this.a04();
    },
    a04: function () {
        let This = this;
        $.ajax(this.url + "?" + Math.random(), {
            type: 'get', success: function (str) {
                let obj2
                eval("obj2=" + str);
                This.obj = obj2;
                if (This.obj.list.length == 0) {
                    This.a09('');
                } else {
                    This.a05()
                }
            }, error: function () {
                This.obj = { list: [""], leaf: [] };
                This.a05()
            }
        });
    },
    a05: function () {
        let oo = {
            access_token: this.token,
            method: "dh.category.list",
            parentId: this.obj.list[0],
            v: "2.0",
            timestamp: (new Date).getTime()
        }, url = "http://api.dhgate.com/dop/router"
        if (this.obj.list[0] == "") { this.obj.list[0] = "0" }//在本地数据库中存零
        gg.postFetch(url, oo, this.a06, this)
    },
    a06: function (oo) {

        if (oo.status.code == "00000000") {
            this.a07(oo.catePubList)
        }
        else if (oo.status.code == "00000001")//返回成功并返回空值
        {
            this.obj.list.shift();
            this.a08('');
        }
        else {
            $("#stete").html("出错，程序终止。");
            Tool.pre(oo);
        }
    },
    a07: function (catePubList) {
        let html = "", insertType, selectType
        for (let i = 0; i < catePubList.length; i++) {
            if (catePubList[i].remark) {
                catePubList[i].remark = (catePubList[i].remark).replace(/'/ig, "''")
            } else {
                catePubList[i].remark = ""
            }
            insertType = "insert into @.type(@.name,@.upid,@.enname,@.fromID,@.sort,@.isleaf,@.des)values\
            (" + Tool.rpsql(catePubList[i].pubNameCn) + ",'" + this.obj.list[0] + "'," + Tool.rpsql(catePubList[i].pubName) + ",'" + catePubList[i].catePubId + "'," + (i + 1) + "," + catePubList[i].leaf + "," + Tool.rpsql(catePubList[i].remark) + ")"
            selectType = "select count(1) from @.type where @.fromID='" + catePubList[i].catePubId + "'"
            html += '<if "Fun(Db(sqlite.dhgate,' + selectType + ',count))"=="0"><r: db="sqlite.dhgate">' + insertType + '</r:></if>'
            if (catePubList[i].leaf == 0) {
                this.obj.list.push(catePubList[i].catePubId);
            }
            else {
                this.obj.leaf.push(catePubList[i].catePubId);
            }
        }
        this.obj.list.shift()
        $("#state").html("非叶子类目" + this.obj.list.length + "个(即剩于个数)，叶子类目数量" + this.obj.leaf.length + "个。")
       Tool.ajax.a01( html,1,this.a08,this)
    },
    a08: function (txt) {
        if (txt == "") {
            let html = '<r: file="' + this.url + '">' + JSON.stringify(this.obj) + '</r:>';
            $("#doTime").html(Tool.doTime(this.time, this.obj.A1, this.obj.A2));
           Tool.ajax.a01( html,1,this.a09,this)
        } else {
            $("#state").html("入库出错:<hr/>" + txt);
            Tool.at(txt)
        }
    },
    a09: function (txt) {
        if (txt == "") {
            this.obj.A1 = 1;
            this.obj.A2 = this.obj.list.length;
            this.obj.B1 = 1;
            this.obj.B2 = this.obj.leaf.length
            this.a10();
        } else {
            $("#state").html("保存TXT出错:<hr/>" + txt);
        }
    },
    a10: function () {
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.a05, this, this.a11)
    },
    a11: function () {
        Tool.x1x2("B", this.obj.B1, this.obj.B2, this.a12, this, null);
    },
    a12: function () {
        let oo = {
            access_token: this.token,
            method: "dh.category.get",
            v: "2.0",
            timestamp: (new Date).getTime(),
            catePubId: this.obj.leaf[0]
        }, url = "http://api.dhgate.com/dop/router"
        gg.postFetch(url, oo, this.a13, this)
    },
    a13: function (obj2) {
        if (obj2.status.code == "00000000") {
            if (obj2.excludeKeyWords + obj2.inlucdeKeyWords != "") {
                this.htmlArr.push("<r: db=\"sqlite.dhgate\">update @.type set @.excludeKeywords=" + Tool.rpsql(obj2.excludeKeyWords) + ",@.inlucdeKeywords=" + Tool.rpsql(obj2.inlucdeKeyWords) + " where @.fromID='" + this.obj.leaf[0] + "'</r:>")
            }
            this.categoryPub(obj2.categoryPubAttrList)//attributeList                       发布类目属性
            this.categoryPub(obj2.categoryPubAttrgroupList)//categoryPubAttrgroupList       兼容性属性
            if (this.childAttr.length == 0) {
                this.a14();
            }
            else {
                this.c01();
            }
        }
        else {
            $("#state").html("出错001");
        }
    },
    categoryPub: function (obj2) {
        let attrinsert, attrselect, attrupdate
        for (let i = 0; i < obj2.length; i++) {
            attrinsert = "insert into @.attr\
            (@.nameCn,@.name,@.attrId,@.sort,@.cateId,@.buyAttr,@.saleAttr,@.required,@.isother,@.style,@.js,@.type,@.ischild,@.isshow,@.defined)values\
            (" + Tool.rpsql(obj2[i].lineAttrNameCn) + "," + Tool.rpsql(obj2[i].lineAttrName) + "," + obj2[i].attrId + "," + (i + 1) + ",'" + this.obj.leaf[0] + "'," + obj2[i].buyAttr + "," + obj2[i].saleAttr + "," + obj2[i].required + "," + obj2[i].isother + "," + obj2[i].style + "," + Tool.rpsql(JSON.stringify(obj2[i].categoryPubAttrValList)) + ",'" + obj2[i].type + "'," + (obj2[i].childAttrId ? 1 : 0) + ",1," + obj2[i].defined + ")"
            attrselect = "select count(1) from @.attr where @.cateId='" + this.obj.leaf[0] + "' and @.attrId=" + obj2[i].attrId + " and @.childUpId=0"
            attrupdate = "update @.attr set @.js=" + Tool.rpsql(JSON.stringify(obj2[i].categoryPubAttrValList)) +" where @.cateId='" + this.obj.leaf[0] + "' and @.attrId=" + obj2[i].attrId + " and @.childUpId=0";
            this.htmlArr.push('<if "Fun(Db(sqlite.dhgate,' + attrselect + ',count))"=="0"><r: db="sqlite.dhgate">' + attrinsert + '</r:><else/><r: db="sqlite.dhgate">' + attrupdate + '</r:></if>')
            if (obj2[i].childAttrId) {
                let arr = this.FunCatePubAttrvalId(obj2[i].categoryPubAttrValList);
                this.childAttr.push({ childAttrId: obj2[i].childAttrId, catePubAttrvalId: arr[0], attrValId: arr[1] }); // 【子属性】
            }
        }
    },
    FunCatePubAttrvalId: function (obj2) {
        let arr1 = [], arr2 = [];
        for (let i = 0; i < obj2.length; i++) {
            arr1.push(obj2[i].catePubAttrvalId);
            arr2.push(obj2[i].attrValId);
            break;
        }
        return [arr1, arr2]
    },
    a14: function () {
        this.obj.C1 = 1;
        this.obj.C2 = Math.ceil(this.htmlArr.length / 30);
        this.a15()
    },
    a15: function () {
        Tool.x1x2("C", this.obj.C1, this.obj.C2, this.a16, this, this.a18);
    },
    a16: function () {
        let len = (this.htmlArr.length < 30 ? this.htmlArr.length : 30), Arr = [];
        for (let i = 0; i < len; i++) {
            Arr.push(this.htmlArr[i]);
        }
        this.htmlArr.splice(0, len);//splice() 方法用于添加或删除数组中的元素。
       Tool.ajax.a01( Arr.join(""),1,this.a17,this);
    },
    a17: function (txt) {
        if (txt == "") {
            this.obj.C1++;
            this.a15();
        } else {
            $("#state").html("入库出错:<hr/>" + txt);
            Tool.at(txt)
        }
    },
    a18: function () {
        if (this.htmlArr.length == 0) {
            $("#C1").css("width", "0%");
            $("#C1,#C2").html('');
            this.obj.leaf.shift();
            ///////////////////////////////////////
            let html = '<r: file="' + this.url + '">' + JSON.stringify(this.obj) + '</r:>';
            $("#doTime").html(Tool.doTime(this.time, this.obj.B1, this.obj.B2));
           Tool.ajax.a01( html,1,this.a19,this);
        }
        else {
            Tool.pre(["程序终止，还有没入库完的。。。", this.htmlArr])
        }
    },
    a19: function (txt) {
        if (txt == "") {
            this.obj.B1++;
            this.a11();
        } else {
            $("#state").html("保存TXT出错:<hr/>" + txt);
        }
    },
    c01: function () {
        let oo = {
            access_token: this.token,
            timestamp: (new Date).getTime(),
            method: "dh.category.attrval.list",
            v: "2.0",
            catePubAttrValId: this.childAttr[0].catePubAttrvalId[0],
            catePubId: this.obj.leaf[0],
            childAtrrId: this.childAttr[0].childAttrId
        }, url = "http://api.dhgate.com/dop/router"
        gg.postFetch(url, oo, this.c02, this)


    },
    c02: function (js) {
        if (js.status.code == "00000000") {
            js = js.categoryPubAttr;
            if (js.categoryPubAttrValList.length != 0)//注：这个判断是重要。因为DH认为，没有属性值的属性，是不能算属性的。
            {
                let attrinsert = "insert into @.attr(@.nameCn,@.name,@.attrId,@.cateId,@.buyAttr,@.saleAttr,@.required,@.isother,@.style,@.js,@.type,@.ischild,@.childUpId,@.sort,@.defined)values\
                (" + Tool.rpsql(js.lineAttrNameCn) + "," + Tool.rpsql(js.lineAttrName) + "," + js.attrId + ",'" + this.obj.leaf[0] + "'," + js.buyAttr + "," + js.saleAttr + "," + js.required + "," + js.isother + "," + js.style + ",'" + JSON.stringify(js.categoryPubAttrValList).replace(/'/ig, "''") + "','" + js.type + "'," + (js.childAttrId ? 1 : 0) + "," + this.childAttr[0].attrValId[0] + "," + this.htmlArr.length + "," + js.defined + ")"
                let attrselect = "select count(1) from @.attr where @.cateId='" + this.obj.leaf[0] + "' and @.attrId=" + js.attrId + " and @.childUpId=" + this.childAttr[0].attrValId[0]
                this.htmlArr.push('<if "Fun(Db(sqlite.dhgate,' + attrselect + ',count))"=="0"><r: db="sqlite.dhgate">' + attrinsert + '</r:></if>')
                if (js.childAttrId) {
                    let arr = this.FunCatePubAttrvalId(js.categoryPubAttrValList);
                    this.childAttr.push({
                        childAttrId: js.childAttrId,
                        catePubAttrvalId: arr[0],
                        attrValId: arr[1]
                    });
                }
                this.c03();
            }
            else {
                this.c03();
            }
        }
        else if (!js.categoryPubAttr) {
            //这个错误，可能真的【没有属性值】
            //{
            //    "status": {
            //        "code": "44",
            //            "message": "回调业务服务异常: method=dh.category.attrval.list&verison=2.0",
            //                "solution": "业务服务调用不成功，请查看具体错误subErrors",
            //                    "subErrors": []
            //    },
            //    "catePubId": null,
            //    "categoryPubAttr": null
            //}
            this.c03();
        }
        else {
            $("#state").html("出错说明：<hr/><pre>" + JSON.stringify(this.childAttr, null, 2) + "</pre>");
            Tool.pre(js)
        }
    },
    c03: function () {
        this.childAttr.shift();
        if (this.childAttr.length == 0) {
            this.a14();
        }
        else {
            if (this.childAttr[0].catePubAttrvalId.length == 0)//删除一组，下一组里面没属性值
            {
                this.c03();
            }
            else {
                this.c01();
            }
        }
    }
}
fun.a01()