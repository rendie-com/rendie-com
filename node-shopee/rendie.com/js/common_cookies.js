Object.assign(Tool, {
    //参考：https://chrome.cenchy.com/cookies.html
    //获取所有cookie信息
    delAllCookies: function (urlArr, next) {
        let This = this;
        chrome.cookies.getAll({ url: urlArr[0] },
            function (cookies) {
                ///////////////////////////////////
                for (let i = 0; i < cookies.length; i++) {
                    chrome.cookies.remove({
                        url: urlArr[0],
                        name: cookies[i].name
                    });
                }
                /////////////////////////////////////
                urlArr.shift();
                if (urlArr.length == 0) {
                    next();
                }
                else {
                    This.delAllCookies(urlArr, next);
                }
                ///////////////////////////////////////
            }
        );
    },
    //设置所有cookie信息
    setAllCookies: function (cookiesArr, next) {
        let This = this;
        chrome.cookies.set(cookiesArr[0],
            function () {
                cookiesArr.shift();
                if (cookiesArr.length == 0) {
                    next();
                }
                else {
                    This.setAllCookies(cookiesArr, next);
                }
            }
        );
    },
    //获取所有cookie信息
    getAllCookies: function (urlArr, cookiesArr, next) {
        let This = this;
        chrome.cookies.getAll({ url: urlArr[0] },
            function (cookies) {
                cookiesArr.push({
                    url: urlArr[0],
                    cookies: cookies
                })
                urlArr.shift();
                //////////////////////////////
                if (urlArr.length == 0) {
                    next(cookiesArr);
                }
                else {
                    This.getAllCookies(urlArr, cookiesArr, next);
                }
            }
        );
    },
    ////////////////////////////////////////////////////////////////////////










    //getCookies: function (request)//获取一个cookie信息
    //{
    //    chrome.cookies.get({ url: request.url, name: request.name },
    //        function (cookies) {
    //            request.next(cookies);
    //        }
    //    );
    //},
    //setCookies: function (request)//获取一个cookie信息
    //{
    //    chrome.cookies.set({ url: request.url, name: request.name, value: request.value },
    //        function () {
    //            request.next();
    //        }
    //    );
    //},
    //delCookies: function (request)//删除一个cookie信息
    //{
    //    chrome.cookies.remove({ url: request.url, name: request.name },
    //        function (cookies) {
    //            request.next(cookies);
    //        }
    //    );
    //},
})