'use strict';
Object.assign(Tool, {
    upPic://上传图片返回,上传好的图片地址。
    {
        a01: function (pic, next, This, t) {
            let oo = {
                pic: pic,
                next: next,
                This: This,
                t: t
            }
            this.a02(oo)
        },
        a02: function (oo) {
            let url = "https://seller.ozon.ru/api/images/synchronous/validate_raw"
            let data = [{
                name: "image",
                value: "（二进制）" + oo.pic,
                fileName: oo.pic.split("/").pop()
            }]
            let headers = [
                //注：这里不能这么写，所以注释了。
                //{
                //    "name": "Origin",
                //    "value": 'https://seller.ozon.ru'
                //},
                //{
                //    "name": "Referer",
                //    "value": 'https://seller.ozon.ru/app/products'
                //},
                {
                    "name": "X-O3-App-Name",
                    "value": 'seller-ui'
                },
                {
                    "name": "X-O3-Company-Id",
                    "value": '1036832'
                },
                {
                    "name": "X-O3-Language",
                    "value": 'zh-Hans'
                },
                {
                    "name": "X-O3-Page-Type",
                    "value": 'products'
                }
            ]
            gg.uploadFile(url, headers, data, this.a03, this, oo)
        },
        a03: function (o1, oo) {
            oo.next.apply(oo.This, [o1, oo.t]);
        },
    }
})