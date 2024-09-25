Object.assign(Tool, {
    uploadFile:
    {
        a01: function (url, headers, data, next, This,t) {
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
                next: next,
                This: This,
                t: t
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
                            //console.log(progress)
                            Tool.apply({ x1: e.loaded, x2: e.total }, oo.next, oo.This, oo.t);
                        }
                    }, false);
                    return xhr;
                },
                success: function (data) {
                    Tool.apply(data, oo.next, oo.This, oo.t);
                },              
                complete: function (XMLHttpRequest, status) {

                    if (status != 'success') {
                        let data = {
                            status: status,
                            code: XMLHttpRequest.status,
                            error: XMLHttpRequest.responseText
                        }
                        Tool.apply(data, oo.next, oo.This, oo.t);
                    }
                }
            });
        },       
    }
})
