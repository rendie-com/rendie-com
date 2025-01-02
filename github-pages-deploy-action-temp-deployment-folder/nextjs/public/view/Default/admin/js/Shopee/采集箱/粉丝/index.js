'use strict';
var fun =
{
    a01: function () {
        obj.params.jsFile = obj.params.jsFile ? obj.params.jsFile : ""//选择JS文件
        obj.params.page = obj.params.page ? parseInt(obj.params.page) : 1;//翻页  
        obj.params.site = obj.params.site ? obj.params.site : 'tw'//站点
        obj.params.dbname = obj.params.dbname ? obj.params.dbname : '001'//数据库名        
        obj.params.field = obj.params.field ? obj.params.field : '1'//搜索字段
        obj.params.searchword = obj.params.searchword ? Tool.Trim(obj.params.searchword) : "";//搜索关键词
        ////////////////////////////////////////    
        obj.params.follow_count = obj.params.follow_count ? obj.params.follow_count : ''//我关注次数  
        obj.params.notFollow_count = obj.params.notFollow_count ? obj.params.notFollow_count : ''//我取关次数  
        obj.params.is_following = obj.params.is_following ? obj.params.is_following : ''//是否关注我  
        obj.params.is_my_following = obj.params.is_my_following ? obj.params.is_my_following : ''//是否我关注       
        obj.params.time = obj.params.time ? obj.params.time : ''//时间    
        this.a02();
    },
    a02: function () {
        let data = [{
            action: "fs",
            fun: "access_sqlite",
            database: "shopee/采集箱/粉丝/" + obj.params.site + "/" + obj.params.dbname,
            mode: 0,
            elselist: [{
                action: "fs",
                fun: "download_sqlite",
                urlArr: ["https://github.com/rendie-com/rendie-com/releases/download/1/shopee_gather_fans_" + obj.params.site + "_" + obj.params.dbname+ ".db","https://github.com/rendie-com/rendie-com/releases/download/2/shopee_gather_fans_" + obj.params.site + "_" + obj.params.dbname+ ".db"],
                database: "shopee/采集箱/粉丝/" + obj.params.site + "/" + obj.params.dbname
            }]
        }]
        Tool.ajax.a01(data, this.a03, this);
    },
    a03: function (t) {
        let where = this.b03()
        let data = [{
            action: "sqlite",
            database: "shopee/采集箱/粉丝/" + obj.params.site + "/" + obj.params.dbname,
            sql: "select count(1) as total FROM @.table" + where,
        }, {
            action: "sqlite",
            database: "shopee/采集箱/粉丝/" + obj.params.site + "/" + obj.params.dbname,
            sql: "select " + Tool.fieldAs("id,last_active_time,follow_time,userid,shopid,status,follow_count,notFollow_count,is_preferred_plus,is_official_shop,is_shopee_verified,is_following,is_my_following,is_seller,portrait,shopname,username") + " FROM @.table" + where + this.b14() + Tool.limit(10, obj.params.page, "sqlite"),
        }]
        Tool.ajax.a01(data, this.a04, this);
    },
    a04: function (t) {
        let html1 = "", arr = t[1]
        for (let i = 0; i < arr.length; i++) {
            html1 += '\
            <tr>\
                <td>'+ arr[i].userid + '</td>\
                <td>'+ arr[i].shopid + '</td>\
                <td>'+ this.b04(arr[i].portrait) + '</td>\
                <td  class="p-0">'+ this.b08(arr[i].shopname, arr[i].username) + '</td>\
                <td>'+ arr[i].follow_count + ' 次</td>\
                <td>'+ arr[i].notFollow_count + ' 次</td>\
                <td>'+ (arr[i].is_following ? '是' : '否') + '</td>\
                <td>'+ (arr[i].is_my_following ? '是' : '否') + '</td>\
                <td>'+ arr[i].status + '</td>\
                <td>'+ (arr[i].is_preferred_plus ? 'preferred+' : '') + '</td>\
                <td>'+ (arr[i].is_official_shop ? '官方店' : '') + '</td>\
                <td>'+ (arr[i].is_shopee_verified ? '已验证' : '') + '</td>\
                <td>'+ (arr[i].is_seller ? "已开店" : "") + '</td>\
                <td class="p-0">'+ this.b07(arr[i].last_active_time, arr[i].follow_time, arr[i].id) + '</td>\
            </tr>'
        }
        let html = Tool.header2(obj.params.jsFile, obj.params.site) + '\
        <div class="p-2">\
            '+ Tool.header3(obj.params.jsFile, obj.params.site) + this.b06() + '\
        	<table class="table align-middle table-hover center">\
        		<thead class="table-light">'+ this.b01() + '</thead>\
        		<tbody>'+ html1 + '</tbody>\
        	</table>\
            ' + Tool.page(t[0][0].total, 10, obj.params.page) + '\
        </div>'
        Tool.html(null, null, html)
    },
    //////////////////////////////////////////////
    b01: function () {
        let html = '\
        <tr>\
          <th style="padding-left:25px;position: relative;">'+ this.b02() + '用户ID</th>\
          <th>店铺ID</th>\
          <th>头像</th>\
          <th>名称</th>\
          <th class="p-0">'+ this.b09("follow_count", obj.params.follow_count) + '</th>\
          <th class="p-0">'+ this.b10("notFollow_count", obj.params.notFollow_count) + '</th>\
          <th class="p-0">'+ this.b11("is_following", obj.params.is_following) + '</th>\
          <th class="p-0">'+ this.b12("is_my_following", obj.params.is_my_following) + '</th>\
          <th>状态</th>\
          <th>preferred+</th>\
          <th>官方店</th>\
          <th>是否已验证</th>\
          <th>是否开店</th>\
          <th class="w200 p-0">'+ this.b13("time", obj.params.time) + '</th>\
        </tr>'
        return html;
    },
    b02: function () {
        return '\
        <button title="操作" class="menu-button" data-bs-toggle="dropdown" aria-expanded="false"><div></div><div></div><div></div></button>\
		<ul class="dropdown-menu">\
            <li onClick="Tool.openR(\'?jsFile=js06&site='+ obj.params.site + '\');"><a class="dropdown-item pointer">*从店铺中获取粉丝</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js07&site='+ obj.params.site + '\');"><a class="dropdown-item pointer">*取消关注和关注</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js08&site='+ obj.params.site + '\');"><a class="dropdown-item pointer">*获取关注我的用户</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js09&site='+ obj.params.site + '\');"><a class="dropdown-item pointer">*获取我关注的用户</a></li>\
            <li onClick="Tool.openR(\'?jsFile=js10&table=table&database=shopee/采集箱/粉丝/' + obj.params.site + '&count=100&field=rd_userid\');"><a class="dropdown-item pointer">把一个db文件拆分成多个db文件</a></li>\
		</ul>'
    },
    b03: function () {
        let arr = [];
        if (obj.params.searchword) {
            switch (obj.params.field) {
                case "1": arr.push("@.userid=" + obj.params.searchword); break;//用户ID
                case "2": arr.push("@.shopid=" + obj.params.searchword); break;//店铺ID
                case "3": arr.push("@.shopname like '%" + obj.params.searchword + "%'"); break;//店铺名称
                case "4": arr.push("@.username like '%" + obj.params.searchword + "%'"); break;//用户名称
            }
        }
        if (obj.params.follow_count) { arr.push("@.follow_count=" + obj.params.follow_count); }
        if (obj.params.notFollow_count) { arr.push("@.notFollow_count=" + obj.params.notFollow_count); }
        if (obj.params.is_following) { arr.push("@.is_following=" + obj.params.is_following); }
        if (obj.params.is_my_following) { arr.push("@.is_my_following=" + obj.params.is_my_following); }
        if (obj.params.time) {
            let time = Tool.gettime("")
            switch (obj.params.time) {
                case "2": arr.push("@.last_active_time<" + (time - 60 * 60 * 24 * 100)); break;//100天
                case "3": arr.push("@.last_active_time<" + (time - 60 * 60 * 24 * 200)); break;//200天
                case "4": arr.push("@.last_active_time<" + (time - 60 * 60 * 24 * 365)); break;//365年
            }
        }
        return (arr.length == 0 ? "" : " where " + arr.join(" and "));
    },
    b04: function (pic) {
        let html1 = '<svg width="60" height="60" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.3006 22.9244C9.46232 21.0581 7.57895 17.8427 7.57895 14.2105V10.4211C7.57895 4.68947 12.2665 0 18 0C23.7316 0 28.4211 4.68947 28.4211 10.4211V14.2105C28.4211 17.8484 26.532 21.0695 23.6842 22.9339V22.9263L34.8537 27.7389C35.551 28.0383 36 28.7242 36 29.4783V34.1053C36 35.1474 35.1474 36 34.1053 36H1.89474C0.852632 36 0 35.1474 0 34.1053V29.4783C0 28.7242 0.449053 28.0383 1.14442 27.7389L12.3158 22.9263L12.3006 22.9244Z" fill="#EE4D2D"></path></svg>'
        let html2 = "\
        <a href=\"https://s-cf-sg.shopeesz.com/file/" + pic + "\" target=\"_blank\">\
            <img src=\"https://s-cf-sg.shopeesz.com/file/"+ pic + "_tn\" class=\"img-fluid w60\" style=\"border-radius:50%;\">\
        </a>"
        return pic ? html2 : html1;
    },
    b05: function (val) {
        let name = "";
        switch (val) {
            case "1": name = "用户ID"; break;
            case "2": name = "店铺ID"; break;
            case "3": name = "店铺名称"; break;
            case "4": name = "用户名"; break;
            default: name = "未知：" + val;
        }
        return name
    },
    b06: function () {
        return '\
        <div class="input-group w-50 m-2">\
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="dbname" value="'+ obj.params.dbname + '">【' +  obj.params.dbname + '】库数库</button>\
            '+this.b15(obj.params.dbname)+'\
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="field" value="'+ obj.params.field + '">' + this.b05(obj.params.field) + '</button>\
            <ul class="dropdown-menu">\
                <li class="dropdown-item pointer" onclick="fun.c01(1)">用户ID</li>\
                <li class="dropdown-item pointer" onclick="fun.c01(2)">店铺ID</a></li>\
                <li class="dropdown-item pointer" onclick="fun.c01(3)">店铺名称</a></li>\
                <li class="dropdown-item pointer" onclick="fun.c01(4)">用户名称</a></li>\
            </ul>\
            <input type="text" class="form-control" id="searchword" value="'+ obj.params.searchword + '" onKeyDown="if(event.keyCode==13) fun.c02();">\
            <button class="btn btn-outline-secondary" type="button"onclick="fun.c02();">搜索</button>\
        </div>'
    },
    b07: function (last_active_time, follow_time, id) {
        return '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="最后活跃时间">'+ Tool.js_date_time2(last_active_time) + '</td></tr>\
            <tr><td title="关注时间" class="p-0"><input type="text" class="form-control center" value="'+ Tool.js_date_time2(follow_time) + '" onblur="fun.c03($(this),' + follow_time + ',' + id + ')"></td></tr>\
        </table>'
    },
    b08: function (shopname, username) {
        return '\
        <table class="table mb-0 table-bordered">\
            <tr><td title="店铺名"><b>'+ shopname + '</b></td></tr>\
            <tr><td title="用户名">'+ username + '</td></tr>\
        </table>'
    },
    b09: function (name, val) {
        return '\
        <select onchange="Tool.open(\''+ name + '\',this.options[this.selectedIndex].value)" class="form-select">\
            <option value="">我关注次数</option>\
            <option value="0" ' + (val == "0" ? 'selected="selected"' : '') + '>0 次</option>\
            <option value="1" ' + (val == "1" ? 'selected="selected"' : '') + '>1 次</option>\
            <option value="2" ' + (val == "2" ? 'selected="selected"' : '') + '>2 次</option>\
        </select>'
    },
    b10: function (name, val) {
        return '\
        <select onchange="Tool.open(\''+ name + '\',this.options[this.selectedIndex].value)" class="form-select">\
            <option value="">我取关次数</option>\
            <option value="0" ' + (val == "0" ? 'selected="selected"' : '') + '>0 次</option>\
            <option value="1" ' + (val == "1" ? 'selected="selected"' : '') + '>1 次</option>\
            <option value="2" ' + (val == "2" ? 'selected="selected"' : '') + '>2 次</option>\
        </select>'
    },
    b11: function (name, val) {
        return '\
        <select onchange="Tool.open(\''+ name + '\',this.options[this.selectedIndex].value)" class="form-select">\
            <option value="">是否关注我</option>\
            <option value="0" ' + (val == "0" ? 'selected="selected"' : '') + '>否</option>\
            <option value="1" ' + (val == "1" ? 'selected="selected"' : '') + '>是</option>\
        </select>'
    },
    b12: function (name, val) {
        return '\
        <select onchange="Tool.open(\''+ name + '\',this.options[this.selectedIndex].value)" class="form-select">\
            <option value="">是否我关注</option>\
            <option value="0" ' + (val == "0" ? 'selected="selected"' : '') + '>否</option>\
            <option value="1" ' + (val == "1" ? 'selected="selected"' : '') + '>是</option>\
        </select>'
    },
    b13: function (name, val) {
        return '\
        <select onchange="Tool.open(\''+ name + '\',this.options[this.selectedIndex].value)" class="form-select">\
            <option value="">时间</option>\
            <option value="1" ' + (val == "1" ? 'selected="selected"' : '') + '>最后活跃时间_升序</option>\
            <option value="2" ' + (val == "2" ? 'selected="selected"' : '') + '>最后活跃时间_升序&lt;100天前</option>\
            <option value="3" ' + (val == "3" ? 'selected="selected"' : '') + '>最后活跃时间_升序&lt;200天前</option>\
            <option value="4" ' + (val == "4" ? 'selected="selected"' : '') + '>最后活跃时间_升序&lt;365天前</option>\
            <option value="5" ' + (val == "5" ? 'selected="selected"' : '') + '>关注时间_倒序</option>\
       </select>'
    },
    b14: function () {
        let where = "";
        if (obj.params.time) {
            switch (obj.params.time) {
                case "1":
                case "2":
                case "3":
                case "4":
                    where = " order by @.last_active_time asc"; break;//
                case "2": where = " order by @.follow_time desc"; break;//
            }
        }
        return where;
    },
    b15: function () {
        let str='',dbname;
        for(let i=0;i<100;i++){
            dbname=(i+1).toString().padStart(3, '0')
            str+='<li class="dropdown-item pointer" onclick="fun.c05(\''+dbname+'\')">【'+dbname+'】</li>'
        }
        return '<ul class="dropdown-menu">'+str+'</ul>'
    },
    ///////////////////////////
    c01: function (val) {
        let name = this.b05("" + val)
        $("#field").html(name).val(val)
    },
    c02: function () {
        let field = $("#field").val(), searchword = Tool.Trim($("#searchword").val());
        if ((field == "1" || field == "2") && isNaN(searchword)) {
            alert("【商品ID】或【商品ID】必须是数字。")
        }
        else if (searchword) {
            Tool.main("?jsFile=" + obj.params.jsFile + "&site=" + obj.params.site + "&page=1&field=" + field + "&searchword=" + searchword);
        } else { alert("请输入搜索内容"); }
    },
    c03: function (This, val, id) {
        This.attr("disabled", true);
        const timestamp = new Date(This.val()).getTime() / 1000;
        if (timestamp != val && val != "") {
            let data = [{
                action: "sqlite",
                database: "shopee/采集箱/粉丝/" + obj.params.site + "/" + obj.params.dbname,
                sql: "update @.table set @.follow_time=" + timestamp + " where @.id=" + id,
            }]
            Tool.ajax.a01(data, this.c04, this, This);
        }
    },
    c04: function (t, This) {
        if (t[0].length == 0) {
            This.attr("disabled", false);
        }
        else { Tool.pre(["出错", t]); }
    },
    c05: function (val) {
        Tool.open('dbname',val)
    },
}
fun.a01();