'use strict';
import { common } from './index.js';
export const common_executeScript = {   
    ///////执行JS后再找内容////////////////////////////////////////
    tabs_executeScript_indexOf: {
        a01: function (index, windowId, fileArr, code, htmlArr, isHighlightTab, next) {
            let oo = {
                index: index,
                windowId: windowId,
                htmlArr: htmlArr,
                isHighlightTab: isHighlightTab,
                next: next
            }
            common_executeScript.executeScript.a01(index, windowId, fileArr, code, this.a02, this, oo)//执行JS
        },
        a02: function (t, oo) {
            common.Time("name", 100, this.a03, this, oo);
        },
        a03: function (oo) {
            common.tabs_indexOf.a01(oo.index, oo.windowId, oo.htmlArr, this.a04, this, oo)//查找
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
        a01: function (index, windowId, url, htmlArr, isHighlightTab, next) {
            let oo = {
                index: index,
                windowId: windowId,
                url: url,
                htmlArr: htmlArr,
                isHighlightTab: isHighlightTab,
                next: next
            }
            common.tabs_remove(index, windowId, this.a02, this, oo)//删除【index】选项卡，直到找不到【index】为止
        },
        a02: function (oo) {
            common.tabs_create(oo.index, oo.windowId, oo.url, this.a03, this, oo)//创建【index】选项卡，直到找到【index】为止
        },
        a03: function (oo) {
            if(oo.htmlArr){
                common.Time("name", 50, this.a04, this, oo);
            }
            else{
                let This=this;
                let handleUpdated=function (tabId, changeInfo, tab){             
                    if (changeInfo.status == 'complete') {
                        // 移除监听器
                        chrome.tabs.onUpdated.removeListener(handleUpdated);
                        common.tabs_indexOf.a01(oo.index, oo.windowId,false, This.a05, This, oo)//查找                        
                    }                
                }
                //没填html属性，就是面页加载完就返回
                chrome.tabs.onUpdated.addListener(handleUpdated);
            }
        },
        a04: function (oo) {
            common.tabs_indexOf.a01(oo.index, oo.windowId, oo.htmlArr, this.a05, this, oo)//查找
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
    executeScript: {
        a01: function (index, windowId, fileArr, code, next, This, t) {
            let oo = {
                index: index,
                windowId: windowId,
                fileArr: fileArr,
                code: code,
                next: next,
                This: This,
                t: t
            }
            common.ifTabs(index, windowId, this.a02, this, common.notTab, oo)
        },
        a02: function (id, oo) {
            if (oo.fileArr.length != 0) {
                let This = this;
                fetch(chrome.runtime.getURL("inject/jquery.js")).then(response => { return response.text(); }).then(str => {
                    // 处理返回的数据
                    This.a03(str, id, oo)
                })
            }
            else {
                this.a03("", id, oo)
            }
        },
        a03: function (str, id, oo) {
            chrome.scripting.executeScript({
                target: { tabId: id },
                function: function (code) { return eval(code); },
                args: [str + "\n\n" + oo.code], // 传递给func的参数数组
                world: 'MAIN' // 可以是 'MAIN' 或者 'ISOLATED'
            }, (injectionResults) => {
                common.apply(injectionResults[0].result, oo.next, oo.This, oo.t)
            });
        },
    },
}
 ///////获取所有Headers信息------v3不支持------那就不要了///////////////////////////////////////////////////////////////
    // tabs_remove_create_getHeaders: {
    //     a01: function (index, windowId, url, filterUrlArr, isHighlightTab, next) {
           
    //         // let This = this;
    //         // let listener = (details) => {
    //         //     //  if(details.url.indexOf("/api/")!=-1)
    //         //     //  {
    //         //     //      console.log(details.url)
    //         //     //  } 
    //         //     This.c01(details, filterUrlArr, isHighlightTab, windowId, listener, next)
    //         //     return { requestHeaders: details.requestHeaders };
    //         // }
    //         // chrome.webRequest.onBeforeSendHeaders.addListener(listener, { urls: ["<all_urls>"] }, ["blocking", "requestHeaders", "extraHeaders"])
    //         // this.a02(index, windowId, url)
    //     },
    //     a02: function (index, windowId, url) {
    //         let oo = {
    //             index: index,
    //             windowId: windowId,
    //             url: url
    //         }
    //         Tool.tabs_remove(index, windowId, this.a03, this, oo)//删除【index】选项卡，直到找不到【index】为止
    //     },
    //     a03: function (oo) {
    //         Tool.tabs_create(oo.index, oo.windowId, oo.url, null, null)//创建【index】选项卡，直到找到【index】为止
    //     },
    //     c01: function (details, filterUrlArr, isHighlightTab, windowId, listener, next) {
    //         for (let i = 0; i < filterUrlArr.length; i++) {
    //             if (details.url.indexOf(filterUrlArr[i]) != -1) {
    //                 //笔记：这里面不能得到请求的内容
    //                 chrome.webRequest.onBeforeSendHeaders.removeListener(listener)
    //                 this.c02(details, isHighlightTab, windowId, next)
    //                 break;
    //             }
    //         }
    //     },
    //     c02: function (details, isHighlightTab, windowId, next) {
    //         let Return = {
    //             url: details.url,
    //             method: details.method,
    //             requestHeaders: details.requestHeaders
    //         }
    //         if (isHighlightTab) {
    //             chrome.tabs.highlight({ tabs: 0, windowId: windowId }, function ()//设置第一个【高亮tab】---这样执行速度快
    //             {
    //                 next(Return);
    //             });
    //         }
    //         else { next(Return); }
    //     }
    // },
    ////////////////////执行JS后返回//////////////////////////////////////////////////////////////////
    // tabs_executeScript: {
    //     a01: function (index, windowId, file, code, isHighlightTab, next) {
    //         let oo = { isHighlightTab: isHighlightTab, next: next }
    //         this.executeScript.a01(index, windowId, file, code, this.a02, this, oo)
    //     },
    //     a02: function (t, oo) {
    //         if (oo.isHighlightTab) {
    //             chrome.tabs.highlight({ tabs: 0, windowId: oo.windowId }, function ()//设置第一个【高亮tab】---这样执行速度快
    //             {
    //                 oo.next(t[0]);
    //             });
    //         }
    //         else { oo.next(t[0]); }
    //     },
    // },
 // ////////////////////////////////////////////////////////////////////////////
    
    // //先执行js后，再获得某个url的Headers信息。（比如：Shopee翻页的页码，就在Headers信息中。）
    // tabs_executeScript_getHeaders: {
    //     a01: function (index, windowId, code, filterUrlArr, isHighlightTab, next) {
    //         let oo = {
    //             windowId: windowId,
    //             code: code,
    //             filterUrlArr: filterUrlArr,
    //             isHighlightTab: isHighlightTab,
    //             next: next,
    //         }
    //         Tool.ifTabs(index, windowId, this.a02, this, Tool.notTab, oo)
    //     },
    //     a02: function (id,request) {
    //         let This = this;
    //         let listener = (details) => {
    //             This.c01(details, request.filterUrlArr, request.isHighlightTab, request.windowId, listener, request.next)
    //             return { requestHeaders: details.requestHeaders };
    //         }
    //         chrome.webRequest.onBeforeSendHeaders.addListener(listener, { urls: ["<all_urls>"] }, ["blocking", "requestHeaders", "extraHeaders"])
    //         chrome.tabs.executeScript(id, { code: request.code });
    //     },
    //     ////////////////////////////////////
    //     c01: function (details, filterUrlArr, isHighlightTab, windowId, listener, next) {
    //         for (let i = 0; i < filterUrlArr.length; i++) {
    //             if (details.url.indexOf(filterUrlArr[i]) != -1) {
    //                 //笔记：这里面不能得到请求的内容
    //                 chrome.webRequest.onBeforeSendHeaders.removeListener(listener)
    //                 this.c02(details, isHighlightTab, windowId, next)
    //                 break;
    //             }
    //         }
    //     },
    //     c02: function (details, isHighlightTab, windowId, next) {
    //         let Return = {
    //             url: details.url,
    //             method: details.method,
    //             requestHeaders: details.requestHeaders
    //         }
    //         if (isHighlightTab) {
    //             chrome.tabs.highlight({ tabs: 0, windowId: windowId }, function ()//设置第一个【高亮tab】---这样执行速度快
    //             {
    //                 next(Return);
    //             });
    //         }
    //         else {
    //             next(Return);
    //         }
    //     }
    // },
    //////////////////////////////////////////////////////////////////////////////////////