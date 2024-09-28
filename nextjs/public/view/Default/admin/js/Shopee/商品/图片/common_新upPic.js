'use strict';
Object.assign(Tool, {
    upPic://上传图片返回,上传好的图片地址。
    {
        //说明：当图片上传到【Shopee】时，不是正方形的图片，【Shopee】会自动转为正方形图片。
        a01: function (pic, seller, site, next, This, t) {
            let oo = {
                pic: pic,
                seller: seller,
                site: site,
                next: next,
                This: This,
                t: t
            }
            this.a02(oo)
        },
        a02: function (oo) {
            $("#state").html("正在获取图片Base64...");
            Tool.setImageWH.a01(oo.pic, true, 1000, 1000, "png", this.a03, this, oo);
        },
        a03: function (t, oo) {
            let maxSize = 1024 * 1024 * 2  //2M
            let size = Tool.getBase64ImageSize(t);
            if (size <= maxSize) {
                let blob = Tool.convertBase64ToBlob(t);
                this.a04(blob, oo);
            }
            else {
                $("#state").html('修改大小,直到2M以内。');
                //注：执行后的图片是【.jpg】格式
                Tool.compressedImage.a01(t, maxSize, this.a04, this, oo);
            }
        },
        a04: function (blob, oo) {
            oo.blobPic = URL.createObjectURL(blob);
            $("#state").html('上传的图片：' + oo.blobPic);
            let arr = [
                "SPC_CDS=" + oo.seller.SPC_CDS,
                "SPC_CDS_VER=2",
                "ratio=1",
                "cnsc_shop_id=" + oo.seller[oo.site].shopId,
                "cbsc_shop_region=" + oo.site
            ]
            let url = "https://seller.shopee.cn/api/v3/general/upload_image/" + arr.join("&");
            let data = [{ name: "file", value: "（二进制）" + oo.blobPic }]
            $("#state").html("正在上传图片。。。");
            gg.uploadFile(url, [], data, this.a05, this, oo)
        },
        a05: function (t, oo) {
            URL.revokeObjectURL(oo.blobPic);//方法释放使用URL
            if (t.msg == "success") {
                $("#state").html("上传成功。。。");
                oo.next.apply(oo.This, [t.data.resource_id, oo.t]);
            }
            else {
                Tool.pre(["上传图片出错",t])
            }
            


        },
    }
})