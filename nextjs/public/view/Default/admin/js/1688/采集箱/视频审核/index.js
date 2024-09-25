'use strict';
var fun =
{
    a01: function () {
        //obj.params.jsFile          选择JS文件
        obj.params.page = obj.params.page ? Tool.int(obj.params.page) : 1;//翻页
        obj.params.field = obj.params.field ? obj.params.field : "1";//搜索字段
        obj.params.searchword = obj.params.searchword ? obj.params.searchword : "";//搜索关键词
        obj.params.ManualReview_video_status = obj.params.ManualReview_video_status ? obj.params.ManualReview_video_status : "";//人工审核视频状态
        obj.params.ManualReview_1688 = obj.params.ManualReview_1688 ? obj.params.ManualReview_1688 : "";//人工审核1688状态
        this.a02();
    },
    a02: function () {
        let where = this.b10()
        let data = [{
            action: "sqlite",
            database: "1688",
            sql: "select count(1) as total FROM @.product " + where,
        }, {
            action: "sqlite",
            database: "1688",
            sql: "select " + Tool.fieldAs("id,proid,pic,ManualReview_video_status,ManualReview_1688,ManualReview_1688_fromid,fromid") + " FROM @.product " + where + Tool.limit(1, obj.params.page),
            list: [{
                action: "sqlite",
                database: "1688_prodes/${fromid99:ManualReview_1688_fromid}",
                sql: "select @.videoUrl as videoUrl FROM @.prodes where @.fromid=${ManualReview_1688_fromid} limit 1",
            }]
        }]
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (t) {
        let html = "", oo = t[1][0];
        if (oo) {
            html = '\
            <tr>\
                <td rowspan="2">'+ (oo.list[0][0].videoUrl ? '<video width="100%" height="550" id="myVideo" controls><source src="' + oo.list[0][0].videoUrl + '" type="video/mp4">您的浏览器不支持 HTML5 video 标签。</video>' : '没有视频') + '</td>\
                <td rowspan="2">'+ this.b09(oo.ManualReview_video_status, oo.proid) + '</td>\
                <td>'+ this.b07(oo.ManualReview_video_status, Tool.ManualReview_video_status) + '</td>\
                <td>'+ this.b05(oo.ManualReview_1688, Tool.ManualReview_1688) + '</td>\
            </tr>\
            <tr>\
               <td colspan="2" class="p-0">'+ this.b08(JSON.parse(oo.pic), oo.proid, oo.fromid, oo.ManualReview_1688_fromid, oo.ManualReview_video_status) + '</td>\
            </tr>'
        }
        html = Tool.header(obj.params.jsFile) + '\
        <div class="p-2">\
            '+ this.b01() + '\
            <table class="table align-bottom table-hover center">\
            <thead class="table-light">\
                <tr>\
                    <th>视频</th>\
                    <th>操作</th>\
                    <th class="p-0">'+ this.b03(obj.params.ManualReview_video_status, config.product_ManualReview_video_status_count) + '</th>\
                    <th class="p-0">'+ this.b04(obj.params.ManualReview_1688, config.GlobalPro_ManualReview_1688_count) + '</th>\
                </tr>\
            </thead>\
            <tbody>'+ html + '</tbody>\
            </table>' + Tool.page(t[0][0].total, 1, obj.params.page) + '\
        </div>'
        Tool.html(this.a04, this, html);
    },
    a04: function () {
        var video = document.getElementById("myVideo");// 获取video元素
        if (video) {
            // 设置视频播放速度为3倍
            video.playbackRate = 3;
            // 播放视频
            video.play();
        }
    },
    b01: function () {
        return '\
        <div class="input-group w-50 mb-2">\
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Field" value="'+ obj.params.field + '">' + this.b02(obj.params.field) + '</button>\
            <ul class="dropdown-menu">\
            <li class="dropdown-item pointer" onclick="fun.c01(1)">商品编码</li>\
            <li class="dropdown-item pointer" onclick="fun.c01(2)">自动匹配的【详情ID】</a></li>\
            <li class="dropdown-item pointer" onclick="fun.c01(3)">人工选中的【详情ID】</a></li>\
            </ul>\
            <input type="text" class="form-control" id="searchword" value="'+ Tool.Trim(obj.params.searchword) + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
            <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
        </div>'
    },
    b02: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "商品编码"; break;
            case "2": name = "自动匹配的【详情ID】"; break;
            case "3": name = "人工选中的【详情ID】"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b03: function (val, configArr) {
        let nArr = [], arr = Tool.ManualReview_video_status;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + ("" + arr[i][0] == "" + val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '（' + configArr[i] + '）</option>');
        }
        return '\
        <select onChange=" fun.c03(\'ManualReview_video_status\',this.options[this.selectedIndex].value)" class="form-select">\
            <option value="">人工审核视频状态</option>\
            <option value="-1">更新数量</option>\
            ' + nArr.join("") + '\
        </select>';
    },
    b04: function (val, configArr) {
        let nArr = [], arr = Tool.ManualReview_1688;
        for (let i = 0; i < arr.length; i++) {
            nArr.push('<option value="' + i + '" ' + ("" + arr[i][0] == "" + val ? 'selected="selected"' : '') + '>' + i + '.' + arr[i][1] + '（' + configArr[i] + '）</option>');
        }
        return '\
        <select onChange=" fun.c04(\'ManualReview_1688\',this.options[this.selectedIndex].value)" class="form-select">\
            <option value="">人工审核1688状态</option>\
            <option value="-1">更新数量</option>\
            ' + nArr.join("") + '\
        </select>';
    },
    b05: function (ManualReview, arr) {
        let str = "未知:" + ManualReview
        for (let i = 0; i < arr.length; i++) {
            if (ManualReview == arr[i][0]) {
                str = ManualReview + "." + arr[i][1];
                break;
            }
        }
        return str
    },
    b06: function () {
        return '\
        <div style="position: relative;top: -7px;left: -7px;">\
            <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
            <ul class="dropdown-menu">\
	            <li onClick="Tool.openR(\'?jsFile=js25\');"><a class="dropdown-item pointer">修复有无视频</a></li>\
            </ul>\
        </div>'
    },
    b07: function (ManualReview, arr) {
        let str = "未知:" + ManualReview
        for (let i = 0; i < arr.length; i++) {
            if (ManualReview == arr[i][0]) {
                str = (arr[i][0] == 0 ? this.b06() : '') + ManualReview + "." + arr[i][1];
                break;
            }
        }
        return str
    },
    b08: function (pic, proid, fromid, ManualReview_1688_fromid) {
        let str = '\
        <table class="table mb-0 table-bordered left align-middle">\
            <tr><td class="right w180">首图：</td><td>'+ this.b11(pic) + '</td></tr>\
            <tr><td class="right">商品编码：</td><td>'+ proid + '</td></tr>\
            <tr><td class="right">自动匹配的【详情ID】：</td><td><a href="https://detail.1688.com/offer/'+ fromid + '.html" target="_blank">' + fromid + '</a></td></tr>\
            <tr><td class="right">人工选中的【详情ID】：</td><td><a href="https://detail.1688.com/offer/'+ ManualReview_1688_fromid + '.html" target="_blank">' + ManualReview_1688_fromid + '</a></td></tr>\
        </table>'
        return str;
    },
    b09: function (ManualReview_video_status, proid) {
        let arr = Tool.ManualReview_video_status, str = ""
        for (let i = 0; i < arr.length; i++) {
            str += '\
            <div class="form-check m-3 p-1" style="cursor:pointer;">\
                <input class="form-check-input" type="radio" style="cursor:pointer;" onclick="fun.c05('+ arr[i][0] + ',\'' + proid + '\')" name="exampleRadios" id="exampleRadios' + i + '" ' + (ManualReview_video_status == arr[i][0] ? 'checked' : '') + '>\
                <label class="form-check-label" for="exampleRadios'+ i + '" style="cursor:pointer;">' + arr[i].join(".") + '</label>\
            </div>'
        }
        return str

    },
    b10: function () {
        let arr = [];
        if (obj.params.searchword != "") {
            switch (obj.params.field) {
                case "1": arr.push("@.proid='" + obj.params.searchword + "'"); break;//商品编码
                case "2": arr.push("@.fromid=" + obj.params.searchword); break;//自动匹配的【详情ID】
                case "3": arr.push("@.ManualReview_1688_fromid=" + obj.params.searchword); break;//手动选中的【详情ID】
            }
        }
        if (obj.params.ManualReview_video_status != "") { arr.push("@.ManualReview_video_status=" + obj.params.ManualReview_video_status); }
        if (obj.params.ManualReview_1688 != "") { arr.push("@.ManualReview_1688=" + obj.params.ManualReview_1688); }
        return (arr.length == 0 ? "" : " where " + arr.join(" and "));
    },
    b11: function (pic) {
        let html = "";
        if (pic != 0) {
            html = "\
            <a href=\"https://image.dhgate.com/webp/m/0x0/" + pic.picB.fileurl + "\" target=\"_blank\">\
                <img src=\"https://image.dhgate.com/webp/m/200x200/"+ pic.picB.fileurl + "\" class=\"img-fluid rounded\">\
            </a>"
        }
        return html
    },
    //////////////////////////////////////////////////////
    c01: function (val) {
        let name = this.b02("" + val);
        $("#Field").html(name).val(val);
    },
    c02: function () {
        let Field = $("#Field").val(), searchword = Tool.Trim($("#searchword").val());
        if (searchword) {
            searchword = encodeURIComponent(searchword);
            Tool.main(obj.arr[3] + "/1/" + Field + "/" + searchword);
        }
        else {
            alert("请输入搜索内容");
        }
    },
    c03: function (name, val) {
        if (val == "-1") {
            Tool.openR("?jsFile=js24");
        }
        else {
            Tool.open(name, val);
        }
    },
    c04: function (name, val) {
        if (val == "-1") {
            Tool.openR("?jsFile=js18");
        }
        else {
            Tool.open(name, val);
        }
    },
    c05: function (ManualReview_video_status, proid) {
        let data = [{
            action: "sqlite",
            database: "1688",
            sql: "update @.product set @.ManualReview_video_status=" + ManualReview_video_status + " where @.proid='" + proid + "'",
        }]
        Tool.ajax.a01(data, Tool.reload)
    },
}
fun.a01();