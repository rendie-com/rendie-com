'use strict';
var Tool = {
    TimeNameArr: [],//定时器名称
    Time: function (name, time, next, This, t) {
        if (this.TimeNameArr[name]) {
            window.clearTimeout(this.TimeNameArr[name]);
            delete this.TimeNameArr[name];
        };
        //setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。
        this.TimeNameArr[name] = window.setTimeout(function () {
            if (t == undefined) {
                next.apply(This);
            }
            else { next.apply(This, [t]); }
        }, time);
    },//延时执行    
    apply: function (data, next, This, t) {
        if (t) { next.apply(This, [data, t]); }
        else { next.apply(This, [data]); }
    },
    //上传文件要用
    getFileBlob: function (url, next, This, t) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                Tool.apply(this.response, next, This, t)
            }
            else if (this.readyState === 4) {
                Tool.apply({ status: this.status }, next, This, t)
            }
            else if (this.status == 429 && this.readyState == 2) {
                Tool.apply({ status: this.status }, next, This, t);
            }
            else if (this.status == 404 && this.readyState == 2) {
                Tool.apply({ status: this.status }, next, This, t)
            }
            else {
                //console.log("-----------")
                //console.log(this)
            }
        }
        xhr.send();
    },
    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    //高亮tab
    notTab: function (index) {
        alert("没有【第" + index + "个选项卡】")
    },
    //大于【index】，则删除。注：【index】从1开始。
    tabs_remove: function (index, windowId, next, This, t)//删除【index】选项卡，直到找不到【index】为止
    {
        chrome.tabs.query({ index: index - 1, windowId: windowId }, function (tabs)//我要的【选项卡】是否存在，如果存在，则删除。
        {
            if (tabs.length == 0) {
                next.apply(This, [t]);
            }
            else {
                chrome.tabs.remove(tabs[0].id, function () {
                    Tool.tabs_remove(index, windowId, next, This, t);
                });
            }
        });
    },
    //创建【index】选项卡，直到找到【index】为止。注：【index】从1开始。
    tabs_create: function (index, windowId, url, next, This, t)//创建【index】选项卡，直到找到【index】为止
    {
        chrome.tabs.query({ index: index - 1, windowId: windowId }, function (tabs) {
            if (tabs.length == 0)//没有就继续创建
            {
                chrome.tabs.create({ url: url, windowId: windowId }, function (e) {
                    Tool.tabs_create(index, windowId, url, next, This, t);
                });
            }
            else {
                if (next) next.apply(This, [t]);
            }
        });
    },
    ifTabs: function (index, windowId, next1, This, next2, t)//指定的【选项卡】是否存在，从而选择执行方法。
    {
        chrome.tabs.query({ index: index - 1, windowId: windowId }, function (tabs) {
            if (tabs.length == 0) {
                Tool.apply(index, next2, This, t)
            }
            else {
                Tool.apply(tabs[0].id, next1, This, t)
            }
        });
    },
    executeScript: {
        a01: function (index, windowId, file, code, next, This, t) {
            let oo = {
                index: index,
                windowId: windowId,
                file: file,
                code: code,
                next: next,
                This: This,
                t: t
            }
            Tool.ifTabs(index, windowId, this.a02, this, Tool.notTab, oo)
        },
        a02: function (id, oo) {
            if (oo.file) {
                let This = this;
                chrome.tabs.executeScript(id, { file: oo.file }, function () {
                    This.a03(id, oo)
                });
            }
            else {
                this.a03(id, oo)
            }

        },
        a03: function (id, oo) {
            chrome.tabs.executeScript(id, { code: oo.code }, function (t) {
                Tool.apply(t, oo.next, oo.This, oo.t)
            });
        },
    },
    /////查找，直到找到后才返回/////////////////////////////////////////////
    tabs_indexOf: {
        a01: function (index, windowId, html, next, This, t) {
            let oo = {
                index: index,
                windowId: windowId,
                html: html,
                next: next,
                This: This,
                t: t
            }
            this.a02(oo)
        },
        a02: function (oo)//查找，直到找到为止
        {
            Tool.ifTabs(oo.index, oo.windowId, this.a03, this, false, oo)//当选项卡不存在，就停止运行。
        },
        a03: function (id, oo)//查找，直到找到为止
        {
            var This = this;
            try {
                chrome.tabs.executeScript(id, { code: "document.body.parentNode.outerHTML;" },
                    function (t) {
                        This.a04(t[0], oo)
                    });
            }
            catch (e) {
                //有些就是会出错
            }
        },
        a04: function (t, oo) {
            if (chrome.runtime.lastError) {
                console.log("能到这来，说明，标签栏，已经关闭了，不要执行下去了: " + chrome.runtime.lastError.message);
            }
            else {
                if (t)//取不到值，重新再来。
                {
                    this.a05(t, oo)
                }
                else {
                    Tool.Time("name", 100, this.a02, this, oo);
                }
            }
        },
        a05: function (t, oo) {
            if (oo.html) {
                let arr = oo.html.split("<1/>"), isbool = false;
                for (var i = 0; i < arr.length; i++) {
                    if (t.indexOf(arr[i]) != -1) { isbool = true; break; }
                }
                if (isbool) {
                    Tool.apply(t, oo.next, oo.This, oo.t)
                }
                else {
                    Tool.Time("name", 100, this.a02, this, oo);
                }
            }
            else {
                alert("必须填写【找查内容】参数。");
            }
        },
    },
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    // 高亮tab
    highlightTab: {
        a01: function (index, windowId, next) {
            let oo = {
                index: index,
                windowId: windowId,
                next: next
            }
            Tool.ifTabs(index, windowId, this.a02, this, Tool.notTab, oo)
        },
        // 高亮tab
        a02: function (id, oo) {
            chrome.tabs.highlight({ tabs: oo.index - 1, windowId: oo.windowId }, function (t) {
                oo.next(t);
            });
        },
    },
    //////////////////////////////////////////
    // 显示桌面通知
    notifications: function (title, message, iconUrl, next) {
        if (typeof (message) == "string") {
            chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: iconUrl,
                title: title,
                message: message
            }, function (notificationId) {
                next("ok")
            });
        }
        else {
            chrome.notifications.create(null, {
                type: 'list',
                iconUrl: iconUrl,
                title: title,
                //message: "填了没用",
                items: message
            }, function (notificationId) {
                next("ok")
            });
        }

    },
    // 下载文件
    download: function (url, filename, next) {
        chrome.downloads.download({ url: url, filename: filename }, function (downloadId) {
            next(downloadId);
        });
    },
}