'use strict';        
var fun =
{
    obj: {},
    a01: function () {
        //top1        顶部第几个
        //top2        选项卡数组
        let menu = Tool.getStorage("menuList");
        if (!menu) {
            this.obj = { top1: 1, top2: null }
        }
        else {
            this.obj=JSON.parse(menu);            
        }
        this.a02(Tool.getStorage("username"))
    },
    a02: function (username) {
        if (username) {
            let str = ""
            for (let i = 0; i < menuList.length; i++) {
                str += '<li><em><span val="' + (i + 1) + '">' + menuList[i].name + '</span></em></li>';
            }
            let html = '\
            <div class="header">\
                <ul class="pannel">\
                <li>\
                    <a class="icon" href="javascript:;" title="搜索">\
                        <svg class="i-search" viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">\
                        <circle cx="14" cy="14" r="12"></circle>\
                        <path d="M23 23 L30 30"></path>\
                        </svg>\
                    </a>\
                </li>\
                <li>\
                    <a class="icon" href="../" title="网站首页（PC版）" target="_blank">\
                        <svg class="i-desktop" viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">\
                        <path d="M10 29 C10 29 10 24 16 24 22 24 22 29 22 29 L10 29 Z M2 6 L2 23 30 23 30 6 2 6 Z"></path>\
                        </svg>\
                    </a>\
                </li>\
                <li>\
                    <a class="icon phone-icon" href="../m.html" title="手机版首页" target="_blank">\
                        <svg class="i-mobile" viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">\
                        <path d="M21 2 L11 2 C10 2 9 3 9 4 L9 28 C9 29 10 30 11 30 L21 30 C22 30 23 29 23 28 L23 4 C23 3 22 2 21 2 Z M9 5 L23 5 M9 27 L23 27"></path>\
                        </svg>\
                    </a>\
                </li>\
                <li>\
                    <a class="icon refresh-icon" onClick="Tool.clearCache($(this))" href="javascript:;" title="更新缓存">\
                        <svg class="i-reload" viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">\
                        <path d="M29 16 C29 22 24 29 16 29 8 29 3 22 3 16 3 10 8 3 16 3 21 3 25 6 27 9 M20 10 L27 9 28 2"></path>\
                        </svg>\
                    </a>\
                </li>\
                <li>\
                    <a class="icon icon-out" href="javascript:" onclick="fun.c01();" title="安全退出">\
                        <svg class="i-signout" viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">\
                        <path d="M28 16 L8 16 M20 8 L28 16 20 24 M11 28 L3 28 3 4 11 4"></path>\
                        </svg>\
                    </a>\
                </li>\
                </ul>\
                <div class="logo p-2">\
                <table>\
                    <tr><td class="w50" rowspan="2"><img class="img" src="/'+ o.path + 'admin/img/首页/logo.jpg"></td><td class="admin p-1">' + username + '</td></tr>\
                    <tr><td class="p-0 color999">超级管理员</td></tr>\
                </table>\
                </div>\
                <div class="navbg"></div>\
                <div class="nav1">\
                    <a class="toggle-btn"><i class="fa fa-bars"></i></a>\
                    <ul>'+ str + '</ul>\
                    <div class="iamhere"></div>\
                    <div class="navbd"></div>\
                </div>\
            </div>\
            <div class="main">\
                <div class="maincontent" style="margin-left:179px;"></div>\
                <div class="menu" style="width:179px;"></div>\
            </div>'
            $("body").html(html);
            $('.nav1 ul li:eq(' + (this.obj.top1 - 1) + ') em span').parent().parent().attr("class", "navon");//顶部选中
            this.a03(this.obj.top1);//打开左侧菜单。
            this.c03();//主菜单，点击事件
        }
        else {
            top.location.href = "/login.html?" + top.location.href;
        }
    },
    a03: function (id) {
        if ($("#menu_" + id).length) {
            $(".menu ul:visible").fadeOut("fast", function () {
                $("#menu_" + id).fadeIn("fast");
            });
        }
        else {
            this.a04(menuList[id - 1].list, id)
        }
    },
    a04: function (oo, id) {
        let html = '';
        for (let i = 0; i < oo.length; i++) {
            if (oo[i]) {
                html += '<li><span value="' + (i + 1) + '">' + oo[i].name + '</span></li>';
            }
            else {
                html += '<li class="menuspace"></li>';
            }
        }
        html = '<ul id="menu_' + id + '" style="display:none;"><li class="menuspace5"></li>' + html + '</ul>'
        $(".menu").append(html);
        this.c02(id);//点击事件    
        if ($(".menu ul:visible").length) {
            $(".menu ul:visible").fadeOut(100, function () { $("#menu_" + id).fadeIn("slow"); });
        }
        else {
            $("#menu_" + id).fadeIn("slow");
            this.a06(oo[0], id);
        }//打开选项卡
    },
    a05: function (url)//保存
    {
        let top2 = this.obj.top2
        for (let k in top2) {
            if (top2[k].isbool) { top2[k].url = url; }
        }
        this.obj.top2 = top2;
        window.localStorage.setItem("menuList", JSON.stringify(this.obj));
        $("iframe:visible").attr('src', url);
    },
    a06: function (oo, id)//打开选项卡
    {
        let top2 = this.obj.top2
        if (!top2)//选项卡[没数据]
        {
            oo.isbool = true
            oo.id = id;
            oo.url = "/" + o.path + "admin/html/" + oo.template;;
            top2 = {};
            top2[id] = oo;
            this.obj.top2 = top2;
            window.localStorage.setItem("menuList", JSON.stringify(this.obj));
        }
        this.a07(top2);
    },
    //显示选项卡
    a07: function (top2) {
        $(".menu ul li span").removeAttr('class');
        let str = "";
        for (let i in top2) {
            if (top2[i].isbool) {
                $(".menu ul li span[value='" + top2[i].id + "']").attr("class", "menucurr")//选中，左边选项卡
                str += '<span value="' + top2[i].id + '" title="' + top2[i].name + '" class="badge bg-secondary pointer">' + top2[i].name + '<a>×</a></span>';
                $(".maincontent iframe:visible").hide();
                let oo = $("#" + Tool.urlToName(top2[i].url))//显示iframe                
                if (oo.length) {
                    oo.show();
                }
                else {
                    this.a08(top2[i].url);//显示内容
                }
            }
            else {
                str += '<span  value="' + i + '" title="' + top2[i].name + '" class="badge bg-light text-dark pointer">' + top2[i].name + '<a>×</a></span>';
            }
        }
        $(".iamhere").html(str);//显示选项卡
        this.c04();//选项卡,点击事件
    },
    a08: function (src) {
        let O = window.document.createElement('iframe');
        O.src = src;
        O.id = Tool.urlToName(src)
        O.allowTransparency = true;
        O.width = "100%";
        O.height = "100%";
        O._DialogArguments = window;
        $(".maincontent").append(O);
    },
    c01: function () {
        Tool.delCookie("adminId");
        Tool.clearStorage();
        window.location.reload();
    },
    c02: function (id)//左侧菜单，点击事件
    {
        let obj2 = $("#menu_" + id + " li span");
        obj2.click(this, function (e) {
            e.data.c07($(this).attr("value"))
        });
    },
    c03: function ()//主菜单，点击事件
    {
        let obj2 = $(".nav1 ul li em span")
        obj2.click(this, function (e) {
            e.data.obj.top1 = obj2.index(this) + 1;
            $(".nav1 ul li").removeAttr('class');
            $(this).parent().parent().attr("class", "navon");
            e.data.a03($(this).attr("val").split(","));
        });
        $('.nav1:eq(0) .toggle-btn').click(this, function (e) {
            if ($(".menu").css("left") == "-179px") {
                $(".maincontent").animate({ marginLeft: "179px" })
                $(".menu").animate({ left: "0px" })
            }
            else {
                $(".menu").animate({ left: "-179px" });
                $(".maincontent").animate({ marginLeft: "0px" })
            }
        });
    },
    c04: function ()//选项卡,点击事件
    {
        $(".iamhere span").click(this, function (e) {
            $(".iamhere span").attr('class', 'badge bg-light text-dark pointer');
            $(this).attr('class', 'badge bg-secondary pointer');
            /////////////////////////////////////////////////////////////
            let id = $(this).attr("value"), top2 = e.data.obj.top2;
            for (let k in top2) {
                if (top2[k].isbool) { top2[k].isbool = false; break; }
            }
            e.data.obj.top2[id].isbool = true;
            window.localStorage.setItem("menuList", JSON.stringify(e.data.obj));
            let url = e.data.obj.top2[id].url
            $(".maincontent iframe:visible").hide();
            let oo = $("#" + Tool.urlToName(url))
            if (oo.length) { oo.show() } else { e.data.a08(url); }
        })
        $(".iamhere span a").click(this, function (ee)//关闭窗口
        {
            let e = window.event || ee;
            if (e.stopPropagation) { e.stopPropagation(); } else { e.cancelBubble = true; }
            let top2 = ee.data.obj.top2;
            let len = Object.keys(top2).length
            if (len == 1) {
                window.open("about:blank", "_self").close();
            }
            else {
                $(this).parent().remove();
                ee.data.c05($(this).parent().attr("value"), top2, len)//关闭窗口
            }
        })
    },
    c05: function (id, top2, len)//关闭窗口
    {
        let I1 = 0, isbool = false;
        //删除iframe
        for (let k in top2) {
            if (id == k) {
                isbool = top2[k].isbool;
                $("#" + Tool.urlToName(top2[k].url)).remove();
                break;
            };
            I1++;
        }//要删除的位置
        delete (top2[id]);
        this.c06(isbool, I1, len, top2);
    },
    c06: function (isbool, I1, len, top2)//页面点击事件
    {
        let I2 = 0, url = "";
        if (isbool)//是否为当前位置
        {
            if (I1 + 1 >= len) { I1--; }//删除的位置为大于最大时
            for (let k in top2) {
                if (I1 == I2) {
                    $('.iamhere span[value="' + top2[k].id + '"]').attr('class', 'badge bg-secondary pointer');//要选中的
                    top2[k].isbool = true;
                    url = top2[k].url;
                    break;
                }
                I2++;
            }
            this.obj.top2 = top2;
            let oo2 = $("#" + Tool.urlToName(url));
            if (oo2.length) { oo2.show(); } else { this.a08(url); }
        }
        window.localStorage.setItem("menuList", JSON.stringify(this.obj));
    },
    c07: function (value)//页面点击事件
    {
        let top2 = this.obj.top2;
        for (let k in top2) { top2[k].isbool = false; }//所有为flase  
        let oo = menuList[this.obj.top1 - 1].list[parseInt(value) - 1];
        let url = "/" + o.path + "admin/html/" + oo.template;
        top2[value] = { name: oo.name, id: value, isbool: true, url: url };
        this.obj.top2 = top2;
        window.localStorage.setItem("menuList", JSON.stringify(this.obj));
        this.a07(top2);
    }
}
fun.a01();