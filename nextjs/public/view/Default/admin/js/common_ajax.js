'use strict';
Object.assign(Tool, {
    getToken: {
        a01: function (data, next, This, t) {
            let oo = {
                data: data,
                next: next,
                This: This,
                t: t,
            }
            this.a02(oo)
        },
        a02: function (oo) {
            let This = this;
            $.ajax({
                type: "POST",
                url: "/api/json",
                dataType: "json",
                timeout: 300000,
                data: oo.data,
                complete: function (XMLHttpRequest, status) {
                    This.a03(XMLHttpRequest, status, oo)
                }
            });
        },
        a03: function (XMLHttpRequest, status, oo) {
            if (status == "success") {
                Tool.apply(XMLHttpRequest.responseJSON, oo.next, oo.This, oo.t);
            }
        },
    },
    ajax: {
        a01: function (list, next, This, t) {
            let oo = {
                list: list,
                next: next,
                This: This,
                t: t,
                try_times: 3//超时次数
            }
            this.a02(oo)
        },
        a02: function (oo) {
            let This = this;
            $.ajax({
                type: "POST",
                url: "/api/json",
                dataType: "json",
                headers: {
                    token: Tool.getStorage("access_token")
                },
                timeout: 300000,
                data: { list: JSON.stringify(oo.list) },
                complete: function (XMLHttpRequest, status) {
                    This.a03(XMLHttpRequest, status, oo)
                }
            });
        },
        a03: function (XMLHttpRequest, status, oo) {
            let objJson = XMLHttpRequest.responseJSON;
            if (status == "success") {//这里表是调要是成功的，返回的内容是否有问题，还得看下一步。如：密码不正确
                this.a04(objJson, oo);
            }
            else if (status == "parsererror") {
                let str1 = (typeof (oo[1]) == "string" ? oo[1] : "【JSON.stringify】:\n" + JSON.stringify(oo[1], null, 2));
                let str2 = " oo.XMLHttpRequest.responseText"
                if (str2.indexOf("</textarea>") != -1) { str2 = str2.replace("</textarea>", "</text-area>").replace("<textarea", "<text-area"); }
                Tool.Modal("json请求出错【" + oo.url + "】", "请求数据：<br/><textarea style=\"height: 200px;\" class=\"form-control form-control-sm\">" + str1 + "</textarea>出错原因:<br/><textarea style=\"height: 200px;\" class=\"form-control form-control-sm\">" + str2 + "</textarea>", '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>', 'modal-xl');
            }
            else if (status == "error" && XMLHttpRequest.statusText == "error" && XMLHttpRequest.status == 0) {
                this.tryTimes(oo);
            }
            else {
                if (status == "error" && XMLHttpRequest.statusText == "Internal Server Error") {
                    this.tryTimes(oo);
                }
                else if (status == "error" && XMLHttpRequest.status == 500) {
                    this.tryTimes(oo);
                }
                else {
                    Tool.Modal("json请求出错", "请求数据：<br/>\
                    <textarea style=\"height: 200px;\" class=\"form-control form-control-sm\">" + oo.str + "</textarea>\
                    出错原因:<br/>\
                    <textarea style=\"height: 200px;\" class=\"form-control form-control-sm\">status:"+ status + "\n\n" + XMLHttpRequest.responseText + "\n\n" + JSON.stringify(XMLHttpRequest, null, 2) + "</textarea>",
                        '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>',
                        'modal-xl');
                }
            }
        },
        a04: function (objJson, oo) {
            if (objJson.status == "success") {
                this.d01(objJson, oo);
            }
            else {
                Tool.pre(["出错ajax--01：", objJson])
                console.log("出错ajax--01：", objJson, oo)
            }
            //else if (objJson.status == "error" && objJson.data.indexOf('无【access_token】') != -1) {
            //    this.tryTimes(oo);
            //}
            //if (o3 == "需要安装") { top.location.href = "/install"; }
            //else {
            //}
            //if (o3) {
            //} else {
            //    this.apply(o1.XMLHttpRequest.responseText, o2[0], o2[2], o2[4]);
            //}
            //if (objJson.msg == "【token】已失效" || objJson.msg == "【token】为空") {
            //    top.location.href = "/" + obj.arr[0] + "/html/login.html?" + top.location.href;
            //}
            //else {
            //}
        },
        d01: function (objJson, oo) {
            if (objJson.status == "success") {
                this.d02(objJson.data, oo)
            }
            else {
                Tool.pre(["common_ajax.js出错", objJson]);
            }
        },
        d02: function (data, oo) {
            let isErr = false;
            for (let i = 0; i < data.length; i++) {
                if (data[i].status == "error") {
                    isErr = true; break;
                }
            }
            if (isErr) {
                Tool.pre(["[common_ajax.js]list出错", data]);
            }
            else {
                Tool.apply(data, oo.next, oo.This, oo.t);
            }
        },
        //a05: function (objJson, oo) {
        // if (oo.type != "txt") {
        //     if (objJson.data == "") {
        //         //console.log("data为空：", objJson, oo)
        //         this.tryTimes(oo);
        //     }
        //     else {
        //         let isErr = false
        //         try {
        //             eval('objJson.data=' + objJson.data);
        //         } catch (e) {
        //             if (typeof (e) == "object") {
        //                 //.indexOf('SyntaxError: Unexpected token') != -1
        //                 Tool.at("common_ajax.js出错001：\n\n" +objJson.data)
        //                 //Tool.at("真能到这里吗？" + e)
        //                 //this.tryTimes(oo);
        //             }
        //             else {
        //                 isErr = true;
        //                 //this.a06(objJson, next, This, t)
        //                 //Tool.at("common_ajax.js用eval出错：" + e + "\n\n" + objJson.data)
        //                 console.log("111111111111111111---", objJson.data)
        //                 console.log("22222222222222---", oo)
        //                 Tool.pre([objJson.data, "common_ajax.js出错：" + e, objJson])
        //             }
        //         }
        //         if (!isErr) {
        //             if (Tool.RunTime) {
        //                 eval('Tool.RunTime.data=' + objJson.RunTime);
        //             }
        //             Tool.apply(objJson.data, oo.next, oo.This, oo.t);
        //         }
        //     }
        // }
        // else {
        //     if (Tool.RunTime) {
        //         eval('Tool.RunTime.data=' + objJson.RunTime);
        //     }
        // Tool.apply(objJson.data, next, This, t);
        // }
        //},
        //a06: function (objJson, next, This, t) {
        //    //注：这个只是修复数据，修复完就可以删除了
        //    objJson.data = objJson.data.replace(/\\\\/g, "\\");
        //    eval('objJson.data=' + objJson.data);
        //    if (Tool.RunTime) {
        //        eval('Tool.RunTime.data=' + objJson.RunTime);
        //    }
        //    Tool.apply(objJson.data, next, This, t);
        //},       
        //超时3次。
        tryTimes: function (oo) {
            if (oo.try_times == 0) {
                alert("服务器还是出错：" + oo.try_times)
            }
            else {
                oo.try_times--;
                Tool.Time("name", 5000, this.a02, this, oo);
            }
        },
        //主要是不返回json内容
        txt: function (str, next, This, t) {
            let data = {
                data: str,
                type: "txt",//表示返回txt文本。
                token: Tool.getStorage("access_token")
            }
            this.a02(data, 1, next, This, t)
        },
        //主要是获取js文件内容
        text: function (url, next, This, t) {
            $.ajax({
                url: url,
                dataType: "text",
                success: function (text) {
                    next.apply(This, [text, t]);
                }
            });
        },
        json: function (url, next, This, t) {
            $.ajax({
                url: url,
                dataType: "json",
                success: function (text) {
                    next.apply(This, [text, t]);
                }
            });
        },
        uploadFile: function (formData, folder, next, This, t) {
            let oo = {
                next: next,
                This: This,
                t: t,
                try_times: 3//超时次数
            }
            let tempThis = this;
            $.ajax({
                type: 'POST',
                url: "/api/upload",
                data: formData,
                timeout: 300000,
                headers: {
                    token: Tool.getStorage("access_token"),
                    folder: folder
                },
                async: false,
                processData: false,
                contentType: false,
                dataType: "json",
                complete: function (XMLHttpRequest, status) {
                    tempThis.a03(XMLHttpRequest, status, oo)
                }
            });
        }
    }
})