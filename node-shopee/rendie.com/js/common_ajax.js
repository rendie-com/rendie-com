Object.assign(Tool, {
    getHtml: function (url, next) {
        //注：每次都会出现警告，目前无解决，但可以正常使用。（警告为：Third-party cookie will be blocked. Learn more in the Issues tab.）
        $.ajax(
            {
                url: url,
                type: "GET",
                timeout: 30000,
                success: function (txt) {
                    next(txt);
                },
                complete: function (XMLHttpRequest, status) {
                    if (status != 'success') {
                        next({
                            status: status,
                            code: XMLHttpRequest.status,
                            error: XMLHttpRequest.responseText
                        });
                    }
                }
            });
    },
    postHtml: function (url, data, next) {
        $.ajax({
            url: url,
            type: "POST",
            timeout: 300000,
            async: false,
            data: data,
            success: function (txt) { next(txt); },
            complete: function (XMLHttpRequest, status) {
                if (status != 'success') {
                    next({
                        status: status,
                        code: XMLHttpRequest.status,
                        error: XMLHttpRequest.responseText
                    });
                }
            }
        });
    },
    typeHtml: function (url, type, data, next) {
        $.ajax({
            url: url,
            type: type,
            timeout: 300000,
            async: false,
            data: data,
            success: function (txt) { next(txt); },
            complete: function (XMLHttpRequest, status) {
                if (status != 'success') {
                    next({
                        status: status,
                        code: XMLHttpRequest.status,
                        error: XMLHttpRequest.responseText
                    });
                }
            }
        });
    },
    setHeaders_getHtml: {
        a01: function (url, headers, next) {
            let This = this;
            let listener = (details) => {
                return { requestHeaders: This.b01(headers.concat(details.requestHeaders)) };
            }
            let filter = { urls: [url], types: ["xmlhttprequest"] }
            chrome.webRequest.onBeforeSendHeaders.addListener(listener, filter, ["blocking", "requestHeaders", "extraHeaders"])
            this.a02(url, listener, next)
        },
        a02: function (url, listener, next) {
            $.ajax({
                url: url,
                type: "get",
                timeout: 300000,
                success: function (data) {
                    chrome.webRequest.onBeforeSendHeaders.removeListener(listener)
                    next(data);
                },
                complete: function (XMLHttpRequest, status) {
                    if (status != 'success') {
                        chrome.webRequest.onBeforeSendHeaders.removeListener(listener)
                        next({
                            status: status,
                            code: XMLHttpRequest.status,
                            error: XMLHttpRequest.responseText
                        });
                    }
                }
            });
        },
        b01: function (arr1) {
            let arr2 = [],//去重
                arr3 = [];
            for (let i = 0; i < arr1.length; i++) {
                if (arr2.indexOf(arr1[i].name) == -1) {//去重只要首次出现的
                    arr3.push(arr1[i]);
                    arr2.push(arr1[i].name);
                }
            }
            return arr3;
        },
    },
    setHeaders_postHtml: {
        a01: function (url, headers, data, next) {
            let arr = headers, isbool = false;//是否走监听路线。
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].name == "Origin") { isbool = true; break; }
            }
            if (isbool) {
                //说明：拼多多就走这边。
                this.e01(url, headers, data, next);//走监听路线。
            }
            else {
                this.d01(url, headers, data, next);//不走监听路线。
            }
        },
        /////////////////////////////////////////////////
        b01: function (arr1) {
            //去重，要重复的第一个。
            let arr2 = [], arr3 = [];
            for (let i = 0; i < arr1.length; i++) {
                if (arr2.indexOf(arr1[i].name) == -1) {
                    arr3.push(arr1[i]);
                    arr2.push(arr1[i].name);
                }
            }
            return arr3
        },
        //////////////////////////////////////////////////////
        d01: function (url, headers1, data, next) {
            let headers2 = {}
            for (let i = 0; i < headers1.length; i++) {
                headers2[headers1[i].name] = headers1[i].value;
            }
            ///////////////////////////
            $.ajax({
                type: 'POST',
                url: url,
                data: data,
                headers: headers2,
                timeout: 300000,
                async: false,
                success: function (data) {
                    next(data);
                },
                complete: function (XMLHttpRequest, status) {
                    if (status != 'success') {
                        let data = {
                            status: status,
                            code: XMLHttpRequest.status,
                            error: XMLHttpRequest.responseText
                        }
                        next(data);
                    }
                }
            });
        },
        ////////////////////////////////////////////////////
        e01: function (url, headers, data, next) {
            let This = this;
            let listener = (details) => {
                return { requestHeaders: This.b01(headers.concat(details.requestHeaders)) };
            }
            chrome.webRequest.onBeforeSendHeaders.addListener(listener, { urls: [url], types: ["xmlhttprequest"] }, ["blocking", "requestHeaders", "extraHeaders"])
            this.e02(url, data, listener, next)
        },
        e02: function (url, data, listener, next) {
            $.ajax({
                url: url,
                data: data,
                type: "post",
                timeout: 300000,
                cache: false,
                success: function (data) {
                    chrome.webRequest.onBeforeSendHeaders.removeListener(listener)
                    next(data);
                },
                complete: function (XMLHttpRequest, status) {
                    if (status != 'success') {
                        chrome.webRequest.onBeforeSendHeaders.removeListener(listener)
                        next({
                            status: status,
                            code: XMLHttpRequest.status,
                            error: XMLHttpRequest.responseText
                        });
                    }
                }
            });
        },
    },

})