Object.assign(Tool, {
    uploadFile:
    {
        a01: function (url, headers, data, next) {
            var arr = data, arr2 = []
            for (var i = 0; i < arr.length; i++) {
                if (typeof (arr[i].value) == "string") {
                    if (arr[i].value.indexOf("（二进制）") != -1) {
                        arr2.push(arr[i].value.split('（二进制）')[1])
                    }
                }
            }
            let oo = {
                fileArr: arr2,//图片数组
                file2Arr: [],//二进制数组
                url: url,
                headers: headers,
                data: data,
                next: next
            }
            this.a02(oo)
        },
        a02: function (oo) {
            if (oo.fileArr.length == 0) {
                //文件转二进制，可以上传了。
                this.a04(oo)
            }
            else {
                Tool.getFileBlob(oo.fileArr[0], this.a03, this, oo)
            }
        },
        a03: function (t, oo) {
            if (t.status == 404 || t.status == 429 || t.status == 403 || t.status == 0) { oo.next(t); }//报错
            else {
                oo.fileArr.shift();//删除一个
                oo.file2Arr.push(t);//添加一个
                this.a02(oo)
            }
        },
        a04: function (oo) {
            //变成真正的二进制
            var arr = oo.data, formData = new FormData()
            for (var i = 0; i < arr.length; i++) {
                if (typeof (arr[i].value) == "string") {
                    if (arr[i].value.indexOf("（二进制）") != -1) {
                        arr[i].value = oo.file2Arr[0];
                        oo.file2Arr.shift();
                    }
                }
                //////////////////////////////////////////
                if (arr[i].fileName) { formData.append(arr[i].name, arr[i].value, arr[i].fileName); }
                else { formData.append(arr[i].name, arr[i].value); }
            }
            this.a05(oo, formData);
        },
        a05: function (oo, formData) {
            let arr = oo.headers, isbool = false;//是否走监听路线。
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].name == "Origin") { isbool = true; break; }
            }
            if (isbool) {
                alert("上传文件，好像不用【走监听路线】。")
                //this.e01(oo, formData);//走监听路线。
            }
            else {
                this.d01(oo, formData);//不走监听路线。
            }
        },
        //////////////////////////////////
        d01: function (oo, formData) {
            let headers = {}, arr = oo.headers
            for (let i = 0; i < arr.length; i++) {
                headers[arr[i].name] = arr[i].value;
            }
            $.ajax({
                type: 'POST',
                url: oo.url,
                data: formData,
                headers: headers,
                timeout: 300000,
                processData: false,
                contentType: false,
                dataType: "json",
                xhr: function () {
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function (e) {
                        if (e.lengthComputable) {
                            var progress = Math.round((e.loaded / e.total) * 100);
                            ///////////////////////////////////////////////
                            //chrome.notifications.create(null, {
                            //    type: 'basic',
                            //    iconUrl: "img/icon256.png",
                            //    title: "文件上传",
                            //    message: "进度" + progress+"%"
                            //});
                            ///////////////////////////////////////////
                            console.log(progress)
                            //oo.next(progress);
                        }
                    }, false);
                    return xhr;
                },
                success: function (data) {
                    oo.next(data)
                },              
                complete: function (XMLHttpRequest, status) {

                    if (status != 'success') {
                        let data = {
                            status: status,
                            code: XMLHttpRequest.status,
                            error: XMLHttpRequest.responseText
                        }
                        oo.next(data)
                    }
                }
            });
        },
        //////////////////////////////////////
        //e01: function (request, formData) {
        //    request.listener = (details) => {
        //        let arr1 = request.headers.concat(details.requestHeaders), arr2 = [], arr3 = [];
        //        for (let i = 0; i < arr1.length; i++) {
        //            if (arr2.indexOf(arr1[i].name) == -1) {
        //                arr3.push(arr1[i]);
        //                arr2.push(arr1[i].name);
        //            }
        //        }
        //        return { requestHeaders: arr3 };
        //    }
        //    let filter = {
        //        urls: [request.url],
        //        types: ["xmlhttprequest"]
        //    }
        //    chrome.webRequest.onBeforeSendHeaders.addListener(request.listener, filter, ["blocking", "requestHeaders", "extraHeaders"])
        //    this.e02(request, formData);
        //},
        //e02: function (request, formData) {
        //    $.ajax({
        //        type: 'POST',
        //        url: request.url,
        //        data: formData,
        //        timeout: 300000,
        //        async: false,
        //        processData: false,
        //        contentType: false,
        //        dataType: "json",
        //        success: function (data) {
        //            Tool.apply(data, request.next, request.This, request.t)
        //            chrome.webRequest.onBeforeSendHeaders.removeListener(request.listener)
        //        },
        //        complete: function (XMLHttpRequest, status) {
        //            if (status != 'success') {
        //                let data = {
        //                    status: status,
        //                    code: XMLHttpRequest.status,
        //                    error: XMLHttpRequest.responseText
        //                }
        //                Tool.apply(data, request.next, request.This, request.t)
        //            }
        //        }
        //    });
        //}
    }
})
