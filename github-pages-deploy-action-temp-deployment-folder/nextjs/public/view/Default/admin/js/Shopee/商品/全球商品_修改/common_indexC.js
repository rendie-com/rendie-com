Object.assign(Tool, {
    /////////////////////////////////////////////
    c01: function (val) {
        let name = Tool.b04("" + val)
        $("#field").html(name).val(val)
    },
    c02: function () {
        let field = $("#field").val(), searchword = Tool.Trim($("#searchword").val());
        if (field == "2" && isNaN(searchword)) {
            alert("【商品ID】必须是数字。")
        }
        else if (searchword) {
            Tool.main("?jsFile=" + obj.params.jsFile + "&page=1&field=" + field + "&searchword=" + searchword);
        } else { alert("请输入搜索内容"); }
    },
    c03: function (I, val) {
        if (val == "-1") {
            Tool.openR("?jsFile=js11");
        }
        else {
            Tool.open(I, val);
        }
    },
    c04: function (This, id, L, V) {
        let val = This.val(), html = "\"ok\"<r: db=\"sqlite.shopee\">update @.GlobalPro set @." + L + "='" + val + "' where @.id=" + id + "</r:>"
        if (val != V && !This.attr("disabled")) {
            This.attr("disabled", true);
            This.val("加载加...");
            Tool.ajax.a01(html, 1, this.c05, this, [This, val]);
        }
    },
    c05: function (t, arr) {
        if (t == "ok") {
            arr[0].attr("disabled", false);
            arr[0].val(arr[1]);
        }
        else { alert("出错：" + t); }
    },
    c06: function (This, id, L) {
        if (!This.attr("disabled")) {
            This.attr("disabled", true);
            let html = "\"ok\"<r: db=\"sqlite.shopee\">update @.GlobalPro set @." + L + "=" + Tool.rpsql(This.val()) + " where @.id=" + id + "</r:>"
            Tool.ajax.a01(html, 1, this.c07, this, This);
        }
    },
    c07: function (t, This) {
        if (t == "ok") {
            This.attr("disabled", false);
        }
        else { alert("出错：" + t); }
    },
    c08: function (I, val) {
        if (val == "-1") {
            Tool.openR("?jsFile=js44");
        }
        else {
            Tool.open(I, val);
        }
    },
    c09: function (val, proid) {
        let arr = [
            //@.BeforeReview=0      表示【0.未更新】
            "update @.GlobalPro set @.editStatus=" + val + ",@.BeforeReview=0 where @.proid='" + proid + "'",
            // @.self_uptime        表示【本地更新时间】
            "update @.shopPro_tw set @.self_uptime=" + Tool.gettime("") + " where @.proid='" + proid + "'",
            "update @.shopPro_my set @.self_uptime=" + Tool.gettime("") + " where @.proid='" + proid + "'",
            "update @.shopPro_br set @.self_uptime=" + Tool.gettime("") + " where @.proid='" + proid + "'",
        ]
        let html = '"ok"<r: db="sqlite.shopee">' + arr.join("<1/>") + '</r:>'
        Tool.ajax.a01(html, 1, Tool.reload);
    },
    c10: function (L, val, proid) {
        let html = "\"ok\"<r: db=\"sqlite.shopee\">update @.GlobalPro set @." + L + "=" + Tool.rpsql(val) + " where @.proid=\'" + proid + "\'</r:>"
        Tool.ajax.a01(html, 1, Tool.reload);
    },
    c11: function (proid) {
        if (confirm("确定要修改码？")) {
            let str = '"ok"<r: db="sqlite.shopee">update @.GlobalPro set @.BeforeReview=0,@.err=null where @.proid=\'' + proid + '\'</r:>'
            Tool.ajax.a01(str, 1, Tool.reload);
        }
    },
    c12: function (editStatus) {
        if (confirm("确定要修改码？")) {
            let str = '"ok"<r: db="sqlite.shopee">update @.GlobalPro set @.BeforeReview=0,@.err=null where @.editStatus=' + editStatus + '</r:>'
            Tool.ajax.a01(str, 1, Tool.reload);
        }
    },
    c13: function (This, id) {
        let val = Tool.Trim(This.val())
        if (!This.attr("disabled")) {
            This.attr("disabled", true);
            let dom = {
                This: This,
                tw_nameLen: $("#tw_nameLen"),
                tw_name: $("#tw_name"),
                ms_nameLen: $("#ms_nameLen"),
                ms_name: $("#ms_name"),
                en_nameLen: $("#en_nameLen"),
                en_name: $("#en_name"),
                pt_nameLen: $("#pt_nameLen"),
                pt_name: $("#pt_name"),
            }
            Tool.translate.a01(dom, id, val);
        }
    },
    c14: function (This, id) {
        This.parent().find('li').attr("class", "");
        This.attr("class", "hover")
        $("tbody[id^='GlobalPro']").hide();
        $("#GlobalPro" + id).show();
    },
    c15: function (This, id) {
        This.parent().find('li').attr("class", "");
        This.attr("class", "hover")
        $("textarea[id^='description']").hide();
        $("#description" + id).show();
    },
    c16: function (I, val) {
        if (val == "-1") {
            Tool.open4("js47");
        }
        else {
            Tool.open(I, val);
        }
    },


})