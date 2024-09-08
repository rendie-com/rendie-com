'use strict';
var fun =
{
    a01: function () {
        let This = this;
        chrome.runtime.onMessage.addListener(function (request, sender, next) {
            if (request.cmd == 'content-script')//表是只接收【content-script】的信息。
            {
                if (request.action == "isRD") {
                    chrome.tabs.getSelected(null, function (tab) { next(tab.windowId); });//获取当前窗体【windowId】
                }
                else {
                    if (request.windowId != 0) {
                        This.c01(request, next)
                    } else {
                        alert("谷歌扩展中【windowId】未初始化，请先运行“gg.isRD”方法。")
                        //Tool.notifications("未初始化", "谷歌扩展中【windowId】未初始化，请先运行“gg.isRD”方法。", chrome.runtime.getURL('img/icon256.png'), next);
                    }
                }
            }
            return true;//注：不写这个会出错，内容为【Unchecked runtime.lastError: The message port closed before a response was received.】
        });

    },
    c01: function (request, next) {
        switch (request.action) {
            /////////////common_executeScript.js 开始////////////////////////////////
            case "tabs_remove_create_indexOf"://删除后创建再查找(返回网页内容) ---------已验证
                Tool.tabs_remove_create_indexOf.a01(request.index, request.windowId, request.url, request.html, request.isHighlightTab, next);
                break;
            case "tabs_executeScript_indexOf"://执行js代码后再找内容(返回网页内容)---------已验证
                Tool.tabs_executeScript_indexOf.a01(request.index, request.windowId, request.file, request.code, request.html, request.isHighlightTab, next);
                break;
            case "tabs_executeScript": //执行js代码(立马返回值取到的内容) --------已验证
                Tool.tabs_executeScript.a01(request.index, request.windowId, request.file, request.code, request.isHighlightTab, next);
                break;
            case "tabs_remove_create_getHeaders"://获取所有Headers信息---------已验证
                Tool.tabs_remove_create_getHeaders.a01(request.index, request.windowId, request.url, request.filterUrlArr, request.isHighlightTab, next);
                break;
            case "tabs_executeScript_getHeaders"://先执行js后，再获得某个url的Headers信息。（比如：Shopee翻页的页码，就在Headers信息中。）
                Tool.tabs_executeScript_getHeaders.a01(request.index, request.windowId, request.code, request.filterUrlArr, request.isHighlightTab, next);
                break;
            ///////////common_executeScript.js 结束/////////////////////////////////////////////
            ///////////common_cookies.js  开始/////////////////////////////////////////////////////
            case "delAllCookies": Tool.delAllCookies(request.urlArr, next); break;//删除所有cookie信息---------已验证
            case "setAllCookies": Tool.setAllCookies(request.cookiesArr, next); break;//设置所有cookie信息---------已验证
            case "getAllCookies": Tool.getAllCookies(request.urlArr, [], next); break;//获取所有cookie信息--------已验证
            //case "getCookies": Tool.getCookies(request); break;//获取单个cookie信息
            //case "setCookies": Tool.setCookies(request); break;//设置单个cookie信息
            //case "delCookies": Tool.delCookies(request); break;//删除单个cookie信息
            //////////common_cookies.js  结束//////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////
            case "getHtml": Tool.getHtml(request.url, next); break;//获取URL内容---------已验证
            case "postHtml": Tool.postHtml(request.url, request.data, next); break;//普通提交（返回的内容不一定是json格式）---------已验证
            case "typeHtml": Tool.typeHtml(request.url, request.type, request.data, next); break;//指定类型提交
            case "download": Tool.download(request.url, request.filename, next); break; //下载文件---------已验证
            case "uploadFile": Tool.uploadFile.a01(request.url, request.headers, request.data, next); break;//上传文件------已验证
            case "highlightTab": Tool.highlightTab.a01(request.index, request.windowId, next); break;//高亮tab------已验证
            case "setHeaders_getHtml"://设置Headers信息get请求返回html（要给Headers参数，可以修改Origin参数）-----已验证
                Tool.setHeaders_getHtml.a01(request.url, request.headers, next);
                break;
            case "setHeaders_postHtml"://设置Headers信息post请求返回json（要给Headers参数，可以修改Origin参数）------已验证
                Tool.setHeaders_postHtml.a01(request.url, request.headers, request.data, next);
                break;
            case "notifications": Tool.notifications(request.title, request.message, request.iconUrl, next); break;//通知------已验证
            default: alert("在【background.js】找不到方法名：" + request.action);
        }
    },
}
fun.a01();
/*
case "tabs_create_update_indexOf":This.tabs_update_create_indexOf01(request);break;
else if(request.action === 'statusComplete'){This.statusComplete(request,next);return true;}
else if(request.action === 'proxy'){This.proxy(request,next);return true;}
else if(request.action === 'resetProxy'){This.resetProxy();return true;}

 a02: function () {
        // 监听发送请求-----获取请求的内容
        //chrome.webRequest.onBeforeRequest.addListener(
        //    function (details) {
        //        console.log('请求详情', details)
        //        if (details.method == 'POST') {
        //            const decoder = new TextDecoder('utf-8')
        //            var postedString = decoder.decode(
        //                new Uint8Array(details?.requestBody?.raw[0].bytes)
        //            )
        //            console.log('请求体内容', postedString)
        //        }
        //        return { cancel: false }
        //    },
        //    { urls: ['<all_urls>'] },
        //    ['requestBody']
        //)
        ///////////////////////////////////////////////////
        /*
        chrome.contextMenus.create({
            title: "这是右健菜单",
            onclick: function(){aler("右健菜单被点击了")}
        });
        *---/
        /*chrome.tabs.onUpdated.addListener(function (id, info, tab)
        {
            this.tab=[id, info, tab]
            //console.log(JSON.stringify(info,null,2)+"-----"+id+"-----"+JSON.stringify(tab,null,2))
            if(info.status === 'complete'){This.status.push(id);}//有哪些窗口加载完成
        });*---/
        /////////////////////////////////////////////////////////////////////////////////////////////
        //插件监听拦截-图片
                chrome.webRequest.onBeforeRequest.addListener(
                function(details)
                {
                    // console.log(details);
                    // 回调返回一个对象，如果对象里得cancel为true则会拦截不继续请求
                    return {cancel: true};
                },
                //监听页面请求,你也可以通过*来匹配。urls地址，types请求资源类型
                {
                    urls:
                    [
                        'https://www.dhgate.com/*',
                        'https://rendie.com/image.dhgate.com/*',
                    ], types: ["image"]
                },// 拦截tophatter图
                ["blocking"]);
        /////////////////////////////////
        this.a03()
    },
a03: function () {
        /**
        * 监听代理服务错误
        * _details 		object 			关于错误的描述
        */
