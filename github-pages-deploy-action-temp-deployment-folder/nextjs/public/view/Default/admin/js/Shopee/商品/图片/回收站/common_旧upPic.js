//'use strict';
//Object.assign(Tool, {
//    upPic://上传图片返回,上传好的图片地址。
//    {
//        //说明：当图片上传到【Shopee】时，不是正方形的图片，【Shopee】会自动转为正方形图片。
//        obj: {
//            token: "",
//            img_ids: []//上传图片前要知道【token】和下次要上传的【图片名】。
//        },
//        a01: function (pic, next, This, t) {
//            let oo = {
//                pic: pic,
//                next: next,
//                This: This,
//                t: t
//            }
//            this.a02(oo)
//        },
//        a02: function (oo) {
//            $("#state").html("正在获取图片Base64...");
//            Tool.setImageWH.a01(oo.pic, true, 1000, 1000, "png", this.a03, this, oo);
//        },
//        a03: function (t, oo) {
//            let maxSize = 1024 * 1024 * 2  //2M
//            let size = Tool.getBase64ImageSize(t);
//            if (size <= maxSize) {
//                let blob = Tool.convertBase64ToBlob(t);
//                this.a04(blob, oo);
//            }
//            else {
//                $("#state").html('修改大小,直到2M以内。');
//                //注：执行后的图片是【.jpg】格式
//                Tool.compressedImage.a01(t, maxSize, this.a04, this, oo);
//            }
//        },
//        a04: function (blob, oo) {
//            oo.blobPic = URL.createObjectURL(blob);
//            $("#state").html('上传的图片：' + oo.blobPic);
//            if (this.obj.img_ids.length == 0) {
//                this.a05(oo)//首次或用完了
//            }
//            else {
//                $("#state").html('【rendie】插件上传图片。。。');
//                this.d01(oo)
//            }
//        },
//        a05: function (oo) {
//            oo.request_id = _1746().replace(/-/g, "")
//            let r = 4207, version = '3.0.0'
//            let _header = {
//                version: 1,
//                sign: this.getSignature(oo.request_id, r),
//                biz: r,
//                app_version: "mms-" + version,
//                sdk_version: "mms-" + version,
//                os_type: 2,
//                request_id: oo.request_id,
//                device_model: navigator.userAgent,
//                client_region: "CN",
//            }
//            let url = "https://api.mms.shopee.cn/uploadapi/api/v1/image/preupload"
//            let data = {
//                _header: _header,
//                count: 1
//            }
//            let headers = [
//                //注：可以用"Origin"，那会慢一点点。
//                //{
//                //    "name": "Origin",
//                //    "value": "https://seller.shopee.cn"
//                //},
//                //{
//                //    "name": "Referer",
//                //    "value": "https://seller.shopee.cn/"
//                //},
//                {
//                    "name": "Content-Type",
//                    "value": 'application/json'
//                },
//            ]
//            $("#state").html('正在获取上传图片的名称。。。');
//            gg.setHeaders_postHtml(url, headers, JSON.stringify(data), this.a06, this, oo)
//        },
//        a06: function (t, oo) {
//            let token = CryptoJS.AES.decrypt(t.data.services[0].token, CryptoJS.enc.Utf8.parse(oo.request_id),
//                {
//                    iv: CryptoJS.enc.Utf8.parse("1234567887654321"),
//                    mode: CryptoJS.mode.CBC,
//                    padding: CryptoJS.pad.Pkcs7
//                }).toString(CryptoJS.enc.Utf8)
//            //////////////////////////////////
//            this.obj = {
//                token: token,
//                img_ids: t.data.img_ids.concat(t.data.additional_img_ids)//说明：共可以上传11张图片，分别为，当前的一张图片和下次的10张图片
//            }
//            $("#state").html('已得到【this.obj】。。。');
//            this.d01(oo)
//        },
//        /////////////////////////////////////////////////////////
//        getSignature: function (e, t) {
//            var r = Date.now().toString().substr(0, 10)
//                , n = function (e) {
//                    e = e || 32;
//                    for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", r = "", n = 0; n < e; n++)
//                        r += t[Math.floor(Math.random() * t.length)];
//                    return r
//                }(6);
//            return n + "-" + Tool_hash.hash(n + "@" + e + "@" + t + "@shopee@" + r) + "-" + r
//        },
//        ////////////////////////////////////////////////
//        d01: function (oo) {
//            let url = "https://upload.ws.img.shopee.cn/file/upload"
//            let data = [
//                { name: "file", value: "（二进制）" + oo.blobPic },
//                { name: "token", value: this.obj.token },
//                { name: "key", value: this.obj.img_ids[0] },
//                { name: "mimeType", value: "image/jpeg" }]
//            $("#state").html("正在上传图片。。。");
//            Tool.uploadFile(url, [], data, this.d02, this, oo)
//        },
//        d02: function (t, oo) {
//            if (!t.x2) {
//                URL.revokeObjectURL(oo.blobPic);//方法释放使用URL
//                if (t.response == "{\"code\":0,\"msg\":\"Success\",\"data\":null}") {
//                    $("#state").html("上传成功。。。");
//                    let src = this.obj.img_ids[0]
//                    this.obj.img_ids.shift();
//                    oo.next.apply(oo.This, [src, oo.t]);
//                }
//                else {
//                    $("#state").html('上传失败，延时1秒后续。。。');
//                    Tool.pre(["上传图片失败", t])
//                    //this.obj.img_ids = [];//清空重来
//                    //Tool.Time("name", 1000, this.d01, this, oo)
//                }
//            }
//        },
//    }
//})