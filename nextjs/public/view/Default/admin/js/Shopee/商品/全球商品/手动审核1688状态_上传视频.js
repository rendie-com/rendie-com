var fun =
{
    obj: {
        A1: 349, A2: 0,
    },
    a01: function () {
        let html = Tool.header('Shopee &gt; 商品列表 &gt; 全球商品 &gt; 手动审核1688状态_上传视频') + '\
        <div class="p-2">\
            <table class="table table-hover">\
            <tbody>\
		        <tr><td class="right w150">商品条进度：</td>'+ Tool.htmlProgress('A') + '</tr>\
		        <tr><td class="right">1688详情ID：</td><td id="ManualReview_1688_fromid" colspan="2"></td></tr></tbody>\
		        <tr><td class="right">上传视频前地址：</td><td id="videoUrlA" colspan="2"></td></tr></tbody>\
		        <tr><td class="right">上传视频进度：</td>'+ Tool.htmlProgress('B') + '</tr>\
		        <tr><td class="right">上传视频后地址：</td><td id="videoUrlB" colspan="2"></td></tr></tbody>\
		        <tr><td class="right">提示：</td><td id="state" colspan="2"></td></tr></tbody>\
            </table>\
        </div>'
        Tool.html(this.a02, this, html);
    },
    a02: function () {
        Tool.login.a01(this.a03, this)
    },
    a03: function (t) {
        this.obj.seller = t;
        this.a04();
    },
    a04: function () {
        $("#state").html("正在获得配置参数");
        let str = '\
        {\
            "A2":'+ (this.obj.A2 == 0 ? '<@count/>' : 0) + ',\
           <r:GlobalPro db="sqlite.shopee" size=1 page=2 where=" where @.isup=1 and @.ManualReview_1688=1 and @.ManualReview_1688_video_status&gt;3">\
                "ManualReview_1688_fromid":<:ManualReview_1688_fromid/>,\
                "video":<:video tag=0/>,\
                <r:prodes db="sqlite.1688_prodes/<:ManualReview_1688_fromid Fun=ProidNum(+$1,99)/>" size=1 where=" where @.fromid=<:ManualReview_1688_fromid/>">\
                    "videoUrl":<:videoUrl tag=json/>\
                </r:prodes>\
            </r:GlobalPro>\
        }'
        Tool.ajax.a01(str, this.obj.A1, this.a05, this)
    },
    a05: function (oo) {
        if (this.obj.A2 == 0) { this.obj.A2 = oo.A2; }
        Tool.x1x2("A", this.obj.A1, this.obj.A2, this.d01, this, null, oo)
    },
    ////////////////////////////////////////////////////////
    b01: function (e) {
        for (var t = 2097152, n = e.byteLength, r = Math.ceil(n / t), i = new (self_ArrayBuffer), o = 0; o < r; o++) {
            var a = o * t
                , u = a + t >= n ? n : a + t
                , c = e.slice(a, u);
            i.append(c)
        }
        return i.end()
    },
    /////////////////////////////////////////////////
    d01: function (oo) {
        $("#ManualReview_1688_fromid").html('<a href="https://detail.1688.com/offer/' + oo.ManualReview_1688_fromid + '.html" target="_blank">' + oo.ManualReview_1688_fromid + '</a>')
        $("#videoUrlA").html('<a href="' + oo.videoUrl + '" target="_blank">' + oo.videoUrl + '</a>')
        if (oo.video == 0) {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.src = oo.videoUrl;
            video.onerror = function (e) {
                $("#state").html("上传视频出错了。")
                This.g01(10, oo.ManualReview_1688_fromid)
            };
            let This = this;
            video.onloadedmetadata = function () {
                if (video.duration < 10) {
                    $("#state").html("视频时长小于10秒，上传不了。")
                    This.g01(8, oo.ManualReview_1688_fromid)
                }
                else if (video.duration > 60) {
                    $("#state").html("视频时长大于60秒，上传不了。")
                    This.g01(9, oo.ManualReview_1688_fromid)
                }
                else {
                    Tool.getFileBlob(oo.videoUrl, This.d02, This, oo)
                }
            };
        }
        else {
            this.f05("ok")
        }
    },
    d02: function (blob, oo) {
        $("#state").html('图片【blobToArrayBuffer】');
        let This = this;
        Tool.blobToArrayBuffer(blob).then(arrayBuffer => {
            let o1 = {
                "md5": this.b01(arrayBuffer),
                "file_size": arrayBuffer.byteLength,
                "file_name": oo.videoUrl.split("/").pop()
            }
            //后面的提交要用
            oo.post = {
                "video_info": {
                    "size": o1.file_size,
                    "md5": o1.md5
                },
                "report_data": {
                    "cost": 2561,
                    "sdk_version": "2.3.8",
                    "os_type": "Win32",
                    "os_version": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
                    "app_version": "1.0.0"
                }
            }
            This.d03(o1, oo);
        });
    },
    d03: function (data, oo) {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller["my"].shopId,
            "cbsc_shop_region=my"
        ]
        let url = "https://seller.shopee.cn/api/upload/v1/initiate_video_upload?" + arr.join("&")
        gg.postFetch(url, JSON.stringify(data), this.e01, this, oo)
    },
    //////////////////////////////////////////////////
    e01: function (t, oo) {
        let url = "https://up-ws-sg.vod.susercontent.com/file/upload"
        oo.post.vid = t.data.vid//后面的提交要用
        let data = [
            { name: "file", value: "（二进制）" + oo.videoUrl },
            { name: "token", value: t.data.cloud_services[0].token },
            { name: "key", value: t.data.vid + ".ori.mp4" },
            { name: "mimeType", value: "video/mp4" }]
        $("#state").html("正在上传视频。。。");
        Tool.uploadFile(url, [], data, this.e02, this, oo)
    },
    e02: function (t, oo) {
        if (t.x1) {
            Tool.x1x2("B", t.x1, t.x2, null, null, null);
        }
        else {
            if (t.code == 200) {
                $("#state").html("上传视频成功。");
                let videoUrl = "https://down-ws-global.vod.susercontent.com/" + oo.post.vid + ".ori.mp4"
                $("#videoUrlB").html('<a href="' + videoUrl + '" target="_blank">' + videoUrl + '</a>')
                oo.post.upload_result = {//后面的提交要用
                    "service_id": "wscloud",
                    "video_url": "https://down-ws-global.vod.susercontent.com/" + oo.post.vid + ".ori.mp4",
                    "extend_id": t.error
                }
                this.e03(oo);
            }
            //else if (t.code == 401) {

            //    $("#state").html("等视频上传结果。");
            //    this.d01(oo)
            //}
            else {
                Tool.pre(["上传视频出错", t])
            }
        }
    },
    e03: function (oo) {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller["my"].shopId,
            "cbsc_shop_region=my"
        ]
        let url = "https://seller.shopee.cn/api/upload/v1/report_video_upload?" + arr.join("&")
        gg.postFetch(url, JSON.stringify(oo.post), this.e04, this, oo)
    },
    e04: function (t, oo) {
        if (t.message == "success") {
            oo.num = 0;
            this.f01(oo)
        }
        else {
            Tool.pre(["信息出错", t])
        }
    },
    /////////////////////////////////////
    f01: function (oo) {
        oo.num++;
        $("#state").html("正在处理视频，已用时【" + oo.num + "秒】。")
        Tool.Time("name", 1000, this.f02, this, oo);
    },
    f02: function (oo) {
        let arr = [
            "SPC_CDS=" + this.obj.seller.SPC_CDS,
            "SPC_CDS_VER=2",
            "cnsc_shop_id=" + this.obj.seller["my"].shopId,
            "cbsc_shop_region=my"
        ]
        let data = {
            "vids": [oo.post.vid],
            "need_preview": true
        }
        let url = "https://seller.shopee.cn/api/upload/v1/get_video_upload_result_batch?" + arr.join("&")
        gg.postFetch(url, JSON.stringify(data), this.f03, this, oo)
    },
    f03: function (t, oo) {
        if (t.message == "success") {
            if (t.data[0].message == "success") {
                this.f04(t.data[0], oo)
            }
            else {
                this.f01(oo)
            }
        }
        else {
            Tool.pre(["获取视频信息出错", t])
        }
    },
    f04: function (t, oo) {
        let shopeeVideo = [
            {
                "video_id": t.video_info.video_id,
                "thumb_url": t.video_info.thumbnail,
                "duration": t.video_info.duration,
                "version": 2,
                "vid": t.vid
            }
        ]
        let html = '"ok"<r: db="sqlite.shopee">update @.GlobalPro set @.video=' + Tool.rpsql(JSON.stringify(shopeeVideo)) + ' where @.ManualReview_1688_fromid=' + oo.ManualReview_1688_fromid + '</r:>'
        Tool.ajax.a01(html, 1, this.f05, this)
    },
    f05: function (t) {
        if (t == "ok") {
            this.obj.A1++;
            $("#state").html("下一条。。。")
            $("#B1").html("0%").css("width", "0%");
            $("#B2,#ManualReview_1688_fromid,#videoUrlA,#videoUrlB").html("");
            this.a04();
        }
        else {
            Tool.pre(["出错", t])
        }
    },
    g01: function (ManualReview_1688_video_status, ManualReview_1688_fromid) {
        let html = '"ok"<r: db="sqlite.shopee">update @.GlobalPro set @.ManualReview_1688_video_status=' + ManualReview_1688_video_status + ' where @.ManualReview_1688_fromid=' + ManualReview_1688_fromid + '</r:>'
        Tool.ajax.a01(html, 1, this.f05, this)
    },
}
fun.a01();