/*chrome.proxy.onProxyError.addListener(function(_details)
{
     console.log(["代理服务错误",_details]);
});
*/
//监听web请求onResponseStarted
/*
chrome.webRequest.onResponseStarted.addListener(function(_result)
{
    console.log('onResponseStarted');
    console.log(_result);
},{urls: ["<all_urls>"]});
*/
//监听web请求onCompleted

/*
//chrome.webRequest.onCompleted可以获得网络请求返回的header,但无法获取返回的内容，经过多方研究发现可以用
chrome.webRequest.onCompleted.addListener(function(_result)
{
    console.log('onCompleted');
    console.log(_result);
},{urls: ["<all_urls>"]});*/

//监听web请求ErrorOccurred
/*
chrome.webRequest.onErrorOccurred.addListener(function(_result)
{
    if(_result.erroe === 'net::ERR_PROXY_CONNECTION_FAILED')
    {
        console.log('代理错误');
    }
    else if( _result.erroe === 'net::ERR_NAME_NOT_RESOLVED')
    {
        console.log('网络未解析');
    }
    console.log('onErrorOccurred');
    console.log(_result);
},{urls: ["<all_urls>"]});
*---/
},
saveScreenshot01:function()
{
//这个只能截当前屏幕，截整个网页，chrome有自带的命令。
var This=this;
chrome.tabs.captureVisibleTab(null, {format : "png"}, function(data)
{
    This.saveScreenshot02(data);
});
},
saveScreenshot02:function(data,request)
{
var canvas =  document.createElement("canvas");
var image = new Image();
image.src = data; 
image.onload = function()
{
    canvas.width = image.width;
    canvas.height = image.height;
    var context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
    // save the image
    var link = document.createElement('a');
    link.download = "screenshot.png";
    link.href =  canvas.toDataURL();
    link.click();
};
},
tabs_update_create_indexOf01:function(request)//创建--看能不能不要这个
{
alert("看能不能不要这个")
    var This=this;
    chrome.tabs.query({index:request.index-1,windowId:request.windowId},function(tabs)//第一层
    {
        if(tabs.length==0)//不存在就创建
        {
            request.isbool=true;
            chrome.tabs.create({url:request.url,windowId:request.windowId},function()
            {
                chrome.tabs.highlight({tabs:0,windowId:request.windowId},function()
                {
                    This.tabs_update_create_indexOf01(request,next);
                });						
            });
        }
        else
        {
            //存在就更新
            request.tabsId=tabs[0].id;
            if(request.isbool)//是从创建过来的，就不用更新
            {Tool.Time("1", 100, This.tabs_create_update_indexOf04,This, [request,next]);}
            else
            {This.tabs_create_update_indexOf02(request,next);}
        	
        }
    });
},

// 获取当前的代理配置(调试使用，正式不需要)
GetProxyConfig:function()
{
chrome.proxy.settings.get({},function(config) {
    console.log(["eeeeeeeeeee",config]);
    console.log(JSON.stringify(config));
});
},
proxy:function(request, next)
{
chrome.proxy.settings.set({
    value: {
    "mode":"pac_script",
    "pacScript":{"data":"function FindProxyForURL(url, host){return \""+request.url+"\";}"}
},
scope: 'regular'
},
function(t)
{
    //fun.GetProxyConfig()
    next(t)
});
},
//重置为默认代理
resetProxy:function()
{
chrome.proxy.settings.set({value: {mode: "system"}});
},
////////////////////////////////////////////////////////////////////////
tabs_create_update_indexOf02:function(request,next)//清空内容（如果不清空内容，就可能会获取上一次的内容）
{
var This=this;
chrome.tabs.executeScript(request.tabsId,{code:'document.body.innerHTML="清空内容";'},function(t1)//清空
{
    if(t1)
    {
        chrome.tabs.executeScript(request.tabsId,{code:'document.body.innerHTML;'},function(t2)
        {
            if(t2=="清空内容"){Tool.Time( "1",1, This.tabs_create_update_indexOf03, This,[request,next]);}
            else
            {
                next("清空代码失败。");
            }
        });
    }
    else
    {
        next("设置空失败。");
    }
});
},
tabs_create_update_indexOf03:function(arr)//查找到想要的代码就出来【request.code】
{
//说明：
//arr[0].url    上一次url与这个是url,不能一样，因为【chrome.tabs.update】一样，就会直接过了。
var This=this;
chrome.tabs.update(arr[0].tabsId,{url:arr[0].url},function(t)
{
    Tool.Time("1", 100, This.tabs_create_update_indexOf04,This, arr);//查找
});
},
tabs_create_update_indexOf04:function(arr1)//查找到想要的代码就出来【request.code】
{
var This=this;
chrome.tabs.executeScript(arr1[0].tabsId,{code:"document.body.parentNode.outerHTML;"},function(t)
{
    if(t)
    {
        if(arr1[0].code)
        {
            var arr2=arr1[0].code.split("<1/>"),isbool=false;
            for(var i=0;i<arr2.length;i++)
            {
                if(t[0].indexOf(arr2[i])!=-1){isbool=true;break;}
            }				
            if(isbool)
            {
                arr1[1](t);
            }
            else
            {
                Tool.Time( "1", 100, This.tabs_create_update_indexOf04,This,arr1);
            }
        }
        else
        {arr1[1]("参数错误。。。");}
    }
    else
    {
        arr1[1]("取值失败。");
        //Tool.Time( "1", 100,This.tabs_create_update_indexOf04,This,arr1);
    }
});
},
*/