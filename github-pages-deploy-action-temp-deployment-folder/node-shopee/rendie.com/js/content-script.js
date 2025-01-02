'use strict';
let fun = {
    a01: function () {
        var This = this;
        window.addEventListener("message", function (e)//接收消息
        {
            //console.log('【content-script.js】收到消息：', e.data);      
            if (e.data.cmd == 'content-script-rendie-com') { This.a02(e); }
        }, false);
        this.loadJs()
    },
    a02: function (e) {
        var This = this;
        chrome.runtime.sendMessage(e.data, function (r) {
            try {
                This.a03(r, e.data.IDurl);
            }
            catch (err) {
                console.log('收到消息：', e.data);
                alert("返回值：" + r + "\n\n出错原因：" + err.message)
            }
        });
    },
    a03: function (html, IDurl) {
        let data = {
            return: html,
            cmd: "return-rendie-com",
            IDurl: IDurl
        }
        window.postMessage(data, '*')
    },
    /////////////////////////////////////////////
    loadJs: function ()//加载JS文件
    {
        var temp = document.createElement('script');
        temp.setAttribute('type', 'text/javascript');
        temp.src = chrome.runtime.getURL("inject/index.js");
        document.head.appendChild(temp);
    }
}.a01();