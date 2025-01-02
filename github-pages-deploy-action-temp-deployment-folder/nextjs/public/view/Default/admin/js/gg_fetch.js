'use strict';
Object.assign(gg, {
    uploadFile: function (url, type, headers, data, next, This, t) {
        /*
        data格式如下：
        [{
            name: "target_img",
            value: "（二进制）https://rendie.com/view/Default/html/product/img/logo/logo.png",
            fileName: "captcha.jpg"
        },
        {
            name: "bg_img",
            value: "（二进制）https://rendie.com/view/Default/html/product/img/logo/logo.png",
            fileName: "captcha.jpg"
        },
        {
            name: "targetWidth",
            value: 80
        },
        {
            name: "bgWidth",
            value: 300
        }]
        注：（二进制）表示会把文件转成二进制后，再上传。
        上传文件       gg.uploadFile("https://rendie.com/ajax","json",headers,data,this.a02,this,"xxxxx")
        可走Headers监听路线，比如：修改“Origin”标头，胆会慢一点。
        */
        let oo = { action: "uploadFile", url: url, type: type, headers: headers, data: data }
        this.postMessage(next, This, t, oo)
    },
    ///////////////////////////////////////////////////////////////
    //gg.getFetch("https://www.aliexpress.com/item/1005002156462954.html","text",this.c01,this,t)
    getFetch: function (url, type, next, This, t) {
        let oo = { action: "getFetch", type: type, url: url }
        this.postMessage(next, This, t, oo)
    },
    //普通返回  gg.postFetch("https://www.aliexpress.com/item/1005002156462954.html",arr3,this.c01,this)
    postFetch: function (url, data, next, This, t) {
        let oo = { action: "postFetch", url: url, data: data }
        this.postMessage(next, This, t, oo)
    },
    //指定类型提交  gg.typeHtml(url, "DELETE", data, this.a08, this, "xxxxx")
    //typeHtml: function (url, type, data, next, This, t) {
    //     let oo = { action: "typeHtml", url: url, type: type, data: data }
    //     this.postMessage(next, This, t, oo)
    //},
    ////////////////////////////////////////////////
    //设置Headers信息get请求返回html            gg.setHeaders_getHtml("https://www.aliexpress.com/item/1005002156462954.html",{},this.c01,this,t)
    //setHeaders_getHtml: function (url, headers, next, This, t) {
    //     let oo = { action: "setHeaders_getHtml", url: url, headers: headers }
    //     this.postMessage(next, This, t, oo)
    //},
    ////返回值必须是Json,否则出错  (注：有的网站还必须要你Json提交，否则它给你报错)
    ////设置Headers信息post请求返回json		    gg.setHeaders_postHtml("https://www.aliexpress.com/item/1005002156462954.html",{},{},this.c01,this)
    //setHeaders_postHtml: function (url, headers, data, next, This, t) {
    //    let oo = { action: "setHeaders_postHtml", url: url, headers: headers, data: data }
    //    this.postMessage(next, This, t, oo)
    //}
}) 