﻿'use strict';
let fun = {
    a01: function () {
        var This = this;
        window.addEventListener("message", function (e)//接收消息
        {
            //console.log('【content-script.js】收到消息：', e.data);      
            if (e.data.cmd == 'content-script' || e.data.cmd == 'devtools') { This.a02(e); }
        }, false);
        //////////////////////////////////////////////////////////////////////////////////////////
        document.addEventListener('DOMContentLoaded', function () {
            //加上这个，可以判断有没有安装【RenDie 插件】
            This.runJs('var rendie_com="2021/3/14";let rendie_com_scriptID01=document.getElementById("rendie_com_scriptID");rendie_com_scriptID01.parentNode.removeChild(rendie_com_scriptID01);');
            /////////////////////////////////https://v.qq.com/x/cover/////////////////////////////
            /*
            if(window.location.href.indexOf('https://v.qq.com/x/cover/')==0)
            {
                This.loadJs("js/jquery-3.6.0.min.min.js")
                This.loadJs("js/video.js")
            }
            */
            ///////////////////////////////////////////////////////////////
        });

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
    a03: function (html, url) {
        if (typeof (html) == "string") { html = 'decodeURI("' + encodeURI(html) + '")'; }
        else { html = JSON.stringify(html); }
        var str = '\
		var rendie_com_obj= $(\'#' + url + '\');\
		if(rendie_com_obj)\
		{\
			rendie_com_obj[0].contentWindow.gg.Return('+ html + ');\
			let rendie_com_scriptID02=document.getElementById("rendie_com_scriptID");\
			rendie_com_scriptID02.parentNode.removeChild(rendie_com_scriptID02);\
		}else{console.log("找不到【iframe】");}'
        this.runJs(str);
    },
    runJs: function (str)//运行JS代码
    {
        var temp = document.createElement('script');
        temp.setAttribute('id', 'rendie_com_scriptID');
        temp.setAttribute('type', 'text/javascript');
        temp.appendChild(document.createTextNode(str));
        document.head.appendChild(temp);
    },
    //loadJs: function (jsPath)//加载JS文件
    //{
    //    var temp = document.createElement('script');
    //    temp.setAttribute('type', 'text/javascript');
    //    temp.src = chrome.extension.getURL(jsPath);
    //    temp.onload = function () {
    //        this.parentNode.removeChild(this);// 放在页面不好看，执行完后移除掉
    //    };
    //    document.body.appendChild(temp);
    //}
}.a01();