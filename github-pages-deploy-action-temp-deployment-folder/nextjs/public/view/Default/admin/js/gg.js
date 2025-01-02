'use strict';
frameElement._DialogArguments.addEventListener("message", function (e)//接收消息
{
    if (e.data.cmd == "return-rendie-com") {
        gg.Return(e.data)
    }
}, false);
var gg =
{
    obj: {
        windowId: 0,
        IDurl: "",
        next: null,
        This: null,
        t: null,
    },
    postMessage: function (next, This, t, oo)//开始
    {
        if (this.obj.This == null) {
            oo.windowId = this.obj.windowId;
            oo.cmd = oo.cmd ? oo.cmd : 'content-script-rendie-com';
            oo.IDurl = Tool.urlToName(location.href) + "-" + oo.windowId
            ////////////////////////////        
            this.obj.IDurl = oo.IDurl
            this.obj.next = next
            this.obj.This = This
            this.obj.t = t
            frameElement._DialogArguments.postMessage(oo, '*');
        }
        else {
            alert("有代码在执行，还没出来。---------------应该到了不这里。")
        }
    },
    Return: function (data)//返回
    {
        if (data.IDurl == this.obj.IDurl) {
            if (data.return && data.return.status == "error") {
                Tool.pre(["rendie插件出错：", data])
            }
            else {
                if (this.obj.windowId == 0) { this.obj.windowId = data.return; }//因为每次执行，都会用【gg.isRD】初始化,所以返回第一个值是定是【windowId】
                let next = this.obj.next, This = this.obj.This, t = this.obj.t;
                this.obj.next = null;
                this.obj.This = null;
                this.obj.t = null;
                next.apply(This, [data.return, t]);
            }
        }
    },
    //////////////////////////////////////////////////////////////////////
    //删除后创建再查找(返回网页内容)         gg.tabs_remove_create_indexOf(2,"https://www.aliexpress.com/item/1005002156462954.html","找到我，就返回",true,this.c01,this,"aaaa")
    //isHighlightTab    true:表示选中【第一个选项卡】，否则不选中。
    //htmlArr           不填这个属性，那就是页面加载完就返回。（有的时后是不需要网页回载完的。）
    tabs_remove_create_indexOf: function (index, url, htmlArr, isHighlightTab, next, This, t) {
        let oo = { action: "tabs_remove_create_indexOf", index: index, url: url, htmlArr: htmlArr, isHighlightTab: isHighlightTab }
        this.postMessage(next, This, t, oo)
    },
    //执行js代码后再找内容(返回网页内容)      gg.tabs_executeScript_indexOf(2,["jquery"],"执行代码","找到我就返回",true,this.c01,this,"xxxx")
    tabs_executeScript_indexOf: function (index, fileArr, code, htmlArr, isHighlightTab, next, This, t) {
        let oo = { action: "tabs_executeScript_indexOf", index: index, fileArr: fileArr, code: code, htmlArr: htmlArr, isHighlightTab: isHighlightTab }
        this.postMessage(next, This, t, oo)
    },
    //执行js代码(直接返回执行后的内容)      gg.tabs_executeScript(2,"加载js文件","执行代码",this.c01,this,"xxxx")
    tabs_executeScript: function (index, file, code, isHighlightTab, next, This, t) {
        let oo = { action: "tabs_executeScript", index: index, file: file, code: code, isHighlightTab: isHighlightTab }
        this.postMessage(next, This, t, oo)
    },
    ////////////////////////////////////////////////////////////////
    //删除所有Cookies                 gg.delAllCookies(["https://dhgate.com/","https://seller.dhgate.com/"], this.a04, this)
    delAllCookies: function (urlArr, next, This, t)//删除所有cookie
    {
        let oo = { action: "delAllCookies", urlArr: urlArr }
        this.postMessage(next, This, t, oo)
    },
    //批量设置Cookies                 gg.setAllCookies(格式在【gg.getAllCookies】里面, this.a04, this)
    setAllCookies: function (cookiesArr, next, This, t) {
        //参考：https://blog.csdn.net/zhangying1994/article/details/88375123
        /////////////把【gg.getAllCookies】获取到的Cookies,转换成要设置的Cookies////////////////////////////
        let param = [];
        for (let i = 0; i < cookiesArr.length; i++) {
            for (let j = 0; j < cookiesArr[i].cookies.length; j++) {
                param.push({
                    url: cookiesArr[i].url,
                    domain: cookiesArr[i].cookies[j].domain,//可以共享二级域名
                    ////////////////////////////
                    path: cookiesArr[i].cookies[j].path,
                    sameSite: cookiesArr[i].cookies[j].sameSite,
                    secure: cookiesArr[i].cookies[j].secure,
                    name: cookiesArr[i].cookies[j].name,
                    value: cookiesArr[i].cookies[j].value,
                    storeId: cookiesArr[i].cookies[j].storeId,
                    //session: cookiesArr[i].cookies[j].session,(注：这个不能加进去，否则出错)
                    //hostOnly: cookiesArr[i].cookies[j].hostOnly,(注：这个不能加进去，否则出错)
                    httpOnly: cookiesArr[i].cookies[j].httpOnly
                })
                //有些cookies没有超时时间
                if (cookiesArr[i].cookies[j].expirationDate) {
                    //超时时间小于当前时间减一天
                    let day = 1000 * 60 * 24
                    if (cookiesArr[i].cookies[j].expirationDate < new Date().getTime() / 1000 - day) {
                        param[param.length - 1].expirationDate = new Date().getTime() / 1000 + day;//加一天再超时
                    }
                    else {
                        param[param.length - 1].expirationDate = cookiesArr[i].cookies[j].expirationDate;//不变
                    }
                }
            }
        }
        let oo = { action: "setAllCookies", cookiesArr: param }
        this.postMessage(next, This, t, oo)
    },
    ///////////////////////////////////////////////////////
    //高亮tab				gg.highlightTab(2,this.c01,this,"xxxx")
    highlightTab: function (index, next, This, t) {
        let oo = { action: "highlightTab", index: index }
        this.postMessage(next, This, t, oo)
    },
    //初始化					gg.isRD(this.c01,this,"xxxx")
    isRD: function (next, This, t) {
        if (frameElement._DialogArguments.rendie_com) {
            let oo = { action: "isRD" }
            this.postMessage(next, This, t, oo)
        }
        else {
            Tool.Modal("提示", "<p>请使用【Chrome浏览器】中的【RenDie插件】。<p>", '<button type="button" class="btn btn-primary" data-bs-dismiss="modal">知道了</button>', '')
        }
    },
    //下载文件          gg.download(oo.blobPic, filename, this.a05, this, oo)
    download: function (url, filename, next, This, t) {
        let oo = { action: "download", url: url, filename: filename }
        this.postMessage(next, This, t, oo);
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    //例1：gg.notifications("标题","内容","https://rendie.com/view/Default/admin/img/%E9%A6%96%E9%A1%B5/logo.jpg",this.xxx,this,"ccccc")
    //例2：gg.notifications("标题",[{title: "Item1", message: "这是项目一。"},{title: "Item2", message: "这是项目二。"}],"https://rendie.com/view/Default/admin/img/%E9%A6%96%E9%A1%B5/logo.jpg",this.xxx,this,"ccccc")//注：最多4条项目
    notifications: function (title, message, iconUrl, next, This, t) //桌面通知
    {
        let oo = { action: "notifications", title: title, message: message, iconUrl: iconUrl }
        this.postMessage(next, This, t, oo)
    },
    //查找(返回网页内容)        gg.tabs_indexOf(2,"找到我，就返回",this.c01,this,"aaaa")
    //使用场景：有的网站，必须要刷新一下才能使用。
    //tabs_indexOf: function (index, html, next, This, t, isHighlightTab) {
    //    let oo = { action: "tabs_indexOf", index: index, html: html, isHighlightTab: isHighlightTab }
    //    this.postMessage(next, This, t, oo)
    //},
    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////
    //获取一个网址的所有cookies       gg.getAllCookies(["https://dhgate.com/","https://seller.dhgate.com/"],this.a04,this)
    getAllCookies: function (urlArr, next, This, t) {
        let oo = { action: "getAllCookies", urlArr: urlArr }
        this.postMessage(next, This, t, oo);
    },
    ////////////////////////////////////////////
    //获取一个网址的一个cookies                      gg.getCookies("http://10.168.1.159/","token",this.a04,this)
    getCookies: function (url, name, next, This, t) {
        let oo = { action: "getCookies", url: url, name: name };
        this.postMessage(next, This, t, oo);
    },
    //设置一个网址的一个cookies                      gg.setCookies("https://www.aliexpress.com/","aep_usuc_f","site=glo&c_tp=USD&region=SE&b_locale=en_US",this.a04,this)
    setCookies: function (url, name, value, next, This, t) {
        let oo = { action: "setCookies", url: url, name: name, value: value };
        this.postMessage(next, This, t, oo);
    },
    //删除一个网址的一个cookies                      gg.delCookies("http://10.168.1.159/","token",this.a04,this)
    delCookies: function (url, name, next, This, t)//删除cookie
    {
        let oo = { action: "delCookies", url: url, name: name }
        this.postMessage(next, This, t, oo)
    },
}
//////////////////////////////////////////////////////
// //返回所有Headers信息     gg.tabs_remove_create_getHeaders(2,"https://pifa.pinduoduo.com/",["https://pifa.pinduoduo.com/pifa/user/queryUserInfo"],isHighlightTab,this.d02,this)
// tabs_remove_create_getHeaders: function (index, url, filterUrlArr, isHighlightTab, next, This, t) {
//     let oo = { action: "tabs_remove_create_getHeaders", index: index, url: url, filterUrlArr: filterUrlArr, isHighlightTab: isHighlightTab }
//     this.postMessage(next, This, t, oo)
// },
// //先执行js后，再获得某个url的Headers信息。（比如：Shopee翻页的页码，就在Headers信息中。）
// tabs_executeScript_getHeaders: function (index, code, filterUrlArr, isHighlightTab, next, This, t) {
//     let oo = { action: "tabs_executeScript_getHeaders", index: index, code: code, filterUrlArr: filterUrlArr, isHighlightTab: isHighlightTab }
//     this.postMessage(next, This, t, oo)
// },
//返回监听url的内容。(浏览器必须打开调试模式。即F12)
//gg.getNetwork(this.c01,this,"xxxx")
//getNetwork: function (next, This, t) {
//    let oo = { action: "getNetwork", cmd: "devtools" }
//    this.postMessage(next, This, t, oo)
//},
////监听url(包含)。(浏览器必须打开调试模式。即F12)
//setNetwork: function (url, next, This, t) {
//    let oo = { action: "setNetwork", cmd: "devtools", url: url }
//    this.postMessage(next, This, t, oo)
//},
/*
//图片转base64	gg.imgToBase64("https://rendie.com/view/Default/html/product/img/logo/logo.png",this.a02,this,"xxxxx")
imgToBase64:function(src,next,This,t)
{
    let oo={action:"imgToBase64",src:src}
    this.postMessage(next,This,t,oo)
},
//创建或更新后再查找(返回网页内容)         gg.tabs_create_update_indexOf(2,"https://www.aliexpress.com/item/1005002156462954.html","找到我，就返回",this.c01,this,"aaaa")
tabs_create_update_indexOf:function(index,url,html,next,This,t) 
{
    let oo={action:"tabs_create_update_indexOf",index:index,url:url,html:html}
    this.postMessage(next,This,t,oo)
},
//gg.resetProxy("fun.c01")
  resetProxy:function()
  {
    frame.postMessage({cmd: 'content-script',code: "fun.resetProxy()"}, '*');  
  },
  //gg.proxy(config,"fun.c01")
  proxy:function(url,next)
  {
        //url=HTTPS hkbgp.mssstatic.com:55443;HTTPS node1134664662.api.steamgamepowered.com:19443;HTTPS PP1134664662.netvigatorscdn.com:22443;
    frame.postMessage({cmd: 'content-script',code: "fun.proxy(\""+url+"\",\""+next+"\",\""+this.b01()+"\")"}, '*');  
  },

  
  //gg.executeScript(2,"","document.body.parentNode.outerHTML;","fun.c01")//运行代码
  executeScript:function(index,file,code,next)
  {
    frame.postMessage({cmd: 'content-script',code: "fun.executeScript("+index+",'"+file+"',decodeURI(\""+encodeURI(code)+"\"),'"+next+"',"+this.windowId+",'"+this.b01()+"')"}, '*'); 
  },
  //gg.statusComplete(2,"F1.Glogin4")
  statusComplete:function(index,next)//提交后，看有没有加载完成。。。
  {
    frame.postMessage({cmd: 'content-script',code: "fun.statusComplete("+index+",'"+next+"',"+this.windowId+",'"+this.b01()+"')"}, '*'); 
  },
*/