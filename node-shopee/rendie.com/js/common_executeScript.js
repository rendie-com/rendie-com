Object.assign(Tool, {
    ////////////////////执行JS后返回//////////////////////////////////////////////////////////////////
    tabs_executeScript: {
        a01: function (index, windowId, file, code, isHighlightTab, next) {
            let oo = { isHighlightTab: isHighlightTab, next: next }
            Tool.executeScript.a01(index, windowId, file, code, this.a02, this, oo)
        },
        a02: function (t, oo) {
            if (oo.isHighlightTab) {
                chrome.tabs.highlight({ tabs: 0, windowId: oo.windowId }, function ()//设置第一个【高亮tab】---这样执行速度快
                {
                    oo.next(t[0]);
                });
            }
            else { oo.next(t[0]); }
        },
    },
    ///////执行JS后再找内容////////////////////////////////////////
    tabs_executeScript_indexOf: {
        a01: function (index, windowId, file, code, html, isHighlightTab, next) {
            let oo = {
                index: index,
                windowId: windowId,
                html: html,
                isHighlightTab: isHighlightTab,
                next: next
            }
            Tool.executeScript.a01(index, windowId, file, code, this.a02, this, oo)//执行JS
        },
        a02: function (t, oo) {
            Tool.Time("name", 100, this.a03, this, oo);
        },
        a03: function (oo) {
            Tool.tabs_indexOf.a01(oo.index, oo.windowId, oo.html, this.a04, this, oo)//查找
        },
        a04: function (t, oo) {
            if (oo.isHighlightTab) {
                chrome.tabs.highlight({ tabs: 0, windowId: oo.windowId }, function ()//设置第一个【高亮tab】---这样执行速度快
                {
                    oo.next(t);
                });
            }
            else { oo.next(t); }
        },
    },
    ////////////////////////////////////////////////////////////////////////
    tabs_remove_create_indexOf: {
        a01: function (index, windowId, url, html, isHighlightTab, next) {
            let oo = {
                index: index,
                windowId: windowId,
                url: url,
                html: html,
                isHighlightTab: isHighlightTab,
                next: next
            }
            Tool.tabs_remove(index, windowId, this.a02, this, oo)//删除【index】选项卡，直到找不到【index】为止
        },
        a02: function (oo) {
            Tool.tabs_create(oo.index, oo.windowId, oo.url, this.a03, this, oo)//创建【index】选项卡，直到找到【index】为止
        },
        a03: function (oo) {
            Tool.Time("name", 100, this.a04, this, oo);
        },
        a04: function (oo) {
            Tool.tabs_indexOf.a01(oo.index, oo.windowId, oo.html, this.a05, this, oo)//查找
        },
        a05: function (t, oo) {
            if (oo.isHighlightTab) {
                chrome.tabs.highlight({ tabs: 0, windowId: oo.windowId }, function ()//设置第一个【高亮tab】---这样执行速度快
                {
                    oo.next(t);
                });
            }
            else { oo.next(t); }
        },
    },
    ////////////////////////////////////////////////////////////////////////////
    ///////获取所有Headers信息///////////////////////////////////////////////////////////////
    tabs_remove_create_getHeaders: {
        a01: function (index, windowId, url, filterUrlArr, isHighlightTab, next) {
            let This = this;
            let listener = (details) => {
                //  if(details.url.indexOf("/api/")!=-1)
                //  {
                //      console.log(details.url)
                //  } 
                This.c01(details, filterUrlArr, isHighlightTab, windowId, listener, next)
                return { requestHeaders: details.requestHeaders };
            }
            chrome.webRequest.onBeforeSendHeaders.addListener(listener, { urls: ["<all_urls>"] }, ["blocking", "requestHeaders", "extraHeaders"])
            this.a02(index, windowId, url)
        },
        a02: function (index, windowId, url) {
            let oo = {
                index: index,
                windowId: windowId,
                url: url
            }
            Tool.tabs_remove(index, windowId, this.a03, this, oo)//删除【index】选项卡，直到找不到【index】为止
        },
        a03: function (oo) {
            Tool.tabs_create(oo.index, oo.windowId, oo.url, null, null)//创建【index】选项卡，直到找到【index】为止
        },
        c01: function (details, filterUrlArr, isHighlightTab, windowId, listener, next) {
            for (let i = 0; i < filterUrlArr.length; i++) {
                if (details.url.indexOf(filterUrlArr[i]) != -1) {
                    //笔记：这里面不能得到请求的内容
                    chrome.webRequest.onBeforeSendHeaders.removeListener(listener)
                    this.c02(details, isHighlightTab, windowId, next)
                    break;
                }
            }
        },
        c02: function (details, isHighlightTab, windowId, next) {
            let Return = {
                url: details.url,
                method: details.method,
                requestHeaders: details.requestHeaders
            }
            if (isHighlightTab) {
                chrome.tabs.highlight({ tabs: 0, windowId: windowId }, function ()//设置第一个【高亮tab】---这样执行速度快
                {
                    next(Return);
                });
            }
            else { next(Return); }
        }
    },
    //先执行js后，再获得某个url的Headers信息。（比如：Shopee翻页的页码，就在Headers信息中。）
    tabs_executeScript_getHeaders: {
        a01: function (index, windowId, code, filterUrlArr, isHighlightTab, next) {
            let oo = {
                windowId: windowId,
                code: code,
                filterUrlArr: filterUrlArr,
                isHighlightTab: isHighlightTab,
                next: next,
            }
            Tool.ifTabs(index, windowId, this.a02, this, Tool.notTab, oo)
        },
        a02: function (id,request) {
            let This = this;
            let listener = (details) => {
                This.c01(details, request.filterUrlArr, request.isHighlightTab, request.windowId, listener, request.next)
                return { requestHeaders: details.requestHeaders };
            }
            chrome.webRequest.onBeforeSendHeaders.addListener(listener, { urls: ["<all_urls>"] }, ["blocking", "requestHeaders", "extraHeaders"])
            chrome.tabs.executeScript(id, { code: request.code });
        },
        ////////////////////////////////////
        c01: function (details, filterUrlArr, isHighlightTab, windowId, listener, next) {
            for (let i = 0; i < filterUrlArr.length; i++) {
                if (details.url.indexOf(filterUrlArr[i]) != -1) {
                    //笔记：这里面不能得到请求的内容
                    chrome.webRequest.onBeforeSendHeaders.removeListener(listener)
                    this.c02(details, isHighlightTab, windowId, next)
                    break;
                }
            }
        },
        c02: function (details, isHighlightTab, windowId, next) {
            let Return = {
                url: details.url,
                method: details.method,
                requestHeaders: details.requestHeaders
            }
            if (isHighlightTab) {
                chrome.tabs.highlight({ tabs: 0, windowId: windowId }, function ()//设置第一个【高亮tab】---这样执行速度快
                {
                    next(Return);
                });
            }
            else {
                next(Return);
            }
        }
    },
    //////////////////////////////////////////////////////////////////////////////////////
})





